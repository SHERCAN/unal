'use client';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface Props { zoom?: number; }

export function EjerciciosPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched, submitExercise } = useVideoProgress();

    const VIDEO_TRACKING = { INTRO: 'fracciones-ej-intro' };

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

    // ACTIVITY 1: Fill the table
    const tableRows = [
        { figure: '🟦🟦🟦⬜⬜', shaded: 3, total: 5 },
        { figure: '🟦⬜⬜⬜', shaded: 1, total: 4 },
        { figure: '🟦🟦🟦🟦⬜⬜', shaded: 4, total: 6 },
    ];

    const [tableAnswers, setTableAnswers] = useState<Record<string, string>>({});
    const [tableResult, setTableResult] = useState<'correct' | 'incorrect' | null>(null);

    const handleCheckTable = async () => {
        const allCorrect = tableRows.every((row, i) =>
            parseInt(tableAnswers[`${i}-n`]) === row.shaded &&
            parseInt(tableAnswers[`${i}-d`]) === row.total
        );
        setTableResult(allCorrect ? 'correct' : 'incorrect');
        await submitExercise('fracciones-table', allCorrect);
    };

    // ACTIVITY 2: Classify as fracción or no fracción
    const classifyItems = [
        { text: '2/5', answer: 'fraccion' },
        { text: '7/0', answer: 'no_fraccion' },
        { text: '1/3', answer: 'fraccion' },
        { text: '4/4', answer: 'fraccion' },
    ];

    const [classifyAnswers, setClassifyAnswers] = useState<Record<number, string>>({});
    const [classifyResult, setClassifyResult] = useState<'correct' | 'incorrect' | null>(null);

    const handleCheckClassify = async () => {
        const allCorrect = classifyItems.every((item, i) => classifyAnswers[i] === item.answer);
        setClassifyResult(allCorrect ? 'correct' : 'incorrect');
        await submitExercise('fracciones-classify', allCorrect);
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones' }} pageId="fracciones-ejercicios">
            <div className="flex items-center gap-2 mb-6">
                <PlayBtn trackingId={VIDEO_TRACKING.INTRO} title="Ejercicios de Fracciones" size="md" />
                <h2 className="text-2xl font-bold text-purple-700 dark:text-purple-300">EJERCICIOS</h2>
            </div>

            <div className="space-y-6">
                {/* ACTIVITY 1: Fill the table */}
                <div className={`rounded-xl border-2 p-5 ${tableResult === 'correct' ? 'border-green-400 bg-green-50 dark:bg-green-900/10' :
                    tableResult === 'incorrect' ? 'border-red-400 bg-red-50 dark:bg-red-900/10' :
                        'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50'
                    }`}>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">1</span>
                        <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">Escribe la fracción de cada figura</p>
                    </div>

                    <div className="space-y-3">
                        {tableRows.map((row, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="text-lg tracking-wider">{row.figure}</span>
                                <span className="text-gray-400">→</span>
                                <input
                                    type="number"
                                    value={tableAnswers[`${i}-n`] || ''}
                                    onChange={(e) => { setTableAnswers(prev => ({ ...prev, [`${i}-n`]: e.target.value })); setTableResult(null); }}
                                    className="w-10 h-7 text-center font-bold text-blue-600 rounded border-2 border-blue-400 bg-white dark:bg-gray-700 text-sm"
                                    placeholder="?"
                                    disabled={tableResult === 'correct'}
                                />
                                <span className="text-gray-400 font-bold">/</span>
                                <input
                                    type="number"
                                    value={tableAnswers[`${i}-d`] || ''}
                                    onChange={(e) => { setTableAnswers(prev => ({ ...prev, [`${i}-d`]: e.target.value })); setTableResult(null); }}
                                    className="w-10 h-7 text-center font-bold text-red-600 rounded border-2 border-red-400 bg-white dark:bg-gray-700 text-sm"
                                    placeholder="?"
                                    disabled={tableResult === 'correct'}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-center gap-3 mt-3">
                        {tableResult !== 'correct' && (
                            <button onClick={handleCheckTable}
                                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-sm">
                                ¿LISTO?
                            </button>
                        )}
                    </div>
                    {tableResult === 'correct' && <p className="text-center text-green-600 font-bold text-sm mt-2">✅ ¡Correcto!</p>}
                    {tableResult === 'incorrect' && <p className="text-center text-red-500 font-bold text-sm mt-2">❌ Revisa: numerador = coloreados, denominador = total.</p>}
                </div>

                {/* ACTIVITY 2: Classify */}
                <div className={`rounded-xl border-2 p-5 ${classifyResult === 'correct' ? 'border-green-400 bg-green-50 dark:bg-green-900/10' :
                    classifyResult === 'incorrect' ? 'border-red-400 bg-red-50 dark:bg-red-900/10' :
                        'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50'
                    }`}>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">2</span>
                        <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">¿Es una fracción válida?</p>
                    </div>

                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 italic">Recuerda: el denominador no puede ser 0.</p>

                    <div className="space-y-2">
                        {classifyItems.map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded font-bold text-lg text-gray-800 dark:text-gray-200 min-w-[50px] text-center">
                                    {item.text}
                                </span>
                                <select
                                    value={classifyAnswers[i] || ''}
                                    onChange={(e) => { setClassifyAnswers(prev => ({ ...prev, [i]: e.target.value })); setClassifyResult(null); }}
                                    className="border-2 rounded px-2 py-1 text-sm font-bold border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                    disabled={classifyResult === 'correct'}
                                >
                                    <option value="">Selecciona</option>
                                    <option value="fraccion">Fracción ✓</option>
                                    <option value="no_fraccion">No es fracción ✗</option>
                                </select>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-center gap-3 mt-3">
                        {classifyResult !== 'correct' && (
                            <button onClick={handleCheckClassify}
                                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-sm">
                                ¿LISTO?
                            </button>
                        )}
                    </div>
                    {classifyResult === 'correct' && <p className="text-center text-green-600 font-bold text-sm mt-2">✅ ¡Correcto!</p>}
                    {classifyResult === 'incorrect' && <p className="text-center text-red-500 font-bold text-sm mt-2">❌ Revisa tus respuestas. 7/0 no es fracción porque el denominador es 0.</p>}
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
