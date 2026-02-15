'use client';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

/**
 * Frame 162 — A section (part 2)
 * - Example: 48 ÷ 12 = 4 (exact)
 * - Non-exact example: 14 ÷ 3 = 4 remainder 2
 * - PRÁCTICA: 4 dropdown questions
 * - BONO EXPLICADO play button
 */

interface Props { zoom?: number; }

export function ConceptoAbstractoPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        A_NOEXACT: 'div-exacta-a-noexact',
        A_NOEXACT2: 'div-exacta-a-noexact2',
        A_BONO: 'div-exacta-a-bono',
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

    const PlayBtn = ({ trackingId, title }: { trackingId: string; title: string }) => (
        <button type="button" onClick={() => openVideo(trackingId, title)}
            className={`w-8 h-8 flex items-center justify-center text-white rounded-full transition-all flex-shrink-0 ${isVideoWatched(trackingId) ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'}`}>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        </button>
    );

    const DivisionAlgorithm = ({ dividend, divisor, quotient, subtract, remainder, multTable }: {
        dividend: number; divisor: number; quotient: number; subtract: number; remainder: number;
        multTable: { mult: number; result: number }[];
    }) => (
        <div className="flex gap-6 justify-center items-start my-4">
            <div className="text-center">
                <div className="flex items-end gap-0">
                    <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{dividend}</p>
                        <p className="text-2xl font-bold">
                            <span className="text-gray-500">−</span>{' '}
                            <span className="text-red-600">{subtract}</span>
                        </p>
                        <hr className="border-gray-800 dark:border-gray-300 border-t-2" />
                        <p className={`text-2xl font-bold ${remainder === 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {String(remainder).padStart(2, '0')}
                        </p>
                    </div>
                    <div className="border-l-2 border-b-2 border-gray-800 dark:border-gray-300 px-3 pb-1 ml-1">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{divisor}</p>
                    </div>
                    <div className="text-left ml-2">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{quotient}</p>
                    </div>
                </div>
                {remainder === 0 ? (
                    <p className="text-sm text-green-600 font-bold mt-1">No hay resto</p>
                ) : (
                    <p className="text-sm text-red-600 font-bold mt-1">← Hay resto</p>
                )}
            </div>
            <div className="text-left">
                {multTable.map((row, i) => (
                    <p key={i} className={`text-sm font-bold ${row.result === subtract ? 'text-red-600' : 'text-gray-700 dark:text-gray-300'}`}>
                        <span className="text-gray-900 dark:text-white">{divisor}</span>{' '}
                        {row.mult} = {row.result}
                    </p>
                ))}
            </div>
        </div>
    );

    // PRÁCTICA state
    const practicaItems = [
        { dividend: 36, divisor: 5, isExact: false },
        { dividend: 33, divisor: 11, isExact: true },
        { dividend: 80, divisor: 20, isExact: true },
        { dividend: 64, divisor: 7, isExact: false },
    ];
    const [practicaAnswers, setPracticaAnswers] = useState<Record<number, string>>({});

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'División Exacta' }} pageId="div-exacta-concepto-abstracto">
            <div className="w-full">
                <div className="relative ml-2 flex items-start">
                    <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center" style={{ backgroundColor: '#be90de' }}>
                        A
                    </div>
                    <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-5 bg-white" style={{ borderColor: '#be90de' }}>

                        <div className="mt-4 space-y-6">
                            {/* Example: 48 ÷ 12 = 4 */}
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-sm inline-block"></span>
                                    <p className="text-sm text-gray-800 dark:text-gray-200">
                                        La división 48 ÷ 12 = 4 es <span className="text-green-600 font-bold">exacta</span> porque no tiene resto.
                                    </p>
                                </div>

                                <DivisionAlgorithm
                                    dividend={48} divisor={12} quotient={4} subtract={48} remainder={0}
                                    multTable={[
                                        { mult: 1, result: 12 }, { mult: 2, result: 24 }, { mult: 3, result: 36 },
                                        { mult: 4, result: 48 },
                                    ]}
                                />
                            </div>

                            {/* Non-exact example intro */}
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <p className="text-sm text-gray-800 dark:text-gray-200">
                                        ¿Qué pasa si alguna división <span className="text-red-600 font-bold">NO</span> es exacta? Veamos un ejemplo.
                                    </p>
                                    <PlayBtn trackingId={VIDEO_TRACKING.A_NOEXACT} title="División no exacta" />
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-sm inline-block"></span>
                                    <p className="text-sm text-gray-800 dark:text-gray-200">
                                        La división 14 ÷ 3 <span className="text-red-600 font-bold">NO</span> es exacta porque tiene resto.
                                    </p>
                                    <PlayBtn trackingId={VIDEO_TRACKING.A_NOEXACT2} title="14÷3" />
                                </div>

                                <DivisionAlgorithm
                                    dividend={14} divisor={3} quotient={4} subtract={12} remainder={2}
                                    multTable={[
                                        { mult: 1, result: 3 }, { mult: 2, result: 6 }, { mult: 3, result: 9 },
                                        { mult: 4, result: 12 }, { mult: 5, result: 15 },
                                    ]}
                                />
                            </div>

                            {/* PRÁCTICA */}
                            <div>
                                <span className="bg-purple-800 text-white font-bold px-3 py-1 rounded text-sm">PRÁCTICA</span>

                                <div className="mt-3 space-y-3">
                                    {practicaItems.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <span className="w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-sm inline-block flex-shrink-0"></span>
                                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 min-w-[140px]">
                                                La división {item.dividend} ÷ {item.divisor}
                                            </p>
                                            <select
                                                value={practicaAnswers[i] || ''}
                                                onChange={(e) => setPracticaAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                                                className="border-2 rounded px-3 py-1 text-sm font-medium border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                                            >
                                                <option value="">Selecciona</option>
                                                <option value="exacta">es exacta</option>
                                                <option value="no-exacta">no es exacta</option>
                                            </select>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* BONO */}
                            <div className="text-center border-t-2 border-gray-200 dark:border-gray-700 pt-4 mt-4">
                                <p className="text-lg font-black text-gray-900 dark:text-white mb-2">
                                    ¿CÓMO HAGAMOS EL <span className="text-xl">USO DE ALGORITMO DE LA DIVISIÓN</span>?
                                </p>
                                <div className="flex items-center justify-center gap-2">
                                    <PlayBtn trackingId={VIDEO_TRACKING.A_BONO} title="Bono Explicado" />
                                    <span className="font-black text-purple-600 text-sm">BONO EXPLICADO</span>
                                </div>
                            </div>
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
