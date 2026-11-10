from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.core.config import settings
from app.core.database import Base, engine
from app import models
from app.api.reminders import router as reminders_router
from app.api.calling_settings import router as calling_settings_router
from app.scheduler.reminder_scheduler import (
    start_scheduler,
    stop_scheduler,
)


Base.metadata.create_all(bind=engine)


@asynccontextmanager
async def lifespan(app: FastAPI):
    start_scheduler()

    try:
        yield
    finally:
        stop_scheduler()


app = FastAPI(
    title=settings.APP_NAME,
    description="Backend API for the Remind AI voice reminder assistant.",
    version=settings.APP_VERSION,
    lifespan=lifespan,
)

app.include_router(reminders_router)
app.include_router(calling_settings_router)


@app.get("/")
async def root():
    return {
        "message": "Welcome to Remind AI API",
        "status": "running",
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "environment": settings.ENVIRONMENT,
    }