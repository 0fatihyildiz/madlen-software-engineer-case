import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/index.tsx'
import './assets/index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Home />
    </StrictMode>,
)
