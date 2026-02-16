import { useMockAgent } from './use-mock-agent';
import { useRealAgent } from './use-real-agent';

/**
 * Hook híbrido que permite alternar entre agente mock e real
 * 
 * Para usar o agente real da OpenAI:
 * 1. Configure a variável VITE_OPENAI_API_KEY no arquivo .env
 * 2. Inicie o servidor backend: npm run server
 * 3. O hook automaticamente detectará e usará o agente real
 * 
 * Se não houver API key configurada, usa o mock automaticamente
 */
/**
 * useAgent: O cérebro híbrido do sistema.
 * Este hook decide automaticamente se deve usar o agente real (OpenRouter/OpenAI) 
 * ou o agente simulado (Mock) com base na presença de uma chave de API válida.
 */
export function useAgent() {
    // 1. Verificação: A chave deve existir, não ser um placeholder e começar com 'sk-'
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    const hasApiKey = apiKey &&
        apiKey !== 'your-api-key-here' &&
        apiKey !== 'your-openrouter-key-here' &&
        apiKey !== '' &&
        apiKey.startsWith('sk-');

    // 2. Override: Permite forçar o modo simulado (Mock) via variável de ambiente VITE_FORCE_MOCK
    const forceMock = String(import.meta.env.VITE_FORCE_MOCK) === 'true';

    // 3. Seleção do Hook: 
    const useReal = hasApiKey && !forceMock;

    // Log para depuração fácil no console do navegador
    if (import.meta.env.DEV) {
        console.log(`🤖 Modo de IA: ${useReal ? 'REAL (API)' : 'SIMULADO (Mock)'}`);
    }

    return useReal ? useRealAgent() : useMockAgent();
}

// Re-exporta a interface Message
export type { Message } from './use-mock-agent';
