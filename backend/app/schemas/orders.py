from pydantic import BaseModel
from typing import List
from .order_items import OrderItemCreate, OrderItemOut

class OrderCreate(BaseModel):
    customer_id: int
    items: List[OrderItemCreate]

class OrderOut(BaseModel):
    id: int
    customer_id: int
    total_amount: float
    status: str
    items: List[OrderItemOut] = []

    class Config:
        orm_mode = True
