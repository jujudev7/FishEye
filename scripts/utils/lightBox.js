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
}

const btnCloseLightbox = document.querySelector("button");

// // Gestionnaire d'événement pour fermer la lightbox en cliquant en dehors du média
// lightbox.addEventListener("click", function (event) {
//   if (event.target === lightbox) {
//     closeLightbox();
//   }
// });

// // Gestionnaire d'événement pour fermer la lightbox en appuyant sur la touche Escape
// document.addEventListener("keydown", function (event) {
//   if (event.key === "Escape") {
//     closeLightbox();
//   }
// });

// // Fonction pour fermer la lightbox
// function closeLightbox() {
//   lightbox.remove();
//   document.removeEventListener("keydown", closeLightbox);
// }