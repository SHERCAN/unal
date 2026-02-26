'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';
import React, { useState } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';

interface Props { zoom?: number; }
//PAGINA 3 EJERCICIOS
export function EjerciciosPage({ zoom = 1 }: Props) {
    const { submitExercise, isExerciseCompleted, completeStage } = useVideoProgress();

    const VIDEO_TRACKING = {
        EJ_INTRO: 'comparacion_fracciones-pag1-v9',
        EJ_A: 'comparacion_fracciones-pag1-v10',
        EJ_B: 'comparacion_fracciones-pag1-v11'
    };

    // Correct answers
    const answersA = { 0: '<', 1: '<', 2: '>', 3: '>' };
    const answersB = { 0: '<', 1: '<', 2: '>', 3: '>', 4: '=', 5: '=' };

    const [actA, setActA] = useState<Record<number, string>>({});
    const [actB, setActB] = useState<Record<number, string>>({});
    const [resultsA, setResultsA] = useState<Record<number, 'correct' | 'incorrect' | null>>({});
    const [resultsB, setResultsB] = useState<Record<number, 'correct' | 'incorrect' | null>>({});

    const checkA = async (idx: number) => {
        const isCorrect = actA[idx] === answersA[idx as keyof typeof answersA];
        setResultsA(prev => ({ ...prev, [idx]: isCorrect ? 'correct' : 'incorrect' }));
        await submitExercise(`comparacion_fracciones-pag1-ej${idx + 1}`, isCorrect, 'modulo_b');
        checkFinalCompletion();
    };

    const checkB = async (idx: number) => {
        const isCorrect = actB[idx] === answersB[idx as keyof typeof answersB];
        setResultsB(prev => ({ ...prev, [idx]: isCorrect ? 'correct' : 'incorrect' }));
        await submitExercise(`comparacion_fracciones-pag1-ej${idx + 5}`, isCorrect, 'modulo_b');
        checkFinalCompletion();
    };

    const checkFinalCompletion = () => {
        const allADone = Object.keys(answersA).every(idx => resultsA[parseInt(idx)] === 'correct' || isExerciseCompleted(`comparacion_fracciones-pag1-ej${parseInt(idx) + 1}`));
        const allBDone = Object.keys(answersB).every(idx => resultsB[parseInt(idx)] === 'correct' || isExerciseCompleted(`comparacion_fracciones-pag1-ej${parseInt(idx) + 5}`));
        if (allADone && allBDone) {
            completeStage('comparacion-fracciones-final');
        }
    };

    // Initial load and sync
    React.useEffect(() => {
        const nextA = { ...resultsA };
        Object.keys(answersA).forEach(idx => {
            if (isExerciseCompleted(`comparacion_fracciones-pag1-ej${parseInt(idx) + 1}`)) nextA[parseInt(idx)] = 'correct';
        });
        setResultsA(nextA);

        const nextB = { ...resultsB };
        Object.keys(answersB).forEach(idx => {
            if (isExerciseCompleted(`comparacion_fracciones-pag1-ej${parseInt(idx) + 5}`)) nextB[parseInt(idx)] = 'correct';
        });
        setResultsB(nextB);
    }, [isExerciseCompleted]);

    const Fraction = ({ num, den }: any) => (
        <div className="inline-flex flex-col items-center align-middle text-2xl font-black px-1">
            <span>{num}</span>
            <div className="w-full h-0.5 bg-black my-0.5" />
            <span>{den}</span>
        </div>
    );

    const Exercise = ({ num1, den1, num2, den2, idx, state, setState, result, onCheck, onReset }: any) => (
        <div className="flex items-center gap-4 p-2 rounded-xl hover:bg-gray-50 transition-colors group">
            <div className="w-4 h-4 bg-purple-600 rounded-sm flex-shrink-0" />
            <div className="flex items-center gap-3">
                <Fraction num={num1} den={den1} />
                <div className="relative">
                    <select
                        value={state[idx] || ''}
                        onChange={(e) => {
                            setState((prev: any) => ({ ...prev, [idx]: e.target.value }));
                            onReset(idx);
                        }}
                        className="w-14 h-14 text-2xl font-black text-purple-700 bg-gray-100 rounded-lg appearance-none text-center outline-none border-2 border-transparent focus:border-purple-300 cursor-pointer"
                    >
                        <option value=""></option>
                        <option value="<">&lt;</option>
                        <option value=">">&gt;</option>
                        <option value="=">=</option>
                    </select>
                    <div className="absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none">
                        <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-gray-400"></div>
                    </div>
                </div>
                <Fraction num={num2} den={den2} />
            </div>
            <FeedbackButton
                status={result ?? null}
                onCheck={() => onCheck(idx)}
                onReset={() => {
                    setState((prev: any) => ({ ...prev, [idx]: '' }));
                    onReset(idx);
                }}
                className="scale-75 origin-left"
            />
        </div>
    );

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Comparación de Fracciones' }} pageId="comp-frac-ejercicios">
            {/* --- MODULO B --- */}
            <div className="space-y-10 pb-20">
                <div className="flex items-center gap-6">
                    <h1 className="text-4xl font-black text-purple-700 tracking-tight uppercase">EJERCICIOS</h1>
                </div>

                <div className="flex items-center gap-4">
                    <PlayVideoButton trackingId={VIDEO_TRACKING.EJ_INTRO} title="" videoId="/pag1/vv-9" />
                    <div className="bg-purple-700 text-white font-black text-4xl w-14 h-14 flex items-center justify-center rounded-xl shadow-lg flex-shrink-0">1</div>
                    <p className="text-base font-bold text-gray-800">Coloca el signo correcto: &lt; , &gt; o = entre las fracciones.</p>
                </div>

                {/* PART A */}
                <div className="space-y-6 ml-16">
                    <div className="flex items-center gap-4">
                        <div className="bg-purple-700 text-white font-black text-2xl px-4 py-2 rounded-lg">A</div>
                        <p className="text-base font-bold text-gray-800">Fracciones con el mismo denominador.</p>
                        <PlayVideoButton trackingId={VIDEO_TRACKING.EJ_A} title="" videoId="/pag1/vv-10" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 px-8">
                        <Exercise num1="2" den1="5" num2="4" den2="5" idx={0} state={actA} setState={setActA} result={resultsA[0]} onCheck={checkA} onReset={(i: number) => setResultsA(p => ({ ...p, [i]: null }))} />
                        <Exercise num1="1" den1="10" num2="9" den2="10" idx={1} state={actA} setState={setActA} result={resultsA[1]} onCheck={checkA} onReset={(i: number) => setResultsA(p => ({ ...p, [i]: null }))} />
                        <Exercise num1="7" den1="9" num2="3" den2="9" idx={2} state={actA} setState={setActA} result={resultsA[2]} onCheck={checkA} onReset={(i: number) => setResultsA(p => ({ ...p, [i]: null }))} />
                        <Exercise num1="11" den1="12" num2="10" den2="12" idx={3} state={actA} setState={setActA} result={resultsA[3]} onCheck={checkA} onReset={(i: number) => setResultsA(p => ({ ...p, [i]: null }))} />
                    </div>
                </div>

                {/* PART B */}
                <div className="space-y-6 pt-4 ml-16">
                    <div className="flex items-center gap-4">
                        <div className="bg-purple-700 text-white font-black text-2xl px-4 py-2 rounded-lg">B</div>
                        <p className="text-base font-bold text-gray-800">Fracciones con el diferente denominador.</p>
                        <PlayVideoButton trackingId={VIDEO_TRACKING.EJ_B} title="" videoId="/pag1/vv-11" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 px-8">
                        <Exercise num1="1" den1="2" num2="3" den2="4" idx={0} state={actB} setState={setActB} result={resultsB[0]} onCheck={checkB} onReset={(i: number) => setResultsB(p => ({ ...p, [i]: null }))} />
                        <Exercise num1="1" den1="2" num2="4" den2="8" idx={4} state={actB} setState={setActB} result={resultsB[4]} onCheck={checkB} onReset={(i: number) => setResultsB(p => ({ ...p, [i]: null }))} />
                        <Exercise num1="3" den1="4" num2="2" den2="3" idx={2} state={actB} setState={setActB} result={resultsB[2]} onCheck={checkB} onReset={(i: number) => setResultsB(p => ({ ...p, [i]: null }))} />
                        <Exercise num1="7" den1="9" num2="2" den2="3" idx={3} state={actB} setState={setActB} result={resultsB[3]} onCheck={checkB} onReset={(i: number) => setResultsB(p => ({ ...p, [i]: null }))} />
                        <Exercise num1="3" den1="9" num2="1" den2="3" idx={5} state={actB} setState={setActB} result={resultsB[5]} onCheck={checkB} onReset={(i: number) => setResultsB(p => ({ ...p, [i]: null }))} />
                        <Exercise num1="1" den1="10" num2="1" den2="3" idx={1} state={actB} setState={setActB} result={resultsB[1]} onCheck={checkB} onReset={(i: number) => setResultsB(p => ({ ...p, [i]: null }))} />
                    </div>
                </div>
            </div>
        </BookPageContainer>
    );
}
