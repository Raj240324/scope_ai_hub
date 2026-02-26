/**
 * Enquiry Service — sends form data to the secure Vercel serverless proxy.
 * No API keys are used or exposed here.
 */
import { handleApiError, normalizeError } from '../utils/apiErrorHandler';

const ENDPOINT = '/api/send-enquiry';
const TIMEOUT_MS = 15_000;

/**
 * Submit an enquiry to the serverless function.
 * @param {Object} payload — form data + recaptchaToken
 * @returns {Promise<{success: boolean, message: string}>}
 */
export async function submitEnquiry(payload) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timer);

    if (!response.ok) {
      const message = await handleApiError(response);
      return { success: false, message };
    }

    const data = await response.json();
    return {
      success: true,
      message: data?.message || 'Your enquiry has been submitted successfully!',
    };
  } catch (error) {
    clearTimeout(timer);
    return {
      success: false,
      message: normalizeError(error),
    };
  }
}
