from pydantic import BaseModel, ConfigDict
from typing import Optional, Any
from datetime import date, datetime

class DailyCheckInBase(BaseModel):
    mood: int
    sleep_hours: float
    energy: int
    notes: Optional[str] = None
    input_mode: str

class DailyCheckInCreate(DailyCheckInBase):
    pass

class DailyCheckInResponse(DailyCheckInBase):
    id: str
    user_id: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class WellnessScoreResponse(BaseModel):
    id: str
    user_id: str
    date: date
    score: float
    components: Any
    calculated_at: datetime
    model_config = ConfigDict(from_attributes=True)

class WeeklySummaryResponse(BaseModel):
    id: str
    user_id: str
    week_start: date
    week_end: date
    average_mood: Optional[float] = None
    average_sleep: Optional[float] = None
    average_energy: Optional[float] = None
    checkin_count: int
    ai_summary: Optional[str] = None
    generated_at: datetime
    model_config = ConfigDict(from_attributes=True)
