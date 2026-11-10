
from datetime import datetime

from sqlalchemy import Boolean, Column, DateTime, Integer, String, Text

from app.core.database import Base


class ConsentRecord(Base):
    __tablename__ = "consent_records"

    id = Column(Integer, primary_key=True, index=True)

    recipient_name = Column(String(120), nullable=False)
    recipient_phone = Column(String(30), nullable=False)

    is_consented = Column(Boolean, nullable=False, default=False)

    consent_source = Column(String(50), nullable=True)

    consented_at = Column(DateTime, nullable=True)
    revoked_at = Column(DateTime, nullable=True)

    notes = Column(Text, nullable=True)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )
