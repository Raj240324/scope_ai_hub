"""
Student admission route — POST /student
Validates → stores in DB → fires background email tasks → returns JSON.
"""
import logging

from fastapi import APIRouter, Depends, BackgroundTasks, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.student import StudentSubmission
from app.schemas.student import StudentCreate, StudentResponse
from app.services.email_service import email_service

logger = logging.getLogger(__name__)

router = APIRouter(tags=["Student Admissions"])


@router.post("/student", response_model=StudentResponse, status_code=200)
def create_student_submission(
    data: StudentCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    """
    Receive a student admission inquiry.
    - Validates request via Pydantic
    - Stores in PostgreSQL
    - Sends confirmation + admin notification in background
    - Returns immediately after DB commit
    """
    try:
        submission = StudentSubmission(**data.model_dump())
        db.add(submission)
        db.commit()
        db.refresh(submission)
        logger.info(f"Student submission saved | ID: {submission.id} | Email: {data.user_email}")
    except Exception as e:
        db.rollback()
        logger.error(f"Failed to save student submission | Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process your inquiry. Please try again.")

    # Fire-and-forget emails — do not block the response
    email_data = data.model_dump()
    background_tasks.add_task(email_service.send_student_confirmation, email_data)
    background_tasks.add_task(email_service.send_student_admin_notification, email_data)

    return submission
