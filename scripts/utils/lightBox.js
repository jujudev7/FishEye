/* global photographerMedia, getMediaInfo */

function closeLightbox() {
  const lightbox = document.querySelector(".lightbox");
  lightbox.style.display = "none";
  lightbox.setAttribute("aria-hidden", "true");

  // Supprimer le contenu de la lightbox
  lightbox.innerHTML = ""; 
}

// Fonction pour placer le focus à l'intérieur de la lightbox
function focusLightbox() {
  const lightboxContent = document.querySelector(".lightbox-content");
  const iconNextMedia = lightboxContent.querySelector(".fa-chevron-right");
  const iconPreviousMedia = lightboxContent.querySelector(".fa-chevron-left");
  const iconCloseLightbox = lightboxContent.querySelector(".fa-xmark");
  const videoElement = lightboxContent.querySelector("video"); // Sélectionnez l'élément vidéo s'il existe

  // Assurer que tous les éléments ont un attribut tabindex
  iconCloseLightbox.setAttribute("tabindex", "0");
  iconCloseLightbox.setAttribute("aria-label", "Fermer la modale");
  iconPreviousMedia.setAttribute("tabindex", "0");
  iconPreviousMedia.setAttribute("aria-label", "Aller au média précédent");
  iconNextMedia.setAttribute("tabindex", "0");
  iconNextMedia.setAttribute("aria-label", "Aller au média suivant");

  if (videoElement) {
    videoElement.focus();

    videoElement.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        // Si l'utilisateur appuie sur Entrée, lire la vidéo
        videoElement.play();
      } else if (event.key === "Tab" && !event.shiftKey) {
        // Si l'utilisateur appuie sur Tab à partir de la vidéo, déplacer le focus vers l'icône suivante
        event.preventDefault();
        iconNextMedia.focus();
      } else if (event.key === "Tab" && event.shiftKey) {
        // Si l'utilisateur appuie sur Shift+Tab à partir de la vidéo, déplacer le focus vers l'icône de fermeture
        event.preventDefault();
        iconPreviousMedia.focus();
      }
    });
  } else {
    // Mettre le focus sur le premier élément
    iconNextMedia.focus();
  }

  iconCloseLightbox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      closeLightbox();
    } else if (event.key === "Tab" && event.shiftKey) {
      // Si l'utilisateur appuie sur Shift+Tab à partir de l'icône de fermeture, déplacer le focus vers la vidéo s'il existe, sinon vers l'icône précédente
      event.preventDefault();
      videoElement ? videoElement.focus() : iconPreviousMedia.focus();
    }
  });

  iconPreviousMedia.addEventListener("keydown", function (event) {
    if (event.key === "Tab" && !event.shiftKey) {
      // Si l'utilisateur appuie sur Tab à partir de l'icône précédente, déplacer le focus vers la vidéo s'il existe, sinon vers l'icône suivante
      event.preventDefault();
      videoElement ? videoElement.focus() : iconNextMedia.focus();
    }
  });

  iconNextMedia.addEventListener("keydown", function (event) {
    if (event.key === "Tab" && !event.shiftKey) {
      // Si l'utilisateur appuie sur Tab à partir de l'icône suivante, déplacer le focus vers la vidéo s'il existe, sinon vers l'icône de fermeture
      event.preventDefault();
      videoElement ? videoElement.focus() : iconCloseLightbox.focus();
    }
  });
}

// Modifier la fonction displayLightbox pour appeler focusLightbox après l'affichage
function displayLightbox() {
  const lightbox = document.querySelector(".lightbox");
  lightbox.style.display = "block";

  // Appeler focusLightbox pour placer le focus à l'intérieur de la lightbox
  focusLightbox();
}

// Gestionnaire d'événement pour la touche Échap
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

// Déclaration de la variable globale pour suivre l'index du média actuellement affiché
let currentIndex = 0;

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
  if (newMediaInfo.type === "image") {
    const img = document.createElement("img");
    img.src = newMediaInfo.url;
    img.alt = "";
    newFigure.appendChild(img);
  } else if (newMediaInfo.type === "video") {
    const video = document.createElement("video");
    video.controls = true;
    video.tabIndex = "0"; // Définir l'attribut tabindex sur l'élément vidéo
    // Ajoutez de la description à l'attribut aria-describedby
    video.setAttribute("aria-describedby", "videoDescription");
    // Créer un élément pour afficher la description de la vidéo
    const descriptionElement = document.createElement("div");
    descriptionElement.id = "videoDescription"; // ID utilisé pour la référence aria-describedby
    descriptionElement.classList.add("sr-only");
    const videoDescFr = newMediaInfo.title_fr;
    descriptionElement.textContent = "Description de la vidéo : " + videoDescFr;
    video.appendChild(descriptionElement);
    const source = document.createElement("source");
    source.src = newMediaInfo.url; // Mettre à jour le chemin de la vidéo
    source.type = "video/mp4";
    video.appendChild(source);
    // Mettre le focus sur le média lorsque celui-ci est ajouté
    video.addEventListener("loadeddata", function () {
      video.focus();
    });
    newFigure.appendChild(video);
  }

  // Créer la légende du média
  const figCaption = document.createElement("figcaption");
  figCaption.textContent = newMediaInfo.title_fr;

  // Ajouter le nouvel élément média à la figure
  newFigure.appendChild(figCaption);

  // Ajouter le nouvel élément figure au contenu de la lightbox
  content.insertBefore(newFigure, document.querySelector(".fa-chevron-right")); // Insérer newFigure avant .fa-chevron-right

  displayLightbox(); // Appeler la fonction pour afficher la lightbox
}

// Fonction pour afficher la lightbox
/* exported openLightbox */
/* eslint-disable-next-line no-unused-vars */
function openLightbox(mediaUrl, mediaType, title_fr, index) {
  const lightbox = document.querySelector(".lightbox");

  // Vérifier si l'index est valide
  if (index < 0 || index >= photographerMedia.length) {
    console.error("Index out of bounds:", index);
    return;
  }

  // Initialiser l'index du média actuellement affiché
  currentIndex = index;

  // Vérifier si mediaUrl et title_fr sont définis
  if (!mediaUrl || !title_fr) {
    console.error("Media URL or title_fr is undefined.");
    return;
  }

  const content = document.createElement("div");
  content.className = "lightbox-content";
  content.setAttribute("role", "dialog");
  content.setAttribute("aria-live", "polite");
  content.setAttribute("aria-hidden", "false");

  // Création de la figure contenant le média et sa légende
  const figure = document.createElement("figure");
  figure.setAttribute("role", "figure");
  figure.setAttribute("aria-label", title_fr);

  // Créer le média en fonction du type
  if (mediaType === "image") {
    const img = document.createElement("img");
    img.src = mediaUrl;
    figure.appendChild(img);
  } else if (mediaType === "video") {
    const video = document.createElement("video");
    video.controls = true;
    video.tabIndex = "0"; // Assurez-vous que la vidéo est focusable
    const source = document.createElement("source");
    source.src = mediaUrl;
    source.type = "video/mp4"; // Définissez le type de média correctement
    video.appendChild(source);
    figure.appendChild(video);

    // Mettre le focus sur le bouton de lecture lorsque la vidéo est chargée
    video.addEventListener("loadeddata", function () {
      const playButton = video.querySelector('[aria-label="Play"]');
      if (playButton) {
        playButton.focus();
      }
    });
  }

  // Créer la légende du média
  const figCaption = document.createElement("figcaption");
  figCaption.textContent = title_fr;

  // Ajouter des événements pour naviguer entre les médias dans la lightbox
  const iconPreviousMedia = document.createElement("i");
  iconPreviousMedia.classList.add("fa-solid", "fa-chevron-left");
  iconPreviousMedia.setAttribute("aria-hidden", "true");
  // Ajout des gestionnaires d'événements pour les icônes "iconPreviousMedia" et "iconNextMedia"
  iconPreviousMedia.addEventListener("click", () => navigateLightbox(-1));

  const iconNextMedia = document.createElement("i");
  iconNextMedia.classList.add("fa-solid", "fa-chevron-right");
  iconNextMedia.setAttribute("aria-hidden", "true");
  // Ajout des gestionnaires d'événements pour les icônes "iconPreviousMedia" et "iconNextMedia"
  iconNextMedia.addEventListener("click", () => navigateLightbox(1));

  const iconCloseLightbox = document.createElement("i");
  iconCloseLightbox.classList.add("fa-solid", "fa-xmark");
  iconCloseLightbox.setAttribute("aria-hidden", "true");
  iconCloseLightbox.addEventListener("click", closeLightbox);

  // Ajout des icônes de navigation, du media et de la figcaption à la lightbox
  content.appendChild(iconCloseLightbox);
  content.appendChild(iconPreviousMedia);
  figure.appendChild(figCaption);
  content.appendChild(figure);
  content.appendChild(iconNextMedia);
  lightbox.appendChild(content);

  displayLightbox(); // Appeler la fonction pour afficher la lightbox

  // Gestion de l'ouverture de la lightbox lorsque la touche "Entrée" est enfoncée sur les icônes de navigation
  iconPreviousMedia.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      navigateLightbox(-1);
      iconPreviousMedia.focus();
    }
  });

  iconNextMedia.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      navigateLightbox(1);
    }
  });
}
