import { TopicConfig } from '@/types/topic';
import dynamic from 'next/dynamic';

const DistributionExercisePage = dynamic(() => import('./pages/DistributionExercisePage').then(m => m.DistributionExercisePage));
const ConceptPage = dynamic(() => import('./pages/ConceptPage').then(m => m.ConceptPage));
const ConceptPage2 = dynamic(() => import('./pages/ConceptPage2').then(m => m.ConceptPage2));
const ConceptPage3 = dynamic(() => import('./pages/ConceptPage3').then(m => m.ConceptPage3));
const ExercisesPage = dynamic(() => import('./pages/ExercisesPage').then(m => m.ExercisesPage));
const ExercisesPage2 = dynamic(() => import('./pages/ExercisesPage2').then(m => m.ExercisesPage2));

export const divisionConfig: TopicConfig = {
    id: 'division',
    name: 'División',
    icon: '/division-icon.png',
    color: '#6b21a8',
    description: 'Aprende sobre división',
    // Páginas de la lección (sección "LECCIÓN")
    pages: [
        { component: DistributionExercisePage, id: 'division-distribution-exercise', title: 'Concreto y pictórico' },
        { component: ConceptPage, id: 'concept', title: 'Explicación teórica' },
        { component: ConceptPage2, id: 'concept-2', title: 'Ejemplos y partes de la división' },
        { component: ConceptPage3, id: 'concept-3', title: 'Problemas con división' },
    ],
    // Páginas de ejercicios (sección "EJERCICIOS")
    exercisePages: [
        { component: ExercisesPage, id: 'exercises', title: 'Ejercicios' },
        { component: ExercisesPage2, id: 'exercises-2', title: 'Ejercicios 2' },
    ],
    // Configuración de videos del tema
    videos: {
        MODULE_DIVISION: 'division-main',
    }
};
