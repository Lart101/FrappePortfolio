// ── Page Loader ──
function hideLoader() {
  document.getElementById('pageLoader').classList.add('hidden');
}
document.addEventListener('DOMContentLoaded', () => setTimeout(hideLoader, 300));
// Safety fallback in case DOMContentLoaded already fired
setTimeout(hideLoader, 2000);

// ── Scroll Reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.06, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.stagger').forEach(el => revealObserver.observe(el));

// ── Nav: active link + scroll shadow ──
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

function onScroll() {
  const y = window.scrollY;
  // Nav shadow
  navbar.classList.toggle('scrolled', y > 30);
  // Active section
  let currentId = '';
  sections.forEach(s => {
    if (y >= s.offsetTop - 120) currentId = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + currentId);
  });
  // Scroll progress
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  document.getElementById('scrollProgress').style.transform = `scaleX(${docH > 0 ? y / docH : 0})`;
  // Back to top
  document.getElementById('backToTop').classList.toggle('show', y > 500);
}
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(() => { onScroll(); ticking = false; }); ticking = true; }
}, { passive: true });
onScroll();

// ── Mobile nav toggle ──
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
document.querySelectorAll('.nav-menu a').forEach(a => {
  a.addEventListener('click', () => navMenu.classList.remove('open'));
});

// ── Animated stat counters ──
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.dataset.count;
      let current = 0;
      const step = Math.max(1, Math.floor(target / 30));
      const interval = setInterval(() => {
        current += step;
        if (current >= target) { current = target; clearInterval(interval); }
        el.textContent = current + '+';
      }, 40);
      statObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => statObserver.observe(el));

// ── Smooth parallax for hero image ──
const heroRing = document.querySelector('.hero-img-ring');
if (heroRing && window.innerWidth > 768) {
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      heroRing.style.transform = `translateY(${window.scrollY * 0.04 - 12}px)`;
    }
  }, { passive: true });
}
