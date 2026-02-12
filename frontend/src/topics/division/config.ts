import { TopicConfig } from '@/types/topic';
import { CoverPage } from '@/components/book-pages/shared/CoverPage';
import { IntroPage } from '@/components/book-pages/shared/IntroPage';
import { IndexPage } from '@/components/book-pages/shared/IndexPage';
import { GuidePage } from '@/components/book-pages/shared/GuidePage';
import { PresentationPage } from '@/components/book-pages/shared/PresentationPage';
import { ExplanationPage } from '@/components/book-pages/shared/ExplanationPage';
import { DistributionExercisePage } from './pages/DistributionExercisePage';
import { ConceptPage } from './pages/ConceptPage';

export const divisionConfig: TopicConfig = {
    id: 'division',
    name: 'División',
    icon: '/division-icon.png',
    color: '#6b21a8',
    description: 'Aprende sobre división',
    // Páginas de la lección (sección "LECCIÓN")
    pages: [
        { component: CoverPage, id: 'cover', title: 'Portada' },
        { component: IntroPage, id: 'intro', title: 'Introducción' },
        { component: ConceptPage, id: 'concept', title: 'Concepto' },
        { component: IndexPage, id: 'index', title: 'Índice' },
        { component: GuidePage, id: 'guide', title: 'Guía' },
        { component: PresentationPage, id: 'presentation', title: 'Presentación' },
        { component: ExplanationPage, id: 'explanation', title: 'Explicación' },
        { component: DistributionExercisePage, id: 'division-distribution-exercise', title: 'Ejercicio de Distribución' },
    ],
    // Páginas de ejercicios (sección "EJERCICIOS")
    exercisePages: [],
    // Configuración de videos del tema
    videos: {
        MODULE_DIVISION: 'division-main',
    }
};
