'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';


/**
 * Frame 168 — Números Primos: Concepto Abstracto
 * A section:
 *   1. Division proofs: 7÷1=7 and 7÷7=1
 *   2. Group visualizations: 1 GRUPO and 7 GRUPOS
 *   3. BONO EXPLICADO
 *   4. ¿Qué es un número primo? definition + examples
 *   5. ¿Qué es un número compuesto? definition + example
 *   6. PRÁCTICA: classify 3, 4, 12, 13
 */

interface Props { zoom?: number; }

//PAGINA 2 ABSTRACTO
export function ConceptoAbstractoPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        A_DIVISION: 'numeros_primos-pag15-v1',
        A_BONO: 'numeros-primos-a-bono',
        A_PRIMO_DEF: 'numeros_primos-pag15-v2',
        A_EJ_7: 'numeros_primos-pag15-v3',
        A_EJ_8: 'numeros_primos-pag15-v4',
        A_COMPUESTO_DEF: 'numeros_primos-pag15-v5',
        A_COMPUESTO_EJ: 'numeros_primos-pag15-v6',
    };

    /* videoModal list removed */
    /* ref removed */

    /* handleVideoComplete removed */

    /* openVideo removed */

    /* PlayButton definition removed */

    /* ---- small green square helper ---- */
    const GreenSquare = () => (
        <div className="w-7 h-7 bg-[#c5e384] border border-[#9ab85c] dark:bg-green-600 dark:border-green-500" />
    );

    // Practice dropdowns - numbers from Frame 168
    const numbers = [
        { num: 3, answer: 'primo' },
        { num: 4, answer: 'compuesto' },
        { num: 12, answer: 'compuesto' },
        { num: 13, answer: 'primo' },
    ];

    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [listoResult, setListoResult] = useState<'correct' | 'incorrect' | null>(null);

    const handleListo = () => {
        const allCorrect = numbers.every(n => answers[n.num] === n.answer);
        setListoResult(allCorrect ? 'correct' : 'incorrect');
    };

    const handleReset = () => {
        setAnswers({});
        setListoResult(null);
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Números Primos' }} pageId="numeros-primos-concepto-abstracto">
            {/* A - ABSTRACTO Section */}
            <div className="relative ml-2 flex items-start">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#be90de] dark:bg-purple-700">
                    A
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-5 bg-white dark:bg-gray-800 border-[#be90de] dark:border-purple-700">

                    <div className="mt-2 space-y-6">

                        {/* 1. Division proofs text + play */}
                        <div>
                            <div className="flex items-start gap-2">
                                <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                                    El número <span className="font-bold">7</span> tiene solo dos divisores <span className="font-bold text-lg">1</span> y <span className="font-bold text-lg">7</span>, pero no hay más divisores para que siempre forman partes iguales
                                </p>
                                <PlayVideoButton trackingId={VIDEO_TRACKING.A_DIVISION} title="" videoId="/pag15/vv-1" />
                            </div>
                        </div>

                        {/* 2. Two long-division layouts side by side */}
                        {/* 2. Long division and group visualization */}
                        <div className="flex justify-center">
                            <img
                                src="/numeros_primos/frame213.png"
                                alt="División y grupos"
                                className="h-80 object-contain"
                                draggable={false}
                            />
                        </div>
                        {/* 5. ¿Qué es un número primo? */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <PlayVideoButton trackingId={VIDEO_TRACKING.A_PRIMO_DEF} title="¿Qué es un número primo?" videoId="/pag15/vv-2" />
                                <span className="bg-purple-600 text-white font-bold px-3 py-1 rounded text-sm">¿Qué es un número primo?</span>
                            </div>
                            <p className="text-gray-800 dark:text-gray-200 leading-relaxed ml-10">
                                Un <span className="font-bold text-green-600 dark:text-green-400">número primo</span> es un número natural mayor que 1 que tiene solo dos
                                divisores: <span className="font-bold text-lg">1</span> y <span className="font-bold text-lg">sí mismo</span>.
                            </p>
                        </div>

                        {/* 6. Ejemplo */}
                        <div className="ml-10">
                            <span className="bg-purple-600 text-white font-bold px-3 py-1 rounded text-sm mb-3 inline-block">Ejemplo:</span>
                            <div className="space-y-2 mt-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-gray-800 dark:bg-gray-300 rounded-sm flex-shrink-0" />
                                    <p className="text-gray-800 dark:text-gray-200">
                                        El número 7 es <span className="font-bold text-green-600 dark:text-green-400">primo</span> porque solo tiene dos divisores <span className="font-bold">1</span> y <span className="font-bold">7</span>.
                                    </p>
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_EJ_7} title="Ejemplo: 7 es primo" videoId="/pag15/vv-3" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-gray-800 dark:bg-gray-300 rounded-sm flex-shrink-0" />
                                    <p className="text-gray-800 dark:text-gray-200">
                                        El número 11 es <span className="font-bold text-green-600 dark:text-green-400">primo</span> porque solo tiene dos divisores <span className="font-bold">1</span> y <span className="font-bold">11</span>.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-gray-800 dark:bg-gray-300 rounded-sm flex-shrink-0" />
                                    <p className="text-gray-800 dark:text-gray-200">
                                        El número 8 NO es <span className="font-bold text-green-600 dark:text-green-400">primo</span> porque tiene cuatro divisores <span className="font-bold">1, 2, 4</span> y <span className="font-bold">8</span>.
                                    </p>
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_EJ_8} title="Ejemplo: 8 no es primo" videoId="/pag15/vv-4" />
                                </div>
                            </div>
                        </div>

                        {/* 7. ¿Qué es un número compuesto? */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <PlayVideoButton trackingId={VIDEO_TRACKING.A_COMPUESTO_DEF} title="¿Qué es un número compuesto?" videoId="/pag15/vv-5" />
                                <span className="bg-purple-600 text-white font-bold px-3 py-1 rounded text-sm">¿Qué es un número compuesto?</span>
                            </div>
                            <p className="text-gray-800 dark:text-gray-200 leading-relaxed ml-10">
                                Un número natural es un <span className="font-bold text-orange-600 dark:text-orange-400">número compuesto</span> cuando no es primo.
                            </p>
                        </div>

                        {/* 8. Ejemplo compuesto */}
                        <div className="ml-10 flex items-start gap-3">
                            <span className="bg-purple-600 text-white font-bold px-3 py-1 rounded text-sm flex-shrink-0">Ejemplo:</span>
                            <div className="flex items-center gap-2">
                                <p className="text-gray-800 dark:text-gray-200">
                                    El número 8 es <span className="font-bold text-orange-600 dark:text-orange-400">compuesto</span> porque tiene cuatro divisores 1, 2, 4 y 8.
                                </p>
                                <PlayVideoButton trackingId={VIDEO_TRACKING.A_COMPUESTO_EJ} title="Ejemplo: 8 es compuesto" videoId="/pag15/vv-6" />
                            </div>
                        </div>

                        {/* 9. PRÁCTICA */}
                        <div>
                            <span className="bg-purple-600 text-white font-bold px-3 py-1 rounded text-sm inline-block mb-4">PRÁCTICA</span>

                            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                                {numbers.map(({ num }) => (
                                    <div key={num} className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-gray-800 dark:bg-gray-300 rounded-sm flex-shrink-0" />
                                        <span className="text-gray-800 dark:text-gray-200">
                                            El número {num} es
                                        </span>
                                        <select
                                            value={answers[num] || ''}
                                            onChange={(e) => { setAnswers(prev => ({ ...prev, [num]: e.target.value })); setListoResult(null); }}
                                            className={`border-2 rounded px-2 py-1 text-sm font-semibold min-w-[120px] ${listoResult === 'correct' ? 'border-green-500 bg-green-50 dark:bg-green-900/30' :
                                                listoResult === 'incorrect' && answers[num] !== numbers.find(n => n.num === num)?.answer
                                                    ? 'border-red-500 bg-red-50 dark:bg-red-900/30' :
                                                    'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                                                } text-gray-800 dark:text-gray-200`}
                                            disabled={listoResult === 'correct'}
                                        >
                                            <option value="">...</option>
                                            <option value="primo">primo</option>
                                            <option value="compuesto">compuesto</option>
                                        </select>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-center mt-4">
                                <FeedbackButton
                                    onCheck={handleListo}
                                    onReset={handleReset}
                                    status={listoResult}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* VideoModal removed */}
        </BookPageContainer>
    );
}
