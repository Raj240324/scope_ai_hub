"""
SCOPE AI HUB — FastAPI Application
Production-ready entry point with CORS, rate limiting, request ID middleware,
structured logging, and centralized error handling.
"""
import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import ValidationError

from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.config import settings
from app.logging_config import setup_logging, get_logger
from app.middleware.request_id import RequestIDMiddleware
from app.database import engine
from app.models.base import Base
from app.models import student, trainer  # noqa: F401 — register models
from app.routes import student as student_routes
from app.routes import trainer as trainer_routes

# Initialize logging before anything else
setup_logging()
logger = get_logger(__name__)

# Rate limiter
limiter = Limiter(key_func=get_remote_address, default_limits=[settings.RATE_LIMIT])


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup/shutdown lifecycle."""
    # Auto-create tables on startup (SQLite — no Alembic needed)
    Base.metadata.create_all(bind=engine)
    logger.info(
        f"{settings.APP_NAME} v{settings.APP_VERSION} starting | "
        f"ENV: {settings.ENV} | DEBUG: {settings.DEBUG}"
    )
    yield
    logger.info(f"{settings.APP_NAME} shutting down")


# --- App Instance ---
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Backend API for SCOPE AI HUB — Student Admissions & Trainer Applications",
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
    lifespan=lifespan,
)

# --- Middleware ---
app.state.limiter = limiter

# Request ID — must be added first (outermost)
app.add_middleware(RequestIDMiddleware)

# CORS — restricted to configured frontend URL
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_URL],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["X-Request-ID"],
)

# --- Error Handlers ---
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


@app.exception_handler(ValidationError)
async def validation_exception_handler(request: Request, exc: ValidationError):
    logger.warning(f"Validation error | Path: {request.url.path} | Errors: {exc.error_count()}")
    return JSONResponse(
        status_code=422,
        content={
            "success": False,
            "message": "Validation failed",
            "errors": exc.errors(),
        },
    )


@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    request_id = getattr(request.state, "request_id", "unknown")
    logger.error(f"Unhandled exception | Request ID: {request_id} | Error: {str(exc)}", exc_info=True)

    detail = str(exc) if settings.DEBUG else "An internal error occurred. Please try again."
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "message": detail,
            "request_id": request_id,
        },
    )


# --- Routes ---
app.include_router(student_routes.router)
app.include_router(trainer_routes.router)


@app.get("/health")
def health_check():
    """Health check endpoint for monitoring and container probes."""
    return {
        "status": "healthy",
        "service": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "environment": settings.ENV,
    }
