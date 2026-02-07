(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Smooth scroll and scroll-spy
  const links = Array.from(document.querySelectorAll('.nav a'));
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href')?.replace('#','');
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        navLinks.classList.remove('open');
        target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
      }
    });
  });

  const sections = Array.from(document.querySelectorAll('section'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        links.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === `#${id}`));
      }
    });
  }, { threshold: 0.35 });
  sections.forEach(sec => observer.observe(sec));

  // Animate-in for process cards and other elements with data-animate
  const animatables = document.querySelectorAll('[data-animate]');
  const animateObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        animateObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  animatables.forEach(el => animateObs.observe(el));

  // Accordion for projects
  document.querySelectorAll('[data-accordion]').forEach(card => {
    const btn = card.querySelector('button[aria-controls]');
    const panel = card.querySelector('.accordion');
    btn?.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      panel?.classList.toggle('open', !expanded);
    });
  });

  // Notes read more
  document.querySelectorAll('[data-note]').forEach(note => {
    const toggle = note.querySelector('.note__toggle');
    const body = note.querySelector('.note__body');
    toggle?.addEventListener('click', () => {
      const open = body?.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(Boolean(open)));
      toggle.textContent = open ? 'Show less' : 'Read more';
    });
  });

  // Theme toggle
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  themeToggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);

  // Copy email
  const copyBtn = document.getElementById('copyEmail');
  const copyToast = document.getElementById('copyToast');
  const email = 'zeyad@example.com';
  copyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
      copyToast.textContent = 'Copied!';
    } catch (err) {
      copyToast.textContent = 'Copy failed — use zeyad@example.com';
    }
    setTimeout(() => copyToast.textContent = '', 2000);
  });
})();
