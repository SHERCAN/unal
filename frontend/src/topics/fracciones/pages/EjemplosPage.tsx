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
//PAGINA 4 ABSTRACTO
export function EjemplosPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        EX_BALLS: 'fracciones-pag20-v1',
        EX_BOOKS: 'fracciones-pag20-v2',
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

                            <p className="text-base font-semibold text-gray-800 leading-relaxed">
                                Se tienen en una bolsa <span className="text-red-600 font-bold">doce pelotas rojas</span> y <span className="text-blue-600 font-bold">ocho azules</span>. La fracción que representa el número de pelotas azules:
                            </p>
                            <div className="flex justify-center my-8">
                                <img 
                                    className="h-64 object-contain"
                                    src="/fracciones/img4.png"
                                    draggable={false}
                                />
                            </div>                            
                        </div>

                        {/* EXAMPLE 2: Books */}
                        <div className="space-y-4 border-t border-gray-100">
                            <div className="flex items-center gap-4">
                                <PlayVideoButton trackingId={VIDEO_TRACKING.EX_BOOKS} title="Ejemplo: Libros" videoId="/pag20/vv-2" />
                                <span className="bg-green-600 text-white px-4 py-1.5 font-bold text-lg rounded shadow-sm">Ejemplo:</span>
                            </div>

                            <p className="text-base font-semibold text-gray-800 leading-relaxed max-w-4xl">
                                Dentro de una caja hay 45 textos escolares. Si la quinta parte 1/5 de ellos son de matemáticas, <span className="font-bold">¿cuántos libros de matemáticas hay en total?</span>
                            </p>

                            <div className="space-y-4">
                                <p className="font-bold text-gray-700 text-lg">Vamos a resolver:</p>
                                <div className="text-base font-semibold text-gray-800 flex items-center gap-2 flex-wrap">
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
                                            className="h-40 w-auto object-contain"
                                        />
                                    </div>
                                </div>

                            <div> 
                                <p className="text-base text-gray-800 font-semibold">Para saber cuántos libros son de matemáticas, se divide:</p>
                                <div className="flex justify-center">
                                    <img 
                                        className="h-12 object-contain"
                                        src="/fracciones/img5.png"
                                        draggable={false}
                                    />
                                </div>  
                            </div>

                                {/* Calculation & Response */}
                                <div className="w-full flex flex-col items-start space-y-8">
                                    

                                    <p className="text-base text-gray-800 font-semibold">
                                        <span className="text-[#e95352] font-bold">RESPUESTA:</span> Hay 9 libros de matemáticas.
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
