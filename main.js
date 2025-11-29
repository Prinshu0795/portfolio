// Mobile navbar toggle
const navToggle = document.getElementById("navToggle");
const nav = document.querySelector(".nav");

navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  nav.classList.toggle("show");
});

// Set current year in footer
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

/* --------------------------
   Section reveal on scroll
   -------------------------- */
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced) {
  const revealEls = document.querySelectorAll('.section--reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => io.observe(el));
} else {
  // if reduced motion, just make visible
  document.querySelectorAll('.section--reveal').forEach(el => el.classList.add('is-visible'));
}

/* --------------------------
   Typewriter-ish role reveal
   - keeps original text content intact in the DOM
   -------------------------- */
(function animateRole() {
  if (prefersReduced) return;
  const roleEl = document.querySelector('.role');
  if (!roleEl) return;

  const fullText = (roleEl.getAttribute('data-role') || roleEl.textContent).trim();
  roleEl.textContent = ''; // clear and rebuild

  let i = 0;
  const interval = 35;
  function step() {
    if (i <= fullText.length) {
      roleEl.textContent = fullText.slice(0, i);
      i++;
      setTimeout(step, interval);
    } else {
      // small glow effect after typing
      roleEl.style.textShadow = '0 6px 30px rgba(124,58,237,0.12)';
    }
  }
  setTimeout(step, 500); // small delay so other hero animations run first
})();

/* --------------------------
   Small accessibility improvement:
   close mobile nav on outside click
   -------------------------- */
document.addEventListener('click', (e) => {
  const isClickInsideNav = nav.contains(e.target) || navToggle.contains(e.target);
  if (!isClickInsideNav && nav.classList.contains('show')) {
    nav.classList.remove('show');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});
