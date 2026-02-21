'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useRef, useState } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import Image from 'next/image';
import cuadriculaImg from '../cuadricula.png';

interface Props { zoom?: number; }

export function ConceptoAbstracto1Page({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        A_INTRO: 'fracciones-a-intro',
        A_DEF: 'fracciones-a-def',
        A_PARTS: 'fracciones-a-parts',
        A_ERROR: 'fracciones-a-error',
        A_EXAMPLE: 'fracciones-a-example',
    };

    /* videoModal list removed */
    /* ref removed */

    /* handleVideoComplete removed */

    /* openVideo removed */

    /* PlayButton definition removed */

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones' }} pageId="fracciones-concepto-abstracto-1">
            <div className="relative ml-2 flex items-start">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#be90de]" style={{ borderColor: '#be90de' }}>
                    A
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 bg-white border-[#be90de]">

                    <div className="space-y-6 pb-8">

                        {/* 1. Connection to previous activity */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <p className="text-gray-800 text-lg leading-relaxed font-medium">
                                    De acuerdo con la actividad anterior, la pizza se corta en <span className="font-bold text-purple-600 text-xl">8</span> porciones. Los tres
                                    clientes comen 3 porciones. Se quedan <span className="font-bold text-orange-500 text-xl">5</span> porciones. Su fracción se expresa como
                                </p>
                            </div>

                            <div className="flex items-center gap-4">
                                <PlayVideoButton trackingId={VIDEO_TRACKING.A_INTRO} title="Introducción a la fracción" videoId="/pag18/vv-2" />
                                <p className="font-bold text-gray-700">La <span className="text-red-500">fracción</span> se representa cómo</p>
                            </div>

                            {/* 5/8 Visualization */}
                            <div className="flex flex-col items-center justify-center gap-2 py-4">
                                <div className="flex items-center gap-6 w-full max-w-xl">
                                    {/* Numbers Column */}
                                    <div className="flex flex-col items-center">
                                        <span className="text-6xl font-bold text-orange-400">5</span>
                                        <div className="w-24 h-1 bg-black my-2 rounded-full"></div>
                                        <span className="text-6xl font-bold text-purple-600">8</span>
                                    </div>

                                    {/* Arrows and Labels Column */}
                                    <div className="flex flex-col justify-between h-40 flex-1">
                                        <div className="flex items-center gap-3">
                                            <div className="h-0.5 bg-orange-400 w-24 relative">
                                                <div className="absolute right-0 -top-1.5 w-3 h-3 border-t-2 border-r-2 border-orange-400 transform rotate-45"></div>
                                            </div>
                                            <span className="text-orange-500 font-bold text-lg uppercase tracking-wide">Quedan Porciones</span>
                                        </div>
                                        <div className="flex items-center gap-3 mt-auto">
                                            <div className="h-0.5 bg-purple-600 w-24 relative">
                                                <div className="absolute right-0 -top-1.5 w-3 h-3 border-t-2 border-r-2 border-purple-600 transform rotate-45"></div>
                                            </div>
                                            <span className="text-purple-600 font-bold text-lg uppercase tracking-wide leading-tight">Total de Porciones<br />Iguales de Pizza</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Definition */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <PlayVideoButton trackingId={VIDEO_TRACKING.A_DEF} title="¿Qué es una fracción?" videoId="/pag18/vv-3" />
                                <span className="bg-red-500 text-white px-4 py-1 font-bold text-lg shadow-sm transform -skew-x-12">
                                    <span className="transform skew-x-12 inline-block">¿Qué es una fracción?</span>
                                </span>
                            </div>

                            <div className="pl-14 space-y-8">
                                <p className="text-xl text-gray-800">
                                    Un <span className="text-red-500 font-bold">fracción</span> representa una o varias partes iguales de un todo.
                                </p>

                                <div className="flex items-center gap-8">
                                    <p className="text-xl text-gray-800">Se escribe de la forma:</p>
                                    <div className="flex flex-col items-center px-6">
                                        <span className="text-6xl font-bold text-blue-700">a</span>
                                        <div className="w-20 h-1.5 bg-black my-1 rounded-full"></div>
                                        <span className="text-6xl font-bold text-purple-700">b</span>
                                    </div>
                                </div>

                                <p className="text-lg text-gray-800 leading-relaxed max-w-3xl">
                                    donde <span className="font-bold text-blue-700 text-2xl">a</span> y <span className="font-bold text-purple-700 text-2xl">b</span> son números naturales, <span className="font-bold text-purple-700 text-2xl">b</span> es siempre diferente de cero <span className="font-bold text-purple-700 text-2xl">b ≠ 0</span>.
                                </p>
                            </div>
                        </div>

                        {/* 3. Parts of a Fraction */}
                        <div className="flex flex-col items-center space-y-6">
                            <h3 className="text-xl font-bold text-black uppercase tracking-widest border-b-2 border-gray-200 pb-2">Partes de la Fracción</h3>

                            <div className="flex items-center gap-12 w-full max-w-lg">
                                <div className="flex flex-col items-center gap-4">
                                    <span className="text-6xl font-bold text-blue-700">a</span>
                                    <div className="h-1 bg-black w-24"></div>
                                    <span className="text-6xl font-bold text-purple-700">b</span>
                                </div>

                                <div className="flex flex-col justify-between h-48 py-4 flex-1">
                                    <div className="flex items-center gap-4">
                                        <div className="h-0.5 bg-blue-600 w-24 relative">
                                            <div className="absolute right-0 -top-1.5 w-3 h-3 border-t-2 border-r-2 border-blue-600 transform rotate-45"></div>
                                        </div>
                                        <span className="text-blue-700 font-black text-2xl">Numerador</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="h-0.5 bg-purple-600 w-24 relative">
                                            <div className="absolute right-0 -top-1.5 w-3 h-3 border-t-2 border-r-2 border-purple-600 transform rotate-45"></div>
                                        </div>
                                        <span className="text-purple-700 font-black text-2xl">Denominador</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full pl-6 space-y-4 max-w-4xl">
                                <p className="text-lg font-bold text-gray-800 mb-2">¿Qué significa?</p>

                                <div className="flex items-start gap-3">
                                    <div className="w-4 h-4 bg-blue-600 mt-1.5 flex-shrink-0"></div>
                                    <p className="text-lg text-gray-800">
                                        <span className="font-bold text-blue-700">Numerador:</span> representa un número de partes que se toman.
                                        <PlayVideoButton trackingId={VIDEO_TRACKING.A_PARTS} title="Numerador" videoId="/pag18/vv-6" />
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-4 h-4 bg-purple-600 mt-1.5 flex-shrink-0"></div>
                                    <div className="flex-1">
                                        <p className="text-lg text-gray-800">
                                            <span className="font-bold text-purple-700">Denominador:</span> representa en cuántas partes iguales se divide el todo.
                                            <PlayVideoButton trackingId={VIDEO_TRACKING.A_PARTS} title="Denominador" videoId="/pag18/vv-7" />
                                        </p>
                                    </div>
                                </div>

                                <p className="text-lg text-red-500 font-medium italic pt-2">
                                    <span className="font-bold">NOTA:</span> El denominador siempre es un número distinto de cero.
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_ERROR} title="Nota:" videoId="/pag18/vv-8" />
                                </p>
                            </div>
                        </div>

                        {/* 4. Example 4/6 */}
                        <div className="flex flex-col items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm mt-4">
                            {/* Top Row: Text and Fraction in one line */}
                            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 w-full">
                                <div className="flex items-center gap-2">
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_EXAMPLE} title="Ejemplo" videoId="/pag18/vv-9" />
                                    <span className="bg-green-600 text-white px-3 py-1 font-bold rounded shadow-sm text-base">
                                        Ejemplo:
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 text-lg text-gray-800 font-medium whitespace-nowrap">
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
                            <div className="relative mt-2">
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
