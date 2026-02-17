'use client';

import React, { useRef, useState } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface Props { zoom?: number; }

export function EjerciciosPage2({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        EX2_PENCILS: 'fracciones-ex2-pencils',
        EX2_NOTEBOOKS: 'fracciones-ex2-notebooks',
        EX2_LIBRARY: 'fracciones-ex2-library',
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

    const PlayBtn = ({ trackingId, title }: { trackingId: string; title: string }) => (
        <button type="button" onClick={() => openVideo(trackingId, title)}
            className="w-8 h-8 flex items-center justify-center text-white rounded-full bg-purple-600 hover:bg-purple-700 shadow-md flex-shrink-0">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
        </button>
    );

    // --- State for Problems ---
    const [pencilFrac, setPencilFrac] = useState({ n: '', d: '' });
    const [pencilResult, setPencilResult] = useState<'correct' | 'incorrect' | null>(null);

    const [notebookFrac, setNotebookFrac] = useState({ n: '', d: '' });
    const [notebookResult, setNotebookResult] = useState<'correct' | 'incorrect' | null>(null);

    const [libraryAns, setLibraryAns] = useState('');
    const [libraryResult, setLibraryResult] = useState<'correct' | 'incorrect' | null>(null);

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones' }} pageId="fracciones-ejercicios-2">
            <div className="w-full p-4">
                <div className="relative ml-2 flex items-start">
                    {/* Header "A" */}
                    <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#be90de]" style={{ borderColor: '#be90de' }}>
                        A
                    </div>

                    <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-8 bg-white border-[#be90de] min-h-[900px]">
                        <div className="max-w-4xl mx-auto space-y-16">

                            <div className="flex items-center gap-4 border-b pb-4">
                                <span className="bg-purple-900 text-white px-6 py-2 rounded-lg font-black text-xl tracking-widest uppercase">PROBLEMAS</span>
                            </div>

                            {/* PROBLEM 1: Pencils */}
                            <div className="space-y-6">
                                <div className="flex items-start gap-3">
                                    <PlayBtn trackingId={VIDEO_TRACKING.EX2_PENCILS} title="Problema: Lápices" />
                                    <div className="space-y-4 flex-1">
                                        <p className="text-lg text-gray-800">
                                            1. En un estuche hay <span className="font-bold">7</span> lápices. <span className="text-red-600 font-bold">5</span> son rojos y el resto negros. ¿Qué fracción de los lápices son rojos?
                                        </p>

                                        {/* Visual Pencils */}
                                        <div className="flex justify-center gap-2 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                            {/* 5 Red, 2 Black */}
                                            {[...Array(5).fill('red'), ...Array(2).fill('black')].map((color, i) => (
                                                <div key={i} className="flex flex-col items-center">
                                                    {/* Pencil SVG */}
                                                    <svg width="20" height="100" viewBox="0 0 20 100">
                                                        <path d="M0,20 L20,20 L20,90 L0,90 Z" fill={color === 'red' ? '#ef4444' : '#1f2937'} stroke="black" />
                                                        <path d="M0,20 L10,0 L20,20 Z" fill="#fcd34d" stroke="black" /> {/* Wood tip */}
                                                        <path d="M7,7 L13,7 L10,0 Z" fill="black" /> {/* Lead */}
                                                        <rect x="0" y="90" width="20" height="10" fill="#fbbf24" stroke="black" /> {/* Eraser holder */}
                                                        <path d="M0,95 Q10,105 20,95" fill="pink" stroke="black" /> {/* Eraser */}
                                                    </svg>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-4 bg-purple-50 p-4 rounded-lg w-fit">
                                            <span className="font-bold text-purple-800">Respuesta:</span>
                                            <div className="flex flex-col items-center">
                                                <input
                                                    type="number"
                                                    className="w-12 h-10 text-center border-2 border-purple-300 rounded focus:border-purple-600 font-bold"
                                                    value={pencilFrac.n}
                                                    onChange={e => { setPencilFrac({ ...pencilFrac, n: e.target.value }); setPencilResult(null); }}
                                                />
                                                <div className="w-12 h-0.5 bg-black my-1"></div>
                                                <input
                                                    type="number"
                                                    className="w-12 h-10 text-center border-2 border-purple-300 rounded focus:border-purple-600 font-bold"
                                                    value={pencilFrac.d}
                                                    onChange={e => { setPencilFrac({ ...pencilFrac, d: e.target.value }); setPencilResult(null); }}
                                                />
                                            </div>
                                            <button
                                                onClick={() => {
                                                    if (pencilFrac.n === '5' && pencilFrac.d === '7') setPencilResult('correct');
                                                    else setPencilResult('incorrect');
                                                }}
                                                className="bg-purple-600 text-white px-4 py-2 rounded font-bold text-sm shadow hover:bg-purple-700 ml-4">
                                                ¿LISTO?
                                            </button>
                                            {pencilResult === 'correct' && <span className="text-green-600 font-bold text-xl">✓</span>}
                                            {pencilResult === 'incorrect' && <span className="text-red-500 font-bold text-sm">Intenta de nuevo</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PROBLEM 2: Notebooks */}
                            <div className="space-y-6 pt-8 border-t">
                                <div className="flex items-start gap-3">
                                    <PlayBtn trackingId={VIDEO_TRACKING.EX2_NOTEBOOKS} title="Problema: Cuadernos" />
                                    <div className="space-y-4 flex-1">
                                        <p className="text-lg text-gray-800">
                                            2. Sonia tiene <span className="font-bold">8</span> cuadernos. <span className="text-blue-600 font-bold">3</span> son azules y el resto negros. ¿Qué fracción de los cuadernos son negros?
                                        </p>

                                        {/* Visual Notebooks */}
                                        <div className="flex justify-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
                                            {/* 3 Blue, 5 Black */}
                                            {[...Array(3).fill('blue'), ...Array(5).fill('black')].map((color, i) => (
                                                <div key={i} className={`w-12 h-16 rounded-r border-l-4 border-gray-400 shadow-sm relative ${color === 'blue' ? 'bg-blue-500' : 'bg-gray-800'}`}>
                                                    {/* Spiral binding */}
                                                    <div className="absolute left-0 top-1 w-1 h-1 bg-white rounded-full"></div>
                                                    <div className="absolute left-0 top-4 w-1 h-1 bg-white rounded-full"></div>
                                                    <div className="absolute left-0 top-7 w-1 h-1 bg-white rounded-full"></div>
                                                    <div className="absolute left-0 top-10 w-1 h-1 bg-white rounded-full"></div>
                                                    <div className="absolute left-0 top-13 w-1 h-1 bg-white rounded-full"></div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex items-center gap-4 bg-purple-50 p-4 rounded-lg w-fit">
                                            <span className="font-bold text-purple-800">Respuesta (Negros):</span>
                                            <div className="flex flex-col items-center">
                                                <input
                                                    type="number"
                                                    className="w-12 h-10 text-center border-2 border-purple-300 rounded focus:border-purple-600 font-bold"
                                                    value={notebookFrac.n}
                                                    onChange={e => { setNotebookFrac({ ...notebookFrac, n: e.target.value }); setNotebookResult(null); }}
                                                />
                                                <div className="w-12 h-0.5 bg-black my-1"></div>
                                                <input
                                                    type="number"
                                                    className="w-12 h-10 text-center border-2 border-purple-300 rounded focus:border-purple-600 font-bold"
                                                    value={notebookFrac.d}
                                                    onChange={e => { setNotebookFrac({ ...notebookFrac, d: e.target.value }); setNotebookResult(null); }}
                                                />
                                            </div>
                                            <button
                                                onClick={() => {
                                                    if (notebookFrac.n === '5' && notebookFrac.d === '8') setNotebookResult('correct');
                                                    else setNotebookResult('incorrect');
                                                }}
                                                className="bg-purple-600 text-white px-4 py-2 rounded font-bold text-sm shadow hover:bg-purple-700 ml-4">
                                                ¿LISTO?
                                            </button>
                                            {notebookResult === 'correct' && <span className="text-green-600 font-bold text-xl">✓</span>}
                                            {notebookResult === 'incorrect' && <span className="text-red-500 font-bold text-sm">Revisa cuántos negros hay</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* PROBLEM 3: Library */}
                            <div className="space-y-6 pt-8 border-t">
                                <div className="flex items-start gap-3">
                                    <PlayBtn trackingId={VIDEO_TRACKING.EX2_LIBRARY} title="Problema: Biblioteca" />
                                    <div className="space-y-4 flex-1">
                                        <p className="text-lg text-gray-800">
                                            3. En una biblioteca hay <span className="font-bold text-purple-700">36</span> libros. Si <span className="font-bold">1/6</span> son de cuentos, ¿cuántos libros de cuentos hay?
                                        </p>

                                        <div className="bg-white p-6 rounded-xl border-2 border-dashed border-purple-200">
                                            <p className="font-bold text-gray-600 mb-4">Planteamiento:</p>
                                            <div className="text-3xl font-bold flex items-center justify-center gap-4 text-gray-700">
                                                <span>36</span>
                                                <span>÷</span>
                                                <span className="text-purple-600">6</span>
                                                <span>=</span>
                                                <div className="relative">
                                                    <input
                                                        type="number"
                                                        className={`w-20 h-16 text-center border-4 rounded-xl text-4xl ${libraryResult === 'correct' ? 'border-green-500 text-green-600' : 'border-purple-300'}`}
                                                        value={libraryAns}
                                                        onChange={e => { setLibraryAns(e.target.value); setLibraryResult(null); }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => {
                                                    if (libraryAns === '6') setLibraryResult('correct');
                                                    else setLibraryResult('incorrect');
                                                }}
                                                className="bg-purple-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-purple-700 transform hover:scale-105 transition-all">
                                                COMPROBAR RESPUESTA
                                            </button>
                                        </div>

                                        {libraryResult === 'correct' && (
                                            <div className="bg-green-100 p-4 rounded-lg text-center border border-green-300 animate-bounce">
                                                <p className="text-green-800 font-bold text-xl">¡Excelente! Hay 6 libros de cuentos.</p>
                                            </div>
                                        )}
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
