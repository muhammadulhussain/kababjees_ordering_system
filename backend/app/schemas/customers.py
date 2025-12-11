from pydantic import BaseModel, EmailStr
from typing import Optional

# ----------------------------
# Customer registration
# ----------------------------
class CustomerCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    phone: Optional[str] = None

# ----------------------------
# Customer login
# ----------------------------
class CustomerLogin(BaseModel):
    email: EmailStr
    password: str

# ----------------------------
# Customer output
# ----------------------------
class CustomerOut(BaseModel):
    id: int
    full_name: str
    email: str
    phone: Optional[str]

    class Config:
        from_attributes = True

# ----------------------------
# Customer update
# ----------------------------
class CustomerUpdate(BaseModel):
    full_name: Optional[str] = None
    phone: Optional[str] = None
