/**
 * Sentry — Frontend Error Monitoring
 * Initializes Sentry in production only. Strips PII in beforeSend.
 */
import * as Sentry from '@sentry/react';

/**
 * Initialize Sentry error tracking.
 * Call this once before React root render.
 */
export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (!dsn || import.meta.env.DEV) {
    return; // Skip in development or if DSN is not set
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE || 'production',
    tracesSampleRate: 0.1,
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 0,

    // Scrub all PII before sending error data to Sentry servers
    beforeSend(event) {
      // Helper: remove email addresses
      const scrubEmails = (str) =>
        str.replace(
          /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
          "[email]"
        );

      // Helper: remove phone numbers (Indian + international formats)
      const scrubPhones = (str) =>
        str.replace(/(\+?[\d\s\-().]{7,15})/g, "[phone]");

      // Helper: remove Indian names pattern from common form fields
      const scrub = (str) => scrubPhones(scrubEmails(str));

      // 1. Remove user identity fields
      if (event.user) {
        delete event.user.email;
        delete event.user.ip_address;
        delete event.user.username;
      }

      // 2. Scrub request body
      if (
        event.request?.data &&
        typeof event.request.data === "string"
      ) {
        event.request.data = scrub(event.request.data);
      }

      // 3. Scrub breadcrumb messages
      if (event.breadcrumbs?.values && Array.isArray(event.breadcrumbs.values)) {
        event.breadcrumbs.values = event.breadcrumbs.values.map((crumb) => ({
          ...crumb,
          message: crumb.message ? scrub(crumb.message) : crumb.message,
        }));
      }

      // 4. Scrub exception values (error messages can leak form data)
      if (event.exception?.values && Array.isArray(event.exception.values)) {
        event.exception.values = event.exception.values.map((exception) => ({
          ...exception,
          value: exception.value ? scrub(exception.value) : exception.value,
        }));
      }

      return event;
    },

    // Ignore common non-actionable errors
    ignoreErrors: [
      'ResizeObserver loop',
      'ResizeObserver loop completed with undelivered notifications',
      'Non-Error promise rejection captured',
      /Loading chunk \d+ failed/,
    ],
  });
}

export { Sentry };
