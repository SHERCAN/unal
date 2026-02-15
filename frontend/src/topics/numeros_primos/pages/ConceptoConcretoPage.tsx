'use client';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

/**
 * Frame 167 — Números Primos
 * C section: 7 tennis players, 7 balls, grouping logic
 *   - Images: tenista1.png ... tenista7.png
 *   - Bag: bolsapelotas.png
 *   - Logic: 7 is prime (only groups of 1 or 7)
 * P section: 9 squares, grouping logic
 *   - Logic: 9 is composite (groups of 1, 3, 9)
 */

interface Props { zoom?: number; }

export function ConceptoConcretoPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        C_TENNIS: 'numeros-primos-c-tennis',
        P_SQUARE: 'numeros-primos-p-square',
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
        const sz = size === 'sm' ? 'w-10 h-10' : 'w-16 h-16'; // Larger play buttons as per frames
        const iconSz = size === 'sm' ? 'w-5 h-5' : 'w-8 h-8';
        return (
            <button type="button" onClick={() => openVideo(trackingId, title)}
                className={`${sz} flex items-center justify-center text-white rounded-full transition-all flex-shrink-0 ${watched ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'}`}>
                <svg className={iconSz} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </button>
        );
    };

    // Interactive classification
    const [selectedGroups7, setSelectedGroups7] = useState('');
    const [selectedGroups9, setSelectedGroups9] = useState('');
    const [listoResult, setListoResult] = useState<'correct' | 'incorrect' | null>(null);

    const handleListo = () => {
        if (selectedGroups7 === 'primo' && selectedGroups9 === 'compuesto') {
            setListoResult('correct');
        } else {
            setListoResult('incorrect');
        }
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Números Primos' }} pageId="numeros-primos-concepto-concreto">
            {/* ============ C - CONCRETO ============ */}
            <div className="relative ml-2 flex items-start mb-8">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center" style={{ backgroundColor: '#4ade80' }}>
                    C
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-5 bg-white" style={{ borderColor: '#4ade80' }}>

                    <div className="mt-4 flex flex-col gap-6">
                        {/* Top: Plan button + 7 Tennis Players + Bag */}
                        <div className="flex items-start justify-between relative">
                            <div className="absolute top-0 left-0">
                                <PlayBtn trackingId={VIDEO_TRACKING.C_TENNIS} title="Números Primos - Concepto Concreto" />
                            </div>

                            {/* 7 Tennis Players Row */}
                            <div className="flex-1 flex flex-col items-center pt-2">
                                <div className="flex justify-center items-end gap-2 mb-4">
                                    {[1, 2, 3, 4, 5, 6, 7].map(i => (
                                        <div key={i} className="flex flex-col items-center gap-2">
                                            <img
                                                src={`/numeros_primos/tenista${i}.png`}
                                                alt={`Tenista ${i}`}
                                                className="h-32 w-auto object-contain"
                                                draggable={false}
                                            />
                                            <div className="w-10 h-10 border-2 border-gray-400 rounded flex items-center justify-center bg-white">
                                                <span className="text-2xl">🎾</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Grouping Visualization Box */}
                                <div className="flex items-center gap-8 w-full max-w-2xl border-2 border-gray-300 rounded-xl p-4 bg-white relative">
                                    {/* Grouping examples */}
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col items-center">
                                            <div className="w-6 h-6 bg-green-500 rounded text-white flex items-center justify-center font-bold mb-1">✓</div>
                                            <img src="/numeros_primos/tenista1.png" className="h-12 w-auto object-contain" alt="1" />
                                            <div className="grid grid-cols-2 gap-0.5 mt-1">
                                                {[1, 2, 3, 4, 5, 6, 7].map(j => <div key={j} className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>)}
                                            </div>
                                        </div>
                                        <div className="h-16 w-px bg-gray-300"></div>
                                        {/* More grouping representations could go here */}
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5, 6, 7].map(j => (
                                                <div key={j} className="flex flex-col items-center">
                                                    <div className="w-4 h-4 bg-green-100 border border-green-500 rounded-full flex items-center justify-center text-[10px] text-green-700 font-bold mb-1">
                                                        {j}
                                                    </div>
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="absolute right-[-80px] bottom-[-10px]">
                                        <img src="/numeros_primos/bolsapelotas.png" alt="Bolsa" className="w-24 h-auto object-contain transform rotate-[-10deg]" />
                                    </div>
                                </div>
                            </div>

                            <div className="w-32">
                                {/* Spacer for right alignment if needed */}
                                <div className="bg-green-600 text-white font-bold p-2 text-center rounded text-sm">
                                    ¿IGUALES?
                                </div>
                                <div className="flex justify-center mt-2">
                                    <div className="w-8 h-8 bg-green-500 rounded text-white flex items-center justify-center font-bold text-xl">✓</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ============ P - PROCESUAL ============ */}
            <div className="relative ml-2 flex items-start">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center" style={{ backgroundColor: '#60a5fa' }}>
                    P
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 bg-white" style={{ borderColor: '#60a5fa' }}>

                    <div className="mt-4 space-y-6">
                        <p className="font-semibold text-gray-800 dark:text-gray-100 text-lg">
                            Representa los repartos con 7 cuadrados. Intenta agruparlos en 2 grupos, 3 grupos o 4 grupos iguales.
                        </p>

                        <div className="flex items-start gap-4">
                            <PlayBtn trackingId={VIDEO_TRACKING.P_SQUARE} title="Números Primos - Concepto Procesual" />

                            <div className="flex-1 space-y-6">
                                {/* Failure cases */}
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">No se forman 2, 3 y 4 grupos iguales.</span>
                                    <button className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></button>
                                </div>

                                <div className="flex justify-around items-center">
                                    {/* 2 groups fail */}
                                    <div className="flex gap-2">
                                        <div className="grid grid-cols-2 gap-1 w-12 h-12 border-2 border-gray-400 p-1">
                                            <div className="bg-green-300 w-full h-full"></div><div className="bg-green-300 w-full h-full"></div>
                                            <div className="bg-green-300 w-full h-full"></div>
                                        </div>
                                        <div className="w-6 h-6 bg-red-500 rounded-full text-white flex items-center justify-center font-bold">!</div>
                                    </div>
                                    {/* 3 groups fail */}
                                    <div className="flex gap-2">
                                        <div className="grid grid-cols-2 gap-1 w-12 h-12 border-2 border-gray-400 p-1">
                                            <div className="bg-green-300 w-full h-full"></div><div className="bg-green-300 w-full h-full"></div>
                                            <div className="bg-green-300 w-full h-full"></div>
                                        </div>
                                        <div className="w-6 h-6 bg-red-500 rounded-full text-white flex items-center justify-center font-bold">!</div>
                                    </div>
                                    {/* 4 groups fail */}
                                    <div className="flex gap-2">
                                        <div className="grid grid-cols-2 gap-1 w-12 h-12 border-2 border-gray-400 p-1">
                                            <div className="bg-green-300 w-full h-full"></div><div className="bg-green-300 w-full h-full"></div>
                                        </div>
                                        <div className="w-6 h-6 bg-red-500 rounded-full text-white flex items-center justify-center font-bold">!</div>
                                    </div>
                                </div>

                                {/* Success cases */}
                                <div className="flex items-center gap-2 mt-4">
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">Se pueden formar solo uno grupo o siete grupos iguales.</span>
                                    <button className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></button>
                                </div>

                                <div className="flex justify-around items-center">
                                    {/* 1 group of 7 */}
                                    <div className="border-2 border-gray-800 p-1 flex gap-1">
                                        {[1, 2, 3, 4, 5, 6, 7].map(k => <div key={k} className="w-6 h-6 bg-green-400 border border-green-600"></div>)}
                                    </div>
                                    <span className="text-lg font-bold">ó</span>
                                    {/* 7 groups of 1 */}
                                    <div className="flex gap-2">
                                        <div className="w-8 h-8 border-2 border-gray-600 flex items-center justify-center"><div className="w-4 h-4 bg-green-400"></div></div>
                                        <div className="w-8 h-8 border-2 border-gray-600 flex items-center justify-center"><div className="w-4 h-4 bg-green-400"></div></div>
                                        <div className="w-8 h-8 border-2 border-gray-600 flex items-center justify-center"><div className="w-4 h-4 bg-green-400"></div></div>
                                    </div>
                                    <div className="w-6 h-6 bg-green-500 rounded-full text-white flex items-center justify-center font-bold">✓</div>
                                </div>

                                <div className="flex items-center gap-2 mt-4">
                                    <span className="font-semibold text-gray-800 dark:text-gray-200">Se observa que el número 7 se puede dividir en 1 ó en sí mismo 7 partes iguales.</span>
                                    <button className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg></button>
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
