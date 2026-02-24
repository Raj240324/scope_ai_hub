"""
Shared SQLAlchemy base and mixins for all models.
TimestampMixin and SoftDeleteMixin are reusable for future ERP modules.
"""
from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, Boolean
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """Declarative base for all models."""
    pass


class TimestampMixin:
    """Adds created_at and updated_at columns to any model."""
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
        index=True,
    )
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=True,
    )


class SoftDeleteMixin:
    """Adds soft-delete capability to any model."""
    is_deleted = Column(Boolean, default=False, nullable=False, index=True)
    deleted_at = Column(DateTime(timezone=True), nullable=True)
