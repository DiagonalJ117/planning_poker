import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CableProvider } from './context/cableContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CableProvider>
      <App />
    </CableProvider>
  </React.StrictMode>,
)
