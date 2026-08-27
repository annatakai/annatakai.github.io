document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector(".intro-wrapper");
  const container = document.querySelector(".intro");
  if (!wrapper || !container) return;

  const words = [];
  container.querySelectorAll("p").forEach((p) => {
    const parts = p.textContent.split(" ");
    p.textContent = "";
    parts.forEach((part, i) => {
      const span = document.createElement("span");
      span.className = "word";
      span.textContent = part;
      p.appendChild(span);
      words.push(span);
      if (i < parts.length - 1) {
        p.appendChild(document.createTextNode(" "));
      }
    });
  });

  function update() {
    const rect = wrapper.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    const progress = scrollable > 0 ? -rect.top / scrollable : 0;
    const clamped = Math.min(1, Math.max(0, progress));
    const activeCount = Math.floor(clamped * words.length);
    words.forEach((w, i) => w.classList.toggle("active", i < activeCount));
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
});
