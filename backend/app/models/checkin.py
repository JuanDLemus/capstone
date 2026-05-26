import datetime
from sqlalchemy import Column, String, Integer, DateTime, Date, Float, ForeignKey, Text, JSON, UniqueConstraint
from sqlalchemy.orm import relationship
from app.db.session import Base
from app.models.user import generate_uuid

class DailyCheckIn(Base):
    __tablename__ = "daily_checkins"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"))
    mood = Column(Integer, nullable=False)
    sleep_hours = Column(Float, nullable=False)
    energy = Column(Integer, nullable=False)
    notes = Column(Text, nullable=True)
    input_mode = Column(String(20), nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User")

class WellnessScore(Base):
    __tablename__ = "wellness_scores"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"))
    date = Column(Date, nullable=False)
    score = Column(Float, nullable=False)
    components = Column(JSON, nullable=False)
    calculated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)

    __table_args__ = (UniqueConstraint('user_id', 'date', name='uq_wellness_user_date'),)

class WeeklySummary(Base):
    __tablename__ = "weekly_summaries"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"))
    week_start = Column(Date, nullable=False)
    week_end = Column(Date, nullable=False)
    average_mood = Column(Float, nullable=True)
    average_sleep = Column(Float, nullable=True)
    average_energy = Column(Float, nullable=True)
    checkin_count = Column(Integer, default=0)
    ai_summary = Column(Text, nullable=True)
    generated_at = Column(DateTime, default=datetime.datetime.utcnow)

    __table_args__ = (UniqueConstraint('user_id', 'week_start', name='uq_weekly_user_date'),)
