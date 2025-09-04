import { ComponentType } from '@/types';

export interface ComponentTemplate {
  type: ComponentType;
  name: string;
  icon: string;
  defaultProps: Record<string, any>;
  presets: {
    name: string;
    props: Record<string, any>;
    style: Record<string, any>;
    animations?: any[];
  }[];
}

export const componentTemplates: ComponentTemplate[] = [
  {
    type: 'button',
    name: 'Bouton',
    icon: 'MousePointer',
    defaultProps: {
      text: 'Cliquez-moi',
      variant: 'primary',
    },
    presets: [
      {
        name: 'Primaire',
        props: { text: 'Action', variant: 'primary' },
        style: { padding: '12px 24px', borderRadius: '8px' },
      },
      {
        name: 'Secondaire',
        props: { text: 'Secondaire', variant: 'secondary' },
        style: { padding: '12px 24px', borderRadius: '8px' },
      },
      {
        name: 'Fantôme',
        props: { text: 'Ghost', variant: 'ghost' },
        style: { padding: '12px 24px', borderRadius: '8px', border: '2px solid' },
      },
      {
        name: 'Néon',
        props: { text: 'Néon', variant: 'neon' },
        style: { padding: '12px 24px', borderRadius: '8px', boxShadow: '0 0 20px currentColor' },
      },
      {
        name: 'Gradient',
        props: { text: 'Gradient', variant: 'gradient' },
        style: { padding: '16px 32px', borderRadius: '50px', background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)' },
      },
      {
        name: 'Glassmorphism',
        props: { text: 'Glass', variant: 'glass' },
        style: { padding: '14px 28px', borderRadius: '12px', backdropFilter: 'blur(20px)', background: 'rgba(255, 255, 255, 0.1)' },
      },
      {
        name: 'Minimal',
        props: { text: 'Minimal', variant: 'minimal' },
        style: { padding: '10px 20px', borderRadius: '4px', border: '1px solid', background: 'transparent' },
      },
      {
        name: 'Arrondi',
        props: { text: 'Rounded', variant: 'rounded' },
        style: { padding: '12px 24px', borderRadius: '50px' },
      },
      {
        name: 'Large',
        props: { text: 'Large Button', variant: 'large' },
        style: { padding: '20px 40px', borderRadius: '12px', fontSize: '18px', fontWeight: '600' },
      },
      {
        name: 'Icône',
        props: { text: '→', variant: 'icon' },
        style: { padding: '12px', borderRadius: '50%', width: '48px', height: '48px' },
      },
      {
        name: 'Flottant',
        props: { text: '+', variant: 'floating' },
        style: { padding: '16px', borderRadius: '50%', width: '56px', height: '56px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' },
      },
      {
        name: 'Outline',
        props: { text: 'Outline', variant: 'outline' },
        style: { padding: '12px 24px', borderRadius: '8px', border: '2px solid', background: 'transparent' },
      },
    ],
  },
  {
    type: 'navbar',
    name: 'Navbar',
    icon: 'Menu',
    defaultProps: {
      title: 'Mon App',
      items: ['Accueil', 'Produits', 'Contact'],
    },
    presets: [
      {
        name: 'Moderne',
        props: { title: 'FutureUI', items: ['Home', 'Features', 'Pricing', 'Contact'] },
        style: { padding: '16px 32px', backgroundColor: 'rgba(255, 255, 255, 0.1)' },
      },
      {
        name: 'Glassmorphism',
        props: { title: 'GlassNav', items: ['Dashboard', 'Analytics', 'Settings'] },
        style: { padding: '20px 40px', backdropFilter: 'blur(20px)' },
      },
      {
        name: 'Minimal',
        props: { title: 'Brand', items: ['Home', 'About', 'Contact'] },
        style: { padding: '12px 24px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' },
      },
      {
        name: 'Centré',
        props: { title: 'CenterNav', items: ['Portfolio', 'Services', 'Blog', 'Contact'] },
        style: { padding: '20px', textAlign: 'center', flexDirection: 'column', gap: '16px' },
      },
      {
        name: 'Sidebar Style',
        props: { title: 'SideNav', items: ['Dashboard', 'Users', 'Analytics', 'Settings', 'Logout'] },
        style: { padding: '24px', flexDirection: 'column', alignItems: 'flex-start', gap: '12px' },
      },
      {
        name: 'Flottant',
        props: { title: 'Float', items: ['Home', 'Work', 'About'] },
        style: { padding: '16px 32px', borderRadius: '50px', margin: '20px', backdropFilter: 'blur(20px)' },
      },
      {
        name: 'Split',
        props: { title: 'Split', items: ['Products', 'Solutions'] },
        style: { padding: '16px 32px', justifyContent: 'space-between' },
      },
      {
        name: 'Mega Menu',
        props: { title: 'Mega', items: ['Products', 'Solutions', 'Resources', 'Company', 'Support'] },
        style: { padding: '20px 40px', fontSize: '16px' },
      },
      {
        name: 'Transparent',
        props: { title: 'TransNav', items: ['Home', 'About', 'Contact'] },
        style: { padding: '16px 32px', background: 'transparent', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' },
      },
      {
        name: 'Coloré',
        props: { title: 'ColorNav', items: ['Home', 'Shop', 'Blog'] },
        style: { padding: '16px 32px', background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)' },
      },
    ],
  },
  {
    type: 'card',
    name: 'Carte',
    icon: 'Square',
    defaultProps: {
      title: 'Titre de la carte',
      content: 'Contenu de la carte...',
      hasButton: true,
    },
    presets: [
      {
        name: 'Simple',
        props: { title: 'Carte Simple', content: 'Description...', hasButton: false },
        style: { padding: '24px', borderRadius: '12px' },
      },
      {
        name: 'Produit',
        props: { title: 'Produit Premium', content: 'Description du produit avec ses avantages', hasButton: true },
        style: { padding: '20px', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' },
      },
      {
        name: 'Pricing',
        props: { title: 'Plan Pro', content: '29€/mois\nToutes les fonctionnalités', hasButton: true },
        style: { padding: '32px', borderRadius: '20px', textAlign: 'center', border: '2px solid' },
      },
      {
        name: 'Feature',
        props: { title: 'Fonctionnalité', content: 'Description de la fonctionnalité', hasButton: false },
        style: { padding: '24px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)' },
      },
      {
        name: 'Testimonial',
        props: { title: 'John Doe', content: '"Excellent service, je recommande vivement!"', hasButton: false },
        style: { padding: '28px', borderRadius: '16px', fontStyle: 'italic' },
      },
      {
        name: 'Stats',
        props: { title: '1,234', content: 'Utilisateurs actifs', hasButton: false },
        style: { padding: '24px', borderRadius: '12px', textAlign: 'center', fontSize: '24px', fontWeight: 'bold' },
      },
      {
        name: 'Blog Post',
        props: { title: 'Article de blog', content: 'Résumé de l\'article...', hasButton: true },
        style: { padding: '24px', borderRadius: '12px', maxWidth: '400px' },
      },
      {
        name: 'Profil',
        props: { title: 'Profil Utilisateur', content: 'Développeur Full-Stack', hasButton: true },
        style: { padding: '24px', borderRadius: '16px', textAlign: 'center' },
      },
      {
        name: 'Hover Effect',
        props: { title: 'Carte Interactive', content: 'Survolez pour voir l\'effet', hasButton: true },
        style: { padding: '24px', borderRadius: '16px', transform: 'scale(1)', transition: 'all 0.3s ease' },
      },
      {
        name: 'Image Card',
        props: { title: 'Avec Image', content: 'Carte avec image d\'en-tête', hasButton: true },
        style: { padding: '0 0 24px 0', borderRadius: '16px', overflow: 'hidden' },
      },
    ],
  },
  {
    type: 'input',
    name: 'Champ de saisie',
    icon: 'Type',
    defaultProps: {
      placeholder: 'Entrez votre texte...',
      type: 'text',
      label: 'Label',
    },
    presets: [
      {
        name: 'Standard',
        props: { placeholder: 'Votre nom...', type: 'text', label: 'Nom' },
        style: { padding: '12px 16px', borderRadius: '8px' },
      },
      {
        name: 'Futuriste',
        props: { placeholder: 'Saisissez...', type: 'text', label: 'Input' },
        style: { padding: '16px 20px', borderRadius: '12px', border: '2px solid', boxShadow: '0 0 10px rgba(0, 212, 255, 0.3)' },
      },
      {
        name: 'Minimal',
        props: { placeholder: 'Texte...', type: 'text', label: '' },
        style: { padding: '12px 0', borderRadius: '0', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderBottom: '2px solid' },
      },
      {
        name: 'Arrondi',
        props: { placeholder: 'Rechercher...', type: 'search', label: 'Recherche' },
        style: { padding: '14px 20px', borderRadius: '50px' },
      },
      {
        name: 'Large',
        props: { placeholder: 'Message...', type: 'text', label: 'Message' },
        style: { padding: '20px 24px', borderRadius: '12px', fontSize: '18px' },
      },
      {
        name: 'Floating Label',
        props: { placeholder: '', type: 'email', label: 'Email' },
        style: { padding: '20px 16px 8px', borderRadius: '8px', position: 'relative' },
      },
      {
        name: 'Avec Icône',
        props: { placeholder: 'Rechercher...', type: 'search', label: '', icon: 'search' },
        style: { padding: '12px 16px 12px 48px', borderRadius: '8px' },
      },
      {
        name: 'Mot de passe',
        props: { placeholder: 'Mot de passe...', type: 'password', label: 'Mot de passe' },
        style: { padding: '12px 16px', borderRadius: '8px' },
      },
      {
        name: 'Néon',
        props: { placeholder: 'Texte néon...', type: 'text', label: 'Néon' },
        style: { padding: '14px 18px', borderRadius: '8px', border: '2px solid', boxShadow: '0 0 15px currentColor' },
      },
      {
        name: 'Glass',
        props: { placeholder: 'Glass input...', type: 'text', label: 'Glass' },
        style: { padding: '14px 18px', borderRadius: '12px', backdropFilter: 'blur(20px)', background: 'rgba(255, 255, 255, 0.1)' },
      },
    ],
  },
  {
    type: 'form',
    name: 'Formulaire',
    icon: 'FileText',
    defaultProps: {
      title: 'Formulaire de contact',
      fields: ['nom', 'email', 'message'],
      submitText: 'Envoyer',
    },
    presets: [
      {
        name: 'Contact',
        props: { title: 'Contactez-nous', fields: ['nom', 'email', 'sujet', 'message'], submitText: 'Envoyer' },
        style: { padding: '32px', borderRadius: '16px' },
      },
      {
        name: 'Connexion',
        props: { title: 'Connexion', fields: ['email', 'password'], submitText: 'Se connecter' },
        style: { padding: '40px', borderRadius: '20px', maxWidth: '400px' },
      },
      {
        name: 'Inscription',
        props: { title: 'Créer un compte', fields: ['nom', 'prenom', 'email', 'password'], submitText: 'S\'inscrire' },
        style: { padding: '32px', borderRadius: '16px', maxWidth: '500px' },
      },
      {
        name: 'Newsletter',
        props: { title: 'Newsletter', fields: ['email'], submitText: 'S\'abonner' },
        style: { padding: '24px', borderRadius: '12px', textAlign: 'center' },
      },
      {
        name: 'Feedback',
        props: { title: 'Votre avis', fields: ['nom', 'note', 'commentaire'], submitText: 'Envoyer' },
        style: { padding: '28px', borderRadius: '16px' },
      },
      {
        name: 'Support',
        props: { title: 'Support technique', fields: ['email', 'sujet', 'priorite', 'description'], submitText: 'Créer un ticket' },
        style: { padding: '32px', borderRadius: '16px', maxWidth: '600px' },
      },
      {
        name: 'Recherche',
        props: { title: 'Recherche avancée', fields: ['mots-cles', 'categorie', 'date'], submitText: 'Rechercher' },
        style: { padding: '24px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)' },
      },
      {
        name: 'Commande',
        props: { title: 'Passer commande', fields: ['nom', 'email', 'adresse', 'telephone'], submitText: 'Commander' },
        style: { padding: '32px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.2)' },
      },
      {
        name: 'Réservation',
        props: { title: 'Réserver', fields: ['nom', 'email', 'date', 'heure', 'personnes'], submitText: 'Réserver' },
        style: { padding: '28px', borderRadius: '16px' },
      },
      {
        name: 'Candidature',
        props: { title: 'Postuler', fields: ['nom', 'email', 'poste', 'experience', 'motivation'], submitText: 'Postuler' },
        style: { padding: '32px', borderRadius: '16px', maxWidth: '600px' },
      },
    ],
  },
  {
    type: 'table',
    name: 'Tableau',
    icon: 'Table',
    defaultProps: {
      headers: ['Nom', 'Email', 'Statut'],
      rows: [
        ['John Doe', 'john@example.com', 'Actif'],
        ['Jane Smith', 'jane@example.com', 'Inactif'],
      ],
    },
    presets: [
      {
        name: 'Utilisateurs',
        props: { 
          headers: ['Nom', 'Email', 'Rôle', 'Statut'], 
          rows: [
            ['Admin User', 'admin@app.com', 'Administrateur', 'Actif'],
            ['Regular User', 'user@app.com', 'Utilisateur', 'Actif'],
          ]
        },
        style: { borderRadius: '12px', overflow: 'hidden' },
      },
      {
        name: 'Produits',
        props: { 
          headers: ['Produit', 'Prix', 'Stock', 'Catégorie'], 
          rows: [
            ['MacBook Pro', '2499€', '12', 'Ordinateurs'],
            ['iPhone 15', '999€', '25', 'Téléphones'],
          ]
        },
        style: { borderRadius: '12px', overflow: 'hidden' },
      },
      {
        name: 'Analytics',
        props: { 
          headers: ['Métrique', 'Valeur', 'Évolution'], 
          rows: [
            ['Visiteurs', '12,345', '+15%'],
            ['Conversions', '234', '+8%'],
          ]
        },
        style: { borderRadius: '12px', overflow: 'hidden' },
      },
      {
        name: 'Commandes',
        props: { 
          headers: ['ID', 'Client', 'Montant', 'Date', 'Statut'], 
          rows: [
            ['#001', 'John Doe', '299€', '15/01/2025', 'Livré'],
            ['#002', 'Jane Smith', '149€', '14/01/2025', 'En cours'],
          ]
        },
        style: { borderRadius: '12px', overflow: 'hidden' },
      },
      {
        name: 'Équipe',
        props: { 
          headers: ['Nom', 'Poste', 'Département', 'Localisation'], 
          rows: [
            ['Alice Martin', 'Designer', 'UX/UI', 'Paris'],
            ['Bob Wilson', 'Développeur', 'Frontend', 'Lyon'],
          ]
        },
        style: { borderRadius: '12px', overflow: 'hidden' },
      },
      {
        name: 'Finances',
        props: { 
          headers: ['Mois', 'Revenus', 'Dépenses', 'Bénéfice'], 
          rows: [
            ['Janvier', '15,000€', '8,000€', '7,000€'],
            ['Février', '18,000€', '9,500€', '8,500€'],
          ]
        },
        style: { borderRadius: '12px', overflow: 'hidden' },
      },
      {
        name: 'Inventaire',
        props: { 
          headers: ['Article', 'Référence', 'Quantité', 'Emplacement'], 
          rows: [
            ['Ordinateur', 'ORD-001', '15', 'A1-B2'],
            ['Souris', 'SOU-001', '50', 'A2-C1'],
          ]
        },
        style: { borderRadius: '12px', overflow: 'hidden' },
      },
      {
        name: 'Événements',
        props: { 
          headers: ['Événement', 'Date', 'Lieu', 'Participants'], 
          rows: [
            ['Conférence Tech', '25/01/2025', 'Paris', '150'],
            ['Workshop Design', '30/01/2025', 'Lyon', '30'],
          ]
        },
        style: { borderRadius: '12px', overflow: 'hidden' },
      },
      {
        name: 'Striped',
        props: { 
          headers: ['Nom', 'Email', 'Statut'], 
          rows: [
            ['User 1', 'user1@test.com', 'Actif'],
            ['User 2', 'user2@test.com', 'Inactif'],
          ]
        },
        style: { borderRadius: '12px', overflow: 'hidden', background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)' },
      },
      {
        name: 'Compact',
        props: { 
          headers: ['ID', 'Nom', 'Statut'], 
          rows: [
            ['001', 'Item 1', 'OK'],
            ['002', 'Item 2', 'KO'],
          ]
        },
        style: { borderRadius: '8px', overflow: 'hidden', fontSize: '14px' },
      },
    ],
  },
  {
    type: 'grid',
    name: 'Grille',
    icon: 'Grid3X3',
    defaultProps: {
      columns: 3,
      items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
    },
    presets: [
      {
        name: 'Galerie',
        props: { columns: 3, items: ['Photo 1', 'Photo 2', 'Photo 3', 'Photo 4'] },
        style: { gap: '16px', padding: '20px' },
      },
      {
        name: 'Services',
        props: { columns: 2, items: ['Design', 'Développement', 'Marketing', 'Support'] },
        style: { gap: '24px', padding: '32px' },
      },
      {
        name: 'Features',
        props: { columns: 4, items: ['Rapide', 'Sécurisé', 'Moderne', 'Responsive'] },
        style: { gap: '20px', padding: '24px' },
      },
      {
        name: 'Portfolio',
        props: { columns: 3, items: ['Projet 1', 'Projet 2', 'Projet 3', 'Projet 4', 'Projet 5', 'Projet 6'] },
        style: { gap: '16px', padding: '20px' },
      },
      {
        name: 'Testimonials',
        props: { columns: 2, items: ['"Excellent service"', '"Très professionnel"', '"Je recommande"', '"Top qualité"'] },
        style: { gap: '24px', padding: '32px' },
      },
      {
        name: 'Équipe',
        props: { columns: 4, items: ['Alice Martin', 'Bob Wilson', 'Claire Dubois', 'David Chen'] },
        style: { gap: '20px', padding: '24px' },
      },
      {
        name: 'Statistiques',
        props: { columns: 3, items: ['1,234 Users', '5,678 Orders', '9,012 Revenue'] },
        style: { gap: '24px', padding: '32px', textAlign: 'center' },
      },
      {
        name: 'Masonry',
        props: { columns: 3, items: ['Card 1', 'Card 2 with more content', 'Card 3', 'Card 4 with even more content here'] },
        style: { gap: '16px', padding: '20px' },
      },
      {
        name: 'Compact',
        props: { columns: 5, items: ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5'] },
        style: { gap: '12px', padding: '16px' },
      },
      {
        name: 'Large Cards',
        props: { columns: 2, items: ['Feature 1', 'Feature 2'] },
        style: { gap: '32px', padding: '40px' },
      },
    ],
  },
  {
    type: 'aside',
    name: 'Aside',
    icon: 'SidebarOpen',
    defaultProps: {
      title: 'Menu latéral',
      items: ['Dashboard', 'Profil', 'Paramètres'],
      position: 'left',
    },
    presets: [
      {
        name: 'Navigation',
        props: { title: 'Navigation', items: ['Accueil', 'Produits', 'Services', 'Contact'], position: 'left' },
        style: { padding: '24px', width: '250px', height: '100vh' },
      },
      {
        name: 'Admin Panel',
        props: { title: 'Admin', items: ['Dashboard', 'Utilisateurs', 'Commandes', 'Analytics', 'Paramètres'], position: 'left' },
        style: { padding: '20px', width: '280px', height: '100vh' },
      },
      {
        name: 'Filtres',
        props: { title: 'Filtres', items: ['Prix', 'Catégorie', 'Marque', 'Note'], position: 'left' },
        style: { padding: '20px', width: '220px' },
      },
      {
        name: 'Table des matières',
        props: { title: 'Sommaire', items: ['Introduction', 'Chapitre 1', 'Chapitre 2', 'Conclusion'], position: 'right' },
        style: { padding: '24px', width: '200px' },
      },
      {
        name: 'Réseaux sociaux',
        props: { title: 'Suivez-nous', items: ['Twitter', 'LinkedIn', 'GitHub', 'Discord'], position: 'right' },
        style: { padding: '20px', width: '180px' },
      },
      {
        name: 'E-commerce',
        props: { title: 'Catégories', items: ['Électronique', 'Vêtements', 'Maison', 'Sport'], position: 'left' },
        style: { padding: '24px', width: '240px' },
      },
      {
        name: 'Blog',
        props: { title: 'Articles récents', items: ['Article 1', 'Article 2', 'Article 3'], position: 'right' },
        style: { padding: '20px', width: '260px' },
      },
      {
        name: 'Minimal',
        props: { title: '', items: ['Home', 'About', 'Contact'], position: 'left' },
        style: { padding: '16px', width: '200px', background: 'transparent' },
      },
      {
        name: 'Collapsible',
        props: { title: 'Menu', items: ['Section 1', 'Section 2', 'Section 3'], position: 'left' },
        style: { padding: '20px', width: '250px', transition: 'width 0.3s ease' },
      },
      {
        name: 'Mobile',
        props: { title: 'Menu', items: ['Home', 'Profile', 'Settings'], position: 'left' },
        style: { padding: '16px', width: '100%', height: 'auto' },
      },
    ],
  },
  {
    type: 'hero',
    name: 'Hero Section',
    icon: 'Zap',
    defaultProps: {
      title: 'Titre Principal',
      subtitle: 'Sous-titre descriptif',
      buttonText: 'Commencer',
      hasButton: true,
    },
    presets: [
      {
        name: 'Landing Page',
        props: { title: 'Bienvenue sur notre plateforme', subtitle: 'La solution moderne pour vos besoins', buttonText: 'Découvrir', hasButton: true },
        style: { padding: '80px 40px', textAlign: 'center', minHeight: '500px' },
      },
      {
        name: 'App Hero',
        props: { title: 'Votre App', subtitle: 'Simplifiez votre workflow', buttonText: 'Essayer gratuitement', hasButton: true },
        style: { padding: '60px 32px', textAlign: 'center' },
      },
      {
        name: 'Product Hero',
        props: { title: 'Nouveau Produit', subtitle: 'Innovation et performance', buttonText: 'Acheter maintenant', hasButton: true },
        style: { padding: '100px 40px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4))' },
      },
      {
        name: 'Minimal Hero',
        props: { title: 'Simple. Efficace.', subtitle: 'Moins c\'est plus', buttonText: 'En savoir plus', hasButton: true },
        style: { padding: '120px 40px', textAlign: 'center', fontSize: '48px' },
      },
      {
        name: 'Split Hero',
        props: { title: 'Innovation', subtitle: 'Créez l\'avenir', buttonText: 'Rejoindre', hasButton: true },
        style: { padding: '80px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
      },
      {
        name: 'Video Hero',
        props: { title: 'Découvrez notre solution', subtitle: 'Regardez la démo', buttonText: 'Voir la vidéo', hasButton: true },
        style: { padding: '100px 40px', textAlign: 'center', background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))' },
      },
      {
        name: 'CTA Hero',
        props: { title: 'Prêt à commencer ?', subtitle: 'Rejoignez des milliers d\'utilisateurs satisfaits', buttonText: 'Commencer gratuitement', hasButton: true },
        style: { padding: '60px 40px', textAlign: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
      },
      {
        name: 'Feature Hero',
        props: { title: 'Fonctionnalités avancées', subtitle: 'Tout ce dont vous avez besoin', buttonText: 'Explorer', hasButton: true },
        style: { padding: '80px 40px', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
      },
      {
        name: 'Startup Hero',
        props: { title: 'Révolutionnez votre business', subtitle: 'La startup qui change tout', buttonText: 'Rejoindre la révolution', hasButton: true },
        style: { padding: '100px 40px', textAlign: 'center', background: 'radial-gradient(circle, rgba(255,0,150,0.1) 0%, rgba(0,255,255,0.1) 100%)' },
      },
      {
        name: 'E-commerce Hero',
        props: { title: 'Nouvelle Collection', subtitle: 'Découvrez nos dernières créations', buttonText: 'Voir la collection', hasButton: true },
        style: { padding: '80px 40px', textAlign: 'center', background: 'linear-gradient(45deg, rgba(255,107,107,0.2), rgba(78,205,196,0.2))' },
      },
    ],
  },
  {
    type: 'footer',
    name: 'Footer',
    icon: 'Minus',
    defaultProps: {
      title: 'Mon Site',
      links: ['Accueil', 'À propos', 'Contact', 'Mentions légales'],
      copyright: '© 2025 Mon Site. Tous droits réservés.',
    },
    presets: [
      {
        name: 'Simple',
        props: { title: 'Brand', links: ['Home', 'About', 'Contact'], copyright: '© 2025 Brand. All rights reserved.' },
        style: { padding: '40px 32px', textAlign: 'center' },
      },
      {
        name: 'Multi-colonnes',
        props: { title: 'Company', links: ['Products', 'Services', 'Support', 'Blog', 'Careers'], copyright: '© 2025 Company Inc.' },
        style: { padding: '60px 40px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '40px' },
      },
      {
        name: 'Social',
        props: { title: 'Connect', links: ['Twitter', 'LinkedIn', 'GitHub', 'Discord'], copyright: '© 2025 Social Brand' },
        style: { padding: '32px', textAlign: 'center', borderTop: '1px solid rgba(255, 255, 255, 0.1)' },
      },
      {
        name: 'Newsletter',
        props: { title: 'Stay Updated', links: ['Privacy', 'Terms', 'Cookies'], copyright: '© 2025 Newsletter Co.' },
        style: { padding: '48px 32px', textAlign: 'center' },
      },
      {
        name: 'Minimal',
        props: { title: '', links: ['Privacy', 'Terms'], copyright: '© 2025' },
        style: { padding: '20px 32px', textAlign: 'center', fontSize: '14px' },
      },
      {
        name: 'Corporate',
        props: { title: 'Enterprise Corp', links: ['Solutions', 'Industries', 'Resources', 'Support', 'Partners'], copyright: '© 2025 Enterprise Corp. All rights reserved.' },
        style: { padding: '60px 40px', background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 100%)' },
      },
      {
        name: 'Creative',
        props: { title: 'Creative Studio', links: ['Work', 'Services', 'About', 'Contact'], copyright: '© 2025 Creative Studio' },
        style: { padding: '50px 40px', textAlign: 'center', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)' },
      },
      {
        name: 'E-commerce',
        props: { title: 'Shop', links: ['Produits', 'Livraison', 'Retours', 'Support'], copyright: '© 2025 Shop. Tous droits réservés.' },
        style: { padding: '40px 32px', borderTop: '2px solid rgba(255, 255, 255, 0.1)' },
      },
      {
        name: 'Blog',
        props: { title: 'Mon Blog', links: ['Articles', 'Catégories', 'Archives', 'RSS'], copyright: '© 2025 Mon Blog' },
        style: { padding: '40px 32px', textAlign: 'center' },
      },
      {
        name: 'App Footer',
        props: { title: 'MyApp', links: ['Features', 'Pricing', 'Support'], copyright: '© 2025 MyApp Inc.' },
        style: { padding: '32px', textAlign: 'center', background: 'rgba(255, 255, 255, 0.02)' },
      },
    ],
  },
  {
    type: 'modal',
    name: 'Modal',
    icon: 'Square',
    defaultProps: {
      title: 'Titre du modal',
      content: 'Contenu du modal...',
      hasCloseButton: true,
      hasActions: true,
    },
    presets: [
      {
        name: 'Confirmation',
        props: { title: 'Confirmer l\'action', content: 'Êtes-vous sûr de vouloir continuer ?', hasCloseButton: true, hasActions: true },
        style: { padding: '32px', borderRadius: '16px', maxWidth: '400px' },
      },
      {
        name: 'Information',
        props: { title: 'Information', content: 'Voici une information importante.', hasCloseButton: true, hasActions: false },
        style: { padding: '28px', borderRadius: '12px', maxWidth: '500px' },
      },
      {
        name: 'Formulaire',
        props: { title: 'Nouveau', content: 'Formulaire dans modal', hasCloseButton: true, hasActions: true },
        style: { padding: '32px', borderRadius: '16px', maxWidth: '600px' },
      },
      {
        name: 'Image',
        props: { title: '', content: 'Image en grand format', hasCloseButton: true, hasActions: false },
        style: { padding: '0', borderRadius: '12px', maxWidth: '80vw', maxHeight: '80vh' },
      },
      {
        name: 'Alerte',
        props: { title: 'Attention !', content: 'Cette action est irréversible.', hasCloseButton: true, hasActions: true },
        style: { padding: '32px', borderRadius: '16px', maxWidth: '450px', border: '2px solid #ff4757' },
      },
      {
        name: 'Succès',
        props: { title: 'Succès !', content: 'Opération réalisée avec succès.', hasCloseButton: true, hasActions: false },
        style: { padding: '32px', borderRadius: '16px', maxWidth: '400px', border: '2px solid #2ed573' },
      },
      {
        name: 'Loading',
        props: { title: 'Chargement...', content: 'Veuillez patienter', hasCloseButton: false, hasActions: false },
        style: { padding: '40px', borderRadius: '16px', maxWidth: '300px', textAlign: 'center' },
      },
      {
        name: 'Settings',
        props: { title: 'Paramètres', content: 'Configurez vos préférences', hasCloseButton: true, hasActions: true },
        style: { padding: '32px', borderRadius: '16px', maxWidth: '600px' },
      },
    ],
  },
  {
    type: 'text',
    name: 'Texte',
    icon: 'Type',
    defaultProps: {
      content: 'Texte d\'exemple',
      size: 'base',
      weight: 'normal',
    },
    presets: [
      {
        name: 'Titre H1',
        props: { content: 'Titre Principal', size: '3xl', weight: 'bold' },
        style: { fontSize: '48px', fontWeight: '700', lineHeight: '1.2' },
      },
      {
        name: 'Titre H2',
        props: { content: 'Sous-titre', size: '2xl', weight: 'semibold' },
        style: { fontSize: '32px', fontWeight: '600', lineHeight: '1.3' },
      },
      {
        name: 'Paragraphe',
        props: { content: 'Ceci est un paragraphe de texte normal.', size: 'base', weight: 'normal' },
        style: { fontSize: '16px', lineHeight: '1.6' },
      },
      {
        name: 'Citation',
        props: { content: '"Une citation inspirante"', size: 'lg', weight: 'medium' },
        style: { fontSize: '20px', fontStyle: 'italic', borderLeft: '4px solid', paddingLeft: '16px' },
      },
      {
        name: 'Code',
        props: { content: 'const hello = "world";', size: 'sm', weight: 'normal' },
        style: { fontSize: '14px', fontFamily: 'JetBrains Mono, monospace', background: 'rgba(255, 255, 255, 0.1)', padding: '8px 12px', borderRadius: '6px' },
      },
      {
        name: 'Label',
        props: { content: 'NOUVEAU', size: 'xs', weight: 'bold' },
        style: { fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' },
      },
      {
        name: 'Lead',
        props: { content: 'Texte d\'introduction important', size: 'lg', weight: 'medium' },
        style: { fontSize: '20px', fontWeight: '500', lineHeight: '1.5', opacity: '0.9' },
      },
      {
        name: 'Caption',
        props: { content: 'Légende ou description', size: 'sm', weight: 'normal' },
        style: { fontSize: '14px', opacity: '0.7', fontStyle: 'italic' },
      },
      {
        name: 'Highlight',
        props: { content: 'Texte mis en évidence', size: 'base', weight: 'semibold' },
        style: { fontSize: '16px', fontWeight: '600', background: 'linear-gradient(120deg, rgba(255,255,0,0.3) 0%, rgba(255,255,0,0.1) 100%)', padding: '2px 8px', borderRadius: '4px' },
      },
      {
        name: 'Gradient Text',
        props: { content: 'Texte dégradé', size: 'xl', weight: 'bold' },
        style: { fontSize: '24px', fontWeight: '700', background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
      },
    ],
  },
  {
    type: 'badge',
    name: 'Badge',
    icon: 'Tag',
    defaultProps: {
      text: 'Badge',
      variant: 'primary',
    },
    presets: [
      {
        name: 'Statut',
        props: { text: 'Actif', variant: 'success' },
        style: { padding: '4px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: '500' },
      },
      {
        name: 'Nouveau',
        props: { text: 'NOUVEAU', variant: 'accent' },
        style: { padding: '6px 16px', borderRadius: '6px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' },
      },
      {
        name: 'Compteur',
        props: { text: '99+', variant: 'error' },
        style: { padding: '2px 8px', borderRadius: '50%', fontSize: '10px', fontWeight: '600', minWidth: '20px' },
      },
      {
        name: 'Catégorie',
        props: { text: 'Tech', variant: 'secondary' },
        style: { padding: '8px 16px', borderRadius: '8px', fontSize: '14px' },
      },
      {
        name: 'Version',
        props: { text: 'v2.1.0', variant: 'info' },
        style: { padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontFamily: 'monospace' },
      },
      {
        name: 'Trending',
        props: { text: '🔥 Trending', variant: 'warning' },
        style: { padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' },
      },
      {
        name: 'Premium',
        props: { text: '⭐ Premium', variant: 'gradient' },
        style: { padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', background: 'linear-gradient(45deg, #FFD700, #FFA500)' },
      },
      {
        name: 'Notification',
        props: { text: '3', variant: 'error' },
        style: { padding: '4px 8px', borderRadius: '50%', fontSize: '10px', fontWeight: '700', minWidth: '18px', height: '18px' },
      },
    ],
  },
  {
    type: 'alert',
    name: 'Alerte',
    icon: 'AlertTriangle',
    defaultProps: {
      title: 'Attention',
      message: 'Ceci est un message d\'alerte',
      type: 'warning',
      dismissible: true,
    },
    presets: [
      {
        name: 'Succès',
        props: { title: 'Succès', message: 'Opération réussie !', type: 'success', dismissible: true },
        style: { padding: '16px 20px', borderRadius: '8px', border: '1px solid' },
      },
      {
        name: 'Erreur',
        props: { title: 'Erreur', message: 'Une erreur s\'est produite', type: 'error', dismissible: true },
        style: { padding: '16px 20px', borderRadius: '8px', border: '1px solid' },
      },
      {
        name: 'Information',
        props: { title: 'Information', message: 'Nouvelle mise à jour disponible', type: 'info', dismissible: false },
        style: { padding: '16px 20px', borderRadius: '8px', border: '1px solid' },
      },
      {
        name: 'Attention',
        props: { title: 'Attention', message: 'Action irréversible', type: 'warning', dismissible: true },
        style: { padding: '16px 20px', borderRadius: '8px', border: '1px solid' },
      },
      {
        name: 'Bannière',
        props: { title: 'Promotion', message: 'Offre spéciale limitée !', type: 'info', dismissible: true },
        style: { padding: '12px 20px', borderRadius: '0', textAlign: 'center', fontSize: '14px' },
      },
      {
        name: 'Toast',
        props: { title: 'Notification', message: 'Message envoyé', type: 'success', dismissible: true },
        style: { padding: '12px 16px', borderRadius: '8px', minWidth: '300px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' },
      },
      {
        name: 'Inline',
        props: { title: '', message: 'Champ requis', type: 'error', dismissible: false },
        style: { padding: '8px 12px', borderRadius: '4px', fontSize: '12px', display: 'inline-block' },
      },
      {
        name: 'Card Alert',
        props: { title: 'Mise à jour', message: 'Une nouvelle version est disponible', type: 'info', dismissible: true },
        style: { padding: '20px 24px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)' },
      },
    ],
  },
  {
    type: 'progress',
    name: 'Barre de progression',
    icon: 'BarChart3',
    defaultProps: {
      value: 65,
      max: 100,
      label: 'Progression',
      showPercentage: true,
    },
    presets: [
      {
        name: 'Simple',
        props: { value: 75, max: 100, label: 'Chargement', showPercentage: true },
        style: { height: '8px', borderRadius: '4px', width: '100%' },
      },
      {
        name: 'Épaisse',
        props: { value: 45, max: 100, label: 'Progression', showPercentage: true },
        style: { height: '16px', borderRadius: '8px', width: '100%' },
      },
      {
        name: 'Circulaire',
        props: { value: 80, max: 100, label: 'Complétion', showPercentage: true },
        style: { width: '80px', height: '80px', borderRadius: '50%' },
      },
      {
        name: 'Étapes',
        props: { value: 3, max: 5, label: 'Étapes', showPercentage: false },
        style: { height: '12px', borderRadius: '6px', width: '100%' },
      },
      {
        name: 'Gradient',
        props: { value: 60, max: 100, label: 'Progression', showPercentage: true },
        style: { height: '10px', borderRadius: '5px', width: '100%', background: 'linear-gradient(90deg, #FF6B6B, #4ECDC4)' },
      },
      {
        name: 'Striped',
        props: { value: 70, max: 100, label: 'Upload', showPercentage: true },
        style: { height: '12px', borderRadius: '6px', width: '100%', backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)' },
      },
      {
        name: 'Animated',
        props: { value: 85, max: 100, label: 'Processing', showPercentage: true },
        style: { height: '8px', borderRadius: '4px', width: '100%', animation: 'pulse 2s infinite' },
      },
      {
        name: 'Multi-color',
        props: { value: 90, max: 100, label: 'Score', showPercentage: true },
        style: { height: '14px', borderRadius: '7px', width: '100%', background: 'linear-gradient(90deg, #ff4757 0%, #ffa502 25%, #2ed573 50%, #1e90ff 75%, #8e44ad 100%)' },
      },
    ],
  },
  {
    type: 'tabs',
    name: 'Onglets',
    icon: 'Tabs',
    defaultProps: {
      tabs: ['Onglet 1', 'Onglet 2', 'Onglet 3'],
      activeTab: 0,
    },
    presets: [
      {
        name: 'Horizontal',
        props: { tabs: ['Aperçu', 'Détails', 'Avis'], activeTab: 0 },
        style: { borderBottom: '1px solid rgba(255, 255, 255, 0.1)' },
      },
      {
        name: 'Pills',
        props: { tabs: ['Tous', 'Actifs', 'Archivés'], activeTab: 0 },
        style: { padding: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px' },
      },
      {
        name: 'Vertical',
        props: { tabs: ['Dashboard', 'Analytics', 'Settings'], activeTab: 0 },
        style: { flexDirection: 'column', width: '200px' },
      },
      {
        name: 'Minimal',
        props: { tabs: ['Code', 'Preview', 'Console'], activeTab: 0 },
        style: { borderBottom: '2px solid transparent' },
      },
      {
        name: 'Coloré',
        props: { tabs: ['Design', 'Code', 'Test'], activeTab: 0 },
        style: { background: 'linear-gradient(90deg, rgba(255,107,107,0.1), rgba(78,205,196,0.1))', borderRadius: '12px', padding: '4px' },
      },
      {
        name: 'Underline',
        props: { tabs: ['Home', 'Products', 'About'], activeTab: 0 },
        style: { borderBottom: '1px solid rgba(255, 255, 255, 0.2)' },
      },
      {
        name: 'Boxed',
        props: { tabs: ['Tab 1', 'Tab 2', 'Tab 3'], activeTab: 0 },
        style: { gap: '8px' },
      },
      {
        name: 'Rounded',
        props: { tabs: ['Option A', 'Option B', 'Option C'], activeTab: 0 },
        style: { background: 'rgba(0, 0, 0, 0.3)', borderRadius: '25px', padding: '6px' },
      },
    ],
  },
  {
    type: 'accordion',
    name: 'Accordéon',
    icon: 'ChevronDown',
    defaultProps: {
      items: [
        { title: 'Question 1', content: 'Réponse 1' },
        { title: 'Question 2', content: 'Réponse 2' },
      ],
    },
    presets: [
      {
        name: 'FAQ',
        props: { 
          items: [
            { title: 'Comment ça marche ?', content: 'Explication détaillée du fonctionnement...' },
            { title: 'Quels sont les tarifs ?', content: 'Nos tarifs commencent à partir de...' },
            { title: 'Comment contacter le support ?', content: 'Vous pouvez nous contacter via...' },
          ]
        },
        style: { borderRadius: '12px', overflow: 'hidden' },
      },
      {
        name: 'Documentation',
        props: { 
          items: [
            { title: 'Installation', content: 'Guide d\'installation étape par étape...' },
            { title: 'Configuration', content: 'Paramètres de configuration disponibles...' },
            { title: 'API Reference', content: 'Documentation complète de l\'API...' },
          ]
        },
        style: { borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)' },
      },
      {
        name: 'Features',
        props: { 
          items: [
            { title: 'Fonctionnalité 1', content: 'Description de la première fonctionnalité...' },
            { title: 'Fonctionnalité 2', content: 'Description de la deuxième fonctionnalité...' },
          ]
        },
        style: { borderRadius: '12px', gap: '8px' },
      },
      {
        name: 'Pricing FAQ',
        props: { 
          items: [
            { title: 'Puis-je changer de plan ?', content: 'Oui, vous pouvez changer à tout moment...' },
            { title: 'Y a-t-il une période d\'essai ?', content: 'Nous offrons 14 jours d\'essai gratuit...' },
          ]
        },
        style: { borderRadius: '12px', background: 'rgba(255, 255, 255, 0.02)' },
      },
      {
        name: 'Help Center',
        props: { 
          items: [
            { title: 'Premiers pas', content: 'Guide pour débuter avec notre plateforme...' },
            { title: 'Résolution de problèmes', content: 'Solutions aux problèmes courants...' },
          ]
        },
        style: { borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.15)' },
      },
    ],
  },
];