/**
 * PAVAN SAI BODDEDA — PORTFOLIO
 * script.js — Vanilla JS: animations, interactions, utilities
 * ============================================================
 */

/* =============================================
   1. THEME TOGGLE (Dark / Light)
   ============================================= */
const themeToggle = document.getElementById('themeToggle');
const html        = document.documentElement;

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  localStorage.setItem('psb-theme', theme);
}

// Load saved preference or fall back to dark
(function initTheme() {
  const saved = localStorage.getItem('psb-theme');
  applyTheme(saved || 'dark');
})();

themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});


/* =============================================
   2. NAVBAR — scroll + mobile burger
   ============================================= */
const navbar   = document.getElementById('navbar');
const navLinks = document.getElementById('navLinks');
const burger   = document.getElementById('navBurger');
const navAnchors = document.querySelectorAll('.nav-link');

// Add scrolled class when page is scrolled
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
  highlightActiveSection();
}, { passive: true });

// Mobile burger toggle
burger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  burger.classList.toggle('open', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
  // Prevent body scroll when menu is open
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close mobile menu when a link is clicked
navAnchors.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (
    navLinks.classList.contains('open') &&
    !navLinks.contains(e.target) &&
    !burger.contains(e.target)
  ) {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
});

// Active nav link highlighting
function highlightActiveSection() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY  = window.scrollY + 120;

  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    const link   = document.querySelector(`.nav-link[href="#${id}"]`);

    if (link) {
      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}


/* =============================================
   3. TYPING ANIMATION (Hero)
   ============================================= */
const typingEl = document.getElementById('typingText');

const typingPhrases = [
  'FastAPI Engineer',
  'AI/LLM Integrator',
  'RAG Pipeline Builder',
  'PostgreSQL Architect',
  'Microservices Designer',
  'Backend Problem Solver',
];

let phraseIdx  = 0;
let charIdx    = 0;
let isDeleting = false;
let typingTimer;

function typeLoop() {
  const currentPhrase = typingPhrases[phraseIdx];

  if (isDeleting) {
    charIdx--;
  } else {
    charIdx++;
  }

  typingEl.textContent = currentPhrase.slice(0, charIdx);

  let delay = isDeleting ? 55 : 90;

  if (!isDeleting && charIdx === currentPhrase.length) {
    // Pause at full word
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    phraseIdx  = (phraseIdx + 1) % typingPhrases.length;
    delay = 350;
  }

  typingTimer = setTimeout(typeLoop, delay);
}

// Start typing after a short delay
setTimeout(typeLoop, 1200);


/* =============================================
   4. SCROLL REVEAL (Intersection Observer)
   ============================================= */
const revealElements = document.querySelectorAll(
  '.reveal-up, .reveal-left, .reveal-right'
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Once revealed, stop observing
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));


/* =============================================
   5. COUNTER ANIMATION (Achievements)
   ============================================= */
const counters = document.querySelectorAll('.counter');

function animateCounter(el) {
  const target   = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1600; // ms
  const step     = Math.ceil(duration / target);
  let current    = 0;

  const timer = setInterval(() => {
    current += Math.max(1, Math.floor(target / 60));
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current;
  }, step);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach(el => counterObserver.observe(el));


/* =============================================
   6. CONTACT FORM — mailto handler
   ============================================= */
const sendBtn = document.getElementById('sendMessageBtn');

if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const name    = document.getElementById('contactName').value.trim();
    const email   = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    // Simple validation
    if (!name || !email || !message) {
      showToast('Please fill in Name, Email, and Message.', 'warn');
      return;
    }
    if (!isValidEmail(email)) {
      showToast('Please enter a valid email address.', 'warn');
      return;
    }

    const mailSubject = encodeURIComponent(subject || `Portfolio Contact from ${name}`);
    const mailBody    = encodeURIComponent(
      `Hi Pavan,\n\nMy name is ${name} (${email}).\n\n${message}\n\nBest regards,\n${name}`
    );

    window.location.href =
      `mailto:pavansai9911@gmail.com?subject=${mailSubject}&body=${mailBody}`;

    showToast('Opening your email client…', 'success');
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


/* =============================================
   7. TOAST NOTIFICATION
   ============================================= */
function showToast(message, type = 'success') {
  // Remove existing toast
  const existing = document.querySelector('.psb-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `psb-toast psb-toast--${type}`;
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');
  toast.textContent = message;

  // Inline styles so it works without extra CSS classes
  Object.assign(toast.style, {
    position:     'fixed',
    bottom:       '2rem',
    right:        '2rem',
    padding:      '0.85rem 1.4rem',
    borderRadius: '10px',
    fontSize:     '0.88rem',
    fontWeight:   '600',
    fontFamily:   'Inter, sans-serif',
    color:        '#fff',
    background:   type === 'success' ? '#6C63FF' : '#f59e0b',
    boxShadow:    '0 8px 28px rgba(0,0,0,0.25)',
    zIndex:       '9999',
    transform:    'translateY(20px)',
    opacity:      '0',
    transition:   'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease',
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity   = '1';
  });

  setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity   = '0';
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}


/* =============================================
   8. SMOOTH SCROLL for anchor links
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    const navH   = navbar.offsetHeight;
    const top    = target.getBoundingClientRect().top + window.scrollY - navH - 12;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* =============================================
   9. FOOTER YEAR
   ============================================= */
const footerYear = document.getElementById('footerYear');
if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}


/* =============================================
  10. SKILL PILL — hover ripple micro-interaction
   ============================================= */
document.querySelectorAll('.skill-pill').forEach(pill => {
  pill.addEventListener('mouseenter', function () {
    this.style.transform = 'scale(1.06) translateY(-1px)';
  });
  pill.addEventListener('mouseleave', function () {
    this.style.transform = '';
  });
});


/* =============================================
  11. PROJECT CARD — tilt effect (subtle)
   ============================================= */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const centerX = rect.left + rect.width  / 2;
    const centerY = rect.top  + rect.height / 2;
    const dx = (e.clientX - centerX) / (rect.width  / 2);
    const dy = (e.clientY - centerY) / (rect.height / 2);

    card.style.transform =
      `translateY(-6px) rotateX(${-dy * 3}deg) rotateY(${dx * 3}deg)`;
    card.style.transition = 'transform 0.1s ease';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform  = '';
    card.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
  });
});


/* =============================================
  12. RESUME DOWNLOAD — track + feedback
   ============================================= */
document.querySelectorAll('a[download]').forEach(btn => {
  btn.addEventListener('click', () => {
    showToast('Resume download started!', 'success');
  });
});


/* =============================================
  13. LAZY-LOAD images (future-proof)
   ============================================= */
if ('loading' in HTMLImageElement.prototype) {
  document.querySelectorAll('img[data-src]').forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback: IntersectionObserver polyfill path
  const lazyObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src   = img.dataset.src;
        lazyObserver.unobserve(img);
      }
    });
  });
  document.querySelectorAll('img[data-src]').forEach(img => lazyObserver.observe(img));
}


/* =============================================
  14. KEYBOARD ACCESSIBILITY — skip to main
   ============================================= */
(function addSkipLink() {
  const skip  = document.createElement('a');
  skip.href   = '#about';
  skip.textContent = 'Skip to main content';
  Object.assign(skip.style, {
    position:   'absolute',
    top:        '-100px',
    left:       '1rem',
    padding:    '0.5rem 1rem',
    background: '#6C63FF',
    color:      '#fff',
    borderRadius: '0 0 8px 8px',
    fontWeight: '600',
    zIndex:     '9999',
    transition: 'top 0.2s',
  });
  skip.addEventListener('focus', () => { skip.style.top = '0'; });
  skip.addEventListener('blur',  () => { skip.style.top = '-100px'; });
  document.body.prepend(skip);
})();


/* =============================================
  15. PERFORMANCE — defer non-critical work
   ============================================= */
window.addEventListener('load', () => {
  // Trigger initial active nav highlight
  highlightActiveSection();

  // Animate hero elements on first load
  document.querySelectorAll('.hero .reveal-up, .hero .reveal-right').forEach(el => {
    // These are already handled by IntersectionObserver but hero is above fold
    el.classList.add('visible');
  });
});
