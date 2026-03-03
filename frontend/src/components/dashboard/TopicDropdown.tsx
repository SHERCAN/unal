import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TopicConfig } from '@/types/topic';
import { useVideoProgress } from '@/hooks/useVideoProgress';

interface TopicDropdownProps {
    topicConfigs: TopicConfig[];
    onNavigateToPage?: (page: number) => void;
    currentPage?: number;
    // Real progress data
    watchedVideos?: string[];
    completedExercises?: Record<string, { completed: boolean; attemptCount: number }>;
    completedStages?: string[];
}

// Map topic config ID to the tracking ID prefix used in video/exercise IDs
const getTrackingPrefix = (topicId: string): string => {
    // Config IDs use hyphens (e.g. 'division-exacta'), 
    // but tracking IDs use underscores (e.g. 'division_exacta-pag7-v1')
    return topicId.replace(/-/g, '_');
};

// Count total trackable items (videos + exercises + activities) for each topic
// These are defined in the page components with patterns like [prefix]-pag[N]-v[M], [prefix]-pag[N]-ej[M], etc.
const TOPIC_TOTAL_ITEMS: Record<string, number> = {
    'division': 18,              // pag1-6: videos + CPA games + exercises
    'division_exacta': 14,       // pag7-10: videos + CPA games + exercises
    'division_inexacta': 16,     // pag11-13: videos + CPA games + exercises
    'numeros_primos': 9,         // pag14-16: videos + CPA game + exercises
    'fracciones': 16,            // pag17-22: videos + CPA games + exercises
    'fracciones_equivalentes': 22, // pag23-28: videos + CPA games + exercises
    'comparacion_fracciones': 10,  // pag29-31: videos + CPA games + exercises
};

const ProgressCircle = ({ progress }: { progress: number }) => {
    const isComplete = progress >= 100;

    if (isComplete) {
        return (
            <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-green-500/30">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </div>
        );
    }

    if (progress > 0) {
        return (
            <div className="relative w-7 h-7 flex items-center justify-center flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                        className="text-white/20"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                    />
                    <path
                        className="text-green-400"
                        strokeDasharray={`${progress}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        );
    }

    // Empty circle
    return <div className="w-7 h-7 rounded-full border-2 border-white/30 flex-shrink-0"></div>;
};

export function TopicDropdown({
    topicConfigs,
    onNavigateToPage,
    currentPage = 0,
    watchedVideos = [],
    completedExercises = {},
    completedStages = [],
}: TopicDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleTopic = (id: string) => {
        setExpandedTopicId(expandedTopicId === id ? null : id);
    };

    // Auto-expand current topic
    useEffect(() => {
        let offset = 3;
        for (const topic of topicConfigs) {
            const count = topic.pages.length + topic.exercisePages.length;
            if (currentPage >= offset && currentPage < offset + count) {
                setExpandedTopicId(topic.id);
                return;
            }
            offset += count;
        }
    }, [currentPage, topicConfigs]);

    // Calculate page offsets for each topic
    const getTopicOffsets = () => {
        const offsets: Record<string, { explanationPage: number; exercisePage: number; totalPages: number }> = {};
        let offset = 3;
        for (const topic of topicConfigs) {
            offsets[topic.id] = {
                explanationPage: offset,
                exercisePage: offset + topic.pages.length,
                totalPages: topic.pages.length + topic.exercisePages.length,
            };
            offset += topic.pages.length + topic.exercisePages.length;
        }
        return offsets;
    };

    const topicOffsets = getTopicOffsets();

    // Calculate REAL progress for a topic based on completed videos, exercises, and stages
    const getTopicProgress = (topicId: string): number => {
        const prefix = getTrackingPrefix(topicId);
        const totalItems = TOPIC_TOTAL_ITEMS[prefix];
        if (!totalItems) return 0;

        // Count watched videos for this topic
        const topicVideos = watchedVideos.filter((v: string) => v.startsWith(prefix + '-'));

        // Count completed exercises for this topic
        const topicExercises = Object.entries(completedExercises)
            .filter(([id, data]: [string, any]) => id.startsWith(prefix + '-') && data.completed);

        // Count completed stages for this topic
        const topicStages = completedStages.filter((s: string) => s.startsWith(prefix + '-'));

        const completedCount = topicVideos.length + topicExercises.length + topicStages.length;

        return Math.min(100, Math.round((completedCount / totalItems) * 100));
    };

    // Auto-collapse when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const handleNavigate = (page: number) => {
        if (onNavigateToPage) {
            onNavigateToPage(page);
        }
        setIsOpen(false);
    };

    return (
        <div ref={dropdownRef} className="w-full md:w-80 relative z-50">
            {/* Main Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-[#7e22ce] text-white rounded-xl shadow-xl border border-purple-500/30 p-4 font-black tracking-wide text-sm flex justify-between items-center hover:bg-[#6b21a8] transition-colors"
                type="button"
            >
                <span>LISTA DE TEMAS</span>
                <svg className={`w-5 h-5 text-white/70 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-full bg-[#7e22ce] rounded-xl overflow-hidden shadow-2xl border border-purple-500/30"
                    >
                        <div className="flex flex-col max-h-[70vh] overflow-y-auto">
                            {/* Indices Item */}
                            <div className="border-b border-purple-500/20">
                                <button
                                    onClick={() => handleNavigate(2)}
                                    className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors ${currentPage === 2 ? 'border-l-4 border-green-400 bg-white/10' : ''}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        <span className="font-bold text-base text-white">
                                            Indices
                                        </span>
                                    </div>
                                </button>
                            </div>

                            {topicConfigs.map((topic, index) => {
                                const progress = getTopicProgress(topic.id);
                                const offsets = topicOffsets[topic.id];
                                const isExpanded = expandedTopicId === topic.id;

                                const isCurrentTopic = offsets &&
                                    currentPage >= offsets.explanationPage &&
                                    currentPage < offsets.explanationPage + offsets.totalPages;

                                return (
                                    <div key={topic.id} className="border-b border-purple-500/20 last:border-0">
                                        {/* Topic Header */}
                                        <button
                                            onClick={() => toggleTopic(topic.id)}
                                            className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-white/5 transition-colors ${isExpanded ? 'bg-white/10' : ''} ${isCurrentTopic ? 'border-l-4 border-green-400' : ''}`}
                                        >
                                            <span className="font-bold text-base text-white">
                                                {index + 1}. {topic.name}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <ProgressCircle progress={progress} />
                                                <svg
                                                    className={`w-4 h-4 text-white/50 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </button>

                                        {/* Sub-items: Explicación + Ejercicios */}
                                        <AnimatePresence>
                                            {isExpanded && offsets && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden bg-[#581c87]/50"
                                                >
                                                    <div className="px-4 pb-3 pt-1 space-y-1">
                                                        {/* Explicación */}
                                                        <button
                                                            onClick={() => handleNavigate(offsets.explanationPage)}
                                                            className={`w-full text-left pl-6 py-2.5 rounded-lg flex items-center gap-3 transition-all group
                                                                ${currentPage >= offsets.explanationPage && currentPage < offsets.exercisePage
                                                                    ? 'bg-white/15 text-white'
                                                                    : 'hover:bg-white/5 text-white/80 hover:text-white'
                                                                }`}
                                                        >
                                                            <svg className="w-4 h-4 text-yellow-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                            </svg>
                                                            <span className="font-semibold text-sm">
                                                                a. Explicación
                                                            </span>
                                                        </button>

                                                        {/* Ejercicios */}
                                                        {topic.exercisePages.length > 0 && (
                                                            <button
                                                                onClick={() => handleNavigate(offsets.exercisePage)}
                                                                className={`w-full text-left pl-6 py-2.5 rounded-lg flex items-center gap-3 transition-all group
                                                                    ${currentPage >= offsets.exercisePage && currentPage < offsets.explanationPage + offsets.totalPages
                                                                        ? 'bg-white/15 text-white'
                                                                        : 'hover:bg-white/5 text-white/80 hover:text-white'
                                                                    }`}
                                                            >
                                                                <svg className="w-4 h-4 text-cyan-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                                                </svg>
                                                                <span className="font-semibold text-sm">
                                                                    b. Ejercicios
                                                                </span>
                                                            </button>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
