package controllers

import (
	"net/http"

	"aqualia-backend/database"
	"aqualia-backend/models"

	"github.com/gin-gonic/gin"
)

// Categories
func CreateCategory(c *gin.Context) {
	var category models.Category
	if err := c.ShouldBindJSON(&category); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := database.DB.Create(&category).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create category"})
		return
	}

	c.JSON(http.StatusCreated, category)
}

func GetCategories(c *gin.Context) {
	var categories []models.Category
	if err := database.DB.Find(&categories).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch categories"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": categories})
}

// Products
type CreateProductInput struct {
	CategoryID        uint   `json:"category_id" binding:"required"`
	Name              string `json:"name" binding:"required"`
	SKU               string `json:"sku" binding:"required"`
	Description       string `json:"description"`
	ImageURL          string `json:"image_url"`
	BaseUnit          string `json:"base_unit" binding:"required"`
	UnitMultiplier    int    `json:"unit_multiplier"`
	StockQuantity     int    `json:"stock_quantity"`
	LowStockThreshold int    `json:"low_stock_threshold"`

	RetailPrice    float64 `json:"retail_price" binding:"required"`
	WholesalePrice float64 `json:"wholesale_price" binding:"required"`
	Tier1Price     float64 `json:"tier_1_price" binding:"required"`
	Tier2Price     float64 `json:"tier_2_price" binding:"required"`
}

func CreateProduct(c *gin.Context) {
	var input CreateProductInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	multiplier := input.UnitMultiplier
	if multiplier <= 0 {
		multiplier = 1
	}

	product := models.Product{
		CategoryID:        input.CategoryID,
		Name:              input.Name,
		SKU:               input.SKU,
		Description:       input.Description,
		ImageURL:          input.ImageURL,
		BaseUnit:          input.BaseUnit,
		UnitMultiplier:    multiplier,
		StockQuantity:     input.StockQuantity,
		LowStockThreshold: input.LowStockThreshold,
		Status:            "active",
		Pricing: models.ProductPricing{
			RetailPrice:    input.RetailPrice,
			WholesalePrice: input.WholesalePrice,
			Tier1Price:     input.Tier1Price,
			Tier2Price:     input.Tier2Price,
		},
	}

	if err := database.DB.Create(&product).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create product"})
		return
	}

	c.JSON(http.StatusCreated, product)
}

func GetProducts(c *gin.Context) {
	var products []models.Product
	if err := database.DB.Preload("Pricing").Find(&products).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch products"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": products})
}

func GetProduct(c *gin.Context) {
	id := c.Param("id")
	var product models.Product
	if err := database.DB.Preload("Pricing").First(&product, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		return
	}

	c.JSON(http.StatusOK, product)
}

func AdjustStock(c *gin.Context) {
	id := c.Param("id")
	var input struct {
		Quantity int `json:"quantity"` // Can be negative for manual deduction
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var product models.Product
	if err := database.DB.First(&product, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Product not found"})
		return
	}

	product.StockQuantity += input.Quantity
	if product.StockQuantity < 0 {
		product.StockQuantity = 0
	}

	if err := database.DB.Save(&product).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update stock"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Stock adjusted", "new_quantity": product.StockQuantity})
}

// B2B Pricing Logic helper (If requested from frontend specifically)
func GetPricingForUser(c *gin.Context) {
	productID := c.Param("id")
	var pricing models.ProductPricing
	if err := database.DB.Where("product_id = ?", productID).First(&pricing).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Pricing not found"})
		return
	}

	role, exists := c.Get("role")
	if exists && role.(string) == string(models.RoleDistributor) {
		c.JSON(http.StatusOK, gin.H{"price": pricing.WholesalePrice, "type": "wholesale"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"price": pricing.RetailPrice, "type": "retail"})
}
