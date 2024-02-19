function displayLightbox() {
  const lightbox = document.querySelector(".lightbox");
  lightbox.style.display = "block";
  lightbox.setAttribute("aria-hidden", "false");
  lightbox.setAttribute("role", "dialog");

  // Ajouter un filtre blanc sur le corps de la page
  const bodyOverlay = document.querySelector("body");
  bodyOverlay.classList.add("body-overlay");
  // document.body.appendChild(bodyOverlay);
}

function closeLightbox() {
  const lightbox = document.querySelector(".lightbox");
  lightbox.style.display = "none";
  lightbox.setAttribute("aria-hidden", "true");
}

const btnCloseLightbox = document.querySelector("button");
