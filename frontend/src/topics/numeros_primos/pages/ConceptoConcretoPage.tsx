'use client';

import React, { useState, useRef, useCallback } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

/**
 * Números Primos: Concepto Concreto y Procesual
 * C section: Interactive drag-and-drop tennis ball distribution (Frame 208)
 * P section: 7 squares, grouping attempts (fail 2,3,4 groups; success 1 or 7 groups)
 */

interface Props { zoom?: number; }

interface Ball {
    id: number;
    location: 'bag' | number; // 'bag' or tenista index (0-based)
}

export function ConceptoConcretoPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        C_INTRO: 'numeros-primos-c-intro',
        P_INTRO: 'numeros-primos-p-intro',
        P_FAIL: 'numeros-primos-p-fail',
        P_SUCCESS: 'numeros-primos-p-success',
        P_CONCLUSION: 'numeros-primos-p-conclusion',
    };

    const [videoModal, setVideoModal] = useState<{ isOpen: boolean; title: string; videoId?: string }>({
        isOpen: false, title: '', videoId: undefined
    });
    const currentTrackingRef = useRef<string | undefined>(undefined);

    const handleVideoComplete = () => {
        if (currentTrackingRef.current) {
            markVideoWatched(currentTrackingRef.current);
            currentTrackingRef.current = undefined;
        }
    };

    const openVideo = (trackingId: string, title: string) => {
        currentTrackingRef.current = trackingId;
        setVideoModal({ isOpen: true, title, videoId: undefined });
    };

    const PlayBtn = ({ trackingId, title }: { trackingId: string; title: string }) => {
        const watched = isVideoWatched(trackingId);
        return (
            <button type="button" onClick={() => openVideo(trackingId, title)}
                className={`w-10 h-10 flex items-center justify-center text-white rounded-full transition-all flex-shrink-0 ${watched ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'}`}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </button>
        );
    };

    /* ---- small green square helper (P section) ---- */
    const GreenSquare = () => (
        <div className="w-8 h-8 bg-[#c5e384] border border-[#9ab85c] dark:bg-green-600 dark:border-green-500" />
    );

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
    React.useEffect(() => {
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
        if (draggedBallId === null) return;
        setBalls(prev => prev.map(b => b.id === draggedBallId ? { ...b, location: tIdx } : b));
        setDraggedBallId(null);
    };

    const handleDropOnBag = (e: React.DragEvent) => {
        e.preventDefault();
        if (draggedBallId === null) return;
        setBalls(prev => prev.map(b => b.id === draggedBallId ? { ...b, location: 'bag' as const } : b));
        setDraggedBallId(null);
    };

    // Touch support (click-to-select, click-to-place)
    const [touchBallId, setTouchBallId] = useState<number | null>(null);

    const handleTouchSelectBall = (ballId: number) => {
        setTouchBallId(prev => prev === ballId ? null : ballId);
    };

    const handleTouchDropTarget = (target: 'bag' | number) => {
        if (touchBallId === null) return;
        setBalls(prev => prev.map(b => b.id === touchBallId ? { ...b, location: target } : b));
        setTouchBallId(null);
    };

    const addTenista = () => {
        if (tenistaCount < MAX_TENISTAS) {
            setTenistaCount(prev => prev + 1);
        }
    };

    // Render a draggable tennis ball inline (not as component to avoid re-mount killing drag state)
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
                    C
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-5 bg-white dark:bg-gray-800 border-[#4ade80] dark:border-green-700">

                    {/* Play button top-left */}
                    <div className="mb-4">
                        <PlayBtn trackingId={VIDEO_TRACKING.C_INTRO} title="Números Primos - Concepto Concreto" />
                    </div>

                    {/* === TOP ROW: Tenistas + "+" button + ¿IGUALES? === */}
                    <div className="flex items-start gap-3 mb-6">

                        {/* Tenistas with drop boxes */}
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

                                    {/* Drop box below tenista — fixed size, balls positioned absolutely */}
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
                    <div className="flex items-end gap-4">
                        {/* Large grouping outline box */}
                        <div className="flex-1 min-h-[120px] border-2 border-gray-800 dark:border-gray-400 rounded p-3 flex items-center">
                            {/* Left Side: Tenista1 OK - Fixed width to keep divider stable */}
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

                            {/* Right Side: Result (Frame 210) - Only when EQUAL */}
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

                        {/* Bag of balls (bottom-right) */}
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
                                {/* Balls scattered inside the bag */}
                                {ballsInBag.length > 0 && (
                                    <div className="absolute inset-0 overflow-hidden z-10" style={{ top: '25%' }}>
                                        {ballsInBag.map(ball => {
                                            // Pre-computed random-looking positions per ball id (deterministic)
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
                </div>
            </div>

            {/* ============ P - PROCESUAL ============ */}
            <div className="relative ml-2 flex items-start">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#60a5fa] dark:bg-blue-700">
                    P
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 bg-white dark:bg-gray-800 border-[#60a5fa] dark:border-blue-700">

                    <div className="mt-2 space-y-6">
                        {/* Intro text + play */}
                        <div>
                            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                                Representa los repartos con <span className="font-bold">7</span> cuadrados. Intenta agruparlos en <span className="font-bold">2 grupos, 3 grupos o 4 grupos</span> iguales.
                            </p>
                            <div className="mt-2">
                                <PlayBtn trackingId={VIDEO_TRACKING.P_INTRO} title="Concepto Procesual" />
                            </div>
                        </div>

                        {/* Failure: No se forman 2, 3 y 4 grupos iguales */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <p className="font-semibold text-gray-800 dark:text-gray-200">
                                    No se forman 2, 3 y 4 grupos iguales.
                                </p>
                                <PlayBtn trackingId={VIDEO_TRACKING.P_FAIL} title="Grupos que no funcionan" />
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

                        {/* Success: 1 group or 7 groups */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <p className="font-semibold text-gray-800 dark:text-gray-200">
                                    Se pueden formar solo uno grupo o siete grupos iguales.
                                </p>
                                <PlayBtn trackingId={VIDEO_TRACKING.P_SUCCESS} title="Grupos que sí funcionan" />
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
                        <div className="flex items-center gap-2">
                            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                                Se observa que el número <span className="font-bold">7</span> se puede dividir en <span className="font-bold">1</span> ó en sí mismo <span className="font-bold">7</span> partes iguales.
                            </p>
                            <PlayBtn trackingId={VIDEO_TRACKING.P_CONCLUSION} title="Conclusión" />
                        </div>
                    </div>
                </div>
            </div>

            <VideoModal
                isOpen={videoModal.isOpen}
                onClose={() => setVideoModal(prev => ({ ...prev, isOpen: false }))}
                videoId={videoModal.videoId}
                title={videoModal.title}
                onComplete={handleVideoComplete}
            />
        </BookPageContainer>
    );
}
