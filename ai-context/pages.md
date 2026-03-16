# Pages

## Routed Pages (Implemented in `src/App.jsx`)
- `/` — Home
- `/about` — About
- `/courses` — Courses list
- `/courses/:slug` — Course detail
- `/admissions` — Admissions
- `/career-support` — Career support
- `/reviews` — Reviews
- `/careers/join-as-trainer` — Join as trainer
- `/faq` — FAQ
- `/contact` — Contact
- `/privacy-policy` — Privacy policy
- `/terms-conditions` — Terms and conditions
- `/nda-policy` — NDA policy
- `/disclaimer` — Disclaimer
- `/refund-policy` — Refund policy
- `/legal/trainer-conduct` — Trainer code of conduct
- `/sitemap` — HTML sitemap page
- `*` — Not found page

## Page Files Present in `src/pages`
- Core pages: `Home`, `About`, `Admissions`, `Reviews`, `Contact`, `FAQ`, `Sitemap`, `NotFound`
- Course pages: `courses/CoursesList`, `courses/CourseDetail`
- Career pages: `careers/JoinAsTrainer`, `careers/TrainerProfiles`
- Career support page: `career-support/CareerSupport`
- Legal pages: `PrivacyPolicy`, `TermsConditions`, `NDAPolicy`, `RefundPolicy`, `Disclaimer`, `TrainerCodeOfConduct`

## Sitemap & Prerender Coverage
- `scripts/generate-sitemap.js` includes static routes + all course slugs from `src/data/courses.js`
- `package.json` `reactSnap.include` contains key static routes and selected course detail routes

## Route/Page Consistency Findings
- `src/pages/careers/TrainerProfiles.jsx` exists but no route is declared in `src/App.jsx`

## Page Composition Pattern
- Most pages use:
  - `Layout` wrapper
  - `SEO` component
  - `Hero` section or custom hero block
- Conversion CTAs typically connect to `openModal()` from `ModalContext`
