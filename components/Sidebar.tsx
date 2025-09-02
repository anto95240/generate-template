import React from 'react';
import { componentTemplates } from '@/data/componentTemplates';
import { themes } from '@/data/themes';
import { FrameworkSelector } from './FrameworkSelector';
import { Framework, Theme } from '@/types';
import { 
  Palette, 
  Code, 
  Wand2,
  Download,
  Settings,
  Layers
} from 'lucide-react';

interface SidebarProps {
  selectedFramework: Framework;
  onFrameworkChange: (framework: Framework) => void;
  selectedTheme: string;
  onThemeChange: (themeId: string) => void;
  onAddComponent: (type: any) => void;
  onAIGenerate: () => void;
  onExport: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedFramework,
  onFrameworkChange,
  selectedTheme,
  onThemeChange,
  onAddComponent,
  onAIGenerate,
  onExport,
}) => {

  return (
    <div className="w-80 bg-gradient-to-b from-gray-900 to-black border-r border-cyan-500/30 h-full overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
            <Code className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            FutureUI Gen
          </h1>
        </div>

        {/* Framework Selection */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-medium text-gray-300">Framework</h3>
          </div>
          <FrameworkSelector
            selectedFramework={selectedFramework}
            onFrameworkChange={onFrameworkChange}
          />
        </div>

        {/* Theme Selection */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-medium text-gray-300">Thèmes</h3>
          </div>
          <div className="space-y-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => onThemeChange(theme.id)}
                className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                  selectedTheme === theme.id
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500'
                    : 'bg-gray-800/30 hover:bg-gray-700/30 border border-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full border border-gray-600"
                    style={{ backgroundColor: theme.colors.primary }}
                  />
                  <span className="text-gray-300 text-sm">{theme.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Components */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-medium text-gray-300">Composants</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {componentTemplates.map((template) => {
              const IconComponent = require('lucide-react')[template.icon];
              return (
                <button
                  key={template.type}
                  onClick={() => onAddComponent(template.type)}
                  className="p-4 bg-gray-800/30 hover:bg-gray-700/50 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group"
                >
                  <div className="flex flex-col items-center gap-2">
                    <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                    <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                      {template.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* AI Generation */}
        <div className="mb-8">
          <button
            onClick={onAIGenerate}
            className="w-full p-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/25"
          >
            <Wand2 className="w-4 h-4" />
            Générer avec IA
          </button>
        </div>

        {/* Export */}
        <div>
          <button
            onClick={onExport}
            className="w-full p-4 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-green-500/25"
          >
            <Download className="w-4 h-4" />
            Télécharger Code
          </button>
        </div>
      </div>
    </div>
  );
};