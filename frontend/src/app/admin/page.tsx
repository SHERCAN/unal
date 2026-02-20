'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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
    type: 'Video' | 'Ejercicio';
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
    const parts = id.split('-');
    if (parts.length > 1) {
        if (parts[0] === 'division') {
            if (parts[1] === 'concept') return 'División - Concepto';
            if (parts[1] === 'exercises') return 'División - Ejercicios';
            if (parts[1] === 'exacta') return 'División Exacta';
            if (parts[1] === 'game') return 'División - Juego';
        }
        if (parts[0] === 'fracciones') return 'Fracciones ' + parts.slice(1).join(' ');
        return parts[0].charAt(0).toUpperCase() + parts[0].slice(1) + ' ' + parts.slice(1).join(' ');
    }
    return id.charAt(0).toUpperCase() + id.slice(1);
};

const formatItemName = (id: string, type: 'Video' | 'Ejercicio') => {
    const parts = id.split('-');
    const nameStr = parts.slice(parts.length > 2 ? 2 : 1).join(' ');
    return `${type}: ${nameStr.charAt(0).toUpperCase() + nameStr.slice(1)}`;
};

const getUserModules = (user: User): GroupedModule[] => {
    const map: Record<string, GroupedModule> = {};

    user.watchedVideos?.forEach(v => {
        const mod = formatModuleName(v.videoId);
        if (!map[mod]) map[mod] = { moduleName: mod, totalFlex: 0, totalDef: 0, activities: [] };

        map[mod].totalFlex += 20;
        map[mod].activities.push({
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
        const mod = formatModuleName(ex.exerciseId);
        if (!map[mod]) map[mod] = { moduleName: mod, totalFlex: 0, totalDef: 0, activities: [] };

        const isGame = ex.exerciseId.includes('-game-');
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

        map[mod].totalFlex += f;
        map[mod].totalDef += d;

        map[mod].activities.push({
            id: ex.exerciseId,
            type: 'Ejercicio',
            name: formatItemName(ex.exerciseId, 'Ejercicio'),
            date: ex.updatedAt,
            flexPoints: f,
            defPoints: d,
            details: text
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

    const groupedModules = selectedUser ? getUserModules(selectedUser) : [];

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

        fetchUsers(token);
    }, []);

    const fetchUsers = async (token: string) => {
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
            const res = await fetch(`${apiUrl}/admin/data`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!res.ok) throw new Error('Error al cargar datos');

            const data = await res.json();
            setUsers(data);
        } catch (err) {
            console.error(err);
            setError('No se pudieron cargar los datos de los estudiantes.');
        } finally {
            setLoading(false);
        }
    };

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
                                                            {mod.activities.map((act, i) => (
                                                                <div key={i} className="bg-background p-4 rounded-xl border dark:border-gray-800 flex flex-col md:flex-row justify-between items-start md:items-center text-sm shadow-sm gap-2">
                                                                    <div>
                                                                        <p className="font-semibold text-base">{act.name}</p>
                                                                        <div className="flex items-center gap-2 mt-1">
                                                                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${act.type === 'Video' ? 'bg-blue-100 text-blue-800' : (act.details.includes('Aprobado') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800')}`}>
                                                                                {act.type}
                                                                            </span>
                                                                            <span className="text-text-secondary">{act.details}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right flex flex-col items-end">
                                                                        <p className="text-xs text-text-secondary mb-1">{new Date(act.date).toLocaleString()}</p>
                                                                        {(act.flexPoints > 0 || act.defPoints > 0) ? (
                                                                            <div className="flex space-x-2">
                                                                                {act.flexPoints > 0 && <span className="text-purple-700 dark:text-purple-400 font-bold">+{act.flexPoints} pts flex</span>}
                                                                                {act.defPoints > 0 && <span className="text-red-600 dark:text-red-400 font-bold">+{act.defPoints} pts def</span>}
                                                                            </div>
                                                                        ) : (
                                                                            <span className="text-gray-400 font-medium">0 pts asignados</span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            ))}
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
