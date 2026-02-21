'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useRef } from 'react';
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
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        A_INTRO: 'div-inexacta-a-intro',
        A_MATH: 'div-inexacta-a-math',
        A_COMO: 'div-inexacta-a-como',
        A_DEF: 'div-inexacta-a-def',
        A_PARTES: 'div-inexacta-a-partes',
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

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'División Inexacta' }} pageId="div-inexacta-concepto-procesual">
            <div className="w-full">
                <div className="relative ml-2 flex items-start">
                    <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#be90de] dark:bg-purple-900" style={{ borderColor: '#be90de' }}>
                        A
                    </div>
                    <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-5 bg-white dark:bg-gray-800 border-[#be90de] dark:border-purple-900">

                        <div className="mt-4 space-y-6">

                            {/* Intro text */}
                            <div>
                                <div className="flex items-start gap-2">
                                    <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                                        Según la actividad anterior, las <span className="font-bold text-lg">17</span> medallas en <span className="font-bold text-lg text-red-600">3</span> grupos de deportistas,
                                        cada grupo recibe la misma cantidad, pero hay resto <span className="font-bold text-lg text-red-600">2</span> medallas; estas
                                        corresponden al resto de la división.
                                    </p>
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_INTRO} title="" videoId="/pag12/vv-1" />
                                </div>
                            </div>

                            {/* Math notation */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <p className="text-base text-gray-800 dark:text-gray-200">Se escribe matemáticamente como:</p>
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_MATH} title="Notación Matemática" videoId="/pag12/vv-2" />
                                </div>

                                <div className="text-center my-4">
                                    <span className="text-5xl font-black text-gray-900 dark:text-white">17</span>
                                    <span className="text-4xl font-bold text-gray-500 mx-3">÷</span>
                                    <span className="text-5xl font-black text-red-600">3</span>
                                    <span className="text-4xl font-bold text-gray-500 mx-3">=</span>
                                    <span className="text-5xl font-black text-green-600">5</span>
                                    <span className="text-3xl text-gray-500 dark:text-gray-400 ml-3">resto</span>
                                    <span className="text-5xl font-black text-red-600 ml-2">2</span>
                                </div>
                            </div>

                            {/* Señala "resto 2" como: */}
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <p className="text-base text-gray-800 dark:text-gray-200">Señala &quot;<span className="text-red-500">resto 2</span>&quot; como:</p>
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_COMO} title="" videoId="/pag12/vv-3" />
                                </div>

                                <DivisionAlgorithm
                                    dividend={17} divisor={3} quotient={5} subtract={15} remainder={2}
                                    multTable={[
                                        { mult: 1, result: 3 }, { mult: 2, result: 6 }, { mult: 3, result: 9 },
                                        { mult: 4, result: 12 }, { mult: 5, result: 15 }, { mult: 6, result: 18 },
                                    ]}
                                />
                            </div>

                            {/* Definition */}
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_DEF} title="¿Qué es una división inexacta?" videoId="/pag12/vv-4" />
                                    <span className="bg-purple-600 text-white font-bold px-3 py-1 rounded text-sm">¿Qué es una división inexacta?</span>
                                </div>
                                <p className="text-base text-gray-800 dark:text-gray-200 mt-2">
                                    Una división es <span className="text-orange-500 font-bold">inexacta</span> cuando su resto es diferente de cero, es decir, hay resto.
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

                                <div className="flex justify-center">
                                    <div className="relative">
                                        {/* Main algorithm layout: 149 | 12 → quotient 12, remainder 05 */}
                                        <div className="flex gap-1 font-mono items-start">
                                            {/* Left side: dividend, subtraction steps, remainder */}
                                            <div className="flex flex-col items-end">
                                                {/* 149 - Dividendo */}
                                                <div className="h-12 flex items-center justify-end text-4xl font-black text-gray-900 dark:text-white px-2">
                                                    149
                                                </div>
                                                {/* -12 (first subtraction) */}
                                                <div className="relative h-12 flex items-center justify-end text-4xl font-black text-red-600 px-8">
                                                    <span className="absolute -left-7 top-2 text-3xl text-gray-400 dark:text-gray-500 font-bold select-none">−</span>
                                                    12
                                                </div>
                                                <div className="w-24 h-1 bg-gray-800 dark:bg-gray-300 rounded-full"></div>
                                                {/* 29 (intermediate result) */}
                                                <div className="h-12 flex items-center justify-end text-4xl font-black text-gray-900 dark:text-white px-4">
                                                    29
                                                </div>
                                                {/* 24 (second subtraction, shown in orange) */}
                                                <div className="h-12 flex items-center justify-end text-4xl font-black text-orange-500 px-4">
                                                    24
                                                </div>
                                                <div className="w-24 h-1 bg-gray-800 dark:bg-gray-300 rounded-full"></div>
                                                {/* 05 remainder - aligned below 24 */}
                                                <div className="relative h-12 flex items-center justify-end text-4xl font-black text-orange-500 px-4">
                                                    05
                                                    {/* Arrow + "Hay resto 5" to the right */}
                                                    <div className="absolute left-full ml-3 flex items-center gap-2 top-1/2 -translate-y-1/2">
                                                        <svg className="w-8 h-5 text-orange-500 flex-shrink-0" fill="none" viewBox="0 0 24 12" stroke="currentColor" strokeWidth={2}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2 6h18m-4-4l4 4-4 4" />
                                                        </svg>
                                                        <span className="text-lg font-bold text-orange-500 whitespace-nowrap">Hay resto 5</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right side: divisor + quotient */}
                                            <div className="flex flex-col">
                                                <div className="border-l-4 border-b-4 border-gray-800 dark:border-gray-300 pl-4 pb-2 mb-2 h-14 flex items-center">
                                                    <span className="text-4xl font-black text-gray-900 dark:text-white">12</span>
                                                </div>
                                                <div className="pl-4 h-12 flex items-center">
                                                    <span className="text-4xl font-black text-gray-900 dark:text-white">12</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Labels with arrows */}
                                        {/* Dividendo label - left of 149 */}
                                        <div className="absolute -left-40 top-1 flex items-center gap-2">
                                            <span className="text-base font-bold text-gray-900 dark:text-white whitespace-nowrap py-2">Dividendo</span>
                                            <svg className="w-8 h-5 text-gray-900 dark:text-white flex-shrink-0" fill="none" viewBox="0 0 24 12" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M22 6H4m4-4L4 6l4 4" />
                                            </svg>
                                        </div>

                                        {/* Divisor label - right of 12 (divisor) */}
                                        <div className="absolute -right-32 top-1 flex items-center gap-2">
                                            <svg className="w-8 h-5 text-blue-600 flex-shrink-0" fill="none" viewBox="0 0 24 12" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2 6h18m-4-4l4 4-4 4" />
                                            </svg>
                                            <span className="text-base font-bold text-blue-600 whitespace-nowrap">Divisor</span>
                                        </div>

                                        {/* Cociente label - centered with quotient 12 row */}
                                        <div className="absolute -right-36 top-20 flex items-center gap-2 ">
                                            <svg className="w-8 h-5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 12" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2 6h18m-4-4l4 4-4 4" />
                                            </svg>
                                            <span className="text-base font-bold text-green-600 whitespace-nowrap">Cociente</span>
                                        </div>
                                    </div>
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
