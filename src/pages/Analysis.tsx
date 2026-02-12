import { motion } from 'framer-motion';
import { Table, BarChart3, TrendingUp, AlertCircle } from 'lucide-react';

// Página de Análise Detalhada de Energia
export function Analysis() {
    // Lista de insights gerados baseados nos dados
    const insights = [
        { title: "Picos de Consumo", detail: "Detectados entre 18h e 21h diariamente.", type: "warning", icon: AlertCircle },
        { title: "Eficiência Solar", detail: "Sua produção subiu 12% este mês.", type: "success", icon: TrendingUp },
        { title: "Sugestão de Economia", detail: "Mudar uso de máquinas para período matinal.", type: "info", icon: BarChart3 }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6 lg:space-y-8"
        >
            <div>
                <h2 className="text-2xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Análise de Energia</h2>
                <p className="text-sm lg:text-lg text-slate-500 dark:text-slate-400 mt-1 lg:mt-2">Insights detalhados gerados pelo EcoAgent.</p>
            </div>

            <div className="grid gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {insights.map((insight, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-4 lg:p-6 rounded-2xl border shadow-sm border-slate-100 dark:border-slate-800 transition-colors">
                        <div className="flex items-start justify-between">
                            <div className={`p-2 lg:p-3 rounded-xl ${insight.type === 'warning' ? 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' :
                                insight.type === 'success' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' :
                                    'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                }`}>
                                <insight.icon className="w-5 h-5 lg:w-6 lg:h-6" />
                            </div>
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white mt-4 text-sm lg:text-base">{insight.title}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-xs lg:text-sm mt-1">{insight.detail}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border shadow-sm overflow-hidden border-slate-100 dark:border-slate-800 transition-colors">
                <div className="px-4 lg:px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-slate-50/50 dark:bg-slate-800/50">
                    <Table className="w-5 h-5 text-slate-400 dark:text-slate-500" />
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm lg:text-base">Dados Brutos Recentes</h3>
                </div>
                <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full text-left text-sm min-w-[500px]">
                        <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold tracking-wider">
                            <tr>
                                <th className="px-4 lg:px-6 py-3">Data/Hora</th>
                                <th className="px-4 lg:px-6 py-3">Consumo</th>
                                <th className="px-4 lg:px-6 py-3">Custo</th>
                                <th className="px-4 lg:px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {[1, 2, 3, 4, 5].map((_, i) => (
                                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                                    <td className="px-4 lg:px-6 py-4 text-slate-700 dark:text-slate-300 font-medium text-xs lg:text-sm">12/02/26 {10 + i}:00</td>
                                    <td className="px-4 lg:px-6 py-4 text-slate-600 dark:text-slate-400 text-xs lg:text-sm">4.{i}2 kWh</td>
                                    <td className="px-4 lg:px-6 py-4 text-slate-600 dark:text-slate-400 text-xs lg:text-sm">€ 1.{i}5</td>
                                    <td className="px-4 lg:px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] lg:text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400">Normal</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
}
