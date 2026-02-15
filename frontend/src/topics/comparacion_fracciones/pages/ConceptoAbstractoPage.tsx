'use client';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface Props { zoom?: number; }

export function ConceptoAbstractoPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        A_NOTATION: 'comp-frac-a-notation',
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

    // Practice: compare fractions with cross products
    const exercises = [
        { a: 2, b: 3, c: 3, d: 5, answer: '>' },   // 2×5=10 vs 3×3=9 → 10>9 → >
        { a: 1, b: 4, c: 2, d: 6, answer: '<' },    // 1×6=6 vs 4×2=8 → 6<8 → <
        { a: 3, b: 6, c: 2, d: 4, answer: '=' },    // 3×4=12 vs 6×2=12 → = 
    ];

    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [listoResult, setListoResult] = useState<'correct' | 'incorrect' | null>(null);

    const handleListo = () => {
        const allCorrect = exercises.every((ex, i) => answers[i] === ex.answer);
        setListoResult(allCorrect ? 'correct' : 'incorrect');
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Comparación de Fracciones' }} pageId="comp-frac-concepto-abstracto">
            <div className="relative border-2 rounded-xl p-6" style={{ borderColor: '#be90de' }}>
                <div className="absolute -top-4 left-4 px-3 py-1 rounded font-black text-xl text-white" style={{ backgroundColor: '#be90de' }}>
                    A
                </div>

                <div className="mt-4 space-y-5">
                    <div className="flex items-center gap-2">
                        <PlayBtn trackingId={VIDEO_TRACKING.A_NOTATION} title="Comparación Matemática" />
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                            Compara con Productos Cruzados
                        </p>
                    </div>

                    {/* Rule box */}
                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-xl border-2 border-orange-300 dark:border-orange-700 p-4">
                        <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                            Para comparar <span className="font-bold">a/b</span> y <span className="font-bold">c/d</span>:
                        </p>
                        <div className="grid grid-cols-3 gap-2 mt-2 text-center text-sm">
                            <div className="bg-green-100 dark:bg-green-900/30 rounded p-2">
                                <p className="font-bold">a×d &gt; b×c</p>
                                <p className="text-xs text-gray-500">a/b &gt; c/d</p>
                            </div>
                            <div className="bg-red-100 dark:bg-red-900/30 rounded p-2">
                                <p className="font-bold">a×d &lt; b×c</p>
                                <p className="text-xs text-gray-500">a/b &lt; c/d</p>
                            </div>
                            <div className="bg-blue-100 dark:bg-blue-900/30 rounded p-2">
                                <p className="font-bold">a×d = b×c</p>
                                <p className="text-xs text-gray-500">a/b = c/d</p>
                            </div>
                        </div>
                    </div>

                    {/* PRÁCTICA */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-orange-300 dark:border-orange-700 p-4">
                        <h4 className="bg-orange-600 text-white font-bold px-3 py-1 rounded inline-block text-sm mb-4">PRÁCTICA</h4>

                        <div className="space-y-4">
                            {exercises.map((ex, i) => (
                                <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border-2 flex-wrap ${listoResult === 'correct' ? 'border-green-300 bg-green-50 dark:bg-green-900/10' :
                                    listoResult === 'incorrect' && answers[i] !== ex.answer
                                        ? 'border-red-300 bg-red-50 dark:bg-red-900/10' :
                                        'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                                    }`}>
                                    <span className="text-lg font-bold">
                                        <span className="text-blue-600">{ex.a}</span>/<span className="text-red-600">{ex.b}</span>
                                    </span>

                                    <select
                                        value={answers[i] || ''}
                                        onChange={(e) => { setAnswers(prev => ({ ...prev, [i]: e.target.value })); setListoResult(null); }}
                                        className="border-2 rounded px-3 py-1 text-lg font-bold border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 min-w-[60px] text-center"
                                        disabled={listoResult === 'correct'}
                                    >
                                        <option value="">?</option>
                                        <option value=">">&gt;</option>
                                        <option value="<">&lt;</option>
                                        <option value="=">=</option>
                                    </select>

                                    <span className="text-lg font-bold">
                                        <span className="text-blue-600">{ex.c}</span>/<span className="text-red-600">{ex.d}</span>
                                    </span>

                                    <span className="text-xs text-gray-400">
                                        ({ex.a}×{ex.d}={ex.a * ex.d} vs {ex.b}×{ex.c}={ex.b * ex.c})
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 justify-center mt-4">
                            {listoResult !== 'correct' && (
                                <button onClick={handleListo}
                                    className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg text-sm">
                                    ¿LISTO?
                                </button>
                            )}
                        </div>
                        {listoResult === 'correct' && <p className="text-center text-green-600 font-bold mt-2">✅ ¡Correcto!</p>}
                        {listoResult === 'incorrect' && <p className="text-center text-red-500 font-bold text-sm mt-2">❌ Revisa los productos cruzados.</p>}
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
