export default {
  name:  'parametres',
  title: 'Paramètres du site',
  type:  'document',
  icon:  () => '⚙️',

  // Singleton : un seul document, pas de création/suppression
  __experimental_actions: ['update', 'publish'],

  fields: [
    {
      name:  'nomBoutique',
      title: 'Nom de la boutique',
      type:  'string',
    },
    {
      name:  'sousTitre',
      title: 'Tagline / Sous-titre',
      type:  'string',
      placeholder: 'Ex : Artisanat & Décoration',
    },
    {
      name:  'titrePrincipal',
      title: 'Titre hero (ligne 1)',
      type:  'string',
      placeholder: "Ex : L'artisanat du monde",
    },
    {
      name:  'titreItalique',
      title: 'Titre hero (ligne 2 — italique)',
      type:  'string',
      placeholder: 'Ex : dans votre intérieur',
    },
    {
      name:  'sousTitreHero',
      title: 'Sous-titre hero',
      type:  'string',
    },
    {
      name:  'adresse',
      title: 'Adresse postale',
      type:  'text',
      rows:  2,
    },
    {
      name:  'telephone',
      title: 'Téléphone',
      type:  'string',
    },
    {
      name:  'email',
      title: 'Email de contact',
      type:  'string',
    },
    {
      name:  'horaires',
      title: 'Horaires d\'ouverture',
      type:  'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'jours',  title: 'Jours',   type: 'string', placeholder: 'Ex : Mar–Sam' },
          { name: 'heures', title: 'Heures',   type: 'string', placeholder: 'Ex : 10h30–19h30' },
          { name: 'ferme',  title: 'Fermé ?',  type: 'boolean', initialValue: false },
        ],
        preview: {
          select: { title: 'jours', subtitle: 'heures' },
        },
      }],
    },
    {
      name:  'instagram',
      title: 'URL Instagram',
      type:  'url',
      placeholder: 'https://www.instagram.com/...',
    },
    {
      name:  'facebook',
      title: 'URL Facebook',
      type:  'url',
      placeholder: 'https://www.facebook.com/...',
    },
    {
      name:  'urlGoogleMaps',
      title: 'Lien Google Maps (bouton)',
      type:  'url',
    },
    {
      name:  'iframeGoogleMaps',
      title: 'Code iframe Google Maps (embed)',
      type:  'text',
      rows:  3,
      description: "Copiez l'URL src de l'iframe Google Maps (pas tout le code HTML, juste l'URL)",
    },
  ],

  preview: {
    prepare: () => ({ title: 'Paramètres du site' }),
  },
}
