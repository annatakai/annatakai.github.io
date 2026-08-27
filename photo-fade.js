document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".photo-fade-wrapper");
  const items = document.querySelectorAll(".photo-fade-item");
  if (!wrapper || !items.length) return;

  const n = items.length;

  function update() {
    const rect = wrapper.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    const progress = scrollable > 0 ? -rect.top / scrollable : 0;
    const clamped = Math.min(1, Math.max(0, progress));

    items.forEach((item, i) => {
      const center = (i + 0.5) / n;
      const halfWidth = 0.5 / n;
      const distance = Math.abs(clamped - center);
      const opacity = Math.max(0, 1 - distance / halfWidth);
      item.style.opacity = opacity;
    });
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
});
