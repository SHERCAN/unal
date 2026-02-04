import React from 'react';
import { BookPageContainer } from '../BookPageContainer';

interface ExplanationPageProps {
    zoom?: number;
}

export const ExplanationPage = ({ zoom = 1 }: ExplanationPageProps) => {
    return (
        <BookPageContainer zoom={zoom}>
            <header className="mb-8 border-b-2 border-gray-100 dark:border-gray-700 pb-4">
                <h2 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Explicación Detallada</h2>
            </header>

            <div className="space-y-8 font-serif">
                <section>
                    <h3 className="text-xl font-bold text-primary mb-3">1. Fundamentación Teórica</h3>
                    <p className="text-gray-800 dark:text-gray-300 leading-relaxed mb-4">
                        Para entender completamente el fenómeno, primero debemos diseccionarlo en sus componentes básicos.
                        Como se observa en los modelos tradicionales, la interacción entre variables es compleja y no lineal.
                        Sin embargo, al aislar cada factor, podemos predecir comportamientos con mayor precisión.
                    </p>
                    <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
                        La ecuación fundamental que rige este sistema puede expresarse como la suma de sus partes interactuantes,
                        ponderadas por su relevancia en el contexto específico.
                    </p>
                </section>

                <section className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-blue-900 dark:text-blue-300 mb-3">2. Aplicación Práctica</h3>
                    <p className="text-blue-900 dark:text-blue-200 leading-relaxed">
                        En un escenario real, esto se traduce en una mejora significativa de la eficiencia.
                        Por ejemplo, al aplicar el <strong>Principio de Optimización</strong>, observamos una reducción
                        del 20% en los tiempos de respuesta.
                    </p>
                </section>

                <section>
                    <h3 className="text-xl font-bold text-primary mb-3">3. Conclusiones Preliminares</h3>
                    <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
                        Es evidente que la metodología propuesta ofrece ventajas sustanciales sobre los enfoques clásicos.
                        No obstante, se requiere una implementación cuidadosa para evitar efectos secundarios no deseados
                        en sistemas acoplados.
                    </p>
                </section>
            </div>
        </BookPageContainer>
    );
};
