'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useEffect } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';


/**
 * Frame 163 — EJERCICIOS
 * Activity 1: Calculate exact divisions (input + ¿LISTO?)
 *   144÷12, 75÷15, 165÷11, 1116÷31, 1059÷3
 * Activity 2: Determine if divisions are exact or not (dropdown + ¿LISTO?)
 *   120÷5, 135÷10, 98÷7, 75÷4, 60÷12
 */

interface Props { zoom?: number; }
//PAGINA 4 EJERCICIOS 
export function EjerciciosPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched, submitGame, submitExercise, completeStage, isExerciseCompleted, watchedVideos, completedExercises } = useVideoProgress();

    const EXERCISE_IDS = {
        BASE: 'division_exacta-pag10-ej'
    };

    const VIDEO_TRACKING = {
        EJ_1: 'division_exacta-pag10-v1',
        EJ_2: 'division_exacta-pag10-v2',
    };

    const STAGE_IDS = {
        CALC_STAGE: 'division-exacta-calc',
        EXACT_STAGE: 'division-exacta-exact',
        FINAL_STAGE: 'division-exacta-final'
    };

    // Activity 1: Calculate divisions
    const calcItems = [
        { dividend: 144, divisor: 12, answer: 12 },
        { dividend: 75, divisor: 15, answer: 5 },
        { dividend: 165, divisor: 11, answer: 15 },
        { dividend: 1116, divisor: 31, answer: 36 },
        { dividend: 1059, divisor: 3, answer: 353 },
    ];
    const [calcAnswers, setCalcAnswers] = useState<Record<number, string>>({});
    const [calcStatuses, setCalcStatuses] = useState<Record<number, 'correct' | 'incorrect' | null>>({
        0: null, 1: null, 2: null, 3: null, 4: null
    });

    // Activity 2: Determine if exact
    const exactItems = [
        { dividend: 120, divisor: 5, isExact: true },
        { dividend: 135, divisor: 10, isExact: false },
        { dividend: 98, divisor: 7, isExact: true },
        { dividend: 75, divisor: 4, isExact: false },
        { dividend: 60, divisor: 12, isExact: true },
    ];
    const [exactAnswers, setExactAnswers] = useState<Record<number, string>>({});
    const [exactStatuses, setExactStatuses] = useState<Record<number, 'correct' | 'incorrect' | null>>({
        0: null, 1: null, 2: null, 3: null, 4: null
    });


    // Initial load and auto-checking
    useEffect(() => {
        const newCalcStatuses: Record<number, 'correct' | 'incorrect' | null> = {};
        calcItems.forEach((_, i) => {
            newCalcStatuses[i] = isExerciseCompleted(`${EXERCISE_IDS.BASE}${i + 1}`) ? 'correct' : null;
        });
        setCalcStatuses(newCalcStatuses);

        const newExactStatuses: Record<number, 'correct' | 'incorrect' | null> = {};
        exactItems.forEach((_, i) => {
            newExactStatuses[i] = isExerciseCompleted(`${EXERCISE_IDS.BASE}${i + 6}`) ? 'correct' : null;
        });
        setExactStatuses(newExactStatuses);

        // Check for stage completion
        const allCalcDone = calcItems.every((_, i) => isExerciseCompleted(`${EXERCISE_IDS.BASE}${i + 1}`));
        const allExactDone = exactItems.every((_, i) => isExerciseCompleted(`${EXERCISE_IDS.BASE}${i + 6}`));

        if (allCalcDone && (watchedVideos.includes(VIDEO_TRACKING.EJ_1) || isExerciseCompleted(VIDEO_TRACKING.EJ_1))) {
            completeStage(STAGE_IDS.CALC_STAGE);
        }

        if (allExactDone && (watchedVideos.includes(VIDEO_TRACKING.EJ_2) || isExerciseCompleted(VIDEO_TRACKING.EJ_2))) {
            completeStage(STAGE_IDS.EXACT_STAGE);
        }

        if (allCalcDone && allExactDone) {
            completeStage(STAGE_IDS.FINAL_STAGE);
        }
    }, [isExerciseCompleted, watchedVideos, completedExercises]);

    const handleCalcCheck = async (index: number) => {
        const id = `${EXERCISE_IDS.BASE}${index + 1}`;
        if (isExerciseCompleted(id)) return;

        const isCorrect = parseInt(calcAnswers[index] || '') === calcItems[index].answer;
        setCalcStatuses(prev => ({ ...prev, [index]: isCorrect ? 'correct' : 'incorrect' }));
        await submitExercise(id, isCorrect, 'modulo_b');
    };

    const resetCalc = (index: number) => {
        const id = `${EXERCISE_IDS.BASE}${index + 1}`;
        if (isExerciseCompleted(id)) return;
        setCalcAnswers(prev => ({ ...prev, [index]: '' }));
        setCalcStatuses(prev => ({ ...prev, [index]: null }));
    };

    const handleExactCheck = async (index: number) => {
        const id = `${EXERCISE_IDS.BASE}${index + 6}`;
        if (isExerciseCompleted(id)) return;

        const isCorrect = (exactAnswers[index] === 'exacta') === exactItems[index].isExact;
        setExactStatuses(prev => ({ ...prev, [index]: isCorrect ? 'correct' : 'incorrect' }));
        await submitExercise(id, isCorrect, 'modulo_b');
    };

    const resetExact = (index: number) => {
        const id = `${EXERCISE_IDS.BASE}${index + 6}`;
        if (isExerciseCompleted(id)) return;
        setExactAnswers(prev => ({ ...prev, [index]: '' }));
        setExactStatuses(prev => ({ ...prev, [index]: null }));
    };


    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'División Exacta' }} pageId="div-exacta-ejercicios">
            <div className="w-full max-w-4xl mx-auto pb-20">
                <h1 className="text-3xl font-black text-purple-700 dark:text-purple-400 mb-8 uppercase tracking-wide">Ejercicios</h1>

                {/* Activity 1: Calculate divisions */}
                <div className="mb-10 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-6">
                        <PlayVideoButton trackingId={VIDEO_TRACKING.EJ_1} title="Calcular divisiones" videoId="/pag10/vv-1" />
                        <div className="w-10 h-10 bg-purple-700 text-white font-bold flex items-center justify-center rounded-lg">1</div>
                        <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                            Calcule las siguientes divisiones exactas usando el algoritmo de división.
                        </p>
                    </div>

                    <div className="flex flex-col gap-y-4 ml-4 md:ml-12 mb-8">
                        {calcItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 md:gap-4 flex-nowrap whitespace-nowrap">
                                <span className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></span>
                                <p className="text-xl font-bold text-gray-700 dark:text-gray-300 w-32 flex-shrink-0">
                                    {item.dividend} ÷ {item.divisor} =
                                </p>
                                <input
                                    type="number"
                                    value={calcStatuses[i] === 'correct' ? item.answer : (calcAnswers[i] || '')}
                                    onChange={(e) => { setCalcAnswers(prev => ({ ...prev, [i]: e.target.value })); setCalcStatuses(prev => ({ ...prev, [i]: null })); }}
                                    className={`w-20 h-10 border-2 rounded-xl text-center font-black text-xl transition-all flex-shrink-0 ${calcStatuses[i] === 'correct' ? 'border-green-500 bg-green-50 text-green-700' :
                                        calcStatuses[i] === 'incorrect' ? 'border-red-500 bg-red-50 text-red-700' :
                                            'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-purple-400 focus:bg-white'
                                        }`}
                                    disabled={calcStatuses[i] === 'correct'}
                                />
                                <div className="scale-75 origin-left flex-shrink-0">
                                    <FeedbackButton
                                        onCheck={() => handleCalcCheck(i)}
                                        onReset={() => resetCalc(i)}
                                        status={calcStatuses[i]}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Activity 2: Determine if exact */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-6">
                        <PlayVideoButton trackingId={VIDEO_TRACKING.EJ_2} title="Determinar si es exacta" videoId="/pag10/vv-2" />
                        <div className="w-10 h-10 bg-purple-700 text-white font-bold flex items-center justify-center rounded-lg">2</div>
                        <p className="text-lg font-bold text-gray-800 dark:text-gray-200">
                            Determinar si las siguientes divisiones son exactas o no.
                        </p>
                    </div>

                    <div className="flex flex-col gap-y-4 ml-4 md:ml-12 mb-8">
                        {exactItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 md:gap-4 flex-nowrap whitespace-nowrap">
                                <span className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></span>
                                <p className="text-xl font-bold text-gray-700 dark:text-gray-300 w-32 flex-shrink-0">
                                    {item.dividend} ÷ {item.divisor}
                                </p>
                                <select
                                    value={exactStatuses[i] === 'correct' ? (item.isExact ? 'exacta' : 'no-exacta') : (exactAnswers[i] || '')}
                                    onChange={(e) => { setExactAnswers(prev => ({ ...prev, [i]: e.target.value })); setExactStatuses(prev => ({ ...prev, [i]: null })); }}
                                    className={`h-10 border-2 rounded-xl px-2 font-bold text-sm transition-all flex-shrink-0 ${exactStatuses[i] === 'correct' ? 'border-green-500 bg-green-50 text-green-700' :
                                        exactStatuses[i] === 'incorrect' ? 'border-red-500 bg-red-50 text-red-700' :
                                            'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-1 focus:ring-purple-400 focus:bg-white'
                                        }`}
                                    disabled={exactStatuses[i] === 'correct'}
                                >
                                    <option value="">Selecciona</option>
                                    <option value="exacta">es exacta</option>
                                    <option value="no-exacta">no es exacta</option>
                                </select>
                                <div className="scale-75 origin-left flex-shrink-0">
                                    <FeedbackButton
                                        onCheck={() => handleExactCheck(i)}
                                        onReset={() => resetExact(i)}
                                        status={exactStatuses[i]}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </BookPageContainer>
    );
}
