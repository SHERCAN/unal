import { TopicConfig } from '@/types/topic';
import { CoverPage } from '@/components/book-pages/shared/CoverPage';
import { IntroPage } from '@/components/book-pages/shared/IntroPage';
import { IndexPage } from '@/components/book-pages/shared/IndexPage';
import { GuidePage } from '@/components/book-pages/shared/GuidePage';
import { PresentationPage } from '@/components/book-pages/shared/PresentationPage';
import { ExplanationPage } from '@/components/book-pages/shared/ExplanationPage';
import { ExercisePage } from './pages/ExercisePage';
import { DistributionExercisePage } from './pages/DistributionExercisePage';
import { ExplanationPage2 } from './pages/ExplanationPage2';
import { ConceptPage } from './pages/ConceptPage';
import { ProblemsPage } from './pages/ProblemsPage';
import { ExercisesPage } from './pages/ExercisesPage';

/**
 * Configuración del tema de División
 */
export const divisionConfig: TopicConfig = {
    id: 'division',
    name: 'División',
    icon: '/division-icon.png',
    color: '#6b21a8', // purple-800
    description: 'Aprende sobre división, sus partes y cómo resolver problemas',

    // Páginas de la lección (sección "LECCIÓN")
    pages: [
        { component: CoverPage, id: 'cover', title: 'Portada' },
        { component: IntroPage, id: 'intro', title: 'Introducción' },
        { component: IndexPage, id: 'index', title: 'Índice' },
        { component: GuidePage, id: 'guide', title: 'Guía' },
        { component: PresentationPage, id: 'presentation', title: 'Presentación' },
        { component: ExplanationPage, id: 'explanation', title: 'Explicación' },
        { component: ExercisePage, id: 'division-exercise', title: 'Ejercicio Práctico' },
        { component: DistributionExercisePage, id: 'division-distribution-exercise', title: 'Ejercicio de Distribución' },
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
