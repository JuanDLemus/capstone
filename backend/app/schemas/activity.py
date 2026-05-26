from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

class ActivityLogBase(BaseModel):
    activity_type: str
    title: str
    duration_minutes: Optional[int] = None
    mood_after: Optional[int] = None
    notes: Optional[str] = None
    completed_at: Optional[datetime] = None

class ActivityLogCreate(ActivityLogBase):
    pass

class ActivityLogResponse(ActivityLogBase):
    id: str
    user_id: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
