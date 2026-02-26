'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useRef, useEffect } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';

/**
 * Frame 161 — A section (part 1)
 * - Intro: 18 medals ÷ 3 = 6, NO SOBRE
 * - NOTA: SOBRE = RESTO
 * - Math notation: 18 ÷ 3 = 6 resto 0
 * - Division algorithm 18|3 with multiplication table
 * - Definition: "División exacta = resto es cero"
 * - Example: 32 ÷ 4 = 8
 */

interface Props { zoom?: number; }
//PAGINA 2 ABSTRACTO
export function ConceptoPictoricoPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched, completeStage, watchedVideos, completedExercises, completedStages } = useVideoProgress();

    const VIDEO_TRACKING = {
        A_NOTA: 'division_exacta-pag8-v1',
        A_MATH: 'division_exacta-pag8-v3',
        A_COMO: 'division_exacta-pag8-v4',
        A_DEF: 'division_exacta-pag8-v5',
        A_EXAMPLE: 'division_exacta-pag8-v6',
    };

    const ABSTRACT_IDS = [
        // Page 8 Videos
        'division_exacta-pag8-v1', 'division_exacta-pag8-v3', 'division_exacta-pag8-v4',
        'division_exacta-pag8-v5', 'division_exacta-pag8-v6',
        // Page 9 Videos
        'division_exacta-pag9-v1', 'division_exacta-pag9-v2', 'division_exacta-pag9-v3',
        // Page 9 Exercises
        'division_exacta-pag9-a-game'
    ];

    useEffect(() => {
        const allDone = ABSTRACT_IDS.every(id =>
            watchedVideos.includes(id) || completedExercises[id]?.completed
        );
        if (allDone) {
            completeStage('division-exacta-a-stage');
        }
    }, [watchedVideos, completedExercises]);

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

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'División Exacta' }} pageId="div-exacta-concepto-pictorico">
            <div className="w-full">
                <div className="relative ml-2 flex items-start">
                    <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#be90de] dark:bg-purple-900" style={{ borderColor: '#be90de' }}>
                        A {completedStages.includes('division-exacta-a-stage') && <span className="ml-1 text-[#7c3aed]">✓</span>}
                    </div>
                    <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-5 bg-white dark:bg-gray-800 border-[#be90de] dark:border-purple-900">
                        {/* --- STAGE A: PICTORICO --- */}
                        <div className="mt-4 space-y-6">
                            {/* Intro text */}
                            <div>
                                <p className="font-semibold text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                                    De acuerdo con la actividad anterior, todas las <span className="font-extrabold text-2xl">18</span> medallas se reparten
                                    en <span className="font-extrabold text-2xl text-purple-800">3</span> grupos de deportistas. Así, cada uno de 3 grupos tiene la misma
                                    cantidad de <span className="font-extrabold text-2xl text-green-600">6</span> medallas. <span className="font-bold text-2xl text-red-600">NO SOBRE</span> ninguna medalla.
                                </p>
                                <div className="mt-4 flex items-center gap-4">
                                    <div className="shrink-0">
                                        <PlayVideoButton trackingId={VIDEO_TRACKING.A_NOTA} title="" videoId="/pag8/vv-1" />
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border-l-4 border-purple-500 flex-1">
                                        <p className="text-base font-semibold text-gray-700 dark:text-gray-300">
                                            <span className="font-extrabold text-[#e95352] text-lg">NOTA:</span> SOBRE es lo mismo que RESTO.<br />
                                            RESTO se usa en matemáticas, y SOBRA se usa en español.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Math notation */}
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <p className="text-base font-semibold text-gray-800 dark:text-gray-200">Vemos la notación matemática:</p>
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_MATH} title="Notación Matemática" videoId="/pag8/vv-3" />
                                </div>

                                <div className="flex justify-center my-8 pl-12">
                                    <img
                                        className="h-10 object-contain"
                                        src="/division_exacta/img1.png"
                                        draggable={false}
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <p className="text-base font-bold text-gray-700 dark:text-gray-300">
                                        &quot;<span className="text-[#e95352] text-lg">resto 0</span>&quot; significa que no hay resto. ¿Cómo sabemos esto?
                                    </p>
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_COMO} title="" videoId="/pag8/vv-4" />
                                </div>
                                <div className="flex justify-center my-8 pl-32">
                                    <img
                                        className="h-48 object-contain"
                                        src="/division_exacta/img2.png"
                                        draggable={false}
                                    />
                                </div>
                            </div>

                            {/* Definition */}
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_DEF} title="¿Qué es una división exacta?" videoId="/pag8/vv-5" />
                                    <span className="bg-[#e95352] text-white font-bold px-3 py-1 text-base">¿Qué es una división exacta?</span>
                                </div>
                                <p className="text-base font-semibold text-gray-800 dark:text-gray-200 mt-2">
                                    Una división es <span className="text-[#e95352] font-bold">exacta</span> cuando su resto es cero, es decir, no hay resto.
                                </p>
                            </div>

                            {/* Example: 32 ÷ 4 = 8 */}
                            <div>
                                <span className="bg-green-600 text-white font-bold px-3 py-1 rounded text-sm">Ejemplo:</span>
                                <div className="flex items-center gap-2 mt-2">
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_EXAMPLE} title="Ejemplo" videoId="/pag8/vv-6" />
                                    <span className="w-3 h-3 bg-green-600 dark:bg-gray-200 rounded-sm inline-block"></span>
                                    <p className="text-base font-semibold text-gray-800 dark:text-gray-200">
                                        La división 32 ÷ 4 = 8 es <span className="text-[#e95352] font-bold">exacta</span> porque no tiene resto.
                                    </p>
                                </div>
                                <div className="flex justify-center my-8 pl-8">
                                    <img
                                        className="h-48 object-contain"
                                        src="/division_exacta/img3.png"
                                        draggable={false}
                                    />
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
