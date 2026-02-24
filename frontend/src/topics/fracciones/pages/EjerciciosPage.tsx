'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useEffect } from 'react';
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
    const { isExerciseCompleted, completeStage, submitExercise } = useVideoProgress();

    const VIDEO_TRACKING = {
        EX1_TABLE: 'fracciones-ex1-table',
        EX1_ISFRAC: 'fracciones-ex1-isfrac',
        EX3_DEFS: 'fracciones-pag21-v4',
    };

    const EXERCISE_IDS = {
        EJ1: 'fracciones-pag21-ej1',
        EJ2: 'fracciones-pag21-ej2',
        EJ3: 'fracciones-pag21-ej3'
    };

    const STAGE_IDS = {
        EJ1_STAGE: 'fracciones-pag21-ej1-stage',
        EJ2_STAGE: 'fracciones-pag21-ej2-stage',
        EJ3_STAGE: 'fracciones-pag21-ej3-stage',
        MODULO_A: 'fracciones-pag21-modulo-a'
    };

    // --- State for Exercise 1 (Table) ---
    const [tableInputs, setTableInputs] = useState<{ [key: string]: string }>({});
    const [tableResults, setTableResults] = useState<{ [key: string]: 'correct' | 'incorrect' | null }>({});
    const [tableTotalResult, setTableTotalResult] = useState<'correct' | 'incorrect' | null>(null);

    const tableData = [
        { id: 1, shape: 'triangle', num: 1, den: 2, color: 'bg-green-400' },
        { id: 2, shape: 'circle', num: 1, den: 4, color: 'bg-orange-400' },
        { id: 3, shape: 'hexagon', num: 5, den: 6, color: 'bg-blue-400' },
        { id: 4, shape: 'square', num: 3, den: 4, color: 'bg-purple-400' },
    ];

    useEffect(() => {
        if (isExerciseCompleted(EXERCISE_IDS.EJ1)) setTableTotalResult('correct');
        if (isExerciseCompleted(EXERCISE_IDS.EJ2)) setIsFracResult('correct');
        if (isExerciseCompleted(EXERCISE_IDS.EJ3)) setDefResult('correct');
    }, [isExerciseCompleted]);

    const checkTable = async () => {
        if (isExerciseCompleted(EXERCISE_IDS.EJ1)) return;
        const newResults: { [key: string]: 'correct' | 'incorrect' } = {};
        tableData.forEach(row => {
            const n = parseInt(tableInputs[`field${row.id}`]);
            const d = parseInt(tableInputs[`field${row.id + 2}`]); // This is messy, let's look at field IDs
            // field1 (75.5, 17) -> Tri Num? Wait, field IDs in the array:
            // field1 (75.5, 17)
            // field2 (88.5, 17)
            // field3 (30.5, 51)
            // field4 (55.5, 51)
            // field5 (30.5, 84)
            // field6 (55.5, 84)
            // Let's re-examine tablaEjercicioImg or just follow the logic.
            // Based on original checkTable: row.id is 1,2,3,4. 
            // In the JSX, it used field1..field6.
            // Let's stick to the IDs that map to the actual inputs.
        });

        // Re-implementing check logic to match the 6 fields
        const correctAnswers: Record<string, string> = {
            field1: '1', field2: '2', // Triangle
            field3: '1', field4: '4', // Circle
            field5: '3', field6: '4', // Square
        };
        // Wait, hexagon is in tableData but maybe not in fields?
        // Let's check the fields again. field1 to field6.
        // Triangle: num=1, den=2. Circle: num=1, den=4. Square: num=3, den=4.
        // Hexagon num=5 den=6 is missing in the field mapping (only 6 fields).

        let allCorrect = true;
        Object.keys(correctAnswers).forEach(fid => {
            if (tableInputs[fid] !== correctAnswers[fid]) allCorrect = false;
        });

        setTableTotalResult(allCorrect ? 'correct' : 'incorrect');
        await submitExercise(EXERCISE_IDS.EJ1, allCorrect);
        if (allCorrect) {
            await completeStage(STAGE_IDS.EJ1_STAGE);
            checkModuloA(allCorrect, isFracResult === 'correct', defResult === 'correct');
        }
    };

    const checkModuloA = async (ej1: boolean, ej2: boolean, ej3: boolean) => {
        if (ej1 && ej2 && ej3) {
            await completeStage(STAGE_IDS.MODULO_A);
        }
    };

    const resetTable = () => { if (isExerciseCompleted(EXERCISE_IDS.EJ1)) return; setTableInputs({}); setTableTotalResult(null); };

    // --- State for Exercise 2 (Is Fraction?) ---
    const [isFracAnswers, setIsFracAnswers] = useState<string[]>(Array(6).fill(''));
    const [isFracResult, setIsFracResult] = useState<'correct' | 'incorrect' | null>(null);

    const checkIsFrac = async () => {
        if (isExerciseCompleted(EXERCISE_IDS.EJ2)) return;
        const correct = ['no', 'es', 'es', 'no', 'no', 'es'];
        const allCorrect = isFracAnswers.every((ans, i) => ans === correct[i]);
        setIsFracResult(allCorrect ? 'correct' : 'incorrect');
        await submitExercise(EXERCISE_IDS.EJ2, allCorrect);
        if (allCorrect) {
            await completeStage(STAGE_IDS.EJ2_STAGE);
            checkModuloA(tableTotalResult === 'correct', allCorrect, defResult === 'correct');
        }
    };

    const resetIsFrac = () => { if (isExerciseCompleted(EXERCISE_IDS.EJ2)) return; setIsFracAnswers(Array(6).fill('')); setIsFracResult(null); };

    // --- State for Exercise 3 (Definitions) ---
    const [defNum, setDefNum] = useState('');
    const [defDen, setDefDen] = useState('');
    const [defResult, setDefResult] = useState<'correct' | 'incorrect' | null>(null);

    const checkDef = async () => {
        if (isExerciseCompleted(EXERCISE_IDS.EJ3)) return;
        const isCorrect = defNum === 'denominador' && defDen === 'numerador';
        setDefResult(isCorrect ? 'correct' : 'incorrect');
        await submitExercise(EXERCISE_IDS.EJ3, isCorrect);
        if (isCorrect) {
            await completeStage(STAGE_IDS.EJ3_STAGE);
            checkModuloA(tableTotalResult === 'correct', isFracResult === 'correct', isCorrect);
        }
    };

    const resetDef = () => { if (isExerciseCompleted(EXERCISE_IDS.EJ3)) return; setDefNum(''); setDefDen(''); setDefResult(null); };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones' }} pageId="fracciones-ejercicios">
            <div className="w-full p-4">
                <div className="relative w-full">
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
                                    <p className="font-bold text-base text-gray-800">Completa la tabla de acuerdo con la información solicitada.</p>
                                </div>

                                <div className="relative w-full">
                                    <div className="relative">
                                        <Image
                                            src={tablaEjercicioImg}
                                            alt="Tabla de Ejercicio"
                                            className="w-full h-auto object-contain block"
                                        />

                                        {[
                                            { id: 'field1', top: '75.5%', left: '17%', correct: '1' },
                                            { id: 'field2', top: '88.5%', left: '17%', correct: '2' },
                                            { id: 'field3', top: '30.5%', left: '51%', correct: '1' },
                                            { id: 'field4', top: '55.5%', left: '51%', correct: '4' },
                                            { id: 'field5', top: '30.5%', left: '84%', correct: '3' },
                                            { id: 'field6', top: '55.5%', left: '84%', correct: '4' },
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
                                                    transform: 'translate(-50%, -50%)'
                                                }}
                                                value={tableTotalResult === 'correct' ? field.correct : (tableInputs[field.id] || '')}
                                                onChange={(e) => setTableInputs({ ...tableInputs, [field.id]: e.target.value })}
                                                disabled={tableTotalResult === 'correct'}
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
                                        { img: circulocebraImg, alt: 'Círculo Cebra', correct: 'no' },
                                        { img: corazonImg, alt: 'Corazón', correct: 'es' },
                                        { img: ajedrezImg, alt: 'Ajedrez', correct: 'es' },
                                        { img: corazonoblicuoImg, alt: 'Corazón Oblicuo', correct: 'no' },
                                        { img: piramideImg, alt: 'Pirámide', correct: 'no' },
                                        { img: trapecioImg, alt: 'Trapecio', correct: 'es' }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4 py-2">
                                            <div className="w-4 h-4 bg-purple-600 shrink-0"></div>
                                            <div className="w-24 h-24 relative flex items-center justify-center shrink-0">
                                                <Image
                                                    src={item.img}
                                                    alt={item.alt}
                                                    className="max-w-full max-h-full object-contain"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-[150px]">
                                                <select
                                                    value={isFracResult === 'correct' ? item.correct : isFracAnswers[idx]}
                                                    onChange={(e) => {
                                                        const newAns = [...isFracAnswers];
                                                        newAns[idx] = e.target.value;
                                                        setIsFracAnswers(newAns);
                                                        setIsFracResult(null);
                                                    }}
                                                    className="w-full border-2 border-gray-200 rounded-lg p-2 text-sm bg-white focus:border-purple-400 outline-none transition-all font-semibold text-gray-700 cursor-pointer"
                                                    disabled={isFracResult === 'correct'}
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
                                            value={defResult === 'correct' ? 'denominador' : defNum}
                                            onChange={(e) => { setDefNum(e.target.value); setDefResult(null); }}
                                            className="border-2 border-gray-200 rounded-lg px-3 py-1 bg-white font-bold text-purple-700 focus:border-purple-400 outline-none transition-all"
                                            disabled={defResult === 'correct'}
                                        >
                                            <option value="">...</option>
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
                                            value={defResult === 'correct' ? 'numerador' : defDen}
                                            onChange={(e) => { setDefDen(e.target.value); setDefResult(null); }}
                                            className="border-2 border-gray-200 rounded-lg px-3 py-1 bg-white font-bold text-purple-700 focus:border-purple-400 outline-none transition-all"
                                            disabled={defResult === 'correct'}
                                        >
                                            <option value="">...</option>
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
