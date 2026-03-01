'use client';

import React from 'react';
import { BookPageContainer } from '../BookPageContainer';

interface SinopsisPageProps {
    zoom?: number;
}

export const SinopsisPage = ({ zoom = 1 }: SinopsisPageProps) => {
    return (
        <BookPageContainer className="!p-0 overflow-hidden" zoom={zoom} pageId="shared-pag1-sinopsis" showRating={false}>
            <div className="relative w-full min-h-[297mm] flex flex-col">
                {/* Purple left bar */}
                <div className="absolute left-0 top-0 bottom-0 w-[38px] z-10" style={{ background: 'linear-gradient(180deg, #7c3aed 0%, #6b21a8 100%)' }} />

                {/* Content area */}
                <div className="relative z-20 flex flex-col flex-1 pl-[70px] pr-16 pt-16 pb-12" style={{ fontFamily: "'Montserrat', sans-serif", fontSize: '16px' }}>

                    {/* Intro paragraph */}
                    <div className="space-y-8 mb-12">
                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-justify">
                            El equipo de elaboración del Libro Digital de Texto de Matemáticas Accesible e Interactivo (LDTMAI) está conformado por profesionales en educación, matemáticas, tecnología educativa y LSC. Su propósito es diseñar recursos pedagógicos accesibles y de alta calidad, orientados a responder a las necesidades lingüísticas, didácticas y cognitivas de estudiantes sordos e hipoacúsicos.
                        </p>

                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-justify">
                            Agradecemos a la comunidad educativa del Colegio Republica Dominancia IED, especialmente a los estudiantes sordos e hipoacúsicos que participaron en las pruebas piloto, cuya retroalimentación fue fundamental para mejorar la calidad del libro.
                        </p>
                    </div>

                    {/* Separator line */}
                    <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mb-12" />

                    {/* Copyright section */}
                    <div className="space-y-6 flex-1">
                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-justify">
                            © 2026. Universidad Nacional de Colombia y equipo de autores del LDTMAI. Todos los derechos reservados.
                        </p>

                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-justify">
                            Este libro digital de texto de matemáticas accesible e interactivo ha sido desarrollado en el marco de un proyecto apoyado por la convocatoria interna de Dirección Nacional de Extensión, Innovación y Propiedad Intelectual de la Universidad Nacional de Colombia.
                        </p>

                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-justify">
                            Todos los derechos patrimoniales y morales sobre la obra están reservados. Queda prohibida la reproducción total o parcial de este contenido, así como su distribución, comunicación pública, transformación o adaptación, por cualquier medio o procedimiento, sin la autorización previa y por escrito de la Universidad Nacional de Colombia y del equipo de autores, salvo las excepciones previstas por la legislación vigente.
                        </p>

                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-justify">
                            El uso de este material con fines educativos, investigativos o académicos deberá respetar los derechos de autor y citar adecuadamente la fuente.
                        </p>

                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed text-justify">
                            La Universidad Nacional de Colombia no se hace responsable por el uso indebido del contenido ni por las interpretaciones que terceros realicen a partir del mismo.
                        </p>
                    </div>

                    {/* Footer - University logo */}
                    <div className="flex justify-end items-center gap-3 mt-auto pt-4">
                        <img
                            src="https://cdiac.manizales.unal.edu.co/imagenes/LogosMini/un.png"
                            alt="Universidad Nacional de Colombia"
                            className="h-16 object-contain"
                            draggable={false}
                        />
                    </div>
                </div>
            </div>
        </BookPageContainer>
    );
};
