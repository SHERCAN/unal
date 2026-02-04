// Configuración de videos y URLs de API
// Reemplaza los IDs con tus videos reales de YouTube

// URL base del backend
// export const API_URL = process.env.API_URL || 'http://localhost:4000';

// // Función helper para obtener la URL del video desde el backend
// export const getVideoUrl = (videoId: string): string => {
//   console.log('API_URL used in getVideoUrl:', API_URL);
//   return `${API_URL}/api/videos/${videoId}.mp4`;
// };

export const VIDEO_IDS = {
  // Página de inicio
  HOME_INTRO: 'test', // Video de introducción al proyecto

  // Modal de bienvenida
  WELCOME: 'test', // Video de bienvenida

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