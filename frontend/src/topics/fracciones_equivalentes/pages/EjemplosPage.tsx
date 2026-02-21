'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';
import { MdLightbulbOutline } from 'react-icons/md';
import Image from 'next/image';

// Assets
import pizza12Img from '../pizza12.png';
import pizza4Img from '../pizza4.png';

interface Props { zoom?: number; }

export function EjemplosPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        INTRO: 'frac-equiv-ex-intro',
        COMPARISON: 'frac-equiv-ex-comparison',
        SOLUTIONS: 'frac-equiv-ex-solutions',
    };

    // Solution 1: Cross Multiplication
    const [sol1, setSol1] = useState({ i1: '', i2: '', i3: '', i4: '', r1: '', r2: '' });
    const [sol1Result, setSol1Result] = useState<'correct' | 'incorrect' | null>(null);

    const checkSol1 = () => {
        const correct = sol1.i1 === '3' && sol1.i2 === '4' && sol1.i3 === '12' && sol1.i4 === '1' && sol1.r1 === '12' && sol1.r2 === '12';
        setSol1Result(correct ? 'correct' : 'incorrect');
    };

    const resetSol1 = () => { setSol1({ i1: '', i2: '', i3: '', i4: '', r1: '', r2: '' }); setSol1Result(null); };

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
            className="w-12 h-12 text-center rounded-lg text-xl font-black outline-none border-none shadow-sm"
            style={{ backgroundColor: '#d9d9d9' }}
            value={value}
            onChange={e => onChange(e.target.value)}
            disabled={disabled}
            placeholder={placeholder}
        />
    );

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones Equivalentes' }} pageId="frac-equiv-ejemplos">
            <div className="relative ml-2 flex items-start">
                {/* CPA Indicator "A" */}
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#be90de]">
                    A
                </div>

                {/* Content Container */}
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-10 bg-white border-[#be90de]">
                    <div className="space-y-12">
                        {/* HEADER & CONTEXT */}
                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <PlayVideoButton trackingId={VIDEO_TRACKING.INTRO} title="" videoId="/pag27/vv-1" />
                                <div className="space-y-4">
                                    <div className="bg-green-600 text-white font-bold px-4 py-1 rounded inline-block text-lg italic shadow-sm">
                                        Ejemplo:
                                    </div>
                                    <p className="text-xl text-gray-800 font-semibold leading-relaxed">
                                        Camilo comió 3 porciones de una pizza cortada en 12 partes iguales. Pedro comió 1 porciones de una pizza cortada en 4 partes iguales.
                                    </p>
                                </div>
                            </div>

                            {/* VISUAL REPRESENTATION */}
                            <div className="flex items-center justify-center gap-20 py-4">
                                <div className="flex flex-col items-center gap-6">
                                    <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-lg border-4 border-gray-100">
                                        <Image src={pizza12Img} alt="Pizza 3/12" layout="fill" objectFit="contain" />
                                    </div>
                                    <Fraction num="3" den="12" size="text-5xl" />
                                </div>

                                <div className="flex flex-col items-center gap-6">
                                    <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-lg border-4 border-gray-100">
                                        <Image src={pizza4Img} alt="Pizza 1/4" layout="fill" objectFit="contain" />
                                    </div>
                                    <Fraction num="1" den="4" size="text-5xl" />
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pl-12">
                                <p className="text-xl text-gray-800 font-semibold leading-relaxed">
                                    Estos tamaños de la pizza son mismos. Así, ambos representan la misma cantidad.
                                </p>
                                <PlayVideoButton trackingId={VIDEO_TRACKING.COMPARISON} title="" videoId="/pag27/vv-2" />
                            </div>

                            <div className="flex items-center gap-4 pl-12">
                                <p className="text-xl text-gray-800 font-semibold leading-relaxed flex-1">
                                    Por lo tanto, las dos fracciones <Fraction num="3" den="12" size="text-2xl" /> y <Fraction num="1" den="4" size="text-2xl" /> son equivalentes porque tenemos dos formas de solución:
                                </p>
                                <PlayVideoButton trackingId={VIDEO_TRACKING.SOLUTIONS} title="" videoId="/pag27/vv-3" />
                            </div>
                        </div>

                        {/* SOLUTIONS SECTION */}
                        <div className="space-y-16 pt-8 border-t-2 border-dashed border-gray-100">
                            {/* OPTION 1: CROSS MULTIPLICATION */}
                            <div className="space-y-8">
                                <div className="flex items-center gap-6 pl-12">
                                    <div className="w-4 h-4 bg-black flex-shrink-0" />
                                    <div className="flex items-center gap-6">
                                        <Fraction num="3" den="12" size="text-5xl" />
                                        <span className="text-5xl font-black text-gray-300">=</span>
                                        <Fraction num="1" den="4" size="text-5xl" />
                                    </div>

                                    <span className="text-5xl text-gray-300 mx-4">→</span>

                                    <div className="flex items-center gap-6 p-6 bg-gray-50 rounded-2xl">
                                        <div className="grid grid-rows-2 gap-4">
                                            <div className="flex items-center gap-3">
                                                <InputBox value={sol1.i1} onChange={(v: any) => setSol1({ ...sol1, i1: v })} disabled={sol1Result === 'correct'} />
                                                <span className="text-2xl font-black">×</span>
                                                <InputBox value={sol1.i2} onChange={(v: any) => setSol1({ ...sol1, i2: v })} disabled={sol1Result === 'correct'} />
                                                <span className="text-2xl font-black">=</span>
                                                <InputBox value={sol1.r1} onChange={(v: any) => setSol1({ ...sol1, r1: v })} disabled={sol1Result === 'correct'} />
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <InputBox value={sol1.i3} onChange={(v: any) => setSol1({ ...sol1, i3: v })} disabled={sol1Result === 'correct'} />
                                                <span className="text-2xl font-black">=</span>
                                                <InputBox value={sol1.r2} onChange={(v: any) => setSol1({ ...sol1, r2: v })} disabled={sol1Result === 'correct'} />
                                                <div className="w-12" /> {/* alignment spacer */}
                                                <InputBox value={sol1.i4} onChange={(v: any) => setSol1({ ...sol1, i4: v })} disabled={sol1Result === 'correct'} />
                                            </div>
                                        </div>
                                        <FeedbackButton onCheck={checkSol1} onReset={resetSol1} status={sol1Result} />
                                    </div>
                                </div>
                            </div>

                            <p className="text-2xl font-bold italic pl-24 text-gray-400">ó</p>

                            {/* OPTION 2: SIMPLIFICATION */}
                            <div className="space-y-8">
                                <div className="flex items-center gap-6 pl-12 shrink-0">
                                    <div className="w-4 h-4 bg-black flex-shrink-0" />
                                    <div className="flex items-center gap-6">
                                        <Fraction num="3" den="12" size="text-5xl" />
                                        <span className="text-5xl font-black text-gray-400">=</span>

                                        <div className="inline-flex flex-col items-center align-middle text-4xl font-bold px-1">
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

                                        <div className="inline-flex flex-col items-center align-middle text-4xl font-bold px-1">
                                            <span>1</span>
                                            <div className="w-full h-0.5 bg-black my-0.5" />
                                            <span>2 × 2</span>
                                        </div>

                                        <span className="text-5xl font-black text-gray-400">=</span>
                                        <Fraction num="1" den="4" size="text-5xl" />
                                    </div>

                                    <div className="bg-purple-600 p-2 rounded-lg shadow-md flex items-center justify-center ml-8">
                                        <MdLightbulbOutline className="text-white text-3xl" />
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
