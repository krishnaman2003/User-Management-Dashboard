from pydantic import BaseModel, Field, EmailStr
from typing import Optional
from datetime import datetime


class AddressSchema(BaseModel):
    """Address schema for requests/responses"""
    street: str = Field(..., min_length=1, max_length=200)
    city: str = Field(..., min_length=1, max_length=100)
    zip: str = Field(..., min_length=3, max_length=10)

    class Config:
        json_schema_extra = {
            "example": {
                "street": "123 Main St",
                "city": "New York",
                "zip": "10001"
            }
        }


class UserCreate(BaseModel):
    """Schema for creating a new user"""
    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=15)
    company: str = Field(..., min_length=1, max_length=100)
    address: AddressSchema

    class Config:
        json_schema_extra = {
            "example": {
                "name": "John Doe",
                "email": "john@example.com",
                "phone": "1234567890",
                "company": "Acme Corp",
                "address": {
                    "street": "123 Main St",
                    "city": "New York",
                    "zip": "10001"
                }
            }
        }


class UserUpdate(BaseModel):
    """Schema for updating a user"""
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    email: Optional[EmailStr] = None
    phone: Optional[str] = Field(None, min_length=10, max_length=15)
    company: Optional[str] = Field(None, min_length=1, max_length=100)
    address: Optional[AddressSchema] = None


class UserResponse(BaseModel):
    """Schema for user response"""
    id: str
    name: str
    email: str
    phone: str
    company: str
    address: AddressSchema
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True