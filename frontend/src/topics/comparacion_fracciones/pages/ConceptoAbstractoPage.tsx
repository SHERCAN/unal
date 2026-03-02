'use client';
import { PlayVideoButton } from '@/components/PlayVideoButton';
import React from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface Props { zoom?: number; }
//PAGINA 2 ABSTRACTO
export function ConceptoAbstractoPage({ zoom = 1 }: Props) {
    const VIDEO_TRACKING = {
        A_INTRO: 'comparacion_fracciones-pag1-v5',
        A_SAME_DEN: 'comparacion_fracciones-pag1-v6',
        A_STRATEGY: 'comparacion_fracciones-pag1-v8',
        A_DIFF_DEN: 'comparacion_fracciones-pag1-v7'
    };

    const STAGE_IDS = {
        A_STAGE: 'comparacion-fracciones-a-stage'
    };

    const { completeStage, watchedVideos, completedStages } = useVideoProgress();

    React.useEffect(() => {
        const A_REQUIRED = [
            VIDEO_TRACKING.A_INTRO,
            VIDEO_TRACKING.A_SAME_DEN,
            VIDEO_TRACKING.A_STRATEGY,
            VIDEO_TRACKING.A_DIFF_DEN
        ];
        const aDone = A_REQUIRED.every(id => watchedVideos.includes(id));
        if (aDone) completeStage(STAGE_IDS.A_STAGE);
    }, [watchedVideos]);

    const Fraction = ({ num, den, size = "text-3xl", numColor = "text-black" }: any) => (
        <div className={`inline-flex flex-col items-center align-middle ${size} font-black px-1`}>
            <span className={numColor}>{num}</span>
            <div className={`w-full h-0.5 bg-black my-0.5`} />
            <span className="text-black">{den}</span>
        </div>
    );

    const ExampleRow = ({ num1, den1, sign, num2, den2, reason }: any) => (
        <div className="flex items-center gap-4 text-xl font-bold">
            <div className="w-2 h-2 bg-green-600 rounded-sm flex-shrink-0" />
            <Fraction num={num1} den={den1} size="text-2xl" />
            <span className="text-2xl text-gray-400 font-light">{sign}</span>
            <Fraction num={num2} den={den2} size="text-2xl" />
            <span className="text-gray-600 ml-4">porque <span className="font-black text-black ml-2 px-2 py-1 bg-gray-100 rounded">{reason}</span>.</span>
        </div>
    );

    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Comparación de Fracciones' }} pageId="comp-frac-concepto-abstracto">
            <div className="space-y-10 pb-20">
                {/* A - ABSTRACTO Section */}
                <div className="relative ml-2 flex items-start mb-8">
                    <div className="text-white font-bold text-xl px-3 py-4 rounded-l-lg shadow-sm z-10 flex items-center bg-[#be90de]" style={{ borderColor: '#be90de' }}>
                        A {completedStages.includes(STAGE_IDS.A_STAGE) && <span className="ml-1 text-[#7c3aed]">✓</span>}
                    </div>
                    <div className="flex-1 relative border-2 rounded-r-lg -ml-0.5 rounded-tl-none p-5" style={{ borderColor: '#be90de' }}>
                        {/* --- STAGE A: ABSTRACTO --- */}
                        <div className="w-full h-full flex flex-col overflow-y-auto mt-2" style={{ gap: 'clamp(0.75rem, 2vh, 1.5rem)', padding: 'clamp(0.5rem, 2vmin, 1rem)' }}>
                            {/* Intro */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <p className="font-semibold text-gray-800 text-base">
                                        A continuación, la comparación de dos fracciones se expresa mediante notación matemática: <PlayVideoButton trackingId={VIDEO_TRACKING.A_INTRO} title="" videoId="/pag30/vv-1" />
                                    </p>

                                </div>
                                <div className="flex justify-center items-center gap-8" style={{ fontSize: 'clamp(2rem, 6vmin, 3rem)' }}>
                                    <Fraction num="1" den="3" size="text-2xl" numColor="text-[#6e5be0]" />
                                    <span className="text-purple-700 font-black">&lt;</span>
                                    <Fraction num="2" den="3" size="text-2xl" numColor="text-red-600" />
                                </div>
                                <div className="flex flex-wrap items-center gap-4 font-semibold text-base">
                                    <span>Se lee en español:</span>
                                    <Fraction num="2" den="3" size="text-xl" numColor="text-red-600" />
                                    <span className="text-gray-800">es mayor que</span>
                                    <Fraction num="1" den="3" size="text-xl" numColor="text-[#6e5be0]" />
                                    <span className="font-black">.</span>
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_INTRO} title="" videoId="/pag30/vv-2" />
                                </div>
                            </div>

                            {/* SAME DENOMINATOR */}
                            <div className="space-y-6 pt-4">
                                <h2 className="font-black text-gray-800 uppercase tracking-wide" style={{ fontSize: 'clamp(1.25rem, 3.5vmin, 1.75rem)' }}>
                                    DOS FRACCIONES CON EL MISMO DENOMINADOR
                                </h2>
                                <div className="flex items-center gap-4">
                                    <p className="text-gray-700 text-base font-semibold">
                                        Cuando dos fracciones tienen el mismo denominador, compararlas es más sencillo.
                                    </p>
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_SAME_DEN} title="" videoId="/pag30/vv-3" />
                                </div>
                                <div className="space-y-4 ml-6">
                                    <span className="bg-green-600 text-white font-black px-4 py-1 rounded text-sm mb-2 inline-block">Ejemplo:</span>
                                    <ExampleRow num1="12" den1="19" sign="<" num2="15" den2="19" reason="12 < 15" />
                                    <ExampleRow num1="26" den1="27" sign=">" num2="16" den2="27" reason="26 > 16" />
                                    <ExampleRow num1="8" den1="16" sign="=" num2="16" den2="32" reason="estas dos fracciones son equivalentes" />
                                </div>
                            </div>

                            {/* DIFFERENT DENOMINATOR */}
                            <div className="space-y-6 pt-4">
                                <h2 className="font-black text-gray-800 uppercase tracking-wide" style={{ fontSize: 'clamp(1.25rem, 3.5vmin, 1.75rem)' }}>
                                    DOS FRACCIONES CON DIFERENTE DENOMINADOR
                                </h2>
                                <div className="flex items-center gap-4">
                                    <p className="text-gray-700 leading-tight text-base font-semibold">
                                        Cuando dos fracciones tienen el diferente denominador, compararlas es poco difícil.
                                    </p>
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_DIFF_DEN} title="" videoId="/pag30/vv-4" />
                                </div>

                                <div className="flex items-start gap-4 ml-6">
                                    <PlayVideoButton trackingId={VIDEO_TRACKING.A_STRATEGY} title="" videoId="/pag30/vv-5" />
                                    <div>
                                        <h3 className="text-red-600 font-black text-lg uppercase mb-2">ESTRATEGIA:</h3>
                                        <ol className="list-decimal pl-5 text-gray-800 dark:text-gray-300 space-y-2 font-semibold leading-snug text-base">
                                            <li>Primero dos fracciones se amplifican para obtener fracciones equivalentes con el mismo denominador.</li>
                                            <li>Luego esas fracciones se comparan.</li>
                                        </ol>
                                    </div>
                                </div>

                                <div className="space-y-8 ml-6">
                                    <div className="flex items-center gap-4">
                                        <PlayVideoButton trackingId={VIDEO_TRACKING.A_STRATEGY} title="" videoId="/pag30/vv-6" />
                                        <span className="bg-green-600 text-white font-black px-4 py-1 rounded text-sm inline-block">Ejemplo:</span>
                                    </div>
                                    <div className="flex items-center gap-6 font-black ml-4" style={{ fontSize: 'clamp(1.5rem, 4vmin, 2rem)' }}>
                                        <div className="w-2 h-2 bg-green-600 rounded-sm" />
                                        <Fraction num="3" den="4" size="text-2xl" />
                                        <span className="text-gray-800">&gt;</span>
                                        <Fraction num="1" den="2" size="text-2xl" />
                                        <span className="text-gray-800 font-semibold ml-2 text-base">porque</span>
                                    </div>

                                    <div className="space-y-8 pl-4 md:pl-12">
                                        <div className="flex items-center flex-wrap gap-4 md:gap-12 font-semibold" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                                            <span>1. <div className="flex justify-center my-8 pl-32">
                                                <img src="/comparacion_fracciones/img1.png" alt="Ejemplo" className="h-14 object-containshadow-md" />
                                            </div></span>
                                        </div>
                                        <p className="text-gray-800 dark:text-gray-800 font-semibold text-base">tienen el mismo denominador.</p>

                                        <div className="flex items-center gap-12 font-semibold" style={{ fontSize: 'clamp(1rem, 2.5vmin, 1.25rem)' }}>
                                            <span>2.</span>
                                            <div className="flex items-center gap-2">
                                                <Fraction num="6" den="8" size="text-xl" />
                                                <span className="text-gray-800">&gt;</span>
                                                <Fraction num="4" den="8" size="text-xl" />
                                            </div>
                                            <span className="text-gray-800 dark:text-gray-200 font-semibold ml-4 text-base">
                                                porque <span className="ml-2 font-black text-2xl px-3 py-1 rounded text-black dark:text-white">6 &gt; 4 </span>.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BookPageContainer>
    );
}
