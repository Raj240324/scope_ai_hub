"""
StudentSubmission model — maps exactly to ContactForm.jsx fields:
user_name, user_email, user_phone, user_location, qualification, course_interest, message
"""
from sqlalchemy import Column, Integer, String, Text, UniqueConstraint

from app.models.base import Base, TimestampMixin, SoftDeleteMixin


class StudentSubmission(Base, TimestampMixin, SoftDeleteMixin):
    __tablename__ = "student_submissions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_name = Column(String(100), nullable=False)
    user_email = Column(String(255), nullable=False, index=True)
    user_phone = Column(String(10), nullable=False)
    user_location = Column(String(255), nullable=False)
    qualification = Column(String(50), nullable=False)
    course_interest = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)

    # Composite unique constraint — prevents exact duplicate submissions
    __table_args__ = (
        UniqueConstraint("user_email", "course_interest", "created_at", name="uq_student_email_course_ts"),
    )

    def __repr__(self) -> str:
        return f"<StudentSubmission(id={self.id}, name={self.user_name}, email={self.user_email})>"
