/**
 * Structured Logger for Vercel Serverless Functions
 * Outputs JSON-formatted logs with requestId for traceability.
 * Never logs PII (phone numbers, message content, full names).
 */

/**
 * Generate a short unique request ID.
 * @returns {string} 12-char hex ID
 */
export function generateRequestId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 8);
  return `${timestamp}-${random}`;
}

/**
 * Create a scoped logger for a single request.
 * @param {string} requestId
 * @returns {{ info: Function, warn: Function, error: Function }}
 */
export function createLogger(requestId) {
  const log = (level, message, meta = {}) => {
    const entry = {
      level,
      message,
      requestId,
      timestamp: new Date().toISOString(),
      ...meta,
    };

    if (level === 'error') {
      console.error(JSON.stringify(entry));
    } else if (level === 'warn') {
      console.warn(JSON.stringify(entry));
    } else {
      console.log(JSON.stringify(entry));
    }
  };

  return {
    info: (message, meta) => log('info', message, meta),
    warn: (message, meta) => log('warn', message, meta),
    error: (message, meta) => log('error', message, meta),
  };
}
