from fastapi import FastAPI

from app.core.config import settings


app = FastAPI(
    title=settings.APP_NAME,
    description="Backend API for the Remind AI voice reminder assistant.",
    version=settings.APP_VERSION,
)


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
