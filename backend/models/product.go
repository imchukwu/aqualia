package models

import (
	"time"

	"gorm.io/gorm"
)

type Category struct {
	ID          uint      `gorm:"primarykey" json:"id"`
	Name        string    `gorm:"size:100;not null" json:"name"`
	Description string    `json:"description"`
	Products    []Product `gorm:"foreignKey:CategoryID" json:"products,omitempty"`

	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type Product struct {
	ID                uint   `gorm:"primarykey" json:"id"`
	CategoryID        uint   `gorm:"not null" json:"category_id"`
	Name              string `gorm:"size:255;not null" json:"name"`
	SKU               string `gorm:"size:100;uniqueIndex;not null" json:"sku"`
	Description       string `gorm:"type:text" json:"description"`
	ImageURL          string `json:"image_url"`
	BaseUnit          string `gorm:"size:50;not null" json:"base_unit"` // e.g., "Bottle"
	UnitMultiplier    int    `gorm:"default:1" json:"unit_multiplier"`  // e.g., 12 for a carton
	StockQuantity     int    `gorm:"default:0" json:"stock_quantity"`   // Tracked at base unit level
	LowStockThreshold int    `gorm:"default:50" json:"low_stock_threshold"`
	Status            string `gorm:"size:50;default:'active'" json:"status"` // active, inactive

	Pricing ProductPricing `gorm:"foreignKey:ProductID" json:"pricing,omitempty"`

	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type ProductPricing struct {
	ID             uint    `gorm:"primarykey" json:"id"`
	ProductID      uint    `gorm:"uniqueIndex;not null" json:"product_id"`
	RetailPrice    float64 `gorm:"not null" json:"retail_price"`
	WholesalePrice float64 `gorm:"not null" json:"wholesale_price"`
	Tier1Price     float64 `gorm:"not null" json:"tier_1_price"`
	Tier2Price     float64 `gorm:"not null" json:"tier_2_price"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
