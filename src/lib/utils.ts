import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Funçâo utilitária para combinar classes do Tailwind CSS de forma condicional
export function cn(...inputs: ClassValue[]) {
    // clsx resolve classes condicionais e twMerge remove duplicatas/conflitos do Tailwind
    return twMerge(clsx(inputs));
}
