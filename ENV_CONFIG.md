# 🔐 Configuración de Variables de Entorno

## 📋 Resumen

Tu aplicación tiene configuradas las URLs de la API en dos niveles:

### `.env` (Producción)
```env
NEXT_PUBLIC_API_URL=https://aluna-backend.up.railway.app/api
```

✅ Esta URL se usa en **producción** (Railway)

### `.env.local` (Desarrollo)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

✅ Esta URL se usa en **desarrollo local** si tu backend está en `localhost:5000`

---

## 🔄 Cómo Funciona

### En Desarrollo (`npm run dev`)
1. Lee primero `.env.local` (más prioritario)
2. Luego `.env` (fallback)
3. Se usa: `http://localhost:5000/api`

### En Producción (Railway)
1. Lee `.env` (solo archivo de producción)
2. Se usa: `https://aluna-backend.up.railway.app/api`

---

## 📝 Archivos de Configuración

### `.env` (Git)
```
NEXT_PUBLIC_API_URL=https://aluna-backend.up.railway.app/api
```

- ✅ Subido a Git
- ✅ Variables públicas de producción
- ✅ Visible en el cliente
- ✅ No contiene secretos sensibles

### `.env.local` (NO Git)
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

- ❌ NO está en Git (`.gitignore`)
- ✅ Para desarrollo local
- ✅ Sobrescribe `.env`
- ✅ Nunca se sube al repositorio

### `.env.local.example` (Opcional - Git)
Útil para documentar qué variables se necesitan:

```env
# Copiar este archivo a .env.local en desarrollo local
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🚀 Cómo Usar

### En Desarrollo Local

1. **Asegúrate que tu backend está en `localhost:5000`**
   ```bash
   # En la terminal del backend
   npm run dev
   # o tu comando para iniciar el backend
   ```

2. **Inicia el frontend**
   ```bash
   npm run dev
   ```

3. **Verifica la URL en AuthService**
   - Abre la consola del navegador (F12)
   - Ve a la pestaña Network
   - Las peticiones deben ir a `http://localhost:5000/api/...`

### En Producción (Railway)

Railway lee automáticamente el archivo `.env`:
```
NEXT_PUBLIC_API_URL=https://aluna-backend.up.railway.app/api
```

No necesitas hacer nada especial.

---

## 🔍 Verificar Configuración

### Ver qué URL se está usando

En `src/services/AuthService.ts`:
```typescript
private static readonly API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';
```

### Ver en la consola

Abre DevTools (F12) → Console:
```javascript
console.log(process.env.NEXT_PUBLIC_API_URL)
```

---

## 🛠️ Cambiar la URL

### Para Desarrollo Local
Edita `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Luego recarga el navegador o reinicia `npm run dev`.

### Para Producción
Edita `.env`:
```env
NEXT_PUBLIC_API_URL=https://aluna-backend.up.railway.app/api
```

Sube los cambios a Git y Railway hará deploy automático.

---

## ⚙️ Variables Disponibles

| Variable | Valor | Uso |
|----------|-------|-----|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000/api` | URL base de la API |

**Nota:** El prefijo `NEXT_PUBLIC_` hace que la variable sea accesible en el cliente JavaScript.

---

## 🔐 Seguridad

✅ **Bien configurado:**
- `.env` está en Git (solo variables públicas)
- `.env.local` NO está en Git (variables locales)
- No hay secretos sensibles
- Las variables públicas son seguras en el cliente

⚠️ **Nunca hagas esto:**
- ❌ Agregar tokens en `.env`
- ❌ Agregar API keys públicamente
- ❌ Subir `.env.local` a Git

---

## 📚 Referencia

### Variables de Entorno en Next.js

- `NEXT_PUBLIC_*` → Accesible en cliente + servidor
- `*` (sin prefijo) → Solo en servidor

---

## 🆘 Troubleshooting

### Las peticiones van a la URL incorrecta
1. Verifica `.env.local` está presente
2. Reinicia `npm run dev`
3. Limpia el cache del navegador (Ctrl+Shift+R)

### "Cannot reach backend"
1. Verifica que el backend está corriendo en `localhost:5000`
2. Verifica la URL en `.env.local`
3. Revisa CORS en el backend

### Cambios en `.env` no se ven
1. Reinicia `npm run dev`
2. La aplicación recarga los variables al iniciar

---

## ✅ Checklist

- ✅ `.env` con URL de producción (Railway)
- ✅ `.env.local` con URL de desarrollo (localhost)
- ✅ `.env.local` en `.gitignore`
- ✅ Axios usa `process.env.NEXT_PUBLIC_API_URL`
- ✅ No hay secretos en `.env`

---

**Fecha:** 16 de diciembre de 2025
**Estado:** ✅ Configuración completada
