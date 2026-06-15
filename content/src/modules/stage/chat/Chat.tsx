"use client";

import { useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  function handleSend() {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setInput("");
    // gibberish streaming placeholder
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: "Lorem ipsum response." }]);
    }, 500);
  }

  return (
    <div className="chat">
      <div className="chat__feed">
        {messages.map((m, i) => (
          <div key={i} className={`chat__message chat__message--${m.role}`}>
            {m.content}
          </div>
        ))}
      </div>
      <div className="chat__input">
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
