import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App_event from './App_event.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App_event />
  </StrictMode>,
)
