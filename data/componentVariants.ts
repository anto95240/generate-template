import { ComponentType, ComponentStyle } from '@/types';

export interface ComponentVariant {
  id: string;
  name: string;
  description: string;
  style: ComponentStyle;
  props?: Record<string, any>;
  category: 'style' | 'size' | 'theme' | 'behavior';
}

export interface ComponentVariants {
  [key: string]: ComponentVariant[];
}

export const componentVariants: ComponentVariants = {
  button: [
    // Styles de base
    {
      id: 'primary',
      name: 'Principal',
      description: 'Bouton principal avec couleur d\'accentuation',
      category: 'style',
      style: {
        backgroundColor: '#3b82f6',
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '8px',
        borderWidth: '0',
        borderStyle: 'none',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }
    },
    {
      id: 'secondary',
      name: 'Secondaire',
      description: 'Bouton secondaire avec bordure',
      category: 'style',
      style: {
        backgroundColor: 'transparent',
        color: '#3b82f6',
        padding: '12px 24px',
        borderRadius: '8px',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#3b82f6',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }
    },
    {
      id: 'neon',
      name: 'Néon',
      description: 'Bouton avec effet néon futuriste',
      category: 'theme',
      style: {
        backgroundColor: 'transparent',
        color: '#00ffff',
        padding: '12px 24px',
        borderRadius: '8px',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#00ffff',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 0 20px #00ffff40, inset 0 0 20px #00ffff10',
        textShadow: '0 0 10px #00ffff',
        transition: 'all 0.3s ease'
      }
    },
    {
      id: 'glass',
      name: 'Verre',
      description: 'Bouton avec effet glassmorphism',
      category: 'theme',
      style: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: '#ffffff',
        padding: '12px 24px',
        borderRadius: '12px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        fontWeight: '600',
        cursor: 'pointer',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease'
      }
    },
    // Tailles
    {
      id: 'small',
      name: 'Petit',
      description: 'Bouton de petite taille',
      category: 'size',
      style: {
        padding: '8px 16px',
        fontSize: '14px',
        borderRadius: '6px'
      }
    },
    {
      id: 'large',
      name: 'Grand',
      description: 'Bouton de grande taille',
      category: 'size',
      style: {
        padding: '16px 32px',
        fontSize: '18px',
        borderRadius: '12px'
      }
    },
    {
      id: 'cyberpunk-glitch',
      name: 'Cyberpunk Glitch',
      description: 'Bouton avec effet glitch cyberpunk',
      category: 'theme',
      style: {
        backgroundColor: '#0a0a0a',
        color: '#ff0080',
        padding: '12px 24px',
        borderRadius: '0',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#ff0080',
        fontWeight: '700',
        cursor: 'pointer',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        fontFamily: 'monospace',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 0 15px #ff008080'
      }
    },
    {
      id: 'holographic-pulse',
      name: 'Holographique Pulsant',
      description: 'Bouton holographique avec animation',
      category: 'theme',
      style: {
        background: 'linear-gradient(45deg, transparent, rgba(0,255,255,0.1), transparent)',
        color: '#00ffff',
        padding: '12px 24px',
        borderRadius: '10px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgba(0,255,255,0.3)',
        fontWeight: '600',
        cursor: 'pointer',
        backdropFilter: 'blur(5px)',
        boxShadow: '0 0 30px rgba(0,255,255,0.2), inset 0 0 30px rgba(0,255,255,0.05)',
        textShadow: '0 0 10px #00ffff'
      }
    }
  ],

  navbar: [
    {
      id: 'modern',
      name: 'Moderne',
      description: 'Navigation moderne et épurée',
      category: 'style',
      style: {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottomWidth: '1px',
        borderBottomStyle: 'solid',
        borderBottomColor: 'rgba(55, 65, 81, 0.5)',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    },
    {
      id: 'cyberpunk',
      name: 'Cyberpunk',
      description: 'Navigation avec thème cyberpunk',
      category: 'theme',
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderBottomWidth: '2px',
        borderBottomStyle: 'solid',
        borderBottomColor: '#00ffff',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 0 20px #00ffff20'
      }
    },
    {
      id: 'glass',
      name: 'Verre',
      description: 'Navigation transparente glassmorphism',
      category: 'theme',
      style: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '0 0 16px 16px',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }
    }
  ],

  card: [
    {
      id: 'simple',
      name: 'Simple',
      description: 'Carte simple et épurée',
      category: 'style',
      style: {
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgba(0, 0, 0, 0.1)'
      }
    },
    {
      id: 'floating',
      name: 'Flottante',
      description: 'Carte avec ombre flottante',
      category: 'style',
      style: {
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        borderWidth: '0',
        borderStyle: 'none',
        transform: 'translateY(-2px)'
      }
    },
    {
      id: 'neon',
      name: 'Néon',
      description: 'Carte avec bordure néon',
      category: 'theme',
      style: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '12px',
        padding: '24px',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#ff00ff',
        boxShadow: '0 0 20px #ff00ff40, inset 0 0 20px #ff00ff10',
        color: '#ffffff'
      }
    },
    {
      id: 'glass',
      name: 'Verre',
      description: 'Carte glassmorphism',
      category: 'theme',
      style: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '24px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)',
        color: '#ffffff'
      }
    }
  ],

  input: [
    {
      id: 'standard',
      name: 'Standard',
      description: 'Champ de saisie standard',
      category: 'style',
      style: {
        padding: '12px 16px',
        borderRadius: '8px',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#e5e7eb',
        backgroundColor: '#ffffff',
        fontSize: '16px',
        transition: 'border-color 0.3s ease'
      }
    },
    {
      id: 'floating',
      name: 'Flottant',
      description: 'Label flottant animé',
      category: 'behavior',
      style: {
        padding: '16px 16px 8px 16px',
        borderRadius: '8px',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#e5e7eb',
        backgroundColor: '#ffffff',
        fontSize: '16px',
        transition: 'all 0.3s ease',
        position: 'relative'
      }
    },
    {
      id: 'neon',
      name: 'Néon',
      description: 'Champ avec bordure néon',
      category: 'theme',
      style: {
        padding: '12px 16px',
        borderRadius: '8px',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#00ffff',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#ffffff',
        fontSize: '16px',
        boxShadow: '0 0 10px #00ffff40',
        transition: 'all 0.3s ease'
      }
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Design minimaliste avec ligne',
      category: 'style',
      style: {
        padding: '12px 0',
        borderWidth: '0 0 2px 0',
        borderStyle: 'none none solid none',
        borderColor: 'transparent transparent #e5e7eb transparent',
        backgroundColor: 'transparent',
        fontSize: '16px',
        borderRadius: '0',
        transition: 'border-color 0.3s ease'
      }
    }
  ]
};

export const getVariantsByComponent = (componentType: ComponentType): ComponentVariant[] => {
  return componentVariants[componentType] || [];
};

export const getVariantsByCategory = (componentType: ComponentType, category?: string): ComponentVariant[] => {
  const variants = getVariantsByComponent(componentType);
  if (!category) return variants;
  return variants.filter(variant => variant.category === category);
};

export const getVariantById = (componentType: ComponentType, variantId: string): ComponentVariant | undefined => {
  const variants = getVariantsByComponent(componentType);
  return variants.find(variant => variant.id === variantId);
};