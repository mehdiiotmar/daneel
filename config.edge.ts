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

// Fonction pour générer une réponse commerciale et support client
function generateResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  // Vérifier si l'utilisateur pose une question sur un produit
  const produitTrouvé = data.produits.find(p => message.includes(p.nom.toLowerCase()));
  if (produitTrouvé) {
    return `🛍️ **${produitTrouvé.nom}** est disponible !  
Prix habituel : ~~${produitTrouvé.prix_initial}~~  
**Prix promo** : **${produitTrouvé.prix_reduit}** (-${produitTrouvé.remise})  
Souhaitez-vous passer commande ? 😊`;
  }

  // Vérifier les questions sur la livraison
  if (message.includes("livraison")) {
    return `🚚 **Infos livraison** :  
- 📍 **Tanger** : ${data.services.livraison.Tanger.frais}, délai ${data.services.livraison.Tanger.delai}  
- 📦 **Hors Tanger** : ${data.services.livraison.hors_Tanger.frais}, délai ${data.services.livraison.hors_Tanger.delai}  
📌 *Les délais peuvent varier selon la disponibilité des produits.*  
Besoin d'aide ?`;
  }

  // Vérifier les questions sur les retours
  if (message.includes("retour") || message.includes("remboursement")) {
    return `🔄 **Retour produit** :  
Vous avez **${data.services.retours.delai_max}** jours pour retourner un produit, à condition qu'il soit **non utilisé et dans son emballage d'origine**.  
Les frais de retour sont **à votre charge**. Contactez-nous pour plus d’infos !`;
  }

  // Vérifier les demandes de contact
  if (message.includes("contact") || message.includes("email") || message.includes("téléphone")) {
    return `📞 **Contact Market Para** :  
📍 Adresse : ${data.contact.adresse}  
📧 Email : ${data.contact.email}  
📱 Téléphone : ${data.contact.phone1} / ${data.contact.phone2}  
Nous sommes à votre service !`;
  }

  // Par défaut, réponse générique
  return `Bienvenue chez **${data.nom}** 🏪 !  
Besoin d'aide ? Posez-moi vos questions sur les produits, la livraison ou les retours. 😊`;
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
