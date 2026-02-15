'use client';

import React, { useState } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { VIDEO_IDS } from '@/config/videos';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface DivisionConceptPageProps {
    zoom?: number;
}

export function ConceptPage({ zoom = 1 }: DivisionConceptPageProps) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    // Define tracking IDs for all videos on this page
    const VIDEO_TRACKING_IDS = {
        UNDERSTANDING: 'division-concept-understanding',
        PARTS: 'division-concept-parts',
        DIVIDEND: 'division-concept-dividend',
        DIVISOR: 'division-concept-divisor',
        QUOTIENT: 'division-concept-quotient',
        EXAMPLE: 'division-concept-example'
    };

    const [videoModal, setVideoModal] = useState<{ isOpen: boolean; title: string; videoId?: string; trackingId?: string }>({
        isOpen: false,
        title: '',
        videoId: undefined,
        trackingId: undefined
    });

    // Use a ref to store the current tracking ID so it persists even after modal closes
    const currentTrackingIdRef = React.useRef<string | undefined>(undefined);

    const handleVideoComplete = () => {
        const idToMark = currentTrackingIdRef.current;
        if (idToMark) {
            markVideoWatched(idToMark);
            currentTrackingIdRef.current = undefined;
        }
    };

    return (
        <BookPageContainer
            zoom={zoom}
            moduleHeader={{
                icon: '/division-icon.png',
                name: 'División'
            }}
            pageId="division-concept"
        >
            {/* A - ABSTRACTO Box */}
            <div className="relative ml-2 flex items-start mb-8">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center" style={{ backgroundColor: '#be90de' }}>
                    A
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-5" style={{ borderColor: '#be90de' }}>

                    <div className="w-full h-full flex flex-col overflow-y-auto mt-2" style={{ gap: 'clamp(0.75rem, 2vh, 1.5rem)', padding: 'clamp(0.5rem, 2vmin, 1rem)' }}>
                        {/* Title with video button */}
                        <div className="flex items-center justify-center gap-2 shrink-0">
                            <h2 className="font-bold text-gray-900 dark:text-white text-center" style={{ fontSize: 'clamp(1.5rem, 4vmin, 2.5rem)', lineHeight: '1.2' }}>
                                Entendiendo la División
                            </h2>
                            <button
                                type="button"
                                onMouseEnter={() => {
                                    currentTrackingIdRef.current = VIDEO_TRACKING_IDS.UNDERSTANDING;
                                    setVideoModal({
                                        isOpen: true,
                                        title: 'Entendiendo la División',
                                        videoId: VIDEO_IDS.MODULE_DIVISION,
                                        trackingId: VIDEO_TRACKING_IDS.UNDERSTANDING
                                    });
                                }}
                                className={`p-1 text-white rounded-full transition-all flex-shrink-0 ${isVideoWatched(VIDEO_TRACKING_IDS.UNDERSTANDING)
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-purple-600 hover:bg-purple-700'
                                    }`}
                            >
                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                                    {isVideoWatched(VIDEO_TRACKING_IDS.UNDERSTANDING) ? (
                                        <path d="M8 5v14l11-7z" />
                                    ) : (
                                        <path d="M8 5v14l11-7z" />
                                    )}
                                </svg>
                            </button>
                        </div>

                        {/* Main image */}
                        <div className="flex justify-center shrink-0">
                            <img
                                src="/explica-division.png"
                                alt="Explicación visual de la división"
                                className="rounded-xl shadow-lg max-w-full h-auto"
                                style={{ maxHeight: 'clamp(12rem, 25vh, 20rem)' }}
                            />
                        </div>

                        {/* What is division - Highlighted section */}
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl border-2 border-purple-300 dark:border-purple-700 shrink-0" style={{ padding: 'clamp(1rem, 3vmin, 1.5rem)' }}>
                            <h3 className="font-black text-purple-700 dark:text-purple-300 text-center mb-2" style={{ fontSize: 'clamp(1.25rem, 3.5vmin, 2rem)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                ¿Qué es una división?
                            </h3>
                            <p className="text-gray-800 dark:text-gray-200 text-center font-medium" style={{ fontSize: 'clamp(0.875rem, 2.2vmin, 1.25rem)', lineHeight: '1.5' }}>
                                Una división es repartir, distribuir o compartir algo de forma equitativa, es decir, en partes iguales.
                            </p>
                        </div>

                        {/* General form box */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-300 dark:border-gray-600 shadow-md shrink-0" style={{ padding: 'clamp(1rem, 3vmin, 1.5rem)' }}>
                            <p className="text-center font-bold text-gray-700 dark:text-gray-300 mb-3" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.5rem)' }}>
                                Forma general de la división:
                            </p>
                            <div className="flex items-center justify-center gap-3" style={{ fontSize: 'clamp(2.5rem, 6vmin, 4rem)' }}>
                                <span className="font-bold text-red-600 dark:text-red-400">A</span>
                                <span className="font-bold text-gray-400">÷</span>
                                <span className="font-bold text-blue-600 dark:text-blue-400">B</span>
                                <span className="font-bold text-gray-400">=</span>
                                <span className="font-bold text-green-600 dark:text-green-400">C</span>
                            </div>
                        </div>

                        {/* Question with video */}
                        <div className="flex items-center justify-center gap-2 shrink-0">
                            <p className="font-bold text-gray-900 dark:text-white text-center" style={{ fontSize: 'clamp(1.1rem, 2.8vmin, 1.75rem)' }}>
                                Pero, ¿qué son las letras A, B y C?
                            </p>
                            <button
                                type="button"
                                onMouseEnter={() => {
                                    currentTrackingIdRef.current = VIDEO_TRACKING_IDS.PARTS;
                                    setVideoModal({
                                        isOpen: true,
                                        title: 'Partes de la División',
                                        videoId: VIDEO_IDS.MODULE_DIVISION,
                                        trackingId: VIDEO_TRACKING_IDS.PARTS
                                    });
                                }}
                                className={`p-1 text-white rounded-full transition-all flex-shrink-0 ${isVideoWatched(VIDEO_TRACKING_IDS.PARTS)
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-purple-600 hover:bg-purple-700'
                                    }`}
                            >
                                <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                                    {isVideoWatched(VIDEO_TRACKING_IDS.PARTS) ? (
                                        <path d="M8 5v14l11-7z" />
                                    ) : (
                                        <path d="M8 5v14l11-7z" />
                                    )}
                                </svg>
                            </button>
                        </div>

                        {/* Step by step intro */}
                        <p className="text-center font-semibold text-gray-700 dark:text-gray-300 shrink-0" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.5rem)' }}>
                            Vamos a entenderlo paso a paso.
                        </p>

                        {/* A - Dividendo (Red) */}
                        <div className="bg-red-50 dark:bg-red-900/20 rounded-xl border-l-4 border-red-500" style={{ padding: 'clamp(0.75rem, 2vmin, 1.25rem)' }}>
                            <div className="flex items-start gap-3">
                                <div className="flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-red-500 text-white font-bold text-xl">
                                    A
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <p className="font-bold text-gray-900 dark:text-white" style={{ fontSize: 'clamp(0.875rem, 2.2vmin, 1.125rem)' }}>
                                            → <span className="italic">el total (dividendo).</span>
                                        </p>
                                        <button
                                            type="button"
                                            onMouseEnter={() => {
                                                currentTrackingIdRef.current = VIDEO_TRACKING_IDS.DIVIDEND;
                                                setVideoModal({
                                                    isOpen: true,
                                                    title: 'El Dividendo',
                                                    videoId: VIDEO_IDS.MODULE_DIVISION,
                                                    trackingId: VIDEO_TRACKING_IDS.DIVIDEND
                                                });
                                            }}
                                            className={`p-1 text-white rounded-full transition-all flex-shrink-0 ${isVideoWatched(VIDEO_TRACKING_IDS.DIVIDEND)
                                                ? 'bg-green-600 hover:bg-green-700'
                                                : 'bg-purple-600 hover:bg-purple-700'
                                                }`}
                                        >
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                {isVideoWatched(VIDEO_TRACKING_IDS.DIVIDEND) ? (
                                                    <path d="M8 5v14l11-7z" />
                                                ) : (
                                                    <path d="M8 5v14l11-7z" />
                                                )}
                                            </svg>
                                        </button>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 mb-2" style={{ fontSize: 'clamp(0.75rem, 1.9vmin, 1rem)' }}>
                                        Es la cantidad completa que queremos repartir o el número que vamos a dividir.
                                    </p>
                                    <div className="bg-green-600 text-white rounded-lg px-3 py-1 inline-block">
                                        <span className="font-bold" style={{ fontSize: 'clamp(0.75rem, 1.8vmin, 0.875rem)' }}>Ejemplo:</span>
                                    </div>
                                    <div className="flex flex-wrap gap-4 mt-2" style={{ fontSize: 'clamp(0.8rem, 2vmin, 1rem)' }}>
                                        <span>12 manzanas. 🍎</span>
                                        <span>30 dulces. 🍬</span>
                                        <span>100 estrellas. ✨</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* B - Divisor (Blue) */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border-l-4 border-blue-500" style={{ padding: 'clamp(0.75rem, 2vmin, 1.25rem)' }}>
                            <div className="flex items-start gap-3">
                                <div className="flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-xl">
                                    B
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <p className="font-bold text-gray-900 dark:text-white" style={{ fontSize: 'clamp(0.875rem, 2.2vmin, 1.125rem)' }}>
                                            → <span className="italic">el número de grupos (el divisor).</span>
                                        </p>
                                        <button
                                            type="button"
                                            onMouseEnter={() => {
                                                currentTrackingIdRef.current = VIDEO_TRACKING_IDS.DIVISOR;
                                                setVideoModal({
                                                    isOpen: true,
                                                    title: 'El Divisor',
                                                    videoId: VIDEO_IDS.MODULE_DIVISION,
                                                    trackingId: VIDEO_TRACKING_IDS.DIVISOR
                                                });
                                            }}
                                            className={`p-1 text-white rounded-full transition-all flex-shrink-0 ${isVideoWatched(VIDEO_TRACKING_IDS.DIVISOR)
                                                ? 'bg-green-600 hover:bg-green-700'
                                                : 'bg-purple-600 hover:bg-purple-700'
                                                }`}
                                        >
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                {isVideoWatched(VIDEO_TRACKING_IDS.DIVISOR) ? (
                                                    <path d="M8 5v14l11-7z" />
                                                ) : (
                                                    <path d="M8 5v14l11-7z" />
                                                )}
                                            </svg>
                                        </button>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 mb-2" style={{ fontSize: 'clamp(0.75rem, 1.9vmin, 1rem)' }}>
                                        Es entre cuántos vamos a repartir o en cuántas partes iguales queremos dividir el total.
                                    </p>
                                    <div className="bg-green-600 text-white rounded-lg px-3 py-1 inline-block">
                                        <span className="font-bold" style={{ fontSize: 'clamp(0.75rem, 1.8vmin, 0.875rem)' }}>Ejemplo:</span>
                                    </div>
                                    <div className="flex flex-wrap gap-4 mt-2" style={{ fontSize: 'clamp(0.8rem, 2vmin, 1rem)' }}>
                                        <span>Entre 3 personas. 👨👩👧</span>
                                        <span>En 6 cajas. 📦</span>
                                        <span>4 equipos. 👥</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* C - Cociente (Green) */}
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl border-l-4 border-green-500" style={{ padding: 'clamp(0.75rem, 2vmin, 1.25rem)' }}>
                            <div className="flex items-start gap-3">
                                <div className="flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-green-500 text-white font-bold text-xl">
                                    C
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <p className="font-bold text-gray-900 dark:text-white" style={{ fontSize: 'clamp(0.875rem, 2.2vmin, 1.125rem)' }}>
                                            → <span className="italic">cuánto recibe cada grupo (el cociente).</span>
                                        </p>
                                        <button
                                            type="button"
                                            onMouseEnter={() => {
                                                currentTrackingIdRef.current = VIDEO_TRACKING_IDS.QUOTIENT;
                                                setVideoModal({
                                                    isOpen: true,
                                                    title: 'El Cociente',
                                                    videoId: VIDEO_IDS.MODULE_DIVISION,
                                                    trackingId: VIDEO_TRACKING_IDS.QUOTIENT
                                                });
                                            }}
                                            className={`p-1 text-white rounded-full transition-all flex-shrink-0 ${isVideoWatched(VIDEO_TRACKING_IDS.QUOTIENT)
                                                ? 'bg-green-600 hover:bg-green-700'
                                                : 'bg-purple-600 hover:bg-purple-700'
                                                }`}
                                        >
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                                {isVideoWatched(VIDEO_TRACKING_IDS.QUOTIENT) ? (
                                                    <path d="M8 5v14l11-7z" />
                                                ) : (
                                                    <path d="M8 5v14l11-7z" />
                                                )}
                                            </svg>
                                        </button>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300" style={{ fontSize: 'clamp(0.75rem, 1.9vmin, 1rem)' }}>
                                        Es el resultado de la división. Cuánto corresponde a cada parte.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Practical example box */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border-2 border-amber-400 dark:border-amber-600" style={{ padding: 'clamp(1rem, 3vmin, 1.5rem)' }}>
                            <div className="flex items-center gap-2 mb-3">
                                <button
                                    type="button"
                                    onMouseEnter={() => {
                                        currentTrackingIdRef.current = VIDEO_TRACKING_IDS.EXAMPLE;
                                        setVideoModal({
                                            isOpen: true,
                                            title: 'Ejemplo Práctico',
                                            videoId: VIDEO_IDS.MODULE_DIVISION,
                                            trackingId: VIDEO_TRACKING_IDS.EXAMPLE
                                        });
                                    }}
                                    className={`p-1.5 text-white rounded-full transition-all flex-shrink-0 ${isVideoWatched(VIDEO_TRACKING_IDS.EXAMPLE)
                                        ? 'bg-green-600 hover:bg-green-700'
                                        : 'bg-purple-600 hover:bg-purple-700'
                                        }`}
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        {isVideoWatched(VIDEO_TRACKING_IDS.EXAMPLE) ? (
                                            <path d="M8 5v14l11-7z" />
                                        ) : (
                                            <path d="M8 5v14l11-7z" />
                                        )}
                                    </svg>
                                </button>
                                <div className="bg-green-600 text-white rounded-lg px-4 py-1.5">
                                    <span className="font-bold" style={{ fontSize: 'clamp(0.875rem, 2.2vmin, 1.125rem)' }}>Ejemplo:</span>
                                </div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200" style={{ fontSize: 'clamp(0.875rem, 2.2vmin, 1.125rem)' }}>
                                    Tenemos <span className="font-black text-red-600">28 galletas</span> y queremos repartirlas en <span className="font-black text-blue-600">4 cajas</span>.
                                </p>
                            </div>

                            <div className="space-y-2" style={{ fontSize: 'clamp(0.875rem, 2.2vmin, 1.125rem)' }}>
                                <p><span className="font-black text-red-600">A = 28</span> <span className="text-gray-600 dark:text-gray-400">(total de galletas)</span></p>
                                <p><span className="font-black text-blue-600">B = 4</span> <span className="text-gray-600 dark:text-gray-400">(número de cajas)</span></p>
                                <p><span className="font-black text-green-600">C = 7</span> <span className="text-gray-600 dark:text-gray-400">(galletas en cada caja)</span></p>
                            </div>

                            <div className="mt-4 pt-3 border-t-2 border-amber-300 dark:border-amber-600">
                                <p className="text-gray-800 dark:text-gray-200" style={{ fontSize: 'clamp(0.875rem, 2.2vmin, 1.125rem)' }}>
                                    Entonces, <span className="font-black text-red-600">28</span> <span className="font-bold text-gray-500">÷</span> <span className="font-black text-blue-600">4</span> <span className="font-bold text-gray-500">=</span> <span className="font-black text-green-600">7</span>
                                </p>
                                <p className="mt-2 text-gray-700 dark:text-gray-300 font-medium" style={{ fontSize: 'clamp(0.875rem, 2.2vmin, 1.125rem)' }}>
                                    Eso significa que a cada caja le corresponden <span className="font-black text-green-600">7 galletas</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End of A - ABSTRACTO Box */}

            {/* Video Modal */}
            <VideoModal
                isOpen={videoModal.isOpen}
                title={videoModal.title}
                videoId={videoModal.videoId}
                onClose={() => setVideoModal({ isOpen: false, title: '', videoId: undefined, trackingId: undefined })}
                canSkip={videoModal.videoId ? isVideoWatched(videoModal.trackingId || videoModal.videoId) : false}
                onComplete={handleVideoComplete}
            />
        </BookPageContainer>
    );
}
