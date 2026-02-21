'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useRef, useCallback } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';


interface Props { zoom?: number; }

export function EjerciciosPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched, submitExercise } = useVideoProgress();

    const VIDEO_TRACKING = { INTRO: 'frac-equiv-ej-intro' };

    /* videoModal list removed */
    /* ref removed */

    /* handleVideoComplete removed */

    /* openVideo removed */

    /* PlayButton definition removed */

    // ACTIVITY 1: Amplification - fill missing values
    const ampExercises = [
        { origN: 2, origD: 3, factor: 4, ansN: 8, ansD: 12 },
        { origN: 1, origD: 5, factor: 3, ansN: 3, ansD: 15 },
    ];
    const [ampAnswers, setAmpAnswers] = useState<Record<string, string>>({});
    const [ampResult, setAmpResult] = useState<'correct' | 'incorrect' | null>(null);

    const handleCheckAmp = useCallback(async () => {
        const allCorrect = ampExercises.every((ex, i) =>
            parseInt(ampAnswers[`${i}-n`]) === ex.ansN &&
            parseInt(ampAnswers[`${i}-d`]) === ex.ansD
        );
        setAmpResult(allCorrect ? 'correct' : 'incorrect');
        await submitExercise('frac-equiv-amp', allCorrect);
    }, [ampAnswers, ampExercises, submitExercise]);

    // ACTIVITY 2: Simplification - fill missing values
    const simpExercises = [
        { origN: 10, origD: 15, factor: 5, ansN: 2, ansD: 3 },
        { origN: 8, origD: 12, factor: 4, ansN: 2, ansD: 3 },
    ];
    const [simpAnswers, setSimpAnswers] = useState<Record<string, string>>({});
    const [simpResult, setSimpResult] = useState<'correct' | 'incorrect' | null>(null);

    const handleCheckSimp = useCallback(async () => {
        const allCorrect = simpExercises.every((ex, i) =>
            parseInt(simpAnswers[`${i}-n`]) === ex.ansN &&
            parseInt(simpAnswers[`${i}-d`]) === ex.ansD
        );
        setSimpResult(allCorrect ? 'correct' : 'incorrect');
        await submitExercise('frac-equiv-simp', allCorrect);
    }, [simpAnswers, simpExercises, submitExercise]);

    // ACTIVITY 3: V/F - true/false equivalence
    const vfStatements = [
        { text: '2/3 = 6/9', correct: 'V' },
        { text: '1/4 = 3/8', correct: 'F' },
        { text: '5/10 = 1/2', correct: 'V' },
        { text: '3/7 = 9/21', correct: 'V' },
    ];
    const [vfAnswers, setVfAnswers] = useState<Record<number, string>>({});
    const [vfResult, setVfResult] = useState<'correct' | 'incorrect' | null>(null);

    const handleCheckVF = async () => {
        const allCorrect = vfStatements.every((s, i) => vfAnswers[i] === s.correct);
        setVfResult(allCorrect ? 'correct' : 'incorrect');
        await submitExercise('frac-equiv-vf', allCorrect);
    };

    const resetAmp = () => { setAmpAnswers({}); setAmpResult(null); };
    const resetSimp = () => { setSimpAnswers({}); setSimpResult(null); };
    const resetVF = () => { setVfAnswers({}); setVfResult(null); };


    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones Equivalentes' }} pageId="frac-equiv-ejercicios">
            <div className="flex items-center gap-2 mb-6">
                <PlayVideoButton trackingId={VIDEO_TRACKING.INTRO} title="Ejercicios" videoId="/pag1/vv-1" />
                <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300">EJERCICIOS</h2>
            </div>

            <div className="space-y-6">
                {/* ACTIVITY 1: Amplification */}
                <div className={`rounded-xl border-2 p-5 ${ampResult === 'correct' ? 'border-green-400 bg-green-50 dark:bg-green-900/10' :
                    ampResult === 'incorrect' ? 'border-red-400 bg-red-50 dark:bg-red-900/10' :
                        'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50'
                    }`}>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">1</span>
                        <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">Amplifica las fracciones</p>
                    </div>

                    <div className="space-y-3">
                        {ampExercises.map((ex, i) => (
                            <div key={i} className="flex items-center gap-2 flex-wrap">
                                <span className="text-lg font-bold">
                                    <span className="text-blue-600">{ex.origN}</span>/<span className="text-red-600">{ex.origD}</span>
                                </span>
                                <span className="text-sm text-gray-500">× {ex.factor} →</span>
                                <input type="number" value={ampAnswers[`${i}-n`] || ''}
                                    onChange={(e) => { setAmpAnswers(prev => ({ ...prev, [`${i}-n`]: e.target.value })); setAmpResult(null); }}
                                    className="w-10 h-7 text-center font-bold text-blue-600 rounded border-2 border-blue-400 bg-white dark:bg-gray-700 text-sm"
                                    placeholder="?" disabled={ampResult === 'correct'} />
                                <span className="text-gray-400 font-bold">/</span>
                                <input type="number" value={ampAnswers[`${i}-d`] || ''}
                                    onChange={(e) => { setAmpAnswers(prev => ({ ...prev, [`${i}-d`]: e.target.value })); setAmpResult(null); }}
                                    className="w-10 h-7 text-center font-bold text-red-600 rounded border-2 border-red-400 bg-white dark:bg-gray-700 text-sm"
                                    placeholder="?" disabled={ampResult === 'correct'} />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-3">
                        <FeedbackButton
                            onCheck={handleCheckAmp}
                            onReset={resetAmp}
                            status={ampResult}
                        />
                    </div>
                </div>

                {/* ACTIVITY 2: Simplification */}
                <div className={`rounded-xl border-2 p-5 ${simpResult === 'correct' ? 'border-green-400 bg-green-50 dark:bg-green-900/10' :
                    simpResult === 'incorrect' ? 'border-red-400 bg-red-50 dark:bg-red-900/10' :
                        'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50'
                    }`}>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">2</span>
                        <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">Simplifica las fracciones</p>
                    </div>

                    <div className="space-y-3">
                        {simpExercises.map((ex, i) => (
                            <div key={i} className="flex items-center gap-2 flex-wrap">
                                <span className="text-lg font-bold">
                                    <span className="text-blue-600">{ex.origN}</span>/<span className="text-red-600">{ex.origD}</span>
                                </span>
                                <span className="text-sm text-gray-500">÷ {ex.factor} →</span>
                                <input type="number" value={simpAnswers[`${i}-n`] || ''}
                                    onChange={(e) => { setSimpAnswers(prev => ({ ...prev, [`${i}-n`]: e.target.value })); setSimpResult(null); }}
                                    className="w-10 h-7 text-center font-bold text-blue-600 rounded border-2 border-blue-400 bg-white dark:bg-gray-700 text-sm"
                                    placeholder="?" disabled={simpResult === 'correct'} />
                                <span className="text-gray-400 font-bold">/</span>
                                <input type="number" value={simpAnswers[`${i}-d`] || ''}
                                    onChange={(e) => { setSimpAnswers(prev => ({ ...prev, [`${i}-d`]: e.target.value })); setSimpResult(null); }}
                                    className="w-10 h-7 text-center font-bold text-red-600 rounded border-2 border-red-400 bg-white dark:bg-gray-700 text-sm"
                                    placeholder="?" disabled={simpResult === 'correct'} />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-3">
                        <FeedbackButton
                            onCheck={handleCheckSimp}
                            onReset={resetSimp}
                            status={simpResult}
                        />
                    </div>
                </div>

                {/* ACTIVITY 3: V/F */}
                <div className={`rounded-xl border-2 p-5 ${vfResult === 'correct' ? 'border-green-400 bg-green-50 dark:bg-green-900/10' :
                    vfResult === 'incorrect' ? 'border-red-400 bg-red-50 dark:bg-red-900/10' :
                        'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50'
                    }`}>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">3</span>
                        <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">Verdadero (V) o Falso (F)</p>
                    </div>

                    <div className="space-y-2">
                        {vfStatements.map((s, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="font-bold text-gray-800 dark:text-gray-200 min-w-[100px]">{s.text}</span>
                                <select
                                    value={vfAnswers[i] || ''}
                                    onChange={(e) => { setVfAnswers(prev => ({ ...prev, [i]: e.target.value })); setVfResult(null); }}
                                    className="border-2 rounded px-2 py-1 text-sm font-bold border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                    disabled={vfResult === 'correct'}
                                >
                                    <option value="">?</option>
                                    <option value="V">V</option>
                                    <option value="F">F</option>
                                </select>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-3">
                        <FeedbackButton
                            onCheck={handleCheckVF}
                            onReset={resetVF}
                            status={vfResult}
                        />
                    </div>
                </div>
            </div>

            {/* VideoModal removed */}
        </BookPageContainer>
    );
}
