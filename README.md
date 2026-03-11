# SCOPE AI HUB 🚀

A production-grade, security-hardened React platform for SCOPE AI HUB — Chennai's AI & Cloud training institute. Features a serverless backend, automated monitoring, CRM integration, enterprise SEO, and state-of-the-art UI/UX animations.

> **Live:** [scopeaihub.com](https://scopeaihub.com)

---

## ✨ Key Features

### Frontend & UX
- ⚡ **High-Performance SPA** — Vite 7 + React 18 with lazy-loaded pages and ES2020 build targets for ultra-low bundle sizes.
- 🎨 **Premium Aesthetic** — Unified CSS variable design system, light/dark theme persistence, and accessible high-contrast UI combinations.
- 🎥 **Cinematic Animations** — Video-driven canvas HeroScroll sequence (GSAP), viewport-triggered Framer Motion components, and dynamic Lottie vector art.
- 🔍 **Enterprise SEO** — Dynamic meta tags, Open Graph, Twitter Cards, JSON-LD schemas (Organization, Course, FAQ, Breadcrumb), and auto-generated XML sitemaps.
- 🎓 **10 AI/ML Courses** — Tiered catalog (Beginner → Advanced) with detailed syllabi, career roles, and prerequisites.

### Backend & Security
- 🔒 **12-Layer API Defense** — Origin validation, User-Agent filtering, referrer checks, payload size caps, honeypots, token replay prevention (SHA-256), adaptive IP rate limiting, and server-side Google reCAPTCHA v2 verification.
- 🛡️ **Hardened Application** — Strict Content Security Policies (CSP) with dynamically built SHA-256 inline script hashes, X-XSS-Protection, HSTS, and Frame/Referrer policies preventing plugin injection and iframe hijacking.
- 🗄️ **Supabase Database** — Managed PostgreSQL storage for enquiry data.
- 📧 **Brevo CRM + Email** — Securely routes transactional emails and syncs student/trainer leads into CRM lists.
- 🕵️ **Data Privacy (PII)** — Custom Sentry hooks aggressively scrub PII (emails, names, phone numbers) out of error reports and breadcrumb trails before leaving the browser.

### Operations & Reliability
- 🏥 **Active Health Monitoring** — An `/api/health` endpoint simultaneously verifies Supabase connectivity, Brevo API availability, and environment variable configuration.
- ⏰ **Automated Resilience** — GitHub Actions systematically ping the health endpoint every 30 minutes, keeping Supabase from pausing while detecting downtime. Triggers automatic email alerts via Brevo if the system degrades.
- 🐛 **Sentry Error Tracking** — Comprehensive frontend exception catchers wrapped inside React Error Boundaries.

---

## 📚 Documentation
For detailed architecture and internal guidelines, consult the following project documents:
- **`AGENTS.md`**: Master rulebook for UI components, routing, accessibility, and styling constraints.
- **`SECURITY_AUDIT_REPORT.md`**: Results of the exhaustive 10-phase production security audit.
- **`SECURITY.md`**: Known security exceptions and dependency statuses (e.g., build-time dependencies).
- **`MONITORING.md`**: Documentation surrounding external uptime monitoring (Uptime Robot) and internal heartbeat systems.
- **`SCOPEAIHUB-PRODUCTION-PARITY.md`**: History of production-parity fixes, including legacy bundle purging and PII protections.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 (Hooks, Context API, Lazy/Suspense) |
| **Bundler** | Vite 7 (ES2020 Target, Chrome 100+) |
| **Styling** | Tailwind CSS v4 |
| **Routing** | React Router v7 |
| **Animations** | Framer Motion, GSAP (ScrollTrigger), Lottie React |
| **Backend** | Vercel Serverless Functions (Node.js) |
| **Database** | Supabase (PostgreSQL) |
| **Email / CRM** | Brevo (Sendinblue) |
| **Bot Protection** | Google reCAPTCHA v2 |
| **Monitoring** | Sentry (with PII Redaction) |
| **CI/CD** | Vercel Git Integration, GitHub Actions (Cron) |

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
│       ├── sanitize.js         # Input sanitization
│       └── logger.js           # Structured JSON logger
├── src/
│   ├── components/             # Reusable UI primitives, Home sections, Layouts (Header/Footer)
│   ├── context/                # ThemeContext, ModalContext
│   ├── data/                   # Dynamic course payload configurations & branding assets
│   ├── pages/                  # Route-level React views
│   ├── services/               # Frontend API callers (enquiryService.js)
│   ├── utils/                  # Sentry configuration, rate limiting boundaries
│   ├── App.jsx                 # Routing tree and Suspense boundaries
│   └── main.jsx                # DOM Injection and Sentry initialization
├── scripts/
│   ├── generate-sitemap.js     # Build-time static sitemap.xml generator
│   └── generate-csp-hashes.js  # Build-time Content Security Policy hash generator
├── public/                     # Canvas video assets, WebP images, robots.txt
├── .github/ workflows/         # CI/CD action runners (Heartbeat monitor)
├── .gitignore                  # Source-control filter configuration
├── vercel.json                 # Core Vercel configurations and Security Headers
└── vite.config.js              # Build instructions and code splitting thresholds
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

Copy `.env.example` to `.env` and assign your development keys:

```bash
cp .env.example .env
```
*(Your `.env` profile is strictly shielded from git via `.gitignore`.)*

**Frontend variables** (Exposed to Vite via `VITE_` prefix):
| Variable | Purpose |
|---|---|
| `VITE_RECAPTCHA_SITE_KEY` | Google reCAPTCHA v2 public site key |
| `VITE_SENTRY_DSN` | Sentry DSN target URL for error monitoring |
| `VITE_TAWK_PROPERTY_ID` | Tawk.to property ID |
| `VITE_TAWK_WIDGET_ID` | Tawk.to widget ID |

**Backend variables** (Managed inside Vercel Dashboard — never commit):
| Variable | Purpose |
|---|---|
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA v2 validation secret |
| `BREVO_API_KEY` | Brevo REST API communication token |
| `SUPABASE_URL` | Supabase instance gateway |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase elevated privileges (Bypass RLS) |
| `ALLOWED_ORIGIN` | Enforced frontend requestor domains |
| `ALLOWED_HOSTNAME` | Expected hostname enforcing reCAPTCHA interactions |
| `ALERT_EMAIL` | Administrator target receiving system outage notices |
| `SITE_URL` | Base URI used by Github Actions payload checks |

### 3. Build & Run Operations

**Local Development Server:**
```bash
npm run dev
```

**Production Compilation (Includes CSP & Sitemap generation):**
```bash
npm run build
```

**Local Production Preview:**
```bash
npm run preview
```

---

## 📝 License

This project is proprietary. All rights reserved.

---

Built with ❤️ for SCOPE AI HUB — *Shaping the AI Generation*
