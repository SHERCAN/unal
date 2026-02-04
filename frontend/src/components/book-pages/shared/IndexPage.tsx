import React from 'react';
import { BookPageContainer } from '../BookPageContainer';

interface IndexPageProps {
    zoom?: number;
}

export const IndexPage = ({ zoom = 1 }: IndexPageProps) => {
    const chapters = [
        { title: "Guía de Usuario", page: 4 },
        { title: "Presentación del Curso", page: 5 },
        { title: "Explicación Detallada", page: 6 },
        { title: "Fundamentos Teóricos", page: 7 },
        { title: "Casos de Estudio", page: 12 },
        { title: "Recursos Adicionales", page: 15 },
    ];

    return (
        <BookPageContainer zoom={zoom}>
            <header className="mb-16 text-center">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white uppercase tracking-widest border-b border-gray-200 dark:border-gray-700 pb-4 inline-block">
                    Tabla de Contenido
                </h2>
            </header>

            <div className="space-y-6 max-w-2xl mx-auto">
                {chapters.map((chapter, idx) => (
                    <div key={idx} className="flex items-baseline group cursor-pointer">
                        <span className="text-lg font-medium text-gray-900 dark:text-gray-200 group-hover:text-primary transition-colors">
                            {chapter.title}
                        </span>
                        <div className="flex-grow mx-4 border-b border-dotted border-gray-400 dark:border-gray-600 relative top-[-4px]" />
                        <span className="text-gray-700 dark:text-gray-400 font-serif italic">
                            {chapter.page}
                        </span>
                    </div>
                ))}
            </div>
        </BookPageContainer>
    );
};
