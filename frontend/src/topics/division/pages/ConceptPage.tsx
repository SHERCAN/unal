'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useEffect } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { VIDEO_IDS } from '@/config/videos';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface DivisionConceptPageProps {
    zoom?: number;
}
//PAGINA 2 ABSTRACTO
export function ConceptPage({ zoom = 1 }: DivisionConceptPageProps) {
    const { isVideoWatched, markVideoWatched, completeStage, watchedVideos, completedExercises, isExerciseCompleted, completedStages } = useVideoProgress();

    // Define tracking IDs for videos
    const VIDEO_TRACKING_IDS = {
        INTRO: 'division-pag2-v1',
        NOTATION: 'division-pag2-v2',
        MATH_NOTATION: 'division-pag2-v3',
        MEANING: 'division-pag2-v4',
        DEFINITION: 'division-pag2-v5',
        COMPONENTS: 'division-pag2-v6',
        DIVIDEND: 'division-pag2-v7',
    };

    const ABSTRACT_IDS = [
        // Page 2 Videos
        'division-pag2-v1', 'division-pag2-v2', 'division-pag2-v3', 'division-pag2-v4',
        'division-pag2-v5', 'division-pag2-v6', 'division-pag2-v7',
        // Page 3 Videos
        'division-pag3-v1', 'division-pag3-v2', 'division-pag3-v3', 'division-pag3-v4',
        // Page 4 Videos
        'division-pag4-v1', 'division-pag4-v2', 'division-pag4-v3', 'division-pag4-v4',
        // Page 4 Exercises
        'division-pag4-ej1', 'division-pag4-ej2', 'division-pag4-ej3', 'division-pag4-ej4'
    ];

    useEffect(() => {
        const allDone = ABSTRACT_IDS.every(id =>
            watchedVideos.includes(id) || completedExercises[id]?.completed
        );
        if (allDone) {
            completeStage('division-a-stage');
        }
    }, [watchedVideos, completedExercises]);

    /* videoModal list removed */

    /* ref removed */

    /* handleVideoComplete removed */

    /* openVideo removed */

    /* PlayButton definition removed */

    return (
        <BookPageContainer
            zoom={zoom}
            moduleHeader={{
                // icon: '/division-icon.png',
                name: 'División'
            }}
            pageId="division-pag9"
        >
            <div className="relative ml-2 flex items-start h-full">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#be90de] dark:bg-purple-900">
                    A {completedStages.includes('division-a-stage') && <span className="ml-1 text-[#7c3aed]">✓</span>}
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 h-full flex flex-col" style={{ borderColor: '#be90de' }}>
                    <div className="w-full flex-1 flex flex-col overflow-y-auto gap-6 px-2">

                        {/* Intro Text */}
                        <div className="flex items-start flex-wrap gap-2 text-gray-800 dark:text-gray-200 font-semibold" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                            <p>
                                El total de <span className="font-bold text-orange-500" style={{ fontSize: '20px' }}>24</span> naranjas se reparte en <span className="font-bold text-green-600" style={{ fontSize: '20px' }}>4</span> cajas. Entonces, cada caja tiene <span className="font-bold text-purple-600" style={{ fontSize: '20px' }}>6</span> naranjas.

                                <PlayVideoButton trackingId={VIDEO_TRACKING_IDS.INTRO} title="" videoId="/pag2/vv-1" />
                            </p>
                        </div>

                        {/* Writing Division */}
                        <div>
                            <div className="flex items-center gap-2 mb-4 text-gray-800 dark:text-gray-200 font-semibold" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                                <p>Dividir <span className="font-bold text-orange-500" style={{ fontSize: '20px' }}>24</span> entre <span className="font-bold text-green-600" style={{ fontSize: '20px' }}>4</span>, se escribe así:</p>
                                <PlayVideoButton trackingId={VIDEO_TRACKING_IDS.NOTATION} title="Notación de división" videoId="/pag2/vv-2" />
                            </div>

                            <div className='flex justify-center'>
                                <img
                                    src="/division/img division.png"
                                    className="h-48 object-contain"
                                    draggable={false}
                                />
                            </div>
                        </div>

                        {/* Math Notation */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-semibold" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                                <p>En la notación matemática, la división se representa así:</p>
                                <PlayVideoButton trackingId={VIDEO_TRACKING_IDS.MATH_NOTATION} title="Representación matemática" videoId="/pag2/vv-3" />
                            </div>
                            <div className='flex justify-center'>
                                <img
                                    src="/division/img2.png"
                                    className="h-16 object-contain"
                                    draggable={false}
                                />
                            </div>
                        </div>

                        {/* Meaning of Numbers */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <PlayVideoButton trackingId={VIDEO_TRACKING_IDS.MEANING} title="Significado de los números" videoId="/pag2/vv-4" />
                                <p className="text-gray-800 dark:text-gray-200 font-semibold " style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                                    El significado de los números dice que
                                </p>
                            </div>
                            <ul className="list-none space-y-2 pl-8 text-gray-800 dark:text-gray-200 font-semibold" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                                <li className="flex items-center gap-3">
                                    <span className="w-3 h-3 bg-black dark:bg-white inline-block flex-shrink-0"></span>
                                    <span><span className="font-extrabold text-orange-500" style={{ fontSize: '20px' }}>24</span>  es el total de naranjas.</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-3 h-3 bg-black dark:bg-white inline-block flex-shrink-0"></span>
                                    <span><span className="font-extrabold text-green-600" style={{ fontSize: '20px' }}>4</span>  es el número de cajas.</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="w-3 h-3 bg-black dark:bg-white inline-block flex-shrink-0"></span>
                                    <span><span className="font-extrabold text-purple-600" style={{ fontSize: '20px' }}>6</span>  es la cantidad de naranjas en cada caja.</span>
                                </li>
                            </ul>
                        </div>

                        {/* Definition Box */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <PlayVideoButton trackingId={VIDEO_TRACKING_IDS.DEFINITION} title="¿Qué es una división?" videoId="/pag2/vv-5" />
                                <div className="bg-red-500 text-white px-3 py-1 font-bold rounded-sm shadow-sm" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                                    ¿Qué es una división?
                                </div>
                            </div>

                            <p className="text-gray-800 dark:text-gray-200 font-semibold" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                                Una <span className="text-red-500 font-bold">división</span> es repartir, distribuir o compartir algo de forma equitativa, es decir, en partes iguales.
                            </p>
                            <div className='flex justify-center'>
                                <img
                                    src="/division/img3.png"
                                    className="h-24 object-contain"
                                    draggable={false}
                                />
                            </div>
                        </div>

                        {/* Components Explanation */}
                        <div className="space-y-3 pb-4">
                            <div className="flex items-center gap-2 text-gray-800 dark:text-gray-200 font-bold" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                                <p>Pero, ¿qué son letras <span className='font-black'>A</span>, <span className='font-black'>B</span> y <span className='font-black'>C</span>?</p>
                                <PlayVideoButton trackingId={VIDEO_TRACKING_IDS.COMPONENTS} title="Componentes A, B, C" videoId="/pag2/vv-6" />
                            </div>

                            <p className="text-gray-800 dark:text-gray-200 font-semibold" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                                Vamos a entender paso a paso.
                            </p>

                            <div className="flex items-start gap-3 text-gray-800 dark:text-gray-200" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                                <span className="w-3 h-3 bg-red-500 mt-2 flex-shrink-0 inline-block"></span>
                                <div className="flex-1">
                                    <div className="flex items-center flex-wrap gap-2">
                                        <p>
                                            <span className="font-bold">A</span> <span className="mx-1">→</span> <span className="italic font-bold">el total (dividendo).</span> <span className='font-semibold'>Es la cantidad completa que queremos repartir o el número que vamos a dividir.</span>
                                            <PlayVideoButton trackingId={VIDEO_TRACKING_IDS.DIVIDEND} title="El Dividendo" videoId="/pag2/vv-7" />
                                        </p>
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


