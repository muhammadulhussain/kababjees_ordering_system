from pydantic import BaseModel
from typing import Optional

class MenuItemCreate(BaseModel):
    name: str
    description: Optional[str]
    price: float
    is_active: Optional[bool] = True

class MenuItemOut(BaseModel):
    id: int
    name: str
    description: Optional[str]
    price: float
    is_active: bool

    class Config:
        orm_mode = True
