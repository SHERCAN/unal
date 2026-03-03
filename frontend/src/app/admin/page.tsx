'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { io, Socket } from 'socket.io-client';

interface User {
    id: string;
    nickname: string;
    nombre: string;
    edad: number;
    grado: string;
    avatar?: string | null;
    photoUrl?: string | null;
    puntos: number;
    puntosDefinitivos: number;
    createdAt: string;
    progreso: any[];
    watchedVideos: any[];
    exerciseAttempts: any[];
    pageRatings: any[];
    sessions: any[];
}

interface ModuleActivity {
    id: string;
    type: 'Video' | 'Ejercicio' | 'Actividad' | 'Calificación';
    name: string;
    date: string;
    flexPoints: number;
    defPoints: number;
    details: string;
    moduloType?: 'A' | 'B';
}

interface GroupedModule {
    moduleName: string;
    totalFlex: number;
    totalDef: number;
    activities: ModuleActivity[];
}

const formatModuleName = (id: string) => {
    const lowerId = id.toLowerCase().replace(/_/g, '-');

    // Explicit mappings for common prefixes used in different pages
    if (lowerId.includes('shared')) return 'LIBRO - GENERAL';
    if (lowerId.includes('division-exacta') || lowerId.includes('div-exacta')) return 'DIVISIÓN EXACTA';
    if (lowerId.includes('division-inexacta') || lowerId.includes('div-inexacta')) return 'DIVISIÓN INEXACTA';
    if (lowerId.includes('division')) return 'DIVISIÓN'; // Catch general division topic

    if (lowerId.includes('numeros-primos') || lowerId.includes('num-primos')) return 'NÚMEROS PRIMOS';

    if (lowerId.includes('comparacion-fracciones') || lowerId.includes('comp-frac')) return 'COMPARACIÓN DE FRACCIONES';
    if (lowerId.includes('fracciones-equivalentes') || lowerId.includes('frac-equiv')) return 'FRACCIONES EQUIVALENTES';
    if (lowerId.includes('fracciones') || lowerId.includes('frac-')) return 'FRACCIONES';

    // Fallback: cleaning up the ID and capitalizing
    const parts = lowerId.split('-');
    const label = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    // If it was just "div", "frac", etc. try to recover some sense
    if (label.length <= 4) return label.toUpperCase();
    return label;
};

// Extraer el número de página de un ID
const extractPageNumber = (id: string): string | null => {
    const pagMatch = id.match(/-pag(\d+)-/i);
    return pagMatch ? pagMatch[1] : null;
};

// Extraer un "sort key" para ordenar actividades dentro de una misma página
const extractSortKey = (id: string): string => {
    const pagMatch = id.match(/-pag\d+-(.+)$/i);
    if (!pagMatch) return id;
    return pagMatch[1];
};

// Generar nombre con formato: "Tipo: Página X1 - Tipo X2"
const buildItemName = (type: 'Video' | 'Ejercicio' | 'Actividad', pageNum: string, seqNum: number): string => {
    const labelPrefix = type === 'Video' ? 'Video' : (type === 'Actividad' ? 'Actividad' : 'Ejercicio');
    return `${labelPrefix}: Página ${pageNum} - ${labelPrefix} ${seqNum}`;
};

// Asignar nombres secuenciales a las actividades de un módulo
const assignSequentialNames = (activities: ModuleActivity[]): void => {
    // Agrupar por (página + tipo)
    const groups: Record<string, ModuleActivity[]> = {};
    activities.forEach(act => {
        const pag = extractPageNumber(act.id);
        if (!pag) return; // IDs sin página mantienen su nombre
        const key = `${pag}-${act.type}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(act);
    });

    // Para cada grupo, ordenar y asignar números secuenciales
    Object.entries(groups).forEach(([key, items]) => {
        const [pag, type] = [key.split('-')[0], key.substring(key.indexOf('-') + 1) as 'Video' | 'Ejercicio' | 'Actividad'];
        // Ordenar por el sufijo del ID para mantener orden consistente
        items.sort((a, b) => extractSortKey(a.id).localeCompare(extractSortKey(b.id)));
        items.forEach((item, index) => {
            item.name = buildItemName(type, pag, index + 1);
        });
    });
};

const getUserModules = (user: User): GroupedModule[] => {
    const map: Record<string, GroupedModule> = {};

    user.watchedVideos?.forEach(v => {
        const modName = formatModuleName(v.videoId);
        if (!map[modName]) map[modName] = { moduleName: modName, totalFlex: 0, totalDef: 0, activities: [] };

        map[modName].totalFlex += 10;
        map[modName].activities.push({
            id: v.videoId,
            type: 'Video',
            name: '', // Se asigna después con assignSequentialNames
            date: v.watchedAt || new Date().toISOString(),
            flexPoints: 10,
            defPoints: 0,
            details: 'Visto por primera vez (+10 flex)'
        });
    });

    user.exerciseAttempts?.forEach(ex => {
        const modName = formatModuleName(ex.exerciseId);
        if (!map[modName]) map[modName] = { moduleName: modName, totalFlex: 0, totalDef: 0, activities: [] };

        const lowerId = ex.exerciseId.toLowerCase();

        // Heurística de Categorización Mejorada basada en mapeo de páginas
        // Lecciones/CPA: 1-4, 7-9, 11-12, 14-15, 17-20, 22-26, 29-30
        // Ejercicios Formales: 5-6, 10, 13, 16, 21, 27-28, 31
        const isCPA = lowerId.includes('game') ||
            lowerId.includes('cpa') ||
            lowerId.includes('interact') ||
            lowerId.includes('completar') ||
            lowerId.includes('juego') ||
            lowerId.includes('-pag1-') ||
            lowerId.includes('-pag2-') ||
            lowerId.includes('-pag3-') ||
            lowerId.includes('-pag4-') || // Division CPA
            lowerId.includes('-pag7-') || // Exacta CPA
            lowerId.includes('-pag8-') ||
            lowerId.includes('-pag9-') ||
            lowerId.includes('-pag11-') || // Inexacta CPA
            lowerId.includes('-pag12-') ||
            lowerId.includes('-pag14-') || // Primos CPA
            lowerId.includes('-pag15-') ||
            lowerId.includes('-pag17-') || // Fracciones CPA
            lowerId.includes('-pag18-') ||
            lowerId.includes('-pag19-') ||
            lowerId.includes('-pag20-') ||
            lowerId.includes('-pag22-') || // Equiv CPA
            lowerId.includes('-pag23-') ||
            lowerId.includes('-pag24-') ||
            lowerId.includes('-pag25-') ||
            lowerId.includes('-pag26-') ||
            lowerId.includes('-pag29-') || // Comp CPA
            lowerId.includes('-pag30-') ||
            ex.type === 'juego_cpa' ||
            ex.type === 'completar_c' ||
            ex.type === 'completar_p' ||
            ex.type === 'completar_a';

        const isFormalExercise = lowerId.includes('calc') ||
            lowerId.includes('prob') ||
            lowerId.includes('ejercici') ||
            lowerId.includes('modulo_a') ||
            lowerId.includes('modulo_b') ||
            lowerId.includes('pag5-') || // Exercises Division
            lowerId.includes('pag6-') ||
            lowerId.includes('pag10-') || // Exercises Exacta
            lowerId.includes('pag13-') || // Exercises Inexacta
            lowerId.includes('pag16-') || // Exercises Primos
            lowerId.includes('pag21-') || // Exercises Fracciones
            lowerId.includes('pag27-') || // Exercises Equiv
            lowerId.includes('pag28-') ||
            lowerId.includes('pag31-') ||
            ex.type === 'modulo_a' ||
            ex.type === 'modulo_b';

        let activityType: 'Ejercicio' | 'Actividad';
        if (isCPA) {
            activityType = 'Actividad';
        } else if (isFormalExercise) {
            activityType = 'Ejercicio';
        } else if (lowerId.includes('-ej')) {
            activityType = 'Ejercicio';
        } else {
            activityType = 'Actividad'; // Default
        }


        let f = 0, d = 0;
        let text = ex.completed ? 'Completado' : 'Intentado, sin pasar';

        const is20PtType = isCPA || lowerId.includes('modulo_b') || ex.type === 'modulo_b' || ex.type?.includes('juego') || ex.type?.includes('completar');

        if (ex.completed) {
            if (ex.attemptCount === 1) {
                f = is20PtType ? 20 : 50;
                d = is20PtType ? 20 : 50;
                text = 'Aprobado a la primera';
            } else if (ex.attemptCount === 2) {
                f = is20PtType ? 10 : 25;
                text = 'Aprobado al segundo intento';
            } else {
                f = is20PtType ? 5 : 10;
                text = `Aprobado al intento ${ex.attemptCount}`;
            }
        }

        map[modName].totalFlex += f;
        map[modName].totalDef += d;

        map[modName].activities.push({
            id: ex.exerciseId,
            type: activityType,
            name: '', // Se asigna después con assignSequentialNames
            date: ex.updatedAt,
            flexPoints: f,
            defPoints: d,
            details: text,
            moduloType: is20PtType ? 'B' : 'A'
        });
    });

    user.pageRatings?.forEach(pr => {
        const modName = formatModuleName(pr.pageId);
        if (!map[modName]) map[modName] = { moduleName: modName, totalFlex: 0, totalDef: 0, activities: [] };

        // Standard Pattern: [topic]-pag[N] or older known IDs
        const pagMatch = pr.pageId.match(/-pag(\d+)/i);
        let pagName = pagMatch ? `Calificación: Página ${pagMatch[1]}` : `Calificación: ${pr.pageId}`;

        // Manual mapping for transitions or special IDs
        if (!pagMatch) {
            if (pr.pageId === 'division-distribution') pagName = 'Calificación: Página 8';
            else if (pr.pageId === 'division-concept') pagName = 'Calificación: Página 9';
            else if (pr.pageId === 'division-concept-new') pagName = 'Calificación: Página 9';
            else if (pr.pageId === 'division-concept-2') pagName = 'Calificación: Página 10';
            else if (pr.pageId === 'division-concept-3') pagName = 'Calificación: Página 11';
            else if (pr.pageId === 'division-exercises') pagName = 'Calificación: Página 12';
            else if (pr.pageId === 'division-exercises-old') pagName = 'Calificación: Página 12';
            else if (pr.pageId === 'division-exercises-2') pagName = 'Calificación: Página 13';
        }

        map[modName].activities.push({
            id: pr.pageId,
            type: 'Calificación' as any,
            name: pagName,
            date: pr.createdAt,
            flexPoints: 0,
            defPoints: 0,
            details: pr.rating === 3 ? '¡Le gustó! (Bueno)' : (pr.rating === 2 ? 'Regular' : 'No le gustó (Malo)')
        });
    });

    return Object.values(map)
        .map(m => {
            // Asignar nombres secuenciales por (página + tipo)
            assignSequentialNames(m.activities);
            // Fallback para items sin nombre (IDs sin -pag[N]-)
            m.activities.forEach(act => {
                if (!act.name) {
                    const labelPrefix = act.type === 'Video' ? 'Video' : (act.type === 'Actividad' ? 'Actividad' : act.type);
                    const parts = act.id.split('-');
                    const lastPart = parts[parts.length - 1];
                    act.name = `${labelPrefix}: ${lastPart.charAt(0).toUpperCase() + lastPart.slice(1).replace(/_/g, ' ')}`;
                }
            });
            m.activities.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            return m;
        })
        .sort((a, b) => a.moduleName.localeCompare(b.moduleName));
};

export default function AdminDashboard() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [expandedModule, setExpandedModule] = useState<string | null>(null);
    const [expandedSubModule, setExpandedSubModule] = useState<string | null>(null);
    const [authToken, setAuthToken] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<'lessons' | 'sessions'>('lessons');
    const [allowRegistration, setAllowRegistration] = useState<boolean>(true);
    const [updatingSetting, setUpdatingSetting] = useState(false);

    const groupedModules = selectedUser ? getUserModules(selectedUser) : [];

    const fetchSettings = useCallback(async () => {
        try {
            const res = await fetch('/api/settings/allow_registration');
            if (res.ok) {
                const data = await res.json();
                setAllowRegistration(data.value === 'true');
            }
        } catch (err) {
            console.error('Error fetching settings:', err);
        }
    }, []);

    const toggleRegistration = async () => {
        setUpdatingSetting(true);
        try {
            const newValue = !allowRegistration;
            const res = await fetch('/api/settings/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ key: 'allow_registration', value: newValue.toString() })
            });
            if (res.ok) {
                setAllowRegistration(newValue);
            }
        } catch (err) {
            console.error('Error updating setting:', err);
        } finally {
            setUpdatingSetting(false);
        }
    };

    const fetchUsers = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            console.log('🔄 Fetching users data...');
            const res = await fetch(`/api/admin/data`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!res.ok) throw new Error('Error al cargar datos');

            const data = await res.json();
            setUsers([...data]); // New array reference

            // Re-sync selected user's data to trigger re-renders
            setSelectedUser(prev => {
                if (!prev) return null;
                const updated = data.find((u: User) => u.id === prev.id);
                if (updated) {
                    console.log(`✅ Data updated for selected user: ${updated.nombre}`);
                    return { ...updated }; // New object reference
                }
                return prev;
            });
        } catch (err) {
            console.error(err);
            setError('No se pudieron cargar los datos de los estudiantes.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!userStr || !token) {
            router.push('/login');
            return;
        }

        const user = JSON.parse(userStr);
        if (user.role !== 'ADMIN') {
            router.push('/dashboard');
            return;
        }

        setAuthToken(token);
        fetchUsers();
    }, [fetchUsers, router]);

    useEffect(() => {
        const socketUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
            ? 'http://localhost:4000'
            : window.location.origin.replace(':3000', ':4000');

        console.log('📡 Admin Panel: Connecting to real-time updates at', socketUrl);
        const socket = io(socketUrl, {
            transports: ['websocket', 'polling'],
            reconnectionAttempts: 5
        });

        socket.on('connect', () => {
            console.log('✅ Real-time updates active');
        });

        socket.on('progressUpdate', (data) => {
            console.log('⚡ Change detected in student progress, refreshing data...', data);
            fetchUsers();
        });

        socket.on('connect_error', (err) => {
            console.warn('❌ Socket connection error:', err.message);
        });

        return () => {
            socket.disconnect();
            console.log('🔌 Socket disconnected');
        };
    }, [fetchUsers]);

    if (loading) {
        return (
            <div className="min-h-screen p-8 flex justify-center items-center">
                <p className="text-2xl text-primary font-bold animate-pulse">Cargando panel de administrador...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen p-8 flex justify-center items-center">
                <p className="text-xl text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-8 bg-background text-text">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl font-bold text-primary">Panel de Administrador</h1>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-background-secondary p-2 px-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                            <span className="text-sm font-bold text-text-secondary">Permitir nuevos registros:</span>
                            <button
                                onClick={toggleRegistration}
                                disabled={updatingSetting}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${allowRegistration ? 'bg-primary' : 'bg-gray-300'} ${updatingSetting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                                <span
                                    className={`${allowRegistration ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                />
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                localStorage.removeItem('sessionId');
                                localStorage.removeItem('user');
                                router.push('/login');
                            }}
                            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors font-bold shadow"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Lista de estudiantes */}
                    <div className="lg:col-span-1 bg-background-secondary rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 h-[80vh] overflow-y-auto">
                        <h2 className="text-2xl font-semibold mb-6 text-text">Estudiantes ({users.length})</h2>

                        <div className="space-y-4">
                            {users.map((user) => (
                                <div
                                    key={user.id}
                                    onClick={() => setSelectedUser(user)}
                                    className={`p-4 rounded-xl cursor-pointer transition-all border-2 flex items-center gap-4 ${selectedUser?.id === user.id ? 'border-primary bg-primary/10' : 'border-transparent bg-background hover:border-primary/50'}`}
                                >
                                    {/* Avatar del estudiante en la lista */}
                                    <div className="w-12 h-12 rounded-full flex-shrink-0 overflow-hidden bg-primary/10 flex items-center justify-center border border-gray-100 dark:border-gray-800">
                                        {user.photoUrl ? (
                                            <img src={user.photoUrl} alt={user.nombre} className="w-full h-full object-cover" />
                                        ) : user.avatar ? (
                                            user.avatar.startsWith('/') ? (
                                                <img src={user.avatar} alt={user.nombre} className="w-full h-full object-cover" />
                                            ) : (
                                                <span className="text-xl">{user.avatar}</span>
                                            )
                                        ) : (
                                            <span className="text-lg font-bold text-primary">{user.nombre.charAt(0)}</span>
                                        )}
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between items-start min-w-0">
                                        <div className="w-full flex justify-between items-start">
                                            <div className="truncate">
                                                <h3 className="font-bold text-lg truncate">{user.nombre}</h3>
                                                <p className="text-sm text-text-secondary truncate">@{user.nickname}</p>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                                                    {user.puntos + user.puntosDefinitivos} pts
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-2 flex space-x-2 text-xs text-text-secondary">
                                            <span>Grado: {user.grado}</span>
                                            <span>Edad: {user.edad}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Detalles del estudiante seleccionado */}
                    <div className="lg:col-span-2 bg-background-secondary rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 h-[80vh] overflow-y-auto">
                        {selectedUser ? (
                            <div className="space-y-8 animate-fadeIn">
                                <div className="flex items-center space-x-4 border-b pb-4 dark:border-gray-700">
                                    {selectedUser.photoUrl ? (
                                        <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary">
                                            <img src={selectedUser.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
                                        </div>
                                    ) : selectedUser.avatar ? (
                                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-4xl shadow-inner overflow-hidden">
                                            {selectedUser.avatar.startsWith('/') ? (
                                                <img src={selectedUser.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                            ) : (
                                                selectedUser.avatar
                                            )}
                                        </div>
                                    ) : (
                                        <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold font-sans">
                                            {selectedUser.nombre.charAt(0)}
                                        </div>
                                    )}
                                    <div>
                                        <h2 className="text-3xl font-bold text-text">{selectedUser.nombre}</h2>
                                        <p className="text-lg text-text-secondary">@{selectedUser.nickname} • Se unió {new Date(selectedUser.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                    <div className="bg-background rounded-xl p-4 text-center border dark:border-gray-700">
                                        <p className="text-sm text-text-secondary uppercase">Puntos definitivos</p>
                                        <p className="text-2xl font-bold text-primary">{selectedUser.puntosDefinitivos}</p>
                                    </div>
                                    <div className="bg-background rounded-xl p-4 text-center border dark:border-gray-700">
                                        <p className="text-sm text-text-secondary uppercase">Puntaje</p>
                                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{selectedUser.puntos}</p>
                                    </div>
                                    <div className="bg-background rounded-xl p-4 text-center border dark:border-gray-700">
                                        <p className="text-sm text-text-secondary uppercase">Ejercicios</p>
                                        <p className="text-2xl font-bold text-green-500">{selectedUser.exerciseAttempts.length}</p>
                                    </div>
                                    <div className="bg-background rounded-xl p-4 text-center border dark:border-gray-700">
                                        <p className="text-sm text-text-secondary uppercase">Videos</p>
                                        <p className="text-2xl font-bold text-blue-500">{selectedUser.watchedVideos.length}</p>
                                    </div>
                                </div>

                                {/* Selector de Vista */}
                                <div className="flex border-b dark:border-gray-700">
                                    <button
                                        onClick={() => setViewMode('lessons')}
                                        className={`px-6 py-3 font-bold transition-all border-b-2 ${viewMode === 'lessons' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text'}`}
                                    >
                                        📚 Lecciones y Progreso
                                    </button>
                                    <button
                                        onClick={() => setViewMode('sessions')}
                                        className={`px-6 py-3 font-bold transition-all border-b-2 ${viewMode === 'sessions' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text'}`}
                                    >
                                        🕒 Historial de Sesiones
                                    </button>
                                </div>

                                {viewMode === 'lessons' ? (
                                    <div>
                                        <h3 className="text-2xl font-bold mb-4 text-text border-b pb-2 dark:border-gray-700">Historial Detallado por Lección</h3>
                                        {groupedModules.length > 0 ? (
                                            <div className="space-y-4">
                                                {groupedModules.map(mod => (
                                                    <div key={mod.moduleName} className="bg-background rounded-xl border dark:border-gray-700 overflow-hidden shadow-sm">
                                                        <button
                                                            onClick={() => setExpandedModule(expandedModule === mod.moduleName ? null : mod.moduleName)}
                                                            className="w-full text-left p-4 flex justify-between items-center hover:bg-background-secondary transition-colors"
                                                        >
                                                            <span className="font-bold text-lg">{mod.moduleName}</span>
                                                            <div className="flex items-center space-x-3">
                                                                <span className="text-sm font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-3 py-1 rounded-full">
                                                                    {mod.activities.length} Interacciones
                                                                </span>
                                                                <span className="text-sm font-bold bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 px-2 py-1 rounded"> +{mod.totalFlex} pts </span>
                                                                <span className="text-sm font-bold bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 px-2 py-1 rounded"> +{mod.totalDef} pts definitivos </span>
                                                                <svg className={`w-5 h-5 transition-transform ${expandedModule === mod.moduleName ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                </svg>
                                                            </div>
                                                        </button>
                                                        {expandedModule === mod.moduleName && (
                                                            <div className="p-4 bg-background-secondary/40 border-t dark:border-gray-700 space-y-3">
                                                                {[
                                                                    { label: 'Videos', type: 'Video' },
                                                                    { label: 'Actividad interactiva', type: 'Actividad' },
                                                                    { label: 'Ejercicio', type: 'Ejercicio' },
                                                                    { label: 'Calificaciones de página', type: 'Calificación' }
                                                                ].map(category => {
                                                                    const categoryActivities = mod.activities.filter(act => act.type === (category.type as any));

                                                                    if (categoryActivities.length === 0) return null;

                                                                    const isSubExpanded = expandedSubModule === `${mod.moduleName}-${category.type}`;

                                                                    return (
                                                                        <div key={category.type} className="bg-background rounded-xl border dark:border-gray-800 overflow-hidden shadow-sm">
                                                                            <button
                                                                                onClick={() => setExpandedSubModule(isSubExpanded ? null : `${mod.moduleName}-${category.type}`)}
                                                                                className="w-full text-left p-3 flex justify-between items-center hover:bg-background-secondary transition-colors"
                                                                            >
                                                                                <span className="font-semibold text-md">{category.label}</span>
                                                                                <div className="flex items-center space-x-3">
                                                                                    <span className="text-xs font-semibold bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 px-2 py-1 rounded-full">
                                                                                        {categoryActivities.length} items
                                                                                    </span>
                                                                                    <svg className={`w-4 h-4 transition-transform ${isSubExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                                                    </svg>
                                                                                </div>
                                                                            </button>
                                                                            {isSubExpanded && (
                                                                                <div className="p-3 bg-background-secondary/20 border-t dark:border-gray-800 space-y-2">
                                                                                    {categoryActivities.map((act, i) => (
                                                                                        <div key={i} className="bg-background p-3 rounded-lg border dark:border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center text-sm shadow-sm gap-2">
                                                                                            <div>
                                                                                                <p className="font-medium text-sm">{act.name}</p>
                                                                                                <div className="flex items-center gap-2 mt-1">
                                                                                                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${act.type === 'Video' ? 'bg-blue-100 text-blue-800' :
                                                                                                        (act.type === 'Actividad' ? 'bg-purple-100 text-purple-800' :
                                                                                                            (act.type === 'Ejercicio' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'))
                                                                                                        }`}>
                                                                                                        {act.type === 'Calificación' ? (
                                                                                                            <span className="flex items-center gap-1">
                                                                                                                {act.details.includes('Bueno') ? '🤩' : (act.details.includes('Malo') ? '☹️' : '😐')}
                                                                                                                Página
                                                                                                            </span>
                                                                                                        ) : (act.type === 'Actividad' ? 'Actividad' : act.type)}
                                                                                                    </span>
                                                                                                    <span className="text-text-secondary text-xs">{act.details}</span>
                                                                                                    {act.moduloType && (
                                                                                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ml-2 ${act.moduloType === 'B' ? 'bg-orange-500/10 text-orange-600 border border-orange-200' : 'bg-blue-500/10 text-blue-600 border border-blue-200'}`}>
                                                                                                            {act.moduloType === 'B' ? 'Módulo B' : 'Módulo A'}
                                                                                                        </span>
                                                                                                    )}

                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="text-right flex flex-col items-end">
                                                                                                <p className="text-xs text-text-secondary mb-1">{new Date(act.date).toLocaleString()}</p>
                                                                                                {(act.flexPoints > 0 || act.defPoints > 0) ? (
                                                                                                    <div className="flex space-x-2 text-xs">
                                                                                                        {act.flexPoints > 0 && <span className="text-purple-700 dark:text-purple-400 font-bold">+{act.flexPoints} pts</span>}
                                                                                                        {act.defPoints > 0 && <span className="text-red-600 dark:text-red-400 font-bold">+{act.defPoints} pts definitivos</span>}
                                                                                                    </div>
                                                                                                ) : act.type !== 'Calificación' && (
                                                                                                    <span className="text-gray-400 font-medium text-xs">0 pts asignados</span>
                                                                                                )}
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-text-secondary italic">No se ha registrado actividad reciente.</p>
                                        )}
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-2xl font-bold text-text">Historial de Conexión</h3>
                                            <p className="text-sm text-text-secondary">{selectedUser.sessions?.length || 0} sesiones registradas</p>
                                        </div>

                                        {selectedUser.sessions && selectedUser.sessions.length > 0 ? (
                                            <div className="overflow-x-auto rounded-xl border dark:border-gray-700">
                                                <table className="w-full text-left bg-background">
                                                    <thead className="bg-background-secondary text-text-secondary text-sm uppercase">
                                                        <tr>
                                                            <th className="px-4 py-3">Ingreso</th>
                                                            <th className="px-4 py-3">Permanencia</th>
                                                            <th className="px-4 py-3">Cierre / Última Actividad</th>
                                                            <th className="px-4 py-3">Estado</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y dark:divide-gray-700">
                                                        {selectedUser.sessions.map((session: any) => {
                                                            const start = new Date(session.startTime);
                                                            const end = session.endTime ? new Date(session.endTime) : null;
                                                            const last = new Date(session.lastActive);

                                                            // Calcular duración
                                                            const durationMs = (end || last).getTime() - start.getTime();
                                                            const minutes = Math.floor(durationMs / 60000);
                                                            const hours = Math.floor(minutes / 60);
                                                            const displayMinutes = minutes % 60;
                                                            const displayDuration = hours > 0 ? `${hours}h ${displayMinutes}m` : `${displayMinutes}m`;

                                                            const isActive = !session.endTime && (Date.now() - last.getTime()) < 5 * 60 * 1000;

                                                            return (
                                                                <tr key={session.id} className="hover:bg-background-secondary/30 transition-colors">
                                                                    <td className="px-4 py-4">
                                                                        <div className="font-medium">{start.toLocaleDateString()}</div>
                                                                        <div className="text-xs text-text-secondary">{start.toLocaleTimeString()}</div>
                                                                    </td>
                                                                    <td className="px-4 py-4">
                                                                        <span className="font-bold text-primary">{displayDuration}</span>
                                                                    </td>
                                                                    <td className="px-4 py-4 text-sm">
                                                                        {end ? (
                                                                            <div>
                                                                                <div>{end.toLocaleTimeString()}</div>
                                                                                <div className="text-[10px] text-gray-400">Cierre Manual</div>
                                                                            </div>
                                                                        ) : (
                                                                            <div>
                                                                                <div>{last.toLocaleTimeString()}</div>
                                                                                <div className="text-[10px] text-orange-400">Inactividad</div>
                                                                            </div>
                                                                        )}
                                                                    </td>
                                                                    <td className="px-4 py-4">
                                                                        {isActive ? (
                                                                            <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full animate-pulse">ACTIVO</span>
                                                                        ) : (
                                                                            <span className="px-2 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-full">FINALIZADO</span>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        ) : (
                                            <div className="bg-background rounded-xl p-8 text-center border dark:border-gray-700 italic text-text-secondary">
                                                No hay registros de sesiones para este estudiante.
                                            </div>
                                        )}
                                    </div>
                                )}

                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center text-center text-text-secondary">
                                <p className="text-xl">Seleccione un estudiante de la lista para ver sus detalles, puntajes y respuestas.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}
