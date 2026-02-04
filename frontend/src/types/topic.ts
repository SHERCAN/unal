import { ComponentType } from 'react';

/**
 * Definición de una página individual dentro de un tema
 */
export interface PageDefinition {
    /** Componente React que renderiza la página */
    component: ComponentType<{ zoom?: number }>;
    /** ID único de la página para tracking y navegación */
    id: string;
    /** Título opcional de la página */
    title?: string;
}

/**
 * Configuración completa de un tema educativo
 */
export interface TopicConfig {
    /** ID único del tema (ej: 'division', 'suma') */
    id: string;
    /** Nombre para mostrar del tema */
    name: string;
    /** Ruta al ícono del tema */
    icon: string;
    /** Color principal del tema (hex o nombre de color) */
    color: string;
    /** Páginas de la lección (sección "LECCIÓN") */
    pages: PageDefinition[];
    /** Páginas de ejercicios (sección "EJERCICIOS") */
    exercisePages: PageDefinition[];
    /** Configuración de videos del tema */
    videos?: Record<string, string>;
    /** Descripción del tema */
    description?: string;
}

/**
 * Progreso de un usuario en un tema específico
 */
export interface TopicProgress {
    /** ID del tema */
    topicId: string;
    /** Páginas completadas (array de IDs de página) */
    completedPages: string[];
    /** Videos vistos (array de IDs de video) */
    watchedVideos: string[];
    /** Ejercicios completados (array de IDs de ejercicio) */
    completedExercises: string[];
    /** Módulos CPA completados (C, P, A) */
    completedModules: string[];
    /** Porcentaje de progreso total (0-100) */
    progressPercentage: number;
    /** Fecha de última actualización */
    lastUpdated?: Date;
}

/**
 * Props para componentes de página que usan zoom
 */
export interface PageProps {
    zoom?: number;
}
