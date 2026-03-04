import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import React from 'react';
import { TopicConfig } from '@/types/topic';
import dynamic from 'next/dynamic';

const CoverPage = dynamic(() => import('../book-pages/shared/CoverPage').then(mod => mod.CoverPage));
const SinopsisPage = dynamic(() => import('../book-pages/shared/SinopsisPage').then(mod => mod.SinopsisPage));
const IndexPage = dynamic(() => import('./IndexPage').then(mod => mod.IndexPage));
import { BookProvider } from '@/contexts/BookContext';

interface InfiniteBookProps {
    topics: TopicConfig[];
    onPageChange?: (page: number, completed: number[]) => void;
    onNavigationRequest?: (callback: (page: number) => void) => void;
}

export function InfiniteBook({ topics, onPageChange, onNavigationRequest }: InfiniteBookProps) {
    const [globalZoom, setGlobalZoom] = useState(1);
    const [currentPage, setCurrentPage] = useState(0); // 0 is Portada
    const [completedPages, setCompletedPages] = useState<number[]>([]);
    const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Progressive loading state
    const [loadedLimit, setLoadedLimit] = useState(2);

    const handleZoomIn = () => {
        setGlobalZoom(prev => Math.min(prev + 0.1, 2)); // Max 200%
    };

    const handleZoomOut = () => {
        setGlobalZoom(prev => Math.max(prev - 0.1, 0.5)); // Min 50%
    };

    const handleResetZoom = () => {
        setGlobalZoom(1);
    };

    const navigateToPage = useCallback((page: number) => {
        const element = pageRefs.current[page];
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);


    // Intersection Observer for page tracking
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            let maxEntry: IntersectionObserverEntry | null = null;
            let maxRatio = 0;

            entries.forEach((entry) => {
                if (entry.intersectionRatio > maxRatio) {
                    maxRatio = entry.intersectionRatio;
                    maxEntry = entry;
                }
            });

            if (maxEntry && maxRatio > 0.1) {
                const pageIndex = pageRefs.current.findIndex(ref => ref === maxEntry!.target);
                if (pageIndex !== -1) {
                    setCurrentPage(pageIndex);
                    const newCompleted = Array.from(new Set([...Array.from({ length: pageIndex }, (_, i) => i)]));
                    setCompletedPages(newCompleted);
                }
            }
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        pageRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    // Notify parent of page changes
    useEffect(() => {
        if (onPageChange) {
            onPageChange(currentPage, completedPages);
        }
    }, [currentPage, completedPages, onPageChange]);

    // Expose navigation function to parent
    useEffect(() => {
        if (onNavigationRequest) {
            onNavigationRequest(navigateToPage);
        }
    }, [onNavigationRequest, navigateToPage]);

    // Combine special pages + index + all lesson pages and exercise pages from all topics
    const allPages = React.useMemo(() => [
        {
            id: 'portada',
            topicId: 'shared',
            component: ({ zoom }: { zoom?: number }) => (
                <CoverPage zoom={zoom} />
            )
        },
        {
            id: 'sinopsis',
            topicId: 'shared',
            component: ({ zoom }: { zoom?: number }) => (
                <SinopsisPage zoom={zoom} />
            )
        },
        // {
        //     id: 'explicacion',
        //     topicId: 'shared',
        //     component: ({ zoom }: { zoom?: number }) => (
        //         <ExplicacionPage zoom={zoom} />
        //     )
        // },
        {
            id: 'index-page',
            topicId: 'shared',
            component: ({ zoom }: { zoom?: number }) => (
                <IndexPage topics={topics} onNavigate={navigateToPage} zoom={zoom} startPageIndex={1} />
            )
        },
        ...topics.flatMap(topic => [
            ...topic.pages.map(p => ({ ...p, topicId: topic.id })),
            ...topic.exercisePages.map(ep => ({ ...ep, isExercise: true, topicId: topic.id }))
        ]),
    ], [topics, navigateToPage]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if the user is typing in an input or select
            if (
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement ||
                (e.target as HTMLElement).isContentEditable
            ) {
                return;
            }

            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                if (currentPage < allPages.length - 1) {
                    e.preventDefault();
                    navigateToPage(currentPage + 1);
                }
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                if (currentPage > 0) {
                    e.preventDefault();
                    navigateToPage(currentPage - 1);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentPage, allPages.length, navigateToPage]);

    const allPagesCount = allPages.length;

    // Progressive loading in the background
    useEffect(() => {
        if (loadedLimit < allPagesCount) {
            const timer = setTimeout(() => {
                setRenderedLimit(prev => Math.min(prev + 5, allPagesCount));
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [loadedLimit, allPagesCount]);

    // Rename for clarity
    const renderedLimit = loadedLimit;
    const setRenderedLimit = setLoadedLimit;

    return (
        <div className="max-w-5xl mx-auto bg-transparent min-h-screen px-4 md:px-8 pb-40">
            {/* Global Zoom Controls */}
            <div className="fixed top-24 right-8 z-50 flex flex-col gap-2 bg-white dark:bg-[#1a1c23] p-3 rounded-lg shadow-xl dark:shadow-none dark:border dark:border-white/10 opacity-60 hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={handleZoomIn}
                    disabled={globalZoom >= 2}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                    title="Zoom In"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                    <span className="text-sm font-medium">Zoom +</span>
                </button>

                <button
                    onClick={handleResetZoom}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-all duration-200 flex items-center gap-2"
                    title="Reset Zoom"
                >
                    <span className="text-sm font-medium">{Math.round(globalZoom * 100)}%</span>
                </button>

                <button
                    onClick={handleZoomOut}
                    disabled={globalZoom <= 0.5}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
                    title="Zoom Out"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0113 0H7" />
                    </svg>
                    <span className="text-sm font-medium">Zoom -</span>
                </button>
            </div>

            <div className="relative z-10">
                {allPages.map((pageDef, index) => {
                    const PageComponent = pageDef.component;
                    // Lazy load condition:
                    // 1. Within current progressive load limit
                    // 2. Currently visible or near visible (3 pages buffer)
                    const shouldRender = index < renderedLimit || Math.abs(index - currentPage) < 3;

                    return (
                        <motion.div
                            key={`${pageDef.id}-${index}`}
                            ref={(el) => { pageRefs.current[index] = el; }}
                            initial={index === 0 ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="[scroll-snap-align:start_end] snap-always mb-16"
                            style={{ scrollMarginTop: '1rem', minHeight: shouldRender ? 'auto' : '800px' }}
                        >
                            {shouldRender ? (
                                <BookProvider value={{ topicId: (pageDef as any).topicId || 'shared', globalPageNumber: index }}>
                                    <PageComponent zoom={globalZoom} />
                                </BookProvider>
                            ) : (
                                <div className="bg-white/30 dark:bg-gray-800/20 backdrop-blur rounded-2xl h-[800px] flex items-center justify-center border border-gray-200 dark:border-gray-800 animate-pulse">
                                    <div className="text-gray-400 dark:text-gray-600 font-bold">Cargando Página {index + 1}...</div>
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* End Indicator */}
            <div className="relative z-10 text-center py-12 mb-32">
                <div className="inline-block p-4 rounded-full bg-white/50 backdrop-blur text-primary animate-pulse shadow-sm">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

