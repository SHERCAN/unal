import { TopicConfig } from '@/types/topic';
import dynamic from 'next/dynamic';

const ConceptoConcretoPage = dynamic(() => import('./pages/ConceptoConcretoPage').then(m => m.ConceptoConcretoPage));
const ConceptoAbstracto1Page = dynamic(() => import('./pages/ConceptoAbstracto1Page').then(m => m.ConceptoAbstracto1Page));
const ConceptoAbstracto2Page = dynamic(() => import('./pages/ConceptoAbstracto2Page').then(m => m.ConceptoAbstracto2Page));
const EjemplosPage = dynamic(() => import('./pages/EjemplosPage').then(m => m.EjemplosPage));
const EjerciciosPage = dynamic(() => import('./pages/EjerciciosPage').then(m => m.EjerciciosPage));
const EjerciciosPage2 = dynamic(() => import('./pages/EjerciciosPage2').then(m => m.EjerciciosPage2));

export const fraccionesConfig: TopicConfig = {
    id: 'fracciones',
    name: 'Fracciones',
    icon: '/division-icon.png',
    color: '#7C3AED',
    description: 'Aprende sobre las fracciones',
    pages: [
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
