
(function () {
  'use strict';

  const swatchValues = document.querySelectorAll('.swatch__value[data-token]');
  const copyStatus = document.querySelector('[data-copy-status]');


  function updateSwatchValues() {
    const styles = getComputedStyle(document.documentElement);
    swatchValues.forEach(function (button) {
      const value = styles.getPropertyValue(button.dataset.token).trim();
      if (value) button.textContent = value;
    });
  }

  updateSwatchValues();
  document.addEventListener('themechange', updateSwatchValues);


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
