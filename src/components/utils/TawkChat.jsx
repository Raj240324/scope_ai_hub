import { useEffect } from 'react';

const TawkChat = () => {
  useEffect(() => {
    // ─── OVERRIDE CONSOLE TO SUPPRESS NOISY TAWK.TO WEBSOCKET ERRORS ───
    // Tawk.to aggressively logs WebSocket drops (especially in dev environments or
    // with ad-blockers). This intercepts and hides those specific errors.
    const originalConsoleError = console.error;
    const originalConsoleLog = console.log;

    console.error = function (...args) {
      const msg = args.map(String).join(" ");
      if (
        msg.includes("twk-chunk-vendors") ||
        msg.includes("Tawk/Logger") ||
        msg.includes("wss://vsa66.tawk.to") ||
        msg.includes("twk-chunk-common")
      ) {
        return; // Swallow Tawk's internal errors
      }
      originalConsoleError.apply(console, args);
    };

    console.log = function (...args) {
      const msg = args.map(String).join(" ");
      if (msg.includes("[Tawk/Logger]")) {
        return; // Swallow Tawk's internal logging
      }
      originalConsoleLog.apply(console, args);
    };

    // ─── LOAD TAWK.TO SCRIPT ──────────────────────────────────────────
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      const propertyId = import.meta.env.VITE_TAWK_PROPERTY_ID;
      const widgetId = import.meta.env.VITE_TAWK_WIDGET_ID;

      if (!propertyId || !widgetId) {
        // Use original to bypass our own filter conceptually, though it's a warn anyway
        console.warn("Tawk.to Property ID or Widget ID missing in env variables");
        return;
      }

      s1.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();

    // Cleanup interceptors on unmount (optional, but good practice)
    return () => {
      console.error = originalConsoleError;
      console.log = originalConsoleLog;
    };
  }, []);

  return null;
};

export default TawkChat;
