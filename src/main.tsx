import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SaaSMakerFeedback } from './components/saasmaker-feedback'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <SaaSMakerFeedback />
  </StrictMode>,
)
