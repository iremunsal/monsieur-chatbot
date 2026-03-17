"use client";

import { useState } from "react";

interface TranslationToggleProps {
  textFr: string;
  textEn: string;
}

/**
 * Renders a toggle button that reveals the English translation of a French text.
 * Clicking the button slides open/closed the English translation below the French content.
 */
export default function TranslationToggle({
  textFr,
  textEn,
}: TranslationToggleProps) {
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <div>
      <p className="whitespace-pre-wrap">{textFr}</p>
      <button
        onClick={() => setShowTranslation(!showTranslation)}
        className="mt-2 flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-800 transition-colors cursor-pointer"
        aria-label={showTranslation ? "Hide translation" : "Show translation"}
      >
        <span className="text-sm">{showTranslation ? "🔽" : "🔼"}</span>
        {showTranslation ? "Çeviriyi Gizle" : "İngilizce Çeviri"}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          showTranslation ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm italic text-gray-500 border-l-2 border-blue-300 pl-2">
          {textEn}
        </p>
      </div>
    </div>
  );
}
