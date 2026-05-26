from pydantic import BaseModel, ConfigDict
from typing import Optional, Any, List
from datetime import datetime

class AIFlagBase(BaseModel):
    flag_type: str
    severity: str
    description: str

class AIFlagCreate(AIFlagBase):
    pass

class AIFlagResponse(AIFlagBase):
    id: str
    user_id: str
    acknowledged: bool
    acknowledged_at: Optional[datetime] = None
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class VocalTraceBase(BaseModel):
    checkin_id: Optional[str] = None
    audio_duration_seconds: Optional[int] = None
    transcription: Optional[str] = None
    sentiment_score: Optional[float] = None
    arousal_level: Optional[float] = None

class VocalTraceCreate(VocalTraceBase):
    pass

class VocalTraceResponse(VocalTraceBase):
    id: str
    user_id: str
    analyzed_at: datetime
    model_config = ConfigDict(from_attributes=True)

class AIConversationMessageBase(BaseModel):
    role: str
    content: str

class AIConversationMessageCreate(AIConversationMessageBase):
    conversation_id: str
    embedding: Optional[Any] = None

class AIConversationMessageResponse(AIConversationMessageBase):
    id: str
    conversation_id: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class AIConversationBase(BaseModel):
    context_summary: Optional[str] = None

class AIConversationCreate(AIConversationBase):
    pass

class AIConversationResponse(AIConversationBase):
    id: str
    user_id: str
    started_at: datetime
    ended_at: Optional[datetime] = None
    model_config = ConfigDict(from_attributes=True)

class VoiceCommandRequest(BaseModel):
    transcribed_text: str

class VoiceCommandResponse(BaseModel):
    answer_text: str

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    is_aac: bool = False
