import { HintSentence } from "@/types/chat";

interface ImageChallenge {
  imageUrl: string;
  questionFr: string;
  questionEn: string;
  answerKeywords: string[];
  hintSentences: HintSentence[];
}

/**
 * Collection of image-based vocabulary challenges.
 * Each challenge includes an image, a question, expected keywords,
 * and sample hint sentences the user can reveal for guidance.
 */
const challenges: ImageChallenge[] = [
  {
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    questionFr: "Qu'est-ce que c'est ? 🤔",
    questionEn: "What is this?",
    answerKeywords: ["café", "tasse", "coffee", "cup"],
    hintSentences: [
      { fr: "C'est une tasse de café.", en: "It's a cup of coffee." },
      { fr: "Je vois du café noir dans une tasse blanche.", en: "I see black coffee in a white cup." },
      { fr: "C'est une boisson chaude, probablement du café.", en: "It's a hot drink, probably coffee." },
    ],
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&h=300&fit=crop",
    questionFr: "Quel animal voyez-vous ? 🐾",
    questionEn: "What animal do you see?",
    answerKeywords: ["chien", "dog"],
    hintSentences: [
      { fr: "C'est un chien.", en: "It's a dog." },
      { fr: "Je vois un petit chien mignon.", en: "I see a cute little dog." },
      { fr: "C'est un chien qui regarde la caméra.", en: "It's a dog looking at the camera." },
    ],
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1568702846914-96b305d2uj29?w=400&h=300&fit=crop",
    questionFr: "Qu'est-ce que vous voyez sur la photo ? 📸",
    questionEn: "What do you see in the photo?",
    answerKeywords: ["livre", "livres", "book", "bibliothèque"],
    hintSentences: [
      { fr: "Ce sont des livres sur une étagère.", en: "These are books on a shelf." },
      { fr: "Je vois une bibliothèque pleine de livres.", en: "I see a library full of books." },
      { fr: "Il y a beaucoup de livres de différentes couleurs.", en: "There are many books of different colors." },
    ],
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    questionFr: "Décrivez ce plat ! 🍽️",
    questionEn: "Describe this dish!",
    answerKeywords: ["salade", "légumes", "nourriture", "plat"],
    hintSentences: [
      { fr: "C'est une salade avec des légumes frais.", en: "It's a salad with fresh vegetables." },
      { fr: "Je vois un plat coloré avec des légumes.", en: "I see a colorful dish with vegetables." },
      { fr: "C'est un repas sain et délicieux.", en: "It's a healthy and delicious meal." },
    ],
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop",
    questionFr: "Quelle ville est-ce ? 🏙️",
    questionEn: "Which city is this?",
    answerKeywords: ["paris", "tour eiffel", "france"],
    hintSentences: [
      { fr: "C'est Paris, la capitale de la France.", en: "It's Paris, the capital of France." },
      { fr: "Je vois la Tour Eiffel au loin.", en: "I see the Eiffel Tower in the distance." },
      { fr: "C'est une belle vue de Paris avec ses bâtiments.", en: "It's a beautiful view of Paris with its buildings." },
    ],
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&h=300&fit=crop",
    questionFr: "Que fait cette personne ? 🧍",
    questionEn: "What is this person doing?",
    answerKeywords: ["homme", "debout", "montagne", "regarde"],
    hintSentences: [
      { fr: "Un homme est debout sur une montagne.", en: "A man is standing on a mountain." },
      { fr: "Il regarde le paysage devant lui.", en: "He is looking at the landscape in front of him." },
      { fr: "Cette personne admire la vue magnifique.", en: "This person is admiring the magnificent view." },
    ],
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    questionFr: "Décrivez cette scène ! 👥",
    questionEn: "Describe this scene!",
    answerKeywords: ["gens", "personnes", "travail", "groupe", "bureau"],
    hintSentences: [
      { fr: "Un groupe de personnes travaille ensemble.", en: "A group of people are working together." },
      { fr: "Ils sont dans un bureau et discutent.", en: "They are in an office and are discussing." },
      { fr: "Ce sont des collègues qui collaborent sur un projet.", en: "They are colleagues collaborating on a project." },
    ],
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop",
    questionFr: "Quel temps fait-il ? ☀️",
    questionEn: "What is the weather like?",
    answerKeywords: ["soleil", "coucher", "ciel", "nuage", "plage"],
    hintSentences: [
      { fr: "Le soleil se couche sur la plage.", en: "The sun is setting on the beach." },
      { fr: "Le ciel est orange et rouge, c'est magnifique.", en: "The sky is orange and red, it's magnificent." },
      { fr: "Il fait beau, on voit un coucher de soleil.", en: "The weather is nice, we see a sunset." },
    ],
  },
];

/**
 * Returns a random image challenge from the collection.
 * Used to periodically test the user's French vocabulary with visual cues.
 */
export function getRandomChallenge(): ImageChallenge {
  const index = Math.floor(Math.random() * challenges.length);
  return challenges[index];
}

/**
 * Determines whether to send an image challenge based on message count.
 * Triggers a challenge roughly every 4-6 messages to keep practice varied.
 */
export function shouldSendChallenge(messageCount: number): boolean {
  if (messageCount < 3) return false;
  return messageCount % 5 === 0;
}
