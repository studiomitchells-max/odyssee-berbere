// Schéma contenus de pages — Odyssée Berbère
export default {
  name: 'pageContenu',
  title: 'Contenu de page',
  type: 'document',
  icon: () => '📄',

  fields: [
    {
      name: 'page',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          { title: 'Accueil — Hero',        value: 'accueil-hero'          },
          { title: 'Accueil — Présentation', value: 'accueil-presentation' },
          { title: 'Notre Univers',          value: 'univers'               },
          { title: 'Notre Histoire',         value: 'histoire'              },
          { title: 'Contact',                value: 'contact'               },
        ],
        layout: 'radio',
      },
      validation: R => R.required(),
    },
    {
      name: 'titre',
      title: 'Titre principal',
      type: 'string',
    },
    {
      name: 'sousTitre',
      title: 'Sous-titre / accroche',
      type: 'string',
    },
    {
      name: 'contenu',
      title: 'Contenu texte',
      type: 'text',
      rows: 6,
    },
    {
      name: 'imageHero',
      title: 'Image d\'en-tête (optionnel)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'boutonTexte',
      title: 'Texte du bouton CTA (optionnel)',
      type: 'string',
      placeholder: 'ex : Découvrir notre collection',
    },
    {
      name: 'boutonLien',
      title: 'Lien du bouton CTA (optionnel)',
      type: 'string',
      placeholder: 'ex : /galerie.html',
    },
    {
      name: 'actif',
      title: 'Contenu actif',
      type: 'boolean',
      initialValue: true,
    },
  ],

  preview: {
    select: {
      title:    'page',
      subtitle: 'titre',
    },
  },
}
