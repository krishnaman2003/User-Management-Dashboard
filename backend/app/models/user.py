from beanie import Document
from pydantic import Field, BaseModel
from typing import Optional
from datetime import datetime


class Address(BaseModel):
    """Embedded address document"""
    street: str
    city: str
    zip: str


class User(Document):
    """User document model for MongoDB"""
    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., pattern=r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
    phone: str = Field(..., min_length=10, max_length=15)
    company: str = Field(..., min_length=1, max_length=100)
    address: Address
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Settings:
        name = "users"
        use_state_management = True
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