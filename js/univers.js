/**
 * univers.js — Mini-grilles produits par catégorie
 */

(function () {

  var MAX = 3; // produits max par section

  var sections = [
    { gridId: 'tapis-grid',      categorie: 'tapis'    },
    { gridId: 'poteries-grid',   categorie: 'poteries' },
    { gridId: 'luminaires-grid', categorie: 'luminaire'},
    { gridId: 'table-grid',      categorie: 'table'    },
    { gridId: 'deco-grid',       categorie: 'deco'     },
  ];

  function buildCard(p) {
    return '<article class="product-card" data-animate>' +
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

  function initialiser() {
    if (typeof TOUS_PRODUITS === 'undefined') return;

    sections.forEach(function(s) {
      var el = document.getElementById(s.gridId);
      if (!el) return;

      var produits = TOUS_PRODUITS
        .filter(function(p) { return p.categorie === s.categorie; })
        .slice(0, MAX);

      if (produits.length === 0) { el.style.display = 'none'; return; }

      el.innerHTML = produits.map(buildCard).join('');

      if (typeof animObserver !== 'undefined') {
        el.querySelectorAll('[data-animate]').forEach(function(card) {
          animObserver.observe(card);
        });
      } else {
        el.querySelectorAll('[data-animate]').forEach(function(card) {
          card.classList.add('is-visible');
        });
      }

      el.querySelectorAll('.pcard-photo').forEach(function(img) {
        if (img.complete && img.naturalWidth > 0) {
          img.classList.add('is-loaded');
        } else {
          img.addEventListener('load', function() { img.classList.add('is-loaded'); });
        }
      });
    });

    /* Ancre active dans la nav univers au scroll */
    var navLinks  = document.querySelectorAll('.univers-nav-link');
    var blocEls   = document.querySelectorAll('.univers-bloc');

    if (navLinks.length && blocEls.length) {
      var ioNav = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var id = entry.target.id;
            navLinks.forEach(function(link) {
              link.classList.toggle('is-active', link.getAttribute('href') === '#' + id);
            });
          }
        });
      }, { threshold: 0.4 });
      blocEls.forEach(function(s) { ioNav.observe(s); });
    }
  }

  if (window.quandPret) {
    window.quandPret(initialiser);
  } else {
    document.addEventListener('sanity:ready', initialiser, { once: true });
  }

})();
