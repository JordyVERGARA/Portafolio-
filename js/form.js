
(function () {
  'use strict';

  const form = document.getElementById('contact-form');
  if (!form) return;

  form.noValidate = true;

  const fields = Array.from(form.querySelectorAll('.form__control'));
  const status = form.querySelector('[data-form-status]');
  const counter = form.querySelector('[data-char-count]');
  const message = form.querySelector('#mensaje');
  const recipient = form.getAttribute('action').replace(/^mailto:/, '');

  const MIN_MESSAGE = 20;
  const MAX_MESSAGE = 500;
  const NAME_PATTERN = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/;
  const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const rules = {
    nombre: function (value) {
      if (!value) return 'Ingresa tu nombre.';
      if (value.length < 3) return 'El nombre debe tener al menos 3 caracteres.';
      if (!NAME_PATTERN.test(value)) return 'Usa solo letras y espacios.';
      return '';
    },
    email: function (value) {
      if (!value) return 'Ingresa tu correo electrónico.';
      if (!EMAIL_PATTERN.test(value)) return 'Escribe un correo válido, por ejemplo nombre@correo.com.';
      return '';
    },
    motivo: function (value) {
      return value ? '' : 'Selecciona el motivo de tu mensaje.';
    },
    mensaje: function (value) {
      if (!value) return 'Escribe tu mensaje.';
      if (value.length < MIN_MESSAGE) {
        return 'Te faltan ' + (MIN_MESSAGE - value.length) + ' caracteres (mínimo ' + MIN_MESSAGE + ').';
      }
      if (value.length > MAX_MESSAGE) return 'El mensaje no puede superar ' + MAX_MESSAGE + ' caracteres.';
      return '';
    }
  };

  function validateField(field) {
    const rule = rules[field.name];
    if (!rule) return true;

    const error = rule(field.value.trim());
    const errorElement = document.getElementById(field.id + '-error');

    field.setAttribute('aria-invalid', String(Boolean(error)));
    field.classList.toggle('is-valid', !error);
    if (errorElement) errorElement.textContent = error;

    return !error;
  }

  function clearFieldState(field) {
    const errorElement = document.getElementById(field.id + '-error');
    field.removeAttribute('aria-invalid');
    field.classList.remove('is-valid');
    if (errorElement) errorElement.textContent = '';
  }

  function showStatus(text, type) {
    status.textContent = text;
    status.className = 'alert alert--' + type;
    status.hidden = false;
  }

  function updateCounter() {
    if (counter && message) counter.textContent = message.value.length;
  }

  fields.forEach(function (field) {
    field.addEventListener('blur', function () {
      if (field.value.trim() !== '') validateField(field);
    });

    const liveEvent = field.tagName === 'SELECT' ? 'change' : 'input';
    field.addEventListener(liveEvent, function () {
      if (field.hasAttribute('aria-invalid')) validateField(field);
    });
  });

  if (message) message.addEventListener('input', updateCounter);

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const results = fields.map(validateField);
    const firstInvalid = fields[results.indexOf(false)];

    if (firstInvalid) {
      showStatus('Revisa los campos marcados en rojo antes de enviar.', 'error');
      firstInvalid.focus();
      return;
    }

    const data = new FormData(form);
    const name = data.get('nombre').trim();
    const subject = '[Portafolio] ' + data.get('motivo') + ' - ' + name;
    const body = data.get('mensaje').trim() + '\n\n' + name + '\n' + data.get('email').trim();

    showStatus('Gmail abrirá el mensaje listo. Pulsa Enviar allí para hacérmelo llegar.', 'success');
    window.location.href = 'https://mail.google.com/mail/?view=cm&fs=1' +
      '&to=' + encodeURIComponent(recipient) +
      '&su=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    form.reset();
    fields.forEach(clearFieldState);
    updateCounter();
  });
})();
