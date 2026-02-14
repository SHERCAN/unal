'use client';

import React, { useState } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import VideoModal from '@/components/VideoModal';

interface ExercisesPage2Props {
    zoom?: number;
}

export function ExercisesPage2({ zoom = 1 }: ExercisesPage2Props) {
    const { markVideoWatched } = useVideoProgress();
    const [videoModal, setVideoModal] = useState<{ isOpen: boolean; title: string; videoId?: string; trackingId?: string }>({
        isOpen: false, title: '', videoId: undefined, trackingId: undefined
    });

    const handleVideoComplete = () => {
        // Placeholder for video logic if needed
    };

    // --- ACTIVITY 1: TRUE/FALSE ---
    // Q1: 40/10 = 4. True (V)
    // Q2: 88/10 = 8. False (F) (88/10 is 8 with remainder 8, or 8.8. "Las 8 atletas corren en cada carril" implies exact division or total 80).
    const [act1_q1, setAct1_q1] = useState<'V' | 'F' | null>(null);
    const [act1_q2, setAct1_q2] = useState<'V' | 'F' | null>(null);
    const [act1Status, setAct1Status] = useState<'idle' | 'correct' | 'incorrect'>('idle');

    const checkAct1 = () => {
        if (act1_q1 === 'V' && act1_q2 === 'F') {
            setAct1Status('correct');
        } else {
            setAct1Status('incorrect');
        }
    };

    // --- ACTIVITY 4: PROBLEM SOLVING ---
    // 36 nadadores, 12 grupos.
    // Horizontal: 36 / 12 = 3
    const [act4_h_div, setAct4_h_div] = useState(['', '', '']); // [36, 12, 3]

    // Vertical Algorithm:
    // Dividend: 36
    // Divisor: 12
    // Quotient: 3
    // Subtraction: 36 (under dividend) - 36 = 0? Or just 36/12 - 36 0.
    // The image conceptualizes standard numeric inputs.
    // Let's assume structure:
    // [Dividend] | [Divisor]
    // -[Sub]     |________
    // [Rem]        [Quotient]
    const [act4_v_dividend, setAct4_v_dividend] = useState('');
    const [act4_v_divisor, setAct4_v_divisor] = useState('');
    const [act4_v_quotient, setAct4_v_quotient] = useState('');
    const [act4_v_sub, setAct4_v_sub] = useState('');
    const [act4_v_rem, setAct4_v_rem] = useState('');

    // Multiplication check (Right side)
    // 4 rows of [ ] x [ ] = [ ]
    // Maybe they want:
    // 12 x 1 = 12
    // 12 x 2 = 24
    // 12 x 3 = 36
    // ...
    const [act4_m_rows, setAct4_m_rows] = useState(
        Array(4).fill(null).map(() => ({ a: '', b: '', res: '' }))
    );

    const [act4Status, setAct4Status] = useState<'idle' | 'correct' | 'incorrect'>('idle');

    const checkAct4 = () => {
        // Logic:
        // Horizontal: 36 / 12 = 3
        const hCorrect = act4_h_div[0] === '36' && act4_h_div[1] === '12' && act4_h_div[2] === '3';

        // Vertical: 
        // 36 | 12
        // 36 | 3
        // 0
        const vCorrect =
            act4_v_dividend === '36' &&
            act4_v_divisor === '12' &&
            act4_v_quotient === '3' &&
            (act4_v_sub === '36') &&
            (act4_v_rem === '0');

        // Multiplications: At least one row should be 12x3=36 or 3x12=36
        // Or maybe checking the sequence? 
        // 12x1=12, 12x2=24, 12x3=36.
        // Let's implement lenient check: requires 12x3=36 to be present in one of the rows.
        // And all filled rows must be mathematically correct.
        const mRowsFilled = act4_m_rows.filter(r => r.a && r.b && r.res);
        const hasTarget = mRowsFilled.some(r =>
            (r.a === '12' && r.b === '3' && r.res === '36') ||
            (r.a === '3' && r.b === '12' && r.res === '36')
        );
        const mathValid = mRowsFilled.every(r => parseInt(r.a) * parseInt(r.b) === parseInt(r.res));

        if (hCorrect && vCorrect && hasTarget && mathValid) {
            setAct4Status('correct');
        } else {
            setAct4Status('incorrect');
        }
    };

    // --- ACTIVITY 5: FALSE DIVISION ---
    // 1. 56 / 7 = 8  -> Correct (V or blank?) Prompt says "Encuentra la division falsa (F)".
    // 2. 45 / 9 = 6  -> Incorrect (F)
    // 3. 72 / 6 = 14 -> Incorrect (F)
    const [act5_inputs, setAct5_inputs] = useState(['', '', '']);
    const [act5Status, setAct5Status] = useState<'idle' | 'correct' | 'incorrect'>('idle');

    const checkAct5 = () => {
        // Expecting 'F' on index 1 and 2.
        // Index 0 is correct, so maybe 'V' or empty?
        // Let's require 'V' for correct and 'F' for incorrect for completeness, or just 'F' where needed.
        // Image shows "F" in red boxes next to incorrect ones.
        // Let's assume user must type V or F.

        const i0 = act5_inputs[0].toUpperCase().trim();
        const i1 = act5_inputs[1].toUpperCase().trim();
        const i2 = act5_inputs[2].toUpperCase().trim();

        if ((i0 === 'V') && (i1 === 'F') && (i2 === 'F')) {
            setAct5Status('correct');
        } else {
            setAct5Status('incorrect');
        }
    };


    return (
        <BookPageContainer
            zoom={zoom}
            moduleHeader={{ icon: '/division-icon.png', name: 'División' }}
            pageId="division-exercises-2"
        >
            <div className="flex flex-col gap-10 max-w-4xl mx-auto">
                {/* Header */}
                <h1 className="text-3xl font-black text-purple-700 uppercase">Ejercicios</h1>

                {/* --- ACTIVITY 1 --- */}
                <div className="flex bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-col gap-6">
                    {/* Item 1 */}
                    <div className="flex items-start gap-4">
                        <PlayButton onClick={() => { }} />
                        <div className="flex-1 flex items-center justify-between gap-4 flex-wrap">
                            <p className="font-medium text-lg leading-relaxed">
                                Hay 40 caramelos para repartir en partes iguales entre 10 niños. <br />
                                Cada niño recibe 4 caramelos.
                            </p>
                            <div className="flex gap-2 shrink-0">
                                <SelectButton label="V" selected={act1_q1 === 'V'} onClick={() => { setAct1Status('idle'); setAct1_q1('V'); }} />
                                <SelectButton label="F" selected={act1_q1 === 'F'} onClick={() => { setAct1Status('idle'); setAct1_q1('F'); }} />
                            </div>
                        </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-start gap-4">
                        <PlayButton onClick={() => { }} />
                        <div className="flex-1 flex items-center justify-between gap-4 flex-wrap">
                            <p className="font-medium text-lg leading-relaxed">
                                En una competencia participan 88 atletas. Se reparten en 10 carriles de la pista. <br />
                                Las 8 atletas corren en cada carril.
                            </p>
                            <div className="flex gap-2 shrink-0">
                                <SelectButton label="V" selected={act1_q2 === 'V'} onClick={() => { setAct1Status('idle'); setAct1_q2('V'); }} />
                                <SelectButton label="F" selected={act1_q2 === 'F'} onClick={() => { setAct1Status('idle'); setAct1_q2('F'); }} />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end items-center gap-4 mt-2 flex-wrap">
                        <CheckButton onClick={checkAct1} />
                        <Feedback status={act1Status} />
                    </div>
                </div>

                {/* --- ACTIVITY 4 --- */}
                <div className="flex bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-700 text-white font-black text-xl flex items-center justify-center rounded-lg">4</div>
                        <div className="flex items-center gap-2">
                            <PlayButton onClick={() => { }} />
                            <p className="font-bold text-gray-800">Resuelve una situación problemática:</p>
                        </div>
                    </div>

                    <div className="ml-0 md:ml-12 flex flex-col gap-6">
                        <p className="text-lg">
                            En una piscina entrenan 36 nadadores. Se organizan en 12 grupos iguales.
                            <br />
                            <strong>¿Cuántos nadadores hay en cada grupo?</strong>
                        </p>

                        {/* Horizontal Division */}
                        <div className="flex items-center gap-2 text-2xl font-bold justify-center md:justify-start">
                            <InputBox value={act4_h_div[0]} onChange={v => { const n = [...act4_h_div]; n[0] = v; setAct4_h_div(n); setAct4Status('idle'); }} />
                            <span>÷</span>
                            <InputBox value={act4_h_div[1]} onChange={v => { const n = [...act4_h_div]; n[1] = v; setAct4_h_div(n); setAct4Status('idle'); }} />
                            <span>=</span>
                            <InputBox value={act4_h_div[2]} onChange={v => { const n = [...act4_h_div]; n[2] = v; setAct4_h_div(n); setAct4Status('idle'); }} />
                        </div>

                        <hr className="border-gray-200" />

                        <div className="flex flex-col md:flex-row gap-12 items-start">
                            {/* Vertical Algorithm - Redesigned Layout */}
                            <div className="flex gap-4 font-mono text-xl items-start">
                                {/* Left Side: Dividend, Subtraction, Remainder */}
                                <div className="flex flex-col items-end gap-1">
                                    {/* Dividend */}
                                    <InputBox value={act4_v_dividend} onChange={v => { setAct4_v_dividend(v); setAct4Status('idle'); }} className="w-16 h-16 text-3xl" />

                                    {/* Subtraction with minus sign */}
                                    <div className="relative">
                                        <span className="absolute -left-8 top-2 text-4xl font-bold text-gray-800 select-none">-</span>
                                        <InputBox value={act4_v_sub} onChange={v => { setAct4_v_sub(v); setAct4Status('idle'); }} className="w-16 h-16 text-3xl" />
                                    </div>

                                    {/* Line */}
                                    <div className="w-16 h-1 bg-black rounded-full"></div>

                                    {/* Remainder */}
                                    <InputBox value={act4_v_rem} onChange={v => { setAct4_v_rem(v); setAct4Status('idle'); }} className="w-16 h-16 text-3xl" />
                                </div>

                                {/* Right Side: Bracket + Divisor + Quotient */}
                                <div className="flex flex-col">
                                    {/* Top part: Bracket L-shape + Divisor */}
                                    <div className="border-l-4 border-b-4 border-black pl-2 pb-2 mb-2">
                                        <InputBox value={act4_v_divisor} onChange={v => { setAct4_v_divisor(v); setAct4Status('idle'); }} className="w-16 h-16 text-3xl border-none focus:ring-0 bg-transparent" />
                                    </div>

                                    {/* Quotient (under the line) */}
                                    <div className="pl-2">
                                        <InputBox value={act4_v_quotient} onChange={v => { setAct4_v_quotient(v); setAct4Status('idle'); }} className="w-16 h-16 text-3xl" />
                                    </div>
                                </div>
                            </div>

                            {/* Vertical Separator */}
                            <div className="hidden md:block w-px bg-gray-300 self-stretch"></div>

                            {/* Multiplication Checks */}
                            <div className="flex flex-col gap-4">
                                {act4_m_rows.map((row, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <InputBox value={row.a} onChange={v => {
                                            const n = [...act4_m_rows]; n[i].a = v; setAct4_m_rows(n); setAct4Status('idle');
                                        }} className="w-14 h-12" />
                                        <span className="text-xl font-bold">×</span>
                                        <InputBox value={row.b} onChange={v => {
                                            const n = [...act4_m_rows]; n[i].b = v; setAct4_m_rows(n); setAct4Status('idle');
                                        }} className="w-14 h-12" />
                                        <span className="text-xl font-bold">=</span>
                                        <InputBox value={row.res} onChange={v => {
                                            const n = [...act4_m_rows]; n[i].res = v; setAct4_m_rows(n); setAct4Status('idle');
                                        }} className="w-14 h-12" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end items-center gap-4 mt-2 flex-wrap">
                            <CheckButton onClick={checkAct4} />
                            <Feedback status={act4Status} />
                        </div>
                    </div>
                </div>

                {/* --- ACTIVITY 5 --- */}
                <div className="flex bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-700 text-white font-black text-xl flex items-center justify-center rounded-lg">5</div>
                        <div className="flex items-center gap-2">
                            <PlayButton onClick={() => { }} />
                            <p className="font-bold text-gray-800">Encuentra la división falsa (F). ¿Cuál está incorrecta?</p>
                        </div>
                    </div>

                    <div className="ml-0 md:ml-12 grid gap-6">
                        {[
                            { text: '56 ÷ 7 = 8', idx: 0 },
                            { text: '45 ÷ 9 = 6', idx: 1 },
                            { text: '72 ÷ 6 = 14', idx: 2 },
                        ].map((item) => (
                            <div key={item.idx} className="flex items-center gap-4">
                                <div className="w-4 h-4 bg-purple-600 rounded-sm"></div>
                                <span className="text-3xl font-bold text-gray-800 font-mono tracking-wide w-48">{item.text}</span>
                                <span className="text-2xl text-gray-400">→</span>
                                <InputBox
                                    value={act5_inputs[item.idx]}
                                    onChange={v => {
                                        const n = [...act5_inputs];
                                        n[item.idx] = v.toUpperCase(); // Force uppercase V/F
                                        setAct5_inputs(n);
                                        setAct5Status('idle');
                                    }}
                                    className={`w-14 h-14 text-2xl uppercase ${act5Status === 'correct' && item.idx > 0 ? 'text-red-600 font-black' : ''}`}
                                    maxLength={1}
                                />
                            </div>
                        ))}

                        <div className="flex justify-end items-center gap-4 mt-2 flex-wrap">
                            <CheckButton onClick={checkAct5} />
                            <Feedback status={act5Status} />
                        </div>
                    </div>
                </div>

            </div>

            {/* Video Modal */}
            <VideoModal
                isOpen={videoModal.isOpen}
                title={videoModal.title}
                videoId={videoModal.videoId}
                onClose={() => setVideoModal({ ...videoModal, isOpen: false })}
                canSkip={true}
                onComplete={handleVideoComplete}
            />
        </BookPageContainer>
    );
}

// --- Helpers ---

const PlayButton = ({ onClick }: { onClick: () => void }) => (
    <button
        onClick={onClick}
        className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 hover:scale-105 transition-all shadow-sm shrink-0"
    >
        <span className="ml-0.5 text-sm">▶</span>
    </button>
);

const CheckButton = ({ onClick }: { onClick: () => void }) => (
    <button
        onClick={onClick}
        className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-8 rounded-lg shadow-md transform active:scale-95 transition-all text-sm uppercase tracking-wide whitespace-nowrap shrink-0"
    >
        ¿Listo?
    </button>
);

const SelectButton = ({ label, selected, onClick }: { label: string, selected: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`w-12 h-12 font-bold text-2xl rounded-lg shadow-sm transition-all border-2
            ${selected ? 'bg-purple-600 text-white border-purple-600 scale-110 ring-2 ring-purple-200' : 'bg-white border-gray-200 text-gray-500 hover:border-purple-300 hover:text-purple-600'}
        `}
    >
        {label}
    </button>
);

const InputBox = ({ value, onChange, className = "w-16 h-12", maxLength }: { value: string, onChange: (v: string) => void, className?: string, maxLength?: number }) => (
    <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`border-2 border-gray-300 bg-gray-50 text-center font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition-all ${className}`}
        maxLength={maxLength}
    />
);

const Feedback = ({ status }: { status: 'idle' | 'correct' | 'incorrect' }) => {
    if (status === 'idle') return null;
    return (
        <span className={`font-bold uppercase tracking-wider ${status === 'correct' ? 'text-green-600' : 'text-orange-500'}`}>
            {status === 'correct' ? 'CORRECTO' : 'INCORRECTO'}
        </span>
    );
};
