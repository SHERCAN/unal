'use client';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
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

export function ConceptoProcesualPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        A_NOTA: 'div-exacta-a-nota',
        A_MATH: 'div-exacta-a-math',
        A_COMO: 'div-exacta-a-como',
        A_DEF: 'div-exacta-a-def',
        A_EXAMPLE: 'div-exacta-a-example',
    };

    const [videoModal, setVideoModal] = useState<{ isOpen: boolean; title: string; videoId?: string }>({
        isOpen: false, title: '', videoId: undefined
    });
    const currentTrackingRef = useRef<string | undefined>(undefined);

    const handleVideoComplete = () => {
        if (currentTrackingRef.current) {
            markVideoWatched(currentTrackingRef.current);
            currentTrackingRef.current = undefined;
        }
    };

    const openVideo = (trackingId: string, title: string) => {
        currentTrackingRef.current = trackingId;
        setVideoModal({ isOpen: true, title, videoId: undefined });
    };

    const PlayBtn = ({ trackingId, title }: { trackingId: string; title: string }) => (
        <button type="button" onClick={() => openVideo(trackingId, title)}
            className={`w-8 h-8 flex items-center justify-center text-white rounded-full transition-all flex-shrink-0 ${isVideoWatched(trackingId) ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'}`}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        </button>
    );

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
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'División Exacta' }} pageId="div-exacta-concepto-procesual">
            <div className="w-full">
                <div className="relative ml-2 flex items-start">
                    <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#be90de] dark:bg-purple-900" style={{ borderColor: '#be90de' }}>
                        A
                    </div>
                    <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-5 bg-white dark:bg-gray-800 border-[#be90de] dark:border-purple-900">

                        <div className="mt-4 space-y-6">
                            {/* Intro text */}
                            <div>
                                <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                                    De acuerdo con la actividad anterior, todas las <span className="font-bold text-lg">18</span> medallas se reparten
                                    en <span className="font-bold text-lg text-red-600">3</span> grupos de deportistas. Así, cada uno de 3 grupos tiene la misma
                                    cantidad de <span className="font-bold text-lg text-green-600">6</span> medallas. <span className="font-bold text-lg text-red-600">NO SOBRE</span> ninguna medalla.
                                </p>
                                <PlayBtn trackingId={VIDEO_TRACKING.A_NOTA} title="Nota sobre SOBRE y RESTO" />

                                <div className="mt-2 bg-gray-50 dark:bg-gray-700 rounded-lg p-3 border-l-4 border-purple-500">
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        <span className="font-bold">NOTA:</span> SOBRE es lo mismo que RESTO.<br />
                                        RESTO se usa en matemáticas, y SOBRA se usa en español.
                                    </p>
                                </div>
                            </div>

                            {/* Math notation */}
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <p className="text-base text-gray-800 dark:text-gray-200">Vemos la notación matemática:</p>
                                    <PlayBtn trackingId={VIDEO_TRACKING.A_MATH} title="Notación Matemática" />
                                </div>

                                <div className="text-center my-3">
                                    <span className="text-4xl font-black text-gray-900 dark:text-white">18</span>
                                    <span className="text-3xl font-bold text-gray-500 mx-2">÷</span>
                                    <span className="text-4xl font-black text-red-600">3</span>
                                    <span className="text-3xl font-bold text-gray-500 mx-2">=</span>
                                    <span className="text-4xl font-black text-green-600">6</span>
                                    <span className="text-2xl text-red-500 ml-2">resto</span>
                                    <span className="text-4xl font-black text-green-600 ml-1">0</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        &quot;<span className="text-red-500">resto 0</span>&quot; significa que no hay resto. ¿Cómo sabemos esto?
                                    </p>
                                    <PlayBtn trackingId={VIDEO_TRACKING.A_COMO} title="¿Cómo sabemos?" />
                                </div>

                                <DivisionAlgorithm
                                    dividend={18} divisor={3} quotient={6} subtract={18} remainder={0}
                                    multTable={[
                                        { mult: 1, result: 3 }, { mult: 2, result: 6 }, { mult: 3, result: 9 },
                                        { mult: 4, result: 12 }, { mult: 5, result: 15 }, { mult: 6, result: 18 },
                                    ]}
                                />
                            </div>

                            {/* Definition */}
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <PlayBtn trackingId={VIDEO_TRACKING.A_DEF} title="¿Qué es una división exacta?" />
                                    <span className="bg-purple-600 text-white font-bold px-3 py-1 rounded text-sm">¿Qué es una división exacta?</span>
                                </div>
                                <p className="text-base text-gray-800 dark:text-gray-200 mt-2">
                                    Una división es <span className="text-green-600 font-bold">exacta</span> cuando su resto es cero, es decir, no hay resto.
                                </p>
                            </div>

                            {/* Example: 32 ÷ 4 = 8 */}
                            <div>
                                <span className="bg-red-500 text-white font-bold px-3 py-1 rounded text-sm">Ejemplo:</span>
                                <div className="flex items-center gap-2 mt-2">
                                    <PlayBtn trackingId={VIDEO_TRACKING.A_EXAMPLE} title="Ejemplo 32÷4" />
                                    <span className="w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-sm inline-block"></span>
                                    <p className="text-sm text-gray-800 dark:text-gray-200">
                                        La división 32 ÷ 4 = 8 es <span className="text-green-600 font-bold">exacta</span> porque no tiene resto.
                                    </p>
                                </div>

                                <DivisionAlgorithm
                                    dividend={32} divisor={4} quotient={8} subtract={32} remainder={0}
                                    multTable={[
                                        { mult: 1, result: 4 }, { mult: 2, result: 8 }, { mult: 3, result: 12 },
                                        { mult: 8, result: 32 }, { mult: 9, result: 36 },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <VideoModal
                isOpen={videoModal.isOpen}
                onClose={() => setVideoModal(prev => ({ ...prev, isOpen: false }))}
                videoId={videoModal.videoId}
                title={videoModal.title}
                onComplete={handleVideoComplete}
            />
        </BookPageContainer>
    );
}
