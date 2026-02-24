"""
Email sending service using Brevo (formerly Sendinblue).
300 emails/day forever free — no credit card required.
Includes retry logic and structured logging.
"""
import time
import logging
import requests

from app.config import settings

logger = logging.getLogger(__name__)

BREVO_API_URL = "https://api.brevo.com/v3/smtp/email"


class EmailService:
    MAX_RETRIES = 3
    RETRY_DELAY = 2  # seconds

    def __init__(self):
        if settings.BREVO_API_KEY:
            self._headers = {
                "accept": "application/json",
                "content-type": "application/json",
                "api-key": settings.BREVO_API_KEY,
            }
        else:
            self._headers = None
            logger.warning("BREVO_API_KEY not configured — emails will be logged only")

    def _send_email(self, to_email: str, subject: str, html_content: str, plain_content: str) -> bool:
        """
        Send a single email via Brevo REST API with retry logic.
        Returns True on success, False on permanent failure.
        Never raises — failures are logged.
        """
        if not self._headers:
            logger.info(
                f"[EMAIL-MOCK] To: {to_email} | Subject: {subject} | "
                f"(Brevo not configured — email not actually sent)"
            )
            return True

        payload = {
            "sender": {"name": settings.FROM_NAME, "email": settings.FROM_EMAIL},
            "to": [{"email": to_email}],
            "subject": subject,
            "htmlContent": html_content,
            "textContent": plain_content,
        }

        for attempt in range(1, self.MAX_RETRIES + 1):
            try:
                response = requests.post(
                    BREVO_API_URL,
                    json=payload,
                    headers=self._headers,
                    timeout=10,
                )
                if response.status_code in (200, 201):
                    logger.info(
                        f"Email sent successfully | To: {to_email} | Subject: {subject} | "
                        f"Status: {response.status_code} | Attempt: {attempt}"
                    )
                    return True
                else:
                    logger.warning(
                        f"Brevo returned {response.status_code} | Attempt: {attempt} | "
                        f"Body: {response.text[:200]}"
                    )
            except Exception as e:
                logger.warning(
                    f"Email send attempt {attempt}/{self.MAX_RETRIES} failed | "
                    f"To: {to_email} | Error: {str(e)}"
                )

            if attempt < self.MAX_RETRIES:
                time.sleep(self.RETRY_DELAY * attempt)

        logger.error(
            f"Email permanently failed after {self.MAX_RETRIES} retries | "
            f"To: {to_email} | Subject: {subject}"
        )
        return False

    # --- Student Emails ---

    def send_student_confirmation(self, data: dict) -> bool:
        from app.services import email_templates
        html = email_templates.student_confirmation_html(data)
        text = email_templates.student_confirmation_text(data)
        return self._send_email(
            to_email=data["user_email"],
            subject=f"Your Inquiry Received — {settings.INSTITUTE_NAME}",
            html_content=html,
            plain_content=text,
        )

    def send_student_admin_notification(self, data: dict) -> bool:
        from app.services import email_templates
        html = email_templates.student_admin_notification_html(data)
        text = email_templates.student_admin_notification_text(data)
        return self._send_email(
            to_email=settings.ADMIN_EMAIL,
            subject=f"New Inquiry: {data['user_name']} — {data['course_interest']}",
            html_content=html,
            plain_content=text,
        )

    # --- Trainer Emails ---

    def send_trainer_confirmation(self, data: dict) -> bool:
        from app.services import email_templates
        html = email_templates.trainer_confirmation_html(data)
        text = email_templates.trainer_confirmation_text(data)
        return self._send_email(
            to_email=data["trainer_email"],
            subject=f"Application Received — {settings.INSTITUTE_NAME}",
            html_content=html,
            plain_content=text,
        )

    def send_trainer_admin_notification(self, data: dict) -> bool:
        from app.services import email_templates
        html = email_templates.trainer_admin_notification_html(data)
        text = email_templates.trainer_admin_notification_text(data)
        return self._send_email(
            to_email=settings.ADMIN_EMAIL,
            subject=f"New Trainer: {data['trainer_name']} — {data['expertise']}",
            html_content=html,
            plain_content=text,
        )


# Singleton instance
email_service = EmailService()
