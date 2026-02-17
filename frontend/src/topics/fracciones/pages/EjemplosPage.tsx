'use client';

import React, { useRef, useState } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface Props { zoom?: number; }

export function EjemplosPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        EX_BALLS: 'fracciones-ex-balls',
        EX_BOOKS: 'fracciones-ex-books',
        EX_BONUS: 'fracciones-ex-bonus',
    };

    const [videoModal, setVideoModal] = useState<{ isOpen: boolean; title: string; videoId?: string }>({
        isOpen: false, title: '', videoId: undefined
    });
    const currentTrackingRef = useRef<string | undefined>(undefined);

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

    const PlayBtn = ({ trackingId, title, className = '' }: { trackingId: string; title: string; className?: string }) => (
        <button type="button" onClick={() => openVideo(trackingId, title)}
            className={`w-10 h-10 flex items-center justify-center text-white rounded-full bg-purple-600 hover:bg-purple-700 shadow-md flex-shrink-0 ${className}`}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        </button>
    );

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones' }} pageId="fracciones-ejemplos">
            <div className="w-full p-4">
                <div className="relative ml-2 flex items-start">
                    {/* Header "A" */}
                    <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#be90de]" style={{ borderColor: '#be90de' }}>
                        A
                    </div>

                    {/* Content Container */}
                    <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-8 bg-white border-[#be90de] min-h-[900px]">
                        <div className="max-w-4xl mx-auto space-y-16">

                            {/* EXAMPLE 1: Balls */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <PlayBtn trackingId={VIDEO_TRACKING.EX_BALLS} title="Ejemplo: Pelotas" />
                                    <span className="bg-green-600 text-white px-4 py-1.5 font-bold text-lg rounded shadow-sm">Ejemplo:</span>
                                </div>

                                <p className="text-xl text-gray-800 leading-relaxed">
                                    Se tienen en una bolsa <span className="text-red-600 font-bold">doce pelotas rojas</span> y <span className="text-blue-600 font-bold">ocho azules</span>. La fracción que representa el número de pelotas azules:
                                </p>

                                <div className="flex justify-between items-center bg-white p-8 rounded-xl shadow-md border border-gray-100">
                                    {/* Visual Bag */}
                                    <div className="flex flex-col items-center">
                                        <h4 className="font-bold text-gray-700 mb-4">Dibuje la representación</h4>
                                        <div className="relative w-48 h-56">
                                            <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-xl overflow-visible">
                                                {/* Bag Shape (simple path) */}
                                                <path d="M50,40 Q30,100 20,180 Q20,230 100,230 Q180,230 180,180 Q170,100 150,40 Q130,20 100,20 Q70,20 50,40 Z" fill="#f3f4f6" stroke="black" strokeWidth="3" />
                                                {/* Bag Knot area */}
                                                <path d="M70,35 Q100,10 130,35" fill="none" stroke="black" strokeWidth="3" />
                                                <path d="M85,30 L115,30" fill="none" stroke="black" strokeWidth="3" />

                                                {/* Balls inside (randomly positioned) */}
                                                <g>
                                                    {/* Red balls (12) */}
                                                    {[
                                                        { cx: 60, cy: 180 }, { cx: 90, cy: 200 }, { cx: 130, cy: 180 }, { cx: 45, cy: 150 },
                                                        { cx: 80, cy: 160 }, { cx: 120, cy: 150 }, { cx: 155, cy: 160 }, { cx: 60, cy: 120 },
                                                        { cx: 100, cy: 130 }, { cx: 140, cy: 120 }, { cx: 80, cy: 90 }, { cx: 120, cy: 100 }
                                                    ].map((pos, i) => (
                                                        <circle key={`r-${i}`} cx={pos.cx} cy={pos.cy} r="10" fill="#dc2626" stroke="black" strokeWidth="1" />
                                                    ))}
                                                    {/* Blue balls (8) */}
                                                    {[
                                                        { cx: 40, cy: 190 }, { cx: 110, cy: 190 }, { cx: 150, cy: 190 }, { cx: 100, cy: 170 },
                                                        { cx: 140, cy: 140 }, { cx: 50, cy: 100 }, { cx: 100, cy: 70 }, { cx: 110, cy: 215 }
                                                    ].map((pos, i) => (
                                                        <circle key={`b-${i}`} cx={pos.cx} cy={pos.cy} r="10" fill="#2563eb" stroke="black" strokeWidth="1" />
                                                    ))}
                                                </g>
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Divider Line */}
                                    <div className="w-0.5 h-48 bg-gray-300 mx-8"></div>

                                    {/* Calculation */}
                                    <div className="flex flex-col items-center gap-6 flex-1">
                                        <div className="flex flex-col items-center">
                                            <h4 className="font-bold text-gray-700 text-lg">Total de pelotas iguales:</h4>
                                            <div className="text-3xl font-bold mt-2">
                                                <span className="text-blue-600">8</span> + <span className="text-red-600">12</span> = 20
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center">
                                            <p className="font-bold text-gray-700 mb-2 text-lg">Número de pelotas azules:</p>
                                            <p className="text-4xl font-bold text-blue-600 text-center">8</p>
                                        </div>

                                        <div className="flex flex-col items-center text-center mt-4 bg-gray-50 p-4 rounded-lg border w-full">
                                            <p className="font-bold text-gray-700 mb-2 text-lg">La fracción es:</p>
                                            <div className="flex flex-col items-center">
                                                <span className="text-5xl font-bold text-blue-600">8</span>
                                                <div className="w-20 h-1 bg-black my-2 rounded-full"></div>
                                                <span className="text-5xl font-bold text-black">20</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* EXAMPLE 2: Books */}
                            <div className="space-y-8 pt-12 border-t-2 border-dashed border-gray-200">
                                <div className="flex items-center gap-4">
                                    <PlayBtn trackingId={VIDEO_TRACKING.EX_BOOKS} title="Ejemplo: Libros" />
                                    <span className="bg-green-600 text-white px-4 py-1.5 font-bold text-lg rounded shadow-sm">Ejemplo:</span>
                                </div>

                                <p className="text-xl text-gray-800 leading-relaxed max-w-4xl">
                                    Dentro de una caja hay 45 textos escolares. Si la quinta parte <span className="font-bold text-purple-700">1/5</span> de ellos son de matemáticas, <span className="font-bold">¿cuántos libros de matemáticas hay en total?</span>
                                </p>

                                <div className="space-y-4 bg-yellow-50 p-6 rounded-xl border border-yellow-100">
                                    <p className="font-bold text-gray-700 text-lg">Vamos a resolver:</p>
                                    <div className="text-lg text-gray-800 flex items-center gap-2 flex-wrap">
                                        La fracción
                                        <div className="inline-flex flex-col items-center align-middle mx-1 font-bold">
                                            <span className="leading-none border-b-2 border-black px-1">1</span>
                                            <span className="leading-none px-1">5</span>
                                        </div>
                                        dice que el total se divide en 5 partes iguales y se toman 1 de matemáticas de esas partes.
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-4">
                                    {/* 5 Books Visual */}
                                    <div className="flex flex-col items-center gap-4">
                                        <h4 className="font-bold text-gray-600">Representación Visual (1 de 5 partes)</h4>
                                        <div className="flex gap-2 p-4 bg-gray-100 rounded-xl">
                                            {[
                                                { label: 'Matemáticas', color: 'bg-green-600 border-green-800 text-white', icon: '📐' },
                                                { label: 'Español', color: 'bg-red-500 border-red-700 text-white', icon: '📝' },
                                                { label: 'Biología', color: 'bg-yellow-500 border-yellow-700 text-white', icon: '🧬' },
                                                { label: 'Sociales', color: 'bg-blue-500 border-blue-700 text-white', icon: '🌍' },
                                                { label: 'Historia', color: 'bg-orange-500 border-orange-700 text-white', icon: '🏛️' }
                                            ].map((book, i) => (
                                                <div key={i} className="flex flex-col items-center group relative">
                                                    <div className={`w-20 h-28 rounded-r-md border-l-4 border-gray-300 shadow-lg flex flex-col items-center justify-center p-1 text-center font-bold text-[10px] relative transition-transform transform hover:-translate-y-2 ${book.color} ${i === 0 ? 'ring-4 ring-purple-400 ring-offset-2 z-10 scale-105' : 'opacity-80'}`}>
                                                        <span className="text-2xl mb-1">{book.icon}</span>
                                                        <span className="leading-tight">{book.label}</span>
                                                        {/* Spine effect */}
                                                        <div className="absolute left-0 top-0 bottom-0 w-2 bg-black bg-opacity-20"></div>
                                                    </div>
                                                    {i === 0 && (
                                                        <div className="absolute -top-3 bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">1/5</div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Calculation */}
                                    <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                                        <p className="text-xl text-gray-800 font-medium text-center">Para saber cuántos libros son de matemáticas, se divide:</p>

                                        <div className="bg-white px-8 py-6 rounded-xl shadow-lg border-2 border-purple-100">
                                            <div className="text-5xl font-black text-gray-800 flex items-center justify-center gap-4 tracking-wider">
                                                <span className="text-gray-500">45</span>
                                                <span className="text-purple-400">÷</span>
                                                <span className="text-purple-600">5</span>
                                                <span className="text-gray-400">=</span>
                                                <span className="text-green-600 text-6xl scale-110 transform">9</span>
                                            </div>
                                        </div>

                                        <p className="text-2xl text-red-600 font-bold bg-red-50 px-6 py-3 rounded-lg border border-red-100">
                                            RESPUESTA: Hay 9 libros de matemáticas.
                                        </p>
                                    </div>
                                </div>

                                <div className="flex justify-center pt-8 border-t">
                                    <button type="button" onClick={() => openVideo(VIDEO_TRACKING.EX_BONUS, 'Bono Explicado')}
                                        className="flex items-center gap-3 group bg-white border-2 border-purple-100 px-6 py-3 rounded-full hover:border-purple-300 shadow-sm transition-all hover:shadow-md">
                                        <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white shadow group-hover:bg-purple-700 transition-colors">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                        </div>
                                        <span className="text-purple-700 font-bold text-xl uppercase tracking-wide group-hover:text-purple-900">BONO EXPLICADO</span>
                                    </button>
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
