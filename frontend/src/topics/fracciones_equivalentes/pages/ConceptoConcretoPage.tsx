'use client';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

/**
 * Frame 176 — Fracciones Equivalentes
 * C section: Camila, Luis, Cancha, Equivalent movement
 * Assets: /fracciones_equivalentes/camila.png, luis.png, cancha.png
 */

interface Props { zoom?: number; }

export function ConceptoConcretoPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        C_TRACK: 'frac-equiv-c-track',
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
        const sz = size === 'sm' ? 'w-10 h-10' : 'w-14 h-14';
        const iconSz = size === 'sm' ? 'w-5 h-5' : 'w-7 h-7';
        return (
            <button type="button" onClick={() => openVideo(trackingId, title)}
                className={`${sz} flex items-center justify-center text-white rounded-full transition-all flex-shrink-0 ${watched ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'} shadow-lg transform hover:scale-105 z-10`}>
                <svg className={iconSz} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </button>
        );
    };

    // Interactive: confirm equivalence
    const [listoResult, setListoResult] = useState<'correct' | 'incorrect' | null>(null);
    const [answer, setAnswer] = useState('');

    const handleListo = () => {
        if (answer === 'si') {
            setListoResult('correct');
        } else {
            setListoResult('incorrect');
        }
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones Equivalentes' }} pageId="frac-equiv-concepto-concreto">
            {/* C - CONCRETO Section */}
            <div className="relative ml-2 flex items-start">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center" style={{ backgroundColor: '#4ade80' }}>
                    C
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 bg-white" style={{ borderColor: '#4ade80' }}>

                    <div className="mt-4 flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <PlayBtn trackingId={VIDEO_TRACKING.C_TRACK} title="Fracciones Equivalentes - Concepto Concreto" />
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Carrera de Fracciones</h3>
                                <p className="text-gray-600">Mira dónde llegaron Camila y Luis en la pista.</p>
                            </div>
                        </div>

                        {/* Scene Container */}
                        <div className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg border-2 border-green-200">
                            {/* Background Track */}
                            <img
                                src="/fracciones_equivalentes/cancha.png"
                                alt="Pista de carreras"
                                className="w-full h-auto object-cover opacity-90"
                            />

                            {/* Overlay Grids/Markers to show fractions if not inherent in image options, 
                             but assuming we place characters on top visually */}

                            {/* Characters Positioned Absolute */}
                            {/* Assuming track goes Left to Right. 50% is center. */}

                            {/* Camila: 1/2 */}
                            <div className="absolute top-[20%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                                <div className="bg-white/90 px-2 py-1 rounded shadow-sm mb-1">
                                    <span className="font-bold text-pink-600">Camila: 1/2</span>
                                </div>
                                <img src="/fracciones_equivalentes/camila.png" alt="Camila" className="w-16 md:w-24 h-auto drop-shadow-md group-hover:scale-110 transition-transform" />
                            </div>

                            {/* Luis: 2/4 */}
                            <div className="absolute top-[60%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group">
                                <div className="bg-white/90 px-2 py-1 rounded shadow-sm mb-1">
                                    <span className="font-bold text-blue-600">Luis: 2/4</span>
                                </div>
                                <img src="/fracciones_equivalentes/luis.png" alt="Luis" className="w-16 md:w-24 h-auto drop-shadow-md group-hover:scale-110 transition-transform" />
                            </div>

                            {/* Distance Marker Line */}
                            <div className="absolute top-0 bottom-0 left-[50%] w-0.5 bg-red-500/50 border-l-2 border-dashed border-red-600 pointer-events-none"></div>
                            <div className="absolute top-2 left-[50%] transform -translate-x-1/2 bg-red-100/90 text-red-700 text-xs font-bold px-2 py-0.5 rounded border border-red-200">Meta visual</div>
                        </div>

                        {/* Comparison Logic & Interaction */}
                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl flex flex-col md:flex-row gap-8 items-center justify-center">
                            <div className="text-center space-y-2">
                                <p className="text-lg">
                                    Camila corrió <span className="font-bold text-pink-600 text-xl">1/2</span> de la pista.
                                </p>
                                <p className="text-lg">
                                    Luis corrió <span className="font-bold text-blue-600 text-xl">2/4</span> de la pista.
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm border-2 border-purple-100 flex flex-col items-center gap-4">
                                <p className="font-bold text-gray-800 dark:text-gray-200">¿Llegaron al mismo lugar?</p>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => { setAnswer('si'); setListoResult(null); }}
                                        className={`px-4 py-2 rounded-lg border-2 font-bold transition-all ${answer === 'si' ? 'bg-purple-100 border-purple-500 text-purple-700' : 'border-gray-300 hover:border-purple-300'
                                            }`}
                                    >
                                        ¡Sí! Iguales
                                    </button>
                                    <button
                                        onClick={() => { setAnswer('no'); setListoResult(null); }}
                                        className={`px-4 py-2 rounded-lg border-2 font-bold transition-all ${answer === 'no' ? 'bg-purple-100 border-purple-500 text-purple-700' : 'border-gray-300 hover:border-purple-300'
                                            }`}
                                    >
                                        No, diferentes
                                    </button>
                                </div>

                                <button onClick={handleListo}
                                    className="w-full py-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold rounded-lg shadow-md transform active:scale-95 transition-all">
                                    ¿LISTO?
                                </button>

                                {listoResult === 'correct' && (
                                    <div className="text-center animate-bounce">
                                        <p className="text-green-600 font-bold text-lg">✅ ¡Correcto!</p>
                                        <p className="text-sm text-gray-600">1/2 es equivalente a 2/4</p>
                                    </div>
                                )}
                                {listoResult === 'incorrect' && (
                                    <p className="text-center text-red-500 font-bold">❌ Mira la línea roja. ¡Están en el mismo sitio!</p>
                                )}
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
