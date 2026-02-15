'use client';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface Props { zoom?: number; }

export function ConceptoProcesualPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        P_LAPS: 'frac-equiv-p-laps',
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

    const PlayBtn = ({ trackingId, title, size = 'md' }: { trackingId: string; title: string; size?: 'sm' | 'md' }) => {
        const watched = isVideoWatched(trackingId);
        const sz = size === 'sm' ? 'w-6 h-6' : 'w-8 h-8';
        const iconSz = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
        return (
            <button type="button" onClick={() => openVideo(trackingId, title)}
                className={`${sz} flex items-center justify-center text-white rounded-full transition-all flex-shrink-0 ${watched ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'}`}>
                <svg className={iconSz} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </button>
        );
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones Equivalentes' }} pageId="frac-equiv-concepto-procesual">
            {/* P - PROCESUAL Section */}
            <div className="relative ml-2 flex items-start">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center" style={{ backgroundColor: '#60a5fa' }}>
                    P
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 bg-white" style={{ borderColor: '#60a5fa' }}>

                    <div className="mt-4 space-y-5">
                        <div className="flex items-center gap-2">
                            <PlayBtn trackingId={VIDEO_TRACKING.P_LAPS} title="Fracciones Equivalentes - Proceso" />
                            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                ¿Cómo sabemos si dos fracciones son equivalentes?
                            </p>
                        </div>

                        {/* Method: Multiply/Divide both parts */}
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-300 dark:border-blue-700 p-4">
                            <h3 className="font-bold text-blue-700 dark:text-blue-300 mb-3">Método: Multiplicar o dividir ambos</h3>

                            <div className="flex items-center justify-center gap-4 flex-wrap">
                                {/* 1/2 × 2 = 2/4 */}
                                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 text-center">
                                    <div className="text-xl font-bold">
                                        <span className="text-blue-600">1</span>/<span className="text-red-600">2</span>
                                    </div>
                                    <div className="text-xs text-gray-500 my-1">×2 ↕</div>
                                    <div className="text-xl font-bold">
                                        <span className="text-blue-600">2</span>/<span className="text-red-600">4</span>
                                    </div>
                                </div>

                                <span className="text-2xl text-gray-400">=</span>

                                {/* 2/4 × 2 = 4/8 */}
                                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3 text-center">
                                    <div className="text-xl font-bold">
                                        <span className="text-blue-600">2</span>/<span className="text-red-600">4</span>
                                    </div>
                                    <div className="text-xs text-gray-500 my-1">×2 ↕</div>
                                    <div className="text-xl font-bold">
                                        <span className="text-blue-600">4</span>/<span className="text-red-600">8</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-sm text-gray-700 dark:text-gray-300 mt-3 text-center">
                                Si multiplicas (o divides) <span className="font-bold">numerador y denominador por el mismo número</span>,
                                obtienes una fracción equivalente.
                            </p>
                        </div>

                        {/* Cross multiplication method */}
                        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl border-2 border-purple-300 dark:border-purple-700 p-4">
                            <h3 className="font-bold text-purple-700 dark:text-purple-300 mb-3">Productos Cruzados</h3>

                            <div className="flex items-center justify-center gap-4 mb-3">
                                <div className="text-center">
                                    <div className="text-2xl font-bold">
                                        <span className="text-blue-600">1</span>/<span className="text-red-600">2</span>
                                    </div>
                                </div>
                                <span className="text-lg text-gray-400">=</span>
                                <div className="text-center">
                                    <div className="text-2xl font-bold">
                                        <span className="text-blue-600">2</span>/<span className="text-red-600">4</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white dark:bg-gray-800 rounded-lg p-3 text-center">
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    <span className="font-bold text-blue-600">1</span> × <span className="font-bold text-red-600">4</span> = <span className="font-bold">4</span>
                                    {' '}<span className="text-gray-400">y</span>{' '}
                                    <span className="font-bold text-red-600">2</span> × <span className="font-bold text-blue-600">2</span> = <span className="font-bold">4</span>
                                </p>
                                <p className="text-sm font-bold text-green-600 mt-1">4 = 4 → ¡Son equivalentes! ✅</p>
                            </div>
                        </div>

                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-3">
                            <p className="text-sm text-gray-800 dark:text-gray-200">
                                <span className="font-bold">📝 Regla:</span> Dos fracciones son equivalentes si sus{' '}
                                <span className="font-bold text-purple-600">productos cruzados</span> son iguales.
                            </p>
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
