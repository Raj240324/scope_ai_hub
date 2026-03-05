/**
 * Brevo (Sendinblue) API Utilities
 *
 * Shared transactional email and CRM contact functions.
 * Uses the BREVO_API_KEY environment variable (server-side only).
 */

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const EXTERNAL_TIMEOUT_MS = 10_000;

/**
 * Fetch with AbortController timeout.
 * @param {string} url
 * @param {RequestInit} options
 * @param {number} [timeoutMs]
 * @returns {Promise<Response>}
 */
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

/**
 * Send a transactional email via Brevo template.
 * @param {number} templateId
 * @param {string} toEmail
 * @param {string} toName
 * @param {Object} params - template variables
 * @returns {Promise<boolean>}
 */
export async function sendBrevoEmail(templateId, toEmail, toName, params) {
  if (!BREVO_API_KEY) {
    throw new Error('Missing BREVO_API_KEY');
  }

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

/**
 * Upsert a contact into Brevo CRM.
 * @param {string} email
 * @param {Object} attributes - CRM contact attributes
 * @param {number} listId - Brevo list ID
 * @returns {Promise<boolean>}
 */
export async function upsertBrevoContact(email, attributes, listId) {
  if (!BREVO_API_KEY) {
    throw new Error('Missing BREVO_API_KEY');
  }

  const body = {
    email,
    attributes,
    listIds: [listId],
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
