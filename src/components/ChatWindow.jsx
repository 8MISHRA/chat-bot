import React, { useEffect, useRef, useState } from 'react';
import '../styles.css';
import Navbar from './Navbar';
import userImage from '../assets/profile.jpeg'; 
import botImage from '../assets/rk.png'; 

function ChatWindow({ messages }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef(null);

  const handleThemeChange = (darkMode) => {
    setIsDarkMode(darkMode);
  };

  // Scroll to the bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className={`chat-window ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Navbar onThemeChange={handleThemeChange} />
      <div
        className="messages-container"
        style={{
          backgroundImage: `url(/src/assets/tile.jpg)`,
          backgroundSize: 'cover',  
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat',
          height: '50vh', 
          width: '90%',  
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="message-content">
              <div className="message-header">
                {msg.sender === 'user' && (
                  <>
                    <img src={userImage} alt="User Logo" className="logo" />
                    <span className="username">
                      {msg.username || 'You'}
                      <span className="timestamp">{msg.timestamp}</span>
                      
                      {/* <div className="timestamp">{msg.timestamp}</div> */}
                    </span>
                  </>
                )}
                {msg.sender === 'bot' && (
                  <>
                    <img src={botImage} alt="Bot Logo" className="logo" />
                    <span className="username">{msg.username || 'Response....'}</span>
                    <div className="timestamp">{msg.timestamp}</div>
                  </>
                )}
              </div>
              <div className="message-text">{msg.text}</div>
            </div>
          </div>
        ))}
        {/* This div will be scrolled into view */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export default ChatWindow;
