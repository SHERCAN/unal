export interface Lesson {
    id: string;
    title: string;
    question: string;
    imageUrl?: string;
    options: string[];
    correctAnswer: number; // Index of the correct option
    progress?: number; // 0-100
    totalExercises?: number; // Total number of exercises in this lesson
    completedExercises?: number; // Number of completed exercises
}

export interface Topic {
    id: string;
    title: string;
    color: string; // Hex code or Tailwind class for theming
    coverImage?: string;
    introText: string;
    presentationText: string;
    lessons: Lesson[];
}
