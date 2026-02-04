import { useState, useEffect } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';

export function usePageRating() {
    const pathname = usePathname();
    const pageId = pathname; // Use current path as page ID
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

    return {
        rating,
        hasRated,
        loading,
        submitRating
    };
}
