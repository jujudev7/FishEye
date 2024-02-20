function mediaFactory(data, photographerId) {
  const { image, video, title, likes } = data;

  const mediaPhoto = `assets/medias/${photographerId}/${image}`;
  // On vérifie si video est défini
  const mediaVideo = video ? `assets/medias/${photographerId}/${video}` : null;

  function getUserGalleryDOM() {
    const figure = document.createElement("figure");
    const captionLikes = document.createElement("div");
    captionLikes.classList.add("caption-likes");
    const figCaption = document.createElement("figcaption");
    figCaption.textContent = title;
    const likesZone = document.createElement("div");
    likesZone.classList.add("likes-zone");
    const nbLikes = document.createElement("span")
    nbLikes.classList.add("likes");
    nbLikes.textContent = likes;
    const heartIcon = document.createElement("i");
    heartIcon.className = "fa-solid fa-heart";

    const format = "video/mp4";

    // On vérifie si mediaVideo est défini avant de créer l'élément vidéo
    if (mediaVideo) {
      const videoElement = document.createElement("video");
      const sourceVideo = document.createElement("source");
      // videoElement.setAttribute("controls", "false");
      sourceVideo.setAttribute("src", mediaVideo);
      sourceVideo.setAttribute("alt", title);
      sourceVideo.setAttribute("type", format);
      videoElement.appendChild(sourceVideo);
      figure.appendChild(videoElement); // on ajoute la vidéo à figure
      figure.appendChild(captionLikes); 
      captionLikes.appendChild(figCaption); 
      captionLikes.appendChild(likesZone); 
      likesZone.appendChild(nbLikes); 
      likesZone.appendChild(heartIcon); 
    } else {
      const img = document.createElement("img");
      img.setAttribute("src", mediaPhoto);
      img.setAttribute("alt", title);
      figure.appendChild(img); // on ajoute l'image à figure
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
