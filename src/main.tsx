import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import App from './App'
import './styles/index.css'
import { useEffect } from 'react'
import { initAnalytics } from './services/analytics'

const root = createRoot(document.getElementById('root')!)

function AppRoot() {
  useEffect(() => {
    initAnalytics()
  }, [])
  return (
    <HelmetProvider>
      <BrowserRouter>
        <App />
        <Toaster position="top-right" />
      </BrowserRouter>
    </HelmetProvider>
  )
}

root.render(
  <React.StrictMode>
    <AppRoot />
  </React.StrictMode>
)
