# 🤖 Asistente Virtual con IA

Chatbot inteligente con IA para tu empresa.

## 🌟 Características

- ✅ **IA Conversacional** - Powered by Google Gemini 2.0
- ✅ **Sugerencias Inteligentes** - El bot sugiere preguntas de seguimiento
- ✅ **Enlaces como Botones** - Links convertidos en botones elegantes
- ✅ **Diseño Corporativo** - Personalizable para tu marca
- ✅ **Responsive** - Funciona en desktop y móvil
- ✅ **Tono Consultivo** - Asistente experto, no vendedor agresivo

## 🚀 Deployment

Ver guía completa en **[DEPLOYMENT.md](./DEPLOYMENT.md)**

**Resumen:**
- Backend → Render.com (gratis)
- Frontend → Netlify.com (gratis)

## 💻 Desarrollo Local

```bash
# Instalar dependencias
npm install
cd server && npm install && cd ..

# Backend (.env en server/)
GEMINI_API_KEY=tu_clave_aqui

# Frontend (.env en raíz)
VITE_API_URL=http://localhost:5000

# Ejecutar (2 terminales)
cd server && node server.js    # Terminal 1
npm run dev                     # Terminal 2
```

Abre: http://localhost:5173


The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
