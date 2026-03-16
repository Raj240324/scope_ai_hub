# Skills

## Scope of AI Coding Tasks
- Frontend page/component implementation in React + JSX
- Route management and lazy-loading updates in `App.jsx`
- Design system adherence via `src/index.css` tokens/classes
- Form UX and validation flows in modal and page-based forms
- Serverless API maintenance under `api/` with shared utility modules
- Build script maintenance in `scripts/`

## Expected Agent Competencies
- React Router route mapping and route consistency checks
- Framer Motion and selective GSAP integration updates
- SEO metadata/schema and sitemap flow maintenance
- Security-aware serverless form handling patterns
- Content/data model updates in `src/data/*`
- Vercel deployment config and security header awareness

## Mandatory Cross-Checks for Feature Changes
- If adding or changing page routes:
  - update `src/App.jsx`
  - update `scripts/generate-sitemap.js`
  - update `package.json` reactSnap include list
- If changing forms/integrations:
  - keep frontend payload and API validation aligned
  - verify required env usage remains backend-only where sensitive

## Non-Goals for Current Project
- No migration to TypeScript
- No introduction of external state managers
- No replacement of current deployment model (Vercel + serverless)
