// ============================================
// SOLVEX CHATBOT - WEB COMPONENT (VERSIÓN SIMPLE)
// Sin Shadow DOM - Compatible con UMD
// ============================================

import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Chat from './Chat';
import './Chat.css';

/**
 * Web Component simple para el Chatbot de Solvex
 */
class SolvexChatbotElement extends HTMLElement {
  constructor() {
    super();
    this.reactRoot = null;
    this.isOpen = false;
  }

  /**
   * Atributos observables
   */
  static get observedAttributes() {
    return ['theme', 'primary-color', 'position', 'auto-open', 'api-endpoint', 'welcome-message'];
  }

  /**
   * Se ejecuta cuando el elemento se añade al DOM
   */
  connectedCallback() {
    // Crear contenedor
    const container = document.createElement('div');
    container.id = 'solvex-chatbot-container';
    container.style.cssText = `
      position: fixed;
      ${this.getPositionStyles()}
      z-index: 999999;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    `;
    
    this.appendChild(container);

    // Renderizar React
    this.reactRoot = createRoot(container);
    this.render();

    // Auto-abrir si está configurado
    if (this.getAttribute('auto-open') === 'true') {
      setTimeout(() => this.open(), 500);
    }
  }

  /**
   * Obtener estilos de posición
   */
  getPositionStyles() {
    const position = this.getAttribute('position') || 'bottom-right';
    const positions = {
      'bottom-right': 'bottom: 20px; right: 20px;',
      'bottom-left': 'bottom: 20px; left: 20px;',
      'top-right': 'top: 20px; right: 20px;',
      'top-left': 'top: 20px; left: 20px;'
    };
    return positions[position] || positions['bottom-right'];
  }

  /**
   * Se ejecuta cuando el elemento se quita del DOM
   */
  disconnectedCallback() {
    if (this.reactRoot) {
      this.reactRoot.unmount();
    }
  }

  /**
   * Se ejecuta cuando un atributo cambia
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.reactRoot) {
      this.render();
    }
  }

  /**
   * Obtener configuración
   */
  getConfig() {
    return {
      theme: this.getAttribute('theme') || 'light',
      primaryColor: this.getAttribute('primary-color') || '#0066cc',
      position: this.getAttribute('position') || 'bottom-right',
      autoOpen: this.getAttribute('auto-open') === 'true',
      apiEndpoint: this.getAttribute('api-endpoint') || '/api/chat',
      welcomeMessage: this.getAttribute('welcome-message') || '¡Hola! 👋 ¿En qué puedo ayudarte?'
    };
  }

  /**
   * Renderizar el componente React
   */
  render() {
    if (!this.reactRoot) return;

    const config = this.getConfig();
    const ChatbotWrapper = () => {
      const [isOpen, setIsOpen] = useState(config.autoOpen);

      // Exponer métodos al elemento
      this.isOpen = isOpen;
      this._toggleOpen = () => setIsOpen(!isOpen);
      this._setOpen = (value) => setIsOpen(value);

      return React.createElement('div', {
        style: {
          display: isOpen ? 'block' : 'none'
        }
      }, React.createElement(Chat, {
        config: config,
        isOpen: isOpen,
        onToggle: () => setIsOpen(!isOpen)
      }));
    };

    this.reactRoot.render(React.createElement(ChatbotWrapper));
  }

  /**
   * API Pública - Abrir chatbot
   */
  open() {
    if (this._setOpen) {
      this._setOpen(true);
    }
  }

  /**
   * API Pública - Cerrar chatbot
   */
  close() {
    if (this._setOpen) {
      this._setOpen(false);
    }
  }

  /**
   * API Pública - Toggle chatbot
   */
  toggle() {
    if (this._toggleOpen) {
      this._toggleOpen();
    }
  }

  /**
   * API Pública - Enviar mensaje
   */
  sendMessage(message) {
    // Esta funcionalidad requiere acceso directo al componente Chat
    console.log('Mensaje a enviar:', message);
    this.open();
  }
}

// Registrar el Web Component
if (typeof window !== 'undefined' && !customElements.get('solvex-chatbot')) {
  customElements.define('solvex-chatbot', SolvexChatbotElement);
  console.log('✅ Solvex Chatbot Web Component registrado');
}

// Exportar para uso en módulos
export default SolvexChatbotElement;

// API Global para crear instancias programáticamente
if (typeof window !== 'undefined') {
  window.SolvexChatbot = {
    create: function(selector, config = {}) {
      const chatbot = document.createElement('solvex-chatbot');
      
      Object.keys(config).forEach(key => {
        const attr = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        chatbot.setAttribute(attr, config[key]);
      });

      const container = typeof selector === 'string' 
        ? document.querySelector(selector)
        : selector;

      if (container) {
        container.appendChild(chatbot);
        return chatbot;
      } else {
        console.error('Contenedor no encontrado:', selector);
        return null;
      }
    }
  };
}
