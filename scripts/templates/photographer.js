/* exported photographerTemplate */
/* eslint-disable-next-line no-unused-vars */
function photographerTemplate(data) {
  const { id, name, portrait, city, country, tagline, price } = data;

  const photographerUrl = `photographer.html?id=${id}`; // URL de la page du photographe

  const picture = `assets/photographers/${portrait}`; // miniature du photographe

  function getUserCardDOM() {
    const article = document.createElement("article");

    // Création du lien autour de l'image
    const linkPhotographer = document.createElement("a");
    linkPhotographer.setAttribute("href", photographerUrl);
    linkPhotographer.setAttribute("aria-label", "Voir la page de " + name);
    article.appendChild(linkPhotographer); // Ajout du lien dans l'article
    const zoom = document.createElement("div");
    zoom.classList.add("zoom");
    linkPhotographer.appendChild(zoom);
    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");
    zoom.appendChild(img);

    // On vérifie que l'on cible bien l'image que l'on veut personnaliser
    if (picture === "assets/photographers/TracyGalindo.jpg") {
      img.classList.add("custom-zoom-galindo"); 
    }

    if (picture === "assets/photographers/NabeelBradford.jpg") {
      img.classList.add("custom-zoom-bradford"); 
    }

    const h2 = document.createElement("h2");
    h2.textContent = name;
    linkPhotographer.appendChild(h2); // Ajout du titre dans le lien

    const location = document.createElement("p");
    location.classList.add("location");
    location.textContent = city + ", " + country;
    const baseline = document.createElement("p");
    baseline.classList.add("baseline");
    baseline.textContent = tagline;
    const pricing = document.createElement("p");
    pricing.classList.add("pricing");
    pricing.textContent = price + "€/jour";
    article.appendChild(location);
    article.appendChild(baseline);
    article.appendChild(pricing);

    return article;
  }

  function getUserHeaderDOM() {
    const profileZone = document.createElement("section");
    profileZone.classList.add("profile-zone");

    const photographerProfile = document.createElement("div");
    photographerProfile.classList.add("photographer-profile");

    const h1 = document.createElement("h1");
    h1.textContent = name;

    const location = document.createElement("p");
    location.classList.add("location");
    location.textContent = city + ", " + country;

    const baseline = document.createElement("p");
    baseline.classList.add("baseline");
    baseline.textContent = tagline;

    const button = document.createElement("button");
    button.classList.add("contact_button");
    button.textContent = "Contactez-moi";
    // Ajout de l'événement onclick
    button.onclick = function () {
      /* eslint-disable-next-line no-undef */
      displayModal();
    };

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", "");

    profileZone.appendChild(photographerProfile);
    photographerProfile.appendChild(h1);
    photographerProfile.appendChild(location);
    photographerProfile.appendChild(baseline);
    profileZone.appendChild(button);
    profileZone.appendChild(img);

    return profileZone;
  }

  return {
    getUserCardDOM,
    getUserHeaderDOM,
  };
}
