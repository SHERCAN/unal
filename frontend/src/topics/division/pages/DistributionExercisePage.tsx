'use client';

import React, { useState, useEffect, useRef } from 'react';
import { PlayVideoButton } from '@/components/PlayVideoButton';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { VIDEO_IDS } from '@/config/videos';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';


interface Orange {
    id: number;
    inBox: number | null; // null = in basket/tree, 1/2/3/4 = in box
}

interface DistributionExercisePageProps {
    zoom?: number;
}
//PAGINA 1 CONCRETO PICTORICO
export function DistributionExercisePage({ zoom = 1 }: DistributionExercisePageProps) {
    const { isVideoWatched, markVideoWatched, completeStage, watchedVideos } = useVideoProgress();

    // Configuration
    const TOTAL_ORANGES = 24;
    const BOX_COUNT = 4;
    const ORANGES_PER_BOX = TOTAL_ORANGES / BOX_COUNT;

    // Fixed positions for oranges on the tree to look organized (groups of 6)
    const TREE_POSITIONS = [
        // Group 1 (Top Left)
        { top: '15%', left: '25%' }, { top: '15%', left: '35%' }, { top: '15%', left: '45%' },
        { top: '25%', left: '20%' }, { top: '25%', left: '30%' }, { top: '25%', left: '40%' },

        // Group 2 (Top Right)
        { top: '15%', left: '55%' }, { top: '15%', left: '65%' }, { top: '15%', left: '75%' },
        { top: '25%', left: '60%' }, { top: '25%', left: '70%' }, { top: '25%', left: '80%' },

        // Group 3 (Low Left)
        { top: '40%', left: '20%' }, { top: '40%', left: '30%' }, { top: '40%', left: '40%' },
        { top: '50%', left: '25%' }, { top: '50%', left: '35%' }, { top: '50%', left: '45%' },

        // Group 4 (Low Right)
        { top: '40%', left: '60%' }, { top: '40%', left: '70%' }, { top: '40%', left: '80%' },
        { top: '50%', left: '55%' }, { top: '50%', left: '65%' }, { top: '50%', left: '75%' }
    ];

    // State - Intro (Scene 1)
    interface IntroOrange {
        id: number;
        location: 'tree' | 'basket';
        top: string;
        left: string;
    }
    const [introOranges, setIntroOranges] = useState<IntroOrange[]>(() => {
        return Array.from({ length: TOTAL_ORANGES }, (_, i) => ({
            id: i,
            location: 'tree',
            top: TREE_POSITIONS[i]?.top || '50%',
            left: TREE_POSITIONS[i]?.left || '50%'
        }));
    });

    // State - Intro (Shared Drag State could be issue, using separate)
    const [introDraggedId, setIntroDraggedId] = useState<number | null>(null);

    // Handlers - Intro
    const handleIntroDragStart = (e: React.DragEvent, id: number) => {
        setIntroDraggedId(id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleIntroDropOnBasket = () => {
        if (introDraggedId === null) return;
        setIntroOranges(prev => prev.map(o => {
            if (o.id === introDraggedId) {
                return {
                    ...o,
                    location: 'basket',
                    top: '0%', left: '0%' // Position handled by flex container in basket
                };
            }
            return o;
        }));
        setIntroDraggedId(null);
    };

    const handleIntroDropOnTree = () => {
        if (introDraggedId === null) return;
        setIntroOranges(prev => prev.map(o => {
            if (o.id === introDraggedId) {
                // Return to original tree position
                const originalPos = TREE_POSITIONS[o.id];
                return {
                    ...o,
                    location: 'tree',
                    top: originalPos?.top || '50%',
                    left: originalPos?.left || '50%'
                };
            }
            return o;
        }));
        setIntroDraggedId(null);
    };

    // State - Stage C
    const [oranges, setOranges] = useState<Orange[]>(
        Array.from({ length: TOTAL_ORANGES }, (_, i) => ({ id: i, inBox: null }))
    );
    const [cDraggedId, setCDraggedId] = useState<number | null>(null);
    const [cStageResult, setCStageResult] = useState<'correct' | 'incorrect' | null>(null);


    // State - Stage P
    const [boxInputs, setBoxInputs] = useState<string[]>(Array(BOX_COUNT).fill(''));
    const [finalAnswer, setFinalAnswer] = useState('');
    const [pStageResult, setPStageResult] = useState<'correct' | 'incorrect' | null>(null);
    const [pStageCheck, setPStageCheck] = useState<'idle' | 'correct' | 'incorrect'>('idle'); // Kept for logic if needed but we'll use result


    // State - Stage P (Pictorial - Interactive)
    const [pOranges, setPOranges] = useState<{ id: number; boxId: number | null }[]>(
        Array.from({ length: TOTAL_ORANGES }, (_, i) => ({ id: i, boxId: null }))
    );
    const [pDraggedId, setPDraggedId] = useState<number | null>(null);

    const handlePDragStart = (e: React.DragEvent, id: number) => {
        setPDraggedId(id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handlePDropOnPBox = (boxIndex: number) => {
        if (pDraggedId === null) return;
        setPOranges(prev => prev.map(o => o.id === pDraggedId ? { ...o, boxId: boxIndex + 1 } : o));
        setPDraggedId(null);
    };

    const handlePDropOnPSource = () => {
        if (pDraggedId === null) return;
        setPOranges(prev => prev.map(o => o.id === pDraggedId ? { ...o, boxId: null } : o));
        setPDraggedId(null);
    };

    const resetStageP = () => {
        setPOranges(Array.from({ length: TOTAL_ORANGES }, (_, i) => ({ id: i, boxId: null })));
        setFinalAnswer('');
        setPStageResult(null);
    };


    // Video Tracking
    const VIDEO_TRACKING_IDS = {
        C_INTRO: 'division-pag1-v1',
        C_DISTRIBUTION: 'division-pag1-v2',
        P_INTRO: 'division-pag1-v3',
        P_DISTRIBUTION: 'division-pag1-v4'
    };

    // Stage C Logic
    const getOrangesInPool = () => oranges.filter(o => o.inBox === null);
    const getOrangesInBox = (boxId: number) => oranges.filter(o => o.inBox === boxId);

    // Check if C stage is physically correct (distribution)
    useEffect(() => {
        const boxes = Array.from({ length: BOX_COUNT }, (_, i) => i + 1);
        const isDistributedCorrectly = boxes.every(boxId => getOrangesInBox(boxId).length === ORANGES_PER_BOX);

        if (isDistributedCorrectly && !cStageResult) {
            // Optional: Auto-complete or wait for button? 
            // The image implies a check might be needed or it's interactive.
            // Let's rely on a explicit check or just visual feedback.
        }
    }, [oranges, cStageResult]);


    const handleDragStart = (e: React.DragEvent, id: number) => {
        setCDraggedId(id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDropOnBox = (boxId: number) => {
        if (cDraggedId === null) return;
        setOranges(prev => prev.map(o => o.id === cDraggedId ? { ...o, inBox: boxId } : o));
        setCDraggedId(null);
    };

    const handleDropOnPool = () => {
        if (cDraggedId === null) return;
        setOranges(prev => prev.map(o => o.id === cDraggedId ? { ...o, inBox: null } : o));
        setCDraggedId(null);
    };

    const checkStageC = () => {
        const boxes = Array.from({ length: BOX_COUNT }, (_, i) => i + 1);
        const isCorrect = boxes.every(boxId => getOrangesInBox(boxId).length === ORANGES_PER_BOX);
        if (isCorrect) {
            setCStageResult('correct');
            completeStage('division-dist-c');
        } else {
            setCStageResult('incorrect');
        }
    };


    const resetStageC = () => {
        setOranges(Array.from({ length: TOTAL_ORANGES }, (_, i) => ({ id: i, inBox: null })));
        setCStageResult(null);
    };


    // Stage P Logic
    // Inputs are now read-only derived from pOranges state

    const checkStageP = () => {
        // Validation per user request: "debe dar correcto si son 6 e incorrecto si es diferente"
        // referring to the final answer input.
        const isCorrect = finalAnswer.trim() === '6';

        if (isCorrect) {
            setPStageResult('correct');
            completeStage('division-dist-p');
        } else {
            setPStageResult('incorrect');
        }
    };


    // Video Modal
    /* videoModal list removed */
    const currentTrackingIdRef = useRef<string>();

    /* handleVideoComplete removed */

    return (
        <BookPageContainer
            zoom={zoom}
            moduleHeader={{
                //icon: '/division-icon.png', 
                name: 'División'
            }}
            pageId="division-distribution"
        >
            <style jsx>{`
                @keyframes celebrate {
                    0%, 100% { transform: scale(1) rotate(0deg); }
                    25% { transform: scale(1.1) rotate(5deg); }
                    50% { transform: scale(1.1) rotate(-5deg); }
                    75% { transform: scale(1.15) rotate(3deg); }
                }
                .celebrate-animation { animation: celebrate 0.5s ease-in-out; }
            `}</style>

            <div className="w-full max-w-5xl mx-auto space-y-6">

                {/* --- STAGE C: CONCRETE --- */}
                <div className="relative ml-2 flex items-start">
                    <div className="bg-green-300 text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center ">C</div>
                    <div className="flex-1 relative border-2 border-green-300 p-4 rounded-r-lg -ml-0.5 rounded-tl-none">

                        {/* Scene 1: Intro */}
                        <div className="flex flex-col md:flex-row items-center justify-around mb-8 px-4 gap-8 min-h-[300px]">
                            {/* Video Trigger */}
                            <div className="absolute top-4 left-4 z-20">
                                <PlayVideoButton
                                    trackingId={VIDEO_TRACKING_IDS.C_INTRO}
                                    title=""
                                    videoId="/pag1/vv-1"
                                />
                            </div>
                            {/* Basket / Girl Area */}
                            <div
                                className="relative flex items-end"
                                onDragOver={handleDragOver}
                                onDrop={handleIntroDropOnBasket}
                            >
                                <div className="relative w-48 h-64">
                                    <img src="/division/oranges-page/girl-basket.png" alt="Girl with Basket" className="w-full h-full object-contain" />
                                    {/* Oranges in Basket - Rendered in a pile/grid over the basket area */}
                                    <div className="absolute bottom-[2%] left-[15%] w-[70%] h-[25%] flex flex-wrap-reverse justify-center content-end pointer-events-none">
                                        {introOranges.filter(o => o.location === 'basket').map(o => (
                                            <div
                                                key={o.id}
                                                draggable
                                                onDragStart={(e) => handleIntroDragStart(e, o.id)}
                                                className="w-8 h-8 -ml-2 -mb-2 pointer-events-auto cursor-grab hover:scale-110 transition z-10"
                                            // Removing absolute positioning for basket to make them pile up naturally
                                            >
                                                <img src="/division/oranges-page/orange.png" alt="Orange" className="w-full h-full object-contain" />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Count Display - Next to basket */}
                                <div className="text-6xl font-black text-purple-700 ml-2 mb-4">
                                    {introOranges.filter(o => o.location === 'basket').length}
                                </div>


                            </div>

                            {/* Tree Area */}
                            <div
                                className="relative w-80 h-80 flex-shrink-0"
                                onDragOver={handleDragOver}
                                onDrop={handleIntroDropOnTree}
                            >
                                <img src="/division/oranges-page/tree.png" alt="Tree" className="w-full h-full object-contain" />
                                {/* Oranges on Tree */}
                                <div className="absolute top-0 left-0 w-full h-full">
                                    {introOranges.filter(o => o.location === 'tree').map(o => (
                                        <div
                                            key={o.id}
                                            draggable
                                            onDragStart={(e) => handleIntroDragStart(e, o.id)}
                                            className="absolute w-12 h-12 pointer-events-auto cursor-grab hover:scale-110 transition z-10"
                                            style={{ top: o.top, left: o.left }}
                                        >
                                            <img src="/division/oranges-page/orange.png" alt="Orange" className="w-full h-full object-contain drop-shadow-md" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <hr className="my-6 border-gray-200" />

                        {/* Scene 2: Distribution Activity */}
                        <div className="relative">
                            {/* Video Trigger 2 */}
                            <div className="absolute top-0 left-0 z-10">
                                <PlayVideoButton
                                    trackingId={VIDEO_TRACKING_IDS.C_DISTRIBUTION}
                                    title=""
                                    videoId="/pag1/vv-2"
                                />
                            </div>

                            <div className="flex flex-col items-center py-4">
                                <div className="flex items-center gap-4 mb-2">
                                    <FeedbackButton
                                        onCheck={checkStageC}
                                        onReset={resetStageC}
                                        status={cStageResult}
                                    />
                                </div>


                                <div className="flex flex-col md:flex-row items-end justify-center w-full gap-8">
                                    {/* Boxes Area */}
                                    <div className="relative flex justify-center pb-2">
                                        <img
                                            src="/division/oranges-page/mesa.png"
                                            alt="Mesa"
                                            className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[120%] max-w-none h-auto z-0 pointer-events-none opacity-90"
                                        />
                                        <div className="flex gap-4 relative z-10 -translate-y-10">
                                            {Array.from({ length: BOX_COUNT }).map((_, i) => (
                                                <div
                                                    key={i + 1}
                                                    onDragOver={handleDragOver}
                                                    onDrop={() => handleDropOnBox(i + 1)}
                                                    className="relative w-20 h-20 md:w-24 md:h-24 p-1"
                                                >
                                                    <img src="/division/oranges-page/caja-abierta%2017.png" alt="Box" className="w-full h-full object-contain drop-shadow-sm" />
                                                    {/* Oranges inside box */}
                                                    <div className="absolute bottom-2 left-0 w-full flex flex-wrap justify-center -space-x-1 px-1">
                                                        {getOrangesInBox(i + 1).map(o => (
                                                            <div
                                                                key={o.id}
                                                                draggable
                                                                onDragStart={(e) => handleDragStart(e, o.id)}
                                                                className="w-8 h-8 cursor-grab hover:scale-110 transition"
                                                            >
                                                                <img src="/division/oranges-page/orange.png" alt="Orange" className="w-full h-full object-contain" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {/* <div className="absolute -bottom-8 w-full text-center font-bold text-gray-700 bg-white/80 rounded px-1 text-sm shadow-sm">
                                                        {getOrangesInBox(i + 1).length}
                                                    </div> */}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Girl & Pool Area */}
                                    <div
                                        className="relative"
                                        onDragOver={handleDragOver}
                                        onDrop={handleDropOnPool}
                                    >
                                        <img src="/division/oranges-page/girl-basket.png" alt="Girl" className="h-48 object-contain" />
                                        <div className="absolute top-[40%] left-[20%] w-[60%] h-[30%] flex flex-wrap justify-center items-center overflow-hidden">
                                            {getOrangesInPool().map(o => (
                                                <div
                                                    key={o.id}
                                                    draggable
                                                    onDragStart={(e) => handleDragStart(e, o.id)}
                                                    className="w-8 h-8 cursor-grab hover:scale-110 transition"
                                                >
                                                    <img src="/division/oranges-page/orange.png" alt="Orange" className="w-full h-full object-contain" />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="absolute bottom-0 right-0 text-3xl font-bold text-purple-600 bg-white bg-opacity-80 rounded-full px-2">
                                            {getOrangesInPool().length}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div></div>

                {/* --- STAGE P: PICTORIAL --- */}
                <div className="relative ml-2 flex items-start mb-8">
                    <div className="bg-blue-300 dark:bg-blue-900 text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center">P</div>
                    <div className="flex-1 relative border-2 border-blue-300 dark:border-blue-900 p-4 rounded-r-lg -ml-0.5 rounded-tl-none">

                        <div className="flex items-center gap-2 mb-4">
                            <p className="text-gray-700 dark:text-gray-300 font-semibold" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                                Hay 24 naranjas en cuadro.
                            </p>
                            <PlayVideoButton
                                trackingId={VIDEO_TRACKING_IDS.P_INTRO}
                                title=""
                                videoId="/pag1/vv-3"
                            />
                        </div>

                        <div
                            className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-800 mb-6 min-h-[100px]"
                            onDragOver={handleDragOver}
                            onDrop={handlePDropOnPSource}
                        >
                            <div className="grid grid-cols-8 gap-y-2 place-items-center">
                                {pOranges.filter(o => o.boxId === null).map((orange) => (
                                    <div
                                        key={orange.id}
                                        draggable
                                        onDragStart={(e) => handlePDragStart(e, orange.id)}
                                        className="cursor-grab hover:scale-110 transition"
                                    >
                                        <img src="/division/oranges-page/orange.png" alt="Orange" className="w-8 h-8 object-contain" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                            <p className="text-gray-700 dark:text-gray-300 font-semibold" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                                Se reparte en 4 partes iguales.
                            </p>
                            <PlayVideoButton
                                trackingId={VIDEO_TRACKING_IDS.P_DISTRIBUTION}
                                title=""
                                videoId="/pag1/vv-4"
                            />
                        </div>

                        {/* Boxes Grid */}
                        <div className="grid grid-cols-4 gap-4 mb-4">
                            {Array.from({ length: BOX_COUNT }).map((_, i) => {
                                const orangesInThisBox = pOranges.filter(o => o.boxId === i + 1);
                                return (
                                    <div key={i} className="flex flex-col items-center gap-2">
                                        <div
                                            className="w-full h-24 border-2 border-green-200 dark:border-green-800 rounded-lg flex items-center justify-center bg-gray-50 dark:bg-gray-700"
                                            onDragOver={handleDragOver}
                                            onDrop={() => handlePDropOnPBox(i)}
                                        >
                                            <div className="flex flex-wrap justify-center content-center w-full h-full p-1 gap-1 overflow-hidden">
                                                {orangesInThisBox.map((orange) => (
                                                    <div
                                                        key={orange.id}
                                                        draggable
                                                        onDragStart={(e) => handlePDragStart(e, orange.id)}
                                                        className="w-8 h-8 cursor-grab hover:scale-110 transition flex-shrink-0"
                                                    >
                                                        <img src="/division/oranges-page/orange.png" alt="Orange" className="w-full h-full object-contain" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <input
                                            type="number"
                                            className="w-12 h-8 border border-gray-300 dark:border-gray-600 text-center rounded-md bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-200"
                                            value={orangesInThisBox.length}
                                            readOnly
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
                            <div className="flex items-center gap-2">
                                <p className="font-bold text-gray-700 dark:text-gray-300" style={{ fontSize: 'clamp(0.75rem, 1.9vmin, 1rem)' }}>
                                    Cada caja tiene
                                </p>
                                <input
                                    type="number"
                                    className="w-16 h-10 border border-gray-300 dark:border-gray-600 text-center rounded-md focus:ring-2 focus:ring-purple-500 text-lg font-bold text-gray-900 dark:text-white bg-white dark:bg-gray-800"
                                    value={finalAnswer}
                                    onChange={(e) => setFinalAnswer(e.target.value)}
                                />
                                <p className="font-bold text-gray-700 dark:text-gray-300" style={{ fontSize: 'clamp(0.75rem, 1.9vmin, 1rem)' }}>
                                    naranjas.
                                </p>
                            </div>

                            <FeedbackButton
                                onCheck={checkStageP}
                                onReset={resetStageP}
                                status={pStageResult}
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
