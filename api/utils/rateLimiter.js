/**
 * Server-Side Adaptive Rate Limiter
 *
 * Shared across all Vercel serverless endpoints.
 * Uses in-memory Maps (reset on cold starts — acceptable for serverless).
 * Cache cleared locally on edit.
 *
 * Tiers:
 *   5 attempts / 5 min  → warning
 *   8 attempts / 10 min → blocked 10 min
 *  15 attempts / 30 min → blocked 1 hour
 */

// ─── Token Replay Cache ─────────────────────────────────────────────
const tokenCache = new Map();
const TOKEN_TTL_MS = 2 * 60 * 1000; // 2 minutes

// ─── IP-Based Adaptive Rate Limiter ─────────────────────────────────
const ipMap = new Map();
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

/**
 * Check whether a given IP is rate-limited.
 * @param {string} ip
 * @returns {{ allowed: boolean, reason: string }}
 */
export function checkServerRateLimit(ip) {
  const now = Date.now();
  let record = ipMap.get(ip) || { attempts: [], blockedUntil: 0 };

  if (record.blockedUntil > now) {
    return { allowed: false, reason: 'blocked' };
  }

  // Purge entries older than 30 min
  record.attempts = record.attempts.filter((ts) => now - ts < 30 * 60 * 1000);
  record.attempts.push(now);

  const attempts5m = record.attempts.filter((ts) => now - ts < 5 * 60 * 1000).length;
  const attempts10m = record.attempts.filter((ts) => now - ts < 10 * 60 * 1000).length;
  const attempts30m = record.attempts.length;

  if (attempts30m >= 15) {
    record.blockedUntil = now + 60 * 60 * 1000;
    ipMap.set(ip, record);
    return { allowed: false, reason: 'blocked_1hr' };
  }

  if (attempts10m >= 8) {
    record.blockedUntil = now + 10 * 60 * 1000;
    ipMap.set(ip, record);
    return { allowed: false, reason: 'blocked_10m' };
  }

  ipMap.set(ip, record);

  if (attempts5m >= 5) {
    return { allowed: true, reason: 'warn' };
  }

  return { allowed: true, reason: 'ok' };
}

/**
 * Explicitly block an IP for a given duration.
 * @param {string} ip
 * @param {number} durationMs
 */
export function blockIpFor(ip, durationMs) {
  const record = ipMap.get(ip) || { attempts: [], blockedUntil: 0 };
  record.blockedUntil = Date.now() + durationMs;
  ipMap.set(ip, record);
}

/**
 * Check for reCAPTCHA token replay (SHA-256 hash).
 * @param {string} tokenHash
 * @returns {boolean} true if replayed
 */
export function isTokenReplayed(tokenHash) {
  if (tokenCache.has(tokenHash)) return true;
  tokenCache.set(tokenHash, Date.now());
  return false;
}

/**
 * Periodic cleanup of stale entries. Call at the start of every request.
 */
export function cleanupMemoryCache() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  // Cleanup rate limiter
  const cutoff = now - 30 * 60 * 1000;
  for (const [key, val] of ipMap) {
    val.attempts = val.attempts.filter((ts) => ts > cutoff);
    if (val.attempts.length === 0 && val.blockedUntil < now) {
      ipMap.delete(key);
    } else {
      ipMap.set(key, val);
    }
  }

  // Cleanup token cache
  const tokenCutoff = now - TOKEN_TTL_MS;
  for (const [key, ts] of tokenCache) {
    if (ts < tokenCutoff) tokenCache.delete(key);
  }
}
