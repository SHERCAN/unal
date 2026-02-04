import React from 'react';
import { BookPageContainer } from '../BookPageContainer';

interface PresentationPageProps {
    zoom?: number;
}

export const PresentationPage = ({ zoom = 1 }: PresentationPageProps) => {
    return (
        <BookPageContainer zoom={zoom}>
            <header className="mb-8 border-b-2 border-gray-100 dark:border-gray-700 pb-4">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Presentación</h2>
            </header>

            <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1 text-gray-800 dark:text-gray-300 leading-relaxed space-y-4 font-serif text-lg">
                    <p>
                        Esta unidad didáctica se centra en el desarrollo de competencias analíticas y prácticas.
                        Abordaremos los temas con un enfoque constructivista, donde el estudiante es el
                        protagonista de su propio aprendizaje.
                    </p>
                    <p>
                        La metodología empleada combina teoría rigurosa con ejemplos prácticos tomados de
                        situaciones reales, permitiendo una transferencia inmediata del conocimiento al
                        entorno profesional o académico.
                    </p>
                    <div className="bg-gray-50 dark:bg-white/5 border-l-4 border-gray-300 dark:border-gray-600 p-4 rounded-r mt-6">
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">Objetivos Clave:</h4>
                        <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
                            <li>Comprender los principios fundamentales.</li>
                            <li>Aplicar metodologías de análisis.</li>
                            <li>Evaluar resultados críticamente.</li>
                        </ul>
                    </div>
                </div>

                <div className="w-full md:w-1/3 bg-gray-100 dark:bg-white/5 rounded-lg h-64 flex items-center justify-center text-gray-400 dark:text-gray-600">
                    <div className="text-center">
                        <span className="block text-4xl mb-2">📊</span>
                        <span className="text-sm">Gráfico o Imagen Ilustrativa</span>
                    </div>
                </div>
            </div>
        </BookPageContainer>
    );
};
