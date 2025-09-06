import { ComponentType } from '@/types';
import { componentVariants, ComponentVariant } from '@/data/componentVariants';

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
  private static getStorageKey(key: string): string {
    return `futureui_${key}_${window.location.hostname}`;
  }

  private static getTokenCount(): number {
    const stored = localStorage.getItem(this.getStorageKey('tokens'));
    return stored ? parseInt(stored) : 50;
  }

  private static setTokenCount(count: number): void {
    localStorage.setItem(this.getStorageKey('tokens'), count.toString());
  }

  private static getLastReset(): number {
    const stored = localStorage.getItem(this.getStorageKey('lastReset'));
    return stored ? parseInt(stored) : Date.now();
  }

  private static setLastReset(time: number): void {
    localStorage.setItem(this.getStorageKey('lastReset'), time.toString());
  }

  private static readonly RESET_INTERVAL = 3600000; // 1 heure
  private static generatedVariants: Record<string, ComponentVariant[]> = {};

  static async generateComponent(prompt: string): Promise<AIResponse> {
    const tokenCount = this.getTokenCount();
    if (tokenCount <= 0 && !this.shouldResetTokens()) {
      throw new Error('Tokens épuisés. Attendez la réinitialisation.');
    }

    if (this.shouldResetTokens()) {
      this.resetTokens();
    }

    this.setTokenCount(this.getTokenCount() - 1);

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
    const tokenCount = this.getTokenCount();
    if (tokenCount <= 2 && !this.shouldResetTokens()) {
      throw new Error('Tokens insuffisants pour générer un canvas complet.');
    }

    if (this.shouldResetTokens()) {
      this.resetTokens();
    }

    this.setTokenCount(this.getTokenCount() - 3); // Canvas complet coûte plus de tokens

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
    const lowerPrompt = prompt.toLowerCase();

    if (isFullCanvas) {
      if (lowerPrompt.includes('dashboard') || lowerPrompt.includes('admin')) {
        return this.generateNewDashboard(prompt);
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
                subtitle: 'La plateforme SaaS qui transforme votre productivité', 
                buttonText: 'Essai gratuit', 
                hasButton: true 
              },
              style: { 
                padding: '100px 40px', 
                textAlign: 'center', 
                background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(181, 55, 247, 0.1))' 
              },
              position: { x: 0, y: 80, width: 800, height: 400 },
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
              props: { title: 'ShopFuture', items: ['Produits', 'Catégories', 'Panier'] },
              style: { padding: '16px 32px', backdropFilter: 'blur(20px)' },
              position: { x: 0, y: 0, width: 800, height: 60 },
            },
            {
              type: 'grid' as ComponentType,
              props: { 
                columns: 3, 
                items: ['Produit 1 - 299€', 'Produit 2 - 199€', 'Produit 3 - 399€'] 
              },
              style: { gap: '20px', padding: '20px' },
              position: { x: 50, y: 80, width: 700, height: 300 },
            },
          ],
        };
      } else {
        // Canvas par défaut
        return {
          componentType: 'container' as ComponentType,
          props: {},
          style: {},
          components: [
            {
              type: 'card' as ComponentType,
              props: { title: 'Contenu généré', content: 'Interface créée par IA' },
              style: { padding: '20px', borderRadius: '12px' },
              position: { x: 50, y: 50, width: 400, height: 200 },
            }
          ],
        };
      }
    } else {
      // Génération d'un composant unique
      if (lowerPrompt.includes('navbar') || lowerPrompt.includes('navigation')) {
        return {
          componentType: 'navbar' as ComponentType,
          props: { 
            title: 'Navigation', 
            items: ['Accueil', 'Services', 'Contact']
          },
          style: { 
            padding: '16px 32px', 
            backdropFilter: lowerPrompt.includes('glass') ? 'blur(20px)' : 'none',
          },
        };
      } else if (lowerPrompt.includes('button') || lowerPrompt.includes('bouton')) {
        return this.generateNewButtonComponent(prompt);
      } else if (lowerPrompt.includes('card') || lowerPrompt.includes('carte')) {
        return {
          componentType: 'card' as ComponentType,
          props: { title: 'Carte générée', content: 'Contenu IA' },
          style: { padding: '20px', borderRadius: '12px' },
        };
      } else if (lowerPrompt.includes('form') || lowerPrompt.includes('formulaire')) {
        return {
          componentType: 'form' as ComponentType,
          props: { 
            title: 'Formulaire',
            fields: ['nom', 'email'],
            submitText: 'Envoyer',
          },
          style: { padding: '32px', borderRadius: '16px' },
        };
      } else {
        // Par défaut, retourner un bouton
        return {
          componentType: 'button' as ComponentType,
          props: { text: 'Généré par IA', variant: 'primary' },
          style: { padding: '12px 24px', borderRadius: '8px' },
        };
      }
    }
  }

  private static shouldResetTokens(): boolean {
    return Date.now() - this.getLastReset() >= this.RESET_INTERVAL;
  }

  private static resetTokens(): void {
    this.setTokenCount(50);
    this.setLastReset(Date.now());
  }

  // Nouvelles méthodes pour générer des designs créatifs et uniques
  private static generateNewDashboard(prompt: string): AIResponse {
    const styles = ['cyberpunk', 'glassmorphism', 'matrix', 'minimal'];
    const selectedStyle = styles[Math.floor(Math.random() * styles.length)];
    
    const colorSchemes = {
      cyberpunk: { bg: '#0a0a0a', primary: '#ff0080', secondary: '#00ffff', accent: '#ff6b35' },
      glassmorphism: { bg: 'rgba(0,0,0,0.1)', primary: 'rgba(255,255,255,0.2)', secondary: 'rgba(255,255,255,0.1)', accent: '#00d4ff' },
      matrix: { bg: '#0d0d0d', primary: '#00ff00', secondary: '#003300', accent: '#00cc00' },
      minimal: { bg: '#fafafa', primary: '#ffffff', secondary: '#f5f5f5', accent: '#333333' }
    };
    
    const colors = colorSchemes[selectedStyle as keyof typeof colorSchemes];
    
    return {
      componentType: 'container' as ComponentType,
      props: {},
      style: {},
      components: [
        {
          type: 'aside' as ComponentType,
          props: { 
            title: 'Menu', 
            items: ['Dashboard', 'Analytics', 'Users', 'Settings'], 
            position: 'left' 
          },
          style: { 
            backgroundColor: colors.primary, 
            color: colors.accent,
            padding: '20px',
            width: '280px'
          },
          position: { x: 0, y: 0, width: 280, height: 600 },
        },
        {
          type: 'navbar' as ComponentType,
          props: { 
            title: `${selectedStyle.charAt(0).toUpperCase() + selectedStyle.slice(1)} Dashboard`, 
            items: ['Notifications', 'Profil'] 
          },
          style: { 
            backgroundColor: colors.primary, 
            color: colors.accent,
            padding: '16px 32px', 
            backdropFilter: selectedStyle === 'glassmorphism' ? 'blur(20px)' : 'none',
            marginLeft: '280px'
          },
          position: { x: 280, y: 0, width: 520, height: 60 },
        },
        {
          type: 'grid' as ComponentType,
          props: { 
            columns: 2, 
            items: [
              `${Math.floor(Math.random() * 10000)} Utilisateurs`,
              `${Math.floor(Math.random() * 1000)} Ventes`,
              `${Math.floor(Math.random() * 100000)}€ Revenus`,
              `${Math.floor(Math.random() * 100)}% Croissance`
            ]
          },
          style: { 
            gap: '20px', 
            padding: '20px',
            marginLeft: '280px'
          },
          position: { x: 300, y: 80, width: 480, height: 150 },
        },
      ],
    };
  }

  private static generateNewButtonComponent(prompt: string): AIResponse {
    const styles = ['neon-pulse', 'holographic', 'liquid', 'morphing'];
    const selectedStyle = styles[Math.floor(Math.random() * styles.length)];
    
    const baseStyles = {
      'neon-pulse': {
        backgroundColor: 'transparent',
        color: '#00ffff',
        border: '2px solid #00ffff',
        borderRadius: '0',
        padding: '12px 24px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        boxShadow: '0 0 20px #00ffff'
      },
      'holographic': {
        background: 'linear-gradient(45deg, #ff00ff, #00ffff, #ffff00, #ff00ff)',
        backgroundSize: '300% 300%',
        color: 'white',
        border: 'none',
        borderRadius: '20px',
        padding: '12px 24px',
        fontWeight: 'bold',
        boxShadow: '0 0 30px rgba(255,0,255,0.5)'
      },
      'liquid': {
        background: 'linear-gradient(45deg, #667eea, #764ba2)',
        color: 'white',
        border: 'none',
        borderRadius: '50px',
        padding: '15px 30px',
        transition: 'all 0.3s ease'
      },
      'morphing': {
        backgroundColor: '#ff6b6b',
        color: 'white',
        border: 'none',
        borderRadius: '25px',
        padding: '12px 24px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    };

    return {
      componentType: 'button' as ComponentType,
      props: { 
        text: this.generateRandomButtonText(prompt),
        variant: selectedStyle
      },
      style: baseStyles[selectedStyle as keyof typeof baseStyles]
    };
  }

  private static generateRandomButtonText(prompt: string): string {
    const texts = [
      'Activer', 'Lancer', 'Démarrer', 'Exécuter', 'Confirmer', 'Valider', 
      'Poursuivre', 'Découvrir', 'Explorer', 'Créer'
    ];
    
    if (prompt.includes('login') || prompt.includes('connexion')) {
      return ['Se connecter', 'Connexion', 'Login'][Math.floor(Math.random() * 3)];
    }
    if (prompt.includes('submit') || prompt.includes('envoyer')) {
      return ['Envoyer', 'Soumettre', 'Valider'][Math.floor(Math.random() * 3)];
    }
    
    return texts[Math.floor(Math.random() * texts.length)];
  }

  // Méthode pour créer de nouvelles variantes dynamiquement
  static async generateNewVariant(componentType: ComponentType, stylePrompt: string): Promise<ComponentVariant> {
    const newVariant: ComponentVariant = {
      id: `ai-generated-${Date.now()}`,
      name: this.extractVariantName(stylePrompt),
      description: `Style généré par IA: ${stylePrompt}`,
      category: this.determineCategory(stylePrompt),
      style: this.generateStyleFromPrompt(stylePrompt, componentType)
    };

    // Sauvegarder la variante générée
    if (!this.generatedVariants[componentType]) {
      this.generatedVariants[componentType] = [];
    }
    this.generatedVariants[componentType].push(newVariant);

    return newVariant;
  }

  // Obtenir toutes les variantes (existantes + générées)
  static getAllVariants(componentType: ComponentType): ComponentVariant[] {
    const baseVariants = componentVariants[componentType] || [];
    const generated = this.generatedVariants[componentType] || [];
    return [...baseVariants, ...generated];
  }

  private static extractVariantName(prompt: string): string {
    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes('3d')) return '3D';
    if (lowerPrompt.includes('hologram')) return 'Hologramme';
    if (lowerPrompt.includes('crystal')) return 'Cristal';
    if (lowerPrompt.includes('metal')) return 'Métallique';
    if (lowerPrompt.includes('plasma')) return 'Plasma';
    if (lowerPrompt.includes('cyber')) return 'Cyber';
    return 'Style IA';
  }

  private static determineCategory(prompt: string): 'style' | 'size' | 'theme' | 'behavior' {
    const lowerPrompt = prompt.toLowerCase();
    if (lowerPrompt.includes('petit') || lowerPrompt.includes('grand')) return 'size';
    if (lowerPrompt.includes('hover') || lowerPrompt.includes('click')) return 'behavior';
    if (lowerPrompt.includes('theme') || lowerPrompt.includes('cyberpunk')) return 'theme';
    return 'style';
  }

  private static generateStyleFromPrompt(prompt: string, componentType: ComponentType): Record<string, any> {
    const lowerPrompt = prompt.toLowerCase();
    const baseStyle: Record<string, any> = {};

    // Styles selon le type de composant
    if (componentType === 'button') {
      baseStyle.padding = '12px 24px';
      baseStyle.borderRadius = '8px';
      baseStyle.cursor = 'pointer';
      baseStyle.fontWeight = '600';
      baseStyle.transition = 'all 0.3s ease';
    }

    // Effets spéciaux basés sur le prompt
    if (lowerPrompt.includes('3d')) {
      baseStyle.transform = 'perspective(1000px) rotateX(10deg)';
      baseStyle.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
    }

    if (lowerPrompt.includes('hologram')) {
      baseStyle.background = 'linear-gradient(45deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 255, 0.2))';
      baseStyle.border = '1px solid rgba(255, 255, 255, 0.3)';
      baseStyle.backdropFilter = 'blur(10px)';
      baseStyle.boxShadow = '0 0 30px rgba(0, 255, 255, 0.5)';
    }

    if (lowerPrompt.includes('crystal')) {
      baseStyle.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))';
      baseStyle.border = '1px solid rgba(255, 255, 255, 0.4)';
      baseStyle.backdropFilter = 'blur(15px)';
      baseStyle.borderRadius = '20px';
    }

    if (lowerPrompt.includes('cyber')) {
      baseStyle.background = 'linear-gradient(45deg, #0a0a0a, #1a1a1a)';
      baseStyle.border = '2px solid #00ffff';
      baseStyle.color = '#00ffff';
      baseStyle.boxShadow = '0 0 20px rgba(0, 255, 255, 0.4)';
      baseStyle.textShadow = '0 0 8px #00ffff';
    }

    return baseStyle;
  }

  static getTokenStatus() {
    if (this.shouldResetTokens()) {
      this.resetTokens();
    }

    return {
      remaining: this.getTokenCount(),
      total: 50,
      resetTime: new Date(this.getLastReset() + this.RESET_INTERVAL),
      model: GOOGLE_AI_API_KEY ? 'Gemini Pro' : 'Mock AI (Dev)',
    };
  }

  // Générer plusieurs variantes du même composant
  static async generateMultipleVariants(prompt: string, count: number = 3): Promise<AIResponse[]> {
    const variants: AIResponse[] = [];
    
    for (let i = 0; i < count; i++) {
      try {
        // Modifier légèrement le prompt pour chaque variante
        const variantPrompt = `${prompt} - Style ${i + 1}: ${this.getVariantStyle(i)}`;
        const variant = await this.generateComponent(variantPrompt);
        variants.push(variant);
        
        // Petit délai entre les générations
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.error(`Erreur génération variante ${i + 1}:`, error);
      }
    }
    
    return variants;
  }

  private static getVariantStyle(index: number): string {
    const styles = [
      'avec un design moderne et épuré',
      'avec des effets néon et cyberpunk',
      'avec un style glassmorphism transparent',
      'avec des gradients colorés dynamiques',
      'avec un aspect 3D et des ombres profondes'
    ];
    return styles[index % styles.length];
  }
}