
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Integer, String

from app.core.database import Base


class Reminder(Base):
    __tablename__ = "reminders"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200), nullable=False)

    recipient_name = Column(String(120), nullable=False)
    recipient_phone = Column(String(30), nullable=False)

    scheduled_at = Column(DateTime(timezone=True), nullable=False)
    timezone = Column(String(64), nullable=False, default="Asia/Kolkata")

    status = Column(String(20), nullable=False, default="scheduled")

    attempt_count = Column(Integer, nullable=False, default=0)
    max_attempts = Column(Integer, nullable=False, default=3)

    consent_verified = Column(Boolean, nullable=False, default=False)

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )
