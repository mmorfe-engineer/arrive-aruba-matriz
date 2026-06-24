document.documentElement.classList.add('js');

const header = document.querySelector('[data-header]');
const syncHeader = () => {
  header.classList.toggle('is-scrolled', window.scrollY > 12);
};

window.addEventListener('scroll', syncHeader, { passive: true });
syncHeader();

const items = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  items.forEach((item) => observer.observe(item));
} else {
  items.forEach((item) => item.classList.add('is-visible'));
}

const flowTabs = document.querySelectorAll('[data-screen]');
const phoneScreens = document.querySelectorAll('[data-phone-screen]');

flowTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-screen');

    flowTabs.forEach((item) => item.classList.toggle('is-active', item === tab));
    phoneScreens.forEach((screen) => {
      screen.classList.toggle('is-active', screen.getAttribute('data-phone-screen') === target);
    });
  });
});
