/**
 * Tema claro / oscuro
 * - Se carga en el <head> (sin defer) para aplicar el tema antes de pintar
 *   la página y evitar el "parpadeo" de colores.
 * - Guarda la preferencia del usuario en localStorage.
 * - Si el usuario nunca eligió, respeta la preferencia del sistema operativo.
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'portafolio-tema';
  const root = document.documentElement;
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  // Indica al CSS que JavaScript está disponible (mejora progresiva).
  root.classList.add('js');

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (error) {
      return null; // localStorage bloqueado (modo privado estricto, etc.)
    }
  }

  function storeTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (error) {
      /* Sin persistencia: el tema funciona igual durante la visita. */
    }
  }

  function getPreferredTheme() {
    const stored = getStoredTheme();
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return systemDark.matches ? 'dark' : 'light';
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

    // Otros scripts (p. ej. el Design System) pueden reaccionar al cambio.
    document.dispatchEvent(new CustomEvent('themechange', { detail: { theme: theme } }));
  }

  // 1) Aplicar de inmediato, antes de que se renderice el <body>.
  root.setAttribute('data-theme', getPreferredTheme());

  // 2) Cuando exista el DOM, sincronizar botones y escuchar clics.
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

  // 3) Si cambia el tema del sistema y el usuario no eligió uno, seguirlo.
  systemDark.addEventListener('change', function (event) {
    if (!getStoredTheme()) {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  });
})();
