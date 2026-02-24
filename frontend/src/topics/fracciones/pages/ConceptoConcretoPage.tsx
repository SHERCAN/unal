'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useEffect } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';


interface Props { zoom?: number; }

/* ─────────── porcion asset paths ─────────── */
const PORCION_SRCS = [
    '/fracciones/porcion1.png',
    '/fracciones/porcion2.png',
    '/fracciones/porcion3.png',
    '/fracciones/porcion4.png',
    '/fracciones/porcion5.png',
    '/fracciones/porcion6.png',
    '/fracciones/porcion7.png',
    '/fracciones/porcion8.png',
];

const SLICE_STYLES: React.CSSProperties[] = [
    { position: 'absolute', left: '70px', top: '82px' },
    { position: 'absolute', left: '35px', top: '100px' },
    { position: 'absolute', left: '31px', top: '140px' },
    { position: 'absolute', left: '48px', top: '140px' },
    { position: 'absolute', left: '140px', top: '140px' },
    { position: 'absolute', left: '140px', top: '135px' },
    { position: 'absolute', left: '140px', top: '95px' },
    { position: 'absolute', left: '140px', top: '82px' },
];

//PAGINA 1 CONCRETO PICTORICO
export function ConceptoConcretoPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched, submitGame, completeStage, isExerciseCompleted } = useVideoProgress();

    const VIDEO_TRACKING = {
        C_PIZZA: 'fracciones-pag17-v1',
        P_EXPLAIN: 'fracciones-pag17-v2',
    };

    const EXERCISE_IDS = {
        C_ACTIVITY: 'fracciones-pag17-ej1',
        P_ACTIVITY: 'fracciones-pag17-ej2'
    };

    const STAGE_IDS = {
        C_STAGE: 'fracciones-pag17-c-stage',
        P_STAGE: 'fracciones-pag17-p-stage'
    };

    /* ═══════════════════════ SECTION C STATE ═══════════════════════ */
    const [sliceLocations, setSliceLocations] = useState<Record<number, number>>({
        0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0,
    });
    const [draggedSlice, setDraggedSlice] = useState<number | null>(null);
    const [listoResultC, setListoResultC] = useState<'correct' | 'incorrect' | null>(null);

    useEffect(() => {
        if (isExerciseCompleted(EXERCISE_IDS.C_ACTIVITY)) setListoResultC('correct');
        if (isExerciseCompleted(EXERCISE_IDS.P_ACTIVITY)) setListoResultP('correct');
    }, [isExerciseCompleted]);

    const handleDragStart = (sliceIdx: number) => {
        if (listoResultC === 'correct') return;
        setDraggedSlice(sliceIdx);
    };

    const handleDropOnMesa = (mesaIdx: number) => {
        if (draggedSlice === null || listoResultC === 'correct') return;
        setSliceLocations(prev => ({ ...prev, [draggedSlice]: mesaIdx }));
        setDraggedSlice(null);
        setListoResultC(null);
    };

    const handleDropOnPlate = () => {
        if (draggedSlice === null || listoResultC === 'correct') return;
        setSliceLocations(prev => ({ ...prev, [draggedSlice]: 0 }));
        setDraggedSlice(null);
        setListoResultC(null);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const slicesOnMesa = (mesa: number) =>
        Object.entries(sliceLocations).filter(([, loc]) => loc === mesa).map(([idx]) => Number(idx));

    const slicesOnPlate = slicesOnMesa(0);

    const handleListoC = async () => {
        if (isExerciseCompleted(EXERCISE_IDS.C_ACTIVITY)) return;
        const totalOnMesas = Object.values(sliceLocations).filter(loc => loc > 0).length;
        const isCorrect = totalOnMesas === 3;
        setListoResultC(isCorrect ? 'correct' : 'incorrect');
        await submitGame(EXERCISE_IDS.C_ACTIVITY, isCorrect);
        if (isCorrect) {
            await completeStage(STAGE_IDS.C_STAGE);
        }
    };

    const handleResetC = () => {
        if (isExerciseCompleted(EXERCISE_IDS.C_ACTIVITY)) return;
        setSliceLocations({ 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 });
        setListoResultC(null);
    };

    /* ═══════════════════════ SECTION P STATE ═══════════════════════ */
    const [cuts, setCuts] = useState(0);
    const maxCuts = 4;
    const totalPortions = cuts === 0 ? 1 : cuts * 2;
    const [removedPortions, setRemovedPortions] = useState<number[]>([]);
    const [listoResultP, setListoResultP] = useState<'correct' | 'incorrect' | null>(null);

    const handleAddCut = () => {
        if (listoResultP === 'correct') return;
        if (cuts < maxCuts) {
            setCuts(prev => prev + 1);
            setRemovedPortions([]);
            setListoResultP(null);
        }
    };

    const portionsReady = totalPortions === 8;

    const handleClickPortionOnCircle = (portionIdx: number) => {
        if (listoResultP === 'correct') return;
        if (!portionsReady) return;
        if (removedPortions.includes(portionIdx)) return;
        setRemovedPortions(prev => [...prev, portionIdx]);
        setListoResultP(null);
    };

    const handleClickPortionOnRemoved = (portionIdx: number) => {
        if (listoResultP === 'correct') return;
        setRemovedPortions(prev => prev.filter(p => p !== portionIdx));
        setListoResultP(null);
    };

    const handleListoP = async () => {
        if (isExerciseCompleted(EXERCISE_IDS.P_ACTIVITY)) return;
        const isCorrect = removedPortions.length === 3;
        setListoResultP(isCorrect ? 'correct' : 'incorrect');
        await submitGame(EXERCISE_IDS.P_ACTIVITY, isCorrect);
        if (isCorrect) {
            await completeStage(STAGE_IDS.P_STAGE);
        }
    };

    const handleResetP = () => {
        if (isExerciseCompleted(EXERCISE_IDS.P_ACTIVITY)) return;
        setCuts(0);
        setRemovedPortions([]);
        setListoResultP(null);
    };

    /* SVG Pie-slice path builder */
    const createPiePath = (index: number, total: number, radius: number = 120) => {
        const angle = 360 / total;
        const startAngle = (index * angle - 90) * (Math.PI / 180);
        const endAngle = ((index + 1) * angle - 90) * (Math.PI / 180);
        const cx = 150, cy = 150;
        const x1 = cx + radius * Math.cos(startAngle);
        const y1 = cy + radius * Math.sin(startAngle);
        const x2 = cx + radius * Math.cos(endAngle);
        const y2 = cy + radius * Math.sin(endAngle);
        const large = angle > 180 ? 1 : 0;
        return `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z`;
    };

    const getPortionLabel = () => {
        if (totalPortions === 1) return '1 porción';
        if (listoResultP === 'correct') return `Quedan ${8 - 3} porciones`;
        if (removedPortions.length > 0) {
            return `Quedan ${totalPortions - removedPortions.length} porciones`;
        }
        return `${totalPortions} porciones`;
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones' }} pageId="fracciones-concepto-concreto">
            {/* ═══════════════════ C - CONCRETO SECTION ═══════════════════ */}
            <div className="relative ml-2 flex items-start mb-8">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center" style={{ backgroundColor: '#4ade80' }}>
                    C
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-4 bg-white" style={{ borderColor: '#4ade80' }}>

                    {/* Play button */}
                    <div className="absolute top-3 left-3 z-20">
                        <PlayVideoButton trackingId={VIDEO_TRACKING.C_PIZZA} title="" videoId="/pag17/vv-1" />
                    </div>

                    {/* ── ROW 1: 3 MESAS ── */}
                    <div className="flex justify-center items-end gap-1 mt-2 mb-3">
                        {[1, 2, 3].map(mesaIdx => (
                            <div
                                key={mesaIdx}
                                className={`relative flex flex-col items-center transition-all ${draggedSlice !== null ? 'ring-2 ring-purple-400 ring-offset-1 rounded-lg' : ''}`}
                                onDragOver={handleDragOver}
                                onDrop={() => handleDropOnMesa(mesaIdx)}
                                style={{ width: '160px' }}
                            >
                                <div className="relative w-full">
                                    <img
                                        src={`/fracciones/mesa${mesaIdx}.png`}
                                        alt={`Mesa ${mesaIdx}`}
                                        className="w-full h-auto object-contain"
                                    />
                                    <div className="absolute flex gap-0.5 items-center justify-center flex-wrap"
                                        style={{ bottom: '18%', left: '20%', right: '30%' }}
                                    >
                                        {slicesOnMesa(mesaIdx).map(sIdx => (
                                            <img
                                                key={sIdx}
                                                src={PORCION_SRCS[sIdx]}
                                                alt={`Porción ${sIdx + 1}`}
                                                draggable={listoResultC !== 'correct'}
                                                onDragStart={() => handleDragStart(sIdx)}
                                                className={`object-contain ${listoResultC !== 'correct' ? 'cursor-grab active:cursor-grabbing drop-shadow-md hover:scale-110 transition-transform' : ''}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-2">
                        <div className="relative" style={{ width: '420px', height: '300px' }}>
                            <img
                                src="/fracciones/pizzero.png"
                                alt="Pizzero"
                                className="absolute bottom-0 right-0 h-auto object-contain drop-shadow-xl"
                                style={{ width: '200px', zIndex: 5 }}
                            />
                            <div
                                className={`absolute ${draggedSlice !== null ? 'ring-2 ring-orange-400 ring-offset-2 rounded-xl' : ''}`}
                                onDragOver={handleDragOver}
                                onDrop={handleDropOnPlate}
                                style={{ width: '280px', height: '280px', top: '-30px', left: '48px', zIndex: 10 }}
                            >
                                <img
                                    src="/fracciones/platopizza.png"
                                    alt="Plato"
                                    className="absolute z-0"
                                    style={{
                                        width: '220px',
                                        left: '50%',
                                        top: '55%',
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                />
                                {slicesOnPlate.map(sIdx => (
                                    <img
                                        key={sIdx}
                                        src={PORCION_SRCS[sIdx]}
                                        alt={`Porción ${sIdx + 1}`}
                                        draggable={listoResultC !== 'correct'}
                                        onDragStart={() => handleDragStart(sIdx)}
                                        className={`object-contain ${listoResultC !== 'correct' ? 'cursor-grab active:cursor-grabbing z-10 hover:scale-110 transition-transform drop-shadow-lg' : ''}`}
                                        style={SLICE_STYLES[sIdx]}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center mt-3 gap-2">
                        <FeedbackButton
                            onCheck={handleListoC}
                            onReset={handleResetC}
                            status={listoResultC}
                        />
                    </div>
                </div>
            </div>

            {/* ═══════════════════ P - PROCESUAL SECTION ═══════════════════ */}
            <div className="relative ml-2 flex items-start">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center" style={{ backgroundColor: '#60a5fa' }}>
                    P
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 bg-white" style={{ borderColor: '#60a5fa' }}>

                    <div className="flex items-start gap-3 mb-6">
                        <div className="flex-1">
                            <p className="text-gray-800 font-semibold dark:text-gray-200 text-base leading-relaxed">
                                De acuerdo con la actividad anterior, divide el círculo en 8 porciones iguales
                                utilizando únicamente tres cortes. Luego, retira 3 de esas porciones.
                                <PlayVideoButton trackingId={VIDEO_TRACKING.P_EXPLAIN} title="" videoId="/pag17/vv-2" />
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-between mb-2 px-4">
                        <div className="text-center flex-1">
                            <p className="text-[#f49d45] font-bold text-lg">{getPortionLabel()}</p>
                            <p className="text-purple-600 font-semibold text-base">{listoResultP === 'correct' ? 8 : totalPortions} porciones</p>
                        </div>
                        <div className="text-center" style={{ width: '180px' }}>
                            <p className="font-bold text-gray-800 dark:text-gray-200 text-base">Porciones que quedan</p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start">
                        <div className="flex items-start gap-2 flex-1">
                            {cuts < maxCuts && listoResultP !== 'correct' && (
                                <div className="flex flex-col items-center gap-1 mt-16">
                                    <button
                                        onClick={handleAddCut}
                                        className="w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center justify-center text-2xl font-bold shadow-lg transition-all transform hover:scale-110 active:scale-95"
                                    >
                                        +
                                    </button>
                                    <span className="text-xs font-bold text-purple-600">corte</span>
                                </div>
                            )}

                            <div
                                className="border-2 border-gray-800 rounded-sm p-2 flex items-center justify-center flex-1"
                                style={{ minHeight: '280px' }}
                            >
                                <svg viewBox="0 0 300 300" className="w-full max-w-[260px] h-auto">
                                    <circle cx="150" cy="150" r="122" fill="#e5e7eb" stroke="#2d2d2d" strokeWidth="3" />

                                    {totalPortions === 1 && listoResultP !== 'correct' ? (
                                        <circle
                                            cx="150" cy="150" r="120"
                                            fill="#F59E0B"
                                            stroke="#2d2d2d" strokeWidth="2"
                                        />
                                    ) : (
                                        Array.from({ length: 8 }, (_, i) => {
                                            // Force 8 servings if completed
                                            const currentTotal = listoResultP === 'correct' ? 8 : totalPortions;
                                            if (i >= currentTotal) return null;

                                            const isRemoved = listoResultP === 'correct' ? (i < 3) : removedPortions.includes(i);
                                            return (
                                                <path
                                                    key={i}
                                                    d={createPiePath(i, currentTotal)}
                                                    fill={isRemoved ? '#e5e7eb' : '#F59E0B'}
                                                    stroke="#2d2d2d"
                                                    strokeWidth="2.5"
                                                    className={portionsReady && !isRemoved && listoResultP !== 'correct' ? 'cursor-pointer hover:brightness-110 transition-all' : ''}
                                                    onClick={() => handleClickPortionOnCircle(i)}
                                                />
                                            );
                                        })
                                    )}
                                </svg>
                            </div>
                        </div>

                        <div
                            className="border-2 border-gray-800 rounded-sm flex flex-col items-center justify-start p-3 gap-1 transition-all"
                            style={{ width: '180px', minHeight: '280px' }}
                        >
                            {((listoResultP === 'correct' ? 3 : removedPortions.length) === 0) && portionsReady && (
                                <p className="text-gray-400 text-xs text-center mt-8">Haz clic en las porciones del círculo para moverlas aquí</p>
                            )}
                            {(listoResultP === 'correct' ? [0, 1, 2] : removedPortions).map(pIdx => (
                                <svg
                                    key={pIdx}
                                    viewBox="100 20 100 140"
                                    className={`w-32 h-32 ${listoResultP !== 'correct' ? 'cursor-pointer hover:scale-110 transition-transform' : ''} -my-4`}
                                    onClick={() => handleClickPortionOnRemoved(pIdx)}
                                >
                                    <path
                                        d={createPiePath(0, 8)}
                                        fill="#F59E0B"
                                        stroke="#2d2d2d"
                                        strokeWidth="3"
                                        transform="rotate(-22.5 150 150)"
                                    />
                                </svg>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-center mt-6 gap-2">
                        <FeedbackButton
                            onCheck={handleListoP}
                            onReset={handleResetP}
                            status={listoResultP}
                        />
                    </div>
                </div>
            </div>
        </BookPageContainer>
    );
}
