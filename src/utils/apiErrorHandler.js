/**
 * Normalize API errors into safe, user-friendly messages.
 * Internal server details are never exposed.
 */

const STATUS_MESSAGES = {
  400: 'Please check your input and try again.',
  401: 'Unauthorized request.',
  403: 'This request was blocked for security reasons.',
  404: 'The service is temporarily unavailable.',
  405: 'Invalid request method.',
  413: 'Your message is too long. Please shorten it.',
  422: 'Some fields are invalid. Please review and try again.',
  429: 'Too many requests. Please wait a moment and try again.',
  500: 'Something went wrong on our end. Please try again later.',
  502: 'Our servers are temporarily unavailable. Please try again shortly.',
  503: 'Service temporarily unavailable. Please try again later.',
};

/**
 * Extract a user-friendly error message from a fetch Response.
 * @param {Response} response — the fetch Response object
 * @returns {Promise<string>} safe error message
 */
export async function handleApiError(response) {
  // Try to parse the server's structured error
  try {
    const body = await response.json();
    if (body?.message && typeof body.message === 'string' && body.message.length < 200) {
      return body.message;
    }
  } catch {
    // Response is not JSON — fall through to generic message
  }

  return STATUS_MESSAGES[response.status] || STATUS_MESSAGES[500];
}

/**
 * Normalize any thrown error (network, timeout, etc.) into a user-friendly string.
 * @param {Error} error
 * @returns {string}
 */
export function normalizeError(error) {
  if (error?.name === 'AbortError') {
    return 'The request timed out. Please check your connection and try again.';
  }
  if (error?.message) {
    return error.message;
  }
  return 'An unexpected error occurred. Please try again.';
}
