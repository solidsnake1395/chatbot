# 🚀 Guía de Deployment - Solvex Chatbot

Este proyecto tiene dos partes que se despliegan por separado:
- **Frontend (React + Vite)** → Netlify
- **Backend (Express + Gemini API)** → Render

---

## 📦 PARTE 1: BACKEND EN RENDER

### 1. Preparar el Backend

```bash
cd server
npm install
```

### 2. Crear cuenta en Render

1. Ve a [render.com](https://render.com) y crea una cuenta (puedes usar GitHub)
2. Click en **"New +"** → **"Web Service"**

### 3. Conectar Repositorio

Opción A - **Con Git (Recomendado)**:
1. Conecta tu cuenta de GitHub
2. Selecciona el repositorio `chatbot`
3. En **Root Directory** escribe: `server`

Opción B - **Sin Git**:
1. Click en **"Deploy from GitHub"** → Usa tu repo
2. O usa el botón **"Public Git repository"** y pega la URL

### 4. Configuración en Render

- **Name**: `solvex-chatbot-api` (o el que prefieras)
- **Region**: Frankfurt (más cercano a España)
- **Branch**: `main`
- **Root Directory**: `server`
- **Runtime**: Node
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: Free

### 5. Variables de Entorno

En la sección **"Environment"** agrega:

```
GEMINI_API_KEY = tu_clave_de_gemini_aqui
FRONTEND_URL = https://tu-app.netlify.app
```

⚠️ **IMPORTANTE**: Copia tu API key de Google AI Studio

### 6. Deploy

1. Click en **"Create Web Service"**
2. Espera 3-5 minutos mientras se despliega
3. Copia la URL que te dan (ejemplo: `https://solvex-chatbot-api.onrender.com`)

### 7. Probar el Backend

Abre en el navegador:
```
https://tu-backend.onrender.com/health
```

Deberías ver: `{"status":"ok","message":"Solvex Chatbot API is running"}`

---

## 🎨 PARTE 2: FRONTEND EN NETLIFY

### 1. Crear archivo .env

En la raíz del proyecto (NO en server), crea un archivo `.env`:

```env
VITE_API_URL=https://tu-backend.onrender.com
```

⚠️ Reemplaza con la URL real de tu backend de Render (sin el `/api/chat` al final)

### 2. Crear cuenta en Netlify

1. Ve a [netlify.com](https://netlify.com) y crea una cuenta
2. Click en **"Add new site"** → **"Import an existing project"**

### 3. Conectar Repositorio

1. Conecta con GitHub
2. Selecciona tu repositorio `chatbot`
3. Configuración del build:

```
Build command: npm run build
Publish directory: dist
```

### 4. Variables de Entorno en Netlify

1. Ve a **Site settings** → **Environment variables**
2. Click en **"Add a variable"**
3. Agrega:

```
Key: VITE_API_URL
Value: https://tu-backend.onrender.com
```

⚠️ Usa la URL de tu backend de Render (la que copiaste antes)

### 5. Deploy

1. Click en **"Deploy site"**
2. Espera 2-3 minutos
3. Netlify te dará una URL temporal (ejemplo: `random-name-123.netlify.app`)

### 6. Configurar Dominio Personalizado (Opcional)

1. En Netlify: **Domain settings** → **Add custom domain**
2. Puedes usar un subdominio gratis de Netlify o tu propio dominio

---

## 🔄 ACTUALIZAR LA URL DEL FRONTEND EN EL BACKEND

Una vez tengas la URL de Netlify:

1. Ve a Render → Tu servicio backend
2. **Environment** → Edita `FRONTEND_URL`
3. Cambia a tu URL de Netlify: `https://tu-app.netlify.app`
4. Guarda y espera que se redesplegue automáticamente

---

## ✅ VERIFICACIÓN FINAL

### Test Backend:
```
https://tu-backend.onrender.com/health
```
Debe responder: `{"status":"ok",...}`

### Test Frontend:
1. Abre tu sitio de Netlify
2. Escribe un mensaje en el chat
3. Debería responder con IA

---

## 🐛 TROUBLESHOOTING

### Error de CORS
- Verifica que `FRONTEND_URL` en Render coincida con tu URL de Netlify
- Asegúrate de que no tenga `/` al final

### Backend no responde
- Revisa los logs en Render: **Logs** tab
- Verifica que `GEMINI_API_KEY` esté correctamente configurada

### Frontend no conecta con Backend
- Verifica que `VITE_API_URL` en Netlify esté correcta
- Abre la consola del navegador (F12) para ver errores

### Render se duerme (Free tier)
- El servicio gratis se duerme tras 15 min de inactividad
- Primera petición puede tardar 30-60 segundos en despertar

---

## 💰 COSTOS

- **Netlify Free**: 100 GB ancho de banda/mes (más que suficiente)
- **Render Free**: 750 horas/mes, se duerme tras inactividad
- **Total**: **GRATIS** 🎉

---

## 🔐 SEGURIDAD

**NO subas estas claves a GitHub**:
- `.env` → Ya está en `.gitignore`
- Nunca compartas tu `GEMINI_API_KEY`

**Variables sensibles van en**:
- Render: Environment Variables
- Netlify: Environment Variables

---

## 📱 PRÓXIMOS PASOS

1. Deploy backend en Render
2. Copia la URL del backend
3. Deploy frontend en Netlify con la URL del backend
4. Actualiza CORS en backend con URL de Netlify
5. ¡Listo! ✅

---

## 🆘 AYUDA

- Render Docs: https://render.com/docs
- Netlify Docs: https://docs.netlify.com
- Vite Env Variables: https://vitejs.dev/guide/env-and-mode.html
