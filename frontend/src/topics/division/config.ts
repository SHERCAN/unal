import { TopicConfig } from '@/types/topic';
import { DistributionExercisePage } from './pages/DistributionExercisePage';

export const divisionConfig: TopicConfig = {
    id: 'division',
    name: 'División',
    icon: '/division-icon.png',
    color: '#6b21a8',
    description: 'Aprende sobre división',
    pages: [
        { component: DistributionExercisePage, id: 'division-distribution-exercise', title: 'Ejercicio de Distribución' },
    ],
    exercisePages: [],
    videos: {}
};
