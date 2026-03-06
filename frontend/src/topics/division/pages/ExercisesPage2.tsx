'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useEffect } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';


interface ExercisesPage2Props {
    zoom?: number;
}
//PAGINA 6 EJERCICIOS
export function ExercisesPage2({ zoom = 1 }: ExercisesPage2Props) {
    const { isVideoWatched, markVideoWatched, submitExercise, submitGame, isExerciseCompleted, completeStage } = useVideoProgress();

    const EXERCISE_IDS = {
        ACT1: 'division-pag6-ej1',
        ACT4: 'division-pag6-ej2', // Problem solving
        ACT5: 'division-pag6-ej3'  // False division
    };

    const STAGE_IDS = {
        ACT1_STAGE: 'division-pag6-ej1-stage',
        ACT4_STAGE: 'division-pag6-ej2-stage',
        ACT5_STAGE: 'division-pag6-ej3-stage',
        MODULO_A: 'division-pag6-modulo-a',
        MODULO_B: 'division-pag6-modulo-b',
        MODULO_C: 'division-pag6-modulo-c'
    };

    const VIDEO_TRACKING_IDS = {
        ACTIVITY_1_Q1: 'division-pag6-v1',
        ACTIVITY_1_Q2: 'division-pag6-v2',
        PROBLEM_SOLVING: 'division-pag6-v3',
        FALSE_DIVISION: 'division-pag6-v4'
    };

    // --- ACTIVITY 1: TRUE/FALSE ---
    const [act1_q1, setAct1_q1] = useState<'V' | 'F' | null>(null);
    const [act1_q2, setAct1_q2] = useState<'V' | 'F' | null>(null);
    const [act1Status, setAct1Status] = useState<'correct' | 'incorrect' | null>(null);

    // Initial load and completion check
    useEffect(() => {
        const act1Done = isExerciseCompleted(EXERCISE_IDS.ACT1);
        const act4Done = isExerciseCompleted(EXERCISE_IDS.ACT4);
        const act5Done = isExerciseCompleted(EXERCISE_IDS.ACT5);

        if (act1Done) {
            setAct1Status('correct');
            completeStage('division-pag6-modulo-b', 0);
        }
        if (act4Done) {
            setAct4Status('correct');
        }
        if (act5Done) {
            setAct5Status('correct');
        }
        if (act4Done && act5Done) {
            completeStage('division-pag6-modulo-a', 0);
        }
        if (act1Done && act4Done && act5Done) {
            completeStage('division-final', 0);
        }
    }, [isExerciseCompleted]);

    const resetAct1 = () => {
        if (isExerciseCompleted(EXERCISE_IDS.ACT1)) return;
        setAct1_q1(null);
        setAct1_q2(null);
        setAct1Status(null);
    };

    const checkAct1 = async () => {
        if (isExerciseCompleted(EXERCISE_IDS.ACT1)) return;
        const isCorrect = act1_q1 === 'V' && act1_q2 === 'F';
        setAct1Status(isCorrect ? 'correct' : 'incorrect');
        await submitExercise(EXERCISE_IDS.ACT1, isCorrect, 'modulo_b');
        if (isCorrect) {
            await completeStage(STAGE_IDS.ACT1_STAGE);
            await completeStage(STAGE_IDS.MODULO_B);
        }
    };

    // --- ACTIVITY 4: PROBLEM SOLVING ---
    const [act4_h_div, setAct4_h_div] = useState(['', '', '']);
    const [act4_v_dividend, setAct4_v_dividend] = useState('');
    const [act4_v_divisor, setAct4_v_divisor] = useState('');
    const [act4_v_quotient, setAct4_v_quotient] = useState('');
    const [act4_v_sub, setAct4_v_sub] = useState('');
    const [act4_v_rem, setAct4_v_rem] = useState('');
    const [act4_m_rows, setAct4_m_rows] = useState(
        Array(4).fill(null).map(() => ({ a: '', b: '', res: '' }))
    );
    const [act4Status, setAct4Status] = useState<'correct' | 'incorrect' | null>(null);

    const resetAct4 = () => {
        if (isExerciseCompleted(EXERCISE_IDS.ACT4)) return;
        setAct4_h_div(['', '', '']);
        setAct4_v_dividend('');
        setAct4_v_divisor('');
        setAct4_v_quotient('');
        setAct4_v_sub('');
        setAct4_v_rem('');
        setAct4_m_rows(Array(4).fill(null).map(() => ({ a: '', b: '', res: '' })));
        setAct4Status(null);
    };

    const checkAct4 = async () => {
        if (isExerciseCompleted(EXERCISE_IDS.ACT4)) return;
        const hCorrect = act4_h_div[0] === '36' && act4_h_div[1] === '12' && act4_h_div[2] === '3';
        const vCorrect =
            act4_v_dividend === '36' &&
            act4_v_divisor === '12' &&
            act4_v_quotient === '3' &&
            (act4_v_sub === '36') &&
            (act4_v_rem === '0');

        const mRowsFilled = act4_m_rows.filter(r => r.a && r.b && r.res);
        const hasTarget = mRowsFilled.some(r =>
            (r.a === '12' && r.b === '3' && r.res === '36') ||
            (r.a === '3' && r.b === '12' && r.res === '36')
        );
        const mathValid = mRowsFilled.every(r => parseInt(r.a) * parseInt(r.b) === parseInt(r.res));

        const isCorrect = hCorrect && vCorrect && hasTarget && mathValid;
        setAct4Status(isCorrect ? 'correct' : 'incorrect');
        await submitExercise(EXERCISE_IDS.ACT4, isCorrect, 'modulo_a');
        if (isCorrect) {
            await completeStage(STAGE_IDS.ACT4_STAGE);
            if (act5Status === 'correct') {
                await completeStage(STAGE_IDS.MODULO_A);
            }
            checkModuloC(isCorrect, act5Status === 'correct');
        }
    };

    // --- ACTIVITY 5: FALSE DIVISION ---
    const [act5_inputs, setAct5_inputs] = useState(['', '', '']);
    const [act5Status, setAct5Status] = useState<'correct' | 'incorrect' | null>(null);

    const resetAct5 = () => {
        if (isExerciseCompleted(EXERCISE_IDS.ACT5)) return;
        setAct5_inputs(['', '', '']);
        setAct5Status(null);
    };

    const checkAct5 = async () => {
        if (isExerciseCompleted(EXERCISE_IDS.ACT5)) return;
        const i0 = act5_inputs[0].toUpperCase().trim();
        const i1 = act5_inputs[1].toUpperCase().trim();
        const i2 = act5_inputs[2].toUpperCase().trim();

        const isCorrect = (i0 === 'V') && (i1 === 'F') && (i2 === 'F');
        setAct5Status(isCorrect ? 'correct' : 'incorrect');
        await submitExercise(EXERCISE_IDS.ACT5, isCorrect, 'modulo_a');
        if (isCorrect) {
            await completeStage(STAGE_IDS.ACT5_STAGE);
            if (act4Status === 'correct') {
                await completeStage(STAGE_IDS.MODULO_A);
            }
            checkModuloC(act4Status === 'correct', isCorrect);
        }
    };

    const checkModuloC = async (act4: boolean, act5: boolean) => {
        if (act4 && act5) {
            await completeStage(STAGE_IDS.MODULO_C);
        }
    };


    return (
        <BookPageContainer
            zoom={zoom}
            moduleHeader={{
                name: 'División'
            }}
            pageId="division-pag13"
        >
            <div className="flex flex-col gap-10 max-w-4xl mx-auto pb-32">
                <h1 className="text-3xl font-black text-purple-700 dark:text-purple-400 uppercase">Ejercicios</h1>

                {/* --- ACTIVITY 1 --- */}
                <div className="flex bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex-col gap-6">
                    <div className="flex items-start gap-4">
                        <PlayVideoButton
                            trackingId={VIDEO_TRACKING_IDS.ACTIVITY_1_Q1}
                            title="Ejercicio 5b"
                            videoId="/pag6/vv-1"
                        />
                        <div className="flex-1">
                            <div className="font-semibold text-base leading-relaxed text-gray-800 dark:text-gray-200">
                                Hay 40 caramelos para repartir en partes iguales entre 10 niños. <br />
                                Cada niño recibe 4 caramelos.
                                <span className={`inline-flex gap-2 ml-4 align-middle ${act1Status === 'correct' ? 'pointer-events-none opacity-80' : ''}`}>
                                    <SelectButton label="V" selected={act1Status === 'correct' ? true : act1_q1 === 'V'} onClick={() => { setAct1Status(null); setAct1_q1('V'); }} />
                                    <SelectButton label="F" selected={act1Status === 'correct' ? false : act1_q1 === 'F'} onClick={() => { setAct1Status(null); setAct1_q1('F'); }} />
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <PlayVideoButton
                            trackingId={VIDEO_TRACKING_IDS.ACTIVITY_1_Q2}
                            title="Ejercicio 5c"
                            videoId="/pag6/vv-2"
                        />
                        <div className="flex-1">
                            <div className="font-semibold text-base leading-relaxed text-gray-800 dark:text-gray-200">
                                En una competencia participan 88 atletas. Se reparten en 10 carriles de la pista. <br />
                                Las 8 atletas corren en cada carril.
                                <span className={`inline-flex gap-2 ml-4 align-middle ${act1Status === 'correct' ? 'pointer-events-none opacity-80' : ''}`}>
                                    <SelectButton label="V" selected={act1Status === 'correct' ? false : act1_q2 === 'V'} onClick={() => { setAct1Status(null); setAct1_q2('V'); }} />
                                    <SelectButton label="F" selected={act1Status === 'correct' ? true : act1_q2 === 'F'} onClick={() => { setAct1Status(null); setAct1_q2('F'); }} />
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-start gap-4 mt-2">
                        <FeedbackButton
                            onCheck={checkAct1}
                            onReset={resetAct1}
                            status={act1Status}
                        />
                    </div>
                </div>

                {/* --- ACTIVITY 4 --- */}
                <div className="flex bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-700 text-white font-black text-xl flex items-center justify-center rounded-lg">4</div>
                        <div className="flex items-center gap-2">
                            <PlayVideoButton
                                trackingId={VIDEO_TRACKING_IDS.PROBLEM_SOLVING}
                                title="Ejercicio 6"
                                videoId="/pag6/vv-3"
                            />
                            <p className="font-bold text-gray-800 dark:text-gray-200">Resuelve una situación problemática:</p>
                        </div>
                    </div>

                    <div className="ml-0 md:ml-12 flex flex-col gap-6">
                        <p className="text-base text-gray-800 dark:text-gray-200 font-semibold">
                            En una piscina entrenan 36 nadadores. Se organizan en 12 grupos iguales.
                            <br />
                            <strong>¿Cuántos nadadores hay en cada grupo?</strong>
                        </p>

                        <div className={`flex items-center gap-2 text-2xl font-bold justify-center md:justify-center text-gray-800 dark:text-white ${act4Status === 'correct' ? 'pointer-events-none' : ''}`}>
                            <InputBox value={act4Status === 'correct' ? '36' : act4_h_div[0]} onChange={v => { const n = [...act4_h_div]; n[0] = v; setAct4_h_div(n); setAct4Status(null); }} />
                            <span>÷</span>
                            <InputBox value={act4Status === 'correct' ? '12' : act4_h_div[1]} onChange={v => { const n = [...act4_h_div]; n[1] = v; setAct4_h_div(n); setAct4Status(null); }} />
                            <span>=</span>
                            <InputBox value={act4Status === 'correct' ? '3' : act4_h_div[2]} onChange={v => { const n = [...act4_h_div]; n[2] = v; setAct4_h_div(n); setAct4Status(null); }} />
                        </div>

                        <hr className="border-gray-200 dark:border-gray-700" />

                        <div className={`flex flex-col md:flex-row gap-12 items-start ${act4Status === 'correct' ? 'pointer-events-none' : ''}`}>
                            <div className="flex gap-4 font-mono text-xl items-start">
                                <div className="flex flex-col items-end gap-1">
                                    <InputBox value={act4Status === 'correct' ? '36' : act4_v_dividend} onChange={v => { setAct4_v_dividend(v); setAct4Status(null); }} className="w-16 h-16 text-3xl" />
                                    <div className="relative">
                                        <span className="absolute -left-8 top-2 text-4xl font-bold text-gray-800 dark:text-gray-200 select-none">-</span>
                                        <InputBox value={act4Status === 'correct' ? '36' : act4_v_sub} onChange={v => { setAct4_v_sub(v); setAct4Status(null); }} className="w-16 h-16 text-3xl" />
                                    </div>
                                    <div className="w-16 h-1 bg-black dark:bg-white rounded-full"></div>
                                    <InputBox value={act4Status === 'correct' ? '0' : act4_v_rem} onChange={v => { setAct4_v_rem(v); setAct4Status(null); }} className="w-16 h-16 text-3xl" />
                                </div>
                                <div className="flex flex-col">
                                    <div className="border-l-4 border-b-4 border-black dark:border-white pl-2 pb-2 mb-2">
                                        <InputBox value={act4Status === 'correct' ? '12' : act4_v_divisor} onChange={v => { setAct4_v_divisor(v); setAct4Status(null); }} className="w-16 h-16 text-3xl border-none focus:ring-0 bg-transparent" />
                                    </div>
                                    <div className="pl-2">
                                        <InputBox value={act4Status === 'correct' ? '3' : act4_v_quotient} onChange={v => { setAct4_v_quotient(v); setAct4Status(null); }} className="w-16 h-16 text-3xl" />
                                    </div>
                                </div>
                            </div>

                            <div className="hidden md:block w-px bg-gray-300 dark:bg-gray-600 self-stretch"></div>

                            <div className="flex flex-col gap-4 text-gray-800 dark:text-white">
                                {act4_m_rows.map((row, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <InputBox value={act4Status === 'correct' && i === 0 ? '12' : row.a} onChange={v => {
                                            const n = [...act4_m_rows]; n[i].a = v; setAct4_m_rows(n); setAct4Status(null);
                                        }} className="w-14 h-12" />
                                        <span className="text-xl font-bold">×</span>
                                        <InputBox value={act4Status === 'correct' && i === 0 ? '3' : row.b} onChange={v => {
                                            const n = [...act4_m_rows]; n[i].b = v; setAct4_m_rows(n); setAct4Status(null);
                                        }} className="w-14 h-12" />
                                        <span className="text-xl font-bold">=</span>
                                        <InputBox value={act4Status === 'correct' && i === 0 ? '36' : row.res} onChange={v => {
                                            const n = [...act4_m_rows]; n[i].res = v; setAct4_m_rows(n); setAct4Status(null);
                                        }} className="w-14 h-12" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-start gap-4 mt-2">
                            <FeedbackButton
                                onCheck={checkAct4}
                                onReset={resetAct4}
                                status={act4Status}
                            />
                        </div>
                    </div>
                </div>

                {/* --- ACTIVITY 5 --- */}
                <div className="flex bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-700 text-white font-black text-xl flex items-center justify-center rounded-lg">5</div>
                        <div className="flex items-center gap-2">
                            <PlayVideoButton
                                trackingId={VIDEO_TRACKING_IDS.FALSE_DIVISION}
                                title="Ejercicio 7"
                                videoId="/pag6/vv-4"
                            />
                            <p className="font-semibold text-gray-800 dark:text-gray-200">Encuentra la división falsa <span className='text-red-500'>(F)</span>. ¿Cuál está incorrecta?</p>
                        </div>
                    </div>

                    <div className={`ml-0 md:ml-12 grid gap-6 ${act5Status === 'correct' ? 'pointer-events-none' : ''}`}>
                        {[
                            { text: '56 ÷ 7 = 8', idx: 0, ans: 'V' },
                            { text: '45 ÷ 9 = 6', idx: 1, ans: 'F' },
                            { text: '72 ÷ 6 = 14', idx: 2, ans: 'F' },
                        ].map((item) => (
                            <div key={item.idx} className="flex items-center gap-4">
                                <div className="w-4 h-4 bg-purple-600 rounded-sm"></div>
                                <span className="text-3xl font-bold text-gray-800 dark:text-gray-200 font-mono tracking-wide w-48">{item.text}</span>
                                <span className="text-2xl text-gray-400 dark:text-gray-500">→</span>
                                <InputBox
                                    value={act5Status === 'correct' ? item.ans : act5_inputs[item.idx]}
                                    onChange={v => {
                                        const n = [...act5_inputs];
                                        n[item.idx] = v.toUpperCase();
                                        setAct5_inputs(n);
                                        setAct5Status(null);
                                    }}
                                    className={`w-14 h-14 text-2xl uppercase ${act5Status === 'correct' && item.idx > 0 ? 'text-red-600 font-black' : ''}`}
                                    maxLength={1}
                                />
                            </div>
                        ))}

                        <div className="flex justify-start items-center gap-4 mt-2 flex-wrap">
                            <FeedbackButton
                                onCheck={checkAct5}
                                onReset={resetAct5}
                                status={act5Status}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </BookPageContainer>
    );
}

// --- Helpers ---
const SelectButton = ({ label, selected, onClick }: { label: string, selected: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`w-12 h-12 font-bold text-2xl rounded-lg shadow-sm transition-all border-2
            ${selected ? 'bg-purple-600 text-white border-purple-600 scale-110 ring-2 ring-purple-200 dark:ring-purple-900' : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:border-purple-300 dark:hover:border-purple-500 hover:text-purple-600'}
        `}
    >
        {label}
    </button>
);

const InputBox = ({ value, onChange, className = "w-16 h-12", maxLength }: { value: string, onChange: (v: string) => void, className?: string, maxLength?: number }) => (
    <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-black dark:text-white text-center font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white dark:focus:bg-gray-800 transition-all ${className}`}
        maxLength={maxLength}
    />
);
