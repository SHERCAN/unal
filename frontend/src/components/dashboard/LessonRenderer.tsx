import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lesson } from '@/types/dashboard';

interface LessonRendererProps {
    lesson: Lesson;
    index: number;
    themeColor?: string;
}

export function LessonRenderer({ lesson, index, themeColor = '#3B82F6' }: LessonRendererProps) {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleSelect = (optionIndex: number) => {
        setSelectedOption(optionIndex);
        if (optionIndex === lesson.correctAnswer) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="bg-white dark:bg-[#1a1c23] rounded-3xl p-6 md:p-10 mb-8 shadow-xl border-b-8 border-r-8 border-gray-200 dark:border-gray-800 transform transition-all hover:-translate-y-1 hover:shadow-2xl"
        >
            <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4 mb-2">
                    <span
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-black shadow-lg"
                        style={{ backgroundColor: themeColor }}
                    >
                        {index + 1}
                    </span>
                    <h4 className="text-2xl font-bold text-gray-400 uppercase tracking-widest">Pregunta</h4>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {lesson.imageUrl && (
                        <div className="w-full md:w-1/3">
                            <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white dark:border-gray-700 transform rotate-2 hover:rotate-0 transition-transform duration-300">
                                <img src={lesson.imageUrl} alt="Pregunta" className="w-full h-auto object-cover" />
                            </div>
                        </div>
                    )}

                    <div className="flex-1 w-full">
                        <h3 className="text-3xl md:text-4xl font-black text-text mb-8 leading-tight">
                            {lesson.question}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {lesson.options.map((option, idx) => {
                                let buttonClass = "p-6 rounded-2xl text-left text-xl font-bold transition-all border-4 shadow-sm relative overflow-hidden group ";

                                if (selectedOption === idx) {
                                    if (idx === lesson.correctAnswer) {
                                        buttonClass += "bg-green-100 border-green-500 text-green-700 shadow-[0_0_20px_rgba(34,197,94,0.4)] scale-105 z-10";
                                    } else {
                                        buttonClass += "bg-red-100 border-red-500 text-red-700 shake-animation";
                                    }
                                } else {
                                    buttonClass += "bg-gray-50 dark:bg-gray-800 border-transparent hover:border-primary/30 hover:bg-white dark:hover:bg-gray-700 hover:shadow-md hover:-translate-y-1 active:scale-95 text-text-secondary";
                                }

                                return (
                                    <button
                                        key={idx}
                                        onClick={() => handleSelect(idx)}
                                        className={buttonClass}
                                        disabled={isCorrect === true}
                                    >
                                        <span className={`inline-block w-8 mr-3 opacity-50 font-black ${selectedOption === idx ? 'opacity-100' : ''}`}>
                                            {String.fromCharCode(65 + idx)}
                                        </span>
                                        {option}
                                    </button>
                                );
                            })}
                        </div>

                        {isCorrect === true && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                className="mt-8 p-6 bg-gradient-to-r from-green-400 to-emerald-600 text-white rounded-2xl font-black text-2xl flex items-center justify-center gap-4 shadow-lg shadow-green-500/30"
                            >
                                <span className="text-4xl">🎉</span>
                                ¡Excelente Trabajo!
                                <span className="text-4xl">✨</span>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
