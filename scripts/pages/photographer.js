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

function lightbox(clickedMedia) {
  // Créer la modale Lightbox
  const lightbox = document.querySelector(".lightbox");
  const mediaContainer = document.createElement("div");
  mediaContainer.classList.add("media-container");

  const figure = document.createElement("figure");
  const figCaption = document.createElement("figcaption");

  // Créer un élément pour afficher le média en grand
  let mediaElement = document.createElement(clickedMedia.tagName);
  if (clickedMedia.tagName === "IMG") {
    mediaElement.src = clickedMedia.src;
    mediaElement.alt = clickedMedia.alt;

    figCaption.textContent = mediaElement.alt || "Titre non disponible"; // Vérifie si alt est défini, sinon utilise une valeur par défaut
  } else if (clickedMedia.tagName === "VIDEO") {
    // Créer l'élément vidéo
    mediaElement = document.createElement("video");
    mediaElement.controls = true;

    // Récupérer le titre depuis l'attribut alt de la source
    const videoTitle = clickedMedia.querySelector("source").getAttribute("alt");

    // Créer l'élément source pour définir la source vidéo
    const sourceElement = document.createElement("source");
    sourceElement.src = clickedMedia.querySelector("source").src; // Récupérer la source depuis la balise <source>
    sourceElement.type = clickedMedia.querySelector("source").type; // Récupérer le type depuis la balise <source>

    mediaElement.appendChild(sourceElement);
    figCaption.textContent = videoTitle || "Titre non disponible";
  }

  figure.appendChild(mediaElement);
  figure.appendChild(figCaption);

  // const btnCloseLightbox = document.createElement("button");
  const iconCloseLightbox = document.createElement("i");
  iconCloseLightbox.classList.add("fa-solid", "fa-xmark");
  iconCloseLightbox.addEventListener("click", closeLightbox);

  const iconPreviousMedia = document.createElement("i");
  iconPreviousMedia.classList.add("fa-solid", "fa-chevron-left");
  const iconNextMedia = document.createElement("i");
  iconNextMedia.classList.add("fa-solid", "fa-chevron-right");

  // btnCloseLightbox.appendChild(iconCloseLightbox);
  mediaContainer.appendChild(iconCloseLightbox);
  mediaContainer.appendChild(iconPreviousMedia);
  mediaContainer.appendChild(figure);
  mediaContainer.appendChild(iconNextMedia);
  lightbox.appendChild(mediaContainer);
}

async function displayOnePhotographer(photographers, media) {
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

    const affichageGallery = document.querySelector(".gallery");

    // On vérifie que le photographe actuel possède bien des médias
    if (media.length > 0) {
      // On filtre les médias pour ne conserver que ceux du photographe actuel
      const mediaOfCurrentPhotographer = media.filter(
        (media) => media.photographerId === photographer.id
      );

      // INSERT (total likes + pricing)

      // On calcule le total des likes des médias du photographe actuel
      let totalLikes = 0;
      for (let i = 0; i < mediaOfCurrentPhotographer.length; i++) {
        totalLikes += media[i].likes;
      }
      // const totalLikes = mediaOfCurrentPhotographer.reduce((acc, curr) => acc + curr.likes, 0);

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

      mediaOfCurrentPhotographer.forEach((media) => {
        // On passe l'ID du photographe à mediaFactory
        const gallery = mediaFactory(media, photographer.id);
        const userGalleryDOM = gallery.getUserGalleryDOM();
        affichageGallery.appendChild(userGalleryDOM);
      });

      affichageGallery.addEventListener("click", (event) => {
        const clickedMedia = event.target;
        // Récupérer l'élément vidéo ou image cliqué
        const video =
          clickedMedia.tagName === "VIDEO"
            ? clickedMedia
            : clickedMedia.querySelector("video");
        const img =
          clickedMedia.tagName === "IMG"
            ? clickedMedia
            : clickedMedia.querySelector("img");

        if (video || img) {
          // Afficher la modale et le média en grand
          lightbox(clickedMedia);
          // Appeler la fonction displayLightbox() du fichier lightBbox.js
          displayLightbox();
        }
      });
    }
  });
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
