function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

// Récupérer l'ID du photographe à partir de la query string de l'URL
const urlParams = new URLSearchParams(window.location.search);
const photographerId = parseInt(urlParams.get("id"));

// Trouver le photographe correspondant dans les données du profil
const photographer = profileData.find(
  (profile) => profile.id === photographerId
);

// Afficher le prénom du photographe dans le h2 du form
document.querySelector(
  "header h2"
).textContent = `Contactez-moi ${photographer.name}`;
