import { useChat } from 'ai/react';

// Interface que define a estrutura de uma mensagem no chat
export interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system' | 'function' | 'data' | 'tool';
    content: string;
    toolInvocations?: Array<{
        toolName: string;
        toolCallId: string;
        args: any;
        result?: any;
    }>;
}

/**
 * Hook que integra com a API real (OpenRouter/OpenAI) usando Vercel AI SDK
 */
export function useRealAgent() {
    // Busca o endereço do servidor no .env ou usa o padrão localhost:3001
    const apiEndpoint = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:3001';

    // O hook useChat gere todo o estado das mensagens e a comunicação streaming automaticamente
    const {
        messages,
        input,
        handleInputChange,
        handleSubmit,
        isLoading,
        append,
        setInput,
    } = useChat({
        api: `${apiEndpoint}/api/chat`, // Endpoint do nosso servidor Node.js
        streamProtocol: 'text',         // Define que o servidor envia texto simples (resolve o erro de parse)
        initialMessages: [
            {
                id: '1',
                role: 'assistant',
                content: 'Olá! Sou seu assistente de energia inteligente. Posso analisar suas faturas, detectar anomalias ou sugerir melhorias de eficiência. Como posso ajudar hoje?',
            },
        ],
        onError: (error: Error) => {
            console.error('Erro na ligação ao agente real:', error);
        },
    });

    return {
        messages: messages as Message[], // Faz cast para a nossa interface local de mensagens
        append,
        isLoading,
        input,
        handleInputChange,
        handleSubmit,
        setInput,
    };
}
