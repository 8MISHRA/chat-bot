import React, { useState } from 'react';
import '../styles.css';
import botImage from '/src/assets/rk.png';

function WelcomePage({ onStartChat }) {
  const [isChatStarted, setIsChatStarted] = useState(false);

  const handleStartChat = () => {
    setIsChatStarted(true);
    setTimeout(() => {
      onStartChat(); 
    }, 1000); 
  };

  return (
    <div className={`welcome-page ${isChatStarted ? 'fade-out' : ''}`}>
      <div className="welcome-content">
        <img src={botImage} alt="Bot Logo" className="logo" />
        <h1 className="welcome-title">Welcome to ChatWave</h1>
        <button className="welcome-message">
        How can I assist you today?
        </button>
        
        <ul className="features-list">
          <li>✨ Real-time text transformations</li>
          <li>💡 Helpful suggestions and tips</li>
          <li>🎉 Fun facts and interesting conversations</li>
          <li>Enjoy Chaating</li>
        </ul>
        {/* Design by Raushan with Love */}
      <footer className="footer">
        <p className="designed-by">
          Designed with <i className="fas fa-heart love-icon"></i> by Raushan & Divyansh
        </p>
      </footer>
        <button onClick={handleStartChat} className="start-chat-button">
          Let's Chat!
        </button>
      </div>
    </div>
    
  );
}

export default WelcomePage;
