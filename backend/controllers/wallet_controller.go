package controllers

import (
	"log"
	"net/http"
	"time"

	"aqualia-backend/database"
	"aqualia-backend/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// GetWallet retrieves the authenticated user's digital wallet and its transaction history
func GetWallet(c *gin.Context) {
	userId, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized format"})
		return
	}

	var wallet models.Wallet
	// Attempt to find the wallet and preload transactions safely
	if err := database.DB.Preload("Transactions").Where("user_id = ?", userId).First(&wallet).Error; err != nil {

		// If a wallet wasn't found (likely new user created before wallets introduced), autocreate one
		log.Printf("Wallet not found for user %v, initializing automatically", userId)

		wallet = models.Wallet{UserID: userId.(uint), Balance: 0}
		if dbErr := database.DB.Create(&wallet).Error; dbErr != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to initialize wallet account"})
			return
		}
	}

	c.JSON(http.StatusOK, gin.H{"data": wallet})
}

// MockFund simulates funding a wallet without hitting Paystack
func MockFund(c *gin.Context) {
	userId, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized format"})
		return
	}

	var req struct {
		Amount float64 `json:"amount" binding:"required,min=1000"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Run in a transaction to ensure balance and ledger are updated together
	err := database.DB.Transaction(func(tx *gorm.DB) error {
		var wallet models.Wallet
		if err := tx.Where("user_id = ?", userId).First(&wallet).Error; err != nil {
			return err
		}

		// Update Wallet Balance
		wallet.Balance += req.Amount
		if err := tx.Save(&wallet).Error; err != nil {
			return err
		}

		// Create Transaction Ledger Entry
		txn := models.Transaction{
			WalletID:    wallet.ID,
			Amount:      req.Amount,
			Type:        models.TxnCredit,
			Reference:   "MOCK-FUND-" + time.Now().Format("20060102150405"),
			Description: "Wallet Funding via Paystack (Simulation)",
		}

		if err := tx.Create(&txn).Error; err != nil {
			return err
		}

		return nil
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to mock fund wallet"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Wallet funded successfully"})
}
