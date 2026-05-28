import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas/index'

// ── Remplacez ces deux valeurs par les vôtres ──
// Trouvez votre Project ID sur : https://sanity.io/manage
const PROJECT_ID = 'iv3lqevt'
const DATASET    = 'production'

export default defineConfig({
  name:    'odyssee-berbere',
  title:   'Odyssée Berbère — Administration',
  projectId: PROJECT_ID,
  dataset:   DATASET,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Administration')
          .items([
            // Produits
            S.listItem()
              .title('Produits')
              .icon(() => '🏺')
              .child(
                S.documentTypeList('produit')
                  .title('Tous les produits')
              ),
            // Catégories
            S.listItem()
              .title('Catégories')
              .icon(() => '📂')
              .child(
                S.documentTypeList('categorie')
                  .title('Catégories')
              ),
            S.divider(),
            // Paramètres (singleton)
            S.listItem()
              .title('Paramètres du site')
              .icon(() => '⚙️')
              .child(
                S.document()
                  .schemaType('parametres')
                  .documentId('parametres')
              ),
          ]),
    }),
    visionTool(), // outil de requêtes GROQ (dev only)
  ],

  schema: {
    types: schemaTypes,
  },
})
