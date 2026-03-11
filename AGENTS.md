# AGENTS.md — SCOPE AI HUB Development Rules

> This file defines all development rules, architectural patterns, and conventions
> for the **SCOPE AI HUB** codebase. AI agents and developers MUST follow these
> rules exactly. Any deviation will introduce inconsistency and technical debt.

---

## 1. Project Overview

**SCOPE AI HUB** is a production React single-page application for an AI training
institute based in Chennai, India. The site serves as the primary marketing,
course catalog, and student acquisition platform.

| Property          | Value                                          |
| ----------------- | ---------------------------------------------- |
| **Domain**        | `scopeaihub.com`                               |
| **Hosting**       | Vercel (static SPA + serverless API functions) |
| **Repository**    | Private — `scope_ai_hub`                       |
| **Node Engine**   | ES Modules (`"type": "module"`)                |
| **Primary Users** | Prospective students, trainers, business leads |

---

## 2. Technology Stack

### Core

| Technology       | Version | Role                        |
| ---------------- | ------- | --------------------------- |
| React            | 18.x    | UI library                  |
| Vite             | 7.x     | Build tool & dev server     |
| React Router DOM | 7.x     | Client-side routing         |
| TailwindCSS      | 4.x     | Utility-first CSS framework |
| PostCSS          | 8.x     | CSS processing pipeline     |
| Autoprefixer     | 10.x    | Vendor prefix management    |

### Animation

| Library       | Usage                                                           |
| ------------- | --------------------------------------------------------------- |
| Framer Motion | Primary animation — FadeIn, Stagger, Parallax, page transitions |
| GSAP          | Scroll-driven canvas animations (`HeroScroll`), `ScrollTrigger` |
| Anime.js      | Available for micro-interactions                                |
| Lottie React  | JSON-based vector animations (404, Mission, Vision)             |

### UI & Utilities

| Library            | Role                                   |
| ------------------ | -------------------------------------- |
| Lucide React       | Icon library (tree-shakable SVG icons) |
| clsx               | Conditional class merging              |
| tailwind-merge     | TailwindCSS class conflict resolution  |
| react-helmet-async | Per-page `<head>` management & SEO     |

### Backend & Services

| Service             | Role                                        |
| ------------------- | ------------------------------------------- |
| Supabase            | Primary database (enquiries table)          |
| Brevo (Sendinblue)  | Transactional email + CRM contacts          |
| Google reCAPTCHA v2 | Bot protection on forms                     |
| Sentry              | Frontend error monitoring (production only) |
| Tawk.to             | Live chat widget                            |

### Dev & Testing

| Tool            | Role                               |
| --------------- | ---------------------------------- |
| Vitest          | Unit testing framework             |
| Testing Library | React component testing            |
| jsdom           | Test environment                   |
| ESLint 9        | Linting (flat config)              |
| react-snap      | Pre-rendering for SEO (local only) |

---

## 3. Folder Structure Rules

```
scope_ai_hub/
├── api/                    # Vercel serverless functions (Node.js)
│   ├── utils/              # Shared backend utilities
│   │   ├── brevo.js        # Brevo email / CRM helpers
│   │   ├── logger.js       # Structured JSON logging
│   │   ├── rateLimiter.js  # Server-side IP rate limiting
│   │   ├── recaptcha.js    # reCAPTCHA verification
│   │   ├── sanitize.js     # Input sanitization & validation
│   │   └── supabase.js     # Supabase client singleton
│   ├── health.js           # Health check endpoint
│   ├── send-enquiry.js     # Student enquiry handler
│   └── send-trainer.js     # Trainer application handler
├── public/                 # Static assets (copied to dist as-is)
│   ├── robot_arm_hero.mp4  # Canvas animation source video
│   ├── robots.txt          # Search engine directives
│   └── sitemap.xml         # Auto-generated XML sitemap
├── scripts/                # Build pipeline scripts
│   ├── generate-sitemap.js # Sitemap generator (runs on build)
│   └── generate-csp-hashes.js # CSP hash auto-updater (runs on build)
├── src/
│   ├── assets/             # Bundled assets (imported via JS)
│   │   └── animations/     # Lottie JSON animation files
│   ├── components/
│   │   ├── home/           # Home page section components
│   │   ├── layout/         # App-wide structural components
│   │   ├── sections/       # Shared section components (cross-page)
│   │   ├── ui/             # Reusable UI primitives & widgets
│   │   └── utils/          # Utility components (SEO, Animations, ScrollToTop)
│   ├── context/            # React Context providers
│   ├── data/               # Static data objects (courses, branding, addons)
│   ├── lib/                # Helper functions (cn utility)
│   ├── pages/              # Route-level page components
│   │   ├── career-support/ # Career support page
│   │   ├── careers/        # Trainer-related pages
│   │   ├── courses/        # Course listing & detail pages
│   │   └── legal/          # Legal / policy pages
│   ├── services/           # Frontend API service layer
│   └── utils/              # Frontend utility modules
│       └── __tests__/      # Unit tests (Vitest)
├── index.html              # SPA entry point
├── vite.config.js          # Build configuration
├── vitest.config.js        # Test configuration
├── eslint.config.js        # ESLint flat config
├── postcss.config.js       # PostCSS + TailwindCSS
├── vercel.json             # Deployment config + security headers
└── package.json            # Dependencies & scripts
```

### Rules

- **NEVER** create files outside the established directory structure.
- New **pages** go in `src/pages/` (or a subdirectory matching the route).
- New **reusable UI components** go in `src/components/ui/`.
- New **home page sections** go in `src/components/home/`.
- **Cross-page shared sections** go in `src/components/sections/`.
- **Layout-level** components (Header, Footer, ErrorBoundary) go in `src/components/layout/`.
- **Utility components** (non-visual helpers) go in `src/components/utils/`.
- Static data (courses, addons, branding) go in `src/data/`.
- API service abstraction layers go in `src/services/`.
- General-purpose JS utilities go in `src/utils/`.
- The `cn()` helper function in `src/lib/utils.js` (clsx + twMerge) MUST be used for conditional class merging.
- **Lottie JSON** animation files go in `src/assets/animations/`.
- **Static images** (.webp) for public access go in `public/`.
- Canvas animations are driven by optimized video files (e.g., `.mp4`) in `public/`.

---

## 4. Component Development Rules

### Naming Conventions

| Type               | Convention                    | Example                                |
| ------------------ | ----------------------------- | -------------------------------------- |
| Page components    | PascalCase                    | `About.jsx`, `FAQ.jsx`                 |
| UI components      | PascalCase                    | `CourseCard.jsx`, `Hero.jsx`           |
| Home sections      | PascalCase + `Section` suffix | `CTASection.jsx`                       |
| Utility components | PascalCase                    | `ScrollToTop.jsx`, `SEO.jsx`           |
| Context files      | PascalCase + `Context` suffix | `ThemeContext.jsx`                     |
| Data files         | camelCase                     | `courses.js`, `branding.js`            |
| Utility modules    | camelCase                     | `rateLimiter.js`, `apiErrorHandler.js` |
| Test files         | `*.test.js`                   | `rateLimiter.test.js`                  |

### File Extension

- **ALL React component files** use `.jsx` extension.
- **ALL non-React JS files** (data, utils, services, API) use `.js` extension.
- This project uses **JavaScript only** — do NOT introduce TypeScript.

### Component Template

Every page component MUST follow this pattern:

```jsx
import React from "react";
import Layout from "../components/layout/Layout";
import SEO from "../components/utils/SEO";
import { FadeIn } from "../components/utils/Animations";

const PageName = () => {
  return (
    <Layout>
      <SEO
        title="Page Title"
        description="Page description for SEO."
        canonical="/page-slug"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Page Title", path: "/page-slug" },
        ]}
      />
      {/* Page content */}
    </Layout>
  );
};

export default PageName;
```

### Exports

- Pages use **default exports** (`export default PageName;`).
- Utility components and animation wrappers use **named exports**.
- Context providers export both the `Provider` component and a custom hook (`useTheme`, `useModal`).
- Data files use **named exports** (`export const courses = [...]`).

### Imports

- Use **absolute-from-src imports** are NOT configured; use relative imports.
- Group imports in this order:
  1. React / third-party libraries
  2. Layout / structural components
  3. UI components
  4. Context hooks
  5. Data / utilities / services
  6. CSS / assets

### Lazy Loading

- **ALL page components** MUST be lazy-loaded in `App.jsx` via `React.lazy()`.
- Never directly import page components.
- The `<Suspense>` fallback is a minimal empty `<div>` with body background color.

---

## 5. Styling Rules

### TailwindCSS v4

- This project uses **TailwindCSS v4** with the PostCSS plugin (`@tailwindcss/postcss`).
- The `@theme` directive in `src/index.css` defines all custom design tokens.
- The `@layer base`, `@layer components` directives organize custom CSS.
- **DO NOT** use a `tailwind.config.js` file — TailwindCSS v4 uses CSS-first configuration.

### CSS Variable System

All theme-dependent colors MUST use CSS custom properties (variables), NOT hardcoded hex values:

```
/* Layout */
var(--bg-body)       var(--bg-secondary)    var(--bg-card)
var(--text-body)     var(--text-heading)    var(--text-muted)
var(--border-color)

/* Header */
var(--bg-header)     var(--text-nav)        var(--text-nav-active)

/* Footer */
var(--bg-footer)     var(--text-footer)     var(--text-footer-muted)

/* Buttons */
var(--btn-primary-gradient)   var(--btn-primary-text)
var(--btn-secondary-border)   var(--btn-secondary-text)

/* Inverted Sections */
var(--bg-inverted)   var(--text-on-inverted)
```

### Brand Colors

The brand palette is pink/violet gradient. These are defined under `@theme`:

```
--color-brand-highlight: #D64FD9    (Lightest pink)
--color-brand-mid-high:  #C445D4
--color-brand-purple:    #A73FD0    (Primary solid)
--color-brand-mid-low:   #7B36CC
--color-brand-deep:      #5A2BC6    (Deepest violet)
```

### Component Classes

Use the pre-defined component classes from `index.css`:

| Class              | Purpose                                            |
| ------------------ | -------------------------------------------------- |
| `container-custom` | Max-width layout container with responsive padding |
| `btn-primary`      | Gradient CTA button with glow hover                |
| `btn-secondary`    | Outlined secondary button                          |
| `section-padding`  | Standard section vertical padding                  |
| `heading-lg`       | Large heading (hero-level)                         |
| `heading-md`       | Medium heading (section-level)                     |
| `no-scrollbar`     | Hide scrollbar on overflow containers              |
| `blur-layer`       | GPU-accelerated layer for blur effects             |
| `glass-card`       | Adaptive glass container surface                   |
| `glass-button`     | Adaptive glass button surface                      |
| `dark-section`     | Deep layered background wrapper for inverted UI    |

### Forbidden Glass Utilities

The following Tailwind utilities are **banned** for creating glass surfaces, as they break contrast in dark mode against dark containers:

- `bg-white/5`
- `bg-white/10`
- `bg-white/20`
- `bg-[var(--bg-body)]/10`
- `bg-[var(--bg-secondary)]/10`
- `border-white/10`
- `border-white/20`

**Instead, strictly use:**

- `.glass-card` for cards, panels, and containers.
- `.glass-button` for CTA buttons on dark sections.
- `.dark-section` for the container background wrapper.

### Class Merging

When conditionally combining classes, use the `cn()` utility:

```jsx
import { cn } from "../../lib/utils";

<div className={cn("base-class", isActive && "active-class")} />;
```

## 5.1 Typography System

## Typography System Rules

The project follows a standardized typography system to maintain visual
consistency across the entire website.

Arbitrary font sizes are strictly prohibited.

### Do NOT use

text-[9px]
text-[10px]
text-[11px]
text-[13px]
text-[17px]
text-[19px]
text-[22px]

or any other custom Tailwind font size utilities.

### Always use the global typography classes

.heading-hero
.heading-lg
.heading-md
.heading-sm

.text-body-lg
.text-body
.text-small
.text-caption
.text-muted

These classes are defined in `src/index.css` under `@layer components`.

### Typography Role Mapping

Hero titles  
→ `.heading-hero`

Section titles  
→ `.heading-lg`

Subsection titles / card titles  
→ `.heading-sm`

Body paragraphs  
→ `.text-body`

Large body text / hero subtitle  
→ `.text-body-lg`

Small metadata text  
→ `.text-small`

Captions / tags / helper text  
→ `.text-caption`

Muted secondary text  
→ `.text-muted`

### Accessibility Rules

Minimum font sizes must follow WCAG readability guidelines:

Body text → 16px minimum  
Small text → 14px minimum  
Caption text → 12px minimum

Text smaller than **12px is strictly forbidden**.

### Responsive Typography

All heading classes must include responsive scaling:

Hero headings  
text-4xl sm:text-5xl md:text-6xl lg:text-7xl

Large headings  
text-3xl sm:text-4xl md:text-5xl

Medium headings  
text-2xl sm:text-3xl md:text-4xl

### Component Rules

Components must not define their own typography scale.

Instead they must use the standardized classes.

Examples:

Card title  
.heading-sm

Card description  
.text-body

Button text  
.text-small font-semibold

Form labels  
.text-small

Form helper text  
.text-caption

### AI Agent Enforcement

AI agents modifying this repository MUST follow the typography system.

If typography inconsistencies are detected, agents must refactor components
to use the standardized classes instead of creating new font size utilities.

### Design System Goal

The typography system ensures the site maintains a professional design
standard similar to modern SaaS platforms such as Stripe, Linear, and Vercel.

## All new components must comply with this system.

## 6. Theme (Light / Dark) Rules

### Implementation

- Theme is managed via `src/context/ThemeContext.jsx`.
- The `ThemeProvider` wraps the entire app in `App.jsx`.
- Theme state is persisted in `localStorage` under key `theme`.
- Falls back to system preference via `prefers-color-scheme`.
- The `dark` class is toggled on `<html>` element.

### Rules

1. **NEVER** hardcode light-only or dark-only colors. Always use CSS variables.
2. Light theme selectors use `:root { ... }`.
3. Dark theme selectors use `.dark { ... }`.
4. ALL new components MUST look correct in BOTH themes.
5. The `ThemeToggle` component in `src/components/ui/ThemeToggle.jsx` provides the UI.
6. Test ALL visual changes in both light and dark mode before committing.

### Logo Handling

- Light mode uses `Logo_Dark.webp` (dark logo on white background).
- Dark mode uses `Logo_White.webp` (white logo on dark background).
- Logo paths are centralized in `src/data/branding.js`.

---

## 7. Animation Rules

### Animation Hierarchy

Use animation tools in this order of preference:

1. **Framer Motion** — Primary. Use for all standard UI animations.
2. **GSAP + ScrollTrigger** — For scroll-driven canvas/frame animations only.
3. **Lottie React** — For pre-designed vector animations (existing JSON assets).
4. **CSS Animations** — For simple, performance-critical animations (marquee, spin).
5. **Anime.js** — Avoid unless specifically required for complex timeline sequences.

### Framer Motion Wrappers

ALWAYS use the pre-built animation wrappers in `src/components/utils/Animations.jsx`:

| Wrapper              | Purpose                                              |
| -------------------- | ---------------------------------------------------- |
| `<FadeIn>`           | Viewport-triggered fade + slide (up/down/left/right) |
| `<StaggerContainer>` | Parent for staggered children animations             |
| `<StaggerItem>`      | Child of `StaggerContainer`                          |
| `<ScaleOnHover>`     | Spring-based hover scale effect                      |
| `<Parallax>`         | Scroll-linked parallax movement                      |
| `<CountUp>`          | Animated number counter                              |
| `<ScrollCountUp>`    | Viewport-triggered animated counter                  |
| `<Marquee>`          | Infinite horizontal scroll                           |

### Rules

1. **DO NOT** create new animation wrappers without extending `Animations.jsx`.
2. All viewport animations MUST use `viewport={{ once: true }}` — fire only once.
3. Default viewport margin is `-50px` for early triggering.
4. Use `spring` physics for natural motion: `stiffness: 70, damping: 20`.
5. Page transitions are handled by `AnimatePresence` in `Layout.jsx` — do NOT add separate page transition logic.
6. Respect `prefers-reduced-motion` — CSS animations already handle this via `@media (prefers-reduced-motion)`.
7. Do NOT add heavy GSAP animations to every page — restrict `ScrollTrigger` to scroll-intensive sections.

---

## 8. Performance Rules

### Code Splitting

- All pages are lazy-loaded via `React.lazy()` in `App.jsx`.
- Vite is configured with manual chunks:
  - `vendor`: react, react-dom, react-router-dom
  - `ui`: lucide-react, framer-motion, gsap
- Build target is `es2015` for maximum browser coverage.
- `@vitejs/plugin-legacy` provides polyfills for older browsers (Chrome 70+).

### Asset Rules

1. **ALL images MUST be WebP format** — no PNG/JPG in production.
2. Static images go in `public/` (referenced by absolute path `/image.webp`).
3. Bundled assets go in `src/assets/` (imported via JS for hashing).
4. Canvas animations use optimized `.mp4` video files to reduce network requests.
5. Image rendering uses `-webkit-optimize-contrast` globally.

### Build Pipeline

The `npm run build` command executes:

1. `vite build` — Bundle the application
2. `node scripts/generate-sitemap.js` — Generate `public/sitemap.xml`
3. `node scripts/generate-csp-hashes.js` — Update CSP hashes in `vercel.json`

**NEVER** modify the build pipeline order.

### Optimization Rules

1. Chunk size warning at 1000 KB — keep bundles under this limit.
2. Do NOT import entire libraries — use tree-shakable imports.
3. Preconnect to external origins is configured in `index.html` (Google Fonts).
4. `will-change` and `translateZ(0)` are used sparingly for GPU compositing.

---

## 9. Accessibility Rules

1. **Focus outlines** are globally styled with `*:focus-visible` using the primary color.
2. Use **semantic HTML** (`<main>`, `<section>`, `<nav>`, `<footer>`, `<header>`).
3. All interactive elements MUST be keyboard accessible.
4. All images MUST have `alt` attributes.
5. Form inputs MUST have associated `<label>` elements.
6. Color contrast MUST meet WCAG AA standards (4.5:1 for normal text).
7. The mobile menu MUST be navigable via keyboard.
8. The `::selection` pseudo-element is styled with the primary brand color.
9. Do NOT disable `user-scalable` on viewport meta (already set — note: currently `user-scalable=0` in `index.html`; this is a known issue).

---

## 10. Responsive Design Rules

### Breakpoints

Use TailwindCSS v4 default responsive prefixes:

| Prefix | Min-Width | Target               |
| ------ | --------- | -------------------- |
| (none) | 0px       | Mobile-first default |
| `sm:`  | 640px     | Large phones         |
| `md:`  | 768px     | Tablets              |
| `lg:`  | 1024px    | Desktops             |
| `xl:`  | 1280px    | Large desktops       |
| `2xl:` | 1536px    | Ultra-wide           |

### Rules

1. ALL components MUST be mobile-first responsive.
2. The `container-custom` class handles max-width & responsive padding.
3. Test all pages at 320px, 768px, and 1280px minimum.
4. The mobile menu uses slide-in animation with `slideInRight` keyframe.
5. Flip cards have mobile touch support via `@media (hover: none)`.
6. Section padding responsively scales: `py-16 md:py-24`.

---

## 11. SEO Rules

### SEO Component

Every page MUST use the `<SEO>` component from `src/components/utils/SEO.jsx`:

```jsx
<SEO
  title="Page Title"
  description="Unique description (120-160 chars)."
  keywords="comma, separated, keywords"
  canonical="/page-slug"
  breadcrumbs={[
    { name: "Home", path: "/" },
    { name: "Page", path: "/page-slug" },
  ]}
/>
```

### Supported Schemas

| Schema Type    | When to use                                     |
| -------------- | ----------------------------------------------- |
| Organization   | Auto — every page                               |
| Course         | Pass `courseSchema` prop on course detail pages |
| FAQ            | Pass `faqSchema` prop on pages with FAQ         |
| BreadcrumbList | Pass `breadcrumbs` prop on all sub-pages        |

### Rules

1. Title format: `Page Title | Scope AI Hub`.
2. Meta descriptions MUST be 120–160 characters and unique per page.
3. Every page MUST have a canonical URL.
4. Open Graph and Twitter Card meta are auto-generated.
5. The sitemap is auto-generated on build — run `npm run build:sitemap` to regenerate independently.
6. Geo SEO tags target `Chennai, Tamil Nadu, India`.
7. The `robots.txt` in `public/` directs crawlers to the sitemap.

---

## 12. Routing Rules

### Route Registration

All routes are defined in `src/App.jsx` in a flat `<Routes>` block:

```
/                          → Home
/about                     → About
/courses                   → CoursesList
/courses/:slug             → CourseDetail (dynamic)
/admissions                → Admissions
/career-support            → CareerSupport
/reviews                   → Reviews
/careers/trainers          → TrainerProfiles
/careers/join-as-trainer   → JoinAsTrainer
/faq                       → FAQ
/contact                   → Contact
/privacy-policy            → PrivacyPolicy
/terms-conditions          → TermsConditions
/nda-policy                → NDAPolicy
/disclaimer                → Disclaimer
/refund-policy             → RefundPolicy
/legal/trainer-conduct     → TrainerCodeOfConduct
/sitemap                   → Sitemap
*                          → NotFound (404)
```

### Rules

1. **EVERY new page** MUST be added to App.jsx as a lazy-loaded route.
2. Add new routes to `react-snap` include list in `package.json` for prerendering.
3. Add new routes to `scripts/generate-sitemap.js` for SEO indexing.
4. `<ScrollToTop>` handles scroll restoration on route change — do NOT add manual scroll behavior.
5. Link components from `react-router-dom` — NEVER use raw `<a>` tags for internal links.
6. The Vercel rewrite rule `"/(.*)" → "/index.html"` handles all SPA routes.

---

## 13. Asset Usage Rules

### Images

| Location         | Purpose                | Format  | Reference Method           |
| ---------------- | ---------------------- | ------- | -------------------------- |
| `public/`        | Static public images   | `.webp` | Absolute path `/name.webp` |
| `src/assets/`    | Bundled assets         | Any     | `import img from '...'`    |
| `public/*.mp4`   | Canvas animation video | `.mp4`  | Single video file reference|

### Icons

- Use **Lucide React** exclusively: `import { IconName } from 'lucide-react'`
- Do NOT import entire icon libraries or use FontAwesome.
- Icon sizes follow component context — typical sizes: 16, 20, 24, 32, 48px.

### Lottie Animations

- Store JSON files in `src/assets/animations/`.
- Use `<LottieAnimation>` wrapper from `src/components/ui/LottieAnimation.jsx`.
- Existing animations: `Error 404.json`, `Mission.json`, `Vision Eye.json`.

### Data Files

- `src/data/branding.js` — Centralized brand constants (name, logo paths, contact info).
- `src/data/courses.js` — Course catalog with tier-based organization.
- `src/data/addons.js` — Career support add-ons and services.
- **ALWAYS** import brand data from `branding.js` — never hardcode brand name, phone, or email.

---

## 14. Security Rules

### Frontend

1. **NEVER** expose API keys, secrets, or service role keys in frontend code.
2. Only `VITE_` prefixed env vars are safe for frontend use.
3. Client-side rate limiting (`src/utils/rateLimiter.js`) is a UX layer only — server enforces real limits.
4. Forms use reCAPTCHA v2 — token is sent to serverless function for verification.
5. Honeypot fields are included in forms — never remove them.
6. Anti-bot timing validation (`formLoadedAt`) prevents instant submissions.

### Backend (API Functions)

1. All serverless functions are in `api/` and run on Vercel's Node.js runtime.
2. Input sanitization strips HTML and limits field lengths.
3. Server-side rate limiting with in-memory IP tracking and adaptive penalties.
4. reCAPTCHA token replay protection via SHA-256 hashing.
5. Strict origin validation — only requests from `ALLOWED_ORIGINS` are accepted.
6. User-Agent filtering blocks bots and crawlers.
7. Generic error messages — never expose internal errors to clients.

### Headers (vercel.json)

The following security headers are enforced on ALL responses:

| Header                      | Value                                          |
| --------------------------- | ---------------------------------------------- |
| `X-Frame-Options`           | `DENY`                                         |
| `X-Content-Type-Options`    | `nosniff`                                      |
| `Referrer-Policy`           | `strict-origin-when-cross-origin`              |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains; preload` |
| `Permissions-Policy`        | `camera=(), microphone=(), geolocation=()`     |
| `X-DNS-Prefetch-Control`    | `on`                                           |
| `Content-Security-Policy`   | Auto-updated by build script                   |

**NEVER** weaken security headers. If adding new external resources, update CSP directives accordingly.

---

## 15. Error Handling Rules

### Frontend

- `ErrorBoundary` wraps the entire app in `App.jsx` — catches React rendering errors.
- API errors are normalized via `src/utils/apiErrorHandler.js` — never show raw error messages.
- Sentry captures errors in production only — PII is stripped via `beforeSend`.
- Network timeouts are 15 seconds (configurable per service).

### Backend

- Structured JSON logging with `requestId` for traceability.
- All errors return generic messages: `"Request could not be processed"`.
- Status codes follow standard HTTP conventions.
- Non-critical failures (CRM, auto-reply) are logged but don't block the response.

---

## 16. State Management Rules

- **React Context API** is the ONLY state management solution.
- Two contexts exist: `ThemeContext` and `ModalContext`.
- Do NOT introduce Redux, Zustand, Jotai, or any external state library.
- Context providers wrap the app in this order: `ErrorBoundary → ModalProvider → ThemeProvider → Router`.

### ModalContext

```jsx
import { useModal } from "../context/ModalContext";

const { openModal, closeModal, isModalOpen, modalCourse, modalType } =
  useModal();
openModal("Course Name", "student"); // Opens the ContactModal
```

### ThemeContext

```jsx
import { useTheme } from "../context/ThemeContext";

const { theme, toggleTheme } = useTheme();
// theme is 'light' or 'dark'
```

---

## 17. Development Commands

| Command                 | Purpose                                       |
| ----------------------- | --------------------------------------------- |
| `npm run dev`           | Start Vite dev server (hot reload)            |
| `npm run build`         | Production build + sitemap + CSP hashes       |
| `npm run preview`       | Preview production build locally              |
| `npm run lint`          | Run ESLint on all `.js` and `.jsx` files      |
| `npm run test`          | Run Vitest unit tests (single run)            |
| `npm run test:watch`    | Run Vitest in watch mode                      |
| `npm run build:full`    | Build + react-snap prerendering (local only)  |
| `npm run build:sitemap` | Regenerate sitemap independently              |
| `npm run audit`         | Run npm security audit (production deps only) |

---

## 18. Deployment Guidelines

### Vercel Deployment

1. Push to `main` branch triggers automatic deployment.
2. `vercel.json` handles SPA rewrites and security headers.
3. Environment variables are set in Vercel Dashboard → Environment Variables.
4. `react-snap` prerendering runs locally only — NOT during Vercel builds.
5. CSP hashes are auto-generated during `npm run build`.

### Environment Variables

| Variable                    | Side     | Required | Purpose                  |
| --------------------------- | -------- | -------- | ------------------------ |
| `VITE_RECAPTCHA_SITE_KEY`   | Frontend | Yes      | reCAPTCHA widget         |
| `VITE_SENTRY_DSN`           | Frontend | No       | Sentry error monitoring  |
| `VITE_TAWK_PROPERTY_ID`     | Frontend | No       | Tawk.to chat             |
| `VITE_TAWK_WIDGET_ID`       | Frontend | No       | Tawk.to chat             |
| `RECAPTCHA_SECRET_KEY`      | Backend  | Yes      | reCAPTCHA verification   |
| `BREVO_API_KEY`             | Backend  | Yes      | Email & CRM              |
| `SUPABASE_URL`              | Backend  | Yes      | Database connection      |
| `SUPABASE_SERVICE_ROLE_KEY` | Backend  | Yes      | Database auth            |
| `ALLOWED_ORIGINS`           | Backend  | Yes      | CORS / origin validation |
| `ALLOWED_HOSTNAME`          | Backend  | Yes      | reCAPTCHA hostname check |

---

## 19. Testing Rules

### Location

- Tests live in `src/utils/__tests__/` using the `*.test.js` naming convention.
- Vitest config includes: `src/**/__tests__/**/*.test.{js,jsx}`.

### Rules

1. Test file names MUST match: `moduleName.test.js`.
2. Use `vitest` globals (`describe`, `it`, `expect`) — configured globally.
3. Test environment is `jsdom`.
4. Run `npm run test` before committing to verify no regressions.

---

## 20. AI Agent Behavior Rules

### DO

- ✅ Follow the folder structure exactly as documented.
- ✅ Use CSS custom properties for ALL themed colors.
- ✅ Use the pre-built `Animations.jsx` wrappers for all UI animations.
- ✅ Lazy-load all new pages in `App.jsx`.
- ✅ Add SEO metadata to every new page using the `<SEO>` component.
- ✅ Import brand data from `src/data/branding.js`.
- ✅ Use `cn()` from `src/lib/utils.js` for conditional class merging.
- ✅ Use Lucide React for icons.
- ✅ Ensure every component works in both light and dark themes.
- ✅ Use `WebP` format for all production images.
- ✅ Keep components focused and small — split large components into sections.
- ✅ Use relative imports (no alias configured).
- ✅ Keep error messages user-friendly and generic.
- ✅ Register new routes in `App.jsx`, sitemap script, and react-snap config.

### DO NOT

- ❌ Introduce TypeScript — this is a JavaScript-only project.
- ❌ Add new CSS frameworks (no styled-components, CSS modules, SCSS, etc.).
- ❌ Add new state management libraries (no Redux, Zustand, etc.).
- ❌ Hardcode brand names, phone numbers, or email addresses.
- ❌ Hardcode color values — always use CSS variables.
- ❌ Create page components without `<Layout>` and `<SEO>` wrappers.
- ❌ Skip lazy loading for page components.
- ❌ Expose API keys or secrets in frontend code.
- ❌ Add `tailwind.config.js` — TailwindCSS v4 uses CSS-first config.
- ❌ Remove or weaken security headers in `vercel.json`.
- ❌ Use `<a>` tags for internal navigation — use React Router `<Link>`.
- ❌ Import from `react-helmet` — use `react-helmet-async`.
- ❌ Add GSAP ScrollTrigger to common/lightweight pages.
- ❌ Use PNG or JPG images in production — convert to WebP.
- ❌ Modify the build pipeline order in `package.json`.

---

## 21. Debugging Checklist

When investigating issues, check in this order:

1. **Build errors** → Run `npm run build` and check output.
2. **Lint errors** → Run `npm run lint`.
3. **Test failures** → Run `npm run test`.
4. **Theme issues** → Toggle between light/dark and inspect CSS variables.
5. **Routing issues** → Verify route is in `App.jsx`, sitemap, and react-snap config.
6. **Animation issues** → Check `viewport.once`, spring config, and `Animations.jsx` wrappers.
7. **API errors** → Check Vercel function logs, env vars, and `apiErrorHandler.js` output.
8. **CSP violations** → Check browser console; update `vercel.json` CSP directive or run `npm run build` to regenerate hashes.
9. **Mobile issues** → Test with Chrome DevTools responsive mode at 320px.
10. **SEO issues** → Verify `<SEO>` component props and check with Google Rich Results Test.

---

## 22. Known Issues & Notes

1. `src/App.css` contains Vite scaffold CSS that is unused — safe to ignore.
2. `index.html` has `user-scalable=0` which hurts accessibility — consider removing.
3. Social media links in `branding.js` are placeholder `"#"` — update when available.
4. The `archive/` directory contains legacy code and is gitignored.
5. `package-lock.json` is committed and MUST be used for deterministic installs.
