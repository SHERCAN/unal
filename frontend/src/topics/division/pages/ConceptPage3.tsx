'use client';

import React, { useState } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { VIDEO_IDS } from '@/config/videos';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface DivisionConceptPage3Props {
    zoom?: number;
}

export function ConceptPage3({ zoom = 1 }: DivisionConceptPage3Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    // Video Tracking IDs
    const VIDEO_TRACKING_IDS = {
        EXAMPLE_MAIN: 'division-concept3-example',
        PRACTICE_1: 'division-concept3-practice-1',
        PRACTICE_2: 'division-concept3-practice-2',
        PROBLEM_1: 'division-concept3-problem-1',
        PROBLEM_2: 'division-concept3-problem-2'
    };

    const [videoModal, setVideoModal] = useState<{ isOpen: boolean; title: string; videoId?: string; trackingId?: string }>({
        isOpen: false,
        title: '',
        videoId: undefined,
        trackingId: undefined
    });

    const currentTrackingIdRef = React.useRef<string | undefined>(undefined);

    const handleVideoComplete = () => {
        const idToMark = currentTrackingIdRef.current;
        if (idToMark) {
            markVideoWatched(idToMark);
            currentTrackingIdRef.current = undefined;
        }
    };

    const openVideo = (title: string, trackingId: string) => {
        currentTrackingIdRef.current = trackingId;
        setVideoModal({
            isOpen: true,
            title,
            videoId: VIDEO_IDS.MODULE_DIVISION, // Placeholder
            trackingId
        });
    };

    const PlayButton = ({ trackingId, title }: { trackingId: string, title: string }) => (
        <button
            type="button"
            onMouseEnter={() => openVideo(title, trackingId)}
            className={`p-1 text-white rounded-full transition-all flex-shrink-0 inline-flex items-center justify-center ml-2 ${isVideoWatched(trackingId)
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-purple-600 hover:bg-purple-700'
                }`}
            style={{ width: 'clamp(1.5rem, 4vmin, 2rem)', height: 'clamp(1.5rem, 4vmin, 2rem)' }}
        >
            <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
            </svg>
        </button>
    );

    // --- State Handler Factory ---
    const useInputState = (initialValue: string = '') => {
        const [value, setValue] = useState(initialValue);
        return { value, onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setValue(e.target.value) };
    };

    // --- Exercise 1 State (21 / 7) ---
    // Dividend: 2 digits (Tens, Units) -> 21
    const ex1_div_tens = useInputState();
    const ex1_div_units = useInputState();
    // Divisor: 1 digit -> 7
    const ex1_divisor = useInputState();
    // Quotient: 1 digit -> 3
    const ex1_quotient = useInputState();
    // Subtraction: 2 digits (Tens, Units) -> 21
    const ex1_sub_tens = useInputState();
    const ex1_sub_units = useInputState();
    // Remainder: 1 digit -> 0
    const ex1_remainder = useInputState();

    // Multiplication Checks (3 rows)
    // Row 1
    const ex1_m1_a = useInputState();
    const ex1_m1_b = useInputState();
    const ex1_m1_res = useInputState();
    // Row 2
    const ex1_m2_a = useInputState();
    const ex1_m2_b = useInputState();
    const ex1_m2_res = useInputState();
    // Row 3
    const ex1_m3_a = useInputState();
    const ex1_m3_b = useInputState();
    const ex1_m3_res = useInputState();

    const [ex1Status, setEx1Status] = useState<'idle' | 'correct' | 'incorrect'>('idle');

    const checkEx1 = () => {
        // Validation Logic:
        // Division must be correct:
        // Dividend: 2, 1
        // Divisor: 7
        // Quotient: 3
        // Subtraction: 2, 1
        // Remainder: 0
        const isDivisionCorrect =
            ex1_div_tens.value === '2' &&
            ex1_div_units.value === '1' &&
            ex1_divisor.value === '7' &&
            ex1_quotient.value === '3' &&
            ex1_sub_tens.value === '2' &&
            ex1_sub_units.value === '1' &&
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
    const [ex2Status, setEx2Status] = useState<'idle' | 'correct' | 'incorrect'>('idle');

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
    const [p1Status, setP1Status] = useState<'idle' | 'correct' | 'incorrect'>('idle');

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
    const [p2Status, setP2Status] = useState<'idle' | 'correct' | 'incorrect'>('idle');

    const checkP2 = () => {
        if (p2_div1.value === '64' && p2_div2.value === '8' && p2_res.value === '8') {
            setP2Status('correct');
        } else {
            setP2Status('incorrect');
        }
    };

    // Helper components
    const InputBox = ({ value, onChange, className = "w-10 h-10 text-center border-2 border-gray-300 rounded focus:border-purple-500 focus:outline-none text-lg font-bold" }: any) => (
        <input type="text" value={value} onChange={onChange} className={className} inputMode="numeric" />
    );

    const Feedback = ({ status }: { status: 'idle' | 'correct' | 'incorrect' }) => {
        if (status === 'idle') return null;
        return (
            <span className={`font-bold ml-2 ${status === 'correct' ? 'text-green-600' : 'text-orange-500'}`}>
                {status === 'correct' ? 'CORRECTO' : 'INCORRECTO'}
            </span>
        );
    };

    const CheckButton = ({ onClick }: { onClick: () => void }) => (
        <button
            onClick={onClick}
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-1 px-4 rounded shadow-md transform active:scale-95 transition-all text-sm"
        >
            ¿LISTO?
        </button>
    );

    return (
        <BookPageContainer
            zoom={zoom}
            moduleHeader={{
                icon: '/division-icon.png',
                name: 'División'
            }}
            pageId="division-concept-3"
        >
            <div className="relative border-2 rounded-xl p-6 h-full flex flex-col bg-white" style={{ borderColor: '#be90de' }}>

                {/* Header Flag A */}
                <div className="absolute -top-4 left-4 px-3 py-1 rounded-sm font-black text-xl text-white" style={{ backgroundColor: '#be90de' }}>
                    A
                </div>

                <div className="w-full flex-1 flex flex-col overflow-y-auto gap-6 px-1 mt-2">

                    {/* --- EXAMPLE SECTION --- */}
                    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-green-600 text-white px-3 py-1 rounded font-bold text-sm">Ejemplo:</div>
                            <span className="font-bold text-gray-800">Calcule 25 ÷ 5:</span>
                        </div>

                        <div className="flex flex-wrap justify-around items-start gap-8">

                            {/* Division Visual */}
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-end text-red-500 font-bold text-sm gap-1">
                                    <span>Dividendo</span>
                                    <span className="mt-8 font-black text-black">- 25</span>
                                    <div className="border-t-2 border-black w-full text-center font-black text-black">00</div>
                                </div>
                                <div className="flex gap-2 items-start">
                                    <div className="flex flex-col items-center">
                                        <div className="flex">
                                            <span className="font-black text-2xl px-2">25</span>
                                            <div className="border-l-2 border-b-2 border-black pl-2 pb-1 pr-2">
                                                <span className="font-black text-2xl">5</span>
                                            </div>
                                        </div>
                                        <span className="font-black text-purple-600 text-2xl mt-1">5</span>
                                    </div>
                                    <div className="flex flex-col gap-4 text-red-500 font-bold text-sm mt-1">
                                        <span>Divisor</span>
                                        <span className="mt-4">Cociente</span>
                                    </div>
                                </div>
                            </div>

                            {/* Multiplication Table */}
                            <div className="border-l-2 border-gray-300 pl-4 font-bold font-mono text-gray-700">
                                <p>5 × 1 = 5</p>
                                <p>5 × 2 = 10</p>
                                <p>5 × 3 = 15</p>
                                <p>5 × 4 = 20</p>
                                <p>5 × <span className="text-purple-600">5</span> = <span className="text-red-500">25</span></p>
                            </div>
                        </div>

                        <div className="mt-4 text-sm text-gray-800 flex items-start gap-2">
                            <p>
                                Para dividir 25 entre 5, buscamos cuántas veces el número 5 está contenido en 25.
                                Como 5 × 5 = 25, el cociente es 5 y el resto es 0.
                            </p>
                            <PlayButton trackingId={VIDEO_TRACKING_IDS.EXAMPLE_MAIN} title="Explicación del ejemplo" />
                        </div>
                    </div>

                    {/* --- PRACTICE LABEL --- */}
                    <div className="bg-purple-900 text-white font-bold px-4 py-1 inline-block w-fit rounded-sm shadow-sm text-sm">
                        PRÁCTICA
                    </div>

                    {/* --- EXERCISE 1 --- */}
                    <div className="flex flex-col gap-4 pl-2">
                        <div className="flex items-start gap-2">
                            <PlayButton trackingId={VIDEO_TRACKING_IDS.PRACTICE_1} title="Ejercicio 1" />
                            <p className="font-bold text-gray-800 text-sm md:text-base">
                                El número 21 se reparte en 7 grupos iguales.
                                <br />
                                ¿Cuántos elementos recibe cada grupo?
                            </p>
                        </div>

                        <div className="flex flex-wrap items-start gap-8 sm:gap-16 pl-4 md:pl-12">

                            {/* Interactive Division */}
                            <div className="relative pt-8">
                                <div className="flex">
                                    <div className="flex flex-col items-end gap-1 relative mb-2">
                                        {/* Dividend Inputs: [ ] [ ] */}
                                        <div className="flex gap-1 pr-2 pb-1">
                                            <InputBox value={ex1_div_tens.value} onChange={ex1_div_tens.onChange} className="w-10 h-10 text-center border-2 border-gray-300 rounded focus:border-purple-500 text-lg font-bold" />
                                            <InputBox value={ex1_div_units.value} onChange={ex1_div_units.onChange} className="w-10 h-10 text-center border-2 border-gray-300 rounded focus:border-purple-500 text-lg font-bold" />
                                        </div>

                                        {/* Subtraction Inputs: - [ ] [ ] */}
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-xl">-</span>
                                            <InputBox value={ex1_sub_tens.value} onChange={ex1_sub_tens.onChange} className="w-10 h-10 text-center border-2 border-gray-300 rounded focus:border-purple-500 text-lg font-bold" />
                                            <InputBox value={ex1_sub_units.value} onChange={ex1_sub_units.onChange} className="w-10 h-10 text-center border-2 border-gray-300 rounded focus:border-purple-500 text-lg font-bold" />
                                        </div>

                                        {/* Remainder Input: [ ] */}
                                        <div className="border-t-2 border-black w-full flex justify-end pt-1 pr-[3px]">
                                            <InputBox value={ex1_remainder.value} onChange={ex1_remainder.onChange} className="w-10 h-10 text-center border-2 border-gray-300 rounded focus:border-purple-500 text-lg font-bold" />
                                        </div>
                                    </div>

                                    {/* Vertical Line */}
                                    <div className="border-l-2 border-black pl-2 pb-1 flex flex-col gap-2">
                                        {/* Divisor Input [ ] (with underline) */}
                                        <div className="border-b-2 border-black pb-2 pr-2">
                                            <InputBox value={ex1_divisor.value} onChange={ex1_divisor.onChange} className="w-10 h-10 text-center border-2 border-gray-300 rounded focus:border-purple-500 text-lg font-bold" />
                                        </div>
                                        {/* Quotient Input [ ] */}
                                        <div className="pt-1">
                                            <InputBox value={ex1_quotient.value} onChange={ex1_quotient.onChange} className="w-10 h-10 text-center border-2 border-gray-300 rounded focus:border-purple-500 text-lg font-bold" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Verification Multiplication (3 Rows) */}
                            <div className="flex flex-col gap-4 border-l border-gray-200 pl-4 sm:pl-8">
                                {/* Row 1 */}
                                <div className="flex items-center gap-2">
                                    <InputBox value={ex1_m1_a.value} onChange={ex1_m1_a.onChange} className="w-10 h-10 text-center border-2 border-gray-300 rounded focus:border-purple-500 text-lg font-bold" />
                                    <span className="font-bold">×</span>
                                    <InputBox value={ex1_m1_b.value} onChange={ex1_m1_b.onChange} className="w-10 h-10 text-center border-2 border-gray-300 rounded focus:border-purple-500 text-lg font-bold" />
                                    <span className="font-bold">=</span>
                                    <InputBox value={ex1_m1_res.value} onChange={ex1_m1_res.onChange} className="w-10 h-10 text-center border-2 border-gray-300 rounded focus:border-purple-500 text-lg font-bold" />
                                </div>
                                {/* Row 2 */}
                                <div className="flex items-center gap-2">
                                    <InputBox value={ex1_m2_a.value} onChange={ex1_m2_a.onChange} className="w-10 h-10 text-center border-2 border-gray-300 rounded focus:border-purple-500 text-lg font-bold" />
                                    <span className="font-bold">×</span>
                                    <InputBox value={ex1_m2_b.value} onChange={ex1_m2_b.onChange} className="w-10 h-10 text-center border-2 border-gray-300 rounded focus:border-purple-500 text-lg font-bold" />
                                    <span className="font-bold">=</span>
                                    <InputBox value={ex1_m2_res.value} onChange={ex1_m2_res.onChange} className="w-10 h-10 text-center border-2 border-gray-300 rounded focus:border-purple-500 text-lg font-bold" />
                                </div>
                                {/* Row 3 */}
                                <div className="flex items-center gap-2">
                                    <InputBox value={ex1_m3_a.value} onChange={ex1_m3_a.onChange} className="w-10 h-10 text-center border-2 border-gray-300 rounded focus:border-purple-500 text-lg font-bold" />
                                    <span className="font-bold">×</span>
                                    <InputBox value={ex1_m3_b.value} onChange={ex1_m3_b.onChange} className="w-10 h-10 text-center border-2 border-gray-300 rounded focus:border-purple-500 text-lg font-bold" />
                                    <span className="font-bold">=</span>
                                    <InputBox value={ex1_m3_res.value} onChange={ex1_m3_res.onChange} className="w-10 h-10 text-center border-2 border-gray-300 rounded focus:border-purple-500 text-lg font-bold" />
                                </div>

                                <div className="flex items-center gap-2 mt-2">
                                    <CheckButton onClick={checkEx1} />
                                    <Feedback status={ex1Status} />
                                </div>

                                <p className="text-red-500 font-bold text-xs max-w-[200px]">
                                    Ingrese los numeros en cada y compruebe
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* --- EXERCISE 2 (Terms) --- */}
                    <div className="flex flex-col gap-3 pl-4 border-l-4 border-purple-100 py-2">
                        <div className="grid gap-2">
                            <div className="flex items-center flex-wrap gap-2">
                                <span className="w-3 h-3 bg-purple-800 rounded-sm"></span>
                                <span className="font-bold text-gray-800">El número 21 es</span>
                                <select
                                    className="border border-gray-300 rounded px-2 py-1 bg-white"
                                    value={ex2_val1}
                                    onChange={(e) => setEx2_val1(e.target.value)}
                                >
                                    <option value="">seleccionar...</option>
                                    <option value="dividendo">dividendo</option>
                                    <option value="divisor">divisor</option>
                                    <option value="cociente">cociente</option>
                                </select>
                                <span className="text-red-500 font-bold text-xs ml-auto hidden sm:block">ACTIVIDAD INTERACTIVO</span>
                            </div>

                            <div className="flex items-center flex-wrap gap-2">
                                <span className="font-bold text-gray-800 ml-5">El número de grupos 7 es</span>
                                <select
                                    className="border border-gray-300 rounded px-2 py-1 bg-white"
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
                                <span className="font-bold text-gray-800 ml-5">El resultado de que cada grupo recibe es</span>
                                <select
                                    className="border border-gray-300 rounded px-2 py-1 bg-white"
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
                            <CheckButton onClick={checkEx2} />
                            <Feedback status={ex2Status} />
                        </div>
                    </div>

                    {/* --- PROBLEM 1 --- */}
                    <div className="flex flex-col gap-2 pl-2">
                        <div className="flex items-start gap-2">
                            <PlayButton trackingId={VIDEO_TRACKING_IDS.PROBLEM_1} title="Problema 1" />
                            <div className="border border-pink-300 rounded px-2 text-pink-700 font-bold text-xs py-0.5 self-start">PROBLEMA 1</div>
                            <p className="font-medium text-gray-800 text-sm leading-tight">
                                Ana y María quieren repartir 12 muñecas entre las dos.<br />
                                ¿Cuántas muñecas tendrán <span className="text-red-500 font-bold">cada una</span>?
                            </p>
                        </div>
                        <div className="flex items-center gap-2 ml-12 mt-1">
                            <InputBox value={p1_div1.value} onChange={p1_div1.onChange} className="w-10 h-10 text-center bg-gray-100 border border-gray-300" />
                            <span className="text-xl font-bold">÷</span>
                            <InputBox value={p1_div2.value} onChange={p1_div2.onChange} className="w-10 h-10 text-center bg-gray-100 border border-gray-300" />
                            <span className="text-xl font-bold">=</span>
                            <InputBox value={p1_res.value} onChange={p1_res.onChange} className="w-10 h-10 text-center bg-gray-100 border border-gray-300" />

                            <div className="flex flex-col gap-1 ml-4">
                                <Feedback status={p1Status} />
                                <CheckButton onClick={checkP1} />
                            </div>
                        </div>
                    </div>

                    {/* --- PROBLEM 2 --- */}
                    <div className="flex flex-col gap-2 pl-2 pb-4">
                        <div className="flex items-start gap-2">
                            <PlayButton trackingId={VIDEO_TRACKING_IDS.PROBLEM_2} title="Problema 2" />
                            <div className="border border-pink-300 rounded px-2 text-pink-700 font-bold text-xs py-0.5 self-start">PROBLEMA 2</div>
                            <p className="font-medium text-gray-800 text-sm leading-tight">
                                En la bodega hay 64 cuadernos. Cada paquete trae 8 cuadernos.
                                ¿Cuántos <span className="text-red-500 font-bold">paquetes completos</span> se pueden armar?
                            </p>
                        </div>
                        <div className="flex items-center gap-2 ml-12 mt-1">
                            <InputBox value={p2_div1.value} onChange={p2_div1.onChange} className="w-10 h-10 text-center bg-gray-100 border border-gray-300" />
                            <span className="text-xl font-bold">÷</span>
                            <InputBox value={p2_div2.value} onChange={p2_div2.onChange} className="w-10 h-10 text-center bg-gray-100 border border-gray-300" />
                            <span className="text-xl font-bold">=</span>
                            <InputBox value={p2_res.value} onChange={p2_res.onChange} className="w-10 h-10 text-center bg-gray-100 border border-gray-300" />

                            <div className="flex flex-col gap-1 ml-4">
                                <Feedback status={p2Status} />
                                <CheckButton onClick={checkP2} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <VideoModal
                isOpen={videoModal.isOpen}
                title={videoModal.title}
                videoId={videoModal.videoId}
                onClose={() => setVideoModal({ isOpen: false, title: '', videoId: undefined, trackingId: undefined })}
                canSkip={videoModal.videoId ? isVideoWatched(videoModal.trackingId || '') : false}
                onComplete={handleVideoComplete}
            />
        </BookPageContainer>
    );
}
