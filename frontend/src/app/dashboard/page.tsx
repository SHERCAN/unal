'use client';
// Force rebuild

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import useSWR from 'swr';
import { fetcher, fetcherWithToken } from '@/lib/fetcher';

import { divisionConfig } from '@/topics/division/config';
import { divisionDemoConfig } from '@/topics/division_demo/config';
import { divisionExactaConfig } from '@/topics/division_exacta/config';
import { divisionInexactaConfig } from '@/topics/division_inexacta/config';
import { numerosPrimosConfig } from '@/topics/numeros_primos/config';
import { fraccionesConfig } from '@/topics/fracciones/config';
import { fraccionesEquivalentesConfig } from '@/topics/fracciones_equivalentes/config';
import { comparacionFraccionesConfig } from '@/topics/comparacion_fracciones/config';
import { TopicConfig } from '@/types/topic';
import { getLevelInfo } from '@/lib/leveling';

const ORDERED_TOPICS = [
  divisionConfig,
  divisionExactaConfig,
  divisionInexactaConfig,
  numerosPrimosConfig,
  fraccionesConfig,
  fraccionesEquivalentesConfig,
  comparacionFraccionesConfig,
];

const TOPIC_CONFIGS: Record<string, TopicConfig> = ORDERED_TOPICS.reduce((acc, config) => {
  acc[config.id] = config;
  return acc;
}, {} as Record<string, TopicConfig>);
import { TopicDropdown } from '@/components/dashboard/TopicDropdown';
import { InfiniteBook } from '@/components/dashboard/InfiniteBook';
import { ProgressNavigation } from '@/components/navigation/ProgressNavigation';
import dynamic_next from 'next/dynamic';

const UserProfile = dynamic_next(() => import('@/components/dashboard/UserProfile').then(mod => mod.UserProfile), {
  loading: () => <div className="fixed inset-0 bg-primary/20 flex items-center justify-center backdrop-blur-sm z-[500]"><div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
});

const GlosarioView = dynamic_next(() => import('@/components/dashboard/GlosarioView').then(mod => mod.GlosarioView), {
  loading: () => <div className="w-full h-full flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>
});
import { useVideoProgress } from '@/hooks/useVideoProgress';

export const dynamic = 'force-dynamic';


// Hook personalizado para animar el incremento de números
function useAnimatedCounter(targetValue: number, duration: number = 2000) {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const previousTargetRef = useRef(targetValue);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Debug: Detectar cambio de objetivo
    if (targetValue !== previousTargetRef.current) {
      const startValue = displayValue;
      const startTime = performance.now();
      const endValue = targetValue;

      console.log(`[Counter Debug] 🎯 Nuevo Objetivo: ${targetValue} (Viene de: ${previousTargetRef.current})`);
      console.log(`[Counter Debug] 🔄 Animación Iniciada: ${startValue} -> ${endValue}`);

      previousTargetRef.current = targetValue;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Curva ease-out
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(
          startValue + (endValue - startValue) * easeOut
        );

        // Solo loguear pasos significativos para no inundar la consola
        if (elapsed % 100 < 16) {
          console.log(`[Counter Debug] 📈 Progreso: ${Math.round(progress * 100)}% | Valor: ${currentValue}`);
        }

        setDisplayValue(currentValue);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate);
        } else {
          console.log(`[Counter Debug] 🏁 Animación Finalizada en: ${endValue}`);
          setDisplayValue(endValue);
        }
      };

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    } else if (displayValue === 0 && targetValue > 0) {
      console.log(`[Counter Debug] ⚡ Salto de seguridad: 0 -> ${targetValue}`);
      setDisplayValue(targetValue);
    }

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetValue, duration]);

  return displayValue;
}

// Componente de tooltip que usa Portal para renderizarse fuera del sidebar
function StarTooltip({ targetRef, children }: { targetRef: React.RefObject<HTMLDivElement>, children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isHovered && targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 10, // Posición arriba del elemento
        left: rect.left + rect.width / 2, // Centrado horizontalmente
      });
    }
  }, [isHovered, targetRef]);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    target.addEventListener('mouseenter', handleMouseEnter);
    target.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      target.removeEventListener('mouseenter', handleMouseEnter);
      target.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [targetRef]);

  if (!mounted || !isHovered) return null;

  return createPortal(
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: 'translate(-50%, -100%)',
      }}
    >
      <div className="bg-gradient-to-r from-[#7e22ce] to-[#9333ea] text-white text-sm font-semibold rounded-xl py-3 px-4 whitespace-nowrap shadow-2xl shadow-purple-500/50 animate-in fade-in slide-in-from-bottom-2 duration-200 border-2 border-white/20 mb-2">
        {children}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[#7e22ce]"></div>
      </div>
    </div>,
    document.body
  );
}

interface User {
  id: string;
  nickname: string;
  nombre: string;
  avatar: string;
  photoUrl?: string;
  puntos: number;
  puntosDefinitivos: number;
}

interface RankingUser {
  id?: string;
  nickname: string;
  nombre: string;
  avatar: string;
  puntos: number; // Total points
  puntosFlexibles: number;
  puntosDefinitivos: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [completedPages, setCompletedPages] = useState<number[]>([]);
  const [navigateToPage, setNavigateToPage] = useState<((page: number) => void) | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [mounted, setMounted] = useState(false);
  const nextLevelStarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SWR Hooks for optimized fetching and caching
  const { data: profileData, mutate: mutateProfile } = useSWR(
    token ? ['/api/users/profile', token] : null,
    fetcherWithToken,
    { revalidateOnFocus: false }
  );

  const { data: rankingData, isLoading: loadingRankingSWR, mutate: mutateRanking } = useSWR(
    '/api/users/ranking',
    fetcher,
    { refreshInterval: 60000 } // Refresh ranking every minute
  );

  const { data: progressData, isLoading: loadingProgressSWR, mutate: mutateProgress } = useSWR(
    token ? ['/api/users/progress', token] : null,
    fetcherWithToken
  );

  const { data: exercisesData, mutate: mutateExercises } = useSWR(
    token ? ['/api/users/exercises', token] : null,
    fetcherWithToken
  );

  // Re-fetch data whenever points are updated (dispatched from useVideoProgress after completing an exercise)
  useEffect(() => {
    const handleScoreUpdate = () => {
      mutateProfile();
      mutateRanking();
      mutateProgress();
      mutateExercises();
    };

    window.addEventListener('points-updated', handleScoreUpdate);
    // Keep storage listener for multi-tab sync if needed, but points-updated covers current tab
    window.addEventListener('storage', handleScoreUpdate);
    return () => {
      window.removeEventListener('points-updated', handleScoreUpdate);
      window.removeEventListener('storage', handleScoreUpdate);
    };
  }, [mutateProfile, mutateRanking, mutateProgress, mutateExercises]);

  // Sync profileData with local storage and state
  const user = React.useMemo(() => {
    if (profileData) {
      const pDefinitivos = Number(
        profileData.puntosDefinitivos ??
        profileData.puntos_definitivos ??
        0
      );

      const pTotal = Number(profileData.puntos ?? 0);

      // Si existe un campo explícito para flexibles, usarlo.
      // Si no, asumimos que 'puntos' es el total y restamos los definitivos.
      const pFlexibles = Number(
        profileData.puntosFlexibles ??
        profileData.puntos_flexibles ??
        pTotal
      );

      const u = {
        ...profileData,
        puntos: pFlexibles,
        puntosDefinitivos: pDefinitivos
      };

      console.log('Final User Stats Mapping:', {
        rawPuntos: profileData.puntos,
        rawDefinitivos: profileData.puntosDefinitivos,
        mappedFlexibles: pFlexibles,
        mappedDefinitivos: pDefinitivos
      });
      if (u.role === 'ADMIN') {
        router.push('/admin');
        return null;
      }
      const savedAvatar = localStorage.getItem('userAvatar');
      if (savedAvatar) u.photoUrl = savedAvatar;
      localStorage.setItem('user', JSON.stringify(u));
      return u;
    }
    if (typeof window !== 'undefined') {
      const localUser = localStorage.getItem('user');
      if (localUser) {
        try {
          const u = JSON.parse(localUser);
          const savedAvatar = localStorage.getItem('userAvatar');
          if (savedAvatar) u.photoUrl = savedAvatar;
          return u as User;
        } catch (e) { }
      }
    }
    return null;
  }, [profileData, router]);

  // Progress data for TopicDropdown
  const { watchedVideos, completedExercises, completedStages } = useVideoProgress();

  // Determine current topic based on page index
  const currentTopicInfo = React.useMemo(() => {
    // Handling of the first 3 special pages (indices 0, 1, 2)
    if (currentPage < 2) return {
      topic: { id: 'shared', name: '', pages: [], exercisePages: [] },
      relativePage: 0
    };
    if (currentPage === 2) return {
      topic: { id: 'shared', name: 'Índice de Contenidos', pages: [], exercisePages: [] },
      relativePage: 0
    };

    let offset = 3; // Topics start at index 3
    for (const topic of ORDERED_TOPICS) {
      const count = topic.pages.length + topic.exercisePages.length;
      if (currentPage < offset + count) {
        return {
          topic,
          relativePage: currentPage - offset + 1,
          totalTopicPages: count
        };
      }
      offset += count;
    }
    return null;
  }, [currentPage]);

  // Estados para el perfil de usuario
  const [showProfile, setShowProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeView, setActiveView] = useState<'book' | 'glossary'>('book');

  // Animar los valores de puntos
  const animatedPuntos = useAnimatedCounter(user?.puntos || 0);
  const animatedPuntosDefinitivos = useAnimatedCounter(user?.puntosDefinitivos || 0);
  // Los puntos totales son la suma de los valores animados, no una animación independiente
  const animatedPuntosTotales = animatedPuntos + animatedPuntosDefinitivos;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.push('/login');
      return;
    }
    setToken(storedToken);
  }, [router]);

  const ranking = rankingData || [];
  const loading = !user && !profileData;
  const loadingRanking = loadingRankingSWR;

  const completedModules = React.useMemo(() => {
    let modules: string[] = [];
    if (progressData) {
      modules = [...progressData];
    }
    if (exercisesData) {
      const exerciseIds = Object.keys(exercisesData).filter(
        id => exercisesData[id]?.completed
      );
      modules = [...modules, ...exerciseIds];
    }
    return modules;
  }, [progressData, exercisesData]);



  const handleLogout = async () => {
    const sessionId = localStorage.getItem('sessionId');
    const token = localStorage.getItem('token');

    if (sessionId && token) {
      try {
        await axios.post('/api/auth/logout', { sessionId }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
      } catch (e) {
        console.error("Logout failed", e);
      }
    }

    // Clear all user-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('sessionId');
    localStorage.removeItem('user');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('watchedVideos');

    // Use hard navigation to ensure complete reload and state clearing
    window.location.href = '/';
  };

  const handleUserClick = () => {
    if (user) {
      setSelectedUser(user);
      setShowProfile(true);
    }
  };

  const handleRankingUserClick = (rankUser: RankingUser) => {
    // Convertir RankingUser a User para mostrar en el perfil
    const userToShow: User = {
      id: rankUser.id || '',
      nickname: rankUser.nickname,
      nombre: rankUser.nombre,
      avatar: rankUser.avatar,
      puntos: rankUser.puntosFlexibles,
      puntosDefinitivos: rankUser.puntosDefinitivos,
    };
    setSelectedUser(userToShow);
    setShowProfile(true);
  };

  const handleBackToDashboard = () => {
    setShowProfile(false);
    setSelectedUser(null);
  };



  if (!mounted || (loading && !user)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-secondary text-text gap-4">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-xl font-black animate-pulse uppercase tracking-widest">Cargando Plataforma...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative transition-colors duration-300">
      {/* User Profile View - rendered as an overlay to keep dashboard mounted */}
      {showProfile && selectedUser && (
        <div className="fixed inset-0 z-[500] animate-in fade-in duration-300">
          <UserProfile
            user={selectedUser}
            ranking={ranking}
            onBack={handleBackToDashboard}
          />
        </div>
      )}

      {/* Main Dashboard Layout */}
      <div className={`flex text-text min-h-screen ${showProfile ? 'hidden' : ''}`}>
        {/* Sidebar Izquierdo */}
        <aside
          className={`
            bg-[#dba9f3]/85 backdrop-blur-md border-r border-gray-200 dark:border-gray-800 
            sticky top-0 h-screen overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out z-[200]
            ${isSidebarOpen
              ? 'w-80 p-6 opacity-100 translate-x-0'
              : 'w-0 p-0 opacity-0 -translate-x-full border-none'}
          `}
        >
          <div className={isSidebarOpen ? 'w-full' : 'w-0 hidden'}>
            {/* Usuario */}
            <button
              onClick={handleUserClick}
              className="text-center space-y-4 w-full hover:bg-white/20 rounded-2xl p-4 transition-all cursor-pointer"
            >
              <div className="relative inline-block">
                <div className="w-28 h-28 mx-auto bg-gradient-to-tr from-primary to-blue-400 rounded-full p-[4px] shadow-xl">
                  <div className="w-full h-full bg-secondary rounded-full flex items-center justify-center text-6xl overflow-hidden relative">
                    {user?.photoUrl ? (
                      <Image
                        src={user.photoUrl}
                        alt={user.nombre}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      user?.avatar?.startsWith('/') ? (
                        <Image src={user.avatar} alt={user.nombre} fill className="object-cover" />
                      ) : (
                        <span>{user?.avatar || '👤'}</span>
                      )
                    )}
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-secondary"></div>
              </div>
              <div>
                <h2 className="text-2xl font-black text-text tracking-tight">
                  {user?.nombre?.split(' ')[0] || 'Usuario'}
                </h2>
              </div>
            </button>

            {/* Stats Grid */}
            {/* Stats Grid */}
            <div className="space-y-3">
              {/* Puntaje Flexible */}
              <div className="bg-white/40 backdrop-blur-sm p-4 rounded-xl flex items-center justify-center gap-2 relative overflow-hidden">
                <div className="z-10 flex items-center gap-3">
                  <svg className="w-12 h-12 text-[#9333ea]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 22h20L12 2z" />
                  </svg>
                  <span className="text-5xl font-black text-[#9333ea] tracking-tight">+ {animatedPuntos}</span>
                </div>
              </div>

              {/* Puntaje Definitivo */}
              <div className="bg-white/40 backdrop-blur-sm p-4 rounded-xl flex items-center justify-center gap-2 relative overflow-hidden">
                <div className="z-10 flex items-center gap-3">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    <Image src="/diana.svg" alt="Puntaje Definitivo" width={48} height={48} className="object-contain" priority />
                  </div>
                  <span className="text-5xl font-black text-[#ef4444] tracking-tight">+ {animatedPuntosDefinitivos}</span>
                </div>
              </div>
            </div>

            {/* Reto Diario */}
            {/* Nivel y Progreso */}
            <div className="bg-white/40 backdrop-blur-sm p-4 rounded-xl relative overflow-visible mt-4 z-50">
              {(() => {
                const levelInfo = getLevelInfo(animatedPuntosTotales);
                return (
                  <>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      {/* Start Star (Current Level) */}
                      <div className="relative w-20 h-auto flex items-center justify-center filter drop-shadow-md">
                        <svg viewBox="0 0 24 24" fill="#fde047" stroke="#7e22ce" strokeWidth="1.5" className="w-full h-full">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                        <span className="absolute text-[#7e22ce] font-black text-lg pt-1">{levelInfo.currentLevel}</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="flex-1 h-3 bg-gray-200/50 rounded-full overflow-hidden border border-white/50">
                        <div
                          className="h-full bg-[#7e22ce] rounded-full shadow-sm transition-all duration-300"
                          style={{ width: `${levelInfo.progressPercentage}%` }}
                        ></div>
                      </div>

                      {/* End Star (Next Level) */}
                      <div
                        ref={nextLevelStarRef}
                        className="relative w-14 h-auto flex items-center justify-center opacity-80 filter drop-shadow-sm cursor-pointer transition-all duration-200 hover:opacity-100 hover:scale-110"
                      >
                        <svg viewBox="0 0 24 24" fill="#fde047" stroke="#7e22ce" strokeWidth="1.5" className="w-full h-full">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                        <span className="absolute text-[#7e22ce] font-bold text-sm pt-0.5">{levelInfo.nextLevel}</span>
                      </div>

                      {/* Tooltip usando Portal */}
                      <StarTooltip targetRef={nextLevelStarRef}>
                        ✨ Necesitas <span className="font-black text-yellow-300">{levelInfo.pointsNeeded}</span> puntos más
                      </StarTooltip>
                    </div>

                    <div className="text-right">
                      <span className="text-4xl font-black text-[#7e22ce] tracking-tight mr-2">+ {animatedPuntosTotales}</span>
                    </div>
                  </>
                );
              })()}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-bold text-[#7e22ce]">RANKING SEMANAL</span>
              </div>
              <div className="space-y-2">
                {loadingRanking ? (
                  // Ranking Skeletons
                  Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-full flex items-center gap-3 p-2 rounded-xl bg-white/20 backdrop-blur-sm animate-pulse">
                      <div className="w-8 h-8 rounded-lg bg-white/20"></div>
                      <div className="w-10 h-10 rounded-full bg-white/20"></div>
                      <div className="flex-1 h-6 bg-white/20 rounded-lg"></div>
                      <div className="w-16 h-6 bg-white/20 rounded-full"></div>
                    </div>
                  ))
                ) : (
                  ranking.slice(0, 5).map((rankUser: RankingUser, index: number) => (
                    <button
                      key={index}
                      onClick={() => handleRankingUserClick(rankUser)}
                      className="w-full flex items-center gap-3 p-2 rounded-xl bg-white/40 backdrop-blur-sm transition-colors hover:bg-white/60 cursor-pointer"
                    >
                      <span className="w-8 h-8 flex items-center justify-center font-black text-3xl text-[#7e22ce]">
                        {index + 1}
                      </span>
                      {rankUser.avatar?.startsWith('/') ? (
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 relative">
                          <Image src={rankUser.avatar} alt={rankUser.nombre} fill className="object-cover" />
                        </div>
                      ) : (
                        <span className="text-4xl filter drop-shadow-sm">{rankUser.avatar}</span>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xl font-black text-[#1f2937] truncate tracking-tight">{rankUser.nombre}</p>
                      </div>
                      <span className="text-sm font-bold text-[#7e22ce] bg-[#7e22ce]/10 px-2 py-1 rounded-full whitespace-nowrap">{rankUser.puntos} XP</span>
                    </button>
                  ))
                )}
              </div>
            </div>

          </div>
        </aside>

        {/* Contenido Principal */}
        <main className="flex-1 flex flex-col h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory scroll-pt-24 scroll-pb-32">
          {/* Header Stick */}
          <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-8 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                {/* Mobile menu trigger */}
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="p-2 -ml-2 text-text-secondary hover:text-text rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
              <TopicDropdown
                topicConfigs={ORDERED_TOPICS}
                onNavigateToPage={navigateToPage || undefined}
                currentPage={currentPage}
                watchedVideos={watchedVideos}
                completedExercises={completedExercises}
                completedStages={completedStages}
              />
            </div>

            {/* Centered Lesson Title */}
            <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none hidden md:block">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={activeView === 'glossary' ? 'glosario' : currentTopicInfo?.topic.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="text-lg font-black text-[#7e22ce] uppercase tracking-[0.2em] whitespace-nowrap drop-shadow-sm"
                >
                  {activeView === 'glossary' ? 'Glosario Interactivo' : currentTopicInfo?.topic.name}
                </motion.h2>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-3 mr-16">
              <button
                onClick={() => setActiveView(activeView === 'book' ? 'glossary' : 'book')}
                className={`px-8 py-4 rounded-xl shadow-xl border border-purple-500/30 font-black tracking-wide text-sm transition-all ${activeView === 'glossary'
                  ? 'bg-pink-500 text-white'
                  : 'bg-[#7e22ce] text-white hover:bg-[#6b21a8]'
                  }`}
              >
                {activeView === 'book' ? 'GLOSARIO' : 'LIBRO'}
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-m font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
              >
                Salir
              </button>
            </div>
          </header>

          {/* Contenido Principal */}
          <div className={`flex-1 flex flex-col ${activeView !== 'book' ? 'hidden' : ''}`}>
            <InfiniteBookWrapper
              completedPages={completedPages}
              setCompletedPages={setCompletedPages}
              topics={ORDERED_TOPICS}
              setNavigateToPage={setNavigateToPage}
              completedModules={completedModules}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              currentTopicInfo={currentTopicInfo}
              isSidebarOpen={isSidebarOpen}
            />
          </div>

          <div className={`flex-1 flex flex-col ${activeView !== 'glossary' ? 'hidden' : ''}`}>
            <GlosarioView />
          </div>
        </main>
      </div>
    </div>
  );
}

// Wrapper component to manage InfiniteBook and ProgressNavigation
function InfiniteBookWrapper({
  completedPages,
  setCompletedPages,
  topics,
  setNavigateToPage,
  completedModules,
  currentPage,
  setCurrentPage,
  currentTopicInfo,
  isSidebarOpen
}: {
  completedPages: number[];
  setCompletedPages: React.Dispatch<React.SetStateAction<number[]>>;
  topics: TopicConfig[];
  setNavigateToPage: React.Dispatch<React.SetStateAction<((page: number) => void) | null>>;
  completedModules: string[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
  currentTopicInfo: any;
  isSidebarOpen: boolean;
}) {
  const navigateCallbackRef = useRef<((page: number) => void) | null>(null);

  const handlePageChange = useCallback((page: number, completed: number[]) => {
    setCurrentPage(page);
    setCompletedPages(completed);
  }, [setCompletedPages]);

  const handleNavigationRequest = useCallback((callback: (page: number) => void) => {
    navigateCallbackRef.current = callback;
    setNavigateToPage(() => callback);
  }, [setNavigateToPage]);

  const handleNavigateToPage = useCallback((page: number) => {
    if (navigateCallbackRef.current) {
      navigateCallbackRef.current(page);
    }
  }, []);

  const totalLessonPages = topics.reduce((acc, t) => acc + t.pages.length + t.exercisePages.length, 0);
  const totalPagesInBook = totalLessonPages + 3; // Portada, Sinopsis, Indice

  const goToNextTopic = useCallback(() => {
    // If we are in the special intro pages (0-1), go to the next individual intro page
    if (currentPage < 2) {
      handleNavigateToPage(currentPage + 1);
      return;
    }

    // If we are on the Index (2) or at the start of a topic, jump to the next section
    let offset = 3;
    for (let i = 0; i < topics.length; i++) {
      const topic = topics[i];
      const count = topic.pages.length + topic.exercisePages.length;

      // If we are currently "before" this topic's start, jump TO it
      if (currentPage < offset) {
        handleNavigateToPage(offset);
        return;
      }

      // If we are inside or at the start of this topic, jump to the NEXT topic's start
      if (currentPage >= offset && currentPage < offset + count) {
        const nextStart = offset + count;
        if (nextStart < totalPagesInBook) {
          handleNavigateToPage(nextStart);
        }
        return;
      }
      offset += count;
    }
  }, [currentPage, topics, handleNavigateToPage, totalPagesInBook]);

  const goToPrevTopic = useCallback(() => {
    if (currentPage === 0) return;

    // If we are at the very first lesson (index 3) or just after intro, go back to special pages one by one
    if (currentPage <= 3) {
      handleNavigateToPage(currentPage - 1);
      return;
    }

    let offset = 3;
    let prevTopicStart = 2; // Index page is at 2

    for (let i = 0; i < topics.length; i++) {
      const topic = topics[i];
      const count = topic.pages.length + topic.exercisePages.length;

      // If we are at the beginning of a topic, jump to the start of the previous one
      if (currentPage === offset) {
        handleNavigateToPage(prevTopicStart);
        return;
      }

      // If we are inside a topic but not at the very start, jump to its own start first
      if (currentPage > offset && currentPage < offset + count) {
        handleNavigateToPage(offset);
        return;
      }

      prevTopicStart = offset;
      offset += count;
    }

    // If we are past all topics (footer/end), go to the start of the last topic
    if (currentPage >= offset) {
      handleNavigateToPage(prevTopicStart);
    }
  }, [currentPage, topics, handleNavigateToPage]);

  return (
    <div className="flex-1 relative">
      <InfiniteBook
        topics={topics}
        onPageChange={handlePageChange}
        onNavigationRequest={handleNavigationRequest}
      />

      {/* Navigation Jump Buttons */}
      <div className={`fixed top-1/2 -translate-y-1/2 z-[100] pointer-events-none hidden md:block transition-all duration-300 ${isSidebarOpen ? 'left-80 ml-6' : 'left-6'}`}>
        <button
          onClick={goToPrevTopic}
          disabled={currentPage === 0}
          className={`p-4 rounded-full bg-white dark:bg-gray-800 border-2 border-primary/20 shadow-[0_10px_40px_rgba(126,34,206,0.3)] transition-all duration-500 pointer-events-auto ${currentPage === 0 ? 'opacity-0 scale-50' : 'opacity-100 scale-100 hover:scale-115 hover:border-primary/50 hover:shadow-[0_20px_60px_rgba(126,34,206,0.4)] hover:-translate-y-2 active:scale-95'}`}
          title="Lección Anterior"
        >
          <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <div className="fixed top-1/2 -translate-y-1/2 right-6 z-[100] pointer-events-none hidden md:block">
        <button
          onClick={goToNextTopic}
          disabled={currentPage >= totalPagesInBook - 1}
          className={`p-4 rounded-full bg-white dark:bg-gray-800 border-2 border-primary/20 shadow-[0_10px_40px_rgba(126,34,206,0.3)] transition-all duration-500 pointer-events-auto ${currentPage >= totalPagesInBook - 1 ? 'opacity-0 scale-50' : 'opacity-100 scale-100 hover:scale-115 hover:border-primary/50 hover:shadow-[0_20px_60px_rgba(126,34,206,0.4)] hover:-translate-y-2 active:scale-95'}`}
          title="Siguiente Lección"
        >
          <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {currentPage > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 w-full animate-in slide-in-from-bottom-5 duration-300">
          <ProgressNavigation
            topicId={currentTopicInfo?.topic.id}
            lessonPages={currentTopicInfo ? currentTopicInfo.topic.pages.length : 0}
            exercisePages={currentTopicInfo ? currentTopicInfo.topic.exercisePages.length : 0}
            currentPage={currentTopicInfo ? currentTopicInfo.relativePage : 0}
            completedPages={completedPages}
            completedModules={completedModules}
            onPageChange={(relativePage) => {
              // Convert relative page back to global page
              if (!currentTopicInfo) return;
              let globalOffset = 3;
              for (const t of topics) {
                if (t.id === currentTopicInfo.topic.id) {
                  handleNavigateToPage(globalOffset + relativePage - 1);
                  return;
                }
                globalOffset += (t.pages.length + t.exercisePages.length);
              }
            }}
          />
          {/* Global Page Indicator Overlay */}
          <div className="absolute top-[-30px] right-4 bg-black/50 text-white px-3 py-1 rounded-t-lg text-xs font-mono backdrop-blur-sm pointer-events-none">
            {currentPage < 3 ? (
              <span>LIBRO: {currentPage === 0 ? 'Portada' : currentPage === 2 ? 'Índice' : 'Introducción'}</span>
            ) : (
              <span>LIBRO: Pág. {currentPage - 2} / {totalLessonPages}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
