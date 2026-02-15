'use client';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface Props { zoom?: number; }

export function ConceptoAbstracto2Page({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        A2_SIMP: 'frac-equiv-a2-simplification',
        A2_AMP: 'frac-equiv-a2-amplification',
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

    // Simplification exercises
    const [simpAnswers, setSimpAnswers] = useState<Record<string, string>>({});
    const [simpResult, setSimpResult] = useState<'correct' | 'incorrect' | null>(null);

    // Amplification exercises
    const [ampAnswers, setAmpAnswers] = useState<Record<string, string>>({});
    const [ampResult, setAmpResult] = useState<'correct' | 'incorrect' | null>(null);

    const handleCheckSimp = () => {
        // 4/8 ÷2 → 2/4, 6/9 ÷3 → 2/3
        const correct = parseInt(simpAnswers['0-n']) === 2 && parseInt(simpAnswers['0-d']) === 4 &&
            parseInt(simpAnswers['1-n']) === 2 && parseInt(simpAnswers['1-d']) === 3;
        setSimpResult(correct ? 'correct' : 'incorrect');
    };

    const handleCheckAmp = () => {
        // 1/3 ×2 → 2/6, 2/5 ×3 → 6/15
        const correct = parseInt(ampAnswers['0-n']) === 2 && parseInt(ampAnswers['0-d']) === 6 &&
            parseInt(ampAnswers['1-n']) === 6 && parseInt(ampAnswers['1-d']) === 15;
        setAmpResult(correct ? 'correct' : 'incorrect');
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones Equivalentes' }} pageId="frac-equiv-concepto-abstracto-2">
            <div className="relative border-2 rounded-xl p-6" style={{ borderColor: '#be90de' }}>
                <div className="absolute -top-4 left-4 px-3 py-1 rounded font-black text-xl text-white" style={{ backgroundColor: '#be90de' }}>
                    A
                </div>

                <div className="mt-4 space-y-6">
                    {/* SIMPLIFICACIÓN */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <PlayBtn trackingId={VIDEO_TRACKING.A2_SIMP} title="Simplificación" />
                            <h3 className="font-bold text-purple-700 dark:text-purple-300">Simplificación</h3>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            Dividir numerador y denominador por el <span className="font-bold">mismo número</span>.
                        </p>

                        <div className="space-y-3">
                            {/* 4/8 ÷ 2 = ?/? */}
                            <div className={`flex items-center gap-2 flex-wrap p-3 rounded-lg border-2 ${simpResult === 'correct' ? 'border-green-300 bg-green-50 dark:bg-green-900/10' :
                                'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50'
                                }`}>
                                <span className="text-lg font-bold"><span className="text-blue-600">4</span>/<span className="text-red-600">8</span></span>
                                <span className="text-sm text-gray-500">÷ 2 →</span>
                                <input type="number" value={simpAnswers['0-n'] || ''}
                                    onChange={(e) => { setSimpAnswers(prev => ({ ...prev, '0-n': e.target.value })); setSimpResult(null); }}
                                    className="w-10 h-7 text-center font-bold text-blue-600 rounded border-2 border-blue-400 bg-white dark:bg-gray-700 text-sm"
                                    placeholder="?" disabled={simpResult === 'correct'} />
                                <span className="text-gray-400 font-bold">/</span>
                                <input type="number" value={simpAnswers['0-d'] || ''}
                                    onChange={(e) => { setSimpAnswers(prev => ({ ...prev, '0-d': e.target.value })); setSimpResult(null); }}
                                    className="w-10 h-7 text-center font-bold text-red-600 rounded border-2 border-red-400 bg-white dark:bg-gray-700 text-sm"
                                    placeholder="?" disabled={simpResult === 'correct'} />
                            </div>

                            {/* 6/9 ÷ 3 = ?/? */}
                            <div className={`flex items-center gap-2 flex-wrap p-3 rounded-lg border-2 ${simpResult === 'correct' ? 'border-green-300 bg-green-50 dark:bg-green-900/10' :
                                'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50'
                                }`}>
                                <span className="text-lg font-bold"><span className="text-blue-600">6</span>/<span className="text-red-600">9</span></span>
                                <span className="text-sm text-gray-500">÷ 3 →</span>
                                <input type="number" value={simpAnswers['1-n'] || ''}
                                    onChange={(e) => { setSimpAnswers(prev => ({ ...prev, '1-n': e.target.value })); setSimpResult(null); }}
                                    className="w-10 h-7 text-center font-bold text-blue-600 rounded border-2 border-blue-400 bg-white dark:bg-gray-700 text-sm"
                                    placeholder="?" disabled={simpResult === 'correct'} />
                                <span className="text-gray-400 font-bold">/</span>
                                <input type="number" value={simpAnswers['1-d'] || ''}
                                    onChange={(e) => { setSimpAnswers(prev => ({ ...prev, '1-d': e.target.value })); setSimpResult(null); }}
                                    className="w-10 h-7 text-center font-bold text-red-600 rounded border-2 border-red-400 bg-white dark:bg-gray-700 text-sm"
                                    placeholder="?" disabled={simpResult === 'correct'} />
                            </div>
                        </div>

                        <div className="flex justify-center mt-2">
                            {simpResult !== 'correct' && (
                                <button onClick={handleCheckSimp}
                                    className="px-5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-sm">
                                    ¿LISTO?
                                </button>
                            )}
                        </div>
                        {simpResult === 'correct' && <p className="text-center text-green-600 font-bold text-sm mt-1">✅ ¡Correcto!</p>}
                        {simpResult === 'incorrect' && <p className="text-center text-red-500 font-bold text-sm mt-1">❌ Divide ambos números por el factor indicado.</p>}
                    </div>

                    <hr className="border-gray-200 dark:border-gray-700" />

                    {/* AMPLIFICACIÓN */}
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <PlayBtn trackingId={VIDEO_TRACKING.A2_AMP} title="Amplificación" />
                            <h3 className="font-bold text-purple-700 dark:text-purple-300">Amplificación</h3>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            Multiplicar numerador y denominador por el <span className="font-bold">mismo número</span>.
                        </p>

                        <div className="space-y-3">
                            {/* 1/3 × 2 = ?/? */}
                            <div className={`flex items-center gap-2 flex-wrap p-3 rounded-lg border-2 ${ampResult === 'correct' ? 'border-green-300 bg-green-50 dark:bg-green-900/10' :
                                'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50'
                                }`}>
                                <span className="text-lg font-bold"><span className="text-blue-600">1</span>/<span className="text-red-600">3</span></span>
                                <span className="text-sm text-gray-500">× 2 →</span>
                                <input type="number" value={ampAnswers['0-n'] || ''}
                                    onChange={(e) => { setAmpAnswers(prev => ({ ...prev, '0-n': e.target.value })); setAmpResult(null); }}
                                    className="w-10 h-7 text-center font-bold text-blue-600 rounded border-2 border-blue-400 bg-white dark:bg-gray-700 text-sm"
                                    placeholder="?" disabled={ampResult === 'correct'} />
                                <span className="text-gray-400 font-bold">/</span>
                                <input type="number" value={ampAnswers['0-d'] || ''}
                                    onChange={(e) => { setAmpAnswers(prev => ({ ...prev, '0-d': e.target.value })); setAmpResult(null); }}
                                    className="w-10 h-7 text-center font-bold text-red-600 rounded border-2 border-red-400 bg-white dark:bg-gray-700 text-sm"
                                    placeholder="?" disabled={ampResult === 'correct'} />
                            </div>

                            {/* 2/5 × 3 = ?/? */}
                            <div className={`flex items-center gap-2 flex-wrap p-3 rounded-lg border-2 ${ampResult === 'correct' ? 'border-green-300 bg-green-50 dark:bg-green-900/10' :
                                'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50'
                                }`}>
                                <span className="text-lg font-bold"><span className="text-blue-600">2</span>/<span className="text-red-600">5</span></span>
                                <span className="text-sm text-gray-500">× 3 →</span>
                                <input type="number" value={ampAnswers['1-n'] || ''}
                                    onChange={(e) => { setAmpAnswers(prev => ({ ...prev, '1-n': e.target.value })); setAmpResult(null); }}
                                    className="w-10 h-7 text-center font-bold text-blue-600 rounded border-2 border-blue-400 bg-white dark:bg-gray-700 text-sm"
                                    placeholder="?" disabled={ampResult === 'correct'} />
                                <span className="text-gray-400 font-bold">/</span>
                                <input type="number" value={ampAnswers['1-d'] || ''}
                                    onChange={(e) => { setAmpAnswers(prev => ({ ...prev, '1-d': e.target.value })); setAmpResult(null); }}
                                    className="w-10 h-7 text-center font-bold text-red-600 rounded border-2 border-red-400 bg-white dark:bg-gray-700 text-sm"
                                    placeholder="?" disabled={ampResult === 'correct'} />
                            </div>
                        </div>

                        <div className="flex justify-center mt-2">
                            {ampResult !== 'correct' && (
                                <button onClick={handleCheckAmp}
                                    className="px-5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-sm">
                                    ¿LISTO?
                                </button>
                            )}
                        </div>
                        {ampResult === 'correct' && <p className="text-center text-green-600 font-bold text-sm mt-1">✅ ¡Correcto!</p>}
                        {ampResult === 'incorrect' && <p className="text-center text-red-500 font-bold text-sm mt-1">❌ Multiplica ambos números por el factor indicado.</p>}
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
