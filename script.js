/* =============================================
   VIVAZ BIKE SHOP — script.js
   ============================================= */

// ─── NAV SCROLL EFFECT ──────────────────────────
const nav = document.getElementById('nav');
function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ─── MOBILE BURGER MENU ─────────────────────────
const burger   = document.getElementById('nav-burger');
const mobileNav = document.getElementById('nav-mobile');

if (burger && mobileNav) {
  burger.addEventListener('click', () => {
    const isOpen = burger.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      mobileNav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

// ─── SCROLL ANIMATIONS (IntersectionObserver) ───
const animatedEls = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

animatedEls.forEach(el => observer.observe(el));

// ─── SMOOTH ANCHOR SCROLL ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── FLOATING WA BUTTON — Show after scroll ─────
const floatingWa = document.getElementById('floating-whatsapp-btn');
if (floatingWa) {
  let waVisible = false;
  function toggleFloatingWa() {
    const shouldShow = window.scrollY > 200;
    if (shouldShow !== waVisible) {
      waVisible = shouldShow;
      floatingWa.style.opacity    = shouldShow ? '1' : '0';
      floatingWa.style.transform  = shouldShow ? 'translateY(0)' : 'translateY(20px)';
      floatingWa.style.pointerEvents = shouldShow ? 'auto' : 'none';
    }
  }
  // Start hidden
  floatingWa.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  floatingWa.style.opacity    = '0';
  floatingWa.style.transform  = 'translateY(20px)';
  floatingWa.style.pointerEvents = 'none';
  window.addEventListener('scroll', toggleFloatingWa, { passive: true });
  toggleFloatingWa();
}

// ─── ACTIVE NAV LINK (highlight on scroll) ──────
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link');

function highlightNav() {
  const scrollY = window.scrollY;
  sections.forEach(section => {
    const top    = section.offsetTop - 100;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'nav__link--active',
          link.getAttribute('href') === `#${id}`
        );
      });
    }
  });
}
window.addEventListener('scroll', highlightNav, { passive: true });

// ─── PARALLAX HERO IMAGE ─────────────────────────
const heroImg = document.querySelector('.hero__img');
if (heroImg && window.matchMedia('(min-width: 860px)').matches) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroImg.style.transform = `translateY(${scrolled * 0.3}px)`;
  }, { passive: true });
}
