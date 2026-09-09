import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import { AnalyticsProvider } from './components/posthog-provider'
import { SaaSMakerFeedback } from './components/saasmaker-feedback'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AnalyticsProvider>
      <App />
      <SaaSMakerFeedback />
    </AnalyticsProvider>
  </StrictMode>,
)
