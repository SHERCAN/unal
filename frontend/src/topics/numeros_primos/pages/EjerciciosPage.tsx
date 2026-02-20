'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';

/**
 * Frame 169 — Números Primos: Ejercicios
 * Drag-to-connect: numbers 2, 6, 11, 14, 15, 17
 * Each number connects to either "primos" or "compuestos"
 */

interface Props { zoom?: number; }

export function EjerciciosPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched, submitExercise } = useVideoProgress();

    const VIDEO_TRACKING = { INTRO: 'numeros-primos-ej-intro' };

    /* videoModal list removed */
    /* ref removed */

    /* handleVideoComplete removed */

    /* openVideo removed */

    /* PlayButton definition removed */

    // Numbers from Frame 169
    const allNumbers = [
        { num: 2, type: 'primo' },
        { num: 6, type: 'compuesto' },
        { num: 11, type: 'primo' },
        { num: 14, type: 'compuesto' },
        { num: 15, type: 'compuesto' },
        { num: 17, type: 'primo' },
    ];

    const categories = ['primo', 'compuesto'] as const;

    const [connections, setConnections] = useState<Record<number, string>>({});
    const [result, setResult] = useState<'correct' | 'incorrect' | null>(null);

    // Dragging state
    const [dragging, setDragging] = useState<number | null>(null); // which number is being dragged from
    const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    // Refs for the container and all the dot elements
    const containerRef = useRef<HTMLDivElement>(null);
    const leftDotRefs = useRef<Record<number, HTMLDivElement | null>>({});
    const rightDotRefs = useRef<Record<string, HTMLDivElement | null>>({});

    // Get center of a dot element relative to the container
    const getDotCenter = useCallback((el: HTMLDivElement | null) => {
        if (!el || !containerRef.current) return null;
        const containerRect = containerRef.current.getBoundingClientRect();
        const dotRect = el.getBoundingClientRect();
        return {
            x: dotRect.left + dotRect.width / 2 - containerRect.left,
            y: dotRect.top + dotRect.height / 2 - containerRect.top,
        };
    }, []);

    // Mouse down on a left dot → start drag
    const handleDotMouseDown = useCallback((num: number, e: React.MouseEvent) => {
        if (result === 'correct') return;
        e.preventDefault();
        setDragging(num);
        setResult(null);

        // Initialize mouse position to the dot center so line doesn't jump
        const center = getDotCenter(leftDotRefs.current[num]);
        if (center) setMousePos(center);
    }, [result, getDotCenter]);

    // Mouse move anywhere in the container
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (dragging === null) return;
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, [dragging]);

    // Mouse up → check if we're over a right dot, if so connect
    const handleMouseUp = useCallback(() => {
        if (dragging === null) return;

        // Check if mouse is near one of the right dots
        for (const cat of categories) {
            const dotEl = rightDotRefs.current[cat];
            if (!dotEl || !containerRef.current) continue;
            const containerRect = containerRef.current.getBoundingClientRect();
            const dotRect = dotEl.getBoundingClientRect();
            const cx = dotRect.left + dotRect.width / 2 - containerRect.left;
            const cy = dotRect.top + dotRect.height / 2 - containerRect.top;
            const dist = Math.hypot(mousePos.x - cx, mousePos.y - cy);
            if (dist < 40) {
                // Connect!
                setConnections(prev => ({ ...prev, [dragging]: cat }));
                setDragging(null);
                return;
            }
        }

        // Not on any target → cancel
        setDragging(null);
    }, [dragging, mousePos, categories]);

    // Also listen for mouseup on window in case the mouse goes outside
    useEffect(() => {
        const handleGlobalMouseUp = () => {
            if (dragging !== null) setDragging(null);
        };
        window.addEventListener('mouseup', handleGlobalMouseUp);
        return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }, [dragging]);

    const handleCheck = async () => {
        const allCorrect = allNumbers.every(n => connections[n.num] === n.type);
        const allAnswered = allNumbers.every(n => connections[n.num]);
        const isCorrect = allCorrect && allAnswered;
        setResult(isCorrect ? 'correct' : 'incorrect');
        await submitExercise('numeros-primos-classify', isCorrect);
    };

    const handleReset = () => {
        setConnections({});
        setResult(null);
        setDragging(null);
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Números Primos' }} pageId="numeros-primos-ejercicios">
            {/* Title */}
            <h2 className="text-2xl font-extrabold text-purple-700 dark:text-purple-400 mb-6 tracking-wide">EJERCICIOS</h2>

            {/* Exercise 1 header */}
            <div className="flex items-center gap-2 mb-6">
                <PlayVideoButton trackingId={VIDEO_TRACKING.INTRO} title="Ejercicios de Números Primos" videoId="/pag1/vv-1" />
                <span className="bg-purple-600 text-white font-extrabold text-xl px-3 py-1 rounded">1</span>
                <p className="text-gray-800 dark:text-gray-200">
                    Los números dados relacionan correctamente con primos y compuestos.
                </p>
            </div>

            {/* Connection exercise area */}
            <div className="flex flex-col items-center justify-center w-full">
                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    className="relative w-full max-w-xl h-[420px] select-none"
                    style={{ cursor: dragging !== null ? 'grabbing' : 'default' }}
                >
                    {/* SVG Lines Layer */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        {/* Established connections */}
                        {Object.entries(connections).map(([numStr, target]) => {
                            const numVal = parseInt(numStr);
                            const leftCenter = getDotCenter(leftDotRefs.current[numVal]);
                            const rightCenter = getDotCenter(rightDotRefs.current[target]);
                            if (!leftCenter || !rightCenter) return null;

                            const isCorrect = result === 'correct' || (result === 'incorrect' && allNumbers.find(n => n.num === numVal)?.type === target);
                            const color = result === null ? '#7c3aed' : (isCorrect ? '#10b981' : '#ef4444');

                            return (
                                <line
                                    key={numStr}
                                    x1={leftCenter.x}
                                    y1={leftCenter.y}
                                    x2={rightCenter.x}
                                    y2={rightCenter.y}
                                    stroke={color}
                                    strokeWidth="3"
                                />
                            );
                        })}

                        {/* Active drag line */}
                        {dragging !== null && (() => {
                            const leftCenter = getDotCenter(leftDotRefs.current[dragging]);
                            if (!leftCenter) return null;
                            return (
                                <line
                                    x1={leftCenter.x}
                                    y1={leftCenter.y}
                                    x2={mousePos.x}
                                    y2={mousePos.y}
                                    stroke="#7c3aed"
                                    strokeWidth="3"
                                />
                            );
                        })()}
                    </svg>

                    {/* Left Side: Numbers with dots */}
                    {allNumbers.map((item, i) => {
                        const topPct = 8 + i * 16; // 8%, 24%, 40%, 56%, 72%, 88%
                        const isDraggingThis = dragging === item.num;

                        return (
                            <div
                                key={item.num}
                                className="absolute flex items-center gap-2 transform -translate-y-1/2 z-10"
                                style={{ top: `${topPct}%`, left: '8%' }}
                            >
                                <span className="font-extrabold text-xl text-gray-900 dark:text-gray-100 select-none min-w-[30px] text-right">
                                    {item.num}
                                </span>
                                <div
                                    ref={el => { leftDotRefs.current[item.num] = el; }}
                                    onMouseDown={(e) => handleDotMouseDown(item.num, e)}
                                    className={`w-4 h-4 rounded-sm cursor-grab active:cursor-grabbing transition-all
                                        ${isDraggingThis
                                            ? 'bg-purple-500 border-purple-500 scale-125 ring-2 ring-purple-300'
                                            : 'bg-purple-700 border-purple-700'}
                                        border-2
                                    `}
                                />
                            </div>
                        );
                    })}

                    {/* Right Side: Categories with dots — positioned between rows 3-4 and 4-5 */}
                    {/* "primos" at ~40%, "compuestos" at ~56% — aligned with numbers 11 and 14 */}
                    <div
                        className="absolute flex items-center gap-2 transform -translate-y-1/2 z-10"
                        style={{ top: '40%', left: '65%' }}
                    >
                        <div
                            ref={el => { rightDotRefs.current['primo'] = el; }}
                            className="w-4 h-4 rounded-sm bg-purple-700 border-2 border-purple-700"
                        />
                        <span className="font-extrabold text-xl text-gray-900 dark:text-gray-100 select-none">
                            primos
                        </span>
                    </div>

                    <div
                        className="absolute flex items-center gap-2 transform -translate-y-1/2 z-10"
                        style={{ top: '56%', left: '65%' }}
                    >
                        <div
                            ref={el => { rightDotRefs.current['compuesto'] = el; }}
                            className="w-4 h-4 rounded-sm bg-purple-700 border-2 border-purple-700"
                        />
                        <span className="font-extrabold text-xl text-gray-900 dark:text-gray-100 select-none">
                            compuestos
                        </span>
                    </div>
                </div>
            </div>

            {/* Check / Status */}
            <div className="flex items-center gap-3 justify-center mt-4">
                {result !== 'correct' && (
                    <button onClick={handleCheck}
                        className="px-5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded text-sm">
                        ¿LISTO?
                    </button>
                )}
                {result === 'incorrect' && (
                    <button onClick={handleReset}
                        className="px-4 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-semibold rounded text-sm">
                        Reiniciar
                    </button>
                )}
            </div>
            {result === 'correct' && (
                <p className="text-center text-green-600 dark:text-green-400 font-bold text-sm mt-3">
                    ✅ ¡Excelente! Clasificaste correctamente todos los números.
                </p>
            )}
            {result === 'incorrect' && (
                <p className="text-center text-red-500 font-bold text-sm mt-3">
                    ❌ Algunos números están mal clasificados. Verifica e intenta de nuevo.
                </p>
            )}

            {/* VideoModal removed */}
        </BookPageContainer>
    );
}
