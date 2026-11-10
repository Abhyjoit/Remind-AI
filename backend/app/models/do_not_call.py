
from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text

from app.core.database import Base


class DoNotCall(Base):
    __tablename__ = "do_not_call"

    id = Column(Integer, primary_key=True, index=True)

    phone_number = Column(String(30), unique=True, nullable=False)

    reason = Column(String(200), nullable=True)

    notes = Column(Text, nullable=True)

    added_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False,
    )
