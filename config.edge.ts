import type { AppConfig } from "./lib/edge/types.ts";

// Données de la marque Market Para
const data = {
  site: "e-marketpara.ma",
  nom: "Market Para",
  slogan: "Votre Parapharmacie en ligne",
  location: "Tanger, Maroc",
  contact: {
    adresse: "49 Avenue Moulay Abdellah Lot 48 RDC, Tanger – Maroc",
    phone1: "0666 477 577",
    phone2: "0662 082 042",
    email: "contact@e-marketpara.ma"
  },
  services: {
    livraison: {
      Tanger: {
        frais: "25 Dh",
        delai: "1 à 2 jours ouvrables"
      },
      hors_Tanger: {
        frais: "35 Dh",
        delai: "1 à 3 jours ouvrables"
      },
      note: "Les délais de livraison peuvent varier en fonction de la disponibilité des produits et des conditions météorologiques."
    },
    retours: {
      delai_max: "7 jours",
      etat_du_produit: "doit être dans son état d'origine et non utilisé",
      frais: "à la charge du client",
      procesus: "Contactez le service clientèle pour les instructions."
    }
  },
  categories: [
    "Soins de Visage",
    "Corps",
    "Cheveux",
    "Compléments alimentaires",
    "Soins pour hommes",
    "Hygiène",
    "Maman et bébés",
    "Solaires"
  ],
  produits: [
    {
      nom: "3 Chênes Color & Soin Coloration permanente 10A Blond Clair Cendré",
      prix_initial: "189.00 dh",
      prix_reduit: "120.00 dh",
      remise: "37%"
    },
    {
      nom: "3 Chênes Color & Soin Coloration permanente 10N Blond Platine",
      prix_initial: "189.00 dh",
      prix_reduit: "120.00 dh",
      remise: "37%"
    }
  ]
};

// Prompt système strict pour guider le bot
const systemPrompt = `
Tu es un expert en support client et en vente pour la parapharmacie Market Para.

🔹 **Ton objectif** :
- Répondre uniquement en te basant sur les données fournies.
- Ne jamais inventer ou supposer des informations absentes des données.
- Adopter un ton chaleureux, souriant et engageant.
- Guider les clients vers l'achat ou les services proposés.
- Fournir les informations de contact lorsque c'est pertinent.

🔹 **Règles strictes** :
- Si une question concerne un sujet absent des données, réponds : "Je suis désolé, mais je n'ai pas cette information. Contactez-nous pour plus de détails !"
- Ne jamais mentionner que tu es une IA.
- Toujours inclure une proposition d'achat ou de contact si pertinent.

🔹 **Exemples de réponses adaptées** :
✅ Si un client demande un produit existant :
"Bien sûr ! 🛍️ **3 Chênes Color & Soin Coloration permanente 10A Blond Clair Cendré** est disponible ! Son prix en promotion est **120.00 dh** (-37%). Souhaitez-vous finaliser votre commande ? 😊"

✅ Si un client demande un produit absent :
"Je suis désolé, mais je n'ai pas cette information. Contactez-nous au **0666 477 577** pour en savoir plus ! 📞"

✅ Si un client pose une question sur la livraison :
"🚚 Nous livrons partout au Maroc ! À Tanger, les frais sont **25 Dh** (1 à 2 jours), et hors Tanger, c'est **35 Dh** (1 à 3 jours). Besoin d'autres infos ? 😊"

Maintenant, prête à aider ! 🚀`;

// Configuration de l'application
export const appConfig: AppConfig = {
  OPENAI_API_KEY: Netlify.env.get("OPENAI_API_KEY") ?? "",
  historyLength: 8,
  maxMessageLength: 1000,
  apiConfig: {
    model: "gpt-3.5-turbo-1106",
  },
  systemPrompt: () => systemPrompt
};
