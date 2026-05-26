from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from datetime import date, datetime

# Medication
class MedicationBase(BaseModel):
    name: str
    dosage: str
    frequency: str
    start_date: date
    end_date: Optional[date] = None
    notes: Optional[str] = None
    is_active: bool = True

class MedicationCreate(MedicationBase):
    pass

class MedicationResponse(MedicationBase):
    id: str
    user_id: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# Medical Visit
class MedicalVisitBase(BaseModel):
    specialist: str
    specialty: Optional[str] = None
    visit_date: date
    next_visit_date: Optional[date] = None
    notes: Optional[str] = None

class MedicalVisitCreate(MedicalVisitBase):
    pass

class MedicalVisitResponse(MedicalVisitBase):
    id: str
    user_id: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# Diagnosis
class DiagnosisBase(BaseModel):
    condition: str
    diagnosed_at: Optional[date] = None
    notes: Optional[str] = None

class DiagnosisCreate(DiagnosisBase):
    pass

class DiagnosisResponse(DiagnosisBase):
    id: str
    user_id: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# LabResult
class LabResultBase(BaseModel):
    test_name: str
    result: str
    unit: Optional[str] = None
    reference_range: Optional[str] = None
    taken_at: date
    notes: Optional[str] = None

class LabResultCreate(LabResultBase):
    pass

class LabResultResponse(LabResultBase):
    id: str
    user_id: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# Allergy
class AllergyBase(BaseModel):
    allergen: str
    severity: str
    notes: Optional[str] = None

class AllergyCreate(AllergyBase):
    pass

class AllergyResponse(AllergyBase):
    id: str
    user_id: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

# FamilyHistory
class FamilyHistoryEntryBase(BaseModel):
    condition: str
    relationship: str
    notes: Optional[str] = None

class FamilyHistoryEntryCreate(FamilyHistoryEntryBase):
    pass

class FamilyHistoryEntryResponse(FamilyHistoryEntryBase):
    id: str
    user_id: str
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
