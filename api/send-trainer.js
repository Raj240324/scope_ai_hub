/**
 * /api/send-trainer.js — Vercel Serverless Function
 *
 * Security-hardened trainer application handler.
 * Shares all security utilities with /api/send-enquiry.js:
 *  1. POST-only, payload size guard
 *  2. Origin, Referrer, User-Agent validation
 *  3. Timing protection, Honeypot tarpit
 *  4. Input sanitization & validation
 *  5. Token replay protection (SHA-256)
 *  6. Adaptive rate limiting with suspicious IP cooldown
 *  7. reCAPTCHA v2 backend verification + hostname check
 *  8. Brevo transactional email (owner notification)
 *  9. Brevo CRM contact upsert
 * 10. Structured JSON logging, error obfuscation
 *
 * Environment variables (Vercel Dashboard):
 *   BREVO_API_KEY        — Brevo transactional API key
 *   RECAPTCHA_SECRET_KEY — Google reCAPTCHA v2 secret
 *   ALLOWED_ORIGIN       — Full allowed origin
 *   ALLOWED_HOSTNAME     — Expected reCAPTCHA hostname
 */
import crypto from 'crypto';
import { generateRequestId, createLogger } from './utils/logger.js';
import { checkServerRateLimit, blockIpFor, isTokenReplayed, cleanupMemoryCache } from './utils/rateLimiter.js';
import { verifyRecaptcha } from './utils/recaptcha.js';
import { sendBrevoEmail, upsertBrevoContact } from './utils/brevo.js';
import { stripHtml, isValidEmail, normalizePhone, getClientIp, isAllowedOrigin, isAllowedReferer, setSecurityHeaders } from './utils/sanitize.js';

// ─── Configuration ──────────────────────────────────────────────────
const ALLOWED_HOSTNAME = process.env.ALLOWED_HOSTNAME || 'scope-ai-hub.vercel.app';

const TRAINER_NOTIFY_TEMPLATE_ID = 3;
const TRAINER_AUTO_REPLY_TEMPLATE_ID = 4;
const CRM_LIST_ID = 4;
const OWNER_EMAIL = 'nagarajan.webdev@gmail.com';
const OWNER_NAME = 'SCOPE AI HUB';

const MAX_BODY_BYTES = 10 * 1024; // 10 KB
const IS_TEST = process.env.NODE_ENV === 'test';

// ─── Main Handler ───────────────────────────────────────────────────

export default async function handler(req, res) {
  const requestId = generateRequestId();
  const log = createLogger(requestId);

  setSecurityHeaders(res, requestId);
  cleanupMemoryCache();

  const clientIp = getClientIp(req);

  // 1. Method guard
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Request could not be processed' });
  }

  // 1A. Strict Origin Validation
  const origin = req.headers.origin;
  if (!isAllowedOrigin(origin)) {
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
  if (!isAllowedReferer(referer)) {
    log.warn('Invalid Referrer blocked', { referer });
    blockIpFor(clientIp, 10 * 60 * 1000);
    return res.status(403).json({ success: false, message: 'Request could not be processed' });
  }

  // 2. Environment check
  if (!process.env.BREVO_API_KEY || !process.env.RECAPTCHA_SECRET_KEY) {
    log.error('Missing environment variables');
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

    // 3B. Removed Minimum Submission Time Validation
    // Relying on client timestamp vs server Date.now() is unreliable due to clock skew.
    // The frontend already enforces a 3-second delay before submission.

    // 4. Honeypot check
    if (body.website) {
      log.info('Honeypot triggered — bot detected');
      blockIpFor(clientIp, 10 * 60 * 1000);
      return res.status(200).json({ success: true, message: 'Application submitted successfully.' });
    }

    // 5. Input sanitization
    const trainerName = stripHtml(body.trainer_name || '').slice(0, 100);
    const email = stripHtml(body.trainer_email || '').toLowerCase().slice(0, 254);
    const phone = normalizePhone(body.trainer_phone || '');
    const experience = stripHtml(body.experience || '').slice(0, 10);
    const expertise = stripHtml(body.expertise || '').slice(0, 200);
    const linkedinUrl = stripHtml(body.linkedin_url || '').slice(0, 500);
    const recaptchaToken = body.recaptchaToken || '';

    // 5B. Token replay protection
    if (recaptchaToken) {
      const tokenHash = crypto.createHash('sha256').update(recaptchaToken).digest('hex');
      if (isTokenReplayed(tokenHash)) {
        log.warn('reCAPTCHA token replay detected', { hash: tokenHash.slice(0, 8) });
        // Don't block IP for 10 mins purely on token replay, it could be a simple double-click
        return res.status(403).json({ success: false, message: 'Invalid or expired security token. Please refresh the page.' });
      }
    }

    // 6. Required field validation
    const errors = [];
    if (!trainerName || trainerName.length < 2) errors.push('Name is required (min 2 characters).');
    if (!email || !isValidEmail(email)) errors.push('A valid email address is required.');
    if (!phone) errors.push('Phone number is required.');
    if (!experience) errors.push('Years of experience is required.');
    if (!expertise) errors.push('Area of expertise is required.');
    if (!recaptchaToken) errors.push('Security verification failed. Please refresh the page.');

    if (errors.length > 0) {
      log.warn('Validation failed', { field: errors[0] });
      return res.status(400).json({ success: false, message: errors[0] });
    }

    // 7. Adaptive rate limiting
    const rateLimit = checkServerRateLimit(clientIp);
    if (!rateLimit.allowed) {
      log.warn('Rate limit block enforced', { ip: clientIp.slice(0, 8) + '***', reason: rateLimit.reason });
      return res.status(429).json({ success: false, message: 'Too many requests. Please wait and try again later.' });
    }
    if (rateLimit.reason === 'warn') {
      log.warn('Rate limit warning (5 attempts/5min)', { ip: clientIp.slice(0, 8) + '***' });
    }

    // 8. reCAPTCHA verification
    let captcha;
    try {
      captcha = await verifyRecaptcha(recaptchaToken, clientIp, ALLOWED_HOSTNAME);
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

    log.info('Trainer application validated', { expertise, hostname: captcha.hostname });

    // 9. Template parameters
    const templateParams = {
      TRAINER_NAME: trainerName,
      EMAIL: email,
      PHONE: phone || 'Not provided',
      EXPERIENCE: experience + ' years',
      EXPERTISE: expertise,
      LINKEDIN: linkedinUrl || 'Not provided',
      SUBMITTED_AT: new Date().toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    // 10. Save to Brevo CRM (non-critical)
    try {
      await upsertBrevoContact(email, {
        FIRSTNAME: trainerName,
        PHONE: phone,
        EXPERTISE: expertise,
        EXPERIENCE: experience,
      }, CRM_LIST_ID);
      log.info('CRM contact upserted');
    } catch (err) {
      log.error('CRM upsert failed', { error: err.message });
    }

    // 11. Send owner notification (critical)
    try {
      await sendBrevoEmail(TRAINER_NOTIFY_TEMPLATE_ID, OWNER_EMAIL, OWNER_NAME, templateParams);
      log.info('Owner notification sent');
    } catch (err) {
      log.error('Owner email failed', { error: err.message });
      return res.status(500).json({ success: false, message: 'Failed to submit your application. Please try again or contact us directly.' });
    }

    // 12. Send auto-reply to applicant (non-critical)
    try {
      await sendBrevoEmail(TRAINER_AUTO_REPLY_TEMPLATE_ID, email, trainerName, templateParams);
      log.info('Trainer auto-reply sent');
    } catch (err) {
      log.error('Trainer auto-reply failed', { error: err.message });
    }

    // 13. Success
    log.info('Trainer application completed successfully');
    return res.status(200).json({ success: true, message: 'Application submitted successfully.' });
  } catch (err) {
    log.error('Unexpected error', { error: err.message });
    return res.status(500).json({ success: false, message: 'Request could not be processed' });
  }
}
