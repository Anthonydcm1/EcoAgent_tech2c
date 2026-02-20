
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Trash2, Sparkles, MessageSquare, X, Minus } from 'lucide-react';
import { useAgent, type Message } from '../hooks/use-agent';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const { messages, append, isLoading } = useAgent();
    const [input, setInput] = useState('');
    const [error, setError] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll para a última mensagem
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

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
            setError('Erro ao enviar mensagem.');
        }
    };

    const clearChat = () => {
        window.location.reload();
    };

    const suggestions = [
        { label: "Analisar custos", icon: <Sparkles className="w-3 h-3 text-blue-500" /> },
        { label: "Economizar energia", icon: <Sparkles className="w-3 h-3 text-emerald-500" /> }
    ];

    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
                    >
                        {/* Header do Widget */}
                        <div className="p-4 bg-slate-900 text-white flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold">Assistente Ambiental</h3>
                                    <div className="flex items-center gap-1">
                                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                        <span className="text-[10px] text-slate-400">Online agora</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={clearChat}
                                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-red-400"
                                    title="Limpar chat"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-white"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Corpo do Chat */}
                        <div
                            ref={scrollRef}
                            className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/50"
                        >
                            {messages.length === 0 && (
                                <div className="text-center py-8">
                                    <Bot className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                                    <p className="text-sm text-slate-500 dark:text-slate-400 px-8">
                                        Olá! Como posso ajudar você com sua análise ambiental hoje?
                                    </p>
                                </div>
                            )}
                            {messages.map((m: Message) => (
                                <div
                                    key={m.id}
                                    className={cn(
                                        "flex gap-2 max-w-[85%]",
                                        m.role === 'user' ? "ml-auto flex-row-reverse" : ""
                                    )}
                                >
                                    <div className={cn(
                                        "w-7 h-7 rounded-full flex items-center justify-center shrink-0",
                                        m.role === 'user' ? "bg-slate-900 text-white" : "bg-blue-600 text-white"
                                    )}>
                                        {m.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                                    </div>
                                    <div className={cn(
                                        "p-3 rounded-2xl text-xs shadow-sm",
                                        m.role === 'user'
                                            ? "bg-slate-900 text-white rounded-tr-none"
                                            : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-tl-none"
                                    )}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-2">
                                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                                        <Bot className="w-3.5 h-3.5" />
                                    </div>
                                    <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm rounded-tl-none">
                                        <div className="flex gap-1">
                                            <span className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                            <span className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                            <span className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full animate-bounce"></span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {error && (
                                <div className="p-2 text-[10px] text-center bg-red-50 text-red-600 rounded-lg border border-red-100">
                                    {error}
                                </div>
                            )}
                        </div>

                        {/* Input e Sugestões */}
                        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                            {messages.length < 2 && (
                                <div className="flex gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
                                    {suggestions.map((s, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleSubmit(undefined, s.label)}
                                            className="whitespace-nowrap text-[10px] px-2.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors flex items-center gap-1"
                                        >
                                            {s.icon}
                                            <span>{s.label}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                            <form
                                onSubmit={(e) => handleSubmit(e)}
                                className="flex gap-2"
                            >
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Pergunte algo..."
                                    className="flex-1 bg-slate-50 dark:bg-slate-800 border-none ring-1 ring-slate-200 dark:ring-slate-700 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-blue-500 transition-shadow outline-none text-slate-900 dark:text-white"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/20 disabled:opacity-50 transition-all active:scale-95"
                                >
                                    <Send className="w-4 h-4" />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Marcador Flutuante */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 relative group",
                    isOpen
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 rotate-90"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                )}
            >
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white dark:border-slate-950 rounded-full" />
                {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}

                {/* Tooltip */}
                {!isOpen && (
                    <div className="absolute right-full mr-4 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Dúvidas? Fale com a IA
                    </div>
                )}
            </motion.button>
        </div>
    );
}
