const MM_WHATSAPP_PHONE = "554830244024";
const MM_WHATSAPP_TEXT = "Olá, vim pelo site da MM Pescados e quero fazer um pedido.";
const MM_WHATSAPP_URL = `https://wa.me/${MM_WHATSAPP_PHONE}?text=${encodeURIComponent(MM_WHATSAPP_TEXT)}`;

const loader = document.getElementById("loader");
const header = document.getElementById("header");
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
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
});

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(hideLoader, 1200);
});

setupWhatsAppLinks();
setupMobileMenu();
setupRevealAnimations();
setupPremiumCardEffect();


const MM_PRODUCTS = [
  {
    folder: "Anchova",
    name: "Anchova",
    category: "Peixe fresco",
    description: "Anchova selecionada pela MM Pescados, ideal para assados, grelhados e preparos com sabor marcante.",
    images: ["assets/FOTOS/Anchova/ANCHOVA 3.jpeg", "assets/FOTOS/Anchova/ANCHOVA 1.jpeg", "assets/FOTOS/Anchova/ANCHOVA 4.jpeg", "assets/FOTOS/Anchova/ANCHOVA 5.jpeg"],
  },
  {
    folder: "Atum",
    name: "Atum",
    category: "Linha premium",
    description: "Atum de alto padrao para cortes nobres, pratos frios, grelhados e receitas especiais.",
    images: ["assets/FOTOS/Atum/ATUM 6.jpeg", "assets/FOTOS/Atum/ATUM 5.jpeg", "assets/FOTOS/Atum/ATUM 4.jpeg", "assets/FOTOS/Atum/atum 3.jpeg", "assets/FOTOS/Atum/ATUM 2.jpeg", "assets/FOTOS/Atum/ATUM 1.jpeg"],
  },
  {
    folder: "Bacalhau",
    name: "Bacalhau",
    category: "Especialidades",
    description: "Lombo de bacalhau com corte nobre para receitas especiais, datas comemorativas e pratos de destaque.",
    images: ["assets/FOTOS/Bacalhau/lombo bacalhau.jpeg", "assets/FOTOS/Bacalhau/lombo bacalhau 1.jpeg"],
  },
  {
    folder: "Camarao",
    name: "Camarao",
    category: "Frutos do mar",
    description: "Selecao de camaroes para risotos, massas, moquecas, porcoes e preparos especiais.",
    images: ["assets/FOTOS/Camarao/camaraocinza.jpeg", "assets/FOTOS/Camarao/CAMARAO ROSA.jpeg", "assets/FOTOS/Camarao/camarao rosa 2.jpeg", "assets/FOTOS/Camarao/camarao rosa 1.jpeg", "assets/FOTOS/Camarao/camarao lagostim.jpeg", "assets/FOTOS/Camarao/camarao cinza 2.jpeg", "assets/FOTOS/Camarao/camarao cinza 1.jpeg", "assets/FOTOS/Camarao/CAMARAO BRANCO.jpeg", "assets/FOTOS/Camarao/camarao branco 2.jpeg", "assets/FOTOS/Camarao/camarao braco 1.jpeg", "assets/FOTOS/Camarao/camarao 7 barbas.jpeg", "assets/FOTOS/Camarao/camarao 7 barbas 1.jpeg"],
  },
  {
    folder: "Cavaquinhas",
    name: "Cavaquinhas",
    category: "Frutos do mar",
    description: "Cavaquinhas selecionadas para pratos sofisticados, com sabor intenso e excelente apresentacao.",
    images: ["assets/FOTOS/Cavaquinhas/cavaquinha.jpeg", "assets/FOTOS/Cavaquinhas/cavaquinha 2.jpeg", "assets/FOTOS/Cavaquinhas/cavaquinha 1.jpeg"],
  },
  {
    folder: "Congrio",
    name: "Congrio",
    category: "Cortes selecionados",
    description: "Congrio com carne firme e versatil, excelente para assados, ensopados, grelhados e caldeiradas.",
    images: ["assets/FOTOS/Congrio/CONGRIO.jpeg", "assets/FOTOS/Congrio/CONGRIO 3.jpeg", "assets/FOTOS/Congrio/CONGRIO 2.jpeg"],
  },
  {
    folder: "Dourado",
    name: "Dourado",
    category: "Peixe fresco",
    description: "Dourado fresco, de sabor suave e carne firme, perfeito para assar, grelhar ou preparar em postas.",
    images: ["assets/FOTOS/Dourado/DOURADOS.jpeg", "assets/FOTOS/Dourado/dourados 2.jpeg", "assets/FOTOS/Dourado/dourados 1.jpeg"],
  },
  {
    folder: "EMPANADOS",
    name: "Empanados",
    category: "Prontos para preparo",
    description: "Opcoes empanadas praticas e crocantes para entradas, lanches, porcoes e refeicoes rapidas.",
    images: ["assets/FOTOS/EMPANADOS/EMPANADOS3.jpeg", "assets/FOTOS/EMPANADOS/EMPANADOS.jpeg", "assets/FOTOS/EMPANADOS/EMPANADOS2.jpeg"],
  },
  {
    folder: "Espada",
    name: "Espada",
    category: "Peixe fresco",
    description: "Peixe espada selecionado para receitas simples, saborosas e com boa textura no preparo.",
    images: ["assets/FOTOS/Espada/espada2.jpeg", "assets/FOTOS/Espada/espada1.jpeg"],
  },
  {
    folder: "Garoupa",
    name: "Garoupa",
    category: "Peixe fresco",
    description: "Garoupa fresca, valorizada pela carne firme e sabor elegante em preparos nobres.",
    images: ["assets/FOTOS/Garoupa/GAROUPA2.jpeg", "assets/FOTOS/Garoupa/GAROUPA1.jpeg"],
  },
  {
    folder: "kits",
    name: "Kits",
    category: "Kits especiais",
    description: "Kits selecionados para facilitar sua rotina com cortes praticos e combinacoes prontas.",
    images: ["assets/FOTOS/kits/KIT2.jpeg", "assets/FOTOS/kits/kit1.jpeg", "assets/FOTOS/kits/KIT3.jpeg"],
  },
  {
    folder: "Lagostas",
    name: "Lagostas",
    category: "Especialidades",
    description: "Lagostas selecionadas para momentos especiais, com qualidade premium e apresentacao marcante.",
    images: ["assets/FOTOS/Lagostas/lagostas1.jpeg", "assets/FOTOS/Lagostas/lagostas.jpeg"],
  },
  {
    folder: "Linguados",
    name: "Linguados",
    category: "Peixe fresco",
    description: "Linguado de carne delicada, otimo para receitas leves, grelhadas e pratos mais refinados.",
    images: ["assets/FOTOS/Linguados/linguado2.jpeg", "assets/FOTOS/Linguados/linguado 1.jpeg"],
  },
  {
    folder: "Lulas",
    name: "Lulas",
    category: "Frutos do mar",
    description: "Lula nacional para aneis, grelhados, ensopados, massas e preparos de frutos do mar.",
    images: ["assets/FOTOS/Lulas/LULANACIONAL3.jpeg", "assets/FOTOS/Lulas/LULANACIONAL1.jpeg", "assets/FOTOS/Lulas/LULANACIONAL.jpeg"],
  },
  {
    folder: "Meca",
    name: "Meca",
    category: "Peixe fresco",
    description: "Meca selecionada, com textura firme e sabor marcante para grelhados, postas e receitas especiais.",
    images: ["assets/FOTOS/Meca/meca1.jpeg"],
  },
  {
    folder: "Mexilhao",
    name: "Mexilhao",
    category: "Frutos do mar",
    description: "Mexilhao versatil para caldos, massas, paellas, ensopados e pratos com sabor de mar.",
    images: ["assets/FOTOS/Mexilhao/mexilhao.jpeg"],
  },
  {
    folder: "Namorado",
    name: "Namorado",
    category: "Peixe fresco",
    description: "Namorado fresco, peixe de carne branca e delicada para assados, grelhados e moquecas.",
    images: ["assets/FOTOS/Namorado/Namorado.jpeg"],
  },
  {
    folder: "Olhete",
    name: "Olhete",
    category: "Peixe fresco",
    description: "Olhete selecionado, com carne saborosa e excelente rendimento para preparos familiares.",
    images: ["assets/FOTOS/Olhete/olhete3.jpeg", "assets/FOTOS/Olhete/olhete2.jpeg", "assets/FOTOS/Olhete/olhete1.jpeg"],
  },
  {
    folder: "Pescada Amarela",
    name: "Pescada Amarela",
    category: "Peixe fresco",
    description: "Pescada amarela fresca para postas, moquecas, ensopados e preparos do dia a dia.",
    images: ["assets/FOTOS/Pescada Amarela/PESCADAAMARELA1.jpeg", "assets/FOTOS/Pescada Amarela/pescada amarela 2.jpeg"],
  },
  {
    folder: "Pescada Branca",
    name: "Pescada Branca",
    category: "Peixe fresco",
    description: "Pescada branca leve e saborosa para receitas simples, saudaveis e bem acabadas.",
    images: ["assets/FOTOS/Pescada Branca/pescada branca .jpeg"],
  },
  {
    folder: "Pescadinha",
    name: "Pescadinha",
    category: "Peixe fresco",
    description: "Pescadinha fresca para frituras, ensopados e refeicoes praticas com sabor de mar.",
    images: ["assets/FOTOS/Pescadinha/pescadinha .jpeg"],
  },
  {
    folder: "Polvos",
    name: "Polvos",
    category: "Frutos do mar",
    description: "Polvo selecionado para grelhados, arrozes, saladas e receitas mediterraneas.",
    images: ["assets/FOTOS/Polvos/POLVO3.jpeg", "assets/FOTOS/Polvos/polvo1.jpeg", "assets/FOTOS/Polvos/polvo 2.jpeg"],
  },
  {
    folder: "Robalo",
    name: "Robalo",
    category: "Peixe fresco",
    description: "Robalo fresco, peixe de carne branca e sabor delicado para preparos nobres.",
    images: ["assets/FOTOS/Robalo/ROBALO3.jpeg", "assets/FOTOS/Robalo/ROBALO1.jpeg", "assets/FOTOS/Robalo/robalo 2.jpeg"],
  },
  {
    folder: "Salmao",
    name: "Salmao",
    category: "Linha premium",
    description: "Salmao selecionado para files, sashimi, grelhados, forno, poke e receitas especiais.",
    images: ["assets/FOTOS/Salmao/SALMAO4.jpeg", "assets/FOTOS/Salmao/SALMAO3.jpeg", "assets/FOTOS/Salmao/SALMAO2.jpeg", "assets/FOTOS/Salmao/SALMAO1.jpeg", "assets/FOTOS/Salmao/SALMAO6.jpeg", "assets/FOTOS/Salmao/SALMAO5.jpeg", "assets/FOTOS/Salmao/SALMAO7.jpeg"],
  },
  {
    folder: "Sardinha",
    name: "Sardinha",
    category: "Peixe fresco",
    description: "Sardinha fresca e versatil para fritar, assar, grelhar ou preparar receitas tradicionais.",
    images: ["assets/FOTOS/Sardinha/SARDINHAS1.jpeg", "assets/FOTOS/Sardinha/SARDINHAS.jpeg"],
  },
  {
    folder: "Siri",
    name: "Siri",
    category: "Frutos do mar",
    description: "Carne de siri selecionada para casquinha, recheios, molhos e pratos praianos.",
    images: ["assets/FOTOS/Siri/carnedesiri.jpeg"],
  },
  {
    folder: "Tainha",
    name: "Tainha",
    category: "Peixe fresco",
    description: "Tainha selecionada para postas, files, assados e receitas tradicionais da costa.",
    images: ["assets/FOTOS/Tainha/TAINHA5.jpeg", "assets/FOTOS/Tainha/TAINHA4.jpeg", "assets/FOTOS/Tainha/TAINHA3.jpeg", "assets/FOTOS/Tainha/TAINHA2.jpeg", "assets/FOTOS/Tainha/TAINHA1.jpeg"],
  },
  {
    folder: "Tilapia",
    name: "Tilapia",
    category: "Peixe fresco",
    description: "Tilapia fresca para files, porcoes leves, grelhados, forno e refeicoes familiares.",
    images: ["assets/FOTOS/Tilapia/TILAPIA3.jpeg", "assets/FOTOS/Tilapia/TILAPIA2.jpeg", "assets/FOTOS/Tilapia/TILAPIA1.jpeg"],
  },
  {
    folder: "Vieiras",
    name: "Vieiras",
    category: "Frutos do mar",
    description: "Vieiras delicadas e sofisticadas para pratos de alto padrao e apresentacao elegante.",
    images: ["assets/FOTOS/Vieiras/VIEIRAS.jpeg"],
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
          <p>${product.description}</p>
          <small>Ver detalhes</small>
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
