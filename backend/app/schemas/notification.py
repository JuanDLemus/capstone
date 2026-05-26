from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

class NotificationBase(BaseModel):
    notification_type: str
    title: str
    body: str

class NotificationCreate(NotificationBase):
    pass

class NotificationResponse(NotificationBase):
    id: str
    user_id: str
    read: bool
    read_at: Optional[datetime] = None
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
