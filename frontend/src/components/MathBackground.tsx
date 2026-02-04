'use client';

import { useEffect, useState } from 'react';

const mathElements = [
  // Símbolos matemáticos - Colores más oscuros para modo claro
  { symbol: '∑', size: 'text-4xl', color: 'text-purple-500 dark:text-purple-300' },
  { symbol: '∫', size: 'text-5xl', color: 'text-blue-500 dark:text-blue-300' },
  { symbol: 'π', size: 'text-3xl', color: 'text-pink-500 dark:text-pink-300' },
  { symbol: '√', size: 'text-4xl', color: 'text-green-500 dark:text-green-300' },
  { symbol: '∞', size: 'text-5xl', color: 'text-yellow-600 dark:text-yellow-300' },
  { symbol: '≈', size: 'text-3xl', color: 'text-red-500 dark:text-red-300' },
  { symbol: '≠', size: 'text-3xl', color: 'text-indigo-500 dark:text-indigo-300' },
  { symbol: '≤', size: 'text-3xl', color: 'text-teal-500 dark:text-teal-300' },
  { symbol: '≥', size: 'text-3xl', color: 'text-orange-500 dark:text-orange-300' },
  { symbol: 'α', size: 'text-4xl', color: 'text-cyan-500 dark:text-cyan-300' },
  { symbol: 'β', size: 'text-4xl', color: 'text-lime-600 dark:text-lime-300' },
  { symbol: 'θ', size: 'text-4xl', color: 'text-rose-500 dark:text-rose-300' },
  { symbol: 'Δ', size: 'text-5xl', color: 'text-violet-500 dark:text-violet-300' },
  { symbol: '∇', size: 'text-4xl', color: 'text-fuchsia-500 dark:text-fuchsia-300' },
  { symbol: '∂', size: 'text-4xl', color: 'text-amber-600 dark:text-amber-300' },
  { symbol: 'Σ', size: 'text-4xl', color: 'text-purple-600 dark:text-purple-400' },
  { symbol: 'Ω', size: 'text-5xl', color: 'text-blue-600 dark:text-blue-400' },
  { symbol: 'λ', size: 'text-3xl', color: 'text-green-600 dark:text-green-400' },
  { symbol: 'μ', size: 'text-4xl', color: 'text-pink-600 dark:text-pink-400' },
  { symbol: 'σ', size: 'text-3xl', color: 'text-indigo-600 dark:text-indigo-400' },
  
  // Ecuaciones y fórmulas
  { symbol: 'E=mc²', size: 'text-2xl', color: 'text-purple-600 dark:text-purple-400' },
  { symbol: 'a²+b²=c²', size: 'text-2xl', color: 'text-blue-600 dark:text-blue-400' },
  { symbol: 'y=mx+b', size: 'text-2xl', color: 'text-pink-600 dark:text-pink-400' },
  { symbol: 'f(x)', size: 'text-3xl', color: 'text-green-600 dark:text-green-400' },
  { symbol: 'lim', size: 'text-3xl', color: 'text-yellow-700 dark:text-yellow-400' },
  { symbol: 'sin(x)', size: 'text-2xl', color: 'text-cyan-600 dark:text-cyan-400' },
  { symbol: 'cos(x)', size: 'text-2xl', color: 'text-teal-600 dark:text-teal-400' },
  { symbol: 'tan(x)', size: 'text-2xl', color: 'text-orange-600 dark:text-orange-400' },
  { symbol: 'log(x)', size: 'text-2xl', color: 'text-red-600 dark:text-red-400' },
  { symbol: 'e^x', size: 'text-2xl', color: 'text-violet-600 dark:text-violet-400' },
  
  // Operaciones simples
  { symbol: '2+2=4', size: 'text-2xl', color: 'text-red-600 dark:text-red-400' },
  { symbol: '5×3=15', size: 'text-2xl', color: 'text-indigo-600 dark:text-indigo-400' },
  { symbol: '10÷2=5', size: 'text-2xl', color: 'text-teal-600 dark:text-teal-400' },
  { symbol: '7-3=4', size: 'text-2xl', color: 'text-orange-600 dark:text-orange-400' },
  { symbol: '8+7=15', size: 'text-2xl', color: 'text-cyan-600 dark:text-cyan-400' },
  { symbol: '9×9=81', size: 'text-2xl', color: 'text-purple-600 dark:text-purple-400' },
  { symbol: '12÷3=4', size: 'text-2xl', color: 'text-green-600 dark:text-green-400' },
  { symbol: '15-8=7', size: 'text-2xl', color: 'text-pink-600 dark:text-pink-400' },
  
  // Emojis matemáticos
  { symbol: '🧮', size: 'text-4xl', color: '' },
  { symbol: '📐', size: 'text-4xl', color: '' },
  { symbol: '📊', size: 'text-4xl', color: '' },
  { symbol: '📈', size: 'text-4xl', color: '' },
  { symbol: '🔢', size: 'text-4xl', color: '' },
  { symbol: '📏', size: 'text-4xl', color: '' },
  { symbol: '🎯', size: 'text-4xl', color: '' },
  { symbol: '⚡', size: 'text-4xl', color: '' },
];

interface MathElement {
  id: number;
  symbol: string;
  size: string;
  color: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
  rotation: number;
  scale: number;
  opacity: number;
}

export default function MathBackground() {
  const [elements, setElements] = useState<MathElement[]>([]);

  useEffect(() => {
    // Generar elementos con más aleatoriedad
    const newElements = Array.from({ length: 30 }, (_, i) => {
      const mathEl = mathElements[Math.floor(Math.random() * mathElements.length)];
      return {
        id: i,
        symbol: mathEl.symbol,
        size: mathEl.size,
        color: mathEl.color,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 25, // 0-25 segundos de delay
        duration: 12 + Math.random() * 20, // 12-32 segundos de duración
        rotation: Math.random() * 360,
        scale: 0.7 + Math.random() * 0.6, // 0.7-1.3 escala aleatoria
        opacity: 0.4 + Math.random() * 0.4, // 0.4-0.8 opacidad aleatoria
      };
    });
    setElements(newElements);

    // Regenerar elementos cada 30 segundos para más variedad
    const interval = setInterval(() => {
      const refreshedElements = Array.from({ length: 30 }, (_, i) => {
        const mathEl = mathElements[Math.floor(Math.random() * mathElements.length)];
        return {
          id: i,
          symbol: mathEl.symbol,
          size: mathEl.size,
          color: mathEl.color,
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 25,
          duration: 12 + Math.random() * 20,
          rotation: Math.random() * 360,
          scale: 0.7 + Math.random() * 0.6,
          opacity: 0.4 + Math.random() * 0.4,
        };
      });
      setElements(refreshedElements);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="math-background">
      {elements.map((el) => (
        <div
          key={el.id}
          className={`math-element ${el.size} ${el.color}`}
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            animationDelay: `${el.delay}s`,
            animationDuration: `${el.duration}s`,
            transform: `rotate(${el.rotation}deg) scale(${el.scale})`,
            opacity: el.opacity,
          }}
        >
          {el.symbol}
        </div>
      ))}
    </div>
  );
}
