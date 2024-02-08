//Mettre le code JavaScript lié à la page photographer.html

async function getOnePhotographer() {
  const response = await fetch("data/photographers.json");
  if (response.ok === true) {
    return response.json();
  }
  throw new Error("Impossible de contacter le serveur");
}

async function displayOnePhotographer(photographers) {
  const queryString = window.location.search; // on récupère la partie de l'URL qui contient les paramètres de requête (ce qui suit le ?)
  const urlParams = new URLSearchParams(queryString); // on crée un nouvel objet URLSearchParams à partir de la requête (queryString) obtenue précédemment. Cet objet permet de manipuler facilement les paramètres de la requête.
  const id = urlParams.get("id"); // on utilise la méthode get() de l'objet URLSearchParams pour obtenir la valeur du paramètre "id" de l'URL

  const photographersHeader = document.querySelector(".photograph-header");

  photographers.forEach((photographer) => {
    if (photographer.id != id) return; // si l'identifiant (id) du photographe actuellement parcouru dans la boucle est différent de l'identifiant récupéré à partir des paramètres de requête de l'URL, alors la boucle passe immédiatement au prochain photographe sans exécuter le reste du code à l'intérieur de la boucle

    //On construit le header
    const photographerHeader = photographerTemplate(photographer);
    const userHeaderDOM = photographerHeader.getUserHeaderDOM();
    photographersHeader.appendChild(userHeaderDOM);

  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getOnePhotographer();
  displayOnePhotographer(photographers)
}

init();
