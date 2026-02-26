/**
 * /api/send-enquiry.js — Vercel Serverless Function
 *
 * Security-hardened enquiry handler with structured logging:
 *  1. POST-only, payload size guard
 *  2. Input sanitization & validation
 *  3. Server-side IP rate limiting (in-memory)
 *  4. reCAPTCHA v3 server-side verification
 *  5. Brevo transactional email (owner + auto-reply)
 *  6. Brevo CRM contact upsert
 *  7. Structured JSON logging with requestId
 *
 * Environment variables (Vercel Dashboard):
 *   BREVO_API_KEY        — Brevo transactional API key
 *   RECAPTCHA_SECRET_KEY — Google reCAPTCHA v3 secret
 *   SENTRY_DSN           — (optional) Sentry error tracking
 */
import { generateRequestId, createLogger } from './utils/logger.js';

// ─── Configuration ──────────────────────────────────────────────────
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

const OWNER_TEMPLATE_ID = 1;
const AUTO_REPLY_TEMPLATE_ID = 2;
const CRM_LIST_ID = 3;
const OWNER_EMAIL = 'nagarajan.webdev@gmail.com'; // TODO: change back to 'info@scopeaihub.com' for production
const OWNER_NAME = 'SCOPE AI HUB';

const MAX_BODY_BYTES = 10 * 1024; // 10 KB
const RECAPTCHA_THRESHOLD = 0.5;
const EXTERNAL_TIMEOUT_MS = 10_000;
const IS_TEST = process.env.NODE_ENV === 'test';

// ─── Server-Side Rate Limiter (in-memory) ───────────────────────────
const ipMap = new Map();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

function checkServerRateLimit(ip) {
  const now = Date.now();
  let entries = ipMap.get(ip) || [];

  // Purge expired entries
  entries = entries.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (entries.length >= RATE_LIMIT_MAX) {
    ipMap.set(ip, entries);
    return false;
  }

  entries.push(now);
  ipMap.set(ip, entries);
  return true;
}

// Automatic periodic cleanup to prevent memory leak
let lastCleanup = Date.now();
function cleanupRateLimiter() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  for (const [key, val] of ipMap) {
    const active = val.filter((ts) => ts > cutoff);
    if (active.length === 0) ipMap.delete(key);
    else ipMap.set(key, active);
  }
}

// ─── Helpers ────────────────────────────────────────────────────────

/** Strip HTML tags from a string */
function stripHtml(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/<[^>]*>/g, '').trim();
}

/** Basic email format validation */
function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

/** Normalize phone — keep digits, +, spaces only */
function normalizePhone(phone) {
  if (!phone) return '';
  return phone.replace(/[^\d+\s-]/g, '').trim().slice(0, 20);
}

/** Fetch with timeout using AbortController */
async function fetchWithTimeout(url, options, timeoutMs = EXTERNAL_TIMEOUT_MS) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    return res;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

// ─── Brevo API Calls ────────────────────────────────────────────────

async function sendBrevoEmail(templateId, toEmail, toName, params) {
  const body = {
    templateId,
    to: [{ email: toEmail, name: toName || toEmail }],
    params,
  };

  const res = await fetchWithTimeout('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => 'Unknown');
    throw new Error(`Brevo email failed (${res.status}): ${err}`);
  }

  return true;
}

async function upsertBrevoContact(email, attributes) {
  const body = {
    email,
    attributes,
    listIds: [CRM_LIST_ID],
    updateEnabled: true,
  };

  const res = await fetchWithTimeout('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'api-key': BREVO_API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok && res.status !== 204) {
    return false;
  }

  return true;
}

async function verifyRecaptcha(token, ip) {
  // Bypass in test mode
  if (IS_TEST) {
    return { success: true, score: 1.0, action: 'test' };
  }

  const params = new URLSearchParams({
    secret: RECAPTCHA_SECRET_KEY,
    response: token,
    remoteip: ip || '',
  });

  const res = await fetchWithTimeout('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!res.ok) {
    throw new Error('reCAPTCHA verification service unavailable');
  }

  const data = await res.json();
  return {
    success: data.success === true,
    score: data.score || 0,
    action: data.action || '',
  };
}

// ─── Main Handler ───────────────────────────────────────────────────

export default async function handler(req, res) {
  const requestId = generateRequestId();
  const log = createLogger(requestId);

  // Include requestId in response header for tracing
  res.setHeader('X-Request-ID', requestId);

  // Automatic rate limiter cleanup
  cleanupRateLimiter();

  // 1. Method guard
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // 2. Environment check
  if (!BREVO_API_KEY || !RECAPTCHA_SECRET_KEY) {
    log.error('Missing environment variables', { missing: !BREVO_API_KEY ? 'BREVO_API_KEY' : 'RECAPTCHA_SECRET_KEY' });
    return res.status(500).json({ success: false, message: 'Server configuration error. Please contact support.' });
  }

  try {
    // 3. Payload size guard
    const rawBody = JSON.stringify(req.body || {});
    if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) {
      log.warn('Payload too large', { bytes: Buffer.byteLength(rawBody, 'utf8') });
      return res.status(413).json({ success: false, message: 'Request payload is too large.' });
    }

    const body = req.body;

    // 4. Honeypot check
    if (body.website) {
      log.info('Honeypot triggered — bot detected');
      return res.status(200).json({ success: true, message: 'Enquiry submitted successfully.' });
    }

    // 5. Input sanitization
    const firstName = stripHtml(body.user_name || '').slice(0, 100);
    const email = stripHtml(body.user_email || '').toLowerCase().slice(0, 254);
    const phone = normalizePhone(body.user_phone || '');
    const location = stripHtml(body.user_location || '').slice(0, 200);
    const qualification = stripHtml(body.qualification || '').slice(0, 100);
    const courseInterest = stripHtml(body.course_interest || '').slice(0, 200);
    const message = stripHtml(body.message || '').slice(0, 1000);
    const recaptchaToken = body.recaptchaToken || '';

    // 6. Required field validation
    const errors = [];
    if (!firstName || firstName.length < 2) errors.push('Name is required (min 2 characters).');
    if (!email || !isValidEmail(email)) errors.push('A valid email address is required.');
    if (!message || message.length < 10) errors.push('Message is required (min 10 characters).');
    if (!recaptchaToken) errors.push('Security verification failed. Please refresh the page.');

    if (errors.length > 0) {
      log.warn('Validation failed', { field: errors[0] });
      return res.status(400).json({ success: false, message: errors[0] });
    }

    // 7. Server-side rate limiting
    const clientIp =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.headers['x-real-ip'] ||
      req.socket?.remoteAddress ||
      'unknown';

    if (!checkServerRateLimit(clientIp)) {
      log.warn('Rate limit exceeded', { ip: clientIp.slice(0, 8) + '***' });
      return res.status(429).json({ success: false, message: 'Too many requests. Please wait a few minutes and try again.' });
    }

    // 8. reCAPTCHA verification
    let captcha;
    try {
      captcha = await verifyRecaptcha(recaptchaToken, clientIp);
    } catch (err) {
      log.error('reCAPTCHA verification failed', { error: err.message });
      return res.status(403).json({ success: false, message: 'Security verification failed. Please try again.' });
    }

    if (!captcha.success || captcha.score < RECAPTCHA_THRESHOLD) {
      log.warn('reCAPTCHA score too low', { score: captcha.score });
      return res.status(403).json({ success: false, message: 'Security verification failed. Please try again.' });
    }

    log.info('Enquiry validated', { course: courseInterest, score: captcha.score });

    // 9. Template parameters (safe — no PII in logs)
    const templateParams = {
      FIRSTNAME: firstName,
      EMAIL: email,
      PHONE: phone || 'Not provided',
      LOCATION: location || 'Not provided',
      QUALIFICATION: qualification || 'Not provided',
      COURSE: courseInterest || 'General Inquiry',
      MESSAGE: message,
    };

    // 10. Save to Brevo CRM (non-critical)
    try {
      await upsertBrevoContact(email, {
        FIRSTNAME: firstName,
        PHONE: phone,
        LOCATION: location,
        QUALIFICATION: qualification,
        COURSE_INTEREST: courseInterest,
      });
      log.info('CRM contact upserted');
    } catch (err) {
      log.error('CRM upsert failed', { error: err.message });
    }

    // 11. Send owner notification (critical)
    try {
      await sendBrevoEmail(OWNER_TEMPLATE_ID, OWNER_EMAIL, OWNER_NAME, templateParams);
      log.info('Owner notification sent');
    } catch (err) {
      log.error('Owner email failed', { error: err.message });
      return res.status(500).json({ success: false, message: 'Failed to submit your enquiry. Please try again or call us directly.' });
    }

    // 12. Send auto-reply (non-critical)
    try {
      await sendBrevoEmail(AUTO_REPLY_TEMPLATE_ID, email, firstName, templateParams);
      log.info('Auto-reply sent');
    } catch (err) {
      log.error('Auto-reply failed', { error: err.message });
    }

    // 13. Success
    log.info('Enquiry completed successfully');
    return res.status(200).json({ success: true, message: 'Enquiry submitted successfully.' });
  } catch (err) {
    log.error('Unexpected error', { error: err.message });
    return res.status(500).json({ success: false, message: 'An unexpected error occurred. Please try again later.' });
  }
}
