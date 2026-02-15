'use client';

import React, { useRef, useState } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface Props { zoom?: number; }

export function EjemplosPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        EX_BALLS: 'fracciones-ex-balls',
        EX_BOOKS: 'fracciones-ex-books',
        EX_CAKE: 'fracciones-ex-cake',
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
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones' }} pageId="fracciones-ejemplos">
            <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-6">EJEMPLOS</h2>

            <div className="space-y-6">
                {/* Example 1: Balls */}
                <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <PlayBtn trackingId={VIDEO_TRACKING.EX_BALLS} title="Ejemplo: Pelotas" />
                        <span className="bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">1</span>
                        <p className="font-bold text-gray-800 dark:text-gray-200">Pelotas</p>
                    </div>

                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                        De <span className="font-bold">10</span> pelotas, <span className="font-bold text-red-600">3</span> son rojas.
                    </p>

                    <div className="flex gap-1.5 mb-3 justify-center flex-wrap">
                        {Array.from({ length: 10 }, (_, i) => (
                            <div key={i} className={`w-9 h-9 rounded-full flex items-center justify-center text-lg ${i < 3 ? 'bg-red-400' : 'bg-blue-300'
                                }`}>
                                ⚽
                            </div>
                        ))}
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-2 text-center">
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                            Fracción de pelotas rojas: <span className="text-2xl font-bold text-red-600">3</span>
                            <span className="text-xl text-gray-400">/</span>
                            <span className="text-2xl font-bold text-blue-600">10</span>
                        </p>
                    </div>
                </div>

                {/* Example 2: Books */}
                <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <PlayBtn trackingId={VIDEO_TRACKING.EX_BOOKS} title="Ejemplo: Libros" />
                        <span className="bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">2</span>
                        <p className="font-bold text-gray-800 dark:text-gray-200">Libros</p>
                    </div>

                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                        María tiene <span className="font-bold">5</span> libros. Ha leído <span className="font-bold text-green-600">2</span>.
                    </p>

                    <div className="flex gap-2 mb-3 justify-center">
                        {Array.from({ length: 5 }, (_, i) => (
                            <div key={i} className={`w-8 h-12 rounded border-2 flex items-center justify-center text-sm ${i < 2 ? 'bg-green-200 border-green-500' : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                                }`}>
                                📖
                            </div>
                        ))}
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2 text-center">
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                            Fracción de libros leídos: <span className="text-2xl font-bold text-green-600">2</span>
                            <span className="text-xl text-gray-400">/</span>
                            <span className="text-2xl font-bold text-purple-600">5</span>
                        </p>
                    </div>
                </div>

                {/* Example 3: Cake */}
                <div className="rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-5">
                    <div className="flex items-center gap-2 mb-3">
                        <PlayBtn trackingId={VIDEO_TRACKING.EX_CAKE} title="Ejemplo: Pastel" />
                        <span className="bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">3</span>
                        <p className="font-bold text-gray-800 dark:text-gray-200">Pastel</p>
                    </div>

                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                        Un pastel se corta en <span className="font-bold">6</span> partes. Se comen <span className="font-bold text-orange-600">4</span>.
                    </p>

                    <div className="flex gap-1.5 mb-3 justify-center">
                        {Array.from({ length: 6 }, (_, i) => (
                            <div key={i} className={`w-12 h-8 rounded border-2 flex items-center justify-center text-sm ${i < 4 ? 'bg-orange-300 border-orange-500 line-through opacity-70' : 'bg-yellow-100 dark:bg-yellow-900 border-yellow-400'
                                }`}>
                                🍰
                            </div>
                        ))}
                    </div>

                    <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-2 text-center">
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                            Fracción comida: <span className="text-2xl font-bold text-orange-600">4</span>
                            <span className="text-xl text-gray-400">/</span>
                            <span className="text-2xl font-bold text-yellow-600">6</span>
                        </p>
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
