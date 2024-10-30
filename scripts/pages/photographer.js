let photographers;

// Fonction pour récupérer les données des photographes depuis le fichier JSON
async function getPhotographers() {
  const response = await fetch("data/photographers_fr.json");
  if (response.ok === true) {
    const data = await response.json();
    return data.photographers;
  }
  throw new Error("Impossible de récupérer les données des photographes");
}

// Fonction pour récupérer les données des médias depuis le fichier JSON
async function getMedia() {
  const response = await fetch("data/photographers_fr.json");
  if (response.ok === true) {
    const data = await response.json();
    return data.media;
  }
  throw new Error("Impossible de récupérer les données des médias");
}

// Fonction pour obtenir les informations sur le média en fonction de son index
/* eslint-disable-next-line no-unused-vars */
function getMediaInfo(index, media) {
  const mediaItem = media[index];
  const mediaUrl = mediaItem.video
    ? `assets/medias/${mediaItem.photographerId}/${mediaItem.video}`
    : `assets/medias/${mediaItem.photographerId}/${mediaItem.image}`;
  const mediaType = mediaItem.video ? "video" : "image";
  const title_fr = mediaItem.title_fr;
  const mediaId = mediaItem.id; // Ajout de l'ID du média

  return {
    mediaId: mediaId, // Retour de l'ID du média
    url: mediaUrl,
    type: mediaType,
    title_fr: title_fr,
  };
}

// Fonction pour récupérer tous les médias de la galerie du photographe dans un tableau
function getAllPhotographerMedia(photographerId, media) {
  return media.filter((m) => m.photographerId === photographerId);
}

let photographerMedia; // Variable globale pour stocker les médias du photographe actuel

let totalLikesForCurrentPhotographer = 0; // Réinitialiser le total des likes

// Fonction pour afficher les détails du photographe et sa galerie
async function displayPhotographerDetailsAndGallery(photographers, media) {
  try {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = parseInt(urlParams.get("id"));

    // Trouver le photographe avec l'ID correspondant
    const photographer = photographers.find(
      (photographer) => photographer.id === id
    );
    if (!photographer) {
      console.error("Photographer not found with ID:", id);
      return;
    }

    const photographersHeader = document.querySelector(".photograph-header");

    /* eslint-disable-next-line no-undef */
    const photographerHeader = photographerTemplate(photographer, media);
    const userHeaderDOM = photographerHeader.getUserHeaderDOM();
    photographersHeader.appendChild(userHeaderDOM);

    // On définit le titre de la page
    document.title_fr = `Page du photographe ${photographer.name} | Fisheye`;

    // On affiche le prénom du photographe dans le h2 du form
    document.querySelector(
      "header h2"
    ).innerHTML = `Contactez-moi<br>${photographer.name}`;

    // On récupère les médias du photographe actuel
    photographerMedia = getAllPhotographerMedia(id, media);

    // On calcule le total des likes des médias du photographe actuel
    photographerMedia.forEach((mediaItem) => {
      totalLikesForCurrentPhotographer += mediaItem.likes;
    });

    updateTotalLikes(); // On met à jour le total des likes affichés

    const insert = document.querySelector(".insert");

    const zoneTotalLikes = document.createElement("span");
    zoneTotalLikes.classList.add("total-likes");
    const nombreLikes = document.createElement("span");
    nombreLikes.classList.add("nombre-likes");
    nombreLikes.textContent = totalLikesForCurrentPhotographer;

    const heartIcon = document.createElement("i");
    heartIcon.className = "fa-solid fa-heart";
    heartIcon.setAttribute("aria-hidden", "true");
    heartIcon.setAttribute("aria-label", "likes");
    const spanIconHeart = document.createElement("span");
    spanIconHeart.classList.add("sr-only");
    spanIconHeart.textContent = nombreLikes + " likes";
    zoneTotalLikes.appendChild(nombreLikes);
    zoneTotalLikes.appendChild(heartIcon);
    zoneTotalLikes.appendChild(spanIconHeart);
    insert.appendChild(zoneTotalLikes);

    const pricingPhotographer = document.createElement("span");
    pricingPhotographer.className = "pricing-photographer";
    pricingPhotographer.textContent = photographer.price + "€ / jour";
    insert.appendChild(pricingPhotographer);

    // Afficher la galerie du photographe
    displayPhotographerGallery();

    // Attendre que la galerie soit affichée avant d'appeler la fonction pour incrémenter/décrémenter les likes
    await new Promise((resolve) => setTimeout(resolve, 100)); // Attente de 100 ms pour s'assurer que la galerie est bien affichée

    incrementDecrementLikesOnClick(media);
  } catch (error) {
    console.error(
      "An error occurred while displaying photographer details and gallery:",
      error
    );
  }
}

// Fonction pour afficher la galerie du photographe
function displayPhotographerGallery() {
  try {
    const gallery = document.querySelector(".gallery");

    // Parcourir les médias du photographe et les afficher dans la galerie
    photographerMedia.forEach((mediaItem, index) => {
      const mediaUrl = mediaItem.video
        ? `assets/medias/${mediaItem.photographerId}/${mediaItem.video}`
        : `assets/medias/${mediaItem.photographerId}/${mediaItem.image}`;
      const mediaType = mediaItem.video ? "video" : "image";

      /* eslint-disable-next-line no-undef */
      const figure = mediaFactory(mediaItem).getUserGalleryDOM();
      const mediaElement = figure.querySelector("img, video");

      if (mediaType === "video") {
        const source = mediaElement.querySelector("source");
        source.src = mediaUrl;
      } else {
        mediaElement.src = mediaUrl;
      }

      gallery.appendChild(figure);

      // Initialise les likes en fonction de l'état actuel
      const heartIcon = figure.querySelector("i.fa-solid.fa-heart");
      if (mediaItem.liked) {
        heartIcon.classList.add("clicked");
      }

      // Ajout d'un écouteur d'événements click pour chaque élément de la galerie
      mediaElement.addEventListener("click", () => {
        /* eslint-disable-next-line no-undef */
        openLightbox(mediaUrl, mediaType, mediaItem.title_fr, index);
      });
    });

    // Initialiser la navigation au clavier
    initKeyboardNavigation();
  } catch (error) {
    console.error(
      "An error occurred while displaying photographer gallery:",
      error
    );
  }
}
// Déclaration globale de la variable media
let media;

document.addEventListener("DOMContentLoaded", async function () {
  try {
    // Récupérer les données des photographes et des médias
    await Promise.all([getPhotographers(), getMedia()]);

    // Créer le menu de tri HTML
    /* eslint-disable-next-line no-undef */
    createSortMenu();
    /* eslint-disable-next-line no-undef */
    sortMediaByPopularity();

    // Appel à la fonction pour incrémenter/décrémenter les likes lors de l'initialisation de la page
    incrementDecrementLikesOnClick(media);
  } catch (error) {
    console.error("Error loading data:", error);
  }
});

// Fonction pour initialiser la navigation au clavier
function initKeyboardNavigation() {
  document.addEventListener("keydown", function (event) {
    const focusableElements = document.querySelectorAll(
      "button, [tabindex], .logo"
    );
    const focusedElement = document.activeElement;
    const index = Array.prototype.indexOf.call(
      focusableElements,
      focusedElement
    );

    // Gestion de la navigation au clavier avec les touches fléchées
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      const previousIndex =
        index === 0 ? focusableElements.length - 1 : index - 1;
      focusableElements[previousIndex].focus();
    } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      const nextIndex = index === focusableElements.length - 1 ? 0 : index + 1;
      focusableElements[nextIndex].focus();
    }

    // Gestion de l'ouverture de la lightbox lorsque la touche "Entrée" est enfoncée sur le média
    if (
      event.key === "Enter" &&
      (focusedElement.tagName === "IMG" || focusedElement.tagName === "VIDEO")
    ) {
      event.preventDefault(); // Empêcher le comportement par défaut

      let mediaUrl;
      let mediaType;
      let title_fr;
      let index = Array.from(focusableElements).indexOf(focusedElement);

      if (focusedElement.tagName === "VIDEO") {
        const videoElement = focusedElement;
        const sourceElement = videoElement.querySelector("source");
        if (sourceElement) {
          mediaUrl = sourceElement.src;
          mediaType = "video";
          title_fr =
            videoElement.parentElement.querySelector("figcaption").textContent;
        } else {
          console.error("Video source element not found.");
          return;
        }
      } else {
        const imgElement = focusedElement;
        mediaUrl = imgElement.src;
        mediaType = "image";
        title_fr =
          imgElement.parentElement.querySelector("figcaption").textContent;
      }

      // Vérifier si mediaUrl et title_fr sont définis
      if (mediaUrl && title_fr) {
        /* eslint-disable-next-line no-undef */
        openLightbox(mediaUrl, mediaType, title_fr, index);
      } else {
        console.error("Media URL or title_fr is undefined.");
      }
    }
  });
}

// Fonction pour mettre à jour l'affichage du total des likes
function updateTotalLikes() {
  const nombreLikes = document.querySelector(".nombre-likes");
  if (nombreLikes) {
    nombreLikes.textContent = totalLikesForCurrentPhotographer;
  }
}

// Fonction pour incrémenter ou décrémenter les likes lors du clic sur l'icône cœur
function incrementDecrementLikesOnClick(media) {
  const heartIcons = document.querySelectorAll(".gallery i.fa-solid.fa-heart");
  heartIcons.forEach((heartIcon) => {
    heartIcon.addEventListener("click", () => {
      const mediaId = parseInt(heartIcon.dataset.id); // Récupérer l'ID du média associé à cette icône cœur

      const mediaItem = media.find((mediaItem) => mediaItem.id === mediaId);

      if (!mediaItem) {
        console.error("Media not found with ID:", mediaId);
        return;
      }

      const alreadyLiked = mediaItem.liked;

      if (alreadyLiked) {
        mediaItem.likes--;
        mediaItem.liked = false;
        totalLikesForCurrentPhotographer--;
        heartIcon.classList.remove("clicked");
      } else {
        mediaItem.likes++;
        mediaItem.liked = true;
        totalLikesForCurrentPhotographer++;
        heartIcon.classList.add("clicked");
      }

      const likesCountSpan = heartIcon.previousElementSibling;
      likesCountSpan.textContent = mediaItem.likes;

      updateTotalLikes();
    });

    // Ajout d'un événement pour la touche "Entrée" lorsqu'une l'icone Like est en surbrillance
    heartIcon.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        // Effectuer la même action que pour le clic
        heartIcon.click(); // Déclenchera le gestionnaire de clic existant
      }
    });
  });
}

// Fonction pour initialiser l'application
async function init() {
  try {
    // Récupérer les données des photographes et des médias
    const [photographersData, mediaData] = await Promise.all([
      getPhotographers(),
      getMedia(),
    ]);

    // Assigner les données récupérées aux variables correspondantes
    photographers = photographersData;
    media = mediaData;

    // Afficher les détails du photographe et sa galerie
    displayPhotographerDetailsAndGallery(photographers, media);

    // Appeler la fonction pour incrémenter/décrémenter les likes
    incrementDecrementLikesOnClick(media);
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de l'initialisation :",
      error
    );
  }
}

// Appeler la fonction d'initialisation
init();
