async function getPhotographers() {
  const response = await fetch("data/photographers_fr.json");
  if (response.ok === true) {
    return response.json();
  }
  throw new Error("Impossible de contacter le serveur");
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    /* eslint-disable-next-line no-undef */
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });

  const a = document.querySelector(".photographer_section a");

  a.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      a.click();
    }
  });
}



async function init() {
  // On récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();


// Gestionnaire d"événement pour la touche Entrée
const logo = document.querySelector(".logo");

logo.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    logo.click();
  }
});

document.addEventListener("keydown", function(event) {
  const focusableElements = document.querySelectorAll("a");
  const focusedElement = document.activeElement;
  const index = Array.prototype.indexOf.call(focusableElements, focusedElement);

  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    if (index > 0) {
      focusableElements[index - 1].focus();
    } else {
      focusableElements[focusableElements.length - 1].focus();
    }
  } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    if (focusedElement.classList.contains("logo")) {
      focusableElements[0].focus(); // Change focus to the first focusable element
    } else if (index < focusableElements.length - 1) {
      focusableElements[index + 1].focus();
    } else {
      focusableElements[0].focus();
    }
  } 
});
