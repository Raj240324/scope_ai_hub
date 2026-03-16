# Content

## Content Sources
- Primary structured content comes from `src/data/`
  - `courses.js`
  - `addons.js`
  - `batches.js`
  - `branding.js`
- Supplementary static source file: `src/assets/scope ai syllabus and broucher.html`

## Branding Content
- Canonical brand object: `BRANDING` in `src/data/branding.js`
- Contains organization name variants, contact info, logos, office hours, location, and social placeholders

## Course Content Pattern
- 10 course entries with tiered classification and deep detail fields
- Course pages render from this data model instead of hardcoded route-specific content files

## FAQ/Reviews Content Pattern
- FAQ content is in-page structured arrays in `src/pages/FAQ.jsx`
- Reviews/testimonials content is in-page structured arrays in `src/pages/Reviews.jsx`

## Admissions and Career Content
- Batch cards are data-driven via `src/data/batches.js`
- Career add-ons and support benefits are data-driven via `src/data/addons.js`

## Content Governance Notes
- Brand contact information should be pulled from `BRANDING` where possible
- Route/page SEO strings are managed via `SEO` props in page components
- Course slugs are source-of-truth for sitemap and course detail URLs
