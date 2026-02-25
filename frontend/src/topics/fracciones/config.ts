import { TopicConfig } from '@/types/topic';
import { CoverPage } from '@/components/book-pages/shared/CoverPage';
import { IntroPage } from '@/components/book-pages/shared/IntroPage';
import { IndexPage } from '@/components/book-pages/shared/IndexPage';
import { GuidePage } from '@/components/book-pages/shared/GuidePage';
import { PresentationPage } from '@/components/book-pages/shared/PresentationPage';
import { ExplanationPage } from '@/components/book-pages/shared/ExplanationPage';
import { ConceptoConcretoPage } from './pages/ConceptoConcretoPage';
import { ConceptoAbstracto1Page } from './pages/ConceptoAbstracto1Page';
import { ConceptoAbstracto2Page } from './pages/ConceptoAbstracto2Page';
import { EjemplosPage } from './pages/EjemplosPage';
import { EjerciciosPage } from './pages/EjerciciosPage';
import { EjerciciosPage2 } from './pages/EjerciciosPage2';

export const fraccionesConfig: TopicConfig = {
    id: 'fracciones',
    name: 'Fracciones',
    icon: '/division-icon.png',
    color: '#7C3AED',
    description: 'Aprende sobre las fracciones',
    pages: [
        // { component: CoverPage, id: 'cover', title: 'Portada' },
        // { component: IntroPage, id: 'intro', title: 'Introducción' },
        // { component: IndexPage, id: 'index', title: 'Índice' },
        // { component: GuidePage, id: 'guide', title: 'Guía' },
        // { component: PresentationPage, id: 'presentation', title: 'Presentación' },
        // { component: ExplanationPage, id: 'explanation', title: 'Explicación' },
        { component: ConceptoConcretoPage, id: 'concepto-concreto', title: 'Concreto y pictórico' },
        { component: ConceptoAbstracto1Page, id: 'concepto-abstracto-1', title: 'Explicación teórica' },
        { component: ConceptoAbstracto2Page, id: 'concepto-abstracto-2', title: 'Representación de fracciones' },
        { component: EjemplosPage, id: 'ejemplos', title: 'Ejemplos' },
    ],
    exercisePages: [
        { component: EjerciciosPage, id: 'ejercicios', title: 'Ejercicios' },
        { component: EjerciciosPage2, id: 'ejercicios-2', title: 'Ejercicios 2' },
    ],
};
