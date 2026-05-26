from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
import datetime
from app.db.session import get_db
from app.api.v1.endpoints.users import get_current_user
from app.models.user import User
from app.models import notification as models
from app.schemas import notification as schemas

router = APIRouter()

@router.get("/", response_model=List[schemas.NotificationResponse])
def list_notifications(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(models.Notification).filter(models.Notification.user_id == current_user.id).all()

@router.post("/{notification_id}/read", response_model=schemas.NotificationResponse)
def mark_read(notification_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_item = db.query(models.Notification).filter(models.Notification.id == notification_id, models.Notification.user_id == current_user.id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Notification not found")
    db_item.read = True
    db_item.read_at = datetime.datetime.utcnow()
    db.commit()
    db.refresh(db_item)
    return db_item
