'use client';

import React, { useState } from 'react';
import { availableIcons, getIconsByCategory } from '@/data/icons';
import { IconOption } from '@/types';
import { Search } from 'lucide-react';
import * as Icons from 'lucide-react';

interface IconSelectorProps {
  onIconSelect: (icon: IconOption) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function IconSelector({ onIconSelect, isOpen, onClose }: IconSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const iconsByCategory = getIconsByCategory();
  
  const filteredIcons = selectedCategory === 'all' 
    ? availableIcons.filter(icon => 
        icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        icon.component.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : iconsByCategory[selectedCategory as keyof typeof iconsByCategory]?.filter(icon =>
        icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        icon.component.toLowerCase().includes(searchTerm.toLowerCase())
      ) || [];

  const categories = [
    { id: 'all', name: 'Toutes', count: availableIcons.length },
    { id: 'ui', name: 'Interface', count: iconsByCategory.ui.length },
    { id: 'arrows', name: 'Flèches', count: iconsByCategory.arrows.length },
    { id: 'media', name: 'Média', count: iconsByCategory.media.length },
    { id: 'business', name: 'Business', count: iconsByCategory.business.length },
    { id: 'social', name: 'Social', count: iconsByCategory.social.length }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 w-[700px] max-w-90vw max-h-80vh overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Sélectionner une icône</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Recherche */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une icône..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
          />
        </div>

        {/* Catégories */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.name}
              <span className="text-xs px-1.5 py-0.5 bg-black/20 rounded">
                {category.count}
              </span>
            </button>
          ))}
        </div>

        {/* Grille d'icônes */}
        <div className="flex-1 overflow-y-auto">
          {filteredIcons.length > 0 ? (
            <div className="grid grid-cols-8 gap-2">
              {filteredIcons.map((icon) => {
                const IconComponent = (Icons as any)[icon.component];
                
                return (
                  <button
                    key={icon.component}
                    onClick={() => {
                      onIconSelect(icon);
                      onClose();
                    }}
                    className="p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-gray-600 transition-all group"
                    title={icon.name}
                  >
                    {IconComponent ? (
                      <IconComponent className="w-6 h-6 text-gray-300 group-hover:text-white mx-auto" />
                    ) : (
                      <div className="w-6 h-6 bg-gray-600 rounded mx-auto" />
                    )}
                    <div className="text-xs text-gray-400 mt-2 truncate">
                      {icon.name}
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              Aucune icône trouvée pour "{searchTerm}"
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            {filteredIcons.length} icône{filteredIcons.length > 1 ? 's' : ''} disponible{filteredIcons.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>
    </div>
  );
}