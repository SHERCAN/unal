'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { VIDEO_IDS } from '@/config/videos';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';


interface DivisionConceptPage3Props {
    zoom?: number;
}
//PAGINA 4 ABSTRACTO
export function ConceptPage3({ zoom = 1 }: DivisionConceptPage3Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    // Video Tracking IDs
    const VIDEO_TRACKING_IDS = {
        EXAMPLE_MAIN: 'division-pag4-v1',
        PRACTICE_1: 'division-pag4-v2',
        PRACTICE_2: 'division-concept-pag4-v3', // Note: Need to see where practice 2 is
        PROBLEM_1: 'division-pag4-v3',
        PROBLEM_2: 'division-pag4-v4'
    };

    /* videoModal list removed */

    /* ref removed */

    /* handleVideoComplete removed */

    /* openVideo removed */

    /* PlayButton definition removed */



    // --- Exercise 1 State (21 / 7) ---
    // Dividend: 21 (Single input)
    const ex1_dividend = useInputState();
    // Divisor: 7 (Single input)
    const ex1_divisor = useInputState();
    // Quotient: 3 (Single input)
    const ex1_quotient = useInputState();
    // Subtraction: 21 (Single input)
    const ex1_subtraction = useInputState();
    // Remainder: 0 (Single input)
    const ex1_remainder = useInputState();

    // Multiplication Checks (3 rows)
    const ex1_m1_a = useInputState();
    const ex1_m1_b = useInputState();
    const ex1_m1_res = useInputState();
    const ex1_m2_a = useInputState();
    const ex1_m2_b = useInputState();
    const ex1_m2_res = useInputState();
    const ex1_m3_a = useInputState();
    const ex1_m3_b = useInputState();
    const ex1_m3_res = useInputState();

    const [ex1Status, setEx1Status] = useState<'correct' | 'incorrect' | null>(null);

    const resetEx1 = () => {
        ex1_dividend.reset(); ex1_divisor.reset(); ex1_quotient.reset();
        ex1_subtraction.reset(); ex1_remainder.reset();
        ex1_m1_a.reset(); ex1_m1_b.reset(); ex1_m1_res.reset();
        ex1_m2_a.reset(); ex1_m2_b.reset(); ex1_m2_res.reset();
        ex1_m3_a.reset(); ex1_m3_b.reset(); ex1_m3_res.reset();
        setEx1Status(null);
    };


    const checkEx1 = () => {
        // Validation Logic:
        const isDivisionCorrect =
            ex1_dividend.value === '21' &&
            ex1_divisor.value === '7' &&
            ex1_quotient.value === '3' &&
            ex1_subtraction.value === '21' &&
            ex1_remainder.value === '0';

        // Multiplication check:
        // Must have at least ONE correct row: 7 x 3 = 21 (or 3 x 7 = 21)
        const checkRow = (a: string, b: string, res: string) => {
            return (
                (a === '7' && b === '3' && res === '21') ||
                (a === '3' && b === '7' && res === '21')
            );
        };

        const isMultiplicationCorrect =
            checkRow(ex1_m1_a.value, ex1_m1_b.value, ex1_m1_res.value) ||
            checkRow(ex1_m2_a.value, ex1_m2_b.value, ex1_m2_res.value) ||
            checkRow(ex1_m3_a.value, ex1_m3_b.value, ex1_m3_res.value);

        if (isDivisionCorrect && isMultiplicationCorrect) {
            setEx1Status('correct');
        } else {
            setEx1Status('incorrect');
        }
    };

    // --- Exercise 2 State (Term Identification) ---
    const [ex2_val1, setEx2_val1] = useState('');
    const [ex2_val2, setEx2_val2] = useState('');
    const [ex2_val3, setEx2_val3] = useState('');
    const [ex2Status, setEx2Status] = useState<'correct' | 'incorrect' | null>(null);

    const resetEx2 = () => {
        setEx2_val1(''); setEx2_val2(''); setEx2_val3('');
        setEx2Status(null);
    };


    const checkEx2 = () => {
        if (ex2_val1 === 'dividendo' && ex2_val2 === 'divisor' && ex2_val3 === 'cociente') {
            setEx2Status('correct');
        } else {
            setEx2Status('incorrect');
        }
    };

    // --- Problem 1 State (Dolls) ---
    const p1_div1 = useInputState();
    const p1_div2 = useInputState();
    const p1_res = useInputState();
    const [p1Status, setP1Status] = useState<'correct' | 'incorrect' | null>(null);

    const resetP1 = () => {
        p1_div1.reset(); p1_div2.reset(); p1_res.reset();
        setP1Status(null);
    };


    const checkP1 = () => {
        if (p1_div1.value === '12' && p1_div2.value === '2' && p1_res.value === '6') {
            setP1Status('correct');
        } else {
            setP1Status('incorrect');
        }
    };

    // --- Problem 2 State (Notebooks) ---
    const p2_div1 = useInputState();
    const p2_div2 = useInputState();
    const p2_res = useInputState();
    const [p2Status, setP2Status] = useState<'correct' | 'incorrect' | null>(null);

    const resetP2 = () => {
        p2_div1.reset(); p2_div2.reset(); p2_res.reset();
        setP2Status(null);
    };


    const checkP2 = () => {
        if (p2_div1.value === '64' && p2_div2.value === '8' && p2_res.value === '8') {
            setP2Status('correct');
        } else {
            setP2Status('incorrect');
        }
    };

    return (
        <BookPageContainer
            zoom={zoom}
            moduleHeader={{
                // icon: '/division-icon.png',
                name: 'División'
            }}
            pageId="division-concept-3"
        >
            <div className="relative ml-2 flex items-start h-full">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center" style={{ backgroundColor: '#be90de' }}>
                    A
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 h-full flex flex-col" style={{ borderColor: '#be90de' }}>

                    <div className="w-full flex-1 flex flex-col overflow-y-auto gap-6 px-1 mt-2">

                        {/* --- EXAMPLE SECTION --- */}
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="bg-green-600 text-white px-3 py-1 rounded font-bold text-base">Ejemplo:</div>
                                <span className="font-semibold text-gray-800 dark:text-gray-200 text-base">Calcule 25 ÷ 5:</span>
                            </div>
                            <div className='flex justify-center'>
                                <img
                                    src="/division/img5.png"
                                    className="h-40 object-contain"
                                    draggable={false}
                                />
                            </div>
                            <div className="mt-4 text-sm text-gray-800 dark:text-gray-200 flex items-start gap-2">
                                <p>
                                    <span className='font-semibold text-base'> Para dividir 25 entre 5, buscamos cuántas veces el número 5 está contenido en 25.
                                        <p>Como 5 × 5 = 25, el cociente es 5 y el resto es 0.<PlayVideoButton trackingId={VIDEO_TRACKING_IDS.EXAMPLE_MAIN} title="Explicación del ejemplo" videoId="/pag4/vv-1" /></p></span>
                                </p>
                            </div>
                        </div>

                        {/* --- PRACTICE LABEL --- */}
                        <div className="bg-pink-900 text-white font-bold px-4 py-2 inline-block w-fit rounded-sm shadow-sm text-base">
                            PRÁCTICA
                        </div>

                        {/* --- EXERCISE 1 --- */}
                        <div className="flex flex-col gap-4 pl-2">
                            <div className="flex items-start gap-2">
                                <PlayVideoButton trackingId={VIDEO_TRACKING_IDS.PRACTICE_1} title="Práctica 1" videoId="/pag4/vv-2" />
                                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm md:text-base">
                                    El número 21 se reparte en 7 grupos iguales.
                                    <br />
                                    ¿Cuántos elementos recibe cada grupo?
                                </p>
                            </div>

                            <div className="flex flex-wrap items-start gap-8 sm:gap-16 pl-4 md:pl-12">

                                {/* Interactive Division */}
                                <div className="relative pt-8">
                                    <div className="flex items-start gap-4">
                                        {/* Left Side: Dividend, Subtraction, Remainder */}
                                        <div className="flex flex-col items-end gap-1 relative right-2">
                                            {/* Dividend Input */}
                                            {/* Dividend Input */}
                                            <div className="pr-[5px]">
                                                <InputBox value={ex1_dividend.value} onChange={ex1_dividend.onChange} className="w-10 h-10 text-center border-2 border-gray-300 dark:border-gray-600 rounded focus:border-purple-500 text-lg font-bold bg-white dark:bg-gray-800 dark:text-white" />
                                            </div>

                                            {/* Subtraction Row: Minus Sign + Input */}
                                            {/* Subtraction Row: Minus Sign + Input */}
                                            <div className="relative pr-[5px]">
                                                <span className="font-bold text-xl dark:text-white absolute -left-5 top-1">-</span>
                                                <InputBox value={ex1_subtraction.value} onChange={ex1_subtraction.onChange} className="w-10 h-10 text-center border-2 border-gray-300 dark:border-gray-600 rounded focus:border-purple-500 text-lg font-bold bg-white dark:bg-gray-800 dark:text-white" />
                                            </div>

                                            {/* Divider Line */}
                                            <div className="w-[120px] h-0.5 bg-black dark:bg-white my-1"></div>

                                            {/* Remainder Input */}
                                            <div className="pr-[5px]">
                                                <InputBox value={ex1_remainder.value} onChange={ex1_remainder.onChange} className="w-10 h-10 text-center border-2 border-gray-300 dark:border-gray-600 rounded focus:border-purple-500 text-lg font-bold bg-white dark:bg-gray-800 dark:text-white" />
                                            </div>
                                        </div>

                                        {/* Vertical Separator Line for Division Bracket */}
                                        <div className="border-l-2 border-black dark:border-white pl-4 pb-1 -ml-2 h-[50%] flex flex-col gap-4">
                                            {/* Divisor Input (with bottom border) */}
                                            <div className="border-b-2 border-black dark:border-white pb-2 pr-2">
                                                <InputBox value={ex1_divisor.value} onChange={ex1_divisor.onChange} className="w-10 h-10 text-center border-2 border-gray-300 dark:border-gray-600 rounded focus:border-purple-500 text-lg font-bold bg-white dark:bg-gray-800 dark:text-white" />
                                            </div>
                                            {/* Quotient Input */}
                                            <div>
                                                <InputBox value={ex1_quotient.value} onChange={ex1_quotient.onChange} className="w-10 h-10 text-center border-2 border-gray-300 dark:border-gray-600 rounded focus:border-purple-500 text-lg font-bold bg-white dark:bg-gray-800 dark:text-white" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Verification Multiplication (3 Rows) */}
                                <div className="flex flex-col gap-4 border-l border-gray-200 dark:border-gray-700 pl-4 sm:pl-8">
                                    {/* Row 1 */}
                                    <div className="flex items-center gap-2">
                                        <InputBox value={ex1_m1_a.value} onChange={ex1_m1_a.onChange} className="w-10 h-10 text-center border-2 border-gray-300 dark:border-gray-600 rounded focus:border-purple-500 text-lg font-bold bg-white dark:bg-gray-800 dark:text-white" />
                                        <span className="font-bold dark:text-white">×</span>
                                        <InputBox value={ex1_m1_b.value} onChange={ex1_m1_b.onChange} className="w-10 h-10 text-center border-2 border-gray-300 dark:border-gray-600 rounded focus:border-purple-500 text-lg font-bold bg-white dark:bg-gray-800 dark:text-white" />
                                        <span className="font-bold dark:text-white">=</span>
                                        <InputBox value={ex1_m1_res.value} onChange={ex1_m1_res.onChange} className="w-10 h-10 text-center border-2 border-gray-300 dark:border-gray-600 rounded focus:border-purple-500 text-lg font-bold bg-white dark:bg-gray-800 dark:text-white" />
                                    </div>
                                    {/* Row 2 */}
                                    <div className="flex items-center gap-2">
                                        <InputBox value={ex1_m2_a.value} onChange={ex1_m2_a.onChange} className="w-10 h-10 text-center border-2 border-gray-300 dark:border-gray-600 rounded focus:border-purple-500 text-lg font-bold bg-white dark:bg-gray-800 dark:text-white" />
                                        <span className="font-bold dark:text-white">×</span>
                                        <InputBox value={ex1_m2_b.value} onChange={ex1_m2_b.onChange} className="w-10 h-10 text-center border-2 border-gray-300 dark:border-gray-600 rounded focus:border-purple-500 text-lg font-bold bg-white dark:bg-gray-800 dark:text-white" />
                                        <span className="font-bold dark:text-white">=</span>
                                        <InputBox value={ex1_m2_res.value} onChange={ex1_m2_res.onChange} className="w-10 h-10 text-center border-2 border-gray-300 dark:border-gray-600 rounded focus:border-purple-500 text-lg font-bold bg-white dark:bg-gray-800 dark:text-white" />
                                    </div>
                                    {/* Row 3 */}
                                    <div className="flex items-center gap-2">
                                        <InputBox value={ex1_m3_a.value} onChange={ex1_m3_a.onChange} className="w-10 h-10 text-center border-2 border-gray-300 dark:border-gray-600 rounded focus:border-purple-500 text-lg font-bold bg-white dark:bg-gray-800 dark:text-white" />
                                        <span className="font-bold dark:text-white">×</span>
                                        <InputBox value={ex1_m3_b.value} onChange={ex1_m3_b.onChange} className="w-10 h-10 text-center border-2 border-gray-300 dark:border-gray-600 rounded focus:border-purple-500 text-lg font-bold bg-white dark:bg-gray-800 dark:text-white" />
                                        <span className="font-bold dark:text-white">=</span>
                                        <InputBox value={ex1_m3_res.value} onChange={ex1_m3_res.onChange} className="w-10 h-10 text-center border-2 border-gray-300 dark:border-gray-600 rounded focus:border-purple-500 text-lg font-bold bg-white dark:bg-gray-800 dark:text-white" />
                                    </div>

                                    <div className="flex items-center gap-2 mt-2">
                                        <FeedbackButton
                                            onCheck={checkEx1}
                                            onReset={resetEx1}
                                            status={ex1Status}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- EXERCISE 2 (Terms) --- */}
                        <div className="flex flex-col gap-3 pl-4 border-purple-100 py-2">
                            <div className="grid gap-2">
                                <div className="flex items-center flex-wrap gap-2">
                                    <span className="w-3 h-3 bg-pink-900 rounded-sm"></span>
                                    <span className="font-semibold text-gray-800 dark:text-gray-200 text-base">El número 21 es</span>
                                    <select
                                        className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 dark:text-white"
                                        value={ex2_val1}
                                        onChange={(e) => setEx2_val1(e.target.value)}
                                    >
                                        <option value="">seleccionar...</option>
                                        <option value="dividendo">dividendo</option>
                                        <option value="divisor">divisor</option>
                                        <option value="cociente">cociente</option>
                                    </select>
                                </div>

                                <div className="flex items-center flex-wrap gap-2">
                                    <span className="font-semibold text-gray-800 dark:text-gray-200 ml-5 text-base">El número de grupos 7 es</span>
                                    <select
                                        className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 dark:text-white"
                                        value={ex2_val2}
                                        onChange={(e) => setEx2_val2(e.target.value)}
                                    >
                                        <option value="">seleccionar...</option>
                                        <option value="dividendo">dividendo</option>
                                        <option value="divisor">divisor</option>
                                        <option value="cociente">cociente</option>
                                    </select>
                                </div>

                                <div className="flex items-center flex-wrap gap-2">
                                    <span className="font-semibold text-gray-800 dark:text-gray-200 ml-5 text-base">El resultado de que cada grupo recibe es</span>
                                    <select
                                        className="border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 dark:text-white"
                                        value={ex2_val3}
                                        onChange={(e) => setEx2_val3(e.target.value)}
                                    >
                                        <option value="">seleccionar...</option>
                                        <option value="dividendo">dividendo</option>
                                        <option value="divisor">divisor</option>
                                        <option value="cociente">cociente</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mt-2 ml-5">
                                <FeedbackButton
                                    onCheck={checkEx2}
                                    onReset={resetEx2}
                                    status={ex2Status}
                                />
                            </div>
                        </div>

                        {/* --- PROBLEM 1 --- */}
                        <div className="flex flex-col gap-2 pl-2">
                            <div className="flex items-start gap-2">
                                <PlayVideoButton trackingId={VIDEO_TRACKING_IDS.PROBLEM_1} title="Problema 1" videoId="/pag4/vv-3" />
                                <div className="border border-pink-900 rounded px-2 text-pink-900 font-bold self-start whitespace-nowrap text-base">PROBLEMA 1</div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200 text-base">
                                    Ana y María quieren repartir 12 muñecas entre las dos.<br />
                                    ¿Cuántas muñecas tendrán <span className="text-red-500 font-bold">cada una</span>?
                                </p>
                            </div>
                            <div className="flex items-center justify-center gap-2 ml-12 mt-1">
                                <InputBox value={p1_div1.value} onChange={p1_div1.onChange} className="w-10 h-10 text-center bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 dark:text-white rounded" />
                                <span className="text-xl font-bold dark:text-white">÷</span>
                                <InputBox value={p1_div2.value} onChange={p1_div2.onChange} className="w-10 h-10 text-center bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 dark:text-white rounded" />
                                <span className="text-xl font-bold dark:text-white">=</span>
                                <InputBox value={p1_res.value} onChange={p1_res.onChange} className="w-10 h-10 text-center bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 dark:text-white rounded" />

                                <div className="flex flex-col gap-1 ml-4">
                                    <FeedbackButton
                                        onCheck={checkP1}
                                        onReset={resetP1}
                                        status={p1Status}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* --- PROBLEM 2 --- */}
                        <div className="flex flex-col gap-2 pl-2 pb-4">
                            <div className="flex items-start gap-2">
                                <PlayVideoButton trackingId={VIDEO_TRACKING_IDS.PROBLEM_2} title="Problema 2" videoId="/pag4/vv-4" />
                                <div className="border border-pink-900 rounded px-2 text-pink-900 font-bold py-0.5 self-start whitespace-nowrap text-base">PROBLEMA 2</div>
                                <p className="font-semibold text-gray-800 dark:text-gray-200 text-base">
                                    En la bodega hay 64 cuadernos. Cada paquete trae 8 cuadernos.
                                    ¿Cuántos <span className="text-red-500 font-bold">paquetes completos</span> se pueden armar?
                                </p>
                            </div>
                            <div className="flex items-center justify-center gap-2 ml-12 mt-1">
                                <InputBox value={p2_div1.value} onChange={p2_div1.onChange} className="w-10 h-10 text-center bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 dark:text-white rounded" />
                                <span className="text-xl font-bold dark:text-white">÷</span>
                                <InputBox value={p2_div2.value} onChange={p2_div2.onChange} className="w-10 h-10 text-center bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 dark:text-white rounded" />
                                <span className="text-xl font-bold dark:text-white">=</span>
                                <InputBox value={p2_res.value} onChange={p2_res.onChange} className="w-10 h-10 text-center bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 dark:text-white rounded" />

                                <div className="flex flex-col gap-1 ml-4">
                                    <FeedbackButton
                                        onCheck={checkP2}
                                        onReset={resetP2}
                                        status={p2Status}
                                    />
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

// --- Helper Components & Hooks ---

// Hook to manage input state
const useInputState = (initialValue: string = '') => {
    const [value, setValue] = useState(initialValue);
    return {
        value,
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setValue(e.target.value),
        reset: () => setValue('')
    };
};


// Input Component
const InputBox = ({ value, onChange, className = "w-10 h-10 text-center border-2 border-gray-300 dark:border-gray-600 rounded focus:border-purple-500 focus:outline-none text-lg font-bold bg-white dark:bg-gray-800 dark:text-white" }: { value: string; onChange: (e: any) => void; className?: string }) => (
    <input
        type="text"
        value={value}
        onChange={onChange}
        className={className}
        inputMode="numeric"
        autoComplete="off"
    />
);
