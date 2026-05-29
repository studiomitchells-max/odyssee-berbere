/**
 * contact.js — Formulaire de contact via Web3Forms
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

    const data = new FormData(form);
    data.append('access_key', '54997032-811b-4909-b76a-0b198de12572');
    data.append('subject', 'Nouveau message — Odyssée Berbère');
    data.append('from_name', 'Site Odyssée Berbère');

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: data
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
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
    .catch(() => {
      alert('Impossible d\'envoyer. Vérifiez votre connexion ou contactez-nous par WhatsApp.');
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Envoyer le message';
    });
  });

  form.querySelectorAll('.form-input, .form-textarea').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('is-error'));
  });

  const style = document.createElement('style');
  style.textContent = '.form-input.is-error, .form-textarea.is-error { border-color: #C0392B; box-shadow: 0 0 0 3px rgba(192,57,43,0.12); }';
  document.head.appendChild(style);

})();
