import type { AppConfig } from "./lib/edge/types.ts";

export const appConfig: AppConfig = {
  OPENAI_API_KEY: Netlify.env.get("OPENAI_API_KEY") ?? "",

  historyLength: 8,
  maxMessageLength: 1000,

  apiConfig: {
    model: "gpt-3.5-turbo-1106",
  },

  systemPrompt: (_req, context) => {
    return generateResponse(_req.body?.message || ""); // Appel à une fonction qui cherche dans le JSON
  }
};

// Définition des données JSON en tant qu'objet JavaScript
const supportData = {
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

// Fonction qui recherche une réponse dans l'objet JSON
function generateResponse(userMessage: string): string {
  const found = supportData.categories.find(category =>
    userMessage.toLowerCase().includes(category.toLowerCase())
  );

  return found
    ? `Nous proposons des produits dans la catégorie "${found}".`
    : "Je suis désolé, je ne trouve pas la réponse à votre question. Veuillez contacter notre support.";
}
