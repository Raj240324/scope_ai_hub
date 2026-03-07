/**
 * /api/send-enquiry.js — Vercel Serverless Function
 *
 * Security-hardened enquiry handler with Supabase storage:
 *  1. POST-only, payload size guard
 *  2. Input sanitization & validation
 *  3. Server-side IP rate limiting (in-memory)
 *  4. reCAPTCHA v2 server-side verification
 *  5. Save to Supabase (primary data store)
 *  6. Brevo transactional email (owner + auto-reply)
 *  7. Brevo CRM contact upsert
 *  8. Update Supabase brevo_synced flag
 *  9. Structured JSON logging with requestId
 *
 * Environment variables (Vercel Dashboard):
 *   SUPABASE_URL             — Supabase project URL
 *   SUPABASE_SERVICE_ROLE_KEY — Supabase service role secret
 *   BREVO_API_KEY            — Brevo transactional API key
 *   RECAPTCHA_SECRET_KEY     — Google reCAPTCHA v2 secret
 *   ALLOWED_ORIGIN           — Full allowed origin (e.g. https://scopeaihub.com)
 *   ALLOWED_HOSTNAME         — Fallback hostname for origin/reCAPTCHA
 */
import crypto from 'crypto';
import { generateRequestId, createLogger } from './utils/logger.js';
import { checkServerRateLimit, blockIpFor, isTokenReplayed, cleanupMemoryCache } from './utils/rateLimiter.js';
import { verifyRecaptcha } from './utils/recaptcha.js';
import { sendBrevoEmail, upsertBrevoContact } from './utils/brevo.js';
import { stripHtml, isValidEmail, normalizePhone, getClientIp, isAllowedOrigin, isAllowedReferer, setSecurityHeaders } from './utils/sanitize.js';
import { getSupabase } from './utils/supabase.js';

// ─── Configuration ──────────────────────────────────────────────────
const ALLOWED_HOSTNAME = process.env.ALLOWED_HOSTNAME || 'scope-ai-hub.vercel.app';

const OWNER_TEMPLATE_ID = 2;
const AUTO_REPLY_TEMPLATE_ID = 1;
const CRM_LIST_ID = 3;
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
    log.error('Missing environment variables', { missing: !process.env.BREVO_API_KEY ? 'BREVO_API_KEY' : 'RECAPTCHA_SECRET_KEY' });
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
        : (inquiryType || 'General Inquiry');

    const message = stripHtml(body.message || '').slice(0, 1000);
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

    log.info('Enquiry validated', { course: courseInterest, hostname: captcha.hostname });

    // ─────────────────────────────────────────────────────────────────
    // 9. SAVE TO SUPABASE (Primary Data Store)
    // ─────────────────────────────────────────────────────────────────
    let enquiryId = null;

    try {
      const supabase = getSupabase();
      const { data, error: dbError } = await supabase
        .from('enquiries')
        .insert([
          {
            name: firstName,
            email,
            phone: phone || null,
            course: courseInterest,
            message,
            ip_address: clientIp,
            user_agent: userAgent.slice(0, 500),
            brevo_synced: false,
          },
        ])
        .select('id')
        .single();

      if (dbError) {
        log.error('Supabase insert failed', { error: dbError.message });
        // Continue — Brevo will still receive the data
      } else {
        enquiryId = data?.id;
        log.info('Enquiry saved to Supabase', { enquiryId });
      }
    } catch (err) {
      log.error('Supabase connection error', { error: err.message });
      // Non-blocking — continue to Brevo
    }

    // 10. Template parameters
    const templateParams = {
      FIRSTNAME: firstName,
      EMAIL: email,
      PHONE: phone || 'Not provided',
      LOCATION: location || 'Not provided',
      QUALIFICATION: qualification || 'Not provided',
      INQUIRY_TYPE: inquiryType || 'General Inquiry',
      PROGRAM_INTEREST: programInterest || 'N/A',
      COURSE: courseInterest,
      MESSAGE: message,
      current_year: new Date().getFullYear(),
    };

    // 11. Save to Brevo CRM (non-critical)
    try {
      await upsertBrevoContact(email, {
        FIRSTNAME: firstName,
        PHONE: phone,
        LOCATION: location,
        QUALIFICATION: qualification,
        INQUIRY_TYPE: inquiryType || 'General Inquiry',
        PROGRAM_INTEREST: programInterest || 'N/A',
        COURSE_INTEREST: courseInterest,
      }, CRM_LIST_ID);
      log.info('CRM contact upserted');
    } catch (err) {
      log.error('CRM upsert failed', { error: err.message });
    }

    // 12. Send owner notification (critical)
    let brevoSuccess = false;
    try {
      await sendBrevoEmail(OWNER_TEMPLATE_ID, OWNER_EMAIL, OWNER_NAME, templateParams);
      log.info('Owner notification sent');
      brevoSuccess = true;
    } catch (err) {
      log.error('Owner email failed', { error: err.message });
      // If Supabase saved the data, we can still succeed
      if (!enquiryId) {
        return res.status(500).json({ success: false, message: 'Failed to submit your enquiry. Please try again or call us directly.' });
      }
    }

    // 13. Send auto-reply (non-critical)
    try {
      await sendBrevoEmail(AUTO_REPLY_TEMPLATE_ID, email, firstName, templateParams);
      log.info('Auto-reply sent');
    } catch (err) {
      log.error('Auto-reply failed', { error: err.message });
    }

    // 14. Update Supabase brevo_synced flag
    if (enquiryId && brevoSuccess) {
      try {
        const supabase = getSupabase();
        await supabase
          .from('enquiries')
          .update({ brevo_synced: true })
          .eq('id', enquiryId);
        log.info('Supabase brevo_synced updated', { enquiryId });
      } catch (err) {
        log.error('Supabase sync flag update failed', { error: err.message });
      }
    }

    // 15. Success
    log.info('Enquiry completed successfully', { enquiryId, brevoSuccess });
    return res.status(200).json({ success: true, message: 'Enquiry submitted successfully.' });
  } catch (err) {
    log.error('Unexpected error', { error: err.message });
    return res.status(500).json({ success: false, message: 'Request could not be processed' });
  }
}
