/**
 * contact.js — Formulaire de contact via FormSubmit.co
 */

(function () {
  const form       = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    /* Validation */
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
      form.querySelector('.is-error').focus();
      return;
    }

    const submitBtn = form.querySelector('.form-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours…';

    /* Envoi réel via FormSubmit */
    const data = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
    .then(function(res) {
      if (res.ok) {
        form.reset();
        if (successMsg) {
          successMsg.hidden = false;
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          setTimeout(() => { successMsg.hidden = true; }, 6000);
        }
      } else {
        alert('Une erreur est survenue. Merci de réessayer ou de nous contacter par WhatsApp.');
      }
    })
    .catch(function() {
      alert('Impossible d\'envoyer le message. Vérifiez votre connexion ou contactez-nous par WhatsApp.');
    })
    .finally(function() {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Envoyer le message';
    });
  });

  /* Retire la classe d'erreur à la saisie */
  form.querySelectorAll('.form-input, .form-textarea').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('is-error'));
  });

  const style = document.createElement('style');
  style.textContent = '.form-input.is-error, .form-textarea.is-error { border-color: #C0392B; box-shadow: 0 0 0 3px rgba(192,57,43,0.12); }';
  document.head.appendChild(style);

})();
