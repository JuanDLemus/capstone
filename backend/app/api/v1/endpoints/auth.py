from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.user import User, UserProfile, AccessibilitySettings, ReminderSettings
from app.schemas.user import UserCreate, UserResponse
from app.core.security import get_password_hash, create_access_token, create_refresh_token, verify_password, decode_token
from pydantic import BaseModel

router = APIRouter()

class TokenRequest(BaseModel):
    email: str
    password: str

class TokenRefreshRequest(BaseModel):
    refresh: str

@router.post("/register/", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user_in: UserCreate, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_in.email).first()
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
    user = User(
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        full_name=user_in.full_name,
        role=user_in.role
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    # Create associated default profiles
    db.add(UserProfile(user_id=user.id))
    db.add(AccessibilitySettings(user_id=user.id))
    db.add(ReminderSettings(user_id=user.id))
    db.commit()

    return user

@router.post("/token/")
def login_for_access_token(req: TokenRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    
    access_token = create_access_token(subject=user.id)
    refresh_token = create_refresh_token(subject=user.id)
    return {"access": access_token, "refresh": refresh_token, "token_type": "bearer"}

@router.post("/token/refresh/")
def refresh_token(req: TokenRefreshRequest):
    payload = decode_token(req.refresh)
    if not payload or payload.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    
    user_id = payload.get("sub")
    access_token = create_access_token(subject=user_id)
    return {"access": access_token}
