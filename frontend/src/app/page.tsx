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
            Aprendizaje Matemático
          </h1>
          <h2 className="text-3xl font-semibold text-text">
            Para Personas con Discapacidad Auditiva
          </h2>
        </div>

        <div className="bg-background-secondary rounded-2xl p-8 shadow-xl space-y-6">
          <p className="text-lg text-text-secondary leading-relaxed">
            Bienvenido a nuestra plataforma educativa diseñada especialmente
            para personas con discapacidad auditiva que conocen lengua de señas.
            Nuestro objetivo es mejorar las habilidades matemáticas a través de
            contenido visual, interactivo y accesible.
          </p>

          <p className="text-lg text-text-secondary leading-relaxed">
            Sabemos que los conceptos matemáticos pueden ser abstractos, por eso
            hemos creado un sistema de aprendizaje que utiliza videos en lengua
            de señas, ejercicios interactivos y un seguimiento personalizado de
            tu progreso.
          </p>

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
