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
      Tanger: { frais: "25 Dh", delai: "1 à 2 jours ouvrables" },
      hors_Tanger: { frais: "35 Dh", delai: "1 à 3 jours ouvrables" },
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

// Fonction de réponse client 100% basée sur les données
function generateResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  // Vérifier si l'utilisateur demande un produit
  for (const produit of data.produits) {
    if (message.includes(produit.nom.toLowerCase())) {
      return `🛍️ **${produit.nom}** est disponible !\nPrix habituel : ~~${produit.prix_initial}~~\n**Prix promo** : **${produit.prix_reduit}** (-${produit.remise})\nSouhaitez-vous passer commande ? 😊`;
    }
  }

  // Vérifier les questions sur la livraison
  if (message.includes("livraison")) {
    return `🚚 **Infos livraison** :\n- 📍 **Tanger** : ${data.services.livraison.Tanger.frais}, délai ${data.services.livraison.Tanger.delai}\n- 📦 **Hors Tanger** : ${data.services.livraison.hors_Tanger.frais}, délai ${data.services.livraison.hors_Tanger.delai}\n📌 *Les délais peuvent varier.* Besoin d'aide ?`;
  }

  // Vérifier les questions sur les retours
  if (message.includes("retour") || message.includes("remboursement")) {
    return `🔄 **Retour produit** :\nVous avez **${data.services.retours.delai_max}** jours pour retourner un produit, à condition qu'il soit **non utilisé et dans son emballage d'origine**.\nLes frais de retour sont **à votre charge**. Contactez-nous pour plus d’infos !`;
  }

  // Vérifier les demandes de contact
  if (message.includes("contact") || message.includes("email") || message.includes("téléphone")) {
    return `📞 **Contact Market Para** :\n📍 Adresse : ${data.contact.adresse}\n📧 Email : ${data.contact.email}\n📱 Téléphone : ${data.contact.phone1} / ${data.contact.phone2}\nNous sommes à votre service !`;
  }

  // Si la question ne correspond à aucune donnée
  return `❌ Je suis désolé, mais je ne peux répondre qu'aux questions basées sur les informations disponibles. N'hésitez pas à me demander sur nos produits, la livraison ou le contact. 😊`;
}

// Configuration de l'application
export const appConfig: AppConfig = {
  OPENAI_API_KEY: Netlify.env.get("OPENAI_API_KEY") ?? "",
  historyLength: 8,
  maxMessageLength: 1000,
  apiConfig: {
    model: "gpt-3.5-turbo-1106",
  },
  systemPrompt: (_req, context) => generateResponse(_req.body?.message || "")
};
