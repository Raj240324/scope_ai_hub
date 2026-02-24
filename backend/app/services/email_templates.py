"""
Branded HTML email templates — SCOPE AI HUB.
Colors match the site's Pink/Violet/Navy design system exactly.

Brand tokens:
  Primary gradient : #D64FD9 → #5A2BC6
  Purple solid     : #A73FD0
  Navy dark        : #0A2540
  Heading text     : #0A2540
  Body text        : #5B6B7A
  Light bg         : #F8FAFC
  Border           : #E2E8F0
  Success accent   : #10b981
"""

from app.config import settings


# ---------------------------------------------------------------------------
# Shared helpers
# ---------------------------------------------------------------------------

def _header(title: str) -> str:
    return f"""
<tr>
  <td style="background:linear-gradient(135deg,#D64FD9 0%,#A73FD0 50%,#5A2BC6 100%);
             padding:36px 40px;text-align:center;">
    <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:900;
               letter-spacing:1.5px;text-transform:uppercase;
               text-shadow:0 2px 8px rgba(90,43,198,0.3);">
      {settings.INSTITUTE_NAME}
    </h1>
    <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:12px;
              font-weight:600;letter-spacing:2.5px;text-transform:uppercase;">
      {settings.INSTITUTE_TAGLINE}
    </p>
    <p style="margin:16px 0 0;display:inline-block;background:rgba(255,255,255,0.20);
              color:#ffffff;font-size:13px;font-weight:700;padding:6px 18px;
              border-radius:20px;letter-spacing:0.5px;">
      {title}
    </p>
  </td>
</tr>"""


def _footer() -> str:
    return f"""
<tr>
  <td style="background-color:#F8FAFC;padding:28px 40px;
             border-top:1px solid #E2E8F0;text-align:center;">
    <p style="margin:0 0 6px;font-size:14px;color:#0A2540;font-weight:800;
              letter-spacing:0.5px;">{settings.INSTITUTE_NAME}</p>
    <p style="margin:0 0 4px;font-size:12px;color:#5B6B7A;">
      {settings.INSTITUTE_ADDRESS}
    </p>
    <p style="margin:0 0 4px;font-size:12px;">
      <a href="tel:{settings.INSTITUTE_PHONE}"
         style="color:#A73FD0;text-decoration:none;font-weight:600;">
        {settings.INSTITUTE_PHONE}
      </a>
      &nbsp;•&nbsp;
      <a href="mailto:{settings.INSTITUTE_EMAIL}"
         style="color:#A73FD0;text-decoration:none;font-weight:600;">
        {settings.INSTITUTE_EMAIL}
      </a>
    </p>
    <p style="margin:10px 0 0;font-size:11px;">
      <a href="{settings.INSTITUTE_WEBSITE}"
         style="color:#5B6B7A;text-decoration:none;">
        {settings.INSTITUTE_WEBSITE}
      </a>
    </p>
  </td>
</tr>"""


def _detail_row(label: str, value: str, last: bool = False) -> str:
    border = "" if last else "border-bottom:1px solid #E2E8F0;"
    return f"""
<tr>
  <td style="padding:11px 18px;font-size:13px;color:#5B6B7A;font-weight:600;
             width:38%;vertical-align:top;{border}">{label}</td>
  <td style="padding:11px 18px;font-size:13px;color:#0A2540;font-weight:500;
             vertical-align:top;{border}">{value}</td>
</tr>"""


def _details_table(rows: list) -> str:
    rows_html = "".join(
        _detail_row(label, value, last=(i == len(rows) - 1))
        for i, (label, value) in enumerate(rows)
    )
    return f"""
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
       style="background-color:#F8FAFC;border-radius:12px;overflow:hidden;
              margin:20px 0;border:1px solid #E2E8F0;">
  {rows_html}
</table>"""


def _cta_badge(text: str) -> str:
    return f"""
<div style="background:linear-gradient(135deg,#D64FD9 0%,#5A2BC6 100%);
            border-radius:12px;padding:18px 24px;margin:20px 0;">
  <p style="margin:0;color:#ffffff;font-size:14px;font-weight:700;">
    {text}
  </p>
</div>"""


def _info_box(heading: str, body: str) -> str:
    return f"""
<div style="background:linear-gradient(135deg,rgba(214,79,217,0.08) 0%,
            rgba(90,43,198,0.08) 100%);
            border-left:4px solid #A73FD0;border-radius:0 10px 10px 0;
            padding:16px 20px;margin:24px 0;">
  <p style="margin:0;font-size:13px;color:#5A2BC6;font-weight:700;">{heading}</p>
  <p style="margin:8px 0 0;font-size:13px;color:#5B6B7A;line-height:1.6;">
    {body}
  </p>
</div>"""


def _reply_button(to_name: str, to_email: str) -> str:
    return f"""
<div style="text-align:center;margin:28px 0 8px;">
  <a href="mailto:{to_email}"
     style="display:inline-block;
            background:linear-gradient(135deg,#D64FD9 0%,#5A2BC6 100%);
            color:#ffffff;font-size:14px;font-weight:700;
            text-decoration:none;padding:14px 36px;border-radius:10px;
            box-shadow:0 4px 14px rgba(167,63,208,0.4);">
    Reply to {to_name}
  </a>
</div>"""


def _wrap(body_rows: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
</head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;
             background-color:#F0F4F8;color:#0A2540;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"
       style="background-color:#F0F4F8;">
  <tr><td style="padding:28px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
           style="max-width:600px;margin:0 auto;background-color:#ffffff;
                  border-radius:16px;overflow:hidden;
                  box-shadow:0 8px 32px rgba(90,43,198,0.10);">
      {body_rows}
    </table>
  </td></tr>
</table>
</body>
</html>"""


# ---------------------------------------------------------------------------
# 1. Student Confirmation (to student)
# ---------------------------------------------------------------------------

def student_confirmation_html(data: dict) -> str:
    rows = _header("✅ Inquiry Received")
    rows += f"""
<tr><td style="padding:32px 40px;">
  <h2 style="margin:0 0 8px;color:#0A2540;font-size:20px;font-weight:900;">
    Thank you, {data['user_name']}!
  </h2>
  <p style="margin:0 0 20px;color:#5B6B7A;font-size:14px;line-height:1.7;">
    We've received your admission inquiry for
    <strong style="color:#A73FD0;">{data['course_interest']}</strong>.
    Our counselor will reach out within <strong>24 hours</strong>.
  </p>
  {_cta_badge("📋 Your Submission Details")}
  {_details_table([
      ("Full Name", data['user_name']),
      ("Email", data['user_email']),
      ("Phone", data['user_phone']),
      ("Location", data['user_location']),
      ("Current Status", data.get('qualification', '—')),
      ("Interested Course", data['course_interest']),
      ("Message", data.get('message', '—')),
  ])}
  {_info_box("💡 What happens next?",
    "A dedicated counselor will call you to discuss the course curriculum, "
    "batch timings, fee structure, and placement opportunities.")}
  <p style="margin:20px 0 0;font-size:13px;color:#5B6B7A;line-height:1.6;">
    Have questions? Call us at
    <a href="tel:{settings.INSTITUTE_PHONE}"
       style="color:#A73FD0;font-weight:700;text-decoration:none;">
      {settings.INSTITUTE_PHONE}
    </a>
    or reply to this email.
  </p>
</td></tr>"""
    rows += _footer()
    return _wrap(rows)


def student_confirmation_text(data: dict) -> str:
    return f"""Thank You, {data['user_name']}!

We have received your admission inquiry for {data['course_interest']}.

Your Details:
- Name: {data['user_name']}
- Email: {data['user_email']}
- Phone: {data['user_phone']}
- Location: {data['user_location']}
- Status: {data.get('qualification', '—')}
- Course: {data['course_interest']}
- Message: {data.get('message', '—')}

Our counselor will contact you within 24 hours.

{settings.INSTITUTE_NAME}
{settings.INSTITUTE_PHONE} | {settings.INSTITUTE_EMAIL}
{settings.INSTITUTE_WEBSITE}
"""


# ---------------------------------------------------------------------------
# 2. Student Admin Notification (to admin)
# ---------------------------------------------------------------------------

def student_admin_notification_html(data: dict) -> str:
    rows = _header("🎓 New Student Inquiry")
    rows += f"""
<tr><td style="padding:32px 40px;">
  <h2 style="margin:0 0 8px;color:#0A2540;font-size:20px;font-weight:900;">
    New Admission Inquiry
  </h2>
  <p style="margin:0 0 20px;color:#5B6B7A;font-size:14px;line-height:1.7;">
    A new student inquiry was submitted through the website.
  </p>
  {_cta_badge(f"📌 Course: {data['course_interest']}")}
  {_details_table([
      ("Full Name", data['user_name']),
      ("Email", f"<a href='mailto:{data['user_email']}' style='color:#A73FD0;text-decoration:none;'>{data['user_email']}</a>"),
      ("Phone", f"<a href='tel:{data['user_phone']}' style='color:#A73FD0;text-decoration:none;'>+91 {data['user_phone']}</a>"),
      ("Location", data['user_location']),
      ("Status", data.get('qualification', '—')),
      ("Course", data['course_interest']),
      ("Message", data.get('message', '—')),
  ])}
  {_reply_button(data['user_name'], data['user_email'])}
  <p style="margin:12px 0 0;font-size:12px;color:#5B6B7A;text-align:center;">
    Automated notification from {settings.INSTITUTE_WEBSITE}
  </p>
</td></tr>"""
    rows += _footer()
    return _wrap(rows)


def student_admin_notification_text(data: dict) -> str:
    return f"""NEW STUDENT INQUIRY

Name: {data['user_name']}
Email: {data['user_email']}
Phone: +91 {data['user_phone']}
Location: {data['user_location']}
Status: {data.get('qualification', '—')}
Course: {data['course_interest']}
Message: {data.get('message', '—')}

Reply to: {data['user_email']}
"""


# ---------------------------------------------------------------------------
# 3. Trainer Confirmation (to trainer)
# ---------------------------------------------------------------------------

def trainer_confirmation_html(data: dict) -> str:
    rows = _header("✅ Application Received")
    rows += f"""
<tr><td style="padding:32px 40px;">
  <h2 style="margin:0 0 8px;color:#0A2540;font-size:20px;font-weight:900;">
    Thank you, {data['trainer_name']}!
  </h2>
  <p style="margin:0 0 20px;color:#5B6B7A;font-size:14px;line-height:1.7;">
    We've received your trainer application for
    <strong style="color:#A73FD0;">{data['expertise']}</strong>.
    Our team will review your profile and get back to you within
    <strong>48 hours</strong>.
  </p>
  {_cta_badge("📋 Your Application Details")}
  {_details_table([
      ("Full Name", data['trainer_name']),
      ("Email", data['trainer_email']),
      ("Phone", data['trainer_phone']),
      ("Experience", f"{data['experience']} years"),
      ("Area of Expertise", data['expertise']),
      ("LinkedIn", data.get('linkedin_url', '—')),
  ])}
  {_info_box("💡 What happens next?",
    "Our academic team will review your profile and experience. "
    "If shortlisted, we'll schedule a demo session to assess your teaching style.")}
  <p style="margin:20px 0 0;font-size:13px;color:#5B6B7A;line-height:1.6;">
    Questions? Reach us at
    <a href="tel:{settings.INSTITUTE_PHONE}"
       style="color:#A73FD0;font-weight:700;text-decoration:none;">
      {settings.INSTITUTE_PHONE}
    </a>.
  </p>
</td></tr>"""
    rows += _footer()
    return _wrap(rows)


def trainer_confirmation_text(data: dict) -> str:
    return f"""Thank You, {data['trainer_name']}!

We have received your trainer application for {data['expertise']}.

Your Details:
- Name: {data['trainer_name']}
- Email: {data['trainer_email']}
- Phone: {data['trainer_phone']}
- Experience: {data['experience']} years
- Expertise: {data['expertise']}
- LinkedIn: {data.get('linkedin_url', '—')}

Our team will review your profile within 48 hours.

{settings.INSTITUTE_NAME}
{settings.INSTITUTE_PHONE} | {settings.INSTITUTE_EMAIL}
{settings.INSTITUTE_WEBSITE}
"""


# ---------------------------------------------------------------------------
# 4. Trainer Admin Notification (to admin)
# ---------------------------------------------------------------------------

def trainer_admin_notification_html(data: dict) -> str:
    rows = _header("🧑‍🏫 New Trainer Application")
    rows += f"""
<tr><td style="padding:32px 40px;">
  <h2 style="margin:0 0 8px;color:#0A2540;font-size:20px;font-weight:900;">
    New Trainer Application
  </h2>
  <p style="margin:0 0 20px;color:#5B6B7A;font-size:14px;line-height:1.7;">
    A new trainer application was submitted through the website.
  </p>
  {_cta_badge(f"🎯 Expertise: {data['expertise']}")}
  {_details_table([
      ("Full Name", data['trainer_name']),
      ("Email", f"<a href='mailto:{data['trainer_email']}' style='color:#A73FD0;text-decoration:none;'>{data['trainer_email']}</a>"),
      ("Phone", f"<a href='tel:{data['trainer_phone']}' style='color:#A73FD0;text-decoration:none;'>+91 {data['trainer_phone']}</a>"),
      ("Experience", f"{data['experience']} years"),
      ("Expertise", data['expertise']),
      ("LinkedIn", data.get('linkedin_url', '—')),
  ])}
  {_reply_button(data['trainer_name'], data['trainer_email'])}
  <p style="margin:12px 0 0;font-size:12px;color:#5B6B7A;text-align:center;">
    Automated notification from {settings.INSTITUTE_WEBSITE}
  </p>
</td></tr>"""
    rows += _footer()
    return _wrap(rows)


def trainer_admin_notification_text(data: dict) -> str:
    return f"""NEW TRAINER APPLICATION

Name: {data['trainer_name']}
Email: {data['trainer_email']}
Phone: +91 {data['trainer_phone']}
Experience: {data['experience']} years
Expertise: {data['expertise']}
LinkedIn: {data.get('linkedin_url', '—')}

Reply to: {data['trainer_email']}
"""
