document.addEventListener("DOMContentLoaded", function () {

  /* ===============================
     REVEAL ANIMATIONS
  =============================== */

  const revealElements = document.querySelectorAll(
    ".reveal-up, .reveal-left, .reveal-right, .reveal-scale, .content-layout"
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));


  /* ===============================
     TIMELINE ANIMATION
  =============================== */

  /* ===============================
   RESULTS TIMELINE — CORRECT VERSION
=============================== */

const resultsTimeline = document.querySelector(
  ".results-timeline__checkpoint-ivory-ripple"
);

if (resultsTimeline) {

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {

        // Animate progress bars
        document.querySelectorAll(
          ".results-timeline__checkpoint-jade-ivory div, " +
          ".results-timeline__checkpoint-jade-jade, " +
          ".results-timeline__checkpoint-jade-uplift, " +
          ".results-timeline__checkpoint-jade-zenith, " +
          ".results-timeline__checkpoint-kindle-flare"
        ).forEach(bar => {
          bar.style.width = "100%";
        });

        // Animate percentage text appearance
        document.querySelectorAll(
          ".results-timeline__checkpoint-jade-ember, " +
          ".results-timeline__checkpoint-jade-thrive, " +
          ".results-timeline__checkpoint-jade-yonder, " +
          ".results-timeline__checkpoint-kindle-ember"
        ).forEach(percent => {
          percent.style.opacity = "1";
          percent.style.transform = "translateY(0)";
        });

      }
    });
  }, { threshold: 0.25 });

  timelineObserver.observe(resultsTimeline);
}


  /* ===============================
     HEADER SCROLL COLOR CHANGE
  =============================== */

  const header = document.querySelector("nav, .topnav, .sticky-nav");

  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 60) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }


  /* ===============================
     MOBILE MENU
  =============================== */

  const ham = document.querySelector(".ham");
  const mobMenu = document.querySelector(".mob-menu");
  const mobOverlay = document.querySelector(".mob-overlay");
  const mobClose = document.querySelector(".mob-close");

  function closeMenu() {
    if (mobMenu) mobMenu.classList.remove("open");
    if (mobOverlay) mobOverlay.classList.remove("open");
  }

  if (ham && mobMenu) {
    ham.addEventListener("click", () => {
      mobMenu.classList.add("open");
      mobOverlay.classList.add("open");
    });
  }

  if (mobClose) mobClose.addEventListener("click", closeMenu);
  if (mobOverlay) mobOverlay.addEventListener("click", closeMenu);


  /* ===============================
     MOBILE STICKY CTA
  =============================== */

  const mobCta = document.querySelector(".mob-cta");

  if (mobCta) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 600) {
        mobCta.classList.add("show");
      } else {
        mobCta.classList.remove("show");
      }
    });
  }

});