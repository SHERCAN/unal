import { TopicConfig } from '@/types/topic';
import { CoverPage } from '@/components/book-pages/shared/CoverPage';
import { IntroPage } from '@/components/book-pages/shared/IntroPage';
import { IndexPage } from '@/components/book-pages/shared/IndexPage';
import { GuidePage } from '@/components/book-pages/shared/GuidePage';
import { PresentationPage } from '@/components/book-pages/shared/PresentationPage';
import { ExplanationPage } from '@/components/book-pages/shared/ExplanationPage';
import { ConceptoConcretoPage } from './pages/ConceptoConcretoPage';
import { ConceptoAbstractoPage } from './pages/ConceptoAbstractoPage';
import { EjerciciosPage } from './pages/EjerciciosPage';

export const comparacionFraccionesConfig: TopicConfig = {
    id: 'comparacion-fracciones',
    name: 'Comparación de Fracciones',
    icon: '/division-icon.png',
    color: '#EA580C',
    description: 'Aprende a comparar fracciones',
    pages: [
        { component: CoverPage, id: 'cover', title: 'Portada' },
        { component: IntroPage, id: 'intro', title: 'Introducción' },
        { component: IndexPage, id: 'index', title: 'Índice' },
        { component: GuidePage, id: 'guide', title: 'Guía' },
        { component: PresentationPage, id: 'presentation', title: 'Presentación' },
        { component: ExplanationPage, id: 'explanation', title: 'Explicación' },
        { component: ConceptoConcretoPage, id: 'concepto-concreto', title: 'Concepto Concreto' },
        { component: ConceptoAbstractoPage, id: 'concepto-abstracto', title: 'Concepto Abstracto' },
    ],
    exercisePages: [
        { component: EjerciciosPage, id: 'ejercicios', title: 'Ejercicios' },
    ],
};
