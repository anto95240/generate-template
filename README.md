# FutureUI Generator

Un générateur d'interfaces utilisateur futuristes avec IA intégrée, support multi-framework et export de code.

## 🚀 Fonctionnalités

### ✨ Génération IA
- **Composants individuels** : Générez des boutons, navbars, cartes, etc.
- **Canvas complet** : Créez des interfaces complètes (landing pages, dashboards)
- **Système de tokens** : Gestion intelligente des limites d'utilisation
- **IA gratuite** : Système mock intégré pour le développement

### 🎨 Personnalisation avancée
- **8 thèmes** : Cyberpunk, Neon Glass, Matrix, Hologram, etc.
- **Propriétés détaillées** : Couleurs, bordures, ombres, animations
- **Animations** : 8 types d'animations (fadeIn, bounce, glow, etc.)
- **Styles avancés** : Glassmorphism, néon, gradients

### 🛠️ Multi-Framework
- **Frontend** : React, Vue, Angular, Svelte
- **Full-Stack** : Next.js, Nuxt.js
- **Backend** : Symfony, Laravel, Django, Rails, Express, FastAPI
- **Vanilla** : HTML/CSS/JS

### 📦 Templates prêts
- **6 catégories** : Landing, Dashboard, E-commerce, Blog, Portfolio, App
- **Templates aléatoires** : Génération instantanée d'interfaces
- **Personnalisables** : Modifiez tous les éléments après import

### 💾 Export intelligent
- **Fichier unique** : Code complet dans un fichier
- **Projet modulaire** : Structure complète avec composants séparés
- **Prêt à l'emploi** : Aucune configuration requise
- **Minification** : Code optimisé pour la production

## 🤖 Configuration IA

### Option 1 : Google AI (Gemini) - Recommandée
1. Créez un compte sur [Google AI Studio](https://ai.google.dev/)
2. Générez une clé API gratuite
3. Copiez `.env.example` vers `.env.local`
4. Ajoutez votre clé : `NEXT_PUBLIC_GOOGLE_AI_API_KEY=votre_cle`

**Avantages** :
- 50 requêtes/heure gratuites
- Qualité de génération excellente
- Réponses contextuelles précises
- Support des canvas complets

### Option 2 : Mode Mock (Par défaut)
Si aucune clé API n'est configurée, le système utilise un générateur mock intelligent :
- **Gratuit et illimité** en développement
- **Reconnaissance de mots-clés** : navbar, button, card, form, etc.
- **Réponses cohérentes** basées sur le contexte
- **Parfait pour tester** et développer

### Alternatives gratuites
- **Hugging Face** : Modèles open-source via API
- **Ollama** : IA locale (nécessite installation)
- **OpenAI Free Tier** : 3 requêtes/minute

## 🎯 Utilisation

### Démarrage rapide
```bash
npm install
npm run dev
```

### Workflow recommandé
1. **Choisissez un framework** (React, Vue, etc.)
2. **Sélectionnez un thème** (Cyberpunk, Neon Glass, etc.)
3. **Ajoutez des composants** :
   - Manuellement depuis la sidebar
   - Via l'IA avec des prompts
   - En chargeant un template
4. **Personnalisez** dans le panneau de propriétés
5. **Exportez** votre code prêt à l'emploi

### Exemples de prompts IA

**Composants** :
- "Créer un bouton CTA avec effet néon"
- "Générer une navbar glassmorphism avec 5 liens"
- "Faire une carte produit avec prix et bouton achat"

**Canvas complet** :
- "Créer une landing page SaaS moderne"
- "Générer un dashboard admin avec sidebar et tableaux"
- "Faire une page portfolio créative"

## 🎨 Composants disponibles

### Navigation
- **Navbar** : 8 variantes (moderne, glass, minimal, etc.)
- **Aside/Sidebar** : 5 styles (navigation, admin, filters, etc.)
- **Footer** : 5 types (simple, multi-column, social, etc.)

### Contenu
- **Hero Section** : 5 layouts (landing, app, product, etc.)
- **Card** : 8 variantes (simple, produit, pricing, etc.)
- **Text** : 6 styles (titre, paragraphe, citation, etc.)
- **Grid** : 5 configurations (galerie, services, portfolio, etc.)

### Formulaires
- **Form** : 6 types (contact, connexion, newsletter, etc.)
- **Input** : 8 styles (standard, futuriste, floating, etc.)
- **Button** : 10 variantes (primaire, néon, glass, etc.)

### Interface
- **Table** : 5 styles (utilisateurs, produits, analytics, etc.)
- **Modal** : 4 types (confirmation, info, form, image)
- **Tabs** : 4 styles (horizontal, pills, vertical, minimal)
- **Accordion** : 2 types (FAQ, documentation)
- **Badge** : 5 variantes (status, new, count, category, version)
- **Alert** : 4 types (success, error, warning, info)
- **Progress** : 4 styles (simple, thick, circular, stepped)

## 🎭 Thèmes

### Cyberpunk
- Couleurs : Cyan, Purple, Green
- Effets : Glow, Neon, Animations
- Style : Futuriste, High-tech

### Neon Glass
- Couleurs : Pink, Purple, Cyan
- Effets : Glassmorphism, Glow, Neon
- Style : Transparent, Lumineux

### Matrix
- Couleurs : Green monochrome
- Effets : Glow, Animations
- Style : Terminal, Hacker

### Hologram
- Couleurs : Blue, Purple, Gold
- Effets : Glassmorphism, Glow
- Style : Holographique, Sci-fi

### Synthwave
- Couleurs : Pink, Orange, Yellow
- Effets : Neon, Gradients, Glow
- Style : Rétro-futuriste, 80s

### Dark Minimal
- Couleurs : Indigo, Purple, Cyan
- Effets : Shadows subtiles
- Style : Épuré, Professionnel

### Ocean Depth
- Couleurs : Blue océan
- Effets : Glassmorphism, Gradients
- Style : Aquatique, Profond

### Sunset Gradient
- Couleurs : Orange, Teal, Yellow
- Effets : Gradients, Glow
- Style : Chaleureux, Vibrant

## 📁 Structure d'export

### Fichier unique
```
mon-projet.html    # Tout le code dans un fichier
```

### Projet modulaire
```
mon-projet/
├── index.html          # Page principale
├── components/         # Composants séparés
├── styles/            # CSS organisé
├── assets/            # Images, fonts
├── package.json       # Dépendances
└── README.md          # Documentation
```

## 🔧 Développement

### Structure du projet
```
├── app/                # Pages Next.js
├── components/         # Composants React
├── data/              # Templates, thèmes, frameworks
├── hooks/             # Hooks personnalisés
├── services/          # Services (IA, export)
├── types/             # Types TypeScript
└── utils/             # Utilitaires
```

### Technologies utilisées
- **Next.js 15** : Framework React
- **TypeScript** : Typage statique
- **Tailwind CSS** : Styles utilitaires
- **Lucide React** : Icônes
- **Google AI** : Génération IA (optionnel)

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

MIT License - Voir le fichier LICENSE pour plus de détails.

---

Créé avec ❤️ pour simplifier la création d'interfaces modernes et futuristes.