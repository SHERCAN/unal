'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';
import { MdLightbulbOutline } from 'react-icons/md';

interface Props { zoom?: number; }
//PAGINA 4 ABSTRACTO
export function ConceptoAbstracto2Page({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        SIMP_INTRO: 'fracciones_equivalentes-pag26-v1',
        SIMP_EXAMPLE: 'fracciones_equivalentes-pag26-v3',
        SIMP_PRAC: 'fracciones_equivalentes-pag26-v4',
        AMP_INTRO: 'fracciones_equivalentes-pag26-v5',
        AMP_EXAMPLE: 'fracciones_equivalentes-pag26-v6',
        AMP_PRAC: 'fracciones_equivalentes-pag26-v7',
    };

    // --- State for Exercises ---
    const [simpAns, setSimpAns] = useState({ n: '', d: '' });
    const [simpResult, setSimpResult] = useState<'correct' | 'incorrect' | null>(null);

    const [amp1Ans, setAmp1Ans] = useState({ n: '', d: '' });
    const [amp2Ans, setAmp2Ans] = useState({ n: '', d: '' });
    const [amp1Result, setAmp1Result] = useState<'correct' | 'incorrect' | null>(null);
    const [amp2Result, setAmp2Result] = useState<'correct' | 'incorrect' | null>(null);

    const handleSimpCheck = () => {
        if (simpAns.n === '2' && simpAns.d === '5') setSimpResult('correct');
        else setSimpResult('incorrect');
    };

    const handleAmp1Check = () => {
        if (amp1Ans.n === '10' && amp1Ans.d === '15') setAmp1Result('correct');
        else setAmp1Result('incorrect');
    };

    const handleAmp2Check = () => {
        if (amp2Ans.n === '25' && amp2Ans.d === '35') setAmp2Result('correct');
        else setAmp2Result('incorrect');
    };

    const resetSimp = () => { setSimpAns({ n: '', d: '' }); setSimpResult(null); };
    const resetAmp1 = () => { setAmp1Ans({ n: '', d: '' }); setAmp1Result(null); };
    const resetAmp2 = () => { setAmp2Ans({ n: '', d: '' }); setAmp2Result(null); };

    // Helper components
    const Fraction = ({ num, den, size = "text-3xl", color = "text-black" }: any) => (
        <div className={`inline-flex flex-col items-center align-middle ${size} font-bold px-1`}>
            <span className={color}>{num}</span>
            <div className={`w-full h-0.5 ${color === 'text-white' ? 'bg-white' : 'bg-black'} my-0.5`} />
            <span className={color}>{den}</span>
        </div>
    );

    const InputFraction = ({ value, onChange, result, disabled }: any) => (
        <div className="flex flex-col items-center gap-1">
            <input
                type="text"
                className="w-14 h-14 text-center rounded-lg text-2xl font-black outline-none border-none shadow-sm"
                style={{ backgroundColor: '#d9d9d9' }}
                value={value.n}
                onChange={e => onChange({ ...value, n: e.target.value })}
                disabled={disabled}
            />
            <div className="w-14 h-1 bg-black rounded-full" />
            <input
                type="text"
                className="w-14 h-14 text-center rounded-lg text-2xl font-black outline-none border-none shadow-sm"
                style={{ backgroundColor: '#d9d9d9' }}
                value={value.d}
                onChange={e => onChange({ ...value, d: e.target.value })}
                disabled={disabled}
            />
        </div>
    );

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones Equivalentes' }} pageId="frac-equiv-concepto-abstracto-2">
            <div className="relative ml-2 flex items-start">
                {/* CPA Indicator "A" */}
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#be90de]">
                    A
                </div>

                {/* Content Container */}
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-10 bg-white border-[#be90de]">
                    <div className="space-y-16">
                        {/* 1. SIMPLIFICACIÓN */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-4">
                                <PlayVideoButton trackingId={VIDEO_TRACKING.SIMP_INTRO} title="" videoId="/pag26/vv-1" />
                                <div className="text-white font-bold px-6 py-2 rounded-lg text-xl shadow-sm" style={{ backgroundColor: '#e95352' }}>
                                    ¿Qué es una simplificación?
                                </div>
                            </div>

                            <p className="text-xl text-gray-800 font-semibold pl-12 leading-relaxed">
                                <span className="text-[#e95352] font-black">Simplificar una fracción</span> consiste en dividir numerador y denominador por un mismo número.
                            </p>

                            {/* EXAMPLE 1 */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.SIMP_EXAMPLE} title="Ejemplo Simplificación" videoId="/pag26/vv-2" />
                                    <div className="bg-green-600 text-white font-bold px-4 py-1 rounded inline-block text-lg italic shadow-sm">
                                        Ejemplo:
                                    </div>
                                    <p className="text-xl text-gray-800 font-semibold">
                                        Observa cómo se simplificó la siguiente fracción:
                                    </p>
                                </div>

                                <div className="flex items-center justify-center gap-6 py-4 pl-6">
                                    <div className="flex items-center gap-6 shrink-0">
                                        <Fraction num="12" den="20" size="text-5xl" />
                                        <span className="text-5xl font-black text-gray-300">=</span>
                                        <Fraction num="3" den="5" size="text-5xl" />
                                    </div>

                                    <span className="text-5xl text-gray-300 shrink-0">→</span>

                                    <div className="flex items-center gap-8 shrink-0">
                                        <div className="flex items-center gap-4">
                                            <Fraction num="12" den="20" size="text-5xl" />
                                            <span className="text-5xl font-black text-gray-400">=</span>
                                            <div className="inline-flex flex-col items-center align-middle text-4xl font-bold px-1">
                                                <div className="flex items-center">
                                                    <span>3 × </span>
                                                    <span className="relative">
                                                        2
                                                        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500 rotate-[45deg]" />
                                                    </span>
                                                    <span> × </span>
                                                    <span className="relative">
                                                        2
                                                        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500 rotate-[45deg]" />
                                                    </span>
                                                </div>
                                                <div className="w-full h-0.5 bg-black my-0.5" />
                                                <div className="flex items-center">
                                                    <span>5 × </span>
                                                    <span className="relative">
                                                        2
                                                        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500 rotate-[45deg]" />
                                                    </span>
                                                    <span> × </span>
                                                    <span className="relative">
                                                        2
                                                        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-red-500 rotate-[45deg]" />
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="text-5xl font-black text-gray-400">=</span>
                                            <Fraction num="3" den="5" size="text-5xl" />
                                        </div>

                                        <div className="bg-purple-600 p-2 rounded-lg shadow-md flex items-center justify-center shrink-0">
                                            <MdLightbulbOutline className="text-white text-3xl" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 pl-12 w-full">
                                    <p className="text-xl text-gray-800 font-semibold leading-relaxed flex-1">
                                        La fracción <Fraction num="3" den="5" size="text-2xl" /> no se puede simplificar más porque esos números 3 y 5 son primos y no tienen factores.
                                    </p>
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.SIMP_EXAMPLE} title="" videoId="/pag26/vv-3" />
                                </div>
                            </div>

                            {/* PRACTICE 1 */}
                            <div className="space-y-8 pt-4">
                                <div className="flex items-center gap-4">
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.SIMP_PRAC} title="Práctica Simplificación" videoId="/pag26/vv-4" />
                                    <div className="bg-[#800000] text-white font-bold px-6 py-1.5 rounded-sm text-lg shadow-md tracking-wider">
                                        PRÁCTICA
                                    </div>
                                    <p className="text-xl text-gray-800 font-bold italic">
                                        Simplificar la siguiente fracción:
                                    </p>
                                </div>

                                <div className="flex items-center justify-center gap-12 pl-12 bg-gray-50/50 p-8 rounded-2xl relative">
                                    <div className="flex items-center gap-8">
                                        <div className="w-4 h-4 bg-[#800000] flex-shrink-0" />
                                        <Fraction num="4" den="10" size="text-6xl" />
                                        <span className="text-6xl font-black text-gray-300">=</span>
                                        <InputFraction
                                            value={simpAns}
                                            onChange={(val: any) => { setSimpAns(val); setSimpResult(null); }}
                                            disabled={simpResult === 'correct'}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <FeedbackButton
                                            onCheck={handleSimpCheck}
                                            onReset={resetSimp}
                                            status={simpResult}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. AMPLIFICACIÓN */}
                        <div className="space-y-8 pt-8 border-t-2 border-dashed border-gray-100">
                            <div className="flex items-center gap-4">
                                <PlayVideoButton trackingId={VIDEO_TRACKING.AMP_INTRO} title="" videoId="/pag26/vv-5" />
                                <div className="text-white font-bold px-6 py-2 rounded-lg text-xl shadow-sm" style={{ backgroundColor: '#e95352' }}>
                                    ¿Qué es una amplificación?
                                </div>
                            </div>

                            <p className="text-xl text-gray-800 font-semibold pl-12 leading-relaxed">
                                <span className="text-[#e95352] font-black">Amplificar una fracción</span> consiste en multiplicar numerador y denominador por un mismo número.
                            </p>

                            {/* EXAMPLE 2 */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.AMP_EXAMPLE} title="Ejemplo Amplificación" videoId="/pag26/vv-6" />
                                    <div className="bg-green-600 text-white font-bold px-4 py-1 rounded inline-block text-lg italic shadow-sm">
                                        Ejemplo:
                                    </div>
                                    <p className="text-xl text-gray-800 font-semibold">
                                        Observa cómo se amplificó la siguiente fracción:
                                    </p>
                                </div>

                                <div className="flex items-center justify-center gap-6 py-8 pl-6">
                                    <div className="relative flex items-center gap-4 shrink-0">
                                        {/* Arches for x4 */}
                                        <div className="absolute -top-10 left-0 w-full flex justify-center">
                                            <div className="relative group">
                                                <svg className="w-16 h-8 overflow-visible" viewBox="0 0 100 50">
                                                    <path d="M 10 40 Q 50 10 90 40" fill="none" stroke="#e95352" strokeWidth="2" />
                                                    <path d="M 90 40 L 85 35 M 90 40 L 82 40" fill="none" stroke="#e95352" strokeWidth="2" />
                                                </svg>
                                                <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[#e95352] font-black text-xl italic">4</span>
                                            </div>
                                        </div>

                                        <div className="absolute -bottom-10 left-0 w-full flex justify-center">
                                            <div className="relative group">
                                                <svg className="w-16 h-8 overflow-visible" viewBox="0 0 100 50">
                                                    <path d="M 10 10 Q 50 40 90 10" fill="none" stroke="#e95352" strokeWidth="2" />
                                                    <path d="M 90 10 L 85 15 M 90 10 L 82 10" fill="none" stroke="#e95352" strokeWidth="2" />
                                                </svg>
                                                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[#e95352] font-black text-xl italic">4</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-6">
                                            <Fraction num="3" den="5" size="text-5xl" />
                                            <span className="text-5xl font-black text-gray-300">=</span>
                                            <Fraction num="12" den="20" size="text-5xl" />
                                        </div>
                                    </div>

                                    <span className="text-5xl text-gray-300 shrink-0">→</span>

                                    <div className="flex items-center gap-4 shrink-0">
                                        <Fraction num="3" den="5" size="text-5xl" />
                                        <span className="text-5xl font-black text-gray-400">=</span>
                                        <div className="inline-flex flex-col items-center align-middle text-5xl font-bold px-1">
                                            <div className="flex items-center gap-2">
                                                <span>3</span>
                                                <span className="text-[#e95352] text-4xl">4</span>
                                            </div>
                                            <div className="w-full h-0.5 bg-black my-1" />
                                            <div className="flex items-center gap-2">
                                                <span>5</span>
                                                <span className="text-[#e95352] text-4xl">4</span>
                                            </div>
                                        </div>
                                        <span className="text-5xl font-black text-gray-400">=</span>
                                        <Fraction num="12" den="20" size="text-5xl" />
                                    </div>
                                </div>
                            </div>

                            {/* PRACTICE 2 */}
                            <div className="space-y-8 pt-4">
                                <div className="flex items-center gap-4">
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.AMP_PRAC} title="Práctica Amplificación" videoId="/pag26/vv-7" />
                                    <div className="bg-[#800000] text-white font-bold px-6 py-1.5 rounded-sm text-lg shadow-md tracking-wider">
                                        PRÁCTICA
                                    </div>
                                    <p className="text-xl text-gray-800 font-bold italic">
                                        Las dos siguientes fracciones se amplifiquen por 5:
                                    </p>
                                </div>

                                <div className="space-y-12 pl-12">
                                    {/* Exercise 1 */}
                                    <div className="flex items-center gap-12 bg-gray-50/50 p-8 rounded-2xl w-fit">
                                        <div className="flex items-center gap-8">
                                            <div className="w-4 h-4 bg-[#800000] flex-shrink-0" />
                                            <Fraction num="2" den="3" size="text-6xl" />
                                            <span className="text-6xl font-black text-gray-300">=</span>
                                            <InputFraction
                                                value={amp1Ans}
                                                onChange={(val: any) => { setAmp1Ans(val); setAmp1Result(null); }}
                                                disabled={amp1Result === 'correct'}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <FeedbackButton
                                                onCheck={handleAmp1Check}
                                                onReset={resetAmp1}
                                                status={amp1Result}
                                            />
                                        </div>
                                    </div>

                                    {/* Exercise 2 */}
                                    <div className="flex items-center gap-12 bg-gray-50/50 p-8 rounded-2xl w-fit">
                                        <div className="flex items-center gap-8">
                                            <div className="w-4 h-4 bg-[#800000] flex-shrink-0" />
                                            <Fraction num="5" den="7" size="text-6xl" />
                                            <span className="text-6xl font-black text-gray-300">=</span>
                                            <InputFraction
                                                value={amp2Ans}
                                                onChange={(val: any) => { setAmp2Ans(val); setAmp2Result(null); }}
                                                disabled={amp2Result === 'correct'}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <FeedbackButton
                                                onCheck={handleAmp2Check}
                                                onReset={resetAmp2}
                                                status={amp2Result}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* VideoModal removed */}
        </BookPageContainer>
    );
}
