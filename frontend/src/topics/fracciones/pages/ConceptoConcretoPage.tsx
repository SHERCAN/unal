'use client';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import Image from 'next/image';

/**
 * Frame 170 — Fracciones
 * C section: Pizzero, Mesa, Pizza interaction
 *   - Assets: /fracciones/pizzero.png, /fracciones/mesa1.png
 */

interface Props { zoom?: number; }

export function ConceptoConcretoPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        C_PIZZA: 'fracciones-c-pizza',
        P_EXPLAIN: 'fracciones-p-explain',
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

    const PlayBtn = ({ trackingId, title, size = 'md' }: { trackingId: string; title: string; size?: 'sm' | 'md' }) => {
        const watched = isVideoWatched(trackingId);
        const sz = size === 'sm' ? 'w-10 h-10' : 'w-14 h-14';
        const iconSz = size === 'sm' ? 'w-5 h-5' : 'w-7 h-7';
        return (
            <button type="button" onClick={() => openVideo(trackingId, title)}
                className={`${sz} flex items-center justify-center text-white rounded-full transition-all flex-shrink-0 ${watched ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'} shadow-lg transform hover:scale-105`}>
                <svg className={iconSz} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </button>
        );
    };

    // Pizza slicing: 8 slices
    const TOTAL_SLICES = 8;
    const [selectedSlices, setSelectedSlices] = useState<number[]>([]);
    const [listoResult, setListoResult] = useState<'correct' | 'incorrect' | null>(null);

    const toggleSlice = (index: number) => {
        if (listoResult === 'correct') return;
        setSelectedSlices(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
        setListoResult(null);
    };

    const handleListo = () => {
        if (selectedSlices.length === 3) {
            setListoResult('correct');
        } else {
            setListoResult('incorrect');
        }
    };

    // SVG pizza slice generation
    const sliceAngle = 360 / TOTAL_SLICES;
    const createSlicePath = (index: number) => {
        const startAngle = (index * sliceAngle - 90) * (Math.PI / 180);
        const endAngle = ((index + 1) * sliceAngle - 90) * (Math.PI / 180);
        const x1 = 50 + 45 * Math.cos(startAngle);
        const y1 = 50 + 45 * Math.sin(startAngle);
        const x2 = 50 + 45 * Math.cos(endAngle);
        const y2 = 50 + 45 * Math.sin(endAngle);
        // Larger radius for better fit
        return `M 50 50 L ${x1} ${y1} A 45 45 0 0 1 ${x2} ${y2} Z`;
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones' }} pageId="fracciones-concepto-concreto">
            {/* C - CONCRETO Section */}
            <div className="relative ml-2 flex items-start mb-8">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center" style={{ backgroundColor: '#4ade80' }}>
                    C
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 bg-white" style={{ borderColor: '#4ade80' }}>

                    <div className="mt-4 flex flex-col md:flex-row items-center gap-8 relative">

                        {/* Character Column */}
                        <div className="flex flex-col items-center flex-shrink-0 z-10">
                            <div className="absolute top-0 left-0">
                                <PlayBtn trackingId={VIDEO_TRACKING.C_PIZZA} title="Fracciones - Concepto Concreto" />
                            </div>
                            <img
                                src="/fracciones/pizzero.png"
                                alt="Pizzero"
                                className="w-48 md:w-64 h-auto object-contain drop-shadow-xl"
                            />
                            <div className="bg-white border-2 border-gray-300 p-3 rounded-xl shadow-md mt-[-20px] relative z-20 max-w-[200px] text-center">
                                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                                    ¡Hola! Ayúdame a servir <span className="text-blue-600 text-lg">3</span> pedazos de esta pizza que partí en <span className="text-red-600 text-lg">8</span>.
                                </p>
                            </div>
                        </div>

                        {/* Table Interaction Area */}
                        <div className="flex-1 relative flex flex-col items-center justify-center">
                            <div className="relative w-full max-w-md aspect-[4/3] flex items-center justify-center">
                                {/* Table Background */}
                                <img
                                    src="/fracciones/mesa1.png"
                                    alt="Mesa"
                                    className="absolute inset-0 w-full h-full object-contain"
                                />

                                {/* Pizza Interactive Layer - Positioned purely by CSS on top of table */}
                                <div className="absolute top-[15%] w-[55%] aspect-square rounded-full shadow-2xl bg-[#d97706]/20 backdrop-blur-sm flex items-center justify-center">
                                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg transform rotate-[-22.5deg]">
                                        {/* Crust/Base background */}
                                        <circle cx="50" cy="50" r="48" fill="#d97706" />
                                        <circle cx="50" cy="50" r="45" fill="#fef3c7" />

                                        {Array.from({ length: TOTAL_SLICES }, (_, i) => (
                                            <g key={i} onClick={() => toggleSlice(i)} className="cursor-pointer hover:opacity-90 transition-all">
                                                <path
                                                    d={createSlicePath(i)}
                                                    fill={selectedSlices.includes(i) ? '#eab308' : '#fef3c7'}
                                                    stroke="#b45309"
                                                    strokeWidth="0.5"
                                                />
                                                {/* Visual feedback for selected */}
                                                {selectedSlices.includes(i) && (
                                                    <text x={50 + 30 * Math.cos(((i + 0.5) * sliceAngle - 90) * Math.PI / 180)} y={50 + 30 * Math.sin(((i + 0.5) * sliceAngle - 90) * Math.PI / 180)} fontSize="10" textAnchor="middle" dominantBaseline="middle">😋</text>
                                                )}
                                            </g>
                                        ))}
                                        {/* Division lines */}
                                        {Array.from({ length: TOTAL_SLICES }, (_, i) => {
                                            const angle = (i * sliceAngle - 90) * (Math.PI / 180);
                                            return <line key={i} x1="50" y1="50" x2={50 + 45 * Math.cos(angle)} y2={50 + 45 * Math.sin(angle)} stroke="#b45309" strokeWidth="0.5" />;
                                        })}
                                    </svg>
                                </div>
                            </div>

                            {/* Controls below table */}
                            <div className="mt-4 flex flex-col items-center gap-3 bg-white/90 p-4 rounded-xl shadow-sm border border-gray-200">
                                <div className="flex items-center gap-4">
                                    <p className="text-gray-700 font-bold">
                                        Pedazos: <span className="text-xl text-blue-600">{selectedSlices.length}</span> / <span className="text-xl text-red-600">{TOTAL_SLICES}</span>
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <button onClick={handleListo}
                                        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold rounded-full shadow-md transform active:scale-95 transition-all">
                                        ¿LISTO?
                                    </button>
                                    {listoResult !== null && (
                                        <button onClick={() => { setSelectedSlices([]); setListoResult(null); }}
                                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-full transition-colors">
                                            Reiniciar
                                        </button>
                                    )}
                                </div>
                                {listoResult === 'correct' && (
                                    <p className="text-green-600 font-bold animate-bounce">✅ ¡Muy bien! 3/8</p>
                                )}
                                {listoResult === 'incorrect' && (
                                    <p className="text-red-500 font-bold">❌ Intenta de nuevo</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* P - PROCESUAL Section */}
            <div className="relative ml-2 flex items-start">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center" style={{ backgroundColor: '#60a5fa' }}>
                    P
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 bg-white" style={{ borderColor: '#60a5fa' }}>

                    <div className="mt-4 flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <PlayBtn trackingId={VIDEO_TRACKING.P_EXPLAIN} title="Fracciones - Proceso" />
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Representación de Fracciones</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border-2 border-blue-200 flex flex-col items-center">
                                <span className="text-gray-500 font-bold text-sm uppercase tracking-wider mb-2">Fracción</span>
                                <div className="flex items-center gap-4">
                                    <span className="text-6xl font-black text-blue-600 drop-shadow-md">3</span>
                                    <div className="h-16 w-1 bg-gray-400 rotate-[15deg] rounded-full"></div>
                                    <span className="text-6xl font-black text-red-600 drop-shadow-md">8</span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-xl">3</div>
                                    <div>
                                        <p className="font-bold text-gray-800 dark:text-gray-200">Numerador</p>
                                        <p className="text-sm text-gray-500">Partes que tomamos (comimos)</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-100">
                                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-600 text-xl">8</div>
                                    <div>
                                        <p className="font-bold text-gray-800 dark:text-gray-200">Denominador</p>
                                        <p className="text-sm text-gray-500">Partes totales de la pizza</p>
                                    </div>
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
