package routes

import (
	"aqualia-backend/controllers"
	"aqualia-backend/middleware"

	"github.com/gin-gonic/gin"
)

func SetupWalletRoutes(router *gin.RouterGroup) {
	walletGroup := router.Group("/wallet")

	// Ensure user is authenticated to fetch their wallet
	walletGroup.Use(middleware.RequireAuth())
	{
		walletGroup.GET("/", controllers.GetWallet)
		walletGroup.POST("/mock-fund", controllers.MockFund) // TODO: Remove in Production
		walletGroup.POST("/fund/verify", controllers.VerifyWalletFunding)
	}
}
