"use client";

import { useState } from "react";

/**
 * Built-in French-Turkish dictionary with common words and phrases.
 * Supports bidirectional lookup with fuzzy matching.
 */
const dictionary: { fr: string; tr: string }[] = [
  // Greetings & basics
  { fr: "bonjour", tr: "merhaba / günaydın" },
  { fr: "bonsoir", tr: "iyi akşamlar" },
  { fr: "bonne nuit", tr: "iyi geceler" },
  { fr: "salut", tr: "selam" },
  { fr: "au revoir", tr: "hoşça kal" },
  { fr: "à bientôt", tr: "görüşürüz" },
  { fr: "merci", tr: "teşekkürler" },
  { fr: "merci beaucoup", tr: "çok teşekkürler" },
  { fr: "s'il vous plaît", tr: "lütfen" },
  { fr: "de rien", tr: "bir şey değil" },
  { fr: "excusez-moi", tr: "afedersiniz" },
  { fr: "pardon", tr: "pardon / özür dilerim" },
  { fr: "oui", tr: "evet" },
  { fr: "non", tr: "hayır" },
  { fr: "peut-être", tr: "belki" },
  { fr: "bien sûr", tr: "tabii ki" },

  // Pronouns
  { fr: "je", tr: "ben" },
  { fr: "tu", tr: "sen" },
  { fr: "il", tr: "o (erkek)" },
  { fr: "elle", tr: "o (kadın)" },
  { fr: "nous", tr: "biz" },
  { fr: "vous", tr: "siz" },
  { fr: "ils", tr: "onlar (erkek)" },
  { fr: "elles", tr: "onlar (kadın)" },

  // Common verbs
  { fr: "être", tr: "olmak" },
  { fr: "avoir", tr: "sahip olmak" },
  { fr: "faire", tr: "yapmak" },
  { fr: "aller", tr: "gitmek" },
  { fr: "venir", tr: "gelmek" },
  { fr: "voir", tr: "görmek" },
  { fr: "savoir", tr: "bilmek" },
  { fr: "pouvoir", tr: "yapabilmek / güç" },
  { fr: "vouloir", tr: "istemek" },
  { fr: "devoir", tr: "zorunda olmak / borç" },
  { fr: "dire", tr: "söylemek" },
  { fr: "parler", tr: "konuşmak" },
  { fr: "manger", tr: "yemek yemek" },
  { fr: "boire", tr: "içmek" },
  { fr: "dormir", tr: "uyumak" },
  { fr: "lire", tr: "okumak" },
  { fr: "écrire", tr: "yazmak" },
  { fr: "écouter", tr: "dinlemek" },
  { fr: "regarder", tr: "bakmak / izlemek" },
  { fr: "aimer", tr: "sevmek / beğenmek" },
  { fr: "adorer", tr: "bayılmak / çok sevmek" },
  { fr: "détester", tr: "nefret etmek" },
  { fr: "travailler", tr: "çalışmak" },
  { fr: "étudier", tr: "ders çalışmak" },
  { fr: "apprendre", tr: "öğrenmek" },
  { fr: "comprendre", tr: "anlamak" },
  { fr: "acheter", tr: "satın almak" },
  { fr: "vendre", tr: "satmak" },
  { fr: "chercher", tr: "aramak" },
  { fr: "trouver", tr: "bulmak" },
  { fr: "donner", tr: "vermek" },
  { fr: "prendre", tr: "almak" },
  { fr: "mettre", tr: "koymak / giymek" },
  { fr: "jouer", tr: "oynamak / çalmak" },
  { fr: "chanter", tr: "şarkı söylemek" },
  { fr: "danser", tr: "dans etmek" },
  { fr: "nager", tr: "yüzmek" },
  { fr: "courir", tr: "koşmak" },
  { fr: "marcher", tr: "yürümek" },

  // Question words
  { fr: "qui", tr: "kim" },
  { fr: "quoi", tr: "ne" },
  { fr: "où", tr: "nerede" },
  { fr: "quand", tr: "ne zaman" },
  { fr: "comment", tr: "nasıl" },
  { fr: "pourquoi", tr: "neden / niçin" },
  { fr: "combien", tr: "ne kadar / kaç" },

  // Numbers
  { fr: "un", tr: "bir" },
  { fr: "deux", tr: "iki" },
  { fr: "trois", tr: "üç" },
  { fr: "quatre", tr: "dört" },
  { fr: "cinq", tr: "beş" },
  { fr: "six", tr: "altı" },
  { fr: "sept", tr: "yedi" },
  { fr: "huit", tr: "sekiz" },
  { fr: "neuf", tr: "dokuz" },
  { fr: "dix", tr: "on" },
  { fr: "vingt", tr: "yirmi" },
  { fr: "trente", tr: "otuz" },
  { fr: "cent", tr: "yüz" },
  { fr: "mille", tr: "bin" },

  // Time & days
  { fr: "aujourd'hui", tr: "bugün" },
  { fr: "hier", tr: "dün" },
  { fr: "demain", tr: "yarın" },
  { fr: "maintenant", tr: "şimdi" },
  { fr: "toujours", tr: "her zaman" },
  { fr: "jamais", tr: "asla / hiçbir zaman" },
  { fr: "souvent", tr: "sık sık" },
  { fr: "parfois", tr: "bazen" },
  { fr: "lundi", tr: "pazartesi" },
  { fr: "mardi", tr: "salı" },
  { fr: "mercredi", tr: "çarşamba" },
  { fr: "jeudi", tr: "perşembe" },
  { fr: "vendredi", tr: "cuma" },
  { fr: "samedi", tr: "cumartesi" },
  { fr: "dimanche", tr: "pazar" },

  // Months & seasons
  { fr: "janvier", tr: "ocak" },
  { fr: "février", tr: "şubat" },
  { fr: "mars", tr: "mart" },
  { fr: "avril", tr: "nisan" },
  { fr: "mai", tr: "mayıs" },
  { fr: "juin", tr: "haziran" },
  { fr: "juillet", tr: "temmuz" },
  { fr: "août", tr: "ağustos" },
  { fr: "septembre", tr: "eylül" },
  { fr: "octobre", tr: "ekim" },
  { fr: "novembre", tr: "kasım" },
  { fr: "décembre", tr: "aralık" },
  { fr: "printemps", tr: "ilkbahar" },
  { fr: "été", tr: "yaz" },
  { fr: "automne", tr: "sonbahar" },
  { fr: "hiver", tr: "kış" },

  // Family
  { fr: "famille", tr: "aile" },
  { fr: "mère", tr: "anne" },
  { fr: "père", tr: "baba" },
  { fr: "frère", tr: "erkek kardeş" },
  { fr: "sœur", tr: "kız kardeş" },
  { fr: "fils", tr: "oğul" },
  { fr: "fille", tr: "kız" },
  { fr: "enfant", tr: "çocuk" },
  { fr: "ami", tr: "arkadaş (erkek)" },
  { fr: "amie", tr: "arkadaş (kadın)" },

  // Food & drink
  { fr: "eau", tr: "su" },
  { fr: "pain", tr: "ekmek" },
  { fr: "fromage", tr: "peynir" },
  { fr: "lait", tr: "süt" },
  { fr: "café", tr: "kahve" },
  { fr: "thé", tr: "çay" },
  { fr: "vin", tr: "şarap" },
  { fr: "viande", tr: "et" },
  { fr: "poisson", tr: "balık" },
  { fr: "poulet", tr: "tavuk" },
  { fr: "riz", tr: "pirinç / pilav" },
  { fr: "légume", tr: "sebze" },
  { fr: "fruit", tr: "meyve" },
  { fr: "pomme", tr: "elma" },
  { fr: "salade", tr: "salata" },
  { fr: "gâteau", tr: "pasta / kek" },
  { fr: "croissant", tr: "kruvasan" },
  { fr: "baguette", tr: "baget ekmek" },

  // Places
  { fr: "maison", tr: "ev" },
  { fr: "école", tr: "okul" },
  { fr: "hôpital", tr: "hastane" },
  { fr: "restaurant", tr: "restoran" },
  { fr: "magasin", tr: "mağaza / dükkan" },
  { fr: "bibliothèque", tr: "kütüphane" },
  { fr: "gare", tr: "tren istasyonu" },
  { fr: "aéroport", tr: "havaalanı" },
  { fr: "musée", tr: "müze" },
  { fr: "parc", tr: "park" },
  { fr: "plage", tr: "plaj / kumsal" },
  { fr: "montagne", tr: "dağ" },
  { fr: "ville", tr: "şehir" },
  { fr: "pays", tr: "ülke" },
  { fr: "rue", tr: "sokak / cadde" },

  // Adjectives
  { fr: "grand", tr: "büyük / uzun" },
  { fr: "petit", tr: "küçük" },
  { fr: "bon", tr: "iyi" },
  { fr: "mauvais", tr: "kötü" },
  { fr: "beau", tr: "güzel (erkek)" },
  { fr: "belle", tr: "güzel (kadın)" },
  { fr: "nouveau", tr: "yeni" },
  { fr: "vieux", tr: "eski / yaşlı" },
  { fr: "jeune", tr: "genç" },
  { fr: "chaud", tr: "sıcak" },
  { fr: "froid", tr: "soğuk" },
  { fr: "facile", tr: "kolay" },
  { fr: "difficile", tr: "zor" },
  { fr: "intéressant", tr: "ilginç" },
  { fr: "important", tr: "önemli" },
  { fr: "heureux", tr: "mutlu" },
  { fr: "triste", tr: "üzgün" },
  { fr: "fatigué", tr: "yorgun" },
  { fr: "content", tr: "memnun" },
  { fr: "délicieux", tr: "lezzetli" },
  { fr: "magnifique", tr: "muhteşem" },

  // Common phrases
  { fr: "je m'appelle", tr: "benim adım" },
  { fr: "j'ai faim", tr: "karnım aç" },
  { fr: "j'ai soif", tr: "susadım" },
  { fr: "j'ai froid", tr: "üşüyorum" },
  { fr: "j'ai chaud", tr: "sıcaklıyorum" },
  { fr: "j'ai peur", tr: "korkuyorum" },
  { fr: "je suis fatigué", tr: "yorgunum" },
  { fr: "je ne comprends pas", tr: "anlamıyorum" },
  { fr: "je ne sais pas", tr: "bilmiyorum" },
  { fr: "c'est la vie", tr: "hayat bu / böyle hayat" },
  { fr: "bon appétit", tr: "afiyet olsun" },
  { fr: "bon voyage", tr: "iyi yolculuklar" },
  { fr: "bonne chance", tr: "iyi şanslar" },
  { fr: "comment ça va", tr: "nasılsın" },
  { fr: "ça va bien", tr: "iyiyim" },
  { fr: "pas mal", tr: "fena değil" },
  { fr: "d'accord", tr: "tamam / anlaştık" },
  { fr: "bien entendu", tr: "tabii ki / elbette" },
  { fr: "tout à fait", tr: "kesinlikle" },
];

/**
 * Normalizes text for comparison: lowercase, remove accents.
 */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

/**
 * Searches dictionary for matches in both directions (FR→TR and TR→FR).
 */
function search(query: string): { fr: string; tr: string }[] {
  if (!query.trim()) return [];

  const norm = normalize(query);
  const results: { entry: { fr: string; tr: string }; score: number }[] = [];

  for (const entry of dictionary) {
    const normFr = normalize(entry.fr);
    const normTr = normalize(entry.tr);

    // Exact match = highest priority
    if (normFr === norm || normTr === norm) {
      results.push({ entry, score: 3 });
    }
    // Starts with query
    else if (normFr.startsWith(norm) || normTr.startsWith(norm)) {
      results.push({ entry, score: 2 });
    }
    // Contains query
    else if (normFr.includes(norm) || normTr.includes(norm)) {
      results.push({ entry, score: 1 });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, 8).map((r) => r.entry);
}

/**
 * French-Turkish mini translator widget for the sidebar.
 * Searches a built-in dictionary with bidirectional fuzzy matching.
 */
export default function TranslatorWidget() {
  const [query, setQuery] = useState("");
  const results = search(query);

  return (
    <div className="flex flex-col h-full">
      <div className="p-3">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
            🔍
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Kelime ara... (FR veya TR)"
            className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50/80 focus:outline-none focus:ring-2 focus:ring-navy-700/30 focus:border-navy-700/40 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto chat-scroll px-3 pb-3">
        {query.trim() === "" ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 px-4">
            <div className="w-14 h-14 rounded-full bg-cream-100 flex items-center justify-center mb-3">
              <span className="text-2xl">🇫🇷</span>
            </div>
            <p className="text-xs text-center text-gray-400 leading-relaxed">
              Fransızca veya Türkçe bir kelime yazarak sözlükte arayın.
            </p>
            <p className="text-[10px] text-gray-300 mt-2">
              {dictionary.length} kelime / ifade
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-400">
            <span className="text-2xl mb-2">🤷</span>
            <p className="text-xs text-center">
              &ldquo;{query}&rdquo; için sonuç bulunamadı.
            </p>
          </div>
        ) : (
          <div className="space-y-1.5">
            {results.map((entry, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 p-3 hover:border-navy-700/20 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <span className="text-[10px] bg-blue-100 text-blue-700 font-bold rounded px-1.5 py-0.5 shrink-0 mt-0.5">
                    FR
                  </span>
                  <p className="text-sm font-medium text-navy-900">
                    {entry.fr}
                  </p>
                </div>
                <div className="flex items-start gap-2 mt-1.5">
                  <span className="text-[10px] bg-red-100 text-red-700 font-bold rounded px-1.5 py-0.5 shrink-0 mt-0.5">
                    TR
                  </span>
                  <p className="text-sm text-gray-600">{entry.tr}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
