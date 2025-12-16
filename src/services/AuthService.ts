import axios, { AxiosInstance } from 'axios';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  roleId?: string | number;
}

export interface AuthResponse {
  ok: boolean;
  error?: string;
  status?: number;
  data?: any;
}

/**
 * Servicio de autenticación que consume la API usando Axios
 * Configuración centralizada para todas las peticiones de autenticación
 */
export class AuthService {
  private static axiosInstance: AxiosInstance;
  private static readonly API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

  /**
   * Inicializar la instancia de Axios con configuración personalizada
   */
  private static getAxiosInstance(): AxiosInstance {
    if (!this.axiosInstance) {
      this.axiosInstance = axios.create({
        baseURL: this.API_BASE,
        withCredentials: true, // Incluir cookies en todas las peticiones
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Interceptor de respuesta para manejo de errores
      this.axiosInstance.interceptors.response.use(
        (response: any) => response,
        (error: any) => {
          console.error('Request error:', error);
          return Promise.reject(error);
        }
      );
    }
    return this.axiosInstance;
  }

  /**
   * Inicia sesión con credenciales de email y contraseña
   * Consume el endpoint: POST /api/auth/callback/credentials (NextAuth)
   */
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.getAxiosInstance().post('/auth/callback/credentials', {
        email: credentials.email,
        password: credentials.password,
      });

      return {
        ok: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error('Login error:', error);
      return {
        ok: false,
        error: error.response?.data?.error || error.message || 'Login error',
        status: error.response?.status,
      };
    }
  }

  /**
   * Registra un nuevo usuario
   * Consume el endpoint: POST /api/auth/register
   */
  static async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    try {
      const payload = {
        fullName: credentials.fullName,
        email: credentials.email,
        password: credentials.password,
        ...(credentials.phone && { phone: credentials.phone }),
        ...(credentials.roleId && { roleId: credentials.roleId }),
      };

      const response = await this.getAxiosInstance().post('/auth/register', payload);

      return {
        ok: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error('Register error:', error);
      return {
        ok: false,
        error: error.response?.data?.error || error.message || 'Register error',
        status: error.response?.status,
      };
    }
  }

  /**
   * Cierra la sesión actual
   * Consume el endpoint: POST /api/auth/signout
   */
  static async logout(): Promise<AuthResponse> {
    try {
      const response = await this.getAxiosInstance().post('/auth/signout');

      return {
        ok: true,
        data: response.data,
      };
    } catch (error: any) {
      console.error('Logout error:', error);
      // Return ok: true because local logout should work
      // even if there's a connectivity error
      return {
        ok: true,
      };
    }
  }

  /**
   * Obtiene la sesión actual
   * Consume el endpoint: GET /api/auth/session
   */
  static async getSession() {
    try {
      const response = await this.getAxiosInstance().get('/auth/session');
      return response.data;
    } catch (error: any) {
      console.error('Session fetch error:', error);
      return null;
    }
  }

  /**
   * Verifica si el usuario está autenticado
   */
  static async isAuthenticated(): Promise<boolean> {
    const session = await this.getSession();
    return !!session?.user;
  }

  /**
   * Obtiene los proveedores disponibles de autenticación
   */
  static async getProviders() {
    try {
      const response = await this.getAxiosInstance().get('/auth/providers');
      return response.data;
    } catch (error: any) {
      console.error('Providers fetch error:', error);
      return null;
    }
  }
}
