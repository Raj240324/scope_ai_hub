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

    // Strip PII from events before sending
    beforeSend(event) {
      // Remove request body (form data)
      if (event.request) {
        delete event.request.data;
        delete event.request.body;
      }

      // Remove breadcrumb data that might contain form input
      if (event.breadcrumbs) {
        event.breadcrumbs = event.breadcrumbs.map((b) => {
          if (b.category === 'ui.input') {
            delete b.message;
          }
          return b;
        });
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
