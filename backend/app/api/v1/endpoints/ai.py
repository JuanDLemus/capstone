from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import datetime
import httpx
from app.core.config import settings
from app.db.session import get_db
from app.api.v1.endpoints.users import get_current_user
from app.models.user import User
from app.models import ai as models
from app.schemas import ai as schemas

router = APIRouter()

@router.get("/flags/", response_model=List[schemas.AIFlagResponse])
def list_flags(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(models.AIFlag).filter(models.AIFlag.user_id == current_user.id).all()

@router.post("/flags/{flag_id}/acknowledge", response_model=schemas.AIFlagResponse)
def acknowledge_flag(flag_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_item = db.query(models.AIFlag).filter(models.AIFlag.id == flag_id, models.AIFlag.user_id == current_user.id).first()
    if not db_item:
        raise HTTPException(status_code=404, detail="Flag not found")
    db_item.acknowledged = True
    db_item.acknowledged_at = datetime.datetime.utcnow()
    db.commit()
    db.refresh(db_item)
    return db_item

@router.get("/vocal-traces/", response_model=List[schemas.VocalTraceResponse])
def list_vocal_traces(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(models.VocalTrace).filter(models.VocalTrace.user_id == current_user.id).all()

@router.get("/conversations/", response_model=List[schemas.AIConversationResponse])
def list_conversations(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(models.AIConversation).filter(models.AIConversation.user_id == current_user.id).all()

@router.post("/conversations/", response_model=schemas.AIConversationResponse)
def create_conversation(item: schemas.AIConversationCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_item = models.AIConversation(**item.model_dump(), user_id=current_user.id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.get("/messages/", response_model=List[schemas.AIConversationMessageResponse])
def list_messages(conversation_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(models.AIConversationMessage).join(models.AIConversation).filter(models.AIConversation.user_id == current_user.id, models.AIConversationMessage.conversation_id == conversation_id).all()

@router.post("/messages/", response_model=schemas.AIConversationMessageResponse)
def create_message(item: schemas.AIConversationMessageCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_item = models.AIConversationMessage(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.post("/voice-command/", response_model=schemas.VoiceCommandResponse)
async def process_voice_command(request: schemas.VoiceCommandRequest, current_user: User = Depends(get_current_user)):
    # Temporarily accepting transcribed text directly instead of audio file
    # Later, we can add STT using Whisper here
    
    payload = {
        "model": settings.LM_STUDIO_MODEL,
        "messages": [
            {"role": "system", "content": "You are a helpful wellness and productivity AI assistant named EchoVolt. Keep your responses short, concise, and helpful."},
            {"role": "user", "content": request.transcribed_text}
        ],
        "temperature": 0.7,
        "max_tokens": 150
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{settings.LM_STUDIO_BASE_URL}/chat/completions",
                json=payload,
                timeout=30.0
            )
            response.raise_for_status()
            data = response.json()
            answer = data["choices"][0]["message"]["content"]
            return schemas.VoiceCommandResponse(answer_text=answer)
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"AI Service unavailable: {str(e)}")

@router.post("/transcribe/")
async def transcribe_audio(file: UploadFile = File(...), current_user: User = Depends(get_current_user)):
    audio_bytes = await file.read()
    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{settings.LM_STUDIO_BASE_URL}/audio/transcriptions",
                files={"file": (file.filename or "audio.m4a", audio_bytes, file.content_type or "audio/m4a")},
                data={"model": "whisper-1"},
            )
            response.raise_for_status()
            return {"text": response.json().get("text", "")}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Transcription unavailable: {str(e)}")

# RAG CONTEXT BUILDER
def _build_patient_context(user_id: str, db: Session) -> str:
    from app.models.health import Diagnosis, Medication, Allergy

    diagnoses = db.query(Diagnosis).filter(Diagnosis.user_id == user_id, Diagnosis.condition != None).all()
    medications = db.query(Medication).filter(Medication.user_id == user_id, Medication.is_active == True).all()
    allergies = db.query(Allergy).filter(Allergy.user_id == user_id).all()

    lines = []
    if diagnoses:
        conds = ", ".join(d.condition for d in diagnoses)
        lines.append(f"KNOWN DIAGNOSES: {conds}")
    if medications:
        meds = ", ".join(f"{m.name} {m.dosage} ({m.frequency})" for m in medications)
        lines.append(f"ACTIVE MEDICATIONS: {meds}")
    if allergies:
        algs = ", ".join(f"{a.allergen} ({a.severity})" for a in allergies)
        lines.append(f"ALLERGIES: {algs}")

    if not lines:
        return ""
    return "\n".join(lines)

# SYSTEM PROMPT FACTORY
def _build_system_prompt(patient_context: str, is_aac: bool) -> str:
    base = (
        "You are EchoVolt, a compassionate cognitive accessibility assistant embedded in a health app. "
        "Help users track their mental health, medications, and wellbeing.\n\n"
        "CRITICAL RULES:\n"
        "1. ALWAYS respond in the SAME LANGUAGE the user wrote in. If they write in Spanish, respond in Spanish.\n"
        "2. Output ONLY raw JSON. No markdown, no code blocks, no extra text.\n"
        '3. JSON format: {"reply":"empathetic response under 80 words","summary":"3 word title","intent":"general|medication|mood|anxiety|appointment|emergency"}'
    )

    if patient_context:
        base += f"\n\nPATIENT HEALTH CONTEXT (use this to personalize responses):\n{patient_context}"

    if is_aac:
        base += (
            "\n\nCRITICAL AAC CONTEXT: The user is communicating using AAC (Augmentative and Alternative Communication) cards. "
            "Their input is a list of word fragments. You MUST begin your reply by completing/expanding their input into a full, "
            'natural sentence (e.g. "You want to say: [completed sentence].") before providing your response or answering it.'
        )

    return base

@router.post("/chat/")
async def chat_completion(
    request: schemas.ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # BUILD PATIENT RAG CONTEXT
    patient_context = _build_patient_context(current_user.id, db)
    system_prompt = _build_system_prompt(patient_context, request.is_aac)

    # ASSEMBLE FULL MESSAGE LIST
    messages = [{"role": "system", "content": system_prompt}]
    messages += [{"role": m.role, "content": m.content} for m in request.messages]

    payload = {
        "model": settings.LM_STUDIO_MODEL,
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": 800,
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{settings.LM_STUDIO_BASE_URL}/chat/completions",
                json=payload,
                timeout=60.0,
            )
            response.raise_for_status()
            return response.json()
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"AI Service unavailable: {str(e)}")
