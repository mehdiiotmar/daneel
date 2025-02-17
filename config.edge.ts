import { AppConfig } from "./lib/edge/types.ts";
import { prompt } from "./prompts/movie-critic.ts";
// import { prompt } from "./prompts/tour-guide.ts";
import fs from "fs";

// Charger les données depuis le fichier data.json
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

export const appConfig: AppConfig = {
  OPENAI_API_KEY: Netlify.env.get("OPENAI_API_KEY") ?? "",

  historyLength: 8,
  maxMessageLength: 1000,

  apiConfig: {
    model: "gpt-3.5-turbo-1106",
  },

  systemPrompt: (_req, context) => {
    // Extraire les informations du fichier JSON
    const products = data.produits.map(product => `${product.nom}: ${product.prix_reduit} DH`);
    const services = data.services.livraison ? `Livraison disponible : ${data.services.livraison.Tanger.delai} jours à Tanger` : "Livraison indisponible";
    const returnPolicy = data.services.politique_de_retour;
    const faq = "Vous pouvez consulter notre FAQ sur le site pour plus de détails.";

    // Créer le prompt en fonction des données du JSON
    return `
      Vous êtes un support client pour **Market Para Tanger**, une parapharmacie en ligne. 

      Voici les informations disponibles sur nos produits et services :

      **Produits en Promotion :**
      ${products.join("\n")}
      
      **Services :**
      - Livraison : ${services}
      - Politique de retour : ${returnPolicy}

      **FAQ :**
      ${faq}

      L'utilisateur est situé à ${context.geo.city}, ${context.geo.country}.
      
      Veuillez répondre avec des informations basées strictement sur ces données, et si l'utilisateur pose des questions sur des produits, services ou retours, utilisez uniquement les informations ci-dessus pour fournir des réponses précises. Ne donnez pas d'informations non présentes dans ces données.

      Répondez avec un ton commercial pour proposer des produits et services pertinents en fonction des questions de l'utilisateur.
    `;
  },
};
