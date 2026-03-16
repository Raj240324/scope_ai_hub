# Performance

## Code Splitting and Lazy Loading
- Route-level lazy loading in `src/App.jsx` using `React.lazy`
- Home page lazy loads below-the-fold sections with `Suspense`
- `react-snap` prerendering configured for selected routes

## Routing and Navigation Performance
- Idle-time route prefetch in `App.jsx` for critical pages
- Lightweight route transition fallback loader
- Route scroll reset via Lenis integration in `SmoothScroll`

## Build Optimization
- Vite build target: `es2020`
- Manual chunk splitting in `vite.config.js`:
  - `vendor`: react ecosystem
  - `ui`: lucide/framer/gsap
- Chunk warning threshold set to 1000 KB

## Hero Rendering Optimization
- Adaptive hero mode decision based on device memory/cores/user agent
- Desktop hero:
  - frame sequence over canvas
  - first-frame eager render and progressive frame preload
  - passive scroll listeners and visibility handling
- Mobile/low-capability fallback to video/static mode

## Media and Asset Strategy
- Heavy visual assets in `public/` (WebP frames, videos, logos)
- Course/content data in JS modules to avoid runtime fetch overhead
- Lazy image loading used in multiple section components

## CSP Build Automation
- `scripts/generate-csp-hashes.js` recalculates inline script hashes from built `dist/index.html`
- Updates CSP header in `vercel.json` automatically during build pipeline

## Known Performance Risks
- Header and some components use frequent inline styles and runtime state transitions
- GSAP `DominoScroll` is heavy; avoid broadening use without profiling
