import React from 'react';
import { TopicConfig } from '@/types/topic';

interface IndexPageProps {
    topics: TopicConfig[];
    onNavigate: (pageIndex: number) => void;
    zoom?: number;
}

export function IndexPage({ topics, onNavigate, zoom = 1 }: IndexPageProps) {
    let globalPageIndex = 1; // Index 0 is THIS page (IndexPage), so first content page is 1.

    return (
        <div
            className="bg-white dark:bg-[#1a1c23] min-h-[800px] w-full rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8 md:p-12 mb-16 relative overflow-hidden flex flex-col"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'top center', transition: 'transform 0.3s ease' }}
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-bl-[100px] -z-10"></div>

            <h1 className="text-4xl md:text-5xl font-black text-center mb-12 text-gray-800 dark:text-white uppercase tracking-wider relative inline-block self-center">
                Índice de Contenidos
                <div className="absolute -bottom-4 left-0 w-full h-1.5 bg-primary rounded-full"></div>
            </h1>

            <div className="flex-1 overflow-auto pr-4 custom-scrollbar">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-6xl mx-auto">
                    {topics.map((topic, topicIdx) => {
                        const topicStartPage = globalPageIndex;
                        const topicPages = [...topic.pages, ...topic.exercisePages];

                        const element = (
                            <div key={topic.id} className="relative">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 bg-purple-700 text-white rounded-xl flex items-center justify-center font-black text-xl shadow-md shrink-0">
                                        {topicIdx + 1}
                                    </div>
                                    <h2
                                        className="text-xl font-bold text-gray-800 dark:text-white cursor-pointer hover:text-primary transition-colors flex-1 border-b-2 border-dashed border-gray-300 dark:border-gray-700 pb-2 uppercase tracking-tight"
                                        onClick={() => onNavigate(topicStartPage)}
                                    >
                                        {topic.name}
                                    </h2>
                                </div>

                                <ul className="pl-14 space-y-2">
                                    {topic.pages.map((p, i) => {
                                        const pageNum = topicStartPage + i;
                                        return (
                                            <li
                                                key={p.id}
                                                className="flex items-center justify-between text-base text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary cursor-pointer hover:font-medium transition-all group"
                                                onClick={() => onNavigate(pageNum)}
                                            >
                                                <span className="flex items-center gap-2 truncate">
                                                    <span className="w-1 h-1 rounded-full bg-gray-400 group-hover:bg-primary transition-colors shrink-0"></span>
                                                    <span className="truncate">{p.title || `Parte ${i + 1}`}</span>
                                                </span>
                                                <span className="font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs group-hover:bg-primary group-hover:text-white transition-colors shrink-0 ml-2">
                                                    Pág. {pageNum}
                                                </span>
                                            </li>
                                        );
                                    })}
                                    {topic.exercisePages.length > 0 && (
                                        <li
                                            className="flex items-center justify-between text-base text-purple-600 dark:text-purple-400 font-bold hover:text-primary dark:hover:text-primary cursor-pointer transition-all mt-3 pt-2 border-t border-gray-100 dark:border-gray-800 group"
                                            onClick={() => onNavigate(topicStartPage + topic.pages.length)}
                                        >
                                            <span className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-sm bg-purple-500 group-hover:bg-primary transition-colors"></span>
                                                EJERCICIOS
                                            </span>
                                            <span className="font-mono bg-purple-50 dark:bg-purple-900/30 px-2 py-0.5 rounded text-xs group-hover:bg-primary group-hover:text-white transition-colors">
                                                Pág. {topicStartPage + topic.pages.length}
                                            </span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        );

                        globalPageIndex += topicPages.length;
                        return element;
                    })}
                </div>
            </div>
        </div>
    );
}
