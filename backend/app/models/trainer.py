"""
TrainerSubmission model — maps exactly to TrainerForm.jsx fields:
trainer_name, trainer_email, trainer_phone, experience, expertise, linkedin_url
"""
from sqlalchemy import Column, Integer, String

from app.models.base import Base, TimestampMixin, SoftDeleteMixin


class TrainerSubmission(Base, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "trainer_submissions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    trainer_name = Column(String(100), nullable=False)
    trainer_email = Column(String(255), nullable=False, index=True)
    trainer_phone = Column(String(10), nullable=False)
    experience = Column(String(2), nullable=False)
    expertise = Column(String(100), nullable=False)
    linkedin_url = Column(String(500), nullable=True)

    # Composite unique constraint — prevents exact duplicate applications
    __table_args__ = (
        {"comment": "Trainer application submissions from TrainerForm.jsx"},
    )

    def __repr__(self) -> str:
        return f"<TrainerSubmission(id={self.id}, name={self.trainer_name}, email={self.trainer_email})>"
