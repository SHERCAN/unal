import { TopicConfig } from '@/types/topic';
import dynamic from 'next/dynamic';

const ConceptoConcretoPage = dynamic(() => import('./pages/ConceptoConcretoPage').then(m => m.ConceptoConcretoPage));
const ConceptoAbstractoPage = dynamic(() => import('./pages/ConceptoAbstractoPage').then(m => m.ConceptoAbstractoPage));
const EjerciciosPage = dynamic(() => import('./pages/EjerciciosPage').then(m => m.EjerciciosPage));

export const divisionInexactaConfig: TopicConfig = {
    id: 'division-inexacta',
    name: 'División Inexacta',
    icon: '/division-icon.png',
    color: '#0891B2',
    description: 'Aprende sobre la división inexacta y el residuo',
    pages: [
        { component: ConceptoConcretoPage, id: 'concepto-concreto', title: 'Concreto y pictórico' },
        // { component: ConceptoProcesualPage, id: 'concepto-procesual', title: 'Concepto Procesual' },
        { component: ConceptoAbstractoPage, id: 'concepto-abstracto', title: 'Explicación teórica' },
    ],
    exercisePages: [
        { component: EjerciciosPage, id: 'ejercicios', title: 'Ejercicios' },
    ],
};
