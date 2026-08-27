document.addEventListener("DOMContentLoaded", () => {
  const grids = document.querySelectorAll(".gallery-grid");
  const buttons = document.querySelectorAll(".gallery-controls button");

  function layoutMasonry(grid) {
    if (grid.classList.contains("cropped")) return;
    const rowHeight = parseInt(getComputedStyle(grid).getPropertyValue("grid-auto-rows"), 10) || 10;
    const rowGap = parseInt(getComputedStyle(grid).getPropertyValue("row-gap"), 10) || 0;
    grid.querySelectorAll(".cell").forEach((cell) => {
      const img = cell.querySelector("img");
      const contentHeight = img ? img.getBoundingClientRect().height : cell.getBoundingClientRect().height;
      const rowSpan = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));
      cell.style.gridRowEnd = "span " + rowSpan;
    });
  }

  function layoutAll() {
    grids.forEach(layoutMasonry);
  }

  if (buttons.length && grids.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        grids.forEach((grid) => {
          grid.classList.remove("size-s", "size-m", "size-l");
          grid.classList.add("size-" + btn.dataset.size);
        });
        layoutAll();
      });
    });
  }

  grids.forEach((grid) => {
    const images = grid.querySelectorAll(".cell img");
    images.forEach((img) => {
      if (!img.complete) {
        img.addEventListener("load", () => layoutMasonry(grid));
        img.addEventListener("error", () => layoutMasonry(grid));
      }
    });
  });

  if (grids.length) {
    layoutAll();
    window.addEventListener("resize", layoutAll);
    window.addEventListener("load", layoutAll);
  }

  document.querySelectorAll(".gallery-grid.cropped .cell").forEach((cell) => {
    cell.addEventListener("click", () => {
      cell.classList.remove("popped");
      void cell.offsetWidth;
      cell.classList.add("popped");
    });
    cell.addEventListener("animationend", () => {
      cell.classList.remove("popped");
    });
  });
});
