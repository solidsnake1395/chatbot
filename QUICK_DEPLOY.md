# 🚀 QUICK START - Deploy en 10 minutos

## 📋 Lo que necesitas

1. Cuenta GitHub (gratis)
2. Cuenta Render.com (gratis)
3. Cuenta Netlify.com (gratis)
4. Google Gemini API Key ([Obtener aquí](https://aistudio.google.com/app/apikey))

---

## ⚡ PASO 1: BACKEND (5 min)

### En Render.com:

1. **Crear Web Service**
   - New + → Web Service
   - Connect GitHub → Selecciona repo `chatbot`

2. **Configuración:**
   ```
   Name: solvex-chatbot-api
   Root Directory: server
   Build: npm install
   Start: npm start
   ```

3. **Environment Variables:**
   ```
   GEMINI_API_KEY = [tu_clave_aqui]
   ```

4. **Deploy** → Espera 3-5 min
5. **Copia la URL**: `https://solvex-chatbot-api-xxxx.onrender.com`

---

## ⚡ PASO 2: FRONTEND (5 min)

### En Netlify.com:

1. **Import from Git**
   - Add new site → Import from GitHub
   - Selecciona repo `chatbot`

2. **Build Settings:**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Environment Variables:**
   ```
   VITE_API_URL = https://tu-url-de-render.onrender.com
   ```
   ⚠️ Pega la URL que copiaste de Render

4. **Deploy** → Espera 2-3 min
5. **Copia la URL**: `https://random-name.netlify.app`

---

## ⚡ PASO 3: CONECTAR (1 min)

### Vuelve a Render:

1. Environment Variables
2. **Agregar nueva:**
   ```
   FRONTEND_URL = https://tu-url-de-netlify.netlify.app
   ```
3. Guarda → Espera redeploy (1-2 min)

---

## ✅ PROBAR

1. Abre tu sitio de Netlify
2. Escribe un mensaje
3. ¡Debería responder! 🎉

**Primera petición tarda ~60s** (Render free tier se duerme)

---

## 🆘 SI ALGO FALLA

**No responde:**
- Espera 60 segundos (Render despertando)
- Revisa Render logs

**Error CORS:**
- Verifica que FRONTEND_URL coincida exactamente

**404:**
- Verifica VITE_API_URL en Netlify

---

## 📱 URLs FINALES

Anota aquí tus URLs:

```
Backend: https://___________________________.onrender.com
Frontend: https://___________________________.netlify.app
```

---

¡Listo! Tu chatbot está en producción 🚀
