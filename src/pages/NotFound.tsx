
import { motion } from 'framer-motion';
import { Home, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Componente de fallback (404) apresentado quando uma rota não é encontrada.
 * Utiliza Framer Motion para animações e Lucide-React para ícones.
 */
export function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Ícone de alerta animado */}
                <div className="bg-yellow-100 dark:bg-yellow-900/20 p-4 rounded-full mb-6 inline-block">
                    <AlertTriangle className="h-12 w-12 text-yellow-600 dark:text-yellow-500" />
                </div>

                {/* Títulos informativos */}
                <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-2">404</h1>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">Página Não Encontrada</h2>

                {/* Mensagem de erro */}
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
                    Desculpe, a página que você está procurando não existe ou foi movida.
                </p>

                {/* Botão de retorno à página inicial */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-sm"
                >
                    <Home className="h-4 w-4" />
                    Voltar ao Início
                </Link>
            </motion.div>
        </div>
    );
}
