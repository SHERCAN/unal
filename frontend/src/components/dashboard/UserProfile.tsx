'use client';

import { useEffect, useState } from 'react';
import { getLevelInfo } from '@/lib/leveling';
import axios from 'axios';

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
        puntosFlexibles: number;
        puntosDefinitivos: number;
    }>;
    onBack: () => void;
    mutate?: () => void;
}

const AVATARS = Array.from({ length: 28 }, (_, i) => `/avatars/avatar${i + 1}-Photoroom.png`);

export function UserProfile({ user, ranking, onBack, mutate }: UserProfileProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [displayAvatar, setDisplayAvatar] = useState(user.photoUrl || user.avatar);

    useEffect(() => {
        setDisplayAvatar(user.photoUrl || user.avatar);
    }, [user.photoUrl, user.avatar]);

    const totalPuntos = user.puntos + user.puntosDefinitivos;
    const levelInfo = getLevelInfo(totalPuntos);
    const nivel = levelInfo.currentLevel;
    const progreso = totalPuntos - levelInfo.currentLevelMin;
    const maxProgreso = levelInfo.currentLevelMax - levelInfo.currentLevelMin;

    // Encontrar posición del usuario en el ranking
    const userRankPosition = ranking.findIndex(u => u.nickname === user.nickname) + 1;

    const handleAvatarSelect = async (avatarPath: string) => {
        try {
            setIsSaving(true);
            const token = localStorage.getItem('token');
            await axios.post('/api/users/avatar', 
                { avatar: avatarPath },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Actualizar localStorage y estado local
            const localUser = JSON.parse(localStorage.getItem('user') || '{}');
            localUser.avatar = avatarPath;
            localUser.photoUrl = avatarPath; // Sincronizar con DashboardPage
            localStorage.setItem('user', JSON.stringify(localUser));
            localStorage.setItem('userAvatar', avatarPath); 
            
            setDisplayAvatar(avatarPath);
            setIsModalOpen(false);
            
            if (mutate) mutate();
        } catch (error) {
            console.error('Error al cambiar avatar:', error);
            alert('No se pudo cambiar el avatar. Intenta de nuevo.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="h-screen bg-gradient-to-br from-[#dba9f3] to-[#c084fc] p-4 md:p-8 flex flex-col overflow-hidden relative">
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

            <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col min-h-0">
                {/* Header */}
                <h1 className="text-4xl font-black text-[#7e22ce] mb-8 text-center">
                    PERFIL DE USUARIO
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1 min-h-0">
                    {/* Columna Izquierda */}
                    <div className="space-y-6">
                        {/* Usuario */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center relative">
                            <div className="relative inline-block group">
                                <div className="w-32 h-32 mx-auto bg-gradient-to-tr from-[#7e22ce] to-[#9333ea] rounded-full p-[4px] shadow-xl mb-4">
                                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-7xl overflow-hidden">
                                        {displayAvatar?.startsWith('/') ? (
                                            <img src={displayAvatar} alt={user.nombre} className="w-full h-full object-cover" />
                                        ) : (
                                            <span>{displayAvatar || '👤'}</span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="absolute bottom-4 right-0 bg-[#7e22ce] text-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform border-4 border-white"
                                    title="Cambiar avatar"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </button>
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
                    <div className="space-y-6 flex flex-col h-full min-h-0">
                        {/* Puntos */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6">
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                {/* Puntaje */}
                                <div className="text-center">
                                    <p className="text-sm font-bold text-[#7e22ce] mb-2">PUNTOS</p>
                                    <div className="flex items-center justify-center gap-3">
                                        <svg className="w-12 h-12 text-[#9333ea]" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2L2 22h20L12 2z" />
                                        </svg>
                                        <span className="text-4xl font-black text-[#9333ea]">+ {user.puntos}</span>
                                    </div>
                                </div>

                                {/* Puntaje definitivo */}
                                <div className="text-center">
                                    <p className="text-sm font-bold text-[#ef4444] mb-2">RETO DEFINITIVO</p>
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="relative w-12 h-12 flex items-center justify-center">
                                            <img src="/diana.svg" alt="Reto Definitivo" className="w-full h-full object-contain" />
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
                                        <p className="text-sm font-bold text-[#7e22ce]">+ {progreso}/{maxProgreso}</p>
                                    </div>
                                </div>
                                <p className="text-center text-2xl font-black text-[#7e22ce]">
                                    {user.puntos} + {user.puntosDefinitivos} = {totalPuntos}
                                </p>
                            </div>
                        </div>

                        {/* Ranking en Tiempo Real */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm flex flex-col flex-1 min-h-0">
                            <h3 className="text-2xl font-black text-[#7e22ce] mb-4 flex items-center gap-2">
                                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
                                </svg>
                                RANKINGS EN EL TIEMPO REAL
                            </h3>
                            <div className="space-y-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                {ranking.map((rankUser, index) => (
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
                                        {rankUser.avatar?.startsWith('/') ? (
                                            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                                <img src={rankUser.avatar} alt={rankUser.nombre} className="w-full h-full object-cover" />
                                            </div>
                                        ) : (
                                            <span className="text-3xl">{rankUser.avatar || '👤'}</span>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className={`font-black text-lg truncate ${rankUser.nickname === user.nickname ? 'text-white' : 'text-[#7e22ce]'
                                                }`}>
                                                {rankUser.nombre}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-end gap-0.5">
                                            <div className="flex items-center gap-1">
                                                <svg className="w-4 h-4 text-[#9333ea]" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 2L2 22h20L12 2z" />
                                                </svg>
                                                <span className={`font-bold text-xs ${rankUser.nickname === user.nickname ? 'text-white/80' : 'text-[#9333ea]'}`}>
                                                    {rankUser.puntosFlexibles}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <div className="w-4 h-4 flex items-center justify-center">
                                                    <img src="/diana.svg" alt="Reto" className="w-full h-full object-contain" />
                                                </div>
                                                <span className={`font-bold text-xs ${rankUser.nickname === user.nickname ? 'text-white/80' : 'text-[#ef4444]'}`}>
                                                    {rankUser.puntosDefinitivos}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 mt-1 border-t border-[#7e22ce]/20 pt-0.5">
                                                <svg viewBox="0 0 24 24" fill="#fde047" stroke="#7e22ce" strokeWidth="1.5" className="w-5 h-5">
                                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                                </svg>
                                                <span className={`font-black text-sm ${rankUser.nickname === user.nickname ? 'text-yellow-300' : 'text-[#7e22ce]'}`}>
                                                    {rankUser.puntos}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Avatar Selection Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setIsModalOpen(false)}
                    ></div>
                    <div className="bg-white rounded-3xl p-6 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col relative z-10 shadow-2xl animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-3xl font-black text-[#7e22ce]">ELIGE TU AVATAR</h2>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar grid grid-cols-4 md:grid-cols-7 gap-4">
                            {AVATARS.map((avatar, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAvatarSelect(avatar)}
                                    disabled={isSaving}
                                    className={`relative aspect-square rounded-2xl overflow-hidden border-4 transition-all hover:scale-105 ${
                                        displayAvatar === avatar 
                                            ? 'border-[#7e22ce] ring-4 ring-[#7e22ce]/20' 
                                            : 'border-transparent hover:border-purple-200'
                                    }`}
                                >
                                    <img src={avatar} alt={`Avatar ${index + 1}`} className="w-full h-full object-cover" />
                                    {displayAvatar === avatar && (
                                        <div className="absolute inset-0 bg-[#7e22ce]/10 flex items-center justify-center">
                                            <div className="bg-[#7e22ce] text-white rounded-full p-1 shadow-lg">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>

                        {isSaving && (
                            <div className="absolute inset-0 bg-white/50 flex items-center justify-center z-20 backdrop-blur-[1px]">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="w-12 h-12 border-4 border-[#7e22ce] border-t-transparent rounded-full animate-spin"></div>
                                    <p className="font-black text-[#7e22ce]">GUARDANDO...</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
