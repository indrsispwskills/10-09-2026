(() => {
  const root = document;
  if (!root) return;

  const on = (target, event, handler, options) => target && target.addEventListener(event, handler, options);

  function initNav() {
    const nav = root.querySelector('nav');
    if (!nav || nav.dataset.seBound === '1') return;
    nav.dataset.seBound = '1';

    const logoCircles = nav.querySelectorAll('svg circle');
    const logoPath = nav.querySelector('svg path');
    const crest = nav.querySelector('.hero__panel-crest');

    const update = () => {
      const isScrolled = window.scrollY > 60;
      nav.classList.toggle('nav-scrolled', isScrolled);
      if (logoCircles[0]) logoCircles[0].setAttribute('fill', isScrolled ? 'rgba(94,138,106,.12)' : 'rgba(255,255,255,.15)');
      if (logoPath) logoPath.setAttribute('stroke', isScrolled ? 'var(--sage)' : '#fff');
      if (logoCircles[1]) logoCircles[1].setAttribute('fill', isScrolled ? 'var(--sage)' : '#fff');

      if (crest) {
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const progress = Math.max(0, Math.min(1, window.scrollY / maxScroll));
        crest.style.width = `${(progress * 100).toFixed(2)}%`;
        crest.style.opacity = progress > 0.01 ? '1' : '0';
      }
    };

    on(window, 'scroll', update, { passive: true });
    on(window, 'resize', update);
    update();
  }

  function initMenu() {
    const menuBtn = root.querySelector('.ham');
    const menu = root.querySelector('.mob-menu');
    const overlay = root.querySelector('.mob-overlay');
    const closeBtn = root.querySelector('.mob-close');
    if (!menuBtn || !menu || !overlay || menuBtn.dataset.seMenuBound === '1') return;
    menuBtn.dataset.seMenuBound = '1';

    const closeMenu = () => {
      menu.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    };
    const openMenu = () => {
      menu.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    on(menuBtn, 'click', openMenu);
    on(closeBtn, 'click', closeMenu);
    on(overlay, 'click', closeMenu);
    root.querySelectorAll('.mob-menu a').forEach((a) => {
      if (a.dataset.seMenuBound === '1') return;
      a.dataset.seMenuBound = '1';
      on(a, 'click', closeMenu);
    });
  }

  function initFaq(scope = root) {
    const faqButtons = Array.from(scope.querySelectorAll('#faq button, .faq-section__entry-kindle-pulse'));
    faqButtons.forEach((btn) => {
      if (btn.dataset.seFaqBound === '1') return;
      btn.dataset.seFaqBound = '1';

      on(btn, 'click', () => {
        const answerWrap = btn.nextElementSibling;
        if (!answerWrap) return;
        const plus = btn.querySelector('span:last-child');
        const isOpen = answerWrap.classList.contains('faq-item-open');

        (root.querySelectorAll('#faq button, .faq-section__entry-kindle-pulse')).forEach((b) => {
          const aw = b.nextElementSibling;
          const p = b.querySelector('span:last-child');
          if (aw) aw.classList.remove('faq-item-open');
          if (p) p.classList.remove('faq-plus-open');
        });

        if (!isOpen) {
          answerWrap.classList.add('faq-item-open');
          if (plus) plus.classList.add('faq-plus-open');
        }
      });
    });
  }

  function initBackToTop() {
    const backToTop = root.querySelector('button[aria-label="Back to top"]');
    if (!backToTop || backToTop.dataset.seTopBound === '1') return;
    backToTop.dataset.seTopBound = '1';

    backToTop.classList.add('back-to-top');
    on(backToTop, 'click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    const update = () => backToTop.classList.toggle('show', window.scrollY > 800);
    on(window, 'scroll', update, { passive: true });
    update();
  }

  function initMobileCta() {
    const mobileCta = root.querySelector('.mob-cta');
    if (!mobileCta || mobileCta.dataset.seCtaBound === '1') return;
    mobileCta.dataset.seCtaBound = '1';

    const update = () => {
      const show = window.matchMedia('(max-width: 768px)').matches && window.scrollY > 500;
      mobileCta.classList.toggle('show', show);
    };

    on(window, 'scroll', update, { passive: true });
    on(window, 'resize', update);
    update();

    const ctaBtn = mobileCta.querySelector('button');
    on(ctaBtn, 'click', () => {
      const products = root.querySelector('#products');
      if (products) products.scrollIntoView({ behavior: 'smooth' });
    });
  }

  function initSmoothScroll(scope = root) {
    scope.querySelectorAll('a[href^="#"]').forEach((a) => {
      if (a.dataset.seScrollBound === '1') return;
      a.dataset.seScrollBound = '1';

      on(a, 'click', (e) => {
        const id = a.getAttribute('href');
        if (!id || id === '#') return;
        const target = root.querySelector(id) || document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  function patchConvertedContent(scope = root) {
    scope.querySelectorAll('.water-science__fact-drift-harbor,.science-mobile__fact-crest-harbor').forEach((el) => {
      el.innerHTML = 'DOUBLE,<br>WHAMMY.';
    });

    scope.querySelectorAll('span').forEach((span) => {
      const txt = (span.textContent || '').trim();
      const needsGradient =
        /Your Shower Undoes It Every Morning\.?/i.test(txt) ||
        /Your Water Should Change With It\.?/i.test(txt) ||
        ((span.getAttribute('style') || '').includes('-webkit-text-fill-color: transparent'));

      if (!needsGradient) return;
      span.style.background = 'linear-gradient(90deg,var(--rose),var(--gold),var(--rose))';
      span.style.backgroundSize = '200% auto';
      span.style.backgroundClip = 'text';
      span.style.webkitBackgroundClip = 'text';
      span.style.webkitTextFillColor = 'transparent';
    });
  }

  function initRevealEffects(scope = root) {
    const targets = scope.querySelectorAll('.reveal-up,.reveal-left,.reveal-right,.reveal-scale,.content-layout,.tl-dot,.tl-fill,.tl-vline-fill');
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    targets.forEach((el) => el.classList.remove('is-visible'));

    if (!('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    targets.forEach((el) => io.observe(el));
  }

  function initTimeline(scope = root) {
    const sections = Array.from(scope.querySelectorAll('section')).filter((s) => {
      const h2 = s.querySelector('h2');
      return h2 && /Your Results Timeline/i.test(h2.textContent || '');
    });

    if (!sections.length) return;
    const activate = (section) => section.classList.add('timeline-live');

    if (!('IntersectionObserver' in window)) {
      sections.forEach(activate);
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: '0px 0px -10% 0px' });

    sections.forEach((section) => io.observe(section));
  }

  function initAll(scope = root) {
    initNav();
    initMenu();
    initFaq(scope);
    initBackToTop();
    initMobileCta();
    initSmoothScroll(scope);
    patchConvertedContent(scope);
    initRevealEffects(scope);
    initTimeline(scope);
  }

  initAll(root);
  on(document, 'shopify:section:load', (event) => initAll(event.target || root));
})();