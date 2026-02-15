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

export const numerosPrimosConfig: TopicConfig = {
    id: 'numeros-primos',
    name: 'Números Primos',
    icon: '/division-icon.png',
    color: '#16A34A',
    description: 'Aprende sobre los números primos y compuestos',
    pages: [
        { component: CoverPage, id: 'cover', title: 'Portada' },
        { component: IntroPage, id: 'intro', title: 'Introducción' },
        { component: IndexPage, id: 'index', title: 'Índice' },
        { component: GuidePage, id: 'guide', title: 'Guía' },
        { component: PresentationPage, id: 'presentation', title: 'Presentación' },
        { component: ExplanationPage, id: 'explanation', title: 'Explicación' },
        { component: ConceptoConcretoPage, id: 'concepto-concreto', title: 'Concepto Concreto y Procesual' },
        { component: ConceptoAbstractoPage, id: 'concepto-abstracto', title: 'Concepto Abstracto' },
    ],
    exercisePages: [
        { component: EjerciciosPage, id: 'ejercicios', title: 'Ejercicios' },
    ],
};
