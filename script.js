/* ==========================================================================
   ABEI Solutions — script.js
   Vanilla JS, no dependencies. Each function is self-contained and guarded
   so a missing element never throws — sections can be edited independently.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  initHeaderScroll();
  initMobileMenu();
  initHeroInteraction();
  initServiceAccordion();
  initProcessProgress();
  initContactForm();
  initPlaceholderLinks();
  initAnchorFocus();
  initFooterYear();

  /* Sticky header gains a border/shadow once the page has scrolled. */
  function initHeaderScroll() {
    const header = document.getElementById('siteHeader');
    if (!header) return;
    let ticking = false;
    const update = () => {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* Full-screen mobile nav: opens/closes, locks scroll, closes on link click or Escape. */
  function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('mobileMenu');
    const closeBtn = document.getElementById('mobileMenuClose');
    if (!toggle || !menu) return;

    const openMenu = () => {
      menu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close menu');
      document.documentElement.classList.add('no-scroll');
      if (closeBtn) closeBtn.focus({ preventScroll: true });
    };
    const closeMenu = () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open menu');
      document.documentElement.classList.remove('no-scroll');
      toggle.focus({ preventScroll: true });
    };

    toggle.addEventListener('click', () => {
      menu.classList.contains('is-open') ? closeMenu() : openMenu();
    });
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) closeMenu();
    });
  }

  /* The one signature interactive moment: a soft glow and gentle parallax
     on the hero's browser mockups, following the cursor. Skipped entirely
     on touch devices and when the visitor prefers reduced motion. */
  function initHeroInteraction() {
    const hero = document.querySelector('.hero');
    if (!hero || !canHover || prefersReducedMotion) return;

    const layers = hero.querySelectorAll('[data-depth]');
    let frame = null;

    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const xPct = ((e.clientX - rect.left) / rect.width) * 100;
      const yPct = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty('--mx', xPct + '%');
      hero.style.setProperty('--my', yPct + '%');

      const relX = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const relY = (e.clientY - rect.top - rect.height / 2) / rect.height;

      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        layers.forEach((layer) => {
          const depth = parseFloat(layer.dataset.depth) || 0;
          layer.style.setProperty('--parallax-x', relX * depth * 50 + 'px');
          layer.style.setProperty('--parallax-y', relY * depth * 50 + 'px');
        });
      });
    });
  }

  /* Services list: click-to-expand, one panel independent of the others. */
  function initServiceAccordion() {
    document.querySelectorAll('.service-header').forEach((header) => {
      header.addEventListener('click', () => {
        const row = header.closest('.service-row');
        if (!row) return;
        const expanded = header.getAttribute('aria-expanded') === 'true';
        header.setAttribute('aria-expanded', String(!expanded));
        row.classList.toggle('is-open', !expanded);
      });
    });
  }

  /* Process section: as each step scrolls into view, mark it active and
     grow the connecting line to match — a progress indicator for a
     genuinely sequential set of steps, not a decorative reveal. */
  function initProcessProgress() {
    const steps = document.querySelectorAll('.process-step');
    const fill = document.getElementById('processFill');
    if (!steps.length) return;

    if (prefersReducedMotion) {
      steps.forEach((s) => s.classList.add('is-active'));
      if (fill) fill.style.setProperty('--fill-pct', '100%');
      return;
    }

    const total = steps.length;
    let maxReached = 0;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-active');
        const index = Array.from(steps).indexOf(entry.target);
        maxReached = Math.max(maxReached, index + 1);
        if (fill) fill.style.setProperty('--fill-pct', (maxReached / total) * 100 + '%');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    steps.forEach((step) => io.observe(step));
  }

  /* Contact form: front-end-only validation with inline errors, a brief
     simulated send, and a polished success state. Nothing is transmitted. */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const successPanel = document.getElementById('formSuccess');
    const statusEl = document.getElementById('formStatus');
    const submitBtn = form.querySelector('.form-submit');
    const resetBtn = document.getElementById('formReset');

    const fields = [
      { input: form.elements.name, message: 'Please enter your name.', validate: (v) => v.trim().length > 1 },
      { input: form.elements.email, message: 'Please enter a valid email address.', validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
      { input: form.elements.businessType, message: 'Please select a business type.', validate: (v) => v !== '' },
      { input: form.elements.details, message: 'Tell us a little more about your project.', validate: (v) => v.trim().length > 9 },
    ];

    const showError = (field, show) => {
      const wrapper = field.input.closest('.field');
      if (!wrapper) return;
      const errorEl = wrapper.querySelector('.field-error');
      wrapper.classList.toggle('field--invalid', show);
      field.input.setAttribute('aria-invalid', String(show));
      if (errorEl) errorEl.textContent = show ? field.message : '';
    };

    fields.forEach((field) => {
      const evt = field.input.tagName === 'SELECT' ? 'change' : 'input';
      field.input.addEventListener(evt, () => {
        if (field.validate(field.input.value)) showError(field, false);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let firstInvalid = null;

      fields.forEach((field) => {
        const valid = field.validate(field.input.value);
        showError(field, !valid);
        if (!valid && !firstInvalid) firstInvalid = field.input;
      });

      if (firstInvalid) {
        firstInvalid.focus();
        if (statusEl) statusEl.textContent = 'Please fix the highlighted fields.';
        return;
      }

      submitBtn.disabled = true;
      const originalLabel = submitBtn.textContent;
      submitBtn.textContent = 'Sending…';
      if (statusEl) statusEl.textContent = 'Sending your message…';

      window.setTimeout(() => {
        form.hidden = true;
        successPanel.hidden = false;
        successPanel.focus();
        if (statusEl) statusEl.textContent = 'Message sent successfully.';
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }, 850);
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        form.hidden = false;
        successPanel.hidden = true;
        fields.forEach((field) => showError(field, false));
        form.elements.name.focus();
      });
    }
  }

  /* Social links are placeholders until real profiles exist — clicks are
     acknowledged, not left to jump the page to the top. */
  function initPlaceholderLinks() {
    document.querySelectorAll('a[href="#"]').forEach((link) => {
      link.addEventListener('click', (e) => e.preventDefault());
    });
  }

  /* After a nav link scrolls a section into view, move focus to it so
     keyboard and screen-reader users land where the page visually does. */
  function initAnchorFocus() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((link) => {
      link.addEventListener('click', () => {
        const target = document.getElementById(link.getAttribute('href').slice(1));
        if (!target) return;
        window.setTimeout(() => {
          target.setAttribute('tabindex', '-1');
          target.focus({ preventScroll: true });
        }, prefersReducedMotion ? 0 : 550);
      });
    });
  }

  function initFooterYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }
});
