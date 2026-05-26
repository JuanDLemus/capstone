from fastapi import APIRouter
from app.api.v1.endpoints import auth, users, health, checkins, screenings, activities, ai, notifications

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(checkins.router, prefix="/checkins", tags=["checkins"])
api_router.include_router(screenings.router, prefix="/screenings", tags=["screenings"])
api_router.include_router(activities.router, prefix="/activities", tags=["activities"])
api_router.include_router(ai.router, prefix="/ai", tags=["ai"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["notifications"])

# Mock AI / chat for now until Phase 3
@api_router.post("/chat")
def mock_chat():
    return {"message": "Hello from the mock local backend!"}
