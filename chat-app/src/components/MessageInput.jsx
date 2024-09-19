import React, { useState, useRef } from 'react';
import '../styles.css';
import { FaMicrophone, FaMicrophoneAlt, FaPaperPlane, FaFileUpload, FaRegSmile, FaTimesCircle } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';

function MessageInput({ onSend }) {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [fileContent, setFileContent] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const sendButtonRef = useRef(null); // Reference to the send button

  const handleSubmit = (e) => {
    e?.preventDefault();  // Make e optional in case of automatic sending
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
    if (fileContent.trim()) {
      onSend(fileContent);
      setFileContent('');
    }
  };

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  const handleMicClick = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setInput(transcript);
    setIsListening(false);
    setTimeout(() => {
      if (sendButtonRef.current) {
        sendButtonRef.current.click();  // Automatically click send button after 1 second
      }
    }, 1000);
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    setIsListening(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target.result);
        // Automatically click the send button after 1 second of setting file content
        setTimeout(() => {
          if (sendButtonRef.current) {
            sendButtonRef.current.click();  // Trigger the send button click
          }
        }, 1000);
      };
      reader.readAsText(file);
    }
  };

  const handleEmojiClick = (emoji) => {
    setInput((prevInput) => prevInput + emoji.emoji);
    setShowEmojiPicker(false);
  };

  const handleClearClick = () => {
    setInput('');
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target.result);
        // Automatically click the send button after 1 second of setting file content
        setTimeout(() => {
          if (sendButtonRef.current) {
            sendButtonRef.current.click();  // Trigger the send button click
          }
        }, 1000);
      };
      reader.readAsText(file);
    }
  };

  const handleCloseEmojiPicker = () => {
    setShowEmojiPicker(false);
  };

  return (
    <form className="message-input" onSubmit={handleSubmit} onDragOver={handleDragOver} onDrop={handleDrop}>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isListening ? 'Listening...' : 'Type your message...'}
        />
        {input && (
          <button type="button" className="clear-button" onClick={handleClearClick}>
            <FaTimesCircle />
          </button>
        )}
        <button
          type="submit"
          className="send-button"
          ref={sendButtonRef} // Set reference for the send button
        >
          <FaPaperPlane />
        </button>
      </div>
      <div className="button-row">
        <button
          type="button"
          className={`mic-button ${isListening ? 'active' : ''}`}
          onClick={handleMicClick}
        >
          {isListening ? <FaMicrophoneAlt /> : <FaMicrophone />}
        </button>
        <label className="file-upload">
          <input
            type="file"
            accept=".txt"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <FaFileUpload />
        </label>
        <button type="button" className="emoji-button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <FaRegSmile />
        </button>
      </div>
      {fileContent && <div className="file-preview"></div>}
      {showEmojiPicker && (
        <div className="emoji-picker-container">
          <button className="close-button" onClick={handleCloseEmojiPicker}>
            <FaTimesCircle />
          </button>
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </form>
  );
}

export default MessageInput;
