from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.api.v1.endpoints.users import get_current_user
from app.models.user import User
from app.models import screening as models
from app.schemas import screening as schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.ScreeningResultResponse])
def list_screenings(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(models.ScreeningResult).filter(models.ScreeningResult.user_id == current_user.id).all()

@router.post("/", response_model=schemas.ScreeningResultResponse)
def create_screening(item: schemas.ScreeningResultCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_item = models.ScreeningResult(**item.model_dump(), user_id=current_user.id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
