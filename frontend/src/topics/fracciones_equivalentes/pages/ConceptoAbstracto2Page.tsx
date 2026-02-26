'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useEffect } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';
import { MdLightbulbOutline } from 'react-icons/md';

interface Props { zoom?: number; }
//PAGINA 4 ABSTRACTO
export function ConceptoAbstracto2Page({ zoom = 1 }: Props) {
    const EXERCISE_IDS = {
        SIMP: 'fracciones_equivalentes-pag26-simp',
        AMP1: 'fracciones_equivalentes-pag26-amp1',
        AMP2: 'fracciones_equivalentes-pag26-amp2'
    };

    const STAGE_IDS = {
        A_STAGE: 'fracciones-equivalentes-a-stage'
    };

    const { isVideoWatched, markVideoWatched, submitGame, completeStage, isExerciseCompleted, watchedVideos, completedExercises, completedStages } = useVideoProgress();

    const VIDEO_TRACKING = {
        SIMP_INTRO: 'fracciones_equivalentes-pag26-v1',
        SIMP_EXAMPLE: 'fracciones_equivalentes-pag26-v3',
        SIMP_PRAC: 'fracciones_equivalentes-pag26-v4',
        AMP_INTRO: 'fracciones_equivalentes-pag26-v5',
        AMP_EXAMPLE: 'fracciones_equivalentes-pag26-v6',
        AMP_PRAC: 'fracciones_equivalentes-pag26-v7',
    };

    // --- State for Exercises ---
    const [simpAns, setSimpAns] = useState({ n: '', d: '' });
    const [simpResult, setSimpResult] = useState<'correct' | 'incorrect' | null>(null);

    const [amp1Ans, setAmp1Ans] = useState({ n: '', d: '' });
    const [amp2Ans, setAmp2Ans] = useState({ n: '', d: '' });
    const [amp1Result, setAmp1Result] = useState<'correct' | 'incorrect' | null>(null);
    const [amp2Result, setAmp2Result] = useState<'correct' | 'incorrect' | null>(null);

    // Initial load and auto-checking
    useEffect(() => {
        if (isExerciseCompleted(EXERCISE_IDS.SIMP)) setSimpResult('correct');
        if (isExerciseCompleted(EXERCISE_IDS.AMP1)) setAmp1Result('correct');
        if (isExerciseCompleted(EXERCISE_IDS.AMP2)) setAmp2Result('correct');

        const A_REQUIRED = [
            // Page 25 Videos
            'fracciones_equivalentes-pag25-v1', 'fracciones_equivalentes-pag25-v2', 'fracciones_equivalentes-pag25-v3',
            'fracciones_equivalentes-pag25-v4', 'fracciones_equivalentes-pag25-v5', 'fracciones_equivalentes-pag25-v6',
            'fracciones_equivalentes-pag25-v7',
            // Page 25 Exercises
            'fracciones_equivalentes-pag25-row1', 'fracciones_equivalentes-pag25-row2',
            // Page 26 Videos
            'fracciones_equivalentes-pag26-v1', 'fracciones_equivalentes-pag26-v3', 'fracciones_equivalentes-pag26-v4',
            'fracciones_equivalentes-pag26-v5', 'fracciones_equivalentes-pag26-v6', 'fracciones_equivalentes-pag26-v7',
            // Page 26 Exercises
            EXERCISE_IDS.SIMP, EXERCISE_IDS.AMP1, EXERCISE_IDS.AMP2
        ];

        const aDone = A_REQUIRED.every(id =>
            watchedVideos.includes(id) || completedExercises[id]?.completed
        );
        if (aDone) completeStage(STAGE_IDS.A_STAGE);
    }, [isExerciseCompleted, watchedVideos, completedExercises]);

    const handleSimpCheck = async () => {
        if (isExerciseCompleted(EXERCISE_IDS.SIMP)) return;
        const isCorrect = simpAns.n === '2' && simpAns.d === '5';
        setSimpResult(isCorrect ? 'correct' : 'incorrect');
        await submitGame(EXERCISE_IDS.SIMP, isCorrect, 'juego_cpa');
    };

    const handleAmp1Check = async () => {
        if (isExerciseCompleted(EXERCISE_IDS.AMP1)) return;
        const isCorrect = amp1Ans.n === '10' && amp1Ans.d === '15';
        setAmp1Result(isCorrect ? 'correct' : 'incorrect');
        await submitGame(EXERCISE_IDS.AMP1, isCorrect, 'juego_cpa');
    };

    const handleAmp2Check = async () => {
        if (isExerciseCompleted(EXERCISE_IDS.AMP2)) return;
        const isCorrect = amp2Ans.n === '25' && amp2Ans.d === '35';
        setAmp2Result(isCorrect ? 'correct' : 'incorrect');
        await submitGame(EXERCISE_IDS.AMP2, isCorrect, 'juego_cpa');
    };

    const resetSimp = () => { if (isExerciseCompleted(EXERCISE_IDS.SIMP)) return; setSimpAns({ n: '', d: '' }); setSimpResult(null); };
    const resetAmp1 = () => { if (isExerciseCompleted(EXERCISE_IDS.AMP1)) return; setAmp1Ans({ n: '', d: '' }); setAmp1Result(null); };
    const resetAmp2 = () => { if (isExerciseCompleted(EXERCISE_IDS.AMP2)) return; setAmp2Ans({ n: '', d: '' }); setAmp2Result(null); };

    // Helper components
    const Fraction = ({ num, den, size = "text-base", color = "text-semibold" }: any) => (
        <div className={`inline-flex flex-col items-center align-middle ${size} font-bold px-1`}>
            <span className={color}>{num}</span>
            <div className={`w-full h-0.5 ${color === 'text-white' ? 'bg-white' : 'bg-black'} my-0.5`} />
            <span className={color}>{den}</span>
        </div>
    );

    const InputFraction = ({ value, onChange, result, disabled }: any) => (
        <div className="flex flex-col items-center gap-1">
            <input
                type="text"
                className="w-14 h-14 text-center rounded-lg text-2xl font-black outline-none border-none shadow-sm"
                style={{ backgroundColor: '#d9d9d9' }}
                value={value.n}
                onChange={e => onChange({ ...value, n: e.target.value })}
                disabled={disabled}
            />
            <div className="w-14 h-1 bg-black rounded-full" />
            <input
                type="text"
                className="w-14 h-14 text-center rounded-lg text-2xl font-black outline-none border-none shadow-sm"
                style={{ backgroundColor: '#d9d9d9' }}
                value={value.d}
                onChange={e => onChange({ ...value, d: e.target.value })}
                disabled={disabled}
            />
        </div>
    );

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones Equivalentes' }} pageId="frac-equiv-concepto-abstracto-2">
            <div className="relative ml-2 flex items-start">
                {/* CPA Indicator "A" */}
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#be90de]">
                    A {completedStages.includes(STAGE_IDS.A_STAGE) && <span className="ml-1 text-[#7c3aed]">✓</span>}
                </div>

                {/* Content Container */}
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-10 bg-white border-[#be90de]">
                    {/* --- STAGE A: ABSTRACTO --- */}
                    <div className="space-y-16">
                        {/* 1. SIMPLIFICACIÓN */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <PlayVideoButton trackingId={VIDEO_TRACKING.SIMP_INTRO} title="" videoId="/pag26/vv-1" />
                                <div className="text-white font-bold px-6 py-2 rounded-lg text-xl shadow-sm" style={{ backgroundColor: '#e95352' }}>
                                    ¿Qué es una simplificación?
                                </div>
                            </div>

                            <p className="text-base text-gray-800 font-semibold pl-12 leading-relaxed">
                                <span className="text-[#e95352] font-bold">Simplificar una fracción</span> consiste en dividir numerador y denominador por un mismo número.
                            </p>

                            {/* EXAMPLE 1 */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.SIMP_EXAMPLE} title="Ejemplo Simplificación" videoId="/pag26/vv-2" />
                                    <div className="bg-green-600 text-white font-bold px-4 py-1 rounded inline-block text-lg shadow-sm">
                                        Ejemplo:
                                    </div>
                                    <p className="text-base text-gray-800 font-semibold">
                                        Observa cómo se simplificó la siguiente fracción:
                                    </p>
                                </div>

                                <div className="flex justify-center my-8 pl-8">
                                    <img src="/fracciones_equivalentes/img1.png" alt="Ejemplo Simplificación" className="h-20 object-containshadow-md" />
                                </div>

                                <div className="flex items-center gap-4 pl-12 w-full">
                                    <p className="text-base text-gray-800 font-semibold leading-relaxed flex-1">
                                        La fracción <Fraction num="3" den="5" size="text-2xl" /> no se puede simplificar más porque esos números 3 y 5 son primos y no tienen factores.
                                        <PlayVideoButton trackingId={VIDEO_TRACKING.SIMP_EXAMPLE} title="" videoId="/pag26/vv-3" />
                                    </p>

                                </div>
                            </div>

                            {/* PRACTICE 1 */}
                            <div className="space-y-8 pt-4">
                                <div className="flex items-center gap-4">
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.SIMP_PRAC} title="Práctica Simplificación" videoId="/pag26/vv-4" />
                                    <div className="bg-[#800000] text-white font-bold px-6 py-1.5 rounded-sm text-lg shadow-md tracking-wider">
                                        PRÁCTICA
                                    </div>
                                    <p className="text-base font-semibold text-gray-800">
                                        Simplificar la siguiente fracción:
                                    </p>
                                </div>

                                <div className="flex items-center justify-center gap-12 pl-12 bg-gray-50/50 p-8 rounded-2xl relative">
                                    <div className="flex items-center gap-8">
                                        <div className="w-4 h-4 bg-[#800000] flex-shrink-0" />
                                        <Fraction num="4" den="10" size="text-4xl" />
                                        <span className="text-4xl font-black text-gray-300">=</span>
                                        <InputFraction
                                            value={simpAns}
                                            onChange={(val: any) => { setSimpAns(val); setSimpResult(null); }}
                                            disabled={simpResult === 'correct'}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <FeedbackButton
                                            onCheck={handleSimpCheck}
                                            onReset={resetSimp}
                                            status={simpResult}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. AMPLIFICACIÓN */}
                        <div className="space-y-8 pt-8 border-t-2 border-dashed border-gray-100">
                            <div className="flex items-center gap-4">
                                <PlayVideoButton trackingId={VIDEO_TRACKING.AMP_INTRO} title="" videoId="/pag26/vv-5" />
                                <div className="text-white font-bold px-6 py-2 rounded-lg text-xl shadow-sm" style={{ backgroundColor: '#e95352' }}>
                                    ¿Qué es una amplificación?
                                </div>
                            </div>

                            <p className="text-base text-gray-800 font-semibold pl-12 leading-relaxed">
                                <span className="text-[#e95352] font-extrabold">Amplificar una fracción</span> consiste en multiplicar numerador y denominador por un mismo número.
                            </p>

                            {/* EXAMPLE 2 */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.AMP_EXAMPLE} title="Ejemplo Amplificación" videoId="/pag26/vv-6" />
                                    <div className="bg-green-600 text-white font-bold px-4 py-1 rounded inline-block text-lg shadow-sm">
                                        Ejemplo:
                                    </div>
                                    <p className="text-base text-gray-800 font-semibold">
                                        Observa cómo se amplificó la siguiente fracción:
                                    </p>
                                </div>
                                <div className="flex justify-center my-8 pl-8">
                                    <img src="/fracciones_equivalentes/img2.png" alt="Ejemplo Simplificación" className="h-32 object-containshadow-md" />
                                </div>
                            </div>

                            {/* PRACTICE 2 */}
                            <div className="space-y-8 pt-4">
                                <div className="flex items-center gap-4">
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.AMP_PRAC} title="Práctica Amplificación" videoId="/pag26/vv-7" />
                                    <div className="bg-[#800000] text-white font-bold px-6 py-1.5 rounded-sm text-lg shadow-md tracking-wider">
                                        PRÁCTICA
                                    </div>
                                    <p className="text-base text-gray-800 font-semibold">
                                        Las dos siguientes fracciones se amplifiquen por 5:
                                    </p>
                                </div>

                                <div className="space-y-12 pl-12">
                                    {/* Exercise 1 */}
                                    <div className="flex items-center gap-12 bg-gray-50/50 p-8 rounded-2xl w-fit">
                                        <div className="flex items-center gap-8">
                                            <div className="w-4 h-4 bg-[#800000] flex-shrink-0" />
                                            <Fraction num="2" den="3" size="text-2xl" />
                                            <span className="text-2xl font-black text-gray-300">=</span>
                                            <InputFraction
                                                value={amp1Ans}
                                                onChange={(val: any) => { setAmp1Ans(val); setAmp1Result(null); }}
                                                disabled={amp1Result === 'correct'}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <FeedbackButton
                                                onCheck={handleAmp1Check}
                                                onReset={resetAmp1}
                                                status={amp1Result}
                                            />
                                        </div>
                                    </div>

                                    {/* Exercise 2 */}
                                    <div className="flex items-center gap-12 bg-gray-50/50 p-8 rounded-2xl w-fit">
                                        <div className="flex items-center gap-8">
                                            <div className="w-4 h-4 bg-[#800000] flex-shrink-0" />
                                            <Fraction num="5" den="7" size="text-2xl" />
                                            <span className="text-2xl font-black text-gray-300">=</span>
                                            <InputFraction
                                                value={amp2Ans}
                                                onChange={(val: any) => { setAmp2Ans(val); setAmp2Result(null); }}
                                                disabled={amp2Result === 'correct'}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <FeedbackButton
                                                onCheck={handleAmp2Check}
                                                onReset={resetAmp2}
                                                status={amp2Result}
                                            />
                                        </div>
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
