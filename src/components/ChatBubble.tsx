"use client";

import { ChatMessage } from "@/types/chat";
import TranslationToggle from "./TranslationToggle";
import HintButton from "./HintButton";

interface ChatBubbleProps {
  message: ChatMessage;
}

/**
 * Renders a single chat message bubble.
 * User messages appear on the right with a blue background.
 * Assistant messages appear on the left with a white background,
 * translation toggle, and hint button for image challenges.
 */
export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold mr-2 shrink-0 mt-1">
          M
        </div>
      )}
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-blue-600 text-white rounded-br-sm"
            : "bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm"
        }`}
      >
        {message.imageUrl && (
          <div className="mb-3">
            <img
              src={message.imageUrl}
              alt="Challenge"
              className="rounded-lg max-h-48 w-auto object-cover"
            />
            {message.imageQuestion && (
              <p className="mt-2 font-medium text-sm">
                {message.imageQuestion}
              </p>
            )}
          </div>
        )}
        <TranslationToggle
          textFr={message.contentFr}
          textEn={message.contentEn}
        />
        {message.hintSentences && message.hintSentences.length > 0 && (
          <HintButton hints={message.hintSentences} />
        )}
        <span className="block text-[10px] mt-1 opacity-50">
          {message.timestamp.toLocaleTimeString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold ml-2 shrink-0 mt-1">
          T
        </div>
      )}
    </div>
  );
}
