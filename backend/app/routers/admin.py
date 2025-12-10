from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.admins import Admin
from app.models.orders import Order
from app.models.menu_items import MenuItem
from app.schemas.admins import AdminOut
from app.schemas.menu_items import MenuItemOut

router = APIRouter(prefix="/admin", tags=["Admin"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Get all orders (admin view)
@router.get("/orders", response_model=list[dict])
def get_all_orders(db: Session = Depends(get_db)):
    orders = db.query(Order).all()
    result = []
    for o in orders:
        result.append({
            "id": o.id,
            "customer_id": o.customer_id,
            "total_amount": float(o.total_amount),
            "status": o.status
        })
    return result

# Get all menu items
@router.get("/menu", response_model=list[MenuItemOut])
def get_menu(db: Session = Depends(get_db)):
    items = db.query(MenuItem).all()
    return items

# Update order status
@router.put("/orders/{order_id}")
def update_order_status(order_id: int, status: str, db: Session = Depends(get_db)):
    order = db.query(Order).filter(Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order.status = status
    db.commit()
    db.refresh(order)
    return {"message": f"Order {order_id} status updated to {status}"}
