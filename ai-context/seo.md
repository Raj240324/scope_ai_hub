# SEO

## SEO Implementation
- Centralized SEO component: `src/components/utils/SEO.jsx`
- Uses `react-helmet-async` for dynamic title/meta/canonical
- Every major route-level page calls `SEO` with route-specific props

## Meta & Schema Coverage
- Standard metadata:
  - title
  - description
  - keywords
  - canonical
  - robots
  - Open Graph
  - Twitter Card
- JSON-LD support in `SEO.jsx`:
  - Organization
  - Course (conditional)
  - FAQPage (conditional)
  - BreadcrumbList (conditional)
- Additional per-page schema injections appear in:
  - `FAQ.jsx`
  - `CourseDetail.jsx`

## Sitemap System
- Build-time generator: `scripts/generate-sitemap.js`
- Produces `public/sitemap.xml`
- Static routes + dynamic course detail routes by slug extraction from `src/data/courses.js`

## Robots
- `public/robots.txt` allows crawling and points to sitemap URL

## Prerender Strategy
- `react-snap` configured in `package.json` with explicit route include list
- App uses hydration path in `main.jsx` when prerendered markup exists

## SEO Consistency Finding
- Sitemap and prerender route lists are now aligned with the current router declarations
