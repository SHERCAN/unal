'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { VIDEO_IDS } from '@/config/videos';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface Orange {
    id: number;
    inBox: number | null; // null = in basket/tree, 1/2/3/4 = in box
}

interface DistributionExercisePageProps {
    zoom?: number;
}

export function DistributionExercisePage({ zoom = 1 }: DistributionExercisePageProps) {
    const { isVideoWatched, markVideoWatched, completeStage, watchedVideos } = useVideoProgress();

    // Configuration
    const TOTAL_ORANGES = 24;
    const BOX_COUNT = 4;
    const ORANGES_PER_BOX = TOTAL_ORANGES / BOX_COUNT;

    // State - Stage C
    const [oranges, setOranges] = useState<Orange[]>(
        Array.from({ length: TOTAL_ORANGES }, (_, i) => ({ id: i, inBox: null }))
    );
    const [draggedOrange, setDraggedOrange] = useState<number | null>(null);
    const [cStageComplete, setCStageComplete] = useState(false);

    // State - Stage P
    const [boxInputs, setBoxInputs] = useState<string[]>(Array(BOX_COUNT).fill(''));
    const [finalAnswer, setFinalAnswer] = useState('');
    const [pStageCheck, setPStageCheck] = useState<'idle' | 'correct' | 'incorrect'>('idle');

    // Video Tracking
    const VIDEO_TRACKING_IDS = {
        C_INTRO: 'division-dist-c-intro',
        P_INTRO: 'division-dist-p-intro'
    };

    // Stage C Logic
    const getOrangesInPool = () => oranges.filter(o => o.inBox === null);
    const getOrangesInBox = (boxId: number) => oranges.filter(o => o.inBox === boxId);

    // Check if C stage is physically correct (distribution)
    useEffect(() => {
        const boxes = Array.from({ length: BOX_COUNT }, (_, i) => i + 1);
        const isDistributedCorrectly = boxes.every(boxId => getOrangesInBox(boxId).length === ORANGES_PER_BOX);

        if (isDistributedCorrectly && !cStageComplete) {
            // Optional: Auto-complete or wait for button? 
            // The image implies a check might be needed or it's interactive.
            // Let's rely on a explicit check or just visual feedback.
        }
    }, [oranges, cStageComplete]);

    const handleDragStart = (e: React.DragEvent, id: number) => {
        setDraggedOrange(id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDropOnBox = (boxId: number) => {
        if (draggedOrange === null) return;
        setOranges(prev => prev.map(o => o.id === draggedOrange ? { ...o, inBox: boxId } : o));
        setDraggedOrange(null);
    };

    const handleDropOnPool = () => {
        if (draggedOrange === null) return;
        setOranges(prev => prev.map(o => o.id === draggedOrange ? { ...o, inBox: null } : o));
        setDraggedOrange(null);
    };

    const checkStageC = () => {
        const boxes = Array.from({ length: BOX_COUNT }, (_, i) => i + 1);
        const isCorrect = boxes.every(boxId => getOrangesInBox(boxId).length === ORANGES_PER_BOX);
        if (isCorrect) {
            setCStageComplete(true);
            completeStage('division-dist-c');
        } else {
            // Add shake/error feedback logic here if desired
            alert('Asegúrate de repartir todas las naranjas equitativamente.');
        }
    };

    const resetStageC = () => {
        setOranges(Array.from({ length: TOTAL_ORANGES }, (_, i) => ({ id: i, inBox: null })));
        setCStageComplete(false);
    };

    // Stage P Logic
    const handleInputChange = (index: number, value: string) => {
        const newInputs = [...boxInputs];
        newInputs[index] = value;
        setBoxInputs(newInputs);
    };

    const checkStageP = () => {
        const allBoxesCorrect = boxInputs.every(val => parseInt(val) === ORANGES_PER_BOX);
        const finalAnswerCorrect = parseInt(finalAnswer) === ORANGES_PER_BOX;

        if (allBoxesCorrect && finalAnswerCorrect) {
            setPStageCheck('correct');
            completeStage('division-dist-p');
        } else {
            setPStageCheck('incorrect');
        }
    };

    // Video Modal
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

    return (
        <BookPageContainer
            zoom={zoom}
            moduleHeader={{ icon: '/division-icon.png', name: 'División' }}
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
                <div className="relative border-2 border-green-300 rounded-xl p-4 bg-white">
                    <div className="absolute -top-4 left-4 px-3 py-1 rounded-md bg-green-300 font-bold text-white text-xl">C</div>

                    {/* Scene 1: Intro */}
                    <div className="flex flex-col md:flex-row items-center justify-between mb-8 px-4">
                        <div className="relative">
                            <img src="/division/oranges-page/girl-basket.png" alt="Girl with Basket" className="h-40 object-contain" />
                            {/* Video Trigger */}
                            <button
                                onClick={() => {
                                    currentTrackingIdRef.current = VIDEO_TRACKING_IDS.C_INTRO;
                                    setVideoModal({ isOpen: true, title: 'Introducción', videoId: VIDEO_IDS.MODULE_DIVISION, trackingId: VIDEO_TRACKING_IDS.C_INTRO });
                                }}
                                className="absolute -top-2 -right-2 bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700 transition"
                            >
                                ▶
                            </button>
                        </div>
                        <div className="flex flex-col items-center my-4 md:my-0">
                            <div className="text-center font-bold text-4xl text-purple-700 mb-2">
                                24
                            </div>
                            <div className="grid grid-cols-6 gap-2 p-3 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                                {Array.from({ length: 24 }).map((_, i) => (
                                    <div key={i} className="relative w-8 h-8 flex items-center justify-center">
                                        <img src="/division/oranges-page/orange.png" alt="Orange" className="w-full h-full object-contain" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <img src="/division/oranges-page/tree.png" alt="Tree" className="h-48 object-contain" />
                        </div>
                    </div>

                    <hr className="my-6 border-gray-200" />

                    {/* Scene 2: Distribution Activity */}
                    <div className="relative">
                        {/* Video Trigger 2 */}
                        <div className="absolute top-0 left-0 z-10">
                            <button
                                className="bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700 transition shadow-md"
                            // Add logic for second video if needed
                            >
                                ▶
                            </button>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-4 mb-2">
                                <button
                                    onClick={checkStageC}
                                    className="bg-purple-600 text-white px-4 py-1 rounded-md font-bold uppercase text-sm hover:bg-purple-700 transition"
                                >
                                    ¿LISTO?
                                </button>
                                <button onClick={resetStageC} className="bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition">
                                    🔄
                                </button>
                            </div>

                            {cStageComplete && <div className="text-green-600 font-bold mb-2 celebrate-animation">CORRECTO!</div>}

                            <div className="flex flex-col md:flex-row items-end justify-center w-full gap-8">
                                {/* Boxes Area */}
                                <div className="flex gap-2">
                                    {Array.from({ length: BOX_COUNT }).map((_, i) => (
                                        <div
                                            key={i + 1}
                                            onDragOver={handleDragOver}
                                            onDrop={() => handleDropOnBox(i + 1)}
                                            className="relative w-20 h-20 md:w-24 md:h-24"
                                        >
                                            <img src="/division/oranges-page/caja-abierta%2017.png" alt="Box" className="w-full h-full object-contain" />
                                            {/* Oranges inside box */}
                                            <div className="absolute bottom-2 left-0 w-full flex flex-wrap justify-center -space-x-1 px-1">
                                                {getOrangesInBox(i + 1).map(o => (
                                                    <div
                                                        key={o.id}
                                                        draggable
                                                        onDragStart={(e) => handleDragStart(e, o.id)}
                                                        className="w-6 h-6 cursor-grab"
                                                    >
                                                        <img src="/division/oranges-page/orange.png" alt="Orange" className="w-full h-full object-contain" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="absolute -bottom-6 w-full text-center font-bold text-gray-700">
                                                {getOrangesInBox(i + 1).length}
                                            </div>
                                        </div>
                                    ))}
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
                                                className="w-5 h-5 cursor-grab hover:scale-110 transition"
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
                            <p className="text-red-500 font-bold text-sm text-center mt-4 w-full">
                                Colócalo con mouse para repartirse en 4 cajas.
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- STAGE P: PICTORIAL --- */}
                <div className="relative border-2 border-blue-300 rounded-xl p-4 bg-white">
                    <div className="absolute -top-4 left-4 px-3 py-1 rounded-md bg-blue-300 font-bold text-white text-xl">P</div>

                    <div className="flex items-center gap-2 mb-4">
                        <span className="font-medium text-gray-800">Hay 24 naranjas en cuadro</span>
                        <button className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs hover:bg-purple-700">▶</button>
                    </div>

                    <div className="border border-gray-300 rounded-lg p-4 bg-white mb-6">
                        <div className="grid grid-cols-8 gap-y-2 place-items-center">
                            {Array.from({ length: 24 }).map((_, i) => (
                                <img key={i} src="/division/oranges-page/orange.png" alt="Orange" className="w-8 h-8 object-contain" />
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                        <span className="font-medium text-gray-800">Se reparte en 4 partes iguales</span>
                        <button className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold text-xs hover:bg-purple-700">▶</button>
                    </div>

                    {/* Boxes Grid */}
                    <div className="grid grid-cols-4 gap-4 mb-4">
                        {Array.from({ length: BOX_COUNT }).map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <div className="w-full h-24 border-2 border-green-200 rounded-lg flex items-center justify-center">
                                    {/* Placeholder for distributed oranges visual if needed, currently empty as per image */}
                                    {i === 0 && (
                                        // Image shows first box with oranges, others checks? No, shows 2 oranges in first box?
                                        // The screenshot has 2 oranges in the first box of the bottom section.
                                        // I'll just leave them empty for the user to count mentally or fill via input.
                                        <div className="flex">
                                            <img src="/division/oranges-page/orange.png" alt="Orange" className="w-14 h-14 object-contain" />
                                            <img src="/division/oranges-page/orange.png" alt="Orange" className="w-14 h-14 object-contain" />
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="number"
                                    className="w-12 h-8 border border-gray-300 text-center rounded-md focus:ring-2 focus:ring-purple-500"
                                    value={boxInputs[i]}
                                    onChange={(e) => handleInputChange(i, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center justify-center gap-4 mt-6">
                        <span className="font-bold text-gray-800">Cada caja tiene</span>
                        <input
                            type="number"
                            className="w-16 h-10 border border-gray-300 text-center rounded-md focus:ring-2 focus:ring-purple-500 text-lg font-bold"
                            value={finalAnswer}
                            onChange={(e) => setFinalAnswer(e.target.value)}
                        />
                        <span className="font-bold text-gray-800">naranjas.</span>
                    </div>

                    <div className="flex justify-center mt-6 gap-4">
                        <button
                            onClick={checkStageP}
                            className="bg-purple-600 text-white px-6 py-2 rounded-md font-bold uppercase hover:bg-purple-700 transition shadow-lg"
                        >
                            ¿LISTO?
                        </button>
                        <button
                            onClick={() => { setBoxInputs(Array(BOX_COUNT).fill('')); setFinalAnswer(''); setPStageCheck('idle'); }}
                            className="bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 transition shadow-lg"
                        >
                            🔄
                        </button>
                    </div>

                    {pStageCheck === 'correct' && (
                        <div className="text-center mt-4 text-green-600 text-xl font-black celebrate-animation">
                            CORRECTO
                        </div>
                    )}
                    {pStageCheck === 'incorrect' && (
                        <div className="text-center mt-4 text-orange-500 text-xl font-black">
                            INCORRECTO
                        </div>
                    )}
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
