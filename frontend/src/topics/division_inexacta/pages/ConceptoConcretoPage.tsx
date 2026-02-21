'use client';

import React, { useState } from 'react';
import { PlayVideoButton } from '@/components/PlayVideoButton';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';


/**
 * División Inexacta
 * C section: 17 medals to divide by 3
 * P section: 17 circles to divide by 3
 */

interface Medal {
    id: number;
    inTeam: number | null;
}

interface Circle {
    id: number;
    inGroup: number | null;
}

interface Props { zoom?: number; }

export function ConceptoConcretoPage({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        C_INTRO: 'div-inexacta-c-intro',
        P_INTRO: 'div-inexacta-p-intro',
    };

    /* videoModal list removed */
    /* ref removed */

    /* handleVideoComplete removed */

    // ==================== C SECTION: Medals ====================
    // En división inexacta: 17 medallas, 3 equipos. Cada uno 5. Sobran 2.
    const totalMedals = 17;
    const [medals, setMedals] = useState<Medal[]>(
        Array.from({ length: totalMedals }, (_, i) => ({ id: i, inTeam: null }))
    );
    const [draggedMedal, setDraggedMedal] = useState<number | null>(null);
    const [medalResult, setMedalResult] = useState<'correct' | 'incorrect' | null>(null);

    const getMedalsInBox = () => medals.filter(m => m.inTeam === null);
    const getMedalsInTeam = (teamId: number) => medals.filter(m => m.inTeam === teamId);

    const handleMedalDragStart = (e: React.DragEvent, medalId: number) => {
        setDraggedMedal(medalId);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleMedalDropOnTeam = (e: React.DragEvent, teamId: number) => {
        e.preventDefault();
        if (draggedMedal === null) return;
        setMedals(prev => prev.map(m => (m.id === draggedMedal ? { ...m, inTeam: teamId } : m)));
        setDraggedMedal(null);
        setMedalResult(null);
    };

    const handleMedalDropOnBox = (e: React.DragEvent) => {
        e.preventDefault();
        if (draggedMedal === null) return;
        setMedals(prev => prev.map(m => (m.id === draggedMedal ? { ...m, inTeam: null } : m)));
        setDraggedMedal(null);
        setMedalResult(null);
    };

    const handleMedalListo = () => {
        const t1 = getMedalsInTeam(1).length;
        const t2 = getMedalsInTeam(2).length;
        const t3 = getMedalsInTeam(3).length;
        const inBox = getMedalsInBox().length;
        // 17 / 3 = 5, resto 2.
        if (t1 === 5 && t2 === 5 && t3 === 5 && inBox === 2) {
            setMedalResult('correct');
        } else {
            setMedalResult('incorrect');
        }
    };

    const handleMedalReset = () => {
        setMedals(Array.from({ length: totalMedals }, (_, i) => ({ id: i, inTeam: null })));
        setMedalResult(null);
    };


    // ==================== P SECTION: Yellow Circles ====================
    const totalCircles = 17;
    const [circles, setCircles] = useState<Circle[]>(
        Array.from({ length: totalCircles }, (_, i) => ({ id: i, inGroup: null }))
    );
    const [draggedCircle, setDraggedCircle] = useState<number | null>(null);
    const [circleResult, setCircleResult] = useState<'correct' | 'incorrect' | null>(null);

    const getCirclesInPool = () => circles.filter(c => c.inGroup === null);
    const getCirclesInGroup = (groupId: number) => circles.filter(c => c.inGroup === groupId);

    const handleCircleDragStart = (e: React.DragEvent, circleId: number) => {
        setDraggedCircle(circleId);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleCircleDropOnGroup = (e: React.DragEvent, groupId: number) => {
        e.preventDefault();
        if (draggedCircle === null) return;
        setCircles(prev => prev.map(c => (c.id === draggedCircle ? { ...c, inGroup: groupId } : c)));
        setDraggedCircle(null);
        setCircleResult(null);
    };

    const handleCircleDropOnPool = (e: React.DragEvent) => {
        e.preventDefault();
        if (draggedCircle === null) return;
        setCircles(prev => prev.map(c => (c.id === draggedCircle ? { ...c, inGroup: null } : c)));
        setDraggedCircle(null);
        setCircleResult(null);
    };

    const handleCircleListo = () => {
        const g1 = getCirclesInGroup(1).length;
        const g2 = getCirclesInGroup(2).length;
        const g3 = getCirclesInGroup(3).length;
        const pool = getCirclesInPool().length;
        // 17 / 3 = 5, resto 2.
        if (g1 === 5 && g2 === 5 && g3 === 5 && pool === 2) {
            setCircleResult('correct');
        } else {
            setCircleResult('incorrect');
        }
    };

    const handleCircleReset = () => {
        setCircles(Array.from({ length: totalCircles }, (_, i) => ({ id: i, inGroup: null })));
        setCircleResult(null);
    };


    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'División Inexacta' }} pageId="div-inexacta-concepto-concreto">
            <div className="w-full space-y-6">

                {/* ============ C - CONCRETO ============ */}
                <div className="relative ml-2 flex items-start">
                    <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#80e8bb] dark:bg-green-900" style={{ borderColor: '#80e8bb' }}>
                        C
                    </div>
                    <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-5 bg-white dark:bg-gray-800 border-[#80e8bb] dark:border-green-900">

                        <div className="mt-4">
                            <div style={{ display: 'flex', gap: '16px', minHeight: '480px' }}>

                                {/* ===== LEFT COLUMN ===== */}
                                <div style={{ width: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                    {/* Play button — top left */}
                                    <div>
                                        <PlayVideoButton
                                            trackingId={VIDEO_TRACKING.C_INTRO}
                                            title=""
                                            videoId="/pag11/vv-1"
                                        />
                                    </div>

                                    {/* Coach + Medal box — bottom left, side by side */}
                                    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
                                        {/* Coach */}
                                        <img
                                            src="/entrenador.png"
                                            alt="Entrenador"
                                            style={{ width: '160px', height: 'auto' }}
                                            draggable={false}
                                        />
                                        {/* Medal box with medals inside */}
                                        <div
                                            onDragOver={handleDragOver}
                                            onDrop={handleMedalDropOnBox}
                                            style={{ position: 'relative', width: '160px', flexShrink: 0 }}
                                        >
                                            <img src="/cajamedalla.png" alt="Caja de medallas" style={{ width: '100%', height: 'auto' }} draggable={false} />
                                            {/* Medals overlaid inside the box */}
                                            <div style={{
                                                position: 'absolute', inset: 0,
                                                display: 'flex', flexWrap: 'wrap',
                                                alignItems: 'flex-end', justifyContent: 'center',
                                                alignContent: 'flex-end',
                                                padding: '50px 35px 40px 35px',
                                                overflow: 'hidden'
                                            }}>
                                                {getMedalsInBox().map(medal => (
                                                    <img
                                                        key={medal.id}
                                                        src="/medalla.png"
                                                        alt="Medalla"
                                                        draggable
                                                        onDragStart={(e) => handleMedalDragStart(e, medal.id)}
                                                        style={{ width: '22px', height: '22px', cursor: 'grab', margin: '-5px' }}
                                                        className="hover:scale-125 transition-transform select-none"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ===== RIGHT COLUMN ===== */}
                                <div style={{ width: '55%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>

                                    {/* Row 1: Drop zone 1 + Team 1 (Atletismo) */}
                                    {(() => {
                                        const teamMedals = getMedalsInTeam(1);
                                        return (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div
                                                    onDragOver={handleDragOver}
                                                    onDrop={(e) => handleMedalDropOnTeam(e, 1)}
                                                    style={{
                                                        width: '45%', minHeight: '70px', border: '2px solid', borderRadius: '8px', padding: '6px', display: 'flex', flexWrap: 'wrap', gap: '3px', alignItems: 'center', justifyContent: 'center'
                                                    }}
                                                    className={`transition-colors ${medalResult === 'correct' && teamMedals.length === 5 ? 'border-green-400 bg-green-50 dark:bg-green-900/20' : medalResult === 'incorrect' ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'}`}
                                                >
                                                    {teamMedals.length > 0 ? teamMedals.map(medal => (
                                                        <img key={medal.id} src="/medalla.png" alt="Medalla" draggable
                                                            onDragStart={(e) => handleMedalDragStart(e, medal.id)}
                                                            style={{ width: '24px', height: '24px', cursor: 'grab' }}
                                                            className="hover:scale-110 transition-transform select-none" />
                                                    )) : <p className="text-xs text-gray-400 dark:text-gray-500 italic">Arrastra aquí</p>}
                                                </div>
                                                <img src="/medalla1.png" alt="Atletismo"
                                                    style={{ width: '55%', height: 'auto', maxHeight: '120px', objectFit: 'contain' }} draggable={false} />
                                            </div>
                                        );
                                    })()}

                                    {/* Row 2: Drop zone 2 + Team 2 (Baloncesto) */}
                                    {(() => {
                                        const teamMedals = getMedalsInTeam(2);
                                        return (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div
                                                    onDragOver={handleDragOver}
                                                    onDrop={(e) => handleMedalDropOnTeam(e, 2)}
                                                    style={{
                                                        width: '45%', minHeight: '70px', border: '2px solid', borderRadius: '8px', padding: '6px', display: 'flex', flexWrap: 'wrap', gap: '3px', alignItems: 'center', justifyContent: 'center'
                                                    }}
                                                    className={`transition-colors ${medalResult === 'correct' && teamMedals.length === 5 ? 'border-green-400 bg-green-50 dark:bg-green-900/20' : medalResult === 'incorrect' ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'}`}
                                                >
                                                    {teamMedals.length > 0 ? teamMedals.map(medal => (
                                                        <img key={medal.id} src="/medalla.png" alt="Medalla" draggable
                                                            onDragStart={(e) => handleMedalDragStart(e, medal.id)}
                                                            style={{ width: '24px', height: '24px', cursor: 'grab' }}
                                                            className="hover:scale-110 transition-transform select-none" />
                                                    )) : <p className="text-xs text-gray-400 dark:text-gray-500 italic">Arrastra aquí</p>}
                                                </div>
                                                <img src="/medalla2.png" alt="Baloncesto"
                                                    style={{ width: '55%', height: 'auto', maxHeight: '120px', objectFit: 'contain' }} draggable={false} />
                                            </div>
                                        );
                                    })()}

                                    {/* Row 3: Drop zone 3 + Team 3 (Tenis) */}
                                    {(() => {
                                        const teamMedals = getMedalsInTeam(3);
                                        return (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                <div
                                                    onDragOver={handleDragOver}
                                                    onDrop={(e) => handleMedalDropOnTeam(e, 3)}
                                                    style={{
                                                        width: '45%', minHeight: '70px', border: '2px solid', borderRadius: '8px', padding: '6px', display: 'flex', flexWrap: 'wrap', gap: '3px', alignItems: 'center', justifyContent: 'center'
                                                    }}
                                                    className={`transition-colors ${medalResult === 'correct' && teamMedals.length === 5 ? 'border-green-400 bg-green-50 dark:bg-green-900/20' : medalResult === 'incorrect' ? 'border-red-400 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'}`}
                                                >
                                                    {teamMedals.length > 0 ? teamMedals.map(medal => (
                                                        <img key={medal.id} src="/medalla.png" alt="Medalla" draggable
                                                            onDragStart={(e) => handleMedalDragStart(e, medal.id)}
                                                            style={{ width: '24px', height: '24px', cursor: 'grab' }}
                                                            className="hover:scale-110 transition-transform select-none" />
                                                    )) : <p className="text-xs text-gray-400 dark:text-gray-500 italic">Arrastra aquí</p>}
                                                </div>
                                                <img src="/medalla3.png" alt="Tenis"
                                                    style={{ width: '55%', height: 'auto', maxHeight: '120px', objectFit: 'contain' }} draggable={false} />
                                            </div>
                                        );
                                    })()}

                                    {/* ¿LISTO? button — bottom of right column */}
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                        <FeedbackButton
                                            onCheck={handleMedalListo}
                                            onReset={handleMedalReset}
                                            status={medalResult}
                                        />
                                    </div>
                                </div>
                            </div>

                            {medalResult === 'correct' && (
                                <p className="text-center text-green-600 dark:text-green-400 font-bold mt-3">✅ ¡Correcto! Cada equipo tiene 5 medallas y sobran 2. 17 ÷ 3 = 5, residuo 2</p>
                            )}
                            {medalResult === 'incorrect' && (
                                <p className="text-center text-red-500 dark:text-red-400 font-bold text-sm mt-3">❌ Repártelas en partes iguales y deja las que sobren en la caja.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* ============ P - PROCESUAL ============ */}
                <div className="relative ml-2 flex items-start">
                    <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#8ec2e8] dark:bg-blue-900" style={{ borderColor: '#8ec2e8' }}>
                        P
                    </div>
                    <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-4 bg-white dark:bg-gray-800 border-[#8ec2e8] dark:border-blue-900">

                        <div className="mt-4">
                            <div className="flex items-start gap-2 mb-4">
                                <div className="flex-1">
                                    <p className="text-base text-gray-800 dark:text-gray-200">
                                        Arrastra los <span className="text-2xl font-bold text-yellow-500">{totalCircles}</span> circulos y repártelos en 3 partes iguales. Verifica cuántos sobran.
                                    </p>
                                </div>
                                <PlayVideoButton
                                    trackingId={VIDEO_TRACKING.P_INTRO}
                                    title=""
                                    videoId="/pag11/vv-2"
                                />
                            </div>

                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Circle pool */}
                                <div className="flex flex-col items-center">
                                    <div
                                        onDragOver={handleDragOver}
                                        onDrop={handleCircleDropOnPool}
                                        className="w-64 min-h-[140px] border-2 border-gray-400 dark:border-gray-600 rounded-lg p-3 bg-white dark:bg-gray-800/50"
                                    >
                                        <div className="grid grid-cols-6 gap-1 justify-items-center">
                                            {getCirclesInPool().map(circle => (
                                                <div
                                                    key={circle.id}
                                                    draggable
                                                    onDragStart={(e) => handleCircleDragStart(e, circle.id)}
                                                    className="w-8 h-8 rounded-full bg-yellow-400 border-2 border-yellow-500 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform select-none shadow-sm"
                                                />
                                            ))}
                                        </div>
                                        {getCirclesInPool().length === 0 && (
                                            <p className="text-center text-xs text-gray-400 dark:text-gray-500 italic mt-2">Arrastra aquí para devolver</p>
                                        )}
                                    </div>
                                    <p className="text-4xl font-bold text-yellow-500 mt-2">{getCirclesInPool().length}</p>

                                    <div className="flex items-center gap-3 mt-3">
                                        <FeedbackButton
                                            onCheck={handleCircleListo}
                                            onReset={handleCircleReset}
                                            status={circleResult}
                                        />
                                    </div>
                                </div>

                                {/* 3 group boxes */}
                                <div className="flex flex-col gap-4 flex-1">
                                    {[1, 2, 3].map(groupId => {
                                        const groupCircles = getCirclesInGroup(groupId);
                                        return (
                                            <div key={groupId} className="flex items-center gap-3">
                                                <div
                                                    onDragOver={handleDragOver}
                                                    onDrop={(e) => handleCircleDropOnGroup(e, groupId)}
                                                    className={`flex-1 min-h-[60px] border-2 rounded-lg p-2 flex flex-wrap gap-1 items-center justify-center ${circleResult === 'correct' && groupCircles.length === 5
                                                        ? 'border-green-400 bg-green-50 dark:bg-green-900/10'
                                                        : 'border-purple-300 dark:border-purple-700 bg-white dark:bg-gray-800/50'
                                                        }`}
                                                >
                                                    {groupCircles.length > 0 ? (
                                                        groupCircles.map(circle => (
                                                            <div key={circle.id} draggable onDragStart={(e) => handleCircleDragStart(e, circle.id)}
                                                                className="w-7 h-7 rounded-full bg-yellow-400 border-2 border-yellow-500 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform select-none shadow-sm" />
                                                        ))
                                                    ) : (
                                                        <p className="text-xs text-gray-400 dark:text-gray-500 italic">Arrastra aquí</p>
                                                    )}
                                                </div>
                                                <div className="w-10 h-10 border-2 border-purple-400 dark:border-purple-600 rounded flex items-center justify-center font-bold text-lg text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800">
                                                    {groupCircles.length}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* VideoModal removed */}
        </BookPageContainer>
    );
}
