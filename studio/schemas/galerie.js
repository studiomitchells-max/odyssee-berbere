// Schéma galerie photos — Odyssée Berbère
export default {
  name: 'galerie',
  title: 'Galerie',
  type: 'document',
  icon: () => '🖼️',

  fields: [
    {
      name: 'titre',
      title: 'Titre / légende',
      type: 'string',
      validation: R => R.required(),
    },
    {
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      validation: R => R.required(),
    },
    {
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Ambiance boutique',    value: 'boutique'   },
          { title: 'Artisans au travail',  value: 'artisans'   },
          { title: 'Produits',             value: 'produits'   },
          { title: 'Maroc & Voyage',       value: 'voyage'     },
          { title: 'Événements',           value: 'evenements' },
        ],
      },
    },
    {
      name: 'description',
      title: 'Description (optionnel)',
      type: 'text',
      rows: 2,
    },
    {
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
      initialValue: 99,
    },
    {
      name: 'visible',
      title: 'Visible sur le site',
      type: 'boolean',
      initialValue: true,
    },
  ],

  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'ordreAsc',
      by: [{ field: 'ordre', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title:    'titre',
      subtitle: 'categorie',
      media:    'image',
    },
  },
}
