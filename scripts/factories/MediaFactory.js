function mediaFactory(data, photographerId) {
  const { image, video, title } = data;

  const mediaPhoto = `assets/medias/${photographerId}/${image}`;
  // On vérifie si video est défini
  const mediaVideo = video ? `assets/medias/${photographerId}/${video}` : null;

  function getUserGalleryDOM() {
    const figure = document.createElement("figure");
    const figCaption = document.createElement("figcaption");
    figCaption.textContent = title;

    const format = "video/mp4";
    // On vérifie si mediaVideo est défini avant de créer l'élément vidéo
    if (mediaVideo) {
      const videoElement = document.createElement("video");
      const sourceVideo = document.createElement("source");
      videoElement.setAttribute("controls", "");
      sourceVideo.setAttribute("src", mediaVideo);
      sourceVideo.setAttribute("alt", title);
      sourceVideo.setAttribute("type", format);
      videoElement.appendChild(sourceVideo);
      figure.appendChild(videoElement); // on ajoute la vidéo à figure
      figure.appendChild(figCaption); // on ajoute la légende à la vidéo
    } else {
      const img = document.createElement("img");
      img.setAttribute("src", mediaPhoto);
      img.setAttribute("alt", title);
      figure.appendChild(img); // on ajoute l'image à figure
      figure.appendChild(figCaption); // on ajoute la légende à l'image
    }

    return figure;
  }
  return { image, video, mediaPhoto, mediaVideo, getUserGalleryDOM };
}
