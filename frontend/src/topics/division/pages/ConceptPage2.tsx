'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { VIDEO_IDS } from '@/config/videos';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface DivisionConceptPage2Props {
    zoom?: number;
}

// SVG Kid Components for better visuals
const Kid1 = () => (
    <svg width="60" height="90" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform hover:scale-105 transition-transform">
        {/* Hair Back */}
        <path d="M30 35C25 40 20 50 20 60V70H80V60C80 50 75 40 70 35H30Z" fill="#5D4037" />
        {/* Neck */}
        <rect x="40" y="80" width="20" height="15" fill="#FFCCBC" />
        {/* Face */}
        <ellipse cx="50" cy="55" rx="28" ry="32" fill="#FFCCBC" />
        {/* Hair Top */}
        <path d="M50 20C30 20 20 40 18 55C18 35 25 15 50 15C75 15 82 35 82 55C80 40 70 20 50 20Z" fill="#5D4037" />
        {/* Eyes */}
        <circle cx="40" cy="55" r="3" fill="#3E2723" />
        <circle cx="60" cy="55" r="3" fill="#3E2723" />
        {/* Mouth */}
        <path d="M42 70Q50 78 58 70" stroke="#D84315" strokeWidth="2" strokeLinecap="round" />
        {/* Shirt */}
        <path d="M25 90L20 120H80L75 90Q50 95 25 90Z" fill="#8BC34A" />
        <path d="M25 90Q50 95 75 90" stroke="#689F38" strokeWidth="2" fill="none" />
        {/* Pants */}
        <rect x="25" y="115" width="24" height="30" fill="#0277BD" />
        <rect x="51" y="115" width="24" height="30" fill="#0277BD" />
        {/* Shoes */}
        <ellipse cx="37" cy="145" rx="10" ry="5" fill="#3E2723" />
        <ellipse cx="63" cy="145" rx="10" ry="5" fill="#3E2723" />
    </svg>
);

const Kid2 = () => (
    <svg width="60" height="90" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform hover:scale-105 transition-transform">
        {/* Hair Back */}
        <path d="M30 40C20 45 15 65 15 80H85C85 65 80 45 70 40H30Z" fill="#FDD835" />
        {/* Neck */}
        <rect x="40" y="80" width="20" height="15" fill="#FFCCBC" />
        {/* Face */}
        <ellipse cx="50" cy="55" rx="28" ry="32" fill="#FFCCBC" />
        {/* Hair Front */}
        <path d="M50 20C35 20 20 35 15 60C15 40 30 15 50 15C70 15 85 40 85 60C80 35 65 20 50 20Z" fill="#FDD835" />
        {/* Eyes */}
        <circle cx="38" cy="55" r="3" fill="#01579B" />
        <circle cx="62" cy="55" r="3" fill="#01579B" />
        {/* Mouth */}
        <path d="M45 72Q50 75 55 72" stroke="#D84315" strokeWidth="2" strokeLinecap="round" />
        {/* Dress/Shirt */}
        <path d="M25 90L15 130H85L75 90Q50 95 25 90Z" fill="#03A9F4" />
        {/* Skirt/Pants */}
        <rect x="25" y="125" width="50" height="20" fill="#B71C1C" />
        {/* Shoes */}
        <ellipse cx="35" cy="145" rx="9" ry="5" fill="#4E342E" />
        <ellipse cx="65" cy="145" rx="9" ry="5" fill="#4E342E" />
    </svg>
);

const Kid3 = () => (
    <svg width="60" height="90" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform hover:scale-105 transition-transform">
        {/* Hair */}
        <circle cx="50" cy="50" r="35" fill="#E65100" />
        {/* Neck */}
        <rect x="40" y="80" width="20" height="15" fill="#FFCCBC" />
        {/* Face */}
        <ellipse cx="50" cy="55" rx="28" ry="32" fill="#FFCCBC" />
        {/* Hair Bangs */}
        <path d="M25 35Q50 50 75 35" fill="none" stroke="#E65100" strokeWidth="8" />
        {/* Eyes */}
        <circle cx="40" cy="55" r="3" fill="#3E2723" />
        <circle cx="60" cy="55" r="3" fill="#3E2723" />
        {/* Mouth */}
        <path d="M40 70Q50 80 60 70" stroke="#D84315" strokeWidth="2" strokeLinecap="round" />
        {/* Shirt */}
        <path d="M25 90L20 120H80L75 90Q50 95 25 90Z" fill="#009688" />
        {/* Pattern */}
        <path d="M25 90L80 120M20 120L75 90" stroke="#004D40" strokeWidth="2" opacity="0.3" />
        {/* Pants */}
        <rect x="28" y="115" width="20" height="30" fill="#5D4037" />
        <rect x="52" y="115" width="20" height="30" fill="#5D4037" />
        {/* Shoes */}
        <ellipse cx="38" cy="145" rx="10" ry="5" fill="#212121" />
        <ellipse cx="62" cy="145" rx="10" ry="5" fill="#212121" />
    </svg>
);

const KidFigure = ({ variant = 0 }: { variant?: number }) => {
    const kids = [<Kid1 key="k1" />, <Kid2 key="k2" />, <Kid3 key="k3" />];
    return kids[variant % 3];
};

export function ConceptPage2({ zoom = 1 }: DivisionConceptPage2Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    // Define tracking IDs for videos
    const VIDEO_TRACKING_IDS = {
        DIVISOR: 'division-concept2-divisor',
        QUOTIENT: 'division-concept2-quotient',
        EXAMPLE: 'division-concept2-example',
        PARTS: 'division-concept2-parts'
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
            pageId="division-concept-2"
        >
            {/* Main Content Box */}
            <div className="relative ml-2 flex items-start h-full">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center" style={{ backgroundColor: '#be90de' }}>
                    A
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 h-full flex flex-col" style={{ borderColor: '#be90de' }}>

                    <div className="w-full flex-1 flex flex-col overflow-y-auto gap-6 px-1">

                        {/* SECTION A EXAMPLES */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* 12 manzanas */}
                            <div className="flex flex-col items-center">
                                <div className="bg-green-600 text-white px-3 py-1 rounded-md font-bold text-sm mb-2 w-full text-center">
                                    Ejemplo: <span className="text-white">12 manzanas</span>
                                </div>
                                <div className="grid grid-cols-4 gap-1 p-1 border border-green-200 dark:border-green-800 rounded-lg bg-white dark:bg-gray-800 w-[150px] h-[150px] justify-items-center">
                                    {[...Array(12)].map((_, i) => (
                                        <img key={i} src="/division/manzanaverde.png" alt="manzana" className="w-full h-full object-contain" />
                                    ))}
                                </div>
                            </div>
                            {/* 30 dulces */}
                            <div className="flex flex-col items-center">
                                <div className="font-bold text-gray-700 mb-2">30 dulces</div>
                                <div className="grid grid-cols-6 gap-0.5 p-1 border border-purple-200 dark:border-purple-800 rounded-lg bg-white dark:bg-gray-800 w-[150px] h-[150px] justify-items-center">
                                    {[...Array(30)].map((_, i) => (
                                        <img key={i} src="/division/dulce.png" alt="dulce" className="w-full h-full object-contain" />
                                    ))}
                                </div>
                            </div>
                            {/* 100 estrellas */}
                            <div className="flex flex-col items-center">
                                <div className="font-bold text-gray-700 mb-2">100 estrellas</div>
                                <div className="grid grid-cols-10 gap-px p-0.5 border border-orange-200 dark:border-orange-800 rounded-lg bg-white dark:bg-gray-800 w-[150px] h-[150px] justify-items-center">
                                    {[...Array(50)].map((_, i) => (
                                        <img key={i} src="/division/estrella.png" alt="estrella" className="w-full h-full object-contain" />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* SECTION B: Divisor */}
                        <div>
                            <div className="flex items-start gap-2 mb-2">
                                <span className="bg-red-400 w-4 h-4 mt-1 block rounded-sm flex-shrink-0"></span>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800 dark:text-gray-200">
                                        <span className="font-bold">B</span> <span className="mx-1">→</span> <span className="italic font-bold">el número de grupos (el divisor).</span> Es entre cuántos vamos a repartir o en cuántas partes iguales queremos dividir el total.
                                    </p>
                                </div>
                                <PlayVideoButton trackingId={VIDEO_TRACKING_IDS.DIVISOR} title="El Divisor" videoId="/pag1/vv-1" />
                            </div>

                            {/* B Examples */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-6">
                                {/* 3 niños */}
                                <div className="flex flex-col items-center">
                                    <div className="bg-green-600 text-white px-3 py-1 rounded-md font-bold text-sm mb-2 w-full text-center">
                                        Ejemplo: <span className="font-normal">Entre</span> 3 niños
                                    </div>
                                    <div className="flex justify-center p-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <img src="/division/infantes.png" alt="infantes" className="w-[150px] h-[150px] object-contain" />
                                    </div>
                                </div>
                                {/* 6 cajas */}
                                <div className="flex flex-col items-center">
                                    <div className="font-bold text-gray-700 mb-2">Entre 6 cajas</div>
                                    <div className="flex justify-center p-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <img src="/division/cajas.png" alt="cajas" className="w-[150px] h-[150px] object-contain" />
                                    </div>
                                </div>
                                {/* 4 equipos */}
                                <div className="flex flex-col items-center">
                                    <div className="font-bold text-gray-700 mb-2">Entre 4 equipos</div>
                                    <div className="flex justify-center p-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                        <img src="/division/equipos.png" alt="equipos" className="w-[150px] h-[150px] object-contain" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SECTION C: Cociente */}
                        <div>
                            <div className="flex items-start gap-2 mb-2">
                                <span className="bg-red-400 w-4 h-4 mt-1 block rounded-sm flex-shrink-0"></span>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800 dark:text-gray-200">
                                        <span className="font-bold">C</span> <span className="mx-1">→</span> <span className="italic font-bold">cuánto recibe cada grupo (el cociente).</span> Es el resultado de la división. Cuánto corresponde a cada parte.
                                    </p>
                                </div>
                                <PlayVideoButton trackingId={VIDEO_TRACKING_IDS.QUOTIENT} title="El Cociente" videoId="/pag1/vv-2" />
                            </div>

                            {/* C Example */}
                            <div className="pl-6">
                                <div className="flex items-center gap-2 mb-2 bg-green-600 text-white px-3 py-1 rounded-md w-fit font-bold text-sm">
                                    Ejemplo:
                                </div>
                                <p className="mb-4 font-medium text-gray-800 dark:text-gray-200">
                                    Dividir 12 manzanas entre 3 niños. Cada niño recibe <span className="font-bold">4 manzanas</span>
                                </p>
                                <div className="flex justify-center bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                                    <img src="/division/infantesmanzanas.png" alt="infantes comiendo manzanas" className="w-[300px] h-[150px] object-contain" />
                                </div>
                            </div>
                        </div>

                        {/* FINAL EXAMPLE */}
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-2 mb-2">
                                <PlayVideoButton trackingId={VIDEO_TRACKING_IDS.EXAMPLE} title="Ejemplo Final" videoId="/pag1/vv-3" />
                                <div className="bg-green-600 text-white px-3 py-1 rounded-md font-bold text-sm">Example:</div>
                                <p className="font-bold text-gray-800 dark:text-white">Tenemos 28 galletas y queremos repartirlas en 4 cajas.</p>
                            </div>

                            <div className="pl-8 space-y-1 font-bold font-mono text-lg">
                                <p><span className="text-purple-600">A = 28</span> <span className="text-black dark:text-white text-base font-sans">(total de galletas)</span></p>
                                <p><span className="text-pink-600">B = 4</span> <span className="text-black dark:text-white text-base font-sans">(número de cajas)</span></p>
                                <p><span className="text-green-600">C = 7</span> <span className="text-black dark:text-white text-base font-sans">(galletas en cada caja)</span></p>
                            </div>

                            <div className="mt-3 pl-8">
                                <p className="font-bold text-gray-800 dark:text-white text-lg">
                                    Entonces, <span className="text-purple-600">28</span> ÷ <span className="text-pink-600">4</span> = <span className="text-green-600">7</span>. <span className="text-base font-normal text-gray-700 dark:text-gray-300">Eso significa que a cada caja le corresponden <span className="font-bold text-green-600 underline">7 galletas</span>.</span>
                                </p>
                            </div>
                        </div>

                        {/* PARTS DIAGRAM */}
                        <div className="flex flex-col items-center mt-2">
                            <div className="flex items-center gap-2 mb-2">
                                <h4 className="font-black uppercase text-gray-900 dark:text-white">PARTES DE LA DIVISIÓN</h4>
                                <PlayVideoButton trackingId={VIDEO_TRACKING_IDS.PARTS} title="Partes de la división" videoId="/pag1/vv-4" />
                            </div>

                            <div className="flex items-center gap-8 text-xl font-bold">
                                <div className="flex items-center gap-2">
                                    <span className="text-red-500">Dividendo</span>
                                    <span className="text-red-500">←</span>
                                    <span className="text-purple-800 dark:text-purple-300 text-2xl">A</span>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-4 border-b-2 border-black dark:border-white pb-1">
                                        <span className="text-pink-600 text-2xl">B</span>
                                        <span className="text-red-500">→</span>
                                        <span className="text-red-500">Divisor</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="text-green-600 text-2xl">C</span>
                                        <span className="text-red-500">→</span>
                                        <span className="text-red-500">Cociente</span>
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
