# Animations

## Primary Animation Stack
- Framer Motion is the primary animation layer across pages and reusable wrappers
- GSAP + ScrollTrigger is used in `components/ui/DominoScroll.jsx`
- Lottie is used through `LottieAnimation` wrapper with JSON assets in `src/assets/animations/`
- CSS keyframes support marquee, card flips, and utility effects

## Reusable Motion Primitives
- `components/utils/Animations.jsx` exports:
  - `FadeIn`
  - `StaggerContainer`
  - `StaggerItem`
  - `ScaleOnHover`
  - `Parallax`
  - `CountUp`
  - `ScrollCountUp`
  - `Marquee`

## Route Transition System
- `PageTransition` wraps routed content through `AnimatedRoutes` in `App.jsx`
- `Suspense` fallback spinner handles lazy route boundaries

## Hero Animation System
- `HeroEngine` chooses render mode using `getHeroMode()`
- Modes:
  - `desktop`: canvas frame sequence (`DesktopHeroSequence`) using 192 WebP frames
  - `video`: video hero fallback
  - `static`: static image hero fallback
- Includes preloader synchronization using `heroVideoReady` event

## Scroll and Reveal Patterns
- `useScrollReveal` hook drives in-view reveal states in many pages
- Lenis smooth scroll is globally enabled with hero intersection stop/start logic
- Framer `whileHover`/`whileTap` used extensively on CTA buttons and cards

## Reduced Motion Handling
- Hero mode switches to static when `prefers-reduced-motion` is enabled
- Global CSS reduced-motion media query compresses animation durations
