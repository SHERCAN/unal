'use client';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface Props { zoom?: number; }

export function ConceptoAbstracto1Page({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        A1_CROSS: 'frac-equiv-a1-cross',
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

    // Practice: cross products
    const exercises = [
        { a: 2, b: 3, c: 4, d: 6, equivalent: true },  // 2×6=12, 3×4=12
        { a: 1, b: 4, c: 3, d: 8, equivalent: false },  // 1×8=8, 4×3=12
        { a: 3, b: 5, c: 6, d: 10, equivalent: true },  // 3×10=30, 5×6=30
    ];

    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [listoResult, setListoResult] = useState<'correct' | 'incorrect' | null>(null);

    const handleListo = () => {
        const allCorrect = exercises.every((ex, i) => {
            const expected = ex.equivalent ? 'si' : 'no';
            return answers[i] === expected;
        });
        setListoResult(allCorrect ? 'correct' : 'incorrect');
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones Equivalentes' }} pageId="frac-equiv-concepto-abstracto-1">
            <div className="relative border-2 rounded-xl p-6" style={{ borderColor: '#be90de' }}>
                <div className="absolute -top-4 left-4 px-3 py-1 rounded font-black text-xl text-white" style={{ backgroundColor: '#be90de' }}>
                    A
                </div>

                <div className="mt-4 space-y-5">
                    <div className="flex items-center gap-2">
                        <PlayBtn trackingId={VIDEO_TRACKING.A1_CROSS} title="Productos Cruzados" />
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                            Productos Cruzados — Práctica
                        </p>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-300 dark:border-purple-700 p-3">
                        <p className="text-sm text-gray-800 dark:text-gray-200">
                            <span className="font-bold">Regla:</span> a/b = c/d si{' '}
                            <span className="font-bold text-purple-600">a × d = b × c</span>
                        </p>
                    </div>

                    <div className="space-y-4">
                        {exercises.map((ex, i) => (
                            <div key={i} className={`rounded-xl border-2 p-4 ${listoResult === 'correct' ? 'border-green-300 bg-green-50 dark:bg-green-900/10' :
                                listoResult === 'incorrect' && answers[i] !== (ex.equivalent ? 'si' : 'no')
                                    ? 'border-red-300 bg-red-50 dark:bg-red-900/10' :
                                    'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50'
                                }`}>
                                <div className="flex items-center gap-4 flex-wrap">
                                    {/* Fraction pair */}
                                    <div className="flex items-center gap-2">
                                        <div className="text-center">
                                            <span className="text-xl font-bold text-blue-600">{ex.a}</span>
                                            <span className="text-lg text-gray-400">/</span>
                                            <span className="text-xl font-bold text-red-600">{ex.b}</span>
                                        </div>
                                        <span className="text-gray-400 text-lg">y</span>
                                        <div className="text-center">
                                            <span className="text-xl font-bold text-blue-600">{ex.c}</span>
                                            <span className="text-lg text-gray-400">/</span>
                                            <span className="text-xl font-bold text-red-600">{ex.d}</span>
                                        </div>
                                    </div>

                                    {/* Cross products */}
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        <p>{ex.a}×{ex.d}={ex.a * ex.d}</p>
                                        <p>{ex.b}×{ex.c}={ex.b * ex.c}</p>
                                    </div>

                                    <select
                                        value={answers[i] || ''}
                                        onChange={(e) => { setAnswers(prev => ({ ...prev, [i]: e.target.value })); setListoResult(null); }}
                                        className="border-2 rounded px-2 py-1 text-sm font-bold border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                        disabled={listoResult === 'correct'}
                                    >
                                        <option value="">¿Equivalentes?</option>
                                        <option value="si">Sí ✓</option>
                                        <option value="no">No ✗</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 justify-center">
                        {listoResult !== 'correct' && (
                            <button onClick={handleListo}
                                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-sm">
                                ¿LISTO?
                            </button>
                        )}
                    </div>
                    {listoResult === 'correct' && <p className="text-center text-green-600 font-bold">✅ ¡Correcto!</p>}
                    {listoResult === 'incorrect' && <p className="text-center text-red-500 font-bold text-sm">❌ Compara los productos cruzados e intenta de nuevo.</p>}
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
