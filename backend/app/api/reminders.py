
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models import Reminder
from app.schemas.reminder import (
    ReminderCreate,
    ReminderResponse,
    ReminderUpdate,
)

router = APIRouter(prefix="/api/reminders", tags=["Reminders"])


@router.post(
    "/",
    response_model=ReminderResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_reminder(
    reminder_data: ReminderCreate,
    db: Session = Depends(get_db),
):
    if not reminder_data.scheduled_at.tzinfo:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="scheduled_at must include a timezone.",
        )

    reminder = Reminder(**reminder_data.model_dump())

    db.add(reminder)
    db.commit()
    db.refresh(reminder)

    return reminder


@router.get("/", response_model=list[ReminderResponse])
def get_reminders(db: Session = Depends(get_db)):
    return (
        db.query(Reminder)
        .order_by(Reminder.scheduled_at.asc())
        .all()
    )


@router.get("/{reminder_id}", response_model=ReminderResponse)
def get_reminder(
    reminder_id: int,
    db: Session = Depends(get_db),
):
    reminder = db.query(Reminder).filter(
        Reminder.id == reminder_id
    ).first()

    if reminder is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reminder not found.",
        )

    return reminder


@router.put("/{reminder_id}", response_model=ReminderResponse)
def update_reminder(
    reminder_id: int,
    reminder_data: ReminderUpdate,
    db: Session = Depends(get_db),
):
    reminder = db.query(Reminder).filter(
        Reminder.id == reminder_id
    ).first()

    if reminder is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reminder not found.",
        )

    update_data = reminder_data.model_dump(exclude_unset=True)

    if (
        "scheduled_at" in update_data
        and update_data["scheduled_at"] is not None
        and update_data["scheduled_at"].tzinfo is None
    ):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="scheduled_at must include a timezone.",
        )

    for field, value in update_data.items():
        setattr(reminder, field, value)

    db.commit()
    db.refresh(reminder)

    return reminder


@router.delete("/{reminder_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_reminder(
    reminder_id: int,
    db: Session = Depends(get_db),
):
    reminder = db.query(Reminder).filter(
        Reminder.id == reminder_id
    ).first()

    if reminder is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Reminder not found.",
        )

    db.delete(reminder)
    db.commit()
