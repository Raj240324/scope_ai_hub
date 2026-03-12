// src/utils/heroFrameCache.js
// ─────────────────────────────────────────────────────────────────────────────
// Singleton frame cache. Starts decoding the moment this module is imported.
// Import this in main.jsx / App.jsx so loading begins at app boot —
// before the preloader even renders.
//
// Both CoreSpinLoader (progress) and useAppleScrollFrames (consume)
// share this single cache — frames are never decoded twice.
// ─────────────────────────────────────────────────────────────────────────────

// ── Device profile (same logic as hook, duplicated here to avoid circular imports)
function getProfile() {
  const ua        = navigator.userAgent || "";
  const isIOS     = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isMobile  = isIOS || isAndroid || window.innerWidth < 768;
  const ram       = navigator.deviceMemory ?? 4;
  const connType  = navigator.connection?.effectiveType ?? "4g";
  const isSlow    = connType === "slow-2g" || connType === "2g" || connType === "3g";

  let stride;
  if (!isMobile)                    stride = 1;
  else if (ram >= 4 && !isSlow)     stride = 3;
  else if (ram >= 2)                stride = 4;
  else                              stride = 6;

  let workerCount;
  if (!isMobile)               workerCount = Math.min(navigator.hardwareConcurrency || 4, 6);
  else if (ram <= 2 || isSlow) workerCount = 2;
  else                         workerCount = Math.min(navigator.hardwareConcurrency || 2, 3);

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let maxW, maxH;
  if (!isMobile)                    { maxW = 1920; maxH = 1080; }
  else if (ram >= 2 && !isSlow)     { maxW = 720;  maxH = 405;  }
  else                              { maxW = 540;  maxH = 303;  }

  return {
    stride,
    workerCount,
    bitmapW: Math.min(Math.round(window.innerWidth  * dpr), maxW),
    bitmapH: Math.min(Math.round(window.innerHeight * dpr), maxH),
  };
}

function buildPriorityOrder(total) {
  const seen  = new Set();
  const order = [];
  const add   = (i) => {
    const c = Math.min(Math.max(i, 0), total - 1);
    if (!seen.has(c)) { seen.add(c); order.push(c); }
  };
  [0, Math.floor(total * 0.25), Math.floor(total * 0.5),
   Math.floor(total * 0.75), total - 1].forEach(add);
  for (let i = 0; i < total; i++) add(i);
  return order;
}

// ── Worker pool (uses Vite ?worker — CSP safe)
import FrameWorker from "./frameWorker.js?worker";

function createPool(size) {
  const workers = Array.from({ length: size }, () => new FrameWorker());
  const pending = new Map();
  const busy    = new Array(size).fill(false);
  const queue   = [];
  let   seq     = 0;

  function drain() {
    if (!queue.length) return;
    const idx = busy.findIndex((b) => !b);
    if (idx === -1) return;
    const { task, resolve, reject } = queue.shift();
    busy[idx] = true;
    pending.set(task.id, { resolve, reject });
    workers[idx].postMessage(task);
  }

  workers.forEach((w, i) => {
    w.onmessage = ({ data }) => {
      busy[i] = false;
      const p = pending.get(data.id);
      if (!p) return;
      pending.delete(data.id);
      data.ok ? p.resolve(data.bitmap) : p.reject(new Error(data.error));
      drain();
    };
    w.onerror = () => { busy[i] = false; drain(); };
  });

  return {
    decode(url, w, h) {
      const id = seq++;
      return new Promise((resolve, reject) => {
        queue.push({ task: { id, url, w, h }, resolve, reject });
        drain();
      });
    },
    terminate() { workers.forEach((w) => w.terminate()); },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// THE CACHE SINGLETON
// ─────────────────────────────────────────────────────────────────────────────
const cache = {
  bitmaps:     [],      // ImageBitmap[] — sparse, fills as workers finish
  frameList:   [],      // the actual frame numbers loaded (stride-adjusted)
  total:       0,       // total expected slots
  loaded:      0,       // how many slots are filled
  ready:       false,   // true when ALL frames are loaded
  profile:     null,
  pool:        null,

  // Progress listeners — CoreSpinLoader subscribes here
  _listeners:  new Set(),

  onProgress(cb) {
    this._listeners.add(cb);
    // Fire immediately with current state so late subscribers get current value
    cb(this.loaded, this.total);
    return () => this._listeners.delete(cb);
  },

  _notify() {
    this._listeners.forEach((cb) => cb(this.loaded, this.total));
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// START LOADING — called once at module import time
// ─────────────────────────────────────────────────────────────────────────────
export function startHeroPreload({
  totalFrames = 192,
  framePath   = (i) => `/hero-frames/frame_${String(i).padStart(4, "0")}.webp`,
} = {}) {
  // Already started — don't re-run
  if (cache.pool) return;

  const profile = getProfile();
  cache.profile = profile;

  // Build frame list
  const frames = [];
  for (let i = 1; i <= totalFrames; i += profile.stride) frames.push(i);
  cache.frameList = frames;
  cache.total     = frames.length;
  cache.bitmaps   = new Array(frames.length).fill(null);
  cache.loaded    = 0;
  cache.ready     = false;

  const pool = createPool(profile.workerCount);
  cache.pool = pool;

  const abs = (path) => new URL(path, window.location.href).href;
  const order = buildPriorityOrder(frames.length);

  // Decode all frames in priority order, workers running concurrently
  Promise.all(
    order.map((slotIdx) =>
      pool
        .decode(abs(framePath(frames[slotIdx])), profile.bitmapW, profile.bitmapH)
        .then((bm) => {
          cache.bitmaps[slotIdx] = bm;
          cache.loaded++;
          cache._notify();
        })
        .catch(() => {
          // Per-frame failure — still notify so progress advances
          cache.loaded++;
          cache._notify();
        })
    )
  ).then(() => {
    cache.ready = true;
    cache._notify();
    // Workers done — terminate to free threads
    pool.terminate();
  });
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