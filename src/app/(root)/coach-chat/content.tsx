import { Button } from '@/components/ui/button';
import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type Message = {
    sender: string;
    text: string;
};

const Typewriter: React.FC<{ text: string; speed?: number }> = ({ text, speed = 15 }) => {
    const [displayed, setDisplayed] = React.useState("");

    React.useEffect(() => {
        setDisplayed("");
        if (!text) return;
        let i = 0;
        const id = setInterval(() => {
            i++;
            setDisplayed(text.slice(0, i));
            if (i >= text.length) clearInterval(id);
        }, speed);
        return () => clearInterval(id);
    }, [text, speed]);

    return <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>{displayed}</ReactMarkdown>;
};

export default function ChatContent() {
    const [messages, setMessages] = useState<Message[]>([]);
    const chatRef = useRef<HTMLDivElement>(null);
    const [showScrollToBottom, setShowScrollToBottom] = useState(false);

    const scrollToBottom = () => {
        const el = chatRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
    };

    const handleChatScroll = () => {
        const el = chatRef.current;
        if (!el) return;
        const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
        setShowScrollToBottom(!nearBottom);
    };

    useEffect(() => {
        if (!showScrollToBottom) scrollToBottom();
    }, [messages, showScrollToBottom]);

    const handleSubmitInputUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userInputInput = e.currentTarget.elements.namedItem(
            "userInput"
        ) as HTMLInputElement | null;
        const userInput = userInputInput?.value || "";
        if (userInput.trim() === "") return;
        setMessages([...messages, { sender: "user", text: userInput }]);
        if (userInputInput) userInputInput.value = "";

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

    const lastIndex = messages.length - 1;

    return (
        <div className="m-12">
            <div className="flex h-[80vh] rounded-lg border overflow-hidden">
                {/* Sidebar - Chat history */}
                <aside className="w-64 border-r bg-background flex flex-col">
                    <div className="p-4 font-semibold">Chat history</div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-1">
                        <Button variant="ghost" className="w-full justify-start">
                            New Chat
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            Fitness Plan
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            Nutrition Tips
                        </Button>
                        <Button variant="ghost" className="w-full justify-start">
                            Recovery Routine
                        </Button>
                    </div>
                    <div className="p-4 border-t">
                        <Button variant="outline" className="w-full">+ New chat</Button>
                    </div>
                </aside>

                {/* Main chat area */}
                <section className="flex-1 flex flex-col">
                    <div className="p-4 border-b">
                        <h1 className="text-xl font-semibold">YourCoach</h1>
                    </div>

                    <div
                        ref={chatRef}
                        onScroll={handleChatScroll}
                        className="relative flex-1 p-4 overflow-y-auto space-y-3"
                    >
                        {messages.length === 0 && (
                            <div className="text-sm text-muted-foreground">
                                Start the conversation by typing a message below.
                            </div>
                        )}

                        {messages.map((msg, index) => {
                            const isUser = msg.sender === "user";
                            const isLast = index === lastIndex;
                            return (
                                <div key={index} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                                    <div
                                        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                                            isUser ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                                        }`}
                                    >
                                        {isUser ? (
                                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                                        ) : isLast ? (
                                            <Typewriter text={msg.text} speed={15} />
                                        ) : (
                                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                                        )}
                                    </div>
                                </div>
                            );
                        })}

                        {showScrollToBottom && (
                            <div className="absolute bottom-4 right-4">
                                <Button variant="secondary" onClick={scrollToBottom}>
                                    Jump to bottom
                                </Button>
                            </div>
                        )}
                    </div>

                    <form
                        onSubmit={handleSubmitInputUser}
                        className="p-4 border-t flex items-center gap-2"
                    >
                        <input
                            type="text"
                            name="userInput"
                            placeholder="Type your message..."
                            className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                        <Button type="submit" className="cursor-pointer">
                            Send
                        </Button>
                    </form>
                </section>
            </div>
        </div>
    )
}
