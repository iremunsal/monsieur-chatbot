"use client";

import { useState } from "react";

interface TranslationToggleProps {
  textFr: string;
  textEn: string;
}

/**
 * Renders a toggle button that reveals the English translation of a French text.
 * Uses a themed pill button and smooth slide animation.
 */
export default function TranslationToggle({
  textFr,
  textEn,
}: TranslationToggleProps) {
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <div>
      <p className="whitespace-pre-wrap leading-relaxed">{textFr}</p>
      <button
        onClick={() => setShowTranslation(!showTranslation)}
        className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-semibold text-navy-700 hover:text-navy-900 transition-colors cursor-pointer bg-navy-900/5 hover:bg-navy-900/10 rounded-full px-3 py-1"
        aria-label={showTranslation ? "Hide translation" : "Show translation"}
      >
        <span className="text-xs">🇬🇧</span>
        {showTranslation ? "Çeviriyi Gizle" : "İngilizce Çeviri"}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          showTranslation ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm italic text-gray-500 border-l-2 border-navy-700/30 pl-3">
          {textEn}
        </p>
      </div>
    </div>
  );
}
