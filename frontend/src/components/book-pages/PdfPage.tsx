'use client';

import React from 'react';
import { BookPageContainer } from './BookPageContainer';

interface PdfPageProps {
    pdfPath: string;
    zoom?: number;
    pageId?: string;
}

export function PdfPage({ pdfPath, zoom = 1, pageId }: PdfPageProps) {
    return (
        <BookPageContainer zoom={zoom} pageId={pageId} className="!p-0 overflow-hidden" showRating={false}>
            <div className="w-full h-[297mm] overflow-hidden">
                <iframe
                    src={`${pdfPath}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                    className="w-full h-full border-none"
                    title={pdfPath}
                />
            </div>
        </BookPageContainer>
    );
}
