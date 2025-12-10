from sqlalchemy import Column, Integer, String, Enum, DateTime
from app.database import Base
from datetime import datetime

class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), nullable=False, unique=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(Enum('admin','staff'), default='staff')
    created_at = Column(DateTime, default=datetime.utcnow)
