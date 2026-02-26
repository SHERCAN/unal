'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';
import Image from 'next/image';


// Assets
import vueltasImg from '../vueltas.png';
import image75Img from '../image 75.png';

interface Props { zoom?: number; }
//PAGINA 2 PICTORICO
export function ConceptoPictoricoPage({ zoom = 1 }: Props) {
    const EXERCISE_IDS = {
        LAPS: 'fracciones_equivalentes-pag24-ej1',
        DESAFIO: 'fracciones_equivalentes-pag24-ej2'
    };

    const { isVideoWatched, markVideoWatched, submitGame, completeStage, isExerciseCompleted, watchedVideos, completedExercises, completedStages } = useVideoProgress();

    const STAGE_IDS = {
        P_STAGE: 'fracciones-equivalentes-p-stage'
    };

    const VIDEO_TRACKING = {
        BONO_EXPLICADO: 'fracciones_equivalentes-pag1-v1',
        LAPS_QUESTION: 'fracciones_equivalentes-pag24-v1',
        DESAFIO_VIDEO: 'fracciones_equivalentes-pag24-v3',
    };

    // Initial load and auto-checking
    React.useEffect(() => {
        if (isExerciseCompleted(EXERCISE_IDS.LAPS)) setLapsResult('correct');
        if (isExerciseCompleted(EXERCISE_IDS.DESAFIO)) setDesafioResult('correct');

        const P_REQUIRED = [
            'fracciones_equivalentes-pag1-v1', // BONO_EXPLICADO
            'fracciones_equivalentes-pag24-v1', // LAPS_QUESTION
            'fracciones_equivalentes-pag24-v3', // DESAFIO_VIDEO
            EXERCISE_IDS.LAPS,
            EXERCISE_IDS.DESAFIO
        ];

        const pDone = P_REQUIRED.every(id =>
            watchedVideos.includes(id) || completedExercises[id]?.completed
        );
        if (pDone) completeStage(STAGE_IDS.P_STAGE);
    }, [isExerciseCompleted, watchedVideos, completedExercises]);

    // --- State for Exercises ---
    const [lapsAns, setLapsAns] = useState('');
    const [lapsResult, setLapsResult] = useState<'correct' | 'incorrect' | null>(null);

    const [desafioAns, setDesafioAns] = useState('');
    const [desafioResult, setDesafioResult] = useState<'correct' | 'incorrect' | null>(null);


    const handleLapsCheck = async () => {
        if (isExerciseCompleted(EXERCISE_IDS.LAPS)) return;
        const isCorrect = lapsAns === '4';
        setLapsResult(isCorrect ? 'correct' : 'incorrect');
        await submitGame(EXERCISE_IDS.LAPS, isCorrect);
        if (isCorrect) {
            // Stage auto-completed by useEffect
        }
    };

    const handleDesafioCheck = async () => {
        if (isExerciseCompleted(EXERCISE_IDS.DESAFIO)) return;
        const isCorrect = desafioAns === '8';
        setDesafioResult(isCorrect ? 'correct' : 'incorrect');
        await submitGame(EXERCISE_IDS.DESAFIO, isCorrect);
        if (isCorrect) {
            // Stage auto-completed by useEffect
        }
    };

    const resetLaps = () => { setLapsAns(''); setLapsResult(null); };
    const resetDesafio = () => { setDesafioAns(''); setDesafioResult(null); };


    /* videoModal list removed */
    /* ref removed */

    /* handleVideoComplete removed */

    /* openVideo removed */

    /* PlayButton definition removed */

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones Equivalentes' }} pageId="frac-equiv-concepto-pictorico">
            {/* P - PICTORICO Section */}
            <div className="relative ml-2 flex items-start">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#60a5fa] dark:bg-blue-700">
                    P {completedStages.includes(STAGE_IDS.P_STAGE) && <span className="ml-1 text-[#2563eb]">✓</span>}
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 bg-white" style={{ borderColor: '#60a5fa' }}>
                    {/* --- STAGE P: PICTORICO --- */}
                    <div className="mt-4 space-y-12 text-gray-800">

                        {/* Section 1: Laps */}
                        <div className="flex flex-col items-start gap-6">
                            <div className="w-full flex justify-center">
                                <Image src={vueltasImg} alt="Vueltas" className="h-120 w-auto object-contain" />
                            </div>

                            <div className="flex items-center gap-3">
                                <PlayVideoButton trackingId={VIDEO_TRACKING.BONO_EXPLICADO} title="Bono Explicado" videoId="/pag1/vv-1" />
                                <span className="font-extrabold text-purple-600 text-xl tracking-wider uppercase">BONO EXPLICADO</span>
                            </div>

                            <div className="flex flex-col items-start gap-4 text-left w-full">
                                <p className="text-base font-semibold text-left leading-relaxed">
                                    Para las tres vueltas, Luis corre 2 vueltas y Camila corre 1 vuelta, entre los dos completan la pista.
                                    Para seis vueltas: ¿Cuántas vueltas corre Luis?
                                    <span className="inline-block ml-2 align-middle">
                                        <PlayVideoButton trackingId={VIDEO_TRACKING.LAPS_QUESTION} title="Pregunta Vueltas" videoId="/pag24/vv-1" />
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
                                        <FeedbackButton
                                            onCheck={handleLapsCheck}
                                            onReset={resetLaps}
                                            status={lapsResult}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Figures */}
                        <div className="space-y-8 pt-8 border-t-2 border-dashed border-gray-100">
                            <p className="text-base font-semibold text-left leading-relaxed">
                                Observamos dos figuras iguales en tamaño y forma.
                                Ambas representan el mismo todo (cantidad), pero están divididas en diferente número de partes.
                                <span className="inline-block ml-2 align-middle">
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.LAPS_QUESTION} title="Pregunta Vueltas" videoId="/pag24/vv-1" />
                                </span>
                            </p>

                            <div className="flex justify-center">
                                <Image src={image75Img} alt="Figuras Fracciones" className="h-40 w-auto object-contain" />
                            </div>

                            <div className="flex flex-col items-start gap-6 text-left w-full mx-auto">
                                <p className="text-base font-semibold text-left leading-relaxed">
                                    <span className="font-black text-red-600">DESAFIO:</span> Ahora el todo se divide en 12 partes. ¿Cuántas partes debe correr Luis?
                                    <span className="inline-block ml-2 align-middle">
                                        <PlayVideoButton trackingId={VIDEO_TRACKING.DESAFIO_VIDEO} title="Desafío Video" videoId="/pag24/vv-3" />
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
                                        <FeedbackButton
                                            onCheck={handleDesafioCheck}
                                            onReset={resetDesafio}
                                            status={desafioResult}
                                        />
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
