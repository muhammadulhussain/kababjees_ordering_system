from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.customers import Customer
from app.schemas.customers import CustomerOut, CustomerUpdate
from app.auth.auth import get_current_user   # IMPORTANT FIX

router = APIRouter(prefix="/customers", tags=["Customers"])


# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------------------------
#  Get Logged-in Customer
# ---------------------------
@router.get("/me", response_model=CustomerOut)
def get_me(current_user: Customer = Depends(get_current_user)):
    return current_user


# ---------------------------
#  Get Customer by ID
# ---------------------------
@router.get("/{customer_id}", response_model=CustomerOut)
def get_customer(customer_id: int, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.id == customer_id).first()

    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

    return customer


# ---------------------------
#  Update Customer Info
# ---------------------------
@router.put("/{customer_id}", response_model=CustomerOut)
def update_customer(
    customer_id: int,
    payload: CustomerUpdate,       # FIX → use schema
    db: Session = Depends(get_db)
):
    customer = db.query(Customer).filter(Customer.id == customer_id).first()

    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

    if payload.full_name is not None:
        customer.full_name = payload.full_name

    if payload.phone is not None:
        customer.phone = payload.phone

    db.commit()
    db.refresh(customer)
    return customer
