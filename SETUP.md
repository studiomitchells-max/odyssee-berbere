# Odyssée Berbère — Guide de mise en ligne

Ce guide couvre les 4 étapes pour mettre le site en production :
1. Créer le projet Sanity (back-office)
2. Déployer le Studio Sanity
3. Publier le site sur Cloudflare Pages
4. Activer les statistiques de visites

---

## Étape 1 — Créer le projet Sanity

### 1.1 Créer un compte
Rendez-vous sur **https://sanity.io** → "Get started for free" → créer un compte.

### 1.2 Créer le projet
```bash
# Depuis le dossier studio/
cd studio
npm install
npx sanity init --create-project "Odyssée Berbère" --dataset production
```
Sanity va vous demander de vous connecter, puis créera le projet et affichera un **Project ID** (ex: `abc12345`).

### 1.3 Renseigner le Project ID dans les fichiers
Remplacez `YOUR_PROJECT_ID` dans deux fichiers :

**`studio/sanity.config.js`** — ligne 5 :
```js
const PROJECT_ID = 'abc12345'; // ← votre vrai ID ici
```

**`js/sanity.js`** — ligne 2 :
```js
projectId: 'abc12345', // ← votre vrai ID ici
```

---

## Étape 2 — Déployer le Studio Sanity

### 2.1 Lancer le studio en local (pour tester)
```bash
cd studio
npm run dev
# Ouvre http://localhost:3333
```

### 2.2 Déployer le studio en ligne
```bash
cd studio
npm run deploy
# Sanity vous demande un nom d'hôte (ex: odyssee-berbere)
# → Studio accessible sur https://odyssee-berbere.sanity.studio
```

### 2.3 Ajouter des pièces dans le back-office
- Ouvrez votre studio en ligne
- Cliquez **Produits** → **Nouveau produit**
- Remplissez : nom, image, catégorie, origine, matière, description
- Cochez **Mis en avant** pour qu'il apparaisse sur la page d'accueil
- Cliquez **Publier**

### 2.4 Autoriser votre domaine Cloudflare dans Sanity CORS
Dans **manage.sanity.io** → votre projet → **API** → **CORS Origins** :
Ajoutez l'URL de votre site Cloudflare (ex: `https://odyssee-berbere.pages.dev`).

---

## Étape 3 — Publier sur Cloudflare Pages

### 3.1 Créer un dépôt GitHub
```bash
# Dans le dossier racine du site (SITE WEB OB Claude/)
git init
git add .
git commit -m "Initial commit — Odyssée Berbère"
```
Créez un dépôt sur **github.com** (bouton "New repository"), puis :
```bash
git remote add origin https://github.com/VOTRE_NOM/odyssee-berbere.git
git push -u origin main
```

### 3.2 Connecter Cloudflare Pages
1. Allez sur **dash.cloudflare.com** → **Workers & Pages** → **Create application** → **Pages**
2. **Connect to Git** → sélectionnez votre dépôt GitHub
3. Paramètres de build :
   - **Framework preset** : `None`
   - **Build command** : *(laisser vide)*
   - **Build output directory** : `/` (ou laisser vide)
4. Cliquez **Save and Deploy**

Votre site sera en ligne sur `https://odyssee-berbere.pages.dev` (ou nom personnalisé).

### 3.3 Domaine personnalisé (optionnel)
Dans Cloudflare Pages → votre projet → **Custom domains** → ajoutez `www.odyssee-berbere.com`.

---

## Étape 4 — Statistiques de visites (Cloudflare Web Analytics)

### 4.1 Activer Web Analytics
1. Dans **dash.cloudflare.com** → **Web Analytics** → **Add a site**
2. Entrez votre domaine → Cloudflare génère un snippet JS
3. Ajoutez ce snippet **avant `</body>`** dans chaque fichier HTML :
```html
<script defer src='https://static.cloudflareinsights.com/beacon.min.js'
  data-cf-beacon='{"token": "VOTRE_TOKEN_ICI"}'></script>
```

### 4.2 Consulter les stats
Dans Cloudflare → **Web Analytics** → votre site.
Vous verrez : visiteurs uniques, pages vues, pays, appareils, etc.
**Aucun cookie, aucune bannière GDPR nécessaire.**

---

## Résumé des URLs

| Service | URL |
|---------|-----|
| Site public | `https://odyssee-berbere.pages.dev` |
| Studio back-office | `https://odyssee-berbere.sanity.studio` |
| Tableau de bord Sanity | `https://manage.sanity.io` |
| Tableau de bord Cloudflare | `https://dash.cloudflare.com` |

---

## Mettre à jour le site

### Modifier le contenu (photos, textes, produits)
→ Passez par le **Studio Sanity** (back-office). Les modifications sont visibles instantanément sur le site.

### Modifier le design ou le code
1. Éditez les fichiers localement
2. `git add . && git commit -m "Description du changement"`
3. `git push`
4. Cloudflare Pages redéploie automatiquement (< 1 minute)

---

## Compression vidéo (important avant mise en ligne)

La vidéo hero pèse 206 Mo — trop lourd pour le web. Compressez-la avec **HandBrake** (gratuit) :
- Ouvrez HandBrake → chargez `bandeau.OB.mp4`
- Preset : **Web → Gmail Large 3 Minutes 720p30**
- Onglet Video : RF 28, encoder H.265
- Durée : gardez les 12 premières secondes (Start: 0s, End: 12s)
- Sortie : `hero-video.mp4` (objectif < 8 Mo)
- Replacez le fichier dans `images/hero/hero-video.mp4`
