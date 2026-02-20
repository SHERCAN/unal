'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface Props { zoom?: number; }

export function EjerciciosPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched, submitExercise } = useVideoProgress();

    const VIDEO_TRACKING = { INTRO: 'comp-frac-ej-intro' };

    /* videoModal list removed */
    /* ref removed */

    /* handleVideoComplete removed */

    /* openVideo removed */

    /* PlayButton definition removed */

    // Comparison exercises
    const exercises = [
        { a: 3, b: 4, c: 5, d: 8, answer: '>' },   // 3×8=24 vs 4×5=20 → >
        { a: 2, b: 7, c: 1, d: 3, answer: '<' },    // 2×3=6 vs 7×1=7 → <
        { a: 4, b: 6, c: 2, d: 3, answer: '=' },    // 4×3=12 vs 6×2=12 → =
        { a: 5, b: 9, c: 2, d: 3, answer: '<' },    // 5×3=15 vs 9×2=18 → <
        { a: 7, b: 10, c: 3, d: 5, answer: '>' },   // 7×5=35 vs 10×3=30 → >
        { a: 1, b: 2, c: 3, d: 6, answer: '=' },    // 1×6=6 vs 2×3=6 → =
    ];

    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);

    const handleCheck = async () => {
        const allCorrect = exercises.every((ex, i) => answers[i] === ex.answer);
        setResult(allCorrect ? 'correct' : 'incorrect');
        await submitExercise('comp-frac-exercises', allCorrect);
    };

    const handleReset = () => {
        setAnswers({});
        setResult(null);
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Comparación de Fracciones' }} pageId="comp-frac-ejercicios">
            <div className="flex items-center gap-2 mb-6">
                <PlayVideoButton trackingId={VIDEO_TRACKING.INTRO} title="Ejercicios de Comparación" size="md" />
                <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">EJERCICIOS</h2>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Compara cada par de fracciones usando <span className="font-bold">&gt;</span>, <span className="font-bold">&lt;</span> o <span className="font-bold">=</span>.
                Puedes calcular los productos cruzados para ayudarte.
            </p>

            <div className={`rounded-xl border-2 p-5 ${result === 'correct' ? 'border-green-400 bg-green-50 dark:bg-green-900/10' :
                result === 'incorrect' ? 'border-red-400 bg-red-50 dark:bg-red-900/10' :
                    'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50'
                }`}>
                <div className="space-y-3">
                    {exercises.map((ex, i) => (
                        <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border ${result === 'correct' ? 'border-green-200' :
                            result === 'incorrect' && answers[i] !== ex.answer ? 'border-red-300 bg-red-50 dark:bg-red-900/20' :
                                'border-gray-200 dark:border-gray-700'
                            }`}>
                            <span className="bg-orange-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                                {i + 1}
                            </span>

                            <span className="text-lg font-bold min-w-[45px] text-right">
                                <span className="text-blue-600">{ex.a}</span>/<span className="text-red-600">{ex.b}</span>
                            </span>

                            <select
                                value={answers[i] || ''}
                                onChange={(e) => { setAnswers(prev => ({ ...prev, [i]: e.target.value })); setResult(null); }}
                                className="border-2 rounded px-2 py-1 text-lg font-bold border-orange-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 min-w-[50px] text-center"
                                disabled={result === 'correct'}
                            >
                                <option value="">?</option>
                                <option value=">">&gt;</option>
                                <option value="<">&lt;</option>
                                <option value="=">=</option>
                            </select>

                            <span className="text-lg font-bold min-w-[45px]">
                                <span className="text-blue-600">{ex.c}</span>/<span className="text-red-600">{ex.d}</span>
                            </span>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-3 justify-center mt-4">
                    {result !== 'correct' && (
                        <button onClick={handleCheck}
                            className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg text-sm">
                            ¿LISTO?
                        </button>
                    )}
                    {result === 'incorrect' && (
                        <button onClick={handleReset}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg text-sm">
                            Reiniciar
                        </button>
                    )}
                </div>
                {result === 'correct' && <p className="text-center text-green-600 font-bold mt-2">✅ ¡Excelente! Comparaste todas las fracciones correctamente.</p>}
                {result === 'incorrect' && <p className="text-center text-red-500 font-bold text-sm mt-2">❌ Revisa: usa productos cruzados (a×d vs b×c).</p>}
            </div>

            {/* VideoModal removed */}
        </BookPageContainer>
    );
}
