/**
 * main.js — Interactions & animations
 */

/* ──────────────────────────────────────
   Navigation : transparent → solide
   ────────────────────────────────────── */
var header = document.getElementById('siteHeader');

function updateHeader() {
  if (window.scrollY < 40) {
    header.classList.add('is-top');
  } else {
    header.classList.remove('is-top');
  }
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });


/* ──────────────────────────────────────
   Menu burger (mobile)
   ────────────────────────────────────── */
var burger   = document.getElementById('navBurger');
var navLinks = document.getElementById('navLinks');

if (burger && navLinks) {
  burger.addEventListener('click', function() {
    var isOpen = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!isOpen));
    navLinks.classList.toggle('is-open', !isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      burger.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  });
}


/* ──────────────────────────────────────
   Animations au défilement
   ────────────────────────────────────── */
var animObserver = new IntersectionObserver(
  function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        animObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('[data-animate]').forEach(function(el) {
  animObserver.observe(el);
});


/* ──────────────────────────────────────
   Fade-in des images
   ────────────────────────────────────── */
function onImageLoad(img) {
  if (img.complete && img.naturalWidth > 0) {
    img.classList.add('is-loaded');
  } else {
    img.addEventListener('load', function() { img.classList.add('is-loaded'); });
  }
}

document.querySelectorAll(
  '.hero-img, .ucard-img, .story-photo, .boutique-img'
).forEach(onImageLoad);


/* ──────────────────────────────────────
   Vidéo hero
   ────────────────────────────────────── */
var heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  var onVideoReady = function() {
    // Ne marquer la vidéo comme chargée que si elle est visible (pas sur mobile)
    if (window.getComputedStyle(heroVideo).display !== 'none') {
      heroVideo.classList.add('is-loaded');
    }
  };
  if (heroVideo.readyState >= 3) {
    onVideoReady();
  } else {
    heroVideo.addEventListener('canplay', onVideoReady, { once: true });
  }
  heroVideo.addEventListener('error', function() {
    heroVideo.style.display = 'none';
  }, { once: true });
}


/* ──────────────────────────────────────
   Injection produits homepage
   (attend que Sanity ou data.js soit prêt)
   ────────────────────────────────────── */
function buildProductCard(p) {
  return '<article class="product-card" data-animate data-delay="' + ((p.id % 4) * 80) + '">' +
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

function injecterProduitsVedette() {
  var grid = document.getElementById('featuredGrid');
  if (!grid || typeof PRODUITS_VEDETTE === 'undefined') return;

  grid.innerHTML = PRODUITS_VEDETTE.map(buildProductCard).join('');

  grid.querySelectorAll('[data-animate]').forEach(function(el) {
    animObserver.observe(el);
  });
  grid.querySelectorAll('.pcard-photo').forEach(onImageLoad);
}

window.quandPret
  ? window.quandPret(injecterProduitsVedette)
  : document.addEventListener('sanity:ready', injecterProduitsVedette, { once: true });


/* ──────────────────────────────────────
   Lien de navigation actif
   ────────────────────────────────────── */
var currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(function(link) {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('is-active');
  }
});


/* ──────────────────────────────────────
   Fallback : forcer is-loaded après chargement complet
   (sécurité mobile si l'événement load a été manqué)
   ────────────────────────────────────── */
window.addEventListener('load', function() {
  document.querySelectorAll('.hero-img, .ucard-img, .story-photo, .boutique-img, .pcard-photo').forEach(function(img) {
    if (!img.classList.contains('is-loaded') && img.naturalWidth > 0) {
      img.classList.add('is-loaded');
    }
  });
});
