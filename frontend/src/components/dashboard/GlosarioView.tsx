'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoPlayCircle, IoBookOutline } from 'react-icons/io5';

const TOPICS = [
    { id: 'cociente', title: 'COCIENTE' },
    { id: 'exacta', title: 'EXACTA' },
    { id: 'inexacta', title: 'INEXACTA' },
    { id: 'resto', title: 'RESTO' },
    { id: 'division', title: 'DIVISIÓN' },
    { id: 'dividendo', title: 'DIVIDENDO' },
    { id: 'divisor', title: 'DIVISOR' },
    { id: 'numero-primo', title: 'NÚMERO PRIMO' },
    { id: 'fraccion', title: 'FRACCIÓN' },
];

export function GlosarioView() {
    const [selectedTopicId, setSelectedTopicId] = useState(TOPICS[0].id);
    const [selectedSeñaVariable, setSelectedSeñaVariable] = useState(1);

    const selectedTopic = TOPICS.find(t => t.id === selectedTopicId) || TOPICS[0];

    return (
        <div className="w-full h-full flex flex-col bg-[#fdf4ff]/50 dark:bg-slate-950/50 p-6 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full overflow-hidden">

                {/* Left Column: Videos (Definition & Sign) */}
                <div className="lg:col-span-8 flex flex-col gap-6 h-full overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedTopicId}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="flex flex-col gap-6 h-full"
                        >
                            {/* Definición Section */}
                            <div className="flex-1 min-h-0 flex flex-col space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-6 bg-[#7e22ce] rounded-full"></div>
                                    <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
                                        Definición: {selectedTopic.title}
                                    </h2>
                                </div>
                                <div className="flex-1 relative group bg-black rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800">
                                    <div className="absolute inset-0 flex items-center justify-center bg-purple-900/10 group-hover:bg-purple-900/5 transition-colors cursor-pointer">
                                        <IoPlayCircle className="text-white text-7xl opacity-80 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="absolute bottom-4 left-4 text-white bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl font-bold text-xs">
                                        videoId: apiunal_{selectedTopic.id}_def
                                    </div>
                                </div>
                            </div>

                            {/* Seña Section */}
                            <div className="flex-1 min-h-0 flex flex-col space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-6 bg-pink-500 rounded-full"></div>
                                        <h2 className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-tight">
                                            Seña
                                        </h2>
                                    </div>

                                    {/* Tabs for Sign Variables */}
                                    <div className="flex bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-xl">
                                        <button
                                            onClick={() => setSelectedSeñaVariable(1)}
                                            className={`px-4 py-1.5 rounded-lg font-black text-xs transition-all ${selectedSeñaVariable === 1
                                                    ? 'bg-white dark:bg-slate-700 text-[#7e22ce] shadow-sm'
                                                    : 'text-slate-500 hover:text-slate-700'
                                                }`}
                                        >
                                            VARIABLE 1
                                        </button>
                                        <button
                                            onClick={() => setSelectedSeñaVariable(2)}
                                            className={`px-4 py-1.5 rounded-lg font-black text-xs transition-all ${selectedSeñaVariable === 2
                                                    ? 'bg-white dark:bg-slate-700 text-[#7e22ce] shadow-sm'
                                                    : 'text-slate-500 hover:text-slate-700'
                                                }`}
                                        >
                                            VARIABLE 2
                                        </button>
                                    </div>
                                </div>

                                <div className="flex-1 relative group bg-slate-200 dark:bg-slate-900 rounded-3xl overflow-hidden shadow-lg border-2 border-dashed border-slate-300 dark:border-slate-800">
                                    <div className="absolute inset-0 flex items-center justify-center bg-slate-400/10 group-hover:bg-slate-400/5 transition-colors cursor-pointer">
                                        <IoPlayCircle className="text-slate-400 dark:text-slate-600 text-7xl group-hover:text-pink-500 transition-colors" />
                                    </div>
                                    <div className="absolute top-4 left-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                        VARIABLE {selectedSeñaVariable} - {selectedTopic.title}
                                    </div>
                                    <div className="absolute bottom-4 left-4 text-white bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl font-bold text-xs uppercase">
                                        videoId: apiunal_{selectedTopic.id}_sign_v{selectedSeñaVariable}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Column: Topics List */}
                <div className="lg:col-span-4 h-full flex flex-col overflow-hidden">
                    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-xl border border-purple-100 dark:border-slate-800 flex flex-col h-full overflow-hidden">
                        <div className="flex items-center gap-3 mb-6 px-2 flex-shrink-0">
                            <IoBookOutline size={20} className="text-[#7e22ce]" />
                            <h3 className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Temas Glosario</h3>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-1.5 pr-2 custom-scrollbar">
                            {TOPICS.map((topic, index) => (
                                <button
                                    key={topic.id}
                                    onClick={() => {
                                        setSelectedTopicId(topic.id);
                                        setSelectedSeñaVariable(1);
                                    }}
                                    className={`
                     w-full text-left p-3.5 rounded-2xl transition-all duration-300 flex items-center gap-3 group
                     ${selectedTopicId === topic.id
                                            ? 'bg-[#7e22ce] text-white shadow-lg shadow-purple-200 dark:shadow-none translate-x-1.5'
                                            : 'hover:bg-purple-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-[#7e22ce]'}
                   `}
                                >
                                    <span className={`
                     text-[10px] font-black w-5 h-5 rounded-lg flex items-center justify-center
                     ${selectedTopicId === topic.id ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-purple-100'}
                   `}>
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <span className="font-black text-sm tracking-tight leading-none">{topic.title}</span>
                                </button>
                            ))}
                        </div>

                        <div className="mt-6 p-5 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl text-white shadow-lg overflow-hidden relative flex-shrink-0">
                            <div className="relative z-10">
                                <h4 className="font-black text-sm mb-1 uppercase tracking-tight">Instrucciones</h4>
                                <p className="text-purple-100 text-[11px] font-medium leading-tight">
                                    Selecciona un tema y usa las variables para ver diferentes señas.
                                </p>
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white/10 rounded-full blur-2xl"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
