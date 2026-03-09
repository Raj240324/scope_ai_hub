/**
 * frameLoader.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Handles progressive, priority-aware loading of WebP animation frames into an
 * in-memory cache.  Frames are stored as ImageBitmap objects for zero-copy
 * transfer to the canvas — the fastest path available in modern browsers.
 */

/** Total frames in the sequence. */
export const TOTAL_FRAMES = 192;

/** Frames loaded synchronously before idle scheduling begins. */
const EAGER_COUNT = 10;

/** Maximum retry attempts per frame on network failure. */
const MAX_RETRIES = 3;

/** Base delay (ms) for exponential back-off: delay = BASE * 2^attempt */
const RETRY_BASE_MS = 200;

/**
 * Converts a 1-based frame number to the canonical public path.
 */
export function framePath(frameNumber) {
  const padded = String(frameNumber).padStart(4, "0");
  return `/hero-frames/frame_${padded}.webp`;
}

/**
 * Sleep utility used by the retry logic.
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Load a single frame by 1-based index with retry + back-off.
 */
async function loadFrameWithRetry(frameNumber, signal) {
  const url = framePath(frameNumber);

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    if (signal.aborted) return null;

    try {
      const response = await fetch(url, { signal });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const blob = await response.blob();
      if (signal.aborted) return null;

      // ImageBitmap decoding is off-main-thread in supporting browsers.
      return await createImageBitmap(blob);
    } catch (err) {
      if (signal.aborted) return null;

      const isLastAttempt = attempt === MAX_RETRIES;
      if (!isLastAttempt) {
        await sleep(RETRY_BASE_MS * Math.pow(2, attempt));
      } else {
        console.warn(`[frameLoader] Failed to load frame ${frameNumber}:`, err);
        return null;
      }
    }
  }

  return null;
}

/**
 * Kick off the two-phase progressive loading pipeline.
 */
export async function startFrameLoading(
  cache,
  isMobile,
  onProgress,
  signal
) {
  const abort = signal ?? new AbortController().signal;

  // Mobile: frames 2, 4, 6... (even frames)
  // Desktop: frames 1, 2, 3... (all frames)
  const targets = isMobile
    ? Array.from({ length: Math.floor(TOTAL_FRAMES / 2) }, (_, k) => k * 2 + 2)
    : Array.from({ length: TOTAL_FRAMES }, (_, k) => k + 1);

  const total = targets.length;
  let loaded = 0;

  // Phase 1: Eager load
  const eagerTargets = targets.slice(0, EAGER_COUNT);
  await Promise.all(
    eagerTargets.map(async (frameNum) => {
      if (abort.aborted) return;
      const bitmap = await loadFrameWithRetry(frameNum, abort);
      if (bitmap) {
        cache[frameNum - 1] = bitmap;
        loaded++;
        onProgress?.(loaded, total);
      }
    })
  );

  if (abort.aborted) return;

  // Phase 2: Background load
  const remainingTargets = targets.slice(EAGER_COUNT);

  await new Promise((resolve) => {
    let index = 0;

    const scheduleNext = () => {
      if (abort.aborted || index >= remainingTargets.length) {
        resolve();
        return;
      }

      const scheduleFn =
        typeof requestIdleCallback !== "undefined"
          ? (cb) => requestIdleCallback(cb, { timeout: 2000 })
          : (cb) => setTimeout(cb, 16);

      scheduleFn(async () => {
        const BATCH = 4;
        const batch = remainingTargets.slice(index, index + BATCH);
        index += BATCH;

        await Promise.all(
          batch.map(async (frameNum) => {
            if (abort.aborted) return;
            const bitmap = await loadFrameWithRetry(frameNum, abort);
            if (bitmap) {
              cache[frameNum - 1] = bitmap;
              loaded++;
              onProgress?.(loaded, total);
            }
          })
        );

        scheduleNext();
      });
    };

    scheduleNext();
  });
}

/**
 * Release all ImageBitmaps in the cache to free GPU memory.
 */
export function releaseFrameCache(cache) {
  for (let i = 0; i < cache.length; i++) {
    if (cache[i]) {
      cache[i].close();
      cache[i] = null;
    }
  }
}
