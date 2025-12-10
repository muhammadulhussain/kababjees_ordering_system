from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.orders import Order
from app.models.order_items import OrderItem
from app.models.menu_items import MenuItem
from app.schemas.orders import OrderCreate, OrderOut

router = APIRouter(prefix="/orders", tags=["Orders"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=OrderOut)
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    total_amount = 0
    for item in order.items:
        menu = db.query(MenuItem).filter(MenuItem.id==item.menu_item_id, MenuItem.is_active==True).first()
        if not menu:
            raise HTTPException(status_code=404, detail=f"Menu item {item.menu_item_id} not found")
        total_amount += menu.price * item.quantity

    db_order = Order(customer_id=order.customer_id, total_amount=total_amount)
    db.add(db_order)
    db.commit()
    db.refresh(db_order)

    for item in order.items:
        menu = db.query(MenuItem).filter(MenuItem.id==item.menu_item_id).first()
        order_item = OrderItem(
            order_id=db_order.id,
            menu_item_id=menu.id,
            quantity=item.quantity,
            unit_price=menu.price,
            total_price=menu.price * item.quantity
        )
        db.add(order_item)
    db.commit()
    return db_order
