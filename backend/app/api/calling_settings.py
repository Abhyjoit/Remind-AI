from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models import CallingSettings
from app.schemas.calling_settings import (
    CallingSettingsResponse,
    CallingSettingsUpdate,
)

router = APIRouter(
    prefix="/api/settings",
    tags=["Settings"],
)


def get_or_create_settings(db: Session) -> CallingSettings:
    settings = db.query(CallingSettings).filter(
        CallingSettings.id == 1
    ).first()

    if settings is None:
        settings = CallingSettings(id=1)
        db.add(settings)
        db.commit()
        db.refresh(settings)

    return settings


@router.get(
    "/calling",
    response_model=CallingSettingsResponse,
)
def get_calling_settings(db: Session = Depends(get_db)):
    return get_or_create_settings(db)


@router.put(
    "/calling",
    response_model=CallingSettingsResponse,
)
def update_calling_settings(
    settings_data: CallingSettingsUpdate,
    db: Session = Depends(get_db),
):
    settings = get_or_create_settings(db)

    settings.calling_enabled = settings_data.calling_enabled
    settings.calling_hours = settings_data.calling_hours

    db.commit()
    db.refresh(settings)

    return settings
