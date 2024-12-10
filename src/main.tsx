import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { FeaturesProvider } from './context/FeaturesProvider.tsx'

createRoot(document.getElementById('root') as HTMLElement).render(
  <FeaturesProvider>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </FeaturesProvider>
)
