import { TopicConfig } from '@/types/topic';
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
        { component: ConceptoConcretoPage, id: 'concepto-concreto', title: 'Concreto y pictórico' },
        { component: ConceptoAbstractoPage, id: 'concepto-abstracto', title: 'Explicación teórica' },
    ],
    exercisePages: [
        { component: EjerciciosPage, id: 'ejercicios', title: 'Ejercicios' },
    ],
};
