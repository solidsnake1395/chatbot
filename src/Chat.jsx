import { useState, useRef, useEffect } from "react";
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

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
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
      setMessages([...newMessages, { sender: "bot", text: "❌ Error al contactar con el servidor" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>🤖 Chatbot Gemini</h2>
        <p>Powered by Google AI</p>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="welcome-message">
            <h3>👋 ¡Hola!</h3>
            <p>Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?</p>
          </div>
        )}
        
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.sender}`}>
            <div className="message-bubble">
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
          {isLoading ? "⏳" : "📤"}
        </button>
      </div>
    </div>
  );
}

export default Chat;
