/**
 * contact.js — Gestion du formulaire de contact
 */

(function () {
  const form       = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    /* Validation simple */
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
      const firstError = form.querySelector('.is-error');
      if (firstError) firstError.focus();
      return;
    }

    /* Simulation d'envoi (à remplacer par votre backend ou service d'email) */
    const submitBtn = form.querySelector('.form-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi en cours...';

    /* Simule un délai réseau */
    setTimeout(() => {
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Envoyer le message';

      if (successMsg) {
        successMsg.hidden = false;
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      /* Cache le message après 6 secondes */
      setTimeout(() => {
        if (successMsg) successMsg.hidden = true;
      }, 6000);
    }, 800);
  });

  /* Retire la classe d'erreur à la saisie */
  form.querySelectorAll('.form-input').forEach(field => {
    field.addEventListener('input', () => field.classList.remove('is-error'));
  });

  /* Style erreur (injecté inline pour éviter un fichier CSS supplémentaire) */
  const style = document.createElement('style');
  style.textContent = '.form-input.is-error { border-color: #C0392B; box-shadow: 0 0 0 3px rgba(192,57,43,0.12); }';
  document.head.appendChild(style);

})();
