"use client";

import { useRef, useEffect } from "react";
import { ChatMessage } from "@/types/chat";
import ChatBubble from "./ChatBubble";
import MonsieurLogo from "./MonsieurLogo";

interface ChatWindowProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

/**
 * Scrollable chat window with custom scrollbar styling.
 * Displays messages and an animated typing indicator when the bot is responding.
 */
export default function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto p-5 chat-scroll">
      {messages.map((msg) => (
        <ChatBubble key={msg.id} message={msg} />
      ))}

      {isLoading && (
        <div className="flex justify-start mb-5">
          <div className="mr-2.5 shrink-0">
            <MonsieurLogo size={34} />
          </div>
          <div className="bg-white rounded-2xl rounded-bl-sm px-5 py-3.5 shadow-sm border border-gray-200/60">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 bg-navy-700 rounded-full animate-bounce [animation-delay:0ms] opacity-60" />
              <span className="w-2 h-2 bg-navy-700 rounded-full animate-bounce [animation-delay:150ms] opacity-60" />
              <span className="w-2 h-2 bg-navy-700 rounded-full animate-bounce [animation-delay:300ms] opacity-60" />
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
