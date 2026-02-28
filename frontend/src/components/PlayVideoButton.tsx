'use client';

import React, { useState } from 'react';
import VideoModal from './VideoModal';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface PlayVideoButtonProps {
    trackingId: string;
    title: string;
    videoId: string;
}

export function PlayVideoButton({
    trackingId,
    title,
    videoId,
}: PlayVideoButtonProps) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();
    const [isOpen, setIsOpen] = useState(false);

    const handleComplete = () => {
        markVideoWatched(trackingId);
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className={`p-1.5 text-white rounded-full transition-all flex-shrink-0 inline-flex items-center justify-center align-middle mx-1 ${isVideoWatched(trackingId)
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-purple-600 hover:bg-purple-700'
                    }`}
                style={{ width: 'clamp(1.5rem, 4vmin, 2rem)', height: 'clamp(1.5rem, 4vmin, 2rem)' }}
            >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
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
