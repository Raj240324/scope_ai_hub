// src/utils/heroFrameCache.js
// ─────────────────────────────────────────────────────────────────────────────
// Singleton frame cache with progressive loading.
//
// Loading phases:
//   Phase 1 — Poster frame (frame 0) → instant hero appearance
//   Phase 2 — Keyframes (25%, 50%, 75%, 100%) → smooth initial scrub
//   Phase 3 — All remaining frames via requestIdleCallback → no jank
//
// Memory management:
//   Mobile:  keep max 30 decoded bitmaps
//   Desktop: keep max 120 decoded bitmaps
//   Evicts farthest frames from current position via bitmap.close()
//
// No Workers. Uses fetch() + createImageBitmap() on main thread.
// createImageBitmap is non-blocking and already yields to the browser.
// ─────────────────────────────────────────────────────────────────────────────

// ── Device profile ──────────────────────────────────────────────────────────
function getProfile() {
  const ua = navigator.userAgent || "";
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isMobile = isIOS || isAndroid || window.innerWidth < 768;
  const ram = navigator.deviceMemory ?? 4;
  const connType = navigator.connection?.effectiveType ?? "4g";
  const isSlow = connType === "slow-2g" || connType === "2g" || connType === "3g";

  // Frame count: mobile gets fewer frames, desktop full set
  let targetFrames;
  if (!isMobile) targetFrames = 180;
  else if (ram >= 4 && !isSlow) targetFrames = 60;
  else targetFrames = 40;

  // Max bitmaps in memory
  const maxCached = isMobile ? 30 : 120;

  // DPR: mobile=1, desktop=min(dpr,2)
  const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);

  // Resolution cap
  const maxW = isMobile ? 540 : 1920;
  const maxH = isMobile ? 960 : 1080;
  const bitmapW = Math.min(Math.round(window.innerWidth * dpr), maxW);
  const bitmapH = Math.min(Math.round(window.innerHeight * dpr), maxH);

  return { isMobile, targetFrames, maxCached, bitmapW, bitmapH };
}

// ── Decode a single frame ───────────────────────────────────────────────────
async function decodeFrame(url, w, h) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const blob = await res.blob();
  return createImageBitmap(blob, {
    resizeWidth: w,
    resizeHeight: h,
    resizeQuality: "medium",
  });
}

// ── Build loading order: poster → keyframes → all remaining ─────────────────
function buildLoadingOrder(total) {
  const seen = new Set();
  const order = [];
  const add = (i) => {
    const c = Math.min(Math.max(i, 0), total - 1);
    if (!seen.has(c)) { seen.add(c); order.push(c); }
  };

  // Phase 1: poster
  add(0);

  // Phase 2: keyframes at 25%, 50%, 75%, end
  [
    Math.floor(total * 0.25),
    Math.floor(total * 0.5),
    Math.floor(total * 0.75),
    total - 1,
  ].forEach(add);

  // Phase 3: all remaining in sequential order
  for (let i = 0; i < total; i++) add(i);

  return order;
}

// ─────────────────────────────────────────────────────────────────────────────
// THE CACHE SINGLETON
// ─────────────────────────────────────────────────────────────────────────────
const cache = {
  bitmaps: [],        // ImageBitmap[] — sparse, fills as frames decode
  frameList: [],      // actual frame numbers (stride-adjusted)
  total: 0,           // total expected slots
  loaded: 0,          // how many slots are filled
  ready: false,       // true when ALL frames are loaded
  profile: null,
  _aborted: false,

  // Progress listeners — CoreSpinLoader subscribes here
  _listeners: new Set(),

  onProgress(cb) {
    this._listeners.add(cb);
    // Fire immediately with current state
    cb(this.loaded, this.total);
    return () => this._listeners.delete(cb);
  },

  _notify() {
    this._listeners.forEach((cb) => cb(this.loaded, this.total));
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// START LOADING — called once at module import time from main.jsx
// ─────────────────────────────────────────────────────────────────────────────
export function startHeroPreload({
  totalFrames = 192,
  framePath = (i) => `/hero-frames/frame_${String(i).padStart(4, "0")}.webp`,
} = {}) {
  // Already started — don't re-run
  if (cache.profile) return;

  const profile = getProfile();
  cache.profile = profile;

  // Calculate stride to reach target frame count
  const stride = Math.max(1, Math.round(totalFrames / profile.targetFrames));

  // Build frame list
  const frames = [];
  for (let i = 1; i <= totalFrames; i += stride) frames.push(i);
  cache.frameList = frames;
  cache.total = frames.length;
  cache.bitmaps = new Array(frames.length).fill(null);
  cache.loaded = 0;
  cache.ready = false;
  cache._aborted = false;

  const abs = (path) => new URL(path, window.location.href).href;
  const order = buildLoadingOrder(frames.length);

  // ── Phase 1+2: poster + keyframes (first 5 items) — eager, sequential ──
  const eagerCount = Math.min(5, order.length);
  const eagerSlots = order.slice(0, eagerCount);
  const idleSlots = order.slice(eagerCount);

  async function loadEager() {
    for (const slotIdx of eagerSlots) {
      if (cache._aborted) return;
      try {
        const bm = await decodeFrame(
          abs(framePath(frames[slotIdx])),
          profile.bitmapW,
          profile.bitmapH,
        );
        if (cache._aborted) { bm?.close(); return; }
        cache.bitmaps[slotIdx] = bm;
        cache.loaded++;
        cache._notify();
      } catch (_) {
        // Count as loaded even on failure so progress advances
        cache.loaded++;
        cache._notify();
      }
    }
  }

  // ── Phase 3: remaining frames via requestIdleCallback batches ──────────
  function loadIdle() {
    if (cache._aborted || idleSlots.length === 0) {
      finalize();
      return;
    }

    let idx = 0;
    const BATCH = 4; // decode up to 4 per idle callback

    function processIdleBatch(deadline) {
      if (cache._aborted) return;

      const promises = [];
      // Schedule a small batch within this idle period
      const end = Math.min(idx + BATCH, idleSlots.length);
      for (let i = idx; i < end; i++) {
        const slotIdx = idleSlots[i];
        promises.push(
          decodeFrame(
            abs(framePath(frames[slotIdx])),
            profile.bitmapW,
            profile.bitmapH,
          )
            .then((bm) => {
              if (cache._aborted) { bm?.close(); return; }
              cache.bitmaps[slotIdx] = bm;
              cache.loaded++;
              cache._notify();
            })
            .catch(() => {
              cache.loaded++;
              cache._notify();
            }),
        );
      }
      idx = end;

      Promise.all(promises).then(() => {
        if (idx >= idleSlots.length || cache._aborted) {
          finalize();
        } else {
          // Schedule next batch
          if (typeof requestIdleCallback !== "undefined") {
            requestIdleCallback(processIdleBatch, { timeout: 200 });
          } else {
            setTimeout(() => processIdleBatch(), 16);
          }
        }
      });
    }

    // Kick off idle loading
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(processIdleBatch, { timeout: 100 });
    } else {
      setTimeout(() => processIdleBatch(), 16);
    }
  }

  function finalize() {
    if (!cache._aborted) {
      cache.ready = true;
      cache._notify();
    }
  }

  // Execute: eager first, then idle
  loadEager()
    .then(() => loadIdle())
    .catch(console.error);
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS for consumers
// ─────────────────────────────────────────────────────────────────────────────

// useAppleScrollFrames calls this to get the pre-loaded bitmaps
export function getHeroCache() {
  return cache;
}

// CoreSpinLoader calls this to subscribe to progress (0–1)
export function subscribeToHeroProgress(cb) {
  return cache.onProgress(cb);
}

export function getHeroProgress() {
  return cache.total > 0 ? cache.loaded / cache.total : 0;
}

export function isHeroReady() {
  return cache.ready;
}