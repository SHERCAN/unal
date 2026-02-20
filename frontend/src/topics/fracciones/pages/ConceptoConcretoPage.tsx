'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';

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

/*
 * Hand-tuned position for each slice on the plate container (280×280px).
 * Centre of the plate = 140, 140.
 * Each slice is positioned so its "tip" corner (the pointy end that goes
 * to the centre of the pizza) sits exactly at the plate centre.
 *
 * Image sizes (px):
 *   1: 67×58   tip at bottom-left     → position: right=centre, bottom=centre
 *   2: 105×48  tip at bottom-right    → position: right edge at centre
 *   3: 109×58  tip at bottom-right    → position: right edge at centre
 *   4: 92×81   tip at top-right       → position: right edge at centre, top at centre
 *   5: 95×80   tip at top-left        → position: left edge at centre, top at centre
 *   6: 111×52  tip at top-left        → position: left edge at centre
 *   7: 106×45  tip at top-left        → position: left edge at centre
 *   8: 65×58   tip at bottom-right    → position: right edge at centre
 */
const SLICE_STYLES: React.CSSProperties[] = [
    // porcion1 – 12 o'clock (top-right sector). Tip is at bottom-left corner.
    { position: 'absolute', left: '70px', top: '82px' },
    // porcion2 – 10:30 (top-left sector). Tip is at bottom-right corner.
    { position: 'absolute', left: '35px', top: '100px' },
    // porcion3 – 9 o'clock (left sector). Tip is at bottom-right corner.
    { position: 'absolute', left: '31px', top: '140px' },
    // porcion4 – 7:30 (bottom-left sector). Tip is at top-right corner.
    { position: 'absolute', left: '48px', top: '140px' },
    // porcion5 – 6 o'clock (bottom-right sector). Tip is at top-left corner.
    { position: 'absolute', left: '140px', top: '140px' },
    // porcion6 – 4:30 (right-bottom sector). Tip is at top-left corner.
    { position: 'absolute', left: '140px', top: '135px' },
    // porcion7 – 3 o'clock (right sector). Tip is at top-left corner.
    { position: 'absolute', left: '140px', top: '95px' },
    // porcion8 – 1:30 (top-right sector lower). Tip is at bottom-right corner.
    { position: 'absolute', left: '140px', top: '82px' },
];

export function ConceptoConcretoPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        C_PIZZA: 'fracciones-c-pizza',
        P_EXPLAIN: 'fracciones-p-explain',
    };

    /* videoModal list removed */
    /* ref removed */

    /* handleVideoComplete removed */

    /* openVideo removed */

    /* PlayButton definition removed */

    /* ═══════════════════════ SECTION C STATE ═══════════════════════ */
    const [sliceLocations, setSliceLocations] = useState<Record<number, number>>({
        0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0,
    });
    const [draggedSlice, setDraggedSlice] = useState<number | null>(null);
    const [listoResultC, setListoResultC] = useState<'correct' | 'incorrect' | null>(null);

    const handleDragStart = (sliceIdx: number) => {
        setDraggedSlice(sliceIdx);
    };

    const handleDropOnMesa = (mesaIdx: number) => {
        if (draggedSlice === null) return;
        setSliceLocations(prev => ({ ...prev, [draggedSlice]: mesaIdx }));
        setDraggedSlice(null);
        setListoResultC(null);
    };

    const handleDropOnPlate = () => {
        if (draggedSlice === null) return;
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

    const handleListoC = () => {
        const totalOnMesas = Object.values(sliceLocations).filter(loc => loc > 0).length;
        setListoResultC(totalOnMesas === 3 ? 'correct' : 'incorrect');
    };

    const handleResetC = () => {
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
        if (cuts < maxCuts) {
            setCuts(prev => prev + 1);
            setRemovedPortions([]);
            setListoResultP(null);
        }
    };

    const portionsReady = totalPortions === 8;

    const handleClickPortionOnCircle = (portionIdx: number) => {
        if (!portionsReady) return;
        if (removedPortions.includes(portionIdx)) return;
        setRemovedPortions(prev => [...prev, portionIdx]);
        setListoResultP(null);
    };

    const handleClickPortionOnRemoved = (portionIdx: number) => {
        setRemovedPortions(prev => prev.filter(p => p !== portionIdx));
        setListoResultP(null);
    };

    const handleListoP = () => {
        setListoResultP(removedPortions.length === 3 ? 'correct' : 'incorrect');
    };

    const handleResetP = () => {
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

    /* Cut lines for the circle */
    const getCutLines = () => {
        const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
        const cx = 150, cy = 150, r = 120;
        if (cuts >= 1) {
            lines.push({ x1: cx, y1: cy - r, x2: cx, y2: cy + r });
        }
        if (cuts >= 2) {
            lines.push({ x1: cx - r, y1: cy, x2: cx + r, y2: cy });
        }
        if (cuts >= 3) {
            const a = 45 * (Math.PI / 180);
            lines.push({
                x1: cx + r * Math.cos(a - Math.PI), y1: cy + r * Math.sin(a - Math.PI),
                x2: cx + r * Math.cos(a), y2: cy + r * Math.sin(a),
            });
        }
        if (cuts >= 4) {
            const a = -45 * (Math.PI / 180);
            lines.push({
                x1: cx + r * Math.cos(a - Math.PI), y1: cy + r * Math.sin(a - Math.PI),
                x2: cx + r * Math.cos(a), y2: cy + r * Math.sin(a),
            });
        }
        return lines;
    };

    const getPortionLabel = () => {
        if (totalPortions === 1) return '1 porción';
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
                        <PlayVideoButton trackingId={VIDEO_TRACKING.C_PIZZA} title="Fracciones - Concepto Concreto" videoId="/pag1/vv-1" />
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
                                {/* Mesa image - the child with plate */}
                                <div className="relative w-full">
                                    <img
                                        src={`/fracciones/mesa${mesaIdx}.png`}
                                        alt={`Mesa ${mesaIdx}`}
                                        className="w-full h-auto object-contain"
                                    />
                                    {/* Slices dropped on this mesa: positioned over the child's plate
                                        The plate in mesa images is at roughly: 50% from left, 75% from top */}
                                    <div className="absolute flex gap-0.5 items-center justify-center flex-wrap"
                                        style={{ bottom: '18%', left: '20%', right: '30%' }}
                                    >
                                        {slicesOnMesa(mesaIdx).map(sIdx => (
                                            <img
                                                key={sIdx}
                                                src={PORCION_SRCS[sIdx]}
                                                alt={`Porción ${sIdx + 1}`}
                                                draggable
                                                onDragStart={() => handleDragStart(sIdx)}
                                                className="object-contain cursor-grab active:cursor-grabbing drop-shadow-md hover:scale-110 transition-transform"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* ── ROW 2: PLATO CON PIZZA + PIZZERO ── */}
                    {/* Layout: pizzero is the anchor, plate overlaps his raised hand */}
                    <div className="flex justify-center mt-2">
                        <div className="relative" style={{ width: '420px', height: '300px' }}>

                            {/* Pizzero - anchored to the right side */}
                            <img
                                src="/fracciones/pizzero.png"
                                alt="Pizzero"
                                className="absolute bottom-0 right-0 h-auto object-contain drop-shadow-xl"
                                style={{ width: '200px', zIndex: 5 }}
                            />

                            {/* Plato con pizza - overlapping the pizzero's raised left hand */}
                            <div
                                className={`absolute ${draggedSlice !== null ? 'ring-2 ring-orange-400 ring-offset-2 rounded-xl' : ''}`}
                                onDragOver={handleDragOver}
                                onDrop={handleDropOnPlate}
                                style={{ width: '280px', height: '280px', top: '-30px', left: '48px', zIndex: 10 }}
                            >
                                {/* Plate image - centered under the pizza */}
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

                                {/* Pizza slices on plate */}
                                {slicesOnPlate.map(sIdx => (
                                    <img
                                        key={sIdx}
                                        src={PORCION_SRCS[sIdx]}
                                        alt={`Porción ${sIdx + 1}`}
                                        draggable
                                        onDragStart={() => handleDragStart(sIdx)}
                                        className="object-contain cursor-grab active:cursor-grabbing z-10 hover:scale-110 transition-transform drop-shadow-lg"
                                        style={SLICE_STYLES[sIdx]}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── LISTO button ── */}
                    <div className="flex flex-col items-center mt-3 gap-2">
                        <div className="flex gap-3">
                            {listoResultC !== 'correct' && (
                                <button onClick={handleListoC}
                                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold rounded-md shadow-md transform active:scale-95 transition-all text-sm">
                                    ¿LISTO?
                                </button>
                            )}
                            {listoResultC !== null && (
                                <button onClick={handleResetC}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-md transition-colors text-sm">
                                    Reiniciar
                                </button>
                            )}
                        </div>
                        {listoResultC === 'correct' && (
                            <p className="text-green-600 font-bold animate-bounce text-sm">✅ ¡Muy bien! Serviste 3 porciones de pizza.</p>
                        )}
                        {listoResultC === 'incorrect' && (
                            <p className="text-red-500 font-bold text-sm">❌ Debes llevar exactamente 3 porciones a las mesas. Tienes {Object.values(sliceLocations).filter(l => l > 0).length}.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* ═══════════════════ P - PROCESUAL SECTION ═══════════════════ */}
            <div className="relative ml-2 flex items-start">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center" style={{ backgroundColor: '#60a5fa' }}>
                    P
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 bg-white" style={{ borderColor: '#60a5fa' }}>

                    {/* Instruction text */}
                    <div className="flex items-start gap-3 mb-6">
                        <div className="flex-1">
                            <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                                De acuerdo con la actividad anterior, divide el círculo en 8 porciones iguales
                                utilizando únicamente tres cortes. Luego, retira 3 de esas porciones.
                            </p>
                        </div>
                        <PlayVideoButton trackingId={VIDEO_TRACKING.P_EXPLAIN} title="Fracciones - Proceso" videoId="/pag1/vv-1" />
                    </div>

                    {/* Labels */}
                    <div className="flex justify-between mb-2 px-4">
                        <div className="text-center flex-1">
                            <p className="text-purple-600 font-bold text-sm">{getPortionLabel()}</p>
                            <p className="text-purple-600 font-semibold text-xs">{totalPortions} porciones</p>
                        </div>
                        <div className="text-center" style={{ width: '180px' }}>
                            <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">Porciones que quedan</p>
                        </div>
                    </div>

                    <div className="flex gap-4 items-start">
                        {/* ── Left: Cut button + Circle ── */}
                        <div className="flex items-start gap-2 flex-1">
                            {/* + button for cuts */}
                            {cuts < maxCuts && (
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

                            {/* Circle / Pie */}
                            <div
                                className="border-2 border-gray-800 rounded-sm p-2 flex items-center justify-center flex-1"
                                style={{ minHeight: '280px' }}
                            >
                                <svg viewBox="0 0 300 300" className="w-full max-w-[260px] h-auto">
                                    {/* Background circle */}
                                    <circle cx="150" cy="150" r="122" fill="#e5e7eb" stroke="#2d2d2d" strokeWidth="3" />

                                    {/* Portions - the stroke on each path creates the division lines */}
                                    {totalPortions === 1 ? (
                                        <circle
                                            cx="150" cy="150" r="120"
                                            fill="#F59E0B"
                                            stroke="#2d2d2d" strokeWidth="2"
                                        />
                                    ) : (
                                        Array.from({ length: totalPortions }, (_, i) => {
                                            const isRemoved = removedPortions.includes(i);
                                            return (
                                                <path
                                                    key={i}
                                                    d={createPiePath(i, totalPortions)}
                                                    fill={isRemoved ? '#e5e7eb' : '#F59E0B'}
                                                    stroke="#2d2d2d"
                                                    strokeWidth="2.5"
                                                    className={portionsReady && !isRemoved ? 'cursor-pointer hover:brightness-110 transition-all' : ''}
                                                    onClick={() => handleClickPortionOnCircle(i)}
                                                />
                                            );
                                        })
                                    )}
                                </svg>
                            </div>
                        </div>

                        {/* ── Right: "Porciones que quedan" area ── */}
                        <div
                            className="border-2 border-gray-800 rounded-sm flex flex-col items-center justify-start p-3 gap-1 transition-all"
                            style={{ width: '180px', minHeight: '280px' }}
                        >
                            {removedPortions.length === 0 && portionsReady && (
                                <p className="text-gray-400 text-xs text-center mt-8">Haz clic en las porciones del círculo para moverlas aquí</p>
                            )}
                            {removedPortions.map(pIdx => (
                                <svg
                                    key={pIdx}
                                    viewBox="100 20 100 140"
                                    className="w-32 h-32 cursor-pointer hover:scale-110 transition-transform -my-4"
                                    onClick={() => handleClickPortionOnRemoved(pIdx)}
                                >
                                    <path
                                        d={createPiePath(0, 8)} // Always render as "slice 0" shape
                                        fill="#F59E0B"
                                        stroke="#2d2d2d"
                                        strokeWidth="3"
                                        transform="rotate(-22.5 150 150)" // Rotate to point straigth up
                                    />
                                </svg>
                            ))}
                        </div>
                    </div>

                    {/* ── LISTO button ── */}
                    <div className="flex flex-col items-center mt-6 gap-2">
                        <div className="flex gap-3">
                            {listoResultP !== 'correct' && (
                                <button onClick={handleListoP}
                                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-bold rounded-md shadow-md transform active:scale-95 transition-all text-sm">
                                    ¿LISTO?
                                </button>
                            )}
                            {listoResultP !== null && (
                                <button onClick={handleResetP}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-md transition-colors text-sm">
                                    Reiniciar
                                </button>
                            )}
                        </div>
                        {listoResultP === 'correct' && (
                            <p className="text-green-600 font-bold animate-bounce text-sm">
                                ✅ ¡Correcto! Quedan {totalPortions - removedPortions.length} de {totalPortions} porciones → {totalPortions - removedPortions.length}/{totalPortions}
                            </p>
                        )}
                        {listoResultP === 'incorrect' && (
                            <p className="text-red-500 font-bold text-sm">
                                ❌ Debes quitar exactamente 3 porciones. Tienes {removedPortions.length} en el área.
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* VideoModal removed */}
        </BookPageContainer>
    );
}
