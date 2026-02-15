'use client';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface Props { zoom?: number; }

export function ConceptoAbstracto1Page({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        A_DEFINITION: 'fracciones-a1-definition',
        A_NOTATION: 'fracciones-a1-notation',
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
    const [answerNumerador, setAnswerNumerador] = useState('');
    const [answerDenominador, setAnswerDenominador] = useState('');
    const [listoResult, setListoResult] = useState<'correct' | 'incorrect' | null>(null);

    const handleListo = () => {
        if (answerNumerador === 'partes_seleccionadas' && answerDenominador === 'partes_totales') {
            setListoResult('correct');
        } else {
            setListoResult('incorrect');
        }
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones' }} pageId="fracciones-concepto-abstracto-1">
            {/* A - ABSTRACTO Section */}
            <div className="relative ml-2 flex items-start">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center" style={{ backgroundColor: '#be90de' }}>
                    A
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 bg-white" style={{ borderColor: '#be90de' }}>

                    <div className="mt-4 space-y-6">
                        {/* Definition */}
                        <div className="flex items-center gap-2">
                            <PlayBtn trackingId={VIDEO_TRACKING.A_DEFINITION} title="¿Qué es una fracción?" />
                            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">¿Qué es una fracción?</p>
                        </div>

                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-300 dark:border-purple-700 p-4">
                            <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                                Una <span className="font-bold text-purple-600">fracción</span> es una forma de representar{' '}
                                <span className="font-bold">partes de un todo</span>. Indica cuántas partes se toman de un total
                                que ha sido dividido en partes iguales.
                            </p>
                        </div>

                        {/* Notation */}
                        <div className="flex items-center gap-2">
                            <PlayBtn trackingId={VIDEO_TRACKING.A_NOTATION} title="Notación de la fracción" size="sm" />
                            <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">Notación</p>
                        </div>

                        <div className="flex justify-center">
                            <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 shadow-md">
                                <div className="flex items-center gap-6">
                                    {/* Fraction visual */}
                                    <div className="text-center">
                                        <div className="border-r-2 border-gray-300 dark:border-gray-600 pr-6">
                                            <p className="text-5xl font-bold text-blue-600">a</p>
                                            <div className="w-16 border-t-3 border-gray-800 dark:border-gray-300 my-2"></div>
                                            <p className="text-5xl font-bold text-red-600">b</p>
                                        </div>
                                    </div>
                                    {/* Labels */}
                                    <div className="space-y-6 text-sm">
                                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg px-3 py-2 border-l-4 border-blue-500">
                                            <p className="font-bold text-blue-600">a = Numerador</p>
                                            <p className="text-gray-600 dark:text-gray-400 text-xs">Partes seleccionadas</p>
                                        </div>
                                        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2 border-l-4 border-red-500">
                                            <p className="font-bold text-red-600">b = Denominador</p>
                                            <p className="text-gray-600 dark:text-gray-400 text-xs">Partes totales (≠ 0)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Examples */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { num: 1, den: 2, name: 'Un medio', color: 'bg-green-100 dark:bg-green-900/20 border-green-300' },
                                { num: 3, den: 4, name: 'Tres cuartos', color: 'bg-blue-100 dark:bg-blue-900/20 border-blue-300' },
                                { num: 2, den: 5, name: 'Dos quintos', color: 'bg-orange-100 dark:bg-orange-900/20 border-orange-300' },
                            ].map((f, i) => (
                                <div key={i} className={`rounded-lg p-3 border ${f.color} text-center`}>
                                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                                        <span className="text-blue-600">{f.num}</span>
                                        <span className="text-gray-400">/</span>
                                        <span className="text-red-600">{f.den}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{f.name}</p>
                                </div>
                            ))}
                        </div>

                        {/* PRÁCTICA */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-purple-300 dark:border-purple-700 p-4">
                            <h4 className="bg-purple-600 text-white font-bold px-3 py-1 rounded inline-block text-sm mb-4">PRÁCTICA</h4>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-gray-800 dark:text-gray-200 text-sm">■ El numerador indica las</span>
                                    <select value={answerNumerador} onChange={(e) => { setAnswerNumerador(e.target.value); setListoResult(null); }}
                                        className={`border-2 rounded px-2 py-1 text-sm font-bold min-w-[160px] ${listoResult === 'correct' ? 'border-green-500 bg-green-50' :
                                            listoResult === 'incorrect' && answerNumerador !== 'partes_seleccionadas' ? 'border-red-500 bg-red-50' :
                                                'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                                            } text-gray-800 dark:text-gray-200`}>
                                        <option value="">Selecciona</option>
                                        <option value="partes_seleccionadas">Partes seleccionadas</option>
                                        <option value="partes_totales">Partes totales</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-gray-800 dark:text-gray-200 text-sm">■ El denominador indica las</span>
                                    <select value={answerDenominador} onChange={(e) => { setAnswerDenominador(e.target.value); setListoResult(null); }}
                                        className={`border-2 rounded px-2 py-1 text-sm font-bold min-w-[160px] ${listoResult === 'correct' ? 'border-green-500 bg-green-50' :
                                            listoResult === 'incorrect' && answerDenominador !== 'partes_totales' ? 'border-red-500 bg-red-50' :
                                                'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                                            } text-gray-800 dark:text-gray-200`}>
                                        <option value="">Selecciona</option>
                                        <option value="partes_seleccionadas">Partes seleccionadas</option>
                                        <option value="partes_totales">Partes totales</option>
                                    </select>
                                </div>

                                <div className="flex items-center gap-3 justify-center mt-2">
                                    <button onClick={handleListo}
                                        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-sm">
                                        ¿LISTO?
                                    </button>
                                </div>
                                {listoResult === 'correct' && <p className="text-center text-green-600 font-bold text-sm">✅ ¡Correcto!</p>}
                                {listoResult === 'incorrect' && <p className="text-center text-red-500 font-bold text-sm">❌ Revisa: numerador = partes seleccionadas, denominador = partes totales.</p>}
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
