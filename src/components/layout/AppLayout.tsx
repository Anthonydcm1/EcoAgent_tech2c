import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { ThemeToggle } from '../ui/ThemeToggle';

// Componente de Layout principal que define a estrutura visual comum
export function AppLayout() {
    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-foreground transition-colors duration-300">
            {/* Menu lateral de navegação */}
            <Sidebar />
            <main className="flex-1 flex flex-col min-h-screen">
                {/* Cabeçalho superior com título do projeto e troca de tema */}
                <header className="h-16 border-b dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-4 lg:px-8 pl-16 lg:pl-8 shrink-0 sticky top-0 z-10 shadow-sm transition-colors duration-300">
                    <div className="text-sm text-slate-500 dark:text-slate-400 font-medium truncate">
                        Project: <span className="text-slate-900 dark:text-white">EcoAgent Analysis</span>
                    </div>
                    <ThemeToggle />
                </header>
                {/* Área de conteúdo dinâmico (onde as páginas são renderizadas) */}
                <div className="flex-1 p-4 lg:p-10">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}
