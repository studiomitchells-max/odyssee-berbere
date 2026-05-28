// Schéma produit — Odyssée Berbère (v2 — avec prix, multi-photos, artisan)
export default {
  name: 'produit',
  title: 'Produit',
  type: 'document',
  icon: () => '🪬',

  fields: [
    {
      name: 'nom',
      title: 'Nom du produit',
      type: 'string',
      validation: R => R.required().error('Le nom est obligatoire'),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'nom', maxLength: 96 },
    },
    {
      name: 'categorie',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Tapis & Textiles',   value: 'tapis'        },
          { title: 'Céramique & Poterie', value: 'ceramique'    },
          { title: 'Bijoux & Argent',     value: 'bijoux'       },
          { title: 'Maroquinerie',        value: 'maroquinerie' },
          { title: 'Bois & Marqueterie',  value: 'bois'         },
          { title: 'Fer forgé & Cuivre',  value: 'metal'        },
          { title: 'Autres',              value: 'autres'       },
        ],
        layout: 'radio',
      },
      validation: R => R.required().error('Choisissez une catégorie'),
    },
    {
      name: 'prix',
      title: 'Prix (€)',
      type: 'number',
      validation: R => R.min(0),
    },
    {
      name: 'prixOriginale',
      title: 'Prix barré (€) — optionnel',
      type: 'number',
    },
    {
      name: 'disponible',
      title: 'Disponible à la vente',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'imagesPrincipales',
      title: 'Photos du produit',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt',     title: 'Texte alternatif', type: 'string' },
            { name: 'caption', title: 'Légende',          type: 'string' },
          ],
        },
      ],
      validation: R => R.min(1).error('Ajouter au moins une photo'),
    },
    {
      name: 'descriptionCourte',
      title: 'Description courte (carte produit)',
      type: 'text',
      rows: 3,
      validation: R => R.max(200),
    },
    {
      name: 'description',
      title: 'Description complète',
      type: 'text',
      rows: 6,
    },
    {
      name: 'origine',
      title: 'Région / origine artisanale',
      type: 'string',
      placeholder: 'ex : Fès, Marrakech, Essaouira…',
    },
    {
      name: 'artisan',
      title: 'Artisan',
      type: 'string',
    },
    {
      name: 'matiere',
      title: 'Matière / Technique',
      type: 'string',
      placeholder: 'ex : Laine naturelle · Fait main',
    },
    {
      name: 'dimensions',
      title: 'Dimensions / taille',
      type: 'string',
      placeholder: 'ex : 120 x 80 cm',
    },
    {
      name: 'featured',
      title: 'Mettre en vedette (page d\'accueil)',
      type: 'boolean',
      initialValue: false,
      description: 'Les 4 premières pièces "en vedette" apparaissent dans la sélection du moment',
    },
    {
      name: 'ordre',
      title: 'Ordre d\'affichage',
      type: 'number',
      initialValue: 99,
      description: 'Nombre entier — les plus petits s\'affichent en premier',
    },
  ],

  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'ordreAsc',
      by: [{ field: 'ordre', direction: 'asc' }],
    },
    {
      title: 'Ajouté récemment',
      name: 'recents',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],

  preview: {
    select: {
      title:    'nom',
      subtitle: 'origine',
      media:    'imagesPrincipales.0',
    },
  },
}
