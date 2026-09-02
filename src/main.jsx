import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from "react-ga4";
import './index.css'
import App from './App.jsx'
import './i18n'
import { HelmetProvider } from 'react-helmet-async'

ReactGA.initialize("G-SLWGJQQ72C");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
)
