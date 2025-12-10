from pydantic import BaseModel
from typing import Optional


class CustomerOut(BaseModel):
    id: int
    full_name: str
    email: str
    phone: Optional[str]

    class Config:
        orm_mode = True


class CustomerUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
