"use client";

import { useState } from "react";
import { HintSentence } from "@/types/chat";

interface HintButtonProps {
  hints: HintSentence[];
}

/**
 * Expandable hint panel for image challenges.
 * Shows sample French response sentences with English translations
 * in themed cards that match the application's design language.
 */
export default function HintButton({ hints }: HintButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-gold-500 hover:text-gold-400 transition-colors cursor-pointer bg-gold-400/10 hover:bg-gold-400/20 rounded-full px-3 py-1"
        aria-label={isOpen ? "Hide hints" : "Show hints"}
      >
        <span className="text-xs">💡</span>
        {isOpen ? "İpuçlarını Gizle" : "Olası Cevapları Gör"}
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100 mt-2.5" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-2">
          {hints.map((hint, index) => (
            <div
              key={index}
              className="bg-cream-50 border border-gold-400/20 rounded-xl p-3"
            >
              <p className="text-sm font-medium text-navy-900">{hint.fr}</p>
              <p className="text-xs text-gray-400 italic mt-1">{hint.en}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
