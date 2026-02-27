package routes

import (
	"aqualia-backend/controllers"
	"aqualia-backend/middleware"
	"aqualia-backend/models"

	"github.com/gin-gonic/gin"
)

func SetupOrderRoutes(router *gin.RouterGroup) {
	orderGroup := router.Group("/orders")
	orderGroup.Use(middleware.RequireAuth(), middleware.RequireActiveStatus())
	{
		orderGroup.POST("", controllers.CreateOrder)
		orderGroup.GET("", controllers.GetUserOrders)
	}

	adminOrderGroup := router.Group("/admin/orders")
	adminOrderGroup.Use(middleware.RequireAuth(), middleware.RequireRole(models.RoleAdmin))
	{
		adminOrderGroup.GET("", controllers.AdminGetOrders)
		adminOrderGroup.PATCH("/:id/status", controllers.AdminUpdateOrderStatus)
	}
}
