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

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const [photographers, media] = await Promise.all([
      getPhotographers(),
      getMedia(),
    ]);

    // Définition des icônes pour la lightbox
    const iconPreviousMedia = document.createElement("i");
    iconPreviousMedia.classList.add("fa-solid", "fa-chevron-left");
    const iconNextMedia = document.createElement("i");
    iconNextMedia.classList.add("fa-solid", "fa-chevron-right");

    // Fonction pour afficher la lightbox
    function openLightbox(url, type, title) {
      const lightbox = document.querySelector(".lightbox");
    
      const content = document.createElement("div");
      content.className = "lightbox-content";
    
      // Création de la figure contenant le média et sa légende
      const figure = document.createElement("figure");
      const figCaption = document.createElement("figcaption");
    
      if (type === "image") {
        const img = document.createElement("img");
        img.src = url;
        figure.appendChild(img);
        figCaption.textContent = title;
      } else if (type === "video") {
        const video = document.createElement("video");
        video.controls = true;
        const source = document.createElement("source");
        source.src = url;
        video.appendChild(source);
        figure.appendChild(video);
        figCaption.textContent = title;
      }
    
      const iconCloseLightbox = document.createElement("i");
      iconCloseLightbox.classList.add("fa-solid", "fa-xmark");
      iconCloseLightbox.addEventListener("click", closeLightbox);
    
      // Ajout de la figure et de la légende au contenu de la lightbox
      figure.appendChild(figCaption);
      content.appendChild(iconCloseLightbox);
      content.appendChild(iconPreviousMedia);
      content.appendChild(figure);
      content.appendChild(iconNextMedia);
      lightbox.appendChild(content);
      displayLightbox(); // Appeler la fonction pour afficher la lightbox
    }

    // Récupérer l'ID du photographe à partir de l'URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const photographerId = parseInt(urlParams.get("id"));

    // Récupérer les médias du photographe correspondant
    const photographerMedia = media.filter(
      (m) => m.photographerId === photographerId
    );

    // Récupérer la galerie d'affichage
    const gallery = document.querySelector(".gallery");

    // Index du média actuellement affiché dans la lightbox
    let currentIndex = 0;

    // Fonction pour afficher le média suivant dans la lightbox
    function showNextMedia() {
      currentIndex = (currentIndex + 1) % photographerMedia.length;
      const nextMediaItem = photographerMedia[currentIndex];
      const nextMediaUrl =
        nextMediaItem.video ?
        `assets/medias/${photographerId}/${nextMediaItem.video}` :
        `assets/medias/${photographerId}/${nextMediaItem.image}`;
      const nextMediaType = nextMediaItem.video ? "video" : "image";
      const nextMediaTitle = nextMediaItem.title;
      openLightbox(nextMediaUrl, nextMediaType, nextMediaTitle);
    }

    // Fonction pour afficher le média précédent dans la lightbox
    function showPreviousMedia() {
      currentIndex =
        (currentIndex - 1 + photographerMedia.length) % photographerMedia.length;
      const previousMediaItem = photographerMedia[currentIndex];
      const previousMediaUrl =
        previousMediaItem.video ?
        `assets/medias/${photographerId}/${previousMediaItem.video}` :
        `assets/medias/${photographerId}/${previousMediaItem.image}`;
      const previousMediaType = previousMediaItem.video ? "video" : "image";
      const previousMediaTitle = previousMediaItem.title;
      openLightbox(
        previousMediaUrl,
        previousMediaType,
        previousMediaTitle
      );
    }

    // Écouteur d'événement pour le clic sur l'icône précédente
    iconPreviousMedia.addEventListener("click", showPreviousMedia);

    // Écouteur d'événement pour le clic sur l'icône suivante
    iconNextMedia.addEventListener("click", showNextMedia);

    // Parcourir les médias du photographe et les afficher dans la galerie
    photographerMedia.forEach((mediaItem) => {
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

      mediaElement.addEventListener("click", () => {
        openLightbox(mediaUrl, mediaType, mediaItem.title); // Passer le titre du média à la fonction openLightbox
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
