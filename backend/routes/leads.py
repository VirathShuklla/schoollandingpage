from fastapi import APIRouter, HTTPException, status
from motor.motor_asyncio import AsyncIOMotorClient
from models import LeadCreate, Lead, LeadResponse, LeadUpdate
from services.email_service import send_lead_notification, send_lead_confirmation
from typing import List
import os
import logging

# Setup logging
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ.get('MONGO_URL')
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ.get('DB_NAME', 'arctrack_db')]

router = APIRouter(prefix="/leads", tags=["leads"])

@router.post("", response_model=LeadResponse, status_code=status.HTTP_201_CREATED)
async def create_lead(lead_data: LeadCreate):
    """
    Create a new lead from the website form
    """
    try:
        # Create lead object
        lead = Lead(**lead_data.dict())
        
        # Convert to dict for MongoDB
        lead_dict = lead.dict()
        
        # Insert into database
        result = await db.leads.insert_one(lead_dict)
        
        if not result.inserted_id:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create lead"
            )
        
        logger.info(f"New lead created: {lead.id} - {lead.schoolName}")
        
        # Send email notifications (async, non-blocking)
        try:
            send_lead_notification(lead_dict)
            send_lead_confirmation(lead_dict)
            logger.info(f"Email notifications sent for lead {lead.id}")
        except Exception as email_error:
            logger.warning(f"Email notification failed for lead {lead.id}: {str(email_error)}")
            # Continue even if email fails
        
        # Return response
        return LeadResponse(
            id=lead.id,
            schoolName=lead.schoolName,
            studentStrength=lead.studentStrength,
            city=lead.city,
            contactName=lead.contactName,
            email=lead.email,
            phone=lead.phone,
            status=lead.status,
            createdAt=lead.createdAt
        )
    
    except Exception as e:
        logger.error(f"Error creating lead: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating lead: {str(e)}"
        )

@router.get("", response_model=List[LeadResponse])
async def get_all_leads(skip: int = 0, limit: int = 100):
    """
    Get all leads (for admin dashboard)
    """
    try:
        leads = await db.leads.find().sort("createdAt", -1).skip(skip).limit(limit).to_list(length=limit)
        
        return [
            LeadResponse(
                id=lead["id"],
                schoolName=lead["schoolName"],
                studentStrength=lead["studentStrength"],
                city=lead["city"],
                contactName=lead["contactName"],
                email=lead["email"],
                phone=lead["phone"],
                status=lead.get("status", "New"),
                createdAt=lead["createdAt"]
            )
            for lead in leads
        ]
    
    except Exception as e:
        logger.error(f"Error fetching leads: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching leads: {str(e)}"
        )

@router.get("/{lead_id}", response_model=LeadResponse)
async def get_lead(lead_id: str):
    """
    Get a single lead by ID
    """
    try:
        lead = await db.leads.find_one({"id": lead_id})
        
        if not lead:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Lead with ID {lead_id} not found"
            )
        
        return LeadResponse(
            id=lead["id"],
            schoolName=lead["schoolName"],
            studentStrength=lead["studentStrength"],
            city=lead["city"],
            contactName=lead["contactName"],
            email=lead["email"],
            phone=lead["phone"],
            status=lead.get("status", "New"),
            createdAt=lead["createdAt"]
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching lead {lead_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching lead: {str(e)}"
        )

@router.patch("/{lead_id}", response_model=LeadResponse)
async def update_lead(lead_id: str, lead_update: LeadUpdate):
    """
    Update lead status or add notes
    """
    try:
        # Find existing lead
        existing_lead = await db.leads.find_one({"id": lead_id})
        
        if not existing_lead:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Lead with ID {lead_id} not found"
            )
        
        # Prepare update data
        update_data = {k: v for k, v in lead_update.dict().items() if v is not None}
        
        if not update_data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No update data provided"
            )
        
        # Add updated timestamp
        from datetime import datetime
        update_data["updatedAt"] = datetime.utcnow()
        
        # Update in database
        result = await db.leads.update_one(
            {"id": lead_id},
            {"$set": update_data}
        )
        
        if result.modified_count == 0:
            logger.warning(f"No changes made to lead {lead_id}")
        
        # Fetch and return updated lead
        updated_lead = await db.leads.find_one({"id": lead_id})
        
        return LeadResponse(
            id=updated_lead["id"],
            schoolName=updated_lead["schoolName"],
            studentStrength=updated_lead["studentStrength"],
            city=updated_lead["city"],
            contactName=updated_lead["contactName"],
            email=updated_lead["email"],
            phone=updated_lead["phone"],
            status=updated_lead.get("status", "New"),
            createdAt=updated_lead["createdAt"]
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error updating lead {lead_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating lead: {str(e)}"
        )

@router.delete("/{lead_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_lead(lead_id: str):
    """
    Delete a lead (admin only)
    """
    try:
        result = await db.leads.delete_one({"id": lead_id})
        
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Lead with ID {lead_id} not found"
            )
        
        logger.info(f"Lead deleted: {lead_id}")
        return None
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error deleting lead {lead_id}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting lead: {str(e)}"
        )
