import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Aymen from "../dash/header"; // Assuming this is the correct path
import { AppContent } from '../context/Appcontext';
const Chatbot = () => {
  
  const [messages, setMessages] = useState([
    { text: 'Welcome! How can I assist you today?', sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
 
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]); // Scroll to bottom when messages change

  const handleSend = async () => {
    if (!input.trim()) {
      console.log("Input is empty.  Not sending.");  // Debugging: Don't send empty messages
      return;
    }

    const userMessage = { text: input, sender: "user" };
    const newMessages = [...messages, userMessage]; // Add user message immediately
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    console.log("Sending message:", input); // Debugging: Log what we're sending

    try {
      let botResponse = "";

      // Simple chatbot logic (move this to backend for better design)
      if (input.toLowerCase().includes("your name")) {
        botResponse = "My name is HostCycleChat.";
      } else if (input.toLowerCase().includes("hostcycle")) {
        botResponse = "HostCycle is a platform for managing hosting cycles.";
      } else if (input.toLowerCase().includes("features")) {
        botResponse = "HostCycle offers features like client registration, hosting cycle management, automated reminders, and a user-friendly dashboard.";
      } else {
        console.log("Sending API request..."); // Debugging:  Show that we're sending to API
        const response = await axios.post(
          "https://host-cycle-ji9x-aymens-projects-9ad69811.vercel.app/api/auth/Chat", // Use relative path (or environment variable)
          { message: input },
          {
            withCredentials: true, // Keep this if needed for authentication
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("API Response:", response); // Debugging: Log the entire response
        botResponse = response.data.reply;
      }
      const botMessage = { text: botResponse, sender: "bot" };
      setMessages([...newMessages, botMessage]);  // Add bot response
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = { text: "Error: Unable to get response", sender: "bot" };
      setMessages([...newMessages, errorMessage]); // Show the error message to user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Aymen />
      <div className="flex flex-col h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
        <div className="flex-1 overflow-hidden py-4 px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              8anjou chat
            </h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-[60vh] overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-2 rounded-lg ${
                        msg.sender === "user"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
                      <p>Thinking...</p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              <div className="border-t border-gray-200 px-4 py-4 sm:mb-0">
                <div className="relative flex">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-4 bg-gray-100 rounded-full py-3 sm:py-2"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  />
                  <div className="absolute right-0 items-center inset-y-0 flex">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-full h-10 w-10 sm:h-12 sm:w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
                      onClick={handleSend}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-6 w-6 transform rotate-90"
                      >
                        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;