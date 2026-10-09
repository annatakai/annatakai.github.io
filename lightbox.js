document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.createElement("div");
  overlay.className = "lightbox-overlay";
  const overlayImg = document.createElement("img");
  overlay.appendChild(overlayImg);
  document.body.appendChild(overlay);

  function openLightbox(img) {
    overlayImg.src = img.src;
    overlayImg.alt = img.alt || "";
    overlay.classList.add("active");
  }

  function closeLightbox() {
    overlay.classList.remove("active");
  }

  document.querySelectorAll(".gallery-grid .cell img").forEach((img) => {
    img.addEventListener("click", (e) => {
      e.stopPropagation();
      openLightbox(img);
    });
  });

  overlay.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
});
