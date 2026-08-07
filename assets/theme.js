document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

const themeConfig = window.ArriveTheme || {};
const rootUrl = `${themeConfig.root || '/'}${String(themeConfig.root || '/').endsWith('/') ? '' : '/'}`;

const announce = (message) => {
  const region = document.querySelector('[data-live-region]');
  if (region) region.textContent = message;
};

const formatMoney = (cents) => {
  try {
    return new Intl.NumberFormat(themeConfig.locale || 'en', {
      style: 'currency',
      currency: themeConfig.currency || 'USD',
    }).format(Number(cents || 0) / 100);
  } catch (error) {
    return `$${(Number(cents || 0) / 100).toFixed(2)}`;
  }
};

const setBodyLock = () => {
  const openDrawer = document.querySelector('.nav-drawer[open], .search-drawer[open], .cart-drawer.is-open');
  document.body.classList.toggle('no-scroll', Boolean(openDrawer));
};

const openDrawer = (name) => {
  const drawer = document.querySelector(`[data-drawer="${name}"]`);
  if (!drawer) return;
  drawer.returnFocus = document.activeElement;
  document.querySelectorAll('[data-drawer]').forEach((item) => {
    if (item !== drawer) {
      item.removeAttribute('open');
      item.classList.remove('is-open');
      item.setAttribute('aria-hidden', 'true');
    }
  });
  if (name === 'cart') drawer.classList.add('is-open');
  else drawer.setAttribute('open', '');
  drawer.setAttribute('aria-hidden', 'false');
  setBodyLock();
  window.setTimeout(() => drawer.querySelector('button, input, a')?.focus(), 30);
};

const closeDrawer = (drawer) => {
  if (!drawer) return;
  drawer.removeAttribute('open');
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  setBodyLock();
  drawer.returnFocus?.focus();
};

const replaceSection = (key, html) => {
  if (!html) return;
  const parsed = new DOMParser().parseFromString(html, 'text/html');
  const next = parsed.querySelector(`#shopify-section-${CSS.escape(key)}`);
  const current = document.querySelector(`#shopify-section-${CSS.escape(key)}`);
  if (next && current) current.replaceWith(next);
};

const refreshSections = (sections) => {
  if (!sections) return;
  Object.entries(sections).forEach(([key, html]) => replaceSection(key, html));
  initializeWishlist();
};

document.addEventListener('click', (event) => {
  const opener = event.target.closest('[data-open-drawer]');
  if (opener) {
    event.preventDefault();
    openDrawer(opener.dataset.openDrawer);
    return;
  }
  const closer = event.target.closest('[data-close-drawer]');
  if (closer) {
    event.preventDefault();
    closeDrawer(closer.closest('[data-drawer]'));
    return;
  }
  const quantityButton = event.target.closest('[data-quantity-change]');
  if (quantityButton) {
    const input = quantityButton.parentElement.querySelector('input[type="number"]');
    if (!input) return;
    const next = Math.max(Number(input.min || 1), Number(input.value || 1) + Number(quantityButton.dataset.quantityChange));
    input.value = next;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    return;
  }
  const removeButton = event.target.closest('[data-cart-remove]');
  if (removeButton) {
    const input = removeButton.closest('.cart-line')?.querySelector('[data-cart-line-input]');
    if (!input) return;
    input.value = '0';
    input.dispatchEvent(new Event('change', { bubbles: true }));
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  document.querySelectorAll('[data-drawer]').forEach(closeDrawer);
});

const savedKey = 'arrive-aruba-wishlist-v1';

const getSaved = () => {
  try {
    const value = JSON.parse(localStorage.getItem(savedKey) || '[]');
    return Array.isArray(value) ? value : [];
  } catch (error) {
    return [];
  }
};

const normalizeSaved = () => getSaved().map((item) => typeof item === 'string' ? { id: item } : item).filter((item) => item?.id);

const renderWishlist = () => {
  const saved = normalizeSaved();
  document.querySelectorAll('[data-wishlist-items]').forEach((container) => {
    container.replaceChildren(...saved.map((item) => {
      const row = document.createElement('article');
      row.className = 'wishlist-item';
      const media = item.image ? document.createElement('img') : document.createElement('span');
      if (item.image) {
        media.src = item.image;
        media.alt = '';
        media.loading = 'lazy';
      } else {
        media.className = 'wishlist-item-placeholder';
      }
      const copy = document.createElement('div');
      const title = document.createElement('h3');
      const link = document.createElement('a');
      link.href = item.url || '#';
      link.textContent = item.title || 'Saved piece';
      title.append(link);
      const price = document.createElement('p');
      price.textContent = item.price || '';
      copy.append(title, price);
      const remove = document.createElement('button');
      remove.className = 'icon-button';
      remove.type = 'button';
      remove.dataset.wishlistRemove = item.id;
      remove.setAttribute('aria-label', `Remove ${item.title || 'saved piece'}`);
      remove.textContent = '×';
      row.append(media, copy, remove);
      return row;
    }));
  });
  document.querySelectorAll('[data-wishlist-empty]').forEach((empty) => { empty.hidden = saved.length > 0; });
};

const initializeWishlist = () => {
  const savedItems = normalizeSaved();
  const saved = new Set(savedItems.map((item) => item.id));
  document.querySelectorAll('[data-wishlist]').forEach((button) => {
    const active = saved.has(button.dataset.wishlist);
    button.classList.toggle('is-saved', active);
    button.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
  document.querySelectorAll('[data-wishlist-count]').forEach((count) => {
    count.textContent = String(saved.size);
    count.hidden = saved.size === 0;
  });
  renderWishlist();
};

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-wishlist]');
  if (!button) return;
  event.preventDefault();
  const saved = normalizeSaved();
  const id = button.dataset.wishlist;
  const index = saved.findIndex((item) => item.id === id);
  if (index >= 0) saved.splice(index, 1);
  else saved.push({ id, title: button.dataset.wishlistTitle, url: button.dataset.wishlistUrl, image: button.dataset.wishlistImage, price: button.dataset.wishlistPrice });
  localStorage.setItem(savedKey, JSON.stringify(saved));
  initializeWishlist();
  announce(button.dataset.wishlistMessage || 'Saved pieces updated');
});

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-wishlist-remove]');
  if (!button) return;
  const saved = normalizeSaved().filter((item) => item.id !== button.dataset.wishlistRemove);
  localStorage.setItem(savedKey, JSON.stringify(saved));
  initializeWishlist();
  announce('Saved pieces updated');
});

const initializeReveal = () => {
  const elements = document.querySelectorAll('[data-reveal]:not(.is-visible)');
  if (!('IntersectionObserver' in window)) {
    elements.forEach((element) => element.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  elements.forEach((element) => observer.observe(element));
};

const initializeHero = () => {
  document.querySelectorAll('[data-hero]').forEach((hero) => {
    const videos = Array.from(hero.querySelectorAll('[data-hero-video]'));
    const getVideo = () => videos.find((video) => getComputedStyle(video).display !== 'none');
    const video = getVideo();
    if (video && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.muted = true;
      video.playsInline = true;
      video.play().catch(() => {});
    }
    const mark = hero.querySelector('[data-hero-mark]');
    const animated = mark?.querySelector('[data-animated-mark]');
    if (mark && animated && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const ready = () => mark.classList.add('is-ready');
      if (animated.complete && animated.naturalWidth) ready();
      else animated.addEventListener('load', ready, { once: true });
    }
    const sound = hero.querySelector('[data-sound-toggle]');
    if (sound) {
      sound.addEventListener('click', () => {
        const activeVideo = getVideo();
        if (!activeVideo) return;
        const turningOn = activeVideo.muted;
        if (turningOn && activeVideo.dataset.soundSrc && !activeVideo.currentSrc.includes(activeVideo.dataset.soundSrc)) {
          const time = activeVideo.currentTime || 0;
          activeVideo.src = activeVideo.dataset.soundSrc;
          activeVideo.addEventListener('loadedmetadata', () => {
            if (time < activeVideo.duration) activeVideo.currentTime = time;
          }, { once: true });
        }
        activeVideo.muted = !turningOn;
        activeVideo.play().catch(() => { activeVideo.muted = true; });
        sound.setAttribute('aria-pressed', turningOn ? 'true' : 'false');
        sound.textContent = turningOn ? sound.dataset.onLabel : sound.dataset.offLabel;
      });
    }
  });
};

class PredictiveSearch extends HTMLElement {
  connectedCallback() {
    this.input = this.querySelector('input[type="search"]');
    this.results = this.querySelector('[data-predictive-results]');
    this.timer = null;
    this.input?.addEventListener('input', () => {
      window.clearTimeout(this.timer);
      this.timer = window.setTimeout(() => this.search(), 180);
    });
  }

  async search() {
    const query = this.input?.value.trim();
    if (!query || query.length < 2) {
      if (this.results) this.results.innerHTML = '';
      return;
    }
    const url = `${themeConfig.predictiveSearchUrl}?q=${encodeURIComponent(query)}&resources[type]=product,collection,page&section_id=predictive-search`;
    try {
      const response = await fetch(url);
      const html = await response.text();
      const parsed = new DOMParser().parseFromString(html, 'text/html');
      const content = parsed.querySelector('#shopify-section-predictive-search');
      if (this.results) this.results.innerHTML = content?.innerHTML || '';
    } catch (error) {
      if (this.results) this.results.innerHTML = '';
    }
  }
}

customElements.define('predictive-search', PredictiveSearch);

class ProductForm extends HTMLElement {
  connectedCallback() {
    this.form = this.querySelector('form');
    this.variants = JSON.parse(this.querySelector('[data-variants]')?.textContent || '[]');
    this.idInput = this.querySelector('[name="id"]');
    this.submit = this.querySelector('[type="submit"]');
    this.price = this.closest('.product-layout')?.querySelector('[data-product-price]');
    this.compare = this.closest('.product-layout')?.querySelector('[data-product-compare]');
    this.querySelectorAll('[data-option-input]').forEach((input) => input.addEventListener('change', () => this.updateVariant()));
    this.form?.addEventListener('submit', (event) => this.addToCart(event));
  }

  selectedOptions() {
    return Array.from(this.querySelectorAll('fieldset')).map((fieldset) => fieldset.querySelector('[data-option-input]:checked')?.value);
  }

  updateVariant() {
    const selected = this.selectedOptions();
    const variant = this.variants.find((item) => item.options.every((option, index) => option === selected[index]));
    if (!variant) {
      if (this.submit) this.submit.disabled = true;
      return;
    }
    this.idInput.value = variant.id;
    if (this.price) this.price.textContent = formatMoney(variant.price);
    if (this.compare) {
      this.compare.textContent = variant.compare_at_price > variant.price ? formatMoney(variant.compare_at_price) : '';
      this.compare.hidden = !(variant.compare_at_price > variant.price);
    }
    if (this.submit) {
      this.submit.disabled = !variant.available;
      this.submit.textContent = variant.available ? this.submit.dataset.availableLabel : this.submit.dataset.soldLabel;
    }
    const nextUrl = new URL(window.location.href);
    nextUrl.searchParams.set('variant', variant.id);
    window.history.replaceState({}, '', nextUrl);
    if (variant.featured_media?.id) {
      document.querySelector(`[data-media-id="${variant.featured_media.id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }

  async addToCart(event) {
    event.preventDefault();
    if (!this.form || this.submit?.disabled) return;
    const data = new FormData(this.form);
    data.append('sections', 'cart-drawer,header');
    data.append('sections_url', window.location.pathname);
    this.submit.setAttribute('aria-busy', 'true');
    try {
      const response = await fetch(`${rootUrl}cart/add.js`, { method: 'POST', headers: { Accept: 'application/json' }, body: data });
      const result = await response.json();
      if (!response.ok) throw new Error(result.description || result.message);
      refreshSections(result.sections);
      openDrawer('cart');
      announce(this.submit.dataset.addedLabel);
    } catch (error) {
      announce(error.message);
    } finally {
      this.submit.removeAttribute('aria-busy');
    }
  }
}

customElements.define('product-form', ProductForm);

class ProductRecommendations extends HTMLElement {
  connectedCallback() {
    if (!this.dataset.url) return;
    fetch(this.dataset.url)
      .then((response) => response.text())
      .then((text) => {
        const parsed = new DOMParser().parseFromString(text, 'text/html');
        const content = parsed.querySelector('product-recommendations');
        if (content?.innerHTML.trim()) this.innerHTML = content.innerHTML;
      })
      .catch(() => {});
  }
}

customElements.define('product-recommendations', ProductRecommendations);

document.addEventListener('change', async (event) => {
  const input = event.target.closest('[data-cart-line-input]');
  if (!input) return;
  const payload = {
    line: Number(input.dataset.line),
    quantity: Math.max(0, Number(input.value)),
    sections: 'cart-drawer,header,main-cart',
    sections_url: window.location.pathname,
  };
  try {
    const response = await fetch(`${rootUrl}cart/change.js`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.description || result.message);
    refreshSections(result.sections);
    if (document.querySelector('[data-drawer="cart"]')) openDrawer('cart');
  } catch (error) {
    announce(error.message);
  }
});

document.addEventListener('shopify:section:load', () => {
  initializeReveal();
  initializeWishlist();
  initializeHero();
});

initializeReveal();
initializeWishlist();
initializeHero();
