export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  contentFr: string;
  contentEn: string;
  timestamp: Date;
  feedback?: Feedback;
  imageUrl?: string;
  imageQuestion?: string;
  hintSentences?: HintSentence[];
}

export interface HintSentence {
  fr: string;
  en: string;
}

export interface Feedback {
  correctedVersion: string;
  explanation: string;
  tips: string[];
  rating: "excellent" | "good" | "needs_improvement";
}

export interface ChatResponse {
  responseFr: string;
  responseEn: string;
  feedback?: Feedback;
  imageChallenge?: {
    imageUrl: string;
    questionFr: string;
    questionEn: string;
    hintSentences: HintSentence[];
  };
}
