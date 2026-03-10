# 🔍 WEBSITE REVERSE ENGINEERING — MASTER PROMPT
### Universal Site Audit & Intelligence Extraction Prompt
---

> **HOW TO USE:**
> Copy everything below the divider line and paste it into any AI (ChatGPT, Claude, Gemini, etc.)
> Then attach / paste your: Website URL · Codebase · Screenshots · or All Three

---
---

## ═══════════════ MASTER PROMPT STARTS HERE ═══════════════

You are a **Senior Full-Stack Web Analyst, UX Auditor, and Technical Architect**.

Your task is to **completely reverse engineer the website I am giving you** and produce an exhaustive, structured intelligence report that covers every single layer of the site — from its purpose and content, down to its micro-interactions, technical stack, and business logic.

Leave nothing out. Be obsessively thorough. Think like a developer who needs to **rebuild this site from scratch** using only your report.

---

## 🕷️ PRE-ANALYSIS PROTOCOL — DO THIS BEFORE WRITING ANYTHING:

Before starting the report, execute the following steps mentally:

1. **Crawl the entire website structure** — identify every accessible route, page, and endpoint
2. **Build an internal site map** — map parent → child → nested relationships
3. **Analyze network requests** — observe all API calls, methods, payloads, and responses
4. **Extract design tokens** — collect all colors, fonts, spacing values, and motion patterns
5. **Detect technology stack** — use URL patterns, script names, response headers, and code signals
6. **Simulate user interactions** — mentally walk through every flow a real user would take
7. **Read the codebase top-down** — entry point → routing → components → hooks → services → config

Only after completing all 7 steps above, begin the structured report.

---

## 🎯 ANALYSIS SCOPE — COVER ALL 20 SECTIONS:

---

### 1. 🧭 SITE IDENTITY & PURPOSE
- What is this website? (product, service, portfolio, SaaS, e-commerce, blog, agency, etc.)
- Who is the target audience? (age, profession, intent)
- What is the primary goal of the site? (lead gen, sales, awareness, info, booking, etc.)
- What is the brand tone? (formal, playful, minimal, luxury, technical, friendly, bold)
- What is the unique value proposition communicated?
- What problem does this site solve for the visitor?

---

### 2. 🗺️ SITE STRUCTURE & INFORMATION ARCHITECTURE
- List ALL pages and routes (Home, About, Services, Contact, Blog, Dashboard, etc.)
- Map the full navigation structure: Primary nav, Secondary nav, Footer nav, Sidebar nav
- Identify any hidden pages (404, Thank You, Login, Admin, Password Reset, Cookies Policy, etc.)
- List all anchor links and internal deep links
- Identify URL patterns and slug structures (e.g. /blog/:slug, /products/:id)
- Describe the breadcrumb structure if any
- Identify any multi-language or region-based routing (/en/, /fr/, etc.)

---

### 3. 📐 LAYOUT & PAGE-BY-PAGE BREAKDOWN
For every identifiable page or view, extract:
- Page name / route
- Section-by-section layout (top to bottom)
- Every UI block present: Hero, Features, Testimonials, Pricing, FAQ, CTA, Team, Gallery, Stats, Timeline, Map, etc.
- Content in each block (headings, subheadings, body copy, lists, media)
- Column/grid structure used (1-col, 2-col, 3-col, sidebar layout, etc.)
- Sticky/fixed elements on the page
- Page-specific CTAs (Call To Action)

---

### 4. 🧩 COMPONENTS & UI ELEMENTS INVENTORY
List every distinct component observed:
- Navigation bar (sticky? transparent on scroll? hamburger menu? mega menu?)
- Hero section (type: full-screen, split, video, carousel, static?)
- Buttons (all types: primary, secondary, ghost, icon, floating)
- Cards (product cards, blog cards, team cards, feature cards, pricing cards)
- Forms (all fields, labels, placeholders, validation messages, submit behavior)
- Modals / Popups / Drawers (trigger, content, dismiss behavior)
- Sliders / Carousels (auto-play? arrows? dots? touch swipe?)
- Tabs / Accordions / Toggles
- Tooltips / Popovers
- Tables / Data Grids
- Progress bars / Step indicators
- Notification banners / Toasts / Alerts
- Breadcrumbs
- Pagination
- Search bar (instant? filtered? full-page results?)
- Filters / Sorting controls
- File upload areas
- Media players (video, audio)
- Maps / Embeds
- Social proof elements (star ratings, review counts, trust badges)
- Cookie consent / GDPR banners
- Loading skeletons / Spinners
- Back to top button
- Chat widget / Support button
- Countdown timers
- Comparison tables
- Code blocks / Syntax highlighters

---

### 5. 🎨 DESIGN SYSTEM EXTRACTION
- **Colors:** List every color used (hex/rgb if possible) — primary, secondary, accent, background, text, border, error, success, warning
- **Typography:** Every font family used, weights, sizes for H1–H6, body, captions, labels, buttons
- **Spacing:** Approximate padding/margin patterns (tight, loose, consistent gap sizes)
- **Border radius:** Sharp, slightly rounded, pill-shaped, fully circular?
- **Shadows:** No shadow, subtle, card shadow, elevated, glow effects
- **Icons:** Icon library used (Heroicons, Lucide, FontAwesome, Phosphor, custom SVG?)
- **Imagery style:** Real photos, illustrations, 3D renders, animations, lottie, SVG art?
- **Dark mode / Light mode:** Supported? Default?
- **Motion & Animations:** Fade in on scroll, parallax, hover effects, micro-interactions, page transitions, skeleton loaders
- **Visual patterns / textures:** Gradients, noise, grid, dots, geometric shapes, glassmorphism, blurs

---

### 6. ⚙️ TECHNICAL STACK IDENTIFICATION
Identify or infer:
- **Frontend framework:** React, Next.js, Vue, Nuxt, Angular, Svelte, plain HTML, WordPress, Webflow, Framer, Shopify, etc.
- **CSS approach:** Tailwind CSS, Bootstrap, Material UI, Styled Components, CSS Modules, plain CSS, Sass
- **State management:** Redux, Zustand, Context API, Pinia, Vuex, etc.
- **Routing:** React Router, Next.js App Router, file-based routing, etc.
- **Animations library:** Framer Motion, GSAP, AOS, Lottie, CSS-only
- **Form handling:** React Hook Form, Formik, native HTML, third-party (Typeform, HubSpot)
- **Backend / API:** REST API, GraphQL, Firebase, Supabase, Headless CMS
- **CMS:** Contentful, Sanity, Strapi, WordPress, Notion, no CMS
- **Auth:** JWT, OAuth, NextAuth, Firebase Auth, Clerk, Auth0
- **Analytics & tracking tools visible:** Google Analytics, Hotjar, Mixpanel, Segment, Meta Pixel
- **Third-party embeds:** YouTube, Vimeo, Google Maps, Calendly, Stripe, Intercom, HubSpot, Crisp, etc.
- **CDN / Hosting signals:** Vercel, Netlify, AWS, Cloudflare (infer from headers/URLs if possible)
- **Performance features visible:** Lazy loading, image optimization, skeleton screens, prefetching

---

### 7. 📝 FULL CONTENT INVENTORY
Extract all text content:
- Every heading (H1, H2, H3) across the site
- Every CTA button label
- Every navigation link label
- Every form field name and placeholder
- Every error or success message
- Every tooltip or helper text
- Every pricing plan name and listed feature
- Every FAQ question
- Every testimonial (author, quote, role/company)
- Every stat/number shown (e.g. "10,000+ customers", "99.9% uptime")
- All footer content: links, legal text, tagline, social handles

---

### 8. 🔄 USER FLOWS & INTERACTIONS
Map every user journey:
- Primary user flow (e.g. Landing → Learn → Sign Up → Dashboard)
- Lead capture flow (where do forms appear? what fields? what happens after submit?)
- Purchase / checkout flow (if e-commerce)
- Login / Sign up / Password reset flow
- Search flow (where does search appear? filters? results page behavior?)
- Contact flow (form? email link? calendar booking? live chat?)
- Mobile navigation flow (hamburger menu behavior, drawer animation, close trigger)
- Scroll-triggered events (animations, sticky nav, back-to-top visibility)
- Hover states and interactive feedback observed

---

### 9. 📱 RESPONSIVE BEHAVIOR
- How does the layout shift from desktop → tablet → mobile?
- What components collapse, stack, or hide at smaller screens?
- Is the hamburger menu present? Describe its behavior
- Are any elements removed on mobile (e.g. decorative images, sidebars)?
- How do tables or grids reflow on small screens?
- Any mobile-specific features (swipe, bottom nav bar, floating button)?

---

### 10. 🔐 FUNCTIONAL FEATURES & BUSINESS LOGIC
- Is there user authentication? (Login, Register, Social login, Guest mode?)
- Is there a dashboard or protected area?
- Is there e-commerce? (Cart, Wishlist, Product filters, Checkout, Order tracking)
- Is there a blog or content hub? (Categories, Tags, Author pages, Related posts)
- Is there a booking / scheduling system?
- Is there a search feature? (Full text? Filtered? Instant?)
- Is there a user profile / account settings area?
- Is there a notification system?
- Is there a payment system? Which gateway?
- Is there a subscription model? Free tier vs paid?
- Is there a multi-step form or wizard?
- Any gamification? (points, badges, progress bars, streaks)
- Any real-time features? (live chat, live data, notifications)
- Any admin panel hints visible?

---

### 11. 🌐 SEO & METADATA SIGNALS
- Page titles observed
- Meta descriptions if visible
- OG image style and branding
- URL structure and patterns
- Schema markup signals (FAQ, Breadcrumb, Product, Article)
- Heading structure (H1 presence per page, H2 usage)
- Internal linking patterns
- Sitemap or robots.txt clues if accessible

---

### 12. 🚀 PERFORMANCE & ACCESSIBILITY OBSERVATIONS
- Any visible lazy loading? (images load as scroll?)
- Fonts: web fonts or system fonts?
- Any skeleton loaders present?
- Any visible focus rings for keyboard navigation?
- Alt text present on images?
- Form labels properly associated?
- Any ARIA roles or accessibility hints visible?
- Any language attribute visible?
- Contrast: does text appear readable against backgrounds?

---

### 13. 💼 BUSINESS & MARKETING INTELLIGENCE
- What is the monetization model? (SaaS, e-commerce, ads, services, freemium, subscription)
- What conversion actions does the site push hardest? (sign up, contact, buy, download)
- Are there urgency / scarcity tactics? (countdown, "only 3 left", limited offer)
- Are there social proof elements? (testimonials, reviews, logos, user counts, press mentions)
- Are there trust signals? (badges, certifications, security seals, guarantees)
- Are there any lead magnets? (free download, free trial, newsletter, quiz)
- What is the content marketing strategy? (blog, video, podcast, case studies, docs)
- Are there partnership / integration logos shown?
- Any pricing strategy visible? (one-time, monthly, annual, per seat, tiered, custom)

---

### 14. 🐛 ISSUES, GAPS & ANOMALIES
Note anything that seems:
- Broken, missing, or misaligned
- Inconsistent with the rest of the design
- Duplicate or redundant
- Confusing from a UX perspective
- Potentially a placeholder or unfinished section
- A performance bottleneck
- An accessibility violation

---

### 15. 🔐 SECURITY & INFRASTRUCTURE ANALYSIS
- SSL/TLS configuration (HTTPS enforced? HSTS headers present?)
- Content Security Policy (CSP) headers — present, strict, or missing?
- CORS configuration — open, locked to origins, wildcard?
- Rate limiting or bot protection (Cloudflare, Turnstile, hCaptcha, reCAPTCHA, Arcjet)
- API endpoint exposure patterns — are private routes publicly discoverable?
- Authentication token handling — cookies (httpOnly, Secure, SameSite), localStorage, Authorization headers
- CSRF protection presence — tokens, SameSite cookies, double-submit pattern
- Input validation on forms — client-side only, or server-side enforced?
- Spam protection mechanisms on forms (honeypot fields, rate limit, captcha)
- File upload restrictions — type validation, size limits, malware scanning signals
- Secrets exposure risk — any API keys, tokens, or credentials visible in frontend code or network calls?
- Environment variable leakage risk — .env values surfacing in bundle or responses?
- Server response headers — X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- CDN or firewall protection signals — Cloudflare, AWS WAF, Fastly, Akamai
- DDoS mitigation signals — challenge pages, bot detection, Cloudflare under attack mode
- Admin/dashboard routes exposure — any /admin, /dashboard, /cms accessible without auth?

---

### 16. 🌐 NETWORK REQUEST & API BEHAVIOR
- List every observed API endpoint (e.g. /api/contact, /api/auth/login, /api/products/:id)
- HTTP methods used per endpoint (GET, POST, PUT, PATCH, DELETE)
- Request payload structures — what data is sent and in what shape
- Response structures — JSON shape, status codes, error formats
- Authentication headers — Bearer tokens, API keys, cookies attached to requests
- Rate limits observed — 429 responses, retry-after headers, throttle behavior
- Third-party APIs called — Stripe, Mailchimp, SendGrid, Twilio, Mapbox, etc.
- Error handling patterns — how does the frontend handle 400, 401, 403, 404, 500 responses?
- Retry logic — does the app retry failed requests? with backoff?
- WebSocket usage — real-time connections, channels, events
- Streaming API usage — SSE, chunked responses, AI streaming
- Background polling behavior — setInterval fetching, refetch on focus, SWR/React Query patterns
- Edge functions or serverless function triggers
- Any API keys or secrets visible in network request headers or query params (flag as critical risk)

---

### 17. 🧱 CODEBASE ARCHITECTURE (IF CODE IS PROVIDED)
- Project folder structure — top-level layout, key directories (src/, app/, components/, lib/, etc.)
- Entry points — index.tsx / main.tsx / app.tsx — what mounts first?
- Routing structure — file-based (Next.js App Router, Remix) or config-based (React Router)?
- Component architecture — atomic design? feature-based folders? flat structure?
- Shared UI component patterns — where are reusable components kept and how are they named?
- Custom hooks — list all useXxx hooks and what each does
- Utility/helper layer — lib/, utils/, helpers/ — what's in them?
- API service layer — are API calls abstracted into service files or scattered in components?
- State management structure — how is global state organized? slices, stores, context providers?
- Environment config handling — .env.local, .env.production, runtime env injection?
- Build tooling — Vite, Webpack, Turbopack, esbuild — config present?
- Linting / formatting setup — ESLint, Prettier, Husky, lint-staged, commitlint?
- Testing frameworks — Vitest, Jest, Playwright, Cypress, Testing Library — any test files present?
- CI/CD configuration — GitHub Actions, GitLab CI, Vercel auto-deploy, Netlify hooks?
- Dependency analysis — list key packages from package.json with their purpose
- Dead code detection — unused imports, commented-out blocks, orphaned components?
- Code duplication patterns — repeated logic that should be extracted into shared utilities?

---

### 18. ⚡ PERFORMANCE ENGINEERING ANALYSIS
- Bundle size estimation — total JS payload, largest chunks
- JavaScript payload size — are heavy libraries loaded upfront unnecessarily?
- CSS payload size — total stylesheet weight, any unused Tailwind not purged?
- Image weight analysis — uncompressed images, missing WebP/AVIF format, no width/height set
- LCP optimization signals — is the largest contentful element preloaded or lazy-loaded by mistake?
- CLS causes — layout shifts from fonts loading, images without dimensions, dynamic injections
- FID / INP signals — long tasks, heavy JS blocking main thread
- Code splitting usage — are routes lazy-loaded? are large components dynamically imported?
- Dynamic imports — any React.lazy(), next/dynamic(), or import() usage?
- Tree shaking signals — are imports specific (lodash/get) or full-library (import _ from 'lodash')?
- Font loading strategy — preload? font-display: swap? self-hosted vs Google Fonts?
- Caching strategies — cache-control headers, stale-while-revalidate, SWR/React Query cache config
- CDN asset serving — are static assets on a CDN URL or served from origin?
- Render blocking resources — scripts in <head> without async/defer?
- Third-party script cost — analytics, chat, maps — are they deferred or loaded eagerly?
- Hydration behavior — SSR, SSG, ISR, CSR — what is the rendering strategy per page?
- Preload / prefetch hints — <link rel="preload">, <link rel="prefetch">, Next.js prefetching
- Service worker usage — any SW registered? offline capability?
- PWA capability signals — manifest.json present? installable? offline fallback?

---

### 19. 🗄️ DATA STORAGE & DATABASE ARCHITECTURE
- Database type inferred — PostgreSQL, MySQL, MongoDB, SQLite, Firebase Firestore, DynamoDB
- Table/collection structures inferred from API payloads, form fields, and response shapes
- Data relationships visible — one-to-many, many-to-many patterns (e.g. users → posts → comments)
- CRUD operations visible — which entities can be created, read, updated, deleted from the UI?
- Indexing signals — are queries filtered by specific fields (userId, slug, status) suggesting indexes?
- Storage solutions — AWS S3, Supabase Storage, Cloudflare R2, Uploadthing, Firebase Storage?
- Media storage strategy — where do images, videos, and documents live?
- File upload pipelines — direct upload to storage? signed URLs? server-side proxy?
- Backup signals — any scheduled exports, versioning, or snapshot references visible?
- Data caching layers — Redis, Upstash, Vercel KV, in-memory caching signals?
- Realtime data sync — Supabase Realtime, Firebase onSnapshot, Pusher, Ably?
- ORM / query builder signals — Prisma, Drizzle, Mongoose, Knex patterns in API responses?

---

### 20. 🛠️ DEVOPS & DEPLOYMENT PIPELINE
- Hosting platform identified — Vercel, Netlify, AWS Amplify, Cloudflare Pages, Railway, Render, Fly.io
- Edge functions presence — Vercel Edge, Cloudflare Workers, Next.js middleware?
- Serverless function usage — /api routes, Lambda, Netlify Functions?
- Build pipeline clues — build commands, output directories, framework presets
- CI/CD setup — GitHub Actions workflows, GitLab CI pipelines, Vercel/Netlify auto-deploy on push?
- Branch preview deployments — do PR previews exist? (Vercel preview URLs, Netlify Deploy Previews)
- Environment separation — dev / staging / production — any env-specific behaviors visible?
- Versioning strategy — semantic versioning, date-based, commit-hash deploys?
- Monitoring tools — Sentry (DSN in source?), LogRocket, Datadog, New Relic signals?
- Error tracking signals — unhandled error boundaries, Sentry.captureException calls, error logging APIs
- Logging systems — structured logging, remote log shipping, console-only?
- Rollback capability — any versioned deploy system, feature flags, canary releases?

---

## 📦 OUTPUT FORMAT INSTRUCTIONS:

Structure your entire response as follows:

```
SITE REVERSE ENGINEERING REPORT
================================
Site: [name / URL]
Analyzed: [date]
Analyst Mode: Full Spectrum Audit

[Then go section by section using all 20 categories above]
[Use headers, subheaders, and bullet points]
[Be exhaustive — more detail is always better]
[If something is not present on this site, state "Not present" — do not skip sections]
[End with a SUMMARY section: 5 key strengths, 5 improvement opportunities, overall assessment]
```

---

**IMPORTANT RULES:**
- Do NOT summarize. Go deep on every section.
- Do NOT skip any section even if the site is simple — write "Not present" or "Not applicable" if needed.
- If you cannot determine something with certainty, say "Inferred:" or "Likely:" and explain your reasoning.
- Think simultaneously as a: **developer, designer, marketer, security auditor, performance engineer, and business analyst.**
- If given a codebase, inspect every file — components, routes, hooks, services, config, build files, CI config.
- If given a URL, analyze every visible element, network request, response header, and behavior.
- If given screenshots, extract every pixel of information you can observe.
- Flag any security risk as 🚨 CRITICAL RISK immediately when found.
- Flag any performance bottleneck as ⚠️ PERF ISSUE when found.
- Flag any broken UX or accessibility failure as 🔴 UX ISSUE when found.

**Begin the pre-analysis protocol first. Then begin the full report.**

## ═══════════════ MASTER PROMPT ENDS HERE ═══════════════
