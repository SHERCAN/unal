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
    // {
    //     id: 'division-demo',
    //     title: 'DIVISIÓN DEMO',
    //     color: '#9333ea', // Purple
    //     introText: 'Versión completa de demostración.',
    //     presentationText: 'Explora todas las funcionalidades y páginas de la división.',
    //     lessons: [
    //         {
    //             id: 'division-demo-intro',
    //             title: 'Introducción a la división',
    //             question: '¿Qué es dividir?',
    //             options: ['Repartir', 'Sumar', 'Restar', 'Multiplicar'],
    //             correctAnswer: 0,
    //             progress: 0,
    //             totalExercises: 5,
    //             completedExercises: 0,
    //         }
    //     ]
    // },
    {
        id: 'division-exacta',
        title: 'DIVISIÓN EXACTA',
        color: '#059669',
        introText: 'La división exacta no tiene residuo.',
        presentationText: 'Aprende sobre la división exacta y su relación con la multiplicación.',
        lessons: [
            {
                id: 'division-exacta-intro',
                title: 'Introducción a la división exacta',
                question: '125 ÷ 5 = ?',
                options: ['25', '20', '30', '15'],
                correctAnswer: 0,
                progress: 0,
                totalExercises: 1,
                completedExercises: 0,
            }
        ]
    },
    {
        id: 'division-inexacta',
        title: 'DIVISIÓN INEXACTA',
        color: '#0891B2',
        introText: 'La división inexacta tiene un residuo.',
        presentationText: 'Aprende sobre la división inexacta y el concepto de residuo.',
        lessons: [
            {
                id: 'division-inexacta-intro',
                title: 'Introducción a la división inexacta',
                question: '¿Qué es el residuo?',
                options: ['Lo que sobra', 'Lo que falta', 'El resultado', 'El divisor'],
                correctAnswer: 0,
                progress: 0,
                totalExercises: 1,
                completedExercises: 0,
            }
        ]
    },
    {
        id: 'numeros-primos',
        title: 'NÚMEROS PRIMOS',
        color: '#16A34A',
        introText: 'Los números primos solo se dividen por 1 y por sí mismos.',
        presentationText: 'Aprende a identificar números primos y compuestos.',
        lessons: [
            {
                id: 'numeros-primos-intro',
                title: 'Introducción a los números primos',
                question: '¿El número 7 es primo?',
                options: ['Sí', 'No'],
                correctAnswer: 0,
                progress: 0,
                totalExercises: 1,
                completedExercises: 0,
            }
        ]
    },
    {
        id: 'fracciones',
        title: 'FRACCIONES',
        color: '#7C3AED',
        introText: 'Las fracciones representan partes de un todo.',
        presentationText: 'Aprende sobre las fracciones, sus componentes y representaciones.',
        lessons: [
            {
                id: 'fracciones-intro',
                title: 'Introducción a las fracciones',
                question: '¿Qué parte de una pizza es 1/4?',
                options: ['Una de cuatro partes', 'Toda la pizza', 'La mitad', 'Tres cuartos'],
                correctAnswer: 0,
                progress: 0,
                totalExercises: 2,
                completedExercises: 0,
            }
        ]
    },
    {
        id: 'fracciones-equivalentes',
        title: 'FRACCIONES EQUIVALENTES',
        color: '#D946EF',
        introText: 'Fracciones equivalentes representan la misma cantidad.',
        presentationText: 'Aprende a identificar y crear fracciones equivalentes.',
        lessons: [
            {
                id: 'fracciones-equivalentes-intro',
                title: 'Introducción a fracciones equivalentes',
                question: '¿1/2 es equivalente a 2/4?',
                options: ['Sí', 'No'],
                correctAnswer: 0,
                progress: 0,
                totalExercises: 1,
                completedExercises: 0,
            }
        ]
    },
    {
        id: 'comparacion-fracciones',
        title: 'COMPARACIÓN DE FRACCIONES',
        color: '#EA580C',
        introText: 'Compara fracciones para saber cuál es mayor o menor.',
        presentationText: 'Aprende a comparar fracciones con el mismo y diferente denominador.',
        lessons: [
            {
                id: 'comparacion-fracciones-intro',
                title: 'Introducción a la comparación',
                question: '¿2/5 es mayor que 4/5?',
                options: ['No', 'Sí'],
                correctAnswer: 0,
                progress: 0,
                totalExercises: 1,
                completedExercises: 0,
            }
        ]
    }
];
