import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Ponto de entrada principal da aplicação React
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Componente principal que gerencia as rotas e o estado global */}
    <App />
  </StrictMode>,
)
