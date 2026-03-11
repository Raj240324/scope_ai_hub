═══════════════════════════════════════════════════════════════════════════
SCOPEAIHUB.COM — APPLE-GRADE SMOOTH SCROLL IMPLEMENTATION
Master Prompt — Built From Full Production Codebase Audit (2026-03-10)
═══════════════════════════════════════════════════════════════════════════

You are a senior frontend performance engineer implementing Apple-level
scroll smoothness across a production React site. A full codebase audit
has been completed. Every constraint below is real. Violating any rule
breaks the live site.

READ THIS BEFORE ANYTHING ELSE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ███████████████████████████████████████████████████████████████████
  ██                                                               ██
  ██   THE HERO SECTION IS PERFECT AND COMPLETE.                  ██
  ██   DO NOT TOUCH IT. DO NOT IMPROVE IT. DO NOT REFACTOR IT.    ██
  ██   DO NOT ADD LENIS TO IT. DO NOT ADD FRAMER TO IT.           ██
  ██   DO NOT ADD SCROLL LISTENERS TO IT.                         ██
  ██   DO NOT WRAP IT IN ANY ANIMATION CONTAINER.                 ██
  ██   ANY MODIFICATION = BROKEN PRODUCTION SITE.                 ██
  ██                                                               ██
  ██   Protected files:                                            ██
  ██     src/components/HeroScrollCanvas.jsx                       ██
  ██     src/hooks/useAppleScrollFrames.js                         ██
  ██                                                               ██
  ███████████████████████████████████████████████████████████████████

This warning is repeated throughout this document at every point where
an AI would naturally be tempted to "improve" or "integrate" the hero.
Each time you see it, stop and move on to the next task.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHAPTER 1: WHAT APPLE ACTUALLY DOES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Apple's smoothness does NOT come from a scroll library.
It comes from four rules they never break. Follow every one.

  RULE 1 — GPU ONLY
    Only ever animate `transform` and `opacity`.
    Never animate: height, width, margin, padding, top, left,
    background-color, border-color, font-size, or any layout property.
    These two bypass layout and paint. The GPU handles them.
    Everything else causes reflow and drops frames.

  RULE 2 — FAST-OUT EASING
    Every animation: cubic-bezier(0.16, 1, 0.3, 1)
    Framer array form: [0.16, 1, 0.3, 1]
    This already exists in the codebase. Match it exactly.
    Never use: linear, ease-in-out, ease, or bounce.

  RULE 3 — NOTHING ANIMATES BEFORE IT IS READY
    No animation starts until the element is fully painted and the
    CoreSpinLoader preloader has exited. No flash. No layout shift.

  RULE 4 — OBSERVE ONCE, THEN STOP
    IntersectionObserver fires once → observer.unobserve(el) immediately.
    observer.disconnect() in every useEffect cleanup.
    Never persist observers on elements that have already animated.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHAPTER 2: EXACT TECH STACK — ASSUME NOTHING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Framework:      React 18 + Vite
  Router:         React Router DOM v7 (NOT v6 — different API)
  CSS:            Tailwind CSS v4 via PostCSS
                  ⚠️  NO tailwind.config.js — config is in index.css @theme
                  ⚠️  Never create tailwind.config.js — breaks Tailwind v4
  Animations:     Framer Motion ✓ already installed
                  GSAP ✓ already installed (legacy — do NOT add ScrollTrigger)
                  Lottie React ✓ already installed
  Scroll:         Lenis ✓ already in package.json — NOT yet configured
                  ⚠️  Do NOT npm install lenis — it's already there
                  ⚠️  Do NOT add GSAP ScrollTrigger — conflicts with hero
  State:          ThemeContext (dark/light) + ModalContext — already exist
                  Do not create new Context providers
  Pre-render:     react-snap runs post-build on all crawlable routes
                  ⚠️  Every browser API needs SSR guard:
                      if (typeof window === 'undefined') return
  Error tracking: Sentry active in production — wrap risky code in try/catch
  Hosting:        Vercel + strict CSP headers in vercel.json (do not touch)
  Testing:        vitest configured — export pure functions for testability

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHAPTER 3: THE HERO SECTION — FULL EXPLANATION OF WHY IT IS PROTECTED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

The site audit says the hero uses GSAP. THIS IS WRONG / OUTDATED.
The hero was completely rebuilt after the audit. The current version:

  — Loads 192 WebP frames from /hero-frames/
  — Converts each to ImageBitmap (GPU-resident) via createImageBitmap()
  — Runs its own requestAnimationFrame loop (60fps)
  — Has its own IntersectionObserver (pauses when off-screen)
  — Has its own ResizeObserver (keeps canvas sharp on resize)
  — Has its own passive scroll listener (maps scroll → frame index)
  — Uses ease-in-out frame indexing
  — Handles mobile separately (48 frames, smaller video)
  — Has its own loading bar, scroll indicator, and overlays
  — Returns { loadedCount, isFullyLoaded } for the loading bar

This system is:
  — Buttery smooth (the whole reason we are doing this task)
  — Architecturally identical to how Apple builds scroll sequences
  — Completely self-contained — it does not need Lenis, Framer, or GSAP
  — The result of multiple rounds of engineering and testing

Adding Lenis, Framer Motion, or any other scroll/animation system
to the hero creates direct conflicts with its internal scroll pipeline.
The result is double-handling of scroll events, frame drops, and jank.

THEREFORE:

  ┌─────────────────────────────────────────────────────────────┐
  │  HERO SECTION RULES — ALL MUST BE FOLLOWED                 │
  │                                                             │
  │  1. Do not open HeroScrollCanvas.jsx for editing.           │
  │     The ONE exception: add id="hero-section" to the outer  │
  │     <section> tag so Lenis can detect it. See Chapter 7.   │
  │                                                             │
  │  2. Do not open useAppleScrollFrames.js for editing.        │
  │     Not for any reason. Not to "improve performance."       │
  │     Not to "add Lenis integration." Nothing.                │
  │                                                             │
  │  3. Do not wrap the hero in any animation container.        │
  │     Not in motion.div, not in AnimatePresence,             │
  │     not in ScrollReveal, not in any new component.         │
  │                                                             │
  │  4. Do not add useScrollReveal() to the hero section.       │
  │     It is already visible on first paint. Scroll reveals   │
  │     are for sections below the fold only.                  │
  │                                                             │
  │  5. Do not add any Framer Motion variants to the hero.      │
  │     Not fadeUp, not fadeIn, not anything.                  │
  │                                                             │
  │  6. Do not let Lenis intercept hero scroll events.          │
  │     Lenis must be STOPPED when hero is in viewport.        │
  │     See Chapter 7 (Lenis) for exact implementation.        │
  │                                                             │
  │  7. The hero manages its own page height (500vh section)    │
  │     and its own sticky positioning. Do not add CSS that    │
  │     affects position, height, overflow, or z-index of      │
  │     anything with id="hero-section" or its parents.        │
  └─────────────────────────────────────────────────────────────┘

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHAPTER 4: OTHER PROTECTED SYSTEMS — DO NOT TOUCH
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ❌  api/ — serverless functions, security-critical
  ❌  vercel.json — dynamically generated CSP hashes
  ❌  scripts/ — deployment pipeline
  ❌  src/components/ContactModal.jsx — own animation + ModalContext

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHAPTER 5: COMPONENTS WITH EXISTING ANIMATIONS — NO DOUBLE-ANIMATING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  CoreSpinLoader
    Full-screen preloader with own animation.
    No observers, no Lenis, no rAF activates while it is visible.
    Gate all animation init behind its "done" signal.

  3D flip cards (methodology/steps)
    CSS transform: rotateY() for flip.
    Adding Framer whileHover scale/y = broken 3D.
    These are EXCLUDED from all micro-interactions.
    Only allowed: scroll reveal (fadeUp) on their outer wrapper.

  Marquee (.animate-marquee CSS class)
    CSS animation already applied.
    Verify it uses translateX not left/margin before touching.
    If translateX: add will-change + hover pause only.
    If left/margin: migrate to translateX keyframes only.

  Search overlay, Mobile nav sidebar, Theme toggle, Hamburger icon,
  New User Modal, Tawk.to chat widget
    All have their own existing animations.
    Do not add Framer or CSS transitions on top.
    Do not wrap in PageTransition.

  Sticky Navbar
    Never in PageTransition.
    No entry animation. No scroll-based animation.
    Only permitted: whileHover on the logo (scale: 1.04 max).

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHAPTER 6: EXISTING ANIMATION SYSTEM — EXTEND, NEVER REPLACE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  src/utils/Animations.jsx
    Exports: FadeIn, StaggerContainer, StaggerItem — all use Framer Motion.
    Already used across multiple pages.
    Do not delete or rename exports.
    Only permitted change: motion.div → m.div for LazyMotion.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHAPTER 7: BRAND SYSTEM — EXACT VALUES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Brand gradient:  linear-gradient(110deg, #D64FD9, #5A2BC6)
  Brand solid:     #A73FD0
  Dark bg:         #010408 → #0f1624
  Light bg:        #ffffff, #f7f7f9
  Text primary:    #f5f0ea
  Text muted:      rgba(245, 240, 234, 0.55)
  Easing CSS:      cubic-bezier(0.16, 1, 0.3, 1)
  Easing Framer:   [0.16, 1, 0.3, 1]

  Fonts: Bebas Neue (display), Barlow Condensed (nav/btns),
         Barlow (body), DM Mono (mono/tags)

  Buttons: polygon clip-path for beveled corners.
    ⚠️  Do NOT add whileHover scale to clip-path buttons.
        scale + clip-path = jagged aliased edges.
        Use whileHover { y: -2 } only (vertical lift, no scale).

  Cards: border-radius 18px + glassmorphism backdrop-filter.
    Cards CAN use whileHover: { y: -4 } safely.

  All new components use CSS custom properties (var(--color-*)).
  Never hardcode hex values. Test in both dark and light themes.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHAPTER 8: BUILD PRIORITIES — COMPLETE IN EXACT ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Complete each priority fully before starting the next.

┌─────────────────────────────────────────────────────────────────────┐
│ PRIORITY 1 — GLOBAL CSS                                             │
│ src/index.css — add inside existing @layer base                     │
└─────────────────────────────────────────────────────────────────────┘

  html {
    scroll-behavior: auto;
    /* Never smooth — Lenis handles momentum.
       smooth here conflicts with Lenis and breaks back/forward. */
  }
  body {
    overscroll-behavior-y: none;
    /* Kills rubber-band bounce on Windows/Android.
       Single biggest non-code smoothness improvement. */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  /* Apple hides the scrollbar */
  ::-webkit-scrollbar { width: 0px; background: transparent; }
  * { scrollbar-width: none; }

  /* iOS Safari 100vh fix — use on all full-height sections */
  .h-screen-safe     { height: 100dvh; }
  .min-h-screen-safe { min-height: 100dvh; }

  /* Accessibility — non-negotiable */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  ⚠️  DO NOT add any CSS rules targeting #hero-section,
      HeroScrollCanvas, or the canvas element inside it.

┌─────────────────────────────────────────────────────────────────────┐
│ PRIORITY 2 — MOTION VARIANTS LIBRARY                                │
│ src/utils/motionVariants.js — CREATE                                │
└─────────────────────────────────────────────────────────────────────┘

Single source of truth. No inline variants anywhere in JSX.
Export pure objects — fully unit-testable with vitest.

  const EASE = [0.16, 1, 0.3, 1]

  export const fadeUp = {
    hidden:  { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0,
      transition: { duration: 0.7, ease: EASE } }
  }
  export const fadeIn = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1,
      transition: { duration: 0.55, ease: EASE } }
  }
  export const fadeLeft = {
    hidden:  { opacity: 0, x: -24 },
    visible: { opacity: 1, x: 0,
      transition: { duration: 0.7, ease: EASE } }
  }
  export const fadeRight = {
    hidden:  { opacity: 0, x: 24 },
    visible: { opacity: 1, x: 0,
      transition: { duration: 0.7, ease: EASE } }
  }
  export const scaleIn = {
    hidden:  { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1,
      transition: { duration: 0.6, ease: EASE } }
  }
  export const staggerContainer = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
  }
  export const staggerItem  = fadeUp
  export const fadeUpMobile = {
    hidden:  { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0,
      transition: { duration: 0.6, ease: EASE } }
  }
  export { EASE }

  ⚠️  DO NOT create a heroVariant or any animation for the hero.
      The hero does not use Framer Motion variants.

┌─────────────────────────────────────────────────────────────────────┐
│ PRIORITY 3 — SCROLL REVEAL HOOK                                     │
│ src/hooks/useScrollReveal.js — CREATE                               │
└─────────────────────────────────────────────────────────────────────┘

Raw IntersectionObserver — not Framer's useInView.
Framer's useInView keeps observing. This one disconnects after firing.

  export function useScrollReveal({
    threshold  = 0.12,
    rootMargin = '0px 0px -60px 0px',
    once       = true,
    enabled    = true,  // false while CoreSpinLoader is active
  } = {}) {
    const ref           = useRef(null)
    const [isVisible, setIsVisible] = useState(false)
    const reducedMotion = useReducedMotion() // from framer-motion

    useEffect(() => {
      if (typeof window === 'undefined') return  // react-snap SSR guard
      if (reducedMotion) { setIsVisible(true); return }
      if (!enabled) return
      const el = ref.current
      if (!el) return

      let observer
      try {
        observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (once) observer.unobserve(el)  // Apple Rule 4
          }
        }, { threshold, rootMargin })
        observer.observe(el)
      } catch (err) {
        setIsVisible(true)  // fail gracefully — Sentry logs error
        console.error('[useScrollReveal]', err)
      }

      return () => { if (observer) observer.disconnect() } // Apple Rule 4
    }, [reducedMotion, threshold, rootMargin, once, enabled])

    return { ref, isVisible }
  }

Usage pattern (use identically everywhere):
  const { ref, isVisible } = useScrollReveal()
  <m.section ref={ref} variants={staggerContainer}
    initial="hidden" animate={isVisible ? 'visible' : 'hidden'}>
    <m.h2 variants={fadeUp}>Title</m.h2>
    <m.p  variants={fadeUp}>Subtitle</m.p>
  </m.section>

  ⚠️  DO NOT use useScrollReveal() anywhere in or near the hero.
      The hero is above the fold and manages its own scroll logic.

┌─────────────────────────────────────────────────────────────────────┐
│ PRIORITY 4 — LENIS SMOOTH SCROLL                                    │
│ src/components/SmoothScroll.jsx — CREATE                            │
└─────────────────────────────────────────────────────────────────────┘

Lenis is already installed. Configure it here.

  Config:
    duration:        1.2
    easing:          (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    smoothTouch:     false  ← ALWAYS — native mobile scroll is better
    touchMultiplier: 2
    infinite:        false

  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  HERO CONFLICT — THIS IS MANDATORY, NOT OPTIONAL
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  HeroScrollCanvas has its own scroll pipeline — its own passive
  scroll listener and its own rAF loop. If Lenis also intercepts
  scroll events while the hero is visible, both systems fight over
  the same scroll input. The result is jank, double-scrolling, and
  broken frame mapping.

  Solution: Lenis must call lenis.stop() when the hero enters the
  viewport and lenis.start() when the hero exits.

  Implement EXACTLY like this inside SmoothScroll.jsx:

    useEffect(() => {
      if (typeof window === 'undefined') return
      // Wait for HeroScrollCanvas to render with its id
      const heroEl = document.getElementById('hero-section')
      if (!heroEl || !lenis) return

      const heroObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            lenis.stop()   // hero takes over scroll pipeline
          } else {
            lenis.start()  // Lenis resumes for the rest of the page
          }
        },
        { threshold: 0.05 }
      )
      heroObserver.observe(heroEl)
      return () => heroObserver.disconnect()
    }, [lenis])

  In HeroScrollCanvas.jsx, add id="hero-section" to the outer
  <section> tag. This is the ONLY change to HeroScrollCanvas.jsx.
  One attribute. Nothing else. Do not open the file for any other reason.

  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Framer Motion sync:
    Framer's useScroll() reads window.scrollY directly.
    Lenis updates window.scrollY as it runs.
    They are already in sync. No bridge needed.
    Do NOT add GSAP ScrollTrigger sync.

  RAF loop pattern:
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)

  Route change:
    useEffect watching useLocation().pathname:
    → lenis.scrollTo(0, { immediate: true })
    IMMEDIATE always. Never animated scroll between page routes.

  SSR guard (react-snap crashes without this):
    if (typeof window === 'undefined') return <>{children}</>

  Export useLenis() hook so components can call lenis.scrollTo().
  Wrap Lenis initialization in try/catch for Sentry safety.

┌─────────────────────────────────────────────────────────────────────┐
│ PRIORITY 5 — PAGE TRANSITIONS                                       │
│ src/components/PageTransition.jsx — CREATE                          │
│ src/App.jsx — MODIFY                                                │
└─────────────────────────────────────────────────────────────────────┘

  Entry:    opacity 0→1, y 16→0, duration 0.35s, ease EASE
  Exit:     opacity 1→0 ONLY — no translate on exit (causes jump)
  Exit dur: 0.2s
  Mode:     AnimatePresence mode="wait" — NEVER "sync"
  Key:      useLocation().pathname
  On exit:  lenis.scrollTo(0, { immediate: true }) in onExitComplete

  App.jsx wrap order — exact, do not reorder:
    <SmoothScroll>
      <LazyMotion features={domAnimation}>
        <HelmetProvider>
          <ThemeProvider>
            <ModalProvider>
              <Navbar />          ← outside PageTransition
              <PageTransition>
                <Outlet />        ← route content only
              </PageTransition>
              <Footer />          ← outside PageTransition
            </ModalProvider>
          </ThemeProvider>
        </HelmetProvider>
      </LazyMotion>
    </SmoothScroll>

  NOT wrapped in PageTransition (will break if wrapped):
    Navbar, Footer, ContactModal, New User Modal,
    Search overlay, CoreSpinLoader, Tawk.to widget.

  ⚠️  The hero section lives inside the Home page route which IS
      inside PageTransition. That is correct and expected.
      PageTransition only controls the outer page fade.
      It does NOT add any animation to the hero canvas itself.
      The hero canvas ignores opacity/y changes on its parent
      because it renders to a <canvas> element directly.
      This is safe. Do not try to exclude the Home route from
      PageTransition — just leave it as-is.

  LazyMotion note:
    import { LazyMotion, domAnimation, m } from 'framer-motion'
    Inside LazyMotion: use <m.div> not <motion.div>
    Outside LazyMotion (SmoothScroll.jsx itself): motion.div is fine
    Update src/utils/Animations.jsx: motion.div → m.div only.

┌─────────────────────────────────────────────────────────────────────┐
│ PRIORITY 6 — SCROLL REVEAL ON ALL PAGES                             │
│ Apply to all page components using useScrollReveal + motionVariants │
└─────────────────────────────────────────────────────────────────────┘

Global rules:
  — useScrollReveal() + variants from motionVariants.js
  — Use <m.div> (LazyMotion m) — not <motion.div>
  — Never animate elements visible in the first viewport on load
  — Never animate the hero section
  — Max 8 animated elements visible simultaneously on screen
  — Section heading pattern (apply consistently across all pages):
      h2:       fadeUp, delay 0
      subtitle: fadeUp, delay 0.08s
      content:  staggerContainer starting at delay 0.12s

  ╔══════════════════════════════════════════════════════════════╗
  ║  HOME PAGE — HERO IS OFF LIMITS                             ║
  ║                                                              ║
  ║  When you open Home.jsx, you will see HeroScrollCanvas.     ║
  ║  Do not add any animation wrapper around it.                ║
  ║  Do not add useScrollReveal() to it.                        ║
  ║  Do not add any Framer variants to it.                      ║
  ║  Skip it entirely and animate the sections below it only.   ║
  ╚══════════════════════════════════════════════════════════════╝

  HOME PAGE — sections below hero only:
    Stats row:                staggerContainer + staggerItem
    Hiring Partners strip:    fadeIn on section wrapper only
                              (marquee is already animating inside)
    Course preview cards:     staggerContainer + staggerItem
    Methodology steps:        check if 3D flip cards
                              → if yes: fadeUp on outer wrapper only
                              → if no: fadeLeft / fadeRight alternating
    Testimonials:             staggerContainer + staggerItem
    Career pipeline steps:    fadeLeft alternating fadeRight
    Trainer spotlight:        fadeUp
    Recognition logos:        fadeIn only (no y movement)
    FAQ preview:              staggerContainer + staggerItem
    Final CTA section:        scaleIn

  COURSES LIST PAGE:
    Page heading:             fadeUp
    Filter bar:               fadeIn, 0.3s duration
    Course cards:             staggerContainer + staggerItem

  COURSE DETAIL PAGE:
    Hero banner image:        fadeIn (images don't lift)
    Overview text:            fadeUp
    Curriculum accordion:     fadeLeft heading, stagger on items
    Instructor card:          fadeRight
    Testimonials:             staggerContainer + staggerItem
    Sticky CTA bar:           fadeIn only — no y movement

  ABOUT PAGE:
    Mission block:            fadeUp
    Team cards:               staggerContainer + staggerItem
    Timeline items:           fadeLeft alternating fadeRight

  CAREER SUPPORT PAGE:
    Step indicators:          staggerContainer, staggerChildren 0.12s
    Partner logos:            fadeIn only
    Stats:                    staggerContainer + staggerItem

  ADMISSIONS PAGE:
    Process steps:            fadeLeft alternating fadeRight
    Pricing cards:            staggerContainer + scaleIn per card
    FAQ items:                staggerContainer + staggerItem

  REVIEWS PAGE:
    Review cards:             staggerContainer + staggerItem (0.06s)

  CONTACT PAGE:
    Form container:           fadeUp on wrapper only
                              Do not individually animate each field

  FAQ PAGE:
    FAQ items:                staggerContainer + staggerItem

┌─────────────────────────────────────────────────────────────────────┐
│ PRIORITY 7 — MICRO-INTERACTIONS                                     │
│ Apply whileHover / whileTap to existing components                  │
└─────────────────────────────────────────────────────────────────────┘

Rules:
  — Transform only. Color via CSS :hover, not Framer.
  — transition: { duration: 0.2, ease: EASE }
  — whileHover scale max: 1.03
  — whileTap scale: 0.97 always
  — Mobile guard:
      const isTouch = typeof window !== 'undefined'
        && window.matchMedia('(hover: none)').matches
      If isTouch → skip whileHover entirely

  ✅ Primary/ghost buttons (clip-path style):
     whileHover: { y: -2 }    ← vertical ONLY, NO scale (clip-path)
     whileTap:   { scale: 0.97 }

  ✅ Glass cards (border-radius 18px):
     whileHover: { y: -4 }
     whileTap:   { scale: 0.98 }

  ✅ Course cards:
     whileHover: { y: -6 }
     whileTap:   { scale: 0.99 }

  ✅ Navbar logo:
     whileHover: { scale: 1.04 }
     whileTap:   { scale: 0.97 }

  ✅ Footer social icons:
     whileHover: { scale: 1.1, rotate: 3 }
     whileTap:   { scale: 0.95 }

  ❌ DO NOT add whileHover/whileTap to:
     — Anything inside or around HeroScrollCanvas
     — 3D flip cards (rotateY conflict)
     — Hamburger icon, theme toggle, search icon
     — Tawk.to widget
     — Mega menu items
     — CoreSpinLoader

┌─────────────────────────────────────────────────────────────────────┐
│ PRIORITY 8 — MARQUEE PERFORMANCE                                    │
└─────────────────────────────────────────────────────────────────────┘

  1. Find the .animate-marquee CSS keyframe in index.css.
  2. If uses translateX: add will-change: transform to the track
     element and animation-play-state: paused on :hover. Done.
  3. If uses left or margin-left: replace keyframe with:
       @keyframes marquee {
         0%   { transform: translateX(0); }
         100% { transform: translateX(-50%); }
       }
     Nothing else changes.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHAPTER 9: PERFORMANCE RULES — VIOLATIONS ARE PRODUCTION BUGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  P1.  Only transform + opacity. Never layout properties. (Rule 1)

  P2.  will-change: max 8 active elements on screen at once.
       Framer Motion manages this automatically.
       Only set manually with a measured performance reason.
       Never set globally on all cards or sections.

  P3.  All scroll listeners: { passive: true } always.

  P4.  All IntersectionObservers: disconnect() in useEffect cleanup.

  P5.  Home page already has 192 canvas frames loading on mount.
       Zero new scroll listeners on home page.
       Zero new rAF loops on home page.
       All home section animations use IntersectionObserver only.

  P6.  LazyMotion at app root:
       import { LazyMotion, domAnimation, m } from 'framer-motion'
       Use <m.div> inside boundary. ~30% Framer bundle reduction.

  P7.  AnimatePresence mode="wait". Never "sync".

  P8.  Images: loading="lazy" below fold. loading="eager"
       fetchpriority="high" for above-fold images.

  P9.  SSR guard on every browser API (react-snap):
       typeof window !== 'undefined' before window, document,
       navigator, localStorage, IntersectionObserver, matchMedia.

  P10. Test at 4× CPU throttle (Chrome DevTools).
       60fps at 4× is the target. If not: reduce y offset or duration.
       Never touch the easing curve.

  P11. Gate useScrollReveal with enabled=false while CoreSpinLoader
       is active. Nothing animates until the preloader exits.

  P12. Sentry is active. Wrap Lenis init + observer creation in
       try/catch. Fail gracefully — show content unanimated on error.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHAPTER 10: MOBILE RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  M1.  Lenis smoothTouch: false — always. Native is better.
  M2.  Mobile y offset: desktop y:28 → mobile y:15 (fadeUpMobile)
  M3.  No hover animations on touch: check (hover: none) media query.
  M4.  Touch targets: minimum 44×44px on all interactive elements.
  M5.  Replace 100vh with 100dvh on full-height sections.
       Use .h-screen-safe and .min-h-screen-safe classes from Priority 1.
  M6.  Test on real iPhone Safari — not Chrome DevTools emulator.
  M7.  overscroll-behavior: contain on modals and drawers.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHAPTER 11: AUDIT ISSUES — FIX WHILE IMPLEMENTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Fix these in files you are already touching. No separate tasks.

  FIX 1 — index.html: user-scalable=0 (WCAG accessibility failure)
    Current:  content="width=device-width, initial-scale=1.0, user-scalable=0"
    Fix:      content="width=device-width, initial-scale=1.0, minimum-scale=1.0"

  FIX 2 — 100vh → 100dvh on all full-height sections you touch.

  FIX 3 — fetchpriority="high" on above-fold images in every page
           you modify. loading="lazy" on everything below fold.

  FIX 4 — Google Fonts URL: verify &display=swap is present.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHAPTER 12: FILES TO PRODUCE — EXACT ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CREATE — new files:
  1.  src/utils/motionVariants.js
  2.  src/hooks/useScrollReveal.js
  3.  src/components/SmoothScroll.jsx
  4.  src/components/PageTransition.jsx

MODIFY — existing files:
  5.  index.html                — Fix user-scalable=0 only
  6.  src/index.css             — Priority 1 CSS additions
  7.  src/App.jsx               — Add SmoothScroll + LazyMotion wrapper
  8.  src/utils/Animations.jsx  — motion.div → m.div only
  9.  src/pages/Home.jsx        — Scroll reveals (sections below hero)
  10. src/pages/Courses.jsx     — Scroll reveals
  11. src/pages/CoursePage.jsx  — Scroll reveals
  12. src/pages/About.jsx       — Scroll reveals
  13. src/pages/Admissions.jsx  — Scroll reveals
  14. src/pages/CareerSupport.jsx — Scroll reveals
  15. src/pages/Reviews.jsx     — Scroll reveals
  16. src/pages/Contact.jsx     — Scroll reveals
  17. src/pages/FAQ.jsx         — Scroll reveals
  18. Button components         — Micro-interactions (y lift only)
  19. Card components           — Micro-interactions (y lift)
  20. Marquee component         — translateX verification + hover pause

HERO — ONE ATTRIBUTE ONLY:
  21. src/components/HeroScrollCanvas.jsx
      Add id="hero-section" to the outer <section> tag.
      Open the file. Find the outer <section>. Add the id.
      Close the file. Do not touch anything else in it.

DO NOT CREATE:
  ❌  tailwind.config.js — breaks Tailwind v4
  ❌  New Context providers — existing ones are enough
  ❌  GSAP ScrollTrigger import — conflicts with hero

DO NOT MODIFY:
  ❌  src/hooks/useAppleScrollFrames.js
  ❌  api/ directory
  ❌  vercel.json
  ❌  scripts/

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CHAPTER 13: PRE-SUBMISSION CHECKLIST — VERIFY BEFORE SHOWING CODE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Go through every item. If any answer is wrong, fix it first.

  HERO PROTECTION (most critical):
  □  The only change to HeroScrollCanvas.jsx is id="hero-section"?
     → Must be YES. If you changed anything else, revert it.
  □  Did I open useAppleScrollFrames.js for any reason?
     → Must be NO.
  □  Did I wrap the hero in any Framer Motion component?
     → Must be NO.
  □  Did I add useScrollReveal() to the hero section?
     → Must be NO.
  □  Did I add any animation variants to the hero?
     → Must be NO.
  □  Does Lenis call lenis.stop() when id="hero-section" is visible?
     → Must be YES.
  □  Did I add any CSS rules targeting #hero-section?
     → Must be NO (beyond the id itself in HeroScrollCanvas).

  TECH STACK COMPLIANCE:
  □  Did I create tailwind.config.js?
     → Must be NO.
  □  Did I run npm install lenis?
     → Must be NO — it was already installed.
  □  Did I add GSAP ScrollTrigger?
     → Must be NO.
  □  Is LazyMotion wrapping the app in App.jsx?
     → Must be YES.
  □  Is AnimatePresence mode="wait"?
     → Must be YES.
  □  Is Lenis smoothTouch set to false?
     → Must be YES.

  PERFORMANCE:
  □  Every browser API has a typeof window guard?
     → Must be YES.
  □  Every IntersectionObserver disconnects in cleanup?
     → Must be YES.
  □  Every scroll listener is passive: true?
     → Must be YES.
  □  CoreSpinLoader gates all scroll observers via enabled prop?
     → Must be YES.
  □  All animations use cubic-bezier(0.16, 1, 0.3, 1)?
     → Must be YES.
  □  New components work in both dark and light theme?
     → Must be YES.

═══════════════════════════════════════════════════════════════════════════
END OF MASTER PROMPT
The hero section is perfect. Leave it alone. Build everything else.
═══════════════════════════════════════════════════════════════════════════
