import os
from pathlib import Path

from dotenv import load_dotenv


BASE_DIR = Path(__file__).resolve().parents[2]

ENV_FILE = BASE_DIR / ".env"

load_dotenv(ENV_FILE)


class Settings:
    APP_NAME = os.getenv("APP_NAME", "Remind AI API")
    APP_VERSION = os.getenv("APP_VERSION", "1.0.0")

    ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

    DEBUG = os.getenv("DEBUG", "false").lower() == "true"

    API_HOST = os.getenv("API_HOST", "127.0.0.1")
    API_PORT = int(os.getenv("API_PORT", "8000"))


settings = Settings()
