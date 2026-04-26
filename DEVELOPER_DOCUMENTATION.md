# SCOPE AI HUB — Developer Documentation (Part 1)

> **Version**: 1.0 · **Last Updated**: 2026-04-26 · **Classification**: Internal Engineering

---

## 1. 📘 PROJECT OVERVIEW

### What It Does
Scope AI Hub is a **production React SPA** serving as the marketing, course catalog, and student acquisition platform for an AI training institute headquartered in Chennai, India.

### Core Features
| Feature | Description |
|---|---|
| **Course Catalog** | 10 AI/ML courses across 3 tiers (Beginner → Advanced), with dynamic detail pages |
| **Student Enquiry System** | Multi-step contact form → Supabase DB + Brevo email + CRM sync |
| **Trainer Applications** | Dedicated form for trainer recruitment with same backend pipeline |
| **Dark/Light Theming** | Full dual-theme support persisted via localStorage |
| **SEO Engine** | Per-page meta, JSON-LD schemas (Organization, Course, FAQ, Breadcrumb), auto-sitemap |
| **Scroll Animations** | GSAP canvas hero, Framer Motion viewport animations, Lottie vectors |
| **Live Chat** | Tawk.to integration + WhatsApp floating button |
| **Error Monitoring** | Sentry (production only) with PII scrubbing |
| **Health Monitoring** | Authenticated `/api/health` endpoint with GitHub Actions alerting |

### Target Users
- Prospective students exploring AI/ML training programs
- Working professionals seeking upskilling
- Business leaders evaluating corporate training
- Trainers applying to teach at the institute

### Tech Stack Summary
```
Frontend:  React 18 · Vite 7 · React Router 7 · TailwindCSS 4 · Framer Motion · GSAP
Backend:   Vercel Serverless Functions (Node.js ES Modules)
Database:  Supabase (PostgreSQL)
Email:     Brevo (Sendinblue) — Transactional + CRM
Security:  reCAPTCHA v2 · CSP · Rate Limiting · Input Sanitization
Monitoring: Sentry · GitHub Actions Heartbeat · UptimeRobot
Hosting:   Vercel (Static SPA + Serverless API)
Domain:    scopeaihub.com
```

---

## 2. 🏗️ SYSTEM ARCHITECTURE

### High-Level Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        BROWSER (Client)                         │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │ React SPA│  │ThemeCtx  │  │ModalCtx  │  │ Framer/GSAP  │   │
│  │ (Vite)   │  │(dark/    │  │(enquiry  │  │ Animations   │   │
│  │          │  │ light)   │  │ modal)   │  │              │   │
│  └────┬─────┘  └──────────┘  └──────────┘  └──────────────┘   │
│       │                                                         │
│       │  fetch('/api/...')                                       │
└───────┼─────────────────────────────────────────────────────────┘
        │  HTTPS
        ▼
┌─────────────────────────────────────────────────────────────────┐
│                    VERCEL EDGE NETWORK                           │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Static Assets (dist/)         CDN-cached, gzip/brotli  │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Serverless Functions (api/)   Cold-start ~200ms         │   │
│  │                                                          │   │
│  │  POST /api/send-enquiry   →  Validate → DB → Email      │   │
│  │  POST /api/send-trainer   →  Validate → DB → Email      │   │
│  │  GET  /api/health         →  Service checks              │   │
│  └────────┬───────────────┬─────────────────────────────────┘   │
└───────────┼───────────────┼─────────────────────────────────────┘
            │               │
     ┌──────▼──────┐  ┌─────▼──────┐
     │  Supabase   │  │   Brevo    │
     │ (PostgreSQL)│  │  (Email +  │
     │             │  │   CRM)     │
     │ • enquiries │  │            │
     │ • trainer_  │  │ • Templates│
     │   apps      │  │ • Contacts │
     └─────────────┘  └─────┬──────┘
                            │
                    ┌───────▼───────┐
                    │  Google       │
                    │  reCAPTCHA v2 │
                    │  (verify)     │
                    └───────────────┘
```

### External Service Integrations

| Service | Purpose | Auth Method |
|---|---|---|
| **Supabase** | Primary DB (enquiries, trainer_applications) | `SUPABASE_SERVICE_ROLE_KEY` |
| **Brevo** | Transactional email + CRM contact upsert | `BREVO_API_KEY` |
| **Google reCAPTCHA v2** | Bot protection on forms | `RECAPTCHA_SECRET_KEY` (server) + `VITE_RECAPTCHA_SITE_KEY` (client) |
| **Sentry** | Frontend error monitoring (prod only) | `VITE_SENTRY_DSN` |
| **Tawk.to** | Live chat widget | `VITE_TAWK_PROPERTY_ID` + `VITE_TAWK_WIDGET_ID` |
| **Google Fonts** | Typography (Barlow, Bebas Neue, DM Mono) | Public CDN |

---

## 3. 📁 FOLDER STRUCTURE (DETAILED)

```
scope_ai_hub/
├── api/                          # Vercel Serverless Functions
│   ├── health.js                 # GET /api/health — service status (bearer-gated)
│   ├── send-enquiry.js           # POST /api/send-enquiry — student form handler
│   ├── send-trainer.js           # POST /api/send-trainer — trainer form handler
│   └── utils/                    # Shared backend utilities
│       ├── brevo.js              #   Email sending + CRM contact upsert
│       ├── logger.js             #   Structured JSON logger with requestId
│       ├── rateLimiter.js        #   In-memory adaptive IP rate limiting
│       ├── recaptcha.js          #   reCAPTCHA v2 server verification
│       ├── sanitize.js           #   Input sanitization, origin/referer checks
│       └── supabase.js           #   Supabase client singleton
│
├── public/                       # Static assets (served as-is from CDN)
│   ├── *.webp                    #   Logos, badges, social share images
│   ├── hero_desktop.mp4          #   Hero animation source video (desktop)
│   ├── hero_mobile.mp4           #   Hero animation source video (mobile)
│   ├── hero-frames/              #   Extracted WebP frames for canvas sequence
│   ├── robots.txt                #   Crawler directives
│   └── sitemap.xml               #   Auto-generated XML sitemap
│
├── scripts/                      # Build pipeline scripts
│   ├── generate-sitemap.js       #   Reads course slugs → sitemap.xml
│   ├── generate-csp-hashes.js    #   Hashes inline scripts → updates vercel.json CSP
│   ├── convert-frames-to-webp.js #   Video → WebP frame extractor (one-time)
│   ├── supabase-rls-policies.sql #   Row-level security SQL policies
│   └── supabase-data-retention.sql#  Data retention/cleanup SQL
│
├── src/
│   ├── main.jsx                  # React entry — Sentry init, hydration logic
│   ├── App.jsx                   # Router, providers, lazy routes, prefetch
│   ├── index.css                 # Design system: tokens, themes, components
│   ├── App.css                   # Minimal app-level styles
│   │
│   ├── assets/                   # Bundled assets (import via JS, hashed)
│   │   └── animations/           #   Lottie JSON files
│   │
│   ├── components/
│   │   ├── Header.jsx            #   Main navigation (50KB — mega menu)
│   │   ├── HeroScrollCanvas.jsx  #   GSAP scroll-driven canvas animation
│   │   ├── PageTransition.jsx    #   Framer AnimatePresence wrapper
│   │   ├── SmoothScroll.jsx      #   Lenis smooth scroll provider
│   │   │
│   │   ├── hero/                 #   Hero sub-components
│   │   │   ├── HeroEngine.jsx    #     Device-aware hero selector
│   │   │   ├── DesktopHeroSequence.jsx # Canvas frame sequence (desktop)
│   │   │   ├── VideoHero.jsx     #     MP4 video hero (mobile)
│   │   │   └── StaticHero.jsx    #     Fallback static hero
│   │   │
│   │   ├── home/                 #   Home page sections (14 components)
│   │   │   ├── CTASection.jsx
│   │   │   ├── CareerSupportSection.jsx
│   │   │   ├── CorporateSection.jsx
│   │   │   ├── CoursesSection.jsx
│   │   │   ├── FAQSection.jsx
│   │   │   ├── GlobalReachSection.jsx
│   │   │   ├── HiringPartners.jsx
│   │   │   ├── MethodologySection.jsx
│   │   │   ├── PlacementSection.jsx
│   │   │   ├── StatsSection.jsx
│   │   │   ├── TestimonialsSection.jsx
│   │   │   ├── TrainerMiniSection.jsx
│   │   │   ├── TrainerSpotlight.jsx
│   │   │   └── TrustFactors.jsx
│   │   │
│   │   ├── layout/               #   App-wide structural components
│   │   │   ├── Layout.jsx        #     Main layout (Header + Main + Footer + FABs)
│   │   │   ├── Footer.jsx        #     Site footer with links & social
│   │   │   └── ErrorBoundary.jsx #     React error boundary
│   │   │
│   │   ├── sections/             #   Cross-page shared sections
│   │   │   └── BatchScheduleSection.jsx
│   │   │
│   │   ├── ui/                   #   Reusable UI primitives (17 components)
│   │   │   ├── ContactForm.jsx   #     Student enquiry form (22KB)
│   │   │   ├── ContactModal.jsx  #     Modal wrapper for ContactForm
│   │   │   ├── TrainerForm.jsx   #     Trainer application form (19KB)
│   │   │   ├── CourseCard.jsx    #     Course listing card
│   │   │   ├── Hero.jsx          #     Hero section layout
│   │   │   ├── ThemeToggle.jsx   #     Dark/light mode toggle
│   │   │   ├── WhatsAppButton.jsx#     Floating WhatsApp FAB
│   │   │   ├── DynamicScrollButton.jsx # Smart scroll-to-top button
│   │   │   ├── DominoScroll.jsx  #     GSAP domino scroll effect
│   │   │   ├── DesignTestimonial.jsx
│   │   │   ├── NeuralCareerGraph.jsx
│   │   │   ├── KineticTeamHybrid.jsx
│   │   │   ├── ServiceGrid.jsx
│   │   │   ├── AddonsGrid.jsx
│   │   │   ├── MicroExpander.jsx
│   │   │   ├── CoreSpinLoader.jsx
│   │   │   └── LottieAnimation.jsx
│   │   │
│   │   └── utils/                #   Non-visual utility components
│   │       ├── Animations.jsx    #     FadeIn, Stagger, Parallax, CountUp, Marquee
│   │       ├── SEO.jsx           #     Per-page meta + JSON-LD schemas
│   │       ├── ScrollToTop.jsx   #     Route-change scroll reset
│   │       ├── TawkChat.jsx      #     Tawk.to live chat loader
│   │       ├── NewUserModalTrigger.jsx # First-visit modal trigger
│   │       └── StackingCards.jsx  #     Scroll-stacking card effect
│   │
│   ├── context/                  #   React Context providers
│   │   ├── ThemeContext.jsx       #     Dark/light theme + localStorage persistence
│   │   └── ModalContext.jsx       #     Enquiry modal state (open/close/course/type)
│   │
│   ├── data/                     #   Static data objects (single source of truth)
│   │   ├── courses.js            #     10 courses, 3 tiers, modules, roles, prereqs
│   │   ├── branding.js           #     Company info, contact, logos, socials
│   │   ├── addons.js             #     12 add-on services (free/paid)
│   │   └── batches.js            #     3 batch schedules (weekday AM/PM, weekend)
│   │
│   ├── hooks/                    #   Custom React hooks
│   │   ├── useScrollLock.js      #     Lock body scroll (for modals)
│   │   └── useScrollReveal.js    #     IntersectionObserver-based visibility hook
│   │
│   ├── lib/                      #   Shared helpers
│   │   └── utils.js              #     cn() = clsx + tailwind-merge
│   │
│   ├── pages/                    #   Route-level page components (all lazy-loaded)
│   │   ├── Home.jsx              #     Landing page (11 sections)
│   │   ├── About.jsx             #     Company story, team, mission
│   │   ├── Admissions.jsx        #     Enrollment process + batch schedules
│   │   ├── Contact.jsx           #     Contact form + map + info
│   │   ├── FAQ.jsx               #     Expandable FAQ with JSON-LD
│   │   ├── Reviews.jsx           #     Student testimonials
│   │   ├── Sitemap.jsx           #     HTML sitemap page
│   │   ├── NotFound.jsx          #     404 page
│   │   ├── courses/
│   │   │   ├── CoursesList.jsx   #       Tier-grouped course catalog
│   │   │   └── CourseDetail.jsx  #       Dynamic course detail (/courses/:slug)
│   │   ├── careers/
│   │   │   ├── JoinAsTrainer.jsx #       Trainer application page
│   │   │   └── TrainerProfiles.jsx#      Trainer showcase
│   │   ├── career-support/
│   │   │   └── CareerSupport.jsx #       Career services overview
│   │   └── legal/                #       6 legal/policy pages
│   │       ├── PrivacyPolicy.jsx
│   │       ├── TermsConditions.jsx
│   │       ├── NDAPolicy.jsx
│   │       ├── RefundPolicy.jsx
│   │       ├── Disclaimer.jsx
│   │       └── TrainerCodeOfConduct.jsx
│   │
│   ├── services/                 #   Frontend API abstraction layer
│   │   └── enquiryService.js     #     submitEnquiry() with timeout + error handling
│   │
│   └── utils/                    #   Frontend utility modules
│       ├── apiErrorHandler.js    #     User-friendly error messages by HTTP status
│       ├── rateLimiter.js        #     Client-side localStorage rate limiter
│       ├── deviceCapability.js   #     Device performance detection
│       ├── motionVariants.js     #     Shared Framer Motion variant objects
│       ├── sentry.js             #     Sentry init + PII scrubbing config
│       └── __tests__/            #     Vitest unit tests
│
├── .github/
│   ├── dependabot.yml            # Weekly npm dependency updates
│   └── workflows/
│       ├── heartbeat.yml         # Every 30min: health ping + Brevo email alert
│       └── supabase-heartbeat.yml# Every 30min: keep Supabase free tier alive
│
├── index.html                    # SPA entry — fonts, preloads, OG meta
├── vite.config.js                # Build config — legacy plugin, manual chunks, proxy
├── vitest.config.js              # Test config — jsdom environment
├── postcss.config.js             # TailwindCSS v4 + Autoprefixer
├── eslint.config.js              # ESLint 9 flat config
├── vercel.json                   # Rewrites + security headers + CSP
├── .env.example                  # Required environment variables template
└── package.json                  # Scripts, dependencies, react-snap config
```

---

## 4. 🔄 DATA FLOW & STATE MANAGEMENT

### Global State Architecture

The app uses **React Context** (no Redux/Zustand) with exactly 2 providers:

```
<ErrorBoundary>
  <Router>
    <SmoothScroll>              ← Lenis smooth scroll wrapper
      <LazyMotion>              ← Framer Motion tree-shaking
        <HelmetProvider>        ← react-helmet-async for <head> management
          <ModalProvider>       ← Enquiry modal state
            <ThemeProvider>     ← Dark/light theme state
              <Suspense>
                <AnimatedRoutes /> ← Page transitions + route rendering
              </Suspense>
              <ContactModal />  ← Global modal (rendered once, controlled by ModalContext)
            </ThemeProvider>
          </ModalProvider>
        </HelmetProvider>
      </LazyMotion>
    </SmoothScroll>
  </Router>
</ErrorBoundary>
```

### ThemeContext
- **State**: `theme` (`'light'` | `'dark'`)
- **Persistence**: `localStorage.getItem('theme')` → fallback to `prefers-color-scheme`
- **Mechanism**: Toggles `.dark` class on `<html>` → CSS variables switch palette
- **Hook**: `useTheme()` → `{ theme, toggleTheme }`

### ModalContext
- **State**: `isModalOpen`, `modalCourse`, `modalType` (`'student'` | `'trainer'`)
- **Hook**: `useModal()` → `{ isModalOpen, modalCourse, modalType, openModal, closeModal }`
- **Usage**: Any component calls `openModal('Course Name')` → ContactModal renders globally

### Data Flow: Enquiry Submission

```
User fills form → ContactForm.jsx validates client-side
    ↓
checkRateLimit()          ← localStorage (3 submissions / 60s)
    ↓
reCAPTCHA widget          ← Google reCAPTCHA v2 checkbox
    ↓
submitEnquiry(payload)    ← src/services/enquiryService.js
    ↓ POST /api/send-enquiry
    ↓
┌─────────────────────────────────────────────────────┐
│  Vercel Serverless Function (api/send-enquiry.js)   │
│                                                     │
│  1. Method guard (POST only)                        │
│  2. Origin validation (ALLOWED_ORIGINS)             │
│  3. User-Agent filtering (block bots)               │
│  4. Referer validation                              │
│  5. Payload size guard (10KB max)                    │
│  6. Honeypot check (hidden "website" field)          │
│  7. Input sanitization (stripHtml, normalizePhone)   │
│  8. Token replay detection (SHA-256)                 │
│  9. Field validation (name, email, message)          │
│ 10. Server-side rate limiting (adaptive IP-based)    │
│ 11. reCAPTCHA server verification + hostname check   │
│ 12. INSERT → Supabase "enquiries" table              │
│ 13. Upsert → Brevo CRM contact                      │
│ 14. Send → Owner notification email (Template #2)    │
│ 15. Send → Auto-reply to student (Template #1)       │
│ 16. UPDATE → Supabase brevo_synced flag              │
└─────────────────────────────────────────────────────┘
    ↓
Response: { success: true, message: "Enquiry submitted" }
    ↓
ContactForm shows success toast → resets form
```

### Component Communication Patterns

| Pattern | Usage |
|---|---|
| **Props drilling** | Page → Section components (e.g., `openModal` passed to `MethodologySection`) |
| **Context** | Theme & Modal state — accessible anywhere via hooks |
| **Data imports** | Components import directly from `src/data/*.js` files |
| **URL params** | `CourseDetail` reads `:slug` from React Router, looks up in `courses` array |
| **Lazy loading** | Pages via `React.lazy()` in App.jsx; below-fold sections lazy in Home.jsx |

### Static Data Architecture

All content is stored as JavaScript objects (no CMS, no API calls for content):

```
src/data/courses.js   →  10 course objects with modules, roles, prerequisites
src/data/branding.js  →  Company info, contact, logos (single source of truth)
src/data/addons.js    →  12 add-on services
src/data/batches.js   →  3 batch schedule configurations
```

This means **content updates require code changes and redeployment**.
# SCOPE AI HUB — Developer Documentation (Part 2)

---

## 5. 🔌 API & SERVICES

### API Endpoints

All API endpoints are Vercel Serverless Functions in the `api/` directory.

---

#### `POST /api/send-enquiry`

**Purpose**: Process student enquiry form submissions.

**Request**:
```json
{
  "user_name": "Raj Kumar",
  "user_email": "raj@example.com",
  "user_phone": "+91 98765 43210",
  "user_location": "Chennai",
  "qualification": "B.Tech",
  "inquiry_type": "Enroll in an AI Program",
  "program_interest": "Machine Learning & Deep Learning",
  "message": "I want to learn about your ML course...",
  "recaptchaToken": "03AGdBq26...",
  "website": ""
}
```

**Response (Success)**: `200`
```json
{ "success": true, "message": "Enquiry submitted successfully." }
```

**Response (Error examples)**:
| Status | Condition |
|---|---|
| `400` | Validation failure (missing name, invalid email, short message) |
| `403` | reCAPTCHA failure, origin mismatch, token replay, bot detection |
| `405` | Non-POST method |
| `413` | Payload > 10KB |
| `429` | Rate limit exceeded |
| `500` | Server error |

**Security Pipeline (15 steps)**: Method guard → Origin check → UA filter → Referer check → Size guard → Honeypot → Sanitize → Token replay → Validate → Rate limit → reCAPTCHA verify → Supabase insert → CRM upsert → Owner email → Auto-reply

---

#### `POST /api/send-trainer`

**Purpose**: Process trainer application form submissions. Identical security pipeline to `send-enquiry`.

**Request**:
```json
{
  "trainer_name": "Dr. Priya Sharma",
  "trainer_email": "priya@example.com",
  "trainer_phone": "+91 87654 32100",
  "experience": "5",
  "expertise": "Machine Learning, NLP",
  "linkedin_url": "https://linkedin.com/in/priya",
  "recaptchaToken": "03AGdBq26...",
  "website": ""
}
```

**Supabase Table**: `trainer_applications`
**Brevo Templates**: Owner Notification (#3), Auto-Reply (#4), CRM List (#4)

---

#### `GET /api/health`

**Purpose**: System health monitoring (used by GitHub Actions + UptimeRobot).

**Without Bearer token** → `200` `{ "status": "ok" }` (minimal, no service details)

**With Bearer token** (`Authorization: Bearer <HEALTH_CHECK_TOKEN>`) → `200`:
```json
{
  "status": "ok",
  "timestamp": "2026-04-26T16:00:00.000Z",
  "services": {
    "environment": "ok",
    "supabase": "ok",
    "brevo": "ok"
  }
}
```

If any service is down: `"status": "degraded"`.

Also supports `HEAD` requests for monitoring tools.

---

### Backend Utility Modules (`api/utils/`)

| Module | Exports | Purpose |
|---|---|---|
| `sanitize.js` | `stripHtml`, `isValidEmail`, `normalizePhone`, `getClientIp`, `isAllowedOrigin`, `isAllowedReferer`, `setSecurityHeaders` | Input cleaning + request validation |
| `rateLimiter.js` | `checkServerRateLimit`, `blockIpFor`, `isTokenReplayed`, `cleanupMemoryCache` | Adaptive IP rate limiting (3-tier: warn/10m block/1hr block) |
| `brevo.js` | `sendBrevoEmail`, `upsertBrevoContact` | Brevo API calls with timeout |
| `recaptcha.js` | `verifyRecaptcha` | Google reCAPTCHA v2 server verification |
| `logger.js` | `generateRequestId`, `createLogger` | Structured JSON logging with request correlation |
| `supabase.js` | `getSupabase` | Singleton Supabase client |

### Error Handling Strategy

**Frontend** (`src/utils/apiErrorHandler.js`):
- Maps HTTP status codes → user-friendly messages
- Never exposes internal server details
- Handles network timeouts gracefully (`AbortError`)

**Backend** (API functions):
- All errors return generic "Request could not be processed" to clients
- Detailed errors logged server-side via structured JSON logger
- Request IDs (`X-Request-ID` header) correlate frontend → backend logs

---

## 6. 🎨 UI/UX WIREFRAMES (TEXT MODE)

### Global Layout (Every Page)

```
┌──────────────────────────────────────────────┐
│ [Logo]  Nav: Home About Courses Admissions   │
│         Career Reviews FAQ Contact  [🌙/☀️]  │
├──────────────────────────────────────────────┤
│                                              │
│              PAGE CONTENT                    │
│                                              │
├──────────────────────────────────────────────┤
│ FOOTER: Links | Contact | Social | Legal     │
├──────────────────────────────────────────────┤
│ [💬 Tawk.to Chat]  [📱 WhatsApp]  [⬆ Scroll]│
└──────────────────────────────────────────────┘
```

### Home Page (11 Sections)

```
┌──────────────────────────────────────────────┐
│ 1. HERO — GSAP Canvas Scroll Animation       │
│    "Shaping the AI Generation"               │
│    [Explore Courses] [Free Career Counseling] │
├──────────────────────────────────────────────┤
│ 2. STATS — Animated counters                 │
│    Students  |  Courses  |  Placements       │
├──────────────────────────────────────────────┤
│ 3. HIRING PARTNERS — Logo marquee            │
├──────────────────────────────────────────────┤
│ 4. COURSES — 6 flagship CourseCards (grid)    │
│    [View All Courses →]                      │
├──────────────────────────────────────────────┤
│ 5. METHODOLOGY — 4-step flip cards           │
│    Learn → Build → Deploy → Grow             │
├──────────────────────────────────────────────┤
│ 6. TESTIMONIALS — Student reviews carousel   │
├──────────────────────────────────────────────┤
│ 7. CAREER SUPPORT — Pipeline visualization   │
├──────────────────────────────────────────────┤
│ 8. TRAINER SPOTLIGHT — Mini trainer section   │
├──────────────────────────────────────────────┤
│ 9. RECOGNITIONS — NASSCOM, ISO, MSME logos   │
├──────────────────────────────────────────────┤
│ 10. FAQ — Top 4 questions (expandable)       │
├──────────────────────────────────────────────┤
│ 11. CTA — "Ready to Build Your Future?"      │
│    [Enroll Now] [Contact Admissions]         │
└──────────────────────────────────────────────┘
```

### Course Detail Page (`/courses/:slug`)

```
┌──────────────────────────────────────────────┐
│ BREADCRUMB: Home > Courses > Course Title     │
├──────────────────────────────────────────────┤
│ HERO SECTION                                 │
│ Course Title · Tier Badge · Duration          │
│ Tagline description                          │
│ Salary Range: ₹X – ₹Y LPA                   │
│ [Enroll Now] [Download Syllabus]             │
├──────────────────────────────────────────────┤
│ CURRICULUM — Module list (M01–M10)           │
│ Each module: code + title                    │
├──────────────────────────────────────────────┤
│ WHO CAN LEARN — Target audience tags         │
├──────────────────────────────────────────────┤
│ PREREQUISITES — Requirements list            │
├──────────────────────────────────────────────┤
│ CAREER ROLES — 6 role cards with emoji icons │
├──────────────────────────────────────────────┤
│ BATCH SCHEDULE — 3 batch options             │
├──────────────────────────────────────────────┤
│ ADD-ONS — Free & premium add-on services     │
├──────────────────────────────────────────────┤
│ CTA — "Start Your Journey"                   │
└──────────────────────────────────────────────┘
```

### Contact Page

```
┌──────────────────────────────────────────────┐
│ HERO: "Get in Touch"                         │
├────────────────────┬─────────────────────────┤
│ CONTACT FORM       │ CONTACT INFO            │
│ • Name *           │ 📧 Email                │
│ • Email *          │ 📞 Phone                │
│ • Phone            │ 📍 Address              │
│ • Inquiry Type     │ 🕐 Office Hours         │
│ • Program Interest │                         │
│ • Message *        │ SOCIAL LINKS            │
│ • reCAPTCHA ☑️     │ Instagram · LinkedIn    │
│ [Submit Enquiry]   │                         │
└────────────────────┴─────────────────────────┘
```

---

## 7. ⚙️ LOCAL DEVELOPMENT SETUP

### Prerequisites
- **Node.js** ≥ 18.x (ES Modules support required)
- **npm** ≥ 9.x
- **Git**

### Step-by-Step

```bash
# 1. Clone the repository
git clone <repo-url> scope_ai_hub
cd scope_ai_hub

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
# Edit .env with your actual keys (see table below)

# 4. Start development server
npm run dev
# → http://localhost:5173

# 5. Run tests
npm test

# 6. Run linter
npm run lint

# 7. Production build (local testing)
npm run build
npm run preview
# → http://localhost:4173
```

### Environment Variables

| Variable | Required | Where Used | Description |
|---|---|---|---|
| `VITE_TAWK_PROPERTY_ID` | Optional | Client | Tawk.to chat widget |
| `VITE_TAWK_WIDGET_ID` | Optional | Client | Tawk.to chat widget |
| `VITE_SENTRY_DSN` | Optional | Client | Sentry error monitoring (prod only) |
| `VITE_RECAPTCHA_SITE_KEY` | **Yes** | Client | Google reCAPTCHA v2 site key |
| `BREVO_API_KEY` | **Yes** | Server | Brevo transactional email API |
| `RECAPTCHA_SECRET_KEY` | **Yes** | Server | reCAPTCHA server verification |
| `SUPABASE_URL` | **Yes** | Server | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | **Yes** | Server | Supabase service role secret |
| `ALLOWED_HOSTNAME` | **Yes** | Server | Expected hostname for reCAPTCHA |
| `ALLOWED_ORIGINS` | **Yes** | Server | Comma-separated allowed CORS origins |
| `HEALTH_CHECK_TOKEN` | Optional | Server | Bearer token for `/api/health` |

> **Important**: `VITE_*` variables are exposed to the browser. All other variables are server-only.

### API Development (Local)

In local dev, the Vite dev server proxies `/api/*` requests to the Vercel production deployment:

```js
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'https://scope-ai-hub.vercel.app',
      changeOrigin: true,
    }
  }
}
```

To test API changes locally, use `vercel dev` (requires Vercel CLI).

### Common Issues

| Issue | Solution |
|---|---|
| `ERR_MODULE_NOT_FOUND` | Ensure `"type": "module"` in package.json |
| reCAPTCHA not loading | Check `VITE_RECAPTCHA_SITE_KEY` in `.env` |
| API returning 403 | Ensure `ALLOWED_ORIGINS` includes `http://localhost:5173` |
| Fonts not loading | Check internet — fonts loaded from Google Fonts CDN |
| Build fails on CSP script | Ensure `dist/` exists (run `vite build` first) |

---

## 8. 🚀 CI/CD PIPELINE

### Git Workflow

```
main (production)
  ├── feature/xyz    ← New features
  ├── fix/xyz        ← Bug fixes
  └── chore/xyz      ← Dependency updates, docs
```

**Branch Strategy**: Trunk-based with feature branches → PR → merge to `main`.

### Build Pipeline

```
git push to main
       ↓
┌──────────────────────────────┐
│  VERCEL AUTO-DEPLOY          │
│                              │
│  1. npm install              │
│  2. vite build               │
│     → dist/ (static bundle)  │
│  3. generate-sitemap.js      │
│     → public/sitemap.xml     │
│  4. generate-csp-hashes.js   │
│     → updates vercel.json    │
│  5. Deploy to Vercel Edge    │
└──────────────────────────────┘
```

### Automated Workflows (GitHub Actions)

| Workflow | Schedule | Purpose |
|---|---|---|
| `heartbeat.yml` | Every 30 min | Ping `/api/health` with bearer token. If degraded → send alert email via Brevo |
| `supabase-heartbeat.yml` | Every 30 min | Keep Supabase free-tier database active (prevents auto-pause) |
| **Dependabot** | Weekly (Monday) | Auto-PR for npm dependency updates |

### Testing Strategy

```bash
npm test          # Run Vitest unit tests
npm run lint      # ESLint check
npm run build     # Verify production build succeeds
```

Current test coverage is focused on utility modules (`src/utils/__tests__/`).

---

## 9. 🌍 DEPLOYMENT ARCHITECTURE

### Hosting: Vercel

```
scopeaihub.com (custom domain)
       ↓
┌──────────────────────────────────────────┐
│  VERCEL EDGE NETWORK (Global CDN)        │
│                                          │
│  Static Assets (dist/)                   │
│  • HTML, CSS, JS bundles                 │
│  • Images (WebP), videos (MP4)           │
│  • Gzip + Brotli compression             │
│  • Immutable cache headers on hashed     │
│    assets                                │
│                                          │
│  Serverless Functions (api/)             │
│  • Node.js 18+ runtime                   │
│  • Auto-scaling (0 to N instances)       │
│  • ~200ms cold start                     │
│  • 10s execution timeout (default)       │
│                                          │
│  SPA Routing                             │
│  • vercel.json rewrite: /* → /index.html │
└──────────────────────────────────────────┘
```

### Security Headers (vercel.json)

| Header | Value |
|---|---|
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `Content-Security-Policy` | Full CSP with script hashes, connect-src whitelist |

### Performance Optimizations

| Technique | Implementation |
|---|---|
| **Code Splitting** | Manual chunks: `vendor` (React), `ui` (Framer/GSAP/Lucide) |
| **Lazy Loading** | All pages via `React.lazy()`, below-fold Home sections lazy |
| **Route Prefetching** | Critical routes prefetched on `requestIdleCallback` |
| **Asset Preloading** | Hero video/frame preloaded in `<head>` |
| **Font Optimization** | `preconnect` to Google Fonts, `display=swap` |
| **Image Format** | All images WebP, `-webkit-optimize-contrast` rendering |
| **Legacy Support** | `@vitejs/plugin-legacy` for Chrome 100+ |
| **Pre-rendering** | `react-snap` pre-renders 20+ routes for SEO crawlers |

---

## 10. 📏 CODING STANDARDS

### Naming Conventions

| Type | Convention | Example |
|---|---|---|
| Page components | PascalCase | `About.jsx`, `FAQ.jsx` |
| UI components | PascalCase | `CourseCard.jsx`, `Hero.jsx` |
| Home sections | PascalCase + `Section` | `BatchScheduleSection.jsx` |
| Context files | PascalCase + `Context` | `ThemeContext.jsx` |
| Data files | camelCase `.js` | `courses.js`, `branding.js` |
| Utility modules | camelCase `.js` | `rateLimiter.js` |
| Test files | `*.test.js` | `rateLimiter.test.js` |

### File Rules
- React components: `.jsx` extension
- Non-React JavaScript: `.js` extension
- **No TypeScript** — JavaScript only
- Default exports for pages, named exports for utilities/data

### Component Template

```jsx
import React from 'react';
import Layout from '../components/layout/Layout';
import SEO from '../components/utils/SEO';

const PageName = () => {
  return (
    <Layout>
      <SEO
        title="Page Title"
        description="120-160 char description."
        canonical="/page-slug"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Page Title', path: '/page-slug' },
        ]}
      />
      {/* Content */}
    </Layout>
  );
};

export default PageName;
```

### CSS / Styling Rules
- Use **TailwindCSS v4** utilities with CSS-first config (no `tailwind.config.js`)
- Use **CSS variables** for all theme-dependent colors
- Use `cn()` from `src/lib/utils.js` for conditional class merging
- Use pre-defined component classes: `glass-card`, `glass-button`, `dark-section`, `btn-primary`, `btn-secondary`
- Use typography system classes: `heading-hero`, `heading-lg`, `heading-sm`, `text-body`, `text-caption`
- **Banned**: `bg-white/5`, `bg-white/10`, `border-white/10` — use glass tokens instead

### Animation Rules
1. **Framer Motion** (primary) → use wrappers from `Animations.jsx`
2. **GSAP** → scroll-driven canvas only
3. All viewport animations: `viewport={{ once: true }}`
4. Respect `prefers-reduced-motion`

---

## 11. 📈 SCALABILITY & IMPROVEMENTS

### Performance Upgrades

| Area | Current | Recommended |
|---|---|---|
| **Rate Limiting** | In-memory Map (per-container) | Upgrade to **Upstash Redis** for global rate limiting |
| **Content Management** | Hardcoded JS data files | Consider **headless CMS** (Sanity/Strapi) for non-dev content updates |
| **Image Optimization** | Static WebP in `public/` | Add **Vercel Image Optimization** or Cloudinary |
| **Bundle Size** | ~1MB warning threshold | Analyze with `npx vite-bundle-visualizer`, consider dynamic imports for heavy UI components |
| **Font Loading** | Google Fonts CDN | Self-host fonts for GDPR compliance and performance |

### Architecture Upgrades

| Area | Recommendation |
|---|---|
| **State Management** | If complexity grows, consider Zustand over additional Contexts |
| **API Layer** | Add API versioning (`/api/v1/`) for backward compatibility |
| **Database** | Add indexes on `enquiries.email` and `enquiries.created_at` for query performance |
| **Testing** | Expand from unit tests → integration tests (Playwright/Cypress for form flows) |
| **Monitoring** | Add **Vercel Analytics** and **Web Vitals** tracking |
| **Accessibility** | Fix `user-scalable=0` in viewport meta (known WCAG issue) |
| **Email** | Move from template IDs to template names for maintainability |
| **Search** | Add client-side course search/filter on CoursesList page |

### Code Refactoring Suggestions

1. **Header.jsx (50KB)**: Largest component — extract mega-menu, mobile-menu, and navigation into sub-components
2. **ContactForm.jsx (22KB)**: Extract form field components, validation logic into custom hooks
3. **CourseDetail.jsx (21KB)**: Extract section components (curriculum, roles, prerequisites)
4. **Duplicate Security Logic**: `send-enquiry.js` and `send-trainer.js` share ~70% identical code — extract shared middleware

---

## 12. 🧭 DEVELOPER ONBOARDING GUIDE

### First Day Checklist

1. **Read this document** (you're here!)
2. **Clone & run locally** (Section 7)
3. **Read these files first** (in order):
   - `src/App.jsx` — Understand routing, provider hierarchy
   - `src/index.css` — Understand the design system tokens
   - `src/data/courses.js` — Understand the data model
   - `src/data/branding.js` — Understand brand constants
   - `src/components/layout/Layout.jsx` — Understand page wrapper
   - `src/components/utils/SEO.jsx` — Understand SEO implementation
   - `api/send-enquiry.js` — Understand the backend pipeline

### Safe Areas to Modify

| Area | Risk Level | Notes |
|---|---|---|
| `src/data/*.js` | 🟢 Low | Content changes. Update courses, addons, batches safely |
| `src/pages/*.jsx` | 🟢 Low | Individual pages are isolated |
| `src/components/home/*.jsx` | 🟡 Medium | Home page sections — test in both themes |
| `src/components/ui/*.jsx` | 🟡 Medium | Shared UI — check all usage sites |
| `src/index.css` | 🔴 High | Design system — changes affect entire site |
| `api/*.js` | 🔴 High | Backend security — test thoroughly |
| `vercel.json` | 🔴 High | Security headers + CSP — test after changes |
| `vite.config.js` | 🔴 High | Build config — can break production |

### Adding a New Page

1. Create component in `src/pages/NewPage.jsx` using the component template
2. Add lazy import in `src/App.jsx`: `const NewPage = lazy(() => import('./pages/NewPage'))`
3. Add route: `<Route path="/new-page" element={<NewPage />} />`
4. Add to `scripts/generate-sitemap.js` `staticRoutes` array
5. Add to `package.json` `reactSnap.include` array
6. Run `npm run build` to regenerate sitemap and CSP hashes

### Adding a New Course

1. Add course object to `src/data/courses.js` (follow existing structure)
2. Assign correct `tier` and unique `slug`
3. Run `npm run build` — sitemap auto-generates the new `/courses/:slug` URL
4. The `CourseDetail.jsx` page handles rendering dynamically

### Key Architecture Decisions to Understand

1. **Why no CMS?** — Content is small and stable; JS data files provide type safety and zero API latency
2. **Why React Context over Redux?** — Only 2 global states (theme, modal); Context is sufficient
3. **Why in-memory rate limiting?** — Acceptable given reCAPTCHA is the primary defense; Upstash is the upgrade path
4. **Why react-snap?** — SPA pre-rendering for SEO without switching to SSR/Next.js
5. **Why TailwindCSS v4 CSS-first?** — No `tailwind.config.js` needed; everything in `index.css` `@theme` block
6. **Why dual hero (video + canvas)?** — Mobile gets lightweight MP4, desktop gets premium GSAP frame sequence

---

> **Document maintained by**: Engineering Team
> **Last comprehensive review**: 2026-04-26
