/* ======================================
   CONFIG – update your links & info here
   ====================================== */
const CONFIG = {
  socials: {
    whatsapp: 'https://wa.me/234XXXXXXXXXX',
    facebook: 'https://facebook.com/yourusername',
    twitter:  'https://x.com/yourusername',
    email:    'mailto:your-email@gmail.com',
    phone:    'tel:+234XXXXXXXXXX',
  },
  roles: [
    'Web Developer',
    'Network Engineer',
    'Frontend Designer',
    'Gamer',
    'Problem Solver',
  ],
};

/* ======================================
   ELEMENTS
   ====================================== */
const html         = document.documentElement;
const body         = document.body;
const navbar       = document.getElementById('navbar');
const navLinks     = document.getElementById('navLinks');
const hamburger    = document.getElementById('hamburger');
const themeToggle  = document.getElementById('themeToggle');
const themeIcon    = document.getElementById('themeIcon');
const typewriterEl = document.getElementById('typewriter');
const yearEl       = document.getElementById('year');
const backToTop    = document.getElementById('backToTop');
const allLinks     = document.querySelectorAll('.nav-link');

/* ======================================
   THEME
   ====================================== */
function setTheme(mode) {
  html.setAttribute('data-theme', mode);
  localStorage.setItem('theme', mode);
  themeIcon.className = mode === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
}

(function initTheme() {
  const saved = localStorage.getItem('theme');
  setTheme(saved || 'dark');
})();

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

/* ======================================
   TYPEWRITER
   ====================================== */
let roleIndex = 0;
let charIndex = 0;
let deleting  = false;

function typeLoop() {
  const currentRole = CONFIG.roles[roleIndex];
  if (!deleting) {
    typewriterEl.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      deleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
    setTimeout(typeLoop, 90);
  } else {
    typewriterEl.textContent = currentRole.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % CONFIG.roles.length;
      setTimeout(typeLoop, 400);
      return;
    }
    setTimeout(typeLoop, 50);
  }
}
typeLoop();

/* ======================================
   HAMBURGER
   ====================================== */
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ======================================
   ACTIVE NAV ON SCROLL
   ====================================== */
function setActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  allLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

/* ======================================
   SCROLL REVEAL
   ====================================== */
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 60) {
      el.classList.add('visible');
    }
  });
}

/* ======================================
   SKILL BARS
   ====================================== */
function animateSkillBars() {
  document.querySelectorAll('.skill-card').forEach(card => {
    if (card.getBoundingClientRect().top < window.innerHeight - 40) {
      card.querySelectorAll('.bar').forEach(bar => bar.classList.add('animated'));
    }
  });
}

/* ======================================
   BACK TO TOP
   ====================================== */
function handleBackToTop() {
  backToTop.classList.toggle('visible', window.scrollY > 500);
}
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ======================================
   FOOTER YEAR
   ====================================== */
yearEl.textContent = new Date().getFullYear();

/* ======================================
   SCROLL LISTENER
   ====================================== */
function onScroll() {
  setActiveLink();
  revealOnScroll();
  animateSkillBars();
  handleBackToTop();
}
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('load', onScroll);