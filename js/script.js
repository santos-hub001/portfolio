/* ======================================
   CONFIG – update your links & info here
   ====================================== */
const CONFIG = {
  socials: {
    whatsapp: 'https://wa.me/2348069916124',
    facebook: 'https://facebook.com/',
    twitter:  'https://x.com/askofsantos',
    email:    'anthonychuma56@gmail.com',
    phone:    '+2348069916124',
  },
  formspreeEndpoint: 'https://formspree.io/f/mvkgpzon',
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
   PROFILE PICTURE LIGHTBOX + PROTECTION
   ====================================== */
const profileFrame  = document.getElementById('profileFrame');
const profileLightbox = document.getElementById('profileLightbox');

function openProfile() {
  profileLightbox.classList.add('open');
  profileLightbox.setAttribute('aria-hidden', 'false');
  body.style.overflow = 'hidden';
}
function closeProfile() {
  profileLightbox.classList.remove('open');
  profileLightbox.setAttribute('aria-hidden', 'true');
  body.style.overflow = '';
}
profileFrame.addEventListener('click', openProfile);
profileLightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeProfile);
profileLightbox.querySelector('.lightbox-close').addEventListener('click', closeProfile);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProfile();
});

function blockEvent(e) { e.preventDefault(); }

[profileFrame, profileLightbox].forEach(el => {
  el.addEventListener('contextmenu', blockEvent);
  el.addEventListener('dragstart', blockEvent);
  el.addEventListener('selectstart', blockEvent);
});
profileLightbox.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && ['s', 'p', 'u'].includes(e.key.toLowerCase())) blockEvent(e);
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

/* ======================================
   CONTACT FORM
   ====================================== */
const contactForm = document.getElementById('contactForm');
const formStatus  = document.getElementById('formStatus');

function setFormMessage(msg, type, keepSpinner) {
  formStatus.className = 'form-status ' + (type || '');
  formStatus.innerHTML = keepSpinner ? '<span class="spinner"></span>' + msg : msg;
}

function validateField(el) {
  const ok = el.checkValidity();
  el.classList.toggle('input-error', !ok);
  return ok;
}

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name    = document.getElementById('name');
    const email   = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    const fields = [name, email, subject, message];
    const allValid = fields.every(validateField);

    if (!allValid) {
      setFormMessage('Please fill in all fields correctly.', 'error');
      return;
    }

    const data = { name: name.value, email: email.value, subject: subject.value, message: message.value };
    const submitBtn = contactForm.querySelector('.form-submit');
    const btnLabel  = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
    setFormMessage('Sending your message...', '', true);

    if (CONFIG.formspreeEndpoint) {
      try {
        const res = await fetch(CONFIG.formspreeEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data),
        });
        if (res.ok) {
          setFormMessage('Message sent! I\'ll get back to you soon. 🎉', 'success');
          contactForm.reset();
        } else {
          setFormMessage('Something went wrong. Please try again.', 'error');
        }
      } catch (err) {
        setFormMessage('Network error. Please try again.', 'error');
      }
    } else {
      const mailto = `${CONFIG.socials.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent('Name: ' + data.name + '\nEmail: ' + data.email + '\n\n' + data.message)}`;
      try {
        window.location.href = mailto;
        setFormMessage('Your email app should open now. If nothing happened, your email address needs to be set in js/script.js → CONFIG.', 'success');
      } catch (err) {
        setFormMessage('Could not open your email app.', 'error');
      }
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = btnLabel;
  });

  contactForm.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => {
      if (el.classList.contains('input-error')) validateField(el);
    });
  });
}