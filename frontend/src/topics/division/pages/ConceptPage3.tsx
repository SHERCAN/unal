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
    const ex1_quotient = useInputState();
    const ex1_subtraction = useInputState();
    const ex1_remainder = useInputState();
    const ex1_mult_factor = useInputState();
    const ex1_mult_result = useInputState();
    const [ex1Status, setEx1Status] = useState<'idle' | 'correct' | 'incorrect'>('idle');

    const checkEx1 = () => {
        if (
            ex1_quotient.value === '3' &&
            ex1_subtraction.value === '21' &&
            ex1_remainder.value === '0' &&
            ex1_mult_factor.value === '3' &&
            ex1_mult_result.value === '21'
        ) {
            setEx1Status('correct');
        } else {
            setEx1Status('incorrect');
        }
    };

    // --- Exercise 2 State (Term Identification) ---
    const ex2_term1 = useInputState('dividendo'); // Pre-filled in image? No, image has dropdowns. Let's assume empty nicely.
    // Actually image shows "El número 21 es [dividendo]..." with a dropdown.
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
    const InputBox = ({ value, onChange, className = "w-10 h-10 text-center border-2 border-gray-300 rounded focus:border-purple-500 focus:outline-none" }: any) => (
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

                        <div className="flex flex-wrap items-end gap-12 sm:gap-24 pl-4 md:pl-12">

                            {/* Interactive Division */}
                            <div className="relative">
                                <div className="flex">
                                    <div className="flex flex-col items-end gap-1 relative mb-2">
                                        {/* Box for dividend isn't editable in image, but let's just make it text for simplicity 21 */}
                                        <span className="font-black text-2xl pr-2">21</span>
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-xl">-</span>
                                            <InputBox value={ex1_subtraction.value} onChange={ex1_subtraction.onChange} />
                                        </div>
                                        <div className="border-t-2 border-black w-full flex justify-center pt-1">
                                            <InputBox value={ex1_remainder.value} onChange={ex1_remainder.onChange} />
                                        </div>
                                    </div>
                                    {/* Line separator */}
                                    <div className="border-l-2 border-b-2 border-black pl-2 pb-1">
                                        <span className="font-black text-2xl px-2">7</span>
                                    </div>
                                </div>
                                {/* Quotient Input */}
                                <div className="absolute top-[35px] left-[70px]">
                                    {/* Positioning relative to the 7. 
                                        Actually, standard layout: 
                                        Dividend | Divisor
                                                 | Quotient
                                     */}
                                    <InputBox value={ex1_quotient.value} onChange={ex1_quotient.onChange} />
                                </div>
                            </div>

                            {/* Verification Multiplication */}
                            <div className="flex flex-col items-start gap-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 border-2 border-gray-300 rounded flex items-center justify-center bg-gray-50 font-bold">7</div>
                                    <span className="font-bold">×</span>
                                    <InputBox value={ex1_mult_factor.value} onChange={ex1_mult_factor.onChange} />
                                    <span className="font-bold">=</span>
                                    <InputBox value={ex1_mult_result.value} onChange={ex1_mult_result.onChange} />
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <CheckButton onClick={checkEx1} />
                                    <Feedback status={ex1Status} />
                                </div>
                            </div>

                            <p className="text-red-500 font-bold text-xs max-w-[150px] self-center">
                                Ingrese los numeros en cada cuadro y compruebe
                            </p>
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
