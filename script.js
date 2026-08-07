(() => {
  const data = window.SITE_DATA;
  if (!data) return;

  const qs = (s, el = document) => el.querySelector(s);
  const qsa = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (value = "") => String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const isPlaceholderLink = (url) => !url || url.startsWith("#add-");
  const mediaMarkup = (video) => video.thumbnail
    ? `<img class="video-thumbnail" src="${esc(video.thumbnail)}" alt="${esc(video.title)} project thumbnail" loading="lazy" decoding="async">`
    : `<span class="video-placeholder-label">${esc(video.placeholder)}</span>`;

  const applyMedia = (selector, url, label) => {
    const el = qs(selector);
    if (!el || !url) return;
    el.style.backgroundImage = `linear-gradient(rgba(18,48,58,.12), rgba(18,48,58,.12)), url("${String(url).replace(/"/g, '%22')}")`;
    el.style.backgroundSize = "cover";
    el.style.backgroundPosition = "center";
    el.setAttribute("aria-label", label);
    el.querySelectorAll(":scope > span, :scope > strong, :scope > small").forEach(child => child.remove());
  };
  applyMedia(".travel-placeholder", data.media?.heroImage, "Cinematic travel image");
  applyMedia(".creator-placeholder", data.media?.creatorImage, "Portrait of Mostafa, Masry Traveller");
  applyMedia(".about-media", data.media?.aboutImage, "Mostafa creating travel content on location");

  qsa("[data-analytics-date]").forEach(el => el.textContent = data.analyticsAsOf);
  qsa("[data-year]").forEach(el => el.textContent = new Date().getFullYear());

  const proof = qs("#hero-proof");
  proof.innerHTML = data.proof.map(item => `<div class="proof-item"><strong>${esc(item.value)}</strong><span>${esc(item.label)}</span></div>`).join("");

  const videoGrid = qs("#video-grid");
  videoGrid.innerHTML = data.videos.map((video, index) => `
    <article class="video-card reveal">
      <a class="video-card-media" href="${esc(video.url)}" data-video-url="${esc(video.url)}" data-video-title="${esc(video.title)}" ${isPlaceholderLink(video.url) ? '' : 'target="_blank" rel="noopener"'} aria-label="Open ${esc(video.title)} video">
        ${mediaMarkup(video)}
        <span class="play-button" aria-hidden="true">▶</span>
      </a>
      <div class="video-card-body">
        <div class="video-meta"><span>${esc(video.category)}</span><span>${esc(video.label)}</span></div>
        <h3>${esc(video.title)}</h3>
        <span class="video-result">${esc(video.result)}</span>
      </div>
    </article>
  `).join("");

  const heroResult = data.results.hero;
  qs("#result-hero").innerHTML = `
    <div class="result-hero-value">${esc(heroResult.value)}</div>
    <div class="result-hero-label">${esc(heroResult.label)}</div>
    <div class="result-hero-detail"><strong>${esc(heroResult.detail)}</strong><span>${esc(heroResult.sub)}</span></div>
  `;

  qs("#result-cards").innerHTML = data.results.selected.map(item => `
    <article class="result-card reveal">
      <div><div class="result-card-value">${esc(item.value)}</div><small>${esc(item.label)}</small></div>
      <div class="result-card-copy"><strong>${esc(item.detail)}</strong><span>${esc(item.engagement)}</span></div>
    </article>
  `).join("");

  qs("#launch-stats").innerHTML = data.results.launch.map(item => `<div class="launch-stat"><strong>${esc(item.value)}</strong><span>${esc(item.label)}</span></div>`).join("");

  const renderBars = (items) => items.map(item => `
    <div class="bar-item">
      <div class="bar-meta"><span>${esc(item.label)}${item.placeholder ? '<small class="placeholder-pill">placeholder</small>' : ''}</span><strong>${esc(item.display)}</strong></div>
      <div class="bar-track"><div class="bar-fill" style="--bar-width:${Math.max(0, Math.min(100, Number(item.value)))}%"></div></div>
    </div>
  `).join("");
  qs("#viewer-insights").innerHTML = renderBars(data.audience.viewerInsights);
  qs("#follower-insights").innerHTML = renderBars(data.audience.followerInsights);

  qs("#pricing-grid").innerHTML = data.pricing.map((pkg, index) => `
    <article class="price-card reveal ${index === 1 ? 'featured' : ''}">
      <span class="price-card-badge">${esc(pkg.badge || 'UGC production')}</span>
      <h3>${esc(pkg.name)}</h3>
      <div class="price">${esc(pkg.price)}</div>
      <ul>${pkg.items.map(item => `<li>${esc(item)}</li>`).join("")}</ul>
    </article>
  `).join("");

  const emailUrl = `mailto:${data.links.email}`;
  qsa("[data-email-link]").forEach(el => { el.href = emailUrl; if (el.tagName === 'A' && !el.classList.contains('button')) el.textContent = data.links.email; });
  qsa("[data-tiktok-link]").forEach(el => { el.href = data.links.tiktok; el.target = "_blank"; el.rel = "noopener"; });
  qsa("[data-instagram-link]").forEach(el => { el.href = data.links.instagram; el.target = "_blank"; el.rel = "noopener"; });
  qsa("[data-media-kit-link]").forEach(el => {
  el.href = data.links.mediaKit;
  el.target = "_blank";
  el.rel = "noopener";
});
  const upcoming = qs("#upcoming");
  if (data.upcoming?.active) {
    upcoming.hidden = false;
    qs("[data-destination]", upcoming).textContent = data.upcoming.destination;
    qs("[data-upcoming-message]", upcoming).textContent = data.upcoming.message;
  }

  const dialog = qs("[data-video-dialog]");
  qsa("[data-video-url]").forEach(link => link.addEventListener("click", (event) => {
    if (!isPlaceholderLink(link.dataset.videoUrl)) return;
    event.preventDefault();
    qs("#video-dialog-title").textContent = `Add the ${link.dataset.videoTitle} video URL`;
    if (typeof dialog.showModal === "function") dialog.showModal();
  }));
  qs("[data-dialog-close]")?.addEventListener("click", () => dialog.close());
  dialog?.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });

  const mediaKit = qs("[data-media-kit-link]");
  mediaKit?.addEventListener("click", event => {
    if (isPlaceholderLink(mediaKit.getAttribute("href"))) {
      event.preventDefault();
      alert("Add your media kit URL in site-data.js → links.mediaKit");
    }
  });

  const header = qs("[data-header]");
  const updateHeader = () => header.classList.toggle("scrolled", window.scrollY > 24);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const menuToggle = qs("[data-menu-toggle]");
  const nav = qs("[data-nav]");
  const closeMenu = () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });
  qsa("a", nav).forEach(link => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => { if (window.innerWidth > 820) closeMenu(); });

  const revealItems = qsa(".reveal");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    revealItems.forEach(el => el.classList.add("visible"));
  } else {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: .08, rootMargin: "0px 0px -30px" });
    revealItems.forEach(el => observer.observe(el));
  }
})();
