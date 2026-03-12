import { startHeroPreload } from './utils/heroFrameCache';
startHeroPreload(); // decode frames before React boots

import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async';
import { initSentry } from './utils/sentry';
import './index.css'
import App from './App.jsx'

// Initialize Sentry before rendering (production only)
initSentry();

const rootElement = document.getElementById('root');

const app = (
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>
);

// If react-snap has pre-rendered HTML, hydrate instead of full render
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}