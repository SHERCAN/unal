'use client';

import React from 'react';
import { BookPageContainer } from './BookPageContainer';

interface ExercisePage1Props {
    zoom?: number;
}

export function ExercisePage1({ zoom = 1 }: ExercisePage1Props) {
    return (
        <BookPageContainer
            zoom={zoom}
            moduleHeader={{
                icon: '/division-icon.png',
                name: 'Ejercicios'
            }}
            pageId="shared-exercises-1"
        >
            <div className="space-y-8">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-6">
                        Ejercicio de Práctica
                    </h3>

                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                                1. Resuelve la siguiente división:
                            </p>
                            <div className="flex items-center justify-center gap-4 text-4xl font-bold text-purple-600">
                                <span>24</span>
                                <span>÷</span>
                                <span>6</span>
                                <span>=</span>
                                <span className="border-b-4 border-purple-400 px-8">____</span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                                2. ¿Cuántos grupos de 3 hay en 15?
                            </p>
                            <div className="flex items-center justify-center gap-4 text-4xl font-bold text-purple-600">
                                <span>15</span>
                                <span>÷</span>
                                <span>3</span>
                                <span>=</span>
                                <span className="border-b-4 border-purple-400 px-8">____</span>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-4">
                                3. Si tengo 20 caramelos y los reparto entre 4 amigos, ¿cuántos recibe cada uno?
                            </p>
                            <div className="flex items-center justify-center gap-4 text-4xl font-bold text-purple-600">
                                <span>20</span>
                                <span>÷</span>
                                <span>4</span>
                                <span>=</span>
                                <span className="border-b-4 border-purple-400 px-8">____</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        💡 <strong>Recuerda:</strong> La división reparte en partes iguales. Puedes usar multiplicación para verificar tu respuesta.
                    </p>
                </div>
            </div>
        </BookPageContainer>
    );
}
