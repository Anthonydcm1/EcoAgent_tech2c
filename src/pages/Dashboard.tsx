
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Zap } from 'lucide-react';
import { FileUploader } from '../components/ui/FileUploader';
import { cn } from '../lib/utils';

// Página Principal: Painel de Controle
export function Dashboard() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 lg:space-y-8"
        >
            {/* Cabeçalho do Dashboard */}
            <div className="mb-6 lg:mb-10">
                <h2 className="text-2xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Dashboard</h2>
                <p className="text-sm lg:text-lg text-slate-500 dark:text-slate-400 mt-1 lg:mt-2">Visão geral do seu desempenho energético.</p>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {[
                    { title: 'Consumo Atual', value: '1,240 kWh', icon: Zap, color: 'text-yellow-500' },
                    { title: 'Eficiência', value: '94%', icon: CheckCircle2, color: 'text-green-500' },
                    { title: 'Custo Estimado', value: '€ 342,00', icon: ArrowUpRight, color: 'text-blue-500' },
                ].map((stat, i) => (
                    <div key={i} className="rounded-xl border bg-white dark:bg-slate-900 dark:border-slate-800 p-4 lg:p-6 shadow-sm hover:shadow-md transition-all duration-200">
                        <div className="flex items-center justify-between space-y-0 pb-2">
                            <h3 className="text-xs lg:text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</h3>
                            <div className={`p-2 rounded-full bg-opacity-10 ${stat.color.replace('text-', 'bg-')}`}>
                                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                            </div>
                        </div>
                        <div className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white mt-2">{stat.value}</div>
                        <p className="text-[10px] lg:text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                            <span className="text-emerald-600 font-medium">+2.1%</span> vs mês passado
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
                <div className="lg:col-span-4 rounded-2xl border bg-white dark:bg-slate-900 p-4 lg:p-6 shadow-sm border-slate-100 dark:border-slate-800 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <h3 className="font-bold text-slate-900 dark:text-white text-base lg:text-lg">Tendência de Consumo</h3>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-1.5 text-[10px] lg:text-xs text-slate-500 dark:text-slate-400">
                                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Atual
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] lg:text-xs text-slate-500 dark:text-slate-400">
                                <span className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-700"></span> Projetado
                            </div>
                        </div>
                    </div>
                    <div className="h-[200px] lg:h-[280px] w-full flex items-end gap-1.5 lg:gap-3 px-1">
                        {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="relative w-full">
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${h}%` }}
                                        transition={{ delay: i * 0.05, duration: 0.5 }}
                                        className={cn(
                                            "w-full rounded-t-sm lg:rounded-t-lg transition-all duration-300",
                                            i > 6 ? "bg-slate-200 dark:bg-slate-800" : "bg-gradient-to-t from-blue-600 to-blue-400 group-hover:from-blue-500 group-hover:to-blue-300 shadow-sm"
                                        )}
                                    />
                                </div>
                                <span className="text-[8px] lg:text-[10px] text-slate-400 dark:text-slate-500 font-medium">{['S', 'T', 'Q', 'Q', 'S', 'S', 'D', '2ª', '3ª', '4ª'][i]}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-3 rounded-2xl border bg-white dark:bg-slate-900 p-6 shadow-sm border-slate-100 dark:border-slate-800 transition-colors">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base lg:text-lg mb-2">Upload de Relatórios</h3>
                    <p className="text-xs lg:text-sm text-slate-500 dark:text-slate-400 mb-6">
                        Envie faturas de energia ou relatórios IoT para análise do Agente.
                    </p>
                    <div className="space-y-4">
                        <FileUploader onFileSelect={(file) => console.log(file)} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
