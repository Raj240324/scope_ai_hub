/**
 * scrollProgress.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Pure utility functions for translating raw scroll position into a normalised
 * [0, 1] progress value and then into a discrete frame index.
 */

/**
 * Normalise the current scroll position into a [0, 1] progress value relative
 * to the hero section.
 */
export function getScrollProgress(metrics) {
  const { scrollY, sectionTop, scrollableHeight } = metrics;

  if (scrollableHeight <= 0) return 0;

  const relativeScroll = scrollY - sectionTop;
  const raw = relativeScroll / scrollableHeight;

  // Clamp strictly to [0, 1].
  return Math.max(0, Math.min(1, raw));
}

/**
 * Map a normalised scroll progress value [0, 1] to a discrete frame index
 * [0, totalFrames - 1].
 */
export function progressToFrameIndex(progress, totalFrames) {
  const raw = progress * (totalFrames - 1);
  return Math.min(Math.floor(raw), totalFrames - 1);
}

/**
 * Optional ease-in-out cubic applied to the raw scroll progress.
 */
export function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Single entry point that combines getScrollProgress → (optional ease) →
 * progressToFrameIndex.
 */
export function getFrameIndexForScroll(metrics, totalFrames, eased = true) {
  const rawProgress = getScrollProgress(metrics);
  const progress = eased ? easeInOutCubic(rawProgress) : rawProgress;
  return progressToFrameIndex(progress, totalFrames);
}

/**
 * Derive scrollable height from a section element reference.
 * 
 * The scrollable range is the total height of the parent minus the viewport.
 * This represents the exact distance the user can scroll while the 
 * internal content remains 'stuck' at the top via position: sticky.
 */
export function getSectionScrollableHeight(el) {
  if (!el) return 0;
  return Math.max(0, el.offsetHeight - window.innerHeight);
}
