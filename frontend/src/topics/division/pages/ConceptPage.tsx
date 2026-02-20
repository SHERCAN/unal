'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { VIDEO_IDS } from '@/config/videos';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface DivisionConceptPageProps {
    zoom?: number;
}

export function ConceptPage({ zoom = 1 }: DivisionConceptPageProps) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    // Define tracking IDs for videos
    const VIDEO_TRACKING_IDS = {
        INTRO: 'division-concept-intro',
        NOTATION: 'division-concept-notation',
        MATH_NOTATION: 'division-concept-math-notation',
        MEANING: 'division-concept-meaning',
        DEFINITION: 'division-concept-definition',
        COMPONENTS: 'division-concept-components',
        DIVIDEND: 'division-concept-dividend',
    };

    /* videoModal list removed */

    /* ref removed */

    /* handleVideoComplete removed */

    /* openVideo removed */

    /* PlayButton definition removed */

    return (
        <BookPageContainer
            zoom={zoom}
            moduleHeader={{
                icon: '/division-icon.png',
                name: 'División'
            }}
            pageId="division-concept-new"
        >
            <div className="relative ml-2 flex items-start h-full">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center" style={{ backgroundColor: '#be90de' }}>
                    A
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 h-full flex flex-col" style={{ borderColor: '#be90de' }}>
                    <div className="w-full flex-1 flex flex-col overflow-y-auto gap-6 px-2">

                        {/* Intro Text */}
                        <div className="flex items-start flex-wrap gap-2 text-gray-800 dark:text-gray-200 font-medium" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                            <p>
                                El total de <span className="font-bold text-orange-500">24</span> naranjas se reparte en <span className="font-bold text-green-600">4</span> cajas. Entonces, cada caja tiene <span className="font-bold text-purple-600">6</span> naranjas.
                            </p>
                            <PlayVideoButton trackingId={VIDEO_TRACKING_IDS.INTRO} title="Introducción" videoId="/pag1/vv-1" />
                        </div>

                        {/* Writing Division */}
                        <div>
                            <div className="flex items-center gap-2 mb-4 text-gray-800 dark:text-gray-200 font-medium" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                                <p>Dividir <span className="font-bold text-orange-500">24</span> entre <span className="font-bold text-green-600">4</span>, se escribe así:</p>
                                <PlayVideoButton trackingId={VIDEO_TRACKING_IDS.NOTATION} title="Notación de división" videoId="/pag1/vv-2" />
                            </div>

                            {/* Visualization: Bracket & Multiplication Table */}
                            <div className="flex items-center justify-center gap-12 sm:gap-24 flex-wrap">
                                {/* Division Bracket */}
                                <div className="flex items-baseline">
                                    <span className="font-black text-orange-500 pr-4 py-2 block leading-none" style={{ fontSize: 'clamp(2.5rem, 6vmin, 3.5rem)' }}>24</span>
                                    <div className="flex flex-col">
                                        <div className="border-l-4 border-b-4 border-gray-400 pl-4 py-2 text-center">
                                            <span className="font-black text-green-600 block leading-none" style={{ fontSize: 'clamp(2.5rem, 6vmin, 3.5rem)' }}>4</span>
                                        </div>
                                        <div className="pl-4 pt-2 text-center">
                                            <span className="font-black text-purple-600 block leading-none" style={{ fontSize: 'clamp(2.5rem, 6vmin, 3.5rem)' }}>6</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Multiplication Table */}
                                <div className="border-l-2 border-gray-300 pl-6 space-y-1 font-bold text-gray-600 dark:text-gray-400" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                                    <p><span className="text-green-600">4</span> × 1 = 4</p>
                                    <p><span className="text-green-600">4</span> × 2 = 8</p>
                                    <p><span className="text-green-600">4</span> × 3 = 12</p>
                                    <p><span className="text-green-600">4</span> × 4 = 16</p>
                                    <p><span className="text-green-600">4</span> × 5 = 20</p>
                                    <p><span className="text-green-600">4</span> × <span className="text-purple-600">6</span> = <span className="text-orange-500">24</span></p>
                                </div>
                            </div>
                        </div>

                        {/* Math Notation */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-medium text-center" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                                <p>En la notación matemática, la división se representa así:</p>
                                <PlayVideoButton trackingId={VIDEO_TRACKING_IDS.MATH_NOTATION} title="Representación matemática" videoId="/pag1/vv-1" />
                            </div>
                            <div className="flex items-center gap-4 text-gray-800 dark:text-gray-200 font-black" style={{ fontSize: 'clamp(2rem, 5vmin, 3rem)' }}>
                                <span className="text-orange-500">24</span>
                                <span className="text-gray-500">÷</span>
                                <span className="text-green-600">4</span>
                                <span className="text-gray-500">=</span>
                                <span className="text-purple-600">6</span>
                            </div>
                        </div>

                        {/* Meaning of Numbers */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <PlayVideoButton trackingId={VIDEO_TRACKING_IDS.MEANING} title="Significado de los números" videoId="/pag1/vv-1" />
                                <p className="text-gray-800 dark:text-gray-200 font-medium" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                                    El significado de los números dice que
                                </p>
                            </div>
                            <ul className="list-none space-y-2 pl-8 text-gray-800 dark:text-gray-200" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                                <li className="flex items-center gap-3">
                                    <span className="w-3 h-3 bg-black dark:bg-white inline-block flex-shrink-0"></span>
                                    <span><span className="font-bold text-orange-500">24</span> es el total de naranjas.</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-3 h-3 bg-black dark:bg-white inline-block flex-shrink-0"></span>
                                    <span><span className="font-bold text-green-600">4</span> es el número de cajas.</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-3 h-3 bg-black dark:bg-white inline-block flex-shrink-0"></span>
                                    <span><span className="font-bold text-purple-600">6</span> es la cantidad de naranjas en cada caja.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Definition Box */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <PlayVideoButton trackingId={VIDEO_TRACKING_IDS.DEFINITION} title="¿Qué es una división?" videoId="/pag1/vv-1" />
                                <div className="bg-red-500 text-white px-3 py-1 font-bold rounded-sm shadow-sm" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                                    ¿Qué es una división?
                                </div>
                            </div>

                            <p className="text-gray-800 dark:text-gray-200" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                                Una <span className="text-red-500 font-bold">división</span> es repartir, distribuir o compartir algo de forma equitativa, es decir, en partes iguales.
                            </p>

                            <div className="border border-red-300 rounded-lg p-4 bg-white dark:bg-gray-800/50 text-center shadow-sm max-w-lg mx-auto w-full">
                                <p className="font-bold text-gray-900 dark:text-white mb-2 text-center" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                                    Forma general de la división:
                                </p>
                                <p className="font-black" style={{ fontSize: 'clamp(1.5rem, 4vmin, 2.5rem)' }}>
                                    A ÷ B = C
                                </p>
                            </div>
                        </div>

                        {/* Components Explanation */}
                        <div className="space-y-3 pb-4">
                            <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-bold" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                                <p>Pero, ¿qué son letras A, B y C?</p>
                                <PlayVideoButton trackingId={VIDEO_TRACKING_IDS.COMPONENTS} title="Componentes A, B, C" videoId="/pag1/vv-1" />
                            </div>

                            <p className="text-gray-800 dark:text-gray-200" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                                Vamos a entender paso a paso.
                            </p>

                            <div className="flex items-start gap-3 text-gray-800 dark:text-gray-200" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                                <span className="w-3 h-3 bg-red-500 mt-2 flex-shrink-0 inline-block"></span>
                                <div className="flex-1">
                                    <div className="flex items-center flex-wrap gap-2">
                                        <p>
                                            <span className="font-bold">A</span> <span className="mx-1">→</span> <span className="italic font-bold">el total (dividendo).</span> Es la cantidad completa que queremos repartir o el número que vamos a dividir.
                                        </p>
                                        <PlayVideoButton trackingId={VIDEO_TRACKING_IDS.DIVIDEND} title="El Dividendo" videoId="/pag1/vv-1" />
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


