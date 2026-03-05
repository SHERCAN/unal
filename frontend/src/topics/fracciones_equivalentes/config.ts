import { TopicConfig } from '@/types/topic';
import { ConceptoConcretoPage } from './pages/ConceptoConcretoPage';
import { ConceptoPictoricoPage } from './pages/ConceptoProcesualPage';
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
        { component: ConceptoConcretoPage, id: 'concepto-concreto', title: 'Concreto' },
        { component: ConceptoPictoricoPage, id: 'concepto-pictorico', title: 'Pictórico' },
        { component: ConceptoAbstracto1Page, id: 'concepto-abstracto-1', title: 'Explicación teórica' },
        { component: ConceptoAbstracto2Page, id: 'concepto-abstracto-2', title: 'Simplificación y Amplificación' },
        { component: EjemplosPage, id: 'ejemplos', title: 'Ejemplos' },
    ],
    exercisePages: [
        { component: EjerciciosPage, id: 'ejercicios', title: 'Ejercicios' },
    ],
};
