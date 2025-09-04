import React, { useState } from 'react';
import { componentTemplates } from '@/data/componentTemplates';
import { themes } from '@/data/themes';
import { getTemplatesByCategory, getRandomTemplate } from '@/data/templates';
import { FrameworkSelector } from './FrameworkSelector';
import { ComponentVariantSelector } from './ComponentVariantSelector';
import { FileImporter } from './FileImporter';
import { Framework, Template } from '@/types';
import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';
import { Palette, Code, Wand2, Download, Settings, Layers, Shuffle, BookTemplate as FileTemplate, ChevronDown, Search, Upload } from 'lucide-react';

interface SidebarProps {
  selectedFramework: Framework;
  onFrameworkChange: (framework: Framework) => void;
  selectedTheme: string;
  onThemeChange: (themeId: string) => void;
  onAddComponent: (type: any) => void;
  onAIGenerate: () => void;
  onExport: () => void;
  onLoadTemplate: (template: Template) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  selectedFramework,
  onFrameworkChange,
  selectedTheme,
  onThemeChange,
  onAddComponent,
  onAIGenerate,
  onExport,
  onLoadTemplate,
}) => {
  const [activeSection, setActiveSection] = useState<'components' | 'templates'>('components');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['landing']);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedComponentType, setSelectedComponentType] = useState<any>(null);
  const [showImporter, setShowImporter] = useState(false);

  const templateCategories = getTemplatesByCategory();
  
  const filteredTemplates = Object.entries(templateCategories).reduce((acc, [category, categoryTemplates]) => {
    const filtered = categoryTemplates.filter(template =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {} as Record<string, Template[]>);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleRandomTemplate = () => {
    const randomTemplate = getRandomTemplate();
    onLoadTemplate(randomTemplate);
  };

  const handleComponentClick = (template: any) => {
    if (template.presets.length > 1) {
      setSelectedComponentType(template);
    } else {
      onAddComponent(template.type);
    }
  };

  const handleVariantSelect = (variant: any) => {
    if (selectedComponentType) {
      onAddComponent({
      type: selectedComponentType.type,
      props: variant.props,
      style: variant.style,
      animations: variant.animations || [],
    });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'landing': return '🚀';
      case 'dashboard': return '📊';
      case 'ecommerce': return '🛒';
      case 'blog': return '📝';
      case 'portfolio': return '🎨';
      case 'app': return '📱';
      default: return '📄';
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'landing': return 'Landing Pages';
      case 'dashboard': return 'Dashboards';
      case 'ecommerce': return 'E-commerce';
      case 'blog': return 'Blogs';
      case 'portfolio': return 'Portfolios';
      case 'app': return 'Applications';
      default: return category;
    }
  };

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
          <div className="space-y-2 max-h-48 overflow-y-auto">
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
                  <div className="flex-1">
                    <div className="text-gray-300 text-sm font-medium">{theme.name}</div>
                    <div className="text-xs text-gray-500">
                      {theme.effects.glow && '✨ Glow'} 
                      {theme.effects.glassmorphism && ' 🔮 Glass'} 
                      {theme.effects.neon && ' ⚡ Neon'}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Section Toggle */}
        <div className="flex mb-6 bg-gray-800/30 rounded-lg p-1">
          <button
            onClick={() => setActiveSection('components')}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              activeSection === 'components' 
                ? 'bg-cyan-500 text-white' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <Layers className="w-4 h-4" />
            Composants
          </button>
          <button
            onClick={() => setActiveSection('templates')}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
              activeSection === 'templates' 
                ? 'bg-purple-500 text-white' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            <FileTemplate className="w-4 h-4" />
            Templates
          </button>
        </div>

        {/* Components Section */}
        {activeSection === 'components' && (
          <div className="mb-8">
            <div className="grid grid-cols-2 gap-2">
              {componentTemplates.map((template) => {
                // Force TypeScript à considérer IconComponent comme un composant JSX valide
                const IconComponent = (LucideIcons[template.icon as keyof typeof LucideIcons] || LucideIcons.Square) as React.ComponentType<LucideProps>;

                return (
                  <button
                    key={template.type}
                    onClick={() => handleComponentClick(template)}
                    className="p-4 bg-gray-800/30 hover:bg-gray-700/50 rounded-lg border border-gray-700 hover:border-cyan-500/50 transition-all duration-200 group"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                      <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
                        {template.name}
                      </span>
                      {template.presets.length > 1 && (
                        <span className="text-xs text-cyan-400 opacity-75">
                          {template.presets.length} variantes
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Templates Section */}
        {activeSection === 'templates' && (
          <div className="mb-8">
            {/* Search Templates */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un template..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            {/* Random Template Button */}
            <button
              onClick={handleRandomTemplate}
              className="w-full p-3 mb-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Shuffle className="w-4 h-4" />
              Template Aléatoire
            </button>

            {/* Template Categories */}
            <div className="space-y-3">
              {Object.entries(filteredTemplates).map(([category, categoryTemplates]) => (
                <div key={category}>
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full flex items-center justify-between p-3 bg-gray-800/30 hover:bg-gray-700/50 rounded-lg transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{getCategoryIcon(category)}</span>
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-300">
                          {getCategoryName(category)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {categoryTemplates.length} template{categoryTemplates.length > 1 ? 's' : ''}
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
                    <div className="mt-2 space-y-2 pl-2">
                      {categoryTemplates.map((template) => (
                        <button
                          key={template.id}
                          onClick={() => onLoadTemplate(template)}
                          className="w-full p-3 rounded-lg text-left transition-all duration-200 bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700 hover:border-purple-500/50"
                        >
                          <div className="flex items-start gap-3">
                            <FileTemplate className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm">{template.name}</div>
                              <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                                {template.description}
                              </div>
                              <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs px-2 py-1 bg-gray-700 rounded text-gray-400">
                                  {template.framework}
                                </span>
                                <span className="text-xs px-2 py-1 bg-gray-700 rounded text-gray-400">
                                  {template.components.length} composants
                                </span>
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {Object.keys(filteredTemplates).length === 0 && searchTerm && (
              <div className="text-center py-8">
                <div className="text-gray-500 text-sm">
                  Aucun template trouvé pour "{searchTerm}"
                </div>
              </div>
            )}
          </div>
        )}

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

        {/* File Import */}
        <div className="mb-8">
          <button
            onClick={() => setShowImporter(true)}
            className="w-full p-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
          >
            <Upload className="w-4 h-4" />
            Importer Code
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

      {/* Component Variant Selector */}
      {selectedComponentType && (
        <ComponentVariantSelector
          componentType={selectedComponentType.type}
          template={selectedComponentType}
          onSelectVariant={handleVariantSelect}
          onClose={() => setSelectedComponentType(null)}
        />
      )}

      {/* File Importer */}
      {showImporter && (
        <FileImporter
          onImport={(framework, components) => {
            onFrameworkChange(framework);
            // Logique pour charger les composants importés
            console.log('Imported:', framework, components);
          }}
          onClose={() => setShowImporter(false)}
        />
      )}
    </div>
  );
};