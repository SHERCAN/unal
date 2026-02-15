'use client';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface Props { zoom?: number; }

export function ConceptoProcesualPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        A_NOTATION: 'division-inexacta-a-notation',
        A_PARTS: 'division-inexacta-a-parts',
        A_DEFINITION: 'division-inexacta-a-definition',
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

    // Practice: dropdown exercises
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');
    const [listoResult, setListoResult] = useState<'correct' | 'incorrect' | null>(null);

    const handleListo = () => {
        if (answer1 === 'diferente_de_0' && answer2 === '2') {
            setListoResult('correct');
        } else {
            setListoResult('incorrect');
        }
    };

    const handleReset = () => {
        setAnswer1('');
        setAnswer2('');
        setListoResult(null);
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'División Inexacta' }} pageId="division-inexacta-concepto-procesual">
            {/* A - ABSTRACTO Section */}
            <div className="relative border-2 rounded-xl p-6" style={{ borderColor: '#be90de' }}>
                <div className="absolute -top-4 left-4 px-3 py-1 rounded font-black text-xl text-white" style={{ backgroundColor: '#be90de' }}>
                    A
                </div>

                <div className="mt-4 space-y-6">
                    {/* Notation */}
                    <div className="flex items-center gap-2">
                        <PlayBtn trackingId={VIDEO_TRACKING.A_NOTATION} title="Notación de la División Inexacta" />
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                            Notación de la división inexacta
                        </p>
                    </div>

                    {/* Long Division Visual — 17 ÷ 3 = 5 r 2 */}
                    <div className="flex justify-center">
                        <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 inline-block shadow-md">
                            <div className="flex items-start gap-1">
                                <div className="text-center">
                                    <span className="text-4xl font-bold text-red-600">17</span>
                                    <p className="text-xs font-bold text-red-500 mt-1">Dividendo</p>
                                </div>
                                <div className="flex flex-col items-center mt-1">
                                    <div className="border-l-2 border-t-2 border-gray-800 dark:border-gray-300 pl-3 pt-1 min-w-[60px]">
                                        <span className="text-4xl font-bold text-blue-600">3</span>
                                    </div>
                                    <p className="text-xs font-bold text-blue-500 mt-1">Divisor</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-1 mt-2">
                                <div className="text-center">
                                    <div className="border-t-2 border-gray-800 dark:border-gray-300 pt-1">
                                        <span className="text-3xl font-bold text-orange-500">2</span>
                                    </div>
                                    <p className="text-xs font-bold text-orange-500 mt-1">Residuo ≠ 0</p>
                                </div>
                                <div className="text-center ml-4">
                                    <div className="border-t-2 border-gray-800 dark:border-gray-300 pt-1 min-w-[60px]">
                                        <span className="text-4xl font-bold text-green-600">5</span>
                                    </div>
                                    <p className="text-xs font-bold text-green-500 mt-1">Cociente</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comparison with Exact Division */}
                    <div className="flex items-start gap-2">
                        <PlayBtn trackingId={VIDEO_TRACKING.A_DEFINITION} title="¿Qué es una división inexacta?" size="sm" />
                        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl border-2 border-cyan-300 dark:border-cyan-700 p-4 flex-1">
                            <h3 className="font-bold text-cyan-700 dark:text-cyan-300 mb-2">¿Qué es una división inexacta?</h3>
                            <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                                Una división es <span className="font-bold text-cyan-600">inexacta</span> cuando el{' '}
                                <span className="font-bold text-orange-500">residuo es diferente de cero</span>. Esto significa
                                que el <span className="font-bold text-red-600">dividendo</span> NO se puede repartir de manera
                                completa entre el <span className="font-bold text-blue-600">divisor</span> y siempre{' '}
                                <span className="font-bold">sobran</span> elementos.
                            </p>
                        </div>
                    </div>

                    {/* Comparison table: Exacta vs Inexacta */}
                    <div className="overflow-hidden rounded-xl border-2 border-purple-200 dark:border-purple-800">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-purple-100 dark:bg-purple-900/40">
                                    <th className="py-2 px-3 text-center font-bold text-purple-700 dark:text-purple-300 border-b-2 border-r border-purple-200 dark:border-purple-700">
                                        División Exacta
                                    </th>
                                    <th className="py-2 px-3 text-center font-bold text-purple-700 dark:text-purple-300 border-b-2 border-purple-200 dark:border-purple-700">
                                        División Inexacta
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white dark:bg-gray-800">
                                    <td className="py-2 px-3 text-center border-r border-purple-200 dark:border-purple-700">
                                        Residuo = <span className="font-bold text-green-600">0</span>
                                    </td>
                                    <td className="py-2 px-3 text-center">
                                        Residuo <span className="font-bold text-orange-500">≠ 0</span>
                                    </td>
                                </tr>
                                <tr className="bg-purple-50 dark:bg-purple-900/10">
                                    <td className="py-2 px-3 text-center border-r border-purple-200 dark:border-purple-700">
                                        12 ÷ 3 = <span className="font-bold">4</span> (r <span className="font-bold text-green-600">0</span>)
                                    </td>
                                    <td className="py-2 px-3 text-center">
                                        17 ÷ 3 = <span className="font-bold">5</span> (r <span className="font-bold text-orange-500">2</span>)
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Parts diagram with play */}
                    <div className="flex items-center gap-2">
                        <PlayBtn trackingId={VIDEO_TRACKING.A_PARTS} title="Partes de la división inexacta" size="sm" />
                        <p className="font-semibold text-gray-800 dark:text-gray-100 text-sm">
                            Partes de la división inexacta
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 border-l-4 border-red-500">
                            <p className="font-bold text-red-600 text-sm">Dividendo = 17</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">El total a repartir</p>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border-l-4 border-blue-500">
                            <p className="font-bold text-blue-600 text-sm">Divisor = 3</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Cantidad de partes iguales</p>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 border-l-4 border-green-500">
                            <p className="font-bold text-green-600 text-sm">Cociente = 5</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Cantidad en cada parte</p>
                        </div>
                        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 border-l-4 border-orange-500">
                            <p className="font-bold text-orange-500 text-sm">Residuo = 2 ≠ 0</p>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Lo que sobra</p>
                        </div>
                    </div>

                    {/* PRÁCTICA */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-purple-300 dark:border-purple-700 p-4">
                        <h4 className="bg-purple-600 text-white font-bold px-3 py-1 rounded inline-block text-sm mb-4">PRÁCTICA</h4>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-gray-800 dark:text-gray-200">■</span>
                                <span className="text-gray-800 dark:text-gray-200 text-sm">La división es inexacta cuando el residuo es</span>
                                <select value={answer1} onChange={(e) => { setAnswer1(e.target.value); setListoResult(null); }}
                                    className={`border-2 rounded px-2 py-1 text-sm font-bold min-w-[120px] ${listoResult === 'correct' && answer1 === 'diferente_de_0' ? 'border-green-500 bg-green-50' :
                                        listoResult === 'incorrect' && answer1 !== 'diferente_de_0' ? 'border-red-500 bg-red-50' :
                                            'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                                        } text-gray-800 dark:text-gray-200`}>
                                    <option value="">Selecciona</option>
                                    <option value="0">Igual a 0</option>
                                    <option value="diferente_de_0">Diferente de 0</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-gray-800 dark:text-gray-200">■</span>
                                <span className="text-gray-800 dark:text-gray-200 text-sm">En 17 ÷ 3 = 5, el residuo es</span>
                                <select value={answer2} onChange={(e) => { setAnswer2(e.target.value); setListoResult(null); }}
                                    className={`border-2 rounded px-2 py-1 text-sm font-bold min-w-[80px] ${listoResult === 'correct' && answer2 === '2' ? 'border-green-500 bg-green-50' :
                                        listoResult === 'incorrect' && answer2 !== '2' ? 'border-red-500 bg-red-50' :
                                            'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700'
                                        } text-gray-800 dark:text-gray-200`}>
                                    <option value="">Selecciona</option>
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-3 justify-center mt-2">
                                <button onClick={handleListo}
                                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-sm">
                                    ¿LISTO?
                                </button>
                                {listoResult === 'incorrect' && (
                                    <button onClick={handleReset}
                                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded-lg text-sm">
                                        Reiniciar
                                    </button>
                                )}
                            </div>
                            {listoResult === 'correct' && <p className="text-center text-green-600 font-bold">✅ ¡Correcto!</p>}
                            {listoResult === 'incorrect' && <p className="text-center text-red-500 font-bold">❌ Revisa tus respuestas.</p>}
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
