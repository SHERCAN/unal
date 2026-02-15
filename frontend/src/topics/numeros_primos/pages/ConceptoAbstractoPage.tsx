'use client';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface Props { zoom?: number; }

export function ConceptoAbstractoPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        A_DEFINITION: 'numeros-primos-a-definition',
        A_EXAMPLES: 'numeros-primos-a-examples',
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

    // Practice dropdowns
    const numbers = [
        { num: 2, answer: 'primo' },
        { num: 4, answer: 'compuesto' },
        { num: 5, answer: 'primo' },
        { num: 8, answer: 'compuesto' },
        { num: 11, answer: 'primo' },
        { num: 15, answer: 'compuesto' },
    ];

    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [listoResult, setListoResult] = useState<'correct' | 'incorrect' | null>(null);

    const handleListo = () => {
        const allCorrect = numbers.every(n => answers[n.num] === n.answer);
        setListoResult(allCorrect ? 'correct' : 'incorrect');
    };

    const handleReset = () => {
        setAnswers({});
        setListoResult(null);
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Números Primos' }} pageId="numeros-primos-concepto-abstracto">
            {/* A - ABSTRACTO Section */}
            <div className="relative ml-2 flex items-start">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center" style={{ backgroundColor: '#be90de' }}>
                    A
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 bg-white" style={{ borderColor: '#be90de' }}>

                    <div className="mt-4 space-y-6">
                        {/* Definition */}
                        <div className="flex items-center gap-2">
                            <PlayBtn trackingId={VIDEO_TRACKING.A_DEFINITION} title="¿Qué es un número primo?" />
                            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                Definición
                            </p>
                        </div>

                        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border-2 border-green-300 dark:border-green-700 p-4">
                            <h3 className="font-bold text-green-700 dark:text-green-300 mb-2">Número Primo</h3>
                            <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                                Un número <span className="font-bold text-green-600">primo</span> es aquel que solo tiene exactamente{' '}
                                <span className="font-bold">dos divisores</span>: el <span className="font-bold">1</span> y{' '}
                                <span className="font-bold">él mismo</span>.
                            </p>
                        </div>

                        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-xl border-2 border-orange-300 dark:border-orange-700 p-4">
                            <h3 className="font-bold text-orange-600 dark:text-orange-300 mb-2">Número Compuesto</h3>
                            <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                                Un número <span className="font-bold text-orange-600">compuesto</span> es aquel que tiene{' '}
                                <span className="font-bold">más de dos divisores</span>.
                            </p>
                        </div>

                        {/* Examples with play */}
                        <div className="flex items-center gap-2">
                            <PlayBtn trackingId={VIDEO_TRACKING.A_EXAMPLES} title="Ejemplos" size="sm" />
                            <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">Ejemplos</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {/* Primos */}
                            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border border-green-200 dark:border-green-800">
                                <p className="font-bold text-green-700 dark:text-green-300 text-sm mb-2">Primos</p>
                                <div className="flex flex-wrap gap-2">
                                    {[2, 3, 5, 7, 11, 13].map(n => (
                                        <span key={n} className="bg-green-200 dark:bg-green-800 px-2 py-0.5 rounded text-sm font-bold text-green-800 dark:text-green-200">
                                            {n}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            {/* Compuestos */}
                            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 border border-orange-200 dark:border-orange-800">
                                <p className="font-bold text-orange-600 dark:text-orange-300 text-sm mb-2">Compuestos</p>
                                <div className="flex flex-wrap gap-2">
                                    {[4, 6, 8, 9, 10, 12].map(n => (
                                        <span key={n} className="bg-orange-200 dark:bg-orange-800 px-2 py-0.5 rounded text-sm font-bold text-orange-800 dark:text-orange-200">
                                            {n}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Note about 1 */}
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg p-3">
                            <p className="text-sm text-gray-800 dark:text-gray-200">
                                <span className="font-bold">⚠️ Nota:</span> El número <span className="font-bold">1</span> no es primo ni compuesto.
                            </p>
                        </div>

                        {/* PRÁCTICA */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-purple-300 dark:border-purple-700 p-4">
                            <h4 className="bg-purple-600 text-white font-bold px-3 py-1 rounded inline-block text-sm mb-4">PRÁCTICA</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Clasifica cada número como primo o compuesto:</p>

                            <div className="grid grid-cols-2 gap-3">
                                {numbers.map(({ num }) => (
                                    <div key={num} className="flex items-center gap-2">
                                        <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded font-bold text-lg min-w-[40px] text-center text-gray-800 dark:text-gray-200">
                                            {num}
                                        </span>
                                        <select
                                            value={answers[num] || ''}
                                            onChange={(e) => { setAnswers(prev => ({ ...prev, [num]: e.target.value })); setListoResult(null); }}
                                            className={`border-2 rounded px-2 py-1 text-xs font-bold flex-1 ${listoResult === 'correct' ? 'border-green-500 bg-green-50' :
                                                listoResult === 'incorrect' && answers[num] !== numbers.find(n => n.num === num)?.answer
                                                    ? 'border-red-500 bg-red-50' :
                                                    'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                                                } text-gray-800 dark:text-gray-200`}
                                            disabled={listoResult === 'correct'}
                                        >
                                            <option value="">...</option>
                                            <option value="primo">Primo</option>
                                            <option value="compuesto">Compuesto</option>
                                        </select>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-3 justify-center mt-4">
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
                            {listoResult === 'correct' && <p className="text-center text-green-600 font-bold text-sm mt-2">✅ ¡Correcto!</p>}
                            {listoResult === 'incorrect' && <p className="text-center text-red-500 font-bold text-sm mt-2">❌ Revisa tus respuestas. Recuerda: primo = solo 2 divisores (1 y él mismo).</p>}
                        </div>
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
