'use client';

import React, { useState } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { VIDEO_IDS } from '@/config/videos';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface DivisionExplanationPage2Props {
    zoom?: number;
}

export function ExplanationPage2({ zoom = 1 }: DivisionExplanationPage2Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    // Define tracking ID for this page's video
    const VIDEO_TRACKING_ID = 'division-explanation2-notation';

    const [videoModal, setVideoModal] = useState<{ isOpen: boolean; title: string; videoId?: string; trackingId?: string }>({
        isOpen: false,
        title: '',
        videoId: undefined,
        trackingId: undefined
    });

    // Use a ref to store the current tracking ID so it persists even after modal closes
    const currentTrackingIdRef = React.useRef<string | undefined>(undefined);

    const handleVideoComplete = () => {
        // Use the ref value instead of state, as state may have been reset when modal closed
        const idToMark = currentTrackingIdRef.current;
        if (idToMark) {
            markVideoWatched(idToMark);
            currentTrackingIdRef.current = undefined; // Clear after marking
        }
    };

    return (
        <BookPageContainer
            zoom={zoom}
            moduleHeader={{
                icon: '/division-icon.png',
                name: 'División'
            }}
            pageId="division-explanation-2"
        >
            {/* A - ABSTRACTO Box */}
            <div className="relative border-2 rounded-xl p-4" style={{ borderColor: '#be90de' }}>
                {/* A Label */}
                <div className="absolute -top-4 left-4 px-3 py-1 rounded font-black text-xl text-white" style={{ backgroundColor: '#be90de' }}>
                    A
                </div>

                <div className="w-full h-full flex flex-col justify-center overflow-hidden mt-2" style={{ gap: 'clamp(0.5rem, 2vh, 1rem)' }}>
                    {/* Title */}
                    <div className="text-center shrink-0">
                        <h2 className="font-bold text-gray-900 dark:text-white mb-2" style={{ fontSize: 'clamp(1.5rem, 4vmin, 2.5rem)', lineHeight: '1.2' }}>
                            Notación y Grupos
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400" style={{ fontSize: 'clamp(0.875rem, 2vmin, 1.125rem)' }}>
                            Otras formas de visualizar la división
                        </p>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 min-h-0 flex flex-col justify-center" style={{ gap: 'clamp(1rem, 3vh, 2rem)' }}>

                        {/* Top Section: Animation + Traditional Notation Side-by-Side */}
                        <div className="grid grid-cols-1 md:grid-cols-2 items-center" style={{ gap: 'clamp(1rem, 3vmin, 2rem)' }}>
                            {/* Left: Animation */}
                            <div className="flex flex-col items-center">
                                <h3 className="font-semibold text-gray-900 dark:text-white text-center" style={{ fontSize: 'clamp(1rem, 2.2vmin, 1.25rem)', marginBottom: 'clamp(0.5rem, 1.5vh, 1rem)' }}>
                                    Proceso paso a paso
                                </h3>
                                <img
                                    src="/division.webp"
                                    alt="Animación paso a paso de 12 dividido por 3"
                                    className="rounded-xl shadow-lg w-auto object-contain bg-white dark:bg-gray-800"
                                    style={{ height: 'clamp(8rem, 20vh, 14rem)', maxWidth: '100%' }}
                                />
                            </div>

                            {/* Right: Equation */}
                            <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-100 dark:border-gray-700" style={{ padding: 'clamp(1rem, 3vmin, 2rem)' }}>
                                <div className="flex items-center justify-center gap-2" style={{ marginBottom: 'clamp(0.75rem, 2vh, 1.5rem)' }}>
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-center" style={{ fontSize: 'clamp(1rem, 2.2vmin, 1.25rem)' }}>
                                        Notación Matemática
                                    </h3>
                                    <button
                                        type="button"
                                        onMouseEnter={() => {
                                            currentTrackingIdRef.current = VIDEO_TRACKING_ID;
                                            setVideoModal({
                                                isOpen: true,
                                                title: 'Notación Matemática',
                                                videoId: VIDEO_IDS.MODULE_DIVISION,
                                                trackingId: VIDEO_TRACKING_ID
                                            });
                                        }}
                                        className={`p-1 text-white rounded-full transition-all flex-shrink-0 ${isVideoWatched(VIDEO_TRACKING_ID)
                                            ? 'bg-green-600 hover:bg-green-700'
                                            : 'bg-purple-600 hover:bg-purple-700'
                                            }`}
                                    >
                                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                                            {isVideoWatched(VIDEO_TRACKING_ID) ? (
                                                <path d="M8 5v14l11-7z" />
                                            ) : (
                                                <path d="M8 5v14l11-7z" />
                                            )}
                                        </svg>
                                    </button>
                                </div>

                                <div className="font-bold flex items-center" style={{ fontSize: 'clamp(2rem, 5vmin, 4rem)', gap: 'clamp(0.5rem, 2vmin, 1rem)' }}>
                                    <span className="text-green-600">12</span>
                                    <span className="text-gray-400">÷</span>
                                    <span className="text-blue-600">3</span>
                                    <span className="text-gray-400">=</span>
                                    <span className="text-purple-600">4</span>
                                </div>
                                <p className="text-gray-500 font-medium text-center" style={{ marginTop: 'clamp(0.5rem, 1.5vh, 1rem)', fontSize: 'clamp(0.75rem, 1.8vmin, 1rem)' }}>
                                    12 dividido en 3 es igual a 4
                                </p>
                            </div>
                        </div>

                        {/* Bottom Section: Array Visualization */}
                        <div className="bg-purple-50/50 dark:bg-purple-900/10 rounded-2xl shrink-0" style={{ padding: 'clamp(0.75rem, 2vmin, 1.5rem)' }}>
                            <div className="flex flex-col sm:flex-row justify-center items-center" style={{ gap: 'clamp(1rem, 3vmin, 2rem)' }}>
                                <div className="font-semibold text-gray-700 dark:text-gray-200 whitespace-nowrap text-center sm:text-left" style={{ fontSize: 'clamp(0.875rem, 2vmin, 1.125rem)' }}>
                                    Representación<br />en Grupos:
                                </div>
                                <div className="flex overflow-x-auto max-w-full" style={{ gap: 'clamp(0.75rem, 2vmin, 1.5rem)' }}>
                                    {[1, 2, 3].map((group) => (
                                        <div
                                            key={group}
                                            className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-purple-100 dark:border-purple-800"
                                            style={{ padding: 'clamp(0.5rem, 1.5vmin, 1rem)', minWidth: 'clamp(4rem, 12vmin, 7rem)' }}
                                        >
                                            <div className="font-bold text-purple-600 dark:text-purple-400" style={{ fontSize: 'clamp(0.75rem, 1.8vmin, 1rem)', marginBottom: 'clamp(0.25rem, 0.5vmin, 0.5rem)' }}>
                                                Grupo {group}
                                            </div>
                                            <div className="grid grid-cols-2" style={{ gap: 'clamp(0.25rem, 0.5vmin, 0.5rem)' }}>
                                                {Array.from({ length: 4 }).map((_, i) => (
                                                    <div key={i} className="leading-none" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.5rem)' }}>
                                                        🍎
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
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
