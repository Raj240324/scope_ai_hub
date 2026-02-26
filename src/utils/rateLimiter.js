/**
 * Client-side rate limiter using localStorage.
 * Prevents rapid-fire form submissions from the same browser.
 * Server-side rate limiting is the real enforcement layer.
 */
const STORAGE_KEY = 'enquiry_rate_limit';
const MAX_SUBMISSIONS = 3;
const WINDOW_MS = 60_000; // 60 seconds

/**
 * Check whether the user has exceeded the submission rate limit.
 * @throws {Error} if rate limit exceeded
 */
export function checkRateLimit() {
  const now = Date.now();
  let timestamps = [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      timestamps = JSON.parse(stored);
    }
  } catch {
    // Corrupted data — reset
    timestamps = [];
  }

  // Purge stale entries outside the window
  timestamps = timestamps.filter((ts) => now - ts < WINDOW_MS);

  if (timestamps.length >= MAX_SUBMISSIONS) {
    const oldestAge = now - timestamps[0];
    const waitSeconds = Math.ceil((WINDOW_MS - oldestAge) / 1000);
    throw new Error(
      `Too many submissions. Please wait ${waitSeconds} second${waitSeconds !== 1 ? 's' : ''} before trying again.`
    );
  }

  // Record this submission
  timestamps.push(now);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(timestamps));
  } catch {
    // localStorage full or disabled — continue silently
  }
}
