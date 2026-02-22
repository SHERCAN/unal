'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';
import React, { useState, useCallback } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';
import Image from 'next/image';
import { MdLightbulbOutline } from 'react-icons/md';

// Assets
import circulo1 from '../circulo1.png';
import circulo2 from '../circulo2.png';
import circulo3 from '../circulo3.png';
import cebra1 from '../cebra1.png';
import cebra2 from '../cebra2.png';
import cebra3 from '../cebra3.png';
import linea1 from '../linea1.png';
import linea2 from '../linea2.png';
import linea3 from '../linea3.png';
import image109 from '../image 109.png';

interface Props { zoom?: number; }
//PAGINA 6 EJERCICIOS
export function EjerciciosPage({ zoom = 1 }: Props) {
    const { submitExercise } = useVideoProgress();

    const VIDEO_TRACKING = {
        I1: 'fracciones_equivalentes-pag28-v1',
        I2: 'fracciones_equivalentes-pag28-v2',
        I3: 'fracciones_equivalentes-pag28-v3',
        I4: 'fracciones_equivalentes-pag28-v4',
    };

    // --- ACTIVITY 1: MATCHING ---
    const [act1, setAct1] = useState<Record<number, number | null>>({ 0: null, 1: null, 2: null });
    const [act1Result, setAct1Result] = useState<'correct' | 'incorrect' | null>(null);
    const act1Answers = { 0: 1, 1: 0, 2: 2 }; // Index of correct option (circulo2=1, cebra1=0, linea3=2)

    const checkAct1 = async () => {
        const correct = act1[0] === 1 && act1[1] === 0 && act1[2] === 2;
        setAct1Result(correct ? 'correct' : 'incorrect');
        await submitExercise('frac-equiv-match', correct);
    };

    // --- ACTIVITY 2: AMPLIFICATION ---
    const [act2, setAct2] = useState<Record<number, string>>({});
    const [act2Result, setAct2Result] = useState<'correct' | 'incorrect' | null>(null);
    const act2Answers = { 0: '28', 1: '4', 2: '18', 3: '3', 4: '25' };

    const checkAct2 = async () => {
        const correct = Object.keys(act2Answers).every(k => act2[parseInt(k)] === act2Answers[parseInt(k) as keyof typeof act2Answers]);
        setAct2Result(correct ? 'correct' : 'incorrect');
        await submitExercise('frac-equiv-amp-exercises', correct);
    };

    // --- ACTIVITY 3: SIMPLIFICATION ---
    const [act3, setAct3] = useState<Record<number, string>>({});
    const [act3Results, setAct3Results] = useState<Record<number, 'correct' | 'incorrect' | null>>({ 0: null, 1: null, 2: null });
    const act3Answers = { 0: '1', 1: '2', 2: '1', 3: '3', 4: '5', 5: '6' };

    const checkSubAct3 = async (idx: number) => {
        const isCorrect = act3[idx * 2] === act3Answers[idx * 2 as keyof typeof act3Answers] &&
            act3[idx * 2 + 1] === act3Answers[(idx * 2 + 1) as keyof typeof act3Answers];

        setAct3Results(prev => ({ ...prev, [idx]: isCorrect ? 'correct' : 'incorrect' }));
        await submitExercise(`frac-equiv-simp-prime-${idx}`, isCorrect);
    };

    // --- ACTIVITY 4: TRUE/FALSE ---
    const [act4, setAct4] = useState<Record<number, 'V' | 'F' | null>>({});
    const [act4Results, setAct4Results] = useState<Record<number, 'correct' | 'incorrect' | null>>({ 0: null, 1: null, 2: null, 3: null });
    const act4Answers = { 0: 'V', 1: 'V', 2: 'F', 3: 'F' };

    const checkSubAct4 = async (idx: number) => {
        const isCorrect = act4[idx] === act4Answers[idx as keyof typeof act4Answers];
        setAct4Results(prev => ({ ...prev, [idx]: isCorrect ? 'correct' : 'incorrect' }));
        await submitExercise(`frac-equiv-vf-${idx}`, isCorrect);
    };

    // HELPERS
    const Fraction = ({ num, den, size = "text-3xl" }: any) => (
        <div className={`inline-flex flex-col items-center align-middle ${size} font-bold px-1`}>
            <span>{num}</span>
            <div className={`w-full h-0.5 bg-black my-0.5`} />
            <span>{den}</span>
        </div>
    );

    const InputBox = ({ value, onChange, disabled, width = "w-12" }: any) => (
        <input
            type="text"
            inputMode="numeric"
            className={`${width} h-11 text-center rounded-lg text-3xl font-bold outline-none border-none shadow-sm`}
            style={{ backgroundColor: '#e2e2e2' }}
            value={value || ''}
            onChange={e => {
                const val = e.target.value;
                if (val === '' || /^[0-9]*$/.test(val)) {
                    onChange(val);
                }
            }}
            disabled={disabled}
        />
    );

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones Equivalentes' }} pageId="frac-equiv-ejercicios">
            <h2 className="text-3xl font-black text-purple-700 mb-8 pl-12">EJERCICIOS</h2>

            <div className="space-y-16">
                {/* 1. MATCHING MODELS */}
                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <PlayVideoButton trackingId={VIDEO_TRACKING.I1} title="" videoId="/pag28/vv-1" />
                        <div className="bg-purple-700 text-white w-10 h-10 flex items-center justify-center rounded-lg font-black text-xl">1</div>
                        <p className="text-xl font-bold text-gray-800">
                            Cada par de fracciones equivalentes dadas corresponden correctamente a una de tres pares de figuras.
                        </p>
                    </div>

                    <div className="pl-16 space-y-12">
                        {/* Row 1: 1/3 = 3/9 */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4 w-[150px] flex-shrink-0">
                                <div className="w-4 h-4 bg-purple-700 flex-shrink-0" />
                                <div className="flex items-center gap-4">
                                    <Fraction num="1" den="3" size="text-4xl" />
                                    <span className="text-4xl font-black text-gray-300">=</span>
                                    <Fraction num="3" den="9" size="text-4xl" />
                                </div>
                            </div>
                            <span className="text-4xl text-gray-300 w-12 text-center">→</span>
                            <div className="flex gap-3">
                                {[circulo1, circulo2, circulo3].map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => { if (act1Result !== 'correct') setAct1({ ...act1, 0: i }); setAct1Result(null); }}
                                        className={`p-2 border-2 rounded-xl transition-all shadow-sm ${act1[0] === i ? 'border-purple-600 bg-purple-50' : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50'}`}
                                    >
                                        <div className="relative w-32 h-16">
                                            <Image src={img} alt="model" layout="fill" objectFit="contain" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Row 2: 2/7 = 6/21 */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4 w-[150px] flex-shrink-0">
                                <div className="w-4 h-4 bg-purple-700 flex-shrink-0" />
                                <div className="flex items-center gap-4">
                                    <Fraction num="2" den="7" size="text-4xl" />
                                    <span className="text-4xl font-black text-gray-300">=</span>
                                    <Fraction num="6" den="21" size="text-4xl" />
                                </div>
                            </div>
                            <span className="text-4xl text-gray-300 w-12 text-center">→</span>
                            <div className="flex gap-3">
                                {[cebra1, cebra2, cebra3].map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => { if (act1Result !== 'correct') setAct1({ ...act1, 1: i }); setAct1Result(null); }}
                                        className={`p-2 border-2 rounded-xl transition-all shadow-sm ${act1[1] === i ? 'border-purple-600 bg-purple-50' : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50'}`}
                                    >
                                        <div className="relative w-32 h-16">
                                            <Image src={img} alt="model" layout="fill" objectFit="contain" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Row 3: 4/8 = 2/4 = 1/2 */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-4 w-[150px] flex-shrink-0">
                                <div className="w-4 h-4 bg-purple-700 flex-shrink-0" />
                                <div className="flex items-center gap-3">
                                    <Fraction num="4" den="8" size="text-3xl" />
                                    <span className="text-2xl font-black text-gray-300">=</span>
                                    <Fraction num="2" den="4" size="text-3xl" />
                                    <span className="text-2xl font-black text-gray-300">=</span>
                                    <Fraction num="1" den="2" size="text-3xl" />
                                </div>
                            </div>
                            <span className="text-4xl text-gray-300 w-12 text-center">→</span>
                            <div className="flex gap-3">
                                {[linea1, linea2, linea3].map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => { if (act1Result !== 'correct') setAct1({ ...act1, 2: i }); setAct1Result(null); }}
                                        className={`p-2 border-2 rounded-xl transition-all shadow-sm ${act1[2] === i ? 'border-purple-600 bg-purple-50' : 'border-gray-100 bg-gray-50/50 hover:bg-gray-50'}`}
                                    >
                                        <div className="relative w-32 h-16">
                                            <Image src={img} alt="model" layout="fill" objectFit="contain" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end pr-24">
                        <FeedbackButton status={act1Result} onCheck={checkAct1} onReset={() => { setAct1({ 0: null, 1: null, 2: null }); setAct1Result(null); }} />
                    </div>
                </div>

                {/* 2. FILL MISSING (AMP) */}
                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <PlayVideoButton trackingId={VIDEO_TRACKING.I2} title="" videoId="/pag28/vv-2" />
                        <div className="bg-purple-700 text-white w-10 h-10 flex items-center justify-center rounded-lg font-black text-xl">2</div>
                        <p className="text-xl font-bold text-gray-800">
                            Escribe el número que falta para que cada par de fracciones sean equivalentes, usando la amplificación.
                        </p>
                    </div>

                    <div className="pl-16 grid grid-cols-5 gap-8">
                        {[
                            { f1: [2, 7], f2: [8, '?'] },
                            { f1: [2, 3], f2: ['?', 6] },
                            { f1: [5, 6], f2: [15, '?'] },
                            { f1: [1, 3], f2: ['?', 9] },
                            { f1: [2, 5], f2: [10, '?'] }
                        ].map((ex, i) => (
                            <div key={i} className="flex flex-col items-center gap-4">
                                <div className="flex items-center gap-1">
                                    <div className="w-3 h-3 bg-purple-700 flex-shrink-0 mr-1" />
                                    <Fraction num={ex.f1[0]} den={ex.f1[1]} size="text-3xl" />
                                    <span className="text-3xl font-black text-gray-300 mx-1">=</span>
                                    <Fraction
                                        num={ex.f2[0] === '?' ? <InputBox value={act2[i * 2] || ''} onChange={(v: any) => setAct2({ ...act2, [i * 2]: v })} /> : ex.f2[0]}
                                        den={ex.f2[1] === '?' ? <InputBox value={act2[i * 2 + 1] || ''} onChange={(v: any) => setAct2({ ...act2, [i * 2 + 1]: v })} /> : ex.f2[1]}
                                        size="text-3xl"
                                    />
                                </div>
                                <FeedbackButton
                                    status={act2Result === 'correct' ? 'correct' : act2Result === 'incorrect' ? 'incorrect' : null}
                                    onCheck={checkAct2}
                                    onReset={() => { setAct2({}); setAct2Result(null); }}
                                    className="scale-75"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. SIMPLIFICATION PRIME */}
                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <PlayVideoButton trackingId={VIDEO_TRACKING.I3} title="" videoId="/pag28/vv-3" />
                        <div className="bg-purple-700 text-white w-10 h-10 flex items-center justify-center rounded-lg font-black text-xl">3</div>
                        <p className="text-xl font-bold text-gray-800">
                            Simplifiquen las siguientes fracciones, usando factores primos:
                        </p>
                    </div>

                    <div className="pl-6 flex items-start gap-4 max-w-full overflow-hidden">
                        {[
                            { num: "8", den: "16", idx: 0 },
                            { num: "3", den: "9", idx: 1 },
                            { num: "15", den: "18", idx: 2 }
                        ].map((ex, i) => (
                            <div key={i} className="flex flex-col items-center gap-1 group">
                                <div className="flex items-center gap-1.5 p-1.5 rounded-lg border border-transparent hover:border-purple-100 transition-colors">
                                    <div className="w-2 h-2 bg-purple-700 flex-shrink-0" />
                                    <Fraction num={ex.num} den={ex.den} size="text-2xl" />
                                    <span className="text-xl font-black text-gray-300">=</span>
                                    <Fraction
                                        num={<InputBox value={act3[ex.idx * 2]} onChange={(v: any) => { setAct3({ ...act3, [ex.idx * 2]: v }); setAct3Results({ ...act3Results, [ex.idx]: null }); }} width="w-10" />}
                                        den={<InputBox value={act3[ex.idx * 2 + 1]} onChange={(v: any) => { setAct3({ ...act3, [ex.idx * 2 + 1]: v }); setAct3Results({ ...act3Results, [ex.idx]: null }); }} width="w-10" />}
                                        size="text-2xl"
                                    />
                                </div>
                                <FeedbackButton
                                    status={act3Results[ex.idx]}
                                    onCheck={() => checkSubAct3(ex.idx)}
                                    onReset={() => { setAct3({ ...act3, [ex.idx * 2]: '', [ex.idx * 2 + 1]: '' }); setAct3Results({ ...act3Results, [ex.idx]: null }); }}
                                    className="scale-[0.6] origin-top"
                                />
                            </div>
                        ))}

                        <div className="bg-purple-600 p-1.5 rounded-lg shadow-sm flex-shrink-0 self-start mt-2 ml-auto mr-12 hover:bg-purple-700 transition-colors cursor-help">
                            <MdLightbulbOutline className="text-white text-2xl" />
                        </div>
                    </div>
                </div>

                {/* 4. TRUE OR FALSE */}
                <div className="space-y-8">
                    <div className="flex items-center gap-4">
                        <PlayVideoButton trackingId={VIDEO_TRACKING.I4} title="" videoId="/pag28/vv-4" />
                        <div className="bg-purple-700 text-white w-10 h-10 flex items-center justify-center rounded-lg font-black text-xl">4</div>
                        <p className="text-xl font-bold text-gray-800">
                            Responda V o F a las afirmaciones presentadas en la siguiente tabla:
                        </p>
                    </div>

                    <div className="pl-16 grid grid-cols-2 gap-x-20 gap-y-12 max-w-4xl">
                        {[
                            { f1: [6, 9], f2: [2, 3] },
                            { f1: [1, 2], f2: [4, 8] },
                            { f1: [10, 20], f2: [2, 10] },
                            { f1: [9, 10], f2: [5, 6] }
                        ].map((ex, i) => (
                            <div key={i} className="flex flex-col items-center gap-4">
                                <div className="flex items-center gap-6">
                                    <div className="w-4 h-4 bg-purple-700 flex-shrink-0" />
                                    <Fraction num={ex.f1[0]} den={ex.f1[1]} size="text-3xl" />
                                    <span className="text-3xl font-black text-gray-300">=</span>
                                    <Fraction num={ex.f2[0]} den={ex.f2[1]} size="text-3xl" />

                                    <div className="flex gap-2">
                                        {['V', 'F'].map(btn => (
                                            <button
                                                key={btn}
                                                onClick={() => { if (act4Results[i] !== 'correct') { setAct4({ ...act4, [i]: btn as any }); setAct4Results({ ...act4Results, [i]: null }); } }}
                                                className={`w-10 h-10 rounded-lg font-black text-xl transition-all ${act4[i] === btn ? 'bg-purple-600 text-white' : 'bg-[#e2e2e2] text-gray-400 opacity-50'}`}
                                            >
                                                {btn}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <FeedbackButton
                                    status={act4Results[i]}
                                    onCheck={() => checkSubAct4(i)}
                                    onReset={() => { setAct4({ ...act4, [i]: null }); setAct4Results({ ...act4Results, [i]: null }); }}
                                    className="scale-75 origin-top"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="pl-16 pt-8 flex items-center gap-8">
                        <p className="text-2xl font-black text-gray-800">AYUDA: <span className="font-bold text-lg">Usar productos cruzados.</span></p>
                        <div className="relative w-48 h-28">
                            <Image src={image109} alt="Ayuda productos cruzados" layout="fill" objectFit="contain" />



                        </div>
                    </div>
                </div>
            </div>
        </BookPageContainer >
    );
}
