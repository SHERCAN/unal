'use client';

import React, { useState, useEffect } from 'react';

export interface ProgressNavigationProps {
    lessonPages: number;
    exercisePages: number;
    currentPage: number;
    completedPages: number[];
    completedModules?: string[];
    onPageChange?: (page: number) => void;
}

type Section = 'lesson' | 'exercise';

export function ProgressNavigation({
    lessonPages,
    exercisePages,
    currentPage,
    completedPages,
    completedModules = [],
    onPageChange
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
        // Determine the last page of the current section to check completion status
        const sectionEndPage = section === 'lesson' ? lessonPages : lessonPages + exercisePages;
        const isSectionCompleted = isPageCompleted(sectionEndPage);

        const steps = [
            { label: 'C', moduleId: 'division-c', defaultColor: '#80e8bb', ring: 'ring-[#80e8bb]/50' },
            { label: 'P', moduleId: 'division-p', defaultColor: '#8ec2e8', ring: 'ring-[#8ec2e8]/50' },
            { label: 'A', moduleId: 'division-a', defaultColor: '#be90de', ring: 'ring-[#be90de]/50' },
            { label: '✓', moduleId: 'final', defaultColor: 'purple', ring: 'ring-purple-300' } // Final
        ];

        return (
            <div className="flex items-center justify-center gap-1.5">
                {steps.map((step, index) => {
                    const isLast = index === 3;
                    const isModuleCompleted = step.moduleId === 'final'
                        ? isSectionCompleted
                        : completedModules.includes(step.moduleId);

                    let bgColor = step.defaultColor;
                    let textColor = 'text-white';
                    let scale = 'scale-100';

                    if (!isLast) {
                        // C, P, A Steps
                        scale = 'scale-110';
                        if (isModuleCompleted) {
                            bgColor = '#22c55e'; // Green-500
                        }
                    } else {
                        // Final Checkmark Step
                        // Check if all 3 exercises in DivisionExercisesPage are completed
                        const allExercisesCompleted = [
                            'division-exercises-activity1',
                            'division-exercises-activity2',
                            'division-exercises-activity3'
                        ].every(id => completedModules.includes(id));

                        if (allExercisesCompleted) {
                            // All exercises completed -> Green (same as CPA)
                            bgColor = '#22c55e'; // Green-500
                            scale = 'scale-110';
                        } else if (isSectionCompleted) {
                            // Section completed but not all exercises -> Purple
                            bgColor = '#9333ea'; // Purple-600
                            scale = 'scale-110';
                        } else {
                            // Not completed -> Gray
                            bgColor = '#e5e7eb'; // Gray-200
                            textColor = 'text-gray-400';
                        }
                    }

                    return (
                        <React.Fragment key={index}>
                            <div
                                className={`
                                    w-8 h-8 rounded-full flex items-center justify-center
                                    font-black text-sm transition-all duration-200 shadow-sm
                                    ${textColor} ${scale}
                                `}
                                style={{ backgroundColor: bgColor }}
                                title={step.label === '✓' ? 'Finalización' : step.label}
                            >
                                {isModuleCompleted && !isLast ? '✓' : step.label}
                            </div>

                            {index < steps.length - 1 && (
                                <div
                                    className={`h-0.5 w-4 rounded-full transition-colors duration-200 ${isSectionCompleted
                                        ? 'bg-green-500'
                                        : 'bg-gray-300 dark:bg-gray-600'
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
