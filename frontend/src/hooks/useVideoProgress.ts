import { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast, type ToastType } from '@/contexts/ToastContext';

// Keys for localStorage
const WATCHED_VIDEOS_KEY = 'watchedVideos';

export function useVideoProgress() {
    const [watchedVideos, setWatchedVideos] = useState<string[]>([]);
    const [completedStages, setCompletedStages] = useState<string[]>([]);
    const [completedExercises, setCompletedExercises] = useState<Record<string, { completed: boolean; attemptCount: number }>>({});
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    // Load initial state
    useEffect(() => {
        const loadInitialData = async () => {
            // 1. Load from LocalStorage
            const localVideos = JSON.parse(localStorage.getItem(WATCHED_VIDEOS_KEY) || '[]');

            try {
                const token = localStorage.getItem('token');
                if (token) {
                    // 2. Load from API
                    const [progressRes, videosRes, exercisesRes] = await Promise.all([
                        axios.get('/api/users/progress', { headers: { Authorization: `Bearer ${token}` } }),
                        axios.get('/api/users/videos', { headers: { Authorization: `Bearer ${token}` } }),
                        axios.get('/api/users/exercises', { headers: { Authorization: `Bearer ${token}` } })
                    ]);

                    setCompletedStages(progressRes.data);
                    setCompletedExercises(exercisesRes.data);

                    // Merge local and remote videos
                    const remoteVideos = videosRes.data;
                    const mergedVideos = Array.from(new Set([...localVideos, ...remoteVideos]));
                    setWatchedVideos(mergedVideos);

                    // Sync back to local storage
                    localStorage.setItem(WATCHED_VIDEOS_KEY, JSON.stringify(mergedVideos));
                } else {
                    setWatchedVideos(localVideos);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setWatchedVideos(localVideos); // Fallback to local
            } finally {
                setLoading(false);
            }
        };

        loadInitialData();
    }, []);

    const markVideoWatched = async (videoId: string) => {
        if (!watchedVideos.includes(videoId)) {
            const newWatched = [...watchedVideos, videoId];
            setWatchedVideos(newWatched);
            localStorage.setItem(WATCHED_VIDEOS_KEY, JSON.stringify(newWatched));

            // Sync with backend
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.post('/api/users/videos',
                        { videoId },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );

                    // If points were awarded, update dashboard and show toast
                    if (response.data.pointsAdded > 0) {
                        showToast('video', response.data.pointsAdded);
                        window.dispatchEvent(new Event('storage'));
                    }
                }
            } catch (error) {
                console.error('Error syncing video progress:', error);
            }
        }
    };

    const isVideoWatched = (videoId: string) => {
        return watchedVideos.includes(videoId);
    };

    const isExerciseCompleted = (exerciseId: string) => {
        return completedExercises[exerciseId]?.completed || false;
    };

    const completeStage = async (stageId: string) => {
        if (completedStages.includes(stageId)) return;

        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await axios.post('/api/users/progress',
                { modulo: stageId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.pointsAdded > 0) {
                // Update local list
                setCompletedStages(prev => [...prev, stageId]);

                // Show toast and dispatch event to update points in Dashboard
                showToast('cpa', response.data.pointsAdded);
                window.dispatchEvent(new Event('storage'));
            } else if (response.data.message === 'Already completed') {
                // Update local list even if no points (for consistency)
                setCompletedStages(prev => [...prev, stageId]);
            }
        } catch (error) {
            console.error('Error completing stage:', error);
        }
    };

    const submitExercise = async (exerciseId: string, isCorrect: boolean) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await axios.post('/api/users/exercises',
                { exerciseId, isCorrect },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (isCorrect) {
                setCompletedExercises(prev => ({
                    ...prev,
                    [exerciseId]: { completed: true, attemptCount: response.data.attemptCount || 1 }
                }));
            }

            if (response.data.pointsAdded > 0 || response.data.pointsDefinitivosAdded > 0) {
                // Determine toast type based on attempt count
                let toastType: ToastType = 'exercise-retry';
                if (response.data.attemptCount === 1 && response.data.pointType === 'definitive') {
                    toastType = 'exercise-first';
                } else if (response.data.attemptCount === 2) {
                    toastType = 'exercise-second';
                }

                const totalPoints = response.data.pointsAdded + (response.data.pointsDefinitivosAdded || 0);
                showToast(toastType, totalPoints);
                window.dispatchEvent(new Event('storage'));
            }
            return response.data;
        } catch (error) {
            console.error('Error submitting exercise:', error);
            return null;
        }
    };

    const submitGame = async (gameId: string, isCorrect: boolean) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await axios.post('/api/users/games',
                { gameId, isCorrect },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (isCorrect) {
                setCompletedExercises(prev => ({
                    ...prev,
                    [gameId]: { completed: true, attemptCount: response.data.attemptCount || 1 }
                }));
            }

            if (response.data.pointsAdded > 0 || response.data.pointsDefinitivosAdded > 0) {
                // Determine toast type based on attempt count
                let toastType: ToastType = 'game-retry';
                if (response.data.attemptCount === 1 && response.data.pointType === 'definitive') {
                    toastType = 'game-first';
                } else if (response.data.attemptCount === 2) {
                    toastType = 'game-second';
                }

                const totalPoints = response.data.pointsAdded + (response.data.pointsDefinitivosAdded || 0);
                showToast(toastType, totalPoints);
                window.dispatchEvent(new Event('storage'));
            }
            return response.data;
        } catch (error) {
            console.error('Error submitting game:', error);
            return null;
        }
    };

    return {
        watchedVideos,
        completedStages,
        loading,
        markVideoWatched,
        isVideoWatched,
        isExerciseCompleted,
        completeStage,
        submitExercise,
        submitGame
    };
}
