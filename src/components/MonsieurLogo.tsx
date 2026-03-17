interface MonsieurLogoProps {
  size?: number;
  className?: string;
}

/**
 * SVG logo depicting a French gentleman character with beret and mustache.
 * Used as the chatbot's avatar throughout the application.
 */
export default function MonsieurLogo({
  size = 40,
  className = "",
}: MonsieurLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle */}
      <circle cx="50" cy="50" r="50" fill="#1E1B4B" />

      {/* Face */}
      <circle cx="50" cy="55" r="24" fill="#FBBF24" />

      {/* Beret */}
      <ellipse cx="50" cy="34" rx="26" ry="10" fill="#DC2626" />
      <ellipse cx="50" cy="36" rx="22" ry="7" fill="#B91C1C" />
      <circle cx="50" cy="28" r="4" fill="#DC2626" />

      {/* Eyes */}
      <ellipse cx="42" cy="52" rx="3" ry="3.5" fill="#1E1B4B" />
      <ellipse cx="58" cy="52" rx="3" ry="3.5" fill="#1E1B4B" />
      <circle cx="43" cy="51" r="1" fill="white" />
      <circle cx="59" cy="51" r="1" fill="white" />

      {/* Mustache */}
      <path
        d="M36 62 C38 58, 44 59, 50 62 C56 59, 62 58, 64 62 C62 64, 56 63, 50 66 C44 63, 38 64, 36 62Z"
        fill="#1E1B4B"
      />

      {/* Smile under mustache */}
      <path
        d="M43 67 Q50 72 57 67"
        stroke="#92400E"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
