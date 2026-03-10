# 🔍 scopeaihub — Monitoring & Observability

## External Uptime Monitoring — UptimeRobot

### Setup (if not done — go to uptimerobot.com, free plan)

Add these 3 monitors:

| Monitor Name | URL | Interval |
|---|---|---|
| scopeaihub — Main Site | https://scopeaihub.com | 5 min |
| scopeaihub — Health API | https://scopeaihub.com/api/health | 5 min |
| scopeaihub — Heartbeat | https://scopeaihub.com/api/heartbeat | 30 min |

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

- Workflow: .github/workflows/supabase-heartbeat.yml
- Schedule: every 30 minutes
- Purpose: prevents Supabase free tier from pausing
- Endpoint: /api/heartbeat

---

## Analytics — (add your tool here)

- Google Analytics / Hotjar / Clarity
- Configured in: [file location]
