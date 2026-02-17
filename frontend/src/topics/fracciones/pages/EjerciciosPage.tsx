'use client';

import React, { useRef, useState } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface Props { zoom?: number; }

export function EjerciciosPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        EX1_TABLE: 'fracciones-ex1-table',
        EX1_ISFRAC: 'fracciones-ex1-isfrac',
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

    // --- State for Exercise 1 (Table) ---
    // User needs to fill Num and Den columns.
    const [tableInputs, setTableInputs] = useState<{ [key: string]: string }>({});
    const [tableResults, setTableResults] = useState<{ [key: string]: 'correct' | 'incorrect' | null }>({});

    const tableData = [
        { id: 1, shape: 'triangle', num: 1, den: 2, color: 'bg-green-400' },
        { id: 2, shape: 'circle', num: 1, den: 4, color: 'bg-orange-400' },
        { id: 3, shape: 'hexagon', num: 5, den: 6, color: 'bg-blue-400' },
        { id: 4, shape: 'square', num: 3, den: 4, color: 'bg-purple-400' },
    ];

    const checkTable = () => {
        const newResults: { [key: string]: 'correct' | 'incorrect' } = {};
        let allCorrect = true;
        tableData.forEach(row => {
            const n = parseInt(tableInputs[`${row.id}-n`]);
            const d = parseInt(tableInputs[`${row.id}-d`]);
            const resN = n === row.num ? 'correct' : 'incorrect';
            const resD = d === row.den ? 'correct' : 'incorrect';
            newResults[`${row.id}-n`] = resN;
            newResults[`${row.id}-d`] = resD;
            if (resN === 'incorrect' || resD === 'incorrect') allCorrect = false;
        });
        setTableResults(newResults);
    };

    // --- State for Exercise 2 (Is Fraction?) ---
    const [isFrac1, setIsFrac1] = useState(''); // Correct: 'es'
    const [isFrac2, setIsFrac2] = useState(''); // Correct: 'no'
    const [isFracResult, setIsFracResult] = useState<'correct' | 'incorrect' | null>(null);

    const checkIsFrac = () => {
        if (isFrac1 === 'es' && isFrac2 === 'no') {
            setIsFracResult('correct');
        } else {
            setIsFracResult('incorrect');
        }
    };

    // --- State for Exercise 3 (Definitions) ---
    const [defNum, setDefNum] = useState('');
    const [defDen, setDefDen] = useState('');
    const [defResult, setDefResult] = useState<'correct' | 'incorrect' | null>(null);

    const checkDef = () => {
        if (defNum === 'seleccionadas' && defDen === 'totales') {
            setDefResult('correct');
        } else {
            setDefResult('incorrect');
        }
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones' }} pageId="fracciones-ejercicios">
            <div className="w-full p-4">
                <div className="relative ml-2 flex items-start">
                    {/* Header "A" */}
                    <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#be90de]" style={{ borderColor: '#be90de' }}>
                        A
                    </div>

                    <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-8 bg-white border-[#be90de] min-h-[900px]">
                        <div className="max-w-4xl mx-auto space-y-12">

                            <div className="flex items-center gap-4 border-b pb-4">
                                <span className="bg-purple-900 text-white px-6 py-2 rounded-lg font-black text-xl tracking-widest uppercase">EJERCICIOS</span>
                            </div>

                            {/* EXERCISE 1: Table */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">1</div>
                                    <p className="font-bold text-gray-700">Complete la tabla escribiendo el numerador y el denominador.</p>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="bg-purple-100">
                                                <th className="p-3 border border-purple-200 text-purple-800">FIGURA</th>
                                                <th className="p-3 border border-purple-200 text-purple-800">FRACCIÓN</th>
                                                <th className="p-3 border border-purple-200 text-purple-800">NUMERADOR</th>
                                                <th className="p-3 border border-purple-200 text-purple-800">DENOMINADOR</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tableData.map((row) => (
                                                <tr key={row.id} className="hover:bg-gray-50">
                                                    <td className="p-4 border border-gray-200 flex justify-center">
                                                        {/* SVG Shapes */}
                                                        <div className="w-16 h-16 relative">
                                                            {row.shape === 'triangle' && (
                                                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                                                    <polygon points="50,10 90,90 10,90" fill="white" stroke="black" strokeWidth="2" />
                                                                    <path d="M50,10 L50,90 L90,90 Z" fill="#4ade80" stroke="black" strokeWidth="2" />
                                                                </svg>
                                                            )}
                                                            {row.shape === 'circle' && (
                                                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                                                    <circle cx="50" cy="50" r="45" fill="white" stroke="black" strokeWidth="2" />
                                                                    <path d="M50,50 L50,5 A45,45 0 0,1 95,50 Z" fill="#fb923c" stroke="black" strokeWidth="2" />
                                                                    <line x1="50" y1="5" x2="50" y2="95" stroke="black" strokeWidth="2" />
                                                                    <line x1="5" y1="50" x2="95" y2="50" stroke="black" strokeWidth="2" />
                                                                </svg>
                                                            )}
                                                            {row.shape === 'hexagon' && (
                                                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                                                    <polygon points="25,5 75,5 100,50 75,95 25,95 0,50" fill="#60a5fa" stroke="black" strokeWidth="2" />
                                                                    <polygon points="50,50 75,95 25,95" fill="white" stroke="black" strokeWidth="2" />{/* Create the empty slice effect */}
                                                                    {/* Grid lines */}
                                                                    <line x1="0" y1="50" x2="100" y2="50" stroke="black" strokeWidth="1" />
                                                                    <line x1="25" y1="5" x2="75" y2="95" stroke="black" strokeWidth="1" />
                                                                    <line x1="75" y1="5" x2="25" y2="95" stroke="black" strokeWidth="1" />
                                                                </svg>
                                                            )}
                                                            {row.shape === 'square' && (
                                                                <svg viewBox="0 0 100 100" className="w-full h-full">
                                                                    <rect x="5" y="5" width="90" height="90" fill="white" stroke="black" strokeWidth="2" />
                                                                    <rect x="5" y="5" width="45" height="45" fill="#c084fc" stroke="black" strokeWidth="1" />
                                                                    <rect x="50" y="5" width="45" height="45" fill="#c084fc" stroke="black" strokeWidth="1" />
                                                                    <rect x="5" y="50" width="45" height="45" fill="#c084fc" stroke="black" strokeWidth="1" />
                                                                    <line x1="50" y1="5" x2="50" y2="95" stroke="black" strokeWidth="2" />
                                                                    <line x1="5" y1="50" x2="95" y2="50" stroke="black" strokeWidth="2" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 border border-gray-200 text-center">
                                                        <div className="inline-flex flex-col items-center">
                                                            <span className="text-xl font-bold border-b-2 border-black px-2">{row.num}</span>
                                                            <span className="text-xl font-bold px-2">{row.den}</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-4 border border-gray-200 text-center">
                                                        <input
                                                            type="number"
                                                            value={tableInputs[`${row.id}-n`] || ''}
                                                            onChange={(e) => setTableInputs({ ...tableInputs, [`${row.id}-n`]: e.target.value })}
                                                            className={`w-16 p-2 text-center border-2 rounded ${tableResults[`${row.id}-n`] === 'correct' ? 'border-green-500 bg-green-50' : tableResults[`${row.id}-n`] === 'incorrect' ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                                        />
                                                    </td>
                                                    <td className="p-4 border border-gray-200 text-center">
                                                        <input
                                                            type="number"
                                                            value={tableInputs[`${row.id}-d`] || ''}
                                                            onChange={(e) => setTableInputs({ ...tableInputs, [`${row.id}-d`]: e.target.value })}
                                                            className={`w-16 p-2 text-center border-2 rounded ${tableResults[`${row.id}-d`] === 'correct' ? 'border-green-500 bg-green-50' : tableResults[`${row.id}-d`] === 'incorrect' ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="flex justify-center">
                                    <button onClick={checkTable} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded shadow-md">
                                        Verificar Tabla
                                    </button>
                                </div>
                            </div>

                            {/* EXERCISE 2: Is Fraction? */}
                            <div className="space-y-6 pt-8 border-t">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">2</div>
                                    <p className="font-bold text-gray-700">Seleccione si la figura representa una fracción o no.</p>
                                </div>

                                <div className="flex justify-around items-center">
                                    {/* Figure A - Correct Fraction (Circle in 3rds) */}
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-24 h-24 relative">
                                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                                <circle cx="50" cy="50" r="45" fill="white" stroke="black" strokeWidth="2" />
                                                {/* 3 equal parts */}
                                                <path d="M50,50 L50,5 A45,45 0 0,1 88.9,72.5 Z" fill="#fcd34d" stroke="black" strokeWidth="1" />
                                                <line x1="50" y1="50" x2="50" y2="5" stroke="black" strokeWidth="2" />
                                                <line x1="50" y1="50" x2="88.9" y2="72.5" stroke="black" strokeWidth="2" />
                                                <line x1="50" y1="50" x2="11.1" y2="72.5" stroke="black" strokeWidth="2" />
                                            </svg>
                                        </div>
                                        <select
                                            value={isFrac1}
                                            onChange={(e) => { setIsFrac1(e.target.value); setIsFracResult(null); }}
                                            className="border-2 border-gray-300 rounded p-1 text-sm bg-white"
                                        >
                                            <option value="">Seleccione...</option>
                                            <option value="es">Es una fracción</option>
                                            <option value="no">No es una fracción</option>
                                        </select>
                                    </div>

                                    {/* Figure B - Incorrect Fraction (Triangle split weirdly) */}
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="w-24 h-24 relative">
                                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                                <polygon points="50,10 90,90 10,90" fill="white" stroke="black" strokeWidth="2" />
                                                {/* Weird split line */}
                                                <line x1="30" y1="90" x2="70" y2="30" stroke="black" strokeWidth="2" />
                                                <path d="M30,90 L70,30 L90,90 Z" fill="#f87171" stroke="black" opacity="0.5" />
                                            </svg>
                                        </div>
                                        <select
                                            value={isFrac2}
                                            onChange={(e) => { setIsFrac2(e.target.value); setIsFracResult(null); }}
                                            className="border-2 border-gray-300 rounded p-1 text-sm bg-white"
                                        >
                                            <option value="">Seleccione...</option>
                                            <option value="es">Es una fracción</option>
                                            <option value="no">No es una fracción</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <button onClick={checkIsFrac} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded shadow-md">
                                        Verificar
                                    </button>
                                </div>
                                {isFracResult === 'correct' && <p className="text-green-600 text-center font-bold">✅ ¡Correcto!</p>}
                                {isFracResult === 'incorrect' && <p className="text-red-500 text-center font-bold">❌ Intenta de nuevo. Recuerda: para ser fracción, las partes deben ser IGUALES.</p>}
                            </div>

                            {/* EXERCISE 3: Definitions */}
                            <div className="space-y-6 pt-8 border-t">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">3</div>
                                    <p className="font-bold text-gray-700">Complete las definiciones.</p>
                                </div>

                                <div className="bg-gray-50 p-6 rounded-xl space-y-4 border border-gray-200">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-gray-800">El numerador indica las partes</span>
                                        <select
                                            value={defNum}
                                            onChange={(e) => { setDefNum(e.target.value); setDefResult(null); }}
                                            className="border-2 border-purple-200 rounded px-2 py-1 bg-white font-medium text-purple-700"
                                        >
                                            <option value="">...</option>
                                            <option value="seleccionadas">seleccionadas</option>
                                            <option value="totales">totales</option>
                                        </select>
                                        <span className="text-gray-800">.</span>
                                    </div>

                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="text-gray-800">El denominador indica las partes</span>
                                        <select
                                            value={defDen}
                                            onChange={(e) => { setDefDen(e.target.value); setDefResult(null); }}
                                            className="border-2 border-purple-200 rounded px-2 py-1 bg-white font-medium text-purple-700"
                                        >
                                            <option value="">...</option>
                                            <option value="seleccionadas">seleccionadas</option>
                                            <option value="totales">totales</option>
                                        </select>
                                        <span className="text-gray-800">.</span>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <button onClick={checkDef} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded shadow-md">
                                        Verificar Enunciados
                                    </button>
                                </div>
                                {defResult === 'correct' && <p className="text-green-600 text-center font-bold">✅ ¡Correcto!</p>}
                                {defResult === 'incorrect' && <p className="text-red-500 text-center font-bold">❌ Repasa las definiciones.</p>}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </BookPageContainer>
    );
}
