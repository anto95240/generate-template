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
    // Simulation améliorée basée sur des mots-clés dans le prompt
    const lowerPrompt = prompt.toLowerCase();

    if (isFullCanvas) {
      if (lowerPrompt.includes('landing') || lowerPrompt.includes('accueil')) {
        return {
          componentType: 'container' as ComponentType,
          props: {},
          style: {},
          components: [
            {
              type: 'navbar',
              props: { title: 'Mon Site', items: ['Accueil', 'Services', 'Contact'] },
              style: { padding: '16px 32px', backdropFilter: 'blur(20px)' },
              position: { x: 0, y: 0, width: 800, height: 60 },
            },
            {
              type: 'hero',
              props: { title: 'Bienvenue', subtitle: 'Découvrez notre solution', buttonText: 'Commencer', hasButton: true },
              style: { padding: '80px 40px', textAlign: 'center' },
              position: { x: 0, y: 80, width: 800, height: 400 },
            },
            {
              type: 'footer',
              props: { title: 'Mon Site', links: ['Mentions légales', 'Contact'], copyright: '© 2025' },
              style: { padding: '40px 32px', textAlign: 'center' },
              position: { x: 0, y: 500, width: 800, height: 120 },
            },
          ],
        };
      } else if (lowerPrompt.includes('dashboard') || lowerPrompt.includes('admin')) {
        return {
          componentType: 'container' as ComponentType,
          props: {},
          style: {},
          components: [
            {
              type: 'aside',
              props: { title: 'Admin', items: ['Dashboard', 'Utilisateurs', 'Analytics'], position: 'left' },
              style: { padding: '24px', width: '250px', height: '100vh' },
              position: { x: 0, y: 0, width: 250, height: 600 },
            },
            {
              type: 'table',
              props: { headers: ['Nom', 'Email', 'Statut'], rows: [['John', 'john@test.com', 'Actif']] },
              style: { borderRadius: '12px' },
              position: { x: 270, y: 20, width: 500, height: 200 },
            },
          ],
        };
      }
    }

    // Génération de composant unique basée sur les mots-clés - CORRIGÉE
    if (lowerPrompt.includes('footer') || lowerPrompt.includes('pied')) {
      return {
        componentType: 'footer',
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
    } else if (lowerPrompt.includes('navbar') || lowerPrompt.includes('navigation') || lowerPrompt.includes('menu')) {
      return {
        componentType: 'navbar',
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
        componentType: 'button',
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
        componentType: 'card',
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
        componentType: 'form',
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
    } else if (lowerPrompt.includes('tableau') || lowerPrompt.includes('table')) {
      return {
        componentType: 'table',
        props: { 
          headers: ['Nom', 'Email', 'Statut'],
          rows: [['John Doe', 'john@test.com', 'Actif'], ['Jane Smith', 'jane@test.com', 'Inactif']],
        },
        style: { 
          borderRadius: '12px',
          overflow: 'hidden',
        },
      };
    } else if (lowerPrompt.includes('hero') || lowerPrompt.includes('bannière')) {
      return {
        componentType: 'hero',
        props: { 
          title: 'Titre Principal',
          subtitle: 'Sous-titre descriptif',
          buttonText: 'Action',
          hasButton: true,
        },
        style: { 
          padding: '80px 40px',
          textAlign: 'center',
          minHeight: '400px',
        },
      };
    } else if (lowerPrompt.includes('sidebar') || lowerPrompt.includes('aside') || lowerPrompt.includes('menu latéral')) {
      return {
        componentType: 'aside',
        props: { 
          title: 'Menu',
          items: ['Dashboard', 'Profil', 'Paramètres'],
          position: 'left',
        },
        style: { 
          padding: '24px',
          width: '250px',
          height: '100vh',
        },
      };
    }

    // Par défaut, retourner un bouton
    return {
      componentType: 'button',
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