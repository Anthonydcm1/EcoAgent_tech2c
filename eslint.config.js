import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

// Configuração principal do ESLint para padronização do código
export default defineConfig([
  globalIgnores(['dist']), // Ignora arquivos de build
  {
    files: ['**/*.{ts,tsx}'], // Aplica as regras a arquivos TypeScript/React
    extends: [
      js.configs.recommended, // Regras recomendadas do JavaScript
      tseslint.configs.recommended, // Regras recomendadas do TypeScript
      reactHooks.configs.flat.recommended, // Boas práticas para React Hooks
      reactRefresh.configs.vite, // Suporte a Fast Refresh no Vite
    ],
    languageOptions: {
      ecmaVersion: 2020, // Suporte a funcionalidades modernas do JS
      globals: globals.browser, // Define globais de ambiente de navegador
    },
  },
])
