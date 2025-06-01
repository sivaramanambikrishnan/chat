// ChatApp.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('https://chat-ny4d.onrender.com'); 

const ChatApp = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChat((prev) => [...prev, { sender: 'friend', text: data }]);
    });
  }, []);

  const sendMessage = () => {
    if (message.trim() === '') return;
    socket.emit('send_message', message);
    setChat((prev) => [...prev, { sender: 'you', text: message }]);
    setMessage('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat with your friend</h2>
      <div style={{ height: 300, overflowY: 'auto', border: '1px solid gray', padding: 10 }}>
        {chat.map((msg, i) => (
          <div key={i}><b>{msg.sender}:</b> {msg.text}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message..."
        style={{ width: '80%', marginRight: 10 }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatApp;
