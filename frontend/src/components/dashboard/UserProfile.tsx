'use client';

import { useEffect, useState } from 'react';

interface UserProfileProps {
    user: {
        id: string;
        nickname: string;
        nombre: string;
        avatar: string;
        photoUrl?: string;
        puntos: number;
        puntosDefinitivos: number;
    };
    ranking: Array<{
        nickname: string;
        nombre: string;
        avatar: string;
        puntos: number;
    }>;
    onBack: () => void;
}

export function UserProfile({ user, ranking, onBack }: UserProfileProps) {
    const totalPuntos = user.puntos + user.puntosDefinitivos;
    const nivel = Math.floor(totalPuntos / 100);
    const progreso = totalPuntos % 100;

    // Encontrar posición del usuario en el ranking
    const userRankPosition = ranking.findIndex(u => u.nickname === user.nickname) + 1;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#dba9f3] to-[#c084fc] p-8 overflow-y-auto">
            {/* Botón Volver */}
            <button
                onClick={onBack}
                className="mb-6 flex items-center gap-2 bg-[#7e22ce] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#6b21a8] transition-all shadow-lg hover:shadow-xl"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                VOLVER
            </button>

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <h1 className="text-4xl font-black text-[#7e22ce] mb-8 text-center">
                    PERFIL DE USUARIO
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Columna Izquierda */}
                    <div className="space-y-6">
                        {/* Usuario */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center">
                            <div className="w-32 h-32 mx-auto bg-gradient-to-tr from-[#7e22ce] to-[#9333ea] rounded-full p-[4px] shadow-xl mb-4">
                                <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-7xl overflow-hidden">
                                    {user.photoUrl ? (
                                        <img src={user.photoUrl} alt={user.nombre} className="w-full h-full object-cover" />
                                    ) : (
                                        <span>{user.avatar}</span>
                                    )}
                                </div>
                            </div>
                            <h2 className="text-3xl font-black text-[#7e22ce]">{user.nombre}</h2>
                        </div>

                        {/* Logros */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6">
                            <h3 className="text-2xl font-black text-[#7e22ce] mb-4">LOGROS</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {/* Logro 1: Primera lección completada */}
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                                        ⭐
                                    </div>
                                    <p className="text-xs font-bold text-[#7e22ce] mt-2 text-center">Primera Lección</p>
                                </div>

                                {/* Logro 2: 10 ejercicios completados */}
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-purple-300 to-purple-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                                        🎯
                                    </div>
                                    <p className="text-xs font-bold text-[#7e22ce] mt-2 text-center">10 Ejercicios</p>
                                </div>

                                {/* Logro 3: Bloqueado */}
                                <div className="flex flex-col items-center opacity-40">
                                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-3xl shadow-lg">
                                        🔒
                                    </div>
                                    <p className="text-xs font-bold text-gray-500 mt-2 text-center">???</p>
                                </div>

                                {/* Logro 4: Bloqueado */}
                                <div className="flex flex-col items-center opacity-40">
                                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-3xl shadow-lg">
                                        🔒
                                    </div>
                                    <p className="text-xs font-bold text-gray-500 mt-2 text-center">???</p>
                                </div>

                                {/* Logro 5: Bloqueado */}
                                <div className="flex flex-col items-center opacity-40">
                                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-3xl shadow-lg">
                                        🔒
                                    </div>
                                    <p className="text-xs font-bold text-gray-500 mt-2 text-center">???</p>
                                </div>

                                {/* Logro 6: Genial */}
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 bg-gradient-to-br from-green-300 to-green-500 rounded-full flex items-center justify-center text-3xl shadow-lg">
                                        👍
                                    </div>
                                    <p className="text-xs font-bold text-[#7e22ce] mt-2 text-center">GENIAL</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna Derecha */}
                    <div className="space-y-6">
                        {/* Puntos */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6">
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                {/* Puntos Flexibles */}
                                <div className="text-center">
                                    <p className="text-sm font-bold text-[#7e22ce] mb-2">PUNTOS</p>
                                    <div className="flex items-center justify-center gap-3">
                                        <svg className="w-12 h-12 text-[#9333ea]" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2L2 22h20L12 2z" />
                                        </svg>
                                        <span className="text-4xl font-black text-[#9333ea]">+ {user.puntos}</span>
                                    </div>
                                </div>

                                {/* Puntos Definitivos */}
                                <div className="text-center">
                                    <p className="text-sm font-bold text-[#ef4444] mb-2">RETO DEFINITIVO</p>
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="relative w-12 h-12 flex items-center justify-center">
                                            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle cx="50" cy="50" r="45" fill="#E95A53" />
                                                <path d="M50 25C36.19 25 25 36.19 25 50C25 63.81 36.19 75 50 75C63.81 75 75 63.81 75 50C75 36.19 63.81 25 50 25ZM50 66C41.16 66 34 58.84 34 50C34 41.16 41.16 34 50 34C58.84 34 66 41.16 66 50C66 58.84 58.84 66 50 66Z" fill="#004655" />
                                                <circle cx="50" cy="50" r="11" fill="#D9D9D9" />
                                                <circle cx="50" cy="50" r="4.5" fill="#004655" />
                                                <path d="M21.5 25.5L46 46M21.5 25.5L25 35L31 31L40.5 27.5L21.5 25.5ZM21.5 25.5L13.5 24L17 33L21.5 25.5Z" stroke="#004655" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="#004655" />
                                            </svg>
                                        </div>
                                        <span className="text-4xl font-black text-[#ef4444]">+ {user.puntosDefinitivos}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Total y Nivel */}
                            <div className="border-t-2 border-[#7e22ce]/30 pt-4">
                                <div className="flex items-center justify-center gap-4 mb-4">
                                    <svg viewBox="0 0 24 24" fill="#fde047" stroke="#7e22ce" strokeWidth="1.5" className="w-16 h-16">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                    </svg>
                                    <div>
                                        <span className="text-6xl font-black text-[#7e22ce]">{nivel}</span>
                                        <p className="text-sm font-bold text-[#7e22ce]">+ {progreso}/100</p>
                                    </div>
                                </div>
                                <p className="text-center text-2xl font-black text-[#7e22ce]">
                                    {user.puntos} + {user.puntosDefinitivos} = {totalPuntos}
                                </p>
                            </div>
                        </div>

                        {/* Ranking en Tiempo Real */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6">
                            <h3 className="text-2xl font-black text-[#7e22ce] mb-4 flex items-center gap-2">
                                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                                </svg>
                                RANKINGS EN EL TIEMPO REAL
                            </h3>
                            <div className="space-y-2">
                                {ranking.slice(0, 5).map((rankUser, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-center gap-3 p-3 rounded-xl transition-all ${rankUser.nickname === user.nickname
                                            ? 'bg-[#7e22ce] text-white'
                                            : 'bg-white/60 hover:bg-white/80'
                                            }`}
                                    >
                                        <span className="w-8 h-8 flex items-center justify-center font-black text-2xl">
                                            {index + 1}
                                        </span>
                                        <span className="text-3xl">{rankUser.avatar}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className={`font-black text-lg truncate ${rankUser.nickname === user.nickname ? 'text-white' : 'text-[#7e22ce]'
                                                }`}>
                                                {rankUser.nombre}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg viewBox="0 0 24 24" fill="#fde047" stroke="#7e22ce" strokeWidth="1.5" className="w-6 h-6">
                                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                            </svg>
                                            <span className={`font-bold ${rankUser.nickname === user.nickname ? 'text-yellow-300' : 'text-[#7e22ce]'
                                                }`}>
                                                + {rankUser.puntos}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
