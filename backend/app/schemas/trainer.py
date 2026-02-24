"""
Pydantic schemas for Trainer Application form.
Validation rules match exactly what TrainerForm.jsx enforces on the frontend.
"""
import re
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, field_validator, EmailStr

from app.utils.sanitize import sanitize_string, sanitize_phone, sanitize_url


# --- Enum matching frontend dropdown values ---
VALID_EXPERTISE = [
    "Full Stack Development",
    "MERN Stack",
    "Data Science & AI",
    "Cyber Security",
    "Cloud & DevOps",
    "UI/UX Design",
    "Other",
]


class TrainerCreate(BaseModel):
    """Request schema — matches TrainerForm.jsx field names exactly."""
    trainer_name: str
    trainer_email: EmailStr
    trainer_phone: str
    experience: str
    expertise: str
    linkedin_url: Optional[str] = None

    @field_validator("trainer_name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        v = sanitize_string(v)
        if len(v) < 2:
            raise ValueError("Name must be at least 2 characters long")
        if not re.match(r"^[a-zA-Z\s]+$", v):
            raise ValueError("Name should only contain letters and spaces")
        return v

    @field_validator("trainer_phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        v = sanitize_phone(v)
        if len(v) != 10:
            raise ValueError("Phone number must be exactly 10 digits")
        return v

    @field_validator("experience")
    @classmethod
    def validate_experience(cls, v: str) -> str:
        if not v.isdigit():
            raise ValueError("Experience must be a number")
        if int(v) > 50:
            raise ValueError("Experience cannot exceed 50 years")
        return v

    @field_validator("expertise")
    @classmethod
    def validate_expertise(cls, v: str) -> str:
        if v not in VALID_EXPERTISE:
            raise ValueError(f"Invalid expertise. Must be one of: {', '.join(VALID_EXPERTISE)}")
        return v

    @field_validator("linkedin_url")
    @classmethod
    def validate_linkedin(cls, v: Optional[str]) -> Optional[str]:
        if v is None or v.strip() == "":
            return None
        v = sanitize_url(v)
        if "linkedin.com" not in v:
            raise ValueError("Please provide a valid LinkedIn URL")
        return v


class TrainerResponse(BaseModel):
    """Response schema — returned after successful submission."""
    id: int
    trainer_name: str
    trainer_email: str
    expertise: str
    created_at: datetime
    message_text: str = "Your trainer application has been received. Our academic team will review your profile and contact you for a technical discussion."

    model_config = {"from_attributes": True}
