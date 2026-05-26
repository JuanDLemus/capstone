import datetime
from sqlalchemy import Column, String, Integer, DateTime, ForeignKey, JSON
from app.db.session import Base
from app.models.user import generate_uuid

class ScreeningResult(Base):
    __tablename__ = "screening_results"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"))
    screening_type = Column(String(50), nullable=False) # phq9, gad7
    responses = Column(JSON, nullable=False)
    score = Column(Integer, nullable=False)
    completed_at = Column(DateTime, default=datetime.datetime.utcnow)
