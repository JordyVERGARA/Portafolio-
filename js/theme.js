
(function () {
  'use strict';

  const STORAGE_KEY = 'portafolio-tema';
  const root = document.documentElement;
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  root.classList.add('js');

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null;
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {

    }
  }

  function getPreferredTheme() {
    const stored = getStoredTheme();
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return 'dark';
  }

  function syncToggles(theme) {
    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(theme === 'dark'));
      button.title = theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';
    });
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    syncToggles(theme);

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.content = getComputedStyle(root).getPropertyValue('--color-background').trim();
    }

    document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: theme } }));
  }

  root.setAttribute('data-theme', getPreferredTheme());

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(root.getAttribute('data-theme'));

    document.querySelectorAll('[data-theme-toggle]').forEach(function (button) {
      button.addEventListener('click', function () {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        storeTheme(next);
        applyTheme(next);
      });
    });
  });

  systemDark.addEventListener('change', function (event) {
    if (!getStoredTheme()) {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  });
})();
