'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useRef, useEffect } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';

import Image from 'next/image';
import { MdOutlineStickyNote2 } from 'react-icons/md';

// Assets from comparison topic
import fraccionesEquivalentesImg from '../../comparacion_fracciones/fraccionesEquivalentes.png';
import equivalente30Img from '../../comparacion_fracciones/equivalente30.png';

interface Props { zoom?: number; }
//PAGINA 3 ABSTRACTO
export function ConceptoAbstracto1Page({ zoom = 1 }: Props) {
    const EXERCISE_IDS = {
        ROW1: 'fracciones_equivalentes-pag25-row1',
        ROW2: 'fracciones_equivalentes-pag25-row2'
    };

    const STAGE_IDS = {
        A_STAGE: 'fracciones-equivalentes-a-stage'
    };

    const { isVideoWatched, markVideoWatched, submitGame, completeStage, isExerciseCompleted, watchedVideos, completedExercises, completedStages } = useVideoProgress();

    const VIDEO_TRACKING = {
        A_INTRO: 'fracciones_equivalentes-pag25-v1',
        A_NOTATION: 'fracciones_equivalentes-pag25-v2',
        A_EQUIV_DEF: 'fracciones_equivalentes-pag25-v3',
        A_DEF_CONCEPT: 'fracciones_equivalentes-pag25-v4',
        A_EXAMPLE: 'fracciones_equivalentes-pag25-v5',
        A_HOW_TO: 'fracciones_equivalentes-pag25-v6',
        A_CROSS: 'fracciones_equivalentes-pag25-v7',
    };

    /* videoModal list removed */
    /* ref removed */

    /* handleVideoComplete removed */

    /* openVideo removed */

    /* PlayButton definition removed */

    const Fraction = ({ num, den, color = 'text-green-600', size = 'text-2xl' }: any) => (
        <div className={`inline-flex flex-col items-center align-middle ${size} font-bold px-1`}>
            <span className={color}>{num}</span>
            <div className={`w-full h-0.5 ${color === 'text-green-600' ? 'bg-green-600' : 'bg-gray-800'} my-0.5`} />
            <span className={color}>{den}</span>
        </div>
    );

    // Practice state
    const [row1, setRow1] = useState({ i1: '', i2: '', i3: '', i4: '', r1: '', r2: '' });
    const [row2, setRow2] = useState({ i1: '', i2: '', i3: '', i4: '', r1: '', r2: '' });
    const [row1Result, setRow1Result] = useState<'correct' | 'incorrect' | null>(null);
    const [row2Result, setRow2Result] = useState<'correct' | 'incorrect' | null>(null);

    // Initial load and auto-checking
    useEffect(() => {
        if (isExerciseCompleted(EXERCISE_IDS.ROW1)) {
            setRow1Result('correct');
            setRow1({ i1: '3', i2: '20', i3: '5', i4: '12', r1: '60', r2: '60' });
        }
        if (isExerciseCompleted(EXERCISE_IDS.ROW2)) {
            setRow2Result('correct');
            setRow2({ i1: '6', i2: '20', i3: '10', i4: '12', r1: '120', r2: '120' });
        }

        const A_REQUIRED = [
            'fracciones_equivalentes-pag25-v1', 'fracciones_equivalentes-pag25-v2', 'fracciones_equivalentes-pag25-v3',
            'fracciones_equivalentes-pag25-v4', 'fracciones_equivalentes-pag25-v5', 'fracciones_equivalentes-pag25-v6',
            'fracciones_equivalentes-pag25-v7',
            EXERCISE_IDS.ROW1, EXERCISE_IDS.ROW2
        ];

        const aDone = A_REQUIRED.every(id =>
            watchedVideos.includes(id) || completedExercises[id]?.completed
        );
        if (aDone) completeStage(STAGE_IDS.A_STAGE);
    }, [isExerciseCompleted, watchedVideos, completedExercises]);

    const checkRow1 = async () => {
        if (isExerciseCompleted(EXERCISE_IDS.ROW1)) return;
        const correct = row1.i1 === '3' && row1.i2 === '20' && row1.i3 === '5' && row1.i4 === '12' && row1.r1 === '60' && row1.r2 === '60';
        setRow1Result(correct ? 'correct' : 'incorrect');
        await submitGame(EXERCISE_IDS.ROW1, correct, 'juego_cpa');
        if (correct) {
            await completeStage(STAGE_IDS.A_STAGE);
        }
    };

    const checkRow2 = async () => {
        if (isExerciseCompleted(EXERCISE_IDS.ROW2)) return;
        const correct = row2.i1 === '6' && row2.i2 === '20' && row2.i3 === '10' && row2.i4 === '12' && row2.r1 === '120' && row2.r2 === '120';
        setRow2Result(correct ? 'correct' : 'incorrect');
        await submitGame(EXERCISE_IDS.ROW2, correct, 'juego_cpa');
        if (correct) {
            await completeStage(STAGE_IDS.A_STAGE);
        }
    };

    const resetRow1 = () => { if (isExerciseCompleted(EXERCISE_IDS.ROW1)) return; setRow1({ i1: '', i2: '', i3: '', i4: '', r1: '', r2: '' }); setRow1Result(null); };
    const resetRow2 = () => { if (isExerciseCompleted(EXERCISE_IDS.ROW2)) return; setRow2({ i1: '', i2: '', i3: '', i4: '', r1: '', r2: '' }); setRow2Result(null); };




    const PracticeInput = ({ value, onChange, placeholder = "?" }: any) => (
        <input
            type="text"
            className="w-14 h-14 text-center rounded-lg text-2xl font-black outline-none border-none shadow-sm"
            style={{ backgroundColor: '#d9d9d9' }}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
        />
    );

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones Equivalentes' }} pageId="frac-equiv-concepto-abstracto-1">
            {/* Main Title Section removed */}
            <div className="relative ml-2 flex items-start">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#be90de]" style={{ borderColor: '#be90de' }}>
                    A {completedStages.includes(STAGE_IDS.A_STAGE) && <span className="ml-1 text-[#7c3aed]">✓</span>}
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 bg-white border-[#be90de]">
                    {/* --- STAGE A: ABSTRACTO --- */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <p className="text-base text-gray-800 font-semibold leading-snug">
                                Según las actividades anteriores, el color verde es el mismo tamaño. Cambian los números como partes, pero no cambia la cantidad.
                                <PlayVideoButton trackingId={VIDEO_TRACKING.A_INTRO} title="" videoId="/pag25/vv-1" />
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <p className="text-base text-gray-800 font-semibold leading-snug">
                                Así, en notación matemática, representan la misma cantidad:
                            </p>
                            <PlayVideoButton trackingId={VIDEO_TRACKING.A_NOTATION} title="Notación Matemática" videoId="/pag25/vv-2" />
                        </div>

                        <div className="flex justify-center py-4">
                            <Image src={fraccionesEquivalentesImg} alt="Fracciones Equivalentes" className="h-32 w-auto object-contain" />
                        </div>

                        <div className="flex items-center gap-3">
                            <p className="text-base text-gray-800 font-semibold">
                                Estas fracciones se llaman <span style={{ color: '#e95352' }} className="font-bold">fracciones equivalentes</span>.
                            </p>
                            <PlayVideoButton trackingId={VIDEO_TRACKING.A_EQUIV_DEF} title="" videoId="/pag25/vv-3" />
                        </div>

                        <div className="flex items-center gap-4 mt-8">
                            <PlayVideoButton trackingId={VIDEO_TRACKING.A_DEF_CONCEPT} title="" videoId="/pag25/vv-4" />
                            <div className="text-white font-bold px-6 py-2 rounded-lg text-xl shadow-sm" style={{ backgroundColor: '#e95352' }}>
                                ¿Qué son fracciones equivalentes?
                            </div>
                        </div>

                        <p className="text-base text-gray-800 font-semibold pl-12">
                            Dos o más de fracciones son <span style={{ color: '#e95352' }} className="font-black">equivalentes</span> cuando representan la misma cantidad.
                        </p>

                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-4">
                                <PlayVideoButton trackingId={VIDEO_TRACKING.A_EXAMPLE} title="Ejemplo" videoId="/pag25/vv-5" />
                                <div className="bg-green-600 text-white font-bold px-4 py-1 rounded inline-block text-lg shadow-sm">
                                    Ejemplo:
                                </div>
                                <p className="text-base text-gray-800 font-semibold">
                                    <Fraction num="3" den="5" size="text-2xl" color="text-gray-800" /> ,
                                    <Fraction num="6" den="10" size="text-2xl" color="text-gray-800" /> y
                                    <Fraction num="12" den="20" size="text-2xl" color="text-gray-800" /> son fracciones equivalentes.
                                </p>
                            </div>

                            <div className="flex items-center justify-center gap-8 pl-12">
                                <div className="flex items-center gap-3 text-4xl font-bold">
                                    <Fraction num="3" den="5" color="text-gray-800" size="text-4xl" />
                                    <span>=</span>
                                    <Fraction num="6" den="10" color="text-gray-800" size="text-4xl" />
                                    <span>=</span>
                                    <Fraction num="12" den="20" color="text-gray-800" size="text-4xl" />
                                </div>
                                <div className="bg-purple-600 p-2 rounded-lg shadow-md flex items-center justify-center">
                                    <MdOutlineStickyNote2 className="text-white text-3xl" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 pt-8 border-t-2 border-dashed border-gray-100">
                            <div className="flex items-center gap-4">
                                <p className="text-base text-gray-800 font-semibold">
                                    ¿Cómo sabemos que <Fraction num="3" den="5" size="text-2xl" color="text-gray-800" /> y <Fraction num="6" den="10" size="text-2xl" color="text-gray-800" /> son equivalentes?
                                </p>
                                <PlayVideoButton trackingId={VIDEO_TRACKING.A_HOW_TO} title="" videoId="/pag25/vv-6" />
                            </div>

                            <div className="flex items-center gap-4 justify-center">
                                <div className="text-black font-black text-sm uppercase tracking-wider">USAR PRODUCTOS CRUZADOS:</div>
                                <PlayVideoButton trackingId={VIDEO_TRACKING.A_CROSS} title="Productos Cruzados" videoId="/pag25/vv-7" />
                            </div>

                            <div className="flex justify-center py-8">
                                <Image src={equivalente30Img} alt="Productos Cruzados" className="w-[400px] object-contain" />
                            </div>
                        </div>

                        {/* PRÁCTICA */}
                        <div className="space-y-12 mt-12 pb-32">
                            <div className="bg-[#800000] text-white font-bold px-6 py-1.5 rounded-sm w-fit text-lg shadow-md tracking-wider">
                                PRÁCTICA
                            </div>

                            {/* Row 1 - Exercise 1 */}
                            <div className="flex items-start gap-4">
                                {/* Left side showing the fractions */}
                                <div className="flex items-center gap-2 w-[240px] shrink-0">
                                    <div className="w-4 h-4 bg-[#800000] flex-shrink-0" />
                                    <div className="flex items-center font-black gap-2 justify-center flex-1">
                                        <Fraction num="3" den="5" color="text-gray-800" size="text-2xl" />
                                        <span className="text-2xl font-black text-gray-300">=</span>
                                        <Fraction num="12" den="20" color="text-gray-800" size="text-2xl" />
                                    </div>
                                    <span className="text-2xl text-gray-300 w-8 text-center">→</span>
                                </div>

                                {/* Right Side - Inputs Part */}
                                <div className="flex flex-col items-center">
                                    <div className="grid grid-cols-[56px_40px_56px_48px_56px_40px_56px] items-center gap-y-4">
                                        {/* Line 1: input x input = input x input */}
                                        <PracticeInput value={row1.i1} onChange={(e: any) => { setRow1({ ...row1, i1: e.target.value }); setRow1Result(null); }} />
                                        <span className="text-3xl font-black text-gray-700 text-center">×</span>
                                        <PracticeInput value={row1.i2} onChange={(e: any) => { setRow1({ ...row1, i2: e.target.value }); setRow1Result(null); }} />

                                        <span className="text-3xl font-black text-gray-400 text-center">=</span>

                                        <PracticeInput value={row1.i3} onChange={(e: any) => { setRow1({ ...row1, i3: e.target.value }); setRow1Result(null); }} />
                                        <span className="text-3xl font-black text-gray-700 text-center">×</span>
                                        <PracticeInput value={row1.i4} onChange={(e: any) => { setRow1({ ...row1, i4: e.target.value }); setRow1Result(null); }} />

                                        {/* Line 2: result = result */}
                                        <div /> {/* col 1 */}
                                        <div /> {/* col 2 */}
                                        <PracticeInput value={row1.r1} onChange={(e: any) => { setRow1({ ...row1, r1: e.target.value }); setRow1Result(null); }} />
                                        <span className="text-3xl font-black text-gray-500 text-center">=</span>
                                        <PracticeInput value={row1.r2} onChange={(e: any) => { setRow1({ ...row1, r2: e.target.value }); setRow1Result(null); }} />
                                        <div /> {/* col 6 */}
                                        <div /> {/* col 7 */}

                                        {/* Line 3: Button Row */}
                                        <div className="col-start-4 flex justify-center mt-2 relative">
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center">
                                                <FeedbackButton
                                                    onCheck={checkRow1}
                                                    onReset={resetRow1}
                                                    status={row1Result}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Row 2 - Exercise 2 */}
                            <div className="flex items-start gap-4">
                                {/* Left side showing the fractions */}
                                <div className="flex items-center gap-2 w-[240px] shrink-0">
                                    <div className="w-4 h-4 bg-[#800000] flex-shrink-0" />
                                    <div className="flex items-center font-black gap-2 justify-center flex-1">
                                        <Fraction num="6" den="10" color="text-gray-800" size="text-2xl" />
                                        <span className="text-2xl font-black text-gray-300">=</span>
                                        <Fraction num="12" den="20" color="text-gray-800" size="text-2xl" />
                                    </div>
                                    <span className="text-2xl text-gray-300 w-8 text-center">→</span>
                                </div>

                                {/* Right Side - Inputs Part */}
                                <div className="flex flex-col items-center">
                                    <div className="grid grid-cols-[56px_40px_56px_48px_56px_40px_56px] items-center gap-y-4">
                                        {/* Line 1: input x input = input x input */}
                                        <PracticeInput value={row2.i1} onChange={(e: any) => { setRow2({ ...row2, i1: e.target.value }); setRow2Result(null); }} />
                                        <span className="text-3xl font-black text-gray-700 text-center">×</span>
                                        <PracticeInput value={row2.i2} onChange={(e: any) => { setRow2({ ...row2, i2: e.target.value }); setRow2Result(null); }} />

                                        <span className="text-3xl font-black text-gray-400 text-center">=</span>

                                        <PracticeInput value={row2.i3} onChange={(e: any) => { setRow2({ ...row2, i3: e.target.value }); setRow2Result(null); }} />
                                        <span className="text-3xl font-black text-gray-700 text-center">×</span>
                                        <PracticeInput value={row2.i4} onChange={(e: any) => { setRow2({ ...row2, i4: e.target.value }); setRow2Result(null); }} />

                                        {/* Line 2: result = result */}
                                        <div />
                                        <div />
                                        <PracticeInput value={row2.r1} onChange={(e: any) => { setRow2({ ...row2, r1: e.target.value }); setRow2Result(null); }} />
                                        <span className="text-3xl font-black text-gray-500 text-center">=</span>
                                        <PracticeInput value={row2.r2} onChange={(e: any) => { setRow2({ ...row2, r2: e.target.value }); setRow2Result(null); }} />
                                        <div />
                                        <div />

                                        {/* Line 3: Button Row */}
                                        <div className="col-start-4 flex justify-center mt-2 relative">
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center justify-center">
                                                <FeedbackButton
                                                    onCheck={checkRow2}
                                                    onReset={resetRow2}
                                                    status={row2Result}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* VideoModal removed */}
        </BookPageContainer >
    );
}
