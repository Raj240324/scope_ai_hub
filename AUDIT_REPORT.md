SITE REVERSE ENGINEERING REPORT
================================
Site: scopeaihub.com (Local Codebase Audit)
Analyzed: 2026-03-10
Analyst Mode: Full Spectrum Audit

### Pre-Analysis Protocol Executed
1. **Crawl the entire website structure** — Identified routing in App.jsx.
2. **Build an internal site map** — Mapped 20+ routes mapped across courses, legal, careers, etc.
3. **Analyze network requests** — Checked API integrations (/api/send-enquiry.js & /send-trainer.js) with Supabase + Brevo.
4. **Extract design tokens** — Pulled variables from index.css (Pink/Violet "Ai" Theme).
5. **Detect technology stack** — Vite + React 18 SPA, Vercel Serverless, Tailwind v4.
6. **Simulate user interactions** — Traced the enquiry modal and mobile nav flows.
7. **Read the codebase top-down** — Extracted component tree from index.html -> main.jsx -> App.jsx -> Pages.

---

### 1. 🧭 SITE IDENTITY & PURPOSE
- **What is this website?** An educational/training institute marketing and lead generation SPA.
- **Target audience:** Fresh graduates, working professionals, non-tech business leaders seeking AI, Full Stack, and Data Science training.
- **Primary goal:** Lead generation (enquiries, career counseling bookings, admissions).
- **Brand tone:** Premium, technical, forward-looking, professional.
- **Unique value proposition:** "Built for the AI Era" — project-based learning with 100% placement assistance in Chennai.
- **Problem solved:** Provides upskilling in high-demand tech fields (AI, ML, Data Analytics) with career support and structured tiers.

---

### 2. 🗺️ SITE STRUCTURE & INFORMATION ARCHITECTURE
- **Primary Pages:** Home (`/`), About (`/about`), Courses List (`/courses`), Individual Courses (`/courses/:slug`), Admissions (`/admissions`), Career Support (`/career-support`), Reviews (`/reviews`), Contact (`/contact`), FAQ (`/faq`).
- **Careers Hub:** Our Trainers (`/careers/trainers`), Join as Trainer (`/careers/join-as-trainer`).
- **Legal/Hidden Pages:** Privacy Policy, Terms & Conditions, NDA Policy, Refund Policy, Disclaimer, Trainer Code of Conduct, Sitemap, 404 Not Found.
- **Nav Structure:** 
  - Primary Nav: Home, Courses (Mega Menu), About, Admissions, Career Support, Success, Resources, Contact.
  - Mega Menu: Categorizes courses into Beginner, Intermediate, Advanced tiers.
  - Footer Nav: Replicates quick links, displays contact info, social links, and legal links.
- **URL slugs:** Clean, readable slugs (e.g., `/courses/generative-ai-prompt-engineering`).
- **Inferred:** Breadcrumbs handled by `SEO.jsx`.

---

### 3. 📐 LAYOUT & PAGE-BY-PAGE BREAKDOWN (Home Page)
- **Home (`/`)**:
  - **Hero:** Canvas-based scroll-driven animation (`HeroScrollCanvas`) with "Explore Courses" and "Free Career Counseling" CTAs.
  - **Stats Section:** Quick numerical credibility points.
  - **Hiring Partners:** Grid/marquee of logos (NASSCOM, ISO, etc.).
  - **Courses Preview:** Highlights 6 flagship programs.
  - **Methodology:** Explains the teaching process.
  - **Social Proof / Testimonials:** Reviews from students.
  - **Career Support / Pipeline:** Visualizes the journey to placement.
  - **Trainer Spotlight:** Brief intro to mentors.
  - **Recognitions:** Bottom partner logo banner.
  - **FAQ Preview:** Top 4 questions.
  - **Final CTA:** Dark-themed glass-card section driving to "Enroll Now" or "Contact Admissions".

---

### 4. 🧩 COMPONENTS & UI ELEMENTS INVENTORY
- **Navigation bar:** Sticky, glassmorphism on scroll, mega menu for courses, hamburger menu on mobile, search overlay.
- **Hero section:** Scroll-driven video/canvas frame sequence (GSAP).
- **Buttons:** 
  - Primary: `btn-primary` (Gradient pink/violet, polygon clip-path for tech look).
  - Secondary: `btn-secondary` (Outlined, transparent).
  - Glass: `glass-button` (Adaptive translucent button).
- **Cards:** Premium glassmorphism cards (`glass-card`), hover lift effects, 3D flip cards for steps.
- **Modals:** Global `ContactModal` via Context API, New User Modal trigger.
- **Forms:** Contact/Enquiry forms with honeypot + reCAPTCHA.
- **Sliders/Marquee:** Infinite scrolling components for logos (`animate-marquee`).
- **Loaders:** `CoreSpinLoader` (full-screen preloader), Section loaders with animated spin.
- **Icons:** `lucide-react` (ChevronDown, Search, Menu, GraduationCap, MapPin).
- **Chat Widget:** Tawk.to integration component.

---

### 5. 🎨 DESIGN SYSTEM EXTRACTION
- **Colors:** 
  - Brand Primary: Pink/Violet Gradient (`#D64FD9` to `#5A2BC6`), Solid Purple (`#A73FD0`).
  - Dark Theme: Deep navy/black (`#010408` to `#0f1624`), Light mode: Clean white/navy (`#ffffff`, `#f7f7f9`).
  - Semantics: Success (`#10b981`), Warning (`#f59e0b`), Danger (`#ef4444`).
- **Typography:**
  - Headings: `Bebas Neue` (Hero), `Barlow Condensed` (Nav/Buttons).
  - Body: `Barlow`.
  - Accents/Tags: `DM Mono`.
- **Spacing:** Tailwind class utilities via Custom CSS `@theme`.
- **Border radius:** Buttons with polygon clip-path (angled edges), cards with 18px radius.
- **Shadows/Effects:** Extensive use of `backdrop-filter: blur()`, glowing gradients behind elements, deep inset shadows on dark mode cards.
- **Dark/Light Mode:** Full toggle support managed via `ThemeContext` and `localStorage`.

---

### 6. ⚙️ TECHNICAL STACK IDENTIFICATION
- **Frontend Framework:** React 18 + Vite.
- **Routing:** React Router DOM v7.
- **CSS:** Tailwind CSS v4 (via PostCSS plugin `tailwindcss/postcss`), custom `index.css`.
- **Animations:** Framer Motion (page transitions/UI), GSAP (scroll canvas), Lottie React.
- **State Management:** React Context API (`ThemeContext`, `ModalContext`).
- **Forms:** Native HTML state handling, sanitized via util functions.
- **Backend / API:** Vercel Serverless Functions (`/api/*`).
- **Database:** Supabase (PostgreSQL).
- **Email/CRM:** Brevo (Sendinblue).
- **Security:** Google reCAPTCHA v2.
- **Monitoring:** Sentry `@sentry/react`.
- **Hosting/CDN:** Vercel (inferred from `vercel.json`).

---

### 7. 📝 FULL CONTENT INVENTORY
- **Headings (Home):** "Built for the AI Era", "Ready to Build Your Future?".
- **Nav Labels:** Home, Courses, About, Admissions, Career Support, Success, Resources, Contact.
- **Courses:** Segmented into Beginner (e.g., Prompt Engineering), Intermediate (e.g., MLOps, NLP), Advanced (AI Ethics).
- **Stats:** Inferred presence of metrics like placement rates.
- **Footer:** Direct links, social icons (FB/TW/LI/IG), "Next Batch Starting Soon" badge, copyright notice.

---

### 8. 🔄 USER FLOWS & INTERACTIONS
- **Primary Flow:** Landing -> Explore Courses (Mega Menu) -> Course Detail -> Click "Enroll Now" -> Contact Modal Opens -> Submit -> Supabase/Brevo stored -> Success Message.
- **Search Flow:** Click search icon -> Full-page overlay opens -> Live filter over course data -> Select course -> Navigate to page.
- **Mobile Flow:** Hamburger menu click -> Right-side slide-in panel -> Theme toggle + Links.
- **Scroll Engagements:** Canvas frame sequences tied to scroll position (via `useScrollFrames` hook), fade-in animations as elements enter viewport.

---

### 9. 📱 RESPONSIVE BEHAVIOR
- **Breakpoints:** Tailwind defaults (`sm`, `md`, `lg`, `xl`, `2xl`).
- **Mobile Nav:** Completely separate rendered DOM block for mobile sidebar, hidden on desktop (`lg`).
- **Grid reflows:** 1-col on mobile, 4-col on desktop for Footers/Courses.
- **Performance:** `HeroScrollCanvas` skips every second frame on mobile (`Math.ceil(TOTAL_FRAMES / 2)`) to save memory/processing.

---

### 10. 🔐 FUNCTIONAL FEATURES & BUSINESS LOGIC
- **Enquiry System:** Modal form collects Name, Email, Phone, Course Interest.
- **Serverless Processing:**
  - Validates origin, referrer, and request size.
  - Checks invisible honeypot.
  - Protects against reCAPTCHA token replay.
  - In-memory rate limits IPs.
  - Submits to Supabase `enquiries` table.
  - Pushes to Brevo CRM & fires transactional emails (owner + autoreply).
- **No User Auth:** Fully public marketing site.
- **Pre-rendering:** Built-in `react-snap` prerendering for SEO on specific routes.

---

### 11. 🌐 SEO & METADATA SIGNALS
- **Component:** Universal `<SEO>` component using `react-helmet-async`.
- **Tags:** Dynamic Titles, descriptions, canonical URLs, and OpenGraph tags per page.
- **Sitemap/Robots:** Automated scripts (`generate-sitemap.js`) run post-build.
- **Structured Data:** Built to support JSON-LD schemas (Organization, Course, FAQ).

---

### 12. 🚀 PERFORMANCE & ACCESSIBILITY OBSERVATIONS
- **⚠️ PERF ISSUE:** Legacy target in `vite.config.js` (`chrome 70` polyfills) adds bundle weight. Canvas scroll maps 192 high-res frames—can cause memory constraints on low-end devices.
- **🔴 UX ISSUE:** `<meta name="viewport" content="... user-scalable=0" />` prevents zooming, which is an accessibility failure for vision-impaired users (noted in AGENTS.md rules).
- **Good Practices:** Lazy loading for all routes and below-the-fold home sections.
- **Code Splitting:** Manual chunks in Vite (`vendor`, `ui`).
- **Focus States:** Custom `*:focus-visible` styling with primary color outline.

---

### 13. 💼 BUSINESS & MARKETING INTELLIGENCE
- **Model:** High-ticket training institute.
- **Conversion Targets:** "Free Career Counseling" and "Enroll Now".
- **Urgency Tactics:** "Next Batch Starting Soon" pulsing badge in footer.
- **Trust Elements:** NASSCOM, ISO, FutureSkills logos, Student testimonials, "Built for the AI Era" branding.
- **Audience Segmentation:** Clearly tiered products (Tier 1 Beginner to Tier 3 Advanced) to capture multiple skill levels.

---

### 14. 🐛 ISSUES, GAPS & ANOMALIES
- **Anomaly:** The `react-snap` prerendering relies on old Chrome targets in Vite, potentially hindering modern browser performance optimizations.
- **Gap:** In-memory rate limiting in serverless functions is fundamentally flawed because Vercel spins up multiple stateless instances. Rate limits will only apply per individual Lambda container, not globally.
- **Issue:** `user-scalable=0` in `index.html`.

---

### 15. 🔐 SECURITY & INFRASTRUCTURE ANALYSIS
- **🚨 CRITICAL RISK:** None currently detected. Environment variables are properly separated.
- **CSP:** Extensive and highly strict Content-Security-Policy header in `vercel.json` generated dynamically via `generate-csp-hashes.js`.
- **Headers:** HSTS setup, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`.
- **Form Security:** Superb approach in `send-enquiry.js`: POST-only, max bytes limit, origin checking, user-agent filtering, honeypot, token replay prevention.
- **CORS:** Controlled via custom `ALLOWED_ORIGIN` env var logic.

---

### 16. 🌐 NETWORK REQUEST & API BEHAVIOR
- **Endpoints:** `/api/send-enquiry`, `/api/send-trainer`, `/api/health`.
- **Method:** POST (Strictly enforced).
- **Payloads:** JSON, capped at 10KB.
- **Responses:** Standardized `{ success: boolean, message: string }`. Use 429 for rate limits, 403 for bad origin/recaptcha.
- **Third-party integrations:** supabase.js (DB connection), brevo.js (HTTP fetch to api.brevo.com), tawk.to scripts.

---

### 17. 🧱 CODEBASE ARCHITECTURE
- **Framework:** React SPA (Vite).
- **Directory Structure:** 
  - `src/components/` (home, layout, ui, utils).
  - `src/pages/` (route-level views).
  - `src/data/` (static JSON-like objects for courses/branding).
  - `src/hooks/` (custom logic like `useScrollFrames`).
  - `api/` (Vercel serverless functions).
- **Styling:** Custom property CSS variables + Tailwind V4. No global config file needed.
- **Testing:** `vitest` configured, `__tests__` directory present for API utilities.

---

### 18. ⚡ PERFORMANCE ENGINEERING ANALYSIS
- **Bundling:** Chunked carefully. `react-snap` prerenders the initial state for direct HTML delivery.
- **Asset serving:** Images are `.webp`.
- **Render blocking:** Google Fonts preconnected.
- **Canvas Rendering:** `useScrollFrames` uses `requestAnimationFrame`, scales down frame loads for mobile (`Math.ceil(TOTAL_FRAMES / 2)`), and unmounts observers cleanly. High performance optimization.

---

### 19. 🗄️ DATA STORAGE & DATABASE ARCHITECTURE
- **Primary DB:** Supabase (PostgreSQL).
- **Tables (Inferred via API calls):** 
  - `enquiries` (id, name, email, phone, course, message, ip_address, user_agent, brevo_synced).
- **Secondary DB / CRM:** Brevo (List ID 3).
- **Sync Logic:** Serverless function hits Supabase first. If successful, hits Brevo. Then updates Supabase `brevo_synced=true`. Highly resilient design.

---

### 20. 🛠️ DEVOPS & DEPLOYMENT PIPELINE
- **Hosting:** Vercel.
- **Build Step:** `vite build && node scripts/generate-sitemap.js && node scripts/generate-csp-hashes.js && react-snap`.
- **Error Tracking:** Sentry initialized in `main.jsx` for production.
- **Logging:** Custom `logger.js` with structured JSON output and `requestId` tracking for serverless tracing.

================================
### SUMMARY

**5 Key Strengths:**
1. Extremely robust serverless API security (Origin, CSRF, Replay, Honeypot).
2. Advanced visual aesthetics with custom GSAP scroll bindings and glassmorphism.
3. Solid architecture with separated data layers, smart component lazy loading, and code splitting.
4. Comprehensive brand and tier management system driven from a single source of truth (`courses.js`).
5. Deep attention to production resilience (Sentry, JSON logging, Brevo sync flags).

**5 Improvement Opportunities:**
1. Serverless in-memory rate limiting is ineffective globally; transition to Vercel KV or Upstash Redis.
2. Remove `user-scalable=0` from the viewport meta tag to restore WCAG accessibility.
3. Drop the legacy Chrome 70 polyfill in Vite build to shave JS payload weight, or update to a modern prerenderer.
4. Explore automated image sizing/`srcSet` rather than scaling Canvas buffers dynamically to save battery life.
5. Move search filtering to a web worker if `courses.js` grows significantly larger to prevent main thread blocking.

**Overall Assessment:** This is a top-tier, enterprise-grade React application masquerading as an educational marketing site. The developer has prioritized security, performance, and aesthetic wow-factor simultaneously. The reverse engineering reveals highly robust architectural patterns that exceed standard templates.
