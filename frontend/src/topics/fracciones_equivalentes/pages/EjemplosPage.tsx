'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useEffect } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';
import { MdLightbulbOutline } from 'react-icons/md';
import Image from 'next/image';

// Assets
import pizza12Img from '../pizza12.png';
import pizza4Img from '../pizza4.png';

interface Props { zoom?: number; }
//PAGINA 5 ABSTRACTO
// Helper components
const Fraction = ({ num, den, size = "text-3xl", color = "text-black" }: any) => (
    <div className={`inline-flex flex-col items-center align-middle ${size} font-bold px-1`}>
        <span className={color}>{num}</span>
        <div className={`w-full h-0.5 ${color === 'text-white' ? 'bg-white' : 'bg-black'} my-0.5`} />
        <span className={color}>{den}</span>
    </div>
);

const InputBox = ({ value, onChange, disabled, placeholder = '?' }: any) => (
    <input
        type="text"
        className="w-[42px] h-11 text-center rounded-lg text-lg font-black outline-none border-none shadow-sm"
        style={{ backgroundColor: '#d9d9d9' }}
        value={value}
        onChange={e => {
            const val = e.target.value.replace(/\D/g, '').slice(0, 2);
            onChange(val);
        }}
        disabled={disabled}
        placeholder={placeholder}
    />
);

export function EjemplosPage({ zoom = 1 }: Props) {
    const EXERCISE_IDS = {
        SOL1: 'fracciones_equivalentes-pag27-sol1'
    };

    const STAGE_IDS = {
        A_STAGE: 'fracciones_equivalentes-pag27-a-stage'
    };

    const { isVideoWatched, markVideoWatched, submitGame, completeStage, isExerciseCompleted } = useVideoProgress();

    const VIDEO_TRACKING = {
        INTRO: 'fracciones_equivalentes-pag27-v1',
        COMPARISON: 'fracciones_equivalentes-pag27-v2',
        SOLUTIONS: 'fracciones_equivalentes-pag27-v3',
    };

    // Solution 1: Cross Multiplication
    const [sol1, setSol1] = useState({ i1: '', i2: '', i3: '', i4: '', r1: '', r2: '' });
    const [sol1Result, setSol1Result] = useState<'correct' | 'incorrect' | null>(null);

    const [amp2Result, setAmp2Result] = useState<'correct' | 'incorrect' | null>(null);
    const [showHelp, setShowHelp] = useState(false);

    // Initial load sync
    useEffect(() => {
        if (isExerciseCompleted(EXERCISE_IDS.SOL1)) {
            setSol1Result('correct');
            setSol1({ i1: '3', i2: '4', i3: '12', i4: '1', r1: '12', r2: '12' });
        }
    }, [isExerciseCompleted]);

    const checkSol1 = async () => {
        if (isExerciseCompleted(EXERCISE_IDS.SOL1)) return;
        const correct = sol1.i1 === '3' && sol1.i2 === '4' && sol1.i3 === '12' && sol1.i4 === '1' && sol1.r1 === '12' && sol1.r2 === '12';
        setSol1Result(correct ? 'correct' : 'incorrect');
        await submitGame(EXERCISE_IDS.SOL1, correct);
        if (correct) {
            await completeStage(STAGE_IDS.A_STAGE);
        }
    };

    const resetSol1 = () => { if (isExerciseCompleted(EXERCISE_IDS.SOL1)) return; setSol1({ i1: '', i2: '', i3: '', i4: '', r1: '', r2: '' }); setSol1Result(null); };


    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones Equivalentes' }} pageId="frac-equiv-ejemplos">
            <div className="relative ml-2 flex items-start">
                {/* CPA Indicator "A" */}
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#be90de]">
                    A
                </div>

                {/* Content Container */}
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 md:p-8 bg-white border-[#be90de]">
                    {/* --- STAGE A: ABSTRACTO --- */}
                    <div className="space-y-12">
                        {/* HEADER & CONTEXT */}
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <PlayVideoButton trackingId={VIDEO_TRACKING.INTRO} title="" videoId="/pag27/vv-1" />
                                <div className="space-y-4">
                                    <div className="bg-green-600 text-white font-bold px-4 py-1 rounded inline-block text-lg shadow-sm">
                                        Ejemplo:
                                    </div>
                                    <p className="text-base text-gray-800 font-semibold leading-relaxed">
                                        Camilo comió 3 porciones de una pizza cortada en 12 partes iguales. Pedro comió 1 porciones de una pizza cortada en 4 partes iguales.
                                    </p>
                                </div>
                            </div>

                            {/* VISUAL REPRESENTATION */}
                            <div className="flex items-center justify-center gap-10 py-4">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="relative w-52 h-52 rounded-full overflow-hidden shadow-lg border-4 border-gray-100">
                                        <Image src={pizza12Img} alt="Pizza 3/12" layout="fill" objectFit="contain" />
                                    </div>
                                    <Fraction num={<span className="text-blue-700">3</span>} den="12" size="text-4xl" />
                                </div>

                                <div className="flex flex-col items-center gap-4">
                                    <div className="relative w-52 h-52 rounded-full overflow-hidden shadow-lg border-4 border-gray-100">
                                        <Image src={pizza4Img} alt="Pizza 1/4" layout="fill" objectFit="contain" />
                                    </div>
                                    <Fraction num={<span className="text-blue-700">1</span>} den="4" size="text-4xl" />
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pl-6">
                                <p className="text-xl text-gray-800 font-semibold leading-relaxed">
                                    Estos tamaños de la pizza son mismos. Así, ambos representan la misma cantidad.
                                </p>
                                <PlayVideoButton trackingId={VIDEO_TRACKING.COMPARISON} title="" videoId="/pag27/vv-2" />
                            </div>

                            <div className="flex items-center gap-4 pl-6">
                                <p className="text-xl text-gray-800 font-semibold leading-relaxed flex-1">
                                    Por lo tanto, las dos fracciones <Fraction num={<span className="text-blue-700">3</span>} den="12" size="text-2xl" /> y <Fraction num={<span className="text-blue-700">1</span>} den="4" size="text-2xl" /> son equivalentes porque tenemos dos formas de solución:
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.SOLUTIONS} title="" videoId="/pag27/vv-3" />
                                </p>
                            </div>
                        </div>

                        {/* SOLUTIONS SECTION */}
                        <div className="space-y-16 pt-8 border-t-2 border-dashed border-gray-100">
                            {/* OPTION 1: CROSS MULTIPLICATION */}
                            <div className="space-y-8">
                                <div className="flex items-center gap-2 pl-4">
                                    <div className="w-4 h-4 bg-black flex-shrink-0" />
                                    <div className="flex items-center gap-2">
                                        <Fraction num="3" den="12" size="text-2xl" />
                                        <span className="text-2xl font-black text-gray-300">=</span>
                                        <Fraction num="1" den="4" size="text-2xl" />
                                    </div>

                                    <span className="text-2xl text-gray-300 mx-0.5">→</span>

                                    <div className="flex items-center gap-1 p-2 bg-gray-50 rounded-2xl">
                                        <div className="flex flex-col items-center">
                                            <div className="grid grid-cols-[42px_24px_42px_32px_42px_24px_42px] items-center gap-y-3">
                                                {/* Line 1: i1 x i2 = i3 x i4 */}
                                                <InputBox value={sol1.i1} onChange={(v: any) => setSol1({ ...sol1, i1: v })} disabled={sol1Result === 'correct'} />
                                                <div className="flex justify-center text-lg font-black text-gray-800">×</div>
                                                <InputBox value={sol1.i2} onChange={(v: any) => setSol1({ ...sol1, i2: v })} disabled={sol1Result === 'correct'} />
                                                <div className="flex justify-center text-2xl font-black text-gray-400">=</div>
                                                <InputBox value={sol1.i3} onChange={(v: any) => setSol1({ ...sol1, i3: v })} disabled={sol1Result === 'correct'} />
                                                <div className="flex justify-center text-lg font-black text-gray-800">×</div>
                                                <InputBox value={sol1.i4} onChange={(v: any) => setSol1({ ...sol1, i4: v })} disabled={sol1Result === 'correct'} />

                                                {/* Line 2: aligned results under the equals sign */}
                                                <div /> {/* col 1 */}
                                                <div /> {/* col 2 */}
                                                <InputBox value={sol1.r1} onChange={(v: any) => setSol1({ ...sol1, r1: v })} disabled={sol1Result === 'correct'} />
                                                <div className="flex justify-center text-2xl font-black text-gray-500">=</div>
                                                <InputBox value={sol1.r2} onChange={(v: any) => setSol1({ ...sol1, r2: v })} disabled={sol1Result === 'correct'} />
                                                <div /> {/* col 6 */}
                                                <div /> {/* col 7 */}
                                            </div>
                                        </div>
                                        <FeedbackButton onCheck={checkSol1} onReset={resetSol1} status={sol1Result} />
                                    </div>
                                </div>
                            </div>

                            <p className="text-2xl font-bold pl-24 text-gray-400">ó</p>

                            {/* OPTION 2: SIMPLIFICATION */}
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 pl-6">
                                    <div className="w-4 h-4 bg-black flex-shrink-0" />
                                    <div className="flex items-center gap-4">
                                        <Fraction num="3" den="12" size="text-2xl" />
                                        <span className="text-2xl font-black text-gray-400">=</span>

                                        <div className="inline-flex flex-col items-center align-middle text-2xl font-bold px-1">
                                            <div className="flex items-center">
                                                <span className="relative">
                                                    3
                                                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500 rotate-[45deg]" />
                                                </span>
                                                <span> × 1</span>
                                            </div>
                                            <div className="w-full h-0.5 bg-black my-0.5" />
                                            <div className="flex items-center gap-2">
                                                <span className="relative">
                                                    3
                                                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500 rotate-[45deg]" />
                                                </span>
                                                <span> × 2 × 2</span>
                                            </div>
                                        </div>

                                        <span className="text-5xl font-black text-gray-400">=</span>

                                        <div className="inline-flex flex-col items-center align-middle text-2xl font-bold px-1">
                                            <span>1</span>
                                            <div className="w-full h-0.5 bg-black my-0.5" />
                                            <span>2 × 2</span>
                                        </div>

                                        <span className="text-2xl font-black text-gray-400">=</span>
                                        <Fraction num="1" den="4" size="text-2xl" />
                                    </div>

                                    <div
                                        className="relative flex items-center ml-8"
                                        onMouseEnter={() => setShowHelp(true)}
                                        onMouseLeave={() => setShowHelp(false)}
                                    >
                                        <img
                                            src="/shared/iconoLuz.svg"
                                            alt="Icono Luz"
                                            className="w-10 h-10 cursor-help transition-transform hover:scale-110"
                                        />

                                        {showHelp && (
                                            <div className="absolute left-12 top-1/2 -translate-y-96 z-50 w-64 animate-in fade-in zoom-in duration-200">
                                                <img
                                                    src="/shared/ayuda.svg"
                                                    alt="Ayuda"
                                                    className="w-full h-auto drop-shadow-2xl rounded-lg"
                                                    style={{ filter: 'drop-shadow(0 20px 25px rgb(0 0 0 / 0.15))' }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BookPageContainer>
    );
}
