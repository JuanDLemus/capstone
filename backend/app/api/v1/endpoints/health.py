from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.api.v1.endpoints.users import get_current_user
from app.models.user import User
from app.models import health as models
from app.schemas import health as schemas

router = APIRouter()

@router.get("/medications/", response_model=List[schemas.MedicationResponse])
def list_medications(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(models.Medication).filter(models.Medication.user_id == current_user.id).all()

@router.post("/medications/", response_model=schemas.MedicationResponse)
def create_medication(item: schemas.MedicationCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_item = models.Medication(**item.model_dump(), user_id=current_user.id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.get("/diagnoses/", response_model=List[schemas.DiagnosisResponse])
def list_diagnoses(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(models.Diagnosis).filter(models.Diagnosis.user_id == current_user.id).all()

@router.post("/diagnoses/", response_model=schemas.DiagnosisResponse)
def create_diagnosis(item: schemas.DiagnosisCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_item = models.Diagnosis(**item.model_dump(), user_id=current_user.id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.get("/visits/", response_model=List[schemas.MedicalVisitResponse])
def list_visits(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(models.MedicalVisit).filter(models.MedicalVisit.user_id == current_user.id).all()

@router.post("/visits/", response_model=schemas.MedicalVisitResponse)
def create_visit(item: schemas.MedicalVisitCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_item = models.MedicalVisit(**item.model_dump(), user_id=current_user.id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.get("/lab-results/", response_model=List[schemas.LabResultResponse])
def list_lab_results(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(models.LabResult).filter(models.LabResult.user_id == current_user.id).all()

@router.post("/lab-results/", response_model=schemas.LabResultResponse)
def create_lab_result(item: schemas.LabResultCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_item = models.LabResult(**item.model_dump(), user_id=current_user.id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.get("/allergies/", response_model=List[schemas.AllergyResponse])
def list_allergies(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(models.Allergy).filter(models.Allergy.user_id == current_user.id).all()

@router.post("/allergies/", response_model=schemas.AllergyResponse)
def create_allergy(item: schemas.AllergyCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_item = models.Allergy(**item.model_dump(), user_id=current_user.id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.get("/family-history/", response_model=List[schemas.FamilyHistoryEntryResponse])
def list_family_history(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    return db.query(models.FamilyHistoryEntry).filter(models.FamilyHistoryEntry.user_id == current_user.id).all()

@router.post("/family-history/", response_model=schemas.FamilyHistoryEntryResponse)
def create_family_history(item: schemas.FamilyHistoryEntryCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    db_item = models.FamilyHistoryEntry(**item.model_dump(), user_id=current_user.id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item
