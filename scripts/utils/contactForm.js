function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  modal.setAttribute("role", "dialog");
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
}

// Récupérer l'ID du photographe à partir de la query string de l'URL
const urlParams = new URLSearchParams(window.location.search);
const photographerId = parseInt(urlParams.get("id"));

// Afficher le prénom du photographe dans le h2 du form
document.querySelector(
  "header h2"
).textContent = `Contactez-moi ${photographerId.name}`;
