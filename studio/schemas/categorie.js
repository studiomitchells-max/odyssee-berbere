export default {
  name:  'categorie',
  title: 'Catégorie',
  type:  'document',
  icon:  () => '📂',

  fields: [
    {
      name:  'label',
      title: 'Nom affiché',
      type:  'string',
      validation: R => R.required(),
    },
    {
      name:    'slug',
      title:   'Identifiant URL',
      type:    'slug',
      options: { source: 'label' },
      validation: R => R.required(),
      description: 'Généré automatiquement depuis le nom. Ne pas modifier après création.',
    },
    {
      name:  'description',
      title: 'Description courte',
      type:  'text',
      rows:  3,
    },
    {
      name:    'image',
      title:   'Image de la catégorie',
      type:    'image',
      options: { hotspot: true },
    },
    {
      name:        'ordre',
      title:       'Ordre d\'affichage',
      type:        'number',
      description: '1 = première catégorie affichée',
    },
  ],

  preview: {
    select: {
      title:    'label',
      subtitle: 'slug.current',
      media:    'image',
    },
  },
}
