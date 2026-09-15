/* ==========================================================================
   BARBEARIA IMPERIAL — configuração
   Edite apenas os valores abaixo para colocar os dados reais da barbearia.
   ========================================================================== */

const CONFIG = {
  // Número no formato internacional, só dígitos: 55 + DDD + número
  whatsappNumber: "5547999999999",

  // Mensagem padrão enviada quando o cliente clica em "Agendar pelo WhatsApp"
  whatsappMessage: "Olá! Vim pelo site e quero agendar um horário na Barbearia Imperial.",

  instagramUrl: "https://instagram.com/barbeariaimperial",

  // Endereço usado no botão "Abrir no Google Maps" e no mapa incorporado
  address: "Av. das Palmeiras, 482, Centro, Balneário Camboriú - SC",
};

/* ==========================================================================
   Links do WhatsApp
   ========================================================================== */

function buildWhatsappUrl(serviceName) {
  const message = serviceName
    ? `Olá! Quero agendar "${serviceName}" na Barbearia Imperial.`
    : CONFIG.whatsappMessage;
  return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll("[data-whatsapp-btn]").forEach((el) => {
  const service = el.getAttribute("data-service");
  el.setAttribute("href", buildWhatsappUrl(service));
  el.setAttribute("target", "_blank");
  el.setAttribute("rel", "noopener");
});

/* ==========================================================================
   Instagram e mapa
   ========================================================================== */

const instagramLink = document.getElementById("instagramLink");
if (instagramLink) instagramLink.setAttribute("href", CONFIG.instagramUrl);

const encodedAddress = encodeURIComponent(CONFIG.address);

const mapsBtn = document.getElementById("mapsBtn");
if (mapsBtn) {
  mapsBtn.setAttribute("href", `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`);
}

const mapsFrame = document.getElementById("mapsFrame");
if (mapsFrame) {
  mapsFrame.setAttribute("src", `https://www.google.com/maps?q=${encodedAddress}&output=embed`);
}

/* ==========================================================================
   Menu mobile
   ========================================================================== */

const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.innerHTML = isOpen
      ? '<svg width="22" height="22"><use href="#icon-close"/></svg>'
      : '<svg width="22" height="22"><use href="#icon-menu"/></svg>';
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.innerHTML = '<svg width="22" height="22"><use href="#icon-menu"/></svg>';
    });
  });
}

/* ==========================================================================
   Carrossel de depoimentos
   ========================================================================== */

const track = document.getElementById("testimonialsTrack");
const dotsWrap = document.getElementById("testimonialsDots");
const prevBtn = document.getElementById("testPrev");
const nextBtn = document.getElementById("testNext");

if (track && dotsWrap && prevBtn && nextBtn) {
  const slides = Array.from(track.children);
  let index = 0;

  slides.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className = "testimonials__dot";
    dot.setAttribute("aria-label", `Ir para depoimento ${i + 1}`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function goTo(newIndex) {
    index = (newIndex + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((s, i) => s.classList.toggle("is-active", i === index));
    dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
  }

  track.style.transition = "transform 0.5s cubic-bezier(0.22,1,0.36,1)";
  prevBtn.addEventListener("click", () => goTo(index - 1));
  nextBtn.addEventListener("click", () => goTo(index + 1));

  goTo(0);
}

/* ==========================================================================
   Ano no rodapé
   ========================================================================== */

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
