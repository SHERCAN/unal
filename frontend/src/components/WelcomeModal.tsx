'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import VideoModal from '@/components/VideoModal';
import { VIDEO_IDS } from '@/config/videos';
const apiUrl = process.env.NEXT_PUBLIC_APIUNAL;
interface WelcomeModalProps {
  onClose: () => void;
}

export default function WelcomeModal({ onClose }: WelcomeModalProps) {
  const router = useRouter();
  const [showVideo, setShowVideo] = useState(false);

  const handleLogin = () => {
    setShowVideo(false);
    router.push('/login');
  };

  const handleRegister = () => {
    setShowVideo(false);
    router.push('/register');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-secondary hover:text-text transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-3xl font-bold text-center text-primary mb-6">
          ¡Bienvenido!
        </h2>

        {!showVideo ? (
          <div className="space-y-6">
            <p className="text-center text-text-secondary text-lg">
              Para comenzar tu aventura de aprendizaje, elige una opción:
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowVideo(true)}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all transform hover:scale-105"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Ver Video de Bienvenida
              </button>
            </div>

            <div className="border-t border-gray-300 dark:border-gray-600 pt-6 space-y-4">
              <button
                onClick={handleLogin}
                className="w-full px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all"
              >
                Iniciar Sesión
              </button>

              <button
                onClick={handleRegister}
                className="w-full px-8 py-4 bg-secondary hover:bg-secondary-light text-primary font-bold rounded-lg transition-all border-2 border-primary"
              >
                Crear Usuario Nuevo
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Espacio para video modal */}
            <div className="aspect-video bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="w-full h-full">
                <video
                  controls
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                  src={`${apiUrl}/${VIDEO_IDS.WELCOME}.mp4`}
                  controlsList="nodownload"
                >
                  Tu navegador no soporta la reproducción de videos.
                </video>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowVideo(false)}
                className="flex-1 px-6 py-3 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-text font-bold rounded-lg transition-all"
              >
                Volver
              </button>
              <button
                onClick={handleLogin}
                className="flex-1 px-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={handleRegister}
                className="flex-1 px-6 py-3 bg-secondary hover:bg-secondary-light text-primary font-bold rounded-lg transition-all border-2 border-primary"
              >
                Registrarse
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
