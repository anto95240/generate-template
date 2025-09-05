'use client';

import React, { useState } from 'react';
import { Framework, CSSFramework } from '@/types';
import { frameworks, getFrameworksByCategory, cssFrameworks } from '@/data/frameworks';
import { ChevronDown, Search, AlertCircle } from 'lucide-react';

interface FrameworkSelectorProps {
  selectedFramework: Framework;
  onFrameworkChange: (framework: Framework) => void;
  selectedCSSFramework?: CSSFramework;
  onCSSFrameworkChange?: (cssFramework: CSSFramework) => void;
}

export const FrameworkSelector: React.FC<FrameworkSelectorProps> = ({
  selectedFramework,
  onFrameworkChange,
  selectedCSSFramework = 'vanilla',
  onCSSFrameworkChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['frontend']);
  
  const frameworkCategories = getFrameworksByCategory();
  const selectedFrameworkInfo = frameworks.find(f => f.id === selectedFramework);
  
  const filteredFrameworks = Object.entries(frameworkCategories).reduce((acc, [category, categoryFrameworks]) => {
    const filtered = categoryFrameworks.filter(framework =>
      framework.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      framework.language.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {} as Record<string, typeof frameworks>);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'frontend': return '🎨';
      case 'fullstack': return '⚡';
      default: return '📦';
    }
  };

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case 'frontend': return 'Interfaces utilisateur';
      case 'fullstack': return 'Applications complètes';
      default: return '';
    }
  };


  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Rechercher un framework..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
        />
      </div>


      {/* Framework Categories */}
      <div className="space-y-3">
        {Object.entries(filteredFrameworks).map(([category, categoryFrameworks]) => (
          <div key={category}>
            <button
              onClick={() => toggleCategory(category)}
              className="w-full flex items-center justify-between p-3 bg-gray-800/30 hover:bg-gray-700/50 rounded-lg transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{getCategoryIcon(category)}</span>
                <div className="text-left">
                  <div className="text-sm font-medium text-gray-300 capitalize">
                    {category === 'frontend' ? 'Frontend' : 'Full-Stack'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {getCategoryDescription(category)}
                  </div>
                </div>
              </div>
              <ChevronDown 
                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                  expandedCategories.includes(category) ? 'rotate-180' : ''
                }`} 
              />
            </button>
            
            {expandedCategories.includes(category) && (
              <div className="mt-2 space-y-1 pl-2">
                {categoryFrameworks.map((framework) => {
                  let IconComponent;
                  try {
                    IconComponent = require('lucide-react')[framework.icon];
                  } catch {
                    IconComponent = require('lucide-react')['Code'];
                  }
                  
                  return (
                    <button
                      key={framework.id}
                      onClick={() => onFrameworkChange(framework.id)}
                      className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                        selectedFramework === framework.id
                          ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg shadow-cyan-500/25'
                          : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className="w-5 h-5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{framework.name}</div>
                          <div className="text-xs opacity-75 truncate">{framework.language}</div>
                          <div className="text-xs opacity-60 mt-1 line-clamp-2">
                            {framework.description}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CSS Framework Selection */}
      {selectedFrameworkInfo && onCSSFrameworkChange && (
        <div className="mt-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Framework CSS</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {cssFrameworks
              .filter(css => selectedFrameworkInfo.supportedCSSFrameworks.includes(css.id))
              .map((cssFramework) => (
                <button
                  key={cssFramework.id}
                  onClick={() => onCSSFrameworkChange(cssFramework.id)}
                  className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                    selectedCSSFramework === cssFramework.id
                      ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500'
                      : 'bg-gray-800/30 hover:bg-gray-700/30 border border-gray-700'
                  }`}
                >
                  <div className="text-sm font-medium text-gray-300">{cssFramework.name}</div>
                  <div className="text-xs text-gray-500 mt-1">{cssFramework.description}</div>
                </button>
              ))}
          </div>
        </div>
      )}
      {Object.keys(filteredFrameworks).length === 0 && searchTerm && (
        <div className="text-center py-8">
          <div className="text-gray-500 text-sm">
            Aucun framework trouvé pour "{searchTerm}"
          </div>
        </div>
      )}
    </div>
  );
};