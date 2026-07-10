/* Widow's Pour — Theme JavaScript */
(function () {
  'use strict';

  /* ── Intersection Observer for .wp-reveal ── */
  function initReveal() {
    const els = document.querySelectorAll('.wp-reveal');
    if (!els.length) return;

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    els.forEach(function (el) {
      io.observe(el);
    });
  }

  /* ── Mobile nav toggle ── */
  function initMobileNav() {
    const toggle = document.querySelector('.wp-hamburger');
    const mobileNav = document.querySelector('.wp-mobile-nav');
    const close = document.querySelector('.wp-mobile-nav__close');
    const links = document.querySelectorAll('.wp-mobile-nav a');
    if (!toggle || !mobileNav) return;

    function openNav() {
      toggle.classList.add('is-open');
      mobileNav.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeNav() {
      toggle.classList.remove('is-open');
      mobileNav.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function () {
      mobileNav.classList.contains('is-open') ? closeNav() : openNav();
    });

    if (close) close.addEventListener('click', closeNav);
    links.forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }

  /* ── Active nav link ── */
  function initActiveNav() {
    const path = window.location.pathname;
    document.querySelectorAll('.wp-header__nav a').forEach(function (a) {
      if (a.getAttribute('href') === path) {
        a.classList.add('is-active');
      }
    });
  }

  /* ── Flame pulse animation delay ── */
  function initFlameDelays() {
    document.querySelectorAll('.wp-memorial__candle-icon').forEach(function (el, i) {
      el.style.animation = 'flamePulse 3s ' + (i * 0.5) + 's ease-in-out infinite';
    });
  }

  /* ── Newsletter form ── */
  function initNewsletter() {
    const forms = document.querySelectorAll('.wp-newsletter__form');
    forms.forEach(function (form) {
      const success = form.closest('.wp-newsletter__inner')
                           .querySelector('.wp-newsletter__success');

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const input = form.querySelector('.wp-newsletter__input');
        if (!input || !input.value) return;
        form.style.display = 'none';
        if (success) success.style.display = 'block';
      });
    });
  }

  /* ── Cart icon badge ── */
  function initCartCount() {
    fetch('/cart.js')
      .then(function (response) {
        return response.json();
      })
      .then(function (cart) {
        const badge = document.querySelector('.wp-cart-count');
        if (badge && cart.item_count > 0) {
          badge.textContent = cart.item_count;
          badge.style.display = 'flex';
        }
      })
      .catch(function () {
        // ignore cart fetch errors
      });
  }

  /* ── Quantity selector ── */
  function initQty() {
    document.querySelectorAll('.wp-qty').forEach(function (wrap) {
      const minus = wrap.querySelector('[data-action="minus"]');
      const plus = wrap.querySelector('[data-action="plus"]');
      const num = wrap.querySelector('.wp-qty__num');
      const input = wrap.querySelector('input');
      if (!minus || !plus || !num) return;

      minus.addEventListener('click', function () {
        const value = parseInt(num.textContent, 10) || 1;
        if (value > 1) {
          num.textContent = value - 1;
          if (input) input.value = value - 1;
        }
      });

      plus.addEventListener('click', function () {
        const value = parseInt(num.textContent, 10) || 1;
        num.textContent = value + 1;
        if (input) input.value = value + 1;
      });
    });
  }

  /* ── Page fade transition ── */
  function initPageFade() {
    document.body.classList.add('wp-fade-in');

    document.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href.startsWith('#') || this.target === '_blank') return;

        e.preventDefault();
        const targetUrl = this.href;

        document.body.classList.remove('wp-fade-in');
        document.body.classList.add('wp-fade-out');

        setTimeout(function () {
          window.location.href = targetUrl;
        }, 500);
      });
    });
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initMobileNav();
    initActiveNav();
    initFlameDelays();
    initNewsletter();
    initCartCount();
    initQty();
    initPageFade();
  });
})();