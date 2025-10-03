# ✅ Checklist de Deployment

## ANTES DE DESPLEGAR

### Backend (Render)
- [ ] `server/package.json` existe
- [ ] `server/.env` con `GEMINI_API_KEY` configurada
- [ ] Instaladas dependencias: `cd server && npm install`
- [ ] Probado localmente: `node server.js`
- [ ] Endpoint `/health` responde correctamente

### Frontend (Netlify)
- [ ] `.env` con `VITE_API_URL=http://localhost:5000`
- [ ] Instaladas dependencias: `npm install`
- [ ] Build funciona: `npm run build`
- [ ] `netlify.toml` existe
- [ ] Probado localmente: `npm run dev`

### Git
- [ ] `.gitignore` incluye `.env` y `server/.env`
- [ ] Archivos `.env` NO están en el repo
- [ ] Código commiteado y pusheado a GitHub

---

## DURANTE EL DEPLOY

### 1. Backend en Render
- [ ] Cuenta creada en render.com
- [ ] Web Service creado
- [ ] Root Directory: `server`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Variable `GEMINI_API_KEY` configurada
- [ ] Deploy exitoso (check logs)
- [ ] URL copiada: `https://_______.onrender.com`
- [ ] `/health` endpoint responde

### 2. Frontend en Netlify
- [ ] Cuenta creada en netlify.com
- [ ] Repositorio conectado
- [ ] Build command: `npm run build`
- [ ] Publish directory: `dist`
- [ ] Variable `VITE_API_URL` configurada (URL de Render)
- [ ] Deploy exitoso
- [ ] URL copiada: `https://_______.netlify.app`
- [ ] Sitio carga correctamente

### 3. Configurar CORS
- [ ] Volver a Render
- [ ] Agregar variable `FRONTEND_URL` con URL de Netlify
- [ ] Esperar redeploy automático

---

## DESPUÉS DEL DEPLOY

### Testing
- [ ] Chat abre correctamente
- [ ] Se puede escribir mensaje
- [ ] Bot responde con IA
- [ ] Sugerencias aparecen
- [ ] Enlaces se convierten en botones
- [ ] Funciona en móvil
- [ ] No hay errores en consola (F12)

### Performance
- [ ] Tiempos de respuesta < 5 segundos
- [ ] Primera carga del backend puede tardar ~60s (Render free tier)

### Monitoreo
- [ ] Logs de Render sin errores
- [ ] Netlify Analytics habilitado (opcional)

---

## SOLUCIÓN DE PROBLEMAS

❌ **Backend no responde**
→ Revisa logs en Render
→ Verifica GEMINI_API_KEY

❌ **Error CORS**
→ Verifica FRONTEND_URL en Render
→ Debe coincidir con URL de Netlify

❌ **Frontend no conecta**
→ Verifica VITE_API_URL en Netlify
→ Abre consola del navegador (F12)

❌ **Render está dormido**
→ Primera petición tarda ~60s
→ Es normal en el tier gratuito

---

## URLs FINALES

Backend (Render): `https://___________________________.onrender.com`
Frontend (Netlify): `https://___________________________.netlify.app`

## CREDENCIALES

Render Email: ___________________________
Netlify Email: ___________________________

---

✅ **DEPLOYMENT COMPLETO** - ¡Chatbot en producción!
