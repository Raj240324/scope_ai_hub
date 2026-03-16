# Architecture

## Runtime Topology
- Frontend: React 18 SPA (`src/main.jsx` → `src/App.jsx`)
- Routing: React Router with route declarations in `src/App.jsx`
- Rendering mode: client render + hydration support for react-snap prerendered HTML
- Backend: Vercel serverless functions in `api/`
- Build scripts: sitemap and CSP hash generation in `scripts/`

## App Composition
- Root wrappers (in order): `ErrorBoundary` → `Router` → `SmoothScroll` → `LazyMotion` → `HelmetProvider` → `ModalProvider` → `ThemeProvider`
- Global UI outside route pages: `NewUserModalTrigger`, `ContactModal`
- Shared page shell is `Layout` with `Header`, `Footer`, `TawkChat`, `WhatsAppButton`, `DynamicScrollButton`

## Routing Map (Actual in App.jsx)
- `/` → `Home`
- `/about` → `About`
- `/courses` → `CoursesList`
- `/courses/:slug` → `CourseDetail`
- `/admissions` → `Admissions`
- `/career-support` → `CareerSupport`
- `/reviews` → `Reviews`
- `/careers/join-as-trainer` → `JoinAsTrainer`
- `/faq` → `FAQ`
- `/contact` → `Contact`
- `/privacy-policy` → `PrivacyPolicy`
- `/terms-conditions` → `TermsConditions`
- `/nda-policy` → `NDAPolicy`
- `/disclaimer` → `Disclaimer`
- `/refund-policy` → `RefundPolicy`
- `/legal/trainer-conduct` → `TrainerCodeOfConduct`
- `/sitemap` → `Sitemap`
- `*` → `NotFound`

## Serverless API Surface
- `GET|HEAD /api/health`
  - Validates environment, Supabase connectivity, Brevo connectivity
  - Optional bearer auth through `HEALTH_CHECK_TOKEN`
- `POST /api/send-enquiry`
  - Sanitization, origin/referrer/UA checks, honeypot, token replay checks, adaptive rate limiting, reCAPTCHA verification
  - Persists to Supabase `enquiries`
  - Sends Brevo owner + auto-reply email and CRM upsert
- `POST /api/send-trainer`
  - Same security pattern adapted for trainer payload
  - Persists to Supabase `trainer_applications`
  - Sends Brevo notifications and CRM upsert

## Service & Data Flow
- Frontend form components call service/fetch to `/api/*`
- API handlers orchestrate security checks and external integrations
- Primary persistence is Supabase; Brevo flows are partially non-blocking

## Cross-File Architecture Constraints
- React pages are lazy-loaded in `App.jsx`
- Route additions require updates in:
  - `src/App.jsx`
  - `scripts/generate-sitemap.js`
  - `package.json` reactSnap include list
