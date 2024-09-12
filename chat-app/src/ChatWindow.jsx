import React, { useState } from 'react';
import './styles.css';
import Navbar from './Navbar';
import userImage from './assets/profile.jpeg'; 
import botImage from './assets/rk.png'; 
function ChatWindow({ messages }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeChange = (darkMode) => {
    setIsDarkMode(darkMode);
  };

  return (
    <div className={`chat-window ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Navbar onThemeChange={handleThemeChange} />
      <div
        className="messages-container"
        style={{
          backgroundImage: `url(/src/assets/tile.jpg)`, // Make sure this image is in the correct folder
        }}
      >
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="message-content">
              {/* Display image and username */}
              <div className="message-header">
                {msg.sender === 'user' && (
                  <>
                    <img src={userImage} alt="User Logo" className="logo" />
                    <span className="username">{msg.username || 'Raushan'}
                      <div className="timestamp">{msg.timestamp}</div>

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
      </div>
    </div>
  );
}

export default ChatWindow;
