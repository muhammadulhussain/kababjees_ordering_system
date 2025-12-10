from sqlalchemy import Column, Integer, ForeignKey, DECIMAL, Enum, DateTime
from app.database import Base
from datetime import datetime

class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=False)
    total_amount = Column(DECIMAL(10,2), default=0)
    status = Column(Enum('pending','preparing','ready','delivered','cancelled'), default='pending')
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
