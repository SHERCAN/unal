'use client';

import { useEffect, useState } from 'react';
import MathBackground from '@/components/MathBackground';
import ThemeToggle from '@/components/ThemeToggle';

import { ToastProvider } from '@/contexts/ToastContext';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <ToastProvider>
      <MathBackground />
      {mounted && <ThemeToggle />}
      {children}
    </ToastProvider>
  );
}
