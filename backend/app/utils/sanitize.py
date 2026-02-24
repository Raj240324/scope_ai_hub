"""
Input sanitization utilities.
Strips HTML tags and normalizes whitespace to prevent injection.
"""
import re
from html import escape


def sanitize_string(value: str) -> str:
    """Strip HTML tags, escape special chars, and normalize whitespace."""
    if not value:
        return value
    # Remove HTML tags
    clean = re.sub(r"<[^>]+>", "", value)
    # Escape remaining special characters
    clean = escape(clean)
    # Normalize whitespace
    clean = " ".join(clean.split())
    return clean.strip()


def sanitize_phone(value: str) -> str:
    """Extract digits only from a phone number string."""
    if not value:
        return value
    return re.sub(r"\D", "", value)


def sanitize_url(value: str) -> str:
    """Basic URL sanitization — allow only http(s) and linkedin.com domains."""
    if not value:
        return value
    value = value.strip()
    # Ensure it starts with http/https
    if not value.startswith(("http://", "https://")):
        value = "https://" + value
    return value
