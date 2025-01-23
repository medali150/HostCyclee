// src/components/ChatBot.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContent } from '../context/Appcontext'; 

const ChatBot = () => {
  const { isLogin, userData } = useContext(AppContent);
  const [userMessage, setUserMessage] = useState('');
  const [botReply, setBotReply] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  // Fetch chat history when the component mounts
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/auth/chatHistory', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Assuming you're using JWT
          },
        });
        setChatHistory(response.data);
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };
    if (isLogin) {
      fetchChatHistory();
    }
  }, [isLogin]);

  // Handle sending a new chat message
  const handleSendMessage = async () => {
    try {
      const response = await axios.post(
        '/api/chat',
        { userMessage, botReply },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`, // Assuming you're using JWT
          },
        }
      );
      console.log(response.data);
      // Update the chat history
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { userMessage, botReply },
      ]);
      setUserMessage('');
      setBotReply('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Chat with the Bot</h2>

      <div className="chat-container p-4 border rounded shadow-lg">
        {/* Chat History Section */}
        <div className="chat-history mb-4">
          <h4 className="mb-3">Chat History</h4>
          <ul className="list-group">
            {chatHistory.map((chat, index) => (
              <li key={index} className="list-group-item">
                <strong>User:</strong> {chat.userMessage}
                <br />
                <strong>Bot:</strong> {chat.botReply}
              </li>
            ))}
          </ul>
        </div>

        {/* User Input Section */}
        <div className="mb-3">
          <div className="input-group">
            <input
              type="text"
              placeholder="Type your message"
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              className="form-control"
            />
            <button
              onClick={() => setBotReply('Hello, how can I help you?')}
              className="btn btn-outline-secondary"
            >
              Set Bot Reply (For demonstration)
            </button>
          </div>
        </div>

        {/* Bot Reply Section */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Bot's reply"
            value={botReply}
            onChange={(e) => setBotReply(e.target.value)}
            className="form-control"
          />
        </div>

        {/* Send Message Button */}
        <div className="text-center">
          <button
            onClick={handleSendMessage}
            className="btn btn-primary"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
