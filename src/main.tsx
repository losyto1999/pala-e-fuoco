import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './pizzeria.css'
import './i18n'
import './portfolio/fromPortfolio'
import App from './App.tsx'

// Su GitHub Pages il sito vive in un sottopercorso (`/pala-e-fuoco/`): il router lo riceve da Vite.
// Senza la barra finale, così funziona anche `/pala-e-fuoco` oltre a `/pala-e-fuoco/`.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '')

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter basename={basename}>
            <App />
        </BrowserRouter>
    </StrictMode>,
)
