# Tawk.to Chat Widget Setup for SCOPE AI HUB

This document contains the specific integration details and credentials for the Tawk.to live chat widget currently running on scopeaihub.com.

## Widget Details

- **Property ID:** `[YOUR_PROPERTY_ID]`
- **Widget ID:** `[YOUR_WIDGET_ID]`

These values are securely configured through local environment variables and Vercel production variables.

---

## Environment Variable Configuration (`.env`)

To run the widget locally during development, add the following to your `.env` file:

```env
VITE_TAWK_PROPERTY_ID=your_property_id_here
VITE_TAWK_WIDGET_ID=your_widget_id_here
```

---

## Raw Embed Code (Reference)

This is the original embed code provided by the Tawk.to dashboard. 

*(Note: We do not use this raw script directly in `index.html`. We inject it dynamically via the `TawkChat.jsx` React component instead so we can control environmental loading).*

```html
<!--Start of Tawk.to Script-->
<script type="text/javascript">
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();
</script>
<!--End of Tawk.to Script-->
```

---

## Codebase Implementation

The widget is implemented in the following path:
`src/components/utils/TawkChat.jsx`

It is then injected at the global layout level inside:
`src/components/layout/Layout.jsx`

**Positioning:** 
It renders globally on the bottom right of the screen. We have positioned the existing `WhatsAppButton` above and to the left of it (using `bottom-32 right-6`) to prevent visual overlap between the two chat floating actions.
