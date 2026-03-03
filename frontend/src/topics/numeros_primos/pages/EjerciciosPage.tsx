'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';

/**
 * Frame 169 — Números Primos: Ejercicios
 * Drag-to-connect: numbers 2, 6, 11, 14, 15, 17
 * Each number connects to either "primos" or "compuestos"
 */

interface Props { zoom?: number; }

//PAGINA 3 EJERCICIOS
export function EjerciciosPage({ zoom = 1 }: Props) {
    const EXERCISE_IDS = {
        FINAL_STAGE: 'numeros-primos-final'
    };

    const { isVideoWatched, markVideoWatched, submitExercise, completeStage, isExerciseCompleted } = useVideoProgress();

    const VIDEO_TRACKING = { INTRO: 'numeros_primos-pag16-v1' };

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

    // Initial load sync
    useEffect(() => {
        if (isExerciseCompleted(EXERCISE_IDS.FINAL_STAGE)) {
            setResult('correct');
            // Pre-fill connections with correct answers
            const correctConnections: Record<number, string> = {};
            allNumbers.forEach(n => {
                correctConnections[n.num] = n.type;
            });
            setConnections(correctConnections);
        }
    }, [isExerciseCompleted]);

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

    // Mouse/Touch down on a left dot → start drag
    const handleDotMouseDown = useCallback((num: number, e: React.MouseEvent) => {
        if (result === 'correct' || isExerciseCompleted(EXERCISE_IDS.FINAL_STAGE)) return;
        e.preventDefault();
        setDragging(num);
        setResult(null);

        // Initialize mouse position to the dot center so line doesn't jump
        const center = getDotCenter(leftDotRefs.current[num]);
        if (center) setMousePos(center);
    }, [result, getDotCenter, isExerciseCompleted]);

    const handleDotTouchStart = useCallback((num: number, e: React.TouchEvent) => {
        if (result === 'correct' || isExerciseCompleted(EXERCISE_IDS.FINAL_STAGE)) return;
        if (e.cancelable) e.preventDefault();
        setDragging(num);
        setResult(null);
        const center = getDotCenter(leftDotRefs.current[num]);
        if (center) setMousePos(center);
    }, [result, getDotCenter, isExerciseCompleted]);

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

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (dragging === null) return;
        if (e.cancelable) e.preventDefault(); // Prevent scrolling
        const touch = e.touches[0];
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        setMousePos({
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top,
        });
    }, [dragging]);

    // Mouse/Touch up → check if we're over a right dot, if so connect
    const checkDropAndConnect = useCallback(() => {
        if (dragging === null) return;

        // Check if pointer is near one of the right dots
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

    const handleMouseUp = useCallback(() => {
        checkDropAndConnect();
    }, [checkDropAndConnect]);

    // Manual non-passive listeners for the container to avoid the passive listener error
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleTouchMoveNonPassive = (e: TouchEvent) => {
            if (dragging === null) return;
            // Prevent scrolling on the container while dragging connection lines
            if (e.cancelable) e.preventDefault();

            const touch = e.touches[0];
            const rect = container.getBoundingClientRect();
            setMousePos({
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top,
            });
        };

        const handleTouchEndNonPassive = (e: TouchEvent) => {
            if (dragging === null) return;
            if (e.cancelable) e.preventDefault();
            checkDropAndConnect();
        };

        container.addEventListener('touchmove', handleTouchMoveNonPassive, { passive: false });
        container.addEventListener('touchend', handleTouchEndNonPassive, { passive: false });
        container.addEventListener('touchcancel', handleTouchEndNonPassive, { passive: false });

        return () => {
            container.removeEventListener('touchmove', handleTouchMoveNonPassive);
            container.removeEventListener('touchend', handleTouchEndNonPassive);
            container.removeEventListener('touchcancel', handleTouchEndNonPassive);
        };
    }, [dragging, checkDropAndConnect]);

    // Global cleanup for mouse up
    useEffect(() => {
        const handleGlobalEnd = () => {
            if (dragging !== null) setDragging(null);
        };
        window.addEventListener('mouseup', handleGlobalEnd);
        return () => {
            window.removeEventListener('mouseup', handleGlobalEnd);
        };
    }, [dragging]);

    const handleCheck = async () => {
        if (isExerciseCompleted(EXERCISE_IDS.FINAL_STAGE)) return;
        const allCorrect = allNumbers.every(n => connections[n.num] === n.type);
        const allAnswered = allNumbers.every(n => connections[n.num]);
        const isCorrect = allCorrect && allAnswered;
        setResult(isCorrect ? 'correct' : 'incorrect');
        await submitExercise(EXERCISE_IDS.FINAL_STAGE, isCorrect, 'modulo_a');
    };

    const handleReset = () => {
        if (isExerciseCompleted(EXERCISE_IDS.FINAL_STAGE)) return;
        setConnections({});
        setResult(null);
        setDragging(null);
    };
    {/* --- MODULO A --- */ }
    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Números Primos' }} pageId="numeros-primos-ejercicios">
            {/* Title */}
            <h2 className="text-2xl font-extrabold text-purple-700 dark:text-purple-400 mb-6 tracking-wide">EJERCICIOS</h2>

            {/* Exercise 1 header */}
            <div className="flex items-center gap-2 mb-6 text-gray-800 dark:text-gray-200">
                <PlayVideoButton trackingId={VIDEO_TRACKING.INTRO} title="Ejercicios de Números Primos" videoId="/pag16/vv-1" />
                <span className="bg-purple-600 text-white font-extrabold text-xl px-3 py-1 rounded">1</span>
                <p className="font-semibold text-base">
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
                    style={{ cursor: dragging !== null ? 'grabbing' : 'default', touchAction: dragging !== null ? 'none' : 'auto' }}
                >
                    {/* SVG Lines Layer */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                        {/* Established connections */}
                        {Object.entries(connections).map(([numStr, target]) => {
                            const numVal = parseInt(numStr);
                            const leftCenter = getDotCenter(leftDotRefs.current[numVal]);
                            const rightCenter = getDotCenter(rightDotRefs.current[target]);
                            if (!leftCenter || !rightCenter) return null;

                            const isCorrectEntry = allNumbers.find(n => n.num === numVal)?.type === target;
                            const color = result === null ? '#7c3aed' : (isCorrectEntry ? '#10b981' : '#ef4444');

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
                        const topPct = 8 + i * 16;
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
                                    onTouchStart={(e) => handleDotTouchStart(item.num, e)}
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

                    {/* Right Side: Categories with dots */}
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
            <div className="flex justify-center mt-4">
                <FeedbackButton
                    onCheck={handleCheck}
                    onReset={handleReset}
                    status={result}
                />
            </div>

            {/* VideoModal removed */}
        </BookPageContainer>
    );
}
