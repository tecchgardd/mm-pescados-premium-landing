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

  const sourceEl = heroVideo.querySelector('source');
  if (sourceEl) {
    sourceEl.src = heroVideoSources[index];
  } else {
    heroVideo.src = heroVideoSources[index];
  }
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

const MM_PRODUCTS = [
  {
    name: "File de Tilapia",
    category: "Peixe fresco",
    description: "File de tilapia selecionado, limpo e pronto para receitas leves, grelhados e porcoes familiares.",
    images: ["assets/FOTOS/Tilapia/tilapia 1.jpeg", "assets/FOTOS/Tilapia/tilapia fresca.jpeg", "assets/FOTOS/Tilapia/tilapia inteira.jpeg"],
  },
  {
    name: "Tilapia Inteira",
    category: "Peixe fresco",
    description: "Tilapia inteira com frescor garantido, ideal para assar, rechear ou preparar na brasa.",
    images: ["assets/FOTOS/Tilapia/tilapia inteira.jpeg", "assets/img/p2.jpeg", "assets/img/p4.jpeg"],
  },
  {
    name: "Posta de Tainha",
    category: "Cortes selecionados",
    description: "Postas de tainha bem cortadas, com textura firme e sabor marcante para preparos tradicionais.",
    images: ["assets/FOTOS/Tainha/posta tainha.jpeg", "assets/FOTOS/Tainha/cortes de tainha.jpeg", "assets/FOTOS/Tainha/tainhas.jpeg"],
  },
  {
    name: "File de Tainha",
    category: "File premium",
    description: "File de tainha limpo e pratico para quem busca sabor de peixe fresco com preparo rapido.",
    images: ["assets/FOTOS/Tainha/files de tainhas .jpeg", "assets/FOTOS/Tainha/tainhas 1.jpeg", "assets/FOTOS/Tainha/tainhas ovadas.jpeg"],
  },
  {
    name: "Camarao Branco",
    category: "Frutos do mar",
    description: "Camarao branco fresco, versatil para risotos, massas, moquecas e porcoes especiais.",
    images: ["assets/FOTOS/Camarao/CAMARAO BRANCO.jpeg", "assets/FOTOS/Camarao/Branco fresco .jpeg", "assets/FOTOS/Camarao/Camarao granel.jpeg"],
  },
  {
    name: "Camarao Rosa",
    category: "Frutos do mar",
    description: "Camarao rosa selecionado, com sabor delicado e excelente apresentacao para pratos premium.",
    images: ["assets/FOTOS/Camarao/camarao rosa .jpeg", "assets/FOTOS/Camarao/camarao rosa congelado.jpeg", "assets/FOTOS/Camarao/Camarao na bandeja.jpeg"],
  },
  {
    name: "Camarao Limpo",
    category: "Pronto para preparo",
    description: "Camarao limpo e eviscerado para facilitar a rotina sem abrir mao da qualidade.",
    images: ["assets/FOTOS/Camarao/CAMARAO LIMPO.jpeg", "assets/FOTOS/Camarao/CAMARAO LIMPO LAGUNA.jpeg", "assets/FOTOS/Camarao/camarao limpos evicerados.jpeg"],
  },
  {
    name: "Camarao Empanado",
    category: "Empanados",
    description: "Camarao empanado crocante e pratico, excelente para entradas, lanches e porcoes.",
    images: ["assets/FOTOS/CAMARAO EMPANADOS.jpeg", "assets/FOTOS/Camarao/camarao 40 pcs.jpeg", "assets/FOTOS/Camarao/camarao molho .jpeg"],
  },
  {
    name: "Lombo de Bacalhau",
    category: "Especialidades",
    description: "Lombo de bacalhau com corte nobre, indicado para receitas especiais e datas comemorativas.",
    images: ["assets/FOTOS/Bacalhau/lombo bacalhau.jpeg", "assets/FOTOS/Nova pasta/PORCIONADOS.jpeg", "assets/FOTOS/kits/CORTE PICADOS.jpeg"],
  },
  {
    name: "Vieiras",
    category: "Frutos do mar",
    description: "Vieiras em bandeja, delicadas e sofisticadas para pratos de alto padrao.",
    images: ["assets/FOTOS/Vieiras/vieras Bandeja.jpeg", "assets/FOTOS/Nova pasta/mexilhao.jpeg", "assets/FOTOS/carne de siri.jpeg"],
  },
  {
    name: "Carne de Siri",
    category: "Frutos do mar",
    description: "Carne de siri selecionada, perfeita para casquinha, recheios, molhos e receitas praianas.",
    images: ["assets/FOTOS/carne de siri.jpeg", "assets/FOTOS/Siri/OLHETES 1.jpeg", "assets/FOTOS/Nova pasta/mexilhao.jpeg"],
  },
  {
    name: "Cavaquinha",
    category: "Frutos do mar",
    description: "Cavaquinha fresca, produto especial para quem procura sabor intenso e apresentacao elegante.",
    images: ["assets/FOTOS/Cavaquinhas/cavaquinha 1.jpeg", "assets/FOTOS/Cavaquinhas/cavaquinhas abertas.jpeg", "assets/FOTOS/Cavaquinhas/WhatsApp Image 2026-06-22 at 21.59.42.jpeg"],
  },
  {
    name: "Polvo Inteiro",
    category: "Frutos do mar",
    description: "Polvo inteiro selecionado para preparos macios, grelhados, arrozes e receitas mediterraneas.",
    images: ["assets/FOTOS/Polvos/polvo inteiro 2.jpeg", "assets/FOTOS/Polvos/polvo 1.jpeg", "assets/FOTOS/Polvos/polvo 2.jpeg"],
  },
  {
    name: "Tentaculos de Polvo",
    category: "Cortes selecionados",
    description: "Tentaculos de polvo porcionados para preparo pratico com acabamento de restaurante.",
    images: ["assets/FOTOS/Polvos/tentaculos.jpeg", "assets/FOTOS/Polvos/polvo congelados.jpeg", "assets/FOTOS/Polvos/polvo 2.jpeg"],
  },
  {
    name: "Lula Nacional",
    category: "Frutos do mar",
    description: "Lula nacional limpa, excelente para aneis, grelhados, ensopados e frutos do mar mistos.",
    images: ["assets/FOTOS/Lulas/LULA NACIONAL.jpeg", "assets/FOTOS/Robalo/LULAS anel.jpeg", "assets/FOTOS/Nova pasta/PORCIONADOS.jpeg"],
  },
  {
    name: "File de Dourado",
    category: "File premium",
    description: "File de dourado fresco, com carne firme e sabor suave para grelhados e assados.",
    images: ["assets/FOTOS/Dourado/file dourado.jpeg", "assets/FOTOS/Dourado/DOURADOS.jpeg", "assets/FOTOS/Dourado/dourados 2.jpeg"],
  },
  {
    name: "Dourado Inteiro",
    category: "Peixe fresco",
    description: "Dourado inteiro selecionado, ideal para preparo assado, recheado ou em postas.",
    images: ["assets/FOTOS/Dourado/DOURADOS.jpeg", "assets/FOTOS/Dourado/dourados 1.jpeg", "assets/FOTOS/Dourado/dourados 2.jpeg"],
  },
  {
    name: "Atum Sashimi",
    category: "Linha premium",
    description: "Atum para sashimi com corte nobre, indicado para preparos frios e pratos especiais.",
    images: ["assets/FOTOS/Atum/atum sashimi.jpeg", "assets/FOTOS/Atum/atum lombo.jpeg", "assets/FOTOS/Atum/ATUM 1.jpeg"],
  },
  {
    name: "Lombo de Atum",
    category: "Linha premium",
    description: "Lombo de atum com excelente textura, perfeito para selar, grelhar ou servir em fatias.",
    images: ["assets/FOTOS/Atum/atum lombo.jpeg", "assets/FOTOS/Atum/atum porcoes .jpeg", "assets/FOTOS/Atum/atum inteiro.jpeg"],
  },
  {
    name: "Atum Inteiro",
    category: "Peixe fresco",
    description: "Atum inteiro para cortes sob encomenda, com padrao de frescor MM Pescados.",
    images: ["assets/FOTOS/Atum/atum inteiro.jpeg", "assets/FOTOS/Atum/atum inteiro 2.jpeg", "assets/FOTOS/Atum/atum 3.jpeg"],
  },
  {
    name: "Salmao em File",
    category: "File premium",
    description: "File de salmao selecionado, versatil para grelhados, forno, poke e pratos especiais.",
    images: ["assets/FOTOS/Salmao/salmao files.jpeg", "assets/FOTOS/Salmao/salmao 1.jpeg", "assets/FOTOS/Salmao/SALMAO 3.jpeg"],
  },
  {
    name: "Salmao Sashimi",
    category: "Linha premium",
    description: "Salmao para sashimi com corte limpo e apresentacao caprichada.",
    images: ["assets/FOTOS/Salmao/salmao sashimi.jpeg", "assets/FOTOS/Salmao/salmao porcionado .jpeg", "assets/FOTOS/Salmao/corte salmao.jpeg"],
  },
  {
    name: "Salmao Porcionado",
    category: "Pronto para preparo",
    description: "Salmao porcionado para facilitar a rotina com porcoes praticas e padronizadas.",
    images: ["assets/FOTOS/Salmao/salmao porcionado .jpeg", "assets/FOTOS/Salmao/salmao cortes.jpeg", "assets/FOTOS/Salmao/salmao picado.jpeg"],
  },
  {
    name: "Robalo",
    category: "Peixe fresco",
    description: "Robalo fresco, peixe de carne branca e sabor delicado para preparos nobres.",
    images: ["assets/FOTOS/Robalo/RPBALOS.jpeg", "assets/FOTOS/Robalo/robalo 2.jpeg", "assets/FOTOS/Robalo/corte robalo.jpeg"],
  },
  {
    name: "Corte de Robalo",
    category: "Cortes selecionados",
    description: "Cortes de robalo feitos para preparo pratico, mantendo textura e sabor.",
    images: ["assets/FOTOS/Robalo/corte robalo.jpeg", "assets/FOTOS/Robalo/robalo 2.jpeg", "assets/FOTOS/Robalo/RPBALOS.jpeg"],
  },
  {
    name: "Garoupa",
    category: "Peixe fresco",
    description: "Garoupa fresca, muito valorizada pela carne firme e sabor elegante.",
    images: ["assets/FOTOS/Garoupa/garoupa inteira.jpeg", "assets/FOTOS/Garoupa/garoupa posta.jpeg", "assets/FOTOS/Dourado/file dourado.jpeg"],
  },
  {
    name: "Pescada Amarela",
    category: "Peixe fresco",
    description: "Pescada amarela selecionada, otima para postas, moquecas e preparos do dia a dia.",
    images: ["assets/FOTOS/Pescada Amarela/PESCADAS AMARELA .jpeg", "assets/FOTOS/Pescada Amarela/pescada amarela 2.jpeg", "assets/FOTOS/Pescada Branca/pescada branca .jpeg"],
  },
  {
    name: "Pescada Branca",
    category: "Peixe fresco",
    description: "Pescada branca fresca, leve e saborosa para receitas simples ou elaboradas.",
    images: ["assets/FOTOS/Pescada Branca/pescada branca .jpeg", "assets/FOTOS/Pescadinha/pescadinha.jpeg", "assets/FOTOS/Pescadinha/pescadinha .jpeg"],
  },
  {
    name: "Pescadinha",
    category: "Peixe fresco",
    description: "Pescadinha fresca para frituras, ensopados e refeicoes praticas com sabor de mar.",
    images: ["assets/FOTOS/Pescadinha/pescadinha.jpeg", "assets/FOTOS/Pescadinha/pescadinha .jpeg", "assets/FOTOS/Pescadinha/CORTE KITS.jpeg"],
  },
  {
    name: "Linguado",
    category: "Peixe fresco",
    description: "Linguado inteiro e fresco, conhecido pela carne delicada e preparo elegante.",
    images: ["assets/FOTOS/Linguados/linguados.jpeg", "assets/FOTOS/Linguados/linguado Inteiro.jpeg", "assets/FOTOS/Linguados/WhatsApp Image 2026-06-22 at 22.01.30.jpeg"],
  },
  {
    name: "Congrio",
    category: "Cortes selecionados",
    description: "Congrio fresco e porcionado, excelente para assados, ensopados e grelhados.",
    images: ["assets/FOTOS/Congrio/congrio fresco.jpeg", "assets/FOTOS/Congrio/congrio porcionado.jpeg", "assets/FOTOS/Congrio/congrio porcoes.jpeg"],
  },
  {
    name: "Lagosta",
    category: "Especialidades",
    description: "Lagosta selecionada para momentos especiais, com qualidade e apresentacao premium.",
    images: ["assets/FOTOS/Lagostas/lagostas.jpeg", "assets/FOTOS/Lagostas/lagostas 1.jpeg", "assets/FOTOS/Cavaquinhas/cavaquinhas abertas.jpeg"],
  },
  {
    name: "Kit Sashimi",
    category: "Kits especiais",
    description: "Kit sashimi com selecao de cortes para montar uma experiencia fresca em casa.",
    images: ["assets/FOTOS/kits/kit sashimi.jpeg", "assets/FOTOS/Atum/atum sashimi.jpeg", "assets/FOTOS/Salmao/salmao sashimi.jpeg"],
  },
  {
    name: "Kit Fitness",
    category: "Kits especiais",
    description: "Kit fitness com porcoes praticas para uma rotina leve, nutritiva e saborosa.",
    images: ["assets/FOTOS/kits/KIT FITNESS.jpeg", "assets/FOTOS/Nova pasta/PORCIONADOS.jpeg", "assets/FOTOS/Salmao/salmao porcionado .jpeg"],
  },
];

const PRODUCTS_PER_PAGE = 4;
let productPage = 1;
let activeProduct = null;
let activeImageIndex = 0;

function productWhatsAppUrl(productName) {
  const text = `Ola, vim pelo site da MM Pescados e quero fazer um pedido de ${productName}.`;
  return `https://wa.me/${MM_WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
}

function renderProducts() {
  const grid = document.getElementById("productGrid");
  const pagination = document.getElementById("productPagination");
  if (!grid || !pagination) return;

  const start = (productPage - 1) * PRODUCTS_PER_PAGE;
  const visibleProducts = MM_PRODUCTS.slice(start, start + PRODUCTS_PER_PAGE);

  grid.innerHTML = visibleProducts.map((product, index) => `
    <article class="showcase-card product-card reveal is-visible" style="--card-index:${index}">
      <button class="product-card__button" type="button" data-product-index="${start + index}" aria-label="Ver detalhes de ${product.name}">
        <div class="showcase-image">
          <img src="${product.images[0]}" alt="${product.name}" loading="lazy" decoding="async">
          <img class="card-logo" src="assets/img/mm-logo-oficial.png" alt="MM Pescados">
        </div>
        <div class="showcase-content">
          <span>${product.category}</span>
          <h3>${product.name}</h3>
        </div>
      </button>
    </article>
  `).join("");

  const pages = Math.ceil(MM_PRODUCTS.length / PRODUCTS_PER_PAGE);
  const dots = Array.from({ length: pages }, (_, index) => {
    const page = index + 1;
    return `<button class="product-carousel__dot${page === productPage ? " is-active" : ""}" type="button" data-page="${page}" aria-label="Ir para grupo ${page}"></button>`;
  }).join("");

  pagination.innerHTML = `
    <button class="product-carousel__arrow product-carousel__arrow--prev" type="button" data-page="${productPage === 1 ? pages : productPage - 1}" aria-label="Produtos anteriores">
      <i class="fa-solid fa-chevron-left"></i>
    </button>
    <div class="product-carousel__dots" aria-label="Grupos de produtos">${dots}</div>
    <button class="product-carousel__arrow product-carousel__arrow--next" type="button" data-page="${productPage === pages ? 1 : productPage + 1}" aria-label="Proximos produtos">
      <i class="fa-solid fa-chevron-right"></i>
    </button>
  `;
}

function updateModalImage() {
  const image = document.getElementById("modalImage");
  const dots = document.getElementById("modalDots");
  const thumbs = document.getElementById("modalThumbs");
  if (!activeProduct || !image || !dots) return;

  image.src = activeProduct.images[activeImageIndex];
  image.alt = activeProduct.name;
  dots.innerHTML = activeProduct.images.map((_, index) => `
    <button type="button" class="${index === activeImageIndex ? "is-active" : ""}" data-image-index="${index}" aria-label="Ver imagem ${index + 1}"></button>
  `).join("");

  if (thumbs) {
    thumbs.innerHTML = activeProduct.images.map((src, index) => `
      <button type="button" class="${index === activeImageIndex ? "is-active" : ""}" data-image-index="${index}" aria-label="Ver miniatura ${index + 1}">
        <img src="${src}" alt="${activeProduct.name} - imagem ${index + 1}" loading="lazy" decoding="async">
        <span>${index + 1}</span>
      </button>
    `).join("");
  }
}

function productUseText(product) {
  const category = `${product.category} ${product.name}`.toLowerCase();
  if (category.includes("camarao") || category.includes("frutos")) return "Risotos, massas, porcoes, grelhados e pratos especiais.";
  if (category.includes("sashimi") || category.includes("atum") || category.includes("salmao")) return "Sashimis, grelhados, pokes e preparos premium.";
  if (category.includes("empanado")) return "Entradas, porcoes crocantes, lanches e refeicoes praticas.";
  if (category.includes("kit")) return "Rotina pratica, preparo rapido e refeicoes equilibradas.";
  return "Ensopados, moquecas, assados e caldeiradas.";
}

function openProductModal(productIndex) {
  const modal = document.getElementById("productModal");
  activeProduct = MM_PRODUCTS[productIndex];
  activeImageIndex = 0;
  if (!modal || !activeProduct) return;

  document.getElementById("productModalCategory").textContent = activeProduct.category;
  document.getElementById("productModalTitle").textContent = activeProduct.name;
  document.getElementById("productModalDescription").textContent = activeProduct.description;
  document.getElementById("productModalBadge").querySelector("span").textContent = activeProduct.category;
  document.getElementById("productModalUse").textContent = productUseText(activeProduct);
  document.getElementById("productModalOrder").href = productWhatsAppUrl(activeProduct.name);
  updateModalImage();

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closeProductModal() {
  const modal = document.getElementById("productModal");
  modal?.classList.remove("is-open");
  modal?.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function setupProducts() {
  renderProducts();

  document.addEventListener("click", (event) => {
    const productButton = event.target.closest("[data-product-index]");
    const pageButton = event.target.closest("[data-page]");
    const modalClose = event.target.closest("[data-modal-close]");
    const imageDot = event.target.closest("[data-image-index]");

    if (productButton) {
      openProductModal(Number(productButton.dataset.productIndex));
    }

    if (pageButton) {
      productPage = Number(pageButton.dataset.page);
      renderProducts();
      document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (modalClose) {
      closeProductModal();
    }

    if (imageDot && activeProduct) {
      activeImageIndex = Number(imageDot.dataset.imageIndex);
      updateModalImage();
    }
  });

  document.getElementById("modalPrev")?.addEventListener("click", () => {
    if (!activeProduct) return;
    activeImageIndex = (activeImageIndex - 1 + activeProduct.images.length) % activeProduct.images.length;
    updateModalImage();
  });

  document.getElementById("modalNext")?.addEventListener("click", () => {
    if (!activeProduct) return;
    activeImageIndex = (activeImageIndex + 1) % activeProduct.images.length;
    updateModalImage();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeProductModal();
  });
}

document.addEventListener("DOMContentLoaded", setupProducts);
