import { Topic } from '@/types/dashboard';

export const MOCK_TOPICS: Topic[] = [
    {
        id: 'division',
        title: 'DIVISIÓN',
        color: '#10B981', // Green
        introText: 'Dividir es repartir en partes iguales.',
        presentationText: 'Aprende a repartir cantidades en grupos iguales de manera justa.',
        lessons: [
            {
                id: 'division-exacta',
                title: 'División exacta',
                question: '10 dividido en 2 es:',
                options: ['5', '2', '8', '4'],
                correctAnswer: 0,
                progress: 0, // El progreso se actualizará basado en ejercicios completados
                totalExercises: 1, // Por ahora solo tenemos 1 página de ejercicios
                completedExercises: 0, // Se actualizará dinámicamente
            }
        ]
    }
];
