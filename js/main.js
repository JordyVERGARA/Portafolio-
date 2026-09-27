
(function () {
  'use strict';

  const DESKTOP_QUERY = window.matchMedia('(min-width: 62rem)');
  const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)');


  function initMenu() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const menu = document.querySelector('[data-menu]');
    const label = document.querySelector('[data-menu-label]');
    if (!toggle || !menu) return;

    function setOpen(isOpen) {
      toggle.setAttribute('aria-expanded', String(isOpen));
      menu.classList.toggle('is-open', isOpen);
      if (label) label.textContent = isOpen ? 'Cerrar menú' : 'Abrir menú';
    }

    function isOpen() {
      return toggle.getAttribute('aria-expanded') === 'true';
    }

    toggle.addEventListener('click', function () {
      setOpen(!isOpen());
    });

    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (isOpen() && !menu.contains(event.target) && !toggle.contains(event.target)) {
        setOpen(false);
      }
    });

    DESKTOP_QUERY.addEventListener('change', function (event) {
      if (event.matches) setOpen(false);
    });
  }


  function initScrollUI() {
    const header = document.getElementById('site-header');
    const backToTop = document.querySelector('[data-back-to-top]');
    let ticking = false;

    function update() {
      const y = window.scrollY;
      if (header) header.classList.toggle('is-scrolled', y > 8);
      if (backToTop) backToTop.classList.toggle('is-visible', y > window.innerHeight * 0.8);
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });

    update();

    if (backToTop) {
      backToTop.addEventListener('click', function (event) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: REDUCED_MOTION.matches ? 'auto' : 'smooth' });
        const brand = document.querySelector('.navbar__brand');
        if (brand) brand.focus({ preventScroll: true });
      });
    }
  }


  function initScrollSpy() {
    const links = Array.from(document.querySelectorAll('.navbar__link[href^="#"]'));
    if (!links.length || !('IntersectionObserver' in window)) return;

    const linkById = new Map();
    links.forEach(function (link) {
      const section = document.querySelector(link.getAttribute('href'));
      if (section) linkById.set(section.id, link);
    });

    function setActive(id) {
      links.forEach(function (link) {
        const active = linkById.get(id) === link;
        link.classList.toggle('is-active', active);
        if (active) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    linkById.forEach(function (_link, id) {
      observer.observe(document.getElementById(id));
    });
  }


  function initReveal() {
    const items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (item) { item.classList.add('is-revealed'); });
      return;
    }

    const observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (item) { observer.observe(item); });
  }


  function initYear() {
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  initMenu();
  initScrollUI();
  initScrollSpy();
  initReveal();
  initYear();
})();
