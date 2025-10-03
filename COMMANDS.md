# 🛠️ Comandos Útiles

## 📦 Instalación

```bash
# Instalar dependencias del frontend
npm install

# Instalar dependencias del backend
cd server
npm install
cd ..
```

## 🚀 Desarrollo Local

```bash
# Terminal 1 - Backend (Puerto 5000)
cd server
node server.js

# Terminal 2 - Frontend (Puerto 5173)
npm run dev
```

**URLs locales:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Health Check: http://localhost:5000/health

## 🔧 Build y Testing

```bash
# Build para producción
npm run build

# Preview del build
npm run preview

# Probar solo el backend
cd server
node server.js
# Luego abre: http://localhost:5000/health

# Limpiar node_modules
rm -rf node_modules
rm -rf server/node_modules
```

## 📝 Variables de Entorno

**Desarrollo - Archivo `.env` en raíz:**
```env
VITE_API_URL=http://localhost:5000
```

**Desarrollo - Archivo `server/.env`:**
```env
GEMINI_API_KEY=tu_clave_aqui
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**Producción - Netlify:**
```env
VITE_API_URL=https://tu-backend.onrender.com
```

**Producción - Render:**
```env
GEMINI_API_KEY=tu_clave_aqui
FRONTEND_URL=https://tu-app.netlify.app
```

## 🔍 Debugging

```bash
# Ver logs del backend mientras corre
# En Windows PowerShell, los logs aparecen directamente en la terminal

# Probar endpoint del backend con curl
curl http://localhost:5000/health

# Probar endpoint de chat
curl -X POST http://localhost:5000/api/chat `
  -H "Content-Type: application/json" `
  -d '{"message":"Hola"}'
```

## 📤 Git

```bash
# Verificar que .env no se suba
git status

# Si aparece .env, agregarlo a .gitignore
echo ".env" >> .gitignore
echo "server/.env" >> .gitignore

# Commit y push
git add .
git commit -m "Preparado para deployment"
git push origin main
```

## 🌐 Deployment

```bash
# No hay comandos - se hace desde las interfaces web:
# 1. render.com - Para el backend
# 2. netlify.com - Para el frontend

# O usando Netlify CLI (opcional):
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

## 🧪 Testing Manual

**1. Probar Backend:**
```bash
# Health check
curl http://localhost:5000/health

# Chat endpoint
curl -X POST http://localhost:5000/api/chat `
  -H "Content-Type: application/json" `
  -d '{"message":"Hola, qué servicios ofrecen?"}'
```

**2. Probar Frontend:**
- Abre http://localhost:5173
- Escribe mensaje en el chat
- Verifica que responda
- Abre DevTools (F12) → Console para ver errores

## 📊 Monitoreo en Producción

**Render (Backend):**
1. Dashboard → Tu servicio
2. Pestaña "Logs" → Ver logs en tiempo real
3. Pestaña "Metrics" → Ver uso de CPU/RAM

**Netlify (Frontend):**
1. Site overview
2. "Deploys" → Ver historial
3. "Functions" (si usas) → Logs

## 🔄 Actualizar en Producción

```bash
# 1. Hacer cambios en el código
# 2. Commit y push
git add .
git commit -m "Descripción del cambio"
git push origin main

# 3. Deploy automático:
# - Render redespliega backend automáticamente
# - Netlify redespliega frontend automáticamente
```

## 🐛 Troubleshooting

```bash
# Limpiar cache de npm
npm cache clean --force
cd server && npm cache clean --force

# Reinstalar todo
rm -rf node_modules server/node_modules package-lock.json server/package-lock.json
npm install
cd server && npm install

# Verificar versión de Node
node --version  # Debe ser >= 18

# Ver variables de entorno cargadas (backend)
node -e "require('dotenv').config(); console.log(process.env.GEMINI_API_KEY?.substring(0,10))"
```

## 📱 Abrir en Navegador

```powershell
# Windows PowerShell
Start-Process "http://localhost:5173"
Start-Process "http://localhost:5000/health"
```

## 🔐 Seguridad

```bash
# Verificar que .env NO esté en el repo
git ls-files | grep .env
# Si aparece algo, hay que quitarlo:
git rm --cached .env
git rm --cached server/.env
git commit -m "Remove .env from git"

# Rotar API key si se filtró
# 1. Ir a https://aistudio.google.com/app/apikey
# 2. Eliminar key antigua
# 3. Generar nueva
# 4. Actualizar en Render Environment Variables
```

## 📦 Backup

```bash
# Exportar variables de entorno
echo "GEMINI_API_KEY=$(cat server/.env | grep GEMINI)" > backup.env

# Hacer backup del código
git archive --format=zip --output=chatbot-backup.zip main
```

---

## 🆘 Ayuda Rápida

**Backend no arranca:**
```bash
cd server
npm install
node server.js
# Debe decir: [SERVER] Backend corriendo en http://localhost:5000
```

**Frontend no arranca:**
```bash
npm install
npm run dev
# Debe decir: Local: http://localhost:5173/
```

**Error "Cannot find module":**
```bash
npm install  # o cd server && npm install
```

**Error "fetch failed" en frontend:**
- Verifica que backend esté corriendo (puerto 5000)
- Revisa `.env` → `VITE_API_URL=http://localhost:5000`

---

✅ **Comandos listos para copiar y pegar**
