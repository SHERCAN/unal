'use client';

import React from 'react';
import { BookPageContainer } from '../BookPageContainer';

interface CoverPageProps {
    zoom?: number;
}

export const CoverPage = ({ zoom = 1 }: CoverPageProps) => {
    return (
        <BookPageContainer className="!p-0 overflow-hidden" zoom={zoom} pageId="shared-pag0-cover" showRating={false}>
            <div className="relative w-full min-h-[297mm] flex flex-col">
                {/* Purple left bar */}
                <div className="absolute left-0 top-0 bottom-0 w-[38px] z-10" style={{ background: 'linear-gradient(180deg, #7c3aed 0%, #6b21a8 100%)' }} />

                {/* Background math elements (Images from temas/portada) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.15]">
                    <img src="/temas/portada/division.bmp" className="absolute w-[180px] object-contain opacity-70" style={{ top: '10%', right: '10%', transform: 'rotate(15deg)' }} />
                    <img src="/temas/portada/fraccion.bmp" className="absolute w-[200px] object-contain opacity-70" style={{ top: '25%', left: '15%', transform: 'rotate(-10deg)' }} />
                    <img src="/temas/portada/ecuacion.bmp" className="absolute w-[220px] object-contain opacity-70" style={{ bottom: '25%', right: '15%', transform: 'rotate(-5deg)' }} />
                    <img src="/temas/portada/mayor.bmp" className="absolute w-[160px] object-contain opacity-70" style={{ top: '55%', left: '10%', transform: 'rotate(12deg)' }} />
                    <img src="/temas/portada/pastel.bmp" className="absolute w-[190px] object-contain opacity-70" style={{ bottom: '15%', left: '30%', transform: 'rotate(-8deg)' }} />
                    <img src="/temas/portada/pensante.bmp" className="absolute w-[170px] object-contain opacity-70" style={{ top: '40%', right: '35%', transform: 'rotate(8deg)' }} />
                </div>

                {/* Content area */}
                <div className="relative z-20 flex flex-col flex-1 pl-10 pr-12 pt-8 pb-8">
                    {/* Icons row: LSC, CC, Hand */}
                    <div className="flex items-center mb-6 self-start border-4 border-purple-700 rounded-lg p-2">
                        <img
                            src="/lsccctouch.png"
                            alt="Iconos de accesibilidad: LSC, CC y Touch"
                            className="h-24 object-contain"
                            draggable={false}
                        />
                    </div>

                    {/* Main title area - centered */}
                    <div className="flex-1 flex flex-col items-center justify-center -mt-8">
                        <h1 className="text-7xl md:text-8xl font-black text-purple-700 tracking-wide mb-2 text-center" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                            MATEMÁTICAS
                        </h1>
                        {/* Purple underline */}
                        <div className="w-full max-w-[600px] h-2 rounded-full mb-4" style={{ background: 'linear-gradient(90deg, #7c3aed, #a855f7)' }} />
                        <p className="text-3xl md:text-4xl text-gray-800 dark:text-gray-200 italic text-center" style={{ fontFamily: 'Georgia, serif' }}>
                            Que se ven y se entienden
                        </p>
                    </div>

                    {/* Decorative math illustration area */}
                    <div className="flex justify-center items-end mb-8 relative">
                        <div className="relative w-full max-w-[500px] h-[280px]">
                        </div>
                    </div>

                    {/* Footer - University logo */}
                    <div className="flex justify-end items-center gap-3 mt-auto pt-4">
                        <img
                            src="https://cdiac.manizales.unal.edu.co/imagenes/LogosMini/un.png"
                            alt="Universidad Nacional de Colombia"
                            className="h-16 object-contain"
                            draggable={false}
                        />
                    </div>
                </div>
            </div>
        </BookPageContainer>
    );
};
