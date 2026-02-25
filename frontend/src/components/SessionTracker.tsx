'use client';

import { useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';

const INACTIVITY_TIMEOUT = 10 * 60 * 1000; // 10 minutes
const PULSE_INTERVAL = 1 * 60 * 1000; // 1 minute

export default function SessionTracker() {
    const router = useRouter();
    const pathname = usePathname();
    const lastActivityRef = useRef<number>(Date.now());
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const pulseRef = useRef<NodeJS.Timeout | null>(null);

    const logoutSession = useCallback(async () => {
        const sessionId = localStorage.getItem('sessionId');
        const token = localStorage.getItem('token');

        if (sessionId && token) {
            try {
                await axios.post('/api/auth/logout', { sessionId }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error('Error logging out session:', error);
            }
        }

        localStorage.removeItem('sessionId');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/login');
    }, [router]);

    const sendPulse = useCallback(async () => {
        const sessionId = localStorage.getItem('sessionId');
        const token = localStorage.getItem('token');

        if (sessionId && token) {
            try {
                await axios.post('/api/auth/pulse', { sessionId }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (error) {
                console.error('Error sending pulse:', error);
                // If 401, session might be invalid or expired
                if (axios.isAxiosError(error) && error.response?.status === 401) {
                    logoutSession();
                }
            }
        }
    }, [logoutSession]);

    const resetInactivityTimer = useCallback(() => {
        lastActivityRef.current = Date.now();
        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(() => {
            console.log('Inactivity detected, logging out...');
            logoutSession();
        }, INACTIVITY_TIMEOUT);
    }, [logoutSession]);

    useEffect(() => {
        const userStr = localStorage.getItem('user');
        if (!userStr) return;

        const user = JSON.parse(userStr);
        if (user.role === 'ADMIN') return; // Don't track admins if not desired, or track them too?
        // User requirements say "estudiantes", so we skip admins.

        // Initial setup
        resetInactivityTimer();

        // Pulse interval
        pulseRef.current = setInterval(sendPulse, PULSE_INTERVAL);

        // Activity listeners
        const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
        activityEvents.forEach(event => {
            window.addEventListener(event, resetInactivityTimer);
        });

        // Before unload
        const handleBeforeUnload = () => {
            // We can't use await here, but we can try navigator.sendBeacon or a synchronous fetch if needed
            // However, modern browsers might block synchronous XHR.
            const sessionId = localStorage.getItem('sessionId');
            const token = localStorage.getItem('token');
            if (sessionId && token) {
                const data = JSON.stringify({ sessionId });
                const blob = new Blob([data], { type: 'application/json' });
                // Note: we need the absolute URL or relative if on same origin
                navigator.sendBeacon('/api/auth/logout', blob);
            }
        };

        // window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            if (pulseRef.current) clearInterval(pulseRef.current);
            activityEvents.forEach(event => {
                window.removeEventListener(event, resetInactivityTimer);
            });
            // window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [pathname, resetInactivityTimer, sendPulse]);

    return null;
}
