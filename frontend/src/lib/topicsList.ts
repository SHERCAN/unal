import { Topic } from '@/types/dashboard';

export const TOPICS_DATA: Topic[] = [
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
                progress: 0,
                totalExercises: 1,
                completedExercises: 0,
            }
        ]
    },
    {
        id: 'division-demo',
        title: 'DIVISIÓN DEMO',
        color: '#9333ea', // Purple
        introText: 'Versión completa de demostración.',
        presentationText: 'Explora todas las funcionalidades y páginas de la división.',
        lessons: [
            {
                id: 'division-demo-intro',
                title: 'Introducción a la división',
                question: '¿Qué es dividir?',
                options: ['Repartir', 'Sumar', 'Restar', 'Multiplicar'],
                correctAnswer: 0,
                progress: 0,
                totalExercises: 5,
                completedExercises: 0,
            }
        ]
    }
];
