'use client';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface Props { zoom?: number; }

export function ConceptoAbstracto2Page({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        A2_VISUAL: 'fracciones-a2-visual',
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

    // Shapes with fractions — user fills in numerator and denominator
    const shapes = [
        { id: 1, name: 'Rectángulo', total: 4, shaded: 1, shape: 'rect' },
        { id: 2, name: 'Rectángulo', total: 6, shaded: 4, shape: 'rect' },
        { id: 3, name: 'Rectángulo', total: 5, shaded: 2, shape: 'rect' },
    ];

    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [listoResult, setListoResult] = useState<'correct' | 'incorrect' | null>(null);

    const handleListo = () => {
        const allCorrect = shapes.every(s =>
            parseInt(answers[`${s.id}-n`]) === s.shaded &&
            parseInt(answers[`${s.id}-d`]) === s.total
        );
        setListoResult(allCorrect ? 'correct' : 'incorrect');
    };

    const handleReset = () => {
        setAnswers({});
        setListoResult(null);
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones' }} pageId="fracciones-concepto-abstracto-2">
            <div className="relative ml-2 flex items-start">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center" style={{ backgroundColor: '#be90de' }}>
                    A
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 bg-white" style={{ borderColor: '#be90de' }}>

                    <div className="mt-4 space-y-5">
                        <div className="flex items-center gap-2">
                            <PlayBtn trackingId={VIDEO_TRACKING.A2_VISUAL} title="Práctica Visual de Fracciones" />
                            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                Escribe la fracción que representa cada figura
                            </p>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                            Observa las partes coloreadas y escribe el numerador (arriba) y denominador (abajo).
                        </p>

                        <div className="space-y-6">
                            {shapes.map((shape) => (
                                <div key={shape.id} className={`flex items-center gap-4 p-4 rounded-xl border-2 ${listoResult === 'correct' ? 'border-green-300 bg-green-50 dark:bg-green-900/10' :
                                    listoResult === 'incorrect' ? 'border-red-200 bg-red-50 dark:bg-red-900/10' :
                                        'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50'
                                    }`}>
                                    {/* Visual shape */}
                                    <div className="flex gap-1">
                                        {Array.from({ length: shape.total }, (_, i) => (
                                            <div
                                                key={i}
                                                className={`w-10 h-14 rounded border-2 ${i < shape.shaded
                                                    ? 'bg-purple-400 dark:bg-purple-600 border-purple-600 dark:border-purple-400'
                                                    : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'
                                                    }`}
                                            />
                                        ))}
                                    </div>

                                    {/* Fraction input */}
                                    <div className="flex flex-col items-center">
                                        <input
                                            type="number"
                                            value={answers[`${shape.id}-n`] || ''}
                                            onChange={(e) => { setAnswers(prev => ({ ...prev, [`${shape.id}-n`]: e.target.value })); setListoResult(null); }}
                                            className="w-12 h-8 text-center font-bold text-blue-600 rounded border-2 border-blue-400 bg-white dark:bg-gray-700 text-sm"
                                            placeholder="?"
                                            disabled={listoResult === 'correct'}
                                        />
                                        <div className="w-12 border-t-2 border-gray-800 dark:border-gray-300 my-1"></div>
                                        <input
                                            type="number"
                                            value={answers[`${shape.id}-d`] || ''}
                                            onChange={(e) => { setAnswers(prev => ({ ...prev, [`${shape.id}-d`]: e.target.value })); setListoResult(null); }}
                                            className="w-12 h-8 text-center font-bold text-red-600 rounded border-2 border-red-400 bg-white dark:bg-gray-700 text-sm"
                                            placeholder="?"
                                            disabled={listoResult === 'correct'}
                                        />
                                    </div>

                                    {/* Label */}
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {shape.shaded} de {shape.total} coloreados
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* ¿LISTO? */}
                        <div className="flex items-center gap-3 justify-center">
                            {listoResult !== 'correct' && (
                                <button onClick={handleListo}
                                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-sm">
                                    ¿LISTO?
                                </button>
                            )}
                            {listoResult === 'incorrect' && (
                                <button onClick={handleReset}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg text-sm">
                                    Reiniciar
                                </button>
                            )}
                        </div>
                        {listoResult === 'correct' && <p className="text-center text-green-600 font-bold">✅ ¡Correcto! Escribiste todas las fracciones bien.</p>}
                        {listoResult === 'incorrect' && <p className="text-center text-red-500 font-bold text-sm">❌ Revisa: numerador = partes coloreadas, denominador = total de partes.</p>}
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
