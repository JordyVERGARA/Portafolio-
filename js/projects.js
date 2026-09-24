/**
 * Proyectos:
 *  1. Filtro por tecnología (botones .chip con aria-pressed)
 *  2. Modal con el detalle del proyecto (<dialog> nativo)
 *
 * El contenido del modal se toma de la propia card, así la información
 * existe una sola vez en el HTML y no se duplica en JavaScript.
 */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     1. Filtro por tecnología
     ------------------------------------------------------------------ */
  function initFilter() {
    const group = document.querySelector('[data-filter-group]');
    if (!group) return;

    const buttons = group.querySelectorAll('[data-filter]');
    const items = document.querySelectorAll('.project-grid__item[data-tech]');
    const status = document.querySelector('[data-filter-status]');
    const empty = document.querySelector('[data-filter-empty]');

    function pluralize(count) {
      return count === 1 ? '1 proyecto' : count + ' proyectos';
    }

    function applyFilter(button) {
      const filter = button.dataset.filter;
      let visibleCount = 0;

      buttons.forEach(function (btn) {
        btn.setAttribute('aria-pressed', String(btn === button));
      });

      items.forEach(function (item) {
        const techs = item.dataset.tech.split(' ');
        const matches = filter === 'todos' || techs.includes(filter);

        item.hidden = !matches;
        item.classList.remove('is-entering');

        if (matches) {
          visibleCount += 1;
          void item.offsetWidth; // Reinicia la animación de entrada.
          item.classList.add('is-entering');
        }
      });

      if (status) {
        status.textContent = filter === 'todos'
          ? 'Mostrando ' + pluralize(visibleCount)
          : 'Mostrando ' + pluralize(visibleCount) + ' de ' + button.textContent.trim();
      }
      if (empty) empty.hidden = visibleCount > 0;
    }

    group.addEventListener('click', function (event) {
      const button = event.target.closest('[data-filter]');
      if (button) applyFilter(button);
    });
  }

  /* ------------------------------------------------------------------
     2. Modal de detalle
     ------------------------------------------------------------------ */
  function initModal() {
    const modal = document.getElementById('project-modal');
    if (!modal || typeof modal.showModal !== 'function') return;

    const title = modal.querySelector('.modal__title');
    const body = modal.querySelector('[data-modal-body]');
    const links = modal.querySelector('[data-modal-links]');
    let lastTrigger = null;

    function createSection(heading, content) {
      const section = document.createElement('section');
      const h3 = document.createElement('h3');
      section.className = 'modal__section';
      h3.textContent = heading;
      section.append(h3, content);
      return section;
    }

    function fillModal(card) {
      const details = card.querySelector('.project-card__details');

      // Imagen
      const figure = document.createElement('figure');
      const image = card.querySelector('.card__media img').cloneNode();
      figure.className = 'modal__media';
      image.removeAttribute('loading');
      figure.append(image);

      // Problema (sin la etiqueta "Problema:" que ya aporta el título)
      const problem = document.createElement('p');
      problem.textContent = card.querySelector('.project-card__problem')
        .textContent.replace(/^\s*Problema:\s*/, '');

      title.textContent = card.querySelector('.card__title').textContent;
      body.replaceChildren(
        figure,
        card.querySelector('.card__text').cloneNode(true),
        createSection('Problema que resuelve', problem),
        createSection('Tecnologías utilizadas', card.querySelector('.badge-list').cloneNode(true)),
        createSection('Características principales', details.querySelector('ul').cloneNode(true)),
        createSection('Aprendizajes', details.querySelector('p').cloneNode(true))
      );

      // Enlaces al repositorio / demo, con estilo de botón secundario
      const cardLinks = Array.from(card.querySelectorAll('.card__footer a')).map(function (link) {
        const clone = link.cloneNode(true);
        clone.classList.replace('btn--ghost', 'btn--secondary');
        return clone;
      });
      links.replaceChildren.apply(links, cardLinks);
      links.hidden = cardLinks.length === 0;
    }

    function openModal(card, trigger) {
      lastTrigger = trigger;
      fillModal(card);
      modal.showModal();
      modal.scrollTop = 0;
      document.body.classList.add('is-locked');
    }

    document.addEventListener('click', function (event) {
      const trigger = event.target.closest('[data-modal-open]');
      if (!trigger) return;
      const card = trigger.closest('.project-card');
      if (card) openModal(card, trigger);
    });

    modal.querySelectorAll('[data-modal-close]').forEach(function (button) {
      button.addEventListener('click', function () { modal.close(); });
    });

    // Clic en el fondo oscuro (fuera del cuadro) cierra el modal.
    modal.addEventListener('click', function (event) {
      if (event.target !== modal) return; // Clic dentro del contenido.
      const rect = modal.getBoundingClientRect();
      const outside = event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom;
      if (outside) modal.close();
    });

    // Se ejecuta al cerrar por botón, fondo o tecla Escape.
    modal.addEventListener('close', function () {
      document.body.classList.remove('is-locked');
      if (lastTrigger) lastTrigger.focus();
    });
  }

  initFilter();
  initModal();
})();
