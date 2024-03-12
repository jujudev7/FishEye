// Déclaration de la variable selectedOption pour suivre l'option sélectionnée
let selectedOption = "Popularité";

// Fonction pour mettre à jour les aria-labels du bouton .dropbtn et des options du dropdown
function updateAriaLabels() {
  const dropbtn = document.querySelector(".dropbtn");
  dropbtn.setAttribute("aria-label", "Trier les médias par " + selectedOption);

  const dropdownContent = document.getElementById("myDropdown");
  const dropdownOptions = dropdownContent.getElementsByTagName("button");

  for (let i = 0; i < dropdownOptions.length; i++) {
    const optionText = dropdownOptions[i].innerText;
    dropdownOptions[i].setAttribute("aria-label", "Trier les médias par " + optionText);
  }
}

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
  button.setAttribute("aria-expanded", "false");
  const sortIcon = document.createElement("i");
  sortIcon.className = "fa-solid fa-chevron-down";
  sortIcon.setAttribute("aria-hidden", "true");

  button.appendChild(sortIcon);

  updateAriaLabels();
}

/* exported toggleOptions */
/* eslint-disable-next-line no-unused-vars */
function toggleOptions() {
  const button = document.querySelector(".dropbtn");
  const dropdownContent = document.getElementById("myDropdown");

  if (dropdownContent.style.display === "block") {
    dropdownContent.style.display = "none";
    document.querySelector(".dropbtn i").classList.remove("fa-chevron-up");
    document.querySelector(".dropbtn i").classList.add("fa-chevron-down");
    button.setAttribute("aria-expanded", "false");
  } else {
    dropdownContent.style.display = "block";
    document.querySelector(".dropbtn i").classList.remove("fa-chevron-down");
    document.querySelector(".dropbtn i").classList.add("fa-chevron-up");
    button.setAttribute("aria-expanded", "true");
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

  dropdownContent.style.display = "none";

  document.querySelector(".dropbtn").innerText = selectedOptionText;
  dropdownOptions[index].innerText = currentButtonText;
  

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

  updateAriaLabels();
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
  photographerMedia.sort((a, b) => a.title_fr.localeCompare(b.title_fr));
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
      openLightbox(mediaUrl, mediaType, mediaItem.title_fr, index);
    });
  });
}
