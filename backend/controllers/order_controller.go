package controllers

import (
	"fmt"
	"net/http"

	"aqualia-backend/database"
	"aqualia-backend/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type CreateOrderItemInput struct {
	ProductID uint `json:"product_id" binding:"required"`
	Quantity  int  `json:"quantity" binding:"required,min=1"` // E.g., 2 (cartons)
}

type CreateOrderInput struct {
	Items             []CreateOrderItemInput `json:"items" binding:"required,min=1"`
	DeliveryAddressID uint                   `json:"delivery_address_id" binding:"required"`
	PaymentMethod     string                 `json:"payment_method" binding:"required"`
}

func CreateOrder(c *gin.Context) {
	var input CreateOrderInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID := c.GetFloat64("user_id") // JWT sets it as float64 usually
	if userID == 0 {
		// Try cast to uint directly
		if id, ok := c.Get("user_id"); ok {
			switch v := id.(type) {
			case float64:
				userID = v
			case uint:
				userID = float64(v)
			}
		}
	}

	var user models.User
	if err := database.DB.Preload("DistributorProfile").First(&user, uint(userID)).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	var orderItems []models.OrderItem
	var totalAmount float64

	// Begin DB transaction for order creation and stock deduction
	tx := database.DB.Begin()

	for _, itemInput := range input.Items {
		var product models.Product
		if err := tx.Preload("Pricing").First(&product, itemInput.ProductID).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Product ID %d not found", itemInput.ProductID)})
			return
		}

		baseQuantity := itemInput.Quantity * product.UnitMultiplier

		if product.StockQuantity < baseQuantity {
			tx.Rollback()
			c.JSON(http.StatusBadRequest, gin.H{"error": fmt.Sprintf("Insufficient stock for product %s", product.Name)})
			return
		}

		// Determine Price
		priceApplied := product.Pricing.RetailPrice
		if user.Role == models.RoleDistributor {
			priceApplied = product.Pricing.WholesalePrice

			// Optional logic for Tier level pricing
			if user.DistributorProfile != nil {
				if user.DistributorProfile.TierLevel == 2 {
					priceApplied = product.Pricing.Tier2Price
				} else if user.DistributorProfile.TierLevel == 1 {
					priceApplied = product.Pricing.Tier1Price
				}
			}
		}

		totalAmount += priceApplied * float64(itemInput.Quantity)

		orderItems = append(orderItems, models.OrderItem{
			ProductID:    product.ID,
			Quantity:     itemInput.Quantity,
			BaseQuantity: baseQuantity,
			PriceApplied: priceApplied,
		})

		// Deduct Stock
		if err := tx.Model(&product).Update("stock_quantity", gorm.Expr("stock_quantity - ?", baseQuantity)).Error; err != nil {
			tx.Rollback()
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update stock"})
			return
		}
	}

	// Minimum Order Value for Distributors checking (mock example: 50,000 min for distributors)
	if user.Role == models.RoleDistributor && totalAmount < 50000 {
		tx.Rollback()
		c.JSON(http.StatusBadRequest, gin.H{"error": "Distributor minimum order value is 50,000"})
		return
	}

	order := models.Order{
		UserID:            uint(userID),
		Status:            models.OrderPending,
		TotalAmount:       totalAmount,
		DeliveryFee:       1500, // Hardcoded for now, could be calculated based on zones
		DeliveryAddressID: input.DeliveryAddressID,
		PaymentMethod:     models.PaymentMethod(input.PaymentMethod),
		PaymentStatus:     "PENDING",
		Items:             orderItems,
	}

	if err := tx.Create(&order).Error; err != nil {
		tx.Rollback()
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order"})
		return
	}

	tx.Commit()

	c.JSON(http.StatusCreated, gin.H{
		"message": "Order placed successfully",
		"order":   order,
	})
}

func GetUserOrders(c *gin.Context) {
	userID, _ := c.Get("user_id")

	id := uint(0)
	switch v := userID.(type) {
	case float64:
		id = uint(v)
	case uint:
		id = v
	}

	var orders []models.Order
	if err := database.DB.Preload("Items.Product").Where("user_id = ?", id).Find(&orders).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch orders"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": orders})
}

func AdminGetOrders(c *gin.Context) {
	var orders []models.Order
	if err := database.DB.Preload("Items.Product").Find(&orders).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch all orders"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": orders})
}

func AdminUpdateOrderStatus(c *gin.Context) {
	orderID := c.Param("id")
	var input struct {
		Status string `json:"status" binding:"required"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var order models.Order
	if err := database.DB.First(&order, orderID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Order not found"})
		return
	}

	order.Status = models.OrderStatus(input.Status)
	if err := database.DB.Save(&order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update order status"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Order status updated", "order": order})
}
