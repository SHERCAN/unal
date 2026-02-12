'use client';
// Force rebuild

import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { TOPICS_DATA } from '@/lib/topicsList';
import { divisionConfig } from '@/topics/division/config';
import { divisionDemoConfig } from '@/topics/division_demo/config';
import { TopicConfig } from '@/types/topic';

const TOPIC_CONFIGS: Record<string, TopicConfig> = {
  'division': divisionConfig,
  'division-demo': divisionDemoConfig,
};
import { TopicDropdown } from '@/components/dashboard/TopicDropdown';
import { InfiniteBook } from '@/components/dashboard/InfiniteBook';
import { ProgressNavigation } from '@/components/navigation/ProgressNavigation';
import { UserProfile } from '@/components/dashboard/UserProfile';
import { ToastProvider } from '@/contexts/ToastContext';

export const dynamic = 'force-dynamic';

// Configuración de niveles basada en el archivo CSV
const LEVEL_THRESHOLDS = [
  { level: 1, min: 0, max: 100 },
  { level: 2, min: 100, max: 200 },
  { level: 3, min: 200, max: 300 },
  { level: 4, min: 300, max: 400 },
  { level: 5, min: 400, max: 500 },
  { level: 6, min: 500, max: 650 },
  { level: 7, min: 650, max: 800 },
  { level: 8, min: 800, max: 950 },
  { level: 9, min: 950, max: 1100 },
  { level: 10, min: 1100, max: 1300 },
  { level: 11, min: 1300, max: 1500 },
  { level: 12, min: 1500, max: 1750 },
  { level: 13, min: 1750, max: 2000 },
  { level: 14, min: 2000, max: 2250 },
  { level: 15, min: 2250, max: 2500 },
  { level: 16, min: 2500, max: 2750 },
  { level: 17, min: 2750, max: 3000 },
  { level: 18, min: 3000, max: 3300 },
  { level: 19, min: 3300, max: 3600 },
  { level: 20, min: 3600, max: 3900 },
  { level: 21, min: 3900, max: 4200 },
];

// Función para obtener información del nivel basado en puntos totales
function getLevelInfo(totalPoints: number) {
  // Encontrar el nivel actual
  let currentLevelData = LEVEL_THRESHOLDS[0];

  for (const levelData of LEVEL_THRESHOLDS) {
    if (totalPoints >= levelData.min && totalPoints < levelData.max) {
      currentLevelData = levelData;
      break;
    }
    // Si los puntos son >= al máximo del último nivel, usar el último nivel
    if (levelData.level === 21 && totalPoints >= levelData.min) {
      currentLevelData = levelData;
      break;
    }
  }

  // Calcular progreso dentro del nivel actual
  const pointsInLevel = totalPoints - currentLevelData.min;
  const levelRange = currentLevelData.max - currentLevelData.min;
  const progressPercentage = Math.min((pointsInLevel / levelRange) * 100, 100);

  // Calcular puntos necesarios para el siguiente nivel
  const pointsNeeded = currentLevelData.max - totalPoints;

  // Obtener el siguiente nivel
  const nextLevel = currentLevelData.level < 21 ? currentLevelData.level + 1 : 21;

  return {
    currentLevel: currentLevelData.level,
    nextLevel,
    progressPercentage,
    pointsNeeded: Math.max(pointsNeeded, 0),
    currentLevelMin: currentLevelData.min,
    currentLevelMax: currentLevelData.max,
  };
}

// Hook personalizado para animar el incremento de números
function useAnimatedCounter(targetValue: number, duration: number = 2000) {
  const [displayValue, setDisplayValue] = useState(0);
  const animationFrameRef = useRef<number | null>(null);
  const previousTargetRef = useRef(0);

  useEffect(() => {
    // Solo iniciar animación si el valor objetivo realmente cambió
    if (targetValue === previousTargetRef.current) {
      return;
    }

    const startValue = displayValue;
    const startTime = performance.now();
    previousTargetRef.current = targetValue;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Curva ease-in-out: empieza despacio, rápido en la mitad, termina despacio
      const easeInOut = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const currentValue = Math.floor(
        startValue + (targetValue - startValue) * easeInOut
      );

      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetValue);
      }
    };

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetValue]);

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
  nickname: string;
  nombre: string;
  avatar: string;
  puntos: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [ranking, setRanking] = useState<RankingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [completedPages, setCompletedPages] = useState<number[]>([]);
  const [navigateToPage, setNavigateToPage] = useState<((page: number) => void) | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [completedModules, setCompletedModules] = useState<string[]>([]);
  const [currentTopicConfig, setCurrentTopicConfig] = useState<TopicConfig>(divisionConfig);
  const nextLevelStarRef = useRef<HTMLDivElement>(null);

  // Estados para el perfil de usuario
  const [showProfile, setShowProfile] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
    const loadUserData = async () => {
      const token = localStorage.getItem('token');
      // Initial load from local storage for speed
      const localUserData = localStorage.getItem('user');

      if (!token) {
        router.push('/login');
        return;
      }

      if (localUserData) {
        const parsedUser = JSON.parse(localUserData);
        // Cargar avatar personalizado si existe
        const savedAvatar = localStorage.getItem('userAvatar');
        if (savedAvatar) {
          parsedUser.photoUrl = savedAvatar;
        }
        setUser(parsedUser);
      }

      // Always fetch fresh data from API to get latest points
      try {
        const response = await fetch('/api/users/profile', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const freshUser = await response.json();
          // Preserve locally saved avatar if exists and not in fresh data (or merge logic)
          const savedAvatar = localStorage.getItem('userAvatar');
          if (savedAvatar) freshUser.photoUrl = savedAvatar;

          setUser(freshUser);
          // Update local storage to keep it fresh
          localStorage.setItem('user', JSON.stringify(freshUser));
        }
      } catch (e) {
        console.error("Failed to refresh user data", e);
      }

      loadRanking();
      loadProgress(); // Load module progress
      setLoading(false);
    };

    const loadProgress = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          // Fetch completed progress modules (C, P, A)
          const progressRes = await fetch('/api/users/progress', {
            headers: { 'Authorization': `Bearer ${token}` }
          });

          // Fetch completed exercises
          const exercisesRes = await fetch('/api/users/exercises', {
            headers: { 'Authorization': `Bearer ${token}` }
          });

          let modules: string[] = [];

          if (progressRes.ok) {
            const progressModules = await progressRes.json();
            modules = [...progressModules];
          }

          if (exercisesRes.ok) {
            const completedExercises = await exercisesRes.json();
            // Add exercise IDs to completed modules array
            const exerciseIds = Object.keys(completedExercises).filter(
              id => completedExercises[id]?.completed
            );
            modules = [...modules, ...exerciseIds];
          }

          setCompletedModules(modules);
        }
      } catch (e) {
        console.error(e);
      }
    }

    loadUserData();

    // Listen for storage events to update points in real-time
    window.addEventListener('storage', loadUserData);
    return () => window.removeEventListener('storage', loadUserData);
  }, [router]);

  const loadRanking = async () => {
    try {
      const response = await axios.get('/api/users/ranking');
      setRanking(response.data);
    } catch (error) {
      console.error('Error al cargar ranking:', error);
      // Datos de ejemplo
      setRanking([
        { nickname: 'Luis', nombre: 'Luis', avatar: '👨', puntos: 625 },
        { nickname: 'Juan', nombre: 'Juan', avatar: '🧑', puntos: 525 },
        { nickname: 'Maria', nombre: 'Maria', avatar: '👩', puntos: 420 },
        { nickname: 'Carlos', nombre: 'Carlos', avatar: '👦', puntos: 300 },
        { nickname: 'Mariana', nombre: 'Mariana', avatar: '👧', puntos: 220 },
      ]);
    }
  };

  const handleLogout = () => {
    // Clear all user-related data from localStorage
    localStorage.removeItem('token');
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
      id: '', // No tenemos ID en RankingUser
      nickname: rankUser.nickname,
      nombre: rankUser.nombre,
      avatar: rankUser.avatar,
      puntos: rankUser.puntos,
      puntosDefinitivos: 0, // No tenemos esta info en RankingUser, podríamos asumirlo
    };
    setSelectedUser(userToShow);
    setShowProfile(true);
  };

  const handleBackToDashboard = () => {
    setShowProfile(false);
    setSelectedUser(null);
  };

  const handleSelectTopic = (topicId: string) => {
    const config = TOPIC_CONFIGS[topicId];
    if (config) {
      setCurrentTopicConfig(config);
      // Reset to page 1 when switching topics
      if (navigateToPage) {
        navigateToPage(1);
      }
    }
  };

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center text-text">Cargando...</div>;
  }

  // Mostrar perfil de usuario si está activo
  if (showProfile && selectedUser) {
    return (
      <UserProfile
        user={selectedUser}
        ranking={ranking}
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <ToastProvider>
      <div className="min-h-screen flex text-text transition-colors duration-300">

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
                    {user.photoUrl ? (
                      <img
                        src={user.photoUrl}
                        alt={user.nombre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>{user.avatar}</span>
                    )}
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 bg-green-500 w-6 h-6 rounded-full border-4 border-secondary"></div>
              </div>
              <div>
                <h2 className="text-2xl font-black text-text tracking-tight">
                  {user.nombre.split(' ')[0]}
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
                    <svg
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="50" cy="50" r="45" fill="#E95A53" />
                      <path
                        d="M50 25C36.19 25 25 36.19 25 50C25 63.81 36.19 75 50 75C63.81 75 75 63.81 75 50C75 36.19 63.81 25 50 25ZM50 66C41.16 66 34 58.84 34 50C34 41.16 41.16 34 50 34C58.84 34 66 41.16 66 50C66 58.84 58.84 66 50 66Z"
                        fill="#004655"
                      />
                      <circle cx="50" cy="50" r="11" fill="#D9D9D9" />
                      <circle cx="50" cy="50" r="4.5" fill="#004655" />
                      <path
                        d="M21.5 25.5L46 46M21.5 25.5L25 35L31 31L40.5 27.5L21.5 25.5ZM21.5 25.5L13.5 24L17 33L21.5 25.5Z"
                        stroke="#004655"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="#004655"
                      />
                    </svg>
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
                      <div className="relative w-12 h-12 flex items-center justify-center filter drop-shadow-md">
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
                        className="relative w-10 h-10 flex items-center justify-center opacity-80 filter drop-shadow-sm cursor-pointer transition-all duration-200 hover:opacity-100 hover:scale-110"
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

            {/* Ranking */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="font-bold text-[#7e22ce]">RANKING SEMANAL</span>
              </div>
              <div className="space-y-2">
                {ranking.slice(0, 5).map((rankUser, index) => (
                  <button
                    key={index}
                    onClick={() => handleRankingUserClick(rankUser)}
                    className="w-full flex items-center gap-3 p-2 rounded-xl bg-white/40 backdrop-blur-sm transition-colors hover:bg-white/60 cursor-pointer"
                  >
                    <span className="w-8 h-8 flex items-center justify-center font-black text-3xl text-[#7e22ce]">
                      {index + 1}
                    </span>
                    <span className="text-4xl filter drop-shadow-sm">{rankUser.avatar}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xl font-black text-[#1f2937] truncate tracking-tight">{rankUser.nombre}</p>
                    </div>
                    <span className="text-sm font-bold text-[#7e22ce] bg-[#7e22ce]/10 px-2 py-1 rounded-full whitespace-nowrap">{rankUser.puntos} XP</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* Contenido Principal */}
        <main className="flex-1 flex flex-col h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory scroll-pt-24">
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
                key={TOPICS_DATA.length} // Force re-render if topics change
                topics={TOPICS_DATA}
                onSelectTopic={handleSelectTopic}
                exerciseProgress={{
                  completed: completedPages.filter(p => p > 10).length, // Solo páginas de ejercicios (> 10)
                  total: 1 // Tenemos 1 página de ejercicios
                }}
                onNavigateToPage={navigateToPage || undefined}
              />
            </div>

            <div className="flex items-center gap-3 mr-16">
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-m font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
              >
                Salir (v2)
              </button>
            </div>
          </header>

          {/* Contenido Principal */}
          <InfiniteBookWrapper
            completedPages={completedPages}
            setCompletedPages={setCompletedPages}
            topicConfig={currentTopicConfig}
            setNavigateToPage={setNavigateToPage}
            completedModules={completedModules}
          />
        </main>
      </div>
    </ToastProvider>
  );
}

// Wrapper component to manage InfiniteBook and ProgressNavigation
function InfiniteBookWrapper({
  completedPages,
  setCompletedPages,
  topicConfig,
  setNavigateToPage,
  completedModules
}: {
  completedPages: number[];
  setCompletedPages: React.Dispatch<React.SetStateAction<number[]>>;
  topicConfig: TopicConfig;
  setNavigateToPage: React.Dispatch<React.SetStateAction<((page: number) => void) | null>>;
  completedModules: string[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const navigateCallbackRef = useRef<((page: number) => void) | null>(null);

  const handlePageChange = (page: number, completed: number[]) => {
    setCurrentPage(page);
    setCompletedPages(completed);
  };

  const handleNavigationRequest = (callback: (page: number) => void) => {
    navigateCallbackRef.current = callback;
    // Update parent state once without causing re-renders
    setNavigateToPage(() => callback);
  };

  const handleNavigateToPage = (page: number) => {
    if (navigateCallbackRef.current) {
      navigateCallbackRef.current(page);
    }
  };

  return (
    <div className="flex-1 relative">
      <InfiniteBook
        topicConfig={topicConfig}
        onPageChange={handlePageChange}
        onNavigationRequest={handleNavigationRequest}
      />

      {/* Progress Navigation Footer - Full width of main content */}
      <div className="sticky bottom-0 z-50 w-full">
        <ProgressNavigation
          lessonPages={topicConfig.pages.length}
          exercisePages={topicConfig.exercisePages.length}
          currentPage={currentPage}
          completedPages={completedPages}
          completedModules={completedModules}
          onPageChange={handleNavigateToPage}
        />
      </div>
    </div>
  );
}
