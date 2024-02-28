/* exported photographerTemplate */
/* eslint-disable-next-line no-unused-vars */
function photographerTemplate(data, media) {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  const photographerUrl = `photographer.html?id=${id}`; // URL de la page du photographe

  // Calcul du total des likes
  // const totalLikes = media.reduce((acc, curr) => acc + curr.likes, 0);

  function getUserCardDOM() {
    const article = document.createElement("article");

    // Création du lien autour de l'image
    const linkPhotographer = document.createElement("a");
    linkPhotographer.setAttribute("href", photographerUrl);
    linkPhotographer.setAttribute("aria-label", "Aller à la page " + name);
    article.appendChild(linkPhotographer); // Ajout du lien dans l'article

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    linkPhotographer.appendChild(img); // Ajout du lien autour de l'image

    // Création du lien autour du titre (h2)
    const titleLink = document.createElement("a");
    titleLink.setAttribute("href", photographerUrl);
    titleLink.setAttribute("aria-label", "Aller à la page " + name);
    article.appendChild(titleLink); // Ajout du lien autour du titre à l'article

    const h2 = document.createElement("h2");
    h2.textContent = name;
    titleLink.appendChild(h2); // Ajout du titre dans le lien

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

    // <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
    const button = document.createElement("button");
    button.classList.add("contact_button");
    button.textContent = "Contactez-moi";
    // Ajout de l'événement onclick
    button.onclick = function () {
      displayModal();
    };

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);

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
