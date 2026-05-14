const MM_WHATSAPP_PHONE = "554830244024";
const MM_WHATSAPP_TEXT = "Olá, vim pelo site da MM Pescados e quero fazer um pedido.";
const MM_WHATSAPP_URL = `https://wa.me/${MM_WHATSAPP_PHONE}?text=${encodeURIComponent(MM_WHATSAPP_TEXT)}`;

const loader = document.getElementById("loader");
const header = document.getElementById("header");
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const heroVideo = document.getElementById("heroVideo");

const heroVideoSources = [
  "assets/videos/v1.mp4",
  "assets/videos/v2.mp4",
  "assets/videos/v3.mp4",
];

let currentHeroVideo = 0;

function setHeroVideo(index) {
  if (!heroVideo || !heroVideoSources[index]) return;

  heroVideo.src = heroVideoSources[index];
  heroVideo.load();

  const playPromise = heroVideo.play();
  if (playPromise) {
    playPromise.catch(() => {
      // Alguns navegadores bloqueiam autoplay em certos cenários.
    });
  }
}

function setupWhatsAppLinks() {
  document.querySelectorAll('a[href*="wa.me"], .whatsapp-float').forEach((link) => {
    link.setAttribute("href", MM_WHATSAPP_URL);
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener");
    link.setAttribute("aria-label", link.getAttribute("aria-label") || "Falar com a MM Pescados pelo WhatsApp");
  });
}

function setupMobileMenu() {
  navToggle?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("is-open");
    navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  });

  document.querySelectorAll(".nav a").forEach((link) => {
    link.addEventListener("click", () => {
      nav?.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
      navToggle?.setAttribute("aria-label", "Abrir menu");
    });
  });
}

function setupRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");

  if (!revealItems.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add("is-visible"), index * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -70px 0px",
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupPremiumCardEffect() {
  document.querySelectorAll(".premium-card, .review-card").forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      card.style.background = `
        radial-gradient(circle at ${x}% ${y}%, rgba(96, 205, 253, 0.22), transparent 30%),
        radial-gradient(circle at top right, rgba(18, 136, 232, 0.24), transparent 38%),
        linear-gradient(180deg, rgba(255,255,255,0.13), rgba(255,255,255,0.045))
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.background = "";
    });
  });
}

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 30);
}, { passive: true });




function hideLoader() {
  loader?.classList.add("is-hidden");
}

window.addEventListener("load", () => {
  hideLoader();
  setHeroVideo(currentHeroVideo);
});

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(hideLoader, 1200);
});

heroVideo?.addEventListener("ended", () => {
  currentHeroVideo = (currentHeroVideo + 1) % heroVideoSources.length;
  setHeroVideo(currentHeroVideo);
});

heroVideo?.addEventListener("error", () => {
  currentHeroVideo = (currentHeroVideo + 1) % heroVideoSources.length;
  setHeroVideo(currentHeroVideo);
});

setupWhatsAppLinks();
setupMobileMenu();
setupRevealAnimations();
setupPremiumCardEffect();


/* FIX AUTOPLAY MOBILE */
document.addEventListener("DOMContentLoaded", () => {
  const heroVideo = document.getElementById("heroVideo");

  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.defaultMuted = true;
    heroVideo.autoplay = true;
    heroVideo.playsInline = true;
    heroVideo.setAttribute("muted", "");
    heroVideo.setAttribute("autoplay", "");
    heroVideo.setAttribute("playsinline", "");
    heroVideo.setAttribute("webkit-playsinline", "");

    const playPromise = heroVideo.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {})
        .catch(() => {
          document.addEventListener(
            "touchstart",
            () => {
              heroVideo.play();
            },
            { once: true }
          );
        });
    }
  }
});
