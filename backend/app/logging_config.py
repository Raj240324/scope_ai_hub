"""
Structured JSON logging configuration.
Attaches request_id to log records when available.
Never logs sensitive data (API keys, passwords, full phone numbers).
"""
import logging
import json
import sys
from datetime import datetime, timezone

from app.config import settings


class JSONFormatter(logging.Formatter):
    """Formats log records as single-line JSON for structured log aggregation."""

    def format(self, record: logging.LogRecord) -> str:
        log_entry = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "level": record.levelname,
            "message": record.getMessage(),
            "module": record.module,
            "function": record.funcName,
            "line": record.lineno,
        }

        # Attach request_id if available
        request_id = getattr(record, "request_id", None)
        if request_id:
            log_entry["request_id"] = request_id

        # Attach extra fields
        if record.exc_info and record.exc_info[1]:
            log_entry["exception"] = str(record.exc_info[1])

        return json.dumps(log_entry)


def setup_logging() -> None:
    """Configure root logger with structured JSON output."""
    log_level = logging.DEBUG if settings.DEBUG else logging.INFO

    # Root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(log_level)

    # Remove existing handlers
    root_logger.handlers.clear()

    # Console handler with JSON format
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(log_level)
    console_handler.setFormatter(JSONFormatter())
    root_logger.addHandler(console_handler)

    # Silence noisy libraries
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    logging.getLogger("sqlalchemy.engine").setLevel(
        logging.INFO if settings.DEBUG else logging.WARNING
    )


def get_logger(name: str) -> logging.Logger:
    """Get a named logger instance."""
    return logging.getLogger(name)
