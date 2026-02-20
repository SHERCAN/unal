'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';

/**
 * Frame 166 — EJERCICIOS – División Inexacta
 * Activity 1: Determinar si divisiones son exactas o inexactas (dropdown + ¿LISTO?)
 *   60÷10, 72÷12, 81÷7, 109÷3
 * Activity 2: Resuelve (input + ¿Hay resto? + ¿Cuál? + dropdown tipo + ¿LISTO?)
 *   28÷2 = 14, 57÷14 = 4 r 1
 * Activity 3: Resuelve problemas matemáticos (word problems + answer + ¿Hay resto? + ¿Cuál? + ¿LISTO?)
 *   53÷6, 24÷6, 39÷13, 113÷10
 */

interface Props { zoom?: number; }

export function EjerciciosPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched, submitExercise } = useVideoProgress();

    const VIDEO_TRACKING = {
        EJ_1: 'div-inexacta-ej-1',
        EJ_3: 'div-inexacta-ej-3',
        EJ_3_1: 'div-inexacta-ej-3-1',
        EJ_3_2: 'div-inexacta-ej-3-2',
        EJ_3_3: 'div-inexacta-ej-3-3',
        EJ_3_4: 'div-inexacta-ej-3-4',
    };

    /* videoModal list removed */
    /* ref removed */

    /* handleVideoComplete removed */

    /* PlayButton definition removed */

    // ===== ACTIVITY 1: Determinar exacta o inexacta =====
    const act1Items = [
        { dividend: 60, divisor: 10, correct: 'exacta' },   // 60/10=6 r0
        { dividend: 72, divisor: 12, correct: 'exacta' },   // 72/12=6 r0
        { dividend: 81, divisor: 7, correct: 'inexacta' },   // 81/7=11 r4
        { dividend: 109, divisor: 3, correct: 'inexacta' },  // 109/3=36 r1
    ];
    const [act1Answers, setAct1Answers] = useState<Record<number, string>>({});
    const [act1Results, setAct1Results] = useState<Record<number, boolean | null>>({});

    const handleAct1Listo = (index: number) => {
        const userAnswer = act1Answers[index] || '';
        const correct = userAnswer === act1Items[index].correct;
        setAct1Results(prev => ({ ...prev, [index]: correct }));
        submitExercise(`div-inexacta-act1-${index}`, correct);
    };

    // ===== ACTIVITY 2: Resuelve =====
    const act2Items = [
        { dividend: 28, divisor: 2, quotient: 14, hasRemainder: false, remainder: 0, type: 'exacta' },
        { dividend: 57, divisor: 14, quotient: 4, hasRemainder: true, remainder: 1, type: 'inexacta' },
    ];
    const [act2, setAct2] = useState<Record<string, string>>({});
    const [act2Results, setAct2Results] = useState<Record<number, boolean | null>>({});

    const handleAct2Listo = (index: number) => {
        const item = act2Items[index];
        const userQuotient = parseInt(act2[`${index}-q`] || '');
        const userHasRemainder = act2[`${index}-hasR`] || '';
        const userRemainder = parseInt(act2[`${index}-r`] || '0');
        const userType = act2[`${index}-type`] || '';

        let correct = userQuotient === item.quotient && userType === item.type;
        if (item.hasRemainder) {
            correct = correct && userHasRemainder === 'si' && userRemainder === item.remainder;
        } else {
            correct = correct && userHasRemainder === 'no';
        }
        setAct2Results(prev => ({ ...prev, [index]: correct }));
        submitExercise(`div-inexacta-act2-${index}`, correct);
    };

    // ===== ACTIVITY 3: Word problems =====
    const act3Items = [
        {
            text: 'Un granjero tiene 53 huevos y los coloca en cada uno paquetes de 6 huevos.',
            question: '¿Cuántos paquetes completas se llenan?',
            answer: 8, hasRemainder: true, remainder: 5, remainderUnit: 'huevos',
            trackingId: VIDEO_TRACKING.EJ_3_1,
        },
        {
            text: 'Hay 24 cuadernos que se reparten en 6 mochilas.',
            question: '¿Cuántos cuadernos hay en cada mochila?',
            answer: 4, hasRemainder: false, remainder: 0, remainderUnit: '',
            trackingId: VIDEO_TRACKING.EJ_3_2,
        },
        {
            text: 'En un salón hay 39 sillas organizadas en 13 filas.',
            question: '¿Cuántos sillas hay en cada fila?',
            answer: 3, hasRemainder: false, remainder: 0, remainderUnit: '',
            trackingId: VIDEO_TRACKING.EJ_3_3,
        },
        {
            text: 'Hay 113 dulces para repartir en 10 bolsas.',
            question: '¿Cuántos dulces recibe cada bolsa?',
            answer: 11, hasRemainder: true, remainder: 3, remainderUnit: 'dulces',
            trackingId: VIDEO_TRACKING.EJ_3_4,
        },
    ];
    const [act3, setAct3] = useState<Record<string, string>>({});
    const [act3Results, setAct3Results] = useState<Record<number, boolean | null>>({});

    const handleAct3Listo = (index: number) => {
        const item = act3Items[index];
        const userAnswer = parseInt(act3[`${index}-a`] || '');
        const userHasRemainder = act3[`${index}-hasR`] || '';
        const userRemainder = parseInt(act3[`${index}-r`] || '0');

        let correct = userAnswer === item.answer;
        if (item.hasRemainder) {
            correct = correct && userHasRemainder === 'si' && userRemainder === item.remainder;
        } else {
            correct = correct && userHasRemainder === 'no';
        }
        setAct3Results(prev => ({ ...prev, [index]: correct }));
        submitExercise(`div-inexacta-act3-${index}`, correct);
    };

    const inputClass = (result: boolean | null) =>
        `w-16 h-9 text-center font-bold rounded border-2 text-sm outline-none transition-colors ${result === true ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' :
            result === false ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' :
                'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100'
        }`;

    const selectClass = (result: boolean | null) =>
        `border-2 rounded px-2 py-1 text-sm font-medium outline-none transition-colors ${result === true ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' :
            result === false ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' :
                'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200'
        }`;

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'División Inexacta' }} pageId="division-inexacta-ejercicios">
            <div className="w-full">
                <h1 className="text-2xl font-black text-purple-700 dark:text-purple-400 mb-6 uppercase tracking-wide">Ejercicios</h1>

                {/* ===== ACTIVITY 1 ===== */}
                <div className="mb-6 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-4">
                        <PlayVideoButton trackingId={VIDEO_TRACKING.EJ_1} title="Ejercicio 1" />
                        <span className="bg-purple-700 text-white text-sm font-bold w-8 h-8 rounded flex items-center justify-center flex-shrink-0">1</span>
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                            Determinar si las siguientes divisiones son exactas u inexactas.
                        </p>
                    </div>

                    <div className="space-y-3">
                        {act1Items.map((item, i) => (
                            <div key={i} className="flex flex-wrap items-center gap-3">
                                <span className="w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-sm inline-block flex-shrink-0"></span>
                                <p className="text-base font-bold text-gray-900 dark:text-white min-w-[100px]">
                                    {item.dividend} ÷ {item.divisor}
                                </p>
                                <select
                                    value={act1Answers[i] || ''}
                                    onChange={(e) => setAct1Answers(prev => ({ ...prev, [i]: e.target.value }))}
                                    className={selectClass(act1Results[i] ?? null)}
                                    disabled={act1Results[i] === true}
                                >
                                    <option value="">Selecciona</option>
                                    <option value="exacta">es exacta</option>
                                    <option value="inexacta">es inexacta</option>
                                </select>
                                <button onClick={() => handleAct1Listo(i)}
                                    className="px-4 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded"
                                    disabled={act1Results[i] === true}>
                                    ¿LISTO?
                                </button>
                                {act1Results[i] === true && <span className="text-green-600 font-bold">✅</span>}
                                {act1Results[i] === false && <span className="text-red-500 font-bold">❌</span>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ===== ACTIVITY 2 ===== */}
                <div className="mb-6 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="bg-purple-700 text-white text-sm font-bold w-8 h-8 rounded flex items-center justify-center flex-shrink-0">2</span>
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Resuelve.</p>
                    </div>

                    <div className="space-y-6">
                        {act2Items.map((item, i) => (
                            <div key={i} className="space-y-2 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                                {/* Division line */}
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-sm inline-block flex-shrink-0"></span>
                                    <p className="text-base font-bold text-gray-900 dark:text-white">
                                        {item.dividend} ÷ {item.divisor} =
                                    </p>
                                    <input
                                        type="number"
                                        value={act2[`${i}-q`] || ''}
                                        onChange={(e) => setAct2(prev => ({ ...prev, [`${i}-q`]: e.target.value }))}
                                        className={inputClass(act2Results[i] ?? null)}
                                        disabled={act2Results[i] === true}
                                    />
                                </div>

                                {/* ¿Hay resto? */}
                                <div className="flex flex-wrap items-center gap-3 ml-6">
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">¿Hay resto?</span>
                                    <select
                                        value={act2[`${i}-hasR`] || ''}
                                        onChange={(e) => setAct2(prev => ({ ...prev, [`${i}-hasR`]: e.target.value }))}
                                        className={selectClass(act2Results[i] ?? null)}
                                        disabled={act2Results[i] === true}
                                    >
                                        <option value="">...</option>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>

                                    {/* Show ¿Cuál? only if user answered "si" */}
                                    {act2[`${i}-hasR`] === 'si' && (
                                        <>
                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">¿Cuál?</span>
                                            <input
                                                type="number"
                                                value={act2[`${i}-r`] || ''}
                                                onChange={(e) => setAct2(prev => ({ ...prev, [`${i}-r`]: e.target.value }))}
                                                className={inputClass(act2Results[i] ?? null)}
                                                style={{ width: '48px' }}
                                                disabled={act2Results[i] === true}
                                            />
                                        </>
                                    )}
                                </div>

                                {/* Esta división es... */}
                                <div className="flex flex-wrap items-center gap-3 ml-6">
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Esta división es</span>
                                    <select
                                        value={act2[`${i}-type`] || ''}
                                        onChange={(e) => setAct2(prev => ({ ...prev, [`${i}-type`]: e.target.value }))}
                                        className={selectClass(act2Results[i] ?? null)}
                                        disabled={act2Results[i] === true}
                                    >
                                        <option value="">Selecciona</option>
                                        <option value="exacta">es exacta</option>
                                        <option value="inexacta">es inexacta</option>
                                    </select>
                                    <button onClick={() => handleAct2Listo(i)}
                                        className="px-4 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded"
                                        disabled={act2Results[i] === true}>
                                        ¿LISTO?
                                    </button>
                                    {act2Results[i] === true && <span className="text-green-600 font-bold">✅</span>}
                                    {act2Results[i] === false && <span className="text-red-500 font-bold">❌</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ===== ACTIVITY 3 ===== */}
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="bg-purple-700 text-white text-sm font-bold w-8 h-8 rounded flex items-center justify-center flex-shrink-0">3</span>
                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                            Resuelve problemas matemáticos. Debe escribir en la hoja para procedimiento.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {act3Items.map((item, i) => (
                            <div key={i} className="space-y-2 bg-gray-50 dark:bg-gray-700/30 p-4 rounded-lg">
                                {/* Problem text */}
                                <div className="flex items-start gap-2">
                                    <PlayVideoButton trackingId={item.trackingId} title={`Problema ${i + 1}`} />
                                    <span className="w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-sm inline-block flex-shrink-0 mt-1.5"></span>
                                    <div>
                                        <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">{item.text}</p>
                                        <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">{item.question}</p>
                                    </div>
                                </div>

                                {/* Answer input */}
                                <div className="flex justify-center my-2">
                                    <input
                                        type="number"
                                        value={act3[`${i}-a`] || ''}
                                        onChange={(e) => setAct3(prev => ({ ...prev, [`${i}-a`]: e.target.value }))}
                                        className={inputClass(act3Results[i] ?? null)}
                                        disabled={act3Results[i] === true}
                                    />
                                </div>

                                {/* ¿Hay resto? + ¿Cuál? + ¿LISTO? */}
                                <div className="flex flex-wrap items-center gap-3 ml-6">
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">¿Hay resto?</span>
                                    <select
                                        value={act3[`${i}-hasR`] || ''}
                                        onChange={(e) => setAct3(prev => ({ ...prev, [`${i}-hasR`]: e.target.value }))}
                                        className={selectClass(act3Results[i] ?? null)}
                                        disabled={act3Results[i] === true}
                                    >
                                        <option value="">...</option>
                                        <option value="si">Sí</option>
                                        <option value="no">No</option>
                                    </select>

                                    {act3[`${i}-hasR`] === 'si' && (
                                        <>
                                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">¿Cuál?</span>
                                            <input
                                                type="number"
                                                value={act3[`${i}-r`] || ''}
                                                onChange={(e) => setAct3(prev => ({ ...prev, [`${i}-r`]: e.target.value }))}
                                                className={inputClass(act3Results[i] ?? null)}
                                                style={{ width: '48px' }}
                                                disabled={act3Results[i] === true}
                                            />
                                            {item.remainderUnit && (
                                                <span className="text-sm text-gray-600 dark:text-gray-400">{item.remainderUnit}</span>
                                            )}
                                        </>
                                    )}

                                    <button onClick={() => handleAct3Listo(i)}
                                        className="px-4 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded"
                                        disabled={act3Results[i] === true}>
                                        ¿LISTO?
                                    </button>
                                    {act3Results[i] === true && <span className="text-green-600 font-bold">✅</span>}
                                    {act3Results[i] === false && <span className="text-red-500 font-bold">❌</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* VideoModal removed */}
        </BookPageContainer>
    );
}
