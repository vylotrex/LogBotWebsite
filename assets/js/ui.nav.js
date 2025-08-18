export function mountNavActive() {
  const sections = ['hero','features','commands','comparison','developer']
    .map(id => document.getElementById(id))
    .filter(Boolean);
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = navLinks.find(a => a.getAttribute('href') === `#${id}`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px', threshold: 0.01 });

  sections.forEach(s => io.observe(s));
}

// Optional smooth-scroll polyfill if you don't want CSS behavior
export function enableSmoothLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
    });
  });
}
