'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';


interface Props { zoom?: number; }

export function ConceptoAbstracto2Page({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        A2_SIMP: 'frac-equiv-a2-simplification',
        A2_AMP: 'frac-equiv-a2-amplification',
    };

    /* videoModal list removed */
    /* ref removed */

    /* handleVideoComplete removed */

    /* openVideo removed */

    /* PlayButton definition removed */

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

    const resetSimp = () => { setSimpAnswers({}); setSimpResult(null); };
    const resetAmp = () => { setAmpAnswers({}); setAmpResult(null); };


    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones Equivalentes' }} pageId="frac-equiv-concepto-abstracto-2">
            <div className="relative ml-2 flex items-start">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center" style={{ backgroundColor: '#be90de' }}>
                    A
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 bg-white" style={{ borderColor: '#be90de' }}>

                    <div className="mt-4 space-y-6">
                        {/* SIMPLIFICACIÓN */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <PlayVideoButton trackingId={VIDEO_TRACKING.A2_SIMP} title="Simplificación" videoId="/pag1/vv-1" />
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
                                <FeedbackButton
                                    onCheck={handleCheckSimp}
                                    onReset={resetSimp}
                                    status={simpResult}
                                />
                            </div>
                        </div>

                        <hr className="border-gray-200 dark:border-gray-700" />

                        {/* AMPLIFICACIÓN */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <PlayVideoButton trackingId={VIDEO_TRACKING.A2_AMP} title="Amplificación" videoId="/pag1/vv-1" />
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
                                <FeedbackButton
                                    onCheck={handleCheckAmp}
                                    onReset={resetAmp}
                                    status={ampResult}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* VideoModal removed */}
        </BookPageContainer>
    );
}
