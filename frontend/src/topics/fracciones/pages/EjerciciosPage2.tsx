'use client';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface Props { zoom?: number; }

export function EjerciciosPage2({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched, submitExercise } = useVideoProgress();

    const VIDEO_TRACKING = { INTRO: 'fracciones-ej2-intro' };

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

    // ACTIVITY: Word problems with inputs
    const problems = [
        {
            text: 'En un salón hay 30 estudiantes. 12 son niñas. ¿Qué fracción del salón son niñas?',
            numerator: 12, denominator: 30,
        },
        {
            text: 'Un pastel se divide en 8 partes. Laura se come 5 partes. ¿Qué fracción comió?',
            numerator: 5, denominator: 8,
        },
        {
            text: 'De 7 días de la semana, 2 son de descanso. ¿Qué fracción de la semana es de descanso?',
            numerator: 2, denominator: 7,
        },
    ];

    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [results, setResults] = useState<Record<number, 'correct' | 'incorrect' | null>>({
        0: null, 1: null, 2: null,
    });

    const handleCheck = async (index: number) => {
        const problem = problems[index];
        const isCorrect = parseInt(answers[`${index}-n`]) === problem.numerator &&
            parseInt(answers[`${index}-d`]) === problem.denominator;
        setResults(prev => ({ ...prev, [index]: isCorrect ? 'correct' : 'incorrect' }));
        await submitExercise(`fracciones-word-${index}`, isCorrect);
    };

    const handleResetProblem = (index: number) => {
        setAnswers(prev => {
            const next = { ...prev };
            delete next[`${index}-n`];
            delete next[`${index}-d`];
            return next;
        });
        setResults(prev => ({ ...prev, [index]: null }));
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones' }} pageId="fracciones-ejercicios-2">
            <div className="flex items-center gap-2 mb-6">
                <PlayBtn trackingId={VIDEO_TRACKING.INTRO} title="Problemas de Fracciones" size="md" />
                <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300">PROBLEMAS</h2>
            </div>

            <div className="space-y-5">
                {problems.map((problem, i) => (
                    <div key={i} className={`rounded-xl border-2 p-5 ${results[i] === 'correct' ? 'border-green-400 bg-green-50 dark:bg-green-900/10' :
                        results[i] === 'incorrect' ? 'border-red-400 bg-red-50 dark:bg-red-900/10' :
                            'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50'
                        }`}>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                                {i + 1}
                            </span>
                        </div>

                        <p className="text-sm text-gray-800 dark:text-gray-200 mb-3">{problem.text}</p>

                        <div className="flex items-center gap-3 justify-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Fracción:</span>
                            <div className="flex flex-col items-center">
                                <input
                                    type="number"
                                    value={answers[`${i}-n`] || ''}
                                    onChange={(e) => { setAnswers(prev => ({ ...prev, [`${i}-n`]: e.target.value })); setResults(prev => ({ ...prev, [i]: null })); }}
                                    className="w-14 h-8 text-center font-bold text-blue-600 rounded border-2 border-blue-400 bg-white dark:bg-gray-700 text-sm"
                                    placeholder="?"
                                    disabled={results[i] === 'correct'}
                                />
                                <div className="w-14 border-t-2 border-gray-800 dark:border-gray-300 my-1"></div>
                                <input
                                    type="number"
                                    value={answers[`${i}-d`] || ''}
                                    onChange={(e) => { setAnswers(prev => ({ ...prev, [`${i}-d`]: e.target.value })); setResults(prev => ({ ...prev, [i]: null })); }}
                                    className="w-14 h-8 text-center font-bold text-red-600 rounded border-2 border-red-400 bg-white dark:bg-gray-700 text-sm"
                                    placeholder="?"
                                    disabled={results[i] === 'correct'}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-3 mt-3">
                            {results[i] !== 'correct' && (
                                <button onClick={() => handleCheck(i)}
                                    className="px-5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-sm">
                                    ¿LISTO?
                                </button>
                            )}
                            {results[i] === 'incorrect' && (
                                <button onClick={() => handleResetProblem(i)}
                                    className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg text-sm">
                                    Reiniciar
                                </button>
                            )}
                        </div>
                        {results[i] === 'correct' && (
                            <p className="text-center text-green-600 font-bold text-sm mt-2">
                                ✅ ¡Correcto! {problem.numerator}/{problem.denominator}
                            </p>
                        )}
                        {results[i] === 'incorrect' && (
                            <p className="text-center text-red-500 font-bold text-sm mt-2">
                                ❌ Revisa: ¿cuántas partes seleccionadas? ¿cuántas totales?
                            </p>
                        )}
                    </div>
                ))}
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
