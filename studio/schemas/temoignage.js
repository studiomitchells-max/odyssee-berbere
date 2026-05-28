// Schéma témoignages clients — Odyssée Berbère
export default {
  name: 'temoignage',
  title: 'Témoignage',
  type: 'document',
  icon: () => '⭐',

  fields: [
    {
      name: 'auteur',
      title: 'Nom du client',
      type: 'string',
      validation: R => R.required(),
    },
    {
      name: 'ville',
      title: 'Ville / pays (optionnel)',
      type: 'string',
      placeholder: 'ex : Paris, France',
    },
    {
      name: 'texte',
      title: 'Témoignage',
      type: 'text',
      rows: 4,
      validation: R => R.required().min(20).max(500),
    },
    {
      name: 'note',
      title: 'Note (1 à 5 étoiles)',
      type: 'number',
      options: {
        list: [
          { title: '⭐ 1',           value: 1 },
          { title: '⭐⭐ 2',         value: 2 },
          { title: '⭐⭐⭐ 3',       value: 3 },
          { title: '⭐⭐⭐⭐ 4',     value: 4 },
          { title: '⭐⭐⭐⭐⭐ 5',   value: 5 },
        ],
      },
      initialValue: 5,
      validation: R => R.required().min(1).max(5),
    },
    {
      name: 'photo',
      title: 'Photo du client (optionnel)',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'produitAchete',
      title: 'Produit acheté (optionnel)',
      type: 'string',
    },
    {
      name: 'dateAchat',
      title: 'Date',
      type: 'date',
    },
    {
      name: 'visible',
      title: 'Afficher sur le site',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'enVedette',
      title: 'Mettre en avant (page d\'accueil)',
      type: 'boolean',
      initialValue: false,
    },
  ],

  preview: {
    select: {
      title:    'auteur',
      subtitle: 'texte',
      media:    'photo',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: subtitle ? subtitle.substring(0, 60) + '…' : '',
        media,
      }
    },
  },
}
