'use client';

import React from 'react';
import { FaFaceFrown, FaFaceMeh, FaFaceSmile } from 'react-icons/fa6';
import { useState, useEffect } from 'react';
import axios from 'axios';

interface PageRatingProps {
    pageId: string;
}

export const PageRating = ({ pageId }: PageRatingProps) => {
    const [rating, setRating] = useState<number | null>(null);
    const [hasRated, setHasRated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRating = async () => {
            if (!pageId) return;

            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setLoading(false);
                    return;
                }

                const response = await axios.get('/api/ratings', {
                    params: { pageId },
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (response.data.rated) {
                    setHasRated(true);
                    setRating(response.data.rating);
                }
            } catch (error) {
                console.error('Error fetching page rating:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRating();
    }, [pageId]);

    const submitRating = async (value: number) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            await axios.post('/api/ratings',
                { pageId, rating: value },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setRating(value);
            setHasRated(true);
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
    };

    if (loading) return null;

    const faces = [
        {
            value: 1,
            Icon: FaFaceFrown,
            color: '#ef4444', // red-500
            title: 'Difícil/Malo'
        },
        {
            value: 2,
            Icon: FaFaceMeh,
            color: '#eab308', // yellow-500
            title: 'Regular'
        },
        {
            value: 3,
            Icon: FaFaceSmile,
            color: '#22c55e', // green-500
            title: 'Fácil/Bueno'
        }
    ];

    return (
        <div className="absolute bottom-6 right-6 z-40 flex flex-col items-end">
            <div className="bg-white/95 dark:bg-gray-800/95 p-3 rounded-2xl shadow-xl backdrop-blur-md border border-gray-200 dark:border-gray-700 flex flex-col items-center gap-2 transform transition-all hover:scale-105">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    {hasRated ? 'Calificado' : 'Calificar página'}
                </p>

                <div className="flex items-center gap-3">
                    {faces.map(({ value, Icon, color, title }) => (
                        <button
                            key={value}
                            onClick={() => !hasRated && submitRating(value)}
                            disabled={hasRated}
                            className={`
                                relative w-12 h-12 rounded-full overflow-hidden transition-all duration-300 flex items-center justify-center
                                ${hasRated && rating === value ? 'ring-4 ring-purple-500 scale-110 z-10' : ''}
                                ${hasRated && rating !== value ? 'opacity-40 grayscale scale-90' : 'hover:scale-110 hover:-translate-y-1 active:scale-95 cursor-pointer'}
                            `}
                            title={title}
                        >
                            <Icon
                                className="w-10 h-10"
                                style={{ color }}
                            />
                        </button>
                    ))}
                </div>

                {hasRated && (
                    <div className="text-xs font-bold text-purple-600 dark:text-purple-400 animate-pulse">
                        ¡Gracias por tu opinión!
                    </div>
                )}
            </div>
        </div>
    );
};
