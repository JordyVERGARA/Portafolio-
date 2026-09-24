/**
 * Design System:
 *  1. Muestra el valor real de cada color según el tema activo
 *     (leído de las CSS Custom Properties con getComputedStyle).
 *  2. Copia el valor de un color al portapapeles al hacer clic.
 *  3. Chips de demostración con estado activo.
 */
(function () {
  'use strict';

  const swatchValues = document.querySelectorAll('.swatch__value[data-token]');
  const copyStatus = document.querySelector('[data-copy-status]');

  /* 1. Valores de color sincronizados con el tema */
  function updateSwatchValues() {
    const styles = getComputedStyle(document.documentElement);
    swatchValues.forEach(function (button) {
      const value = styles.getPropertyValue(button.dataset.token).trim();
      if (value) button.textContent = value;
    });
  }

  updateSwatchValues();
  document.addEventListener('themechange', updateSwatchValues);

  /* 2. Copiar al portapapeles */
  function announce(text) {
    if (!copyStatus) return;
    copyStatus.textContent = text;
    clearTimeout(announce.timer);
    announce.timer = setTimeout(function () { copyStatus.textContent = ''; }, 2500);
  }

  swatchValues.forEach(function (button) {
    button.addEventListener('click', function () {
      const value = button.textContent.trim();
      if (!navigator.clipboard) {
        announce('Tu navegador no permite copiar automáticamente. Valor: ' + value);
        return;
      }
      navigator.clipboard.writeText(value).then(function () {
        announce('Copiado ' + value + ' (' + button.dataset.token + ')');
      }, function () {
        announce('No se pudo copiar. Valor: ' + value);
      });
    });
  });

  /* 3. Chips de demostración */
  document.querySelectorAll('[data-demo-chips]').forEach(function (group) {
    group.addEventListener('click', function (event) {
      const chip = event.target.closest('.chip');
      if (!chip) return;
      group.querySelectorAll('.chip').forEach(function (other) {
        other.setAttribute('aria-pressed', String(other === chip));
      });
    });
  });
})();
