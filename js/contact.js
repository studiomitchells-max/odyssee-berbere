/**
 * contact.js — Formulaire de contact via FormSubmit.co (soumission native)
 */

(function () {
  const form       = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    /* Validation uniquement */
    const required = form.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      field.classList.remove('is-error');
      if (!field.value.trim()) {
        field.classList.add('is-error');
        valid = false;
      }
    });

    if (!valid) {
      e.preventDefault();
      form.querySelector('.is-error').focus();
      return;
    }

    /* Laisser le formulaire se soumettre normalement vers FormSubmit */
    const submitBtn = form.querySelector('.form-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours…';
    /* Pas de e.preventDefault() — soumission native */
  });

  form.querySelectorAll('.form-input, .form-textarea').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('is-error'));
  });

  const style = document.createElement('style');
  style.textContent = '.form-input.is-error, .form-textarea.is-error { border-color: #C0392B; box-shadow: 0 0 0 3px rgba(192,57,43,0.12); }';
  document.head.appendChild(style);

  /* Afficher message succès si ?merci=1 dans l'URL */
  if (window.location.search.includes('merci=1') && successMsg) {
    successMsg.hidden = false;
    successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(() => { successMsg.hidden = true; }, 6000);
  }

})();
