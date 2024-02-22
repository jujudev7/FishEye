// on importe les données des photographes depuis le fichier JSON
async function getPhotographers() {
  const response = await fetch("data/photographers.json");
  if (response.ok === true) {
    const data = await response.json();
    return data.photographers;
  }
  throw new Error("Impossible de récupérer les données des photographes");
}

// on importe les données des médias depuis le fichier JSON
async function getMedia() {
  const response = await fetch("data/photographers.json");
  if (response.ok === true) {
    const data = await response.json();
    return data.media;
  }
  throw new Error("Impossible de récupérer les données des médias");
}

// Fonction pour obtenir les informations sur le média en fonction de son index
function getMediaInfo(index, media) {
  const mediaItem = media[index];
  const mediaUrl = mediaItem.video
    ? `assets/medias/${mediaItem.photographerId}/${mediaItem.video}`
    : `assets/medias/${mediaItem.photographerId}/${mediaItem.image}`;
  const mediaType = mediaItem.video ? "video" : "image";
  const title = mediaItem.title;
  return { url: mediaUrl, type: mediaType, title: title };
}

// Fonction pour récupérer tous les médias de la galerie du photographe dans un tableau
function getAllPhotographerMedia(photographerId, media) {
  return media.filter((m) => m.photographerId === photographerId);
}

let photographerMedia; // Déclaration de la variable en dehors de la fonction DOMContentLoaded

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const [photographers, media] = await Promise.all([
      getPhotographers(),
      getMedia(),
    ]);

    // Récupérer l'ID du photographe à partir de l'URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const photographerId = parseInt(urlParams.get("id"));

    // Affecter tous les médias du photographe à la variable photographerMedia
    photographerMedia = getAllPhotographerMedia(photographerId, media);

    // Récupérer la galerie d'affichage
    const gallery = document.querySelector(".gallery");

    // Parcourir les médias du photographe et les afficher dans la galerie
    photographerMedia.forEach((mediaItem, index) => {
      const mediaUrl = mediaItem.video
        ? `assets/medias/${photographerId}/${mediaItem.video}`
        : `assets/medias/${photographerId}/${mediaItem.image}`;
      const mediaType = mediaItem.video ? "video" : "image";

      const figure = mediaFactory(
        mediaItem,
        photographerId
      ).getUserGalleryDOM();
      const mediaElement = figure.querySelector("img, video");

      if (mediaType === "video") {
        const source = mediaElement.querySelector("source");
        source.src = mediaUrl;
      } else {
        mediaElement.src = mediaUrl;
      }

      gallery.appendChild(figure);

      // Ajouter un écouteur d'événements click pour chaque élément de la galerie
      figure.addEventListener("click", () => {
        // Appel à openLightbox avec l'index approprié
        openLightbox(mediaUrl, mediaType, mediaItem.title, index);
      });
    });

  } catch (error) {
    console.error("Error loading data:", error);
  }
});


async function displayOnePhotographer(photographers, media) {
  try {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get("id");

    const photographersHeader = document.querySelector(".photograph-header");

    photographers.forEach((photographer) => {
      if (photographer.id != id) return;

      const photographerHeader = photographerTemplate(photographer, media);
      const userHeaderDOM = photographerHeader.getUserHeaderDOM();
      photographersHeader.appendChild(userHeaderDOM);

      // On affiche le prénom du photographe dans le h2 du form
      document.querySelector(
        "header h2"
      ).innerHTML = `Contactez-moi<br>${photographer.name}`;

      // On récupère les médias du photographe actuel
      const photographerMedia = media.filter(
        (m) => m.photographerId === photographer.id
      );

      // On calcule le total des likes des médias du photographe actuel
      let totalLikes = 0;
      photographerMedia.forEach((mediaItem) => {
        // likesZone.classList.add("likes-zone");
        const heartIcon = document.querySelector(".likes-zone i.fa-solid.fa-heart");
        // const likes = document.querySelector(".likes-zone span.likes");
        heartIcon.addEventListener("click", () => {
          mediaItem.likes ++;
        });
        totalLikes += mediaItem.likes;
      });

      const insert = document.querySelector(".insert");

      const zoneTotalLikes = document.createElement("span");
      zoneTotalLikes.classList.add("likes");
      zoneTotalLikes.textContent = totalLikes;

      const heartIcon = document.createElement("i");
      heartIcon.className = "fa-solid fa-heart";
      insert.appendChild(zoneTotalLikes);
      zoneTotalLikes.appendChild(heartIcon);

      const pricingPhotographer = document.createElement("span");
      pricingPhotographer.className = "pricing-photographer";
      pricingPhotographer.textContent = photographer.price + "€ / jour";
      insert.appendChild(pricingPhotographer);
    });
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de l'affichage du photographe :",
      error
    );
  }
}

async function init() {
  try {
    // on récupère les données des photographes
    const photographers = await getPhotographers();

    // on récupère les données des médias
    const media = await getMedia();

    // on affiche les données du photographe
    displayOnePhotographer(photographers, media);
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de l'initialisation :",
      error
    );
  }
}

init();
