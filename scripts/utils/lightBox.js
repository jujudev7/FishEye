function displayLightbox() {
  const lightbox = document.querySelector(".lightbox");
  lightbox.style.display = "block";
  lightbox.setAttribute("aria-hidden", "false");
  lightbox.setAttribute("role", "dialog");

  // Ajouter un filtre blanc sur le corps de la page
  const bodyOverlay = document.querySelector("body");
  bodyOverlay.classList.add("body-overlay");
}

function closeLightbox() {
  const lightbox = document.querySelector(".lightbox");
  lightbox.style.display = "none";
  lightbox.setAttribute("aria-hidden", "true");

  // Supprimer le contenu de la lightbox
  const lightboxContent = document.querySelector(".lightbox-content");
  lightboxContent.innerHTML = ""; // Supprime tous les éléments enfants de la lightbox
}

// Déclaration de la variable globale pour suivre l'index du média actuellement affiché
let currentIndex = 0;

// Fonction pour afficher la lightbox
/* exported openLightbox */
/* eslint-disable-next-line no-unused-vars */
function openLightbox(url, type, title, index) {
  const lightbox = document.querySelector(".lightbox");

  // Initialiser l'index du média actuellement affiché
  currentIndex = index; // Utilisation de la variable globale currentIndex

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

  // Ajouter des événements pour naviguer entre les médias dans la lightbox
  const iconPreviousMedia = document.createElement("i");
  iconPreviousMedia.classList.add("fa-solid", "fa-chevron-left");
  const iconNextMedia = document.createElement("i");
  iconNextMedia.classList.add("fa-solid", "fa-chevron-right");

  // Ajout des gestionnaires d'événements pour les icônes "iconPreviousMedia" et "iconNextMedia"
  iconPreviousMedia.addEventListener("click", () => navigateLightbox(-1));
  iconNextMedia.addEventListener("click", () => navigateLightbox(1));

  // Ajout des icônes de navigation, du media et de la figcaption à la lightbox
  content.appendChild(iconCloseLightbox);
  content.appendChild(iconPreviousMedia);
  content.appendChild(figure);
  figure.appendChild(figCaption);
  content.appendChild(iconNextMedia);
  lightbox.appendChild(content);

  displayLightbox(); // Appeler la fonction pour afficher la lightbox

  // Fonction pour naviguer dans la lightbox
  function navigateLightbox(direction) {
    // Mettre à jour l'index du média en fonction de la direction
    currentIndex =
      (currentIndex + direction + photographerMedia.length) %
      photographerMedia.length;

    // Récupérer les informations sur le nouveau média
    const newMediaInfo = getMediaInfo(currentIndex, photographerMedia);

    // Récupérer le contenu de la lightbox
    const content = document.querySelector(".lightbox-content");

    // Supprimer l'ancien élément figure s'il existe
    const oldFigure = content.querySelector("figure");
    if (oldFigure) {
      content.removeChild(oldFigure);
    }

    // Créer le nouvel élément figure
    const newFigure = document.createElement("figure");

    // Créer le nouvel élément média en fonction du type
    let mediaElement;
    if (newMediaInfo.type === "image") {
      mediaElement = document.createElement("img");
      mediaElement.src = newMediaInfo.url;
    } else if (newMediaInfo.type === "video") {
      mediaElement = document.createElement("video");
      mediaElement.src = newMediaInfo.url;
      mediaElement.controls = true;
    }

    // Créer la légende du média
    const figCaption = document.createElement("figcaption");
    figCaption.textContent = newMediaInfo.title;

    // Ajouter le nouvel élément média à la figure
    newFigure.appendChild(mediaElement);
    // Ajouter la légende au nouvel élément figure
    newFigure.appendChild(figCaption);
    // Ajouter la figure au contenu de la lightbox
    content.insertBefore(newFigure, iconNextMedia); // Insérer newFigure avant iconNextMedia
  }
}


