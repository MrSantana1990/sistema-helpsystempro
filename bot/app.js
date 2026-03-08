(() => {
  const WHATSAPP_PHONE = "5511940025492";
  const PAGE_MESSAGE =
    "Quero implantar o HelpSystem Pro Binance Bot. Vou começar em simulação/testnet. Me envie proposta.";

  const yearNode = document.getElementById("year");
  if (yearNode) yearNode.textContent = String(new Date().getFullYear());

  const form = document.getElementById("lead-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = String(document.getElementById("lead-name")?.value || "").trim();
      const phone = String(document.getElementById("lead-phone")?.value || "").trim();
      const goal = String(document.getElementById("lead-goal")?.value || "").trim();

      const msg =
        `Olá, sou ${name}.\n` +
        `Meu WhatsApp: ${phone}.\n` +
        `Meu objetivo é: ${goal}.\n` +
        `${PAGE_MESSAGE}`;

      window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    });
  }

  const quickLinks = document.querySelectorAll(".wa-link");
  quickLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const msg = `${PAGE_MESSAGE}\nPlano de interesse: ${link.closest(".price-card")?.querySelector("h3")?.textContent || "A definir"}.`;
      window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    });
  });

  const counters = document.querySelectorAll("[data-count]");
  const animateCounter = (node) => {
    const end = Number(node.dataset.count || "0");
    const start = 0;
    const duration = 1400;
    const startedAt = performance.now();
    const hasCurrency = node.textContent.includes("$");
    const hasPercent = node.textContent.includes("%");
    const isPositive = node.textContent.includes("+");

    const tick = (time) => {
      const progress = Math.min(1, (time - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (end - start) * eased);
      if (hasPercent) node.textContent = `${current}%`;
      else if (hasCurrency) node.textContent = `${isPositive ? "+" : ""}$${current.toLocaleString("pt-BR")}`;
      else node.textContent = current.toLocaleString("pt-BR");
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  counters.forEach((counter) => observer.observe(counter));
})();
