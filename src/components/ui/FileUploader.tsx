
import { Upload, File, X, Check, Loader2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import { cn } from '../../lib/utils';

interface FileUploaderProps {
    onFileSelect: (file: File) => void;
}

// Componente de Upload de arquivos com feedback visual premium
export function FileUploader({ onFileSelect }: FileUploaderProps) {
    // Estados para gerenciar interação e feedback do upload
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const processFile = useCallback((file: File) => {
        setIsUploading(true);
        setIsSuccess(false);
        setSelectedFile(file);

        // Simulate a premium upload experience
        setTimeout(() => {
            setIsUploading(false);
            setIsSuccess(true);
            onFileSelect(file);

            // Reset success checkmark after 3 seconds
            setTimeout(() => setIsSuccess(false), 3000);
        }, 1500);
    }, [onFileSelect]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    }, [processFile]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    }, [processFile]);

    const removeFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedFile(null);
        setIsSuccess(false);
    };

    return (
        <div className="w-full">
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={cn(
                    "relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300",
                    dragActive
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10 shadow-inner"
                        : "border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/50",
                    isSuccess && "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/10"
                )}
                onClick={() => !selectedFile && document.getElementById('file-upload')?.click()}
            >
                <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleChange}
                    accept=".csv,.pdf,.json"
                />

                <div className="flex flex-col items-center gap-4">
                    <div className={cn(
                        "p-4 rounded-full transition-all duration-500",
                        isSuccess
                            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-500/20 scale-110"
                            : "bg-blue-50 dark:bg-slate-800 text-blue-600 dark:text-blue-400"
                    )}>
                        {isUploading ? (
                            <Loader2 className="w-8 h-8 animate-spin" />
                        ) : isSuccess ? (
                            <Check className="w-8 h-8" />
                        ) : selectedFile ? (
                            <File className="w-8 h-8" />
                        ) : (
                            <Upload className="w-8 h-8" />
                        )}
                    </div>

                    <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-900 dark:text-white transition-colors">
                            {isUploading
                                ? 'EcoAgent está processando...'
                                : isSuccess
                                    ? 'Relatório Recebido!'
                                    : selectedFile
                                        ? selectedFile.name
                                        : 'Solte seu relatório aqui'}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            {selectedFile && !isUploading && !isSuccess
                                ? `${(selectedFile.size / 1024).toFixed(1)} KB`
                                : 'Formatos aceitos: CSV, PDF ou JSON'}
                        </p>
                    </div>

                    {selectedFile && !isUploading && (
                        <button
                            onClick={removeFile}
                            className="absolute top-4 right-4 p-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

