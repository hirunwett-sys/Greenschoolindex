'use client';

import { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextValue {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used within ToastProvider');
    return ctx;
}

const ICONS: Record<ToastType, ReactNode> = {
    success: <CheckCircle className="w-4 h-4 flex-shrink-0" />,
    error: <AlertCircle className="w-4 h-4 flex-shrink-0" />,
    info: <Info className="w-4 h-4 flex-shrink-0" />,
};

const STYLES: Record<ToastType, string> = {
    success: 'bg-primary text-white',
    error: 'bg-red-600 text-white',
    info: 'bg-gray-800 text-white',
};

function ToastItem({ item, onClose }: { item: ToastItem; onClose: (id: number) => void }) {
    return (
        <div
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl shadow-lg text-sm font-body font-medium transition-all duration-300 ${STYLES[item.type]}`}
        >
            {ICONS[item.type]}
            <span className="flex-1">{item.message}</span>
            <button
                onClick={() => onClose(item.id)}
                className="opacity-70 hover:opacity-100 transition-opacity ml-1 flex-shrink-0"
            >
                <X className="w-3.5 h-3.5" />
            </button>
        </div>
    );
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastItem[]>([]);
    const counterRef = useRef(0);

    const dismiss = useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback((message: string, type: ToastType = 'success') => {
        const id = ++counterRef.current;
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => dismiss(id), 3500);
    }, [dismiss]);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {/* Toast container */}
            <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4 sm:px-0">
                {toasts.map((t) => (
                    <div key={t.id} className="pointer-events-auto">
                        <ToastItem item={t} onClose={dismiss} />
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
