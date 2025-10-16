// ============================================
// SOLVEX CHATBOT - WEB COMPONENT WRAPPER
// Archivo: src/chatbot-webcomponent.jsx
// ============================================

import React from 'react';
import { createRoot } from 'react-dom/client';
import Chat from './Chat';

/**
 * Web Component personalizado para el Chatbot de Solvex
 * Permite integrar el chatbot React en cualquier página HTML
 */
class SolvexChatbotElement extends HTMLElement {
  constructor() {
    super();
    this.root = null;
    this.reactRoot = null;
  }

  /**
   * Atributos observables del componente
   */
  static get observedAttributes() {
    return ['theme', 'primary-color', 'position', 'auto-open', 'api-endpoint'];
  }

  /**
   * Se ejecuta cuando el elemento se añade al DOM
   */
  connectedCallback() {
    // Crear Shadow DOM para encapsulación
    this.attachShadow({ mode: 'open' });
    
    // Crear contenedor para React
    const container = document.createElement('div');
    container.id = 'chatbot-root';
    
    // Añadir estilos al Shadow DOM
    this.injectStyles();
    
    this.shadowRoot.appendChild(container);
    
    // Crear root de React y renderizar
    this.reactRoot = createRoot(container);
    this.render();
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
   * Se ejecuta cuando un atributo observado cambia
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue && this.reactRoot) {
      this.render();
    }
  }

  /**
   * Obtener configuración desde los atributos
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
   * Inyectar estilos en el Shadow DOM
   */
  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      :host {
        all: initial;
        display: block;
      }
      
      #chatbot-root {
        position: fixed;
        z-index: 999999;
      }
      
      /* Posiciones del chatbot */
      :host([position="bottom-right"]) #chatbot-root {
        bottom: 20px;
        right: 20px;
      }
      
      :host([position="bottom-left"]) #chatbot-root {
        bottom: 20px;
        left: 20px;
      }
      
      :host([position="top-right"]) #chatbot-root {
        top: 20px;
        right: 20px;
      }
      
      :host([position="top-left"]) #chatbot-root {
        top: 20px;
        left: 20px;
      }
      
      /* Responsive */
      @media (max-width: 768px) {
        #chatbot-root {
          bottom: 10px !important;
          right: 10px !important;
          left: 10px !important;
          top: auto !important;
        }
      }
    `;
    this.shadowRoot.appendChild(style);
  }

  /**
   * Renderizar el componente React
   */
  render() {
    const config = this.getConfig();
    
    this.reactRoot.render(
      <React.StrictMode>
        <ChatWrapper config={config} element={this} />
      </React.StrictMode>
    );
  }

  /**
   * API pública del Web Component
   */
  open() {
    this.dispatchEvent(new CustomEvent('chatbot:open'));
  }

  close() {
    this.dispatchEvent(new CustomEvent('chatbot:close'));
  }

  toggle() {
    this.dispatchEvent(new CustomEvent('chatbot:toggle'));
  }

  sendMessage(message) {
    this.dispatchEvent(new CustomEvent('chatbot:send', { 
      detail: { message } 
    }));
  }
}

/**
 * Wrapper de React que escucha eventos del Web Component
 */
function ChatWrapper({ config, element }) {
  const [isOpen, setIsOpen] = React.useState(config.autoOpen || false);
  const [externalMessage, setExternalMessage] = React.useState(null);

  React.useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const handleToggle = () => setIsOpen(prev => !prev);
    const handleSend = (e) => setExternalMessage(e.detail.message);

    element.addEventListener('chatbot:open', handleOpen);
    element.addEventListener('chatbot:close', handleClose);
    element.addEventListener('chatbot:toggle', handleToggle);
    element.addEventListener('chatbot:send', handleSend);

    return () => {
      element.removeEventListener('chatbot:open', handleOpen);
      element.removeEventListener('chatbot:close', handleClose);
      element.removeEventListener('chatbot:toggle', handleToggle);
      element.removeEventListener('chatbot:send', handleSend);
    };
  }, [element]);

  return (
    <Chat 
      config={config}
      isOpen={isOpen}
      onToggle={() => setIsOpen(prev => !prev)}
      externalMessage={externalMessage}
    />
  );
}

// Registrar el Custom Element
if (!customElements.get('solvex-chatbot')) {
  customElements.define('solvex-chatbot', SolvexChatbotElement);
}

// Exponer API global
window.SolvexChatbot = {
  version: '1.0.0',
  
  // Crear instancia programáticamente
  create(selector, config = {}) {
    const element = document.createElement('solvex-chatbot');
    
    // Aplicar configuración
    Object.entries(config).forEach(([key, value]) => {
      const attrName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      element.setAttribute(attrName, value);
    });
    
    // Añadir al DOM
    const container = document.querySelector(selector);
    if (container) {
      container.appendChild(element);
    } else {
      document.body.appendChild(element);
    }
    
    return element;
  },
  
  // Obtener todas las instancias
  getInstances() {
    return document.querySelectorAll('solvex-chatbot');
  }
};

export default SolvexChatbotElement;
