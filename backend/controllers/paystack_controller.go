package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"aqualia-backend/database"
	"aqualia-backend/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type PaystackVerifyResponse struct {
	Status  bool   `json:"status"`
	Message string `json:"message"`
	Data    struct {
		Amount int    `json:"amount"` // in kobo
		Status string `json:"status"` // "success" if paid
	} `json:"data"`
}

func verifyPaystackTransaction(reference string) (*PaystackVerifyResponse, error) {
	url := fmt.Sprintf("https://api.paystack.co/transaction/verify/%s", reference)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	secretKey := os.Getenv("PAYSTACK_SECRET_KEY")
	req.Header.Add("Authorization", "Bearer "+secretKey)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("paystack verification failed with status: %d", resp.StatusCode)
	}

	var verifyResp PaystackVerifyResponse
	if err := json.NewDecoder(resp.Body).Decode(&verifyResp); err != nil {
		return nil, err
	}

	return &verifyResp, nil
}

// Helper to get user ID handling both potential keys
func getUserIDSafe(c *gin.Context) (uint, bool) {
	if val, ok := c.Get("userID"); ok {
		if id, ok := val.(uint); ok {
			return id, true
		}
	}
	if val, ok := c.Get("user_id"); ok {
		switch v := val.(type) {
		case float64:
			return uint(v), true
		case uint:
			return v, true
		}
	}
	return 0, false
}

func VerifyOrderPayment(c *gin.Context) {
	var req struct {
		OrderID   uint   `json:"order_id" binding:"required"`
		Reference string `json:"reference" binding:"required"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	_, exists := getUserIDSafe(c)
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized format"})
		return
	}

	// Double check if payment reference was already used somewhere (optional but recommended)
	// Since Paystack references are unique per transaction, we can assume Paystack's response is the source of truth

	verifyResp, err := verifyPaystackTransaction(req.Reference)
	if err != nil || !verifyResp.Status || verifyResp.Data.Status != "success" {
		log.Printf("Paystack verification failed: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Payment verification failed or not successful"})
		return
	}

	var order models.Order
	if err := database.DB.First(&order, req.OrderID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
		return
	}

	// Amount in Go is in Naira, Paystack is in Kobo
	expectedAmount := int(order.TotalAmount * 100)
	if verifyResp.Data.Amount < expectedAmount {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Paid amount is less than expected total"})
		return
	}

	if order.PaymentStatus == "PAID" {
		c.JSON(http.StatusOK, gin.H{"message": "Payment already verified", "order": order})
		return
	}

	order.PaymentStatus = "PAID"
	order.Status = models.OrderConfirmed // Automatically confirm if paid

	if err := database.DB.Save(&order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update order status"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Payment verified successfully", "order": order})
}

func VerifyWalletFunding(c *gin.Context) {
	var req struct {
		Reference string  `json:"reference" binding:"required"`
		Amount    float64 `json:"amount" binding:"required"` // The amount expected to be funded
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userId, exists := getUserIDSafe(c)
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized format"})
		return
	}

	verifyResp, err := verifyPaystackTransaction(req.Reference)
	if err != nil || !verifyResp.Status || verifyResp.Data.Status != "success" {
		log.Printf("Paystack verification failed: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Payment verification failed or not successful"})
		return
	}

	// Amount in Go is in Naira, Paystack is in Kobo
	expectedAmount := int(req.Amount * 100)
	if verifyResp.Data.Amount < expectedAmount {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Paid amount is less than expected"})
		return
	}

	err = database.DB.Transaction(func(tx *gorm.DB) error {
		var wallet models.Wallet
		if dbErr := tx.Preload("Transactions").Where("user_id = ?", userId).First(&wallet).Error; dbErr != nil {
			// Autocreate if missing
			wallet = models.Wallet{UserID: userId, Balance: 0}
			if createErr := tx.Create(&wallet).Error; createErr != nil {
				return createErr
			}
		}

		// Ensure Reference not reused
		var existingTxn models.Transaction
		if tx.Where("reference = ?", req.Reference).First(&existingTxn).Error == nil {
			return fmt.Errorf("transaction reference already processed")
		}

		// Update Balance
		wallet.Balance += req.Amount
		if saveErr := tx.Save(&wallet).Error; saveErr != nil {
			return saveErr
		}

		// Create Transaction
		txn := models.Transaction{
			WalletID:    wallet.ID,
			Amount:      req.Amount,
			Type:        models.TxnCredit,
			Reference:   req.Reference,
			Description: "Wallet Funding via Paystack",
		}

		if createErr := tx.Create(&txn).Error; createErr != nil {
			return createErr
		}

		return nil
	})

	if err != nil {
		log.Printf("DB error in verify funding: %v", err)
		if err.Error() == "transaction reference already processed" {
			c.JSON(http.StatusBadRequest, gin.H{"error": "Transaction already processed"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update wallet"})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Wallet funded successfully"})
}
