/* exported mediaFactory */
/* eslint-disable-next-line no-unused-vars */
function mediaFactory(data, photographerId) {
  const { image, video, title, likes } = data;

  const mediaPhoto = `assets/medias/${photographerId}/${image}`;
  // On vérifie si video est défini
  const mediaVideo = video ? `assets/medias/${photographerId}/${video}` : null;

  function getUserGalleryDOM() {
    const figure = document.createElement("figure");
    figure.tabIndex = 0;
    const captionLikes = document.createElement("div");
    captionLikes.classList.add("caption-likes");
    const figCaption = document.createElement("figcaption");
    figCaption.textContent = title;
    const likesZone = document.createElement("div");
    likesZone.classList.add("likes-zone");
    const nbLikes = document.createElement("span");
    nbLikes.classList.add("likes");
    nbLikes.textContent = likes;
    const heartIcon = document.createElement("i");
    heartIcon.className = "fa-solid fa-heart";

    const format = "video/mp4";

    // On vérifie si mediaVideo est défini avant de créer l'élément vidéo
    if (mediaVideo) {
      const videoElement = document.createElement("video");
      // videoElement.setAttribute("poster", "assets/icons/player-logo.png")
      const sourceVideo = document.createElement("source");
      // videoElement.setAttribute("controls", "false");
      sourceVideo.setAttribute("src", mediaVideo);
      sourceVideo.setAttribute("alt", title);
      sourceVideo.setAttribute("type", format);
      const overlayVideo = document.createElement("div");
      overlayVideo.classList.add("overlay-video");
      const playerLogo = document.createElement("img")
      playerLogo.setAttribute("src", "assets/icons/player-logo.png");

      videoElement.appendChild(sourceVideo);
      overlayVideo.appendChild(playerLogo);
      figure.appendChild(videoElement); 
      figure.appendChild(overlayVideo);
      captionLikes.appendChild(figCaption); 
      captionLikes.appendChild(likesZone); 
      likesZone.appendChild(nbLikes); 
      likesZone.appendChild(heartIcon); 
      figure.appendChild(captionLikes);
      
    } else {
      const img = document.createElement("img");
      img.setAttribute("src", mediaPhoto);
      img.setAttribute("alt", title);
      figure.appendChild(img); 
      figure.appendChild(captionLikes); 
      captionLikes.appendChild(figCaption); 
      captionLikes.appendChild(likesZone); 
      likesZone.appendChild(nbLikes); 
      likesZone.appendChild(heartIcon); 
    }

    return figure;
  }
  return { image, video, mediaPhoto, mediaVideo, getUserGalleryDOM };
}
