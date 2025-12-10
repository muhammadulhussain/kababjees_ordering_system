from pydantic import BaseModel

class OrderItemCreate(BaseModel):
    menu_item_id: int
    quantity: int

class OrderItemOut(BaseModel):
    id: int
    order_id: int
    menu_item_id: int
    quantity: int
    unit_price: float
    total_price: float

    class Config:
        orm_mode = True
