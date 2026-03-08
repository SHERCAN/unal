'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';
import { useToast, type ToastType } from '@/contexts/ToastContext';

interface ProgressContextType {
    watchedVideos: string[];
    completedStages: string[];
    completedExercises: Record<string, { completed: boolean; attemptCount: number }>;
    loading: boolean;
    markVideoWatched: (videoId: string) => Promise<void>;
    isVideoWatched: (videoId: string) => boolean;
    isExerciseCompleted: (exerciseId: string) => boolean;
    completeStage: (stageId: string, points?: number) => Promise<void>;
    submitExercise: (exerciseId: string, isCorrect: boolean, type?: string) => Promise<any>;
    submitGame: (gameId: string, isCorrect: boolean, type?: string) => Promise<any>;
    reloadProgressData: () => Promise<void>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const WATCHED_VIDEOS_KEY = 'watchedVideos';

export function ProgressProvider({ children }: { children: React.ReactNode }) {
    const [watchedVideos, setWatchedVideos] = useState<string[]>([]);
    const [completedStages, setCompletedStages] = useState<string[]>([]);
    const [completedExercises, setCompletedExercises] = useState<Record<string, { completed: boolean; attemptCount: number }>>({});
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    const reloadProgressData = useCallback(async () => {
        const localVideos = JSON.parse(localStorage.getItem(WATCHED_VIDEOS_KEY) || '[]');
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const [progressRes, videosRes, exercisesRes] = await Promise.all([
                    axios.get('/api/users/progress', { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get('/api/users/videos', { headers: { Authorization: `Bearer ${token}` } }),
                    axios.get('/api/users/exercises', { headers: { Authorization: `Bearer ${token}` } })
                ]);

                setCompletedStages(progressRes.data);
                setCompletedExercises(exercisesRes.data);

                const remoteVideos = videosRes.data;
                const mergedVideos = Array.from(new Set([...localVideos, ...remoteVideos]));
                setWatchedVideos(mergedVideos);
                localStorage.setItem(WATCHED_VIDEOS_KEY, JSON.stringify(mergedVideos));
            } else {
                setWatchedVideos(localVideos);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setWatchedVideos(localVideos);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        reloadProgressData();

        // Still listen for cross-tab sync
        window.addEventListener('storage', (e) => {
            if (e.key === WATCHED_VIDEOS_KEY) {
                const updated = JSON.parse(e.newValue || '[]');
                setWatchedVideos(updated);
            }
        });
    }, [reloadProgressData]);

    const markVideoWatched = async (videoId: string) => {
        if (!watchedVideos.includes(videoId)) {
            const newWatched = [...watchedVideos, videoId];
            setWatchedVideos(newWatched);
            localStorage.setItem(WATCHED_VIDEOS_KEY, JSON.stringify(newWatched));

            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.post('/api/users/videos',
                        { videoId },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    if (response.data.pointsAdded > 0) {
                        showToast('video', response.data.pointsAdded);
                        window.dispatchEvent(new Event('points-updated'));
                    }
                }
            } catch (error) {
                console.error('Error syncing video progress:', error);
            }
        }
    };

    const isVideoWatched = useCallback((videoId: string) => {
        return watchedVideos.includes(videoId);
    }, [watchedVideos]);

    const isExerciseCompleted = useCallback((exerciseId: string) => {
        return completedExercises[exerciseId]?.completed || false;
    }, [completedExercises]);

    const completeStage = async (stageId: string, points?: number) => {
        if (completedStages.includes(stageId)) return;

        // Optimistic update
        setCompletedStages(prev => [...prev, stageId]);

        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await axios.post('/api/users/progress',
                { modulo: stageId, points },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.data.pointsAdded > 0) {
                showToast('cpa', response.data.pointsAdded);
                window.dispatchEvent(new Event('points-updated'));
            } else if (response.data.message === 'Already completed') {
                // Keep the optimistic update
            }
        } catch (error) {
            console.error('Error completing stage:', error);
            // Revert optimistic update?
            setCompletedStages(prev => prev.filter(id => id !== stageId));
        }
    };

    const submitExercise = async (exerciseId: string, isCorrect: boolean, type?: string) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await axios.post('/api/users/exercises',
                { exerciseId, isCorrect, type },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (isCorrect) {
                setCompletedExercises(prev => ({
                    ...prev,
                    [exerciseId]: { completed: true, attemptCount: response.data.attemptCount || 1 }
                }));
            }

            if (response.data.pointsAdded > 0 || response.data.pointsDefinitivosAdded > 0) {
                let toastType: ToastType = 'exercise-retry';
                if (response.data.attemptCount === 1 && response.data.pointType === 'definitive') {
                    toastType = 'exercise-first';
                } else if (response.data.attemptCount === 2) {
                    toastType = 'exercise-second';
                }

                const totalPoints = response.data.pointsAdded + (response.data.pointsDefinitivosAdded || 0);
                showToast(toastType, totalPoints);
                window.dispatchEvent(new Event('points-updated'));
            }
            return response.data;
        } catch (error) {
            console.error('Error submitting exercise:', error);
            return null;
        }
    };

    const submitGame = async (gameId: string, isCorrect: boolean, type?: string) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const response = await axios.post('/api/users/games',
                { exerciseId: gameId, isCorrect, type },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (isCorrect) {
                setCompletedExercises(prev => ({
                    ...prev,
                    [gameId]: { completed: true, attemptCount: response.data.attemptCount || 1 }
                }));
            }

            if (response.data.pointsAdded > 0 || response.data.pointsDefinitivosAdded > 0) {
                let toastType: ToastType = 'game-retry';
                if (response.data.attemptCount === 1 && response.data.pointType === 'definitive') {
                    toastType = 'game-first';
                } else if (response.data.attemptCount === 2) {
                    toastType = 'game-second';
                }

                const totalPoints = response.data.pointsAdded + (response.data.pointsDefinitivosAdded || 0);
                showToast(toastType, totalPoints);
                window.dispatchEvent(new Event('points-updated'));
            }
            return response.data;
        } catch (error) {
            console.error('Error submitting game:', error);
            return null;
        }
    };

    const value = useMemo(() => ({
        watchedVideos,
        completedStages,
        completedExercises,
        loading,
        markVideoWatched,
        isVideoWatched,
        isExerciseCompleted,
        completeStage,
        submitExercise,
        submitGame,
        reloadProgressData
    }), [watchedVideos, completedStages, completedExercises, loading, markVideoWatched, isVideoWatched, isExerciseCompleted, completeStage, submitExercise, submitGame, reloadProgressData]);

    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
}

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (context === undefined) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
};
