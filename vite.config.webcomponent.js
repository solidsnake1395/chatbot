import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],

  build: {
    lib: {
      entry: resolve(__dirname, 'src/chatbot-webcomponent-simple.jsx'),
      name: 'SolvexChatbot',
      fileName: 'solvex-chatbot',
      formats: ['iife']
    },

    rollupOptions: {
      external: [],
      output: {
        globals: {},
        inlineDynamicImports: true,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'solvex-chatbot.css';
          }
          return assetInfo.name;
        }
      }
    },

    minify: false,
    sourcemap: false,
    target: 'es2015',
    cssCodeSplit: false
  },

  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
    port: 3000,
    open: true
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-icons']
  }
})
