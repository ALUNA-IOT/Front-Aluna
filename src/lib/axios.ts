import axios from 'axios';

/**
 * Instancia global de Axios con configuración predefinida
 * Se usa en toda la aplicación para hacer peticiones HTTP
 */
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  withCredentials: true, // Incluir cookies en todas las peticiones
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Timeout de 10 segundos
});

/**
 * Interceptor de solicitud
 * Se ejecuta antes de cada petición
 */
apiClient.interceptors.request.use(
  (config) => {
    // Aquí puedes agregar tokens, headers personalizados, etc.
    console.log('📤 Petición:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Error en la solicitud:', error);
    return Promise.reject(error);
  }
);

/**
 * Interceptor de respuesta
 * Se ejecuta después de cada respuesta
 */
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ Respuesta:', response.status, response.config.url);
    return response;
  },
  (error) => {
    // Manejar errores globalmente
    if (error.response) {
      // El servidor respondió con un código de error
      console.error('❌ Error de respuesta:', error.response.status, error.response.data);

      // Ejemplo: Redirigir a login si es 401 (Unauthorized)
      if (error.response.status === 401) {
        // window.location.href = '/login';
      }
    } else if (error.request) {
      // La solicitud fue hecha pero no se recibió respuesta
      console.error('❌ Sin respuesta:', error.request);
    } else {
      // Error al configurar la solicitud
      console.error('❌ Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
