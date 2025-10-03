import { useState, useRef, useEffect } from "react";
import { 
  FiMessageSquare, 
  FiSend, 
  FiClock, 
  FiMonitor, 
  FiFileText, 
  FiUsers,
  FiSettings,
  FiHelpCircle,
  FiAlertCircle
} from "react-icons/fi";
import { 
  MdBusinessCenter, 
  MdSupportAgent 
} from "react-icons/md";
import "./Chat.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (messageText) => {
    const userMessage = messageText || input;
    if (!userMessage.trim() || isLoading) return;

    const newMessages = [...messages, { sender: "user", text: userMessage }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      // Usar variable de entorno para la URL del API
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const res = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      // Extraer sugerencias si existen
      let botReply = data.reply;
      let newSuggestions = [];
      
      if (botReply.includes('###SUGERENCIAS###')) {
        const parts = botReply.split('###SUGERENCIAS###');
        botReply = parts[0].trim();
        if (parts[1]) {
          newSuggestions = parts[1].split('###').map(s => s.trim()).filter(s => s.length > 0);
        }
      }

      setMessages([...newMessages, { sender: "bot", text: botReply }]);
      setSuggestions(newSuggestions);
    } catch (err) {
      console.error("Error al enviar mensaje:", err);
      setMessages([...newMessages, { 
        sender: "bot", 
        text: "Error al contactar con el servidor. Por favor, intenta nuevamente.",
        isError: true 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickOption = (option) => {
    const questions = {
      'ventas': '¿Cómo funciona la externalización de ventas y qué resultados puedo esperar?',
      'cliente': '¿Qué incluye el servicio de atención al cliente?',
      'ia': 'Cuéntame sobre las soluciones de inteligencia artificial que ofrecen',
      'contacto': '¿Cómo puedo agendar una consulta gratuita?'
    };
    sendMessage(questions[option]);
  };

  const handleSuggestion = (suggestionText) => {
    setSuggestions([]); // Limpiar sugerencias al hacer click
    sendMessage(suggestionText);
  };

  // Función para extraer enlaces del texto
  const extractLinks = (text) => {
    if (!text) return { text, links: [] };
    
    const links = [];
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    
    // Extraer todos los enlaces
    while ((match = linkRegex.exec(text)) !== null) {
      links.push({ text: match[1], url: match[2] });
    }
    
    // Remover enlaces del texto
    const cleanText = text.replace(linkRegex, '');
    
    return { text: cleanText, links };
  };

  // Función para formatear el texto con markdown simple
  const formatMessage = (text) => {
    if (!text) return '';
    
    // Convertir **texto** a <strong>
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convertir *texto* a <em>
    formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convertir saltos de línea a <br>
    formatted = formatted.replace(/\n/g, '<br>');
    
    // Convertir listas simples
    formatted = formatted.replace(/^- (.*?)$/gm, '<li>$1</li>');
    formatted = formatted.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    
    return formatted;
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="company-logo">
          <h1>SOLVEX GROUP</h1>
          <div className="logo-subtitle">OUTSOURCING B2B</div>
        </div>
        <h2><MdSupportAgent className="header-icon" /> Asistente Virtual</h2>
        <p>Externalización de Ventas • Atención al Cliente • IA</p>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="welcome-message">
            <h3><FiHelpCircle className="welcome-icon" /> ¡Bienvenido a Solvex Group!</h3>
            <p>Soy tu asistente virtual especializado en outsourcing B2B.</p>
            <p>Puedo ayudarte con información sobre:</p>
            <div className="welcome-options">
              <span onClick={() => handleQuickOption('ventas')}>
                <MdBusinessCenter className="option-icon" /> Externalización de Ventas
              </span>
              <span onClick={() => handleQuickOption('cliente')}>
                <MdSupportAgent className="option-icon" /> Atención al Cliente
              </span>
              <span onClick={() => handleQuickOption('ia')}>
                <FiSettings className="option-icon" /> Inteligencia Artificial
              </span>
              <span onClick={() => handleQuickOption('contacto')}>
                <FiUsers className="option-icon" /> Consulta Gratuita
              </span>
            </div>
            <p style={{ marginTop: '20px', fontSize: '0.95em', opacity: '0.85' }}>
              Escribe tu consulta y te responderé de inmediato.
            </p>
          </div>
        )}
        
        {messages.map((m, i) => {
          const { text, links } = m.sender === 'bot' ? extractLinks(m.text) : { text: m.text, links: [] };
          
          return (
            <div key={i} className={`message ${m.sender} ${m.isError ? 'error' : ''}`}>
              <div className="message-bubble">
                {m.isError && <FiAlertCircle className="error-icon" />}
                {m.sender === 'bot' ? (
                  <>
                    <div dangerouslySetInnerHTML={{ __html: formatMessage(text) }} />
                    {links.length > 0 && (
                      <div className="message-links">
                        {links.map((link, idx) => (
                          <a 
                            key={idx} 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="link-button"
                          >
                            {link.text} →
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <p>{m.text}</p>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="message bot">
            <div className="message-bubble loading">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        {/* Sugerencias de seguimiento */}
        {suggestions.length > 0 && !isLoading && (
          <div className="suggestions-container">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                className="suggestion-button"
                onClick={() => handleSuggestion(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Escribe tu mensaje..."
          disabled={isLoading}
        />
        <button onClick={sendMessage} disabled={isLoading || !input.trim()}>
          {isLoading ? <FiClock className="button-icon spinning" /> : <FiSend className="button-icon" />}
        </button>
      </div>
    </div>
  );
}

export default Chat;
