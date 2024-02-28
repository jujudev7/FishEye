// Déclaration de la variable selectedOption pour suivre l'option sélectionnée
let selectedOption = "Popularité";

// Fonction pour créer le menu de tri
/* exported createSortMenu */
/* eslint-disable-next-line no-unused-vars */
function createSortMenu() {
  const sortMenuContainer = document.getElementById("sort");
  const sortBy = document.createElement("div");
  sortBy.id = "sort-by";
  sortBy.textContent = "Trier par";

  const dropdown = document.querySelector(".dropdown");
  sortMenuContainer.appendChild(sortBy);
  sortMenuContainer.appendChild(dropdown);
  const button = document.querySelector(".dropbtn");
  const sortIcon = document.createElement("i");
  sortIcon.className = "fa-solid fa-chevron-down";

  button.appendChild(sortIcon);
}

/* exported toggleOptions */
/* eslint-disable-next-line no-unused-vars */
function toggleOptions() {
  const dropdownContent = document.getElementById("myDropdown");
  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
    document.querySelector(".dropbtn i").classList.remove("fa-chevron-up");
    document.querySelector(".dropbtn i").classList.add("fa-chevron-down");
  } else {
    dropdownContent.style.display = "block";
    document.querySelector(".dropbtn i").classList.remove("fa-chevron-down");
    document.querySelector(".dropbtn i").classList.add("fa-chevron-up");
  }
}

/* exported selectOption */
/* eslint-disable-next-line no-unused-vars */
function selectOption(index) {
  const dropdownContent = document.getElementById("myDropdown");
  const dropdownOptions = dropdownContent.getElementsByTagName("button");
  const selectedOptionText = dropdownOptions[index].innerText;
  const currentButtonText = document.querySelector(".dropbtn").innerText;
  const sortIcon = document.querySelector(".dropbtn i");

  document.querySelector(".dropbtn").innerText = selectedOptionText;
  dropdownOptions[index].innerText = currentButtonText;

  dropdownContent.style.display = "none";

  // Déplacer l'icône dans le bouton
  const button = document.querySelector(".dropbtn");
  button.appendChild(sortIcon);

  document.querySelector(".dropbtn i").classList.remove("fa-chevron-up");
  document.querySelector(".dropbtn i").classList.add("fa-chevron-down");

  // Mise à jour de la variable selectedOption
  selectedOption = selectedOptionText;

  // Appliquer le tri approprié
  if (selectedOption === "Popularité") {
    sortMediaByPopularity();
  } else if (selectedOption === "Date") {
    sortMediaByDate();
  } else if (selectedOption === "Titre") {
    sortMediaByTitle();
  }
}

// Fonction pour trier les médias par Popularité
function sortMediaByPopularity() {
  /* eslint-disable-next-line no-undef */
  photographerMedia.sort((a, b) => b.likes - a.likes);
  updateGallery();
}

// Fonction pour trier les médias par Date
function sortMediaByDate() {
  /* eslint-disable-next-line no-undef */
  photographerMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
  updateGallery();
}

// Fonction pour trier les médias par Titre
function sortMediaByTitle() {
  /* eslint-disable-next-line no-undef */
  photographerMedia.sort((a, b) => a.title.localeCompare(b.title));
  updateGallery();
}

// Fonction pour mettre à jour la galerie après le tri
function updateGallery() {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; // Effacer la galerie actuelle

  /* eslint-disable-next-line no-undef */
  photographerMedia.forEach((mediaItem, index) => {
    const mediaUrl = mediaItem.video
    /* eslint-disable-next-line no-undef */
      ? `assets/medias/${photographerId}/${mediaItem.video}`
      /* eslint-disable-next-line no-undef */
      : `assets/medias/${photographerId}/${mediaItem.image}`;
    const mediaType = mediaItem.video ? "video" : "image";

    /* eslint-disable-next-line no-undef */
    const figure = mediaFactory(mediaItem, photographerId).getUserGalleryDOM();
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
      /* eslint-disable-next-line no-undef */
      openLightbox(mediaUrl, mediaType, mediaItem.title, index);
    });
  });
}
