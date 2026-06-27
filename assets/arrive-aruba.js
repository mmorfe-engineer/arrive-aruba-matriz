document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

const header = document.querySelector('[data-aa-header]');
const drawer = document.querySelector('[data-aa-drawer]');
const openDrawer = document.querySelector('[data-aa-drawer-open]');
const closeDrawer = document.querySelector('[data-aa-drawer-close]');

function syncHeader() {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 12);
}

function setDrawer(open) {
  if (!drawer || !openDrawer) return;
  drawer.classList.toggle('is-open', open);
  drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
  openDrawer.setAttribute('aria-expanded', open ? 'true' : 'false');
  document.body.style.overflow = open ? 'hidden' : '';
}

if (openDrawer) {
  openDrawer.addEventListener('click', () => setDrawer(true));
}

if (closeDrawer) {
  closeDrawer.addEventListener('click', () => setDrawer(false));
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setDrawer(false);
});

window.addEventListener('scroll', syncHeader, { passive: true });
syncHeader();

const revealItems = document.querySelectorAll('.aa-reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
