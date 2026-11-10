
from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text

from app.core.database import Base


class CallLog(Base):
    __tablename__ = "call_logs"

    id = Column(Integer, primary_key=True, index=True)

    reminder_id = Column(
        Integer,
        ForeignKey("reminders.id"),
        nullable=False,
    )

    attempt_number = Column(Integer, nullable=False)

    call_status = Column(String(30), nullable=False, default="initiated")

    outcome = Column(String(30), nullable=True)

    duration_seconds = Column(Integer, nullable=True)

    transcript = Column(Text, nullable=True)

    started_at = Column(DateTime, nullable=True)

    ended_at = Column(DateTime, nullable=True)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )
