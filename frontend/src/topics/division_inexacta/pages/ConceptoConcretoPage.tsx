'use client';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import VideoModal from '@/components/VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

/**
 * Frame 164 — División Inexacta
 * C section: Same coach+medal box layout as Frame 158 but with 17 medals
 *   - Speech bubble "¿2?" next to coach
 *   - 3 drop zones + 3 team images (same teams)
 *   - ¿LISTO? + CORRECTO/INCORRECTO
 * P section: 17 yellow circles drag-drop into 3 boxes with counters
 *   - "¿Cuánto resto hay?" input + ¿LISTO?
 */

interface Props { zoom?: number; }

type Medal = { id: number; location: 'box' | 'team1' | 'team2' | 'team3' };

export function ConceptoConcretoPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        C_INTRO: 'division-inexacta-c-intro',
        P_EXPLAIN: 'division-inexacta-p-explain',
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

    // ===== C SECTION: 17 medals into 3 teams (medals will not divide evenly) =====
    const TOTAL_MEDALS_C = 17;
    const [medalsC, setMedalsC] = useState<Medal[]>(
        Array.from({ length: TOTAL_MEDALS_C }, (_, i) => ({ id: i, location: 'box' as const }))
    );
    const [draggedMedalC, setDraggedMedalC] = useState<number | null>(null);
    const [medalResultC, setMedalResultC] = useState<'correct' | 'incorrect' | null>(null);

    const getMedalsInBoxC = () => medalsC.filter(m => m.location === 'box');
    const getMedalsInTeamC = (team: number) => medalsC.filter(m => m.location === `team${team}`);

    const handleMedalDragStartC = (e: React.DragEvent, medalId: number) => {
        e.dataTransfer.setData('text/plain', String(medalId));
        setDraggedMedalC(medalId);
    };

    const handleDragOver = (e: React.DragEvent) => e.preventDefault();

    const handleMedalDropOnTeamC = (e: React.DragEvent, team: number) => {
        e.preventDefault();
        const id = parseInt(e.dataTransfer.getData('text/plain'));
        if (isNaN(id)) return;
        setMedalsC(prev => prev.map(m => m.id === id ? { ...m, location: `team${team}` as Medal['location'] } : m));
        setDraggedMedalC(null);
        setMedalResultC(null);
    };

    const handleMedalDropOnBoxC = (e: React.DragEvent) => {
        e.preventDefault();
        const id = parseInt(e.dataTransfer.getData('text/plain'));
        if (isNaN(id)) return;
        setMedalsC(prev => prev.map(m => m.id === id ? { ...m, location: 'box' } : m));
        setDraggedMedalC(null);
        setMedalResultC(null);
    };

    const handleMedalListoC = () => {
        // 17 ÷ 3 is not exact. Accept: each team gets 5, 2 left in box
        const t1 = getMedalsInTeamC(1).length;
        const t2 = getMedalsInTeamC(2).length;
        const t3 = getMedalsInTeamC(3).length;
        const inBox = getMedalsInBoxC().length;
        if (t1 === 5 && t2 === 5 && t3 === 5 && inBox === 2) {
            setMedalResultC('correct');
        } else {
            setMedalResultC('incorrect');
        }
    };

    const handleMedalResetC = () => {
        setMedalsC(Array.from({ length: TOTAL_MEDALS_C }, (_, i) => ({ id: i, location: 'box' as const })));
        setMedalResultC(null);
    };

    // ===== P SECTION: 17 circles into 3 groups =====
    const TOTAL_CIRCLES = 17;
    const NUM_GROUPS = 3;

    const [circles, setCircles] = useState<{ id: number; location: 'pool' | 'group0' | 'group1' | 'group2' }[]>(
        Array.from({ length: TOTAL_CIRCLES }, (_, i) => ({ id: i, location: 'pool' as const }))
    );
    const [remainderAnswer, setRemainderAnswer] = useState('');
    const [pResult, setPResult] = useState<'correct' | 'incorrect' | null>(null);

    const getCirclesIn = (loc: string) => circles.filter(c => c.location === loc);

    const handleCircleDragStart = (e: React.DragEvent, id: number) => {
        e.dataTransfer.setData('text/plain', String(id));
    };

    const handleCircleDropOnGroup = (e: React.DragEvent, groupIndex: number) => {
        e.preventDefault();
        const id = parseInt(e.dataTransfer.getData('text/plain'));
        if (isNaN(id)) return;
        setCircles(prev => prev.map(c => c.id === id ? { ...c, location: `group${groupIndex}` as any } : c));
        setPResult(null);
    };

    const handleCircleDropOnPool = (e: React.DragEvent) => {
        e.preventDefault();
        const id = parseInt(e.dataTransfer.getData('text/plain'));
        if (isNaN(id)) return;
        setCircles(prev => prev.map(c => c.id === id ? { ...c, location: 'pool' } : c));
        setPResult(null);
    };

    const handlePListo = () => {
        const g0 = getCirclesIn('group0').length;
        const g1 = getCirclesIn('group1').length;
        const g2 = getCirclesIn('group2').length;
        const pool = getCirclesIn('pool').length;
        if (g0 === 5 && g1 === 5 && g2 === 5 && pool === 2 && remainderAnswer === '2') {
            setPResult('correct');
        } else {
            setPResult('incorrect');
        }
    };

    const handlePReset = () => {
        setCircles(Array.from({ length: TOTAL_CIRCLES }, (_, i) => ({ id: i, location: 'pool' as const })));
        setRemainderAnswer('');
        setPResult(null);
    };

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'División Inexacta' }} pageId="division-inexacta-concepto-concreto">
            {/* ============ C - CONCRETO ============ */}
            <div className="relative ml-2 flex items-start mb-8">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center" style={{ backgroundColor: '#80e8bb' }}>
                    C
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-5 bg-white" style={{ borderColor: '#80e8bb' }}>

                    <div className="mt-4">
                        <div style={{ display: 'flex', gap: '16px', minHeight: '480px' }}>

                            {/* ===== LEFT COLUMN ===== */}
                            <div style={{ width: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                {/* Play button — top left */}
                                <div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            currentTrackingRef.current = VIDEO_TRACKING.C_INTRO;
                                            setVideoModal({ isOpen: true, title: 'División Inexacta - Concreto', videoId: undefined });
                                        }}
                                        className={`w-16 h-16 flex items-center justify-center text-white rounded-full transition-all ${isVideoWatched(VIDEO_TRACKING.C_INTRO)
                                            ? 'bg-green-600 hover:bg-green-700'
                                            : 'bg-purple-600 hover:bg-purple-700'
                                            }`}
                                    >
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                                    </button>
                                </div>

                                {/* Speech bubble "¿2?" */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <div style={{
                                        background: '#f3f4f6', border: '2px solid #d1d5db', borderRadius: '12px',
                                        padding: '4px 12px', fontSize: '18px', fontWeight: 'bold', color: '#374151',
                                        position: 'relative'
                                    }}>
                                        ¿2?
                                        <div style={{
                                            position: 'absolute', bottom: '-6px', left: '20px',
                                            width: '10px', height: '10px', background: '#f3f4f6',
                                            border: '2px solid #d1d5db', borderTop: 'none', borderLeft: 'none',
                                            transform: 'rotate(45deg)'
                                        }} />
                                    </div>
                                </div>

                                {/* Coach + Medal box — bottom left, side by side */}
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
                                    <img src="/entrenador.png" alt="Entrenador" style={{ width: '160px', height: 'auto' }} draggable={false} />
                                    <div
                                        onDragOver={handleDragOver}
                                        onDrop={handleMedalDropOnBoxC}
                                        style={{ position: 'relative', width: '160px', flexShrink: 0 }}
                                    >
                                        <img src="/cajamedalla.png" alt="Caja de medallas" style={{ width: '100%', height: 'auto' }} draggable={false} />
                                        <div style={{
                                            position: 'absolute', inset: 0,
                                            display: 'flex', flexWrap: 'wrap',
                                            alignItems: 'flex-end', justifyContent: 'center',
                                            gap: '2px', padding: '30px 8px 10px 8px'
                                        }}>
                                            {getMedalsInBoxC().map(medal => (
                                                <img
                                                    key={medal.id}
                                                    src="/medalla.png"
                                                    alt="Medalla"
                                                    draggable
                                                    onDragStart={(e) => handleMedalDragStartC(e, medal.id)}
                                                    style={{ width: '20px', height: '20px', cursor: 'grab' }}
                                                    className="hover:scale-125 transition-transform select-none"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ===== RIGHT COLUMN ===== */}
                            <div style={{ width: '55%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>

                                {/* Row 1: Drop zone 1 + Team 1 */}
                                {(() => {
                                    const teamMedals = getMedalsInTeamC(1);
                                    return (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div
                                                onDragOver={handleDragOver}
                                                onDrop={(e) => handleMedalDropOnTeamC(e, 1)}
                                                style={{
                                                    width: '45%', minHeight: '70px', border: '2px solid', borderRadius: '8px', padding: '6px', display: 'flex', flexWrap: 'wrap', gap: '3px', alignItems: 'center', justifyContent: 'center',
                                                    borderColor: medalResultC === 'correct' && teamMedals.length === 5 ? '#4ade80' : medalResultC === 'incorrect' ? '#f87171' : '#d1d5db',
                                                    backgroundColor: medalResultC === 'correct' && teamMedals.length === 5 ? '#f0fdf4' : medalResultC === 'incorrect' ? '#fef2f2' : '#fff'
                                                }}
                                            >
                                                {teamMedals.length > 0 ? teamMedals.map(medal => (
                                                    <img key={medal.id} src="/medalla.png" alt="Medalla" draggable
                                                        onDragStart={(e) => handleMedalDragStartC(e, medal.id)}
                                                        style={{ width: '24px', height: '24px', cursor: 'grab' }}
                                                        className="hover:scale-110 transition-transform select-none" />
                                                )) : <p className="text-xs text-gray-400 italic">Arrastra aquí</p>}
                                            </div>
                                            <img src="/medalla1.png" alt="Atletismo"
                                                style={{ width: '55%', height: 'auto', maxHeight: '120px', objectFit: 'contain' }} draggable={false} />
                                        </div>
                                    );
                                })()}

                                {/* Row 2: Drop zone 2 + Team 2 */}
                                {(() => {
                                    const teamMedals = getMedalsInTeamC(2);
                                    return (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div
                                                onDragOver={handleDragOver}
                                                onDrop={(e) => handleMedalDropOnTeamC(e, 2)}
                                                style={{
                                                    width: '45%', minHeight: '70px', border: '2px solid', borderRadius: '8px', padding: '6px', display: 'flex', flexWrap: 'wrap', gap: '3px', alignItems: 'center', justifyContent: 'center',
                                                    borderColor: medalResultC === 'correct' && teamMedals.length === 5 ? '#4ade80' : medalResultC === 'incorrect' ? '#f87171' : '#d1d5db',
                                                    backgroundColor: medalResultC === 'correct' && teamMedals.length === 5 ? '#f0fdf4' : medalResultC === 'incorrect' ? '#fef2f2' : '#fff'
                                                }}
                                            >
                                                {teamMedals.length > 0 ? teamMedals.map(medal => (
                                                    <img key={medal.id} src="/medalla.png" alt="Medalla" draggable
                                                        onDragStart={(e) => handleMedalDragStartC(e, medal.id)}
                                                        style={{ width: '24px', height: '24px', cursor: 'grab' }}
                                                        className="hover:scale-110 transition-transform select-none" />
                                                )) : <p className="text-xs text-gray-400 italic">Arrastra aquí</p>}
                                            </div>
                                            <img src="/medalla2.png" alt="Baloncesto"
                                                style={{ width: '55%', height: 'auto', maxHeight: '120px', objectFit: 'contain' }} draggable={false} />
                                        </div>
                                    );
                                })()}

                                {/* Row 3: Drop zone 3 + Team 3 */}
                                {(() => {
                                    const teamMedals = getMedalsInTeamC(3);
                                    return (
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div
                                                onDragOver={handleDragOver}
                                                onDrop={(e) => handleMedalDropOnTeamC(e, 3)}
                                                style={{
                                                    width: '45%', minHeight: '70px', border: '2px solid', borderRadius: '8px', padding: '6px', display: 'flex', flexWrap: 'wrap', gap: '3px', alignItems: 'center', justifyContent: 'center',
                                                    borderColor: medalResultC === 'correct' && teamMedals.length === 5 ? '#4ade80' : medalResultC === 'incorrect' ? '#f87171' : '#d1d5db',
                                                    backgroundColor: medalResultC === 'correct' && teamMedals.length === 5 ? '#f0fdf4' : medalResultC === 'incorrect' ? '#fef2f2' : '#fff'
                                                }}
                                            >
                                                {teamMedals.length > 0 ? teamMedals.map(medal => (
                                                    <img key={medal.id} src="/medalla.png" alt="Medalla" draggable
                                                        onDragStart={(e) => handleMedalDragStartC(e, medal.id)}
                                                        style={{ width: '24px', height: '24px', cursor: 'grab' }}
                                                        className="hover:scale-110 transition-transform select-none" />
                                                )) : <p className="text-xs text-gray-400 italic">Arrastra aquí</p>}
                                            </div>
                                            <img src="/medalla3.png" alt="Tenis"
                                                style={{ width: '55%', height: 'auto', maxHeight: '120px', objectFit: 'contain' }} draggable={false} />
                                        </div>
                                    );
                                })()}

                                {/* ¿LISTO? + Reset */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                    <button onClick={handleMedalListoC}
                                        className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-black rounded text-sm tracking-wide">
                                        ¿LISTO?
                                    </button>
                                    <button onClick={handleMedalResetC}
                                        className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
                                        🔄 Reiniciar
                                    </button>
                                </div>

                                {medalResultC === 'correct' && (
                                    <p className="text-center text-green-600 font-bold text-sm">✅ ¡CORRECTO! Cada equipo tiene 5 medallas y sobran 2. 17 ÷ 3 = 5, residuo 2</p>
                                )}
                                {medalResultC === 'incorrect' && (
                                    <p className="text-center text-red-500 font-bold text-sm">❌ INCORRECTO — Reparte las medallas en partes iguales, las que sobren déjalas en la caja.</p>
                                )}
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
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-5 bg-white" style={{ borderColor: '#60a5fa' }}>

                    <div className="mt-4 space-y-4">
                        <div className="flex items-start gap-2 flex-wrap">
                            <p className="text-base text-gray-800 dark:text-gray-200 leading-relaxed">
                                Arrastra las <span className="font-bold text-lg text-purple-700">17</span> medallas y repártelos en 3 partes iguales. Verifica que sí sobre medallas.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    currentTrackingRef.current = VIDEO_TRACKING.P_EXPLAIN;
                                    setVideoModal({ isOpen: true, title: 'División Inexacta - Proceso', videoId: undefined });
                                }}
                                className={`w-10 h-10 flex items-center justify-center text-white rounded-full transition-all flex-shrink-0 ${isVideoWatched(VIDEO_TRACKING.P_EXPLAIN)
                                    ? 'bg-green-600 hover:bg-green-700'
                                    : 'bg-purple-600 hover:bg-purple-700'
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            </button>
                        </div>

                        {/* Two-column: circle pool (left) + group boxes (right) */}
                        <div style={{ display: 'flex', gap: '20px' }}>
                            {/* Pool of circles */}
                            <div
                                onDragOver={handleDragOver}
                                onDrop={handleCircleDropOnPool}
                                style={{
                                    width: '50%', border: '2px solid #d1d5db', borderRadius: '12px',
                                    padding: '12px', minHeight: '200px',
                                    display: 'flex', flexWrap: 'wrap', gap: '6px',
                                    alignContent: 'flex-start', justifyContent: 'center'
                                }}
                            >
                                {getCirclesIn('pool').map(c => (
                                    <div
                                        key={c.id}
                                        draggable
                                        onDragStart={(e) => handleCircleDragStart(e, c.id)}
                                        style={{
                                            width: '32px', height: '32px', borderRadius: '50%',
                                            backgroundColor: '#facc15', cursor: 'grab',
                                            border: '2px solid #eab308'
                                        }}
                                        className="hover:scale-110 transition-transform select-none"
                                    />
                                ))}
                            </div>

                            {/* Group boxes with counters */}
                            <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {[0, 1, 2].map(gi => {
                                    const groupCircles = getCirclesIn(`group${gi}`);
                                    return (
                                        <div key={gi} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div
                                                onDragOver={handleDragOver}
                                                onDrop={(e) => handleCircleDropOnGroup(e, gi)}
                                                style={{
                                                    flex: 1, minHeight: '60px', border: '2px solid #c084fc',
                                                    borderRadius: '8px', padding: '6px',
                                                    display: 'flex', flexWrap: 'wrap', gap: '4px',
                                                    alignItems: 'center', justifyContent: 'center',
                                                    backgroundColor: pResult === 'correct' && groupCircles.length === 5 ? '#f0fdf4' : '#fff'
                                                }}
                                            >
                                                {groupCircles.length > 0 ? groupCircles.map(c => (
                                                    <div
                                                        key={c.id}
                                                        draggable
                                                        onDragStart={(e) => handleCircleDragStart(e, c.id)}
                                                        style={{
                                                            width: '28px', height: '28px', borderRadius: '50%',
                                                            backgroundColor: '#facc15', cursor: 'grab',
                                                            border: '2px solid #eab308'
                                                        }}
                                                        className="hover:scale-110 transition-transform select-none"
                                                    />
                                                )) : <p className="text-xs text-gray-400 italic">Arrastra aquí</p>}
                                            </div>
                                            <span className="text-lg font-bold text-red-500 min-w-[30px] text-center">
                                                {groupCircles.length}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Pool count */}
                        <p className="text-center text-3xl font-black text-purple-700">{getCirclesIn('pool').length + getCirclesIn('group0').length + getCirclesIn('group1').length + getCirclesIn('group2').length}</p>

                        {/* Remainder question + ¿LISTO? */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">¿Cuánto resto hay?</span>
                            <input
                                type="number"
                                value={remainderAnswer}
                                onChange={(e) => { setRemainderAnswer(e.target.value); setPResult(null); }}
                                className={`w-14 h-8 text-center font-bold rounded border-2 text-sm ${pResult === 'correct' ? 'border-green-500 bg-green-100 text-green-700' :
                                    pResult === 'incorrect' ? 'border-red-500 bg-red-100 text-red-700' :
                                        'border-red-400 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                                    }`}
                                placeholder="0"
                            />
                            <button onClick={handlePListo}
                                className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-black rounded text-sm">
                                ¿LISTO?
                            </button>
                        </div>

                        {pResult === 'correct' && (
                            <p className="text-center text-green-600 font-bold">✅ ¡Correcto! 17 ÷ 3 = 5, resto 2</p>
                        )}
                        {pResult === 'incorrect' && (
                            <p className="text-center text-red-500 font-bold text-sm">
                                ❌ Reparte 17 en grupos iguales de a 5, quedan 2 sobrando. Resto = 2
                            </p>
                        )}
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
