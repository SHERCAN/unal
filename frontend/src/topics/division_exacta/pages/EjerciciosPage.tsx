'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';

/**
 * Frame 163 — EJERCICIOS
 * Activity 1: Calculate exact divisions (input + ¿LISTO?)
 *   144÷12, 75÷15, 165÷11, 1116÷31, 1059÷3
 * Activity 2: Determine if divisions are exact or not (dropdown + ¿LISTO?)
 *   120÷5, 135÷10, 98÷7, 75÷4, 60÷12
 */

interface Props { zoom?: number; }

export function EjerciciosPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched, submitExercise } = useVideoProgress();

    const VIDEO_TRACKING = {
        EJ_1: 'div-exacta-ej-1',
        EJ_2: 'div-exacta-ej-2',
    };

    /* videoModal list removed */
    /* ref removed */

    /* handleVideoComplete removed */

    /* PlayButton definition removed */

    // Activity 1: Calculate divisions
    const calcItems = [
        { dividend: 144, divisor: 12, answer: 12 },
        { dividend: 75, divisor: 15, answer: 5 },
        { dividend: 165, divisor: 11, answer: 15 },
        { dividend: 1116, divisor: 31, answer: 36 },
        { dividend: 1059, divisor: 3, answer: 353 },
    ];
    const [calcAnswers, setCalcAnswers] = useState<Record<number, string>>({});
    const [calcResults, setCalcResults] = useState<Record<number, boolean | null>>({});

    const handleCalcListo = (index: number) => {
        const userAnswer = parseInt(calcAnswers[index] || '');
        const correct = userAnswer === calcItems[index].answer;
        setCalcResults(prev => ({ ...prev, [index]: correct }));
        submitExercise(`div-exacta-calc-${index}`, correct);
    };

    // Activity 2: Determine if exact
    const exactItems = [
        { dividend: 120, divisor: 5, isExact: true },
        { dividend: 135, divisor: 10, isExact: false },
        { dividend: 98, divisor: 7, isExact: true },
        { dividend: 75, divisor: 4, isExact: false },
        { dividend: 60, divisor: 12, isExact: true },
    ];
    const [exactAnswers, setExactAnswers] = useState<Record<number, string>>({});
    const [exactResults, setExactResults] = useState<Record<number, boolean | null>>({});

    const handleExactListo = (index: number) => {
        const userAnswer = exactAnswers[index] || '';
        const correct = (userAnswer === 'exacta') === exactItems[index].isExact;
        setExactResults(prev => ({ ...prev, [index]: correct }));
        submitExercise(`div-exacta-exact-${index}`, correct);
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'División Exacta' }} pageId="div-exacta-ejercicios">
            <div className="w-full">
                <h1 className="text-2xl font-black text-purple-700 dark:text-purple-400 mb-6 uppercase tracking-wide">Ejercicios</h1>

                {/* Activity 1: Calculate divisions */}
                <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-4">
                        <PlayVideoButton trackingId={VIDEO_TRACKING.EJ_1} title="Calcular divisiones" videoId="/pag10/vv-1" />
                        <span className="w-4 h-4 bg-purple-700 rounded-sm inline-block flex-shrink-0"></span>
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                            Calcule las siguientes divisiones exactas usando el algoritmo de división.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {calcItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-sm inline-block flex-shrink-0"></span>
                                <p className="text-base font-bold text-gray-900 dark:text-white min-w-[140px]">
                                    {item.dividend} ÷ {item.divisor} =
                                </p>
                                <input
                                    type="number"
                                    value={calcAnswers[i] || ''}
                                    onChange={(e) => setCalcAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                                    className={`w-20 px-2 py-1 border-2 rounded text-center font-bold text-lg ${calcResults[i] === true ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                                        calcResults[i] === false ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                                            'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                                        } text-gray-900 dark:text-white`}
                                />
                                <button onClick={() => handleCalcListo(i)}
                                    className="px-4 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded">
                                    ¿LISTO?
                                </button>
                                {calcResults[i] === true && <span className="text-green-600 font-bold">✅</span>}
                                {calcResults[i] === false && <span className="text-red-500 font-bold">❌</span>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activity 2: Determine if exact */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-4">
                        <PlayVideoButton trackingId={VIDEO_TRACKING.EJ_2} title="Determinar si es exacta" videoId="/pag10/vv-2" />
                        <span className="w-4 h-4 bg-purple-700 rounded-sm inline-block flex-shrink-0"></span>
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                            Determinar si las siguientes divisiones son exactas o no.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {exactItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-sm inline-block flex-shrink-0"></span>
                                <p className="text-base font-bold text-gray-900 dark:text-white min-w-[100px]">
                                    {item.dividend} ÷ {item.divisor}
                                </p>
                                <select
                                    value={exactAnswers[i] || ''}
                                    onChange={(e) => setExactAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                                    className={`border-2 rounded px-3 py-1 text-sm font-medium ${exactResults[i] === true ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                                        exactResults[i] === false ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                                            'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                                        } text-gray-800 dark:text-gray-200`}
                                >
                                    <option value="">Selecciona</option>
                                    <option value="exacta">es exacta</option>
                                    <option value="no-exacta">no es exacta</option>
                                </select>
                                <button onClick={() => handleExactListo(i)}
                                    className="px-4 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded">
                                    ¿LISTO?
                                </button>
                                {exactResults[i] === true && <span className="text-green-600 font-bold">✅</span>}
                                {exactResults[i] === false && <span className="text-red-500 font-bold">❌</span>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* VideoModal removed */}
        </BookPageContainer>
    );
}
