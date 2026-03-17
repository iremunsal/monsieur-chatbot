/**
 * French spell checker service.
 * Contains a common French vocabulary dictionary and uses Levenshtein distance
 * to detect and suggest corrections for misspelled words.
 */

/**
 * Common French words dictionary organized by category for maintainability.
 * Covers everyday vocabulary including greetings, pronouns, verbs, nouns,
 * adjectives, adverbs, prepositions, and common expressions.
 */
const frenchDictionary = new Set([
  // Pronouns
  "je", "tu", "il", "elle", "on", "nous", "vous", "ils", "elles",
  "me", "te", "se", "le", "la", "les", "lui", "leur", "en", "y",
  "ce", "cet", "cette", "ces", "mon", "ma", "mes", "ton", "ta", "tes",
  "son", "sa", "ses", "notre", "votre", "nos", "vos", "leurs",
  "qui", "que", "quoi", "dont", "où", "quel", "quelle", "quels", "quelles",
  "celui", "celle", "ceux", "celles", "moi", "toi", "soi", "eux",

  // Articles & determiners
  "un", "une", "des", "du", "de", "au", "aux",

  // Common verbs (infinitives and key conjugations)
  "être", "avoir", "faire", "aller", "venir", "voir", "savoir", "pouvoir",
  "vouloir", "devoir", "dire", "prendre", "donner", "parler", "aimer",
  "manger", "boire", "dormir", "lire", "écrire", "comprendre", "apprendre",
  "connaître", "croire", "mettre", "partir", "sortir", "entrer", "rester",
  "trouver", "penser", "demander", "répondre", "jouer", "travailler",
  "commencer", "finir", "ouvrir", "fermer", "acheter", "vendre", "chercher",
  "essayer", "appeler", "arriver", "tomber", "monter", "descendre",
  "chanter", "danser", "nager", "courir", "marcher", "voyager", "habiter",
  "vivre", "mourir", "naître", "choisir", "attendre", "perdre", "gagner",
  "porter", "regarder", "écouter", "entendre", "sentir", "toucher",
  // être conjugations
  "suis", "es", "est", "sommes", "êtes", "sont",
  "étais", "était", "étions", "étiez", "étaient",
  "serai", "seras", "sera", "serons", "serez", "seront",
  "serais", "serait", "serions", "seriez", "seraient",
  // avoir conjugations
  "ai", "as", "a", "avons", "avez", "ont",
  "avais", "avait", "avions", "aviez", "avaient",
  "aurai", "auras", "aura", "aurons", "aurez", "auront",
  // faire conjugations
  "fais", "fait", "faisons", "faites", "font",
  // aller conjugations
  "vais", "vas", "va", "allons", "allez", "vont",
  // common past participles
  "été", "eu", "fait", "allé", "allée", "venu", "venue", "vu", "dit",
  "pris", "mis", "parti", "sorti", "entré", "resté", "tombé", "monté",
  "descendu", "né", "mort", "devenu", "arrivé", "passé",
  // common present tense forms
  "parle", "parles", "parlons", "parlez", "parlent",
  "mange", "manges", "mangeons", "mangez", "mangent",
  "donne", "donnes", "donnons", "donnez", "donnent",
  "aime", "aimes", "aimons", "aimez", "aiment",
  "joue", "joues", "jouons", "jouez", "jouent",
  "travaille", "travailles", "travaillons", "travaillez", "travaillent",
  "habite", "habites", "habitons", "habitez", "habitent",
  "regarde", "regardes", "regardons", "regardez", "regardent",
  "écoute", "écoutes", "écoutons", "écoutez", "écoutent",
  "peux", "peut", "pouvons", "pouvez", "peuvent",
  "veux", "veut", "voulons", "voulez", "veulent",
  "dois", "doit", "devons", "devez", "doivent",
  "sais", "sait", "savons", "savez", "savent",
  "vois", "voit", "voyons", "voyez", "voient",
  "viens", "vient", "venons", "venez", "viennent",
  "prends", "prend", "prenons", "prenez", "prennent",
  "comprends", "comprend", "comprenons", "comprenez", "comprennent",
  "apprends", "apprend", "apprenons", "apprenez", "apprennent",
  "connais", "connaît", "connaissons", "connaissez", "connaissent",
  "lis", "lit", "lisons", "lisez", "lisent",
  "écris", "écrit", "écrivons", "écrivez", "écrivent",
  "finis", "finit", "finissons", "finissez", "finissent",
  "choisis", "choisit", "choisissons", "choisissez", "choisissent",

  // Nouns - People & Family
  "homme", "femme", "enfant", "garçon", "fille", "bébé", "personne",
  "père", "mère", "frère", "sœur", "fils", "famille", "ami", "amie",
  "monsieur", "madame", "mademoiselle", "professeur", "étudiant", "étudiante",
  "docteur", "médecin", "avocat", "ingénieur", "artiste", "musicien",
  "voisin", "voisine", "collègue", "patron", "client", "gens",

  // Nouns - Places
  "maison", "appartement", "chambre", "cuisine", "salon", "salle",
  "école", "université", "bureau", "magasin", "restaurant", "hôtel",
  "hôpital", "église", "musée", "bibliothèque", "cinéma", "théâtre",
  "parc", "jardin", "rue", "avenue", "place", "pont", "gare", "aéroport",
  "ville", "village", "pays", "monde", "mer", "montagne", "plage",
  "forêt", "rivière", "lac", "île", "terre", "ciel",

  // Nouns - Things
  "chose", "temps", "jour", "nuit", "matin", "soir", "après-midi",
  "semaine", "mois", "année", "heure", "minute", "moment",
  "livre", "cahier", "stylo", "papier", "lettre", "journal",
  "téléphone", "ordinateur", "voiture", "bus", "train", "avion", "vélo",
  "porte", "fenêtre", "table", "chaise", "lit", "armoire",
  "eau", "pain", "fromage", "viande", "poisson", "fruit", "légume",
  "café", "thé", "lait", "vin", "bière", "jus",
  "repas", "petit-déjeuner", "déjeuner", "dîner",
  "vêtement", "robe", "pantalon", "chemise", "chaussure", "chapeau",
  "argent", "prix", "travail", "problème", "question", "réponse",
  "idée", "histoire", "chanson", "film", "photo", "image",
  "fleur", "arbre", "animal", "chien", "chat", "oiseau",
  "couleur", "rouge", "bleu", "vert", "jaune", "noir", "blanc",
  "orange", "rose", "violet", "gris", "marron",

  // Nouns - Food
  "salade", "soupe", "gâteau", "tarte", "baguette", "croissant",
  "beurre", "confiture", "sucre", "sel", "poivre", "huile",
  "pomme", "banane", "fraise", "cerise", "raisin", "citron",
  "tomate", "carotte", "pomme de terre", "oignon", "ail",
  "poulet", "bœuf", "porc", "agneau", "saucisse", "jambon",
  "œuf", "riz", "pâtes", "chocolat", "glace", "crêpe",
  "plat", "assiette", "verre", "tasse", "bouteille", "couteau",
  "fourchette", "cuillère", "serviette", "nourriture",

  // Adjectives
  "bon", "bonne", "mauvais", "mauvaise", "grand", "grande",
  "petit", "petite", "gros", "grosse", "long", "longue",
  "court", "courte", "nouveau", "nouvelle", "vieux", "vieille",
  "jeune", "beau", "belle", "joli", "jolie", "laid", "laide",
  "fort", "forte", "faible", "rapide", "lent", "lente",
  "chaud", "chaude", "froid", "froide", "facile", "difficile",
  "simple", "compliqué", "important", "importante", "intéressant",
  "intéressante", "ennuyeux", "ennuyeuse", "amusant", "amusante",
  "content", "contente", "triste", "heureux", "heureuse",
  "fatigué", "fatiguée", "malade", "seul", "seule",
  "premier", "première", "dernier", "dernière", "prochain", "prochaine",
  "français", "française", "anglais", "anglaise", "autre", "même",
  "tout", "toute", "tous", "toutes", "chaque", "plusieurs",
  "certain", "certaine", "vrai", "vraie", "faux", "fausse",
  "possible", "impossible", "nécessaire", "libre", "ouvert", "fermé",
  "plein", "vide", "propre", "sale", "riche", "pauvre",
  "gentil", "gentille", "méchant", "méchante", "intelligent", "intelligente",
  "magnifique", "superbe", "excellent", "excellente", "parfait", "parfaite",
  "délicieux", "délicieuse", "préféré", "préférée",

  // Adverbs
  "très", "bien", "mal", "beaucoup", "peu", "trop", "assez",
  "plus", "moins", "aussi", "encore", "déjà", "toujours", "jamais",
  "souvent", "parfois", "quelquefois", "rarement", "maintenant",
  "aujourd'hui", "hier", "demain", "bientôt", "tard", "tôt",
  "vite", "lentement", "ensemble", "seulement", "vraiment",
  "certainement", "probablement", "peut-être", "ici", "là",
  "partout", "comment", "pourquoi", "quand", "combien",

  // Prepositions & Conjunctions
  "à", "dans", "sur", "sous", "entre", "avec", "sans", "pour",
  "par", "vers", "chez", "avant", "après", "depuis", "pendant",
  "contre", "selon", "malgré", "sauf",
  "et", "ou", "mais", "donc", "car", "ni", "si", "comme",
  "parce", "puisque", "quand", "lorsque", "pendant",

  // Common expressions & words
  "oui", "non", "merci", "bonjour", "bonsoir", "bonne",
  "salut", "coucou", "au revoir", "à bientôt", "à demain",
  "s'il vous plaît", "excusez-moi", "pardon", "désolé", "désolée",
  "bienvenue", "félicitations", "bravo", "courage",
  "d'accord", "bien sûr", "pas", "ne", "n'est-ce pas",
  "voici", "voilà", "alors", "donc", "enfin", "ensuite",
  "puis", "aussi", "surtout", "cependant", "pourtant",

  // Numbers
  "zéro", "deux", "trois", "quatre", "cinq", "six", "sept",
  "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze",
  "quinze", "seize", "vingt", "trente", "quarante", "cinquante",
  "soixante", "cent", "mille",

  // Days & Months
  "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche",
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",

  // Weather & Nature
  "soleil", "pluie", "neige", "vent", "nuage", "orage",
  "chaud", "froid", "température", "saison", "printemps", "été",
  "automne", "hiver",

  // Body
  "tête", "main", "bras", "jambe", "pied", "œil", "yeux",
  "nez", "bouche", "oreille", "cheveux", "dos", "cœur", "ventre",

  // Music & Arts
  "musique", "chanson", "guitare", "piano", "peinture", "dessin",
  "danse", "spectacle", "concert", "exposition",

  // Travel
  "voyage", "vacances", "valise", "passeport", "billet", "carte",
  "touriste", "guide", "réservation", "excursion",

  // Miscellaneous common words
  "ça", "cela", "ceci", "quelque", "quelqu'un", "quelque chose",
  "rien", "personne", "tout le monde", "chacun",
  "fois", "vie", "mort", "amour", "paix", "guerre",
  "nom", "prénom", "âge", "adresse", "numéro",
  "début", "fin", "milieu", "côté", "bout",
  "partie", "reste", "exemple", "raison", "manière", "façon",
  "besoin", "envie", "plaisir", "bonheur", "chance",
]);

/**
 * Short words (1-2 chars) to skip during spell checking.
 * These are too short for meaningful distance comparison.
 */
const SKIP_LENGTH = 2;

/**
 * Maximum Levenshtein distance to consider a word as a potential match.
 * Words with distance greater than this are not suggested.
 */
const MAX_DISTANCE = 2;

/**
 * Computes the Levenshtein edit distance between two strings.
 * Used to find the closest dictionary word to a misspelled input.
 */
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

export interface SpellCheckResult {
  original: string;
  suggestion: string;
  distance: number;
}

/**
 * Extracts individual words from a message, stripping punctuation.
 * Handles French contractions like "j'aime", "l'école" by splitting on apostrophes.
 */
function tokenize(message: string): string[] {
  return message
    .toLowerCase()
    .replace(/[.,!?;:()""«»\-—]/g, " ")
    .split(/\s+/)
    .flatMap((word) => word.split("'"))
    .filter((word) => word.length > 0);
}

/**
 * Checks each word in the message against the French dictionary.
 * Returns a list of misspelled words with their closest dictionary suggestions.
 */
export function checkSpelling(message: string): SpellCheckResult[] {
  const words = tokenize(message);
  const results: SpellCheckResult[] = [];
  const checked = new Set<string>();

  for (const word of words) {
    if (word.length <= SKIP_LENGTH || checked.has(word)) continue;
    checked.add(word);

    if (frenchDictionary.has(word)) continue;

    // Find closest match in dictionary
    let bestMatch = "";
    let bestDistance = Infinity;

    for (const dictWord of frenchDictionary) {
      // Skip words with very different lengths for performance
      if (Math.abs(dictWord.length - word.length) > MAX_DISTANCE) continue;

      const dist = levenshteinDistance(word, dictWord);
      if (dist < bestDistance) {
        bestDistance = dist;
        bestMatch = dictWord;
      }
      if (dist === 1) break; // close enough, stop searching
    }

    if (bestDistance <= MAX_DISTANCE && bestMatch) {
      results.push({
        original: word,
        suggestion: bestMatch,
        distance: bestDistance,
      });
    }
  }

  return results;
}
