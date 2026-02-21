'use client';

import React from 'react';

interface FeedbackButtonProps {
    onCheck: () => void;
    onReset: () => void;
    status: 'correct' | 'incorrect' | null;
    disabled?: boolean;
    className?: string;
}

export const FeedbackButton: React.FC<FeedbackButtonProps> = ({
    onCheck,
    onReset,
    status,
    disabled = false,
    className = ""
}) => {
    return (
        <div className={`flex items-center justify-center min-w-[200px] h-12 ${className}`}>
            {status === null ? (
                <button
                    type="button"
                    onClick={onCheck}
                    disabled={disabled}
                    className="px-6 py-2 rounded font-bold text-white transition-all text-lg bg-purple-700 hover:bg-purple-800 flex-shrink-0"
                >
                    ¿LISTO?
                </button>
            ) : status === 'correct' ? (
                <div className="relative flex items-center gap-2 flex-shrink-0 animate-in fade-in zoom-in duration-300">
                    <span className="text-green-600 font-black text-2xl celebrate-animation">
                        ✓ CORRECTO
                    </span>
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="confetti-particle"
                            style={{
                                backgroundColor: ['#10b981', '#f59e0b', '#8b5cf6', '#ec4899'][i % 4],
                                left: `${i * 15}px`,
                                animationDelay: `${i * 0.1}s`
                            }}
                        />
                    ))}
                </div>
            ) : (
                <div className="relative flex items-center gap-3 flex-shrink-0 animate-in fade-in slide-in-from-top-1 duration-300">
                    <span className="text-orange-500 font-black text-2xl shake-animation">
                        INCORRECTO
                    </span>
                    <button
                        type="button"
                        onClick={onReset}
                        className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all flex items-center justify-center shadow-md scale-110"
                        title="Reintentar"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );
};
