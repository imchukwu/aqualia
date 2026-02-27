package main

import (
	"log"
	"os"

	"aqualia-backend/database"
	"aqualia-backend/models"
	"aqualia-backend/routes"
	"aqualia-backend/seeder"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	// Load .env if it exists
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found; using environment variables.")
	}

	// Connect to Database
	database.ConnectDB()

	// Run seed if "seed" argument is provided
	if len(os.Args) > 1 && os.Args[1] == "seed" {
		seeder.Seed()
		return
	}

	// Auto-Migrate Models
	err = database.DB.AutoMigrate(
		&models.User{},
		&models.DistributorProfile{},
		&models.Address{},
		&models.Category{},
		&models.Product{},
		&models.ProductPricing{},
		&models.Order{},
		&models.OrderItem{},
		&models.Wallet{},
		&models.Transaction{},
	)
	if err != nil {
		log.Fatalf("Migration failed: %v", err)
	}

	app := gin.Default()

	// CORS Setup
	app.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Basic Route
	app.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "pong"})
	})

	// Setup API Routes
	apiGroup := app.Group("/api")
	routes.SetupAuthRoutes(apiGroup)
	routes.SetupAdminRoutes(apiGroup)
	routes.SetupProductRoutes(apiGroup)
	routes.SetupOrderRoutes(apiGroup)
	routes.SetupWalletRoutes(apiGroup)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	app.Run(":" + port)
}
