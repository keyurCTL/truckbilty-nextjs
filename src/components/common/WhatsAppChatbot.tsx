'use client';

import { useState } from 'react';
import './WhatsAppChatbot.css';

export default function WhatsAppChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const phoneNumber = '919998060916';

  const quickMessages = [
    { id: 1, text: 'Help Me to Create Account' },
    { id: 2, text: 'Tell Me More About Your Service' },
    { id: 3, text: 'Call Me Back' }
  ];

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || message;
    if (textToSend.trim()) {
      const encodedMessage = encodeURIComponent(textToSend);
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
      setMessage('');
      setIsOpen(false);
    }
  };

  const handleQuickMessage = (text: string) => {
    handleSendMessage(text);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="chat-button"
        aria-label="Open WhatsApp Chat"
      >
        {isOpen ? (
          <div className="close-icon">×</div>
        ) : (
          <div className="whatsapp-icon">
            <img src="/images/whatsapp.svg" alt="whatsapp" />
          </div>
        )}
      </button>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-avatar">💬</div>
            <div>
              <h3 className="chat-title">Chat with us</h3>
              <p className="chat-subtitle">We typically reply instantly</p>
            </div>
          </div>

          <div className="chat-body">
            <div className="chat-message">
              <p className="chat-message-text">
                👋 Hi there! How can we help you today?
              </p>
              <p className="chat-message-time">Just now</p>
            </div>

            <div className="quick-replies">
              {quickMessages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => handleQuickMessage(msg.text)}
                  className="quick-reply-button"
                >
                  <span className="quick-reply-text">{msg.text}</span>
                </button>
              ))}
            </div>

            <div className="chat-input-container">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="chat-textarea"
                rows={2}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!message.trim()}
                className="send-button"
                aria-label="Send message"
              >
                ➤
              </button>
            </div>

            <p className="chat-footer">Powered by WhatsApp</p>
          </div>
        </div>
      )}
    </>
  );
}