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
    const { isVideoWatched, markVideoWatched } = useVideoProgress();
    /* videoModal list removed */
    const VIDEO_TRACKING_IDS = {
        PRACTICE_1: 'division-pag5-v1',
        PRACTICE_2: 'division-pag5-v2',
        MATCHING: 'division-pag5-v3',
        QUOTIENTS: 'division-pag5-v4',
        TRUE_FALSE: 'division-pag5-v5',
        SITUATION: 'division-pag5-v6'
    };

    // --- ACTIVITY 1: SELECTION ---
    // Problem A: 56 balls / 7 bags = 8 balls/bag
    // Options: 3 images. Let's assume indices 0, 1, 2. Correct is let's say 1 (middle).
    const [act1_a_selected, setAct1_a_selected] = useState<number | null>(null);
    // Problem B: 48 players / 4 teams = 12 players/team
    const [act1_b_selected, setAct1_b_selected] = useState<number | null>(null);
    const [act1Status, setAct1Status] = useState<'correct' | 'incorrect' | null>(null);

    const resetAct1 = () => {
        setAct1_a_selected(null);
        setAct1_b_selected(null);
        setAct1Status(null);
    };


    const checkAct1 = () => {
        // Assume option 1 is correct for A, option 2 is correct for B (just valid logic placeholders, can be adjusted)
        // Image shows:
        // A: 56 pelotas, 7 bolsas.
        // B: 48 jugadores, 4 equipos.
        // Let's implement visual component first then logic.
        if (act1_a_selected === 0 && act1_b_selected === 2) {
            setAct1Status('correct');
        } else {
            setAct1Status('incorrect');
        }
    };

    // --- ACTIVITY 2: MATCHING ---
    // Left: 24/4, 60/12, 15/3, 40/20, 81/9
    // Right: 9x9, 20x2, 4x6, 12x5, 3x5
    // Pairs (indices 0..4 left, 0..4 right):
    // 24/4 (0) -> 4x6 (2)
    // 60/12 (1) -> 12x5 (3)
    // 15/3 (2) -> 3x5 (4)
    // 40/20 (3) -> 20x2 (1)
    // 81/9 (4) -> 9x9 (0)

    // Connections: array of {from: number, to: number}
    const [connections, setConnections] = useState<{ from: number, to: number }[]>([]);
    const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
    const [act2Status, setAct2Status] = useState<'correct' | 'incorrect' | null>(null);

    const resetAct2 = () => {
        setConnections([]);
        setSelectedLeft(null);
        setAct2Status(null);
    };


    const handleLeftClick = (index: number) => {
        // If already connected, remove connection
        if (connections.some(c => c.from === index)) {
            setConnections(prev => prev.filter(c => c.from !== index));
        }
        setSelectedLeft(index);
    };

    const handleRightClick = (index: number) => {
        if (selectedLeft !== null) {
            // Remove any existing connection to this right node or from the selected left node
            setConnections(prev => [
                ...prev.filter(c => c.from !== selectedLeft && c.to !== index),
                { from: selectedLeft, to: index }
            ]);
            setSelectedLeft(null);
        }
    };

    const checkAct2 = () => {
        const correctPairs = [
            { from: 0, to: 2 }, // 24/4 -> 4x6
            { from: 1, to: 3 }, // 60/12 -> 12x5
            { from: 2, to: 4 }, // 15/3 -> 3x5
            { from: 3, to: 1 }, // 40/20 -> 20x2
            { from: 4, to: 0 }  // 81/9 -> 9x9
        ];

        // Check if all correct pairs exist
        const allCorrect = correctPairs.every(pair =>
            connections.some(c => c.from === pair.from && c.to === pair.to)
        ) && connections.length === 5;

        setAct2Status(allCorrect ? 'correct' : 'incorrect');
    };

    // --- ACTIVITY 3: QUOTIENTS ---
    // List of inputs
    const [act3Inputs, setAct3Inputs] = useState<string[]>(Array(10).fill(''));
    const [act3Status, setAct3Status] = useState<'correct' | 'incorrect' | null>(null);

    const resetAct3 = () => {
        setAct3Inputs(Array(10).fill(''));
        setAct3Status(null);
    };


    const checkAct3 = () => {
        // Answers:
        // 0: 20/4=5
        // 1: 30/5=6
        // 2: 60/10=6
        // 3: 80/8=10
        // 4: 36/12=3
        // 5: 36/9=4
        // 6: 18/2=9
        // 7: 60/15=4
        // 8: 100/20=5
        // 9: 125/25=5
        const answers = ['5', '6', '6', '10', '3', '4', '9', '4', '5', '5'];
        const isCorrect = act3Inputs.every((val, i) => val.trim() === answers[i]);
        setAct3Status(isCorrect ? 'correct' : 'incorrect');
    };

    // --- ACTIVITY 4: TRUE/FALSE ---
    const [act4Selected, setAct4Selected] = useState<'V' | 'F' | null>(null);
    const [act4Status, setAct4Status] = useState<'correct' | 'incorrect' | null>(null);

    const resetAct4 = () => {
        setAct4Selected(null);
        setAct4Status(null);
    };


    const checkAct4 = (selection: 'V' | 'F') => {
        setAct4Selected(selection);
    };

    return (
        <BookPageContainer
            zoom={zoom}
            moduleHeader={{
                //icon: '/division-icon.png', 
                name: 'División'
            }}
            pageId="division-exercises"
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
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                                        {[0, 1, 2].map(i => (
                                            <div
                                                key={i}
                                                onClick={() => {
                                                    setAct1_a_selected(i);
                                                    setAct1Status(null); // Reset checking on change
                                                }}

                                                className={`border-2 rounded-xl p-1 cursor-pointer transition-all aspect-square flex items-center justify-center bg-white dark:bg-gray-800 relative overflow-hidden shadow-sm
                                                    ${act1_a_selected === i ? 'border-purple-600 ring-2 ring-purple-100 dark:ring-purple-900 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-md'}
                                                `}
                                            >
                                                {/* Visual representation */}
                                                <div className="flex justify-center items-center w-full h-full">
                                                    <img
                                                        src={i === 0 ? '/division/pelotas7.png' : (i === 1 ? '/division/pelotas8.png' : '/division/pelotas9.png')}
                                                        alt={`Bolsas de pelotas opción ${i + 1}`}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                {act1Status && act1_a_selected === i && (
                                                    <div className={`absolute top-2 right-2 rounded-full p-1 shadow-sm ${i === 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>

                                                        {i === 0 ?
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg> :
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="self-center flex flex-col items-center gap-2">
                                        <FeedbackButton
                                            onCheck={checkAct1}
                                            onReset={resetAct1}
                                            status={act1Status}
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
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                                        {[0, 1, 2].map(i => (
                                            <div
                                                key={i}
                                                onClick={() => {
                                                    setAct1_b_selected(i);
                                                    setAct1Status(null);
                                                }}

                                                className={`border-2 rounded-xl p-0 cursor-pointer transition-all aspect-square flex items-center justify-center bg-white dark:bg-gray-800 relative overflow-hidden shadow-sm
                                                    ${act1_b_selected === i ? 'border-purple-600 ring-2 ring-purple-100 dark:ring-purple-900 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-md'}
                                                `}
                                            >
                                                {/* Visual representation using images */}
                                                <div className="flex justify-center items-center w-full h-full">
                                                    <img
                                                        src={i === 0 ? '/division/equipo1.png' : (i === 1 ? '/division/equipo2.png' : '/division/equipo3.png')}
                                                        alt={`Opción de equipos ${i + 1}`}
                                                        className="w-full h-full object-contain"
                                                    />
                                                </div>
                                                {act1Status && act1_b_selected === i && (
                                                    <div className={`absolute top-2 right-2 rounded-full p-1 shadow-sm ${i === 2 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>

                                                        {i === 2 ?
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg> :
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="self-center flex flex-col items-center gap-2">
                                        <FeedbackButton
                                            onCheck={checkAct1}
                                            onReset={resetAct1}
                                            status={act1Status}
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

                        <div className="relative flex justify-between items-stretch px-4 md:px-12 py-8 select-none min-h-[350px]">
                            {/* SVG Lines Layer */}
                            {/* Using percentages is tricky because items have height. Let's use simple flex distribution and assume center alignment. */}
                            {/* If we have 5 items in a column with `justify-between` and known height container, we can calculate % positions. */}
                            {/* 5 items: 0%, 25%, 50%, 75%, 100% of the *available space*? No. */}
                            {/* Let's try to map indices to vertical percentage 10% to 90% */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                {connections.map((conn, i) => (
                                    <line
                                        key={i}
                                        x1="25%"
                                        y1={`${10 + conn.from * 20}%`} // 0->10%, 1->30%, 2->50%, 3->70%, 4->90%
                                        x2="75%"
                                        y2={`${10 + conn.to * 20}%`}
                                        stroke={act2Status === 'correct' ? '#10b981' : (act2Status === 'incorrect' ? '#ef4444' : '#9333ea')}
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        className="drop-shadow-sm transition-all duration-300"
                                    />
                                ))}
                                {selectedLeft !== null && (
                                    // No active line drawing, just highlight points
                                    null
                                )}
                            </svg>

                            {/* Left Column */}
                            <div className="flex flex-col justify-between z-10 w-1/4 h-full py-4 gap-4">
                                {['24 ÷ 4', '60 ÷ 12', '15 ÷ 3', '40 ÷ 20', '81 ÷ 9'].map((text, i) => (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            setAct2Status(null);
                                            handleLeftClick(i);
                                        }}

                                        className={`flex items-center justify-between cursor-pointer p-4 rounded-xl transition-all shadow-sm border h-16
                                            ${selectedLeft === i ? 'bg-purple-100 dark:bg-purple-900/40 border-purple-500 dark:border-purple-500 ring-2 ring-purple-300 dark:ring-purple-700 scale-105' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-md'}
                                        `}
                                    >
                                        <span className="font-bold text-xl text-gray-800 dark:text-gray-200">{text}</span>
                                        <div className={`w-4 h-4 rounded-full border-2 ${connections.some(c => c.from === i) ? 'bg-purple-600 border-purple-600' : 'bg-white dark:bg-gray-700 border-purple-300 dark:border-purple-500'}`}></div>
                                    </div>
                                ))}
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col justify-between z-10 w-1/4 h-full py-4 gap-4">
                                {['9 × 9', '20 × 2', '4 × 6', '12 × 5', '3 × 5'].map((text, i) => (
                                    <div
                                        key={i}
                                        onClick={() => {
                                            setAct2Status(null);
                                            handleRightClick(i);
                                        }}

                                        className={`flex items-center justify-between cursor-pointer p-4 rounded-xl transition-all shadow-sm border h-16 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500 hover:shadow-md`}
                                    >
                                        <div className={`w-4 h-4 rounded-full border-2 ${connections.some(c => c.to === i) ? 'bg-purple-600 border-purple-600' : 'bg-white dark:bg-gray-700 border-purple-300 dark:border-purple-500'}`}></div>
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

                        <div className="flex justify-between items-start gap-8">
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 w-full">
                                {['20 ÷ 4 =', '36 ÷ 9 =', '30 ÷ 5 =', '18 ÷ 2 =', '60 ÷ 10 =', '60 ÷ 15 =', '80 ÷ 8 =', '100 ÷ 20 =', '36 ÷ 12 =', '125 ÷ 25 ='].map((text, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-purple-400 rounded-full shrink-0"></div>
                                        <span className="font-bold text-2xl text-gray-700 dark:text-gray-300 whitespace-nowrap min-w-[120px]">{text}</span>
                                        <input
                                            value={act3Inputs[i]}
                                            onChange={(e) => {
                                                const newInputs = [...act3Inputs];
                                                newInputs[i] = e.target.value;
                                                setAct3Inputs(newInputs);
                                                setAct3Status(null); // Clear status on edit
                                            }}

                                            className={`w-20 h-12 border-2 bg-white dark:bg-gray-800 text-center font-bold text-2xl dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all
                                                ${act3Status === 'correct' ? 'border-green-400 bg-green-50 dark:bg-green-900/20' : (act3Status === 'incorrect' ? 'border-red-300 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600 focus:border-purple-500')}
                                            `}
                                            inputMode="numeric"
                                        />
                                        {/* Individual feedback if checked */}
                                        {act3Status && (
                                            <div className="w-6">

                                                {/* Correct answer logic check for this specific index */}
                                                {((): boolean => {
                                                    const answers = ['5', '6', '6', '10', '3', '4', '9', '4', '5', '5'];
                                                    return act3Inputs[i].trim() === answers[i];
                                                })() ? (
                                                    <span className="text-green-500 font-bold text-xl">✓</span>
                                                ) : (
                                                    <span className="text-red-500 font-bold text-xl">✕</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-6 justify-end">
                            <FeedbackButton
                                onCheck={checkAct3}
                                onReset={resetAct3}
                                status={act3Status}
                            />
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
                            <p className="font-semibold text-base text-gray-800 dark:text-gray-200">
                                Una diseñadora de moda tiene 20 pantalones y los reparte en 5 cajas.
                                En cada caja <p>hay 5 pantalones.</p>
                            </p>
                            <div className="ml-auto flex gap-3">
                                <button
                                    onClick={() => {
                                        setAct4Selected('V');
                                        setAct4Status(null);
                                    }}
                                    className={`w-12 h-12 font-bold text-2xl rounded-xl shadow-sm transition-all border-2
                                        ${act4Selected === 'V' ? 'bg-purple-600 text-white border-purple-600 scale-110 ring-2 ring-purple-200 dark:ring-purple-900' : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:border-purple-300 dark:hover:border-purple-500 hover:text-purple-600'}
                                    `}
                                >
                                    V
                                </button>
                                <button
                                    onClick={() => {
                                        setAct4Selected('F');
                                        setAct4Status(null);
                                    }}
                                    className={`w-12 h-12 font-bold text-2xl rounded-xl shadow-sm transition-all border-2
                                        ${act4Selected === 'F' ? 'bg-purple-600 text-white border-purple-600 scale-110 ring-2 ring-purple-200 dark:ring-purple-900' : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-300 hover:border-purple-300 dark:hover:border-purple-500 hover:text-purple-600'}
                                    `}
                                >
                                    F
                                </button>

                            </div>
                        </div>

                        <div className="flex items-center gap-4 justify-end">
                            <FeedbackButton
                                onCheck={() => {
                                    if (!act4Selected) return;
                                    if (act4Selected === 'F') setAct4Status('correct');
                                    else setAct4Status('incorrect');
                                }}
                                onReset={resetAct4}
                                status={act4Status}
                            />
                        </div>

                    </div>
                </div>

            </div>

            {/* Video Modal */}
            {/* VideoModal removed */}
        </BookPageContainer>
    );
}



