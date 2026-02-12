'use client';

import React, { useState } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { VIDEO_IDS } from '@/config/videos';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface DivisionConceptPage2Props {
    zoom?: number;
}

export function ConceptPage2({ zoom = 1 }: DivisionConceptPage2Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    // Define tracking IDs for videos
    const VIDEO_TRACKING_IDS = {
        DIVISOR: 'division-concept2-divisor',
        QUOTIENT: 'division-concept2-quotient',
        EXAMPLE: 'division-concept2-example',
        PARTS: 'division-concept2-parts'
    };

    const [videoModal, setVideoModal] = useState<{ isOpen: boolean; title: string; videoId?: string; trackingId?: string }>({
        isOpen: false,
        title: '',
        videoId: undefined,
        trackingId: undefined
    });

    const currentTrackingIdRef = React.useRef<string | undefined>(undefined);

    const handleVideoComplete = () => {
        const idToMark = currentTrackingIdRef.current;
        if (idToMark) {
            markVideoWatched(idToMark);
            currentTrackingIdRef.current = undefined;
        }
    };

    const openVideo = (title: string, trackingId: string) => {
        currentTrackingIdRef.current = trackingId;
        setVideoModal({
            isOpen: true,
            title,
            videoId: VIDEO_IDS.MODULE_DIVISION, // Using general division video for now
            trackingId
        });
    };

    const PlayButton = ({ trackingId, title }: { trackingId: string, title: string }) => (
        <button
            type="button"
            onMouseEnter={() => openVideo(title, trackingId)}
            className={`p-1 text-white rounded-full transition-all flex-shrink-0 inline-flex items-center justify-center ml-2 ${isVideoWatched(trackingId)
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-purple-600 hover:bg-purple-700'
                }`}
            style={{ width: 'clamp(1.5rem, 4vmin, 2rem)', height: 'clamp(1.5rem, 4vmin, 2rem)' }}
        >
            <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
            </svg>
        </button>
    );

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
            <div className="relative border-2 rounded-xl p-6 h-full flex flex-col" style={{ borderColor: '#be90de' }}>
                {/* A Label (Keeping consistent with previous page style, though image implies continuation) */}
                {/* Image has 'A' tab on previous page, here we see 'Ejemplo' green boxes. 
                    The text starts with "Ejemplo: 12 manzanas...". 
                    Then "B -> el número de grupos".
                    Then "C -> cuánto recibe cada grupo".
                    So this page covers examples of A, then introduces B and C.
                */}

                <div className="w-full flex-1 flex flex-col overflow-y-auto gap-6 px-1">

                    {/* SECTION A EXAMPLES */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* 12 manzanas */}
                        <div className="flex flex-col items-center">
                            <div className="bg-green-600 text-white px-3 py-1 rounded-md font-bold text-sm mb-2 w-full text-center">
                                Ejemplo: <span className="text-white">12 manzanas</span>
                            </div>
                            <div className="grid grid-cols-4 gap-1 p-2 border border-green-200 rounded-lg bg-white">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="w-6 h-6 rounded-full bg-green-500 border border-green-600"></div>
                                ))}
                            </div>
                        </div>
                        {/* 30 dulces */}
                        <div className="flex flex-col items-center">
                            <div className="font-bold text-gray-700 mb-2">30 dulces</div>
                            <div className="grid grid-cols-6 gap-1 p-2 border border-purple-200 rounded-lg bg-white">
                                {[...Array(30)].map((_, i) => (
                                    <div key={i} className="w-3 h-3 rotate-45 bg-purple-500 border border-purple-600"></div>
                                ))}
                            </div>
                        </div>
                        {/* 100 estrellas */}
                        <div className="flex flex-col items-center">
                            <div className="font-bold text-gray-700 mb-2">100 estrellas</div>
                            <div className="grid grid-cols-10 gap-0.5 p-2 border border-orange-200 rounded-lg bg-white">
                                {[...Array(100)].map((_, i) => (
                                    <div key={i} className="w-1.5 h-1.5 clip-path-star bg-orange-400"></div>
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
                            <PlayButton trackingId={VIDEO_TRACKING_IDS.DIVISOR} title="El Divisor" />
                        </div>

                        {/* B Examples */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-6">
                            {/* 3 niños */}
                            <div className="flex flex-col items-center">
                                <div className="bg-green-600 text-white px-3 py-1 rounded-md font-bold text-sm mb-2 w-full text-center">
                                    Ejemplo: <span className="font-normal">Entre</span> 3 niños
                                </div>
                                <div className="flex gap-2 justify-center p-2 bg-white rounded-lg border border-gray-200">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="w-8 h-12 bg-blue-200 rounded-t-full border border-blue-300 relative">
                                            <div className="w-4 h-4 bg-yellow-200 rounded-full absolute -top-2 left-2 border border-yellow-300"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* 6 cajas */}
                            <div className="flex flex-col items-center">
                                <div className="font-bold text-gray-700 mb-2">Entre 6 cajas</div>
                                <div className="grid grid-cols-3 gap-2 justify-center p-2 bg-white rounded-lg border border-gray-200">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="w-8 h-6 bg-yellow-600 rounded-sm border-2 border-yellow-800"></div>
                                    ))}
                                </div>
                            </div>
                            {/* 4 equipos */}
                            <div className="flex flex-col items-center">
                                <div className="font-bold text-gray-700 mb-2">Entre 4 equipos</div>
                                <div className="grid grid-cols-2 gap-2 justify-center p-2 bg-white rounded-lg border border-gray-200">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="w-8 h-8 bg-blue-100 rounded-lg border border-blue-500 flex items-center justify-center text-xs font-bold text-blue-800">Team</div>
                                    ))}
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
                            <PlayButton trackingId={VIDEO_TRACKING_IDS.QUOTIENT} title="El Cociente" />
                        </div>

                        {/* C Example */}
                        <div className="pl-6">
                            <div className="flex items-center gap-2 mb-2 bg-green-600 text-white px-3 py-1 rounded-md w-fit font-bold text-sm">
                                Ejemplo:
                            </div>
                            <p className="mb-4 font-medium text-gray-800 dark:text-gray-200">
                                Dividir 12 manzanas entre 3 niños. Cada niño recibe <span className="font-bold">4 manzanas</span>
                            </p>
                            <div className="flex justify-around items-end bg-white p-4 rounded-xl border border-gray-200">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="flex flex-col items-center gap-1">
                                        {/* Kid */}
                                        <div className="w-10 h-14 bg-orange-200 rounded-t-full border border-orange-300 relative mb-1">
                                            <div className="w-6 h-6 bg-yellow-200 rounded-full absolute -top-3 left-2 border border-yellow-300"></div>
                                        </div>
                                        {/* Apples */}
                                        <div className="grid grid-cols-2 gap-0.5">
                                            {[...Array(4)].map((_, j) => (
                                                <div key={j} className="w-4 h-4 rounded-full bg-green-500 border border-green-600"></div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* FINAL EXAMPLE */}
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                            <PlayButton trackingId={VIDEO_TRACKING_IDS.EXAMPLE} title="Ejemplo Final" />
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
                            <PlayButton trackingId={VIDEO_TRACKING_IDS.PARTS} title="Partes de la división" />
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

            <VideoModal
                isOpen={videoModal.isOpen}
                title={videoModal.title}
                videoId={videoModal.videoId}
                onClose={() => setVideoModal({ isOpen: false, title: '', videoId: undefined, trackingId: undefined })}
                canSkip={videoModal.videoId ? isVideoWatched(videoModal.trackingId || '') : false}
                onComplete={handleVideoComplete}
            />
        </BookPageContainer>
    );
}
