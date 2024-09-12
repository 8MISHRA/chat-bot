import React, { useState } from 'react';
import WelcomePage from './WelcomePage';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import Bot from './Bot';
import './styles.css';

function App() {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [messages, setMessages] = useState([]);

  const startChat = () => {
    setIsChatVisible(true);
  };

  const addMessage = (message) => {
    const now = new Date();
    const timestamp = now.toLocaleTimeString();
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, sender: 'user', timestamp }
    ]);
    setTimeout(() => {
      const botResponse = Bot(message);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: botResponse, sender: 'bot', timestamp: now.toLocaleTimeString() }
      ]);
    }, 1000);
  };

  return (
    <div className="app">
      {!isChatVisible ? (
        <WelcomePage onStartChat={startChat} />
      ) : (
        <div className="chat-container">
          <ChatWindow messages={messages} />
          <MessageInput onSend={addMessage} />
        </div>
      )}
    </div>
  );
}

export default App;
