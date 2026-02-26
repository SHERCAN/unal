'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useRef, useEffect } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';

/**
 * Frame 162 — A section (part 2)
 * - Example: 48 ÷ 12 = 4 (exact)
 * - Non-exact example: 14 ÷ 3 = 4 remainder 2
 * - PRÁCTICA: 4 dropdown questions
 * - BONO EXPLICADO play button
 */

interface Props { zoom?: number; }
//PAGINA 3 ABSTRACTO
export function ConceptoAbstractoPage({ zoom = 1 }: Props) {
    const EXERCISE_IDS = {
        A_GAME: 'division_exacta-pag9-a-game'
    };

    const STAGE_IDS = {
        A_STAGE: 'division-exacta-a-stage'
    };

    const { isVideoWatched, markVideoWatched, submitGame, completeStage, isExerciseCompleted, watchedVideos, completedExercises, completedStages } = useVideoProgress();

    const ABSTRACT_IDS = [
        // Page 8 Videos
        'division_exacta-pag8-v1', 'division_exacta-pag8-v3', 'division_exacta-pag8-v4',
        'division_exacta-pag8-v5', 'division_exacta-pag8-v6',
        // Page 9 Videos
        'division_exacta-pag9-v1', 'division_exacta-pag9-v2', 'division_exacta-pag9-v3',
        // Page 9 Exercises
        'division_exacta-pag9-a-game'
    ];

    const VIDEO_TRACKING = {
        A_NOEXACT: 'division_exacta-pag9-v1',
        A_NOEXACT2: 'division_exacta-pag9-v2',
        A_BONO: 'division_exacta-pag9-v3',
    };

    const DivisionAlgorithm = ({ dividend, divisor, quotient, subtract, remainder, multTable }: {
        dividend: number; divisor: number; quotient: number; subtract: number; remainder: number;
        multTable: { mult: number; result: number }[];
    }) => (
        <div className="flex flex-col md:flex-row gap-12 items-start justify-center my-6">
            {/* Vertical Algorithm */}
            <div className="flex gap-4 font-mono text-xl items-start">
                <div className="flex flex-col items-end gap-1">
                    <div className="h-12 flex items-center justify-center text-3xl font-bold text-gray-900 dark:text-white px-2">
                        {dividend}
                    </div>
                    <div className="relative h-12 flex items-center justify-center text-3xl font-bold text-red-600 px-2">
                        <span className="absolute -left-6 top-1 text-2xl text-gray-400 font-bold select-none">-</span>
                        {subtract}
                    </div>
                    <div className="w-14 h-1 bg-gray-800 dark:bg-gray-300 rounded-full"></div>
                    <div className="flex items-center justify-end gap-2 mt-1">
                        <div className={`flex items-center gap-1 ${remainder === 0 ? 'text-green-600' : 'text-red-600'}`}>
                            <span className="text-xl font-bold">{remainder === 0 ? 'No hay resto' : 'Hay resto'}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </div>
                        <div className={`h-12 flex items-center justify-center text-3xl font-bold px-2 ${remainder === 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {String(remainder).padStart(2, '0')}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="border-l-4 border-b-4 border-gray-800 dark:border-gray-300 pl-4 pb-2 mb-2 h-14 flex items-center">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{divisor}</span>
                    </div>
                    <div className="pl-4 h-12 flex items-center">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{quotient}</span>
                    </div>
                </div>
            </div>

            {/* Vertical Separator */}
            <div className="hidden md:block w-px bg-gray-300 dark:bg-gray-600 self-stretch"></div>

            {/* Multiplication Table */}
            <div className="text-left flex flex-col justify-center">
                {multTable.map((row, i) => (
                    <p key={i} className={`text-sm font-bold my-1 ${row.result === subtract ? 'text-red-600 scale-110 ml-2' : 'text-gray-700 dark:text-gray-300'}`}>
                        <span className="text-gray-900 dark:text-white">{divisor}</span> x {row.mult} = {row.result}
                    </p>
                ))}
            </div>
        </div>
    );

    // PRÁCTICA state
    const practicaItems = [
        { dividend: 36, divisor: 5, isExact: false },
        { dividend: 33, divisor: 11, isExact: true },
        { dividend: 80, divisor: 20, isExact: true },
        { dividend: 64, divisor: 7, isExact: false },
    ];
    const [practicaAnswers, setPracticaAnswers] = useState<Record<number, string>>({});
    const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);

    // Initial load and auto-checking
    useEffect(() => {
        if (isExerciseCompleted(EXERCISE_IDS.A_GAME)) setResult('correct');

        const allDone = ABSTRACT_IDS.every(id =>
            watchedVideos.includes(id) || completedExercises[id]?.completed
        );
        if (allDone) {
            completeStage(STAGE_IDS.A_STAGE);
        }
    }, [isExerciseCompleted, watchedVideos, completedExercises]);

    const handleCheck = async () => {
        if (isExerciseCompleted(EXERCISE_IDS.A_GAME)) return;
        const allCorrect = practicaItems.every((item, i) => (practicaAnswers[i] === 'exacta') === item.isExact);
        setResult(allCorrect ? 'correct' : 'incorrect');
        await submitGame(EXERCISE_IDS.A_GAME, allCorrect, 'juego_cpa');
        // Stage completion handled by useEffect
    };

    const handleReset = () => {
        if (isExerciseCompleted(EXERCISE_IDS.A_GAME)) return;
        setPracticaAnswers({});
        setResult(null);
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'División Exacta' }} pageId="div-exacta-concepto-abstracto">
            <div className="w-full">
                <div className="relative ml-2 flex items-start">
                    <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#be90de] dark:bg-purple-900" style={{ borderColor: '#be90de' }}>
                        A {completedStages.includes(STAGE_IDS.A_STAGE) && <span className="ml-1 text-[#7c3aed]">✓</span>}
                    </div>
                    <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-5 bg-white dark:bg-gray-800 border-[#be90de] dark:border-purple-900">
                        {/* --- STAGE A: ABSTRACTO --- */}
                        <div className="mt-4 space-y-6">
                            {/* Example: 48 ÷ 12 = 4 */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-green-600 dark:bg-gray-200 rounded-sm inline-block"></span>
                                    <p className="text-base font-semibold text-gray-800 dark:text-gray-200">
                                        La división 48 ÷ 12 = 4 es <span className="text-[#e95352] font-bold">exacta</span> porque no tiene resto.
                                    </p>
                                </div>
                                <div className="flex justify-center my-8">
                                    <img
                                        className="h-48 object-contain"
                                        src="/division_exacta/img4.png"
                                        draggable={false}
                                    />
                                </div>
                            </div>

                            {/* Non-exact example intro */}
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <p className="text-base font-semibold text-gray-800 dark:text-gray-200">
                                        ¿Qué pasa si alguna división <span className="text-[#e95352] font-bold">NO</span> es exacta? Veamos un ejemplo.
                                    </p>
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_NOEXACT} title="" videoId="/pag9/vv-1" />
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-green-600 dark:bg-gray-200 rounded-sm inline-block"></span>
                                    <p className="text-base font-semibold text-gray-800 dark:text-gray-200">
                                        La división 14 ÷ 3 <span className="text-[#e95352] font-bold">NO</span> es exacta porque tiene resto.
                                    </p>
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_NOEXACT2} title="" videoId="/pag9/vv-2" />
                                </div>

                                <div className="flex justify-center my-8">
                                    <img
                                        className="h-48 object-contain"
                                        src="/division_exacta/img5.png"
                                        draggable={false}
                                    />
                                </div>
                            </div>

                            {/* PRÁCTICA */}
                            <div>
                                <span className="bg-pink-900 text-white font-bold px-4 py-2 inline-block w-fit shadow-sm text-base rounded">PRÁCTICA</span>

                                <div className="mt-3 space-y-3">
                                    {practicaItems.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <span className="w-3 h-3 bg-pink-900 dark:bg-gray-200 rounded-sm inline-block flex-shrink-0"></span>
                                            <p className="text-base font-semibold text-gray-800 dark:text-gray-200 min-w-[140px]">
                                                La división {item.dividend} ÷ {item.divisor}
                                            </p>
                                            <select
                                                value={practicaAnswers[i] || ''}
                                                onChange={(e) => {
                                                    setPracticaAnswers(prev => ({ ...prev, [i]: e.target.value }));
                                                    setResult(null);
                                                }}
                                                className={`border-2 rounded px-3 py-1 text-sm font-medium ${result === 'correct' ? 'border-green-500 bg-green-50 dark:bg-green-900/20' :
                                                    result === 'incorrect' && (practicaAnswers[i] === 'exacta') !== item.isExact
                                                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
                                                        'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                                                    } text-gray-800 dark:text-gray-200`}
                                                disabled={result === 'correct'}
                                            >
                                                <option value="">Selecciona</option>
                                                <option value="exacta">es exacta</option>
                                                <option value="no-exacta">no es exacta</option>
                                            </select>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-center mt-4">
                                    <FeedbackButton
                                        onCheck={handleCheck}
                                        onReset={handleReset}
                                        status={result}
                                    />
                                </div>
                            </div>

                            {/* BONO */}
                            <div className="text-center border-t-2 border-gray-200 dark:border-gray-700 pt-4 mt-4">
                                <p className="text-lg font-black text-purple-700 dark:text-white mb-2">
                                    ¿CÓMO HAGAMOS EL <span className="text-xl text-[#e95352] ">USO DE ALGORITMO DE LA DIVISIÓN</span>?
                                </p>
                                <div className="flex items-center justify-center gap-2">
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_BONO} title="Bono Explicado" videoId="/pag9/vv-3" />
                                    <span className="font-black text-purple-600 text-sm">BONO EXPLICADO</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* VideoModal removed */}
        </BookPageContainer>
    );
}
