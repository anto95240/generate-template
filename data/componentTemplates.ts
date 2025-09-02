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
        name: 'Fantôme',
        props: { text: 'Ghost', variant: 'ghost' },
        style: { padding: '12px 24px', borderRadius: '8px', border: '1px solid' },
      },
      {
        name: 'Néon',
        props: { text: 'Néon', variant: 'neon' },
        style: { padding: '12px 24px', borderRadius: '8px', boxShadow: '0 0 20px currentColor' },
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
        props: { title: 'Produit', content: 'Description du produit', hasButton: true },
        style: { padding: '20px', borderRadius: '16px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)' },
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
    ],
  },
];