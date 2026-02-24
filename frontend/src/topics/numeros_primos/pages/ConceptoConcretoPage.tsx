'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';

/**
 * Números Primos: Concepto Concreto y Pictórico
 * C section: Interactive drag-and-drop tennis ball distribution (Frame 208)
 * P section: 7 squares, grouping attempts (fail 2,3,4 groups; success 1 or 7 groups)
 */

interface Props { zoom?: number; }

interface Ball {
    id: number;
    location: 'bag' | number; // 'bag' or tenista index (0-based)
}

//PAGINA 1 CONCRETO PICTORICO
export function ConceptoConcretoPage({ zoom = 1 }: Props) {
    const EXERCISE_IDS = {
        C_GAME: 'numeros_primos-pag14-c-game',
    };

    const STAGE_IDS = {
        C_STAGE: 'numeros-primos-c-stage',
        P_STAGE: 'numeros-primos-p-stage'
    };

    const { isVideoWatched, markVideoWatched, submitGame, completeStage, isExerciseCompleted, watchedVideos, completedExercises, completedStages } = useVideoProgress();

    const VIDEO_TRACKING = {
        C_INTRO: 'numeros_primos-pag14-v1',
        P_INTRO: 'numeros_primos-pag14-v2',
        P_FAIL: 'numeros_primos-pag14-v3',
        P_SUCCESS: 'numeros_primos-pag14-v4',
        P_CONCLUSION: 'numeros_primos-pag14-v5',
    };

    // Initial load and auto-checking
    useEffect(() => {
        if (isExerciseCompleted(EXERCISE_IDS.C_GAME)) {
            setPhase1Complete(true);
            setResultC('correct');
        }

        const C_REQUIRED = [
            VIDEO_TRACKING.C_INTRO,
            EXERCISE_IDS.C_GAME
        ];
        const P_REQUIRED = [
            VIDEO_TRACKING.P_INTRO,
            VIDEO_TRACKING.P_FAIL,
            VIDEO_TRACKING.P_SUCCESS,
            VIDEO_TRACKING.P_CONCLUSION
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

    // ========================
    // C SECTION STATE
    // ========================
    const TOTAL_BALLS = 7;
    const MAX_TENISTAS = 7;

    const [balls, setBalls] = useState<Ball[]>(
        Array.from({ length: TOTAL_BALLS }, (_, i) => ({ id: i, location: 'bag' as const }))
    );
    const [tenistaCount, setTenistaCount] = useState(1);
    const [phase1Complete, setPhase1Complete] = useState(false);
    const [draggedBallId, setDraggedBallId] = useState<number | null>(null);
    const [showCelebration, setShowCelebration] = useState(false);
    const [resultC, setResultC] = useState<'correct' | 'incorrect' | null>(null);

    // Balls in bag
    const ballsInBag = balls.filter(b => b.location === 'bag');
    // Balls for a specific tenista (0-based index)
    const getBallsForTenista = useCallback((tIdx: number) => {
        return balls.filter(b => b.location === tIdx);
    }, [balls]);

    // Check if all balls are with tenista 0 (phase 1 completion)
    const allBallsInTenista0 = balls.every(b => b.location === 0);

    // Check equality: every tenista must have the same count, all balls placed
    const tenistaIndices = Array.from({ length: tenistaCount }, (_, i) => i);
    const ballCounts = tenistaIndices.map(i => getBallsForTenista(i).length);
    const placedBalls = balls.filter(b => b.location !== 'bag').length;
    const allPlaced = placedBalls === TOTAL_BALLS;
    const nonZeroCounts = ballCounts.filter(c => c > 0);
    const areEqual = allPlaced && nonZeroCounts.length > 0 && nonZeroCounts.every(c => c === nonZeroCounts[0]) && nonZeroCounts.length === tenistaCount;

    // --- Phase 1 check ---
    useEffect(() => {
        if (!phase1Complete && allBallsInTenista0) {
            setShowCelebration(true);
            setTimeout(() => {
                setPhase1Complete(true);
                setShowCelebration(false);
            }, 2000);
        }
    }, [allBallsInTenista0, phase1Complete]);

    // ========================
    // DRAG & DROP HANDLERS
    // ========================
    const handleDragStart = (e: React.DragEvent, ballId: number) => {
        if (resultC === 'correct') return;
        setDraggedBallId(ballId);
        e.dataTransfer.effectAllowed = 'move';
        const el = e.currentTarget as HTMLElement;
        e.dataTransfer.setDragImage(el, 16, 16);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDropOnTenista = (e: React.DragEvent, tIdx: number) => {
        e.preventDefault();
        if (draggedBallId === null || resultC === 'correct') return;
        setBalls(prev => prev.map(b => b.id === draggedBallId ? { ...b, location: tIdx } : b));
        setDraggedBallId(null);
        setResultC(null);
    };

    const handleDropOnBag = (e: React.DragEvent) => {
        e.preventDefault();
        if (draggedBallId === null || resultC === 'correct') return;
        setBalls(prev => prev.map(b => b.id === draggedBallId ? { ...b, location: 'bag' as const } : b));
        setDraggedBallId(null);
        setResultC(null);
    };

    // Touch support (click-to-select, click-to-place)
    const [touchBallId, setTouchBallId] = useState<number | null>(null);

    const handleTouchSelectBall = (ballId: number) => {
        if (resultC === 'correct') return;
        setTouchBallId(prev => prev === ballId ? null : ballId);
    };

    const handleTouchDropTarget = (target: 'bag' | number) => {
        if (touchBallId === null || resultC === 'correct') return;
        setBalls(prev => prev.map(b => b.id === touchBallId ? { ...b, location: target } : b));
        setTouchBallId(null);
        setResultC(null);
    };

    const addTenista = () => {
        if (tenistaCount < MAX_TENISTAS && resultC !== 'correct') {
            setTenistaCount(prev => prev + 1);
            setResultC(null);
        }
    };

    const handleListoC = async () => {
        if (isExerciseCompleted(EXERCISE_IDS.C_GAME)) return;
        // Correct if all balls are distributed equally (1 group of 7 or 7 groups of 1)
        const isCorrect = areEqual;
        setResultC(isCorrect ? 'correct' : 'incorrect');
        await submitGame(EXERCISE_IDS.C_GAME, isCorrect);
        if (isCorrect) {
            // Stage auto-completed by useEffect
        }
    };

    const handleResetC = () => {
        if (isExerciseCompleted(EXERCISE_IDS.C_GAME)) return;
        setBalls(Array.from({ length: TOTAL_BALLS }, (_, i) => ({ id: i, location: 'bag' as const })));
        setTenistaCount(1);
        setPhase1Complete(false);
        setResultC(null);
    };

    // Render a draggable tennis ball inline
    const renderBall = (ball: Ball, size: 'xs' | 'sm' | 'md' = 'md') => {
        const isSelected = touchBallId === ball.id;
        let sizeClass = 'w-10 h-10';
        if (size === 'sm') sizeClass = 'w-9 h-9';
        if (size === 'xs') sizeClass = 'w-6 h-6';
        return (
            <img
                key={ball.id}
                src="/numeros_primos/pelotatenis.png"
                alt={`Pelota ${ball.id + 1}`}
                draggable
                onDragStart={(e) => handleDragStart(e, ball.id)}
                onClick={(e) => { e.stopPropagation(); handleTouchSelectBall(ball.id); }}
                className={`${sizeClass} object-contain cursor-grab active:cursor-grabbing hover:scale-125 transition-transform select-none relative z-20 ${isSelected ? 'ring-3 ring-purple-500 rounded-full scale-125' : ''}`}
                style={{ touchAction: 'none' }}
            />
        );
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Números Primos' }} pageId="numeros-primos-concepto-concreto">
            <style>{`
                @keyframes celebrate {
                    0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
                    25% { transform: scale(1.2) rotate(5deg); }
                    50% { transform: scale(1.1) rotate(-5deg); }
                    75% { transform: scale(1.15) rotate(3deg); }
                }
                @keyframes confetti {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100px) rotate(720deg); opacity: 0; }
                }
                .celebrate-animation { animation: celebrate 0.6s ease-in-out; }
                .confetti-particle {
                    position: absolute;
                    width: 10px; height: 10px;
                    animation: confetti 1.5s ease-out forwards;
                }
            `}</style>

            {/* ============ C - CONCRETO ============ */}
            <div className="relative ml-2 flex items-start mb-8">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#4ade80] dark:bg-green-700">
                    C {completedStages.includes(STAGE_IDS.C_STAGE) && <span className="ml-1 text-[#059669]">✓</span>}
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-5 bg-white dark:bg-gray-800 border-[#4ade80] dark:border-green-700">

                    {/* Play button top-left */}
                    <div className="mb-4">
                        <PlayVideoButton trackingId={VIDEO_TRACKING.C_INTRO} title="" videoId="/pag14/vv-1" />
                    </div>

                    {/* === TOP ROW: Tenistas + "+" button + ¿IGUALES? === */}
                    <div className="flex items-start gap-3 mb-6">

                        {/* Tenistas with drop boxes */}
                        {tenistaIndices.map(tIdx => {
                            const tBalls = getBallsForTenista(tIdx);
                            return (
                                <div key={tIdx} className="flex flex-col items-center" style={{ minWidth: '64px' }}>
                                    {/* Tenista image */}
                                    <img
                                        src={`/numeros_primos/tenista${tIdx + 1}.png`}
                                        alt={`Tenista ${tIdx + 1}`}
                                        className="h-20 w-auto object-contain mb-1"
                                        draggable={false}
                                    />

                                    {/* Drop box below tenista */}
                                    <div
                                        onDragOver={handleDragOver}
                                        onDrop={(e) => handleDropOnTenista(e, tIdx)}
                                        onClick={() => { if (touchBallId !== null) handleTouchDropTarget(tIdx); }}
                                        className={`relative w-16 h-16 border-2 rounded overflow-hidden transition-colors ${touchBallId !== null
                                            ? 'border-purple-400 bg-purple-50 dark:bg-purple-900/20'
                                            : 'border-gray-800 dark:border-gray-400 bg-white dark:bg-gray-700'
                                            }`}
                                    >
                                        {tBalls.map((ball, idx) => {
                                            const dropPositions = [
                                                { top: '8%', left: '10%', rotate: '-8deg' },
                                                { top: '5%', left: '50%', rotate: '12deg' },
                                                { top: '40%', left: '8%', rotate: '5deg' },
                                                { top: '38%', left: '48%', rotate: '-15deg' },
                                                { top: '22%', left: '30%', rotate: '10deg' },
                                                { top: '55%', left: '25%', rotate: '-5deg' },
                                                { top: '52%', left: '55%', rotate: '18deg' },
                                            ];
                                            const pos = dropPositions[idx % dropPositions.length];
                                            return (
                                                <div
                                                    key={ball.id}
                                                    className="absolute"
                                                    style={{ top: pos.top, left: pos.left, transform: `rotate(${pos.rotate})` }}
                                                >
                                                    {renderBall(ball, 'xs')}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}

                        {/* "+" button + ¿IGUALES? column */}
                        <div className="flex flex-col items-center gap-3">
                            {/* Purple square "+" button */}
                            {tenistaCount < MAX_TENISTAS && (
                                <button
                                    onClick={addTenista}
                                    className="w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded flex items-center justify-center text-2xl font-bold shadow-md transition-all hover:scale-110"
                                    title="Agregar tenista"
                                >
                                    +
                                </button>
                            )}

                            {/* ¿IGUALES? badge */}
                            <div className="bg-green-600 dark:bg-green-700 text-white font-bold px-3 py-1.5 rounded text-sm whitespace-nowrap">
                                ¿IGUALES?
                            </div>

                            {/* Equality indicator */}
                            {tenistaCount > 1 && allPlaced && (
                                areEqual ? (
                                    <div className="flex flex-col items-center gap-1">
                                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <span className="text-green-600 dark:text-green-400 font-bold text-xs text-center leading-tight">
                                            SÍ SON<br />IGUALES
                                        </span>
                                    </div>
                                ) : (
                                    <img
                                        src="/numeros_primos/nosoniguales.png"
                                        alt="No son iguales"
                                        className="w-24 h-auto object-contain"
                                        draggable={false}
                                    />
                                )
                            )}
                        </div>
                    </div>

                    {/* === CELEBRATION (Phase 1) === */}
                    {showCelebration && (
                        <div className="relative flex items-center justify-center gap-2 py-3">
                            <span className="text-green-600 font-black text-2xl celebrate-animation">
                                ✓ CORRECTO
                            </span>
                            {[...Array(8)].map((_, i) => (
                                <div
                                    key={i}
                                    className="confetti-particle"
                                    style={{
                                        backgroundColor: ['#10b981', '#f59e0b', '#8b5cf6', '#ec4899'][i % 4],
                                        left: `${30 + i * 15}px`,
                                        animationDelay: `${i * 0.1}s`
                                    }}
                                />
                            ))}
                            <div className="w-8 h-8 bg-green-500 rounded text-white flex items-center justify-center font-bold text-lg">
                                ✓
                            </div>
                        </div>
                    )}



                    {/* === BOTTOM: Grouping visualization area + Bag === */}
                    <div className="flex items-end gap-4 overflow-x-auto pb-4">
                        {/* Large grouping outline box */}
                        <div className="flex-1 min-h-[120px] border-2 border-gray-800 dark:border-gray-400 rounded p-3 flex items-center">
                            {/* Left Side: Tenista1 OK */}
                            <div className="w-32 flex-none h-full flex items-center justify-center mr-2">
                                {phase1Complete && (
                                    <img
                                        src="/numeros_primos/tenista1ok.png"
                                        alt="Tenista 1 completo"
                                        className="h-full max-h-[110px] w-auto object-contain"
                                        draggable={false}
                                    />
                                )}
                            </div>

                            {/* Vertical Divider */}
                            <div className="w-[2px] h-[100px] bg-gray-300 dark:bg-gray-600 flex-none"></div>

                            {/* Right Side: Result */}
                            <div className="flex-1 flex justify-center h-full pl-2">
                                {tenistaCount > 1 && allPlaced && areEqual && (
                                    <img
                                        src="/numeros_primos/frame210.png"
                                        alt="Resultado reparto igual"
                                        className="h-full max-h-[110px] w-auto object-contain"
                                        draggable={false}
                                    />
                                )}
                            </div>
                        </div>

                        {/* Bag of balls */}
                        <div
                            className="flex-shrink-0 flex flex-col items-center"
                            onDragOver={handleDragOver}
                            onDrop={handleDropOnBag}
                            onClick={() => { if (touchBallId !== null) handleTouchDropTarget('bag'); }}
                        >
                            <div className="relative">
                                <img
                                    src="/numeros_primos/bolsapelotas.png"
                                    alt="Bolsa de pelotas"
                                    className="w-28 h-auto object-contain pointer-events-none"
                                    draggable={false}
                                />
                                {ballsInBag.length > 0 && (
                                    <div className="absolute inset-0 overflow-hidden z-10" style={{ top: '25%' }}>
                                        {ballsInBag.map(ball => {
                                            const positions = [
                                                { top: '15%', left: '22%', rotate: '-12deg' },
                                                { top: '35%', left: '50%', rotate: '18deg' },
                                                { top: '10%', left: '45%', rotate: '-5deg' },
                                                { top: '45%', left: '20%', rotate: '10deg' },
                                                { top: '25%', left: '35%', rotate: '-20deg' },
                                                { top: '50%', left: '42%', rotate: '7deg' },
                                                { top: '30%', left: '12%', rotate: '15deg' },
                                            ];
                                            const pos = positions[ball.id % positions.length];
                                            return (
                                                <div
                                                    key={ball.id}
                                                    className="absolute"
                                                    style={{ top: pos.top, left: pos.left, transform: `rotate(${pos.rotate})` }}
                                                >
                                                    {renderBall(ball, 'sm')}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mt-6">
                        <FeedbackButton
                            onCheck={handleListoC}
                            onReset={handleResetC}
                            status={resultC}
                        />
                    </div>
                </div>
            </div>

            {/* ============ P - PICTORICO ============ */}
            <div className="relative ml-2 flex items-start">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#60a5fa] dark:bg-blue-700">
                    P {completedStages.includes(STAGE_IDS.P_STAGE) && <span className="ml-1 text-[#2563eb]">✓</span>}
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 bg-white dark:bg-gray-800 border-[#60a5fa] dark:border-blue-700">

                    <div className="font-semibold text-base space-y-6">
                        {/* Intro text + play */}
                        <div>
                            <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-lg">
                                Representa los repartos con <span className="font-bold">7</span> cuadrados. Intenta agruparlos en <span className="font-bold">2 grupos, 3 grupos o 4 grupos</span> iguales.
                            </p>
                            <div className="mt-2 flex items-center gap-4">
                                <PlayVideoButton trackingId={VIDEO_TRACKING.P_INTRO} title="" videoId="/pag14/vv-2" />
                            </div>
                        </div>

                        {/* Failure */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <p className="font-semibold text-gray-800 dark:text-gray-200">
                                    No se forman 2, 3 y 4 grupos iguales.
                                </p>
                                <PlayVideoButton trackingId={VIDEO_TRACKING.P_FAIL} title="Grupos que no funcionan" videoId="/pag14/vv-3" />
                            </div>

                            <div className="flex justify-center">
                                <img
                                    src="/numeros_primos/frame211.png"
                                    alt="Grupos que no funcionan"
                                    className="h-60 object-contain"
                                    draggable={false}
                                />
                            </div>
                        </div>

                        {/* Success */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <p className="font-semibold text-gray-800 dark:text-gray-200">
                                    Se pueden formar solo uno grupo o siete grupos iguales.
                                </p>
                                <PlayVideoButton trackingId={VIDEO_TRACKING.P_SUCCESS} title="Grupos que sí funcionan" videoId="/pag14/vv-4" />
                            </div>

                            <div className="flex justify-center">
                                <img
                                    src="/numeros_primos/frame212.png"
                                    alt="Grupos que sí funcionan"
                                    className="h-60 object-contain"
                                    draggable={false}
                                />
                            </div>
                        </div>

                        {/* Conclusion text */}
                        <div className="flex items-center gap-2 border-t pt-4">
                            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                                Se observa que el número <span className="font-bold">7</span> se puede dividir en <span className="font-bold">1</span> ó en sí mismo <span className="font-bold">7</span> partes iguales.
                            </p>
                            <PlayVideoButton trackingId={VIDEO_TRACKING.P_CONCLUSION} title="" videoId="/pag14/vv-5" />
                        </div>
                    </div>
                </div>
            </div>

            {/* VideoModal removed */}
        </BookPageContainer>
    );
}
