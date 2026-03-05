/**
 * Input Sanitization Utilities
 *
 * Shared across all Vercel serverless endpoints.
 */

/**
 * Strip HTML tags from a string.
 * @param {string} str
 * @returns {string}
 */
export function stripHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '').trim();
}

/**
 * Validate email format.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

/**
 * Normalize phone — keep digits, +, spaces, and dashes only.
 * @param {string} phone
 * @returns {string}
 */
export function normalizePhone(phone) {
  if (!phone) return '';
  return phone.replace(/[^\d+\s-]/g, '').trim().slice(0, 20);
}

/**
 * Extract the client IP from request headers.
 * @param {import('http').IncomingMessage} req
 * @returns {string}
 */
export function getClientIp(req) {
  return (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

/**
 * Get all allowed origins as an array.
 * Supports comma-separated ALLOWED_ORIGINS for multi-domain deployments.
 * Falls back to ALLOWED_ORIGIN, then ALLOWED_HOSTNAME.
 * @returns {string[]}
 */
export function getAllowedOrigins() {
  if (process.env.ALLOWED_ORIGINS) {
    return process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim()).filter(Boolean);
  }
  const single =
    process.env.ALLOWED_ORIGIN ||
    `https://${process.env.ALLOWED_HOSTNAME || 'scope-ai-hub.vercel.app'}`;
  return [single];
}

/**
 * Check whether a request origin is allowed.
 * @param {string} origin
 * @returns {boolean}
 */
export function isAllowedOrigin(origin) {
  if (!origin) return false;
  return getAllowedOrigins().includes(origin);
}

/**
 * Check whether a referer header matches any allowed origin.
 * @param {string} referer
 * @returns {boolean}
 */
export function isAllowedReferer(referer) {
  if (!referer) return true; // Empty referer is acceptable
  const hosts = getAllowedOrigins().map((o) => o.replace(/^https?:\/\//, ''));
  return hosts.some((host) => referer.includes(host));
}

/**
 * Set standard security response headers.
 * @param {import('http').ServerResponse} res
 * @param {string} requestId
 */
export function setSecurityHeaders(res, requestId) {
  res.setHeader('X-Request-ID', requestId);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
}
