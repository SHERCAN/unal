'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

export type ToastType = 'video' | 'cpa' | 'exercise-first' | 'exercise-second' | 'exercise-retry' | 'game-first' | 'game-second' | 'game-retry';

export interface Toast {
    id: string;
    type: ToastType;
    points: number;
    message: string;
}

interface ToastContextType {
    showToast: (type: ToastType, points: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const MOTIVATIONAL_MESSAGES: Record<ToastType, string[]> = {
    'video': [
        '¡Excelente! Sigue aprendiendo así 🎥',
        '¡Genial! El conocimiento es poder 🌟',
        '¡Bien hecho! Cada video te acerca más a tu meta 🚀',
    ],
    'cpa': [
        '¡Increíble! Dominaste esta etapa 🎯',
        '¡Fantástico! Sigues avanzando sin parar 💪',
        '¡Excelente trabajo! Tu esfuerzo vale oro ⭐',
    ],
    'exercise-first': [
        '¡Perfecto! Lo lograste al primer intento 🏆',
        '¡Impresionante! Eres un genio 🧠',
        '¡Maravilloso! Tu dedicación se nota 💎',
    ],
    'exercise-second': [
        '¡Bien! Segundo intento es victoria 🎖️',
        '¡Genial! La práctica hace al maestro 📚',
        '¡Sigue así! Estás mejorando 🌟',
    ],
    'exercise-retry': [
        '¡Bien hecho! La persistencia es clave 💪',
        '¡Nunca te rindas! Cada intento cuenta 🌈',
        '¡Perseverancia! Aprendes de tus errores 🌟',
    ],
    'game-first': [
        '¡Excelente! Primer intento perfecto 🎮',
        '¡Asombroso! Dominas el juego 🌟',
        '¡Fantástico! Eres el mejor 🏆',
    ],
    'game-second': [
        '¡Muy bien! Segundo intento exitoso 🎯',
        '¡Continúa! Vas por buen camino 🚀',
        '¡Sigue mejorando! Lo estás logrando 💫',
    ],
    'game-retry': [
        '¡No te rindas! Cada intento te acerca 🌈',
        '¡Sigue intentando! La práctica es la clave 💪',
        '¡Persiste! El éxito está cerca 🌟',
    ],
};

function getRandomMessage(type: ToastType): string {
    const messages = MOTIVATIONAL_MESSAGES[type];
    return messages[Math.floor(Math.random() * messages.length)];
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const showToast = useCallback((type: ToastType, points: number) => {
        const id = `${Date.now()}-${Math.random()}`;
        const message = getRandomMessage(type);

        const newToast: Toast = { id, type, points, message };

        setToasts((prev) => [...prev, newToast]);

        // Auto-dismiss after 4 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container - Rendered via Portal to ensure proper z-index */}
            {mounted && typeof window !== 'undefined' && createPortal(
                <div
                    className="fixed bottom-20 right-4 flex flex-col-reverse gap-3 pointer-events-none"
                    style={{ zIndex: 2147483647 }}
                >
                    {toasts.map((toast, index) => (
                        <ToastNotification
                            key={toast.id}
                            toast={toast}
                            index={index}
                            onClose={() => removeToast(toast.id)}
                        />
                    ))}
                </div>,
                document.body
            )}
        </ToastContext.Provider>
    );
}

function ToastNotification({ toast, index, onClose }: { toast: Toast; index: number; onClose: () => void }) {
    const getIcon = () => {
        switch (toast.type) {
            case 'video': return '🎥';
            case 'cpa': return '🎯';
            case 'exercise-first': return '🏆';
            case 'exercise-second': return '🎖️';
            case 'exercise-retry': return '💪';
            case 'game-first': return '🎮';
            case 'game-second': return '🎯';
            case 'game-retry': return '🌈';
            default: return '⭐';
        }
    };

    return (
        <div
            className="pointer-events-auto animate-in slide-in-from-bottom-5 fade-in duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="bg-gradient-to-r from-[#7e22ce] to-[#9333ea] text-white rounded-2xl shadow-2xl shadow-purple-500/50 border-2 border-white/20 p-4 min-w-[300px] max-w-[400px]">
                <div className="flex items-start gap-3">
                    {/* Icon */}
                    <div className="text-3xl flex-shrink-0 mt-0.5">
                        {getIcon()}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="font-black text-yellow-300 text-lg mb-1">
                            +{toast.points} Puntos
                        </div>
                        <div className="text-sm font-medium leading-relaxed">
                            {toast.message}
                        </div>
                    </div>

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="flex-shrink-0 text-white/60 hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
