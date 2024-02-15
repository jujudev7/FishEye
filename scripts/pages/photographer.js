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
    // photographerHeader.getUserInsertDOM();

    // Afficher le prénom du photographe dans le h2 du form
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
      const totalLikes = mediaOfCurrentPhotographer.reduce(
        (acc, curr) => acc + curr.likes,
        0
      );
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
