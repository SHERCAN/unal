// Configuración de videos y URLs de API
// Reemplaza los IDs con tus videos reales de YouTube

// URL base del backend
// export const API_URL = process.env.API_URL || 'http://localhost:4000';

// // Función helper para obtener la URL del video desde el backend
// export const getVideoUrl = (videoId: string): string => {
//   console.log('API_URL used in getVideoUrl:', API_URL);
//   return `${API_URL}/api/videos/${videoId}.mp4`;
// };

// URL base del bucket de videos (Cloudflare R2).
// Se puede sobreescribir en build time con NEXT_PUBLIC_APIUNAL.
// El fallback evita que el bundle quede con "undefined" cuando el ARG no llega.
const DEFAULT_APIUNAL = 'https://pub-662ec7c39f78445089b1267d1693bee7.r2.dev';

const normalizeBase = (value?: string) => (value ?? '').trim().replace(/\/+$/, '');

export const APIUNAL =
  normalizeBase(process.env.NEXT_PUBLIC_APIUNAL) ||
  normalizeBase(process.env.APIUNAL) ||
  DEFAULT_APIUNAL;

// Construye la URL de un video evitando dobles barras.
export const getVideoUrl = (videoId: string): string =>
  `${APIUNAL}/${videoId.replace(/^\/+/, '')}.mp4`;

export const VIDEO_IDS = {
  // Página de inicio
  HOME_INTRO: 'regUsuario/intro', // Video de introducción al proyecto

  // Modal de bienvenida
  WELCOME: 'regUsuario/intro', // Video de bienvenida

  // Página de registro
  REGISTER_GENERAL: 'test', // Cómo crear tu perfil
  REGISTER_NAME: 'test', // ¿Cómo te llamas?
  REGISTER_AGE: 'test', // ¿Cuántos años tienes?
  REGISTER_GRADE: 'test', // ¿En qué grado estás?
  REGISTER_AVATAR: 'test', // Selecciona tu avatar
  REGISTER_PASSWORD: 'test', // Crea tu clave secreta
  REGISTER_CONFIRM_PASSWORD: 'test', // Confirma tu clave
  REGISTER_NICKNAME: 'test', // Elige tu nombre de usuario

  // Página de login
  LOGIN_INSTRUCTIONS: 'test', // Cómo iniciar sesión

  // Dashboard
  DASHBOARD_INTRO: 'test', // Introducción al dashboard
  MODULE_SUMA: 'test', // Módulo de suma
  MODULE_RESTA: 'test', // Módulo de resta
  MODULE_MULTIPLICACION: 'test', // Módulo de multiplicación
  MODULE_DIVISION: 'divisionTeoria2', // Módulo de división
};