from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Optional, List
from datetime import date, datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    role: str = "user"

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: str
    date_joined: datetime
    last_active: Optional[datetime] = None
    is_active: bool

    model_config = ConfigDict(from_attributes=True)

class UserProfileBase(BaseModel):
    birth_date: Optional[date] = None
    preferred_language: str = "es"
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    timezone: str = "America/Bogota"

class UserProfileUpdate(UserProfileBase):
    pass

class UserProfileResponse(UserProfileBase):
    user_id: str

    model_config = ConfigDict(from_attributes=True)

class AccessibilitySettingsBase(BaseModel):
    preferred_input_mode: str = "chat"
    font_size_scale: float = 1.0
    high_contrast: bool = False
    reduce_motion: bool = False
    screen_reader_optimized: bool = False

class AccessibilitySettingsUpdate(AccessibilitySettingsBase):
    pass

class AccessibilitySettingsResponse(AccessibilitySettingsBase):
    user_id: str

    model_config = ConfigDict(from_attributes=True)

class ReminderSettingsBase(BaseModel):
    checkin_enabled: bool = True
    checkin_time: str = "09:00"
    medication_enabled: bool = False
    medication_times: List[str] = []
    weekly_summary_enabled: bool = True

class ReminderSettingsUpdate(ReminderSettingsBase):
    pass

class ReminderSettingsResponse(ReminderSettingsBase):
    user_id: str

    model_config = ConfigDict(from_attributes=True)
