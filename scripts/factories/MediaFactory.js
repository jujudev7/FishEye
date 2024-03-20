/* exported mediaFactory */
/* eslint-disable-next-line no-unused-vars */
function mediaFactory(data, photographerId, mediaId) {
  const { image, video, title_fr, likes, descFr } = data;

  const mediaPhoto = `assets/medias/${photographerId}/${image}`;
  // On vérifie si video est défini
  const mediaVideo = video ? `assets/medias/${photographerId}/${video}` : null;

  function getUserGalleryDOM() {
    const figure = document.createElement("figure");
    // figure.setAttribute("role", "figure");
    const captionLikes = document.createElement("div");
    captionLikes.classList.add("caption-likes");
    const figCaption = document.createElement("figcaption");
    figCaption.setAttribute("aria-hidden", "true");
    figCaption.textContent = title_fr;
    const likesZone = document.createElement("div");
    likesZone.classList.add("likes-zone");
    const nbLikes = document.createElement("span");
    nbLikes.classList.add("likes");
    nbLikes.textContent = likes;
    const heartIcon = document.createElement("i");
    heartIcon.className = "fa-solid fa-heart";
    heartIcon.setAttribute("tabindex", "0");
    heartIcon.setAttribute("aria-hidden", "true");
    heartIcon.setAttribute("aria-label", "likes");
    heartIcon.setAttribute("data-id", mediaId);
    const spanIconHeart = document.createElement("span");
    spanIconHeart.classList.add("sr-only");
    spanIconHeart.textContent = likes + " likes";

    const format = "video/mp4";

    const descriptionFr = document.createElement("div");
    descriptionFr.id = "videoDescription";
    descriptionFr.classList.add("sr-only");
    descriptionFr.textContent = "Description de la vidéo : " + descFr;

    // On vérifie si mediaVideo est défini avant de créer l'élément vidéo
    if (mediaVideo) {
      const videoElement = document.createElement("video");
      const sourceVideo = document.createElement("source");
      sourceVideo.setAttribute("src", mediaVideo);
      sourceVideo.setAttribute("alt", title_fr);
      sourceVideo.setAttribute("type", format);
      const overlayVideo = document.createElement("div");
      overlayVideo.classList.add("overlay-video");
      const playerLogo = document.createElement("img");
      playerLogo.setAttribute("src", "assets/icons/player-logo.png");
      playerLogo.setAttribute("alt", "Vidéo sans audio");

      videoElement.appendChild(sourceVideo);
      videoElement.appendChild(descriptionFr);
      videoElement.tabIndex = 0;
      overlayVideo.appendChild(playerLogo);
      figure.appendChild(videoElement);
      figure.appendChild(overlayVideo);
      captionLikes.appendChild(figCaption);
      captionLikes.appendChild(likesZone);
      likesZone.appendChild(nbLikes);
      likesZone.appendChild(heartIcon);
      likesZone.appendChild(spanIconHeart);
      figure.appendChild(captionLikes);
    } else {
      const img = document.createElement("img");
      img.tabIndex = 0;
      img.setAttribute("src", mediaPhoto);
      img.setAttribute("alt", title_fr);
      figure.appendChild(img);
      figure.appendChild(captionLikes);
      captionLikes.appendChild(figCaption);
      captionLikes.appendChild(likesZone);
      likesZone.appendChild(nbLikes);
      likesZone.appendChild(heartIcon);
      likesZone.appendChild(spanIconHeart);
    }

    return figure;
  }
  return { image, video, mediaPhoto, mediaVideo, getUserGalleryDOM };
}
