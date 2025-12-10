from sqlalchemy import Column, Integer, ForeignKey, Text, Enum, DateTime
from app.database import Base
from datetime import datetime

class ChatLog(Base):
    __tablename__ = "chat_logs"

    id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customers.id"), nullable=True)
    message = Column(Text, nullable=False)
    sender = Column(Enum('user','agent'), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
