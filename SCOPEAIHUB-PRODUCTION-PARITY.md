# 🚀 SCOPEAIHUB — PRODUCTION PARITY MASTER PROMPT
### Bringing scopeaihub.com to GVS Controls Production Standard
### Paste this into your IDE AI and execute fully

---

## 🧠 PROJECT CONTEXT

You are working on **scopeaihub.com** — a React 18 + Vite + TypeScript SPA on Vercel.
Educational training institute site. Stack: React Router v7, Tailwind v4, Framer Motion,
GSAP, Supabase, Brevo, Sentry, reCAPTCHA, Vercel Serverless Functions.

A full audit was completed. The following fixes are required to match
production-grade standards already implemented on a sister project.

Execute ALL tasks completely in order. Do not ask questions.
Mark any inference as "Inferred:" and proceed.

---

## 🔴 TASK 1 — FIX ACCESSIBILITY VIOLATION: user-scalable=0

### Why:
`user-scalable=0` in the viewport meta tag prevents pinch-to-zoom.
This is a WCAG 2.1 Level AA failure and will hurt Lighthouse accessibility score.

### What to do:
Open `index.html` in the project root.

Find this line:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0" />
```

Replace it with:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

If the viewport tag has any variation of:
- `user-scalable=no`
- `user-scalable=0`
- `maximum-scale=1`

Remove that specific part only. Keep `width=device-width, initial-scale=1.0`.

### Verification:
- Confirm `user-scalable` is completely gone from the viewport tag
- Confirm `width=device-width, initial-scale=1.0` is still present
- Confirm no other viewport meta tags exist in the file

---

## 🔴 TASK 2 — ADD PERMISSIONS-POLICY HEADER TO `vercel.json`

### Why:
The `vercel.json` has HSTS and other security headers but is missing
`Permissions-Policy` — which controls access to browser features
like camera, microphone, and geolocation.

### What to do:
Open `vercel.json` in the project root.

Find the `"headers"` array. Inside the object where `"source": "/(.*)"`,
find the inner `"headers"` key-value array.

Add this header object to the existing headers array:

```json
{
  "key": "Permissions-Policy",
  "value": "camera=(), microphone=(), geolocation=(), interest-cohort=()"
}
```

### Verification:
- Confirm `Permissions-Policy` header is now present in `vercel.json`
- Confirm existing headers (HSTS, X-Frame-Options, CSP, etc.) are untouched
- Confirm `vercel.json` is valid JSON — no trailing commas, no missing brackets
- Run: `node -e "require('./vercel.json')"` to validate JSON syntax

---

## 🔴 TASK 3 — SENTRY PII SCRUBBING (beforeSend hook)

### Why:
Sentry is initialized but has no `beforeSend` callback.
Error traces can accidentally contain student names, emails,
and phone numbers submitted via the enquiry form — which would be
sent to Sentry's servers without scrubbing.

### What to do:
Open `src/main.jsx` (or `src/main.tsx` if TypeScript).

Find the existing `Sentry.init({...})` block.

Add the `beforeSend` callback INSIDE the existing `Sentry.init({})`,
after the last existing property, before the closing `});`

The complete updated `Sentry.init()` must look like this:

```jsx
Sentry.init({
  // ... your existing dsn, environment, enabled, tracesSampleRate, integrations ...

  // Scrub all PII before sending error data to Sentry servers
  beforeSend(event) {
    // Helper: remove email addresses
    const scrubEmails = (str) =>
      str.replace(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
        "[email]"
      );

    // Helper: remove phone numbers (Indian + international formats)
    const scrubPhones = (str) =>
      str.replace(/(\+?[\d\s\-().]{7,15})/g, "[phone]");

    // Helper: remove Indian names pattern from common form fields
    const scrub = (str) => scrubPhones(scrubEmails(str));

    // 1. Remove user identity fields
    if (event.user) {
      delete event.user.email;
      delete event.user.ip_address;
      delete event.user.username;
    }

    // 2. Scrub request body
    if (
      event.request?.data &&
      typeof event.request.data === "string"
    ) {
      event.request.data = scrub(event.request.data);
    }

    // 3. Scrub breadcrumb messages
    if (event.breadcrumbs?.values) {
      event.breadcrumbs.values = event.breadcrumbs.values.map((crumb) => ({
        ...crumb,
        message: crumb.message ? scrub(crumb.message) : crumb.message,
      }));
    }

    // 4. Scrub exception values (error messages can leak form data)
    if (event.exception?.values) {
      event.exception.values = event.exception.values.map((exception) => ({
        ...exception,
        value: exception.value ? scrub(exception.value) : exception.value,
      }));
    }

    return event;
  },
});
```

### Verification:
- Confirm `beforeSend` is INSIDE `Sentry.init({})` not outside it
- Confirm all 4 scrubbing layers are present (user, request, breadcrumbs, exceptions)
- Confirm existing Sentry config (dsn, environment, etc.) is unchanged
- Confirm no build errors

---

## 🟡 TASK 4 — ADD SUPABASE HEARTBEAT GITHUB ACTION

### Why:
scopeaihub uses Supabase free tier. Without a heartbeat,
Supabase pauses the database after inactivity — causing
the first enquiry submission after downtime to fail silently.

### What to do:

**Step 1:** Check if `/api/health.js` or `/api/health.ts` exists.
- If it exists — check if it pings Supabase. If not, add a Supabase ping to it.
- If it does NOT exist — create `/api/heartbeat.js`:

```js
// /api/heartbeat.js
// Keeps Supabase free tier awake by making a lightweight DB query

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  try {
    // Lightweight ping — select 1 row limit
    const { error } = await supabase
      .from("enquiries")
      .select("id")
      .limit(1);

    if (error) throw error;

    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ status: "error", message: "Heartbeat failed" });
  }
}
```

**Step 2:** Create `.github/workflows/supabase-heartbeat.yml`:

```yaml
# ============================================================
# KEEP ACTIVE: Prevents Supabase Free Tier from pausing
# Runs every 30 minutes — do not disable
# ============================================================

name: Supabase Heartbeat

on:
  schedule:
    - cron: "*/30 * * * *"  # Every 30 minutes
  workflow_dispatch:         # Allow manual trigger

jobs:
  heartbeat:
    runs-on: ubuntu-latest
    steps:
      - name: Ping Supabase via Heartbeat API
        run: |
          STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://scopeaihub.com/api/heartbeat)
          echo "Heartbeat status: $STATUS"
          if [ "$STATUS" != "200" ]; then
            echo "Heartbeat failed with status $STATUS"
            exit 1
          fi
```

**Step 3:** Create `.github/workflows/README.md`:

```markdown
# GitHub Actions — Workflow Documentation

## Active Workflows

### supabase-heartbeat.yml ✅ ACTIVE
- **Purpose:** Prevents Supabase Free Tier from auto-pausing
- **Schedule:** Every 30 minutes
- **Endpoint:** /api/heartbeat
- **Do not disable**

## External Monitoring
- Tool: UptimeRobot (free plan)
- Monitors:
  - https://scopeaihub.com → every 5 minutes
  - https://scopeaihub.com/api/health → every 5 minutes
  - https://scopeaihub.com/api/heartbeat → every 30 minutes
- Alert method: Email
```

### Verification:
- Confirm `.github/workflows/supabase-heartbeat.yml` exists and is valid YAML
- Confirm the heartbeat endpoint (`/api/heartbeat` or `/api/health`) returns 200
- Confirm `.github/workflows/README.md` documents the strategy

---

## 🟡 TASK 5 — FIX LEGACY VITE BUILD TARGET

### Why:
`vite.config.js` has `target: 'chrome70'` (or similar legacy target).
This forces Vite to include old polyfills adding unnecessary bundle weight.
scopeaihub targets working professionals and fresh graduates in 2025+
who are on modern browsers. Chrome 70 was released in 2018.

### What to do:
Open `vite.config.js` (or `vite.config.ts`).

Find the `build` section. Look for:
```js
build: {
  target: 'chrome70',   // or 'es2015', 'es2017'
  ...
}
```

Update the target to modern:
```js
build: {
  target: 'es2020',     // covers 98%+ of users as of 2025
  ...
}
```

If `react-snap` is configured and requires legacy targets, add a comment:
```js
build: {
  // Updated from chrome70 — react-snap works fine with es2020
  // Removes ~15-30kb of legacy polyfills
  target: 'es2020',
  ...
}
```

Also check for this pattern and update if found:
```js
// OLD
targets: { chrome: '70' }

// NEW
targets: { chrome: '100' }  // or remove entirely for Vite defaults
```

### Verification:
- Confirm `target` is updated to `es2020` or removed (defaults to es2015 in Vite — acceptable)
- Run `npm run build` — confirm build passes with smaller or equal bundle size
- No new TypeScript/JS errors

---

## 🟢 TASK 6 — UPTIME MONITORING DOCUMENTATION

### Why:
Unlike GVS Controls which has UptimeRobot configured,
scopeaihub has no external uptime monitoring documented.

### What to do:
Create `MONITORING.md` in the project root:

```markdown
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
```

---

## ✅ TASK 7 — BUILD & FULL VERIFICATION

After completing all tasks above, run:

```bash
npm run build
```

Then verify this complete checklist:

```
index.html:
□ user-scalable removed from viewport meta tag
□ width=device-width, initial-scale=1.0 still present
□ Font preconnect tags present (already done per audit)
□ No blocking font stylesheet links

vercel.json:
□ Permissions-Policy header added
□ Strict-Transport-Security still present
□ X-Frame-Options: DENY still present
□ X-Content-Type-Options: nosniff still present
□ Valid JSON syntax confirmed

src/main.jsx:
□ beforeSend callback inside Sentry.init
□ All 4 PII scrubbing layers present
□ Existing Sentry config unchanged

GitHub Actions:
□ supabase-heartbeat.yml created and valid
□ .github/workflows/README.md created

vite.config.js:
□ Legacy chrome70 target updated to es2020
□ Build passes with zero errors

Build output:
□ npm run build succeeds
□ Zero TypeScript errors
□ Zero build errors
□ Bundle sizes equal or smaller than before
```

---

## 📋 MANUAL TASKS (Developer Only — No Code)

```
1. UPTIMEROBOT (if not set up yet)
   → uptimerobot.com → free account
   → Add Monitor 1: https://scopeaihub.com (5 min)
   → Add Monitor 2: https://scopeaihub.com/api/health (5 min)
   → Add Monitor 3: https://scopeaihub.com/api/heartbeat (30 min)
   → Set alert: your email

2. VERIFY SENTRY DSN IN VERCEL
   → Vercel Dashboard → scopeaihub project
   → Settings → Environment Variables
   → Confirm VITE_SENTRY_DSN is set to Production only
```

---

## 🏁 COMMIT AFTER ALL TASKS DONE

```bash
git add index.html vercel.json src/main.jsx vite.config.js \
  api/heartbeat.js \
  .github/workflows/supabase-heartbeat.yml \
  .github/workflows/README.md \
  MONITORING.md

git commit -m "prod: accessibility fix, Permissions-Policy header, Sentry PII scrubbing, Supabase heartbeat, modern Vite target"

git push
```

---

**Execute Task 1 through Task 6 in order. Then run build verification.
Do not stop between tasks. Start now.**
