import { Template } from '@/types';

import { getRandomTemplateByCategory } from './templates';

export const templates: Template[] = [
  // Landing Pages
  {
    id: 'landing-modern',
    name: 'Landing Page Moderne',
    description: 'Page d\'accueil moderne avec hero, features et CTA',
    category: 'landing',
    framework: 'react',
    theme: 'cyberpunk',
    components: [
      {
        id: 'nav-1',
        type: 'navbar',
        name: 'Navigation',
        props: { title: 'FutureUI', items: ['Accueil', 'Fonctionnalités', 'Tarifs', 'Contact'] },
        style: { padding: '16px 32px', backdropFilter: 'blur(20px)' },
        position: { x: 0, y: 0, width: 800, height: 60 },
      },
      {
        id: 'hero-1',
        type: 'hero',
        name: 'Hero Section',
        props: { title: 'Bienvenue dans le Futur', subtitle: 'Créez des interfaces extraordinaires', buttonText: 'Commencer', hasButton: true },
        style: { padding: '80px 40px', textAlign: 'center', minHeight: '500px' },
        position: { x: 0, y: 60, width: 800, height: 400 },
      },
      {
        id: 'footer-1',
        type: 'footer',
        name: 'Footer',
        props: { title: 'FutureUI', links: ['Mentions légales', 'Contact'], copyright: '© 2025 FutureUI' },
        style: { padding: '40px 32px', textAlign: 'center' },
        position: { x: 0, y: 480, width: 800, height: 120 },
      },
    ],
  },
  {
    id: 'landing-startup',
    name: 'Landing Startup',
    description: 'Page startup avec pricing et testimonials',
    category: 'landing',
    framework: 'vue',
    theme: 'synthwave',
    components: [
      {
        id: 'nav-startup',
        type: 'navbar',
        name: 'Navigation Startup',
        props: { title: 'StartupCo', items: ['Produit', 'Tarifs', 'À propos', 'Contact'] },
        style: { padding: '20px 40px', background: 'rgba(255, 255, 255, 0.05)' },
        position: { x: 0, y: 0, width: 800, height: 60 },
      },
      {
        id: 'hero-startup',
        type: 'hero',
        name: 'Hero Startup',
        props: { title: 'Révolutionnez votre business', subtitle: 'La solution qui change tout', buttonText: 'Essai gratuit', hasButton: true },
        style: { padding: '100px 40px', textAlign: 'center' },
        position: { x: 0, y: 60, width: 800, height: 400 },
      },
      {
        id: 'grid-features',
        type: 'grid',
        name: 'Features',
        props: { columns: 3, items: ['Rapide', 'Sécurisé', 'Évolutif'] },
        style: { gap: '24px', padding: '40px' },
        position: { x: 50, y: 480, width: 700, height: 200 },
      },
    ],
  },
  {
    id: 'landing-saas',
    name: 'Landing SaaS',
    description: 'Page SaaS avec pricing et features',
    category: 'landing',
    framework: 'html',
    theme: 'modern-light',
    components: [
      {
        id: 'nav-saas',
        type: 'navbar',
        name: 'Navigation SaaS',
        props: { title: 'SaaS Platform', items: ['Features', 'Pricing', 'Docs', 'Login'] },
        style: { padding: '16px 32px', background: '#FFFFFF', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' },
        position: { x: 0, y: 0, width: 800, height: 60 },
      },
      {
        id: 'hero-saas',
        type: 'hero',
        name: 'Hero SaaS',
        props: { title: 'Gérez votre business efficacement', subtitle: 'Plateforme tout-en-un pour entrepreneurs', buttonText: 'Commencer gratuitement', hasButton: true },
        style: { padding: '80px 40px', textAlign: 'center' },
        position: { x: 0, y: 60, width: 800, height: 400 },
      },
    ],
  },
  {
    id: 'landing-agency',
    name: 'Landing Agence',
    description: 'Page agence créative avec portfolio',
    category: 'landing',
    framework: 'svelte',
    theme: 'elegant-purple',
    components: [
      {
        id: 'nav-agency',
        type: 'navbar',
        name: 'Navigation Agence',
        props: { title: 'Creative Agency', items: ['Work', 'Services', 'About', 'Contact'] },
        style: { padding: '20px 40px', background: 'transparent' },
        position: { x: 0, y: 0, width: 800, height: 60 },
      },
      {
        id: 'hero-agency',
        type: 'hero',
        name: 'Hero Agence',
        props: { title: 'Créativité sans limites', subtitle: 'Nous donnons vie à vos idées', buttonText: 'Voir nos projets', hasButton: true },
        style: { padding: '100px 40px', textAlign: 'center' },
        position: { x: 0, y: 60, width: 800, height: 400 },
      },
    ],
  },

  // Dashboards
  {
    id: 'dashboard-admin',
    name: 'Dashboard Admin',
    description: 'Interface d\'administration complète',
    category: 'dashboard',
    framework: 'react',
    theme: 'dark-minimal',
    components: [
      {
        id: 'sidebar-admin',
        type: 'aside',
        name: 'Sidebar Admin',
        props: { title: 'Admin Panel', items: ['Dashboard', 'Utilisateurs', 'Analytics', 'Paramètres'], position: 'left' },
        style: { padding: '24px', width: '250px', height: '100vh' },
        position: { x: 0, y: 0, width: 250, height: 600 },
      },
      {
        id: 'table-users',
        type: 'table',
        name: 'Table Utilisateurs',
        props: { headers: ['Nom', 'Email', 'Rôle', 'Statut'], rows: [['John Doe', 'john@example.com', 'Admin', 'Actif']] },
        style: { borderRadius: '12px', overflow: 'hidden' },
        position: { x: 270, y: 80, width: 500, height: 200 },
      },
    ],
  },
  {
    id: 'dashboard-analytics',
    name: 'Dashboard Analytics',
    description: 'Tableau de bord avec métriques et graphiques',
    category: 'dashboard',
    framework: 'vue',
    theme: 'corporate-blue',
    components: [
      {
        id: 'nav-analytics',
        type: 'navbar',
        name: 'Navigation Analytics',
        props: { title: 'Analytics Pro', items: ['Dashboard', 'Reports', 'Settings'] },
        style: { padding: '16px 32px', background: '#FFFFFF', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' },
        position: { x: 0, y: 0, width: 800, height: 60 },
      },
      {
        id: 'grid-metrics',
        type: 'grid',
        name: 'Métriques',
        props: { columns: 4, items: ['1,234 Visiteurs', '567 Conversions', '89% Taux', '12,345€ CA'] },
        style: { gap: '20px', padding: '24px' },
        position: { x: 50, y: 80, width: 700, height: 150 },
      },
    ],
  },
  {
    id: 'dashboard-ecommerce',
    name: 'Dashboard E-commerce',
    description: 'Tableau de bord vendeur avec commandes',
    category: 'dashboard',
    framework: 'angular',
    theme: 'warm-orange',
    components: [
      {
        id: 'aside-ecom',
        type: 'aside',
        name: 'Menu E-commerce',
        props: { title: 'Seller Dashboard', items: ['Commandes', 'Produits', 'Clients', 'Analytics'], position: 'left' },
        style: { padding: '24px', width: '250px' },
        position: { x: 0, y: 0, width: 250, height: 600 },
      },
      {
        id: 'table-orders',
        type: 'table',
        name: 'Commandes',
        props: { headers: ['ID', 'Client', 'Montant', 'Statut'], rows: [['#001', 'John', '299€', 'Livré']] },
        style: { borderRadius: '12px' },
        position: { x: 270, y: 20, width: 500, height: 200 },
      },
    ],
  },

  // E-commerce
  {
    id: 'ecommerce-product',
    name: 'Page Produit',
    description: 'Page de présentation produit avec galerie',
    category: 'ecommerce',
    framework: 'react',
    theme: 'neon-glass',
    components: [
      {
        id: 'nav-ecom',
        type: 'navbar',
        name: 'Navigation E-commerce',
        props: { title: 'ShopFuture', items: ['Produits', 'Catégories', 'Panier', 'Compte'] },
        style: { padding: '16px 32px', backdropFilter: 'blur(20px)' },
        position: { x: 0, y: 0, width: 800, height: 60 },
      },
      {
        id: 'card-product',
        type: 'card',
        name: 'Carte Produit',
        props: { title: 'Produit Premium', content: 'Description détaillée du produit', hasButton: true },
        style: { padding: '32px', borderRadius: '20px' },
        position: { x: 50, y: 100, width: 350, height: 300 },
      },
    ],
  },
  {
    id: 'ecommerce-shop',
    name: 'Boutique',
    description: 'Page boutique avec grille de produits',
    category: 'ecommerce',
    framework: 'vue',
    theme: 'pastel-dream',
    components: [
      {
        id: 'nav-shop',
        type: 'navbar',
        name: 'Navigation Boutique',
        props: { title: 'Fashion Store', items: ['Femme', 'Homme', 'Enfant', 'Accessoires'] },
        style: { padding: '16px 32px', background: '#FFFFFF' },
        position: { x: 0, y: 0, width: 800, height: 60 },
      },
      {
        id: 'grid-products',
        type: 'grid',
        name: 'Grille Produits',
        props: { columns: 3, items: ['Robe été', 'Chemise', 'Pantalon', 'Chaussures', 'Sac', 'Montre'] },
        style: { gap: '20px', padding: '32px' },
        position: { x: 50, y: 80, width: 700, height: 400 },
      },
    ],
  },
  {
    id: 'ecommerce-cart',
    name: 'Panier',
    description: 'Page panier avec récapitulatif',
    category: 'ecommerce',
    framework: 'html',
    theme: 'modern-light',
    components: [
      {
        id: 'nav-cart',
        type: 'navbar',
        name: 'Navigation Panier',
        props: { title: 'Mon Panier', items: ['Boutique', 'Panier', 'Compte'] },
        style: { padding: '16px 32px', background: '#FFFFFF' },
        position: { x: 0, y: 0, width: 800, height: 60 },
      },
      {
        id: 'table-cart',
        type: 'table',
        name: 'Articles Panier',
        props: { headers: ['Produit', 'Quantité', 'Prix', 'Total'], rows: [['T-shirt', '2', '25€', '50€']] },
        style: { borderRadius: '12px' },
        position: { x: 50, y: 100, width: 500, height: 200 },
      },
    ],
  },

  // Blogs
  {
    id: 'blog-minimal',
    name: 'Blog Minimal',
    description: 'Interface de blog épurée et moderne',
    category: 'blog',
    framework: 'vue',
    theme: 'dark-minimal',
    components: [
      {
        id: 'nav-blog',
        type: 'navbar',
        name: 'Navigation Blog',
        props: { title: 'Mon Blog', items: ['Articles', 'Catégories', 'À propos', 'Contact'] },
        style: { padding: '20px 32px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' },
        position: { x: 0, y: 0, width: 800, height: 60 },
      },
      {
        id: 'grid-articles',
        type: 'grid',
        name: 'Grille Articles',
        props: { columns: 2, items: ['Article 1', 'Article 2', 'Article 3', 'Article 4'] },
        style: { gap: '24px', padding: '40px' },
        position: { x: 50, y: 100, width: 700, height: 400 },
      },
    ],
  },
  {
    id: 'blog-magazine',
    name: 'Blog Magazine',
    description: 'Style magazine avec sidebar',
    category: 'blog',
    framework: 'react',
    theme: 'vintage-sepia',
    components: [
      {
        id: 'nav-magazine',
        type: 'navbar',
        name: 'Navigation Magazine',
        props: { title: 'Magazine', items: ['Actualités', 'Culture', 'Tech', 'Lifestyle'] },
        style: { padding: '16px 32px', background: '#FFFBEB' },
        position: { x: 0, y: 0, width: 800, height: 60 },
      },
      {
        id: 'aside-blog',
        type: 'aside',
        name: 'Sidebar Blog',
        props: { title: 'Articles récents', items: ['Article 1', 'Article 2', 'Article 3'], position: 'right' },
        style: { padding: '24px', width: '250px' },
        position: { x: 550, y: 60, width: 250, height: 400 },
      },
    ],
  },
  {
    id: 'blog-personal',
    name: 'Blog Personnel',
    description: 'Blog personnel avec profil',
    category: 'blog',
    framework: 'svelte',
    theme: 'nature-green',
    components: [
      {
        id: 'nav-personal',
        type: 'navbar',
        name: 'Navigation Personnelle',
        props: { title: 'John Doe', items: ['Blog', 'À propos', 'Portfolio', 'Contact'] },
        style: { padding: '20px 32px', background: '#F0FDF4' },
        position: { x: 0, y: 0, width: 800, height: 60 },
      },
      {
        id: 'hero-personal',
        type: 'hero',
        name: 'Hero Personnel',
        props: { title: 'Bienvenue sur mon blog', subtitle: 'Mes réflexions et découvertes', buttonText: 'Lire mes articles', hasButton: true },
        style: { padding: '80px 40px', textAlign: 'center' },
        position: { x: 0, y: 60, width: 800, height: 300 },
      },
    ],
  },

  // Portfolios
  {
    id: 'portfolio-creative',
    name: 'Portfolio Créatif',
    description: 'Portfolio avec galerie et présentation',
    category: 'portfolio',
    framework: 'svelte',
    theme: 'synthwave',
    components: [
      {
        id: 'hero-portfolio',
        type: 'hero',
        name: 'Hero Portfolio',
        props: { title: 'Designer Créatif', subtitle: 'Créateur d\'expériences digitales uniques', buttonText: 'Voir mes projets', hasButton: true },
        style: { padding: '100px 40px', textAlign: 'center' },
        position: { x: 0, y: 0, width: 800, height: 400 },
      },
      {
        id: 'grid-portfolio',
        type: 'grid',
        name: 'Galerie Projets',
        props: { columns: 3, items: ['Projet 1', 'Projet 2', 'Projet 3', 'Projet 4', 'Projet 5', 'Projet 6'] },
        style: { gap: '20px', padding: '40px' },
        position: { x: 50, y: 420, width: 700, height: 300 },
      },
    ],
  },
  {
    id: 'portfolio-developer',
    name: 'Portfolio Développeur',
    description: 'Portfolio développeur avec projets tech',
    category: 'portfolio',
    framework: 'react',
    theme: 'matrix',
    components: [
      {
        id: 'nav-dev',
        type: 'navbar',
        name: 'Navigation Dev',
        props: { title: 'Dev Portfolio', items: ['Projects', 'Skills', 'Experience', 'Contact'] },
        style: { padding: '16px 32px', background: '#001100' },
        position: { x: 0, y: 0, width: 800, height: 60 },
      },
      {
        id: 'hero-dev',
        type: 'hero',
        name: 'Hero Développeur',
        props: { title: 'Full-Stack Developer', subtitle: 'Créateur d\'applications web modernes', buttonText: 'Voir mes projets', hasButton: true },
        style: { padding: '80px 40px', textAlign: 'center' },
        position: { x: 0, y: 60, width: 800, height: 350 },
      },
    ],
  },
  {
    id: 'portfolio-photographer',
    name: 'Portfolio Photographe',
    description: 'Portfolio photographe avec galerie',
    category: 'portfolio',
    framework: 'html',
    theme: 'monochrome',
    components: [
      {
        id: 'nav-photo',
        type: 'navbar',
        name: 'Navigation Photo',
        props: { title: 'Photo Studio', items: ['Gallery', 'About', 'Services', 'Contact'] },
        style: { padding: '20px 32px', background: '#FFFFFF' },
        position: { x: 0, y: 0, width: 800, height: 60 },
      },
      {
        id: 'grid-gallery',
        type: 'grid',
        name: 'Galerie Photos',
        props: { columns: 4, items: ['Photo 1', 'Photo 2', 'Photo 3', 'Photo 4', 'Photo 5', 'Photo 6', 'Photo 7', 'Photo 8'] },
        style: { gap: '16px', padding: '32px' },
        position: { x: 50, y: 80, width: 700, height: 400 },
      },
    ],
  },

  // Applications
  {
    id: 'app-mobile',
    name: 'Interface App Mobile',
    description: 'Interface d\'application mobile responsive',
    category: 'app',
    framework: 'react',
    theme: 'ocean-depth',
    components: [
      {
        id: 'nav-mobile',
        type: 'navbar',
        name: 'Navigation Mobile',
        props: { title: 'MobileApp', items: ['Home', 'Profile', 'Settings'] },
        style: { padding: '16px 20px', borderRadius: '0 0 20px 20px' },
        position: { x: 0, y: 0, width: 400, height: 60 },
      },
      {
        id: 'cards-mobile',
        type: 'grid',
        name: 'Grille Mobile',
        props: { columns: 1, items: ['Fonctionnalité 1', 'Fonctionnalité 2', 'Fonctionnalité 3'] },
        style: { gap: '16px', padding: '20px' },
        position: { x: 20, y: 80, width: 360, height: 400 },
      },
    ],
  },
  {
    id: 'app-social',
    name: 'App Sociale',
    description: 'Interface réseau social',
    category: 'app',
    framework: 'vue',
    theme: 'pastel-dream',
    components: [
      {
        id: 'nav-social',
        type: 'navbar',
        name: 'Navigation Sociale',
        props: { title: 'SocialApp', items: ['Feed', 'Messages', 'Profile', 'Settings'] },
        style: { padding: '16px 32px', background: '#FFFFFF' },
        position: { x: 0, y: 0, width: 800, height: 60 },
      },
      {
        id: 'aside-social',
        type: 'aside',
        name: 'Sidebar Sociale',
        props: { title: 'Navigation', items: ['Feed', 'Friends', 'Groups', 'Events'], position: 'left' },
        style: { padding: '20px', width: '200px' },
        position: { x: 0, y: 60, width: 200, height: 500 },
      },
    ],
  },
  {
    id: 'app-productivity',
    name: 'App Productivité',
    description: 'Application de gestion de tâches',
    category: 'app',
    framework: 'angular',
    theme: 'midnight-purple',
    components: [
      {
        id: 'nav-productivity',
        type: 'navbar',
        name: 'Navigation Productivité',
        props: { title: 'TaskManager', items: ['Tasks', 'Projects', 'Calendar', 'Reports'] },
        style: { padding: '16px 32px', background: 'rgba(255, 255, 255, 0.1)' },
        position: { x: 0, y: 0, width: 800, height: 60 },
      },
      {
        id: 'table-tasks',
        type: 'table',
        name: 'Liste Tâches',
        props: { headers: ['Tâche', 'Priorité', 'Statut', 'Date'], rows: [['Finir projet', 'Haute', 'En cours', '25/01']] },
        style: { borderRadius: '12px' },
        position: { x: 50, y: 100, width: 700, height: 300 },
      },
    ],
  },
];

export const getTemplatesByCategory = () => {
  return {
    landing: templates.filter(t => t.category === 'landing'),
    dashboard: templates.filter(t => t.category === 'dashboard'),
    ecommerce: templates.filter(t => t.category === 'ecommerce'),
    blog: templates.filter(t => t.category === 'blog'),
    portfolio: templates.filter(t => t.category === 'portfolio'),
    app: templates.filter(t => t.category === 'app'),
  };
};

export const getRandomTemplate = (): Template => {
  const randomIndex = Math.floor(Math.random() * templates.length);
  const baseTemplate = templates[randomIndex];
  
  // Créer des variations aléatoires du template
  const variations = generateTemplateVariations(baseTemplate);
  return variations[Math.floor(Math.random() * variations.length)];
};

export const getRandomTemplateByCategory = (category: string): Template => {
  const categoryTemplates = templates.filter(t => t.category === category);
  if (categoryTemplates.length === 0) return getRandomTemplate();
  
  const randomIndex = Math.floor(Math.random() * categoryTemplates.length);
  const baseTemplate = categoryTemplates[randomIndex];
  
  const variations = generateTemplateVariations(baseTemplate);
  return variations[Math.floor(Math.random() * variations.length)];
};

const generateTemplateVariations = (baseTemplate: Template): Template[] => {
  const variations = [baseTemplate];
  
  // Générer 2-3 variations du template de base
  for (let i = 0; i < 3; i++) {
    const variation = {
      ...baseTemplate,
      id: `${baseTemplate.id}-var-${i}`,
      name: `${baseTemplate.name} (Variante ${i + 1})`,
      components: baseTemplate.components.map(comp => ({
        ...comp,
        id: `${comp.id}-var-${i}`,
        position: {
          ...comp.position,
          x: comp.position.x + (Math.random() - 0.5) * 20,
          y: comp.position.y + (Math.random() - 0.5) * 20,
        },
        style: {
          ...comp.style,
          borderRadius: `${Math.floor(Math.random() * 20) + 8}px`,
        },
      })),
    };
    variations.push(variation);
  }
  
  return variations;
};