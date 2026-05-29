/**
 * sanity.js — Connexion au CMS Sanity
 *
 * ╔══════════════════════════════════════════════════════╗
 * ║  ÉTAPE 1 : Remplacez YOUR_PROJECT_ID ci-dessous     ║
 * ║  Trouvez votre ID sur : https://sanity.io/manage    ║
 * ╚══════════════════════════════════════════════════════╝
 */

var SANITY_CONFIG = {
  projectId:  'iv3lqevt',
  dataset:    'production',
  apiVersion: '2024-01-01',
};

/* ──────────────────────────────────────────────────────
   Construit l'URL d'une image hébergée sur Sanity CDN
   ────────────────────────────────────────────────────── */
function sanityImageUrl(asset, width) {
  if (!asset || !asset.asset || !asset.asset._ref) return '';
  var ref  = asset.asset._ref;            // "image-abc123-800x600-jpg"
  var parts = ref.split('-');
  var id    = parts[1];
  var dims  = parts[2];
  var ext   = parts[3];
  var w     = width ? ('?w=' + width + '&q=80&auto=format&fit=crop') : '';
  return 'https://cdn.sanity.io/images/'
       + SANITY_CONFIG.projectId + '/'
       + SANITY_CONFIG.dataset   + '/'
       + id + '-' + dims + '.' + ext + w;
}

/* ──────────────────────────────────────────────────────
   Requête GROQ vers l'API Sanity (lecture publique)
   ────────────────────────────────────────────────────── */
function sanityFetch(query) {
  var base = 'https://' + SANITY_CONFIG.projectId
           + '.apicdn.sanity.io/v' + SANITY_CONFIG.apiVersion
           + '/data/query/' + SANITY_CONFIG.dataset;
  var url  = base + '?query=' + encodeURIComponent(query);
  return fetch(url, { headers: { 'Accept': 'application/json' } })
    .then(function(r) {
      if (!r.ok) throw new Error('Sanity ' + r.status);
      return r.json();
    })
    .then(function(d) { return d.result; });
}

/* ──────────────────────────────────────────────────────
   Signale que les données sont prêtes (ou en échec)
   ────────────────────────────────────────────────────── */
function declencherPret() {
  window.SANITY_READY = true;
  document.dispatchEvent(new CustomEvent('sanity:ready'));
}

/* ──────────────────────────────────────────────────────
   Utilitaire : attend les données avant d'agir
   Usage : quandPret(function() { ... })
   ────────────────────────────────────────────────────── */
window.quandPret = function(callback) {
  if (window.SANITY_READY) {
    callback();
  } else {
    document.addEventListener('sanity:ready', callback, { once: true });
  }
};

/* ──────────────────────────────────────────────────────
   Chargement principal
   ────────────────────────────────────────────────────── */
window.SANITY_READY = false;

if (SANITY_CONFIG.projectId === 'YOUR_PROJECT_ID') {
  // ← Pas encore configuré : on utilise data.js comme avant
  document.addEventListener('DOMContentLoaded', declencherPret);

} else {
  // ← Configuré : on récupère les données depuis Sanity
  Promise.all([

    /* Produits (avec imagesPrincipales et categorie en string) */
    sanityFetch(
      '*[_type=="produit" && disponible != false] | order(ordre asc, _createdAt desc) {' +
      '  _id, nom, origine, matiere, descriptionCourte, featured, categorie,' +
      '  "image": imagesPrincipales[0]' +
      '}'
    ),

    /* Photos de galerie */
    sanityFetch(
      '*[_type=="galerie" && visible != false] | order(ordre asc, _createdAt desc) {' +
      '  _id, titre, categorie, description, image' +
      '}'
    ),

    /* Catégories (schema optionnel) */
    sanityFetch(
      '*[_type=="categorie"] | order(ordre asc) {' +
      '  _id, label, "slug": slug.current, description, image' +
      '}'
    ),

    /* Paramètres du site */
    sanityFetch(
      '*[_type=="parametres"][0] {' +
      '  nomBoutique, sousTitre, titrePrincipal, titreItalique,' +
      '  sousTitreHero, adresse, telephone, email,' +
      '  horaires, instagram, facebook, urlGoogleMaps, iframeGoogleMaps' +
      '}'
    ),

  ])
  .then(function(results) {
    var produits    = results[0] || [];
    var galerieItems = results[1] || [];
    var categories  = results[2] || [];
    var parametres  = results[3] || {};

    /* Produits → format galerie */
    var produitsFormates = produits.map(function(p) {
      return {
        id:        p._id,
        nom:       p.nom             || 'Pièce artisanale',
        origine:   p.origine         || 'Maroc',
        matiere:   p.matiere         || 'Fait main',
        categorie: p.categorie       || 'deco',
        image:     sanityImageUrl(p.image, 800),
        href:      'galerie.html',
        featured:  !!p.featured,
      };
    });

    /* Photos de galerie → même format */
    var galerieFormatees = galerieItems.map(function(g) {
      /* Mapping des catégories galerie vers catégories produit */
      var cat = g.categorie || 'deco';
      var catMap = { boutique: 'deco', artisans: 'deco', produits: 'deco', voyage: 'deco', evenements: 'deco' };
      return {
        id:        g._id,
        nom:       g.titre       || 'Photo',
        origine:   '',
        matiere:   g.description || '',
        categorie: catMap[cat]   || cat,
        image:     sanityImageUrl(g.image, 800),
        href:      'galerie.html',
        featured:  false,
      };
    });

    /* Fusion : produits d'abord, puis galerie */
    window.TOUS_PRODUITS = produitsFormates.concat(galerieFormatees);

    /* Sélection vedette : featured ou 4 premiers */
    var vedette = produitsFormates.filter(function(p) { return p.featured; });
    window.PRODUITS_VEDETTE = vedette.length > 0
      ? vedette.slice(0, 4)
      : produitsFormates.slice(0, 4);

    /* Catégories (si elles existent dans Sanity) */
    if (categories.length > 0) {
      window.UNIVERS = categories.map(function(c) {
        return {
          id:    c.slug,
          label: c.label,
          desc:  c.description || '',
          image: sanityImageUrl(c.image, 800),
          href:  'univers.html#' + c.slug,
        };
      });
    }

    /* Paramètres du site (titre hero, adresse, réseaux…) */
    if (parametres && parametres.nomBoutique) {
      window.SITE_PARAMS = parametres;
      appliquerParametres(parametres);
    }

    declencherPret();
  })
  .catch(function(err) {
    console.warn('[Sanity] Erreur chargement — données locales utilisées.', err.message);
    declencherPret(); // fallback silencieux sur data.js
  });
}

/* ──────────────────────────────────────────────────────
   Applique les paramètres dynamiques dans le DOM
   (titre hero, adresse, horaires…)
   ────────────────────────────────────────────────────── */
function appliquerParametres(p) {
  /* Titre hero */
  var h1 = document.querySelector('.hero-title');
  if (h1 && p.titrePrincipal) {
    var ligne2 = p.titreItalique
      ? '<br><em>' + p.titreItalique + '</em>'
      : '';
    h1.innerHTML = p.titrePrincipal + ligne2;
  }

  /* Nom de la boutique (logo + footer) */
  if (p.nomBoutique) {
    document.querySelectorAll('.logo-name, .footer-logo').forEach(function(el) {
      el.textContent = p.nomBoutique;
    });
  }

  /* Tagline */
  if (p.sousTitre) {
    document.querySelectorAll('.logo-tag').forEach(function(el) {
      el.textContent = p.sousTitre;
    });
  }
}
