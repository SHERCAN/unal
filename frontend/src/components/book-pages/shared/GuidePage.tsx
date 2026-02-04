import React from 'react';
import { BookPageContainer } from '../BookPageContainer';

interface GuidePageProps {
    zoom?: number;
}

export const GuidePage = ({ zoom = 1 }: GuidePageProps) => {
    return (
        <BookPageContainer zoom={zoom}>
            <header className="mb-12 border-b-2 border-gray-100 dark:border-gray-700 pb-4">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Guía de Usuario</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">Cómo aprovechar al máximo este recurso</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mr-4 shrink-0">1</div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-gray-100">Navegación</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                                Desplácese verticalmente para avanzar entre páginas. El progreso se guarda automáticamente.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mr-4 shrink-0">2</div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-gray-100">Interactividad</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                                Haga clic en los elementos resaltados para ver información detallada o ejemplos adicionales.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mr-4 shrink-0">3</div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-gray-100">Ejercicios</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                                Al final de cada sección encontrará ejercicios prácticos para validar su aprendizaje.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mr-4 shrink-0">4</div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-gray-100">Recursos</h3>
                            <p className="text-gray-700 dark:text-gray-300 text-sm mt-1">
                                Utilice los enlaces externos para profundizar en temas específicos de su interés.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 p-6 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-100 dark:border-amber-900/30">
                <h4 className="font-bold text-amber-900 dark:text-amber-500 mb-2">Nota Importante</h4>
                <p className="text-amber-800 dark:text-amber-200/80 text-sm">
                    Este manual se actualiza periódicamente. Asegúrese de revisar la sección de notificaciones para estar al tanto de los nuevos contenidos.
                </p>
            </div>
        </BookPageContainer>
    );
};
