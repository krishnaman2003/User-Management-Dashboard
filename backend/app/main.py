from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from typing import Any, cast
from motor.motor_asyncio import AsyncIOMotorClient
from beanie import init_beanie
import os
from dotenv import load_dotenv

from app.models.user import User
from app.routers import users

# Load environment variables
load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize database connection on startup and close on shutdown"""
    # Startup
    mongodb_uri = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    database_name = os.getenv("DATABASE_NAME", "user_management_db")
    client = AsyncIOMotorClient(mongodb_uri)
    database = client[database_name]
    
    # beanie's typing may not recognise AsyncIOMotorDatabase; cast to Any to satisfy type checkers
    await init_beanie(database=cast(Any, database), document_models=[User])
    
    print("✅ Connected to MongoDB")
    
    yield
    
    # Shutdown
    client.close()
    print("❌ Disconnected from MongoDB")
    print("❌ Disconnected from MongoDB")


app = FastAPI(
    title="User Management API",
    description="RESTful API for managing users",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to User Management API",
        "docs": "/docs",
        "redoc": "/redoc"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}