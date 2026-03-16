# Integrations

## Supabase
- SDK: `@supabase/supabase-js`
- Backend-only client creation in `api/utils/supabase.js`
- Used by:
  - `/api/send-enquiry` (`enquiries` table)
  - `/api/send-trainer` (`trainer_applications` table)
  - `/api/health` connectivity checks

## Brevo (Sendinblue)
- API key usage in `api/utils/brevo.js`
- Used by both submission endpoints:
  - owner notification emails
  - applicant auto-replies
  - CRM contact upsert/list assignment
- Also used in GitHub Actions alert flow (`heartbeat.yml`)

## Google reCAPTCHA v2
- Frontend widget in:
  - `components/ui/ContactForm.jsx`
  - `components/ui/TrainerForm.jsx`
- Site key: `VITE_RECAPTCHA_SITE_KEY`
- Backend verification via `api/utils/recaptcha.js` and token replay protection logic

## Sentry
- Frontend init in `src/utils/sentry.js` called from `src/main.jsx`
- Active only when DSN is present and app is not in dev mode
- Includes `beforeSend` PII scrubbing for user/request/breadcrumb/exception fields

## Tawk.to
- Dynamic widget injection in `components/utils/TawkChat.jsx`
- Env vars:
  - `VITE_TAWK_PROPERTY_ID`
  - `VITE_TAWK_WIDGET_ID`
- Rendered globally via `Layout`

## WhatsApp
- Floating WhatsApp CTA via `components/ui/WhatsAppButton.jsx`
- Uses phone details from branding/contact pathways

## Monitoring Automation
- GitHub workflows:
  - `.github/workflows/heartbeat.yml`
  - `.github/workflows/supabase-heartbeat.yml`
- Health endpoint polling every 30 minutes

## Analytics Status
- No first-party analytics integration detected in source code
- `MONITORING.md` contains placeholder analytics section only
