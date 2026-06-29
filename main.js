document.addEventListener('DOMContentLoaded', () => {

  /* ---- IntersectionObserver fade-ups ---- */
  const fadeUps = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  fadeUps.forEach(el => observer.observe(el));

  /* ---- Mobile menu ---- */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileClose = document.querySelector('.mobile-close');
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
  }
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', () => mobileMenu.classList.remove('open'));
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  /* ---- Nav scroll state ---- */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  });

  /* ---- Back to top ---- */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) backToTop.classList.add('visible');
      else backToTop.classList.remove('visible');
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---- Reviews Search & Filter ---- */
  const searchInput = document.getElementById('searchInput');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const reviewCards = document.querySelectorAll('.review-card');
  const noResults = document.getElementById('noResults');

  if (searchInput && reviewCards.length) {
    let activeFilter = 'all';

    function filterReviews() {
      const query = searchInput.value.toLowerCase().trim();
      let visibleCount = 0;

      reviewCards.forEach(card => {
        const genre = card.dataset.genre || '';
        const text = card.textContent.toLowerCase();
        const matchesSearch = text.includes(query);
        const matchesFilter = activeFilter === 'all' || genre === activeFilter;

        if (matchesSearch && matchesFilter) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    }

    searchInput.addEventListener('input', filterReviews);

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeFilter = btn.dataset.filter;
        filterReviews();
      });
    });
  }

  /* ---- Contact Form ---- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.style.display = 'none';
      if (formSuccess) formSuccess.style.display = 'block';
    });
  }

});
