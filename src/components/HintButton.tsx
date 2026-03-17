"use client";

import { useState } from "react";
import { HintSentence } from "@/types/chat";

interface HintButtonProps {
  hints: HintSentence[];
}

/**
 * Expandable hint button for image challenges.
 * Shows sample French sentences with English translations
 * to guide the user on how to respond to a visual prompt.
 */
export default function HintButton({ hints }: HintButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-xs font-medium text-amber-600 hover:text-amber-800 transition-colors cursor-pointer bg-amber-50 hover:bg-amber-100 rounded-lg px-3 py-1.5"
        aria-label={isOpen ? "Hide hints" : "Show hints"}
      >
        <span className="text-sm">💡</span>
        {isOpen ? "İpuçlarını Gizle" : "Olası Cevapları Gör"}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2">
          {hints.map((hint, index) => (
            <div
              key={index}
              className="bg-amber-50/60 border border-amber-200 rounded-lg p-2.5"
            >
              <p className="text-sm font-medium text-gray-800">{hint.fr}</p>
              <p className="text-xs text-gray-500 italic mt-0.5">{hint.en}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
