'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useRef, useEffect } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';

/**
 * Frame 165 — División Inexacta — A section
 * - Intro: 17 medals ÷ 3 = 5, remainder 2
 * - Math notation: 17 ÷ 3 = 5 resto 2
 * - Division algorithm with multiplication table
 * - Definition: "División inexacta = resto ≠ 0"
 * - PARTES DE LA DIVISIÓN: 149 ÷ 12 = 12 r 5
 */

interface Props { zoom?: number; }
//PAGINA 2 ABSTRACTO
export function ConceptoAbstractoPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched, completeStage, watchedVideos, completedExercises, completedStages } = useVideoProgress();

    const STAGE_IDS = {
        A_STAGE: 'division-inexacta-a-stage'
    };

    const VIDEO_TRACKING = {
        A_INTRO: 'division_inexacta-pag12-v1',
        A_MATH: 'division_inexacta-pag12-v2',
        A_COMO: 'division_inexacta-pag12-v3',
        A_DEF: 'division_inexacta-pag12-v4',
        A_PARTES: 'division_inexacta-pag12-v5',
    };

    const ABSTRACT_IDS = [
        'division_inexacta-pag12-v1', 'division_inexacta-pag12-v2',
        'division_inexacta-pag12-v3', 'division_inexacta-pag12-v4',
        'division_inexacta-pag12-v5'
    ];

    useEffect(() => {
        const allDone = ABSTRACT_IDS.every(id =>
            watchedVideos.includes(id) || completedExercises[id]?.completed
        );
        if (allDone) {
            completeStage(STAGE_IDS.A_STAGE);
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
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'División Inexacta' }} pageId="div-inexacta-concepto-abstracto">
            <div className="w-full">
                <div className="relative ml-2 flex items-start">
                    <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#be90de] dark:bg-purple-900" style={{ borderColor: '#be90de' }}>
                        A {completedStages.includes(STAGE_IDS.A_STAGE) && <span className="ml-1 text-[#7c3aed]">✓</span>}
                    </div>
                    <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-5 bg-white dark:bg-gray-800 border-[#be90de] dark:border-purple-900">
                        {/* --- STAGE A: ABSTRACTO --- */}
                        <div className="mt-4 space-y-6">

                            {/* Intro text */}
                            <div>
                                <div className="flex items-start gap-2">
                                    <p className="text-base font-semibold text-gray-800 dark:text-gray-200 leading-relaxed">
                                        Según la actividad anterior, las <span className="font-extrabold text-2xl">17</span> medallas en <span className="font-extrabold text-2xl text-purple-700">3</span> grupos de deportistas,
                                        cada grupo recibe la misma cantidad, pero hay resto <span className="font-bold text-2xl text-[#e95352]">2</span> medallas; estas
                                        corresponden al resto de la división. <PlayVideoButton trackingId={VIDEO_TRACKING.A_INTRO} title="" videoId="/pag12/vv-1" />
                                    </p>

                                </div>
                            </div>

                            {/* Math notation */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <p className="text-base font-semibold text-gray-800 dark:text-gray-200">Se escribe matemáticamente como:</p>
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_MATH} title="Notación Matemática" videoId="/pag12/vv-2" />
                                </div>

                                <div className="flex justify-center my-8 pl-8">
                                    <img
                                        className="h-12 object-contain"
                                        src="/division_inexacta/img1.png"
                                        draggable={false}
                                    />
                                </div>
                            </div>

                            {/* Señala "resto 2" como: */}
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <p className="text-base font-semibold text-gray-800 dark:text-gray-200">Señala &quot;<span className="text-red-500">resto 2</span>&quot; como:</p>
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_COMO} title="" videoId="/pag12/vv-3" />
                                </div>

                                <div className="flex justify-center my-8 pl-12">
                                    <img
                                        className="h-48 object-contain"
                                        src="/division_inexacta/img2.png"
                                        draggable={false}
                                    />
                                </div>
                            </div>

                            {/* Definition */}
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_DEF} title="¿Qué es una división inexacta?" videoId="/pag12/vv-4" />
                                    <span className="bg-[#e95352] text-white font-bold px-3 py-1 rounded text-sm">¿Qué es una división inexacta?</span>
                                </div>
                                <p className="text-base font-semibold text-gray-800 dark:text-gray-200 mt-2">
                                    Una división es <span className="text-[#e95352] font-bold">inexacta</span> cuando su resto es diferente de cero, es decir, hay resto.
                                </p>
                            </div>

                            {/* PARTES DE LA DIVISIÓN */}
                            <div className="mt-8 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
                                <div className="flex items-center justify-center gap-4 mb-6">
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_PARTES} title="" videoId="/pag12/vv-5" />
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white tracking-wide uppercase">
                                        Partes de la División
                                    </h3>
                                </div>

                                <div className="flex my-8 pl-40">
                                    <img
                                        className="h-42 object-contain"
                                        src="/division_inexacta/img3.png"
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
