import datetime
from sqlalchemy import Column, String, Integer, Float, DateTime, Boolean, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from app.db.session import Base
from app.models.user import generate_uuid

class AIFlag(Base):
    __tablename__ = "ai_flags"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"))
    flag_type = Column(String(50), nullable=False)
    severity = Column(String(20), nullable=False) # low, medium, high
    description = Column(Text, nullable=False)
    acknowledged = Column(Boolean, default=False)
    acknowledged_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class VocalTrace(Base):
    __tablename__ = "vocal_traces"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"))
    checkin_id = Column(String(36), ForeignKey("daily_checkins.id"), nullable=True)
    audio_duration_seconds = Column(Integer, nullable=True)
    transcription = Column(Text, nullable=True)
    sentiment_score = Column(Float, nullable=True)
    arousal_level = Column(Float, nullable=True)
    analyzed_at = Column(DateTime, default=datetime.datetime.utcnow)

class AIConversation(Base):
    __tablename__ = "ai_conversations"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"))
    context_summary = Column(Text, nullable=True)
    started_at = Column(DateTime, default=datetime.datetime.utcnow)
    ended_at = Column(DateTime, nullable=True)
    messages = relationship("AIConversationMessage", back_populates="conversation")

class AIConversationMessage(Base):
    __tablename__ = "ai_conversation_messages"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    conversation_id = Column(String(36), ForeignKey("ai_conversations.id"))
    role = Column(String(20), nullable=False) # user, assistant
    content = Column(Text, nullable=False)
    embedding = Column(JSON, nullable=True) # pgvector compatible in future
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    conversation = relationship("AIConversation", back_populates="messages")
