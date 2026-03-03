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
import crypto from 'crypto';
import { generateRequestId, createLogger } from './utils/logger.js';

// ─── Configuration ──────────────────────────────────────────────────
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const ALLOWED_HOSTNAME = process.env.ALLOWED_HOSTNAME || 'scope-ai-hub.vercel.app';

const OWNER_TEMPLATE_ID = 2;      // TODO: update after creating owner notification template in Brevo
const AUTO_REPLY_TEMPLATE_ID = 1;  // Already created and active in Brevo
const CRM_LIST_ID = 3;
const OWNER_EMAIL = 'nagarajan.webdev@gmail.com'; // TODO: change back to 'info@scopeaihub.com' for production
const OWNER_NAME = 'SCOPE AI HUB';

const MAX_BODY_BYTES = 10 * 1024; // 10 KB
const EXTERNAL_TIMEOUT_MS = 10_000;
const IS_TEST = process.env.NODE_ENV === 'test';

// ─── Token Replay Cache ─────────────────────────────────────────────
const tokenCache = new Map();
const TOKEN_TTL_MS = 2 * 60 * 1000; // 2 minutes

// ─── Server-Side Adaptive Rate Limiter ──────────────────────────────
const ipMap = new Map();
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

function checkServerRateLimit(ip) {
  const now = Date.now();
  let record = ipMap.get(ip) || { attempts: [], blockedUntil: 0 };
  
  if (record.blockedUntil > now) {
    return { allowed: false, reason: 'blocked' };
  }

  // Purge older than 30 mins
  record.attempts = record.attempts.filter((ts) => now - ts < 30 * 60 * 1000);
  record.attempts.push(now);

  const attempts5m = record.attempts.filter((ts) => now - ts < 5 * 60 * 1000).length;
  const attempts10m = record.attempts.filter((ts) => now - ts < 10 * 60 * 1000).length;
  const attempts30m = record.attempts.length;

  if (attempts30m >= 15) {
    record.blockedUntil = now + 60 * 60 * 1000; // block 1 hour
    ipMap.set(ip, record);
    return { allowed: false, reason: 'blocked_1hr' };
  }

  if (attempts10m >= 8) {
    record.blockedUntil = now + 10 * 60 * 1000; // block 10 mins
    ipMap.set(ip, record);
    return { allowed: false, reason: 'blocked_10m' };
  }

  ipMap.set(ip, record);

  if (attempts5m >= 5) {
    return { allowed: true, reason: 'warn' };
  }

  return { allowed: true, reason: 'ok' };
}

function blockIpFor(ip, durationMs) {
  const record = ipMap.get(ip) || { attempts: [], blockedUntil: 0 };
  record.blockedUntil = Date.now() + durationMs;
  ipMap.set(ip, record);
}

// Automatic periodic cleanup to prevent memory leak
let lastCleanup = Date.now();
function cleanupMemoryCache() {
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
    return { success: true };
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
    hostname: data.hostname || '',
  };
}

// ─── Main Handler ───────────────────────────────────────────────────

export default async function handler(req, res) {
  const requestId = generateRequestId();
  const log = createLogger(requestId);

  res.setHeader('X-Request-ID', requestId);
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  cleanupMemoryCache();

  const clientIp =
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    'unknown';

  // 1. Method guard
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Request could not be processed' });
  }

  // 1A. Strict Origin Validation (CORS Lockdown)
  const origin = req.headers.origin;
  if (origin !== 'https://scope-ai-hub.vercel.app') {
    log.warn('Invalid Origin block', { origin });
    blockIpFor(clientIp, 10 * 60 * 1000);
    return res.status(403).json({ success: false, message: 'Request could not be processed' });
  }

  // 1B. User-Agent Filtering
  const userAgent = req.headers['user-agent'] || '';
  if (!userAgent || userAgent.length < 20 || /bot|crawl|spider/i.test(userAgent)) {
    log.warn('Suspicious User-Agent blocked', { ua: userAgent });
    blockIpFor(clientIp, 10 * 60 * 1000);
    return res.status(403).json({ success: false, message: 'Request could not be processed' });
  }

  // 1C. Referrer Validation
  const referer = req.headers.referer || '';
  if (referer && !referer.includes('scope-ai-hub.vercel.app')) {
    log.warn('Invalid Referrer blocked', { referer });
    blockIpFor(clientIp, 10 * 60 * 1000);
    return res.status(403).json({ success: false, message: 'Request could not be processed' });
  }

  // 2. Environment check
  if (!BREVO_API_KEY || !RECAPTCHA_SECRET_KEY) {
    log.error('Missing environment variables', { missing: !BREVO_API_KEY ? 'BREVO_API_KEY' : 'RECAPTCHA_SECRET_KEY' });
    return res.status(500).json({ success: false, message: 'Request could not be processed' });
  }

  try {
    // 3. Payload size guard
    const rawBody = JSON.stringify(req.body || {});
    if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) {
      log.warn('Payload too large', { bytes: Buffer.byteLength(rawBody, 'utf8') });
      return res.status(413).json({ success: false, message: 'Request could not be processed' });
    }

    const body = req.body;

    // 3B. Minimum Submission Time Validation (Anti-bot timing)
    const formLoadedAt = parseInt(body.formLoadedAt, 10);
    if (!formLoadedAt || isNaN(formLoadedAt) || (Date.now() - formLoadedAt < 3000)) {
      log.warn('Instant submission blocked', { timeToSubmitMs: Date.now() - formLoadedAt });
      blockIpFor(clientIp, 10 * 60 * 1000); // Cooldown
      return res.status(400).json({ success: false, message: 'Request could not be processed' });
    }

    // 4. Honeypot check
    // Wait intentionally to masquerade as processing, then fake success
    if (body.website) {
      log.info('Honeypot triggered — bot detected');
      blockIpFor(clientIp, 10 * 60 * 1000); // Cooldown
      return res.status(200).json({ success: true, message: 'Enquiry submitted successfully.' });
    }

    // 5. Input sanitization
    const firstName = stripHtml(body.user_name || '').slice(0, 100);
    const email = stripHtml(body.user_email || '').toLowerCase().slice(0, 254);
    const phone = normalizePhone(body.user_phone || '');
    const location = stripHtml(body.user_location || '').slice(0, 200);
    const qualification = stripHtml(body.qualification || '').slice(0, 100);
const inquiryType = stripHtml(body.inquiry_type || '').slice(0, 200);
const programInterest = stripHtml(body.program_interest || '').slice(0, 200);

// Normalize final course value
const courseInterest =
  inquiryType === 'Enroll in an AI Program'
    ? (programInterest || 'Program Not Selected')
    : (inquiryType || 'General Inquiry');    const message = stripHtml(body.message || '').slice(0, 1000);
    const recaptchaToken = body.recaptchaToken || '';

    if (recaptchaToken) {
      const tokenHash = crypto.createHash('sha256').update(recaptchaToken).digest('hex');
      if (tokenCache.has(tokenHash)) {
        log.warn('reCAPTCHA token replay detected', { hash: tokenHash.slice(0, 8) });
        blockIpFor(clientIp, 10 * 60 * 1000); // Cooldown
        return res.status(403).json({ success: false, message: 'Request could not be processed' });
      }
      tokenCache.set(tokenHash, Date.now());
    }

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

    // 7. Server-side adaptive rate limiting
    const rateLimit = checkServerRateLimit(clientIp);
    if (!rateLimit.allowed) {
      log.warn('Rate limit block enforced', { ip: clientIp.slice(0, 8) + '***', reason: rateLimit.reason });
      return res.status(429).json({ success: false, message: 'Too many requests. Please wait and try again later.' });
    }
    if (rateLimit.reason === 'warn') {
      log.warn('Rate limit warning triggered (5 attempts/5min)', { ip: clientIp.slice(0, 8) + '***' });
    }

    // 8. reCAPTCHA verification
    let captcha;
    try {
      captcha = await verifyRecaptcha(recaptchaToken, clientIp);
    } catch (err) {
      log.error('reCAPTCHA verification failed', { error: err.message });
      return res.status(403).json({ success: false, message: 'Request could not be processed' });
    }

    if (!captcha.success) {
      log.warn('reCAPTCHA verification failed');
      return res.status(403).json({ success: false, message: 'Request could not be processed' });
    }

    // 8B. Hostname validation
    if (!IS_TEST && captcha.hostname !== ALLOWED_HOSTNAME) {
      log.warn('reCAPTCHA hostname mismatch', { expected: ALLOWED_HOSTNAME, received: captcha.hostname });
      return res.status(403).json({ success: false, message: 'Request could not be processed' });
    }

    log.info('Enquiry validated', { course: courseInterest, hostname: captcha.hostname });

    // 9. Template parameters (safe — no PII in logs)
const templateParams = {
  FIRSTNAME: firstName,
  EMAIL: email,
  PHONE: phone || 'Not provided',
  LOCATION: location || 'Not provided',
  QUALIFICATION: qualification || 'Not provided',

  INQUIRY_TYPE: inquiryType || 'General Inquiry',
  PROGRAM_INTEREST: programInterest || 'N/A',

  COURSE: courseInterest, // keep for backward compatibility if needed
  MESSAGE: message,

  current_year: new Date().getFullYear(),
};
    // 10. Save to Brevo CRM (non-critical)
    try {
      await upsertBrevoContact(email, {
        FIRSTNAME: firstName,
        PHONE: phone,
        LOCATION: location,
        QUALIFICATION: qualification,
        INQUIRY_TYPE: inquiryType || 'General Inquiry',
PROGRAM_INTEREST: programInterest || 'N/A',
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
    return res.status(500).json({ success: false, message: 'Request could not be processed' });
  }
}
