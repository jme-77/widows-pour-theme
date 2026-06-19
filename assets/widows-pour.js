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
    els.forEach(function (el) { io.observe(el); });
  }

  /* ── Mobile nav toggle ── */
  function initMobileNav() {
    var toggle = document.querySelector('.wp-hamburger');
    var mobileNav = document.querySelector('.wp-mobile-nav');
    var close = document.querySelector('.wp-mobile-nav__close');
    var links = document.querySelectorAll('.wp-mobile-nav a');
    if (!toggle || !mobileNav) return;

    function open() {
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
      mobileNav.classList.contains('is-open') ? closeNav() : open();
    });
    if (close) close.addEventListener('click', closeNav);
    links.forEach(function (l) { l.addEventListener('click', closeNav); });
  }

  /* ── Active nav link ── */
  function initActiveNav() {
    var path = window.location.pathname;
    document.querySelectorAll('.wp-header__nav a').forEach(function (a) {
      if (a.getAttribute('href') === path) a.classList.add('is-active');
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
    var forms = document.querySelectorAll('.wp-newsletter__form');
    forms.forEach(function (form) {
      var success = form.closest('.wp-newsletter__inner')
                       .querySelector('.wp-newsletter__success');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('.wp-newsletter__input');
        if (!input || !input.value) return;
        form.style.display = 'none';
        if (success) success.style.display = 'block';
      });
    });
  }

  /* ── Cart icon badge ── */
  function initCartCount() {
    fetch('/cart.js')
      .then(function (r) { return r.json(); })
      .then(function (cart) {
        var badge = document.querySelector('.wp-cart-count');
        if (badge && cart.item_count > 0) {
          badge.textContent = cart.item_count;
          badge.style.display = 'flex';
        }
      })
      .catch(function () {});
  }

  /* ── Quantity selector ── */
  function initQty() {
    document.querySelectorAll('.wp-qty').forEach(function (wrap) {
      var minus = wrap.querySelector('[data-action="minus"]');
      var plus  = wrap.querySelector('[data-action="plus"]');
      var num   = wrap.querySelector('.wp-qty__num');
      var input = wrap.querySelector('input');
      if (!minus || !plus || !num) return;
      minus.addEventListener('click', function () {
        var v = parseInt(num.textContent) || 1;
        if (v > 1) { num.textContent = v - 1; if (input) input.value = v - 1; }
      });
      plus.addEventListener('click', function () {
        var v = parseInt(num.textContent) || 1;
        num.textContent = v + 1; if (input) input.value = v + 1;
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
  });
})();
