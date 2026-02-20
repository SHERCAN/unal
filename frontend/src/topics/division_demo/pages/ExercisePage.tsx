'use client';

import React, { useState } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { VIDEO_IDS } from '@/config/videos';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface Apple {
    id: number;
    inBox: number | null; // null = in pool, 1/2/3 = in child box
}

interface DivisionExercisePageProps {
    zoom?: number;
}

export function ExercisePage({ zoom = 1 }: DivisionExercisePageProps) {
    const { isVideoWatched, markVideoWatched, completeStage, watchedVideos, submitGame } = useVideoProgress();

    // Define tracking IDs for the two required videos in Stage C
    const VIDEO_TRACKING_IDS = {
        C_INTRO: 'division-c-intro',
        C_QUESTION: 'division-c-question',
        P_EXPLANATION: 'division-p-explanation'
    };
    const STAGE_C_VIDEOS = [VIDEO_TRACKING_IDS.C_INTRO, VIDEO_TRACKING_IDS.C_QUESTION];
    const STAGE_P_VIDEOS = [VIDEO_TRACKING_IDS.P_EXPLANATION];

    const totalApples = 12;
    const [apples, setApples] = useState<Apple[]>(
        Array.from({ length: totalApples }, (_, i) => ({ id: i, inBox: null }))
    );
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [draggedApple, setDraggedApple] = useState<number | null>(null);

    // Effect to check Stage C completion (Video + Correct Answer)
    React.useEffect(() => {
        const isAnswerCorrect = selectedAnswer === 4;
        const areStageCVideosWatched = STAGE_C_VIDEOS.every(id => isVideoWatched(id));

        if (areStageCVideosWatched && selectedAnswer === 4) {
            completeStage('division-c');
        }

        // Check Stage P Completion (Video Only)
        const areStagePVideosWatched = STAGE_P_VIDEOS.every(id => watchedVideos.includes(id));
        if (areStagePVideosWatched) {
            completeStage('division-p');
        }
    }, [watchedVideos, selectedAnswer]);

    const children = [
        { id: 1, name: 'Niño 1', image: '/child-boy-1.png', color: 'from-blue-400 to-blue-600' },
        { id: 2, name: 'Niña 2', image: '/child-girl.png', color: 'from-pink-400 to-pink-600' },
        { id: 3, name: 'Niño 3', image: '/child-boy-2.png', color: 'from-green-400 to-green-600' },
    ];

    const answers = [2, 3, 4, 5];

    const getApplesInPool = () => apples.filter(a => a.inBox === null);
    const getApplesInBox = (boxId: number) => apples.filter(a => a.inBox === boxId);

    const handleDragStart = (e: React.DragEvent, appleId: number) => {
        setDraggedApple(appleId);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDropOnBox = (e: React.DragEvent, boxId: number) => {
        e.preventDefault();
        if (draggedApple === null) return;

        setApples(prev =>
            prev.map(a => (a.id === draggedApple ? { ...a, inBox: boxId } : a))
        );
        setDraggedApple(null);
    };

    const handleDropOnPool = (e: React.DragEvent) => {
        e.preventDefault();
        if (draggedApple === null) return;

        setApples(prev =>
            prev.map(a => (a.id === draggedApple ? { ...a, inBox: null } : a))
        );
        setDraggedApple(null);
    };

    const handleReset = () => {
        setApples(Array.from({ length: totalApples }, (_, i) => ({ id: i, inBox: null })));
        setSelectedAnswer(null);
    };

    /* videoModal list removed */

    // Use a ref to store the current tracking ID so it persists even after modal closes
    /* ref removed */

    /* handleVideoComplete removed */

    return (
        <BookPageContainer
            zoom={zoom}
            moduleHeader={{
                icon: '/division-icon.png',
                name: 'División'
            }}
            pageId="division-exercise"
        >
            <style jsx>{`
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

                @keyframes rain {
                    0% { transform: translateY(-20px); opacity: 0; }
                    10% { opacity: 1; }
                    100% { transform: translateY(100px); opacity: 0; }
                }

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }

                .celebrate-animation {
                    animation: celebrate 0.6s ease-in-out;
                }

                .shake-animation {
                    animation: shake 0.5s ease-in-out;
                }

                .confetti-particle {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    animation: confetti 1.5s ease-out forwards;
                }

                .rain-particle {
                    position: absolute;
                    width: 2px;
                    height: 10px;
                    background: linear-gradient(to bottom, transparent, #f97316);
                    animation: rain 1s linear infinite;
                }
            `}</style>
            <div className="w-full">
                {/* C - CONCRETO Box */}
                <div className="relative border-2 rounded-xl p-4 mb-4" style={{ borderColor: '#80e8bb' }}>
                    {/* C Label */}
                    <div className="absolute -top-4 left-4 px-3 py-1 rounded font-black text-xl text-white" style={{ backgroundColor: '#80e8bb' }}>
                        C
                    </div>

                    {/* Header */}
                    <div className="text-center mb-4 mt-2">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Ejercicio de División
                        </h2>
                        <div className="inline-block bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg px-4 py-2">
                            <p className="text-base text-gray-800 dark:text-gray-200">
                                <strong>Problema:</strong> Hay <span className="text-xl font-bold text-red-600">{totalApples} manzanas</span> 🍎
                                que deben repartirse entre <span className="text-xl font-bold text-blue-600">3 niños</span> de forma equitativa.
                            </p>
                            <div className="flex items-center justify-center gap-2 mt-1">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    ¿Cuántas manzanas le corresponden a cada niño?
                                </p>
                                <button
                                    type="button"
                                    onMouseEnter={() => {
                                        currentTrackingIdRef.current = VIDEO_TRACKING_IDS.C_INTRO;
                                        setVideoModal({
                                            isOpen: true,
                                            title: 'División de Manzanas',
                                            videoId: VIDEO_IDS.MODULE_DIVISION,
                                            trackingId: VIDEO_TRACKING_IDS.C_INTRO
                                        });
                                    }}
                                    className={`p-1 text-white rounded-full transition-all flex-shrink-0 ${isVideoWatched(VIDEO_TRACKING_IDS.C_INTRO)
                                        ? 'bg-green-600 hover:bg-green-700'
                                        : 'bg-purple-600 hover:bg-purple-700'
                                        }`}
                                >
                                    <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                                        {isVideoWatched(VIDEO_TRACKING_IDS.C_INTRO) ? (
                                            <path d="M8 5v14l11-7z" />
                                        ) : (
                                            <path d="M8 5v14l11-7z" />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Canvas */}
                    <div className="flex flex-col lg:flex-row gap-4 items-start justify-center mb-4">
                        {/* Apple Pool */}
                        <div
                            onDragOver={handleDragOver}
                            onDrop={handleDropOnPool}
                            className="w-full lg:w-48 min-h-[120px] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 bg-gray-50 dark:bg-gray-800/50"
                        >
                            <p className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">
                                🍎 Manzanas disponibles
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {getApplesInPool().map(apple => (
                                    <div
                                        key={apple.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, apple.id)}
                                        className="w-10 h-10 text-2xl flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 transition-transform select-none"
                                    >
                                        🍎
                                    </div>
                                ))}
                            </div>
                            {getApplesInPool().length === 0 && (
                                <p className="text-center text-xs text-gray-400 dark:text-gray-500 italic">
                                    Arrastra manzanas aquí para devolverlas
                                </p>
                            )}
                        </div>

                        {/* Children Boxes */}
                        <div className="flex flex-col sm:flex-row gap-3 flex-1 justify-center">
                            {children.map(child => {
                                const applesInBox = getApplesInBox(child.id);
                                return (
                                    <div
                                        key={child.id}
                                        onDragOver={handleDragOver}
                                        onDrop={(e) => handleDropOnBox(e, child.id)}
                                        className="w-full sm:w-36 min-h-[140px] border-2 border-blue-300 dark:border-blue-700 rounded-xl p-2 bg-blue-50 dark:bg-blue-900/20 flex flex-col items-center"
                                    >
                                        {/* Child Icon */}
                                        <div className="w-16 h-20 flex items-center justify-center mb-1">
                                            <img
                                                src={child.image}
                                                alt={child.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <p className="font-medium text-gray-800 dark:text-gray-200 text-xs">
                                            {child.name}
                                        </p>

                                        {/* Apple Count Badge */}
                                        <div className="bg-green-500 text-white rounded-full px-2 py-0.5 text-xs font-bold my-1">
                                            {applesInBox.length} 🍎
                                        </div>

                                        {/* Apples in Box */}
                                        <div className="flex flex-wrap gap-1 justify-center flex-1">
                                            {applesInBox.map(apple => (
                                                <div
                                                    key={apple.id}
                                                    draggable
                                                    onDragStart={(e) => handleDragStart(e, apple.id)}
                                                    className="w-6 h-6 text-lg flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 transition-transform select-none"
                                                >
                                                    🍎
                                                </div>
                                            ))}
                                        </div>

                                        {applesInBox.length === 0 && (
                                            <p className="text-xs text-gray-400 dark:text-gray-500 italic text-center mt-1">
                                                Arrastra aquí
                                            </p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Reset Button */}
                    <div className="text-center mb-3">
                        <button
                            onClick={handleReset}
                            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                            🔄 Reiniciar
                        </button>
                    </div>

                    {/* Answer Selection */}
                    <div className="border-gray-200 dark:border-gray-700 pt-3">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <p className="text-center font-bold text-gray-900 dark:text-gray-100 text-base">
                                ¿Cuántas manzanas debe tener cada niño?
                            </p>
                            <button
                                type="button"
                                onMouseEnter={() => {
                                    currentTrackingIdRef.current = VIDEO_TRACKING_IDS.C_QUESTION;
                                    setVideoModal({
                                        isOpen: true,
                                        title: 'División de Manzanas',
                                        videoId: VIDEO_IDS.MODULE_DIVISION,
                                        trackingId: VIDEO_TRACKING_IDS.C_QUESTION
                                    });
                                }}
                                className={`p-1 text-white rounded-full transition-all flex-shrink-0 ${isVideoWatched(VIDEO_TRACKING_IDS.C_QUESTION)
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-purple-600 hover:bg-purple-700'
                                    }`}
                            >
                                <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                                    {isVideoWatched(VIDEO_TRACKING_IDS.C_QUESTION) ? (
                                        <path d="M8 5v14l11-7z" />
                                    ) : (
                                        <path d="M8 5v14l11-7z" />
                                    )}
                                </svg>
                            </button>
                        </div>
                        <div className="flex justify-center gap-3 flex-wrap">
                            {answers.map(ans => (
                                <button
                                    key={ans}
                                    onClick={() => {
                                        setSelectedAnswer(ans);
                                        submitGame('division-game-c-question', ans === 4);
                                    }}
                                    className={`
                                w-12 h-12 text-xl font-bold rounded-xl border-2 transition-all
                                ${selectedAnswer === ans
                                            ? 'bg-purple-600 text-white border-purple-600 scale-110 shadow-lg'
                                            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:border-purple-500 hover:scale-105'
                                        }
                            `}
                                >
                                    {ans}
                                </button>
                            ))}
                        </div>

                        {selectedAnswer !== null && (
                            <div className="mt-4 flex justify-center">
                                {selectedAnswer === 4 ? (
                                    <div className="relative flex items-center gap-2">
                                        <span className="text-green-600 font-black text-2xl celebrate-animation">
                                            ✓ CORRECTO
                                        </span>
                                        {/* Confetti particles */}
                                        {[...Array(8)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="confetti-particle"
                                                style={{
                                                    backgroundColor: ['#10b981', '#f59e0b', '#8b5cf6', '#ec4899'][i % 4],
                                                    left: `${i * 15}px`,
                                                    animationDelay: `${i * 0.1}s`
                                                }}
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="relative flex items-center gap-3">
                                        <span className="text-orange-500 font-black text-2xl shake-animation">
                                            INCORRECTO
                                        </span>
                                        <button
                                            onClick={() => setSelectedAnswer(null)}
                                            className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all"
                                            title="Reintentar"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                        </button>
                                        {/* Rain particles */}
                                        {[...Array(6)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="rain-particle"
                                                style={{
                                                    left: `${i * 20 - 60}px`,
                                                    animationDelay: `${i * 0.15}s`
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                {/* End of C - CONCRETO Box */}

                {/* P - PICTÓRICO Box */}
                <div className="relative border-2 rounded-xl p-4 mb-4" style={{ borderColor: '#8ec2e8' }}>
                    {/* P Label */}
                    <div className="absolute -top-4 left-4 px-3 py-1 rounded font-black text-xl text-white" style={{ backgroundColor: '#8ec2e8' }}>
                        P
                    </div>

                    <div className="w-full h-full flex flex-col justify-center overflow-hidden mt-2" style={{ gap: 'clamp(0.5rem, 2vh, 1.5rem)' }}>
                        {/* Title */}
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                            <h2 className=" font-bold text-gray-900 dark:text-white mb-2" style={{ fontSize: 'clamp(1.5rem, 4vmin, 2.5rem)', lineHeight: '1.2' }}>
                                División: Diferentes Representaciones
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400" style={{ fontSize: 'clamp(0.875rem, 2vmin, 1.125rem)' }}>
                                Entendiendo la división a través de múltiples perspectivas
                            </p>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 min-h-0 flex flex-col justify-center" style={{ gap: 'clamp(1rem, 3vh, 2rem)' }}>
                            {/* Visual Representation */}
                            <div className="flex-1 min-h-0 bg-gray-50 dark:bg-gray-800/50 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-center" style={{ padding: 'clamp(1rem, 3vmin, 2rem)' }}>
                                <div className="flex items-center justify-center gap-2 shrink-0" style={{ marginBottom: 'clamp(0.75rem, 2vh, 1.5rem)' }}>
                                    <h3 className="font-semibold text-gray-900 dark:text-white text-center" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.5rem)' }}>
                                        Notación Matemática
                                    </h3>
                                    <button
                                        type="button"
                                        onMouseEnter={() => {
                                            currentTrackingIdRef.current = VIDEO_TRACKING_IDS.P_EXPLANATION;
                                            setVideoModal({
                                                isOpen: true,
                                                title: 'Explicación Pictórica',
                                                videoId: VIDEO_IDS.MODULE_DIVISION,
                                                trackingId: VIDEO_TRACKING_IDS.P_EXPLANATION
                                            });
                                        }}
                                        className={`p-1 text-white rounded-full transition-all flex-shrink-0 ${isVideoWatched(VIDEO_TRACKING_IDS.P_EXPLANATION)
                                            ? 'bg-green-600 hover:bg-green-700'
                                            : 'bg-purple-600 hover:bg-purple-700'
                                            }`}
                                    // Keeping blue default for P section as per original, or switch to purple consistency? Original was blue.
                                    >
                                        <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                                            {isVideoWatched(VIDEO_TRACKING_IDS.P_EXPLANATION) ? (
                                                <path d="M8 5v14l11-7z" />
                                            ) : (
                                                <path d="M8 5v14l11-7z" />
                                            )}
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex flex-col md:flex-row items-center justify-center flex-1 min-h-0 overflow-hidden" style={{ gap: 'clamp(1.5rem, 4vmin, 3rem)' }}>
                                    {/* Children Section */}
                                    <div className="flex flex-col items-center justify-center shrink-0">
                                        <div className="font-bold text-blue-600 dark:text-blue-400 leading-none" style={{ fontSize: 'clamp(2rem, 6vmin, 4rem)', marginBottom: 'clamp(0.25rem, 1vmin, 0.75rem)' }}>3</div>
                                        <div className="flex" style={{ gap: 'clamp(0.25rem, 1vmin, 0.75rem)' }}>
                                            <div className="flex items-center justify-center" style={{ width: 'clamp(2rem, 6vmin, 3.5rem)', height: 'clamp(3rem, 8vmin, 5rem)' }}>
                                                <img src="/child-boy-1.png" alt="Niño 1" className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex items-center justify-center" style={{ width: 'clamp(2rem, 6vmin, 3.5rem)', height: 'clamp(3rem, 8vmin, 5rem)' }}>
                                                <img src="/child-girl.png" alt="Niña" className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex items-center justify-center" style={{ width: 'clamp(2rem, 6vmin, 3.5rem)', height: 'clamp(3rem, 8vmin, 5rem)' }}>
                                                <img src="/child-boy-2.png" alt="Niño 2" className="w-full h-full object-contain" />
                                            </div>
                                        </div>
                                        <p className="font-medium text-gray-500" style={{ marginTop: 'clamp(0.25rem, 1vmin, 0.5rem)', fontSize: 'clamp(0.75rem, 1.8vmin, 1rem)' }}>niños</p>
                                    </div>

                                    {/* Division Symbol */}
                                    <div className="font-bold text-gray-300 dark:text-gray-600 shrink-0" style={{ fontSize: 'clamp(1.5rem, 5vmin, 3rem)' }}>÷</div>

                                    {/* Apples Section */}
                                    <div className="flex flex-col items-center justify-center shrink-0">
                                        <div className="font-bold text-green-600 dark:text-green-400 leading-none" style={{ fontSize: 'clamp(2rem, 6vmin, 4rem)', marginBottom: 'clamp(0.25rem, 1vmin, 0.75rem)' }}>12</div>
                                        <div className="grid grid-cols-4" style={{ gap: 'clamp(0.25rem, 0.5vmin, 0.5rem)' }}>
                                            {Array.from({ length: 12 }).map((_, i) => (
                                                <div key={i} className="flex items-center justify-center" style={{ width: 'clamp(1rem, 3vmin, 2rem)', height: 'clamp(1rem, 3vmin, 2rem)', fontSize: 'clamp(0.75rem, 2.5vmin, 1.5rem)' }}>
                                                    🍎
                                                </div>
                                            ))}
                                        </div>
                                        <p className="font-medium text-gray-500" style={{ marginTop: 'clamp(0.25rem, 1vmin, 0.5rem)', fontSize: 'clamp(0.75rem, 1.8vmin, 1rem)' }}>manzanas</p>
                                    </div>

                                    {/* Equals */}
                                    <div className="font-bold text-gray-300 dark:text-gray-600 shrink-0" style={{ fontSize: 'clamp(1.5rem, 5vmin, 3rem)' }}>=</div>

                                    {/* Result */}
                                    <div className="flex flex-col items-center justify-center shrink-0">
                                        <div className="font-bold text-purple-600 dark:text-purple-400 leading-none" style={{ fontSize: 'clamp(2rem, 6vmin, 4rem)', marginBottom: 'clamp(0.25rem, 1vmin, 0.75rem)' }}>4</div>
                                        <div className="flex mb-1" style={{ gap: 'clamp(0.25rem, 0.5vmin, 0.5rem)' }}>
                                            <div style={{ fontSize: 'clamp(1rem, 3vmin, 2rem)' }}>🍎</div>
                                            <div style={{ fontSize: 'clamp(1rem, 3vmin, 2rem)' }}>🍎</div>
                                            <div style={{ fontSize: 'clamp(1rem, 3vmin, 2rem)' }}>🍎</div>
                                            <div style={{ fontSize: 'clamp(1rem, 3vmin, 2rem)' }}>🍎</div>
                                        </div>
                                        <p className="font-medium text-gray-500" style={{ fontSize: 'clamp(0.75rem, 1.8vmin, 1rem)' }}>por niño</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End of P - PICTÓRICO Box */}
            </div>

            {/* Video Modal */}
            {/* VideoModal removed */}
        </BookPageContainer>
    );
}
