import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configuração principal do sistema de build Vite
export default defineConfig({
  // Plugin para suporte a React
  plugins: [react()],
  // Configurações do servidor de desenvolvimento
  server: {
    host: true, // Expõe o servidor na rede local
    port: 5173, // Porta padrão do Vite
  },
})
