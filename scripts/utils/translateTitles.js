/* eslint-disable-next-line no-undef */
const { Translate } = require("@google-cloud/translate").v2;
/* eslint-disable-next-line no-undef */
const fs = require("fs");

// Remplacez 'YOUR_API_KEY' par votre propre clé d'API
const translate = new Translate({ key: "" });

// Chargez le contenu du fichier photographers.json
const photographersJson = JSON.parse(
  fs.readFileSync("data/photographers.json")
);

// Fonction pour traduire les titres
async function translateTitles() {
  // Obtenez tous les titres à traduire
  const titles = photographersJson.media.map((media) => media.title);
  // Traduisez les titres de l'anglais vers le français
  const [translations] = await translate.translate(titles, "fr");
  // Mettez à jour les titres traduits dans le fichier JSON
  photographersJson.media.forEach((media, index) => {
    media.title_fr = translations[index];
  });
  // Enregistrez les modifications dans le fichier JSON
  fs.writeFileSync(
    "data/photographers_fr.json",
    JSON.stringify(photographersJson, null, 2)
  );
}

// Appelez la fonction pour traduire les titres
translateTitles().catch(console.error);
