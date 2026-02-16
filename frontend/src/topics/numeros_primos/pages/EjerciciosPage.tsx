'use client';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

/**
 * Frame 169 — Números Primos: Ejercicios
 * Connection exercise: numbers 2, 6, 11, 14, 15, 17
 * Each number connects to either "primos" or "compuestos"
 */

interface Props { zoom?: number; }

export function EjerciciosPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched, submitExercise } = useVideoProgress();

    const VIDEO_TRACKING = {
        INTRO: 'numeros-primos-ej-intro',
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

    const PlayBtn = ({ trackingId, title }: { trackingId: string; title: string }) => {
        const watched = isVideoWatched(trackingId);
        return (
            <button type="button" onClick={() => openVideo(trackingId, title)}
                className={`w-8 h-8 flex items-center justify-center text-white rounded-full transition-all flex-shrink-0 ${watched ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'}`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </button>
        );
    };

    // Numbers from Frame 169
    const allNumbers = [
        { num: 2, type: 'primo' },
        { num: 6, type: 'compuesto' },
        { num: 11, type: 'primo' },
        { num: 14, type: 'compuesto' },
        { num: 15, type: 'compuesto' },
        { num: 17, type: 'primo' },
    ];

    const [connections, setConnections] = useState<Record<number, string>>({});
    const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);

    const handleConnect = (num: number, target: string) => {
        if (result === 'correct') return;
        setConnections(prev => ({ ...prev, [num]: target }));
        setResult(null);
    };

    const handleCheck = async () => {
        const allCorrect = allNumbers.every(n => connections[n.num] === n.type);
        const allAnswered = allNumbers.every(n => connections[n.num]);
        const isCorrect = allCorrect && allAnswered;
        setResult(isCorrect ? 'correct' : 'incorrect');
        await submitExercise('numeros-primos-classify', isCorrect);
    };

    const handleReset = () => {
        setConnections({});
        setResult(null);
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Números Primos' }} pageId="numeros-primos-ejercicios">
            {/* Title */}
            <h2 className="text-2xl font-extrabold text-purple-700 dark:text-purple-400 mb-6 tracking-wide">EJERCICIOS</h2>

            {/* Exercise 1 header */}
            <div className="flex items-center gap-2 mb-6">
                <PlayBtn trackingId={VIDEO_TRACKING.INTRO} title="Ejercicios de Números Primos" />
                <span className="bg-purple-600 text-white font-extrabold text-xl px-3 py-1 rounded">1</span>
                <p className="text-gray-800 dark:text-gray-200">
                    Los números dados relacionan correctamente con primos y compuestos.
                </p>
            </div>

            {/* Connection exercise */}
            <div className="flex items-start justify-center gap-12">
                {/* Left: Numbers column */}
                <div className="flex flex-col items-center gap-4">
                    {allNumbers.map(({ num }) => (
                        <div key={num} className="flex items-center gap-2">
                            <span className="font-bold text-lg text-gray-800 dark:text-gray-200 w-8 text-right">{num}</span>
                            <button
                                onClick={() => {
                                    // Toggle: if already set, cycle or allow re-pick
                                    if (connections[num] === 'primo') {
                                        handleConnect(num, 'compuesto');
                                    } else if (connections[num] === 'compuesto') {
                                        handleConnect(num, '');
                                    } else {
                                        handleConnect(num, 'primo');
                                    }
                                }}
                                className={`w-6 h-6 rounded-sm transition-all ${result === 'correct' && connections[num]
                                        ? connections[num] === allNumbers.find(n => n.num === num)?.type
                                            ? 'bg-green-500'
                                            : 'bg-red-500'
                                        : result === 'incorrect' && connections[num]
                                            ? connections[num] === allNumbers.find(n => n.num === num)?.type
                                                ? 'bg-green-500'
                                                : 'bg-red-500'
                                            : connections[num] === 'primo'
                                                ? 'bg-green-500'
                                                : connections[num] === 'compuesto'
                                                    ? 'bg-orange-500'
                                                    : 'bg-purple-600 dark:bg-purple-500'
                                    }`}
                                disabled={result === 'correct'}
                                title={`Conectar ${num} (click para cambiar)`}
                            />
                        </div>
                    ))}
                </div>

                {/* Right: Categories */}
                <div className="flex flex-col justify-center gap-6 pt-8">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-green-500 rounded-sm" />
                        <span className="text-gray-800 dark:text-gray-200 font-medium">primos</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-orange-500 rounded-sm" />
                        <span className="text-gray-800 dark:text-gray-200 font-medium">compuestos</span>
                    </div>
                </div>
            </div>

            {/* Check / Status */}
            <div className="flex items-center gap-3 justify-center mt-8">
                {result !== 'correct' && (
                    <button onClick={handleCheck}
                        className="px-5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded text-sm">
                        ¿LISTO?
                    </button>
                )}
                {result === 'incorrect' && (
                    <button onClick={handleReset}
                        className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded text-sm">
                        Reiniciar
                    </button>
                )}
            </div>
            {result === 'correct' && (
                <p className="text-center text-green-600 dark:text-green-400 font-bold text-sm mt-3">
                    ✅ ¡Excelente! Clasificaste correctamente todos los números.
                </p>
            )}
            {result === 'incorrect' && (
                <p className="text-center text-red-500 font-bold text-sm mt-3">
                    ❌ Algunos números están mal clasificados. Verifica e intenta de nuevo.
                </p>
            )}

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
