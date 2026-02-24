"""
Trainer application route — POST /trainer
Validates → stores in DB → fires background email tasks → returns JSON.
"""
import logging

from fastapi import APIRouter, Depends, BackgroundTasks, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.trainer import TrainerSubmission
from app.schemas.trainer import TrainerCreate, TrainerResponse
from app.services.email_service import email_service

logger = logging.getLogger(__name__)

router = APIRouter(tags=["Trainer Applications"])


@router.post("/trainer", response_model=TrainerResponse, status_code=200)
def create_trainer_submission(
    data: TrainerCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
):
    """
    Receive a trainer application.
    - Validates request via Pydantic
    - Stores in PostgreSQL
    - Sends confirmation + admin notification in background
    - Returns immediately after DB commit
    """
    try:
        submission = TrainerSubmission(**data.model_dump())
        db.add(submission)
        db.commit()
        db.refresh(submission)
        logger.info(f"Trainer submission saved | ID: {submission.id} | Email: {data.trainer_email}")
    except Exception as e:
        db.rollback()
        logger.error(f"Failed to save trainer submission | Error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to process your application. Please try again.")

    # Fire-and-forget emails — do not block the response
    email_data = data.model_dump()
    background_tasks.add_task(email_service.send_trainer_confirmation, email_data)
    background_tasks.add_task(email_service.send_trainer_admin_notification, email_data)

    return submission
