'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import Image from 'next/image';

// Assets
import vueltasImg from '../vueltas.png';
import image75Img from '../image 75.png';

interface Props { zoom?: number; }

export function ConceptoProcesualPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        BONO_EXPLICADO: 'frac-equiv-bono-explicado',
        LAPS_QUESTION: 'frac-equiv-laps-question',
        DESAFIO_VIDEO: 'frac-equiv-desafio-video',
    };

    // --- State for Exercises ---
    const [lapsAns, setLapsAns] = useState('');
    const [lapsResult, setLapsResult] = useState<'correct' | 'incorrect' | null>(null);

    const [desafioAns, setDesafioAns] = useState('');
    const [desafioResult, setDesafioResult] = useState<'correct' | 'incorrect' | null>(null);

    const handleLapsCheck = () => {
        if (lapsAns === '4') setLapsResult('correct');
        else setLapsResult('incorrect');
    };

    const handleDesafioCheck = () => {
        if (desafioAns === '8') setDesafioResult('correct');
        else setDesafioResult('incorrect');
    };

    /* videoModal list removed */
    /* ref removed */

    /* handleVideoComplete removed */

    /* openVideo removed */

    /* PlayButton definition removed */

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones Equivalentes' }} pageId="frac-equiv-concepto-procesual">
            {/* P - PROCESUAL Section */}
            <div className="relative ml-2 flex items-start">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center" style={{ backgroundColor: '#60a5fa' }}>
                    P
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 bg-white" style={{ borderColor: '#60a5fa' }}>

                    <div className="mt-4 space-y-12 text-gray-800">

                        {/* Section 1: Laps */}
                        <div className="flex flex-col items-center gap-6">
                            <div className="w-full flex justify-center">
                                <Image src={vueltasImg} alt="Vueltas" className="h-120 w-auto object-contain" />
                            </div>

                            <div className="flex items-center gap-3">
                                <PlayVideoButton trackingId={VIDEO_TRACKING.BONO_EXPLICADO} title="Bono Explicado" videoId="/pag1/vv-1" />
                                <span className="font-extrabold text-purple-600 text-xl tracking-wider uppercase">BONO EXPLICADO</span>
                            </div>

                            <div className="flex flex-col items-start gap-4 text-left max-w-2xl w-full">
                                <p className="text-xl leading-relaxed">
                                    Para las tres vueltas, Luis corre 2 vueltas y Camila corre 1 vuelta, entre los dos completan la pista.
                                    Para seis vueltas: ¿Cuántas vueltas corre Luis?
                                    <span className="inline-block ml-2 align-middle">
                                        <PlayVideoButton trackingId={VIDEO_TRACKING.LAPS_QUESTION} title="Pregunta Vueltas" videoId="/pag1/vv-1" />
                                    </span>
                                </p>

                                <div className="relative w-full flex justify-center items-center py-4">
                                    <div className="flex flex-col items-center">
                                        <input
                                            type="number"
                                            className="w-20 h-10 text-center border-none rounded-lg font-bold text-2xl shadow-sm"
                                            style={{ backgroundColor: '#d9d9d9' }}
                                            value={lapsAns}
                                            onChange={e => { setLapsAns(e.target.value); setLapsResult(null); }}
                                        />
                                    </div>

                                    <div className="absolute right-0 flex items-center gap-4">
                                        <button
                                            onClick={handleLapsCheck}
                                            className="bg-purple-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-purple-700 transition-all shadow-md active:scale-95 text-sm">
                                            LISTO
                                        </button>
                                        {lapsResult === 'correct' && <span className="text-green-600 font-bold text-3xl animate-bounce">✓</span>}
                                        {lapsResult === 'incorrect' && <span className="text-red-500 font-bold text-sm">Intenta de nuevo</span>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Figures */}
                        <div className="space-y-8 pt-8 border-t-2 border-dashed border-gray-100">
                            <p className="text-xl text-center leading-relaxed">
                                Observamos dos figuras iguales en tamaño y forma.
                                Ambas representan el mismo todo (cantidad), pero están divididas en diferente número de partes.
                            </p>

                            <div className="flex justify-center">
                                <Image src={image75Img} alt="Figuras Fracciones" className="h-40 w-auto object-contain" />
                            </div>

                            <div className="flex flex-col items-center gap-6 text-center max-w-3xl mx-auto">
                                <p className="text-xl leading-relaxed">
                                    <span className="font-black text-red-600">DESAFIO:</span> Ahora el todo se divide en 12 partes. ¿Cuántas partes debe correr Luis?
                                    <span className="inline-block ml-2 align-middle">
                                        <PlayVideoButton trackingId={VIDEO_TRACKING.DESAFIO_VIDEO} title="Desafío Video" videoId="/pag1/vv-1" />
                                    </span>
                                </p>

                                <div className="relative w-full flex justify-center items-center py-4">
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="number"
                                            className="w-20 h-10 text-center border-none rounded-lg font-bold text-2xl shadow-sm"
                                            style={{ backgroundColor: '#d9d9d9' }}
                                            value={desafioAns}
                                            onChange={e => { setDesafioAns(e.target.value); setDesafioResult(null); }}
                                        />
                                        <span className="text-xl font-bold">vueltas</span>
                                    </div>

                                    <div className="absolute right-0 flex items-center gap-4">
                                        <button
                                            onClick={handleDesafioCheck}
                                            className="bg-purple-600 text-white px-8 py-2 rounded-lg font-bold hover:bg-purple-700 transition-all shadow-md active:scale-95 text-sm">
                                            LISTO
                                        </button>
                                        {desafioResult === 'correct' && <span className="text-green-600 font-bold text-3xl animate-bounce">✓</span>}
                                        {desafioResult === 'incorrect' && <span className="text-red-500 font-bold text-sm">Intenta de nuevo</span>}
                                    </div>
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
