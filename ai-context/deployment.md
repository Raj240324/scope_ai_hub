# Deployment

## Platform
- Hosting: Vercel
- Frontend: static SPA deployment
- Backend: Vercel serverless functions under `/api`

## Vercel Runtime Rules
- SPA rewrite in `vercel.json`: `/(.*)` → `/index.html`
- Security headers configured globally from `vercel.json`

## Build Pipeline
- `npm run build` executes:
  - `vite build`
  - `node scripts/generate-sitemap.js`
  - `node scripts/generate-csp-hashes.js`
- Script order is important because CSP hashes are generated from built `dist/index.html`

## Pre-rendering
- `npm run prerender` uses `react-snap`
- `npm run build:full` runs build then prerender
- Hydration support in `src/main.jsx` enables prerendered HTML bootstrapping

## Operational Workflows
- GitHub Actions for health monitoring:
  - `.github/workflows/heartbeat.yml`
  - `.github/workflows/supabase-heartbeat.yml`
- Health polling interval: every 30 minutes

## Environment Configuration
- Frontend runtime env vars are `VITE_*`
- Serverless env vars configured in Vercel dashboard
- Production security relies on correctly configured:
  - Brevo keys
  - Supabase service role credentials
  - reCAPTCHA secret
  - allowed origins/hostname
