import React, { useState } from 'react';
import '../styles.css'; 
import botImage from '/src/assets/rk.png'; 


function Navbar({ onThemeChange }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
    onThemeChange(!isDarkMode);
  };

  return (
    <div className={`navbar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="chatbot-header">
      <img src={botImage} alt="Bot Logo" className="logos" />
        <h1>ChatWave</h1>
      </div>
      <button onClick={handleThemeToggle} className="theme-toggle">
        <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
      </button>
    </div>
  );
}

export default Navbar;
