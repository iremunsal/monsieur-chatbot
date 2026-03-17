"use client";

import { Feedback } from "@/types/chat";

interface FeedbackPanelProps {
  feedback: Feedback | null;
}

/**
 * Feedback sidebar panel with themed styling.
 * Shows grammar rating, corrections, explanations, and learning tips
 * in a visually organized card layout.
 */
export default function FeedbackPanel({ feedback }: FeedbackPanelProps) {
  if (!feedback) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
        <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mb-4">
          <span className="text-3xl">📝</span>
        </div>
        <p className="text-sm text-center text-gray-500 leading-relaxed">
          Fransızca yazdığınızda burada geri bildirim görünecek.
        </p>
      </div>
    );
  }

  const ratingConfig = {
    excellent: {
      label: "Magnifique!",
      sublabel: "Mükemmel",
      color: "text-emerald-700",
      bg: "bg-gradient-to-br from-emerald-50 to-emerald-100/50",
      border: "border-emerald-200",
      icon: "🌟",
    },
    good: {
      label: "Très bien!",
      sublabel: "Çok iyi",
      color: "text-blue-700",
      bg: "bg-gradient-to-br from-blue-50 to-blue-100/50",
      border: "border-blue-200",
      icon: "👏",
    },
    needs_improvement: {
      label: "Courage!",
      sublabel: "Geliştirilebilir",
      color: "text-amber-700",
      bg: "bg-gradient-to-br from-amber-50 to-amber-100/50",
      border: "border-amber-200",
      icon: "💪",
    },
  };

  const rating = ratingConfig[feedback.rating];

  return (
    <div className="p-4 space-y-4 overflow-y-auto h-full chat-scroll">
      <div
        className={`${rating.bg} rounded-xl p-4 text-center border ${rating.border}`}
      >
        <span className="text-3xl">{rating.icon}</span>
        <p className={`font-bold ${rating.color} mt-1 text-base`}>
          {rating.label}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">{rating.sublabel}</p>
      </div>

      {feedback.correctedVersion && (
        <div>
          <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Düzeltilmiş Hali
          </h4>
          <div className="text-sm bg-emerald-50/80 text-emerald-800 rounded-xl p-3.5 border border-emerald-200/60 leading-relaxed">
            {feedback.correctedVersion}
          </div>
        </div>
      )}

      {feedback.explanation && (
        <div>
          <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            Açıklama
          </h4>
          <div className="text-sm text-gray-700 bg-gray-50 rounded-xl p-3.5 border border-gray-100 leading-relaxed">
            {feedback.explanation}
          </div>
        </div>
      )}

      {feedback.tips.length > 0 && (
        <div>
          <h4 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
            İpuçları
          </h4>
          <ul className="space-y-2">
            {feedback.tips.map((tip, index) => (
              <li
                key={index}
                className="text-sm text-gray-700 bg-navy-900/[0.03] rounded-xl p-3.5 flex items-start gap-2.5 border border-navy-900/5 leading-relaxed"
              >
                <span className="text-gold-500 mt-0.5 shrink-0">💡</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
