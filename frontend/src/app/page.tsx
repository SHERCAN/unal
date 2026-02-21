"use client";

import { useState } from "react";
import WelcomeModal from "@/components/WelcomeModal";
import { VIDEO_IDS } from "@/config/videos";

export const dynamic = "force-dynamic";

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-primary">
            Bienviendo al Libro Digital de Texto de Matemáticas Accesible e Interactivo
          </h1>
        </div>

        <div className="bg-background-secondary rounded-2xl p-8 shadow-xl space-y-6">
          {/* Espacio para video de YouTube */}
          <div className="aspect-video bg-gray-300 dark:bg-gray-700 rounded-lg flex items-center justify-center">
             <div className="w-full h-full">
                <video
                  controls
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                  src={`api/videos/${VIDEO_IDS.WELCOME}.mp4`}
                  controlsList="nodownload"
                  crossOrigin="anonymous"
                >
                  Tu navegador no soporta la reproducción de videos.
                </video>
              </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={() => setShowModal(true)}
              className="px-12 py-4 bg-primary hover:bg-primary-dark text-white text-xl font-bold rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              ¡Comenzar!
            </button>
          </div>
        </div>
      </div>

      {showModal && <WelcomeModal onClose={() => setShowModal(false)} />}
    </main>
  );
}
