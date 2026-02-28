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

	// Load .env locally (Render ignores this safely)
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found; using system environment variables")
	}

	// Connect database
	database.ConnectDB()

	// Optional seeding command
	if len(os.Args) > 1 && os.Args[1] == "seed" {
		seeder.Seed()
		log.Println("Database seeded successfully")
		return
	}

	// Auto migrate
	err := database.DB.AutoMigrate(
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

	// Set Gin mode for production
	if os.Getenv("RENDER") != "" {
		gin.SetMode(gin.ReleaseMode)
	}

	app := gin.Default()

	// CORS
	app.Use(cors.New(cors.Config{
		AllowAllOrigins: true,
		AllowMethods: []string{
			"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS",
		},
		AllowHeaders: []string{
			"Origin", "Content-Type", "Authorization", "Accept",
		},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	// Health check
	app.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	// API routes
	api := app.Group("/api")
	routes.SetupAuthRoutes(api)
	routes.SetupAdminRoutes(api)
	routes.SetupProductRoutes(api)
	routes.SetupOrderRoutes(api)
	routes.SetupWalletRoutes(api)

	// Render provides PORT automatically
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Println("Server running on port", port)

	err = app.Run(":" + port)
	if err != nil {
		log.Fatal(err)
	}
}
