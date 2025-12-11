from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.customers import Customer
from app.schemas.customers import CustomerOut, CustomerUpdate
from app.utils.auth import get_current_user, get_db

router = APIRouter(prefix="/customers", tags=["Customers"])

@router.get("/me", response_model=CustomerOut)
def get_me(current_user: Customer = Depends(get_current_user)):
    return current_user
