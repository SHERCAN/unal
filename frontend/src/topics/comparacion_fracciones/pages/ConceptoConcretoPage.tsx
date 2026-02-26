'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';
import React, { useState, useEffect } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';
import Image from 'next/image';

// Assets
import escudoRojo from '../escudo2.png';
import escudoMorado from '../escudo1.png';
import partido1Img from '../partido1.png';
import partido2Img from '../partido2.png';
import partido3Img from '../partido3.png';
import morado1Img from '../morado1.png';
import rojo1Img from '../rojo1.png';
import felizRojo from '../equipofelizrojo.png';
import tristeRojo from '../equipotristerojo.png';
import felizMorado from '../equipofelizmorado.png';
import tristeMorado from '../equipotristemorado.png';

interface Props { zoom?: number; }
// PAGINA 1 CONCRETO PICTORICO
export function ConceptoConcretoPage({ zoom = 1 }: Props) {
    const { submitGame, isExerciseCompleted, completeStage, markVideoWatched, watchedVideos, completedExercises, completedStages } = useVideoProgress();

    const VIDEO_TRACKING = {
        C_INTRO: 'comparacion_fracciones-pag1-v1',
        P_RECT: 'comparacion_fracciones-pag1-v2',
        P_WHY: 'comparacion_fracciones-pag1-v3'
    };

    const EXERCISE_IDS = {
        P_ACTIVITY: 'comparacion_fracciones-pag29-ej1'
    };

    const STAGE_IDS = {
        C_STAGE: 'comparacion-fracciones-c-stage',
        P_STAGE: 'comparacion-fracciones-p-stage'
    };

    // Initial load and auto-checking
    useEffect(() => {
        if (isExerciseCompleted(EXERCISE_IDS.P_ACTIVITY)) setPResult('correct');

        const C_REQUIRED = [VIDEO_TRACKING.C_INTRO];
        const P_REQUIRED = [
            VIDEO_TRACKING.P_RECT,
            VIDEO_TRACKING.P_WHY,
            EXERCISE_IDS.P_ACTIVITY
        ];

        const cDone = C_REQUIRED.every(id =>
            watchedVideos.includes(id) || completedExercises[id]?.completed
        );
        if (cDone) completeStage(STAGE_IDS.C_STAGE);

        const pDone = P_REQUIRED.every(id =>
            watchedVideos.includes(id) || completedExercises[id]?.completed
        );
        if (pDone) completeStage(STAGE_IDS.P_STAGE);
    }, [isExerciseCompleted, watchedVideos, completedExercises]);

    const matchData = [
        { label: 'PARTIDO 1', redImg: felizRojo, purpleImg: tristeMorado },
        { label: 'PARTIDO 2', redImg: felizRojo, purpleImg: tristeMorado },
        { label: 'PARTIDO 3', redImg: tristeRojo, purpleImg: felizMorado }
    ];

    // --- ACTIVITY P: PICTORICO ---
    const [pSign, setPSign] = useState<string>('');
    const [pNum1, setPNum1] = useState('');
    const [pNum2, setPNum2] = useState('');
    const [pResult, setPResult] = useState<'correct' | 'incorrect' | null>(null);

    const checkP = async () => {
        if (isExerciseCompleted(EXERCISE_IDS.P_ACTIVITY)) return;
        const correct = pSign === '<' && pNum1 === '1' && pNum2 === '2';
        setPResult(correct ? 'correct' : 'incorrect');
        await submitGame(EXERCISE_IDS.P_ACTIVITY, correct, 'juego_cpa');
    };

    const InputBoxSmall = ({ value, onChange, width = "w-10", disabled }: any) => (
        <input
            type="text"
            className={`${width} h-10 text-center rounded-lg text-xl font-bold bg-[#e2e2e2] outline-none border-none`}
            value={value}
            onChange={e => onChange(e.target.value)}
            disabled={disabled}
        />
    );

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Comparación de Fracciones' }} pageId="comp-frac-concepto-concreto">
            <div className="space-y-12 pb-20">
                {/* --- STAGE C: CONCRETO --- */}
                <div className="relative ml-2 flex items-start mb-12">
                    <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#4ade80] dark:bg-green-700">
                        C {completedStages.includes(STAGE_IDS.C_STAGE) && <span className="ml-1 text-[#059669]">✓</span>}
                    </div>
                    <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-5 bg-white/50" style={{ borderColor: '#4ade80' }}>
                        <div className="w-full h-full flex flex-col mt-2" style={{ gap: 'clamp(0.75rem, 2vh, 1.5rem)', padding: 'clamp(0.5rem, 2vmin, 1rem)' }}>
                            <div className="flex items-center gap-8">
                                <div className="w-48 flex justify-center">
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.C_INTRO} title="" videoId="/pag29/vv-1" />
                                </div>
                                <div className="flex-1 flex justify-around items-center">
                                    <div className="w-40 flex justify-center">
                                        <Image src={escudoMorado} alt="Escudo Morado" width={80} height={80} className="drop-shadow-md" />
                                    </div>
                                    <div className="w-40 flex justify-center">
                                        <Image src={escudoRojo} alt="Escudo Rojo" width={80} height={80} className="drop-shadow-md" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {matchData.map((row, i) => (
                                    <div key={i} className="flex items-center gap-8">
                                        <div className="bg-purple-700 text-white font-black px-6 py-2 rounded-lg text-xl w-48 text-center">{row.label}</div>
                                        <div className="flex-1 flex justify-around items-center">
                                            <div className="w-40 h-28 relative">
                                                <Image src={row.purpleImg} alt="Equipo Morado" fill className="object-contain" />
                                            </div>
                                            <div className="w-40 h-28 relative">
                                                <Image src={row.redImg} alt="Equipo Rojo" fill className="object-contain" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- STAGE P: PICTORICO --- */}
                <div className="relative ml-2 flex items-start">
                    <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#60a5fa] dark:bg-blue-700">
                        P {completedStages.includes(STAGE_IDS.P_STAGE) && <span className="ml-1 text-[#2563eb]">✓</span>}
                    </div>
                    <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-5 bg-blue-50/20" style={{ borderColor: '#60a5fa' }}>
                        <div className="w-full h-full flex flex-col mt-2" style={{ gap: 'clamp(0.75rem, 2vh, 1.5rem)', padding: 'clamp(0.5rem, 2vmin, 1rem)' }}>
                            <div className="grid grid-cols-3 gap-8 justify-items-center">
                                <div className="flex items-center gap-4">
                                    <span className="font-black text-lg vertical-text">PARTIDO 1</span>
                                    <div className="w-16 h-32 relative">
                                        <Image src={partido1Img} alt="Partido 1" fill className="object-contain" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-black text-lg vertical-text">PARTIDOS 2</span>
                                    <div className="w-16 h-32 relative">
                                        <Image src={partido2Img} alt="Partido 2" fill className="object-contain" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-black text-lg vertical-text">PARTIDOS 3</span>
                                    <div className="w-20 h-32 relative">
                                        <Image src={partido3Img} alt="Partido 3" fill className="object-contain" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <p className="text-base font-semibold text-gray-800 leading-tight">
                                        De acuerdo con la actividad anterior, observamos dos figuras rectangulares que representan fracciones.
                                        <PlayVideoButton trackingId={VIDEO_TRACKING.P_RECT} title="" videoId="/pag29/vv-2" />
                                    </p>
                                </div>

                                <div className="flex items-center gap-4">
                                    <p className="text-base font-semibold text-gray-800 leading-tight">
                                        ¿Cuál figura tiene mayor cantidad de color, la de la izquierda o la de la derecha?
                                    </p>
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.P_WHY} title="" videoId="/pag29/vv-3" />
                                </div>

                                <div className="flex flex-col items-center gap-6 mt-8">
                                    <div className="flex items-center gap-12">
                                        {/* Left Rect */}
                                        <div className="w-20 h-40 relative shadow-sm">
                                            <Image src={morado1Img} alt="1/3" fill className="object-contain" />
                                        </div>

                                        {/* Selector */}
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="relative">
                                                <select
                                                    value={pResult === 'correct' ? '<' : pSign}
                                                    onChange={(e) => { setPSign(e.target.value); setPResult(null); }}
                                                    className="w-20 h-20 text-4xl font-black text-purple-700 bg-gray-100 rounded-lg appearance-none text-center outline-none border-none cursor-pointer"
                                                    disabled={pResult === 'correct'}
                                                >
                                                    <option value=""></option>
                                                    <option value="<">&lt;</option>
                                                    <option value=">">&gt;</option>
                                                    <option value="=">=</option>
                                                </select>
                                                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-gray-400"></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Rect */}
                                        <div className="w-20 h-40 relative shadow-sm">
                                            <Image src={rojo1Img} alt="2/3" fill className="object-contain" />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 text-2xl font-black">
                                        <span>¿Por qué?</span>
                                        <InputBoxSmall value={pResult === 'correct' ? '1' : pNum1} onChange={setPNum1} disabled={pResult === 'correct'} />
                                        <span className="text-purple-400 font-black">&lt;</span>
                                        <InputBoxSmall value={pResult === 'correct' ? '2' : pNum2} onChange={setPNum2} disabled={pResult === 'correct'} />
                                    </div>

                                    <div className="mt-4">
                                        <FeedbackButton status={pResult} onCheck={checkP} onReset={() => { if (pResult === 'correct') return; setPSign(''); setPNum1(''); setPNum2(''); setPResult(null); }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .vertical-text {
                    writing-mode: vertical-rl;
                    transform: rotate(180deg);
                    white-space: nowrap;
                }
            `}</style>
        </BookPageContainer>
    );
}
