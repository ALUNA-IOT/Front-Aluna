# 🔧 Configuración de Axios en Front-Aluna

## 📦 Instalación

Ya está instalado. Si necesitas reinstalar:

```bash
npm install axios
```

---

## 🏗️ Estructura

### 1. **AuthService.ts** (`/src/services/AuthService.ts`)

Servicio centralizado que usa Axios para todas las peticiones de autenticación.

**Características:**
- ✅ Configuración de Axios encapsulada
- ✅ Manejo de errores automático
- ✅ Cookies incluidas en todas las peticiones
- ✅ Interceptors de respuesta
- ✅ Tipos TypeScript completos

**Métodos:**
```typescript
AuthService.login(credentials)           // POST /api/auth/callback/credentials
AuthService.register(credentials)        // POST /api/auth/register
AuthService.logout()                     // POST /api/auth/signout
AuthService.getSession()                 // GET /api/auth/session
AuthService.isAuthenticated()            // Verifica si hay sesión
AuthService.getProviders()               // GET /api/auth/providers
```

### 2. **axios.ts** (`/src/lib/axios.ts`) - NUEVO

Instancia global de Axios con configuración predefinida.

**Características:**
- ✅ Configuración centralizada
- ✅ Interceptors para request/response
- ✅ Logs de depuración
- ✅ Manejo global de errores
- ✅ Timeout configurable

---

## 🔌 Configuración de Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
# URL de la API (por defecto usa /api)
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# O si tu API está en otro servidor:
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Nota:** Usa `NEXT_PUBLIC_` para variables que se necesiten en el cliente.

---

## 📝 Ejemplo de Uso

### Login
```typescript
import { AuthService } from '@/services/AuthService';

const result = await AuthService.login({
  email: 'usuario@test.com',
  password: 'password123'
});

if (result.ok) {
  console.log('Login exitoso:', result.data);
} else {
  console.log('Error:', result.error);
}
```

### Registro
```typescript
const result = await AuthService.register({
  fullName: 'Juan Pérez',
  email: 'juan@test.com',
  password: 'password123',
  phone: '+57 312345678',
  roleId: 'user'
});

if (result.ok) {
  console.log('Registro exitoso');
} else {
  console.log('Error:', result.error);
}
```

### Obtener Sesión
```typescript
const session = await AuthService.getSession();
if (session?.user) {
  console.log('Usuario:', session.user.name);
}
```

---

## 🔄 Ventajas de Axios vs Fetch

| Característica | Fetch | Axios |
|---|---|---|
| Instalación | Built-in | npm install |
| Sintaxis | Más verbosa | Más simple |
| Interceptors | Manual | Automático |
| Timeout | Manual | Automático |
| Transformación | Manual | Automática |
| Cancelación | AbortController | Token de cancelación |
| Error handling | Básico | Avanzado |
| JSON | Manual stringify | Automático |
| Validación Status | Manual | Automática |

---

## 🎯 Uso de Interceptors

### Agregar Headers Personalizados

En `src/lib/axios.ts`, en el interceptor de request:

```typescript
apiClient.interceptors.request.use((config) => {
  // Agregar token de autorización
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Manejo de Errores Globales

En `src/lib/axios.ts`, en el interceptor de response:

```typescript
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado, redirigir a login
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

## 🚀 Usar el Cliente Global (Opcional)

Si necesitas hacer peticiones desde otros servicios, puedes usar el cliente global:

```typescript
import { apiClient } from '@/lib/axios';

// GET
const data = await apiClient.get('/users');

// POST
const result = await apiClient.post('/users', { name: 'John' });

// PUT
const updated = await apiClient.put('/users/1', { name: 'Jane' });

// DELETE
await apiClient.delete('/users/1');
```

---

## 📊 Estructura de Respuestas

### Respuesta Exitosa

```typescript
{
  ok: true,
  data: {
    // Datos del servidor
  }
}
```

### Respuesta de Error

```typescript
{
  ok: false,
  error: "Mensaje de error",
  status: 400  // Código HTTP
}
```

---

## 🐛 Debugging

### Ver Peticiones en la Consola

Los interceptors imprimen automáticamente:

```
📤 Petición: POST /api/auth/login
✅ Respuesta: 200 /api/auth/login
❌ Error: 400 /api/auth/login
```

### Desactivar Logs

En `src/lib/axios.ts`, comenta los `console.log`:

```typescript
// console.log('📤 Petición:', ...);
// console.log('✅ Respuesta:', ...);
// console.error('❌ Error:', ...);
```

---

## 🔐 Seguridad

✅ **Implementado:**
- Cookies incluidas automáticamente (`withCredentials: true`)
- CORS configurado
- Timeout para prevenir requests colgadas
- Validación de errores

⚠️ **Recomendaciones:**
- Usa HTTPS en producción
- No almacenes tokens sensibles en localStorage
- Valida datos en el servidor
- Implementa rate limiting en el backend

---

## 📌 Checklist

- ✅ Axios instalado
- ✅ AuthService.ts usa Axios
- ✅ Archivo axios.ts configurado
- ✅ Variables de entorno listos
- ✅ Interceptors funcionando
- ✅ Cookies incluidas

---

## 🆘 Troubleshooting

### Error: "Cannot find module 'axios'"
```bash
npm install axios
npm run dev
```

### CORS errors
Asegúrate que el backend acepta peticiones desde `http://localhost:3000`

### Cookies no se envían
Verifica que `withCredentials: true` esté en la configuración de Axios

### Timeout en peticiones
Aumenta `timeout` en la configuración de `apiClient`

---

**Fecha:** 16 de diciembre de 2025
**Estado:** ✅ Configuración completa con Axios
