function photographerTemplate(data) {
  const { id, name, portrait, city, country, tagline, price } = data;

  const picture = `assets/photographers/${portrait}`;

  const photographerUrl = `photographer.html?id=${id}`; // URL de la page du photographe

  function getUserCardDOM() {
    const article = document.createElement("article");

    // Création du lien autour de l'image
    const linkPhotographer = document.createElement("a");
    linkPhotographer.setAttribute("href", photographerUrl);
    linkPhotographer.setAttribute("aria-label", "Aller à la page " + name);
    article.appendChild(linkPhotographer); // Ajout du lien autour de l'image à l'article

    const img = document.createElement("img");
    img.setAttribute("src", picture);
    img.setAttribute("alt", name);
    linkPhotographer.appendChild(img); // Ajout de l'image dans le lien

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
  return { name, picture, getUserCardDOM };
}
