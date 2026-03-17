"use client";

import { Feedback } from "@/types/chat";

interface FeedbackPanelProps {
  feedback: Feedback | null;
}

/**
 * Displays a feedback panel on the right side of the chat.
 * Shows grammar corrections, explanations, tips, and a performance rating
 * for the user's most recent French response.
 */
export default function FeedbackPanel({ feedback }: FeedbackPanelProps) {
  if (!feedback) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6">
        <div className="text-4xl mb-3">📝</div>
        <p className="text-sm text-center">
          Fransızca yazdığınızda burada geri bildirim görünecek.
        </p>
      </div>
    );
  }

  const ratingConfig = {
    excellent: { label: "Mükemmel!", color: "text-emerald-600", bg: "bg-emerald-50", icon: "🌟" },
    good: { label: "İyi!", color: "text-blue-600", bg: "bg-blue-50", icon: "👍" },
    needs_improvement: { label: "Geliştirilebilir", color: "text-amber-600", bg: "bg-amber-50", icon: "💪" },
  };

  const rating = ratingConfig[feedback.rating];

  return (
    <div className="p-4 space-y-4 overflow-y-auto h-full">
      <div className={`${rating.bg} rounded-xl p-3 text-center`}>
        <span className="text-2xl">{rating.icon}</span>
        <p className={`font-semibold ${rating.color} mt-1`}>{rating.label}</p>
      </div>

      {feedback.correctedVersion && (
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Düzeltilmiş Hali
          </h4>
          <p className="text-sm bg-green-50 text-green-800 rounded-lg p-3 border border-green-200">
            {feedback.correctedVersion}
          </p>
        </div>
      )}

      {feedback.explanation && (
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Açıklama
          </h4>
          <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
            {feedback.explanation}
          </p>
        </div>
      )}

      {feedback.tips.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            İpuçları
          </h4>
          <ul className="space-y-2">
            {feedback.tips.map((tip, index) => (
              <li
                key={index}
                className="text-sm text-gray-700 bg-indigo-50 rounded-lg p-3 flex items-start gap-2"
              >
                <span className="text-indigo-500 mt-0.5">💡</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
