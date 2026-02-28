'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import VideoModal from '@/components/VideoModal';
import AvatarSelector from '@/components/AvatarSelector';

export const dynamic = 'force-dynamic';

// Avatares de personajes históricos famosos
const AVATARS = [
  { emoji: '👨‍🔬', name: 'Einstein', color: 'bg-gradient-to-br from-purple-300 to-purple-400' },
  { emoji: '🧙‍♂️', name: 'Mago Matemático', color: 'bg-gradient-to-br from-blue-300 to-blue-400' },
  { emoji: '🤴', name: 'Rey Sabio', color: 'bg-gradient-to-br from-yellow-300 to-yellow-400' },
  { emoji: '👸', name: 'Reina Científica', color: 'bg-gradient-to-br from-pink-300 to-pink-400' },
  { emoji: '🧔', name: 'Pitágoras', color: 'bg-gradient-to-br from-green-300 to-green-400' },
  { emoji: '👨‍🎓', name: 'Arquímedes', color: 'bg-gradient-to-br from-indigo-300 to-indigo-400' },
  { emoji: '👩‍🔬', name: 'Marie Curie', color: 'bg-gradient-to-br from-red-300 to-red-400' },
  { emoji: '🧑‍🚀', name: 'Astronauta', color: 'bg-gradient-to-br from-cyan-300 to-cyan-400' },
  { emoji: '🥷', name: 'Ninja Matemático', color: 'bg-gradient-to-br from-gray-400 to-gray-500' },
  { emoji: '🤠', name: 'Explorador', color: 'bg-gradient-to-br from-orange-300 to-orange-400' },
  { emoji: '👨‍🏫', name: 'Maestro', color: 'bg-gradient-to-br from-teal-300 to-teal-400' },
  { emoji: '👩‍💻', name: 'Programadora', color: 'bg-gradient-to-br from-violet-300 to-violet-400' },
];

const GRADOS = [
  'Primero', 'Segundo', 'Tercero', 'Cuarto', 'Quinto', 'Sexto'
];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    grado: '',
    avatar: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; title: string; videoId?: string }>({
    isOpen: false,
    title: '',
    videoId: undefined,
  });
  const [allowRegistration, setAllowRegistration] = useState<boolean | null>(null);

  useEffect(() => {
    const checkRegistration = async () => {
      try {
        const response = await axios.get('/api/settings/allow_registration');
        setAllowRegistration(response.data.value === 'true');
      } catch (err) {
        console.error('Error checking registration status:', err);
        setAllowRegistration(true); // Fallback to allowed if check fails
      }
    };
    checkRegistration();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length !== 4 || !/^\d+$/.test(formData.password)) {
      setError('La contraseña debe ser de 4 dígitos');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/auth/register', {
        ...formData,
        edad: parseInt(formData.edad),
        photoUrl: uploadedImage,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Guardar imagen subida si existe
      if (uploadedImage) {
        localStorage.setItem('userAvatar', uploadedImage);
      }

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al crear usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-2 md:p-4">

      <div className="w-full max-w-2xl">
        <button
          onClick={() => router.push('/')}
          className="mb-4 md:mb-6 text-primary hover:text-primary-dark flex items-center gap-2 text-sm md:text-base"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver
        </button>

        <div className="bg-background-secondary rounded-2xl shadow-xl p-4 md:p-8">
          <h1 className="text-xl md:text-3xl font-bold text-center text-text mb-6 md:mb-8">
            ¡Crea tu perfil!
          </h1>

          {allowRegistration === false ? (
            <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-6 rounded-lg shadow-sm animate-fadeIn">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <h2 className="text-xl font-bold">Registro Desactivado</h2>
              </div>
              <p className="text-lg">
                Lo sentimos, la creación de nuevos perfiles de estudiante no está disponible en este momento.
                Por favor, contacta a tu profesor para obtener más información.
              </p>
              <button
                onClick={() => router.push('/login')}
                className="mt-6 w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-md"
              >
                Ir a Iniciar Sesión
              </button>
            </div>
          ) : allowRegistration === null ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="mt-4 text-text-secondary font-medium">Verificando disponibilidad...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* Botón de video general */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setVideoModal({ isOpen: true, title: "Cómo crear tu perfil", videoId: "/regUsuario/vv - 01a" })}
                  className="p-1.5 text-white rounded-full transition-all flex-shrink-0 inline-flex items-center justify-center align-middle mx-1 bg-purple-600 hover:bg-purple-700"
                  style={{ width: 'clamp(1.5rem, 4vmin, 2rem)', height: 'clamp(1.5rem, 4vmin, 2rem)' }}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>

              {/* Nombre y Apellido */}
              <div className="space-y-1 md:space-y-2">
                <label className="flex items-center gap-2 text-text font-medium text-sm md:text-base">
                  ¿Cómo te llamas? (Nombre y apellido)
                  <button
                    type="button"
                    onClick={() => setVideoModal({ isOpen: true, title: "¿Cómo te llamas?", videoId: "/regUsuario/vv - 02a" })}
                    className="p-1.5 text-white rounded-full transition-all flex-shrink-0 inline-flex items-center justify-center align-middle mx-1 bg-purple-600 hover:bg-purple-700"
                    style={{ width: 'clamp(1.5rem, 4vmin, 2rem)', height: 'clamp(1.5rem, 4vmin, 2rem)' }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </label>
                <input
                  type="text"
                  placeholder="Ejemplo: Juan Torres"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg bg-background border-2 border-gray-300 dark:border-gray-600 focus:border-primary focus:outline-none text-text text-sm md:text-base"
                  required
                />
              </div>

              {/* Edad */}
              <div className="space-y-1 md:space-y-2">
                <label className="flex items-center gap-2 text-text font-medium text-sm md:text-base">
                  ¿Cuántos años cumples tú?
                  <button
                    type="button"
                    onClick={() => setVideoModal({ isOpen: true, title: "¿Cuántos años tienes?", videoId: "/regUsuario/vv - 03a" })}
                    className="p-1.5 text-white rounded-full transition-all flex-shrink-0 inline-flex items-center justify-center align-middle mx-1 bg-purple-600 hover:bg-purple-700"
                    style={{ width: 'clamp(1.5rem, 4vmin, 2rem)', height: 'clamp(1.5rem, 4vmin, 2rem)' }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </label>
                <input
                  type="number"
                  placeholder="Ejemplo: 12"
                  value={formData.edad}
                  onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                  className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg bg-background border-2 border-gray-300 dark:border-gray-600 focus:border-primary focus:outline-none text-text text-sm md:text-base"
                  required
                  min="5"
                  max="18"
                />
              </div>

              {/* Grado */}
              <div className="space-y-1 md:space-y-2">
                <label className="flex items-center gap-2 text-text font-medium text-sm md:text-base">
                  ¿En qué grado estas tú?
                  <button
                    type="button"
                    onClick={() => setVideoModal({ isOpen: true, title: "¿En qué grado estás?", videoId: "/regUsuario/vv - 04a" })}
                    className="p-1.5 text-white rounded-full transition-all flex-shrink-0 inline-flex items-center justify-center align-middle mx-1 bg-purple-600 hover:bg-purple-700"
                    style={{ width: 'clamp(1.5rem, 4vmin, 2rem)', height: 'clamp(1.5rem, 4vmin, 2rem)' }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </label>
                <div className="grid grid-cols-3 md:flex gap-1 md:gap-2">
                  {GRADOS.map((grado) => (
                    <button
                      key={grado}
                      type="button"
                      onClick={() => setFormData({ ...formData, grado })}
                      className={`py-2 px-2 md:px-3 rounded-lg font-medium text-xs md:text-sm transition-all ${formData.grado === grado
                        ? 'bg-primary text-white'
                        : 'bg-background border-2 border-gray-300 dark:border-gray-600 text-text hover:border-primary'
                        }`}
                    >
                      {grado}
                    </button>
                  ))}
                </div>
              </div>

              {/* Avatar */}
              <div className="space-y-4 md:space-y-8 py-2 md:py-4">
                <label className="flex items-center justify-center gap-2 text-text font-medium text-base md:text-lg">
                  Selecciona tu personaje histórico o sube tu foto
                  <button
                    type="button"
                    onClick={() => setVideoModal({ isOpen: true, title: "Selecciona tu avatar", videoId: "/regUsuario/vv - 05a" })}
                    className="p-1.5 text-white rounded-full transition-all flex-shrink-0 inline-flex items-center justify-center align-middle mx-1 bg-purple-600 hover:bg-purple-700"
                    style={{ width: 'clamp(1.5rem, 4vmin, 2rem)', height: 'clamp(1.5rem, 4vmin, 2rem)' }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </label>

                <AvatarSelector
                  avatars={AVATARS}
                  selectedAvatar={formData.avatar}
                  uploadedImage={uploadedImage}
                  onSelectAvatar={(emoji) => {
                    setFormData({ ...formData, avatar: emoji });
                    setUploadedImage(null);
                  }}
                  onUploadImage={(imageUrl) => {
                    setUploadedImage(imageUrl);
                    setFormData({ ...formData, avatar: '' });
                  }}
                />
              </div>

              {/* Contraseña */}
              <div className="space-y-1 md:space-y-2">
                <label className="flex items-center gap-2 text-text font-medium text-sm md:text-base">
                  Crea tu clave secreta de 4 cifras
                  <button
                    type="button"
                    onClick={() => setVideoModal({ isOpen: true, title: "Crea tu clave secreta", videoId: "/regUsuario/vv - 06a" })}
                    className="p-1.5 text-white rounded-full transition-all flex-shrink-0 inline-flex items-center justify-center align-middle mx-1 bg-purple-600 hover:bg-purple-700"
                    style={{ width: 'clamp(1.5rem, 4vmin, 2rem)', height: 'clamp(1.5rem, 4vmin, 2rem)' }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </label>
                <input
                  type="password"
                  placeholder="Ejemplo: 9224"
                  maxLength={4}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg bg-background border-2 border-gray-300 dark:border-gray-600 focus:border-primary focus:outline-none text-text text-center text-xl md:text-2xl tracking-widest"
                  required
                />
              </div>

              {/* Confirmar contraseña */}
              <div className="space-y-1 md:space-y-2">
                <label className="flex items-center gap-2 text-text font-medium text-sm md:text-base">
                  Escribe la misma clave
                  <button
                    type="button"
                    onClick={() => setVideoModal({ isOpen: true, title: "Confirma tu clave", videoId: "/regUsuario/vv - 07a" })}
                    className="p-1.5 text-white rounded-full transition-all flex-shrink-0 inline-flex items-center justify-center align-middle mx-1 bg-purple-600 hover:bg-purple-700"
                    style={{ width: 'clamp(1.5rem, 4vmin, 2rem)', height: 'clamp(1.5rem, 4vmin, 2rem)' }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </label>
                <input
                  type="password"
                  placeholder="Ejemplo: 9224"
                  maxLength={4}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg bg-background border-2 border-gray-300 dark:border-gray-600 focus:border-primary focus:outline-none text-text text-center text-xl md:text-2xl tracking-widest"
                  required
                />
              </div>

              {/* Nickname */}
              <div className="space-y-1 md:space-y-2">
                <label className="flex items-center gap-2 text-text font-medium text-sm md:text-base">
                  Elige un nombre genial como usuario
                  <button
                    type="button"
                    onClick={() => setVideoModal({ isOpen: true, title: "Elige tu nombre de usuario", videoId: "/regUsuario/vv - 08a" })}
                    className="p-1.5 text-white rounded-full transition-all flex-shrink-0 inline-flex items-center justify-center align-middle mx-1 bg-purple-600 hover:bg-purple-700"
                    style={{ width: 'clamp(1.5rem, 4vmin, 2rem)', height: 'clamp(1.5rem, 4vmin, 2rem)' }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </button>
                </label>
                <input
                  type="text"
                  placeholder="Sugerencias automáticas"
                  value={formData.nickname}
                  onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                  className="w-full px-3 py-2 md:px-4 md:py-3 rounded-lg bg-background border-2 border-gray-300 dark:border-gray-600 focus:border-primary focus:outline-none text-text text-sm md:text-base"
                  required
                />
              </div>

              {error && (
                <div className="p-2 md:p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg text-sm md:text-base">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 md:py-4 bg-primary hover:bg-primary-dark text-white font-bold text-base md:text-lg rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creando cuenta...' : 'LISTO'}
              </button>
            </form>
          )}
        </div>
      </div>

      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal({ isOpen: false, title: '', videoId: undefined })}
        videoId={videoModal.videoId}
        title={videoModal.title}
      />
    </main>
  );
}
