'use client';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface Props { zoom?: number; }

export function EjerciciosPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched, submitExercise } = useVideoProgress();

    const VIDEO_TRACKING = {
        INTRO: 'division-inexacta-ej-intro',
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

    // ===== ACTIVITY 1: Match division with result =====
    const matchPairs = [
        { division: '17 ÷ 3', answer: '5 r 2' },
        { division: '19 ÷ 4', answer: '4 r 3' },
        { division: '23 ÷ 5', answer: '4 r 3' },
        { division: '14 ÷ 3', answer: '4 r 2' },
    ];

    const [matchAnswers, setMatchAnswers] = useState<Record<number, string>>({});
    const [matchResult, setMatchResult] = useState<'correct' | 'incorrect' | null>(null);

    const matchOptions = ['5 r 2', '4 r 3', '4 r 3', '4 r 2', '3 r 1', '5 r 0'];

    const handleCheckMatch = async () => {
        const allCorrect = matchPairs.every((pair, i) => matchAnswers[i] === pair.answer);
        setMatchResult(allCorrect ? 'correct' : 'incorrect');
        await submitExercise('div-inexacta-match', allCorrect);
    };

    // ===== ACTIVITY 2: Complete the table =====
    const tableRows = [
        { dividendo: 17, divisor: 3, cociente: 5, residuo: 2 },
        { dividendo: 25, divisor: 7, cociente: 3, residuo: 4 },
        { dividendo: 29, divisor: 6, cociente: 4, residuo: 5 },
    ];

    const [tableAnswers, setTableAnswers] = useState<Record<string, string>>({});
    const [tableResult, setTableResult] = useState<'correct' | 'incorrect' | null>(null);

    const handleCheckTable = async () => {
        const allCorrect = tableRows.every((row, i) => {
            return parseInt(tableAnswers[`${i}-c`]) === row.cociente &&
                parseInt(tableAnswers[`${i}-r`]) === row.residuo;
        });
        setTableResult(allCorrect ? 'correct' : 'incorrect');
        await submitExercise('div-inexacta-table', allCorrect);
    };

    // ===== ACTIVITY 3: Fill in the division =====
    const [fillCociente, setFillCociente] = useState('');
    const [fillResiduo, setFillResiduo] = useState('');
    const [fillResult, setFillResult] = useState<'correct' | 'incorrect' | null>(null);

    const handleCheckFill = async () => {
        // 22 ÷ 5 = 4 r 2
        const isCorrect = parseInt(fillCociente) === 4 && parseInt(fillResiduo) === 2;
        setFillResult(isCorrect ? 'correct' : 'incorrect');
        await submitExercise('div-inexacta-fill', isCorrect);
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'División Inexacta' }} pageId="division-inexacta-ejercicios">
            <div className="flex items-center gap-2 mb-6">
                <PlayBtn trackingId={VIDEO_TRACKING.INTRO} title="Ejercicios de División Inexacta" size="md" />
                <h2 className="text-2xl font-bold text-cyan-700 dark:text-cyan-300">EJERCICIOS</h2>
            </div>

            <div className="space-y-6">
                {/* ACTIVITY 1: Matching */}
                <div className={`rounded-xl border-2 p-5 ${matchResult === 'correct' ? 'border-green-400 bg-green-50 dark:bg-green-900/10' :
                    matchResult === 'incorrect' ? 'border-red-400 bg-red-50 dark:bg-red-900/10' :
                        'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50'
                    }`}>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="bg-cyan-600 text-white text-sm font-bold px-3 py-1 rounded-full">1</span>
                        <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">Relaciona cada división con su resultado</p>
                    </div>

                    <div className="space-y-2">
                        {matchPairs.map((pair, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded font-bold text-sm min-w-[90px] text-center text-gray-800 dark:text-gray-200">
                                    {pair.division}
                                </span>
                                <span className="text-gray-400">→</span>
                                <select
                                    value={matchAnswers[i] || ''}
                                    onChange={(e) => { setMatchAnswers(prev => ({ ...prev, [i]: e.target.value })); setMatchResult(null); }}
                                    className="border-2 rounded px-2 py-1 text-sm font-bold border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                    disabled={matchResult === 'correct'}
                                >
                                    <option value="">Selecciona</option>
                                    {matchOptions.map((opt, j) => (
                                        <option key={j} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-3 justify-center mt-3">
                        {matchResult !== 'correct' && (
                            <button onClick={handleCheckMatch}
                                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-sm">
                                ¿LISTO?
                            </button>
                        )}
                    </div>
                    {matchResult === 'correct' && <p className="text-center text-green-600 font-bold text-sm mt-2">✅ ¡Correcto!</p>}
                    {matchResult === 'incorrect' && <p className="text-center text-red-500 font-bold text-sm mt-2">❌ Revisa tus respuestas.</p>}
                </div>

                {/* ACTIVITY 2: Complete table */}
                <div className={`rounded-xl border-2 p-5 ${tableResult === 'correct' ? 'border-green-400 bg-green-50 dark:bg-green-900/10' :
                    tableResult === 'incorrect' ? 'border-red-400 bg-red-50 dark:bg-red-900/10' :
                        'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50'
                    }`}>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="bg-cyan-600 text-white text-sm font-bold px-3 py-1 rounded-full">2</span>
                        <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">Completa la tabla</p>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-cyan-100 dark:bg-cyan-900/30">
                                    <th className="py-2 px-2 text-center font-bold text-cyan-700 dark:text-cyan-300 border-b border-gray-200 dark:border-gray-700">Dividendo</th>
                                    <th className="py-2 px-2 text-center font-bold text-cyan-700 dark:text-cyan-300 border-b border-gray-200 dark:border-gray-700">Divisor</th>
                                    <th className="py-2 px-2 text-center font-bold text-cyan-700 dark:text-cyan-300 border-b border-gray-200 dark:border-gray-700">Cociente</th>
                                    <th className="py-2 px-2 text-center font-bold text-cyan-700 dark:text-cyan-300 border-b border-gray-200 dark:border-gray-700">Residuo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableRows.map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-800/50'}>
                                        <td className="py-2 px-2 text-center font-bold text-red-600">{row.dividendo}</td>
                                        <td className="py-2 px-2 text-center font-bold text-blue-600">{row.divisor}</td>
                                        <td className="py-2 px-2 text-center">
                                            <input
                                                type="number"
                                                value={tableAnswers[`${i}-c`] || ''}
                                                onChange={(e) => { setTableAnswers(prev => ({ ...prev, [`${i}-c`]: e.target.value })); setTableResult(null); }}
                                                className="w-12 h-8 text-center font-bold rounded border-2 border-green-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm"
                                                placeholder="?"
                                                disabled={tableResult === 'correct'}
                                            />
                                        </td>
                                        <td className="py-2 px-2 text-center">
                                            <input
                                                type="number"
                                                value={tableAnswers[`${i}-r`] || ''}
                                                onChange={(e) => { setTableAnswers(prev => ({ ...prev, [`${i}-r`]: e.target.value })); setTableResult(null); }}
                                                className="w-12 h-8 text-center font-bold rounded border-2 border-orange-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm"
                                                placeholder="?"
                                                disabled={tableResult === 'correct'}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center gap-3 justify-center mt-3">
                        {tableResult !== 'correct' && (
                            <button onClick={handleCheckTable}
                                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-sm">
                                ¿LISTO?
                            </button>
                        )}
                    </div>
                    {tableResult === 'correct' && <p className="text-center text-green-600 font-bold text-sm mt-2">✅ ¡Correcto!</p>}
                    {tableResult === 'incorrect' && <p className="text-center text-red-500 font-bold text-sm mt-2">❌ Revisa tus respuestas.</p>}
                </div>

                {/* ACTIVITY 3: Fill in the division */}
                <div className={`rounded-xl border-2 p-5 ${fillResult === 'correct' ? 'border-green-400 bg-green-50 dark:bg-green-900/10' :
                    fillResult === 'incorrect' ? 'border-red-400 bg-red-50 dark:bg-red-900/10' :
                        'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50'
                    }`}>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="bg-cyan-600 text-white text-sm font-bold px-3 py-1 rounded-full">3</span>
                        <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">Completa la división</p>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                            Un profesor tiene <span className="font-bold text-red-600">22</span> libros y los reparte en{' '}
                            <span className="font-bold text-blue-600">5</span> estantes iguales.
                        </p>

                        <div className="flex items-center justify-center gap-3">
                            <span className="text-3xl font-bold text-red-600">22</span>
                            <span className="text-2xl text-gray-400">÷</span>
                            <span className="text-3xl font-bold text-blue-600">5</span>
                            <span className="text-2xl text-gray-400">=</span>
                            <input
                                type="number"
                                value={fillCociente}
                                onChange={(e) => { setFillCociente(e.target.value); setFillResult(null); }}
                                className="w-14 h-10 text-center text-xl font-bold rounded border-2 border-green-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                placeholder="?"
                                disabled={fillResult === 'correct'}
                            />
                        </div>
                        <div className="flex items-center justify-center gap-2 mt-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400 font-semibold">Residuo:</span>
                            <input
                                type="number"
                                value={fillResiduo}
                                onChange={(e) => { setFillResiduo(e.target.value); setFillResult(null); }}
                                className="w-14 h-8 text-center font-bold rounded border-2 border-orange-400 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm"
                                placeholder="?"
                                disabled={fillResult === 'correct'}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 justify-center mt-3">
                        {fillResult !== 'correct' && (
                            <button onClick={handleCheckFill}
                                className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-sm">
                                ¿LISTO?
                            </button>
                        )}
                    </div>
                    {fillResult === 'correct' && <p className="text-center text-green-600 font-bold text-sm mt-2">✅ ¡Correcto! 22 ÷ 5 = 4, residuo 2</p>}
                    {fillResult === 'incorrect' && <p className="text-center text-red-500 font-bold text-sm mt-2">❌ Intenta de nuevo.</p>}
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
