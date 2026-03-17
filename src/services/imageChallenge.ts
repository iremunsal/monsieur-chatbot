import { HintSentence } from "@/types/chat";

interface ImageChallenge {
  imageUrl: string;
  questionFr: string;
  questionEn: string;
  answerKeywords: string[];
  hintSentences: HintSentence[];
}

/**
 * Topic pool for dynamic image challenge generation.
 * Each topic has French/English labels, keywords, and hint templates.
 * Images are fetched dynamically from loremflickr with cache-busting.
 */
interface Topic {
  keywords: string[];        // for loremflickr search
  questionFr: string;
  questionEn: string;
  answerKeywords: string[];
  hints: HintSentence[];
}

const topics: Topic[] = [
  {
    keywords: ["coffee", "cafe"],
    questionFr: "Qu'est-ce que vous voyez sur cette image ?",
    questionEn: "What do you see in this image?",
    answerKeywords: ["café", "tasse", "boisson"],
    hints: [
      { fr: "C'est une tasse de café.", en: "It's a cup of coffee." },
      { fr: "Je vois une boisson chaude.", en: "I see a hot drink." },
      { fr: "Il y a du café sur la table.", en: "There is coffee on the table." },
    ],
  },
  {
    keywords: ["dog", "puppy"],
    questionFr: "Quel animal voyez-vous ?",
    questionEn: "What animal do you see?",
    answerKeywords: ["chien", "animal", "mignon"],
    hints: [
      { fr: "C'est un chien adorable.", en: "It's an adorable dog." },
      { fr: "Je vois un petit chien.", en: "I see a small dog." },
      { fr: "L'animal a l'air content.", en: "The animal looks happy." },
    ],
  },
  {
    keywords: ["cat", "kitten"],
    questionFr: "Décrivez cet animal !",
    questionEn: "Describe this animal!",
    answerKeywords: ["chat", "mignon", "animal", "petit"],
    hints: [
      { fr: "C'est un chat.", en: "It's a cat." },
      { fr: "Je vois un petit chat mignon.", en: "I see a cute little cat." },
      { fr: "Le chat est très beau.", en: "The cat is very beautiful." },
    ],
  },
  {
    keywords: ["paris", "eiffel"],
    questionFr: "Quelle ville est-ce ?",
    questionEn: "Which city is this?",
    answerKeywords: ["paris", "france", "tour", "eiffel", "ville"],
    hints: [
      { fr: "C'est Paris, la capitale de la France.", en: "It's Paris, the capital of France." },
      { fr: "Je reconnais la Tour Eiffel.", en: "I recognize the Eiffel Tower." },
      { fr: "C'est une ville magnifique.", en: "It's a magnificent city." },
    ],
  },
  {
    keywords: ["beach", "ocean", "sea"],
    questionFr: "Décrivez ce paysage !",
    questionEn: "Describe this landscape!",
    answerKeywords: ["plage", "mer", "océan", "sable", "eau"],
    hints: [
      { fr: "C'est une belle plage.", en: "It's a beautiful beach." },
      { fr: "Je vois la mer et le sable.", en: "I see the sea and the sand." },
      { fr: "L'eau est très bleue.", en: "The water is very blue." },
    ],
  },
  {
    keywords: ["food", "dinner", "restaurant"],
    questionFr: "Décrivez ce plat !",
    questionEn: "Describe this dish!",
    answerKeywords: ["nourriture", "plat", "manger", "repas", "délicieux"],
    hints: [
      { fr: "C'est un plat délicieux.", en: "It's a delicious dish." },
      { fr: "Je vois de la nourriture appétissante.", en: "I see appetizing food." },
      { fr: "Ce repas a l'air très bon.", en: "This meal looks very good." },
    ],
  },
  {
    keywords: ["mountain", "hiking", "nature"],
    questionFr: "Que voyez-vous dans cette photo ?",
    questionEn: "What do you see in this photo?",
    answerKeywords: ["montagne", "nature", "paysage", "vert", "arbre"],
    hints: [
      { fr: "Je vois une grande montagne.", en: "I see a big mountain." },
      { fr: "C'est un paysage naturel magnifique.", en: "It's a magnificent natural landscape." },
      { fr: "La nature est très belle ici.", en: "Nature is very beautiful here." },
    ],
  },
  {
    keywords: ["city", "street", "urban"],
    questionFr: "Décrivez cette scène urbaine !",
    questionEn: "Describe this urban scene!",
    answerKeywords: ["ville", "rue", "bâtiment", "gens", "urbain"],
    hints: [
      { fr: "C'est une rue dans une grande ville.", en: "It's a street in a big city." },
      { fr: "Je vois des bâtiments et des gens.", en: "I see buildings and people." },
      { fr: "La ville est très animée.", en: "The city is very lively." },
    ],
  },
  {
    keywords: ["flower", "garden", "rose"],
    questionFr: "Que voyez-vous dans le jardin ?",
    questionEn: "What do you see in the garden?",
    answerKeywords: ["fleur", "jardin", "rose", "beau", "couleur"],
    hints: [
      { fr: "Ce sont de belles fleurs.", en: "These are beautiful flowers." },
      { fr: "Je vois un jardin coloré.", en: "I see a colorful garden." },
      { fr: "Les fleurs sont magnifiques.", en: "The flowers are magnificent." },
    ],
  },
  {
    keywords: ["bicycle", "cycling"],
    questionFr: "Qu'est-ce que c'est ?",
    questionEn: "What is this?",
    answerKeywords: ["vélo", "bicyclette", "cyclisme", "roue"],
    hints: [
      { fr: "C'est un vélo.", en: "It's a bicycle." },
      { fr: "Je vois une bicyclette.", en: "I see a bicycle." },
      { fr: "Faire du vélo est bon pour la santé.", en: "Cycling is good for health." },
    ],
  },
  {
    keywords: ["rain", "umbrella", "storm"],
    questionFr: "Quel temps fait-il ?",
    questionEn: "What is the weather like?",
    answerKeywords: ["pluie", "parapluie", "temps", "nuage", "mouillé"],
    hints: [
      { fr: "Il pleut dehors.", en: "It's raining outside." },
      { fr: "Je vois un parapluie sous la pluie.", en: "I see an umbrella in the rain." },
      { fr: "Le temps est mauvais aujourd'hui.", en: "The weather is bad today." },
    ],
  },
  {
    keywords: ["sunset", "sky", "sunrise"],
    questionFr: "Décrivez le ciel !",
    questionEn: "Describe the sky!",
    answerKeywords: ["soleil", "coucher", "ciel", "orange", "beau"],
    hints: [
      { fr: "Le soleil se couche.", en: "The sun is setting." },
      { fr: "Le ciel est orange et rouge.", en: "The sky is orange and red." },
      { fr: "C'est un magnifique coucher de soleil.", en: "It's a magnificent sunset." },
    ],
  },
  {
    keywords: ["book", "reading", "library"],
    questionFr: "Que voyez-vous ici ?",
    questionEn: "What do you see here?",
    answerKeywords: ["livre", "lire", "bibliothèque", "page"],
    hints: [
      { fr: "Ce sont des livres.", en: "These are books." },
      { fr: "Je vois une bibliothèque.", en: "I see a library." },
      { fr: "La lecture est un passe-temps merveilleux.", en: "Reading is a wonderful hobby." },
    ],
  },
  {
    keywords: ["market", "fruit", "vegetables"],
    questionFr: "Qu'est-ce qu'on vend ici ?",
    questionEn: "What is sold here?",
    answerKeywords: ["marché", "fruit", "légume", "vendre", "frais"],
    hints: [
      { fr: "C'est un marché de fruits et légumes.", en: "It's a fruit and vegetable market." },
      { fr: "Je vois des produits frais.", en: "I see fresh products." },
      { fr: "Les fruits ont l'air délicieux.", en: "The fruits look delicious." },
    ],
  },
  {
    keywords: ["snow", "winter", "ski"],
    questionFr: "Quelle saison est-ce ?",
    questionEn: "What season is this?",
    answerKeywords: ["hiver", "neige", "froid", "blanc", "ski"],
    hints: [
      { fr: "C'est l'hiver, il y a de la neige.", en: "It's winter, there is snow." },
      { fr: "Tout est blanc et froid.", en: "Everything is white and cold." },
      { fr: "Il fait très froid dehors.", en: "It's very cold outside." },
    ],
  },
  {
    keywords: ["music", "guitar", "concert"],
    questionFr: "Que fait cette personne ?",
    questionEn: "What is this person doing?",
    answerKeywords: ["musique", "guitare", "jouer", "instrument", "concert"],
    hints: [
      { fr: "Cette personne joue de la musique.", en: "This person is playing music." },
      { fr: "Je vois un instrument de musique.", en: "I see a musical instrument." },
      { fr: "La musique est un art magnifique.", en: "Music is a magnificent art." },
    ],
  },
  {
    keywords: ["train", "railway", "station"],
    questionFr: "Quel moyen de transport voyez-vous ?",
    questionEn: "What means of transport do you see?",
    answerKeywords: ["train", "gare", "transport", "voyage", "rail"],
    hints: [
      { fr: "C'est un train à la gare.", en: "It's a train at the station." },
      { fr: "Je vois un moyen de transport.", en: "I see a means of transport." },
      { fr: "Le train est prêt à partir.", en: "The train is ready to leave." },
    ],
  },
  {
    keywords: ["painting", "art", "museum"],
    questionFr: "Que voyez-vous dans ce musée ?",
    questionEn: "What do you see in this museum?",
    answerKeywords: ["art", "peinture", "musée", "tableau", "beau"],
    hints: [
      { fr: "Je vois une œuvre d'art.", en: "I see a work of art." },
      { fr: "C'est un beau tableau.", en: "It's a beautiful painting." },
      { fr: "Le musée est plein d'art magnifique.", en: "The museum is full of magnificent art." },
    ],
  },
];

// Track used indices so we don't repeat topics until all are exhausted
let usedIndices: Set<number> = new Set();

/**
 * Generates a dynamic image challenge by randomly selecting a topic
 * and constructing a fresh image URL with cache-busting.
 * Cycles through all topics before repeating any.
 */
export function getRandomChallenge(): ImageChallenge {
  // Reset pool when exhausted
  if (usedIndices.size >= topics.length) {
    usedIndices = new Set();
  }

  // Pick a random unused topic
  let index: number;
  do {
    index = Math.floor(Math.random() * topics.length);
  } while (usedIndices.has(index));
  usedIndices.add(index);

  const topic = topics[index];
  const keyword = topic.keywords[Math.floor(Math.random() * topic.keywords.length)];

  // Cache-busting with timestamp + random so every request gets a fresh image
  const cacheBuster = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const imageUrl = `https://loremflickr.com/400/300/${encodeURIComponent(keyword)}?lock=${cacheBuster}`;

  // Shuffle hints so order varies each time
  const shuffledHints = [...topic.hints].sort(() => Math.random() - 0.5);

  return {
    imageUrl,
    questionFr: topic.questionFr,
    questionEn: topic.questionEn,
    answerKeywords: topic.answerKeywords,
    hintSentences: shuffledHints,
  };
}

/**
 * Determines whether to send an image challenge based on message count.
 * Triggers a challenge roughly every 4-6 messages to keep practice varied.
 */
export function shouldSendChallenge(messageCount: number): boolean {
  if (messageCount < 3) return false;
  return messageCount % 5 === 0;
}
