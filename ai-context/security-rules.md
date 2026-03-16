# Security Rules

## Frontend Rules
- Never expose non-`VITE_` secrets in frontend source
- Keep form payload validation and anti-bot UX controls intact
- Do not bypass `apiErrorHandler` normalization for user-facing API errors

## Serverless API Hardening (Current Pattern)
- Method guards
- Origin and referrer validation against allowed origins
- User-agent filtering
- Payload size limits
- Honeypot bot trap
- reCAPTCHA token replay checks with SHA-256 hashing
- Adaptive in-memory IP rate limiting
- Generic error messaging to clients

## Security Headers
- Global headers configured in `vercel.json`:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Strict-Transport-Security`
  - `Permissions-Policy`
  - `Cross-Origin-Opener-Policy`
  - `Cross-Origin-Resource-Policy`
  - `Content-Security-Policy` (hash-augmented)

## CSP Management
- Do not manually accumulate script hashes
- Use build pipeline (`npm run build`) to regenerate hashes through `scripts/generate-csp-hashes.js`

## Monitoring and Error Telemetry
- Sentry is production-gated and includes PII scrubbing in `beforeSend`
- Health endpoint can return minimized payload when auth token is missing/invalid

## Environment-Sensitive Variables in Current Code
- Frontend:
  - `VITE_RECAPTCHA_SITE_KEY`
  - `VITE_SENTRY_DSN`
  - `VITE_TAWK_PROPERTY_ID`
  - `VITE_TAWK_WIDGET_ID`
- Backend:
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `BREVO_API_KEY`
  - `RECAPTCHA_SECRET_KEY`
  - `ALLOWED_ORIGINS` / `ALLOWED_ORIGIN`
  - `ALLOWED_HOSTNAME`
  - `HEALTH_CHECK_TOKEN`
