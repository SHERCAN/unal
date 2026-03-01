'use client';

import React from 'react';
import { BookPageContainer } from '../BookPageContainer';

interface ExplicacionPageProps {
    zoom?: number;
}

export const ExplicacionPage = ({ zoom = 1 }: ExplicacionPageProps) => {
    return (
        <BookPageContainer className="!p-0 overflow-hidden bg-white" zoom={zoom} pageId="shared-pag2-explicacion" showRating={false}>
            <div className="relative w-full h-[297mm] flex font-sans" style={{ fontFamily: "'Montserrat', sans-serif" }}>

                {/* Purple left bar (Continuous) */}
                <div className="w-[45px] h-full bg-[#7524cc] shrink-0" />

                {/* Main Content Area */}
                <div className="flex-1 relative">

                    {/* Top Purple Banner (Connects to left bar) */}
                    <div className="w-full bg-[#7524cc] mt-16 px-6 py-4 flex items-center">
                        <h1 className="text-white font-extrabold text-[28px] tracking-wide leading-tight">
                            GUIA MANUAL: PARTES DE APLICACIÓN Y<br />FUNCIONES
                        </h1>
                    </div>

                    {/* Content Body */}
                    <div className="relative w-full h-[calc(100%-150px)] flex gap-12 p-10 pt-16">

                        {/* ---------------- LEFT COLUMN ELEMENTS ---------------- */}
                        <div className="flex flex-col gap-8 w-[280px] shrink-0">

                            {/* 1. Keyboard Navigation */}
                            <div className="flex flex-col items-center relative mb-4">
                                {/* Top Bubble */}
                                <div className="bg-[#7524cc] text-white text-[10px] font-bold px-4 py-1.5 rounded-2xl text-center mb-1 relative">
                                    TECLA PARA IR A LA<br />PÁGINA ANTERIOR
                                    {/* Pointer line */}
                                    <div className="absolute left-1/2 bottom-[-20px] w-[2px] h-[25px] bg-[#7524cc] origin-bottom -rotate-[15deg]"></div>
                                </div>

                                {/* Keyboard Mockup Image/Graphic */}
                                <div className="relative w-[130px] h-[65px] bg-[#333] border-4 border-[#7524cc] flex flex-col justify-center items-center gap-[2px] rounded-sm shadow-md mt-6">
                                    <div className="flex gap-[2px]">
                                        <div className="w-8 h-6 bg-[#444] rounded-[2px] flex items-center justify-center text-[8px] text-white">Shift</div>
                                        <div className="w-8 h-6 bg-[#7524cc] rounded-[2px] flex items-center justify-center text-white text-xs">▲</div>
                                        <div className="w-8 h-6 bg-[#444] rounded-[2px] flex items-center justify-center text-[8px] text-white">1</div>
                                    </div>
                                    <div className="flex gap-[2px]">
                                        <div className="w-8 h-6 bg-[#444] rounded-[2px] flex items-center justify-center text-white text-xs">◄</div>
                                        <div className="w-8 h-6 bg-[#d9bd2b] rounded-[2px] flex items-center justify-center text-white text-xs">▼</div>
                                        <div className="w-8 h-6 bg-[#444] rounded-[2px] flex items-center justify-center text-white text-xs">►</div>
                                    </div>
                                </div>

                                {/* Bottom Bubble */}
                                <div className="bg-[#7524cc] text-white text-[10px] font-bold px-4 py-1.5 rounded-2xl text-center mt-6 relative">
                                    {/* Pointer line */}
                                    <div className="absolute left-1/2 top-[-20px] w-[2px] h-[25px] bg-[#7524cc] origin-top -rotate-[15deg] translate-x-[-10px]"></div>
                                    TECLA PARA IR A LA<br />PÁGINA SIGUIENTE
                                </div>

                                {/* Question mark bubble */}
                                <div className="absolute top-[35px] -right-[20px] w-6 h-6 bg-[#7524cc] text-white rounded-full flex items-center justify-center text-sm font-bold shadow-md">?</div>
                            </div>

                            {/* 2. Estructura de las paginas */}
                            <div className="w-full border-[2px] border-[#7524cc] rounded flex flex-col relative">
                                <div className="flex justify-between items-center px-2 py-1 border-b-[2px] border-[#7524cc]">
                                    <span className="text-[#7524cc] font-black text-[11px] tracking-wide">ESTRUCTURA DE LAS PAGINAS</span>
                                    <div className="w-5 h-5 bg-[#7524cc] text-white rounded-full flex items-center justify-center text-xs font-bold absolute -top-2.5 -right-2.5 shadow-sm">?</div>
                                </div>
                                <div className="p-2 flex gap-2 justify-center bg-white h-[90px] items-center">
                                    {/* C Box */}
                                    <div className="border border-green-300 w-[60px] h-full p-1 relative">
                                        <div className="absolute -top-1 -left-1 bg-green-400 text-white text-[6px] px-1 font-bold">C</div>
                                        <div className="w-full h-[40%] bg-gray-200 mb-1" />
                                        <div className="w-[80%] h-[10%] bg-gray-200 mb-1" />
                                        <div className="w-[60%] h-[10%] bg-gray-200" />
                                    </div>
                                    {/* P and A Box */}
                                    <div className="flex flex-col gap-1 w-[80px] h-full">
                                        <div className="border border-blue-300 flex-1 p-1 relative flex gap-1 items-center">
                                            <div className="absolute -top-1 -left-1 bg-blue-400 text-white text-[6px] px-1 font-bold">P</div>
                                            <div className="flex-1 h-[70%] bg-gray-200" />
                                            <div className="flex-1 h-[70%] bg-gray-200" />
                                        </div>
                                        <div className="border border-[#7524cc] flex-1 p-1 relative flex flex-col gap-[2px] justify-center">
                                            <div className="absolute -top-1 -left-1 bg-[#7524cc] text-white text-[6px] px-1 font-bold">A</div>
                                            <div className="w-full h-[3px] bg-gray-200" />
                                            <div className="w-full h-[3px] bg-gray-200" />
                                            <div className="w-[80%] h-[3px] bg-gray-200" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 3. Icono de video no visto / visto */}
                            <div className="w-full border-[2px] border-[#7524cc] rounded flex flex-col relative">
                                <div className="flex justify-between items-center px-2 py-1 border-b-[2px] border-[#7524cc]">
                                    <span className="text-[#7524cc] font-black text-[11px] tracking-wide">ICONO DE VIDEO NO VISTO / VISTO</span>
                                    <div className="w-5 h-5 bg-[#7524cc] text-white rounded-full flex items-center justify-center text-xs font-bold absolute -top-2.5 -right-2.5 shadow-sm">?</div>
                                </div>
                                <div className="p-3 flex justify-around items-center bg-white h-[60px]">
                                    <div className="w-10 h-10 bg-[#7524cc] rounded-full flex items-center justify-center">
                                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                                    </div>
                                    <div className="w-10 h-10 bg-[#34d399] rounded-full flex items-center justify-center">
                                        <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1" />
                                    </div>
                                </div>
                            </div>

                            {/* 4. Retroalimentación */}
                            <div className="w-full border-[2px] border-[#7524cc] rounded flex flex-col relative">
                                <div className="flex justify-between items-center px-2 py-1 border-b-[2px] border-[#7524cc]">
                                    <span className="text-[#7524cc] font-black text-[#7524cc] text-[11px] tracking-wide">RETROALIMENTACIÓN</span>
                                    <div className="w-5 h-5 bg-[#7524cc] text-white rounded-full flex items-center justify-center text-xs font-bold absolute -top-2.5 -right-2.5 shadow-sm">?</div>
                                </div>
                                <div className="p-2 flex flex-col gap-2 bg-white w-full">
                                    <div className="flex items-center justify-between px-2">
                                        <span className="bg-[#7524cc] text-white text-[8px] font-bold px-2 py-1 rounded">¡LISTO!</span>
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-1">
                                                <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center text-white text-[8px]">✓</div>
                                                <div className="w-3 h-3 bg-yellow-400 rounded-full flex items-center justify-center text-white text-[8px] font-bold">!</div>
                                            </div>
                                            <span className="text-[7px] text-green-500 font-bold leading-tight mt-1 text-center">CORRECTO/<br />INCORRECTO</span>
                                        </div>
                                        <div className="w-4 h-4 rounded bg-[#7524cc] flex items-center justify-center text-white text-[10px]">
                                            <span>↺</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center gap-1 border-t border-gray-200 mt-1 pt-1 opacity-70">
                                        <span className="w-3 h-3 bg-[#7524cc] rounded-full text-white text-[8px] flex items-center justify-center">i</span>
                                        <span className="text-[8px] font-bold text-[#7524cc]">BONO EXPLICADO</span>
                                    </div>
                                </div>
                            </div>

                            {/* 5. Índices de una unidad */}
                            <div className="w-full border-[2px] border-[#7524cc] rounded flex flex-col relative">
                                <div className="flex justify-between items-center px-2 py-1 border-b-[2px] border-[#7524cc]">
                                    <span className="text-[#7524cc] font-black text-[11px] tracking-wide">ÍNDICES DE UNA UNIDAD</span>
                                    <div className="w-5 h-5 bg-[#7524cc] text-white rounded-full flex items-center justify-center text-xs font-bold absolute -top-2.5 -right-2.5 shadow-sm">?</div>
                                </div>
                                <div className="p-3 flex justify-around items-center bg-white h-[40px]">
                                    <span className="bg-[#ef4444] text-white text-[8px] font-bold px-2 py-1 rounded">¿Qué es ... ?</span>
                                    <span className="bg-[#84cc16] text-white text-[8px] font-bold px-2 py-1 rounded">Ejemplo:</span>
                                    <span className="bg-[#7524cc] text-white text-[8px] font-bold px-2 py-1 rounded">PRÁCTICA</span>
                                </div>
                            </div>

                            {/* 6. Señales de un icono */}
                            <div className="w-full border-[2px] border-[#7524cc] rounded flex flex-col relative">
                                <div className="flex justify-between items-center px-2 py-1 border-b-[2px] border-[#7524cc]">
                                    <span className="text-[#7524cc] font-black text-[11px] tracking-wide">SEÑALES DE UN ICONO</span>
                                    <div className="w-5 h-5 bg-[#7524cc] text-white rounded-full flex items-center justify-center text-xs font-bold absolute -top-2.5 -right-2.5 shadow-sm">?</div>
                                </div>
                                <div className="p-2 flex justify-around items-center bg-white h-[50px]">
                                    <span className="text-[20px] text-[#7524cc]">📝</span>
                                    <span className="text-[20px] text-[#7524cc]">💡</span>
                                    <span className="text-[20px] text-[#7524cc]">🌟</span>
                                </div>
                            </div>


                        </div>


                        {/* ---------------- RIGHT COLUMN ELEMENTS ---------------- */}
                        <div className="flex-1 relative">

                            {/* Shapes box */}
                            <div className="absolute top-[50px] left-[430px] w-[280px] h-[200px] border-[1px] border-[#7524cc] flex items-center justify-center">
                                <div className="relative w-full h-full">
                                    {/* Triangle */}
                                    <div className="absolute top-[30px] left-[20px]">
                                        <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[50px] border-b-[#7524cc]" />
                                        <div className="absolute -top-3 right-[-10px] w-6 h-6 bg-[#60a5fa] text-white rounded-full flex items-center justify-center text-xs font-bold z-10">?</div>
                                    </div>

                                    {/* Target */}
                                    <div className="absolute top-[40px] right-[40px]">
                                        <div className="w-[60px] h-[60px] rounded-full bg-[#ef4444] flex items-center justify-center relative">
                                            <div className="w-[40px] h-[40px] rounded-full bg-[#1e293b] flex items-center justify-center">
                                                <div className="w-[15px] h-[15px] rounded-full bg-white flex items-center justify-center">
                                                    <div className="w-[5px] h-[5px] rounded-full bg-[#ef4444]" />
                                                </div>
                                            </div>
                                            {/* Target arrow line */}
                                            <div className="absolute -top-[5px] -right-[5px] w-4 h-4 border-t-2 border-r-2 border-white rotate-45"></div>
                                            <div className="absolute -top-[15px] right-[-15px] w-6 h-6 bg-[#7524cc] text-white rounded-full flex items-center justify-center text-xs font-bold">?</div>
                                        </div>
                                    </div>

                                    {/* Stars */}
                                    <div className="absolute bottom-[30px] left-[40px] flex items-center w-[200px]">
                                        <div className="relative">
                                            <div className="text-[#eab308] text-[60px] leading-none select-none">★</div>
                                            <div className="absolute inset-0 flex items-center justify-center text-[#7524cc] font-black text-[24px] pt-1">3</div>
                                        </div>

                                        <div className="flex-1 border-t-[3px] border-gray-300 relative mx-1 mt-2">
                                            <div className="absolute left-[80%] -top-[6px] w-2 h-2 rounded-full bg-[#7524cc]" />
                                            <div className="absolute left-[80%] -top-[45px] w-1 h-[40px] origin-bottom rotate-[30deg]">
                                                <div className="w-6 h-6 bg-[#7524cc] text-white rounded-full flex flex-col items-center justify-center text-xs font-bold absolute -top-4 -left-3 shadow-md">?</div>
                                                <div className="w-[2px] h-full bg-[#7524cc] absolute right-[2px]"></div>
                                            </div>
                                        </div>

                                        <div className="relative -ml-2 mb-4">
                                            <div className="text-[#eab308] text-[35px] leading-none select-none">★</div>
                                            <div className="absolute inset-0 flex items-center justify-center text-[#7524cc] font-black text-[14px] pt-[2px]">4</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Emojis box */}
                            <div className="absolute top-[600px] left-[400px] border border-black flex gap-2 p-1 bg-[#ececcc]">
                                <div className="w-6 h-6 rounded-full bg-[#fca5a5] flex items-center justify-center border border-black text-xs">😠</div>
                                <div className="w-6 h-6 rounded-full bg-[#fcd34d] flex items-center justify-center border border-black text-xs">😐</div>
                                <div className="w-6 h-6 rounded-full bg-[#86efac] flex items-center justify-center border border-black text-xs">😊</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </BookPageContainer>
    );
};

