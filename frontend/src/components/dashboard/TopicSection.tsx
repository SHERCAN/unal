import { Topic } from '@/types/dashboard';
import { LessonRenderer } from './LessonRenderer';
import { motion } from 'framer-motion';
import { AnimatedIcon } from '@/components/ui/AnimatedIcon';

interface TopicSectionProps {
    topic: Topic;
}

export function TopicSection({ topic }: TopicSectionProps) {
    return (
        <section id={`topic-${topic.id}`} className="min-h-screen py-12 border-b-4 border-dashed border-gray-300 dark:border-gray-700 last:border-0">

            {/* Portada Animada */}
            <div className="relative h-80 md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-2xl group border-4 border-white dark:border-gray-800 transform hover:scale-[1.01] transition-transform duration-500">
                <div
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: 'url("/portada.png")' }}
                />
                <div
                    className="absolute inset-0 bg-primary/40 mix-blend-multiply z-10"
                    style={{ backgroundColor: topic.color }}
                />

                {/* Elementos Flotantes Decorativos */}
                <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
                    <AnimatedIcon delay={0} duration={4} className="absolute top-10 right-10 opacity-30">
                        <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>
                    </AnimatedIcon>
                    <AnimatedIcon delay={1} duration={5} className="absolute bottom-20 left-10 opacity-30">
                        <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /></svg>
                    </AnimatedIcon>
                </div>

                <div className="relative z-30 h-full flex flex-col justify-center items-center text-center p-8 md:p-12">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="bg-white/90 dark:bg-black/60 backdrop-blur-md p-8 rounded-3xl shadow-xl border-4 border-white transform rotate-1 hover:rotate-0 transition-transform duration-300"
                    >
                        <h2
                            className="text-5xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 mb-4 tracking-tight drop-shadow-sm"
                            style={{ backgroundImage: `linear-gradient(to right, ${topic.color}, #9333ea)` }}
                        >
                            {topic.title}
                        </h2>
                        <p className="text-gray-800 dark:text-white text-xl md:text-2xl font-bold max-w-2xl mx-auto leading-relaxed">
                            {topic.introText}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Presentación Juguetona */}
            <div className="mb-16 px-4 max-w-4xl mx-auto">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="flex flex-col md:flex-row items-center gap-8 bg-background-secondary rounded-3xl p-8 shadow-lg border-2 border-primary/20"
                    style={{ borderColor: `${topic.color}40` }}
                >
                    <div className="p-6 rounded-full bg-white shadow-md transform -rotate-6" style={{ color: topic.color }}>
                        <AnimatedIcon>
                            <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </AnimatedIcon>
                    </div>
                    <div className="text-center md:text-left">
                        <h3 className="text-3xl font-black text-text mb-3">¡Aprende Jugando!</h3>
                        <p className="text-text-secondary text-xl font-medium leading-relaxed">
                            {topic.presentationText}
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Índice Dinámico con Tarjetas Grandes */}
            <div className="mt-12">
                <div className="flex items-center justify-center gap-3 mb-12">
                    <span className="text-4xl">🚀</span>
                    <h3 className="text-3xl font-black text-text uppercase tracking-wider">Tus Misiones</h3>
                    <span className="text-4xl">⭐</span>
                </div>

                <div className="space-y-8 px-4">
                    {topic.lessons.length > 0 ? (
                        topic.lessons.map((lesson, idx) => (
                            <LessonRenderer key={lesson.id} lesson={lesson} index={idx} themeColor={topic.color} />
                        ))
                    ) : (
                        <div className="text-center py-16 bg-background-secondary rounded-3xl border-4 border-dashed border-gray-300 dark:border-gray-700 mx-4">
                            <span className="text-6xl mb-4 block">🚧</span>
                            <p className="text-text-secondary text-xl font-bold">¡Próximamente más diversión!</p>
                        </div>
                    )}
                </div>
            </div>

        </section>
    );
}
