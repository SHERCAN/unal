'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';


// Import assets
import romboImg from '../rombo.png';
import cebraImg from '../cebra.png';
import acordeonImg from '../acordeon.png';
import circulosImg from '../circulos.png';
import cebraOblicuaImg from '../cebraoblicua.png';

interface Props { zoom?: number; }

//PAGINA 3 ABSTRACTO
export function ConceptoAbstracto2Page({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        FIG_1: 'fracciones-fig-1',
        FIG_2: 'fracciones-fig-2',
        FIG_3: 'fracciones-fig-3',
        FIG_4: 'fracciones-fig-4',
        NOTA: 'fracciones-pag19-v3',
    };

    /* videoModal list removed */
    /* ref removed */

    const [inputs, setInputs] = useState({
        ex1_n: '', ex1_d: '',
        ex2_n: '', ex2_d: '',
        ex3_n1: '', ex3_d1: '',
        ex3_n2: '', ex3_d2: '',
        ex4_n: '', ex4_d: '',
    });

    // State for validation messages
    const [results, setResults] = useState<{ [key: string]: 'correct' | 'incorrect' | null }>({});


    /* handleVideoComplete removed */

    /* openVideo removed */

    /* PlayButton definition removed */

    const validate = (id: string, correctN: string, correctD: string) => {
        const n = inputs[`${id}_n` as keyof typeof inputs];
        const d = inputs[`${id}_d` as keyof typeof inputs];
        if (n === correctN && d === correctD) {
            setResults({ ...results, [id]: 'correct' });
        } else {
            setResults({ ...results, [id]: 'incorrect' });
        }
    };

    const reset = (id: string) => {
        setInputs(prev => ({ ...prev, [`${id}_n`]: '', [`${id}_d`]: '' }));
        setResults(prev => ({ ...prev, [id]: null }));
    };


    const validateAcordeon = () => {
        const n1 = inputs.ex3_n1;
        const d1 = inputs.ex3_d1;
        const n2 = inputs.ex3_n2;
        const d2 = inputs.ex3_d2;

        if (n1 === "5" && d1 === "14" && n2 === "5" && d2 === "14") {
            setResults({ ...results, ex3: 'correct' });
        } else {
            setResults({ ...results, ex3: 'incorrect' });
        }
    };

    const resetAcordeon = () => {
        setInputs(prev => ({ ...prev, ex3_n1: '', ex3_d1: '', ex3_n2: '', ex3_d2: '' }));
        setResults(prev => ({ ...prev, ex3: null }));
    };


    const FractionInput = ({ id_n, id_d, nValue, dValue, isCorrect, onNChange, onDChange }: any) => (
        <div className="flex flex-col items-center gap-1">
            <input
                type="number"
                className={`w-12 h-10 border-2 text-center text-lg font-bold rounded outline-none transition-all ${isCorrect ? 'border-green-500 bg-green-50 text-green-700' : 'border-purple-300 focus:border-purple-600'}`}
                value={nValue}
                onChange={(e) => onNChange(e.target.value)}
            />
            <div className="w-12 h-0.5 bg-black rounded-full"></div>
            <input
                type="number"
                className={`w-12 h-10 border-2 text-center text-lg font-bold rounded outline-none transition-all ${isCorrect ? 'border-green-500 bg-green-50 text-green-700' : 'border-purple-300 focus:border-purple-600'}`}
                value={dValue}
                onChange={(e) => onDChange(e.target.value)}
            />
        </div>
    );

    interface ExerciseRowProps {
        id: string;
        title: string;
        imgSrc: any;
        correctN: string;
        correctD: string;
        className?: string;
    }

    const ExerciseRow = ({
        id,
        imgSrc,
        correctN,
        correctD,
        title,
        className = ""
    }: ExerciseRowProps) => {
        return (
            <div className={`flex items-center gap-4 ${className}`}>
                {/* Square Bullet */}
                <div className="flex items-center shrink-0">
                    <div className="w-4 h-4 border-2 border-purple-600 bg-white"></div>
                </div>

                {/* Image */}
                <div className="w-48 flex justify-center px-1">
                    <Image
                        src={imgSrc}
                        alt={title}
                        className="h-28 w-auto object-contain drop-shadow-sm"
                    />
                </div>

                {/* Equals */}
                <span className="text-2xl font-bold text-gray-400 mx-1 shrink-0">=</span>

                {/* Fraction Input */}
                <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-100 shadow-sm shrink-0">
                    <FractionInput
                        isCorrect={results[id] === 'correct'}
                        nValue={inputs[`${id}_n` as keyof typeof inputs]}
                        dValue={inputs[`${id}_d` as keyof typeof inputs]}
                        onNChange={(val: string) => { setInputs({ ...inputs, [`${id}_n`]: val }); setResults({ ...results, [id]: null }); }}
                        onDChange={(val: string) => { setInputs({ ...inputs, [`${id}_d`]: val }); setResults({ ...results, [id]: null }); }}
                    />

                    <div className="flex flex-col gap-1">
                        <FeedbackButton
                            onCheck={() => validate(id, correctN, correctD)}
                            onReset={() => reset(id)}
                            status={results[id]}
                        />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones' }} pageId="fracciones-concepto-abstracto-2">
            <div className="relative ml-2 flex items-start">
                {/* Header Tab "A" */}
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#be90de]" style={{ borderColor: '#be90de' }}>
                    A
                </div>

                {/* Content Container */}
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 bg-white border-[#be90de]">

                    {/* NEW Header Section */}
                    <div className="mb-10 space-y-4">
                        <p className="text-base text-gray-800 font-semibold ml-4">
                            donde <strong className='text-blue-700 text-2xl'>4</strong> es el numerador y <strong className='text-2xl'>6</strong> es el denominador.
                        </p>

                        <div className="flex items-center flex-wrap gap-2 ml-4">
                            <span className="text-red-600 font-extrabold text-base">ERROR:</span>

                            {/* Fraction 6/4 */}
                            <div className="inline-flex flex-col items-center mx-2 align-middle leading-none">
                                <span className="text-xl font-extrabold text-black border-b-2 border-black px-1">6</span>
                                <span className="text-xl font-extrabold text-blue-700">4</span>
                            </div>

                            <span className="text-base text-gray-800 font-semibold">
                                no es correcta porque no es apropiada para la fracción.
                            </span>

                            <PlayVideoButton trackingId={VIDEO_TRACKING.NOTA} title="" videoId="/pag19/vv-1" />
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-10 items-start border-t border-gray-100 pt-8 max-w-2xl mx-auto">

                        {/* 1. Rombo */}
                        <ExerciseRow
                            id="ex1" title="Rombo"
                            imgSrc={romboImg} correctN="9" correctD="16"
                        />

                        {/* 2. Cebra / Barras */}
                        <ExerciseRow
                            id="ex2" title="Barras"
                            imgSrc={cebraImg} correctN="5" correctD="9"
                        />

                        {/* 3. Acordeon (Special Case: 2 fractions) */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center shrink-0">
                                <div className="w-4 h-4 border-2 border-purple-600 bg-white"></div>
                            </div>
                            <div className="w-48 flex justify-center px-1">
                                <Image
                                    src={acordeonImg}
                                    alt="Acordeon"
                                    className="h-28 w-auto object-contain drop-shadow-sm"
                                />
                            </div>
                            <span className="text-2xl font-bold text-gray-400 mx-1 shrink-0">=</span>
                            <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl border border-gray-100 shadow-sm shrink-0">
                                <div className="flex items-center gap-2">
                                    <FractionInput
                                        isCorrect={results.ex3 === 'correct'}
                                        nValue={inputs.ex3_n1}
                                        dValue={inputs.ex3_d1}
                                        onNChange={(val: string) => { setInputs({ ...inputs, ex3_n1: val }); setResults({ ...results, ex3: null }); }}
                                        onDChange={(val: string) => { setInputs({ ...inputs, ex3_d1: val }); setResults({ ...results, ex3: null }); }}
                                    />
                                    <span className="text-xl font-bold text-purple-600">+</span>
                                    <FractionInput
                                        isCorrect={results.ex3 === 'correct'}
                                        nValue={inputs.ex3_n2}
                                        dValue={inputs.ex3_d2}
                                        onNChange={(val: string) => { setInputs({ ...inputs, ex3_n2: val }); setResults({ ...results, ex3: null }); }}
                                        onDChange={(val: string) => { setInputs({ ...inputs, ex3_d2: val }); setResults({ ...results, ex3: null }); }}
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <FeedbackButton
                                        onCheck={validateAcordeon}
                                        onReset={resetAcordeon}
                                        status={results.ex3}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 4. Circulos */}
                        <ExerciseRow
                            id="ex4" title="Círculos"
                            imgSrc={circulosImg} correctN="8" correctD="15"
                        />

                        {/* NOTA spanning full width */}
                        <div className="w-full flex flex-col items-start gap-4 pt-10 border-t-2 border-gray-100 mt-2">
                            <div className="flex items-center gap-4 flex-wrap">
                                <span className="font-extrabold text-[#e95352] text-xl">NOTA:</span>
                                <p className="text-base text-gray-800 font-semibold">
                                    Como se muestra la siguiente figura, <span className="font-bold text-red-600">NO</span> es realmente una forma de fracción.
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.NOTA} title="" videoId="/pag19/vv-2" />
                                </p>                                
                            </div>

                            <div className="flex flex-col items-start gap-4 mt-4 w-full">
                                <div className="w-full flex justify-center">
                                    <Image
                                        src={cebraOblicuaImg}
                                        alt="Cebra Oblicua"
                                        className="h-32 w-auto object-contain border-2 border-black shadow-md"
                                    />
                                </div>
                                <div className="flex items-center gap-3 text-gray-800">
                                    <p className="text-base font-semibold">
                                        ¿Por qué esta figura no es una forma de fracción? Esas partes son diferentes. <PlayVideoButton trackingId={VIDEO_TRACKING.NOTA} title="" videoId="/pag19/vv-3"/>
                                    </p>
                                    
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
