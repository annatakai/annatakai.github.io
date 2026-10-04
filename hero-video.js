document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  const video = document.getElementById("hero-video");
  const muteBtn = document.getElementById("mute-toggle");
  if (!hero || !video || !muteBtn) return;

  muteBtn.addEventListener("click", () => {
    video.muted = !video.muted;
    muteBtn.classList.toggle("is-muted", video.muted);
    muteBtn.setAttribute("aria-pressed", String(!video.muted));
    muteBtn.setAttribute("aria-label", video.muted ? "unmute video" : "mute video");
  });

  function updatePlayback() {
    const rect = hero.getBoundingClientRect();
    const inView = rect.bottom > 0 && rect.top < window.innerHeight;
    if (inView) {
      if (video.paused) video.play().catch(() => {});
    } else if (!video.paused) {
      video.pause();
    }
  }

  window.addEventListener("scroll", updatePlayback, { passive: true });
  window.addEventListener("resize", updatePlayback);
  updatePlayback();
});
