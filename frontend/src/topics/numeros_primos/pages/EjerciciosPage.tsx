'use client';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

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

    // Drag and drop: classify numbers as primo or compuesto
    const allNumbers = [
        { num: 3, type: 'primo' },
        { num: 6, type: 'compuesto' },
        { num: 7, type: 'primo' },
        { num: 10, type: 'compuesto' },
        { num: 13, type: 'primo' },
        { num: 14, type: 'compuesto' },
        { num: 17, type: 'primo' },
        { num: 18, type: 'compuesto' },
        { num: 19, type: 'primo' },
        { num: 20, type: 'compuesto' },
    ];

    const [primoZone, setPrimoZone] = useState<number[]>([]);
    const [compuestoZone, setCompuestoZone] = useState<number[]>([]);
    const [available, setAvailable] = useState<number[]>(allNumbers.map(n => n.num));
    const [draggedNum, setDraggedNum] = useState<number | null>(null);
    const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);

    const handleDragStart = (num: number) => setDraggedNum(num);

    const removeFromAll = (num: number) => {
        setAvailable(prev => prev.filter(n => n !== num));
        setPrimoZone(prev => prev.filter(n => n !== num));
        setCompuestoZone(prev => prev.filter(n => n !== num));
    };

    const handleDropPrimo = () => {
        if (draggedNum === null) return;
        removeFromAll(draggedNum);
        setPrimoZone(prev => [...prev, draggedNum]);
        setDraggedNum(null);
        setResult(null);
    };

    const handleDropCompuesto = () => {
        if (draggedNum === null) return;
        removeFromAll(draggedNum);
        setCompuestoZone(prev => [...prev, draggedNum]);
        setDraggedNum(null);
        setResult(null);
    };

    const handleDropBack = () => {
        if (draggedNum === null) return;
        setPrimoZone(prev => prev.filter(n => n !== draggedNum));
        setCompuestoZone(prev => prev.filter(n => n !== draggedNum));
        if (!available.includes(draggedNum)) {
            setAvailable(prev => [...prev, draggedNum].sort((a, b) => a - b));
        }
        setDraggedNum(null);
        setResult(null);
    };

    const handleCheck = async () => {
        const primosCorrect = primoZone.every(n => allNumbers.find(a => a.num === n)?.type === 'primo');
        const compuestosCorrect = compuestoZone.every(n => allNumbers.find(a => a.num === n)?.type === 'compuesto');
        const allPlaced = available.length === 0;

        const isCorrect = primosCorrect && compuestosCorrect && allPlaced;
        setResult(isCorrect ? 'correct' : 'incorrect');
        await submitExercise('numeros-primos-classify', isCorrect);
    };

    const handleReset = () => {
        setPrimoZone([]);
        setCompuestoZone([]);
        setAvailable(allNumbers.map(n => n.num));
        setResult(null);
    };

    const NumberChip = ({ num }: { num: number }) => (
        <div
            draggable
            onDragStart={() => handleDragStart(num)}
            className="w-10 h-10 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center font-bold text-gray-800 dark:text-gray-200 cursor-grab active:cursor-grabbing select-none hover:shadow-md transition-shadow"
        >
            {num}
        </div>
    );

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Números Primos' }} pageId="numeros-primos-ejercicios">
            <div className="flex items-center gap-2 mb-6">
                <PlayBtn trackingId={VIDEO_TRACKING.INTRO} title="Ejercicios de Números Primos" size="md" />
                <h2 className="text-2xl font-bold text-green-700 dark:text-green-300">EJERCICIOS</h2>
            </div>

            <div className={`rounded-xl border-2 p-5 ${result === 'correct' ? 'border-green-400 bg-green-50 dark:bg-green-900/10' :
                result === 'incorrect' ? 'border-red-400 bg-red-50 dark:bg-red-900/10' :
                    'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50'
                }`}>
                <p className="font-bold text-gray-800 dark:text-gray-200 mb-2">
                    Arrastra cada número a la categoría correcta:
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 italic">
                    Número primo = solo divisible por 1 y sí mismo. Número compuesto = tiene más de 2 divisores.
                </p>

                {/* Available numbers */}
                <div
                    className="bg-gray-50 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-3 min-h-[50px] flex flex-wrap gap-2 justify-center mb-4"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDropBack}
                >
                    {available.length > 0 ? (
                        available.map(num => <NumberChip key={num} num={num} />)
                    ) : (
                        <p className="text-gray-400 text-sm">Todos los números clasificados</p>
                    )}
                </div>

                {/* Drop zones */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    {/* Primo zone */}
                    <div
                        className={`rounded-xl p-3 min-h-[120px] border-2 ${result === 'correct' ? 'border-green-400 bg-green-50 dark:bg-green-900/20' :
                            'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-900/10'
                            }`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDropPrimo}
                    >
                        <p className="text-center font-bold text-green-700 dark:text-green-300 mb-2 text-sm">🟢 PRIMO</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {primoZone.map(num => <NumberChip key={num} num={num} />)}
                        </div>
                    </div>

                    {/* Compuesto zone */}
                    <div
                        className={`rounded-xl p-3 min-h-[120px] border-2 ${result === 'correct' ? 'border-orange-400 bg-orange-50 dark:bg-orange-900/20' :
                            'border-orange-300 dark:border-orange-700 bg-orange-50 dark:bg-orange-900/10'
                            }`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDropCompuesto}
                    >
                        <p className="text-center font-bold text-orange-600 dark:text-orange-300 mb-2 text-sm">🟠 COMPUESTO</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {compuestoZone.map(num => <NumberChip key={num} num={num} />)}
                        </div>
                    </div>
                </div>

                {/* ¿LISTO? */}
                <div className="flex items-center gap-3 justify-center">
                    {result !== 'correct' && (
                        <button onClick={handleCheck}
                            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-sm">
                            ¿LISTO?
                        </button>
                    )}
                    {result === 'incorrect' && (
                        <button onClick={handleReset}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg text-sm">
                            Reiniciar
                        </button>
                    )}
                </div>
                {result === 'correct' && (
                    <p className="text-center text-green-600 font-bold text-sm mt-2">
                        ✅ ¡Excelente! Clasificaste correctamente todos los números.
                    </p>
                )}
                {result === 'incorrect' && (
                    <p className="text-center text-red-500 font-bold text-sm mt-2">
                        ❌ Algunos números están en la categoría incorrecta. Verifica e intenta de nuevo.
                    </p>
                )}
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
