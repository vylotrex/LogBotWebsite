export function mountReveal() {
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: .08 });
  els.forEach(el => io.observe(el));
}
