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
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      setMessages([...newMessages, { sender: "bot", text: data.reply }]);
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
      'desarrollo': '¿Qué servicios de desarrollo de software ofrecen?',
      'consultoria': '¿En qué consiste su servicio de consultoría IT?',
      'transformacion': 'Cuéntame sobre sus servicios de transformación digital',
      'contacto': '¿Cómo puedo contactar con el equipo comercial?'
    };
    sendMessage(questions[option]);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="company-logo">
          <h1>SOLVEX GROUP</h1>
          <div className="logo-subtitle">SOLUCIONES TECNOLÓGICAS</div>
        </div>
        <h2><MdSupportAgent className="header-icon" /> Asistente Virtual</h2>
        <p>Soporte técnico y atención al cliente</p>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="welcome-message">
            <h3><FiHelpCircle className="welcome-icon" /> ¡Bienvenido a Solvex Group!</h3>
            <p>Soy tu asistente virtual especializado en soluciones tecnológicas.</p>
            <p>Puedo ayudarte con información sobre:</p>
            <div className="welcome-options">
              <span onClick={() => handleQuickOption('desarrollo')}>
                <FiMonitor className="option-icon" /> Desarrollo de Software
              </span>
              <span onClick={() => handleQuickOption('consultoria')}>
                <FiSettings className="option-icon" /> Consultoría IT
              </span>
              <span onClick={() => handleQuickOption('transformacion')}>
                <FiFileText className="option-icon" /> Transformación Digital
              </span>
              <span onClick={() => handleQuickOption('contacto')}>
                <FiUsers className="option-icon" /> Contacto y Cotizaciones
              </span>
            </div>
            <p style={{ marginTop: '20px', fontSize: '0.95em', opacity: '0.85' }}>
              Escribe tu consulta y te responderé de inmediato.
            </p>
          </div>
        )}
        
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.sender} ${m.isError ? 'error' : ''}`}>
            <div className="message-bubble">
              {m.isError && <FiAlertCircle className="error-icon" />}
              <p>{m.text}</p>
            </div>
          </div>
        ))}

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
