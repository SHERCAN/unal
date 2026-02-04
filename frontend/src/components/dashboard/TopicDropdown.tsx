import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Topic, Lesson } from '@/types/dashboard';

interface TopicDropdownProps {
    topics: Topic[];
    onSelectTopic: (topicId: string) => void;
    activeTopicId?: string;
    exerciseProgress?: {
        completed: number;
        total: number;
    };
    onNavigateToPage?: (page: number) => void;
}

const ProgressIcon = ({ progress, showPercentage }: { progress: number; showPercentage?: boolean }) => {
    if (progress === 100) {
        return (
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </div>
        );
    }

    if (progress > 0) {
        return (
            <div className="relative w-8 h-8 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                        className="text-gray-300"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                    />
                    <path
                        className="text-green-500"
                        strokeDasharray={`${progress}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                    />
                </svg>
                {showPercentage && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-white">{Math.round(progress)}%</span>
                    </div>
                )}
            </div>
        );
    }

    // Empty circle
    return <div className="w-6 h-6 rounded-full border-2 border-gray-400"></div>;
};


export function TopicDropdown({ topics, onSelectTopic, activeTopicId, exerciseProgress, onNavigateToPage }: TopicDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedTopicId, setExpandedTopicId] = useState<string | null>(topics[0]?.id || null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const toggleTopic = (id: string) => {
        setExpandedTopicId(expandedTopicId === id ? null : id);
    };

    // Calcular progreso del módulo completo basado en ejercicios
    const getModuleProgress = () => {
        if (!exerciseProgress || exerciseProgress.total === 0) return 0;
        return Math.round((exerciseProgress.completed / exerciseProgress.total) * 100);
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

    const handleTopicClick = (topicId: string) => {
        onSelectTopic(topicId);
        // Navigate to page 1 (cover page)
        if (onNavigateToPage) {
            onNavigateToPage(1);
        }
        // Close the dropdown
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
                            {topics.map((topic, index) => (
                                <div key={topic.id} className="border-b border-purple-500/20 last:border-0">
                                    {/* Topic Button */}
                                    <button
                                        onClick={() => toggleTopic(topic.id)}
                                        className={`w-full text-left p-4 flex items-center justify-between hover:bg-white/5 transition-colors ${expandedTopicId === topic.id ? 'bg-white/10' : ''}`}
                                    >
                                        <span className="font-bold text-lg text-white">{index + 1}. {topic.title}</span>
                                        <ProgressIcon
                                            progress={getModuleProgress()}
                                            showPercentage={getModuleProgress() > 0 && getModuleProgress() < 100}
                                        />
                                    </button>

                                    {/* Nested Lessons */}
                                    <AnimatePresence>
                                        {expandedTopicId === topic.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden bg-[#581c87]/50"
                                            >
                                                <div className="px-4 pb-4 pt-2 space-y-2">
                                                    {topic.lessons.length > 0 ? (
                                                        topic.lessons.map((lesson, lIndex) => {
                                                            const letter = String.fromCharCode(97 + lIndex); // a, b, c...
                                                            return (
                                                                <div key={lesson.id} className="flex items-center justify-between pl-4 py-2 hover:bg-white/5 rounded-lg cursor-pointer group" onClick={() => handleTopicClick(topic.id)}>
                                                                    <span className="text-white/90 font-medium group-hover:text-white transition-colors">
                                                                        {letter}. {lesson.title}
                                                                    </span>
                                                                    <ProgressIcon
                                                                        progress={getModuleProgress()}
                                                                        showPercentage={false}
                                                                    />
                                                                </div>
                                                            )
                                                        })
                                                    ) : (
                                                        <div className="pl-4 py-2 text-white/50 text-sm italic">No hay lecciones aún</div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
