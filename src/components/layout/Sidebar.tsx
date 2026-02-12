
import { Home, Lightbulb, MessageSquare, Menu } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Configuração das rotas de navegação lateral
const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Análise de Energia', href: '/analysis', icon: Lightbulb },
    { name: 'Chat IA', href: '/chat', icon: MessageSquare },
];

// Componente Sidebar (Menu Lateral) responsivo
export function Sidebar() {
    // Estado para controlar a visibilidade do menu em dispositivos móveis
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-slate-900 text-white border border-slate-700 shadow-sm"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                <Menu className="h-6 w-6" />
            </button>

            <AnimatePresence>
                {(isMobileOpen || window.innerWidth >= 1024) && (
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
                        className={cn(
                            "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-r border-slate-200 dark:border-slate-800 flex flex-col lg:static lg:h-screen lg:translate-x-0 shadow-xl transition-colors duration-300",
                        )}
                    >
                        <div className="flex h-20 items-center px-6 border-b border-slate-100 dark:border-white/10">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                                    <span className="font-bold text-white">E</span>
                                </div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-900 dark:from-white to-slate-500 dark:to-slate-400 bg-clip-text text-transparent">
                                    EcoAgent
                                </h1>
                            </div>
                        </div>
                        <nav className="flex-1 space-y-2 px-4 py-6">
                            {navigation.map((item) => (
                                <NavLink
                                    key={item.name}
                                    to={item.href}
                                    className={({ isActive }) =>
                                        cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                                            isActive
                                                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                                                : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                                        )
                                    }
                                    onClick={() => setIsMobileOpen(false)}
                                >
                                    {({ isActive }) => (
                                        <div className="flex items-center gap-3">
                                            <item.icon className={cn("h-5 w-5 transition-colors", isActive ? "text-white" : "text-slate-500 group-hover:text-white")} />
                                            <span>{item.name}</span>
                                        </div>
                                    )}
                                </NavLink>
                            ))}
                        </nav>
                        <div className="p-4 border-t border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-black/20">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 border-2 border-white dark:border-slate-800" />
                                <div className="text-sm">
                                    <p className="font-medium text-slate-900 dark:text-white">Usuário Demo</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Plano Enterprise</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </>
    );
}
