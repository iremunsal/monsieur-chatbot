import { ChatMessage, ChatResponse, Feedback } from "@/types/chat";
import { getRandomChallenge, shouldSendChallenge } from "./imageChallenge";
import { checkSpelling } from "./spellChecker";

/**
 * Pre-defined conversation starters and responses for the French chatbot.
 * Each entry maps a pattern to a French response, English translation, and optional feedback.
 */
const conversationBank: {
  patterns: RegExp[];
  responseFr: string;
  responseEn: string;
}[] = [
  {
    patterns: [/bonjour/i, /salut/i, /coucou/i, /hello/i, /hi/i],
    responseFr:
      "Bonjour ! Comment allez-vous aujourd'hui ? Je suis Monsieur Chatbot, votre professeur de français. Parlez-moi en français !",
    responseEn:
      "Hello! How are you today? I am Monsieur Chatbot, your French teacher. Talk to me in French!",
  },
  {
    patterns: [/comment.*va/i, /ça va/i, /comment.*allez/i],
    responseFr:
      "Je vais très bien, merci ! Et vous ? Qu'avez-vous fait aujourd'hui ?",
    responseEn:
      "I'm doing very well, thank you! And you? What did you do today?",
  },
  {
    patterns: [/merci/i, /remerci/i],
    responseFr:
      "De rien ! C'est un plaisir de vous aider. Continuons à pratiquer !",
    responseEn:
      "You're welcome! It's a pleasure to help you. Let's keep practicing!",
  },
  {
    patterns: [/je m'appelle/i, /mon nom/i],
    responseFr:
      "Enchanté ! C'est un joli prénom. Depuis combien de temps apprenez-vous le français ?",
    responseEn:
      "Nice to meet you! That's a lovely name. How long have you been learning French?",
  },
  {
    patterns: [/j'aime/i, /j'adore/i],
    responseFr:
      "C'est intéressant ! Pourquoi aimez-vous ça ? Pouvez-vous m'en dire plus ?",
    responseEn:
      "That's interesting! Why do you like that? Can you tell me more?",
  },
  {
    patterns: [/je ne comprends pas/i, /pas compris/i, /comprends pas/i],
    responseFr:
      "Pas de souci ! Je vais vous expliquer autrement. N'hésitez pas à me poser des questions.",
    responseEn:
      "No worries! I'll explain it differently. Don't hesitate to ask me questions.",
  },
  {
    patterns: [/au revoir/i, /à bientôt/i, /bye/i],
    responseFr:
      "Au revoir ! C'était un plaisir de parler avec vous. À la prochaine fois !",
    responseEn:
      "Goodbye! It was a pleasure talking with you. Until next time!",
  },
  {
    patterns: [/manger/i, /nourriture/i, /cuisine/i, /repas/i, /faim/i],
    responseFr:
      "Ah, la cuisine française est magnifique ! Quel est votre plat français préféré ?",
    responseEn:
      "Ah, French cuisine is magnificent! What is your favorite French dish?",
  },
  {
    patterns: [/voyage/i, /voyager/i, /vacances/i, /paris/i, /france/i],
    responseFr:
      "La France est un beau pays ! Avez-vous déjà visité la France ? Quelle ville aimeriez-vous voir ?",
    responseEn:
      "France is a beautiful country! Have you already visited France? Which city would you like to see?",
  },
  {
    patterns: [/musique/i, /chanson/i, /chanter/i],
    responseFr:
      "La musique française est très riche ! Connaissez-vous Édith Piaf ou Stromae ? Quel genre de musique aimez-vous ?",
    responseEn:
      "French music is very rich! Do you know Édith Piaf or Stromae? What kind of music do you like?",
  },
];

/**
 * Fallback responses when no pattern matches the user's input.
 * Provides varied conversational prompts to keep the dialogue going.
 */
const fallbackResponses = [
  {
    fr: "C'est très intéressant ! Pouvez-vous m'en dire plus en français ?",
    en: "That's very interesting! Can you tell me more in French?",
  },
  {
    fr: "Très bien ! Votre français s'améliore. Essayez de me décrire votre journée.",
    en: "Very good! Your French is improving. Try to describe your day to me.",
  },
  {
    fr: "Excellent effort ! Continuez comme ça. Qu'aimeriez-vous apprendre aujourd'hui ?",
    en: "Excellent effort! Keep it up. What would you like to learn today?",
  },
  {
    fr: "Bonne réponse ! Maintenant, essayez d'utiliser cette phrase dans un contexte différent.",
    en: "Good answer! Now try to use this sentence in a different context.",
  },
  {
    fr: "Je vois que vous progressez ! Parlons d'un nouveau sujet. Aimez-vous le cinéma français ?",
    en: "I see you're making progress! Let's talk about a new topic. Do you like French cinema?",
  },
];

/**
 * Analyzes the user's French input and generates corrective feedback.
 * Checks for common grammar mistakes, missing accents, and sentence structure.
 */
function generateFeedback(userMessage: string): Feedback {
  const issues: string[] = [];
  const tips: string[] = [];
  let corrected = userMessage;

  // Check for missing accents in common words
  const accentMap: Record<string, string> = {
    "tres": "très",
    "etre": "être",
    "meme": "même",
    "a bientot": "à bientôt",
    "cafe": "café",
    "ecole": "école",
    "eleve": "élève",
    "interessant": "intéressant",
    "francais": "français",
    "ca": "ça",
  };

  const lowerMessage = userMessage.toLowerCase();
  for (const [wrong, correct] of Object.entries(accentMap)) {
    if (lowerMessage.includes(wrong) && !lowerMessage.includes(correct)) {
      corrected = corrected.replace(new RegExp(wrong, "gi"), correct);
      issues.push(`"${wrong}" → "${correct}" (accent eksik)`);
    }
  }

  // Check for misspelled words using Levenshtein distance
  const spellErrors = checkSpelling(userMessage);
  for (const error of spellErrors) {
    // Skip if already caught by accent check
    const alreadyCaught = issues.some((issue) => issue.includes(error.original));
    if (alreadyCaught) continue;

    corrected = corrected.replace(
      new RegExp(`\\b${error.original}\\b`, "gi"),
      error.suggestion
    );
    issues.push(`"${error.original}" → "${error.suggestion}" (yazım hatası)`);
  }

  if (spellErrors.length > 0) {
    tips.push(
      "Yazım hatalarını önlemek için sık kullandığınız kelimeleri not edin ve tekrar edin."
    );
  }

  // Check if sentence starts with uppercase
  if (userMessage.length > 0 && userMessage[0] !== userMessage[0].toUpperCase()) {
    issues.push("Cümle büyük harfle başlamalı");
    corrected = corrected.charAt(0).toUpperCase() + corrected.slice(1);
  }

  // Check for sentence-ending punctuation
  if (!/[.!?]$/.test(userMessage.trim())) {
    issues.push("Cümle sonuna noktalama işareti eklemeyi unutmayın");
    corrected = corrected.trim() + ".";
  }

  // Check common mistakes
  if (/je suis\s+\d+\s+ans/i.test(lowerMessage)) {
    issues.push('"Je suis X ans" değil, "J\'ai X ans" olmalı (yaş için avoir kullanılır)');
    tips.push("Fransızcada yaş söylerken \"avoir\" (sahip olmak) fiili kullanılır, \"être\" (olmak) değil.");
  }

  if (/je suis (froid|chaud|faim|soif)/i.test(lowerMessage)) {
    const match = lowerMessage.match(/je suis (froid|chaud|faim|soif)/i);
    if (match) {
      tips.push(`"Je suis ${match[1]}" yerine "J'ai ${match[1]}" kullanın. Fiziksel durumlar için Fransızcada "avoir" fiili kullanılır.`);
    }
  }

  // Generate explanation
  let explanation = "";
  if (issues.length === 0) {
    explanation = "Harika! Cümleniz dilbilgisi açısından doğru görünüyor. Böyle devam edin!";
  } else {
    explanation = `${issues.length} düzeltme bulundu: ${issues.join("; ")}`;
  }

  // Add general tips
  if (tips.length === 0) {
    const generalTips = [
      "Artikelleri unutmayın: le (eril), la (dişil), les (çoğul)",
      "Fiil çekimlerine dikkat edin: je parle, tu parles, il/elle parle",
      "Sıfatlar genellikle isimden sonra gelir: une maison grande",
      "Olumsuz cümleler: ne...pas yapısını kullanın: Je ne parle pas",
      "Zamanlara dikkat edin: passé composé vs imparfait",
    ];
    tips.push(generalTips[Math.floor(Math.random() * generalTips.length)]);
  }

  // Determine rating
  let rating: Feedback["rating"] = "excellent";
  if (issues.length >= 3) rating = "needs_improvement";
  else if (issues.length >= 1) rating = "good";

  return { correctedVersion: corrected, explanation, tips, rating };
}

/**
 * Finds a matching response from the conversation bank based on user input patterns.
 * Returns null if no pattern matches.
 */
function findPatternMatch(message: string): { responseFr: string; responseEn: string } | null {
  const entry = conversationBank.find((item) =>
    item.patterns.some((pattern) => pattern.test(message))
  );
  return entry ? { responseFr: entry.responseFr, responseEn: entry.responseEn } : null;
}

/**
 * Main chat service function that processes user messages and generates responses.
 * Handles pattern matching, feedback generation, and image challenge insertion.
 */
export function processMessage(
  userMessage: string,
  messageCount: number
): ChatResponse {
  const feedback = generateFeedback(userMessage);

  // Check for image challenge timing
  if (shouldSendChallenge(messageCount)) {
    const challenge = getRandomChallenge();
    const match = findPatternMatch(userMessage);
    const response = match || getFallbackResponse();

    return {
      responseFr: response.responseFr,
      responseEn: response.responseEn,
      feedback,
      imageChallenge: {
        imageUrl: challenge.imageUrl,
        questionFr: challenge.questionFr,
        questionEn: challenge.questionEn,
      },
    };
  }

  const match = findPatternMatch(userMessage);
  if (match) {
    return { responseFr: match.responseFr, responseEn: match.responseEn, feedback };
  }

  const fallback = getFallbackResponse();
  return { responseFr: fallback.responseFr, responseEn: fallback.responseEn, feedback };
}

/**
 * Returns a random fallback response for when no conversation pattern matches.
 */
function getFallbackResponse(): { responseFr: string; responseEn: string } {
  const idx = Math.floor(Math.random() * fallbackResponses.length);
  return { responseFr: fallbackResponses[idx].fr, responseEn: fallbackResponses[idx].en };
}

/**
 * Generates the initial welcome message from the chatbot.
 */
export function getWelcomeMessage(): ChatMessage {
  return {
    id: "welcome",
    role: "assistant",
    contentFr:
      "Bonjour ! Je suis Monsieur Chatbot 🎩 Votre professeur de français personnel. Parlez-moi en français et je vous aiderai à améliorer votre niveau. N'ayez pas peur de faire des erreurs !",
    contentEn:
      "Hello! I am Monsieur Chatbot 🎩 Your personal French teacher. Talk to me in French and I will help you improve your level. Don't be afraid of making mistakes!",
    timestamp: new Date(),
  };
}
