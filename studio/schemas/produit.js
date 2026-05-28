export default {
  name:  'produit',
  title: 'Produit',
  type:  'document',
  icon:  () => '🏺',

  fields: [
    {
      name:  'nom',
      title: 'Nom du produit',
      type:  'string',
      validation: R => R.required().error('Le nom est obligatoire'),
    },
    {
      name:  'image',
      title: 'Photo principale',
      type:  'image',
      options: { hotspot: true },
      validation: R => R.required().error('Une photo est obligatoire'),
    },
    {
      name:  'categorie',
      title: 'Catégorie',
      type:  'reference',
      to:    [{ type: 'categorie' }],
      validation: R => R.required().error('Choisissez une catégorie'),
    },
    {
      name:  'origine',
      title: 'Origine / Région',
      type:  'string',
      placeholder: 'Ex : Azilal, Haut Atlas',
    },
    {
      name:  'matiere',
      title: 'Matière / Technique',
      type:  'string',
      placeholder: 'Ex : Laine naturelle · Fait main',
    },
    {
      name:  'description',
      title: 'Description (optionnelle)',
      type:  'text',
      rows:  4,
    },
    {
      name:         'featured',
      title:        'Mettre en vedette sur la page d\'accueil',
      type:         'boolean',
      initialValue: false,
      description:  'Les 4 premières pièces "en vedette" apparaissent dans la sélection du moment',
    },
    {
      name:        'ordre',
      title:       'Ordre d\'affichage',
      type:        'number',
      description: 'Nombre entier — les plus petits s\'affichent en premier',
    },
  ],

  orderings: [
    {
      title: 'Ordre d\'affichage',
      name:  'ordreAsc',
      by:    [{ field: 'ordre', direction: 'asc' }],
    },
    {
      title: 'Ajouté récemment',
      name:  'recents',
      by:    [{ field: '_createdAt', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      title:    'nom',
      subtitle: 'origine',
      media:    'image',
    },
  },
}
