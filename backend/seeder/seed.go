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

	// 1. Create Categories
	categories := []models.Category{
		{Name: "Sachet Water", Description: "Pure 50cl sachet drinking water"},
		{Name: "Bottled Water", Description: "Premium bottled drinking water"},
		{Name: "Dispensers", Description: "Water dispensers and large bottles"},
	}

	for i, c := range categories {
		database.DB.Where("name = ?", c.Name).FirstOrCreate(&categories[i])
	}
	log.Println("Categories seeded successfully!")

	// 2. Create Products
	products := []models.Product{
		{
			CategoryID:        categories[0].ID,
			Name:              "Aqualia Sachet Water (Bag)",
			SKU:               "AQ-SACHET-BAG",
			Description:       "A bag containing 20 sachets of 50cl pure drinking water.",
			ImageURL:          "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=800&auto=format&fit=crop&q=60",
			BaseUnit:          "Sachet",
			UnitMultiplier:    20, // 20 sachets in a bag
			StockQuantity:     10000,
			LowStockThreshold: 500,
			Status:            "active",
		},
		{
			CategoryID:        categories[1].ID,
			Name:              "Aqualia Bottled Water 50cl (Pack)",
			SKU:               "AQ-BTL-50-PACK",
			Description:       "A pack of 12 premium 50cl bottled water.",
			ImageURL:          "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=800&auto=format&fit=crop&q=60",
			BaseUnit:          "Bottle",
			UnitMultiplier:    12, // 12 bottles in a pack
			StockQuantity:     5000,
			LowStockThreshold: 200,
			Status:            "active",
		},
		{
			CategoryID:        categories[1].ID,
			Name:              "Aqualia Bottled Water 75cl (Pack)",
			SKU:               "AQ-BTL-75-PACK",
			Description:       "A pack of 12 premium 75cl bottled water.",
			ImageURL:          "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=800&auto=format&fit=crop&q=60",
			BaseUnit:          "Bottle",
			UnitMultiplier:    12, // 12 bottles in a pack
			StockQuantity:     3000,
			LowStockThreshold: 100,
			Status:            "active",
		},
		{
			CategoryID:        categories[2].ID,
			Name:              "Aqualia Dispenser Bottle 19L",
			SKU:               "AQ-DISP-19L",
			Description:       "19-Liter refillable dispenser bottle.",
			ImageURL:          "https://images.unsplash.com/photo-1559839914-11aabe544ec8?w=800&auto=format&fit=crop&q=60",
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
			ProductID:      products[0].ID, // Sachet Bag
			RetailPrice:    300.0,
			WholesalePrice: 250.0,
			Tier1Price:     240.0,
			Tier2Price:     230.0,
		},
		{
			ProductID:      products[1].ID, // 50cl Pack
			RetailPrice:    1500.0,
			WholesalePrice: 1200.0,
			Tier1Price:     1150.0,
			Tier2Price:     1100.0,
		},
		{
			ProductID:      products[2].ID, // 75cl Pack
			RetailPrice:    2000.0,
			WholesalePrice: 1600.0,
			Tier1Price:     1500.0,
			Tier2Price:     1400.0,
		},
		{
			ProductID:      products[3].ID, // 19L Dispenser
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
