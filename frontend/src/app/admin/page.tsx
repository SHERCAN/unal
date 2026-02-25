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
}

interface ModuleActivity {
    id: string;
    type: 'Video' | 'Ejercicio' | 'Actividad' | 'Calificación';
    name: string;
    date: string;
    flexPoints: number;
    defPoints: number;
    details: string;
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

const formatItemName = (id: string, type: 'Video' | 'Ejercicio' | 'Actividad') => {
    const labelPrefix = type === 'Video' ? 'Video' : (type === 'Actividad' ? 'Actividad' : 'Ejercicio');

    // Standard Pattern: [topic]-pag[N]-(ej|v|act|game)[M]
    // Regex matches topic-pag13-ej2, div-inexacta-pag13-ej2, etc.
    const standardMatch = id.match(/-pag(\d+)-(?:ej|v|act|game|calc|prob|actividad|ejercicio)(\d+)/i);
    if (standardMatch) {
        const pag = standardMatch[1];
        const num = standardMatch[2];
        return `${labelPrefix}: Página ${pag} - ${labelPrefix} ${num}`;
    }

    // Older patterns or specific naming
    if (id.includes('calc')) {
        const numMatch = id.match(/calc\D*(\d+)/i);
        const n = numMatch ? parseInt(numMatch[1]) + 1 : '1';
        return `${labelPrefix}: Cálculo ${n}`;
    }

    if (id.includes('prob')) {
        const numMatch = id.match(/prob\D*(\d+)/i);
        const n = numMatch ? parseInt(numMatch[1]) + 1 : '1';
        return `${labelPrefix}: Problema ${n}`;
    }

    // Generic fallback: take the last part of the ID
    const parts = id.split('-');
    const lastPart = parts[parts.length - 1];

    // If it's something like "act1", "ej2", extract the number
    const techMatch = lastPart.match(/^(?:v|ej|game|calc|prob|act|interact|actividad|ejercicio)(\d+)$/i);
    if (techMatch) {
        return `${labelPrefix}: ${labelPrefix} ${techMatch[1]}`;
    }

    return `${labelPrefix}: ${lastPart.charAt(0).toUpperCase() + lastPart.slice(1).replace(/_/g, ' ')}`;
};

const getUserModules = (user: User): GroupedModule[] => {
    const map: Record<string, GroupedModule> = {};

    user.watchedVideos?.forEach(v => {
        const modName = formatModuleName(v.videoId);
        if (!map[modName]) map[modName] = { moduleName: modName, totalFlex: 0, totalDef: 0, activities: [] };

        map[modName].totalFlex += 20;
        map[modName].activities.push({
            id: v.videoId,
            type: 'Video',
            name: formatItemName(v.videoId, 'Video'),
            date: v.watchedAt || new Date().toISOString(),
            flexPoints: 20,
            defPoints: 0,
            details: 'Visto por primera vez (+20 flex)'
        });
    });

    user.exerciseAttempts?.forEach(ex => {
        const modName = formatModuleName(ex.exerciseId);
        if (!map[modName]) map[modName] = { moduleName: modName, totalFlex: 0, totalDef: 0, activities: [] };

        const isGame = ex.exerciseId.includes('-game-');
        const lowerId = ex.exerciseId.toLowerCase();

        // Categorización general
        let activityType: 'Ejercicio' | 'Actividad' = 'Actividad';

        // Criterios para Ejercicio (Práctica formal)
        if (lowerId.includes('calc') ||
            lowerId.includes('prob') ||
            lowerId.includes('ejercic') ||
            lowerId.includes('-ej') ||
            lowerId.includes('division-pag5-ej') ||
            lowerId.includes('division-pag6-ej') ||
            lowerId.includes('div-exacta-') ||
            lowerId.includes('div-inexacta-') ||
            lowerId.includes('frac-') ||
            lowerId.includes('comp-frac-') ||
            lowerId.includes('num-primo-')
        ) {
            activityType = 'Ejercicio';
        } else if (lowerId.includes('game') || lowerId.includes('act') || lowerId.includes('interact')) {
            activityType = 'Actividad';
        }
        // If it's an exercise attempt and not explicitly an 'Ejercicio' by the above rules,
        // and it contains 'act' or 'game', it's an 'Actividad'. Otherwise, default to 'Actividad'
        // if it's not clearly an 'Ejercicio'. The initial assignment to 'Actividad' handles the default.


        let f = 0, d = 0;
        let text = ex.completed ? 'Completado' : 'Intentado, sin pasar';

        if (ex.completed) {
            if (ex.attemptCount === 1) {
                f = isGame ? 20 : 50;
                d = isGame ? 20 : 50;
                text = 'Aprobado a la primera';
            } else if (ex.attemptCount === 2) {
                f = isGame ? 10 : 25;
                text = 'Aprobado en 2do intento';
            } else {
                f = isGame ? 5 : 10;
                text = `Aprobado en intento ${ex.attemptCount}`;
            }
        }

        map[modName].totalFlex += f;
        map[modName].totalDef += d;

        map[modName].activities.push({
            id: ex.exerciseId,
            type: activityType,
            name: formatItemName(ex.exerciseId, activityType),
            date: ex.updatedAt,
            flexPoints: f,
            defPoints: d,
            details: text
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

    const groupedModules = selectedUser ? getUserModules(selectedUser) : [];

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
                    <button
                        onClick={() => {
                            localStorage.removeItem('token');
                            localStorage.removeItem('user');
                            router.push('/login');
                        }}
                        className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors font-bold shadow"
                    >
                        Cerrar Sesión
                    </button>
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
                                    className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${selectedUser?.id === user.id ? 'border-primary bg-primary/10' : 'border-transparent bg-background hover:border-primary/50'}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg">{user.nombre}</h3>
                                            <p className="text-sm text-text-secondary">@{user.nickname}</p>
                                        </div>
                                        <div className="text-right">
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
                                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-4xl shadow-inner">
                                            {selectedUser.avatar}
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

                                {/* Historial de Ejercicios y Lecciones Plegables */}
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
                                                            <span className="text-sm font-bold bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 px-2 py-1 rounded"> +{mod.totalFlex} flex </span>
                                                            <span className="text-sm font-bold bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 px-2 py-1 rounded"> +{mod.totalDef} def </span>
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
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="text-right flex flex-col items-end">
                                                                                            <p className="text-xs text-text-secondary mb-1">{new Date(act.date).toLocaleString()}</p>
                                                                                            {(act.flexPoints > 0 || act.defPoints > 0) ? (
                                                                                                <div className="flex space-x-2 text-xs">
                                                                                                    {act.flexPoints > 0 && <span className="text-purple-700 dark:text-purple-400 font-bold">+{act.flexPoints} pts flex</span>}
                                                                                                    {act.defPoints > 0 && <span className="text-red-600 dark:text-red-400 font-bold">+{act.defPoints} pts def</span>}
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

                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center text-center text-text-secondary">
                                <p className="text-xl">Seleccione un estudiante de la lista para ver sus detalles, puntajes y respuestas.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
