import React, { useState } from 'react'

type Message = {
  sender: string;
  text: string;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmitInputUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userInputInput = e.currentTarget.elements.namedItem('userInput') as HTMLInputElement | null;
    const userInput = userInputInput?.value || '';
    if (userInput.trim() === "") return;
    setMessages([...messages, { sender: 'user', text: userInput }]);
    if (userInputInput) userInputInput.value = '';
    // Here you would typically send the userInput to your backend and get a response
  };

  return (
    <div>
      <h1>Chat</h1>
      <form onSubmit={handleSubmitInputUser}>
        <input type="text" name="userInput" />
        <button type="submit">Send</button>
      </form>
      <div>
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Chat;