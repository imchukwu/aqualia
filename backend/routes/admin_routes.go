package routes

import (
	"aqualia-backend/controllers"
	"aqualia-backend/middleware"
	"aqualia-backend/models"

	"github.com/gin-gonic/gin"
)

func SetupAdminRoutes(router *gin.RouterGroup) {
	adminGroup := router.Group("/admin")

	// Apply authentication and ADMIN role requirement
	adminGroup.Use(middleware.RequireAuth())
	adminGroup.Use(middleware.RequireRole(models.RoleAdmin))

	{
		adminGroup.GET("/distributors/pending", controllers.GetPendingDistributors)
		adminGroup.PATCH("/distributors/:id/approve", controllers.ApproveDistributor)
		adminGroup.PATCH("/distributors/:id/reject", controllers.RejectDistributor)
		adminGroup.GET("/users", controllers.GetAllUsers)
	}
}
