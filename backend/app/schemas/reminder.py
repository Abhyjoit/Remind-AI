
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class ReminderCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)

    recipient_name: str = Field(min_length=1, max_length=120)
    recipient_phone: str = Field(min_length=1, max_length=30)

    scheduled_at: datetime

    timezone: str = Field(
        default="Asia/Kolkata",
        max_length=64,
    )

    max_attempts: int = Field(default=3, ge=1, le=3)


class ReminderUpdate(BaseModel):
    title: str | None = Field(default=None, min_length=1, max_length=200)

    recipient_name: str | None = Field(
        default=None,
        min_length=1,
        max_length=120,
    )

    recipient_phone: str | None = Field(
        default=None,
        min_length=1,
        max_length=30,
    )

    scheduled_at: datetime | None = None

    timezone: str | None = Field(default=None, max_length=64)

    max_attempts: int | None = Field(default=None, ge=1, le=3)


class ReminderResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str

    recipient_name: str
    recipient_phone: str

    scheduled_at: datetime
    timezone: str

    status: str

    attempt_count: int
    max_attempts: int

    consent_verified: bool

    created_at: datetime
    updated_at: datetime
