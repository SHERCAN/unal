import { TopicConfig } from '@/types/topic';
import { ExercisePage } from './pages/ExercisePage';
import { ExplanationPage2 } from './pages/ExplanationPage2';
import { ConceptPage } from './pages/ConceptPage';
import { ProblemsPage } from './pages/ProblemsPage';
import { ExercisesPage } from './pages/ExercisesPage';

/**
 * Configuración del tema de División
 */
export const divisionDemoConfig: TopicConfig = {
    id: 'division-demo',
    name: 'División Demo',
    icon: '/division-icon.png',
    color: '#6b21a8', // purple-800
    description: 'Aprende sobre división, sus partes y cómo resolver problemas',

    // Páginas de la lección (sección "LECCIÓN")
    pages: [
        { component: ExercisePage, id: 'division-exercise', title: 'Ejercicio Práctico' },
        { component: ExplanationPage2, id: 'division-explanation-2', title: 'Notación' },
        { component: ConceptPage, id: 'division-concept', title: 'Conceptos' },
        { component: ProblemsPage, id: 'division-problems', title: 'Problemas' },
    ],

    // Páginas de ejercicios (sección "EJERCICIOS")
    exercisePages: [
        { component: ExercisesPage, id: 'division-exercises', title: 'Ejercicios de División' },
    ],

    // Configuración de videos del tema
    videos: {
        MODULE_DIVISION: 'division-main',
    }
};
