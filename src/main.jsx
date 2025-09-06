import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './GameStyles/app.css'
import App from './App.jsx'
import '../firebase-config.js' // Import and initialize Firebase

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
