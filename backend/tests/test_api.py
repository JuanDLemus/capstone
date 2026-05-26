from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_registration_and_login():
    res = client.post("/api/v1/auth/register/", json={
        "email": "testuser_pytest@example.com",
        "full_name": "Test User Pytest",
        "password": "strongpassword123"
    })
    print("REGISTRATION RESPONSE:", res.text)
    assert res.status_code in [201, 400] # 400 if already exists

    res = client.post("/api/v1/auth/token/", json={
        "email": "testuser_pytest@example.com",
        "password": "strongpassword123"
    })
    print(res.text)
    assert res.status_code == 200
    token = res.json().get("access")
    assert token is not None

    headers = {"Authorization": f"Bearer {token}"}
    
    res = client.get("/api/v1/users/me/", headers=headers)
    assert res.status_code == 200
    assert res.json()["email"] == "testuser_pytest@example.com"

    # Test Medications
    res = client.post("/api/v1/health/medications/", headers=headers, json={
        "name": "Aspirin Pytest",
        "dosage": "100mg",
        "frequency": "Daily",
        "start_date": "2025-01-01",
        "active": True
    })
    assert res.status_code == 200

    # Test Check-ins
    res = client.post("/api/v1/checkins/", headers=headers, json={
        "mood": 8,
        "energy": 7,
        "sleep_hours": 8.0,
        "input_mode": "manual",
        "notes": "Pytest checkin"
    })
    assert res.status_code == 200

    # Test AI Voice Command (with mocked httpx)
    import respx
    from httpx import Response
    with respx.mock:
        # Mock the LM Studio call
        respx.post("http://127.0.0.1:1234/v1/chat/completions").mock(
            return_value=Response(200, json={
                "choices": [
                    {
                        "message": {"content": "I am a mocked AI response."}
                    }
                ]
            })
        )
        res = client.post("/api/v1/ai/voice-command/", headers=headers, json={
            "transcribed_text": "Hello EchoVolt"
        })
        if res.status_code != 200:
            print("VOICE COMMAND ERROR:", res.text)
        assert res.status_code == 200
        assert res.json()["answer_text"] == "I am a mocked AI response."

        # TEST AI CHAT PROXY - new structured ChatRequest format
        respx.post("http://127.0.0.1:1234/v1/chat/completions").mock(
            return_value=Response(200, json={
                "choices": [
                    {
                        "message": {"content": "{\"reply\":\"Hello!\",\"summary\":\"Greeting\",\"intent\":\"general\"}"}
                    }
                ]
            })
        )
        res = client.post("/api/v1/ai/chat/", headers=headers, json={
            "messages": [{"role": "user", "content": "Hello"}],
            "is_aac": False
        })
        if res.status_code != 200:
            print("CHAT PROXY ERROR:", res.text)
        assert res.status_code == 200
        assert "choices" in res.json()

    # Test Activities
    res = client.post("/api/v1/activities/", headers=headers, json={
        "activity_type": "meditation",
        "title": "Morning Pytest",
        "duration_minutes": 10,
        "mood_after": 9,
        "notes": "Felt good"
    })
    if res.status_code != 200:
        print("ACTIVITY ERROR:", res.text)
    assert res.status_code == 200

    # Test AI 
    res = client.post("/api/v1/ai/conversations/", headers=headers, json={
        "context_summary": "Pytest conversation"
    })
    if res.status_code != 200:
        print("AI ERROR:", res.text)
    assert res.status_code == 200

    # Test Notifications
    # Not creating a notification directly here as it depends on background triggers, but can fetch them
    res = client.get("/api/v1/notifications/", headers=headers)
    assert res.status_code == 200
