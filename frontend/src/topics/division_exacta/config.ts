import { TopicConfig } from '@/types/topic';
import { CoverPage } from '@/components/book-pages/shared/CoverPage';
import { IntroPage } from '@/components/book-pages/shared/IntroPage';
import { IndexPage } from '@/components/book-pages/shared/IndexPage';
import { GuidePage } from '@/components/book-pages/shared/GuidePage';
import { PresentationPage } from '@/components/book-pages/shared/PresentationPage';
import { ExplanationPage } from '@/components/book-pages/shared/ExplanationPage';
import dynamic from 'next/dynamic';

const ConceptoConcretoPage = dynamic(() => import('./pages/ConceptoConcretoPage').then(m => m.ConceptoConcretoPage));
const ConceptoPictoricoPage = dynamic(() => import('./pages/ConceptoProcesualPage').then(m => m.ConceptoPictoricoPage));
const ConceptoAbstractoPage = dynamic(() => import('./pages/ConceptoAbstractoPage').then(m => m.ConceptoAbstractoPage));
const EjerciciosPage = dynamic(() => import('./pages/EjerciciosPage').then(m => m.EjerciciosPage));

export const divisionExactaConfig: TopicConfig = {
    id: 'division-exacta',
    name: 'División Exacta',
    icon: '/division-icon.png',
    color: '#059669',
    description: 'Aprende sobre la división exacta',
    pages: [
        // { component: CoverPage, id: 'cover', title: 'Portada' },
        // { component: IntroPage, id: 'intro', title: 'Introducción' },
        // { component: IndexPage, id: 'index', title: 'Índice' },
        // { component: GuidePage, id: 'guide', title: 'Guía' },
        // { component: PresentationPage, id: 'presentation', title: 'Presentación' },
        // { component: ExplanationPage, id: 'explanation', title: 'Explicación' },
        { component: ConceptoConcretoPage, id: 'concepto-concreto', title: 'Concreto y pictórico' },
        { component: ConceptoPictoricoPage, id: 'concepto-pictorico', title: 'Explicación teórica' },
        { component: ConceptoAbstractoPage, id: 'concepto-abstracto', title: 'Ejemplos, practicas y algoritmo de división' },
    ],
    exercisePages: [
        { component: EjerciciosPage, id: 'ejercicios', title: 'Ejercicios' },
    ],
};
