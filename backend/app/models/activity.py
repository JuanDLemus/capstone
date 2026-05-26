import datetime
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, Text
from app.db.session import Base
from app.models.user import generate_uuid

class ActivityLog(Base):
    __tablename__ = "activity_logs"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"))
    activity_type = Column(String(50), nullable=False) # breathing, meditation, journaling, etc.
    title = Column(String(200), nullable=False)
    duration_minutes = Column(Integer, nullable=True)
    mood_after = Column(Integer, nullable=True)
    notes = Column(Text, nullable=True)
    completed_at = Column(DateTime, default=datetime.datetime.utcnow)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
