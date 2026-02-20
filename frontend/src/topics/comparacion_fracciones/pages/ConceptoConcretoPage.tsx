'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';

/**
 * Frame 185 — Comparación de Fracciones
 * C section: Teams (Rojo/Morado), Shields, Happy/Sad states
 * Assets: /comparacion_fracciones/equipofelizmorado.png, equipofelizrojo.png, equipotristemorado.png, equipotristerojo.png, escudo1.png, escudo2.png
 */

interface Props { zoom?: number; }

export function ConceptoConcretoPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        C_SOCCER: 'comp-frac-c-soccer',
        P_COMPARE: 'comp-frac-p-compare',
    };

    /* videoModal list removed */
    /* ref removed */

    /* handleVideoComplete removed */

    /* openVideo removed */

    /* PlayButton definition removed */

    // Interactive: compare fraction bars — who scored more
    const [answer, setAnswer] = useState('');
    const [listoResult, setListoResult] = useState<'correct' | 'incorrect' | null>(null);

    const handleListo = () => {
        // Rojo (7/10) vs Morado (4/10)? Or based on image visual?
        // Let's assume Scenario: Rojo 3/5, Morado 2/5 
        // Based on "felizrojo" and "tristemorado" assets implication?
        // Let's create a scenario: Rojo gana.

        if (answer === 'rojo') {
            setListoResult('correct');
        } else {
            setListoResult('incorrect');
        }
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Comparación de Fracciones' }} pageId="comp-frac-concepto-concreto">
            {/* C - CONCRETO Section */}
            <div className="relative ml-2 flex items-start mb-8">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center" style={{ backgroundColor: '#4ade80' }}>
                    C
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 bg-white" style={{ borderColor: '#4ade80' }}>

                    <div className="mt-4 flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <PlayVideoButton trackingId={VIDEO_TRACKING.C_SOCCER} title="Comparación de Fracciones - El Partido" />
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">El Gran Partido de Fútbol</h3>
                                <p className="text-gray-600">Compara los goles anotados por cada equipo.</p>
                            </div>
                        </div>

                        {/* Escenario Deportivo */}
                        <div className="relative bg-gradient-to-b from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-200 shadow-inner">
                            <div className="grid grid-cols-2 gap-8 items-end">

                                {/* Equipo Rojo */}
                                <div className="flex flex-col items-center gap-2 group">
                                    <div className="relative">
                                        <img src="/comparacion_fracciones/escudo2.png" alt="Escudo Rojo" className="w-16 h-16 absolute -top-8 -right-4 drop-shadow-md animate-pulse" />
                                        <img
                                            src={listoResult === 'correct' ? "/comparacion_fracciones/equipofelizrojo.png" : "/comparacion_fracciones/equipofelizrojo.png"} // Always happy initially? No, let's keep them happy/neutral
                                            alt="Equipo Rojo"
                                            className="w-32 md:w-40 h-auto drop-shadow-lg transition-transform hover:scale-105"
                                        />
                                    </div>
                                    <div className="bg-red-100 border-2 border-red-400 rounded-lg px-4 py-2 text-center shadow-sm w-full">
                                        <p className="font-black text-red-600 text-xl">3/5</p>
                                        <p className="text-xs text-red-800 font-bold uppercase">Goles</p>
                                    </div>
                                </div>

                                {/* Equipo Morado */}
                                <div className="flex flex-col items-center gap-2 group">
                                    <div className="relative">
                                        <img src="/comparacion_fracciones/escudo1.png" alt="Escudo Morado" className="w-16 h-16 absolute -top-8 -left-4 drop-shadow-md" />
                                        <img
                                            src={listoResult === 'correct' ? "/comparacion_fracciones/equipotristemorado.png" : "/comparacion_fracciones/equipofelizmorado.png"}
                                            alt="Equipo Morado"
                                            className="w-32 md:w-40 h-auto drop-shadow-lg transition-transform hover:scale-105"
                                        />
                                    </div>
                                    <div className="bg-purple-100 border-2 border-purple-400 rounded-lg px-4 py-2 text-center shadow-sm w-full">
                                        <p className="font-black text-purple-600 text-xl">2/5</p>
                                        <p className="text-xs text-purple-800 font-bold uppercase">Goles</p>
                                    </div>
                                </div>
                            </div>

                            {/* Visual Bar Comparison */}
                            <div className="mt-6 space-y-4 bg-white/60 p-4 rounded-lg backdrop-blur-sm">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-red-600 w-16 text-right">Rojo</span>
                                    <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                                        <div className="h-full bg-red-500 w-[60%] shadow-inner flex items-center justify-end px-2 text-white text-xs font-bold">3/5</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-purple-600 w-16 text-right">Morado</span>
                                    <div className="flex-1 h-6 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
                                        <div className="h-full bg-purple-500 w-[40%] shadow-inner flex items-center justify-end px-2 text-white text-xs font-bold">2/5</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-xl text-center space-y-4 shadow-sm border border-gray-100">
                            <p className="text-lg font-bold text-gray-800 dark:text-gray-200">¿Quién hizo más goles?</p>

                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => { setAnswer('rojo'); setListoResult(null); }}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 font-bold transition-all shadow-sm ${answer === 'rojo' ? 'bg-red-100 border-red-500 text-red-700 ring-2 ring-red-200' : 'bg-white border-gray-200 hover:border-red-300 text-gray-600'
                                        }`}
                                >
                                    <img src="/comparacion_fracciones/escudo2.png" className="w-6 h-6" alt="" />
                                    Equipo Rojo
                                </button>

                                <button
                                    onClick={() => { setAnswer('morado'); setListoResult(null); }}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl border-2 font-bold transition-all shadow-sm ${answer === 'morado' ? 'bg-purple-100 border-purple-500 text-purple-700 ring-2 ring-purple-200' : 'bg-white border-gray-200 hover:border-purple-300 text-gray-600'
                                        }`}
                                >
                                    <img src="/comparacion_fracciones/escudo1.png" className="w-6 h-6" alt="" />
                                    Equipo Morado
                                </button>
                            </div>

                            <button onClick={handleListo}
                                className="w-full md:w-auto px-12 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-md transform active:scale-95 transition-all text-lg">
                                ¿LISTO?
                            </button>

                            {listoResult === 'correct' && (
                                <div className="animate-bounce mt-4">
                                    <p className="text-green-600 font-black text-xl">✅ ¡Correcto!</p>
                                    <p className="text-gray-600">3/5 es mayor que 2/5</p>
                                </div>
                            )}
                            {listoResult === 'incorrect' && (
                                <div className="animate-shake mt-4">
                                    <p className="text-red-500 font-bold text-lg">❌ Inténtalo de nuevo</p>
                                    <p className="text-sm text-gray-500">Mira cuál barra es más larga.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* P - PROCESUAL Section */}
            <div className="relative ml-2 flex items-start">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center" style={{ backgroundColor: '#60a5fa' }}>
                    P
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 bg-blue-50/30" style={{ borderColor: '#60a5fa' }}>

                    <div className="mt-4 space-y-4">
                        <div className="flex items-center gap-4">
                            <PlayVideoButton trackingId={VIDEO_TRACKING.P_COMPARE} title="Cómo comparar fracciones" />
                            <div>
                                <p className="text-lg font-bold text-gray-800 dark:text-gray-200">¿Cómo comparamos fracciones?</p>
                                <p className="text-sm text-gray-600">Aprende las reglas básicas.</p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="bg-white rounded-xl p-4 shadow-sm border border-blue-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded text-xs">CASO 1</span>
                                    <p className="font-bold text-blue-700 text-sm">Mismo denominador</p>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                    Compara solo los numeradores.
                                </p>
                                <div className="text-center font-mono bg-gray-50 p-2 rounded border border-dashed border-gray-300">
                                    <span className="text-green-600 font-bold">3</span>/5 &gt; <span className="text-red-500 font-bold">2</span>/5
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-4 shadow-sm border border-purple-100 hover:shadow-md transition-shadow">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded text-xs">CASO 2</span>
                                    <p className="font-bold text-purple-700 text-sm">Diferente denominador</p>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">
                                    Usa productos cruzados.
                                </p>
                                <div className="text-center font-mono bg-gray-50 p-2 rounded border border-dashed border-gray-300 text-xs">
                                    1/2 vs 3/4 → 1×4 &lt; 2×3
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* VideoModal removed */}
        </BookPageContainer>
    );
}
