'use client';

import React from 'react';
import { ComponentTemplate } from '@/data/componentTemplates';
import { ComponentType } from '@/types';

interface ComponentVariantSelectorProps {
  componentType: ComponentType;
  template: ComponentTemplate;
  onSelectVariant: (variant: any) => void;
  onClose: () => void;
}

export const ComponentVariantSelector: React.FC<ComponentVariantSelectorProps> = ({
  componentType,
  template,
  onSelectVariant,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-2xl p-6 max-w-4xl w-full mx-4 shadow-2xl max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">
            Choisir une variante - {template.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {template.presets.map((preset, index) => (
            <button
              key={index}
              onClick={() => {
                onSelectVariant(preset);
                onClose();
              }}
              className="p-4 bg-gray-800/30 hover:bg-gray-700/50 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group text-left"
            >
              <div className="mb-3">
                <div className="w-full h-20 bg-gray-700/30 rounded-lg flex items-center justify-center mb-2 group-hover:bg-gray-600/30 transition-colors">
                  <span className="text-xs text-gray-400">Aperçu {preset.name}</span>
                </div>
                <h3 className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                  {preset.name}
                </h3>
              </div>
              
              <div className="text-xs text-gray-500 space-y-1">
                {Object.entries(preset.props).slice(0, 2).map(([key, value]) => (
                  <div key={key} className="truncate">
                    <span className="text-cyan-400">{key}:</span> {String(value).substring(0, 20)}
                  </div>
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};