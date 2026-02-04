import React from 'react';
import { BookPageContainer } from '../BookPageContainer';

interface CoverPageProps {
    zoom?: number;
}

export const CoverPage = ({ zoom = 1 }: CoverPageProps) => {
    return (
        <BookPageContainer className="flex items-center justify-center text-center" zoom={zoom}>
            <div className="space-y-12">
                <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center border-4 border-primary/20">
                    {/* Logo Placeholder */}
                    <span className="text-4xl">📚</span>
                </div>

                <div className="space-y-4">
                    <h1 className="text-6xl font-serif font-bold text-black dark:text-white tracking-tight">
                        Infinite<span className="text-primary">Book</span>
                    </h1>
                    <p className="text-xl text-gray-700 dark:text-gray-200 font-light uppercase tracking-widest">
                        Manual de Aprendizaje Interactivo
                    </p>
                </div>

                <div className="pt-24 space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">Universidad Nacional</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">2026</p>
                </div>
            </div>
        </BookPageContainer>
    );
};
