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
/* exported getMediaInfo */
/* eslint-disable-next-line no-unused-vars */
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
    /* eslint-disable-next-line no-unused-vars */
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
      mediaElement.addEventListener("click", () => {
        // Appel à openLightbox avec l'index approprié
        openLightbox(mediaUrl, mediaType, mediaItem.title, index);
      });
    });

    // Créer le menu de tri HTML
    createSortMenu();
  } catch (error) {
    console.error("Error loading data:", error);
  }
});

let totalLikesForCurrentPhotographer = 0; // Variable pour stocker le total des likes du photographe actuel

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
      totalLikesForCurrentPhotographer = 0; // Réinitialiser le total des likes
      photographerMedia.forEach((mediaItem) => {
        totalLikesForCurrentPhotographer += mediaItem.likes;
      });

      updateTotalLikes(); // Mettre à jour le total des likes affichés

      const insert = document.querySelector(".insert");

      const zoneTotalLikes = document.createElement("span");
      zoneTotalLikes.classList.add("total-likes");
      const nombreLikes = document.createElement("span");
      nombreLikes.classList.add("nombre-likes");
      nombreLikes.textContent = totalLikesForCurrentPhotographer;

      const heartIcon = document.createElement("i");
      heartIcon.className = "fa-solid fa-heart";
      zoneTotalLikes.appendChild(nombreLikes);
      zoneTotalLikes.appendChild(heartIcon);
      insert.appendChild(zoneTotalLikes);

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
    // Récupérer les données des photographes
    const photographers = await getPhotographers();

    // Récupérer les données des médias
    const media = await getMedia();

    // Afficher les données du photographe
    await displayOnePhotographer(photographers, media);

    // Incrémenter ou décrémenter les likes lors du clic sur l'icône de cœur
    incrementDecrementLikesOnClick(media);
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de l'initialisation :",
      error
    );
  }
}

function incrementDecrementLikesOnClick(media) {
  const heartIcons = document.querySelectorAll(".gallery i.fa-solid.fa-heart");
  heartIcons.forEach((heartIcon, index) => {
    heartIcon.addEventListener("click", () => {
      // Récupérer l'ID du média associé à cet icône
      const mediaId = photographerMedia[index].id;

      // Vérifier si le média a déjà été liké
      const alreadyLiked = media.some(
        (mediaItem) => mediaItem.id === mediaId && mediaItem.liked
      );

      // Trouver le média dans le tableau media
      const mediaItem = media.find((mediaItem) => mediaItem.id === mediaId);

      if (alreadyLiked) {
        // Décrémenter le nombre de likes et marquer comme non liké
        mediaItem.likes--;
        mediaItem.liked = false;
        totalLikesForCurrentPhotographer--; // Décrémenter le total des likes
        heartIcon.classList.remove("clicked"); // Retirer la classe "clicked" pour désactiver le cœur
      } else {
        // Incrémenter le nombre de likes et marquer comme liké
        mediaItem.likes++;
        mediaItem.liked = true;
        totalLikesForCurrentPhotographer++; // Incrémenter le total des likes
        heartIcon.classList.add("clicked"); // Ajouter la classe "clicked" pour activer le cœur
      }

      // Mettre à jour l'affichage du nombre de likes
      const likesCountSpan = heartIcon.previousElementSibling;
      likesCountSpan.textContent = mediaItem.likes;

      updateTotalLikes(); // Mettre à jour le total des likes affichés
    });
  });
}

function updateTotalLikes() {
  const nombreLikes = document.querySelector(".nombre-likes");
  if (nombreLikes) {
    nombreLikes.textContent = totalLikesForCurrentPhotographer;
  }
}

init();
