'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useRef, useState } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import Image from 'next/image';

// Import assets
import bolsadulcesImg from '../bolsadulces.png';
import librosImg from '../libros.png';

interface Props { zoom?: number; }

export function EjemplosPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        EX_BALLS: 'fracciones-ex-balls',
        EX_BOOKS: 'fracciones-ex-books',
        EX_BONUS: 'fracciones-ex-bonus',
    };

    /* videoModal list removed */
    /* ref removed */

    /* handleVideoComplete removed */

    /* openVideo removed */

    /* PlayButton definition removed */

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones' }} pageId="fracciones-ejemplos">
            <div className="relative ml-2 flex items-start">
                {/* Header "A" - Abstracto */}
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#be90de]" style={{ borderColor: '#be90de' }}>
                    A
                </div>

                {/* Content Container */}
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-8 bg-white border-[#be90de] min-h-[900px]">
                    <div className="max-w-4xl mx-auto space-y-16">

                        {/* EXAMPLE 1: Balls */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <PlayVideoButton trackingId={VIDEO_TRACKING.EX_BALLS} title="Ejemplo: Pelotas" videoId="/pag20/vv-1" />
                                <span className="bg-green-600 text-white px-4 py-1.5 font-bold text-lg rounded shadow-sm">Ejemplo:</span>
                            </div>

                            <p className="text-xl text-gray-800 leading-relaxed">
                                Se tienen en una bolsa <span className="text-red-600 font-bold">doce pelotas rojas</span> y <span className="text-blue-600 font-bold">ocho azules</span>. La fracción que representa el número de pelotas azules:
                            </p>

                            <div className="flex justify-between items-center bg-white p-4">
                                {/* Visual Bag */}
                                <div className="flex flex-col items-center">
                                    <h4 className="font-bold text-gray-600 mb-4">Dibuje la representación</h4>
                                    <div className="relative">
                                        <Image
                                            src={bolsadulcesImg}
                                            alt="Bolsa de dulces"
                                            className="h-64 w-auto object-contain"
                                        />
                                    </div>
                                </div>

                                {/* Divider Line */}
                                <div className="w-0.5 h-48 bg-gray-200 mx-8"></div>

                                {/* Calculation */}
                                <div className="flex flex-col items-center gap-6 flex-1">
                                    <div className="flex flex-col items-center">
                                        <h4 className="font-bold text-gray-600 text-lg">Total de pelotas iguales:</h4>
                                        <div className="text-3xl font-bold mt-2">
                                            <span className="text-blue-600">8</span> + <span className="text-red-600">12</span> = 20
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center">
                                        <p className="font-bold text-gray-600 mb-2 text-lg">Número de pelotas azules:</p>
                                        <p className="text-4xl font-bold text-blue-600 text-center">8</p>
                                    </div>

                                    <div className="flex flex-col items-center text-center mt-4 w-full">
                                        <p className="font-bold text-gray-700 mb-2 text-lg underline underline-offset-4 decoration-purple-300">La fracción es:</p>
                                        <div className="flex flex-col items-center">
                                            <span className="text-5xl font-bold text-blue-600">8</span>
                                            <div className="w-20 h-1.5 bg-black my-2 rounded-full"></div>
                                            <span className="text-5xl font-bold text-black">20</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* EXAMPLE 2: Books */}
                        <div className="space-y-8 pt-12 border-t border-gray-100">
                            <div className="flex items-center gap-4">
                                <PlayVideoButton trackingId={VIDEO_TRACKING.EX_BOOKS} title="Ejemplo: Libros" videoId="/pag20/vv-2" />
                                <span className="bg-green-600 text-white px-4 py-1.5 font-bold text-lg rounded shadow-sm">Ejemplo:</span>
                            </div>

                            <p className="text-xl text-gray-800 leading-relaxed max-w-4xl">
                                Dentro de una caja hay 45 textos escolares. Si la quinta parte <span className="font-bold text-purple-700">1/5</span> de ellos son de matemáticas, <span className="font-bold">¿cuántos libros de matemáticas hay en total?</span>
                            </p>

                            <div className="space-y-4">
                                <p className="font-bold text-gray-700 text-lg">Vamos a resolver:</p>
                                <div className="text-lg text-gray-800 flex items-center gap-2 flex-wrap">
                                    La fracción
                                    <div className="inline-flex flex-col items-center align-middle mx-1 font-bold">
                                        <span className="leading-none border-b-2 border-black px-1">1</span>
                                        <span className="leading-none px-1">5</span>
                                    </div>
                                    dice que el total se divide en 5 partes iguales y se toman 1 de matemáticas de esas partes.
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-8 pt-4">
                                {/* Books Visual */}
                                <div className="flex flex-col items-center gap-6 w-full">
                                    <div className="flex justify-center">
                                        <Image
                                            src={librosImg}
                                            alt="Libros escolares"
                                            className="h-56 w-auto object-contain"
                                        />
                                    </div>

                                    <p className="text-xl text-gray-800 font-medium text-center">Para saber cuántos libros son de matemáticas, se divide:</p>
                                </div>

                                {/* Calculation & Response */}
                                <div className="w-full flex flex-col items-start space-y-8">
                                    <div className="flex items-center justify-center w-full">
                                        <div className="text-5xl font-black text-gray-800 flex items-center gap-6 tracking-wider">
                                            <span className="text-gray-400">45</span>
                                            <span className="text-purple-400">÷</span>
                                            <span className="text-purple-600">5</span>
                                            <span className="text-gray-400">=</span>
                                            <span className="text-green-600 text-6xl scale-110 transform">9</span>
                                        </div>
                                    </div>

                                    <p className="text-2xl text-gray-800 font-medium">
                                        <span className="text-red-600 font-bold">RESPUESTA:</span> Hay 9 libros de matemáticas.
                                    </p>
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
