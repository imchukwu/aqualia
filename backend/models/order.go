package models

import (
	"time"

	"gorm.io/gorm"
)

type OrderStatus string

const (
	OrderPending    OrderStatus = "PENDING"
	OrderConfirmed  OrderStatus = "CONFIRMED"
	OrderProcessing OrderStatus = "PROCESSING"
	OrderDelivered  OrderStatus = "DELIVERED"
	OrderCancelled  OrderStatus = "CANCELLED"
)

type PaymentMethod string

const (
	PaymentCard     PaymentMethod = "CARD"
	PaymentTransfer PaymentMethod = "TRANSFER"
	PaymentWallet   PaymentMethod = "WALLET"
	PaymentCOD      PaymentMethod = "COD"
	PaymentCredit   PaymentMethod = "CREDIT" // B2B specific
)

type Order struct {
	ID                uint          `gorm:"primarykey" json:"id"`
	UserID            uint          `gorm:"not null" json:"user_id"`
	Status            OrderStatus   `gorm:"type:string;default:'PENDING'" json:"status"`
	TotalAmount       float64       `gorm:"not null" json:"total_amount"`
	DeliveryFee       float64       `gorm:"default:0" json:"delivery_fee"`
	DeliveryAddressID uint          `json:"delivery_address_id"`
	PaymentMethod     PaymentMethod `gorm:"type:string;not null" json:"payment_method"`
	PaymentStatus     string        `gorm:"type:string;default:'PENDING'" json:"payment_status"` // PENDING, PAID, FAILED

	Items []OrderItem `gorm:"foreignKey:OrderID" json:"items,omitempty"`

	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type OrderItem struct {
	ID           uint    `gorm:"primarykey" json:"id"`
	OrderID      uint    `gorm:"not null" json:"order_id"`
	ProductID    uint    `gorm:"not null" json:"product_id"`
	Quantity     int     `gorm:"not null" json:"quantity"`      // Number of user-selected units
	BaseQuantity int     `gorm:"not null" json:"base_quantity"` // Total base units effectively ordered (calculated via Product.UnitMultiplier)
	PriceApplied float64 `gorm:"not null" json:"price_applied"`

	Product Product `gorm:"foreignKey:ProductID" json:"product,omitempty"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
