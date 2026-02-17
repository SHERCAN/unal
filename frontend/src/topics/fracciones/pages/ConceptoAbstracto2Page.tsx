'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

// Import assets
import romboImg from '../rombo.png';
import cebraImg from '../cebra.png';
import acordeonImg from '../acordeon.png';
import circulosImg from '../circulos.png';
import cebraOblicuaImg from '../cebraoblicua.png';

interface Props { zoom?: number; }

export function ConceptoAbstracto2Page({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        FIG_1: 'fracciones-fig-1',
        FIG_2: 'fracciones-fig-2',
        FIG_3: 'fracciones-fig-3',
        FIG_4: 'fracciones-fig-4',
        NOTA: 'fracciones-nota-irreg',
    };

    const [videoModal, setVideoModal] = useState<{ isOpen: boolean; title: string; videoId?: string }>({
        isOpen: false, title: '', videoId: undefined
    });
    const currentTrackingRef = useRef<string | undefined>(undefined);

    const [inputs, setInputs] = useState({
        ex1_n: '', ex1_d: '',
        ex2_n: '', ex2_d: '',
        ex3_n: '', ex3_d: '',
        ex4_n: '', ex4_d: '',
    });

    // State for validation messages
    const [results, setResults] = useState<{ [key: string]: string | null }>({});

    const handleVideoComplete = () => {
        if (currentTrackingRef.current) {
            markVideoWatched(currentTrackingRef.current);
            currentTrackingRef.current = undefined;
        }
    };

    const openVideo = (trackingId: string, title: string) => {
        currentTrackingRef.current = trackingId;
        setVideoModal({ isOpen: true, title, videoId: undefined });
    };

    const PlayBtn = ({ trackingId, title }: { trackingId: string; title: string }) => (
        <button type="button" onClick={() => openVideo(trackingId, title)}
            className="w-8 h-8 flex items-center justify-center text-white rounded-full bg-purple-600 hover:bg-purple-700 shadow-md flex-shrink-0 transition-transform hover:scale-105 active:scale-95">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        </button>
    );

    const validate = (id: string, correctN: string, correctD: string) => {
        const n = inputs[`${id}_n` as keyof typeof inputs];
        const d = inputs[`${id}_d` as keyof typeof inputs];
        if (n === correctN && d === correctD) {
            setResults({ ...results, [id]: 'correct' });
        } else {
            setResults({ ...results, [id]: `Incorrecto` });
        }
    };

    interface ExerciseRowProps {
        id: string; // Using string to match the keys in state
        label: string;
        videoTracking: string;
        title: string;
        imgSrc: any; // Next.js image import
        correctN: string;
        correctD: string;
        className?: string;
    }

    const ExerciseRow = ({
        id,
        label,
        imgSrc,
        correctN,
        correctD,
        title,
        className = ""
    }: Omit<ExerciseRowProps, 'videoTracking'>) => {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                {/* Square Bullet & Label */}
                <div className="flex items-center gap-2 mr-2 shrink-0">
                    <div className="w-4 h-4 border-2 border-purple-600 bg-white"></div>
                    <span className="font-bold text-gray-800 text-xl">{label}</span>
                </div>

                {/* Image */}
                <div className="flex-1 flex justify-center px-1">
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
                    <div className="flex flex-col items-center gap-1">
                        <input
                            type="number"
                            className={`w-12 h-10 border-2 text-center text-lg font-bold rounded outline-none transition-all ${results[id] === 'correct' ? 'border-green-500 bg-green-50 text-green-700' : 'border-purple-300 focus:border-purple-600'}`}
                            value={inputs[`${id}_n` as keyof typeof inputs]}
                            onChange={(e) => setInputs({ ...inputs, [`${id}_n`]: e.target.value })}
                        />
                        <div className="w-12 h-0.5 bg-black rounded-full"></div>
                        <input
                            type="number"
                            className={`w-12 h-10 border-2 text-center text-lg font-bold rounded outline-none transition-all ${results[id] === 'correct' ? 'border-green-500 bg-green-50 text-green-700' : 'border-purple-300 focus:border-purple-600'}`}
                            value={inputs[`${id}_d` as keyof typeof inputs]}
                            onChange={(e) => setInputs({ ...inputs, [`${id}_d`]: e.target.value })}
                        />
                    </div>

                    <div className="flex flex-col gap-1 w-24">
                        <button
                            onClick={() => validate(id, correctN, correctD)}
                            className={`font-black py-2 px-2 rounded-lg shadow-sm text-xs w-full transition-all active:scale-95 ${results[id] === 'correct' ? 'bg-green-600 text-white cursor-default' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}>
                            {results[id] === 'correct' ? '¡OK!' : 'LISTO'}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones' }} pageId="fracciones-concepto-abstracto-2">
            <div className="w-full p-4">
                <div className="relative ml-2 flex items-start">
                    {/* Header Tab "A" */}
                    <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#be90de]" style={{ borderColor: '#be90de' }}>
                        A
                    </div>

                    {/* Content Container */}
                    <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 bg-white border-[#be90de]">

                        {/* NEW Header Section */}
                        <div className="mb-10 space-y-4">
                            <p className="text-xl text-gray-800 font-medium ml-4">
                                donde <strong>4</strong> es el numerador y <strong>6</strong> es el denominador.
                            </p>

                            <div className="flex items-center flex-wrap gap-2 ml-4">
                                <span className="text-red-600 font-black text-2xl">ERROR:</span>

                                {/* Fraction 6/4 */}
                                <div className="inline-flex flex-col items-center mx-2 align-middle leading-none">
                                    <span className="text-xl font-bold text-black border-b-2 border-black px-1">6</span>
                                    <span className="text-xl font-bold text-blue-600">4</span>
                                </div>

                                <span className="text-xl text-gray-800 font-medium">
                                    no es correcta porque no es apropiada para la fracción.
                                </span>

                                <PlayBtn trackingId={VIDEO_TRACKING.NOTA} title="Error Fraccion" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-10 items-start border-t border-gray-100 pt-8">

                            {/* Columna Izquierda */}
                            <div className="space-y-10">
                                {/* a. Rombo */}
                                <ExerciseRow
                                    id="ex1" label="a." title="Rombo"
                                    imgSrc={romboImg} correctN="9" correctD="16"
                                />
                                {/* c. Acordeon */}
                                <ExerciseRow
                                    id="ex3" label="c." title="Triángulos"
                                    imgSrc={acordeonImg} correctN="5" correctD="14"
                                />
                            </div>

                            {/* Columna Derecha */}
                            <div className="space-y-10">
                                {/* b. Cebra */}
                                <ExerciseRow
                                    id="ex2" label="b." title="Barras"
                                    imgSrc={cebraImg} correctN="5" correctD="9"
                                />
                                {/* d. Circulos */}
                                <ExerciseRow
                                    id="ex4" label="d." title="Círculos"
                                    imgSrc={circulosImg} correctN="8" correctD="15"
                                />
                            </div>

                            {/* NOTA spanning full width */}
                            <div className="col-span-1 xl:col-span-2 flex flex-col items-center gap-4 pt-4 border-t-2 border-gray-100 mt-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-red-600 text-xl">NOTA:</span>
                                    <p className="text-lg text-gray-800 font-medium">
                                        Como se muestra la siguiente figura, <span className="font-bold text-red-600">NO</span> es realmente una forma de fracción.
                                    </p>
                                    <PlayBtn trackingId={VIDEO_TRACKING.NOTA} title="Nota Irregular" />
                                </div>

                                <div>
                                    <Image
                                        src={cebraOblicuaImg}
                                        alt="Cebra Oblicua"
                                        className="h-24 w-auto object-contain border border-black"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <VideoModal
                isOpen={videoModal.isOpen}
                onClose={() => setVideoModal(prev => ({ ...prev, isOpen: false }))}
                videoId={videoModal.videoId}
                title={videoModal.title}
                onComplete={handleVideoComplete}
            />
        </BookPageContainer>
    );
}
