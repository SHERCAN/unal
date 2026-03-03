'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useRef, useEffect } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { VIDEO_IDS } from '@/config/videos';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';


interface ExercisesPageProps {
    zoom?: number;
}
//PAGINA 5 EJERCICIOS
export function ExercisesPage({ zoom = 1 }: ExercisesPageProps) {
    const { isVideoWatched, markVideoWatched, submitExercise, submitGame, isExerciseCompleted, completeStage } = useVideoProgress();

    const EXERCISE_IDS = {
        ACT1A: 'division-pag5-ej1',
        ACT1B: 'division-pag5-ej2',
        ACT2: 'division-pag5-ej3',
        ACT3: 'division-pag5-ej4',
        ACT4: 'division-pag5-ej5'
    };

    const STAGE_IDS = {
        ACT1A: 'division-pag5-stage1a',
        ACT1B: 'division-pag5-stage1b',
        ACT2: 'division-pag5-stage2',
        ACT3: 'division-pag5-stage3',
        ACT4: 'division-pag5-stage4'
    };

    const VIDEO_TRACKING_IDS = {
        PRACTICE_1: 'division-pag5-v1',
        PRACTICE_2: 'division-pag5-v2',
        MATCHING: 'division-pag5-v3',
        QUOTIENTS: 'division-pag5-v4',
        TRUE_FALSE: 'division-pag5-v5',
        SITUATION: 'division-pag5-v6'
    };

    // --- ACTIVITY 1: SELECTION ---
    const [act1_a_selected, setAct1_a_selected] = useState<number | null>(null);
    const [act1_b_selected, setAct1_b_selected] = useState<number | null>(null);
    const [act1AStatus, setAct1AStatus] = useState<'correct' | 'incorrect' | null>(null);
    const [act1BStatus, setAct1BStatus] = useState<'correct' | 'incorrect' | null>(null);

    // Load initial status
    useEffect(() => {
        if (isExerciseCompleted(EXERCISE_IDS.ACT1A)) {
            setAct1AStatus('correct');
            setAct1_a_selected(1);
        }
        if (isExerciseCompleted(EXERCISE_IDS.ACT1B)) {
            setAct1BStatus('correct');
            setAct1_b_selected(0);
        }
        if (isExerciseCompleted(EXERCISE_IDS.ACT2)) {
            setAct2Status('correct');
            setConnections([
                { from: 0, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 }, { from: 3, to: 1 }, { from: 4, to: 0 }
            ]);
        }
        if (isExerciseCompleted(EXERCISE_IDS.ACT4)) {
            setAct4Status('correct');
            setAct4Selected('F');
        }

        // Initial load for Activity 3 sub-exercises
        const newAct3Statuses = [...act3Statuses];
        const newAct3Inputs = [...act3Inputs];
        const act3Answers = ['5', '4', '6', '9', '6', '4', '10', '5', '3', '5'];
        for (let i = 0; i < 10; i++) {
            if (isExerciseCompleted(`${EXERCISE_IDS.ACT3}-${i + 1}`)) {
                newAct3Statuses[i] = 'correct';
                newAct3Inputs[i] = act3Answers[i];
            }
        }
        setAct3Statuses(newAct3Statuses);
        setAct3Inputs(newAct3Inputs);

        // Check for final completion
        const allDone = [
            EXERCISE_IDS.ACT1A, EXERCISE_IDS.ACT1B, EXERCISE_IDS.ACT2, EXERCISE_IDS.ACT4,
            ...Array.from({ length: 10 }, (_, i) => `${EXERCISE_IDS.ACT3}-${i + 1}`)
        ].every(id => isExerciseCompleted(id));

        if (allDone) {
            completeStage('division-final', 0);
        }
    }, [isExerciseCompleted]);

    const resetAct1A = () => {
        if (isExerciseCompleted(EXERCISE_IDS.ACT1A)) return;
        setAct1_a_selected(null);
        setAct1AStatus(null);
    };

    const resetAct1B = () => {
        if (isExerciseCompleted(EXERCISE_IDS.ACT1B)) return;
        setAct1_b_selected(null);
        setAct1BStatus(null);
    };

    const checkAct1A = async () => {
        if (isExerciseCompleted(EXERCISE_IDS.ACT1A)) return;
        const isCorrect = act1_a_selected === 1;
        setAct1AStatus(isCorrect ? 'correct' : 'incorrect');
        await submitExercise(EXERCISE_IDS.ACT1A, isCorrect, 'modulo_a');
        if (isCorrect) {
            await completeStage(STAGE_IDS.ACT1A, 0);
        }
    };

    const checkAct1B = async () => {
        if (isExerciseCompleted(EXERCISE_IDS.ACT1B)) return;
        const isCorrect = act1_b_selected === 0;
        setAct1BStatus(isCorrect ? 'correct' : 'incorrect');
        await submitExercise(EXERCISE_IDS.ACT1B, isCorrect, 'modulo_a');
        if (isCorrect) {
            await completeStage(STAGE_IDS.ACT1B, 0);
        }
    };

    // --- ACTIVITY 2: MATCHING ---
    const [connections, setConnections] = useState<{ from: number, to: number }[]>([]);
    const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
    const [act2Status, setAct2Status] = useState<'correct' | 'incorrect' | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const leftDotsRef = useRef<(HTMLDivElement | null)[]>([]);
    const rightDotsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [dotCoords, setDotCoords] = useState<{ left: { x: number, y: number }[], right: { x: number, y: number }[] }>({ left: [], right: [] });

    // Update coordinates when connections change or on resize
    const updateCoords = () => {
        if (!containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();

        const left = leftDotsRef.current.map(dot => {
            if (!dot) return { x: 0, y: 0 };
            const rect = dot.getBoundingClientRect();
            return {
                x: rect.left - containerRect.left + rect.width / 2,
                y: rect.top - containerRect.top + rect.height / 2
            };
        });

        const right = rightDotsRef.current.map(dot => {
            if (!dot) return { x: 0, y: 0 };
            const rect = dot.getBoundingClientRect();
            return {
                x: rect.left - containerRect.left + rect.width / 2,
                y: rect.top - containerRect.top + rect.height / 2
            };
        });

        setDotCoords({ left, right });
    };

    useEffect(() => {
        updateCoords();
        window.addEventListener('resize', updateCoords);
        return () => window.removeEventListener('resize', updateCoords);
    }, [connections]);

    const resetAct2 = () => {
        if (isExerciseCompleted(EXERCISE_IDS.ACT2)) return;
        setConnections([]);
        setSelectedLeft(null);
        setAct2Status(null);
    };

    const handleLeftClick = (index: number) => {
        if (isExerciseCompleted(EXERCISE_IDS.ACT2)) return;
        // If already connected, remove connection
        if (connections.some(c => c.from === index)) {
            setConnections(prev => prev.filter(c => c.from !== index));
        }
        setSelectedLeft(index);
    };

    const handleRightClick = (index: number) => {
        if (isExerciseCompleted(EXERCISE_IDS.ACT2)) return;
        if (selectedLeft !== null) {
            setConnections(prev => [
                ...prev.filter(c => c.from !== selectedLeft && c.to !== index),
                { from: selectedLeft, to: index }
            ]);
            setSelectedLeft(null);
        }
    };

    const checkAct2 = async () => {
        if (isExerciseCompleted(EXERCISE_IDS.ACT2)) return;
        const correctPairs = [
            { from: 0, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 }, { from: 3, to: 1 }, { from: 4, to: 0 }
        ];
        const allCorrect = correctPairs.every(pair =>
            connections.some(c => c.from === pair.from && c.to === pair.to)
        ) && connections.length === 5;

        setAct2Status(allCorrect ? 'correct' : 'incorrect');
        await submitExercise(EXERCISE_IDS.ACT2, allCorrect, 'modulo_a');
        if (allCorrect) {
            await completeStage(STAGE_IDS.ACT2, 0);
        }
    };

    // --- ACTIVITY 3: QUOTIENTS ---
    const [act3Inputs, setAct3Inputs] = useState<string[]>(Array(10).fill(''));
    const [act3Statuses, setAct3Statuses] = useState<('correct' | 'incorrect' | null)[]>(Array(10).fill(null));

    const resetAct3Single = (index: number) => {
        if (isExerciseCompleted(`${EXERCISE_IDS.ACT3}-${index + 1}`)) return;
        const newInputs = [...act3Inputs];
        newInputs[index] = '';
        setAct3Inputs(newInputs);
        const newStatuses = [...act3Statuses];
        newStatuses[index] = null;
        setAct3Statuses(newStatuses);
    };

    const checkAct3Single = async (index: number) => {
        const id = `${EXERCISE_IDS.ACT3}-${index + 1}`;
        if (isExerciseCompleted(id)) return;

        const answers = ['5', '4', '6', '9', '6', '4', '10', '5', '3', '5'];
        const isCorrect = act3Inputs[index].trim() === answers[index];

        const newStatuses = [...act3Statuses];
        newStatuses[index] = isCorrect ? 'correct' : 'incorrect';
        setAct3Statuses(newStatuses);

        await submitGame(id, isCorrect, 'modulo_b');

        // If all 10 are correct, mark stage as complete
        const allCompleted = act3Inputs.every((val, i) =>
            i === index ? isCorrect : isExerciseCompleted(`${EXERCISE_IDS.ACT3}-${i + 1}`)
        );
        if (allCompleted) {
            await completeStage(STAGE_IDS.ACT3, 0);
        }
    };

    // --- ACTIVITY 4: TRUE/FALSE ---
    const [act4Selected, setAct4Selected] = useState<'V' | 'F' | null>(null);
    const [act4Status, setAct4Status] = useState<'correct' | 'incorrect' | null>(null);

    const resetAct4 = () => {
        if (isExerciseCompleted(EXERCISE_IDS.ACT4)) return;
        setAct4Selected(null);
        setAct4Status(null);
    };

    const checkAct4Submit = async (selection: 'V' | 'F') => {
        if (isExerciseCompleted(EXERCISE_IDS.ACT4)) return;
        setAct4Selected(selection);
        const isCorrect = selection === 'F';
        setAct4Status(isCorrect ? 'correct' : 'incorrect');
        await submitExercise(EXERCISE_IDS.ACT4, isCorrect, 'modulo_a');
        if (isCorrect) {
            await completeStage(STAGE_IDS.ACT4, 0);
        }
    };

    return (
        <BookPageContainer
            zoom={zoom}
            moduleHeader={{
                name: 'División'
            }}
            pageId="division-pag12"
        >
            <div className="flex flex-col gap-8">
                {/* Header */}
                <h1 className="text-3xl font-black text-purple-700 uppercase">Ejercicios</h1>

                {/* --- ACTIVITY 1 --- */}
                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-purple-700 text-white font-black text-2xl flex items-center justify-center rounded shrink-0">1</div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-gray-800 dark:text-gray-200">Seleccione el reparto correcto</span>
                        </div>

                        {/* 1A: Balls */}
                        {/* --- MODULO A --- */}
                        <div className="flex items-start gap-2">
                            <PlayVideoButton
                                trackingId={VIDEO_TRACKING_IDS.PRACTICE_1}
                                title="Ejercicio 1a"
                                videoId="/pag5/vv-1"
                            />
                            <div className="flex flex-col gap-2 w-full">
                                <p className="font-semibold text-base">El total de 56 pelotas de fútbol se reparte entre 7 bolsas de malla.</p>
                                <div className="flex items-center gap-4">
                                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 w-full ${act1AStatus === 'correct' ? 'pointer-events-none opacity-80' : ''}`}>
                                        {[0, 1, 2].map(i => (
                                            <div
                                                key={i}
                                                onClick={() => {
                                                    if (act1AStatus === 'correct') return;
                                                    setAct1_a_selected(i);
                                                    setAct1AStatus(null);
                                                }}
                                                className={`border-2 rounded-xl p-1 cursor-pointer transition-all aspect-square flex items-center justify-center bg-white dark:bg-gray-800 relative overflow-hidden shadow-sm
                                                    ${act1_a_selected === i ? 'border-purple-600 ring-2 ring-purple-100 dark:ring-purple-900 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-md'}
                                                `}
                                            >
                                                <div className="flex justify-center items-center w-full h-full">
                                                    <img
                                                        src={i === 0 ? '/division/pelotas7.png' : (i === 1 ? '/division/pelotas8.png' : '/division/pelotas9.png')}
                                                        alt={`Bolsas de pelotas opción ${i + 1}`}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                {(act1AStatus === 'correct' && i === 1) && (
                                                    <div className="absolute top-2 right-2 rounded-full p-1 shadow-sm bg-green-100 text-green-600">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                                    </div>
                                                )}
                                                {act1AStatus === 'incorrect' && act1_a_selected === i && (
                                                    <div className="absolute top-2 right-2 rounded-full p-1 shadow-sm bg-red-100 text-red-500">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="self-center flex flex-col items-center gap-2">
                                        <FeedbackButton
                                            onCheck={checkAct1A}
                                            onReset={resetAct1A}
                                            status={act1AStatus}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 1B: Players */}
                        {/* --- MODULO A --- */}
                        <div className="flex items-start gap-2 mt-4">
                            <PlayVideoButton
                                trackingId={VIDEO_TRACKING_IDS.PRACTICE_2}
                                title="Ejercicio 1b"
                                videoId="/pag5/vv-2"
                            />
                            <div className="flex flex-col gap-2 w-full">
                                <p className="font-semibold text-base">Hay 48 jugadores de baloncesto que se dividen en 4 equipos.</p>
                                <div className="flex items-center gap-4">
                                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 w-full ${act1BStatus === 'correct' ? 'pointer-events-none opacity-80' : ''}`}>
                                        {[0, 1, 2].map(i => (
                                            <div
                                                key={i}
                                                onClick={() => {
                                                    if (act1BStatus === 'correct') return;
                                                    setAct1_b_selected(i);
                                                    setAct1BStatus(null);
                                                }}
                                                className={`border-2 rounded-xl p-0 cursor-pointer transition-all aspect-square flex items-center justify-center bg-white dark:bg-gray-800 relative overflow-hidden shadow-sm
                                                    ${act1_b_selected === i ? 'border-purple-600 ring-2 ring-purple-100 dark:ring-purple-900 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-md'}
                                                `}
                                            >
                                                <div className="flex justify-center items-center w-full h-full">
                                                    <img
                                                        src={i === 0 ? '/division/equipo1.png' : (i === 1 ? '/division/equipo2.png' : '/division/equipo3.png')}
                                                        alt={`Opción de equipos ${i + 1}`}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                {(act1BStatus === 'correct' && i === 0) && (
                                                    <div className="absolute top-2 right-2 rounded-full p-1 shadow-sm bg-green-100 text-green-600">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                                    </div>
                                                )}
                                                {act1BStatus === 'incorrect' && act1_b_selected === i && (
                                                    <div className="absolute top-2 right-2 rounded-full p-1 shadow-sm bg-red-100 text-red-500">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="self-center flex flex-col items-center gap-2">
                                        <FeedbackButton
                                            onCheck={checkAct1B}
                                            onReset={resetAct1B}
                                            status={act1BStatus}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- ACTIVITY 2 --- */}
                {/* --- MODULO A --- */}
                <div className="flex gap-4 relative">
                    <div className="w-12 h-12 bg-purple-700 text-white font-black text-2xl flex items-center justify-center rounded shrink-0 z-10">2</div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <PlayVideoButton
                                    trackingId={VIDEO_TRACKING_IDS.MATCHING}
                                    title="Ejercicio 3"
                                    videoId="/pag5/vv-3"
                                />
                                <span className="font-bold text-gray-800 dark:text-gray-200">Relaciona cada división con su multiplicación correspondiente</span>
                            </div>
                        </div>

                        <div ref={containerRef} className={`relative flex justify-between items-stretch px-4 md:px-12 py-8 select-none min-h-[350px] ${act2Status === 'correct' ? 'pointer-events-none' : ''}`}>
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                {connections.map((conn, i) => {
                                    const start = dotCoords.left[conn.from];
                                    const end = dotCoords.right[conn.to];
                                    if (!start || !end) return null;
                                    return (
                                        <line
                                            key={i}
                                            x1={start.x}
                                            y1={start.y}
                                            x2={end.x}
                                            y2={end.y}
                                            stroke={act2Status === 'correct' ? '#10b981' : (act2Status === 'incorrect' ? '#ef4444' : '#9333ea')}
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                            className="drop-shadow-sm transition-all duration-300"
                                        />
                                    );
                                })}
                            </svg>

                            {/* Left Column */}
                            <div className="flex flex-col justify-between z-10 w-1/4 h-full py-4 gap-4">
                                {['24 ÷ 4', '60 ÷ 12', '15 ÷ 3', '40 ÷ 20', '81 ÷ 9'].map((text, i) => (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            if (act2Status === 'correct') return;
                                            setAct2Status(null);
                                            handleLeftClick(i);
                                        }}
                                        className={`flex items-center justify-between cursor-pointer p-4 rounded-xl transition-all shadow-sm border h-16
                                            ${selectedLeft === i ? 'bg-purple-100 dark:bg-purple-900/40 border-purple-500 dark:border-purple-500 ring-2 ring-purple-300 dark:ring-purple-700 scale-105' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-md'}
                                            ${act2Status === 'correct' ? 'opacity-90 border-green-500' : ''}
                                        `}
                                    >
                                        <span className="font-bold text-xl text-gray-800 dark:text-gray-200">{text}</span>
                                        <div
                                            ref={el => { leftDotsRef.current[i] = el; }}
                                            className={`w-4 h-4 rounded-full border-2 ${connections.some(c => c.from === i) ? 'bg-purple-600 border-purple-600' : 'bg-white dark:bg-gray-700 border-purple-300 dark:border-purple-500'}`}
                                        ></div>
                                    </div>
                                ))}
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col justify-between z-10 w-1/4 h-full py-4 gap-4">
                                {['9 × 9', '20 × 2', '4 × 6', '12 × 5', '3 × 5'].map((text, i) => (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            if (act2Status === 'correct') return;
                                            setAct2Status(null);
                                            handleRightClick(i);
                                        }}
                                        className={`flex items-center justify-between cursor-pointer p-4 rounded-xl transition-all shadow-sm border h-16 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-md ${act2Status === 'correct' ? 'opacity-90 border-green-500' : ''}`}
                                    >
                                        <div
                                            ref={el => { rightDotsRef.current[i] = el; }}
                                            className={`w-4 h-4 rounded-full border-2 ${connections.some(c => c.to === i) ? 'bg-purple-600 border-purple-600' : 'bg-white dark:bg-gray-700 border-purple-300 dark:border-purple-500'}`}
                                        ></div>
                                        <span className="font-bold text-xl text-gray-800 dark:text-gray-200">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-2 justify-end">
                            <FeedbackButton
                                onCheck={checkAct2}
                                onReset={resetAct2}
                                status={act2Status}
                            />
                        </div>
                    </div>
                </div>

                {/* --- ACTIVITY 3 --- */}
                {/* --- MODULO B --- */}
                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-purple-700 text-white font-black text-2xl flex items-center justify-center rounded shrink-0">3</div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <PlayVideoButton
                                    trackingId={VIDEO_TRACKING_IDS.QUOTIENTS}
                                    title="Ejercicio 4"
                                    videoId="/pag5/vv-4"
                                />
                                <span className="font-bold text-gray-800 dark:text-gray-200">Halle el cociente de las siguientes divisiones:</span>
                            </div>
                        </div>

                        <div className="w-full">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 w-full">
                                {['20 ÷ 4 =', '36 ÷ 9 =', '30 ÷ 5 =', '18 ÷ 2 =', '60 ÷ 10 =', '60 ÷ 15 =', '80 ÷ 8 =', '100 ÷ 20 =', '36 ÷ 12 =', '125 ÷ 25 ='].map((text, i) => (
                                    <div key={i} className={`flex items-center gap-3 p-2 rounded-lg border border-transparent hover:border-purple-100 transition-colors ${act3Statuses[i] === 'correct' ? 'pointer-events-none' : ''}`}>
                                        <div className="w-2 h-2 bg-purple-400 rounded-full shrink-0"></div>
                                        <span className="font-bold text-xl text-gray-700 dark:text-gray-300 whitespace-nowrap min-w-[100px]">{text}</span>
                                        <input
                                            value={act3Statuses[i] === 'correct' ? ['5', '4', '6', '9', '6', '4', '10', '5', '3', '5'][i] : act3Inputs[i]}
                                            onChange={(e) => {
                                                if (act3Statuses[i] === 'correct') return;
                                                const newInputs = [...act3Inputs];
                                                newInputs[i] = e.target.value;
                                                setAct3Inputs(newInputs);
                                                const newStatuses = [...act3Statuses];
                                                newStatuses[i] = null;
                                                setAct3Statuses(newStatuses);
                                            }}
                                            className={`w-16 h-10 border-2 bg-white dark:bg-gray-800 text-center font-bold text-xl dark:text-white rounded focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all
                                                ${act3Statuses[i] === 'correct' ? 'border-green-400 bg-green-50 dark:bg-green-900/20' : (act3Statuses[i] === 'incorrect' ? 'border-red-300 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600 focus:border-purple-500')}
                                            `}
                                            inputMode="numeric"
                                            readOnly={act3Statuses[i] === 'correct'}
                                        />
                                        <div className="shrink-0 scale-75 origin-left">
                                            <FeedbackButton
                                                onCheck={() => checkAct3Single(i)}
                                                onReset={() => resetAct3Single(i)}
                                                status={act3Statuses[i]}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- ACTIVITY 4 --- */}
                {/* --- MODULO A --- */}
                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-purple-700 text-white font-black text-2xl flex items-center justify-center rounded shrink-0">4</div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex items-center gap-2">
                            <PlayVideoButton
                                trackingId={VIDEO_TRACKING_IDS.TRUE_FALSE}
                                title="Ejercicio 5"
                                videoId="/pag5/vv-5"
                            />
                            <span className="font-bold text-gray-800 dark:text-gray-200">Observa la situación y responde V o F</span>
                        </div>

                        <div className="flex items-center flex-wrap gap-4 ml-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border-2 border-gray-100 dark:border-gray-700 shadow-sm">
                            <PlayVideoButton
                                trackingId={VIDEO_TRACKING_IDS.SITUATION}
                                title="Ejercicio 5a"
                                videoId="/pag5/vv-6"
                            />
                            <div className="font-semibold text-base text-gray-800 dark:text-gray-200">
                                Una diseñadora de moda tiene 20 pantalones y los reparte en 5 cajas.
                                En cada caja hay 5 pantalones.
                            </div>
                            <div className={`ml-auto flex gap-3 ${act4Status === 'correct' ? 'pointer-events-none opacity-80' : ''}`}>
                                <button
                                    onClick={() => checkAct4Submit('V')}
                                    className={`w-12 h-12 font-bold text-2xl rounded-xl shadow-sm transition-all border-2
                                        ${act4Selected === 'V' ? 'bg-purple-600 text-white border-purple-600 scale-110 ring-2 ring-purple-200 dark:ring-purple-900' : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:border-purple-300 dark:hover:border-purple-500 hover:text-purple-600'}
                                        ${act4Status === 'incorrect' && act4Selected === 'V' ? 'border-red-500 text-red-500' : ''}
                                    `}
                                >
                                    V
                                </button>
                                <button
                                    onClick={() => checkAct4Submit('F')}
                                    className={`w-12 h-12 font-bold text-2xl rounded-xl shadow-sm transition-all border-2
                                        ${act4Selected === 'F' ? (act4Status === 'correct' ? 'bg-green-600 border-green-600' : 'bg-purple-600 border-purple-600') + ' text-white scale-110 ring-2 ring-purple-200 dark:ring-purple-900' : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:border-purple-300 dark:hover:border-purple-500 hover:text-purple-600'}
                                        ${act4Status === 'correct' && act4Selected === 'F' ? 'bg-green-600 border-green-600 scale-110' : ''}
                                    `}
                                >
                                    F
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 justify-end">
                            <FeedbackButton
                                onCheck={() => { }}
                                onReset={resetAct4}
                                status={act4Status}
                                hideCheck={true}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </BookPageContainer>
    );
}
