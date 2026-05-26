from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.api.v1.endpoints.users import get_current_user
from app.models.user import User
from app.models import activity as models
from app.schemas import activity as schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.ActivityLogResponse])
def list_activities(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(models.ActivityLog).filter(models.ActivityLog.user_id == current_user.id).all()

@router.post("/", response_model=schemas.ActivityLogResponse)
def create_activity(item: schemas.ActivityLogCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_item = models.ActivityLog(**item.model_dump(), user_id=current_user.id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
