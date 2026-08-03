/* 酒虎詩龍 Dionysus & Loong — interactions */
(function () {
  'use strict';

  var root = document.documentElement;
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var panel = document.getElementById('menu-panel');
  var progress = document.getElementById('progress');

  var calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  /* ── hero entrance ─────────────────────────────────────────────────────
     Fires once the first paint is done, so the staggered reveal is actually
     seen rather than racing the initial render.                            */
  function start() { requestAnimationFrame(function () { root.classList.add('is-ready'); }); }
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start);

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

  panel.addEventListener('click', function (e) { if (e.target.closest('a')) closeMenu(); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && burger.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      burger.focus();
    }
  });

  /* ── scroll reveal + child stagger ─────────────────────────────────── */
  var REVEAL = [
    '.sec .kicker', '.split', '.stats', '.bill__g',
    '.note', '.tiles', '.cards', '.inline-cta',
    '.merch__item', '.drop', '.info', '.cta__in', '.foot__top'
  ].join(',');

  var STAGGER = [
    '.stats > li', '.bill__l > li', '.tiles > .tile', '.cards > .card',
    '.info > .info__card', '.tags > span', '.ticks > li'
  ].join(',');

  var targets = document.querySelectorAll(REVEAL);

  Array.prototype.forEach.call(targets, function (el) {
    el.classList.add('reveal');
    if (calm) return;
    Array.prototype.forEach.call(el.querySelectorAll(STAGGER), function (kid, i) {
      kid.classList.add('stagger');
      kid.style.setProperty('--i', i);
    });
  });

  function play(el) {
    el.classList.add('in');
    // Drop the stagger class once it has run: it owns transition-delay, which
    // would otherwise lag every subsequent hover on the same element.
    var kids = el.querySelectorAll('.stagger');
    if (!kids.length) return;
    var last = 700 + (kids.length - 1) * 55 + 120;
    setTimeout(function () {
      Array.prototype.forEach.call(kids, function (kid) {
        kid.classList.remove('stagger');
        kid.style.removeProperty('--i');
      });
    }, last);
  }

  if (!hasIO) {
    Array.prototype.forEach.call(targets, play);
  } else {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          play(entry.target);
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

  if (hasIO && sections.length) {
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

  /* ── one rAF loop for everything scroll-driven ─────────────────────── */
  var facade = document.querySelector('.storefront');
  var ticking = false;
  var stuck = false;

  function frame() {
    ticking = false;
    var y = window.scrollY || window.pageYOffset;

    var should = y > 40;
    if (should !== stuck) {
      stuck = should;
      nav.classList.toggle('is-stuck', stuck);
    }

    if (calm) return;

    if (progress) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = 'scaleX(' + (max > 0 ? Math.min(y / max, 1) : 0) + ')';
    }

    // Facade drifts against the scroll, measured from the viewport centre so it
    // sits at zero offset when centred, and clamped so it never breaks the grid.
    if (facade) {
      var box = facade.getBoundingClientRect();
      if (box.bottom > -200 && box.top < window.innerHeight + 200) {
        var rel = (box.top + box.height / 2 - window.innerHeight / 2) / window.innerHeight;
        var shift = Math.max(-18, Math.min(18, rel * -18));
        facade.style.transform = 'translateY(' + shift.toFixed(2) + 'px)';
      }
    }
  }

  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(frame); }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  frame();

  /* ── optional photography ──────────────────────────────────────────────
     Both slots are additive: a photo that 404s removes itself inline, and the
     class that changes the layout is only applied once one has really loaded,
     so an empty assets/img/ leaves the CSS artwork exactly as it was.        */
  function onLoaded(img, apply) {
    if (!img) return;
    if (img.complete && img.naturalWidth) apply();
    else img.addEventListener('load', apply);
  }

  var front = document.getElementById('front');
  onLoaded(front && front.querySelector('.canvas__photo'), function () {
    front.classList.add('has-photo');
  });

  var marquee = document.getElementById('marquee');
  if (marquee) {
    Array.prototype.forEach.call(marquee.querySelectorAll('.marquee__bg img'), function (img) {
      onLoaded(img, function () { marquee.classList.add('has-scene'); });
    });
  }

  /* ── pointer micro-interactions ────────────────────────────────────────
     Buttons lean toward the cursor, cards tilt under it. Both are strictly
     mouse-only: a coarse pointer has no hover to speak of, and the tilt would
     fight the scroll on touch.                                              */
  var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (fine && !calm) {
    // magnetic buttons — the -2px is the lift the CSS :hover would have given,
    // folded in here because an inline transform overrides it
    Array.prototype.forEach.call(document.querySelectorAll('.btn'), function (el) {
      var PULL = 0.28, MAX = 9;
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) * PULL;
        var dy = (e.clientY - (r.top + r.height / 2)) * PULL;
        dx = Math.max(-MAX, Math.min(MAX, dx));
        dy = Math.max(-MAX, Math.min(MAX, dy));
        el.style.transform = 'translate3d(' + dx.toFixed(1) + 'px,' + (dy - 2).toFixed(1) + 'px,0)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });

    // tilt cards
    Array.prototype.forEach.call(document.querySelectorAll('.card, .merch__art'), function (el) {
      var DEG = 5;
      el.style.transformStyle = 'preserve-3d';
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform =
          'perspective(900px) rotateY(' + (px * DEG * 2).toFixed(2) + 'deg) rotateX(' +
          (-py * DEG * 2).toFixed(2) + 'deg)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  /* ── footer year ───────────────────────────────────────────────────── */
  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
