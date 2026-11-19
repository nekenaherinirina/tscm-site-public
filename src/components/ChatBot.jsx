import { useState } from 'react';
import './ChatBot.css';

const PERSONNAGES = [
  {
    id: 'neki',
    name: 'Neki',
    emoji: '💜',
    color: '#8B5CF6',
    personality: 'Calm, intelligent, impassive',
    greeting: 'Hello. I am Neki. How can I assist you today?',
    systemPrompt: 'You are Neki, a calm, intelligent and impassive assistant for The Sunrise Centers International (TSCM), an NGO based in Antsirabe, Madagascar. You speak calmly and thoughtfully, with intelligence and without excessive emotion. Answer briefly and clearly.',
    chibiImage: '/AIchihi.png',
    profileImage: '/profileIA.png',
    backgroundImage: '/fondIA.png',
    useImages: true,
  },
  {
    id: 'luna',
    name: 'Luna',
    emoji: '🌙',
    color: '#3B82F6',
    personality: 'Gentle, warm, reassuring',
    greeting: 'Hi there 🌙 I\'m Luna. I\'m here to help you with anything you need.',
    systemPrompt: 'You are Luna, a gentle, warm and reassuring assistant for The Sunrise Centers International (TSCM), an NGO based in Antsirabe, Madagascar. You speak kindly, with warmth and empathy. Answer briefly and kindly.',
    chibiImage: null,
    profileImage: null,
    backgroundImage: null,
    useImages: false,
  },
  {
    id: 'max',
    name: 'Max',
    emoji: '⚡',
    color: '#F0B323',
    personality: 'Dynamic, direct, efficient',
    greeting: 'Hey! ⚡ Max here. Let\'s get straight to the point — what do you need?',
    systemPrompt: 'You are Max, a dynamic, direct and efficient assistant for The Sunrise Centers International (TSCM), an NGO based in Antsirabe, Madagascar. You speak with energy and efficiency, going straight to the point. Answer briefly and dynamically.',
    chibiImage: null,
    profileImage: null,
    backgroundImage: null,
    useImages: false,
  },
  {
    id: 'kai',
    name: 'Kai',
    emoji: '🎨',
    color: '#10B981',
    personality: 'Creative, inspiring, motivating',
    greeting: 'Hey! 🎨 I\'m Kai. Let\'s create something amazing together!',
    systemPrompt: 'You are Kai, a creative, inspiring and motivating assistant for The Sunrise Centers International (TSCM), an NGO based in Antsirabe, Madagascar. You speak with creativity and enthusiasm, inspiring people. Answer briefly and inspirationally.',
    chibiImage: null,
    profileImage: null,
    backgroundImage: null,
    useImages: false,
  },
];

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPersonnage, setSelectedPersonnage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Choisir un personnage
  const handleSelectPersonnage = (perso) => {
    setSelectedPersonnage(perso);
    setMessages([{ role: 'assistant', text: perso.greeting }]);
  };

  // Retour à la sélection
  const handleBack = () => {
    setSelectedPersonnage(null);
    setMessages([]);
  };

  // Envoyer un message
  const handleSend = async () => {
    if (!input.trim() || !selectedPersonnage) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:4000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          systemPrompt: selectedPersonnage.systemPrompt
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: data.reply || data.error || 'Sorry, I couldn\'t respond.'
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: 'Sorry, I couldn\'t respond.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* BOUTON ROND FLOTTANT */}
      <button
        className={`chatbot-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open chat"
      >
        {isOpen ? '✕' : (
          <img src="/ia.png" alt="AI" className="chatbot-button-img" />
        )}
      </button>

      {/* PANNEAU DE CHAT */}
      {isOpen && (
        <div className="chatbot-panel">
          
          {/* ===== ÉCRAN DE SÉLECTION ===== */}
          {!selectedPersonnage ? (
            <div className="chatbot-select">
              <div className="chatbot-select-header">
                <h3>Choose your assistant</h3>
                <p>Select a character to start</p>
              </div>
              <div className="chatbot-select-grid">
                {PERSONNAGES.map((perso) => (
                  <button
                    key={perso.id}
                    className="chatbot-select-card"
                    onClick={() => handleSelectPersonnage(perso)}
                    style={{ '--perso-color': perso.color }}
                  >
                    <div className="chatbot-select-avatar" style={{ background: perso.color }}>
                      {perso.useImages ? (
                        <img src={perso.chibiImage} alt={perso.name} />
                      ) : (
                        <span>{perso.emoji}</span>
                      )}
                    </div>
                    <h4>{perso.name}</h4>
                    <p>{perso.personality}</p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* ===== ÉCRAN DE CHAT ===== */
            <>
              {/* HEADER */}
              <div
                className="chatbot-header"
                style={
                  selectedPersonnage.useImages
                    ? {
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${selectedPersonnage.backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }
                    : { background: selectedPersonnage.color }
                }
              >
                <div className="chatbot-header-info">
                  <div className="chatbot-header-avatar" style={{ background: selectedPersonnage.color }}>
                    {selectedPersonnage.useImages ? (
                      <img src={selectedPersonnage.profileImage} alt={selectedPersonnage.name} />
                    ) : (
                      <span>{selectedPersonnage.emoji}</span>
                    )}
                  </div>
                  <div>
                    <h3>{selectedPersonnage.name}</h3>
                    <p>Online • {selectedPersonnage.personality}</p>
                  </div>
                </div>
                <button className="chatbot-back" onClick={handleBack} title="Change assistant">
                  ⟲
                </button>
              </div>

              {/* MESSAGES */}
<div
  className="chatbot-messages"
  style={
    selectedPersonnage.useImages
      ? {
          backgroundImage: `url(${selectedPersonnage.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
      : {}
  }
>
                {messages.map((msg, i) => (
                  <div key={i} className="chatbot-message-row">
                    {msg.role === 'assistant' && (
                      <div className="chatbot-message-avatar" style={{ background: selectedPersonnage.color }}>
                        {selectedPersonnage.useImages ? (
                          <img src={selectedPersonnage.profileImage} alt="" />
                        ) : (
                          <span>{selectedPersonnage.emoji}</span>
                        )}
                      </div>
                    )}
                    <div
                      className={`chatbot-message ${msg.role}`}
                      style={
                        msg.role === 'assistant'
                          ? { borderLeft: `3px solid ${selectedPersonnage.color}` }
                          : { background: selectedPersonnage.color }
                      }
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="chatbot-message-row">
                    <div className="chatbot-message-avatar" style={{ background: selectedPersonnage.color }}>
                      {selectedPersonnage.useImages ? (
                        <img src={selectedPersonnage.profileImage} alt="" />
                      ) : (
                        <span>{selectedPersonnage.emoji}</span>
                      )}
                    </div>
                    <div className="chatbot-message assistant">
                      <span className="typing">● ● ●</span>
                    </div>
                  </div>
                )}
              </div>

              {/* INPUT */}
              <div className="chatbot-input">
                <input
                  type="text"
                  placeholder={`Message ${selectedPersonnage.name}...`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={loading}
                />
                <button
                  onClick={handleSend}
                  disabled={loading}
                  style={{ background: selectedPersonnage.color }}
                >
                  ➤
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default ChatBot;
