/**
 * reCAPTCHA v3 — Client-side token acquisition.
 * Dynamically loads the reCAPTCHA script on first use.
 * The site key is public (safe in frontend).
 * The secret key lives ONLY on the server.
 */
const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
const TIMEOUT_MS = 10_000;
const SCRIPT_ID = 'recaptcha-v3-script';

let loadPromise = null;

/**
 * Dynamically inject the reCAPTCHA v3 script if not already loaded.
 * Returns a promise that resolves when grecaptcha is ready.
 */
function loadRecaptchaScript() {
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    // Already loaded
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => resolve());
      return;
    }

    // Inject script
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      if (window.grecaptcha) {
        window.grecaptcha.ready(() => resolve());
      } else {
        reject(new Error('reCAPTCHA failed to initialize.'));
      }
    };

    script.onerror = () => {
      loadPromise = null; // allow retry
      reject(new Error('Failed to load reCAPTCHA. Please check your connection.'));
    };

    document.head.appendChild(script);
  });

  return loadPromise;
}

/**
 * Execute reCAPTCHA v3 for a given action and return a token.
 * @param {string} action — e.g. "enquiry", "contact"
 * @returns {Promise<string>} reCAPTCHA token
 */
export async function executeRecaptcha(action = 'enquiry') {
  if (!SITE_KEY) {
    throw new Error('reCAPTCHA is not configured.');
  }

  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('reCAPTCHA verification timed out. Please refresh and try again.'));
    }, TIMEOUT_MS);

    loadRecaptchaScript()
      .then(() => {
        window.grecaptcha
          .execute(SITE_KEY, { action })
          .then((token) => {
            clearTimeout(timer);
            if (!token) {
              reject(new Error('reCAPTCHA returned an empty token.'));
            } else {
              resolve(token);
            }
          })
          .catch(() => {
            clearTimeout(timer);
            reject(new Error('reCAPTCHA verification failed. Please try again.'));
          });
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}
