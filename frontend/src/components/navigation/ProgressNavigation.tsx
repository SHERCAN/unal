'use client';

import React, { useState, useEffect } from 'react';

export interface ProgressNavigationProps {
    lessonPages: number;
    exercisePages: number;
    currentPage: number;
    completedPages: number[];
    completedModules?: string[];
    onPageChange?: (page: number) => void;
    topicId?: string; // Add topicId
}

type Section = 'lesson' | 'exercise';

export function ProgressNavigation({
    lessonPages,
    exercisePages,
    currentPage,
    completedPages,
    completedModules = [],
    onPageChange,
    topicId = 'division' // Default to division for backward compatibility
}: ProgressNavigationProps) {
    const currentSection: Section = currentPage <= lessonPages ? 'lesson' : 'exercise';
    const [activeSection, setActiveSection] = useState<Section>(currentSection);

    const totalPages = lessonPages + exercisePages;

    useEffect(() => {
        const newSection = currentPage <= lessonPages ? 'lesson' : 'exercise';
        if (newSection !== activeSection) {
            setActiveSection(newSection);
        }
    }, [currentPage, lessonPages, activeSection]);

    const isPageCompleted = (page: number) => completedPages.includes(page);
    const isCurrentPage = (page: number) => page === currentPage;

    const renderTimeline = (section: Section) => {
        const steps = [
            { label: 'C', moduleId: `${topicId}-c-stage`, defaultColor: '#80e8bb', activeColor: '#22c55e' },
            { label: 'P', moduleId: `${topicId}-p-stage`, defaultColor: '#8ec2e8', activeColor: '#3b82f6' },
            { label: 'A', moduleId: `${topicId}-a-stage`, defaultColor: '#be90de', activeColor: '#8b5cf6' },
            { label: '✓', moduleId: 'final', defaultColor: '#f3f4f6', activeColor: '#10b981' }
        ];

        return (
            <div className="flex items-center justify-center gap-1.5">
                {steps.map((step, index) => {
                    const isLast = index === 3;

                    // Final Checkmark Step Special Logic
                    let isStepCompleted = false;
                    if (!isLast) {
                        isStepCompleted = completedModules.includes(step.moduleId);
                    } else {
                        const FINAL_EXERCISES: Record<string, string | string[]> = {
                            'division': ['division-pag5-modulo-a', 'division-pag5-modulo-b', 'division-pag6-modulo-a', 'division-pag6-modulo-b', 'division-final'],
                            'division-exacta': 'division-exacta-final',
                            'division-inexacta': 'division-inexacta-final',
                            'numeros-primos': 'numeros-primos-final',
                            'fracciones': ['fracciones-pag21-modulo-a', 'fracciones-pag22-modulo-b', 'fracciones-a-stage'],
                            'fracciones-equivalentes': 'fracciones-equivalentes-final',
                            'comparacion-fracciones': 'comparacion-fracciones-final',
                            'division-demo': 'division-final'
                        };

                        const topicKey = topicId || 'division';
                        const finalId = FINAL_EXERCISES[topicKey];
                        isStepCompleted = Array.isArray(finalId)
                            ? finalId.every(id => completedModules.includes(id))
                            : finalId ? completedModules.includes(finalId) : false;
                    }

                    const bgColor = isStepCompleted ? step.activeColor : step.defaultColor;
                    const textColor = isStepCompleted ? 'text-white' : (isLast ? 'text-gray-400' : 'text-white');
                    const scale = isStepCompleted ? 'scale-110' : 'scale-100';

                    return (
                        <React.Fragment key={index}>
                            <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs transition-all duration-300 shadow-sm relative ${textColor} ${scale}`}
                                style={{ backgroundColor: bgColor }}
                                title={isLast ? 'Finalización' : step.label}
                            >
                                {step.label}
                                {isStepCompleted && !isLast && (
                                    <div className="absolute -top-1 -right-1 bg-white rounded-full w-4 h-4 flex items-center justify-center shadow-md animate-in zoom-in duration-300">
                                        <svg className="w-3 h-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                )}
                            </div>

                            {index < steps.length - 1 && (
                                <div
                                    className={`h-0.5 w-4 rounded-full transition-colors duration-300 ${isStepCompleted
                                        ? 'bg-green-500'
                                        : 'bg-gray-200 dark:bg-gray-700'
                                        }`}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 py-3 px-6 shadow-lg">
            <div className="flex items-center justify-between gap-4">
                <div className="flex gap-2 flex-shrink-0">
                    <button
                        onClick={() => {
                            setActiveSection('lesson');
                            onPageChange?.(1);
                        }}
                        className={`
                            px-4 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wide
                            transition-all duration-200
                            ${activeSection === 'lesson'
                                ? 'bg-purple-600 text-white shadow-sm'
                                : 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 border border-purple-600 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-gray-600'
                            }
                        `}
                    >
                        Lección
                    </button>
                    {exercisePages > 0 && (
                        <button
                            onClick={() => {
                                setActiveSection('exercise');
                                onPageChange?.(lessonPages + 1);
                            }}
                            className={`
                                px-4 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wide
                                transition-all duration-200
                                ${activeSection === 'exercise'
                                    ? 'bg-purple-600 text-white shadow-sm'
                                    : 'bg-white dark:bg-gray-700 text-purple-600 dark:text-purple-400 border border-purple-600 dark:border-purple-400 hover:bg-purple-50 dark:hover:bg-gray-600'
                                }
                            `}
                        >
                            Ejercicios
                        </button>
                    )}
                </div>

                <div className="flex-1 min-w-0">
                    {renderTimeline(activeSection)}
                </div>

                <div className="flex-shrink-0">
                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                        {currentPage}/{totalPages}
                    </span>
                </div>
            </div>
        </div>
    );
}
