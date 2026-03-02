'use client';

import React from 'react';
import { BookPageContainer } from '../BookPageContainer';

interface CoverPageProps {
    zoom?: number;
}

export const CoverPage = ({ zoom = 1 }: CoverPageProps) => {
    return (
        <BookPageContainer className="!p-0 overflow-hidden" zoom={zoom} pageId="shared-pag0-cover" showRating={false}>
            <div className="relative w-full h-full min-h-[297mm]">
                <img
                    src="/shared/portada.webp"
                    alt="Portada Matemáticas"
                    className="w-full h-full object-cover"
                    draggable={false}
                />
            </div>
        </BookPageContainer>
    );
};
