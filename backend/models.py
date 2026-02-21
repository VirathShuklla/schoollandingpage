from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
import uuid

# Lead Models
class LeadCreate(BaseModel):
    schoolName: str = Field(..., min_length=2, max_length=255)
    studentStrength: str
    city: str
    contactName: str = Field(..., min_length=2, max_length=255)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=10)
    source: str = Field(default="Website Form")

class Lead(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    schoolName: str
    studentStrength: str
    city: str
    contactName: str
    email: str
    phone: str
    source: str
    status: str = Field(default="New")
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_schema_extra = {
            "example": {
                "id": "123e4567-e89b-12d3-a456-426614174000",
                "schoolName": "St. Mary's High School",
                "studentStrength": "801-1200",
                "city": "Mumbai",
                "contactName": "Rajesh Kumar",
                "email": "rajesh@stmarys.edu",
                "phone": "9876543210",
                "source": "Website Form",
                "status": "New",
                "createdAt": "2024-01-15T10:30:00",
                "updatedAt": "2024-01-15T10:30:00"
            }
        }

class LeadResponse(BaseModel):
    id: str
    schoolName: str
    studentStrength: str
    city: str
    contactName: str
    email: str
    phone: str
    status: str
    createdAt: datetime

class LeadUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None
