'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Canvas } from '@/components/Canvas';
import { PropertyPanel } from '@/components/PropertyPanel';
import { AIModal } from '@/components/AIModal';
import { ExportModal } from '@/components/ExportModal';
import { FileImporter } from '@/components/FileImporter';
import { VariantSelector } from '@/components/VariantSelector';
import { IconSelector } from '@/components/IconSelector';
import { useComponents } from '@/hooks/useComponents';
import { allThemes } from '@/data/themes';
import { Framework, ComponentType, Template, ExportOptions, CSSFramework } from '@/types';
import { exportProject } from '@/utils/exportUtils';
import { AIService } from '@/services/aiService';

function Home() {
  const [selectedFramework, setSelectedFramework] = useState<Framework>('react');
  const [selectedCSSFramework, setSelectedCSSFramework] = useState<CSSFramework>('vanilla');
  const [selectedThemeId, setSelectedThemeId] = useState('cyberpunk');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isFileImporterOpen, setIsFileImporterOpen] = useState(false);
  const [isVariantSelectorOpen, setIsVariantSelectorOpen] = useState(false);
  const [isIconSelectorOpen, setIsIconSelectorOpen] = useState(false);
  const [selectedComponentTypeForVariant, setSelectedComponentTypeForVariant] = useState<ComponentType | null>(null);

  const {
    components,
    selectedComponent,
    selectedComponentId,
    addComponent,
    updateComponent,
    deleteComponent,
    duplicateComponent,
    clearCanvas,
    setSelectedComponentId,
    loadTemplate,
  } = useComponents(selectedFramework);

  const selectedTheme = allThemes.find(t => t.id === selectedThemeId) || allThemes[0];

  const handleAddComponent = (type: ComponentType) => {
    addComponent(type);
  };

  const handleAIGenerate = async (prompt: string, generateFullCanvas?: boolean) => {
    try {
      if (generateFullCanvas) {
        const result = await AIService.generateFullCanvas(prompt);
        if (result.components) {
          // Effacer le canvas et ajouter tous les composants
          clearCanvas();
          result.components.forEach((comp, index) => {
            setTimeout(() => {
              const component = {
                id: `${comp.type}-${Date.now()}-${index}`,
                type: comp.type,
                name: comp.type.charAt(0).toUpperCase() + comp.type.slice(1),
                props: comp.props,
                style: comp.style,
                position: comp.position,
                framework: selectedFramework,
              };
              addComponent(component.type, component);
            }, index * 100); // Délai pour l'effet visuel
          });
        }
      } else {
        const result = await AIService.generateComponent(prompt);
        const component = {
          id: `${result.componentType}-${Date.now()}`,
          type: result.componentType,
          name: result.componentType.charAt(0).toUpperCase() + result.componentType.slice(1),
          props: result.props,
          style: result.style,
          position: {
            x: Math.random() * 300 + 50,
            y: Math.random() * 200 + 50,
            width: result.componentType === 'navbar' ? 600 : 
                   result.componentType === 'hero' ? 800 :
                   result.componentType === 'card' ? 300 : 200,
            height: result.componentType === 'navbar' ? 60 : 
                    result.componentType === 'hero' ? 400 :
                    result.componentType === 'card' ? 200 : 40,
          },
          framework: selectedFramework,
        };
        addComponent(component.type, component);
      }
    } catch (error) {
      console.error('Erreur génération IA:', error);
      alert('Erreur lors de la génération IA: ' + (error as Error).message);
    }
  };

  const handleLoadTemplate = (template: Template) => {
    clearCanvas();
    setSelectedFramework(template.framework);
    setSelectedThemeId(template.theme);
    
    // Charger les composants du template
    template.components.forEach((comp, index) => {
      setTimeout(() => {
        const component = {
          ...comp,
          id: `${comp.type}-${Date.now()}-${index}`,
          framework: template.framework,
        };
        addComponent(component.type, component);
      }, index * 100);
    });
  };

  const handleExport = (options: ExportOptions) => {
    exportProject(components, selectedFramework, selectedTheme, { ...options, cssFramework: selectedCSSFramework });
  };

  const handleFileImport = (content: string, fileName: string, fileType: string) => {
    // Traitement basique de l'importation
    console.log('Fichier importé:', fileName, fileType, content);
    // TODO: Analyser le contenu et créer des composants
  };

  const handleVariantSelect = (variant: any) => {
    if (selectedComponentId) {
      updateComponent(selectedComponentId, { style: { ...selectedComponent?.style, ...variant.style } });
    }
  };

  const handleIconSelect = (icon: any) => {
    if (selectedComponentId) {
      updateComponent(selectedComponentId, { props: { ...selectedComponent?.props, icon: icon.component } });
    }
  };

  return (
    <div className="h-screen bg-black flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        selectedFramework={selectedFramework}
        onFrameworkChange={setSelectedFramework}
        selectedCSSFramework={selectedCSSFramework}
        onCSSFrameworkChange={setSelectedCSSFramework}
        selectedTheme={selectedThemeId}
        onThemeChange={setSelectedThemeId}
        onAddComponent={handleAddComponent}
        onAIGenerate={() => {
          setSelectedComponentId(null);
          setIsAIModalOpen(true);
        }}
        onExport={() => {
          setSelectedComponentId(null);
          setIsExportModalOpen(true);
        }}
        onLoadTemplate={handleLoadTemplate}
        onFileImport={() => {
          setSelectedComponentId(null);
          setIsFileImporterOpen(true);
        }}
        onVariantSelect={(componentType) => {
          setSelectedComponentTypeForVariant(componentType);
          setIsVariantSelectorOpen(true);
        }}
        onIconSelect={() => {
          setIsIconSelectorOpen(true);
        }}
      />

      {/* Main Canvas */}
      <Canvas
        components={components}
        onComponentUpdate={updateComponent}
        onComponentSelect={setSelectedComponentId}
        selectedComponentId={selectedComponentId}
        theme={selectedTheme}
      />

      {/* Property Panel */}
      <PropertyPanel
        selectedComponent={selectedComponent}
        onComponentUpdate={updateComponent}
        onComponentDelete={deleteComponent}
        onComponentDuplicate={duplicateComponent}
      />

      {/* AI Modal */}
      <AIModal
        isOpen={isAIModalOpen}
        onClose={() => setIsAIModalOpen(false)}
        onGenerate={handleAIGenerate}
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />

      {/* File Importer */}
      <FileImporter
        isOpen={isFileImporterOpen}
        onClose={() => setIsFileImporterOpen(false)}
        onFileImport={handleFileImport}
      />

      {/* Variant Selector */}
      {selectedComponentTypeForVariant && (
        <VariantSelector
          componentType={selectedComponentTypeForVariant}
          isOpen={isVariantSelectorOpen}
          onClose={() => {
            setIsVariantSelectorOpen(false);
            setSelectedComponentTypeForVariant(null);
          }}
          onVariantSelect={handleVariantSelect}
        />
      )}

      {/* Icon Selector */}
      <IconSelector
        isOpen={isIconSelectorOpen}
        onClose={() => setIsIconSelectorOpen(false)}
        onIconSelect={handleIconSelect}
      />

      {/* Floating Action Button for Clear */}
      {components.length > 0 && (
        <button
          onClick={clearCanvas}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-red-600/90 hover:bg-red-600 text-white rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 flex items-center gap-2"
        >
          Effacer le canvas
        </button>
      )}
    </div>
  );
}

export default Home;