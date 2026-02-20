'use client';

import React, { useState } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { VIDEO_IDS } from '@/config/videos';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface DivisionProblemsPageProps {
    zoom?: number;
}

export function ProblemsPage({ zoom = 1 }: DivisionProblemsPageProps) {
    // Video Tracking - All Module A Videos from ALL pages
    const VIDEO_TRACKING_IDS = {
        PROB_1: 'division-a-prob1',
        PROB_2: 'division-a-prob2'
    };

    // All Module A videos across all 3 pages
    const ALL_MODULE_A_VIDEOS = [
        // From DivisionProblemsPage (this page)
        'division-a-prob1',
        'division-a-prob2',

        // From DivisionConceptPage
        'division-concept-understanding',
        'division-concept-parts',
        'division-concept-dividend',
        'division-concept-divisor',
        'division-concept-quotient',
        'division-concept-example',

        // From DivisionExplanationPage2
        'division-explanation2-notation'
    ];

    const { isVideoWatched, markVideoWatched, completeStage, watchedVideos } = useVideoProgress();

    /* videoModal list removed */

    /* handleVideoComplete removed */

    // Problem 1 states
    const [problem1Dividend, setProblem1Dividend] = useState('');
    const [problem1Divisor, setProblem1Divisor] = useState('');
    const [problem1Quotient, setProblem1Quotient] = useState('');
    const [problem1Feedback, setProblem1Feedback] = useState<'correct' | 'incorrect' | null>(null);

    // Problem 2 states
    const [problem2Dividend, setProblem2Dividend] = useState('');
    const [problem2Divisor, setProblem2Divisor] = useState('');
    const [problem2Quotient, setProblem2Quotient] = useState('');
    const [problem2Feedback, setProblem2Feedback] = useState<'correct' | 'incorrect' | null>(null);

    // Check Stage A Completion (ALL Videos from ALL pages + Correct Answers)
    React.useEffect(() => {
        const areAllVideosWatched = ALL_MODULE_A_VIDEOS.every(id => watchedVideos.includes(id));
        const isProblem1Correct = problem1Feedback === 'correct';
        const isProblem2Correct = problem2Feedback === 'correct';

        if (areAllVideosWatched && isProblem1Correct && isProblem2Correct) {
            completeStage('division-a');
        }
    }, [watchedVideos, problem1Feedback, problem2Feedback]);

    const handleProblem1Check = () => {
        const isCorrect = problem1Dividend === '12' && problem1Divisor === '2' && problem1Quotient === '6';
        setProblem1Feedback(isCorrect ? 'correct' : 'incorrect');
    };

    const handleProblem1Reset = () => {
        setProblem1Dividend('');
        setProblem1Divisor('');
        setProblem1Quotient('');
        setProblem1Feedback(null);
    };

    const handleProblem2Check = () => {
        const isCorrect = problem2Dividend === '64' && problem2Divisor === '8' && problem2Quotient === '8';
        setProblem2Feedback(isCorrect ? 'correct' : 'incorrect');
    };

    const handleProblem2Reset = () => {
        setProblem2Dividend('');
        setProblem2Divisor('');
        setProblem2Quotient('');
        setProblem2Feedback(null);
    };

    return (
        <BookPageContainer
            zoom={zoom}
            moduleHeader={{
                icon: '/division-icon.png',
                name: 'División'
            }}
            pageId="division-problems"
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

            {/* A - ABSTRACTO Box */}
            <div className="relative border-2 rounded-xl p-4 mt-2" style={{ borderColor: '#be90de' }}>
                {/* A Label */}
                <div className="absolute -top-4 left-4 px-3 py-1 rounded font-black text-xl text-white" style={{ backgroundColor: '#be90de' }}>
                    A
                </div>

                <div className="w-full h-full flex flex-col justify-center" style={{ padding: 'clamp(0.5rem, 2vmin, 1.5rem)', gap: 'clamp(1rem, 3vh, 2rem)' }}>
                    {/* Main content box */}
                    <div className="border-2 border-purple-500 dark:border-purple-400 rounded-xl bg-white dark:bg-gray-800" style={{ padding: 'clamp(1.5rem, 4vmin, 3rem)' }}>

                        {/* Problem 1 */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-3">
                                <button
                                    type="button"
                                    onMouseEnter={() => setVideoModal({
                                        isOpen: true,
                                        title: 'Problema de Muñecas',
                                        videoId: VIDEO_IDS.MODULE_DIVISION,
                                        trackingId: VIDEO_TRACKING_IDS.PROB_1
                                    })}
                                    className={`p-2 text-white rounded-full transition-all flex-shrink-0 ${isVideoWatched(VIDEO_TRACKING_IDS.PROB_1)
                                        ? 'bg-green-600 hover:bg-green-700'
                                        : 'bg-purple-600 hover:bg-purple-700'
                                        }`}
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        {isVideoWatched(VIDEO_TRACKING_IDS.PROB_1) ? (
                                            <path d="M8 5v14l11-7z" />
                                        ) : (
                                            <path d="M8 5v14l11-7z" />
                                        )}
                                    </svg>
                                </button>
                                <div className="bg-purple-600 text-white rounded px-4 py-1 font-bold" style={{ fontSize: 'clamp(0.875rem, 2.2vmin, 1.125rem)' }}>
                                    Problema
                                </div>
                            </div>

                            <p className="text-gray-800 dark:text-gray-200 mb-4" style={{ fontSize: 'clamp(0.875rem, 2.2vmin, 1.125rem)', lineHeight: '1.6' }}>
                                Ana y María quieren repartir 12 muñecas entre las dos. ¿Cuántas muñecas tendrán <strong>cada una</strong>?
                            </p>

                            <div className="flex items-center justify-center gap-3 flex-wrap">
                                <input
                                    type="number"
                                    value={problem1Dividend}
                                    onChange={(e) => setProblem1Dividend(e.target.value)}
                                    className="w-20 h-14 text-center border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-xl focus:outline-none focus:border-purple-500"
                                    disabled={problem1Feedback === 'correct'}
                                />
                                <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">÷</span>
                                <input
                                    type="number"
                                    value={problem1Divisor}
                                    onChange={(e) => setProblem1Divisor(e.target.value)}
                                    className="w-20 h-14 text-center border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-xl focus:outline-none focus:border-purple-500"
                                    disabled={problem1Feedback === 'correct'}
                                />
                                <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">=</span>
                                <input
                                    type="number"
                                    value={problem1Quotient}
                                    onChange={(e) => setProblem1Quotient(e.target.value)}
                                    className="w-20 h-14 text-center border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-xl focus:outline-none focus:border-purple-500"
                                    disabled={problem1Feedback === 'correct'}
                                />
                                <button
                                    onClick={handleProblem1Check}
                                    disabled={problem1Feedback === 'correct'}
                                    className={`px-6 py-2 rounded font-bold text-white transition-all ${problem1Feedback === 'correct'
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-purple-600 hover:bg-purple-700'
                                        }`}
                                    style={{ fontSize: 'clamp(0.875rem, 2.2vmin, 1.125rem)' }}
                                >
                                    ¿LISTO?
                                </button>

                                {/* Feedback */}
                                {problem1Feedback === 'correct' && (
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
                                )}
                                {problem1Feedback === 'incorrect' && (
                                    <div className="relative flex items-center gap-3">
                                        <span className="text-orange-500 font-black text-2xl shake-animation">
                                            INCORRECTO
                                        </span>
                                        <button
                                            onClick={handleProblem1Reset}
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
                        </div>

                        {/* Separator */}
                        <div className="border-t border-gray-300 dark:border-gray-600 my-6"></div>

                        {/* Problem 2 */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-3">
                                <button
                                    type="button"
                                    onMouseEnter={() => setVideoModal({
                                        isOpen: true,
                                        title: 'Problema de Cuadernos',
                                        videoId: VIDEO_IDS.MODULE_DIVISION,
                                        trackingId: VIDEO_TRACKING_IDS.PROB_2
                                    })}
                                    className={`p-2 text-white rounded-full transition-all flex-shrink-0 ${isVideoWatched(VIDEO_TRACKING_IDS.PROB_2)
                                        ? 'bg-green-600 hover:bg-green-700'
                                        : 'bg-purple-600 hover:bg-purple-700'
                                        }`}
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        {isVideoWatched(VIDEO_TRACKING_IDS.PROB_2) ? (
                                            <path d="M8 5v14l11-7z" />
                                        ) : (
                                            <path d="M8 5v14l11-7z" />
                                        )}
                                    </svg>
                                </button>
                                <div className="bg-purple-600 text-white rounded px-4 py-1 font-bold" style={{ fontSize: 'clamp(0.875rem, 2.2vmin, 1.125rem)' }}>
                                    Problema
                                </div>
                            </div>

                            <p className="text-gray-800 dark:text-gray-200 mb-4" style={{ fontSize: 'clamp(0.875rem, 2.2vmin, 1.125rem)', lineHeight: '1.6' }}>
                                En la bodega hay 64 cuadernos. Cada paquete trae 8 cuadernos. ¿Cuántos <strong>paquetes completos</strong> se pueden armar?
                            </p>

                            <div className="flex items-center justify-center gap-3 flex-wrap">
                                <input
                                    type="number"
                                    value={problem2Dividend}
                                    onChange={(e) => setProblem2Dividend(e.target.value)}
                                    className="w-20 h-14 text-center border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-xl focus:outline-none focus:border-purple-500"
                                    disabled={problem2Feedback === 'correct'}
                                />
                                <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">÷</span>
                                <input
                                    type="number"
                                    value={problem2Divisor}
                                    onChange={(e) => setProblem2Divisor(e.target.value)}
                                    className="w-20 h-14 text-center border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-xl focus:outline-none focus:border-purple-500"
                                    disabled={problem2Feedback === 'correct'}
                                />
                                <span className="text-2xl font-bold text-gray-800 dark:text-gray-200">=</span>
                                <input
                                    type="number"
                                    value={problem2Quotient}
                                    onChange={(e) => setProblem2Quotient(e.target.value)}
                                    className="w-20 h-14 text-center border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold text-xl focus:outline-none focus:border-purple-500"
                                    disabled={problem2Feedback === 'correct'}
                                />
                                <button
                                    onClick={handleProblem2Check}
                                    disabled={problem2Feedback === 'correct'}
                                    className={`px-6 py-2 rounded font-bold text-white transition-all ${problem2Feedback === 'correct'
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-purple-600 hover:bg-purple-700'
                                        }`}
                                    style={{ fontSize: 'clamp(0.875rem, 2.2vmin, 1.125rem)' }}
                                >
                                    ¿LISTO?
                                </button>

                                {/* Feedback */}
                                {problem2Feedback === 'correct' && (
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
                                )}
                                {problem2Feedback === 'incorrect' && (
                                    <div className="relative flex items-center gap-3">
                                        <span className="text-orange-500 font-black text-2xl shake-animation">
                                            INCORRECTO
                                        </span>
                                        <button
                                            onClick={handleProblem2Reset}
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
                        </div>
                    </div>
                </div>
            </div>
            {/* End of A - ABSTRACTO Box */}
            {/* Video Modal */}
            {/* VideoModal removed */}
        </BookPageContainer >
    );
}   
