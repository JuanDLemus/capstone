"""
SEED DEMO PATIENT
Seeds a mock patient with diabetes, hypertension, and related health data
for demo/judge review. Safe to run multiple times (idempotent).
Usage: python seed_demo_patient.py <patient_email>
"""
import sys
import datetime
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.db.session import SessionLocal
from app.models.user import User
from app.models.health import Diagnosis, Medication, Allergy

DEMO_EMAIL = sys.argv[1] if len(sys.argv) > 1 else None

DIAGNOSES = [
    {"condition": "Diabetes mellitus tipo 2", "notes": "Diagnosticada en 2021. Control glucémico con metformina."},
    {"condition": "Hipertensión arterial", "notes": "Controlada con losartán desde 2022."},
]

MEDICATIONS = [
    {"name": "Metformina", "dosage": "850mg", "frequency": "2 veces al día", "start_date": datetime.date(2021, 3, 1)},
    {"name": "Losartán", "dosage": "50mg", "frequency": "1 vez al día", "start_date": datetime.date(2022, 1, 15)},
]

ALLERGIES = [
    {"allergen": "Penicilina", "severity": "severe"},
    {"allergen": "Sulfonamidas", "severity": "moderate"},
]


def seed(email: str) -> None:
    db = SessionLocal()
    try:
        user = db.query(User).filter(User.email == email).first()
        if not user:
            raise SystemExit(f"ERROR: user '{email}' not found in database")

        uid = user.id
        existing_diagnoses = db.query(Diagnosis).filter(Diagnosis.user_id == uid).count()
        if existing_diagnoses == 0:
            for d in DIAGNOSES:
                db.add(Diagnosis(user_id=uid, diagnosed_at=datetime.date.today(), **d))
            print(f"Seeded {len(DIAGNOSES)} diagnoses")
        else:
            print(f"Skipped diagnoses: {existing_diagnoses} already exist")

        existing_meds = db.query(Medication).filter(Medication.user_id == uid).count()
        if existing_meds == 0:
            for m in MEDICATIONS:
                db.add(Medication(user_id=uid, is_active=True, **m))
            print(f"Seeded {len(MEDICATIONS)} medications")
        else:
            print(f"Skipped medications: {existing_meds} already exist")

        existing_allergies = db.query(Allergy).filter(Allergy.user_id == uid).count()
        if existing_allergies == 0:
            for a in ALLERGIES:
                db.add(Allergy(user_id=uid, **a))
            print(f"Seeded {len(ALLERGIES)} allergies")
        else:
            print(f"Skipped allergies: {existing_allergies} already exist")

        db.commit()
        print(f"Demo patient '{email}' ready for judges.")
    finally:
        db.close()


if __name__ == "__main__":
    if not DEMO_EMAIL:
        raise SystemExit("Usage: python seed_demo_patient.py <patient_email>")
    seed(DEMO_EMAIL)
