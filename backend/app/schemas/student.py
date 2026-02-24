"""
Pydantic schemas for Student Admission form.
Validation rules match exactly what ContactForm.jsx enforces on the frontend.
"""
import re
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, field_validator, EmailStr

from app.utils.sanitize import sanitize_string, sanitize_phone


# --- Enums matching frontend dropdown values ---
VALID_QUALIFICATIONS = [
    "Student",
    "Job Seeker",
    "Working Professional",
    "Business Owner",
    "Other",
]

VALID_COURSES = [
    "General Inquiry",
    "Full Stack Web Development (MERN Stack)",
    "Data Science & Artificial Intelligence",
    "UI/UX Design Strategy",
    "Cyber Security & Ethical Hacking",
    "Cloud Computing & DevOps",
]


class StudentCreate(BaseModel):
    """Request schema — matches ContactForm.jsx field names exactly."""
    user_name: str
    user_email: EmailStr
    user_phone: str
    user_location: str
    qualification: str
    course_interest: str
    message: str

    @field_validator("user_name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        v = sanitize_string(v)
        if len(v) < 2:
            raise ValueError("Name must be at least 2 characters long")
        if not re.match(r"^[a-zA-Z\s]+$", v):
            raise ValueError("Name should only contain letters and spaces")
        return v

    @field_validator("user_phone")
    @classmethod
    def validate_phone(cls, v: str) -> str:
        v = sanitize_phone(v)
        if len(v) != 10:
            raise ValueError("Phone number must be exactly 10 digits")
        return v

    @field_validator("user_location")
    @classmethod
    def validate_location(cls, v: str) -> str:
        v = sanitize_string(v)
        if len(v) < 2:
            raise ValueError("Location must be at least 2 characters")
        return v

    @field_validator("qualification")
    @classmethod
    def validate_qualification(cls, v: str) -> str:
        if v not in VALID_QUALIFICATIONS:
            raise ValueError(f"Invalid qualification. Must be one of: {', '.join(VALID_QUALIFICATIONS)}")
        return v

    @field_validator("course_interest")
    @classmethod
    def validate_course(cls, v: str) -> str:
        if v not in VALID_COURSES:
            raise ValueError(f"Invalid course. Must be one of: {', '.join(VALID_COURSES)}")
        return v

    @field_validator("message")
    @classmethod
    def validate_message(cls, v: str) -> str:
        v = sanitize_string(v)
        if len(v) < 10:
            raise ValueError("Message must be at least 10 characters")
        return v


class StudentResponse(BaseModel):
    """Response schema — returned after successful submission."""
    id: int
    user_name: str
    user_email: str
    course_interest: str
    created_at: datetime
    message_text: str = "Your admission inquiry has been received. Our counselor will contact you within 24 hours."

    model_config = {"from_attributes": True}
