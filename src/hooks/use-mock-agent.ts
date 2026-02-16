
import { useState, useCallback } from 'react';

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

// Hook que simula o comportamento de um agente de IA (Mock)
export function useMockAgent() {
    // Estado que armazena o histórico de mensagens
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: 'Olá! Sou seu assistente de energia inteligente. Posso analisar suas faturas, detectar anomalias ou sugerir melhorias de eficiência. Como posso ajudar hoje?',
        },
    ]);
    // Estado que indica se o agente está processando uma resposta
    const [isLoading, setIsLoading] = useState(false);

    const append = useCallback(async (message: { role: 'user'; content: string }) => {
        const userMsg: Message = {
            id: Math.random().toString(36).substring(7),
            role: 'user',
            content: message.content,
        };

        setMessages((prev) => [...prev, userMsg]);
        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            setMessages((prev) => {
                let responseContent = "Desculpe, não entendi. Pode reformular? Tente comandos como 'analisar', 'custos' ou 'ajuda'.";
                const lowerContent = message.content.toLowerCase();

                // Find the last assistant message in the LATEST state
                const lastAssistantMsg = [...prev].reverse().find(m => m.role === 'assistant')?.content || "";

                // Affirmations (Contextual)
                const isAffirmation = lowerContent === 'sim' || lowerContent === 'claro' || lowerContent === 'pode ser' || lowerContent === 'gostaria' || lowerContent.includes('com certeza');

                if (isAffirmation && lastAssistantMsg.includes('desagregação por setor')) {
                    responseContent = "Com certeza! Aqui está a desagregação por setor:\n\n- **Iluminação**: 15% (€ 51,30)\n- **Ar Condicionado**: 45% (€ 153,90)\n- **Maquinário**: 30% (€ 102,60)\n- **Outros**: 10% (€ 34,20)";
                } else if (lowerContent.includes('analis') || lowerContent.includes('relatório') || lowerContent.includes('verific')) {
                    responseContent = "Estou analisando seus dados de consumo recente... \n\nDetectei um pico de consumo no dia 15 (terça-feira). Isso está 20% acima da sua média normal. Gostaria de ver os detalhes desse pico?";
                } else if (isAffirmation && lastAssistantMsg.includes('detalhes desse pico')) {
                    responseContent = "O pico ocorreu às 19:30, provavelmente coincidindo com o início do turno de limpeza. Recomendo verificar se todos os equipamentos de climatização estão sendo desligados corretamente antes desse horário.";
                } else if (lowerContent.includes('ajuda') || lowerContent.includes('olá') || lowerContent.includes('oi') || lowerContent.includes('bom dia')) {
                    responseContent = "Olá! Eu sou o EcoAgent. Você pode me pedir para analisar seus relatórios, verificar tendências de custo ou sugerir formas de economizar energia.";
                } else if (lowerContent.includes('preço') || lowerContent.includes('custo') || lowerContent.includes('fatura') || lowerContent.includes('conta')) {
                    responseContent = "Seu custo estimado para este mês é de € 342,00. Gostaria de ver uma desagregação por setor?";
                } else if (lowerContent.includes('economizar') || lowerContent.includes('eficiência') || lowerContent.includes('dica')) {
                    responseContent = "Para economizar, recomendo: \n1. Ajustar o termostato para 23°C.\n2. Trocar lâmpadas fluorescentes por LED.\n3. Instalar sensores de presença nos corredores.";
                } else if (lowerContent.includes('obrigado') || lowerContent.includes('valeu') || lowerContent.includes('obrigada')) {
                    responseContent = "De nada! Estou aqui para ajudar você a economizar energia. Se precisar de mais alguma coisa, é só chamar.";
                }

                const assistantMsg: Message = {
                    id: Math.random().toString(36).substring(7),
                    role: 'assistant',
                    content: responseContent,
                };
                return [...prev, assistantMsg];
            });
            setIsLoading(false);
        }, 1200);
    }, []);

    return {
        messages,
        append,
        isLoading,
        input: '',
        handleInputChange: () => { },
        handleSubmit: () => { },
        setInput: () => { }
    };
}
