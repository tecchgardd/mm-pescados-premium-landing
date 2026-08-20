(function () {
  "use strict";

  var PHONE = "554830244024";
  var products = [
    { name: "Salmão premium", kind: "premium", label: "Linha premium", image: "./assets/FOTOS/Salmao/SALMAO2.jpeg", tag: "Mais pedido", offer: true, description: "Salmão selecionado para sashimis, grelhados, pokes e receitas especiais." },
    { name: "Camarão rosa", kind: "frutos", label: "Frutos do mar", image: "./assets/FOTOS/Camarao/camarao%20rosa%201.jpeg", tag: "Destaque", offer: false, description: "Camarões selecionados para risotos, massas, moquecas e preparos especiais." },
    { name: "Atum selecionado", kind: "premium", label: "Linha premium", image: "./assets/FOTOS/Atum/ATUM%201.jpeg", tag: "Corte nobre", offer: false, description: "Atum de alto padrão para cortes nobres, grelhados e pratos contemporâneos." },
    { name: "Filé de tilápia", kind: "peixes", label: "Peixes frescos", image: "./assets/FOTOS/Tilapia/TILAPIA1.jpeg", tag: "Favorito", offer: false, description: "Tilápia fresca e versátil, ideal para filés, refeições leves e grelhados." },
    { name: "Polvo selecionado", kind: "frutos", label: "Frutos do mar", image: "./assets/FOTOS/Polvos/polvo1.jpeg", tag: "Especialidade", offer: false, description: "Polvo selecionado para grelhados, saladas, arrozes e receitas mediterrâneas." },
    { name: "Lagosta premium", kind: "frutos", label: "Frutos do mar", image: "./assets/FOTOS/Lagostas/lagostas.jpeg", tag: "Premium", offer: false, description: "Lagostas selecionadas para experiências gastronômicas e ocasiões especiais." },
    { name: "Kit frutos do mar", kind: "kits", label: "Kits especiais", image: "./assets/FOTOS/kits/kit1.jpeg", tag: "Monte o seu", offer: false, description: "Combinações selecionadas para facilitar sua rotina e surpreender à mesa." },
    { name: "Empanados crocantes", kind: "kits", label: "Prontos para preparo", image: "./assets/FOTOS/EMPANADOS/EMPANADOS.jpeg", tag: "Praticidade", offer: false, description: "Opções empanadas e crocantes para entradas, porções e refeições rápidas." },
    { name: "Lombo de bacalhau", kind: "premium", label: "Especialidades", image: "./assets/FOTOS/Bacalhau/lombo%20bacalhau%201.jpeg", tag: "Corte especial", offer: false, description: "Lombo de bacalhau com corte nobre para ocasiões especiais e receitas tradicionais." },
    { name: "Vieiras selecionadas", kind: "frutos", label: "Frutos do mar", image: "./assets/FOTOS/Vieiras/VIEIRAS.jpeg", tag: "Gourmet", offer: false, description: "Vieiras delicadas para pratos de alto padrão e apresentação elegante." },
    { name: "Robalo fresco", kind: "peixes", label: "Peixes frescos", image: "./assets/FOTOS/Robalo/robalo%202.jpeg", tag: "Seleção MM", offer: false, description: "Robalo de carne branca e sabor delicado, ideal para assados e grelhados." },
    { name: "Tainha selecionada", kind: "peixes", label: "Peixes frescos", image: "./assets/FOTOS/Tainha/TAINHA1.jpeg", tag: "Sabor da costa", offer: false, description: "Tainha selecionada para postas, filés, assados e receitas tradicionais." }
  ];

  var slides = [
    { image: "./assets/banner/BANNER1.png", category: "Linha premium", title: "Salmão selecionado", alt: "Campanha MM Pescados — salmão premium" },
    { image: "./assets/banner/BANNER2.png", category: "Frutos do mar", title: "Camarões especiais", alt: "Campanha MM Pescados — frutos do mar" },
    { image: "./assets/banner/BANNER3.png", category: "Kits e práticos", title: "Kits MM Pescados", alt: "Campanha MM Pescados — kits especiais" },
    { image: "./assets/banner/BANNER4.png", category: "Seleção da casa", title: "Destaques da semana", alt: "Campanha MM Pescados — destaques da semana" }
  ];

  var banners = [
    { image: "./assets/banner2/BANNER1.png", alt: "Banner promocional MM Pescados 1" },
    { image: "./assets/banner2/BNNER2.png", alt: "Banner promocional MM Pescados 2" },
    { image: "./assets/banner2/BANNER3.png", alt: "Banner promocional MM Pescados 3" },
    { image: "./assets/banner2/BANNER4.png", alt: "Banner promocional MM Pescados 4" }
  ];

  var activeFilter = "todos";
  var showAll = false;
  var heroSlide = 0;
  var activeModal = null;
  var toastTimeout = null;
  var grid = document.getElementById("productGrid");
  var searchInput = document.getElementById("searchInput");

  function waUrl(message) {
    return "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(message);
  }

  document.querySelectorAll(".wa-link").forEach(function (link) {
    link.href = waUrl(link.dataset.message || "Olá! Gostaria de atendimento da MM Pescados.");
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, function (char) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char];
    });
  }

  function normalized(value) {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function icon(name) {
    return '<svg class="icon icon-sm"><use href="#i-' + name + '"></use></svg>';
  }

  function renderProducts() {
    var query = normalized(searchInput.value.trim());
    var filtered = products.filter(function (product) {
      var matchesFilter = activeFilter === "todos" || product.kind === activeFilter;
      var matchesQuery = !query || normalized(product.name + " " + product.label + " " + product.description).indexOf(query) !== -1;
      return matchesFilter && matchesQuery;
    });
    var visible = showAll || activeFilter !== "todos" || query ? filtered : filtered.slice(0, 8);
    if (!visible.length) {
      grid.innerHTML = '<div class="empty-state">Nenhum produto encontrado. Tente buscar por salmão, camarão, peixe ou kits.</div>';
    } else {
      grid.innerHTML = visible.map(function (product) {
        var index = products.indexOf(product);
        return '<article class="product-card">' +
          '<div class="product-image" role="button" tabindex="0" data-product="' + index + '" aria-label="Ver detalhes de ' + escapeHtml(product.name) + '">' +
            '<img src="' + product.image + '" alt="' + escapeHtml(product.name) + '" loading="lazy">' +
            '<span class="product-tag' + (product.offer ? ' offer' : '') + '">' + escapeHtml(product.tag) + '</span>' +
            '<button class="favorite-btn" data-favorite="' + index + '" aria-label="Favoritar ' + escapeHtml(product.name) + '">' + icon("heart") + '</button>' +
          '</div>' +
          '<div class="product-copy"><span class="product-type">' + escapeHtml(product.label) + '</span><h3>' + escapeHtml(product.name) + '</h3>' +
            '<p>' + escapeHtml(product.description) + '</p>' +
            '<div class="product-bottom"><span class="product-availability">Consulte disponibilidade</span>' +
            '<a class="product-order" href="' + waUrl("Olá! Quero informações sobre " + product.name + ".") + '" target="_blank" rel="noopener">Pedir agora ' + icon("arrow") + '</a></div>' +
          '</div></article>';
      }).join("");
    }
    document.getElementById("showAllProducts").style.display = activeFilter === "todos" && !query && !showAll ? "inline-flex" : "none";
  }

  function setFilter(value, shouldScroll) {
    activeFilter = value;
    document.querySelectorAll(".filter").forEach(function (button) {
      button.classList.toggle("is-active", button.dataset.filter === value);
    });
    renderProducts();
    if (shouldScroll) document.getElementById("produtos").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  document.querySelectorAll(".filter").forEach(function (button) {
    button.addEventListener("click", function () { setFilter(button.dataset.filter, false); });
  });

  document.querySelectorAll(".category-card").forEach(function (button) {
    button.addEventListener("click", function () { setFilter(button.dataset.category, true); });
  });

  searchInput.addEventListener("input", renderProducts);
  document.getElementById("showAllProducts").addEventListener("click", function () { showAll = true; renderProducts(); });

  var heroSlidesEl = document.getElementById("heroSlides");
  var heroPagerEl = document.getElementById("heroPager");
  var heroTimer = null;

  slides.forEach(function (slide, index) {
    var image = new Image();
    image.src = slide.image;
    image.alt = slide.alt;
    image.loading = index === 0 ? "eager" : "lazy";
    if (index === 0) image.className = "is-active";
    heroSlidesEl.appendChild(image);

    var dot = document.createElement("button");
    dot.type = "button";
    dot.dataset.slide = String(index);
    dot.setAttribute("aria-label", "Mostrar " + slide.title);
    if (index === 0) dot.className = "is-active";
    heroPagerEl.appendChild(dot);
  });

  function setHeroSlide(index) {
    heroSlide = (index + slides.length) % slides.length;
    var slide = slides[heroSlide];
    heroSlidesEl.querySelectorAll("img").forEach(function (image, position) {
      image.classList.toggle("is-active", position === heroSlide);
    });
    document.getElementById("heroImageCategory").textContent = slide.category;
    document.getElementById("heroImageTitle").textContent = slide.title;
    heroPagerEl.querySelectorAll("button").forEach(function (button) {
      button.classList.toggle("is-active", Number(button.dataset.slide) === heroSlide);
    });
  }

  function startHeroAutoplay() {
    clearInterval(heroTimer);
    heroTimer = setInterval(function () {
      if (!document.hidden && !activeModal) setHeroSlide(heroSlide + 1);
    }, 6000);
  }

  heroPagerEl.addEventListener("click", function (event) {
    var button = event.target.closest("button[data-slide]");
    if (!button) return;
    setHeroSlide(Number(button.dataset.slide));
    startHeroAutoplay();
  });

  setHeroSlide(0);
  startHeroAutoplay();

  /* ===== Carrossel de banners (meio da página) ===== */
  var bannerTrack = document.getElementById("bannerTrack");
  var bannerDots = document.getElementById("bannerDots");
  var bannerCarousel = document.getElementById("bannerCarousel");
  var bannerIndex = 0;
  var bannerTimer = null;

  banners.forEach(function (banner, index) {
    var image = new Image();
    image.src = banner.image;
    image.alt = banner.alt;
    image.loading = index === 0 ? "eager" : "lazy";
    if (index === 0) image.className = "is-active";
    bannerTrack.appendChild(image);

    var dot = document.createElement("button");
    dot.type = "button";
    dot.dataset.banner = String(index);
    dot.setAttribute("aria-label", "Ir para o banner " + (index + 1));
    if (index === 0) dot.className = "is-active";
    bannerDots.appendChild(dot);
  });

  function setBanner(index) {
    bannerIndex = (index + banners.length) % banners.length;
    bannerTrack.querySelectorAll("img").forEach(function (image, position) {
      image.classList.toggle("is-active", position === bannerIndex);
    });
    bannerDots.querySelectorAll("button").forEach(function (button) {
      button.classList.toggle("is-active", Number(button.dataset.banner) === bannerIndex);
    });
  }

  function startBannerAutoplay() {
    clearInterval(bannerTimer);
    bannerTimer = setInterval(function () {
      if (!document.hidden && !activeModal) setBanner(bannerIndex + 1);
    }, 5000);
  }

  bannerDots.addEventListener("click", function (event) {
    var button = event.target.closest("button[data-banner]");
    if (!button) return;
    setBanner(Number(button.dataset.banner));
    startBannerAutoplay();
  });

  document.getElementById("bannerPrev").addEventListener("click", function () { setBanner(bannerIndex - 1); startBannerAutoplay(); });
  document.getElementById("bannerNext").addEventListener("click", function () { setBanner(bannerIndex + 1); startBannerAutoplay(); });

  bannerCarousel.addEventListener("mouseenter", function () { clearInterval(bannerTimer); });
  bannerCarousel.addEventListener("mouseleave", startBannerAutoplay);

  var bannerTouchX = null;
  bannerCarousel.addEventListener("touchstart", function (event) { bannerTouchX = event.changedTouches[0].clientX; }, { passive: true });
  bannerCarousel.addEventListener("touchend", function (event) {
    if (bannerTouchX === null) return;
    var delta = event.changedTouches[0].clientX - bannerTouchX;
    if (Math.abs(delta) > 45) setBanner(bannerIndex + (delta < 0 ? 1 : -1));
    bannerTouchX = null;
    startBannerAutoplay();
  }, { passive: true });

  startBannerAutoplay();

  function openModal(id) {
    if (activeModal) closeModal();
    activeModal = document.getElementById(id);
    activeModal.classList.add("is-open");
    activeModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    var close = activeModal.querySelector(".close-modal");
    if (close) close.focus();
  }

  function closeModal() {
    if (!activeModal) return;
    activeModal.classList.remove("is-open");
    activeModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
    activeModal = null;
  }

  document.querySelectorAll(".open-promo").forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      openModal("promoBackdrop");
    });
  });

  document.querySelectorAll(".close-modal").forEach(function (button) {
    button.addEventListener("click", closeModal);
  });

  document.querySelectorAll(".modal-backdrop").forEach(function (backdrop) {
    backdrop.addEventListener("click", function (event) { if (event.target === backdrop) closeModal(); });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeModal();
  });

  function openProduct(index) {
    var product = products[index];
    if (!product) return;
    document.getElementById("productModalImage").src = product.image;
    document.getElementById("productModalImage").alt = product.name;
    document.getElementById("productModalCategory").textContent = product.label;
    document.getElementById("productModalTitle").textContent = product.name;
    document.getElementById("productModalDescription").textContent = product.description;
    document.getElementById("productModalOrder").href = waUrl("Olá! Gostaria de consultar disponibilidade e valor de " + product.name + ".");
    openModal("productBackdrop");
  }

  function showToast(message) {
    var toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(function () { toast.classList.remove("is-visible"); }, 2300);
  }

  grid.addEventListener("click", function (event) {
    var favorite = event.target.closest("[data-favorite]");
    if (favorite) {
      event.stopPropagation();
      favorite.classList.toggle("is-liked");
      showToast(favorite.classList.contains("is-liked") ? "Produto adicionado aos favoritos." : "Produto removido dos favoritos.");
      return;
    }
    var card = event.target.closest("[data-product]");
    if (card) openProduct(Number(card.dataset.product));
  });

  grid.addEventListener("keydown", function (event) {
    var card = event.target.closest("[data-product]");
    if (card && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      openProduct(Number(card.dataset.product));
    }
  });

  document.getElementById("copyCoupon").addEventListener("click", function () {
    var coupon = "PRIMEIROPEDIDO";
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(coupon).then(function () { showToast("Cupom PRIMEIROPEDIDO copiado!"); });
    } else {
      var field = document.createElement("textarea");
      field.value = coupon;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      try { document.execCommand("copy"); showToast("Cupom PRIMEIROPEDIDO copiado!"); } catch (error) { showToast("Use o cupom PRIMEIROPEDIDO no WhatsApp."); }
      field.remove();
    }
  });

  document.getElementById("closeAnnouncement").addEventListener("click", function () {
    document.getElementById("announcement").remove();
  });

  var navToggle = document.getElementById("navToggle");
  navToggle.addEventListener("click", function () {
    var opened = document.getElementById("mainNav").classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(opened));
    navToggle.setAttribute("aria-label", opened ? "Fechar menu" : "Abrir menu");
  });

  document.querySelectorAll("#mainNav a").forEach(function (link) {
    link.addEventListener("click", function () {
      document.getElementById("mainNav").classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  renderProducts();

  try {
    if (!sessionStorage.getItem("mm-pescados-welcome-shown")) {
      setTimeout(function () {
        if (!activeModal) {
          openModal("promoBackdrop");
          sessionStorage.setItem("mm-pescados-welcome-shown", "1");
        }
      }, 2200);
    }
  } catch (error) {
    // Some local-file preview environments disable storage; the floating button remains available.
  }
})();
