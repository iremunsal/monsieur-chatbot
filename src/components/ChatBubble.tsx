"use client";

import { ChatMessage } from "@/types/chat";
import TranslationToggle from "./TranslationToggle";
import HintButton from "./HintButton";
import MonsieurLogo from "./MonsieurLogo";

interface ChatBubbleProps {
  message: ChatMessage;
}

/**
 * Renders a single chat message bubble with themed styling.
 * User messages: right-aligned with wine gradient.
 * Assistant messages: left-aligned with white card, logo avatar, and hint/translation buttons.
 */
export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-5`}>
      {!isUser && (
        <div className="mr-2.5 shrink-0 mt-1">
          <MonsieurLogo size={34} />
        </div>
      )}
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-gradient-to-br from-navy-800 to-navy-900 text-white rounded-br-sm shadow-md"
            : "bg-white text-gray-800 shadow-sm border border-gray-200/60 rounded-bl-sm"
        }`}
      >
        {message.imageUrl && (
          <div className="mb-3">
            <img
              src={message.imageUrl}
              alt="Challenge"
              className="rounded-xl max-h-52 w-auto object-cover shadow-sm"
            />
            {message.imageQuestion && (
              <p className="mt-2 font-semibold text-sm text-navy-900">
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
        <span
          className={`block text-[10px] mt-1.5 ${
            isUser ? "text-indigo-300" : "text-gray-400"
          }`}
        >
          {message.timestamp.toLocaleTimeString("tr-TR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      {isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-wine-600 to-wine-700 flex items-center justify-center text-white text-xs font-bold ml-2.5 shrink-0 mt-1 shadow-sm">
          T
        </div>
      )}
    </div>
  );
}
