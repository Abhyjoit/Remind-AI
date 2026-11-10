from sqlalchemy import Boolean, Column, Integer, String

from app.core.database import Base


class CallingSettings(Base):
    __tablename__ = "calling_settings"

    id = Column(Integer, primary_key=True, default=1)

    calling_enabled = Column(Boolean, nullable=False, default=True)

    calling_hours = Column(
        String(50),
        nullable=False,
        default="08:00 AM – 06:00 PM",
    )