/**
 * contact.js — Formulaire de contact (mailto fallback)
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

    const prenom  = form.querySelector('[name=prenom]')?.value || '';
    const nom     = form.querySelector('[name=nom]')?.value || '';
    const email   = form.querySelector('[name=email]')?.value || '';
    const sujet   = form.querySelector('[name=sujet]')?.value || '';
    const message = form.querySelector('[name=message]')?.value || '';

    const corps = `Bonjour,\n\nMessage de : ${prenom} ${nom}\nEmail : ${email}\nSujet : ${sujet}\n\n${message}`;
    const mailtoUrl = `mailto:contact.odyssee.berbere@gmail.com`
      + `?subject=${encodeURIComponent('Message depuis le site — ' + (sujet || 'Contact'))}`
      + `&body=${encodeURIComponent(corps)}`;

    window.location.href = mailtoUrl;

    /* Message de confirmation */
    form.reset();
    if (successMsg) {
      successMsg.hidden = false;
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(() => { successMsg.hidden = true; }, 8000);
    }
  });

  form.querySelectorAll('.form-input, .form-textarea').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('is-error'));
  });

  const style = document.createElement('style');
  style.textContent = '.form-input.is-error, .form-textarea.is-error { border-color: #C0392B; box-shadow: 0 0 0 3px rgba(192,57,43,0.12); }';
  document.head.appendChild(style);

  if (window.location.search.includes('merci=1') && successMsg) {
    successMsg.hidden = false;
    setTimeout(() => { successMsg.hidden = true; }, 6000);
  }

})();
