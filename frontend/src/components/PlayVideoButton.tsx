'use client';

import React, { useState } from 'react';
import VideoModal from './VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface PlayVideoButtonProps {
    trackingId: string;
    title: string;
    videoId?: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export function PlayVideoButton({
    trackingId,
    title,
    videoId = "/pag1/vv-1",
    className = '',
    size = 'md'
}: PlayVideoButtonProps) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();
    const [isOpen, setIsOpen] = useState(false);

    const handleComplete = () => {
        markVideoWatched(trackingId);
    };

    const sqSize = size === 'sm' ? 'w-6 h-6' : size === 'lg' ? 'w-10 h-10' : 'w-8 h-8';
    const iconSz = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
    const padding = size === 'sm' ? 'p-1' : 'p-1.5';

    return (
        <>
            <button
                type="button"
                onMouseEnter={() => setIsOpen(true)}
                onClick={() => setIsOpen(true)}
                className={`${padding} text-white rounded-full transition-all flex-shrink-0 inline-flex items-center justify-center align-middle mx-1 ${isVideoWatched(trackingId)
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-purple-600 hover:bg-purple-700'
                    } ${className}`}
                style={{ width: sqSize === 'w-8 h-8' ? 'clamp(1.5rem, 4vmin, 2rem)' : undefined, height: sqSize === 'w-8 h-8' ? 'clamp(1.5rem, 4vmin, 2rem)' : undefined }}
            >
                <svg className={iconSz} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                </svg>
            </button>
            <VideoModal
                isOpen={isOpen}
                title={title}
                videoId={videoId}
                onClose={() => setIsOpen(false)}
                canSkip={isVideoWatched(trackingId)}
                onComplete={handleComplete}
            />
        </>
    );
}
