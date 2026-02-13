'use client';

import React, { useState, useRef, useEffect } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { VIDEO_IDS } from '@/config/videos';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface ExercisesPageProps {
    zoom?: number;
}

export function ExercisesPage({ zoom = 1 }: ExercisesPageProps) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();
    const [videoModal, setVideoModal] = useState<{ isOpen: boolean; title: string; videoId?: string; trackingId?: string }>({
        isOpen: false, title: '', videoId: undefined, trackingId: undefined
    });
    const currentTrackingIdRef = useRef<string>();

    const handleVideoComplete = () => {
        if (currentTrackingIdRef.current) {
            markVideoWatched(currentTrackingIdRef.current);
            currentTrackingIdRef.current = undefined;
        }
    };

    // --- ACTIVITY 1: SELECTION ---
    // Problem A: 56 balls / 7 bags = 8 balls/bag
    // Options: 3 images. Let's assume indices 0, 1, 2. Correct is let's say 1 (middle).
    const [act1_a_selected, setAct1_a_selected] = useState<number | null>(null);
    // Problem B: 48 players / 4 teams = 12 players/team
    const [act1_b_selected, setAct1_b_selected] = useState<number | null>(null);
    const [act1Status, setAct1Status] = useState<'idle' | 'correct' | 'incorrect'>('idle');

    const checkAct1 = () => {
        // Assume option 1 is correct for A, option 2 is correct for B (just valid logic placeholders, can be adjusted)
        // Image shows:
        // A: 56 pelotas, 7 bolsas.
        // B: 48 jugadores, 4 equipos.
        // Let's implement visual component first then logic.
        if (act1_a_selected === 1 && act1_b_selected === 2) {
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
    const [act2Status, setAct2Status] = useState<'idle' | 'correct' | 'incorrect'>('idle');

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
    const [act3Status, setAct3Status] = useState<'idle' | 'correct' | 'incorrect'>('idle');

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
    const [act4Check, setAct4Check] = useState<'idle' | 'correct' | 'incorrect'>('idle');

    const checkAct4 = (selection: 'V' | 'F') => {
        setAct4Selected(selection);
        // Statement: 20 pants / 5 boxes = 4 pants/box. Text says "hay 5 pantalones". So FALSE.
        if (selection === 'F') {
            setAct4Check('correct');
        } else {
            setAct4Check('incorrect');
        }
    };

    return (
        <BookPageContainer
            zoom={zoom}
            moduleHeader={{ icon: '/division-icon.png', name: 'División' }}
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
                            <span className="font-bold text-gray-800">Seleccione el reparto correcto</span>
                            <span className="text-red-500 font-bold text-xs">ACTIVIDAD INTERACTIVO</span>
                        </div>

                        {/* 1A: Balls */}
                        <div className="flex items-start gap-2">
                            <PlayButton onClick={() => { }} /> {/* Placeholder action */}
                            <div className="flex flex-col gap-2 w-full">
                                <p className="font-medium">El total de 56 pelotas de fútbol se reparte entre 7 bolsas de malla.</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[0, 1, 2].map(i => (
                                        <div
                                            key={i}
                                            onClick={() => setAct1_a_selected(i)}
                                            className={`border-2 rounded-lg p-2 cursor-pointer transition-all h-24 flex items-center justify-center bg-gray-50
                                                ${act1_a_selected === i ? 'border-purple-600 bg-purple-50 shadow-md transform scale-105' : 'border-gray-200 hover:border-purple-300'}
                                            `}
                                        >
                                            {/* Visual placeholder for balls/bags */}
                                            {i === 1 ? (
                                                <div className="text-xs text-center">
                                                    <div className="flex justify-center gap-1 flex-wrap">
                                                        {/* Correct: 7 bags. 56/7=8 balls each (implied) */}
                                                        {[...Array(7)].map((_, j) => <span key={j} className="text-xl">🎒</span>)}
                                                    </div>
                                                    <span className="text-green-600 font-bold block mt-1">(Correcto)</span>
                                                </div>
                                            ) : (
                                                <div className="text-xs text-center opacity-50">
                                                    <div className="flex justify-center gap-1 flex-wrap">
                                                        {[...Array(i === 0 ? 6 : 8)].map((_, j) => <span key={j} className="text-xl">🎒</span>)}
                                                    </div>
                                                    <span className="text-red-400 font-bold block mt-1">(Incorrecto)</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 1B: Players */}
                        <div className="flex items-start gap-2 mt-4">
                            <PlayButton onClick={() => { }} />
                            <div className="flex flex-col gap-2 w-full">
                                <p className="font-medium">Hay 48 jugadores de baloncesto que se dividen en 4 equipos.</p>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[0, 1, 2].map(i => (
                                        <div
                                            key={i}
                                            onClick={() => setAct1_b_selected(i)}
                                            className={`border-2 rounded-lg p-2 cursor-pointer transition-all h-24 flex items-center justify-center bg-gray-50
                                                ${act1_b_selected === i ? 'border-purple-600 bg-purple-50 shadow-md transform scale-105' : 'border-gray-200 hover:border-purple-300'}
                                            `}
                                        >
                                            {/* Visual placeholder for teams */}
                                            {i === 2 ? (
                                                <div className="text-xs text-center">
                                                    <div className="flex justify-center gap-1">
                                                        {[...Array(4)].map((_, j) => <span key={j} className="text-xl">👕</span>)}
                                                    </div>
                                                    <span className="text-green-600 font-bold block mt-1">(Correcto)</span>
                                                </div>
                                            ) : (
                                                <div className="text-xs text-center opacity-50">
                                                    <div className="flex justify-center gap-1">
                                                        {[...Array(i === 0 ? 3 : 5)].map((_, j) => <span key={j} className="text-xl">👕</span>)}
                                                    </div>
                                                    <span className="text-red-400 font-bold block mt-1">(Incorrecto)</span>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-2 justify-end">
                            <Feedback status={act1Status} />
                            <CheckButton onClick={checkAct1} />
                        </div>
                    </div>
                </div>

                {/* --- ACTIVITY 2 --- */}
                <div className="flex gap-4 relative">
                    <div className="w-12 h-12 bg-purple-700 text-white font-black text-2xl flex items-center justify-center rounded shrink-0 z-10">2</div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <PlayButton onClick={() => { }} />
                                <span className="font-bold text-gray-800">Relaciona cada división con su multiplicación correspondiente</span>
                            </div>
                            <span className="text-red-500 font-bold text-xs">ACTIVIDAD INTERACTIVO</span>
                        </div>

                        <div className="relative flex justify-between items-center px-8 md:px-20 py-4 select-none">
                            {/* SVG Lines Layer */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                {connections.map((conn, i) => {
                                    // Calculate approximate coordinates based on row index
                                    // Assuming 5 rows, evenly spaced.
                                    // We need refs to get exact positions, but for now implementing with % based approximations or fixed heights
                                    return (
                                        <line
                                            key={i}
                                            x1="20%" y1={`${10 + conn.from * 20}%`}
                                            x2="80%" y2={`${10 + conn.to * 20}%`}
                                            stroke="#9333ea" strokeWidth="2"
                                        />
                                    );
                                })}
                                {selectedLeft !== null && (
                                    // Preview line? Hard to do without mouse tracking. Skip for now.
                                    null
                                )}
                            </svg>

                            {/* Left Column */}
                            <div className="flex flex-col gap-8 z-10 w-1/3">
                                {['24 ÷ 4', '60 ÷ 12', '15 ÷ 3', '40 ÷ 20', '81 ÷ 9'].map((text, i) => (
                                    <div
                                        key={i}
                                        onClick={() => handleLeftClick(i)}
                                        className={`flex items-center justify-between cursor-pointer p-2 rounded hover:bg-purple-50
                                            ${selectedLeft === i ? 'bg-purple-100 ring-2 ring-purple-500' : ''}
                                        `}
                                    >
                                        <span className="font-bold text-lg">{text}</span>
                                        <div className={`w-4 h-4 rounded-sm ${connections.some(c => c.from === i) ? 'bg-purple-600' : 'bg-purple-300'}`}></div>
                                    </div>
                                ))}
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col gap-8 z-10 w-1/3">
                                {['9 × 9', '20 × 2', '4 × 6', '12 × 5', '3 × 5'].map((text, i) => (
                                    <div
                                        key={i}
                                        onClick={() => handleRightClick(i)}
                                        className="flex items-center justify-between cursor-pointer p-2 rounded hover:bg-purple-50"
                                    >
                                        <div className={`w-4 h-4 rounded-sm ${connections.some(c => c.to === i) ? 'bg-purple-600' : 'bg-purple-300'}`}></div>
                                        <span className="font-bold text-lg">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-2 justify-end">
                            <Feedback status={act2Status} />
                            <CheckButton onClick={checkAct2} />
                        </div>
                    </div>
                </div>

                {/* --- ACTIVITY 3 --- */}
                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-purple-700 text-white font-black text-2xl flex items-center justify-center rounded shrink-0">3</div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <PlayButton onClick={() => { }} />
                                <span className="font-bold text-gray-800">Halle el cociente de las siguientes divisiones:</span>
                            </div>
                            <span className="text-red-500 font-bold text-xs">ACTIVIDAD INTERACTIVO</span>
                        </div>

                        <div className="flex justify-between items-start gap-8">
                            <div className="grid grid-cols-2 gap-x-12 gap-y-4 w-full">
                                {['20 ÷ 4 =', '36 ÷ 9 =', '30 ÷ 5 =', '18 ÷ 2 =', '60 ÷ 10 =', '60 ÷ 15 =', '80 ÷ 8 =', '100 ÷ 20 =', '36 ÷ 12 =', '125 ÷ 25 ='].map((text, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <div className="w-3 h-3 bg-purple-600"></div>
                                        <span className="font-bold text-lg w-24">{text}</span>
                                        <input
                                            value={act3Inputs[i]}
                                            onChange={(e) => {
                                                const newInputs = [...act3Inputs];
                                                newInputs[i] = e.target.value;
                                                setAct3Inputs(newInputs);
                                            }}
                                            className="w-12 h-8 border border-gray-300 bg-gray-100 text-center font-bold rounded focus:border-purple-500 focus:outline-none"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-2 justify-end">
                            <span className="text-red-500 font-bold text-sm">Señalar "CORRECTO"</span>
                            <div className="w-6 h-6 bg-green-500 text-white flex items-center justify-center rounded text-xs">✓</div>
                            <span className="text-orange-500 font-bold text-sm ml-4">Señalar "INCORRECTO"</span>
                            <div className="w-6 h-6 bg-orange-500 text-white flex items-center justify-center rounded text-xs font-bold">!</div>

                            <div className="ml-auto flex items-center gap-4">
                                <Feedback status={act3Status} />
                                <CheckButton onClick={checkAct3} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- ACTIVITY 4 --- */}
                <div className="flex gap-4">
                    <div className="w-12 h-12 bg-purple-700 text-white font-black text-2xl flex items-center justify-center rounded shrink-0">4</div>
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex items-center gap-2">
                            <PlayButton onClick={() => { }} />
                            <span className="font-bold text-gray-800">Observa la situación y responde V o F</span>
                        </div>

                        <div className="flex items-center gap-4 ml-8 bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <PlayButton onClick={() => { }} />
                            <p className="font-medium text-gray-800">
                                Una diseñadora de moda tiene 20 pantalones y los reparte en 5 cajas.
                                En cada caja <strong>hay 5 pantalones</strong>
                            </p>
                            <div className="ml-auto flex gap-2">
                                <button
                                    onClick={() => checkAct4('V')}
                                    className={`w-10 h-10 font-bold text-xl rounded shadow-sm transition-all ${act4Selected === 'V' ? 'bg-purple-600 text-white scale-110' : 'bg-gray-200 hover:bg-gray-300 text-gray-600'}`}
                                >
                                    V
                                </button>
                                <button
                                    onClick={() => checkAct4('F')}
                                    className={`w-10 h-10 font-bold text-xl rounded shadow-sm transition-all ${act4Selected === 'F' ? 'bg-purple-600 text-white scale-110' : 'bg-gray-200 hover:bg-gray-300 text-gray-600'}`}
                                >
                                    F
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 justify-end">
                            <Feedback status={act4Check} />
                        </div>
                    </div>
                </div>

            </div>

            {/* Video Modal */}
            <VideoModal
                isOpen={videoModal.isOpen}
                title={videoModal.title}
                videoId={videoModal.videoId}
                onClose={() => setVideoModal({ ...videoModal, isOpen: false })}
                canSkip={true}
                onComplete={handleVideoComplete}
            />
        </BookPageContainer>
    );
}

// --- Helpers ---

const PlayButton = ({ onClick }: { onClick: () => void }) => (
    <button
        onClick={onClick}
        className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 hover:scale-105 transition-all shadow-sm"
    >
        <span className="ml-0.5 text-xs">▶</span>
    </button>
);

const CheckButton = ({ onClick }: { onClick: () => void }) => (
    <button
        onClick={onClick}
        className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-1 px-6 rounded shadow-md transform active:scale-95 transition-all text-sm uppercase"
    >
        ¿Listo?
    </button>
);

const Feedback = ({ status }: { status: 'idle' | 'correct' | 'incorrect' }) => {
    if (status === 'idle') return null;
    return (
        <span className={`font-bold ${status === 'correct' ? 'text-green-600' : 'text-orange-500'}`}>
            {status === 'correct' ? 'CORRECTO' : 'INCORRECTO'}
        </span>
    );
};
