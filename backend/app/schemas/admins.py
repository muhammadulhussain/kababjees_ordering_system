from pydantic import BaseModel

class AdminCreate(BaseModel):
    username: str
    password: str
    role: str

class AdminOut(BaseModel):
    id: int
    username: str
    role: str

    class Config:
        orm_mode = True
