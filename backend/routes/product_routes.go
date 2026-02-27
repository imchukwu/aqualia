package routes

import (
	"aqualia-backend/controllers"
	"aqualia-backend/middleware"
	"aqualia-backend/models"

	"github.com/gin-gonic/gin"
)

func SetupProductRoutes(router *gin.RouterGroup) {
	productGroup := router.Group("/products")
	{
		// Public Routes
		productGroup.GET("", controllers.GetProducts)
		productGroup.GET("/:id", controllers.GetProduct)
		productGroup.GET("/categories", controllers.GetCategories)

		// Protected Routes (Users requesting price check)
		productGroup.GET("/:id/price", middleware.RequireAuth(), controllers.GetPricingForUser)
	}

	// Admin Only Routes
	adminProductGroup := router.Group("/admin/products")
	adminProductGroup.Use(middleware.RequireAuth(), middleware.RequireRole(models.RoleAdmin))
	{
		adminProductGroup.POST("", controllers.CreateProduct)
		adminProductGroup.POST("/categories", controllers.CreateCategory)
		adminProductGroup.PATCH("/:id/stock", controllers.AdjustStock)
	}
}
