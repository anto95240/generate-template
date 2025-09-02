import React from 'react';
import { Component, ComponentType } from '@/types';
import { Edit3, Trash2, Copy } from 'lucide-react';

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
        return null;
    }
  };

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

        <div className="space-y-6">
          {/* Component Type */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-2">Type de composant</h3>
            <div className="px-3 py-2 bg-gray-800 rounded-lg text-cyan-400 text-sm font-medium">
              {selectedComponent.type.charAt(0).toUpperCase() + selectedComponent.type.slice(1)}
            </div>
          </div>

          {/* Component Properties */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-4">Propriétés</h3>
            {renderPropertyInputs()}
          </div>

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

          {/* Custom Styles */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-4">Styles personnalisés</h3>
            <div className="space-y-3">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};