/**
 * reCAPTCHA v2 Server-Side Verification
 *
 * Shared across all Vercel serverless endpoints.
 */

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const EXTERNAL_TIMEOUT_MS = 10_000;
const IS_TEST = process.env.NODE_ENV === 'test';

/**
 * Verify a reCAPTCHA token with Google's API.
 * @param {string} token
 * @param {string} ip - client IP for additional security
 * @param {string} allowedHostname - expected hostname
 * @returns {Promise<{ success: boolean, hostname: string }>}
 */
export async function verifyRecaptcha(token, ip, allowedHostname) {
  if (IS_TEST) {
    return { success: true, hostname: allowedHostname };
  }

  if (!RECAPTCHA_SECRET_KEY) {
    throw new Error('Missing RECAPTCHA_SECRET_KEY');
  }

  const params = new URLSearchParams({
    secret: RECAPTCHA_SECRET_KEY,
    response: token,
    remoteip: ip || '',
  });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), EXTERNAL_TIMEOUT_MS);

  try {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!res.ok) {
      throw new Error('reCAPTCHA verification service unavailable');
    }

    const data = await res.json();
    return {
      success: data.success === true,
      hostname: data.hostname || '',
    };
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}
