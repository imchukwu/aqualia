package models

import (
	"time"

	"gorm.io/gorm"
)

type Role string

const (
	RoleAdmin       Role = "ADMIN"
	RoleRetail      Role = "RETAIL"
	RoleDistributor Role = "DISTRIBUTOR"
)

type UserStatus string

const (
	StatusPending  UserStatus = "PENDING"
	StatusApproved UserStatus = "APPROVED"
	StatusRejected UserStatus = "REJECTED"
)

type User struct {
	ID           uint       `gorm:"primarykey" json:"id"`
	Name         string     `gorm:"size:255;not null" json:"name"`
	Email        string     `gorm:"size:255;not null;uniqueIndex" json:"email"`
	Phone        string     `gorm:"size:20;uniqueIndex" json:"phone"`
	PasswordHash string     `gorm:"not null" json:"-"`
	Role         Role       `gorm:"type:string;default:'RETAIL'" json:"role"`
	Status       UserStatus `gorm:"type:string;default:'APPROVED'" json:"status"`

	// Relationships
	DistributorProfile *DistributorProfile `gorm:"foreignKey:UserID" json:"distributor_profile,omitempty"`
	Addresses          []Address           `gorm:"foreignKey:UserID" json:"addresses,omitempty"`
	Orders             []Order             `gorm:"foreignKey:UserID" json:"orders,omitempty"`
	Wallet             *Wallet             `gorm:"foreignKey:UserID" json:"wallet,omitempty"`

	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
}

type DistributorProfile struct {
	ID                 uint    `gorm:"primarykey" json:"id"`
	UserID             uint    `gorm:"uniqueIndex;not null" json:"user_id"`
	BusinessName       string  `gorm:"size:255;not null" json:"business_name"`
	RegistrationNumber string  `gorm:"size:100;not null" json:"registration_number"`
	TaxID              string  `gorm:"size:100" json:"tax_id"`
	TierLevel          int     `gorm:"default:1" json:"tier_level"`
	CreditLimit        float64 `gorm:"default:0" json:"credit_limit"`
	CreditBalance      float64 `gorm:"default:0" json:"credit_balance"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type AddressType string

const (
	AddressHome      AddressType = "HOME"
	AddressBusiness  AddressType = "BUSINESS"
	AddressWarehouse AddressType = "WAREHOUSE"
)

type Address struct {
	ID          uint        `gorm:"primarykey" json:"id"`
	UserID      uint        `gorm:"not null" json:"user_id"`
	Type        AddressType `gorm:"type:string;default:'HOME'" json:"type"`
	AddressLine string      `gorm:"not null" json:"address_line"`
	City        string      `gorm:"not null" json:"city"`
	State       string      `gorm:"not null" json:"state"`
	IsDefault   bool        `gorm:"default:false" json:"is_default"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Wallet struct {
	ID      uint    `gorm:"primarykey" json:"id"`
	UserID  uint    `gorm:"uniqueIndex;not null" json:"user_id"`
	Balance float64 `gorm:"default:0" json:"balance"`

	Transactions []Transaction `gorm:"foreignKey:WalletID" json:"transactions,omitempty"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type TransactionType string

const (
	TxnCredit TransactionType = "CREDIT"
	TxnDebit  TransactionType = "DEBIT"
)

type Transaction struct {
	ID          uint            `gorm:"primarykey" json:"id"`
	WalletID    uint            `gorm:"not null;index" json:"wallet_id"`
	Amount      float64         `gorm:"not null" json:"amount"`
	Type        TransactionType `gorm:"type:string;not null" json:"type"`
	Reference   string          `gorm:"size:255;uniqueIndex;not null" json:"reference"`
	Description string          `gorm:"size:255" json:"description"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
