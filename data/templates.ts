import { Template } from '@/types';

// Fonction pour générer des variantes aléatoires
const generateRandomVariants = (baseTemplate: Template): Template[] => {
  const variants: Template[] = [];
  
  // Générer 3-5 variantes par template
  const variantCount = Math.floor(Math.random() * 3) + 3;
  
  for (let i = 0; i < variantCount; i++) {
    const variant: Template = {
      ...baseTemplate,
      id: `${baseTemplate.id}-variant-${i + 1}`,
      name: `${baseTemplate.name} - Variante ${i + 1}`,
      components: baseTemplate.components.map(comp => ({
        ...comp,
        id: `${comp.id}-v${i + 1}`,
        position: {
          ...comp.position,
          x: comp.position.x + (Math.random() * 40 - 20),
          y: comp.position.y + (Math.random() * 20 - 10),
        },
        style: {
          ...comp.style,
          borderRadius: `${Math.floor(Math.random() * 20) + 4}px`,
        },
      })),
    };
    variants.push(variant);
  }
  
  return variants;
};

export const templates: Template[] = [
  {
    id: 'landing-modern',
    name: 'Landing Page Moderne',
    description: 'Page d\'accueil moderne avec hero, features et CTA',
    category: 'landing',
    framework: 'react',
    theme: 'cyberpunk',
    variants: [],
    components: [
      {
        id: 'hero-1',
        type: 'hero',
        name: 'Hero Section',
        props: {
          title: 'Bienvenue dans le Futur',
          subtitle: 'Créez des interfaces extraordinaires',
          buttonText: 'Commencer',
          hasButton: true,
        },
        style: { padding: '80px 40px', textAlign: 'center', minHeight: '500px' },
        position: { x: 0, y: 0, width: 800, height: 400 },
      },
      {
        id: 'nav-1',
        type: 'navbar',
        name: 'Navigation',
        props: {
          title: 'FutureUI',
          items: ['Accueil', 'Fonctionnalités', 'Tarifs', 'Contact'],
        },
        style: { padding: '16px 32px', backdropFilter: 'blur(20px)' },
        position: { x: 0, y: 0, width: 800, height: 60 },
      },
      {
        id: 'features-1',
        type: 'grid',
        name: 'Features Grid',
        props: {
          columns: 3,
          items: ['Rapide', 'Sécurisé', 'Moderne', 'Responsive', 'Accessible', 'Performant'],
        },
        style: { gap: '24px', padding: '40px' },
        position: { x: 50, y: 420, width: 700, height: 200 },
      },
    ],
  },
  // Nouvelles variantes de dashboard
  {
    id: 'dashboard-admin',
    name: 'Dashboard Admin',
    description: 'Interface d\'administration complète',
    category: 'dashboard',
    framework: 'react',
    theme: 'dark-minimal',
    variants: [],
    components: [
      {
        id: 'sidebar-1',
        type: 'aside',
        name: 'Sidebar',
        props: {
          title: 'Admin Panel',
          items: ['Dashboard', 'Utilisateurs', 'Analytics', 'Paramètres'],
          position: 'left',
        },
        style: { padding: '24px', width: '250px', height: '100vh' },
        position: { x: 0, y: 0, width: 250, height: 600 },
      },
      {
        id: 'table-1',
        type: 'table',
        name: 'Table Utilisateurs',
        props: {
          headers: ['Nom', 'Email', 'Rôle', 'Statut'],
          rows: [
            ['John Doe', 'john@example.com', 'Admin', 'Actif'],
            ['Jane Smith', 'jane@example.com', 'User', 'Actif'],
          ],
        },
        style: { borderRadius: '12px', overflow: 'hidden' },
        position: { x: 270, y: 80, width: 500, height: 200 },
      },
      {
        id: 'stats-cards',
        type: 'grid',
        name: 'Stats Cards',
        props: {
          columns: 4,
          items: ['1,234 Users', '567 Orders', '89% Uptime', '$12,345 Revenue'],
        },
        style: { gap: '16px', padding: '20px' },
        position: { x: 270, y: 20, width: 500, height: 50 },
      },
    ],
  },
  {
    id: 'dashboard-analytics',
    name: 'Dashboard Analytics',
    description: 'Dashboard focalisé sur les analytics et métriques',
    category: 'dashboard',
    framework: 'react',
    theme: 'ocean-depth',
    variants: [],
    components: [
      {
        id: 'nav-analytics',
        type: 'navbar',
        name: 'Analytics Nav',
        props: {
          title: 'Analytics Pro',
          items: ['Overview', 'Reports', 'Real-time', 'Settings'],
        },
        style: { padding: '16px 32px', backdropFilter: 'blur(20px)' },
        position: { x: 0, y: 0, width: 800, height: 60 },
      },
      {
        id: 'metrics-grid',
        type: 'grid',
        name: 'Metrics Grid',
        props: {
          columns: 3,
          items: ['Page Views: 45.2K', 'Unique Visitors: 12.8K', 'Bounce Rate: 32%', 'Avg. Session: 4m 23s', 'Conversion: 3.2%', 'Revenue: $8,945'],
        },
        style: { gap: '20px', padding: '30px' },
        position: { x: 50, y: 80, width: 700, height: 200 },
      },
      {
        id: 'chart-area',
        type: 'card',
        name: 'Chart Container',
        props: {
          title: 'Traffic Overview',
          content: 'Graphique des visites sur les 30 derniers jours',
          hasButton: false,
        },
        style: { padding: '24px', borderRadius: '16px' },
        position: { x: 50, y: 300, width: 700, height: 250 },
      },
    ],
  },
  {
    id: 'dashboard-ecommerce',
    name: 'Dashboard E-commerce',
    description: 'Dashboard pour gestion e-commerce',
    category: 'dashboard',
    framework: 'react',
    theme: 'synthwave',
    variants: [],
    components: [
      {
        id: 'ecom-sidebar',
        type: 'aside',
        name: 'E-commerce Sidebar',
        props: {
          title: 'Shop Admin',
          items: ['Orders', 'Products', 'Customers', 'Inventory', 'Reports'],
          position: 'left',
        },
        style: { padding: '24px', width: '250px', height: '100vh' },
        position: { x: 0, y: 0, width: 250, height: 600 },
      },
      {
        id: 'orders-table',
        type: 'table',
        name: 'Recent Orders',
        props: {
          headers: ['Order ID', 'Customer', 'Amount', 'Status'],
          rows: [
            ['#1001', 'Alice Johnson', '$299.99', 'Shipped'],
            ['#1002', 'Bob Wilson', '$149.50', 'Processing'],
            ['#1003', 'Carol Davis', '$89.99', 'Delivered'],
          ],
        },
        style: { borderRadius: '12px', overflow: 'hidden' },
        position: { x: 270, y: 120, width: 500, height: 200 },
      },
      {
        id: 'sales-stats',
        type: 'grid',
        name: 'Sales Stats',
        props: {
          columns: 3,
          items: ['Today: $2,345', 'This Week: $18,920', 'This Month: $67,543'],
        },
        style: { gap: '16px', padding: '20px' },
        position: { x: 270, y: 20, width: 500, height: 80 },
      },
    ],
  },
  {
    id: 'ecommerce-product',
    name: 'Page Produit E-commerce',
    description: 'Page de présentation produit avec galerie et achat',
    category: 'ecommerce',
    framework: 'nextjs',
    theme: 'neon-glass',
    components: [
      {
        id: 'nav-ecom',
        type: 'navbar',
        name: 'Navigation E-commerce',
        props: {
          title: 'ShopFuture',
          items: ['Produits', 'Catégories', 'Panier', 'Compte'],
        },
        style: { padding: '16px 32px', backdropFilter: 'blur(20px)' },
        position: { x: 0, y: 0, width: 800, height: 60 },
      },
      {
        id: 'card-product',
        type: 'card',
        name: 'Carte Produit',
        props: {
          title: 'Produit Premium',
          content: 'Description détaillée du produit avec ses avantages',
          hasButton: true,
        },
        style: { padding: '32px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)' },
        position: { x: 50, y: 100, width: 350, height: 300 },
      },
    ],
  },
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
        props: {
          title: 'Mon Blog',
          items: ['Articles', 'Catégories', 'À propos', 'Contact'],
        },
        style: { padding: '20px 32px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' },
        position: { x: 0, y: 0, width: 800, height: 60 },
      },
      {
        id: 'grid-articles',
        type: 'grid',
        name: 'Grille Articles',
        props: {
          columns: 2,
          items: ['Article 1', 'Article 2', 'Article 3', 'Article 4'],
        },
        style: { gap: '24px', padding: '40px' },
        position: { x: 50, y: 100, width: 700, height: 400 },
      },
    ],
  },
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
        props: {
          title: 'Designer Créatif',
          subtitle: 'Créateur d\'expériences digitales uniques',
          buttonText: 'Voir mes projets',
          hasButton: true,
        },
        style: { padding: '100px 40px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(255, 0, 128, 0.2), rgba(255, 128, 0, 0.2))' },
        position: { x: 0, y: 0, width: 800, height: 400 },
      },
      {
        id: 'grid-portfolio',
        type: 'grid',
        name: 'Galerie Projets',
        props: {
          columns: 3,
          items: ['Projet 1', 'Projet 2', 'Projet 3', 'Projet 4', 'Projet 5', 'Projet 6'],
        },
        style: { gap: '20px', padding: '40px' },
        position: { x: 50, y: 420, width: 700, height: 300 },
      },
    ],
  },
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
        props: {
          title: 'MobileApp',
          items: ['Home', 'Profile', 'Settings'],
        },
        style: { padding: '16px 20px', borderRadius: '0 0 20px 20px' },
        position: { x: 0, y: 0, width: 400, height: 60 },
      },
      {
        id: 'cards-mobile',
        type: 'grid',
        name: 'Grille Mobile',
        props: {
          columns: 1,
          items: ['Fonctionnalité 1', 'Fonctionnalité 2', 'Fonctionnalité 3'],
        },
        style: { gap: '16px', padding: '20px' },
        position: { x: 20, y: 80, width: 360, height: 400 },
      },
    ],
  },
];

// Générer les variantes pour tous les templates
templates.forEach(template => {
  template.variants = generateRandomVariants(template);
});

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

export const getRandomTemplate = (category?: string): Template => {
  let availableTemplates = templates;
  
  if (category && category !== 'all') {
    availableTemplates = templates.filter(t => t.category === category);
  }
  
  if (availableTemplates.length === 0) {
    availableTemplates = templates;
  }
  
  const randomTemplate = availableTemplates[Math.floor(Math.random() * availableTemplates.length)];
  
  // Si le template a des variantes, choisir aléatoirement entre le template de base et ses variantes
  if (randomTemplate.variants && randomTemplate.variants.length > 0) {
    const allVersions = [randomTemplate, ...randomTemplate.variants];
    return allVersions[Math.floor(Math.random() * allVersions.length)];
  }
  
  return randomTemplate;
};

export const getRandomTemplateByCategory = (category: string): Template => {
  return getRandomTemplate(category);
};