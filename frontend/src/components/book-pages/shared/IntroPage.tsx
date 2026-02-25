import React from 'react';
import { BookPageContainer } from '../BookPageContainer';

interface IntroPageProps {
    zoom?: number;
}

export const IntroPage = ({ zoom = 1 }: IntroPageProps) => {
    return (
        <BookPageContainer zoom={zoom} pageId="shared-pag2-intro">
            <header className="mb-12 border-b-2 border-gray-100 dark:border-gray-700 pb-4">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Introducción</h2>
            </header>

            <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-300 space-y-6 font-serif leading-relaxed">
                <p>
                    <span className="text-5xl float-left font-bold text-primary mr-2 -mt-2">B</span>
                    ienvenidos al manual interactivo. Este recurso ha sido diseñado para proporcionar una comprensión profunda
                    de los temas fundamentales. A través de estas páginas, exploraremos conceptos clave que forman la base
                    del conocimiento en esta área.
                </p>
                <p>
                    El objetivo es facilitar un aprendizaje autónomo y reflexivo. Cada sección está estructurada cuidadosamente
                    para guiar al lector desde los principios básicos hasta las aplicaciones más complejas, asegurando una
                    curva de aprendizaje suave pero constante.
                </p>
                <blockquote className="p-4 bg-gray-50 dark:bg-white/5 border-l-4 border-primary/50 italic my-8 text-gray-700 dark:text-gray-300">
                    "El aprendizaje es un tesoro que seguirá a su dueño a todas partes."
                </blockquote>
                <p>
                    Esperamos que este material sea de gran utilidad y sirva como una referencia constante en su proceso
                    de formación.
                </p>
            </div>
        </BookPageContainer>
    );
};
