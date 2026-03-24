package seeder

import (
	"log"

	"aqualia-backend/database"
	"aqualia-backend/models"

	"github.com/joho/godotenv"
)

func Seed() {
	godotenv.Load()
	database.ConnectDB()

	// Clear old data to prevent duplicates
	database.DB.Exec("TRUNCATE TABLE product_pricings, order_items, products, categories CASCADE")

	// 1. Create Categories
	categories := []models.Category{
		{Name: "Sachet Water", Description: "Pure 50cl sachet drinking water"},
		{Name: "Bottle Water", Description: "Premium bottled drinking water (50cl, 75cl, 1.5L)"},
		{Name: "Dispenser Bottles", Description: "20L dispenser jar"},
	}

	for i, c := range categories {
		database.DB.Where("name = ?", c.Name).FirstOrCreate(&categories[i])
	}
	log.Println("Categories seeded successfully!")

	// 2. Create Products
	products := []models.Product{
		{
			CategoryID:        categories[0].ID,
			Name:              "Sachet Water (50cl)",
			SKU:               "AQ-SACHET-50",
			Description:       "Pure drinking water in convenient 50cl sachets.",
			ImageURL:          "/images/products/sachet_water.png",
			BaseUnit:          "Sachet",
			UnitMultiplier:    1,
			StockQuantity:     10000,
			LowStockThreshold: 500,
			Status:            "active",
		},
		{
			CategoryID:        categories[1].ID,
			Name:              "Bottle Water (50cl)",
			SKU:               "AQ-BTL-50",
			Description:       "Premium 50cl bottled water.",
			ImageURL:          "/images/products/bottle_50cl.png",
			BaseUnit:          "Bottle",
			UnitMultiplier:    1,
			StockQuantity:     5000,
			LowStockThreshold: 200,
			Status:            "active",
		},
		{
			CategoryID:        categories[1].ID,
			Name:              "Bottle Water (75cl)",
			SKU:               "AQ-BTL-75",
			Description:       "Premium 75cl bottled water.",
			ImageURL:          "/images/products/bottle_75cl.png",
			BaseUnit:          "Bottle",
			UnitMultiplier:    1,
			StockQuantity:     3000,
			LowStockThreshold: 100,
			Status:            "active",
		},
		{
			CategoryID:        categories[1].ID,
			Name:              "Bottle Water (1.5L)",
			SKU:               "AQ-BTL-150",
			Description:       "Premium 1.5L bottled water.",
			ImageURL:          "/images/products/bottle_150cl.png",
			BaseUnit:          "Bottle",
			UnitMultiplier:    1,
			StockQuantity:     2000,
			LowStockThreshold: 100,
			Status:            "active",
		},
		{
			CategoryID:        categories[2].ID,
			Name:              "Dispenser Bottles (20L)",
			SKU:               "AQ-DISP-20L",
			Description:       "20-Liter refillable dispenser bottle.",
			ImageURL:          "/images/products/dispenser.png",
			BaseUnit:          "Bottle",
			UnitMultiplier:    1,
			StockQuantity:     500,
			LowStockThreshold: 50,
			Status:            "active",
		},
	}

	for i, p := range products {
		database.DB.Where("sku = ?", p.SKU).FirstOrCreate(&products[i])
	}
	log.Println("Products seeded successfully!")

	// 3. Create Pricing for Products
	pricings := []models.ProductPricing{
		{
			ProductID:      products[0].ID, // Sachet 50cl
			RetailPrice:    30.0,
			WholesalePrice: 25.0,
			Tier1Price:     24.0,
			Tier2Price:     23.0,
		},
		{
			ProductID:      products[1].ID, // 50cl Btl
			RetailPrice:    150.0,
			WholesalePrice: 120.0,
			Tier1Price:     115.0,
			Tier2Price:     110.0,
		},
		{
			ProductID:      products[2].ID, // 75cl Btl
			RetailPrice:    200.0,
			WholesalePrice: 160.0,
			Tier1Price:     150.0,
			Tier2Price:     140.0,
		},
		{
			ProductID:      products[3].ID, // 1.5L Btl
			RetailPrice:    350.0,
			WholesalePrice: 300.0,
			Tier1Price:     280.0,
			Tier2Price:     250.0,
		},
		{
			ProductID:      products[4].ID, // 20L Dispenser
			RetailPrice:    1200.0,
			WholesalePrice: 1000.0,
			Tier1Price:     950.0,
			Tier2Price:     900.0,
		},
	}

	for i, price := range pricings {
		database.DB.Where("product_id = ?", price.ProductID).FirstOrCreate(&pricings[i])
	}
	log.Println("Product Pricing seeded successfully!")
}
