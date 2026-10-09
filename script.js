(function () {
  const body = document.body;
  const themeBtn = document.getElementById('theme-btn');
  const langBtn = document.getElementById('lang-btn');
  let lang = localStorage.getItem('portfolio-lang') || 'id';

  if (localStorage.getItem('portfolio-theme') === 'dark') {
    body.classList.add('dark');
  }

  function applyTheme() {
    if (themeBtn) {
      themeBtn.textContent = body.classList.contains('dark') ? '☀' : '☾';
    }
  }

  function applyLanguage() {
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-text').forEach((el) => {
      const value = el.getAttribute('data-' + lang);
      if (value !== null) el.textContent = value;
    });
    if (langBtn) langBtn.textContent = lang === 'id' ? 'EN' : 'ID';
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      body.classList.toggle('dark');
      localStorage.setItem(
        'portfolio-theme',
        body.classList.contains('dark') ? 'dark' : 'light'
      );
      applyTheme();
    });
  }

  if (langBtn) {
    langBtn.addEventListener('click', () => {
      lang = lang === 'id' ? 'en' : 'id';
      localStorage.setItem('portfolio-lang', lang);
      applyLanguage();
    });
  }

  document.querySelectorAll('[data-filter]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach((item) => {
        item.classList.toggle('active', item === btn);
      });
      const filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach((card) => {
        card.style.display =
          filter === 'all' || card.dataset.category === filter ? '' : 'none';
      });
    });
  });

  applyTheme();
  applyLanguage();
})();
