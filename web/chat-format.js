/* Rendering is provider-independent. Model output is always untrusted. */
(function () {
  'use strict';
  const escape = text => String(text ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
  function render(text) {
    const source = String(text ?? '');
    if (!window.marked || !window.DOMPurify) {
      return '<p>' + escape(source).replace(/\n/g, '<br>') + '</p>';
    }
    try {
      const html = window.marked.parse(source, { gfm: true, breaks: true, async: false });
      const fragment = window.DOMPurify.sanitize(html, {
        RETURN_DOM_FRAGMENT: true,
        ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'del', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'hr', 'a', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
        ALLOWED_ATTR: ['href', 'title', 'start'],
        ALLOW_DATA_ATTR: false,
        ALLOW_ARIA_ATTR: false
      });
      fragment.querySelectorAll('a').forEach(link => {
        const href = link.getAttribute('href') || '';
        // Absolute HTTP(S) links only. No javascript:, data:, files or tracking images.
        if (!/^https?:\/\//i.test(href)) link.removeAttribute('href');
        else {
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
          link.setAttribute('referrerpolicy', 'no-referrer');
        }
      });
      fragment.querySelectorAll('table').forEach(table => {
        const wrap = document.createElement('div');
        wrap.className = 'table-scroll';
        wrap.tabIndex = 0;
        wrap.setAttribute('role', 'region');
        wrap.setAttribute('aria-label', document.documentElement.lang === 'en' ? 'Scrollable table' : 'Tabla desplazable');
        table.replaceWith(wrap);
        wrap.append(table);
      });
      const container = document.createElement('div');
      container.append(fragment);
      return container.innerHTML;
    } catch {
      return '<p>' + escape(source).replace(/\n/g, '<br>') + '</p>';
    }
  }
  const example = {
    es: '## Construye tu argumento\n\n**Una tesis necesita una postura**, no solo una lista de hechos. Este es un ejemplo local de formato, no una respuesta generada por IA.\n\n### Un siguiente paso\n1. Elige una causa de la Segunda Guerra Mundial.\n2. Busca una evidencia en tu material.\n3. Explica por qué respalda tu argumento.\n\n| Parte | Pregunta guía |\n| --- | --- |\n| Afirmación | ¿Qué sostienes? |\n| Evidencia | ¿Con qué lo justificas? |\n| Evaluación | ¿Qué limitación existe? |\n\n> Tu turno: escribe una tesis de dos frases.\n\nUsa *tus propias palabras*. Los símbolos de formato ya no deberían aparecer.',
    en: '## Build your argument\n\n**A thesis needs a position**, not just a list of facts. This is a local formatting sample, not an AI-generated response.\n\n### Your next step\n1. Choose a cause of the Second World War.\n2. Find evidence in your materials.\n3. Explain how it supports your claim.\n\n| Part | Guiding question |\n| --- | --- |\n| Claim | What is your position? |\n| Evidence | What supports it? |\n| Evaluation | What limitation exists? |\n\n> Your turn: write a two-sentence thesis.\n\nUse *your own words*. Formatting symbols should no longer appear.'
  };
  window.IBChat = { render, example };
  document.addEventListener('click', async event => {
    const button = event.target.closest('[data-copy-message]');
    if (!button) return;
    const content = button.closest('.message').querySelector('.message-body');
    const label = button.textContent;
    try {
      await navigator.clipboard.writeText(content.innerText);
      button.textContent = document.documentElement.lang === 'en' ? 'Copied' : 'Copiado';
    } catch {
      button.textContent = document.documentElement.lang === 'en' ? 'Select and copy the text' : 'Selecciona y copia el texto';
    }
    setTimeout(() => { button.textContent = label; }, 2500);
  });
})();
