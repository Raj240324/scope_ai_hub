/**
 * Utility to track custom events in Google Analytics 4
 * @param {string} eventName - The GA4 standard or custom event name (e.g. 'generate_lead', 'begin_checkout')
 * @param {object} eventParams - Additional data to send with the event
 */
export const trackEvent = (eventName, eventParams = {}) => {
  try {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, eventParams);
    }
  } catch (error) {
    console.error('Google Analytics tracking failed:', error);
  }
};
