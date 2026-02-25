import React from 'react';
import { PageRating } from '../PageRating';
import { useBookContext } from '@/contexts/BookContext';

interface ModuleHeader {
    icon?: string;
    name: string;
}

interface BookPageContainerProps {
    children: React.ReactNode;
    className?: string;
    zoom: number; // Zoom controlled by parent
    moduleHeader?: ModuleHeader; // Optional module header
    pageId?: string; // Unique identifier for the page (for ratings)
}

export const BookPageContainer: React.FC<BookPageContainerProps> = ({ children, className = '', zoom, moduleHeader, pageId }) => {
    return (
        <div className="relative w-full flex flex-col items-center py-8">
            {/* A4 Page Container */}
            <div
                className={`bg-white dark:bg-[#1a1c23] dark:text-gray-100 shadow-2xl dark:shadow-none dark:border dark:border-white/10 relative transition-all duration-300 ${className}`}
                style={{
                    width: '210mm', // A4 width
                    minHeight: '297mm', // A4 height
                    transform: `scale(${zoom})`,
                    transformOrigin: 'top center',
                    marginBottom: zoom > 1 ? `${(297 * (zoom - 1))}px` : '0',
                }}
            >
                {/* Module Header - Redesigned */}
                {moduleHeader && (
                    <div className="pt-8 px-12">
                        {/* Icon and Title Row */}
                        <div className="flex items-center gap-4 mb-3">
                            {moduleHeader.icon && (
                                <img
                                    src={moduleHeader.icon}
                                    alt={`${moduleHeader.name} icon`}
                                    className="w-16 h-16 object-contain flex-shrink-0"
                                />
                            )}
                            <h3
                                className="text-3xl font-bold uppercase tracking-wide"
                                style={{ color: '#6b21a8' }}
                            >
                                {moduleHeader.name}
                            </h3>
                        </div>

                        {/* Horizontal Divider Line */}
                        <div
                            className="h-1 w-full rounded-full"
                            style={{ background: 'linear-gradient(to right, #6b21a8 0%, #6b21a8 40%, #e9d5ff 100%)' }}
                        />
                    </div>
                )}

                {/* Paper texture overlay */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none mix-blend-multiply dark:mix-blend-overlay bg-noise" />

                {/* Page content */}
                <div className={`relative z-10 ${moduleHeader ? 'pt-8' : 'pt-12'} px-12 pb-12 md:px-16 md:pb-16`}>
                    {children}
                </div>

                {/* Fold effect gradient - book-like appearance */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-200/50 dark:from-black/40 to-transparent pointer-events-none" />

                {/* Rating Widget */}
                {(() => {
                    // Use BookContext if available to generate a standardized pageId
                    const bookContext = useBookContext();
                    const finalPageId = bookContext
                        ? `${bookContext.topicId}-pag${bookContext.globalPageNumber}`
                        : pageId;

                    return finalPageId ? <PageRating pageId={finalPageId} /> : null;
                })()}
            </div>
        </div>
    );
};
