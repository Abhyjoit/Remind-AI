from datetime import datetime, time, timezone as dt_timezone
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

from apscheduler.schedulers.background import BackgroundScheduler
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models import (
    Reminder,
    ConsentRecord,
    DoNotCall,
    CallingSettings,
)


scheduler = BackgroundScheduler(timezone="UTC")


def is_within_calling_hours(
    current_time: time,
    calling_hours: str,
) -> bool:
    """Check whether the current local time is within allowed hours."""

    try:
        start_text, end_text = calling_hours.split("–")

        start_time = datetime.strptime(
            start_text.strip(), "%I:%M %p"
        ).time()

        end_time = datetime.strptime(
            end_text.strip(), "%I:%M %p"
        ).time()

        if start_time < end_time:
            return start_time <= current_time < end_time

        return current_time >= start_time or current_time < end_time

    except (ValueError, AttributeError):
        return False


def check_due_reminders():
    """Find due reminders and safely queue eligible ones."""

    db: Session = SessionLocal()

    try:
        now_utc = datetime.now(dt_timezone.utc)

        # Load or create the persistent calling settings.
        settings = (
            db.query(CallingSettings)
            .filter(CallingSettings.id == 1)
            .first()
        )

        if settings is None:
            settings = CallingSettings(id=1)
            db.add(settings)
            db.commit()
            db.refresh(settings)

        # Do not queue reminders when calling is disabled.
        if not settings.calling_enabled:
            print("Scheduler paused: calling is disabled.")
            return

        reminders = (
            db.query(Reminder)
            .filter(
                Reminder.status == "scheduled",
                Reminder.attempt_count < Reminder.max_attempts,
)
            .order_by(Reminder.scheduled_at.asc())
            .all()
        )

        for reminder in reminders:
            try:
                local_timezone = ZoneInfo(
                    reminder.timezone or "Asia/Kolkata"
                )

                scheduled_at = reminder.scheduled_at

                if scheduled_at.tzinfo is None:
                    scheduled_at = scheduled_at.replace(
                        tzinfo=local_timezone
                    )

                scheduled_at_utc = scheduled_at.astimezone(
                    dt_timezone.utc
                )

                if scheduled_at_utc > now_utc:
                    continue

                # Enforce calling hours in the reminder's timezone.
                current_local_time = now_utc.astimezone(
                    local_timezone
                ).time()

                if not is_within_calling_hours(
                    current_local_time,
                    settings.calling_hours,
                ):
                    print(
                        f"Reminder held: ID={reminder.id} "
                        "- outside allowed calling hours."
                    )
                    continue

                # Require reminder-level consent verification.
                if not reminder.consent_verified:
                    print(
                        f"Reminder skipped: ID={reminder.id} "
                        "- consent not verified."
                    )
                    continue

                # Check the latest consent record for this phone number.
                consent = (
                    db.query(ConsentRecord)
                    .filter(
                        ConsentRecord.recipient_phone
                        == reminder.recipient_phone
                    )
                    .order_by(ConsentRecord.created_at.desc())
                    .first()
                )

                if (
                    consent is None
                    or not consent.is_consented
                    or consent.revoked_at is not None
                ):
                    print(
                        f"Reminder skipped: ID={reminder.id} "
                        "- valid consent record not found."
                    )
                    continue

                # Check the Do Not Call list.
                blocked_number = (
                    db.query(DoNotCall)
                    .filter(
                        DoNotCall.phone_number
                        == reminder.recipient_phone
                    )
                    .first()
                )

                if blocked_number is not None:
                    print(
                        f"Reminder skipped: ID={reminder.id} "
                        "- number is on the Do Not Call list."
                    )
                    continue

                # Atomically claim the reminder.
                updated_rows = (
                    db.query(Reminder)
                    .filter(
                        Reminder.id == reminder.id,
                        Reminder.status == "scheduled",
                    )
                    .update(
                        {"status": "queued"},
                        synchronize_session=False,
                    )
                )

                db.commit()

                if updated_rows == 1:
                    print(
                        f"Reminder queued: ID={reminder.id}, "
                        f"Title={reminder.title}"
                    )

            except ZoneInfoNotFoundError:
                print(
                    f"Invalid timezone for reminder ID={reminder.id}: "
                    f"{reminder.timezone}"
                )

            except Exception:
                db.rollback()
                raise

    except Exception as error:
        db.rollback()
        print(f"Scheduler error: {error}")

    finally:
        db.close()


def start_scheduler():
    """Check for due reminders every 10 seconds."""

    if not scheduler.running:
        scheduler.add_job(
            check_due_reminders,
            trigger="interval",
            seconds=10,
            id="check_due_reminders",
            replace_existing=True,
            max_instances=1,
        )

        scheduler.start()
        print("Reminder scheduler started.")


def stop_scheduler():
    """Stop the scheduler safely."""

    if scheduler.running:
        scheduler.shutdown(wait=False)
        print("Reminder scheduler stopped.")
