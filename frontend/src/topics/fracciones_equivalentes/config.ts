import { TopicConfig } from '@/types/topic';
import { CoverPage } from '@/components/book-pages/shared/CoverPage';
import { IntroPage } from '@/components/book-pages/shared/IntroPage';
import { IndexPage } from '@/components/book-pages/shared/IndexPage';
import { GuidePage } from '@/components/book-pages/shared/GuidePage';
import { PresentationPage } from '@/components/book-pages/shared/PresentationPage';
import { ExplanationPage } from '@/components/book-pages/shared/ExplanationPage';
import { ConceptoConcretoPage } from './pages/ConceptoConcretoPage';
import { ConceptoProcesualPage } from './pages/ConceptoProcesualPage';
import { ConceptoAbstracto1Page } from './pages/ConceptoAbstracto1Page';
import { ConceptoAbstracto2Page } from './pages/ConceptoAbstracto2Page';
import { EjemplosPage } from './pages/EjemplosPage';
import { EjerciciosPage } from './pages/EjerciciosPage';

export const fraccionesEquivalentesConfig: TopicConfig = {
    id: 'fracciones-equivalentes',
    name: 'Fracciones Equivalentes',
    icon: '/division-icon.png',
    color: '#D946EF',
    description: 'Aprende sobre las fracciones equivalentes',
    pages: [
        // { component: CoverPage, id: 'cover', title: 'Portada' },
        // { component: IntroPage, id: 'intro', title: 'Introducción' },
        // { component: IndexPage, id: 'index', title: 'Índice' },
        // { component: GuidePage, id: 'guide', title: 'Guía' },
        // { component: PresentationPage, id: 'presentation', title: 'Presentación' },
        // { component: ExplanationPage, id: 'explanation', title: 'Explicación' },
        { component: ConceptoConcretoPage, id: 'concepto-concreto', title: 'Concepto Concreto' },
        { component: ConceptoProcesualPage, id: 'concepto-procesual', title: 'Concepto Procesual' },
        { component: ConceptoAbstracto1Page, id: 'concepto-abstracto-1', title: 'Productos Cruzados' },
        { component: ConceptoAbstracto2Page, id: 'concepto-abstracto-2', title: 'Simplificación y Amplificación' },
        { component: EjemplosPage, id: 'ejemplos', title: 'Ejemplos' },
    ],
    exercisePages: [
        { component: EjerciciosPage, id: 'ejercicios', title: 'Ejercicios' },
    ],
};
