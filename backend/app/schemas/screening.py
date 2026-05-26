from pydantic import BaseModel, ConfigDict
from typing import Any
from datetime import datetime

class ScreeningResultBase(BaseModel):
    screening_type: str
    responses: Any
    score: int

class ScreeningResultCreate(ScreeningResultBase):
    pass

class ScreeningResultResponse(ScreeningResultBase):
    id: str
    user_id: str
    completed_at: datetime
    model_config = ConfigDict(from_attributes=True)
