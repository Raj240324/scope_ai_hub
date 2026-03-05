# SCOPE AI HUB 🚀

A production-grade, security-hardened React platform for SCOPE AI HUB — Chennai's AI & Cloud training institute. Features a serverless backend, automated monitoring, CRM integration, and enterprise SEO.

> **Live:** [scopeaihub.com](https://scopeaihub.com)

---

## ✨ Key Features

### Frontend
- ⚡ **High-Performance SPA** — Vite 7 + React 18 with lazy-loaded pages and manual code splitting
- 🌗 **Light / Dark Theme** — System-preference detection with localStorage persistence
- 📱 **Fully Responsive** — Mobile-first Tailwind CSS v4 with premium animations (Framer Motion, GSAP)
- 🔍 **Enterprise SEO** — Dynamic meta tags, Open Graph, Twitter Cards, JSON-LD schemas (Organization, Course, FAQ, Breadcrumb), auto-generated sitemap
- 🎓 **10 AI/ML Courses** — Tiered catalog (Beginner → Advanced) with detailed syllabi, career roles, and prerequisites
- 💬 **Tawk.to Live Chat** — Desktop-only chat widget integration

### Backend & Security
- 🔒 **12-Layer API Security** — Origin validation, User-Agent filtering, referrer checks, payload size guard, timing protection, honeypot, input sanitization, token replay prevention (SHA-256), adaptive rate limiting, reCAPTCHA v2 verification, hostname validation, security headers
- 🗄️ **Supabase Database** — PostgreSQL storage for enquiry data with sync tracking
- 📧 **Brevo CRM + Email** — Transactional emails (4 templates) and CRM contact management (2 lists)
- 📊 **Structured Logging** — JSON-formatted logs with unique request IDs for traceability

### Operations
- 🏥 **Health Monitoring** — `/api/health` endpoint checking Supabase, Brevo, and environment variables
- ⏰ **Automated Alerts** — GitHub Actions pings health endpoint every 30 minutes; sends email alerts on degradation
- 🤖 **Dependabot** — Weekly dependency update PRs
- 🐛 **Sentry** — Frontend error monitoring with PII stripping

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 (Hooks, Context API, Lazy/Suspense) |
| **Bundler** | Vite 7 |
| **Styling** | Tailwind CSS v4, CSS custom properties |
| **Routing** | React Router v7 |
| **Animations** | Framer Motion, GSAP |
| **Icons** | Lucide React |
| **SEO** | react-helmet-async |
| **Backend** | Vercel Serverless Functions (Node.js) |
| **Database** | Supabase (PostgreSQL) |
| **Email / CRM** | Brevo (Sendinblue) |
| **Bot Protection** | Google reCAPTCHA v2 |
| **Error Monitoring** | Sentry |
| **Live Chat** | Tawk.to |
| **CI/CD** | Vercel Git Integration, GitHub Actions |
| **Hosting** | Vercel |

---

## 📂 Project Structure

```text
├── api/                        # Vercel Serverless Functions
│   ├── send-enquiry.js         # Student enquiry endpoint (12-layer security)
│   ├── send-trainer.js         # Trainer application endpoint
│   ├── health.js               # System health check endpoint
│   └── utils/                  # Shared backend utilities
│       ├── brevo.js            # Brevo email & CRM client
│       ├── supabase.js         # Supabase singleton client
│       ├── rateLimiter.js      # Adaptive IP rate limiter + token replay cache
│       ├── recaptcha.js        # reCAPTCHA v2 server verification
│       ├── sanitize.js         # Input sanitization & origin validation
│       └── logger.js           # Structured JSON logger
├── src/
│   ├── components/
│   │   ├── layout/             # Header, Footer, Layout, ErrorBoundary
│   │   ├── ui/                 # ContactForm, TrainerForm, CourseCard, Hero, Modal, etc.
│   │   ├── home/               # Homepage sections (CTA, Courses, Placements, etc.)
│   │   ├── sections/           # Shared section components (HeroScroll)
│   │   └── utils/              # SEO, ScrollToTop, Animations, TawkChat
│   ├── context/                # ThemeContext, ModalContext
│   ├── data/                   # courses.js, branding.js, addons.js
│   ├── services/               # enquiryService.js (frontend API client)
│   ├── utils/                  # sentry.js, rateLimiter.js, apiErrorHandler.js
│   ├── pages/                  # 18+ pages (Home, About, Courses, Legal, Careers, etc.)
│   ├── App.jsx                 # Root component with routing & lazy loading
│   └── main.jsx                # Entry point with Sentry init & hydration support
├── scripts/
│   └── generate-sitemap.js     # Build-time sitemap generator
├── public/                     # Static assets, robots.txt, sitemap.xml
├── .github/
│   ├── workflows/heartbeat.yml # 30-min health monitoring + email alerts
│   └── dependabot.yml          # Weekly dependency updates
├── vercel.json                 # SPA rewrites + security headers (CSP, HSTS, etc.)
└── vite.config.js              # Build config with code splitting & legacy support
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### 1. Clone & Install

```bash
git clone <repository-url>
cd scope_ai_hub
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

**Frontend variables** (exposed to browser via `VITE_` prefix):
| Variable | Purpose |
|---|---|
| `VITE_RECAPTCHA_SITE_KEY` | Google reCAPTCHA v2 site key |
| `VITE_SENTRY_DSN` | Sentry DSN for error monitoring |
| `VITE_TAWK_PROPERTY_ID` | Tawk.to property ID |
| `VITE_TAWK_WIDGET_ID` | Tawk.to widget ID |

**Backend variables** (set in Vercel Dashboard — never commit):
| Variable | Purpose |
|---|---|
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA v2 secret key |
| `BREVO_API_KEY` | Brevo transactional API key |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role secret |
| `ALLOWED_ORIGINS` | Comma-separated allowed origins |
| `ALLOWED_HOSTNAME` | Expected hostname for reCAPTCHA |

### 3. Run Development Server

```bash
npm run dev
```

### 4. Build for Production

```bash
npm run build
```

This runs `vite build` followed by automatic sitemap generation.

**Optional** — Pre-render pages locally (requires Puppeteer):
```bash
npm run build:full
```

---

## 🔒 API Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/send-enquiry` | POST | Student enquiry submission with Supabase + Brevo |
| `/api/send-trainer` | POST | Trainer application submission with Brevo |
| `/api/health` | GET | System health check (Supabase, Brevo, env vars) |

All POST endpoints share a 12-layer security pipeline: method guard → origin validation → User-Agent filtering → referrer validation → payload size guard (10 KB) → timing protection (3s minimum) → honeypot → input sanitization → token replay prevention → adaptive rate limiting → reCAPTCHA v2 verification → security headers.

---

## 🏥 Monitoring

- **Health endpoint** (`/api/health`) checks Supabase connectivity, Brevo API availability, and environment variable configuration
- **GitHub Actions** pings the health endpoint every 30 minutes and sends an email alert via Brevo if the system is degraded
- **Sentry** captures and reports frontend errors in production (with PII stripped)

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build + sitemap generation |
| `npm run build:full` | Production build + sitemap + react-snap pre-rendering |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |
| `npm run test` | Run Vitest tests |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run audit` | Audit production dependencies |

---

## 📝 License

This project is proprietary. All rights reserved.

---

Built with ❤️ for SCOPE AI HUB — *Shaping the AI Generation*
