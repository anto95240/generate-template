import { ComponentType } from '@/types';

// Configuration pour l'API Google AI (Gemini)
const GOOGLE_AI_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY;
const GOOGLE_AI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Alternative gratuite : utilisation d'un service mock pour le développement
const USE_MOCK_AI = !GOOGLE_AI_API_KEY;

interface AIResponse {
  componentType: ComponentType;
  props: Record<string, any>;
  style: Record<string, any>;
  components?: Array<{
    type: ComponentType;
    props: Record<string, any>;
    style: Record<string, any>;
    position: { x: number; y: number; width: number; height: number };
  }>;
}

export class AIService {
  private static tokenCount = 50;
  private static lastReset = Date.now();
  private static readonly RESET_INTERVAL = 3600000; // 1 heure

  static async generateComponent(prompt: string): Promise<AIResponse> {
    if (this.tokenCount <= 0 && !this.shouldResetTokens()) {
      throw new Error('Tokens épuisés. Attendez la réinitialisation.');
    }

    if (this.shouldResetTokens()) {
      this.resetTokens();
    }

    this.tokenCount--;

    if (USE_MOCK_AI) {
      return this.mockAIGeneration(prompt, false);
    }

    try {
      const response = await fetch(`${GOOGLE_AI_ENDPOINT}?key=${GOOGLE_AI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: this.buildPrompt(prompt, false)
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Erreur API Google AI');
      }

      const data = await response.json();
      return this.parseAIResponse(data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error('Erreur AI Service:', error);
      // Fallback vers mock en cas d'erreur
      return this.mockAIGeneration(prompt, false);
    }
  }

  static async generateFullCanvas(prompt: string): Promise<AIResponse> {
    if (this.tokenCount <= 2 && !this.shouldResetTokens()) {
      throw new Error('Tokens insuffisants pour générer un canvas complet.');
    }

    if (this.shouldResetTokens()) {
      this.resetTokens();
    }

    this.tokenCount -= 3; // Canvas complet coûte plus de tokens

    if (USE_MOCK_AI) {
      return this.mockAIGeneration(prompt, true);
    }

    try {
      const response = await fetch(`${GOOGLE_AI_ENDPOINT}?key=${GOOGLE_AI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: this.buildPrompt(prompt, true)
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error('Erreur API Google AI');
      }

      const data = await response.json();
      return this.parseAIResponse(data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error('Erreur AI Service:', error);
      return this.mockAIGeneration(prompt, true);
    }
  }

  private static buildPrompt(userPrompt: string, isFullCanvas: boolean): string {
    const basePrompt = `Tu es un expert en design UI/UX. ${isFullCanvas ? 'Génère une interface complète' : 'Génère un composant'} basé sur cette description: "${userPrompt}"

Réponds UNIQUEMENT avec un JSON valide dans ce format:
${isFullCanvas ? `
{
  "components": [
    {
      "type": "navbar|button|card|form|hero|footer|aside|etc",
      "props": { "title": "...", "text": "...", etc },
      "style": { "padding": "...", "borderRadius": "...", etc },
      "position": { "x": 0, "y": 0, "width": 800, "height": 60 }
    }
  ]
}` : `
{
  "componentType": "navbar|button|card|form|hero|footer|aside|etc",
  "props": { "title": "...", "text": "...", etc },
  "style": { "padding": "...", "borderRadius": "...", etc }
}`}

Types disponibles: button, navbar, card, input, form, table, grid, hero, footer, aside, modal, text, badge, alert, progress, tabs, accordion

Utilise des valeurs réalistes et cohérentes.`;

    return basePrompt;
  }

  private static parseAIResponse(aiText: string): AIResponse {
    try {
      // Nettoyer la réponse pour extraire le JSON
      const jsonMatch = aiText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Pas de JSON trouvé dans la réponse');
      }

      const parsed = JSON.parse(jsonMatch[0]);
      
      if (parsed.components) {
        // Canvas complet
        return {
          componentType: 'container' as ComponentType,
          props: {},
          style: {},
          components: parsed.components,
        };
      } else {
        // Composant unique
        return {
          componentType: parsed.componentType,
          props: parsed.props || {},
          style: parsed.style || {},
        };
      }
    } catch (error) {
      console.error('Erreur parsing AI:', error);
      throw new Error('Impossible de parser la réponse IA');
    }
  }

  private static mockAIGeneration(prompt: string, isFullCanvas: boolean): AIResponse {
    // Simulation basée sur des mots-clés dans le prompt
    const lowerPrompt = prompt.toLowerCase();

    if (isFullCanvas) {
      if (lowerPrompt.includes('dashboard') || lowerPrompt.includes('admin')) {
        // Générer plusieurs variantes de dashboard
        const dashboardVariants = [
          {
            components: [
              {
                type: 'aside' as ComponentType,
                props: { 
                  title: 'Admin Panel', 
                  items: ['Dashboard', 'Utilisateurs', 'Commandes', 'Produits', 'Analytics', 'Paramètres', 'Déconnexion'],
                  position: 'left' 
                },
                style: { padding: '24px', width: '280px', height: '100vh', background: 'rgba(255, 255, 255, 0.05)' },
                position: { x: 0, y: 0, width: 280, height: 600 },
              },
              {
                type: 'navbar' as ComponentType,
                props: { title: 'Admin Dashboard', items: ['Notifications', 'Profil'] },
                style: { padding: '16px 32px', backdropFilter: 'blur(20px)', marginLeft: '280px' },
                position: { x: 280, y: 0, width: 520, height: 60 },
              },
              {
                type: 'grid' as ComponentType,
                props: { 
                  columns: 4, 
                  items: ['1,234 Utilisateurs', '567 Commandes', '89,012€ CA', '45 Nouveaux'] 
                },
                style: { gap: '20px', padding: '20px', marginLeft: '280px' },
                position: { x: 300, y: 80, width: 480, height: 150 },
              },
              {
                type: 'table' as ComponentType,
                props: { 
                  headers: ['Utilisateur', 'Email', 'Rôle', 'Statut'], 
                  rows: [
                    ['John Doe', 'john@example.com', 'Admin', 'Actif'],
                    ['Jane Smith', 'jane@example.com', 'User', 'Actif'],
                  ]
                },
                style: { borderRadius: '12px', marginLeft: '280px' },
                position: { x: 300, y: 250, width: 480, height: 200 },
              },
            ]
          },
          {
            components: [
              {
                type: 'navbar' as ComponentType,
                props: { title: 'Analytics Dashboard', items: ['Export', 'Settings', 'Help'] },
                style: { padding: '16px 32px', backdropFilter: 'blur(20px)' },
                position: { x: 0, y: 0, width: 800, height: 60 },
              },
              {
                type: 'grid' as ComponentType,
                props: { 
                  columns: 3, 
                  items: ['📊 Ventes: 12,345€', '👥 Visiteurs: 8,901', '📈 Conversion: 3.2%', '⭐ Satisfaction: 4.8/5', '📦 Commandes: 234', '🚀 Croissance: +15%'] 
                },
                style: { gap: '24px', padding: '32px' },
                position: { x: 50, y: 80, width: 700, height: 200 },
              },
              {
                type: 'card' as ComponentType,
                props: { title: 'Graphique des ventes', content: 'Évolution des ventes sur les 30 derniers jours', hasButton: false },
                style: { padding: '24px', borderRadius: '16px' },
                position: { x: 50, y: 300, width: 350, height: 250 },
              },
              {
                type: 'card' as ComponentType,
                props: { title: 'Top Produits', content: 'Les produits les plus vendus ce mois', hasButton: true },
                style: { padding: '24px', borderRadius: '16px' },
                position: { x: 420, y: 300, width: 330, height: 250 },
              },
            ]
          }
        ];
        
        const randomVariant = dashboardVariants[Math.floor(Math.random() * dashboardVariants.length)];
        return {
          componentType: 'container' as ComponentType,
          props: {},
          style: {},
          components: randomVariant.components,
        };
      } else if (lowerPrompt.includes('landing') || lowerPrompt.includes('saas')) {
        return {
          componentType: 'container' as ComponentType,
          props: {},
          style: {},
          components: [
            {
              type: 'navbar' as ComponentType,
              props: { title: 'SaaS Platform', items: ['Features', 'Pricing', 'About', 'Contact', 'Login'] },
              style: { padding: '16px 32px', backdropFilter: 'blur(20px)' },
              position: { x: 0, y: 0, width: 800, height: 60 },
            },
            {
              type: 'hero' as ComponentType,
              props: { 
                title: 'Révolutionnez votre workflow', 
                subtitle: 'La plateforme SaaS qui transforme votre productivité avec des outils IA avancés', 
                buttonText: 'Essai gratuit 14 jours', 
                hasButton: true 
              },
              style: { padding: '100px 40px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(181, 55, 247, 0.1))' },
              position: { x: 0, y: 80, width: 800, height: 400 },
            },
            {
              type: 'grid' as ComponentType,
              props: { 
                columns: 3, 
                items: ['🚀 Performance', '🔒 Sécurité', '📊 Analytics', '🤖 IA Intégrée', '☁️ Cloud', '📱 Mobile'] 
              },
              style: { gap: '24px', padding: '40px' },
              position: { x: 50, y: 500, width: 700, height: 200 },
            },
            {
              type: 'footer' as ComponentType,
              props: { 
                title: 'SaaS Platform', 
                links: ['Privacy', 'Terms', 'Support', 'API', 'Status'], 
                copyright: '© 2025 SaaS Platform. All rights reserved.' 
              },
              style: { padding: '40px 32px', textAlign: 'center' },
              position: { x: 0, y: 720, width: 800, height: 120 },
            },
          ],
        };
      } else if (lowerPrompt.includes('ecommerce') || lowerPrompt.includes('shop')) {
        return {
          componentType: 'container' as ComponentType,
          props: {},
          style: {},
          components: [
            {
              type: 'navbar' as ComponentType,
              props: { title: 'ShopFuture', items: ['Produits', 'Catégories', 'Offres', 'Panier', 'Compte'] },
              style: { padding: '16px 32px', backdropFilter: 'blur(20px)' },
              position: { x: 0, y: 0, width: 800, height: 60 },
            },
            {
              type: 'aside' as ComponentType,
              props: { title: 'Filtres', items: ['Prix', 'Marque', 'Catégorie', 'Note', 'Disponibilité'], position: 'left' },
              style: { padding: '20px', width: '220px' },
              position: { x: 0, y: 60, width: 220, height: 500 },
            },
            {
              type: 'grid' as ComponentType,
              props: { 
                columns: 3, 
                items: ['Produit 1 - 299€', 'Produit 2 - 199€', 'Produit 3 - 399€', 'Produit 4 - 149€', 'Produit 5 - 249€', 'Produit 6 - 179€'] 
              },
              style: { gap: '20px', padding: '20px', marginLeft: '220px' },
              position: { x: 240, y: 80, width: 540, height: 400 },
            },
            {
              type: 'footer' as ComponentType,
              props: { title: 'ShopFuture', links: ['Support', 'Livraison', 'Retours', 'CGV'], copyright: '© 2025 ShopFuture' },
              style: { padding: '40px 32px', textAlign: 'center' },
              position: { x: 0, y: 500, width: 800, height: 120 },
            },
          ],
        };
      }
    }

    // Génération de composant unique basée sur les mots-clés
    if (lowerPrompt.includes('navbar') || lowerPrompt.includes('navigation') || lowerPrompt.includes('menu')) {
      return {
        componentType: 'navbar' as ComponentType,
        props: { 
          title: 'Navigation', 
          items: lowerPrompt.includes('admin') ? ['Dashboard', 'Users', 'Settings'] : ['Accueil', 'Services', 'Contact']
        },
        style: { 
          padding: '16px 32px', 
          backdropFilter: lowerPrompt.includes('glass') ? 'blur(20px)' : 'none',
          background: lowerPrompt.includes('glass') ? 'rgba(255, 255, 255, 0.1)' : undefined,
        },
      };
    } else if (lowerPrompt.includes('bouton') || lowerPrompt.includes('button') || lowerPrompt.includes('cta')) {
      return {
        componentType: 'button' as ComponentType,
        props: { 
          text: lowerPrompt.includes('cta') ? 'Commencer maintenant' : 'Cliquez ici',
          variant: lowerPrompt.includes('néon') || lowerPrompt.includes('neon') ? 'neon' : 
                   lowerPrompt.includes('glass') ? 'glass' : 'primary'
        },
        style: { 
          padding: '16px 32px', 
          borderRadius: '12px',
          boxShadow: lowerPrompt.includes('néon') || lowerPrompt.includes('neon') ? '0 0 20px currentColor' : undefined,
        },
      };
    } else if (lowerPrompt.includes('carte') || lowerPrompt.includes('card')) {
      return {
        componentType: 'card' as ComponentType,
        props: { 
          title: lowerPrompt.includes('produit') ? 'Produit Premium' : 'Titre de carte',
          content: lowerPrompt.includes('produit') ? 'Description du produit avec ses avantages' : 'Contenu de la carte',
          hasButton: true,
        },
        style: { 
          padding: '24px', 
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        },
      };
    } else if (lowerPrompt.includes('formulaire') || lowerPrompt.includes('form')) {
      return {
        componentType: 'form' as ComponentType,
        props: { 
          title: lowerPrompt.includes('contact') ? 'Contactez-nous' : 'Formulaire',
          fields: lowerPrompt.includes('contact') ? ['nom', 'email', 'message'] : ['nom', 'email'],
          submitText: 'Envoyer',
        },
        style: { 
          padding: '32px', 
          borderRadius: '16px',
        },
      };
    } else if (lowerPrompt.includes('footer') || lowerPrompt.includes('pied')) {
      return {
        componentType: 'footer' as ComponentType,
        props: { 
          title: 'Mon Site',
          links: ['Accueil', 'À propos', 'Contact', 'Mentions légales'],
          copyright: '© 2025 Mon Site. Tous droits réservés.',
        },
        style: { 
          padding: '40px 32px', 
          textAlign: 'center',
        },
      };
    }

    // Par défaut, retourner un bouton
    return {
      componentType: 'button' as ComponentType,
      props: { text: 'Généré par IA', variant: 'primary' },
      style: { padding: '12px 24px', borderRadius: '8px' },
    };
  }

  private static shouldResetTokens(): boolean {
    return Date.now() - this.lastReset >= this.RESET_INTERVAL;
  }

  private static resetTokens(): void {
    this.tokenCount = 50;
    this.lastReset = Date.now();
  }

  static getTokenStatus() {
    if (this.shouldResetTokens()) {
      this.resetTokens();
    }

    return {
      remaining: this.tokenCount,
      total: 50,
      resetTime: new Date(this.lastReset + this.RESET_INTERVAL),
      model: GOOGLE_AI_API_KEY ? 'Gemini Pro' : 'Mock AI (Dev)',
    };
  }
}