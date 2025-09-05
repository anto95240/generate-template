'use client';

import React, { useState } from 'react';
import { ComponentType } from '@/types';
import { getVariantsByComponent, getVariantsByCategory, ComponentVariant } from '@/data/componentVariants';
import { Palette, Maximize2, Sparkles, Settings } from 'lucide-react';

interface VariantSelectorProps {
  componentType: ComponentType;
  selectedVariant?: string;
  onVariantSelect: (variant: ComponentVariant) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function VariantSelector({ 
  componentType, 
  selectedVariant, 
  onVariantSelect, 
  isOpen, 
  onClose 
}: VariantSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const allVariants = getVariantsByComponent(componentType);
  const variants = selectedCategory === 'all' 
    ? allVariants 
    : getVariantsByCategory(componentType, selectedCategory);

  const categories = [
    { id: 'all', name: 'Toutes', icon: Settings },
    { id: 'style', name: 'Style', icon: Palette },
    { id: 'size', name: 'Taille', icon: Maximize2 },
    { id: 'theme', name: 'Thème', icon: Sparkles },
    { id: 'behavior', name: 'Comportement', icon: Settings }
  ];

  const availableCategories = categories.filter(cat => 
    cat.id === 'all' || allVariants.some(v => v.category === cat.id)
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 w-[600px] max-w-90vw max-h-80vh overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">
            Variantes de {componentType}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Filtres par catégorie */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {availableCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-cyan-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <IconComponent size={16} />
                {category.name}
              </button>
            );
          })}
        </div>

        {/* Liste des variantes */}
        <div className="flex-1 overflow-y-auto">
          {variants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => {
                    onVariantSelect(variant);
                    onClose();
                  }}
                  className={`p-4 rounded-lg text-left transition-all border ${
                    selectedVariant === variant.id
                      ? 'bg-cyan-600/20 border-cyan-500 text-cyan-300'
                      : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50 hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{variant.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded ${
                      variant.category === 'style' ? 'bg-blue-500/20 text-blue-300' :
                      variant.category === 'size' ? 'bg-green-500/20 text-green-300' :
                      variant.category === 'theme' ? 'bg-purple-500/20 text-purple-300' :
                      'bg-gray-500/20 text-gray-300'
                    }`}>
                      {variant.category}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{variant.description}</p>
                  
                  {/* Aperçu visuel pour certains styles */}
                  {variant.category === 'style' || variant.category === 'theme' ? (
                    <div 
                      className="mt-3 h-8 rounded border border-gray-600"
                      style={{
                        backgroundColor: variant.style.backgroundColor,
                        borderColor: variant.style.borderColor || variant.style.border?.split(' ')[2],
                        boxShadow: variant.style.boxShadow
                      }}
                    />
                  ) : null}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              Aucune variante disponible pour cette catégorie
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            {allVariants.length} variante{allVariants.length > 1 ? 's' : ''} disponible{allVariants.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>
  );
}