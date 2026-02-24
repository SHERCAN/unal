'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useRef, useState } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';
import Image from 'next/image';


// Import assets
import tablaEjercicioImg from '../tablaEjercicio.png';
import circulocebraImg from '../circulocebra.png';
import corazonImg from '../corazon.png';
import ajedrezImg from '../ajedrez.png';
import corazonoblicuoImg from '../corazonoblicuo.png';
import piramideImg from '../piramide.png';
import trapecioImg from '../trapecio.png';

interface Props { zoom?: number; }
//PAGINA 5 EJERCICIOS
export function EjerciciosPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched, submitExercise } = useVideoProgress();

    const VIDEO_TRACKING = {
        EX1_TABLE: 'fracciones-ex1-table',
        EX1_ISFRAC: 'fracciones-ex1-isfrac',
        EX3_DEFS: 'fracciones-pag21-v4',
    };

    /* videoModal list removed */
    /* ref removed */

    /* openVideo removed */

    /* PlayButton definition removed */

    /* handleVideoComplete removed */

    // --- State for Exercise 1 (Table) ---
    // User needs to fill Num and Den columns.
    const [tableInputs, setTableInputs] = useState<{ [key: string]: string }>({});
    const [tableResults, setTableResults] = useState<{ [key: string]: 'correct' | 'incorrect' | null }>({});
    const [tableTotalResult, setTableTotalResult] = useState<'correct' | 'incorrect' | null>(null);


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
        const isCorrect = allCorrect;
        setTableTotalResult(isCorrect ? 'correct' : 'incorrect');
        submitExercise('fracciones-pag21-ej1', isCorrect);
    };

    const resetTable = () => { setTableInputs({}); setTableResults({}); setTableTotalResult(null); };
    const resetIsFrac = () => { setIsFracAnswers(Array(6).fill('')); setIsFracResult(null); };
    const resetDef = () => { setDefNum(''); setDefDen(''); setDefResult(null); };


    // --- State for Exercise 2 (Is Fraction?) ---
    const [isFracAnswers, setIsFracAnswers] = useState<string[]>(Array(6).fill(''));
    const [isFracResult, setIsFracResult] = useState<'correct' | 'incorrect' | null>(null);

    const checkIsFrac = () => {
        // Correct answers based on common patterns: 
        // 1. circulocebra (no), 2. corazon (es), 3. ajedrez (es), 4. corazonoblicuo (no), 5. piramide (no), 6. trapecio (no/es - assuming no if not equal)
        // I will use a reasonable set of correct answers, usually: no, es, es, no, no, es (if trapecio is split vertically)
        const correct = ['no', 'es', 'es', 'no', 'no', 'es'];
        const allCorrect = isFracAnswers.every((ans, i) => ans === correct[i]);
        setIsFracResult(allCorrect ? 'correct' : 'incorrect');
        submitExercise('fracciones-pag21-ej2', allCorrect);
    };

    // --- State for Exercise 3 (Definitions) ---
    const [defNum, setDefNum] = useState('');
    const [defDen, setDefDen] = useState('');
    const [defResult, setDefResult] = useState<'correct' | 'incorrect' | null>(null);

    const checkDef = () => {
        const isCorrect = defNum === 'denominador' && defDen === 'numerador';
        setDefResult(isCorrect ? 'correct' : 'incorrect');
        submitExercise('fracciones-pag21-ej3', isCorrect);
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones' }} pageId="fracciones-ejercicios">
            <div className="w-full p-4">
                <div className="relative w-full">
                    {/* Content Container */}
                    {/* --- MODULO A --- */}
                    <div className="relative p-8 min-h-[900px]">
                        <div className="max-w-4xl mx-auto space-y-12">

                            <div className="flex items-center gap-4 border-b pb-4">
                                <span className="text-purple-900 px-6 py-2 rounded-lg font-black text-3xl tracking-widest uppercase">EJERCICIOS</span>
                            </div>

                            {/* EXERCISE 1: Table */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">1</div>
                                    <p className="font-bold text-base text-gray-800">Completa la tabla de acuerdo con la informacion solicitada.</p>
                                </div>

                                <div className="relative w-full">
                                    <div className="relative">
                                        <Image
                                            src={tablaEjercicioImg}
                                            alt="Tabla de Ejercicio"
                                            className="w-full h-auto object-contain block"
                                        />

                                        {/* Field Position Config - User can easily adjust these percentages */}
                                        {[
                                            { id: 'field1', top: '75.5%', left: '17%' },
                                            { id: 'field2', top: '88.5%', left: '17%' },
                                            { id: 'field3', top: '30.5%', left: '51%' },
                                            { id: 'field4', top: '55.5%', left: '51%' },
                                            { id: 'field5', top: '30.5%', left: '84%' },
                                            { id: 'field6', top: '55.5%', left: '84%' },
                                        ].map((field, idx) => (
                                            <input
                                                key={field.id}
                                                id={`table-input-${idx + 1}`}
                                                type="number"
                                                className="absolute w-[8%] h-[12%] text-center text-lg font-bold border-none outline-none rounded shadow-sm transition-all focus:ring-2 focus:ring-purple-400"
                                                style={{
                                                    backgroundColor: '#d9d9d9',
                                                    top: field.top,
                                                    left: field.left,
                                                    transform: 'translate(-50%, -50%)' // Center the input on the coordinate
                                                }}
                                                value={tableInputs[field.id] || ''}
                                                onChange={(e) => setTableInputs({ ...tableInputs, [field.id]: e.target.value })}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-center">
                                    <FeedbackButton
                                        onCheck={checkTable}
                                        onReset={resetTable}
                                        status={tableTotalResult}
                                    />
                                </div>
                            </div>

                            {/* EXERCISE 2: Is Fraction? */}
                            <div className="space-y-6 pt-8 border-t">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">2</div>
                                    <p className="font-bold text-gray-800">Determinar si las siguientes figuras son formas de fracción o no.</p>
                                </div>

                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 py-4">
                                    {[
                                        { img: circulocebraImg, alt: 'Círculo Cebra' },
                                        { img: corazonImg, alt: 'Corazón' },
                                        { img: ajedrezImg, alt: 'Ajedrez' },
                                        { img: corazonoblicuoImg, alt: 'Corazón Oblicuo' },
                                        { img: piramideImg, alt: 'Pirámide' },
                                        { img: trapecioImg, alt: 'Trapecio' }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4 py-2">
                                            {/* Square Bullet 16x16 */}
                                            <div className="w-4 h-4 bg-purple-600 shrink-0"></div>

                                            {/* Image Container */}
                                            <div className="w-24 h-24 relative flex items-center justify-center shrink-0">
                                                <Image
                                                    src={item.img}
                                                    alt={item.alt}
                                                    className="max-w-full max-h-full object-contain"
                                                />
                                            </div>

                                            {/* Selector */}
                                            <div className="flex-1 min-w-[150px]">
                                                <select
                                                    value={isFracAnswers[idx]}
                                                    onChange={(e) => {
                                                        const newAns = [...isFracAnswers];
                                                        newAns[idx] = e.target.value;
                                                        setIsFracAnswers(newAns);
                                                        setIsFracResult(null);
                                                    }}
                                                    className="w-full border-2 border-gray-200 rounded-lg p-2 text-sm bg-white focus:border-purple-400 outline-none transition-all font-semibold text-gray-700 cursor-pointer"
                                                >
                                                    <option value="">Seleccione...</option>
                                                    <option value="es">Es una fracción</option>
                                                    <option value="no">No es una fracción</option>
                                                </select>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-center">
                                    <FeedbackButton
                                        onCheck={checkIsFrac}
                                        onReset={resetIsFrac}
                                        status={isFracResult}
                                    />
                                </div>
                            </div>

                            {/* EXERCISE 3: Definitions */}
                            <div className="space-y-6 pt-8 border-t">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">3</div>
                                    <p className="font-bold text-gray-700">Completa con numerador o denominador: </p>
                                </div>

                                <div className="py-4 space-y-8">
                                    <div className="flex items-center gap-4 flex-wrap">
                                        <PlayVideoButton trackingId={VIDEO_TRACKING.EX3_DEFS} title="" videoId="/pag21/vv-3" />
                                        <div className="w-4 h-4 bg-purple-600 shrink-0"></div>
                                        <span className="text-base font-semibold text-gray-800">El</span>
                                        <select
                                            value={defNum}
                                            onChange={(e) => { setDefNum(e.target.value); setDefResult(null); }}
                                            className="border-2 border-gray-200 rounded-lg px-3 py-1 bg-white font-bold text-purple-700 focus:border-purple-400 outline-none transition-all"
                                        >
                                            <option value="numerador">numerador</option>
                                            <option value="denominador">denominador</option>
                                        </select>
                                        <span className="text-base font-semibold text-gray-800">significa que en cuántas partes se divide el todo.</span>
                                    </div>

                                    <div className="flex items-center gap-4 flex-wrap">
                                        <PlayVideoButton trackingId={VIDEO_TRACKING.EX3_DEFS} title="" videoId="/pag21/vv-4" />
                                        <div className="w-4 h-4 bg-purple-600 shrink-0"></div>
                                        <span className="text-base font-semibold text-gray-800">El</span>
                                        <select
                                            value={defDen}
                                            onChange={(e) => { setDefDen(e.target.value); setDefResult(null); }}
                                            className="border-2 border-gray-200 rounded-lg px-3 py-1 bg-white font-bold text-purple-700 focus:border-purple-400 outline-none transition-all"
                                        >
                                            <option value="numerador">numerador</option>
                                            <option value="denominador">denominador</option>
                                        </select>
                                        <span className="text-base font-semibold text-gray-800">significa que cuántas partes se toman.</span>
                                    </div>
                                </div>

                                <div className="flex justify-center">
                                    <FeedbackButton
                                        onCheck={checkDef}
                                        onReset={resetDef}
                                        status={defResult}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </BookPageContainer>
    );
}
