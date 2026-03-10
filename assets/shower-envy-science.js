(function () {
  var navLinks = document.querySelectorAll('.nav-link[data-section]');
  var sections = [];

  navLinks.forEach(function (link) {
    var sectionId = link.getAttribute('data-section');
    var sectionEl = document.getElementById(sectionId);
    if (sectionEl) sections.push({ el: sectionEl, id: sectionId });
  });

  function updateSpy() {
    if (!navLinks.length) return;

    var current = '';
    sections.forEach(function (section) {
      if (section.el.getBoundingClientRect().top <= 120) {
        current = section.id;
      }
    });

    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('data-section') === current);
    });
  }

  var navBar = document.getElementById('navBar');
  var navProgress = document.getElementById('navProgress');

  function updateProgress() {
    if (!navProgress) return;

    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    var scrollMax = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    var progress = Math.min(Math.max((scrollY / scrollMax) * 100, 0), 100);

    navProgress.style.width = progress + '%';

    if (navBar) {
      navBar.classList.toggle('scrolled', scrollY > 20);
    }
  }

  var btt = document.getElementById('btt');

  function updateBtt() {
    if (!btt) return;

    btt.classList.toggle('vis', (window.pageYOffset || document.documentElement.scrollTop) > 800);
  }

  window.addEventListener(
    'scroll',
    function () {
      updateSpy();
      updateProgress();
      updateBtt();
    },
    { passive: true }
  );

  window.addEventListener('resize', updateProgress);

  updateSpy();
  updateProgress();
  updateBtt();

  // Multi-direction scroll reveal
  var ro = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('vis');
          ro.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.06, rootMargin: '0px 0px -60px 0px' }
  );

  ['.rv', '.rv-left', '.rv-right', '.rv-scale'].forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (el) {
      ro.observe(el);
    });
  });

  // Animated counters
  var co = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        var el = entry.target;
        var target = parseFloat(el.getAttribute('data-target'));
        var suffix = el.getAttribute('data-suffix') || '';
        var isDecimal = el.getAttribute('data-decimal') === 'true';
        var duration = 1600;
        var startTime = null;

        function animate(ts) {
          if (!startTime) startTime = ts;
          var p = Math.min((ts - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = (isDecimal ? (eased * target).toFixed(1) : Math.round(eased * target)) + suffix;
          if (p < 1) requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
        co.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.counter').forEach(function (el) {
    co.observe(el);
  });
})();

function toggleExpand(btn) {
  var body = btn.nextElementSibling;
  var isOpen = btn.classList.contains('open');
  var section = btn.closest('section') || btn.closest('.content-max');

  if (section) {
    section.querySelectorAll('.expand-btn.open').forEach(function (openBtn) {
      openBtn.classList.remove('open');
      openBtn.setAttribute('aria-expanded', 'false');
      openBtn.nextElementSibling.classList.remove('open');
    });
  }

  if (!isOpen) {
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    body.classList.add('open');
  }
}

function toggleSeMobileNav() {
  var overlay = document.getElementById('seMobOverlay');
  var menu = document.getElementById('seMobMenu');

  if (overlay && menu) {
    overlay.classList.toggle('open');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  }
}