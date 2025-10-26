from fastapi import APIRouter, HTTPException, status
from typing import List
from beanie import PydanticObjectId
from datetime import datetime

from app.models.user import User, Address
from app.schemas.user import UserCreate, UserUpdate, UserResponse, AddressSchema


router = APIRouter(prefix="/api/users", tags=["users"])


@router.get("/", response_model=List[UserResponse], status_code=status.HTTP_200_OK)
async def get_all_users():
    """Get all users from the database"""
    try:
        users = await User.find_all().to_list()
        return [
            UserResponse(
                id=str(user.id),
                name=user.name,
                email=user.email,
                phone=user.phone,
                company=user.company,
                address=AddressSchema(
                    street=user.address.street,
                    city=user.address.city,
                    zip=user.address.zip
                ),
                created_at=user.created_at,
                updated_at=user.updated_at
            )
            for user in users
        ]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching users: {str(e)}"
        )


@router.get("/{user_id}", response_model=UserResponse, status_code=status.HTTP_200_OK)
async def get_user_by_id(user_id: str):
    """Get a single user by ID"""
    try:
        if not PydanticObjectId.is_valid(user_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid user ID format"
            )
        
        user = await User.get(PydanticObjectId(user_id))
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"User with ID {user_id} not found"
            )
        
        return UserResponse(
            id=str(user.id),
            name=user.name,
            email=user.email,
            phone=user.phone,
            company=user.company,
            address=AddressSchema(
                street=user.address.street,
                city=user.address.city,
                zip=user.address.zip
            ),
            created_at=user.created_at,
            updated_at=user.updated_at
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error fetching user: {str(e)}"
        )


@router.post("/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(user_data: UserCreate):
    """Create a new user"""
    try:
        # Check if email already exists
        existing_user = await User.find_one(User.email == user_data.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email already exists"
            )
        
        # Create address embedded document
        address = Address(
            street=user_data.address.street,
            city=user_data.address.city,
            zip=user_data.address.zip
        )
        
        # Create user document
        user = User(
            name=user_data.name,
            email=user_data.email,
            phone=user_data.phone,
            company=user_data.company,
            address=address
        )
        
        await user.insert()
        
        return UserResponse(
            id=str(user.id),
            name=user.name,
            email=user.email,
            phone=user.phone,
            company=user.company,
            address=AddressSchema(
                street=user.address.street,
                city=user.address.city,
                zip=user.address.zip
            ),
            created_at=user.created_at,
            updated_at=user.updated_at
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error creating user: {str(e)}"
        )


@router.put("/{user_id}", response_model=UserResponse, status_code=status.HTTP_200_OK)
async def update_user(user_id: str, user_data: UserUpdate):
    """Update a user's details"""
    try:
        if not PydanticObjectId.is_valid(user_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid user ID format"
            )
        
        user = await User.get(PydanticObjectId(user_id))
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"User with ID {user_id} not found"
            )
        
        # Check if email is being updated and if it already exists
        if user_data.email and user_data.email != user.email:
            existing_user = await User.find_one(User.email == user_data.email)
            if existing_user:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="User with this email already exists"
                )
        
        # Update fields
        update_data = user_data.model_dump(exclude_unset=True)
        
        if "address" in update_data and update_data["address"]:
            address_data = update_data.pop("address")
            user.address = Address(**address_data)
        
        for field, value in update_data.items():
            setattr(user, field, value)
        
        user.updated_at = datetime.utcnow()
        await user.save()
        
        return UserResponse(
            id=str(user.id),
            name=user.name,
            email=user.email,
            phone=user.phone,
            company=user.company,
            address=AddressSchema(
                street=user.address.street,
                city=user.address.city,
                zip=user.address.zip
            ),
            created_at=user.created_at,
            updated_at=user.updated_at
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error updating user: {str(e)}"
        )


@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(user_id: str):
    """Delete a user"""
    try:
        if not PydanticObjectId.is_valid(user_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid user ID format"
            )
        
        user = await User.get(PydanticObjectId(user_id))
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"User with ID {user_id} not found"
            )
        
        await user.delete()
        return None
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error deleting user: {str(e)}"
        )