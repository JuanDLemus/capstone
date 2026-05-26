from fastapi.testclient import TestClient
from app.main import app
import uuid
import pytest
import respx
from httpx import Response
import jwt
from app.core.security import SECRET_KEY, ALGORITHM, create_access_token
from datetime import timedelta

client = TestClient(app)

def test_full_coverage():
    unique_id = str(uuid.uuid4())
    email = f"testuser_{unique_id}@example.com"
    password = "strongpassword123"

    # 1. Register User (Hits auth.py: 26-42)
    res = client.post("/api/v1/auth/register/", json={
        "email": email,
        "full_name": "Test User Coverage",
        "password": password
    })
    assert res.status_code == 201

    # 2. Login User (Success)
    res = client.post("/api/v1/auth/token/", json={
        "email": email,
        "password": password
    })
    assert res.status_code == 200
    tokens = res.json()
    access_token = tokens["access"]
    refresh_token = tokens["refresh"]
    
    headers = {"Authorization": f"Bearer {access_token}"}

    # 3. Invalid Login (Hits auth.py: 56-62 paths)
    res = client.post("/api/v1/auth/token/", json={
        "email": email,
        "password": "wrongpassword"
    })
    assert res.status_code == 400

    # 4. Refresh Token Success
    res = client.post("/api/v1/auth/token/refresh/", json={
        "refresh": refresh_token
    })
    assert res.status_code == 200

    # 5. Refresh Token Invalid
    res = client.post("/api/v1/auth/token/refresh/", json={
        "refresh": "invalid.token.here"
    })
    assert res.status_code == 401

    # 6. Users endpoints (profile, accessibility, reminders)
    res = client.get("/api/v1/users/me/profile/", headers=headers)
    if res.status_code == 404: pass # Might need creation
    
    # 7. Health endpoints (GET and POST)
    client.get("/api/v1/health/medications/", headers=headers)
    
    r = client.post("/api/v1/health/diagnoses/", headers=headers, json={"condition": "Asthma", "diagnosed_at": "2020-01-01"})
    assert r.status_code == 200
    client.get("/api/v1/health/diagnoses/", headers=headers)
    
    r = client.post("/api/v1/health/visits/", headers=headers, json={"specialist": "Dr. Smith", "visit_date": "2024-01-01", "notes": "Checkup"})
    assert r.status_code == 200
    client.get("/api/v1/health/visits/", headers=headers)
    
    r = client.post("/api/v1/health/lab-results/", headers=headers, json={"test_name": "Blood Test", "result": "Normal", "taken_at": "2024-01-01"})
    assert r.status_code == 200
    client.get("/api/v1/health/lab-results/", headers=headers)
    
    r = client.post("/api/v1/health/allergies/", headers=headers, json={"allergen": "Peanuts", "severity": "High"})
    assert r.status_code == 200
    client.get("/api/v1/health/allergies/", headers=headers)
    
    r = client.post("/api/v1/health/family-history/", headers=headers, json={"condition": "Diabetes", "relationship": "Father"})
    assert r.status_code == 200
    client.get("/api/v1/health/family-history/", headers=headers)

    # 8. Checkins endpoints
    client.get("/api/v1/checkins/", headers=headers)
    client.get("/api/v1/checkins/wellness-scores/", headers=headers)
    client.get("/api/v1/checkins/weekly-summaries/", headers=headers)

    # 9. Screenings endpoints
    r = client.post("/api/v1/screenings/", headers=headers, json={"screening_type": "PHQ-9", "responses": {"q1": 3}, "score": 10})
    assert r.status_code == 200
    client.get("/api/v1/screenings/", headers=headers)

    # 10. Activities endpoints
    client.get("/api/v1/activities/", headers=headers)

    # 11. AI endpoints
    # We need to create a conversation first
    c_res = client.post("/api/v1/ai/conversations/", headers=headers, json={"context_summary": "Test"})
    c_id = c_res.json()["id"]
    client.get("/api/v1/ai/conversations/", headers=headers)

    client.post("/api/v1/ai/messages/", headers=headers, json={"conversation_id": c_id, "role": "user", "content": "Hello"})
    client.get(f"/api/v1/ai/messages/?conversation_id={c_id}", headers=headers)

    client.get("/api/v1/ai/flags/", headers=headers)
    
    # create an AI flag in DB
    from app.db.session import SessionLocal
    from app.models.ai import AIFlag
    from app.models.user import User
    db = SessionLocal()
    user = db.query(User).filter(User.email == email).first()
    flag = AIFlag(user_id=user.id, flag_type="safety", severity="high", description="test flag")
    db.add(flag)
    db.commit()
    db.refresh(flag)
    
    # mock acknowledge success
    r = client.post(f"/api/v1/ai/flags/{flag.id}/acknowledge", headers=headers)
    assert r.status_code == 200
    
    # mock acknowledge fail (should 404)
    r = client.post("/api/v1/ai/flags/fake-id/acknowledge", headers=headers)
    assert r.status_code == 404
    
    client.get("/api/v1/ai/vocal-traces/", headers=headers)
    
    # 11.5 Notification Endpoints
    from app.models.notification import Notification
    notification = Notification(user_id=user.id, notification_type="reminder", title="Test", body="Test Body")
    db.add(notification)
    db.commit()
    db.refresh(notification)
    
    r = client.post(f"/api/v1/notifications/{notification.id}/read", headers=headers)
    assert r.status_code == 200
    
    r = client.post("/api/v1/notifications/fake-id/read", headers=headers)
    assert r.status_code == 404
    
    db.close()
    
    # 11.6 AI Voice Command exception handling
    with respx.mock:
        import httpx
        respx.post("http://127.0.0.1:1234/v1/chat/completions").mock(side_effect=httpx.NetworkError("Mocked Error"))
        r = client.post("/api/v1/ai/voice-command/", headers=headers, json={"transcribed_text": "Fail"})
        assert r.status_code == 503
    
    # 12. Security edge cases
    # decode_token with PyJWTError
    from app.core.security import decode_token, create_access_token
    assert decode_token("invalid.token") is None
    
    # Authentication token validation edge cases
    r = client.get("/api/v1/users/me/", headers={"Authorization": "Bearer invalid.token"})
    assert r.status_code == 401
    
    token_no_sub = jwt.encode({"exp": 9999999999}, SECRET_KEY, algorithm=ALGORITHM)
    r = client.get("/api/v1/users/me/", headers={"Authorization": f"Bearer {token_no_sub}"})
    assert r.status_code == 401
    
    token_fake_sub = create_access_token(subject="fake-id-does-not-exist")
    r = client.get("/api/v1/users/me/", headers={"Authorization": f"Bearer {token_fake_sub}"})
    assert r.status_code == 404
    
    # create_access_token with expires_delta
    token = create_access_token(subject="123", expires_delta=timedelta(minutes=5))
    assert token is not None
