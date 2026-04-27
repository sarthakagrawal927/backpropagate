import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SaaSMakerFeedback } from './components/saasmaker-feedback'
import { AnalyticsProvider } from './components/posthog-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AnalyticsProvider>
      <App />
      <SaaSMakerFeedback />
    </AnalyticsProvider>
  </StrictMode>,
)
