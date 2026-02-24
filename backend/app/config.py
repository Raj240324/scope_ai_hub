"""
Environment-based configuration using Pydantic Settings.
All sensitive values loaded from .env — never hardcoded.
"""
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    # --- Application ---
    ENV: str = "development"
    DEBUG: bool = False
    APP_NAME: str = "SCOPE AI HUB API"
    APP_VERSION: str = "1.0.0"

    # --- Database ---
    # SQLite is used by default (zero setup) — stored at backend/data.db

    # --- Brevo (formerly Sendinblue) --- 300 emails/day forever free
    BREVO_API_KEY: str = ""
    FROM_EMAIL: str = "nagarajan.webdev@gmail.com"
    FROM_NAME: str = "SCOPE AI HUB"

    # --- Admin ---
    ADMIN_EMAIL: str = "nagarajan.webdev@gmail.com"

    # --- CORS ---
    FRONTEND_URL: str = "http://localhost:5173"

    # --- Institute Branding (for email templates) ---
    INSTITUTE_NAME: str = "SCOPE AI HUB"
    INSTITUTE_TAGLINE: str = "Shaping the AI Generation"
    INSTITUTE_PHONE: str = "+91 63839 80415"
    INSTITUTE_EMAIL: str = "info@scopeaihub.com"
    INSTITUTE_WEBSITE: str = "https://scopeaihub.com"
    INSTITUTE_ADDRESS: str = "Chennai, Tamil Nadu, India"

    # --- Rate Limiting ---
    RATE_LIMIT: str = "5/minute"

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": False,
    }


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
