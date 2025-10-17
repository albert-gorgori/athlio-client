"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

type Message = {
  sender: string;
  text: string;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmitInputUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userInputInput = e.currentTarget.elements.namedItem(
      "userInput"
    ) as HTMLInputElement | null;
    const userInput = userInputInput?.value || "";
    if (userInput.trim() === "") return;
    setMessages([...messages, { sender: "user", text: userInput }]);
    if (userInputInput) userInputInput.value = "";

    // Here you send the userInput to OpenAI and get a response
    const openAiResponse = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: userInput }),
    });

    const data = await openAiResponse.json();
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "ai", text: data.response },
    ]);
  };

  return (
    <div className="m-12">
      <h1 className="text-2xl font-bold">Chat</h1>

      <div className="mt-4">
        <h1 className="text-xl font-bold">Open AI Response</h1>
        <div className="border-2 p-4 mt-2 h-96 overflow-y-scroll">
          {messages.map((msg, index) => (
            <div key={index} className={msg.sender}>
              {msg.text}
            </div>
          ))}
        </div>
      </div>
        <form
          onSubmit={handleSubmitInputUser}
          className="mt-4 flex items-center w-full"
        >
          <input type="text" name="userInput" className="border-2 mr-4 p-2 w-full" />
          <Button variant="outline" type="submit" className="cursor-pointer">
            Send
          </Button>
        </form>
      </div>
  );
};

export default Chat;
