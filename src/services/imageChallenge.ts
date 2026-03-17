interface ImageChallenge {
  imageUrl: string;
  questionFr: string;
  questionEn: string;
  answerKeywords: string[];
}

/**
 * Collection of image-based vocabulary challenges.
 * Each challenge shows an image and asks the user to identify
 * the object in French, with expected answer keywords for validation.
 */
const challenges: ImageChallenge[] = [
  {
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    questionFr: "Qu'est-ce que c'est ? 🤔",
    questionEn: "What is this?",
    answerKeywords: ["café", "tasse", "coffee", "cup"],
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=400&h=300&fit=crop",
    questionFr: "Quel animal voyez-vous ? 🐾",
    questionEn: "What animal do you see?",
    answerKeywords: ["chien", "dog"],
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1568702846914-96b305d2uj29?w=400&h=300&fit=crop",
    questionFr: "Qu'est-ce que vous voyez sur la photo ? 📸",
    questionEn: "What do you see in the photo?",
    answerKeywords: ["livre", "livres", "book", "bibliothèque"],
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop",
    questionFr: "Décrivez ce plat ! 🍽️",
    questionEn: "Describe this dish!",
    answerKeywords: ["salade", "légumes", "nourriture", "plat"],
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop",
    questionFr: "Quelle ville est-ce ? 🏙️",
    questionEn: "Which city is this?",
    answerKeywords: ["paris", "tour eiffel", "france"],
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=400&h=300&fit=crop",
    questionFr: "Que fait cette personne ? 🧍",
    questionEn: "What is this person doing?",
    answerKeywords: ["homme", "debout", "montagne", "regarde"],
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    questionFr: "Décrivez cette scène ! 👥",
    questionEn: "Describe this scene!",
    answerKeywords: ["gens", "personnes", "travail", "groupe", "bureau"],
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop",
    questionFr: "Quel temps fait-il ? ☀️",
    questionEn: "What is the weather like?",
    answerKeywords: ["soleil", "coucher", "ciel", "nuage", "plage"],
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
