'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';

import React, { useState, useRef } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import Image from 'next/image';

// Assets
import pistas1Img from '../pistas1.png';
import pistas2Img from '../pistas2.png';

/**
 * Frame 176 — Fracciones Equivalentes
 * C section: Camila, Luis, Cancha, Equivalent movement
 * Assets: /fracciones_equivalentes/camila.png, luis.png, cancha.png
 */

interface Props { zoom?: number; }
//PAGINA 1 CONCRETO
export function ConceptoConcretoPage({ zoom = 1 }: Props) {
    const VIDEO_TRACKING = {
        C_TRACK: 'fracciones_equivalentes-pag23-v1',
    };

    const STAGE_IDS = {
        C_STAGE: 'fracciones-equivalentes-c-stage'
    };

    const { isVideoWatched, markVideoWatched, completeStage, watchedVideos, completedStages } = useVideoProgress();

    // Initial load and auto-checking
    React.useEffect(() => {
        const C_REQUIRED = [VIDEO_TRACKING.C_TRACK];

        const cDone = C_REQUIRED.every(id =>
            watchedVideos.includes(id)
        );
        if (cDone) completeStage(STAGE_IDS.C_STAGE);
    }, [watchedVideos]);

    /* videoModal list removed */
    /* ref removed */

    /* handleVideoComplete removed */

    /* openVideo removed */

    /* PlayButton definition removed */

    // Layout constants
    // No specific state needed for this layout as per user request

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones Equivalentes' }} pageId="frac-equiv-concepto-concreto">
            {/* C - CONCRETO Section */}
            <div className="relative ml-2 flex items-start">
                <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#4ade80] dark:bg-green-700">
                    C {completedStages.includes(STAGE_IDS.C_STAGE) && <span className="ml-1 text-[#059669]">✓</span>}
                </div>
                <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-6 bg-white" style={{ borderColor: '#4ade80' }}>

                    <div className="mt-8 flex flex-col items-center min-h-[600px]">
                        {/* Video in the center at the top */}
                        <div className="mb-12">
                            <PlayVideoButton trackingId={VIDEO_TRACKING.C_TRACK} title="" videoId="/pag23/vv-1" />
                        </div>

                        {/* Images aligned to the sides and bottom */}
                        <div className="w-full flex items-end justify-between mt-auto">
                            <div className="w-[45%]">
                                <Image
                                    src={pistas1Img}
                                    alt="Pistas 1"
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                            <div className="w-[45%]">
                                <Image
                                    src={pistas2Img}
                                    alt="Pistas 2"
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* VideoModal removed */}
        </BookPageContainer>
    );
}
