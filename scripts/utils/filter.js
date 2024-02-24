function createSortMenu() {
  
  const sortMenuContainer = document.getElementById("sort");
  const sortByContainer = document.createElement("div");
  sortByContainer.id = "sort-by";
  const sortBy = document.createElement("span");
  sortBy.id = "sortBy";
  sortBy.textContent = "Trier par";
  sortByContainer.appendChild(sortBy);
  
  const sortOptionsContainer = document.createElement("div");
  sortOptionsContainer.classList.add("sort-options");

  const sortOptions = ["Popularité", "Date", "Titre"];

  // Créer un conteneur pour la première option et l'icône
  const firstOptionContainer = document.createElement("div");
  firstOptionContainer.classList.add("sort-option-container");

  const firstOption = document.createElement("div");
  firstOption.textContent = sortOptions[0];
  firstOption.classList.add("sort-option");
  firstOption.classList.add(sortOptions[0].toLowerCase());
  firstOptionContainer.appendChild(firstOption);

  const sortIcon = document.createElement("i");
  sortIcon.className = "fa-solid fa-chevron-down";
  firstOptionContainer.appendChild(sortIcon);

  sortOptionsContainer.appendChild(firstOptionContainer);

  sortOptions.forEach((option, index) => {
    if (index !== 0) {
      const optionElement = document.createElement("div");
      optionElement.textContent = option;
      optionElement.classList.add("sort-option");
      optionElement.classList.add(option.toLowerCase());
      optionElement.style.display = "none"; // Masquer les options autres que la première
      sortOptionsContainer.appendChild(optionElement);
    }
  });

  sortByContainer.appendChild(sortOptionsContainer);
  sortMenuContainer.appendChild(sortByContainer);

  // Ajouter un gestionnaire d'événements pour afficher les autres options et changer l'icône au clic
  firstOptionContainer.addEventListener("click", () => {
    const otherOptions = sortOptionsContainer.querySelectorAll(".sort-option:not(:first-child)");
    otherOptions.forEach(option => {
      if (option.style.display === "none") {
        option.style.display = "block";
        sortIcon.className = "fa-solid fa-chevron-up";
      } else {
        option.style.display = "none";
        sortIcon.className = "fa-solid fa-chevron-down";
      }
    });
  });

  // Ajouter des gestionnaires d'événements pour le tri
  sortOptionsContainer.querySelectorAll(".sort-option").forEach(option => {
    option.addEventListener("click", () => {
      const selectedOption = option.textContent;
      firstOption.textContent = selectedOption; // Mettre à jour le texte de la première option
      sortOptionsContainer.querySelectorAll(".sort-option").forEach(opt => {
        if (opt.textContent !== selectedOption) {
          opt.style.display = "none";
        }
      });
      sortIcon.className = "fa-solid fa-chevron-down";

      // Appliquer le tri approprié
      if (selectedOption === "Popularité") {
        sortMediaByPopularity();
      } else if (selectedOption === "Date") {
        sortMediaByDate();
      } else if (selectedOption === "Titre") {
        sortMediaByTitle();
      }
    });
  });
}

// Reste du code inchangé...


// Fonction pour trier les médias par Popularité
function sortMediaByPopularity() {
  photographerMedia.sort((a, b) => b.likes - a.likes);
  updateGallery();
}

// Fonction pour trier les médias par Date
function sortMediaByDate() {
  photographerMedia.sort((a, b) => new Date(b.date) - new Date(a.date));
  updateGallery();
}

// Fonction pour trier les médias par Titre
function sortMediaByTitle() {
  photographerMedia.sort((a, b) => a.title.localeCompare(b.title));
  updateGallery();
}

// Fonction pour mettre à jour la galerie après le tri
function updateGallery() {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = ""; // Effacer la galerie actuelle

  photographerMedia.forEach((mediaItem, index) => {
    const mediaUrl = mediaItem.video
      ? `assets/medias/${photographerId}/${mediaItem.video}`
      : `assets/medias/${photographerId}/${mediaItem.image}`;
    const mediaType = mediaItem.video ? "video" : "image";

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
      openLightbox(mediaUrl, mediaType, mediaItem.title, index);
    });
  });
}