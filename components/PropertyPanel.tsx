import React, { useState } from 'react';
import { Component } from '@/types';
import { AnimationPreview } from './AnimationPreview';
import { Edit3, Trash2, Copy, Palette, Move, Zap, Eye } from 'lucide-react';

interface PropertyPanelProps {
  selectedComponent: Component | null;
  onComponentUpdate: (componentId: string, updates: Partial<Component>) => void;
  onComponentDelete: (componentId: string) => void;
  onComponentDuplicate: (componentId: string) => void;
}

export const PropertyPanel: React.FC<PropertyPanelProps> = ({
  selectedComponent,
  onComponentUpdate,
  onComponentDelete,
  onComponentDuplicate,
}) => {
  const [activeTab, setActiveTab] = useState<'props' | 'style' | 'animations'>('props');

  if (!selectedComponent) {
    return (
      <div className="w-80 bg-gradient-to-b from-gray-900 to-black border-l border-cyan-500/30 h-full">
        <div className="p-6">
          <div className="text-center py-12">
            <Edit3 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h3 className="text-gray-400 text-lg font-medium mb-2">Aucune sélection</h3>
            <p className="text-gray-500 text-sm">
              Sélectionnez un composant pour modifier ses propriétés
            </p>
          </div>
        </div>
      </div>
    );
  }

  const updateProp = (prop: string, value: any) => {
    onComponentUpdate(selectedComponent.id, {
      props: { ...selectedComponent.props, [prop]: value },
    });
  };

  const updateStyle = (style: string, value: any) => {
    onComponentUpdate(selectedComponent.id, {
      style: { ...selectedComponent.style, [style]: value },
    });
  };

  const addAnimation = (animation: any) => {
    const currentAnimations = selectedComponent.animations || [];
    onComponentUpdate(selectedComponent.id, {
      animations: [...currentAnimations, animation],
    });
  };

  const removeAnimation = (index: number) => {
    const currentAnimations = selectedComponent.animations || [];
    onComponentUpdate(selectedComponent.id, {
      animations: currentAnimations.filter((_, i) => i !== index),
    });
  };

  const renderPropertyInputs = () => {
    switch (selectedComponent.type) {
      case 'button':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Texte</label>
              <input
                type="text"
                value={selectedComponent.props.text || ''}
                onChange={(e) => updateProp('text', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Variante</label>
              <select
                value={selectedComponent.props.variant || 'primary'}
                onChange={(e) => updateProp('variant', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="primary">Primaire</option>
                <option value="secondary">Secondaire</option>
                <option value="ghost">Fantôme</option>
                <option value="neon">Néon</option>
                <option value="gradient">Gradient</option>
                <option value="glass">Glassmorphism</option>
                <option value="minimal">Minimal</option>
                <option value="rounded">Arrondi</option>
                <option value="large">Large</option>
                <option value="icon">Icône</option>
                <option value="floating">Flottant</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Taille</label>
              <select
                value={selectedComponent.props.size || 'medium'}
                onChange={(e) => updateProp('size', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="small">Petit</option>
                <option value="medium">Moyen</option>
                <option value="large">Grand</option>
                <option value="xl">Très grand</option>
              </select>
            </div>
          </>
        );

      case 'navbar':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Titre</label>
              <input
                type="text"
                value={selectedComponent.props.title || ''}
                onChange={(e) => updateProp('title', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Éléments de menu (séparés par des virgules)
              </label>
              <input
                type="text"
                value={(selectedComponent.props.items || []).join(', ')}
                onChange={(e) => updateProp('items', e.target.value.split(', ').filter(Boolean))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Position</label>
              <select
                value={selectedComponent.props.position || 'top'}
                onChange={(e) => updateProp('position', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="top">Haut</option>
                <option value="bottom">Bas</option>
                <option value="fixed">Fixe</option>
                <option value="sticky">Collant</option>
              </select>
            </div>
          </>
        );

      case 'aside':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Titre</label>
              <input
                type="text"
                value={selectedComponent.props.title || ''}
                onChange={(e) => updateProp('title', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Éléments (séparés par des virgules)
              </label>
              <textarea
                value={(selectedComponent.props.items || []).join(', ')}
                onChange={(e) => updateProp('items', e.target.value.split(', ').filter(Boolean))}
                rows={3}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Position</label>
              <select
                value={selectedComponent.props.position || 'left'}
                onChange={(e) => updateProp('position', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="left">Gauche</option>
                <option value="right">Droite</option>
              </select>
            </div>
          </>
        );

      case 'hero':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Titre principal</label>
              <input
                type="text"
                value={selectedComponent.props.title || ''}
                onChange={(e) => updateProp('title', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Sous-titre</label>
              <textarea
                value={selectedComponent.props.subtitle || ''}
                onChange={(e) => updateProp('subtitle', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Texte du bouton</label>
              <input
                type="text"
                value={selectedComponent.props.buttonText || ''}
                onChange={(e) => updateProp('buttonText', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedComponent.props.hasButton || false}
                  onChange={(e) => updateProp('hasButton', e.target.checked)}
                  className="w-4 h-4 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500"
                />
                <span className="text-sm text-gray-300">Afficher le bouton</span>
              </label>
            </div>
          </>
        );

      case 'card':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Titre</label>
              <input
                type="text"
                value={selectedComponent.props.title || ''}
                onChange={(e) => updateProp('title', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Contenu</label>
              <textarea
                value={selectedComponent.props.content || ''}
                onChange={(e) => updateProp('content', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedComponent.props.hasButton || false}
                  onChange={(e) => updateProp('hasButton', e.target.checked)}
                  className="w-4 h-4 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500"
                />
                <span className="text-sm text-gray-300">Inclure un bouton</span>
              </label>
            </div>
          </>
        );

      case 'input':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Label</label>
              <input
                type="text"
                value={selectedComponent.props.label || ''}
                onChange={(e) => updateProp('label', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Placeholder</label>
              <input
                type="text"
                value={selectedComponent.props.placeholder || ''}
                onChange={(e) => updateProp('placeholder', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
              <select
                value={selectedComponent.props.type || 'text'}
                onChange={(e) => updateProp('type', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="text">Texte</option>
                <option value="email">Email</option>
                <option value="password">Mot de passe</option>
                <option value="number">Nombre</option>
                <option value="search">Recherche</option>
                <option value="tel">Téléphone</option>
                <option value="url">URL</option>
                <option value="date">Date</option>
              </select>
            </div>
          </>
        );

      case 'text':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Contenu</label>
              <textarea
                value={selectedComponent.props.content || ''}
                onChange={(e) => updateProp('content', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Taille</label>
              <select
                value={selectedComponent.props.size || 'base'}
                onChange={(e) => updateProp('size', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="xs">Très petit</option>
                <option value="sm">Petit</option>
                <option value="base">Normal</option>
                <option value="lg">Grand</option>
                <option value="xl">Très grand</option>
                <option value="2xl">Énorme</option>
                <option value="3xl">Gigantesque</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Poids</label>
              <select
                value={selectedComponent.props.weight || 'normal'}
                onChange={(e) => updateProp('weight', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="light">Léger</option>
                <option value="normal">Normal</option>
                <option value="medium">Moyen</option>
                <option value="semibold">Semi-gras</option>
                <option value="bold">Gras</option>
                <option value="extrabold">Très gras</option>
              </select>
            </div>
          </>
        );

      case 'form':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Titre du formulaire</label>
              <input
                type="text"
                value={selectedComponent.props.title || ''}
                onChange={(e) => updateProp('title', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Champs (séparés par des virgules)
              </label>
              <input
                type="text"
                value={(selectedComponent.props.fields || []).join(', ')}
                onChange={(e) => updateProp('fields', e.target.value.split(', ').filter(Boolean))}
                placeholder="nom, email, message"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Texte du bouton</label>
              <input
                type="text"
                value={selectedComponent.props.submitText || ''}
                onChange={(e) => updateProp('submitText', e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </>
        );

      case 'table':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                En-têtes (séparées par des virgules)
              </label>
              <input
                type="text"
                value={(selectedComponent.props.headers || []).join(', ')}
                onChange={(e) => updateProp('headers', e.target.value.split(', ').filter(Boolean))}
                placeholder="Nom, Email, Statut"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Données (une ligne par rangée, colonnes séparées par |)
              </label>
              <textarea
                value={(selectedComponent.props.rows || []).map((row: string[]) => row.join(' | ')).join('\n')}
                onChange={(e) => {
                  const rows = e.target.value.split('\n').filter(Boolean).map(line => line.split(' | '));
                  updateProp('rows', rows);
                }}
                rows={4}
                placeholder="John Doe | john@example.com | Actif&#10;Jane Smith | jane@example.com | Inactif"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </>
        );

      case 'grid':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Nombre de colonnes</label>
              <input
                type="number"
                min="1"
                max="6"
                value={selectedComponent.props.columns || 3}
                onChange={(e) => updateProp('columns', parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Éléments (séparés par des virgules)
              </label>
              <textarea
                value={(selectedComponent.props.items || []).join(', ')}
                onChange={(e) => updateProp('items', e.target.value.split(', ').filter(Boolean))}
                rows={3}
                placeholder="Item 1, Item 2, Item 3"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </>
        );

      default:
        return (
          <div className="text-gray-500 text-sm">
            Propriétés non disponibles pour ce type de composant.
          </div>
        );
    }
  };

  const renderStyleInputs = () => (
    <div className="space-y-4">
      {/* Colors */}
      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-3">Couleurs</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Arrière-plan</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={selectedComponent.style.backgroundColor || '#000000'}
                onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                className="w-12 h-8 bg-gray-800 border border-gray-600 rounded"
              />
              <input
                type="text"
                value={selectedComponent.style.backgroundColor || ''}
                onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                placeholder="#000000"
                className="flex-1 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-xs focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Texte</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={selectedComponent.style.color || '#ffffff'}
                onChange={(e) => updateStyle('color', e.target.value)}
                className="w-12 h-8 bg-gray-800 border border-gray-600 rounded"
              />
              <input
                type="text"
                value={selectedComponent.style.color || ''}
                onChange={(e) => updateStyle('color', e.target.value)}
                placeholder="#ffffff"
                className="flex-1 px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-xs focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Dégradé</label>
            <select
              value={selectedComponent.style.backgroundImage?.includes('gradient') ? 'gradient' : 'none'}
              onChange={(e) => {
                if (e.target.value === 'gradient') {
                  updateStyle('backgroundImage', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
                } else {
                  updateStyle('backgroundImage', '');
                }
              }}
              className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-xs focus:border-cyan-500 focus:outline-none"
            >
              <option value="none">Aucun</option>
              <option value="gradient">Dégradé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Spacing */}
      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-3">Espacement</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Padding</label>
            <input
              type="text"
              value={selectedComponent.style.padding || ''}
              onChange={(e) => updateStyle('padding', e.target.value)}
              placeholder="16px"
              className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-cyan-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Margin</label>
            <input
              type="text"
              value={selectedComponent.style.margin || ''}
              onChange={(e) => updateStyle('margin', e.target.value)}
              placeholder="8px"
              className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Border */}
      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-3">Bordures</h4>
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Largeur</label>
              <input
                type="text"
                value={selectedComponent.style.borderWidth || ''}
                onChange={(e) => updateStyle('borderWidth', e.target.value)}
                placeholder="1px"
                className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Style</label>
              <select
                value={selectedComponent.style.borderStyle || 'solid'}
                onChange={(e) => updateStyle('borderStyle', e.target.value)}
                className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-cyan-500 focus:outline-none"
              >
                <option value="solid">Solide</option>
                <option value="dashed">Tirets</option>
                <option value="dotted">Points</option>
                <option value="double">Double</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Couleur</label>
              <input
                type="color"
                value={selectedComponent.style.borderColor || '#ffffff'}
                onChange={(e) => updateStyle('borderColor', e.target.value)}
                className="w-full h-7 bg-gray-800 border border-gray-600 rounded"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Border Radius</label>
            <input
              type="text"
              value={selectedComponent.style.borderRadius || ''}
              onChange={(e) => updateStyle('borderRadius', e.target.value)}
              placeholder="8px"
              className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Shadow */}
      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-3">Ombres</h4>
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Ombre</label>
            <select
              value={selectedComponent.style.boxShadow ? 'custom' : 'none'}
              onChange={(e) => {
                const shadows = {
                  none: '',
                  small: '0 1px 3px rgba(0, 0, 0, 0.12)',
                  medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  large: '0 10px 15px rgba(0, 0, 0, 0.1)',
                  xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
                  glow: '0 0 20px rgba(59, 130, 246, 0.5)',
                };
                updateStyle('boxShadow', shadows[e.target.value as keyof typeof shadows] || e.target.value);
              }}
              className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-xs focus:border-cyan-500 focus:outline-none"
            >
              <option value="none">Aucune</option>
              <option value="small">Petite</option>
              <option value="medium">Moyenne</option>
              <option value="large">Grande</option>
              <option value="xl">Très grande</option>
              <option value="glow">Lueur</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Text Shadow</label>
            <select
              value={selectedComponent.style.textShadow ? 'glow' : 'none'}
              onChange={(e) => {
                const textShadows = {
                  none: '',
                  glow: '0 0 10px currentColor',
                  strong: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                };
                updateStyle('textShadow', textShadows[e.target.value as keyof typeof textShadows] || '');
              }}
              className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-xs focus:border-cyan-500 focus:outline-none"
            >
              <option value="none">Aucune</option>
              <option value="glow">Lueur</option>
              <option value="strong">Forte</option>
            </select>
          </div>
        </div>
      </div>

      {/* Effects */}
      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-3">Effets</h4>
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-gray-400 mb-1">Opacité</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={selectedComponent.style.opacity || 1}
              onChange={(e) => updateStyle('opacity', e.target.value)}
              className="w-full"
            />
            <span className="text-xs text-gray-500">{selectedComponent.style.opacity || 1}</span>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Transform</label>
            <input
              type="text"
              value={selectedComponent.style.transform || ''}
              onChange={(e) => updateStyle('transform', e.target.value)}
              placeholder="rotate(45deg) scale(1.1)"
              className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-cyan-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Filter</label>
            <input
              type="text"
              value={selectedComponent.style.filter || ''}
              onChange={(e) => updateStyle('filter', e.target.value)}
              placeholder="blur(5px) brightness(1.2)"
              className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-cyan-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1">Backdrop Filter</label>
            <input
              type="text"
              value={selectedComponent.style.backdropFilter || ''}
              onChange={(e) => updateStyle('backdropFilter', e.target.value)}
              placeholder="blur(20px)"
              className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAnimationInputs = () => (
    <AnimationPreview
      animations={selectedComponent.animations || []}
      onAnimationUpdate={(animations) => 
        onComponentUpdate(selectedComponent.id, { animations })
      }
    />
  );

  return (
    <div className="w-80 bg-gradient-to-b from-gray-900 to-black border-l border-cyan-500/30 h-full overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Propriétés</h2>
          <div className="flex gap-2">
            <button
              onClick={() => onComponentDuplicate(selectedComponent.id)}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-gray-300 hover:text-white transition-all duration-200"
              title="Dupliquer"
            >
              <Copy className="w-4 h-4" />
            </button>
            <button
              onClick={() => onComponentDelete(selectedComponent.id)}
              className="p-2 bg-red-900/50 hover:bg-red-900 rounded-lg text-red-400 hover:text-white transition-all duration-200"
              title="Supprimer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mb-6 bg-gray-800/30 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('props')}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === 'props' 
                ? 'bg-cyan-500 text-white' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Edit3 className="w-4 h-4" />
            Props
          </button>
          <button
            onClick={() => setActiveTab('style')}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === 'style' 
                ? 'bg-cyan-500 text-white' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Palette className="w-4 h-4" />
            Style
          </button>
          <button
            onClick={() => setActiveTab('animations')}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              activeTab === 'animations' 
                ? 'bg-cyan-500 text-white' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Zap className="w-4 h-4" />
            Anim
          </button>
        </div>

        <div className="space-y-6">
          {/* Component Type */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Type de composant</h3>
            <div className="px-3 py-2 bg-gray-800 rounded-lg text-cyan-400 text-sm font-medium">
              {selectedComponent.type.charAt(0).toUpperCase() + selectedComponent.type.slice(1)}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'props' && (
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-4">Propriétés</h3>
              {renderPropertyInputs()}
            </div>
          )}

          {activeTab === 'style' && (
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-4">Styles</h3>
              {renderStyleInputs()}
            </div>
          )}

          {activeTab === 'animations' && (
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-4">Animations</h3>
              {renderAnimationInputs()}
            </div>
          )}

          {/* Position & Size */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-4">Position & Taille</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">X</label>
                <input
                  type="number"
                  value={Math.round(selectedComponent.position.x)}
                  onChange={(e) => onComponentUpdate(selectedComponent.id, {
                    position: { ...selectedComponent.position, x: parseInt(e.target.value) || 0 }
                  })}
                  className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Y</label>
                <input
                  type="number"
                  value={Math.round(selectedComponent.position.y)}
                  onChange={(e) => onComponentUpdate(selectedComponent.id, {
                    position: { ...selectedComponent.position, y: parseInt(e.target.value) || 0 }
                  })}
                  className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Largeur</label>
                <input
                  type="number"
                  value={Math.round(selectedComponent.position.width)}
                  onChange={(e) => onComponentUpdate(selectedComponent.id, {
                    position: { ...selectedComponent.position, width: parseInt(e.target.value) || 100 }
                  })}
                  className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-cyan-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Hauteur</label>
                <input
                  type="number"
                  value={Math.round(selectedComponent.position.height)}
                  onChange={(e) => onComponentUpdate(selectedComponent.id, {
                    position: { ...selectedComponent.position, height: parseInt(e.target.value) || 40 }
                  })}
                  className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-cyan-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};