/**
 * DominoScroll.jsx — Perfect sequential domino cascade
 *
 * ─── The exact visual sequence (confirmed from 2160p video) ────────────────
 *
 *   t=0.0  Card 0 is UPRIGHT, centered, fully visible. Cards 1,2 invisible.
 *   t=0.0→0.5  Card 0 TIPS forward: rotateX 0→85°, Y 96→217, Z 0→100
 *              At t=0.35, Card 1 fades in at startState (upright, behind card 0)
 *   t=0.5→1.0  Card 0 FLIES into depth: Z 100→940, opacity 1→0 (disappears)
 *   t=1.0  Card 1 is UPRIGHT, centered, fully visible. Card 2 invisible.
 *   t=1.0→1.5  Card 1 TIPS. At t=1.35, Card 2 fades in behind it.
 *   t=1.5→2.0  Card 1 FLIES away.
 *   t=2.0→2.5  Card 2 TIPS.
 *   t=2.5→3.0  Card 2 FLIES away.
 *
 * ─── Why this works ───────────────────────────────────────────────────────
 *
 *   ONE master timeline + ONE ScrollTrigger.
 *   Each card occupies a strict 1.0-unit slice — no simultaneous animation.
 *   "Next card appears behind current" achieved by fading it in at t+0.35
 *   (while current card is still mid-tip → looks like it's being revealed).
 *
 * ─── Exact Framer values (from video Framer editor panel) ─────────────────
 *
 *   startState:   Y=96,  Z=0,   rotX=0°
 *   secondState:  Y=217, Z=100, rotX=85°
 *   endState:     Y=217, Z=940, rotX=85°,  opacity=0
 *   transformPerspective: 1000 (per-card, NOT on wrapper)
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DominoScroll = ({
  children,
  scrollDistance  = 1800,   // total px — divide by itemCount for per-card feel
  wrapperHeight,            // legacy fixed height
  containerClassName = '',  // responsive tailwind height classes
  wrapperMaxWidth = '900px',
  perspectiveOriginY = '60%',  // slightly below centre = floor-level view
}) => {
  const containerRef = useRef(null);
  const itemsRef     = useRef([]);

  const childrenArray = Array.isArray(children) ? children : [children];
  const itemCount     = childrenArray.length;

  // Timeline units: each card owns 1.0 units
  const CARD_DUR    = 1.0;
  const TIP_DUR     = 0.5;   // phase A: tip forward
  const FLY_DUR     = 0.5;   // phase B: fly into depth
  const REVEAL_AT   = 0.35;  // when next card fades in during current card's tip

  useEffect(() => {
    if (!containerRef.current || itemCount === 0) return;

    // Use gsap.matchMedia for responsive thresholds
    let mm = gsap.matchMedia(containerRef);

    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isTablet: "(min-width: 768px) and (max-width: 1023px)",
        isDesktop: "(min-width: 1024px)"
      },
      (context) => {
        let { isMobile, isTablet } = context.conditions;

        // Scale Y translations based on screen size
        const yStart = isMobile ? 40 : isTablet ? 70 : 96;
        const ySecond = isMobile ? 120 : isTablet ? 170 : 217;

        const START  = { x: 0, y: yStart,  z: 0,   rotateX: 0  };
        const SECOND = { x: 0, y: ySecond, z: 100, rotateX: 85 };
        const END    = { x: 0, y: ySecond, z: 940, rotateX: 85 };

      // ── Initial state: card 0 visible + upright, rest hidden ──────────
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.set(item, {
          ...START,
          opacity:              i === 0 ? 1 : 0,
          transformPerspective: 1000,          // per-card 3D perspective
          zIndex:               itemCount - i, // card 0 on top
        });
      });

      // ── ONE master timeline drives everything ──────────────────────────
      const master = gsap.timeline({
        scrollTrigger: {
          trigger:             containerRef.current,
          start:               'top top',
          end:                 `+=${scrollDistance}`,
          scrub:               1.2,
          invalidateOnRefresh: true,
        },
      });

      itemsRef.current.forEach((item, i) => {
        if (!item) return;

        const sliceStart = i * CARD_DUR;       // where this card's slice begins
        const nextItem   = itemsRef.current[i + 1];

        // ─ Phase A: tip forward (rotateX 0→85°, Y drops, Z slight push) ─
        master.fromTo(
          item,
          { ...START, opacity: i === 0 ? 1 : 0 },
          { ...SECOND, opacity: 1, ease: 'none', duration: TIP_DUR },
          sliceStart
        );

        // ─ Reveal next card mid-tip (while current is still tipping) ────
        //   Fades in upright at startState so it looks like it was always there
        if (nextItem) {
          master.fromTo(
            nextItem,
            { ...START, opacity: 0, zIndex: itemCount - (i + 1) },
            { opacity: 1, ease: 'none', duration: TIP_DUR - REVEAL_AT },
            sliceStart + REVEAL_AT
          );
        }

        // ─ Phase B: fly into depth (Z 100→940, opacity 1→0) ─────────────
        master.to(
          item,
          { ...END, opacity: 0, ease: 'none', duration: FLY_DUR },
          sliceStart + TIP_DUR
        );
      }); // end of forEach

      } // end of matchMedia callback
    );

    return () => mm.revert();
  }, [itemCount, scrollDistance]);

  return (
    /*
     * Outer div — scroll travel height.
     * NO perspective here — each card has its own transformPerspective:1000.
     * NO preserve-3d on any wrapper — standard CSS zIndex controls stacking.
     */
    <div
      ref={containerRef}
      style={{ position: 'relative', height: `${scrollDistance + 400}px` }}
    >
      {/* CSS sticky — locks card stage in viewport, no GSAP pin needed */}
      <div
        style={{
          position:       'sticky',
          top:            0,
          height:         '100dvh',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          overflow:       'hidden',
        }}
      >
        {/*
         * Card stage — NO perspective, NO preserve-3d.
         * preserve-3d breaks CSS zIndex via 3D z-sort.
         * Each card uses its own transformPerspective for the 3D look.
         */}
        <div
          className={`relative w-full ${containerClassName}`}
          style={{
            maxWidth: wrapperMaxWidth,
            height: wrapperHeight ? `${wrapperHeight}px` : undefined,
          }}
        >
          {childrenArray.map((child, index) => (
            <div
              key={index}
              ref={(el) => (itemsRef.current[index] = el)}
              style={{
                position:   'absolute',
                inset:      0,
                display:    'flex',
                alignItems: 'center',
                willChange: 'transform, opacity',
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DominoScroll;