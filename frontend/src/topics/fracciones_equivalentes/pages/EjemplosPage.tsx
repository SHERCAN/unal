'use client';

import React, { useRef, useState } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface Props { zoom?: number; }

export function EjemplosPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        EX_PIZZA: 'frac-equiv-ex-pizza',
        EX_CROSS: 'frac-equiv-ex-cross',
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

    const PlayBtn = ({ trackingId, title, size = 'sm' }: { trackingId: string; title: string; size?: 'sm' | 'md' }) => {
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
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones Equivalentes' }} pageId="frac-equiv-ejemplos">
            <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-6">EJEMPLOS</h2>

            <div className="space-y-6">
                {/* Example 1: Pizza equivalence */}
                <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <PlayBtn trackingId={VIDEO_TRACKING.EX_PIZZA} title="Ejemplo: Pizza" />
                        <span className="bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">1</span>
                        <p className="font-bold text-gray-800 dark:text-gray-200">Pizzas Equivalentes</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Pizza 1: 1/2 */}
                        <div className="text-center">
                            <div className="flex justify-center">
                                <svg viewBox="0 0 100 100" className="w-28 h-28">
                                    <path d="M 50 50 L 50 5 A 45 45 0 0 1 50 95 Z" fill="#f59e0b" stroke="#92400e" strokeWidth="1" />
                                    <path d="M 50 50 L 50 95 A 45 45 0 0 1 50 5 Z" fill="#e5e7eb" stroke="#92400e" strokeWidth="1" />
                                    <circle cx="50" cy="50" r="3" fill="#92400e" />
                                </svg>
                            </div>
                            <p className="text-lg font-bold text-blue-600 mt-1">1/2</p>
                        </div>

                        {/* Pizza 2: 2/4 */}
                        <div className="text-center">
                            <div className="flex justify-center">
                                <svg viewBox="0 0 100 100" className="w-28 h-28">
                                    <path d="M 50 50 L 95 50 A 45 45 0 0 1 50 95 Z" fill="#f59e0b" stroke="#92400e" strokeWidth="1" />
                                    <path d="M 50 50 L 50 95 A 45 45 0 0 1 5 50 Z" fill="#f59e0b" stroke="#92400e" strokeWidth="1" />
                                    <path d="M 50 50 L 5 50 A 45 45 0 0 1 50 5 Z" fill="#e5e7eb" stroke="#92400e" strokeWidth="1" />
                                    <path d="M 50 50 L 50 5 A 45 45 0 0 1 95 50 Z" fill="#e5e7eb" stroke="#92400e" strokeWidth="1" />
                                    <circle cx="50" cy="50" r="3" fill="#92400e" />
                                </svg>
                            </div>
                            <p className="text-lg font-bold text-blue-600 mt-1">2/4</p>
                        </div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2 text-center mt-3">
                        <p className="text-sm font-bold text-green-600">
                            1/2 = 2/4 → ¡Misma cantidad de pizza! ✅
                        </p>
                    </div>
                </div>

                {/* Example 2: Cross products */}
                <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <PlayBtn trackingId={VIDEO_TRACKING.EX_CROSS} title="Ejemplo: Productos Cruzados" />
                        <span className="bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">2</span>
                        <p className="font-bold text-gray-800 dark:text-gray-200">Verificar con Productos Cruzados</p>
                    </div>

                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                        ¿Son equivalentes <span className="font-bold">3/4</span> y <span className="font-bold">9/12</span>?
                    </p>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                        <div className="flex items-center justify-center gap-6 mb-3">
                            <div className="text-2xl font-bold">
                                <span className="text-blue-600">3</span>/<span className="text-red-600">4</span>
                            </div>
                            <span className="text-gray-400 text-xl">y</span>
                            <div className="text-2xl font-bold">
                                <span className="text-blue-600">9</span>/<span className="text-red-600">12</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2 border border-blue-300">
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    <span className="font-bold text-blue-600">3</span> × <span className="font-bold text-red-600">12</span> = <span className="font-bold text-lg">36</span>
                                </p>
                            </div>
                            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-2 border border-red-300">
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    <span className="font-bold text-red-600">4</span> × <span className="font-bold text-blue-600">9</span> = <span className="font-bold text-lg">36</span>
                                </p>
                            </div>
                        </div>

                        <p className="text-center text-green-600 font-bold mt-2">36 = 36 → ¡Son equivalentes! ✅</p>
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
