from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.api.v1.endpoints.users import get_current_user
from app.models.user import User
from app.models import checkin as models
from app.schemas import checkin as schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.DailyCheckInResponse])
def list_checkins(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(models.DailyCheckIn).filter(models.DailyCheckIn.user_id == current_user.id).all()

@router.post("/", response_model=schemas.DailyCheckInResponse)
def create_checkin(item: schemas.DailyCheckInCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_item = models.DailyCheckIn(**item.model_dump(), user_id=current_user.id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.get("/wellness-scores/", response_model=List[schemas.WellnessScoreResponse])
def list_wellness_scores(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(models.WellnessScore).filter(models.WellnessScore.user_id == current_user.id).all()

@router.get("/weekly-summaries/", response_model=List[schemas.WeeklySummaryResponse])
def list_weekly_summaries(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(models.WeeklySummary).filter(models.WeeklySummary.user_id == current_user.id).all()
