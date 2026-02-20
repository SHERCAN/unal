'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';

/**
 * Frame 162 — A section (part 2)
 * - Example: 48 ÷ 12 = 4 (exact)
 * - Non-exact example: 14 ÷ 3 = 4 remainder 2
 * - PRÁCTICA: 4 dropdown questions
 * - BONO EXPLICADO play button
 */

interface Props { zoom?: number; }

export function ConceptoAbstractoPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        A_NOEXACT: 'div-exacta-a-noexact',
        A_NOEXACT2: 'div-exacta-a-noexact2',
        A_BONO: 'div-exacta-a-bono',
    };

    /* videoModal list removed */
    /* ref removed */

    /* handleVideoComplete removed */

    /* openVideo removed */

    /* PlayButton definition removed */

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

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'División Exacta' }} pageId="div-exacta-concepto-abstracto">
            <div className="w-full">
                <div className="relative ml-2 flex items-start">
                    <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#be90de] dark:bg-purple-900" style={{ borderColor: '#be90de' }}>
                        A
                    </div>
                    <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-5 bg-white dark:bg-gray-800 border-[#be90de] dark:border-purple-900">

                        <div className="mt-4 space-y-6">
                            {/* Example: 48 ÷ 12 = 4 */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-sm inline-block"></span>
                                    <p className="text-sm text-gray-800 dark:text-gray-200">
                                        La división 48 ÷ 12 = 4 es <span className="text-green-600 font-bold">exacta</span> porque no tiene resto.
                                    </p>
                                </div>

                                <DivisionAlgorithm
                                    dividend={48} divisor={12} quotient={4} subtract={48} remainder={0}
                                    multTable={[
                                        { mult: 1, result: 12 }, { mult: 2, result: 24 }, { mult: 3, result: 36 },
                                        { mult: 4, result: 48 },
                                    ]}
                                />
                            </div>

                            {/* Non-exact example intro */}
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <p className="text-sm text-gray-800 dark:text-gray-200">
                                        ¿Qué pasa si alguna división <span className="text-red-600 font-bold">NO</span> es exacta? Veamos un ejemplo.
                                    </p>
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_NOEXACT} title="División no exacta" videoId="/pag1/vv-1" />
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-sm inline-block"></span>
                                    <p className="text-sm text-gray-800 dark:text-gray-200">
                                        La división 14 ÷ 3 <span className="text-red-600 font-bold">NO</span> es exacta porque tiene resto.
                                    </p>
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_NOEXACT2} title="14÷3" videoId="/pag1/vv-1" />
                                </div>

                                <DivisionAlgorithm
                                    dividend={14} divisor={3} quotient={4} subtract={12} remainder={2}
                                    multTable={[
                                        { mult: 1, result: 3 }, { mult: 2, result: 6 }, { mult: 3, result: 9 },
                                        { mult: 4, result: 12 }, { mult: 5, result: 15 },
                                    ]}
                                />
                            </div>

                            {/* PRÁCTICA */}
                            <div>
                                <span className="bg-purple-800 text-white font-bold px-3 py-1 rounded text-sm">PRÁCTICA</span>

                                <div className="mt-3 space-y-3">
                                    {practicaItems.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <span className="w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-sm inline-block flex-shrink-0"></span>
                                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 min-w-[140px]">
                                                La división {item.dividend} ÷ {item.divisor}
                                            </p>
                                            <select
                                                value={practicaAnswers[i] || ''}
                                                onChange={(e) => setPracticaAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                                                className="border-2 rounded px-3 py-1 text-sm font-medium border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                            >
                                                <option value="">Selecciona</option>
                                                <option value="exacta">es exacta</option>
                                                <option value="no-exacta">no es exacta</option>
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* BONO */}
                            <div className="text-center border-t-2 border-gray-200 dark:border-gray-700 pt-4 mt-4">
                                <p className="text-lg font-black text-gray-900 dark:text-white mb-2">
                                    ¿CÓMO HAGAMOS EL <span className="text-xl">USO DE ALGORITMO DE LA DIVISIÓN</span>?
                                </p>
                                <div className="flex items-center justify-center gap-2">
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_BONO} title="Bono Explicado" videoId="/pag1/vv-1" />
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
