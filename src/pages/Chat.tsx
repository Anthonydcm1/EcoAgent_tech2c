import { useState } from 'react';
import { Send, Bot, User, Trash2, Sparkles } from 'lucide-react';
import { useAgent, type Message } from '../hooks/use-agent';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// Página do Assistente Virtual (IA)
export function Chat() {
    // Hook personalizado para gerenciar as mensagens do agente (alterna automaticamente entre mock e real)
    const { messages, append, isLoading } = useAgent();
    // Estado local para o texto digitado pelo usuário
    const [input, setInput] = useState('');
    const [error, setError] = useState<string | null>(null);

    // Função que processa o envio de mensagens
    const handleSubmit = async (e?: React.FormEvent, customInput?: string) => {
        if (e) e.preventDefault();
        const text = customInput || input;
        if (!text.trim()) return;

        setError(null);
        try {
            await append({ role: 'user', content: text });
            setInput('');
        } catch (err) {
            console.error('Chat error:', err);
            setError('Ops! Ocorreu um erro ao enviar sua mensagem. Verifique se o servidor está rodando ou sua cota da OpenAI.');
        }
    };

    const clearChat = () => {
        // Como o useChat não exporta clear/reset diretamente de forma fácil em todas as versões do mock/real,
        // vamos sugerir recarregar ou implementar um estado local se necessário.
        // No momento, vamos apenas simular ou limpar se o hook suportar (o mock não suporta explicitamente sem mudança)
        window.location.reload(); // Solução simples para o MVP
    };

    const suggestions = [
        { label: "Analisar custos deste mês", icon: <Sparkles className="w-3 h-3 text-blue-500" /> },
        { label: "Onde posso economizar?", icon: <Sparkles className="w-3 h-3 text-emerald-500" /> },
        { label: "Detectar picos de consumo", icon: <Sparkles className="w-3 h-3 text-amber-500" /> }
    ];

    return (
        <div className="space-y-4 lg:space-y-6 h-[calc(100vh-10rem)] lg:h-[calc(100vh-8rem)] flex flex-col">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Assistente IA</h2>
                    <p className="text-sm lg:text-base text-slate-500 dark:text-slate-400">Interaja com o agente para insights em tempo real.</p>
                </div>
                <button
                    onClick={clearChat}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-red-500 transition-colors border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                    Limpar
                </button>
            </div>

            <div className="flex-1 flex flex-col rounded-2xl border bg-white dark:bg-slate-900 shadow-sm overflow-hidden border-slate-100 dark:border-slate-800 transition-colors">
                <div className="flex-1 p-3 lg:p-4 overflow-y-auto space-y-4 bg-slate-50/30 dark:bg-slate-950/30">
                    <AnimatePresence>
                        {messages.map((m: Message) => (
                            <motion.div
                                key={m.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={cn(
                                    "flex gap-2 lg:gap-3 max-w-[90%] lg:max-w-[80%]",
                                    m.role === 'user' ? "ml-auto flex-row-reverse" : ""
                                )}
                            >
                                <div className={cn(
                                    "w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center shrink-0",
                                    m.role === 'user' ? "bg-slate-900 dark:bg-blue-600 text-white" : "bg-emerald-600 text-white"
                                )}>
                                    {m.role === 'user' ? <User className="w-3 h-3 lg:w-4 lg:h-4" /> : <Bot className="w-3 h-3 lg:w-4 lg:h-4" />}
                                </div>
                                <div className={cn(
                                    "p-3 rounded-2xl text-xs lg:text-sm whitespace-pre-wrap",
                                    m.role === 'user'
                                        ? "bg-slate-900 dark:bg-blue-600 text-white rounded-tr-none"
                                        : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm rounded-tl-none font-medium text-slate-700 dark:text-slate-200"
                                )}>
                                    {m.content}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {isLoading && (
                        <div className="flex gap-2 lg:gap-3">
                            <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                                <Bot className="w-3 h-3 lg:w-4 lg:h-4" />
                            </div>
                            <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm rounded-tl-none">
                                <div className="flex gap-1">
                                    <span className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1.5 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        </div>
                    )}
                    {error && (
                        <div className="p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs text-center animate-shake">
                            {error}
                        </div>
                    )}
                </div>

                <div className="p-3 lg:p-4 border-t bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {suggestions.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => handleSubmit(undefined, s.label)}
                                className="text-[10px] lg:text-xs px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 shadow-sm"
                            >
                                {s.icon}
                                <span>{s.label}</span>
                            </button>
                        ))}
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)} className="flex gap-2 lg:gap-3">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 bg-slate-50 dark:bg-slate-800 border-0 ring-1 ring-slate-100 dark:ring-slate-700 rounded-full px-4 py-2.5 lg:py-3 text-xs lg:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                            placeholder="Como posso ajudar você hoje?"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="bg-blue-600 text-white p-2.5 lg:p-3 rounded-full hover:bg-blue-700 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-4 h-4 lg:w-5 lg:h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
