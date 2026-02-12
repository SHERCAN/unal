'use client';

import React, { useState, useEffect } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { VIDEO_IDS } from '@/config/videos';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface DivisionExercisesPageProps {
    zoom?: number;
}

export function ExercisesPage({ zoom = 1 }: DivisionExercisesPageProps) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    // Define tracking IDs for activity videos
    const VIDEO_TRACKING_IDS = {
        ACTIVITY_1: 'division-exercises-activity1',
        ACTIVITY_3: 'division-exercises-activity3'
    };

    const [videoModal, setVideoModal] = useState<{ isOpen: boolean; title: string; videoId?: string; trackingId?: string }>({
        isOpen: false,
        title: '',
        videoId: undefined,
        trackingId: undefined
    });

    // Use a ref to store the current tracking ID so it persists even after modal closes
    const currentTrackingIdRef = React.useRef<string | undefined>(undefined);

    const handleVideoComplete = () => {
        const idToMark = currentTrackingIdRef.current;
        if (idToMark) {
            markVideoWatched(idToMark);
            currentTrackingIdRef.current = undefined;
        }
    };

    // Activity 1 State
    const [act1Selected, setAct1Selected] = useState<number | null>(null);
    const [act1Feedback, setAct1Feedback] = useState<'correct' | 'incorrect' | null>(null);

    // Activity 2 State
    const [act2Inputs, setAct2Inputs] = useState({ q1: '', q2: '', q3: '' });
    const [act2Feedback, setAct2Feedback] = useState<'correct' | 'incorrect' | null>(null);

    // Activity 3 State
    const [act3Toggles, setAct3Toggles] = useState({ q1: false, q2: false, q3: false }); // true means F is selected
    const [act3Feedback, setAct3Feedback] = useState<'correct' | 'incorrect' | null>(null);

    // Load completed exercises from backend on mount
    useEffect(() => {
        const loadCompletedExercises = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('/api/users/exercises', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const completed = await response.json();

                    // Activity 1
                    if (completed[VIDEO_TRACKING_IDS.ACTIVITY_1]?.completed) {
                        setAct1Selected(8);
                        setAct1Feedback('correct');
                    }

                    // Activity 2
                    if (completed['division-exercises-activity2']?.completed) {
                        setAct2Inputs({ q1: '4', q2: '4', q3: '9' });
                        setAct2Feedback('correct');
                    }

                    // Activity 3
                    if (completed[VIDEO_TRACKING_IDS.ACTIVITY_3]?.completed) {
                        setAct3Toggles({ q1: false, q2: true, q3: true });
                        setAct3Feedback('correct');
                    }
                }
            } catch (error) {
                console.error('Error loading completed exercises:', error);
            }
        };

        loadCompletedExercises();
    }, []);


    // Handlers
    const handleAct1Check = async () => {
        const isCorrect = act1Selected === 8;
        setAct1Feedback(isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            // Auto-select correct answer once completed
            setAct1Selected(8);
        }

        // ALWAYS submit to backend (both correct and incorrect attempts)
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/users/exercises', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    exerciseId: VIDEO_TRACKING_IDS.ACTIVITY_1,
                    isCorrect
                })
            });

            const data = await response.json();
            if (data.pointsAdded > 0) {
                console.log(`¡Ganaste ${data.pointsAdded} puntos ${data.pointType === 'definitive' ? 'definitivos' : 'flexibles'}!`);
                // Trigger storage event to refresh dashboard
                window.dispatchEvent(new Event('storage'));
            }
        } catch (error) {
            console.error('Error submitting exercise:', error);
        }
    };

    const handleAct2Check = async () => {
        const isCorrect = act2Inputs.q1 === '4' && act2Inputs.q2 === '4' && act2Inputs.q3 === '9';
        setAct2Feedback(isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            // Auto-fill correct answers once completed
            setAct2Inputs({ q1: '4', q2: '4', q3: '9' });
        }

        // ALWAYS submit to backend (both correct and incorrect attempts)
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/users/exercises', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    exerciseId: 'division-exercises-activity2',
                    isCorrect
                })
            });

            const data = await response.json();
            if (data.pointsAdded > 0) {
                console.log(`¡Ganaste ${data.pointsAdded} puntos ${data.pointType === 'definitive' ? 'definitivos' : 'flexibles'}!`);
                window.dispatchEvent(new Event('storage'));
            }
        } catch (error) {
            console.error('Error submitting exercise:', error);
        }
    };

    const handleAct3Check = async () => {
        // q1: 56/7=8 (Correct) -> F should be false
        // q2: 45/9=6 (False, is 5) -> F should be true
        // q3: 72/6=14 (False, is 12) -> F should be true
        const isCorrect = !act3Toggles.q1 && act3Toggles.q2 && act3Toggles.q3;
        setAct3Feedback(isCorrect ? 'correct' : 'incorrect');

        if (isCorrect) {
            // Auto-set correct answers once completed
            setAct3Toggles({ q1: false, q2: true, q3: true });
        }

        // ALWAYS submit to backend (both correct and incorrect attempts)
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/users/exercises', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    exerciseId: VIDEO_TRACKING_IDS.ACTIVITY_3,
                    isCorrect
                })
            });

            const data = await response.json();
            if (data.pointsAdded > 0) {
                console.log(`¡Ganaste ${data.pointsAdded} puntos ${data.pointType === 'definitive' ? 'definitivos' : 'flexibles'}!`);
                window.dispatchEvent(new Event('storage'));
            }
        } catch (error) {
            console.error('Error submitting exercise:', error);
        }
    };

    // Reset handlers
    const resetAct1 = () => { setAct1Selected(null); setAct1Feedback(null); };
    const resetAct2 = () => { setAct2Inputs({ q1: '', q2: '', q3: '' }); setAct2Feedback(null); };
    const resetAct3 = () => { setAct3Toggles({ q1: false, q2: false, q3: false }); setAct3Feedback(null); };

    return (
        <BookPageContainer
            zoom={zoom}
            moduleHeader={{
                icon: '/division-icon.png',
                name: 'División' // Keeping module name
            }}
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

                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }

                .celebrate-animation { animation: celebrate 0.6s ease-in-out; }
                .shake-animation { animation: shake 0.5s ease-in-out; }
                
                .confetti-particle {
                    position: absolute;
                    width: 10px;
                    height: 10px;
                    animation: confetti 1.5s ease-out forwards;
                }
            `}</style>

            {/* Page Header */}
            <div className="flex flex-col items-center mb-8">
                <h1 className="text-3xl font-black text-purple-600 tracking-wider">EJERCICIOS</h1>
                <div className="w-32 h-1 bg-purple-600 mt-1"></div>
            </div>

            <div className="space-y-12">

                {/* ACTIVITY 1 */}
                <div className="relative">
                    <div className="flex gap-4">
                        {/* Number Box */}
                        <div className="w-16 h-16 bg-purple-700 text-white flex items-center justify-center text-4xl font-black rounded-lg flex-shrink-0">
                            1
                        </div>

                        <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-3">
                                <button
                                    onMouseEnter={() => {
                                        currentTrackingIdRef.current = VIDEO_TRACKING_IDS.ACTIVITY_1;
                                        setVideoModal({
                                            isOpen: true,
                                            title: 'Actividad 1',
                                            videoId: VIDEO_IDS.MODULE_DIVISION,
                                            trackingId: VIDEO_TRACKING_IDS.ACTIVITY_1
                                        });
                                    }}
                                    className={`p-2 text-white rounded-full transition-all ${isVideoWatched(VIDEO_TRACKING_IDS.ACTIVITY_1)
                                        ? 'bg-green-600 hover:bg-green-700'
                                        : 'bg-purple-600 hover:bg-purple-700'
                                        }`}
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        {isVideoWatched(VIDEO_TRACKING_IDS.ACTIVITY_1) ? (
                                            <path d="M8 5v14l11-7z" />
                                        ) : (
                                            <path d="M8 5v14l11-7z" />
                                        )}
                                    </svg>
                                </button>

                            </div>

                            <p className="text-gray-800 dark:text-gray-200 text-lg">
                                Reparte 24 fichas en 3 cajas. Arrastra las fichas para distribuirlas en partes iguales. ¿Cuántas fichas hay en cada caja?
                            </p>

                            <div className="flex items-center gap-4 flex-wrap mt-4">
                                {[7, 3, 6, 9].map((num) => {
                                    // Using 3 instead of 8 to match visual if strict, BUT mathematical answer is 8.
                                    // User plan said "Assuming 8 is an option". Let's put 8 actually.
                                    // If user said "apply corrections", relying on 24/3=8.
                                    // Wait, the design image had "7  3  6  9". 24/3 IS 8. Maybe the question is different or I misread?
                                    // "Reparte 24 fichas en 3 cajas". 24/3 = 8.
                                    // If the image shows 7, 3, 6, 9... maybe the boxes are 3? "hay 3 cajas".
                                    // I'll stick to MATH CORRECTNESS: 8. So options: 7, 8, 6, 9.
                                    return null;
                                })}
                                {[7, 8, 6, 9].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setAct1Selected(num)}
                                        disabled={act1Feedback === 'correct'}
                                        className={`w-16 h-16 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-2xl font-bold text-gray-700 dark:text-gray-300 transition-all
                                            ${act1Feedback === 'correct' ? 'opacity-50 cursor-not-allowed' : ''}
                                            ${act1Selected === num ? 'ring-4 ring-purple-500 bg-purple-100 dark:bg-purple-900' : 'hover:bg-gray-300 dark:hover:bg-gray-600'}
                                        `}
                                    >
                                        {num}
                                    </button>
                                ))}

                                <button
                                    onClick={handleAct1Check}
                                    disabled={act1Feedback === 'correct'}
                                    className={`px-6 py-2 rounded font-bold text-white transition-all ml-4 ${act1Feedback === 'correct'
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-purple-700 hover:bg-purple-800'
                                        }`}
                                >
                                    ¿LISTO?
                                </button>

                                {act1Feedback === 'correct' && (
                                    <div className="relative flex items-center gap-2">
                                        <span className="text-green-600 font-black text-2xl celebrate-animation">
                                            ✓ CORRECTO
                                        </span>
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

                                {act1Feedback === 'incorrect' && (
                                    <div className="relative flex items-center gap-3">
                                        <span className="text-orange-500 font-black text-2xl shake-animation">
                                            INCORRECTO
                                        </span>
                                        <button
                                            onClick={resetAct1}
                                            className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all"
                                            title="Reintentar"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ACTIVITY 2 */}
                <div className="relative">
                    <div className="flex gap-4">
                        <div className="w-16 h-16 bg-purple-700 text-white flex items-center justify-center text-4xl font-black rounded-lg flex-shrink-0">
                            2
                        </div>
                        <div className="flex-1 space-y-6">


                            <div className="space-y-4">
                                {/* I */}
                                <div className="flex items-center gap-4 text-3xl font-black text-gray-800 dark:text-gray-200">
                                    <div className="w-10 h-10 bg-purple-700 text-white text-xl flex items-center justify-center rounded">I</div>
                                    <span>20 ÷ 5 =</span>
                                    <input
                                        type="text"
                                        value={act2Inputs.q1}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/[^0-9]/g, '');
                                            setAct2Inputs({ ...act2Inputs, q1: val });
                                        }}
                                        disabled={act2Feedback === 'correct'}
                                        className={`w-16 h-12 bg-gray-200 dark:bg-gray-700 rounded text-center focus:outline-none focus:ring-2 focus:ring-purple-500 font-bold text-xl ${act2Feedback === 'correct' ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                        inputMode="numeric"
                                    />
                                </div>
                                {/* II */}
                                <div className="flex items-center gap-4 text-3xl font-black text-gray-800 dark:text-gray-200">
                                    <div className="w-10 h-10 bg-purple-700 text-white text-xl flex items-center justify-center rounded">II</div>
                                    <span>32 ÷ 8 =</span>
                                    <input
                                        type="text"
                                        value={act2Inputs.q2}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/[^0-9]/g, '');
                                            setAct2Inputs({ ...act2Inputs, q2: val });
                                        }}
                                        disabled={act2Feedback === 'correct'}
                                        className={`w-16 h-12 bg-gray-200 dark:bg-gray-700 rounded text-center focus:outline-none focus:ring-2 focus:ring-purple-500 font-bold text-xl ${act2Feedback === 'correct' ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                        inputMode="numeric"
                                    />
                                </div>
                                {/* III */}
                                <div className="flex items-center gap-4 text-3xl font-black text-gray-800 dark:text-gray-200">
                                    <div className="w-10 h-10 bg-purple-700 text-white text-xl flex items-center justify-center rounded">III</div>
                                    <span>81 ÷ 9 =</span>
                                    <input
                                        type="text"
                                        value={act2Inputs.q3}
                                        onChange={(e) => {
                                            const val = e.target.value.replace(/[^0-9]/g, '');
                                            setAct2Inputs({ ...act2Inputs, q3: val });
                                        }}
                                        disabled={act2Feedback === 'correct'}
                                        className={`w-16 h-12 bg-gray-200 dark:bg-gray-700 rounded text-center focus:outline-none focus:ring-2 focus:ring-purple-500 font-bold text-xl ${act2Feedback === 'correct' ? 'opacity-50 cursor-not-allowed' : ''
                                            }`}
                                        inputMode="numeric"
                                    />
                                    <div className="flex items-center gap-3 ml-8">
                                        <button
                                            onClick={handleAct2Check}
                                            disabled={act2Feedback === 'correct'}
                                            className={`px-6 py-2 rounded font-bold text-white transition-all text-lg ${act2Feedback === 'correct'
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-purple-700 hover:bg-purple-800'
                                                }`}
                                        >
                                            ¿LISTO?
                                        </button>

                                        {act2Feedback === 'correct' && (
                                            <div className="relative flex items-center gap-2">
                                                <span className="text-green-600 font-black text-2xl celebrate-animation">
                                                    ✓ CORRECTO
                                                </span>
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

                                        {act2Feedback === 'incorrect' && (
                                            <div className="relative flex items-center gap-3">
                                                <span className="text-orange-500 font-black text-2xl shake-animation">
                                                    INCORRECTO
                                                </span>
                                                <button
                                                    onClick={resetAct2}
                                                    className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all"
                                                    title="Reintentar"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ACTIVITY 3 */}
                <div className="relative">
                    <div className="flex gap-4">
                        <div className="w-16 h-16 bg-purple-700 text-white flex items-center justify-center text-4xl font-black rounded-lg flex-shrink-0">
                            3
                        </div>
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center gap-3">
                                <button
                                    onMouseEnter={() => {
                                        currentTrackingIdRef.current = VIDEO_TRACKING_IDS.ACTIVITY_3;
                                        setVideoModal({
                                            isOpen: true,
                                            title: 'Actividad 3',
                                            videoId: VIDEO_IDS.MODULE_DIVISION,
                                            trackingId: VIDEO_TRACKING_IDS.ACTIVITY_3
                                        });
                                    }}
                                    className={`p-2 text-white rounded-full transition-all ${isVideoWatched(VIDEO_TRACKING_IDS.ACTIVITY_3)
                                        ? 'bg-green-600 hover:bg-green-700'
                                        : 'bg-purple-600 hover:bg-purple-700'
                                        }`}
                                >
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        {isVideoWatched(VIDEO_TRACKING_IDS.ACTIVITY_3) ? (
                                            <path d="M8 5v14l11-7z" />
                                        ) : (
                                            <path d="M8 5v14l11-7z" />
                                        )}
                                    </svg>
                                </button>
                                <span className="text-gray-800 dark:text-gray-200 text-lg">
                                    Encuentra la división falsa (<span className="text-red-500 font-bold">F</span>). ¿Cuál está <strong>incorrecta</strong>?
                                </span>
                            </div>

                            <div className="space-y-4 pl-4">
                                {/* I */}
                                <div className="flex items-center gap-4 text-3xl font-black text-gray-800 dark:text-gray-200">
                                    <div className="w-10 h-10 bg-purple-700 text-white text-xl flex items-center justify-center rounded">I</div>
                                    <span>56 ÷ 7 = 8</span>
                                    <span>→</span>
                                    <button
                                        onClick={() => setAct3Toggles({ ...act3Toggles, q1: !act3Toggles.q1 })}
                                        disabled={act3Feedback === 'correct'}
                                        className={`w-12 h-12 rounded border-2 flex items-center justify-center text-xl font-bold transition-all
                                            ${act3Feedback === 'correct' ? 'opacity-50 cursor-not-allowed' : ''}
                                            ${act3Toggles.q1 ? 'bg-red-100 border-red-500 text-red-500' : 'bg-gray-100 border-gray-300 text-gray-300'}
                                        `}
                                    >
                                        F
                                    </button>
                                </div>
                                {/* II */}
                                <div className="flex items-center gap-4 text-3xl font-black text-gray-800 dark:text-gray-200">
                                    <div className="w-10 h-10 bg-purple-700 text-white text-xl flex items-center justify-center rounded">II</div>
                                    <span>45 ÷ 9 = 6</span>
                                    <span>→</span>
                                    <button
                                        onClick={() => setAct3Toggles({ ...act3Toggles, q2: !act3Toggles.q2 })}
                                        disabled={act3Feedback === 'correct'}
                                        className={`w-12 h-12 rounded border-2 flex items-center justify-center text-xl font-bold transition-all
                                            ${act3Feedback === 'correct' ? 'opacity-50 cursor-not-allowed' : ''}
                                            ${act3Toggles.q2 ? 'bg-red-100 border-red-500 text-red-500' : 'bg-gray-100 border-gray-300 text-gray-300'}
                                        `}
                                    >
                                        F
                                    </button>
                                </div>
                                {/* III */}
                                <div className="flex items-center gap-4 text-3xl font-black text-gray-800 dark:text-gray-200">
                                    <div className="w-10 h-10 bg-purple-700 text-white text-xl flex items-center justify-center rounded">III</div>
                                    <span>72 ÷ 6 = 14</span>
                                    <span>→</span>
                                    <button
                                        onClick={() => setAct3Toggles({ ...act3Toggles, q3: !act3Toggles.q3 })}
                                        disabled={act3Feedback === 'correct'}
                                        className={`w-12 h-12 rounded border-2 flex items-center justify-center text-xl font-bold transition-all
                                            ${act3Feedback === 'correct' ? 'opacity-50 cursor-not-allowed' : ''}
                                            ${act3Toggles.q3 ? 'bg-red-100 border-red-500 text-red-500' : 'bg-gray-100 border-gray-300 text-gray-300'}
                                        `}
                                    >
                                        F
                                    </button>
                                    <div className="flex items-center gap-3 ml-8">
                                        <button
                                            onClick={handleAct3Check}
                                            disabled={act3Feedback === 'correct'}
                                            className={`px-6 py-2 rounded font-bold text-white transition-all text-lg ${act3Feedback === 'correct'
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-purple-700 hover:bg-purple-800'
                                                }`}
                                        >
                                            ¿LISTO?
                                        </button>

                                        {act3Feedback === 'correct' && (
                                            <div className="relative flex items-center gap-2">
                                                <span className="text-green-600 font-black text-2xl celebrate-animation">
                                                    ✓ CORRECTO
                                                </span>
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

                                        {act3Feedback === 'incorrect' && (
                                            <div className="relative flex items-center gap-3">
                                                <span className="text-orange-500 font-black text-2xl shake-animation">
                                                    INCORRECTO
                                                </span>
                                                <button
                                                    onClick={resetAct3}
                                                    className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all"
                                                    title="Reintentar"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Video Modal */}
            <VideoModal
                isOpen={videoModal.isOpen}
                title={videoModal.title}
                videoId={videoModal.videoId}
                onClose={() => setVideoModal({ isOpen: false, title: '', videoId: undefined, trackingId: undefined })}
                canSkip={videoModal.videoId ? isVideoWatched(videoModal.trackingId || videoModal.videoId) : false}
                onComplete={handleVideoComplete}
            />
        </BookPageContainer>
    );
}
