"use client";

import { useState, useRef, useEffect } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

/**
 * Themed text input area with auto-resize, Monsieur-styled send button,
 * and French placeholder text.
 */
export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200/60">
      <div className="flex items-end gap-3 max-w-full">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Écrivez en français... ✍️"
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none rounded-2xl border border-gray-200 bg-gray-50/80 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-navy-700/30 focus:border-navy-700/40 focus:bg-white disabled:opacity-50 disabled:bg-gray-100 transition-all"
        />
        <button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className="h-11 w-11 rounded-2xl bg-gradient-to-br from-navy-800 to-navy-900 text-white flex items-center justify-center hover:from-navy-700 hover:to-navy-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed shrink-0 cursor-pointer shadow-md hover:shadow-lg active:scale-95"
          aria-label="Gönder"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
