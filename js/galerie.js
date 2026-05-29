/**
 * galerie.js — Grille filtrée + Lightbox
 */

(function () {

  var grid       = document.getElementById('galerieGrid');
  var emptyMsg   = document.getElementById('galerieEmpty');
  var countEl    = document.getElementById('filtersCount');
  var filterBtns = document.querySelectorAll('.filter-btn');
  var resetBtn   = document.getElementById('resetFilter');

  if (!grid) return;

  var activeFilter = 'all';

  var urlParams = new URLSearchParams(window.location.search);
  var urlFilter = urlParams.get('categorie');
  if (urlFilter) activeFilter = urlFilter;

  /* ── Lightbox ── */
  var lb = null;

  function createLightbox() {
    lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.innerHTML =
      '<div class="lb-backdrop"></div>' +
      '<div class="lb-panel">' +
        '<button class="lb-close" aria-label="Fermer">' +
          '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</button>' +
        '<div class="lb-img-wrap"><img class="lb-img" src="" alt=""></div>' +
        '<div class="lb-info">' +
          '<span class="lb-origin"></span>' +
          '<h2 class="lb-nom"></h2>' +
          '<span class="lb-matiere"></span>' +
        '</div>' +
      '</div>';
    document.body.appendChild(lb);

    lb.querySelector('.lb-backdrop').addEventListener('click', closeLightbox);
    lb.querySelector('.lb-close').addEventListener('click', closeLightbox);
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  function openLightbox(p) {
    if (!lb) createLightbox();
    var img    = lb.querySelector('.lb-img');
    img.src    = p.image || '';
    img.alt    = p.nom   || '';
    lb.querySelector('.lb-origin').textContent  = p.origine  || '';
    lb.querySelector('.lb-nom').textContent     = p.nom      || '';
    lb.querySelector('.lb-matiere').textContent = p.matiere  || '';
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (lb) lb.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  /* ── Construction d'une carte produit ── */
  function buildCard(p) {
    return '<article class="product-card" data-categorie="' + p.categorie + '" data-animate>' +
      '<div class="pcard-link" aria-label="' + p.nom + '" style="cursor:pointer">' +
        '<div class="pcard-img-wrap">' +
          '<div class="pcard-bg pcard-bg--' + p.categorie + '"></div>' +
          '<img src="' + (p.image||'') + '" alt="' + p.nom + '" class="pcard-photo" loading="lazy">' +
          '<div class="pcard-hover"><span class="pcard-view">🔍 Agrandir</span></div>' +
        '</div>' +
        '<div class="pcard-info">' +
          '<span class="pcard-origin">' + (p.origine||'') + '</span>' +
          '<h3 class="pcard-name">' + p.nom + '</h3>' +
          '<span class="pcard-material">' + (p.matiere||'') + '</span>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  /* ── Injecter + filtrer ── */
  function initialiser() {
    if (typeof TOUS_PRODUITS === 'undefined' || TOUS_PRODUITS.length === 0) return;

    grid.innerHTML = TOUS_PRODUITS.map(buildCard).join('');

    if (typeof animObserver !== 'undefined') {
      grid.querySelectorAll('[data-animate]').forEach(function(el) { animObserver.observe(el); });
    } else {
      grid.querySelectorAll('[data-animate]').forEach(function(el) { el.classList.add('is-visible'); });
    }

    grid.querySelectorAll('.pcard-photo').forEach(function(img) {
      if (img.complete && img.naturalWidth > 0) img.classList.add('is-loaded');
      else img.addEventListener('load', function() { img.classList.add('is-loaded'); });
    });

    /* Clic sur carte → lightbox */
    grid.querySelectorAll('.product-card').forEach(function(card, i) {
      card.addEventListener('click', function() {
        openLightbox(TOUS_PRODUITS[i]);
      });
    });

    appliquerFiltre(activeFilter);
  }

  /* ── Filtrage ── */
  function appliquerFiltre(filtre) {
    activeFilter = filtre;
    var cards = grid.querySelectorAll('.product-card');
    var visible = 0;
    cards.forEach(function(card) {
      var match = filtre === 'all' || card.dataset.categorie === filtre;
      card.classList.toggle('is-hidden', !match);
      if (match) visible++;
    });
    if (countEl) countEl.textContent = visible + (visible > 1 ? ' pièces' : ' pièce');
    if (emptyMsg) emptyMsg.hidden = visible > 0;
    filterBtns.forEach(function(btn) {
      btn.classList.toggle('is-active', btn.dataset.filter === filtre);
    });
  }

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() { appliquerFiltre(btn.dataset.filter); });
  });

  if (resetBtn) resetBtn.addEventListener('click', function() { appliquerFiltre('all'); });

  if (window.quandPret) window.quandPret(initialiser);
  else document.addEventListener('sanity:ready', initialiser, { once: true });

})();
