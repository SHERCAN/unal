'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export const dynamic = 'force-dynamic';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nickname: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Guardar avatar personalizado si existe
      if (response.data.user.photoUrl) {
        localStorage.setItem('userAvatar', response.data.user.photoUrl);
      }

      if (response.data.user.role === 'ADMIN') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">

      <div className="w-full max-w-md">
        <button
          onClick={() => router.push('/')}
          className="mb-6 text-primary hover:text-primary-dark flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver
        </button>

        <div className="bg-background-secondary rounded-2xl shadow-xl p-8 space-y-6">
          <h1 className="text-3xl font-bold text-center text-text">
            Inicio de sesión
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="nickname" className="block text-text font-medium">
                Usuario
              </label>
              <input
                type="text"
                id="nickname"
                value={formData.nickname}
                onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-background border-2 border-gray-300 dark:border-gray-600 focus:border-primary focus:outline-none text-text"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-text font-medium">
                Clave
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-background border-2 border-gray-300 dark:border-gray-600 focus:border-primary focus:outline-none text-text"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold text-lg rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Ingresando...' : 'INGRESE'}
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={() => router.push('/register')}
              className="text-primary hover:text-primary-dark font-medium"
            >
              ¿No tienes cuenta? Regístrate aquí
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
