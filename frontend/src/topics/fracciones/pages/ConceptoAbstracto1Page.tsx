'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useRef, useState } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import Image from 'next/image';
import cuadriculaImg from '../cuadricula.png';

interface Props { zoom?: number; }

//PAGINA 2 ABSTRACTO
export function ConceptoAbstracto1Page({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched, completeStage, watchedVideos, completedExercises, completedStages } = useVideoProgress();

    const VIDEO_TRACKING = {
        A_INTRO: 'fracciones-pag18-v1',
        A_DEF: 'fracciones-pag18-v3',
        A_PARTS: 'fracciones-pag18-v7',
        A_ERROR: 'fracciones-pag18-v8',
        A_EXAMPLE: 'fracciones-pag18-v9',
    };

    const STAGE_IDS = {
        A_STAGE: 'fracciones-a-stage'
    };

    const ABSTRACT_IDS = [
        'fracciones-pag18-v1', 'fracciones-pag18-v3', 'fracciones-pag18-v4',
        'fracciones-pag18-v5', 'fracciones-pag18-v6', 'fracciones-pag18-v7',
        'fracciones-pag18-v8', 'fracciones-pag18-v9'
    ];

    React.useEffect(() => {
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

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones' }} pageId="fracciones-concepto-abstracto-1">
            <div className="relative ml-2 flex items-start">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#be90de]" style={{ borderColor: '#be90de' }}>
                    A {completedStages.includes(STAGE_IDS.A_STAGE) && <span className="ml-1 text-[#7c3aed]">✓</span>}
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 bg-white border-[#be90de]">

                    <div className="space-y-6 pb-8">

                        {/* 1. Connection to previous activity */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <p className="text-gray-800 text-base leading-relaxed font-semibold">
                                    De acuerdo con la actividad anterior, la pizza se corta en <span className="font-extrabold text-purple-600 text-2xl">8</span> porciones. Los tres
                                    clientes comen 3 porciones. Se quedan <span className="font-extrabold text-orange-500 text-2xl">5</span> porciones. Su fracción se expresa como <span className="inline-block align-middle ml-2">
                                        <PlayVideoButton trackingId={VIDEO_TRACKING.A_INTRO} title="Introducción a la fracción" videoId="/pag18/vv-1" /></span>
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <p className="font-semibold text-base text-gray-800">La <span className="text-[#e95352]">fracción</span> se representa cómo</p>
                            </div>

                            <div className="flex justify-center my-8 pl-8">
                                <img
                                    className="h-32 object-contain"
                                    src="/fracciones/img1.png"
                                    draggable={false}
                                />
                            </div>
                        </div>

                        {/* 2. Definition */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 my-8">
                                <PlayVideoButton trackingId={VIDEO_TRACKING.A_DEF} title="¿Qué es una fracción?" videoId="/pag18/vv-3" />
                                <span className="bg-[#e95352] text-white font-bold px-3 py-1 rounded text-base">
                                    <span className="transform">¿Qué es una fracción?</span>
                                </span>
                            </div>

                            <div className="pl-14 space-y-8">
                                <p className="text-base font-semibold text-gray-800">
                                    Un <span className="text-[#e95352] font-bold">fracción</span> representa una o varias partes iguales de un todo.
                                </p>

                                <div className="flex items-center gap-8">
                                    <p className="text-base font-semibold text-gray-800">Se escribe de la forma:</p>
                                </div>
                                <div className="flex justify-center">
                                    <img
                                        className="h-24 object-contain"
                                        src="/fracciones/img2.png"
                                        draggable={false}
                                    />
                                </div>
                                <p className="text-base font-semibold text-gray-800 leading-relaxed max-w-3xl">
                                    donde <span className="font-bold text-[#3703d4] text-2xl">a</span> y <span className="font-bold text-[#9704ae] text-2xl">b</span> son números naturales, <span className="font-bold text-[#9704ae] text-2xl">b</span> es siempre diferente de cero, <span className="font-bold text-[#9704ae] text-2xl">b ≠ 0</span>. <span className="inline-block align-middle ml-2">
                                        <PlayVideoButton trackingId="fracciones-pag18-v4" title="" videoId="/pag18/vv-4 (add)" /></span>
                                </p>
                            </div>
                        </div>

                        {/* 3. Parts of a Fraction */}
                        <div className="flex flex-col items-center space-y-6">
                            <div className="flex items-center gap-4 border-b-2 border-gray-200 pb-2">
                                <PlayVideoButton trackingId={VIDEO_TRACKING.A_PARTS} title="" videoId="/pag18/vv-5" />
                                <h3 className="text-xl font-black text-black uppercase tracking-widest">Partes de la Fracción</h3>
                            </div>
                            <div className="flex justify-center pl-24">
                                <img
                                    className="h-24 object-contain"
                                    src="/fracciones/img3.png"
                                    draggable={false}
                                />
                            </div>


                            <div className="w-full pl-6 space-y-4 max-w-4xl">
                                <p className="text-base font-bold text-gray-800 mb-2">¿Qué significa?</p>

                                <div className="flex items-start gap-3">
                                    <div className="w-4 h-4 bg-[#3703d4] mt-1.5 flex-shrink-0"></div>
                                    <p className="text-base font-semibold text-gray-800">
                                        <span className="font-extrabold text-[#3703d4]">Numerador:</span> representa un número de partes que se toman.
                                        <PlayVideoButton trackingId={VIDEO_TRACKING.A_PARTS} title="Numerador" videoId="/pag18/vv-6" />
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-4 h-4 bg-[#9704ae] mt-1.5 flex-shrink-0"></div>
                                    <div className="flex-1">
                                        <p className="text-base font-semibold text-gray-800">
                                            <span className="font-extrabold text-[#9704ae]">Denominador:</span> representa en cuántas partes iguales se divide el todo.
                                            <PlayVideoButton trackingId={VIDEO_TRACKING.A_PARTS} title="Denominador" videoId="/pag18/vv-7" />
                                        </p>
                                    </div>
                                </div>

                                <p className="text-base font-semibold pt-2">
                                    <span className="font-bold text-[#e95352]">NOTA:</span> El denominador siempre es un número distinto de cero.
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_ERROR} title="Nota:" videoId="/pag18/vv-8" />
                                </p>
                            </div>
                        </div>

                        {/* 4. Example 4/6 */}
                        <div className="flex flex-col gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm mt-4">
                            {/* Top Row: Text and Fraction in one line */}
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 w-full">
                                <div className="flex items-center gap-2">
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_EXAMPLE} title="Ejemplo" videoId="/pag18/vv-9" />
                                    <span className="bg-green-600 text-white px-3 py-1 font-bold rounded shadow-sm text-base">
                                        Ejemplo:
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-base font-semibold text-gray-800 whitespace-nowrap">
                                    <span>La fracción</span>
                                    <div className="inline-flex flex-col items-center mx-1 align-middle">
                                        <span className="text-xl font-bold leading-none">4</span>
                                        <div className="w-6 h-0.5 bg-black my-0.5"></div>
                                        <span className="text-xl font-bold leading-none">6</span>
                                    </div>
                                    <span>se representa como:</span>
                                </div>
                            </div>

                            {/* Bottom Row: Image */}
                            <div className="relative flex justify-center mt-2">
                                <Image
                                    src={cuadriculaImg}
                                    alt="Representación gráfica 4/6"
                                    className="h-32 w-auto object-contain"
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
