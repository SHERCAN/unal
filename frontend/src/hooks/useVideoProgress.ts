import { useProgress } from '@/contexts/ProgressContext';

export function useVideoProgress() {
    const {
        watchedVideos,
        completedStages,
        completedExercises,
        loading,
        markVideoWatched,
        isVideoWatched,
        isExerciseCompleted,
        completeStage,
        submitExercise,
        submitGame
    } = useProgress();

    return {
        watchedVideos,
        completedStages,
        completedExercises,
        loading,
        markVideoWatched,
        isVideoWatched,
        isExerciseCompleted,
        completeStage,
        submitExercise,
        submitGame
    };
}
