import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://localhost', { secure: true });

const Chatroom = () => {
  const [messages, setMessages] = useState<{ sender: string; content: string }[]>([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState(''); // Replace with the logged-in user's name

  useEffect(() => {
    // Fetch past messages from the server
    fetch('https://localhost/api/chat/messages')
      .then((res) => res.json())
      .then((data) => setMessages(data));

    // Listen for new messages
    socket.on('chatMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('chatMessage');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { sender: username, content: message };
      socket.emit('chatMessage', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Chat Header */}
      <div className="bg-indigo-600 text-white p-4 text-lg font-bold">Chatroom</div>

      {/* Messages List */}
      <div className="flex-grow overflow-y-auto p-4 bg-gray-100">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="font-bold">{msg.sender}: </span>
            <span>{msg.content}</span>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-4/5 p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={sendMessage}
          className="w-1/5 bg-indigo-600 text-white p-2 ml-2 rounded-md"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatroom;
