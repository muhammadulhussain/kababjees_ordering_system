from sqlalchemy import Column, Integer, String, Text, DECIMAL, Boolean, DateTime
from app.database import Base
from datetime import datetime

class MenuItem(Base):
    __tablename__ = "menu_items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    description = Column(Text)
    price = Column(DECIMAL(10,2), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
