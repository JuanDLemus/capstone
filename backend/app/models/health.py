import datetime
from sqlalchemy import Column, String, Boolean, DateTime, Date, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.db.session import Base
from app.models.user import generate_uuid

class Medication(Base):
    __tablename__ = "medications"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"))
    name = Column(String(200), nullable=False)
    dosage = Column(String(100), nullable=False)
    frequency = Column(String(50), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=True)
    notes = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    user = relationship("User")

class MedicationAdherenceLog(Base):
    __tablename__ = "medication_adherence_logs"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    medication_id = Column(String(36), ForeignKey("medications.id"))
    scheduled_at = Column(DateTime, nullable=False)
    taken_at = Column(DateTime, nullable=True)
    status = Column(String(20), nullable=False) # taken, skipped, delayed

    medication = relationship("Medication", backref="adherence_logs")

class MedicalVisit(Base):
    __tablename__ = "medical_visits"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"))
    specialist = Column(String(200), nullable=False)
    specialty = Column(String(100), nullable=True)
    visit_date = Column(Date, nullable=False)
    next_visit_date = Column(Date, nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Diagnosis(Base):
    __tablename__ = "diagnoses"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"))
    condition = Column(String(300), nullable=False)
    diagnosed_at = Column(Date, nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class LabResult(Base):
    __tablename__ = "lab_results"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"))
    test_name = Column(String(200), nullable=False)
    result = Column(String(200), nullable=False)
    unit = Column(String(50), nullable=True)
    reference_range = Column(String(100), nullable=True)
    taken_at = Column(Date, nullable=False)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class Allergy(Base):
    __tablename__ = "allergies"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"))
    allergen = Column(String(200), nullable=False)
    severity = Column(String(20), nullable=False) # mild, moderate, severe
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class FamilyHistoryEntry(Base):
    __tablename__ = "family_history_entries"
    id = Column(String(36), primary_key=True, default=generate_uuid)
    user_id = Column(String(36), ForeignKey("users.id"))
    condition = Column(String(300), nullable=False)
    relationship = Column(String(100), nullable=False)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
