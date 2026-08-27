(function () {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.scrollTo(0, 0);

  const overlay = document.getElementById("intro-overlay");
  if (!overlay) return;

  const textEl = overlay.querySelector(".intro-text");
  const fullText = "anna takai";
  let i = 0;

  document.body.style.overflow = "hidden";

  function typeNext() {
    textEl.textContent = fullText.slice(0, i);
    i++;
    if (i <= fullText.length) {
      setTimeout(typeNext, 220);
    } else {
      setTimeout(finish, 1000);
    }
  }

  function finish() {
    window.scrollTo(0, 0);
    overlay.classList.add("hide");
    document.body.style.overflow = "";
    setTimeout(() => overlay.remove(), 1850);
  }

  typeNext();
})();
