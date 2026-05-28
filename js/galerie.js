/**
 * galerie.js — Grille filtrée, alimentée par Sanity ou data.js
 */

(function () {

  var grid       = document.getElementById('galerieGrid');
  var emptyMsg   = document.getElementById('galerieEmpty');
  var countEl    = document.getElementById('filtersCount');
  var filterBtns = document.querySelectorAll('.filter-btn');
  var resetBtn   = document.getElementById('resetFilter');

  if (!grid) return;

  var activeFilter = 'all';

  /* Filtre depuis l'URL (?categorie=tapis) */
  var urlParams = new URLSearchParams(window.location.search);
  var urlFilter = urlParams.get('categorie');
  if (urlFilter) activeFilter = urlFilter;

  /* ── Construction d'une carte produit ── */
  function buildCard(p) {
    return '<article class="product-card" data-categorie="' + p.categorie + '" data-animate>' +
      '<a href="' + p.href + '" class="pcard-link" aria-label="' + p.nom + '">' +
        '<div class="pcard-img-wrap">' +
          '<div class="pcard-bg pcard-bg--' + p.categorie + '"></div>' +
          '<img src="' + p.image + '" alt="' + p.nom + '" class="pcard-photo" loading="lazy">' +
          '<div class="pcard-hover"><span class="pcard-view">Voir la pièce</span></div>' +
        '</div>' +
        '<div class="pcard-info">' +
          '<span class="pcard-origin">' + p.origine + '</span>' +
          '<h3 class="pcard-name">' + p.nom + '</h3>' +
          '<span class="pcard-material">' + p.matiere + '</span>' +
        '</div>' +
      '</a>' +
    '</article>';
  }

  /* ── Injecter + filtrer ── */
  function initialiser() {
    if (typeof TOUS_PRODUITS === 'undefined' || TOUS_PRODUITS.length === 0) return;

    grid.innerHTML = TOUS_PRODUITS.map(buildCard).join('');

    /* Observer les cartes pour les animations */
    if (typeof animObserver !== 'undefined') {
      grid.querySelectorAll('[data-animate]').forEach(function(el) {
        animObserver.observe(el);
      });
    } else {
      grid.querySelectorAll('[data-animate]').forEach(function(el) {
        el.classList.add('is-visible');
      });
    }

    /* Fade-in images */
    grid.querySelectorAll('.pcard-photo').forEach(function(img) {
      if (img.complete && img.naturalWidth > 0) {
        img.classList.add('is-loaded');
      } else {
        img.addEventListener('load', function() { img.classList.add('is-loaded'); });
      }
    });

    appliquerFiltre(activeFilter);
  }

  /* ── Logique de filtrage ── */
  function appliquerFiltre(filtre) {
    activeFilter = filtre;
    var cards = grid.querySelectorAll('.product-card');
    var visible = 0;

    cards.forEach(function(card) {
      var match = filtre === 'all' || card.dataset.categorie === filtre;
      card.classList.toggle('is-hidden', !match);
      if (match) visible++;
    });

    if (countEl) {
      countEl.textContent = visible + (visible > 1 ? ' pièces' : ' pièce');
    }

    if (emptyMsg) emptyMsg.hidden = visible > 0;

    filterBtns.forEach(function(btn) {
      btn.classList.toggle('is-active', btn.dataset.filter === filtre);
    });
  }

  /* ── Événements ── */
  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() { appliquerFiltre(btn.dataset.filter); });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', function() { appliquerFiltre('all'); });
  }

  /* ── Lancement : attend que Sanity (ou data.js) soit prêt ── */
  if (window.quandPret) {
    window.quandPret(initialiser);
  } else {
    document.addEventListener('sanity:ready', initialiser, { once: true });
  }

})();
