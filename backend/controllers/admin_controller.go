package controllers

import (
	"net/http"

	"aqualia-backend/database"
	"aqualia-backend/models"

	"github.com/gin-gonic/gin"
)

func ApproveDistributor(c *gin.Context) {
	userID := c.Param("id")

	var user models.User
	if err := database.DB.Preload("DistributorProfile").First(&user, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	if user.Role != models.RoleDistributor {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User is not a distributor"})
		return
	}

	if user.Status == models.StatusApproved {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Distributor is already approved"})
		return
	}

	user.Status = models.StatusApproved
	if err := database.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to approve distributor"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Distributor approved successfully"})
}

func RejectDistributor(c *gin.Context) {
	userID := c.Param("id")

	var user models.User
	if err := database.DB.First(&user, userID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	if user.Role != models.RoleDistributor {
		c.JSON(http.StatusBadRequest, gin.H{"error": "User is not a distributor"})
		return
	}

	user.Status = models.StatusRejected
	if err := database.DB.Save(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to reject distributor"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Distributor rejected successfully"})
}

func GetPendingDistributors(c *gin.Context) {
	var users []models.User
	if err := database.DB.Preload("DistributorProfile").Where("role = ? AND status = ?", models.RoleDistributor, models.StatusPending).Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch pending distributors"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": users})
}

func GetAllUsers(c *gin.Context) {
	var users []models.User
	if err := database.DB.Select("id", "name", "email", "phone", "role", "status", "created_at").Find(&users).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch users"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": users})
}
