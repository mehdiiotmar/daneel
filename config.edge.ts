import { AppConfig } from "./lib/edge/types.ts";
import { prompt } from "./prompts/movie-critic.ts";
// import { prompt } from "./prompts/tour-guide.ts";
import fs from "fs";

// Charger les données depuis un fichier JSON
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));

export const appConfig: AppConfig = {
  // Cette clé API doit être définie dans une variable d'environnement
  // Voir https://platform.openai.com/account/api-keys
  OPENAI_API_KEY: Netlify.env.get("OPENAI_API_KEY") ?? "",

  // Le nombre maximum de messages à envoyer à l'API
  historyLength: 8,

  // La longueur maximale en caractères de chaque message envoyé à l'API
  maxMessageLength: 1000,

  // La configuration de l'API envoyée à OpenAI
  apiConfig: {
    model: "gpt-3.5-turbo-1106",
  },

  // Ce qui fait fonctionner la magie. Voir le README pour plus de détails.
  systemPrompt: (_req, context) => {
    // Extraire des informations du fichier JSON
    const products = data.produits.map(product => `${product.nom}: ${product.prix_reduit} DH`);
    const services = data.services.livraison ? `Livraison disponible : ${data.services.livraison.Tanger.delai} jours à Tanger` : "Livraison indisponible";

    return `
      ${prompt}
      Voici les informations sur le site Market Para :

      **Produits en Promotion :**
      ${products.join("\n")}

      **Services :**
      ${services}

      Répondez avec des informations en markdown valide. La date de connaissance est septembre 2021.
      Date actuelle : ${new Date().toDateString()}.
      L'utilisateur est situé à ${context.geo.city}, ${context.geo.country}.
    `;
  },
};
