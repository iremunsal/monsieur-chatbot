import { ChatMessage, ChatResponse, Feedback } from "@/types/chat";
import { getRandomChallenge, shouldSendChallenge } from "./imageChallenge";
import { checkSpelling } from "./spellChecker";

/**
 * Dynamic conversation bank. Each pattern group has multiple response
 * variants so the chatbot never gives the exact same answer twice.
 */
const conversationBank: {
  patterns: RegExp[];
  responses: { fr: string; en: string }[];
}[] = [
  {
    patterns: [/bonjour/i, /salut/i, /coucou/i, /hello/i, /hi/i],
    responses: [
      {
        fr: "Bonjour ! Comment allez-vous aujourd'hui ? Parlez-moi en français !",
        en: "Hello! How are you today? Talk to me in French!",
      },
      {
        fr: "Salut ! Ravi de vous voir. Qu'avez-vous fait de beau aujourd'hui ?",
        en: "Hi! Nice to see you. What have you been up to today?",
      },
      {
        fr: "Bonjour ! Bienvenue ! Êtes-vous prêt à pratiquer votre français ?",
        en: "Hello! Welcome! Are you ready to practice your French?",
      },
      {
        fr: "Coucou ! Quelle belle journée pour apprendre le français, n'est-ce pas ?",
        en: "Hey! What a beautiful day to learn French, isn't it?",
      },
    ],
  },
  {
    patterns: [/comment.*va/i, /ça va/i, /comment.*allez/i],
    responses: [
      {
        fr: "Je vais très bien, merci ! Et vous ? Qu'avez-vous fait aujourd'hui ?",
        en: "I'm doing very well, thank you! And you? What did you do today?",
      },
      {
        fr: "Ça va super bien ! Merci de demander. Racontez-moi votre journée en français !",
        en: "I'm doing great! Thanks for asking. Tell me about your day in French!",
      },
      {
        fr: "Très bien, merci ! Et vous, comment vous sentez-vous ? Dites-le moi en français !",
        en: "Very well, thank you! And you, how are you feeling? Tell me in French!",
      },
    ],
  },
  {
    patterns: [/merci/i, /remerci/i],
    responses: [
      {
        fr: "De rien ! C'est un plaisir de vous aider. Continuons à pratiquer !",
        en: "You're welcome! It's a pleasure to help you. Let's keep practicing!",
      },
      {
        fr: "Il n'y a pas de quoi ! Votre français s'améliore chaque jour. On continue ?",
        en: "Don't mention it! Your French is improving every day. Shall we continue?",
      },
      {
        fr: "Avec plaisir ! N'hésitez pas à me poser d'autres questions en français.",
        en: "My pleasure! Don't hesitate to ask me more questions in French.",
      },
    ],
  },
  {
    patterns: [/je m'appelle/i, /mon nom/i],
    responses: [
      {
        fr: "Enchanté ! C'est un joli prénom. Depuis combien de temps apprenez-vous le français ?",
        en: "Nice to meet you! That's a lovely name. How long have you been learning French?",
      },
      {
        fr: "Ravi de faire votre connaissance ! D'où venez-vous ? Dites-le en français !",
        en: "Pleased to meet you! Where are you from? Say it in French!",
      },
      {
        fr: "Enchanté ! Et que faites-vous dans la vie ? Essayez de me répondre en français.",
        en: "Nice to meet you! And what do you do for a living? Try to answer me in French.",
      },
    ],
  },
  {
    patterns: [/j'aime/i, /j'adore/i, /je préfère/i],
    responses: [
      {
        fr: "C'est intéressant ! Pourquoi aimez-vous ça ? Pouvez-vous m'en dire plus ?",
        en: "That's interesting! Why do you like that? Can you tell me more?",
      },
      {
        fr: "Ah bon ? Moi aussi j'adore ça ! Depuis quand aimez-vous ça ?",
        en: "Oh really? I love that too! Since when have you liked that?",
      },
      {
        fr: "Quel bon goût ! Pouvez-vous décrire ce que vous aimez avec plus de détails ?",
        en: "What good taste! Can you describe what you like in more detail?",
      },
    ],
  },
  {
    patterns: [/je ne comprends pas/i, /pas compris/i, /comprends pas/i],
    responses: [
      {
        fr: "Pas de souci ! Je vais vous expliquer autrement. N'hésitez pas à me poser des questions.",
        en: "No worries! I'll explain it differently. Don't hesitate to ask me questions.",
      },
      {
        fr: "Ce n'est pas grave ! Apprendre une langue demande de la patience. Quel mot ou quelle phrase pose problème ?",
        en: "It's okay! Learning a language requires patience. Which word or phrase is the problem?",
      },
      {
        fr: "Ne vous inquiétez pas ! Essayons une approche différente. Qu'est-ce qui vous semble difficile ?",
        en: "Don't worry! Let's try a different approach. What seems difficult to you?",
      },
    ],
  },
  {
    patterns: [/au revoir/i, /à bientôt/i, /bye/i, /bonne nuit/i],
    responses: [
      {
        fr: "Au revoir ! C'était un plaisir de parler avec vous. À la prochaine fois !",
        en: "Goodbye! It was a pleasure talking with you. Until next time!",
      },
      {
        fr: "À bientôt ! Vous avez fait du bon travail aujourd'hui. Continuez à pratiquer !",
        en: "See you soon! You did great work today. Keep practicing!",
      },
      {
        fr: "Bonne continuation ! N'oubliez pas de pratiquer un peu chaque jour. À bientôt !",
        en: "Good luck! Don't forget to practice a little every day. See you soon!",
      },
    ],
  },
  {
    patterns: [/manger/i, /nourriture/i, /cuisine/i, /repas/i, /faim/i, /restaurant/i],
    responses: [
      {
        fr: "Ah, la cuisine française est magnifique ! Quel est votre plat français préféré ?",
        en: "Ah, French cuisine is magnificent! What is your favorite French dish?",
      },
      {
        fr: "Mmm, la gastronomie ! Avez-vous déjà goûté des croissants frais ? C'est divin !",
        en: "Mmm, gastronomy! Have you ever tasted fresh croissants? It's divine!",
      },
      {
        fr: "Parlons de nourriture ! Savez-vous que la France a plus de 400 fromages différents ?",
        en: "Let's talk about food! Did you know that France has more than 400 different cheeses?",
      },
      {
        fr: "La cuisine est un art en France ! Quel repas prenez-vous en ce moment ? Le petit-déjeuner, le déjeuner ou le dîner ?",
        en: "Cooking is an art in France! What meal are you having right now? Breakfast, lunch, or dinner?",
      },
    ],
  },
  {
    patterns: [/voyage/i, /voyager/i, /vacances/i, /paris/i, /france/i, /visiter/i],
    responses: [
      {
        fr: "La France est un beau pays ! Avez-vous déjà visité la France ? Quelle ville aimeriez-vous voir ?",
        en: "France is a beautiful country! Have you already visited France? Which city would you like to see?",
      },
      {
        fr: "Ah, les voyages ! Connaissez-vous la Côte d'Azur ? C'est un endroit magnifique !",
        en: "Ah, travel! Do you know the French Riviera? It's a magnificent place!",
      },
      {
        fr: "Le voyage est la meilleure façon d'apprendre une langue ! Quel pays francophone aimeriez-vous visiter ?",
        en: "Travel is the best way to learn a language! Which French-speaking country would you like to visit?",
      },
    ],
  },
  {
    patterns: [/musique/i, /chanson/i, /chanter/i, /écouter/i],
    responses: [
      {
        fr: "La musique française est très riche ! Connaissez-vous Édith Piaf ou Stromae ?",
        en: "French music is very rich! Do you know Édith Piaf or Stromae?",
      },
      {
        fr: "Écouter des chansons françaises est excellent pour apprendre ! Avez-vous une chanson préférée ?",
        en: "Listening to French songs is excellent for learning! Do you have a favorite song?",
      },
      {
        fr: "La musique aide beaucoup à apprendre le français ! Quel genre de musique préférez-vous ?",
        en: "Music helps a lot with learning French! What kind of music do you prefer?",
      },
    ],
  },
  {
    patterns: [/film/i, /cinéma/i, /série/i, /regarder/i, /télé/i],
    responses: [
      {
        fr: "Le cinéma français est extraordinaire ! Avez-vous vu des films français ? Je recommande \"Amélie\" !",
        en: "French cinema is extraordinary! Have you seen any French films? I recommend \"Amélie\"!",
      },
      {
        fr: "Regarder des films en français est un excellent exercice ! Essayez avec des sous-titres français.",
        en: "Watching movies in French is an excellent exercise! Try with French subtitles.",
      },
      {
        fr: "Ah, le cinéma ! Quel est le dernier film que vous avez regardé ? Décrivez-le en français !",
        en: "Ah, cinema! What is the last movie you watched? Describe it in French!",
      },
    ],
  },
  {
    patterns: [/travail/i, /travailler/i, /bureau/i, /métier/i, /profession/i],
    responses: [
      {
        fr: "Le travail est un sujet important ! Que faites-vous comme métier ? Décrivez votre travail en français.",
        en: "Work is an important topic! What do you do for a living? Describe your work in French.",
      },
      {
        fr: "Parler de son travail en français est très utile ! Aimez-vous votre travail ?",
        en: "Talking about your work in French is very useful! Do you like your job?",
      },
      {
        fr: "Intéressant ! Dans quel domaine travaillez-vous ? Essayez de me l'expliquer en français.",
        en: "Interesting! In what field do you work? Try to explain it to me in French.",
      },
    ],
  },
  {
    patterns: [/famille/i, /frère/i, /sœur/i, /parent/i, /enfant/i, /mère/i, /père/i],
    responses: [
      {
        fr: "La famille, c'est important ! Combien de personnes y a-t-il dans votre famille ?",
        en: "Family is important! How many people are there in your family?",
      },
      {
        fr: "Parlez-moi de votre famille ! Avez-vous des frères et sœurs ?",
        en: "Tell me about your family! Do you have any brothers and sisters?",
      },
      {
        fr: "La famille est un beau sujet ! Décrivez un membre de votre famille en français.",
        en: "Family is a beautiful topic! Describe a family member in French.",
      },
    ],
  },
  {
    patterns: [/sport/i, /football/i, /jouer/i, /courir/i, /nager/i, /exercice/i],
    responses: [
      {
        fr: "Le sport, c'est la santé ! Quel sport pratiquez-vous ? Décrivez-le en français !",
        en: "Sport is health! What sport do you practice? Describe it in French!",
      },
      {
        fr: "Ah, le sport ! Savez-vous que le Tour de France est l'événement sportif le plus célèbre de France ?",
        en: "Ah, sport! Did you know that the Tour de France is the most famous sporting event in France?",
      },
      {
        fr: "Très bien ! Combien de fois par semaine faites-vous du sport ? Répondez en français !",
        en: "Very good! How many times a week do you exercise? Answer in French!",
      },
    ],
  },
  {
    patterns: [/temps/i, /météo/i, /pluie/i, /soleil/i, /chaud/i, /froid/i, /neige/i],
    responses: [
      {
        fr: "Ah, le temps ! En France, on parle souvent de la météo. Quel temps fait-il chez vous ?",
        en: "Ah, the weather! In France, we often talk about the weather. What's the weather like where you are?",
      },
      {
        fr: "La météo est un sujet de conversation classique ! Décrivez le temps qu'il fait en ce moment.",
        en: "Weather is a classic conversation topic! Describe the weather right now.",
      },
      {
        fr: "Bonne question ! Savez-vous dire les saisons en français ? Le printemps, l'été, l'automne, l'hiver.",
        en: "Good question! Do you know how to say the seasons in French? Spring, summer, autumn, winter.",
      },
    ],
  },
];

/**
 * Large pool of fallback responses with varied topics and follow-up questions.
 * Randomly selected when no pattern matches, ensuring fresh conversations.
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
  {
    fr: "Bravo ! Essayez maintenant de me poser une question en français.",
    en: "Bravo! Now try to ask me a question in French.",
  },
  {
    fr: "C'est bien ! Savez-vous qu'en France, le déjeuner est un repas très important ?",
    en: "That's good! Did you know that in France, lunch is a very important meal?",
  },
  {
    fr: "Vous vous débrouillez bien ! Parlons de vos passe-temps. Que faites-vous pendant votre temps libre ?",
    en: "You're doing well! Let's talk about your hobbies. What do you do in your free time?",
  },
  {
    fr: "Intéressant ! Connaissez-vous des expressions françaises ? Par exemple, \"C'est la vie\" !",
    en: "Interesting! Do you know any French expressions? For example, \"C'est la vie\"!",
  },
  {
    fr: "Bien joué ! Essayez de construire une phrase plus longue maintenant.",
    en: "Well done! Try to build a longer sentence now.",
  },
  {
    fr: "J'aime votre enthousiasme ! Décrivez-moi votre ville en français.",
    en: "I love your enthusiasm! Describe your city to me in French.",
  },
  {
    fr: "Continuez ainsi ! Savez-vous compter en français ? Un, deux, trois, quatre, cinq...",
    en: "Keep it up! Can you count in French? One, two, three, four, five...",
  },
  {
    fr: "Formidable ! Essayez d'utiliser un adjectif dans votre prochaine phrase.",
    en: "Wonderful! Try to use an adjective in your next sentence.",
  },
  {
    fr: "Vous apprenez vite ! Quel est votre mot français préféré ?",
    en: "You learn fast! What is your favorite French word?",
  },
  {
    fr: "C'est du bon travail ! Décrivez-moi ce que vous voyez autour de vous, en français.",
    en: "That's good work! Describe what you see around you, in French.",
  },
];

// Track recently used fallback indices to avoid repeats
let recentFallbacks: number[] = [];

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
      "Possessif sıfatlar: mon/ma/mes, ton/ta/tes, son/sa/ses",
      "Soru sormayı deneyin: Est-ce que... veya Qu'est-ce que...",
      "Bağlaçları kullanın: mais (ama), et (ve), ou (veya), parce que (çünkü)",
      "Zamirler: je, tu, il/elle, nous, vous, ils/elles",
      "Günlük ifadeler: s'il vous plaît, excusez-moi, pardon",
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
 * Finds a matching response from the conversation bank.
 * Picks a random variant from the matched pattern group each time.
 */
function findPatternMatch(message: string): { responseFr: string; responseEn: string } | null {
  const entry = conversationBank.find((item) =>
    item.patterns.some((pattern) => pattern.test(message))
  );
  if (!entry) return null;

  const variant = entry.responses[Math.floor(Math.random() * entry.responses.length)];
  return { responseFr: variant.fr, responseEn: variant.en };
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
        hintSentences: challenge.hintSentences,
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
 * Returns a random fallback response, avoiding recently used ones
 * so the conversation feels fresh and varied.
 */
function getFallbackResponse(): { responseFr: string; responseEn: string } {
  const maxRecent = Math.min(Math.floor(fallbackResponses.length * 0.6), 10);

  let idx: number;
  do {
    idx = Math.floor(Math.random() * fallbackResponses.length);
  } while (recentFallbacks.includes(idx) && recentFallbacks.length < fallbackResponses.length);

  recentFallbacks.push(idx);
  if (recentFallbacks.length > maxRecent) {
    recentFallbacks = recentFallbacks.slice(-maxRecent);
  }

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
