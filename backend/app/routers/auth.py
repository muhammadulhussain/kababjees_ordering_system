from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.customers import Customer
from app.schemas.customers import CustomerCreate, CustomerOut
from app.utils.auth import hash_password, verify_password

router = APIRouter(prefix="/auth", tags=["auth"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/register", response_model=CustomerOut)
def register_customer(customer: CustomerCreate, db: Session = Depends(get_db)):
    existing = db.query(Customer).filter(Customer.email == customer.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    db_customer = Customer(
        full_name=customer.full_name,
        email=customer.email,
        phone=customer.phone,
        password_hash=hash_password(customer.password)
    )
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer

@router.post("/login")
def login_customer(email: str, password: str, db: Session = Depends(get_db)):
    customer = db.query(Customer).filter(Customer.email == email).first()
    if not customer or not verify_password(password, customer.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"message": "Login successful", "customer_id": customer.id}
