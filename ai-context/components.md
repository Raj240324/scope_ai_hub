# Components

## Layout Components
- `components/layout/Layout.jsx` — global shell wrapper
- `components/layout/Footer.jsx` — footer links, contact summary, course quick links
- `components/layout/ErrorBoundary.jsx` — runtime React error boundary
- `components/Header.jsx` — sticky navbar, mega dropdown, search overlay, mobile nav

## Global Behavior Components
- `components/SmoothScroll.jsx` — Lenis wrapper with route reset and hero conflict control
- `components/PageTransition.jsx` — route transition animation container
- `components/HeroScrollCanvas.jsx` + `components/hero/*` — adaptive hero rendering system

## Utility Components (`components/utils`)
- `SEO.jsx` — meta tags + JSON-LD schema
- `Animations.jsx` — reusable Framer wrappers
- `NewUserModalTrigger.jsx` — delayed modal engagement trigger
- `ScrollToTop.jsx` — route scroll helper
- `TawkChat.jsx` — dynamic Tawk embed
- `StackingCards.jsx` — reusable visual interaction block

## UI Components (`components/ui`)
- Lead capture: `ContactModal`, `ContactForm`, `TrainerForm`
- CTA/support: `WhatsAppButton`, `DynamicScrollButton`, `ThemeToggle`
- Content UI: `Hero`, `CourseCard`, `AddonsGrid`, `ServiceGrid`, `MicroExpander`
- Motion visuals: `CoreSpinLoader`, `DominoScroll`, `NeuralCareerGraph`, `KineticTeamHybrid`, `LottieAnimation`, `DesignTestimonial`

## Home Section Components (`components/home`)
- `StatsSection`, `HiringPartners`, `CoursesSection`, `MethodologySection`
- `TestimonialsSection`, `CareerSupportSection`, `PlacementSection`
- `TrainerMiniSection`, `TrainerSpotlight`, `FAQSection`, `CTASection`
- `CorporateSection`, `GlobalReachSection`, `TrustFactors`

## Shared Section Components (`components/sections`)
- `BatchScheduleSection.jsx`

## Component System Notes
- Modal behavior is centrally controlled through `ModalContext`
- Pages compose sections and UI components rather than embedding raw markup everywhere
- Home page uses lazy-loaded section components below the fold
