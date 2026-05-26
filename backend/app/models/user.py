import uuid
import datetime
from sqlalchemy import Column, String, Boolean, DateTime, Date, Float, ForeignKey, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from app.db.session import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(150), nullable=False)
    role = Column(String(50), default="user")
    is_active = Column(Boolean, default=True)
    is_staff = Column(Boolean, default=False)
    date_joined = Column(DateTime, default=datetime.datetime.utcnow)
    last_active = Column(DateTime, nullable=True)

    profile = relationship("UserProfile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    accessibility = relationship("AccessibilitySettings", back_populates="user", uselist=False, cascade="all, delete-orphan")
    reminders = relationship("ReminderSettings", back_populates="user", uselist=False, cascade="all, delete-orphan")

class UserProfile(Base):
    __tablename__ = "user_profiles"

    user_id = Column(String(36), ForeignKey("users.id"), primary_key=True)
    birth_date = Column(Date, nullable=True)
    preferred_language = Column(String(10), default="es")
    avatar_url = Column(String, nullable=True)
    bio = Column(String, nullable=True)
    timezone = Column(String(50), default="America/Bogota")

    user = relationship("User", back_populates="profile")

class AccessibilitySettings(Base):
    __tablename__ = "accessibility_settings"

    user_id = Column(String(36), ForeignKey("users.id"), primary_key=True)
    preferred_input_mode = Column(String(50), default="chat")
    font_size_scale = Column(Float, default=1.0)
    high_contrast = Column(Boolean, default=False)
    reduce_motion = Column(Boolean, default=False)
    screen_reader_optimized = Column(Boolean, default=False)

    user = relationship("User", back_populates="accessibility")

class ReminderSettings(Base):
    __tablename__ = "reminder_settings"

    user_id = Column(String(36), ForeignKey("users.id"), primary_key=True)
    checkin_enabled = Column(Boolean, default=True)
    checkin_time = Column(String(5), default="09:00")
    medication_enabled = Column(Boolean, default=False)
    medication_times = Column(JSON, default=list)
    weekly_summary_enabled = Column(Boolean, default=True)

    user = relationship("User", back_populates="reminders")

class CareRelationship(Base):
    __tablename__ = "care_relationships"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    taker_id = Column(String(36), ForeignKey("users.id"))
    monitored_user_id = Column(String(36), ForeignKey("users.id"))
    status = Column(String(20), default="pending")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    activated_at = Column(DateTime, nullable=True)

    taker = relationship("User", foreign_keys=[taker_id])
    monitored_user = relationship("User", foreign_keys=[monitored_user_id])
