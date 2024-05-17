import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { io } from 'socket.io-client';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io('http://3.39.22.211:5004/');
    setSocket(socket);

    socket.on('chat-message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socket && input.trim() !== '') {
      socket.emit('chat-message', input);
      setInput('');
    }
  };

  return (
    <Container>
      <ChatMessages>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </ChatMessages>
      <ChatInputContainer>
        <ChatInput
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="메시지 입력..."
        />
        <SendButton onClick={sendMessage}>전송</SendButton>
      </ChatInputContainer>
    </Container>
  );
};

export default Chat;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatMessages = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ChatInputContainer = styled.div`
  display: flex;
  margin-top: 10px;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
