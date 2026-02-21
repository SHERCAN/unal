'use client';

import React, { useRef, useState } from 'react';
import { BookPageContainer } from '@/components/book-pages/BookPageContainer';
import { useVideoProgress } from '@/hooks/useVideoProgress';
import { FeedbackButton } from '@/components/FeedbackButton';
import Image from 'next/image';


// Import assets
import lapices1Img from '../lapices1.png';
import lapices2Img from '../lapices2.png';
import lapices3Img from '../lapices3.png';
import cuadernos1Img from '../cuadernos1.png';
import cuadernos2Img from '../cuadernos2.png';
import cuadernos3Img from '../cuadernos3.png';

interface Props { zoom?: number; }
//PAGINA 6 EJERCICIOS
export function EjerciciosPage2({ zoom = 1 }: Props) {
    const { isVideoWatched, markVideoWatched } = useVideoProgress();

    const VIDEO_TRACKING = {
        EX2_PENCILS: 'fracciones-ex2-pencils',
        EX2_NOTEBOOKS: 'fracciones-ex2-notebooks',
        EX2_LIBRARY: 'fracciones-ex2-library',
    };

    /* videoModal list removed */
    /* ref removed */

    /* handleVideoComplete removed */

    /* openVideo removed */

    /* PlayButton definition removed */

    // --- State for Problems ---
    const [pencilFrac, setPencilFrac] = useState({ n: '', d: '' });
    const [pencilResult, setPencilResult] = useState<'correct' | 'incorrect' | null>(null);

    const [notebookFrac, setNotebookFrac] = useState({ n: '', d: '' });
    const [notebookResult, setNotebookResult] = useState<'correct' | 'incorrect' | null>(null);

    const [libraryAns, setLibraryAns] = useState('');
    const [libraryResult, setLibraryResult] = useState<'correct' | 'incorrect' | null>(null);

    const checkPencil = () => {
        if (pencilFrac.n === '5' && pencilFrac.d === '20') setPencilResult('correct');
        else setPencilResult('incorrect');
    };

    const checkNotebook = () => {
        if (notebookFrac.n === '6' && notebookFrac.d === '24') setNotebookResult('correct');
        else setNotebookResult('incorrect');
    };

    const checkLibrary = () => {
        if (libraryAns === '6') setLibraryResult('correct');
        else setLibraryResult('incorrect');
    };

    const resetPencil = () => { setPencilFrac({ n: '', d: '' }); setPencilResult(null); };
    const resetNotebook = () => { setNotebookFrac({ n: '', d: '' }); setNotebookResult(null); };
    const resetLibrary = () => { setLibraryAns(''); setLibraryResult(null); };


    return (
        <BookPageContainer zoom={zoom} moduleHeader={{ name: 'Fracciones' }} pageId="fracciones-ejercicios-2">
            <div className="w-full p-4">
                <div className="relative w-full">
                    {/* Content Container */}
                    <div className="relative p-8 min-h-[900px]">
                        <div className="max-w-4xl mx-auto space-y-16">

                            <div className="flex items-center gap-4 border-b pb-4">
                                <span className="bg-purple-900 text-white px-6 py-2 rounded-lg font-black text-xl tracking-widest uppercase">EJERCICIOS</span>
                            </div>

                            {/* EXERCISE 4: Pencils */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold shrink-0">4</div>
                                    <p className="font-bold text-gray-700 text-xl">
                                        En una caja hay 15 lápices negros y 5 lápices rojos.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex-1">

                                        {/* Visual Pencils */}
                                        <div className="flex justify-center items-center gap-12 py-6">
                                            <Image src={lapices1Img} alt="Lápices 1" className="h-36 w-auto object-contain" />
                                            <Image src={lapices2Img} alt="Lápices 2" className="h-36 w-auto object-contain" />
                                            <Image src={lapices3Img} alt="Lápices 3" className="h-36 w-auto object-contain" />
                                        </div>

                                        <div className="flex flex-col items-center gap-6 pt-4 text-center">
                                            <p className="text-lg text-gray-800">
                                                La fracción que representa la cantidad de lápices rojos es:
                                            </p>

                                            <div className="relative w-full flex justify-center items-center">
                                                <div className="flex flex-col items-center">
                                                    <input
                                                        type="number"
                                                        className="w-14 h-11 text-center border-none rounded-lg font-bold text-xl shadow-sm"
                                                        style={{ backgroundColor: '#d9d9d9' }}
                                                        value={pencilFrac.n}
                                                        onChange={e => { setPencilFrac({ ...pencilFrac, n: e.target.value }); setPencilResult(null); }}
                                                    />
                                                    <div className="w-14 h-1 bg-black my-1.5 rounded-full"></div>
                                                    <input
                                                        type="number"
                                                        className="w-14 h-11 text-center border-none rounded-lg font-bold text-xl shadow-sm"
                                                        style={{ backgroundColor: '#d9d9d9' }}
                                                        value={pencilFrac.d}
                                                        onChange={e => { setPencilFrac({ ...pencilFrac, d: e.target.value }); setPencilResult(null); }}
                                                    />
                                                </div>

                                                <div className="absolute right-0 flex items-center gap-4">
                                                    <FeedbackButton
                                                        onCheck={checkPencil}
                                                        onReset={resetPencil}
                                                        status={pencilResult}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* EXERCISE 5: Notebooks */}
                            <div className="space-y-6 pt-12 border-t border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold shrink-0">5</div>
                                    <p className="font-bold text-gray-700 text-xl">
                                        En una caja hay 18 cuadernos negros y 6 azules.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex-1">

                                        {/* Visual Notebooks */}
                                        <div className="flex justify-center items-center gap-12 py-6">
                                            <Image src={cuadernos1Img} alt="Cuadernos 1" className="h-36 w-auto object-contain" />
                                            <Image src={cuadernos2Img} alt="Cuadernos 2" className="h-36 w-auto object-contain" />
                                            <Image src={cuadernos3Img} alt="Cuadernos 3" className="h-36 w-auto object-contain" />
                                        </div>

                                        <div className="flex flex-col items-center gap-6 pt-4 text-center">
                                            <p className="text-lg text-gray-800">
                                                La fracción que representa el número de cuadernos azules es:
                                            </p>

                                            <div className="relative w-full flex justify-center items-center">
                                                <div className="flex flex-col items-center">
                                                    <input
                                                        type="number"
                                                        className="w-14 h-11 text-center border-none rounded-lg font-bold text-xl shadow-sm"
                                                        style={{ backgroundColor: '#d9d9d9' }}
                                                        value={notebookFrac.n}
                                                        onChange={e => { setNotebookFrac({ ...notebookFrac, n: e.target.value }); setNotebookResult(null); }}
                                                    />
                                                    <div className="w-14 h-1 bg-black my-1.5 rounded-full"></div>
                                                    <input
                                                        type="number"
                                                        className="w-14 h-11 text-center border-none rounded-lg font-bold text-xl shadow-sm"
                                                        style={{ backgroundColor: '#d9d9d9' }}
                                                        value={notebookFrac.d}
                                                        onChange={e => { setNotebookFrac({ ...notebookFrac, d: e.target.value }); setNotebookResult(null); }}
                                                    />
                                                </div>

                                                <div className="absolute right-0 flex items-center gap-4">
                                                    <FeedbackButton
                                                        onCheck={checkNotebook}
                                                        onReset={resetNotebook}
                                                        status={notebookResult}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* EXERCISE 6: Library */}
                            <div className="space-y-6 pt-12 border-t border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold shrink-0">6</div>
                                    <p className="font-bold text-gray-700 text-xl">
                                        En una biblioteca hay <span className="font-bold text-purple-700">36</span> libros. Si <span className="font-bold">1/6</span> son de cuentos, ¿cuántos libros de cuentos hay?
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex-1">
                                        <div className="flex flex-col items-center gap-6 pt-6 text-center">
                                            <div className="relative w-full flex justify-center items-center">
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="number"
                                                        className="w-20 h-12 text-center border-none rounded-lg font-bold text-2xl shadow-sm"
                                                        style={{ backgroundColor: '#d9d9d9' }}
                                                        value={libraryAns}
                                                        onChange={e => { setLibraryAns(e.target.value); setLibraryResult(null); }}
                                                    />
                                                    <span className="text-xl text-gray-800 font-medium">libros de cuentos</span>
                                                </div>

                                                <div className="absolute right-0 flex items-center gap-4">
                                                    <FeedbackButton
                                                        onCheck={checkLibrary}
                                                        onReset={resetLibrary}
                                                        status={libraryResult}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* VideoModal removed */}
        </BookPageContainer>
    );
}
