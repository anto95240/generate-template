'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Canvas } from '@/components/Canvas';
import { PropertyPanel } from '@/components/PropertyPanel';
import { AIModal } from '@/components/AIModal';
import { useComponents } from '@/hooks/useComponents';
import { themes } from '@/data/themes';
import { Framework, ComponentType } from '@/types';
import { exportProject } from '@/utils/exportUtils';

function Home() {
  const [selectedFramework, setSelectedFramework] = useState<Framework>('react');
  const [selectedThemeId, setSelectedThemeId] = useState('cyberpunk');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);

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
  } = useComponents(selectedFramework);

  const selectedTheme = themes.find(t => t.id === selectedThemeId) || themes[0];

  const handleAddComponent = (type: ComponentType) => {
    addComponent(type);
  };

  const handleAIGenerate = async (prompt: string) => {
    // Simulation de génération IA
    console.log('Génération IA avec prompt:', prompt);
    
    // Pour l'instant, on ajoute un composant aléatoire
    const types: ComponentType[] = ['button', 'card', 'input'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    addComponent(randomType);
  };

  const handleExport = () => {
    exportProject(components, selectedFramework, selectedTheme);
  };

  return (
    <div className="h-screen bg-black flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        selectedFramework={selectedFramework}
        onFrameworkChange={setSelectedFramework}
        selectedTheme={selectedThemeId}
        onThemeChange={setSelectedThemeId}
        onAddComponent={handleAddComponent}
        onAIGenerate={() => setIsAIModalOpen(true)}
        onExport={handleExport}
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