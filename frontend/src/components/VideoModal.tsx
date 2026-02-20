"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { VIDEO_IDS } from "@/config/videos";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoId?: string;
  title: string;
  canSkip?: boolean;
  onComplete?: () => void;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoId,
  title,
  canSkip = true,
  onComplete
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastTimeRef = useRef(0);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      lastTimeRef.current = 0; // Reset tracking on open
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleTimeUpdate = () => {
    if (canSkip || !videoRef.current) return;

    const currentTime = videoRef.current.currentTime;
    // Allow small forward jumps (normal playback or minor buffering jitter)
    // but prevent large manual seeks forward (> 2 seconds difference)
    if (currentTime - lastTimeRef.current > 2) {
      videoRef.current.currentTime = lastTimeRef.current;
    } else {
      lastTimeRef.current = currentTime;
    }
  };

  const handleEnded = () => {
    if (onComplete) {
      onComplete();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-2 md:p-4"
      style={{ zIndex: 9999 }}
    >
      <div
        className="bg-background rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto p-4 md:p-6 relative flex flex-col"
        onMouseLeave={onClose}
      >
        <h3 className="text-lg md:text-2xl font-bold text-primary mb-3 md:mb-4">{title}</h3>

        <div className="aspect-video bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden flex-1">
          {videoId ? (
            <video
              ref={videoRef}
              controls
              autoPlay
              muted={false}
              className="w-full h-full object-cover"
              src={`https://unalapi.solindtec.net${videoId.startsWith('/') ? '' : '/'}${videoId}.mp4`}
              controlsList={!canSkip ? "nodownload noplaybackrate" : "nodownload"}
              crossOrigin="anonymous"
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleEnded}
            ></video>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center space-y-2">
                <svg
                  className="w-12 h-12 md:w-16 md:h-16 mx-auto text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                  Video en lengua de señas
                </p>
                <p className="text-xs md:text-sm text-gray-500">(Video no disponible)</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Render modal at document body level using portal
  return typeof window !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
