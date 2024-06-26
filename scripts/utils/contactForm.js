/* exported displayModal */
/* eslint-disable-next-line no-unused-vars */
function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
  modal.setAttribute("aria-hidden", "false");
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-label", "Formulaire de contact");

  const modalDialog = modal.querySelector(".modal");
  modalDialog.focus();

  // Empêcher le focus de sortir de la modale
  modal.addEventListener("keydown", function (event) {
    if (event.key === "Tab") {
      const focusableElements = modal.querySelectorAll(
        "button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])"
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    }
  });

  // Définir le focus initial
  const firstnameInput = modal.querySelector("#firstname");
  if (firstnameInput) {
    firstnameInput.focus();
  }
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
}

// Gestionnaire d'événement pour la touche Échap
document.addEventListener("keydown", function (event) {
  const modal = document.getElementById("contact_modal");
  if (event.key === "Escape" && modal.style.display === "block") {
    closeModal();
  }
});

// Gestionnaire d'événement pour la croix (fermer)
const closeBtn = document.querySelector(".modal img");

closeBtn.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.stopPropagation(); // Empêche la propagation de l'événement
    closeModal();
  }
});

// Gestionnaire d'événement pour empêcher le focus en dehors de la modale
document.addEventListener("focusout", function (event) {
  const modal = document.getElementById("contact_modal");
  const modalDialog = modal.querySelector(".modal");
  if (!modalDialog.contains(event.target)) {
    modalDialog.focus();
  }
});

// Récupérer l'ID du photographe à partir de la query string de l'URL
const urlParams = new URLSearchParams(window.location.search);
const photographerId = parseInt(urlParams.get("id"));

// Afficher le prénom du photographe dans le h2 du form
document.querySelector(
  "header h2"
).textContent = `Contactez-moi ${photographerId.name}`;

const form = document.querySelector("form");

// On ajoute un écouteur d'évènement au moment du submit
form.addEventListener("submit", (event) => {
  // On empêche le comportement par défaut du formulaire s'il n'est pas valide (soumission et rechargement de la page)
  event.preventDefault();
  if (validate()) {
    closeModal();
    // launchModalConfirmation();
    form.reset(); // on reset les valeurs, vide les champs
    resetStyleClasses(); // on supprime les classes "valid" / "invalid"
  }
});

function validate() {
  // on récupère la valeur des différents champs
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // on sélectionne les inputs, dans le but d'afficher à l'utilisateur s'il est valide ou non
  const inputFirstname = document.getElementById("firstname");
  const inputLastname = document.getElementById("lastname");
  const inputEmail = document.getElementById("email");
  const inputMessage = document.getElementById("message");

  // Expression régulière pour vérifier si le prénom contient uniquement des lettres
  const patternText = /^[A-Za-zÀ-ÿ\-']+$/;

  const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  // ^: Début de la string
  // [^\s@]+: Un ou plusieurs caractères qui ne sont ni des espace ni '@' (partie du mail AVANT l'arobase)
  // @: Le caractère "@".
  // [^\s@]+: Un ou plusieurs caractères qui ne sont ni des espace ni '@' (partie du mail APRÈS l'arobase)
  // \.: Le point ".", qui est échappé car il a un sens particulier en regex.
  // [^\s@]{2,}: indique que la séquence de caractère après le point ("."), c.à.d. le nom de l'extension du domaine, doit faire au moins 2 caractères, qui ne sont ni des espaces, ni '@' jusqu'à la fin de la string "$"

  // on sélectionne les "zones d'erreur" afin d'envoyer un message lorsque l'on rencontre une erreur
  const errorFirstname = document.getElementById("error-firstname");
  const errorLastname = document.getElementById("error-lastname");
  const errorEmail = document.getElementById("error-email");
  const errorMessage = document.getElementById("error-message");

  let isValid = true;

  // Validation du Prénom
  if (firstname.trim() == "") {
    errorFirstname.textContent = "* Veuillez renseigner votre prénom svp";
    inputFirstname.classList.add("invalid");
    inputFirstname.setAttribute("aria-invalid", "true");
    isValid = false;
  } else if (!patternText.test(firstname.trim())) {
    errorFirstname.textContent = "* Veuillez renseigner un prénom valide svp";
    inputFirstname.classList.add("invalid");
    inputFirstname.setAttribute("aria-invalid", "true");
    isValid = false;
  } else if (firstname.trim().length < 2) {
    errorFirstname.textContent = "* Votre prénom est trop court !";
    inputFirstname.classList.add("invalid");
    inputFirstname.setAttribute("aria-invalid", "true");
    inputFirstname.classList.remove("valid");
    isValid = false;
  } else {
    inputFirstname.classList.add("valid");
    inputFirstname.removeAttribute("aria-invalid");
    errorFirstname.textContent = "";
  }

  // Validation du Nom
  if (lastname.trim() == "") {
    errorLastname.textContent =
      "* Veuillez renseigner votre nom de famille svp";
    inputLastname.classList.add("invalid");
    inputLastname.setAttribute("aria-invalid", "true");
    isValid = false;
  } else if (!patternText.test(lastname.trim())) {
    errorLastname.textContent =
      "* Veuillez renseigner un nom de famille valide svp";
    inputLastname.classList.add("invalid");
    inputLastname.setAttribute("aria-invalid", "true");
    isValid = false;
  } else if (lastname.trim().length < 2) {
    errorLastname.textContent = "* Votre nom est trop court !";
    inputLastname.classList.add("invalid");
    inputLastname.setAttribute("aria-invalid", "true");
    inputLastname.classList.remove("valid");
    isValid = false;
  } else {
    inputLastname.classList.add("valid");
    inputLastname.removeAttribute("aria-invalid");
    errorLastname.textContent = "";
  }

  // // Validation de l'Email
  if (!emailRegExp.test(email)) {
    // = if (emailRegExp.test(email) == false) {
    errorEmail.textContent = "* Veuillez saisir une adresse e-mail valide svp";
    inputEmail.classList.add("invalid");
    inputEmail.setAttribute("aria-invalid", "true");
    inputEmail.classList.remove("valid");
    isValid = false;
  } else {
    inputEmail.classList.add("valid");
    inputEmail.removeAttribute("aria-invalid");
    errorEmail.textContent = "";
  }

  // Validation du Message
  if (message.trim() == "") {
    errorMessage.textContent = "* Veuillez écrire votre message svp";
    inputMessage.classList.add("invalid");
    inputMessage.setAttribute("aria-invalid", "true");
    isValid = false;
  } else if (message.trim().length < 40) {
    errorMessage.textContent = "* Votre message est trop court !";
    inputMessage.classList.add("invalid");
    inputMessage.setAttribute("aria-invalid", "true");
    inputMessage.classList.remove("valid");
    isValid = false;
  } else {
    inputMessage.classList.add("valid");
    inputMessage.removeAttribute("aria-invalid");
    errorMessage.textContent = "";
  }

  console.log("prénom : " + firstname);
  console.log("nom : " + lastname);
  console.log("email : " + email);
  console.log("message : " + message);
  
  // Si toutes les validations sont OK, alors le formulaire est valide
  return isValid;
}

// On supprime les classes "valid" / "invalid" une fois que le formulaire est validé
function resetStyleClasses() {
  const fields = document.querySelectorAll("input, textarea");

  fields.forEach(function (field) {
    field.classList.remove("valid", "invalid");
  });
}
