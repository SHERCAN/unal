import { TopicConfig } from '@/types/topic';
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
        { component: ConceptoConcretoPage, id: 'concepto-concreto', title: 'Concreto y pictórico' },
        { component: ConceptoAbstractoPage, id: 'concepto-abstracto', title: 'Explicación teórica' },
    ],
    exercisePages: [
        { component: EjerciciosPage, id: 'ejercicios', title: 'Ejercicios' },
    ],
};
