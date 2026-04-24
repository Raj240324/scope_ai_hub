# 🔍 scopeaihub — Monitoring & Observability

## External Uptime Monitoring — UptimeRobot

### Setup (if not done — go to uptimerobot.com, free plan)

Add these 3 monitors:

| Monitor Name | URL | HTTP Method | Interval |
|---|---|---|---|
| scopeaihub — Main Site | https://scopeaihub.com | GET | 5 min |
| scopeaihub — API Heartbeat | https://scopeaihub.com/api/health | HEAD | 5 min |
| scopeaihub — Deep Health Check | https://scopeaihub.com/api/health | GET + Bearer Token | 10 min |

Alert contact: [your email]

---

## Error Tracking — Sentry

- Project: scopeaihub
- Dashboard: sentry.io
- DSN: stored in VITE_SENTRY_DSN (Vercel env vars)
- PII scrubbing: enabled via beforeSend hook
- Fires: production only (import.meta.env.PROD)

---

## Database Keep-Alive — GitHub Actions

- Workflow: .github/workflows/heartbeat.yml
- Schedule: every 30 minutes
- Purpose: prevents Supabase free tier from pausing
- Endpoint: GET /api/health (with HEALTH_CHECK_TOKEN)

---

## Analytics — (add your tool here)

- Google Analytics / Hotjar / Clarity
- Configured in: [file location]
