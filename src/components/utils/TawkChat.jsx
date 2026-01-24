import { useEffect } from 'react';

const TawkChat = () => {
  useEffect(() => {
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      const propertyId = import.meta.env.VITE_TAWK_PROPERTY_ID;
      const widgetId = import.meta.env.VITE_TAWK_WIDGET_ID;
      
      if (!propertyId || !widgetId) {
        console.warn("Tawk.to Property ID or Widget ID missing in env variables");
        return;
      }

      s1.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  return null;
};

export default TawkChat;
