/* 酒虎詩龍 Dionysus & Loong — interactions */
(function () {
  'use strict';

  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var panel = document.getElementById('menu-panel');

  /* ── sticky header ─────────────────────────────────────────────────── */
  var stuck = false;
  function onScroll() {
    var should = window.scrollY > 40;
    if (should !== stuck) {
      stuck = should;
      nav.classList.toggle('is-stuck', stuck);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── mobile menu ───────────────────────────────────────────────────── */
  function closeMenu() {
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', '開啟選單');
    panel.classList.remove('is-open');
    nav.classList.remove('is-open');
  }

  burger.addEventListener('click', function () {
    if (burger.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    } else {
      burger.setAttribute('aria-expanded', 'true');
      burger.setAttribute('aria-label', '關閉選單');
      panel.classList.add('is-open');
      nav.classList.add('is-open');
    }
  });

  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) closeMenu();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      burger.focus();
    }
  });

  /* ── reveal on scroll ──────────────────────────────────────────────── */
  var SELECTOR = [
    '.sec .kicker', '.split', '.stats', '.course',
    '.secret', '.note', '.tiles', '.cards', '.inline-cta',
    '.merch__item', '.info', '.cta__in', '.canvas--front', '.foot__top'
  ].join(',');

  var targets = document.querySelectorAll(SELECTOR);
  Array.prototype.forEach.call(targets, function (el) { el.classList.add('reveal'); });

  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add('in'); });
  } else {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

    Array.prototype.forEach.call(targets, function (el) { revealer.observe(el); });
  }

  /* ── active nav link ───────────────────────────────────────────────── */
  var sections = document.querySelectorAll('main > section[id]');
  var links = {};
  Array.prototype.forEach.call(panel.querySelectorAll('a[href^="#"]'), function (a) {
    links[a.getAttribute('href').slice(1)] = a;
  });

  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = links[entry.target.id];
        if (link && entry.isIntersecting) {
          Object.keys(links).forEach(function (id) { links[id].classList.remove('is-active'); });
          link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    Array.prototype.forEach.call(sections, function (s) { spy.observe(s); });
  }

  /* ── footer year ───────────────────────────────────────────────────── */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
