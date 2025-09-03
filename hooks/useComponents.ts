'use client';

import { useState, useCallback } from 'react';
import { Component, ComponentType, Framework, Template } from '@/types';
import { componentTemplates } from '@/data/componentTemplates';

export const useComponents = (framework: Framework) => {
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

  const addComponent = useCallback((type: ComponentType, customComponent?: Partial<Component>) => {
    const template = componentTemplates.find(t => t.type === type);
    if (!template) return;

    const newComponent: Component = customComponent ? {
      id: customComponent.id || `${type}-${Date.now()}`,
      type,
      name: customComponent.name || template.name,
      props: customComponent.props || { ...template.defaultProps },
      style: customComponent.style || template.presets[0]?.style || {},
      position: customComponent.position || {
        x: Math.random() * 300 + 50,
        y: Math.random() * 200 + 50,
        width: type === 'navbar' ? 600 : 
               type === 'hero' ? 800 :
               type === 'aside' ? 250 :
               type === 'footer' ? 800 :
               type === 'card' ? 300 : 200,
        height: type === 'navbar' ? 60 : 
                type === 'hero' ? 400 :
                type === 'aside' ? 600 :
                type === 'footer' ? 120 :
                type === 'card' ? 200 : 40,
      },
      framework,
      animations: customComponent.animations || [],
    } : {
      id: `${type}-${Date.now()}`,
      type,
      name: template.name,
      props: { ...template.defaultProps },
      style: template.presets[0]?.style || {},
      position: {
        x: Math.random() * 300 + 50,
        y: Math.random() * 200 + 50,
        width: type === 'navbar' ? 600 : 
               type === 'hero' ? 800 :
               type === 'aside' ? 250 :
               type === 'footer' ? 800 :
               type === 'card' ? 300 : 200,
        height: type === 'navbar' ? 60 : 
                type === 'hero' ? 400 :
                type === 'aside' ? 600 :
                type === 'footer' ? 120 :
                type === 'card' ? 200 : 40,
      },
      framework,
      animations: [],
    };

    setComponents(prev => [...prev, newComponent]);
    setSelectedComponentId(newComponent.id);
  }, [framework]);

  const updateComponent = useCallback((componentId: string, updates: Partial<Component>) => {
    setComponents(prev => 
      prev.map(component => 
        component.id === componentId 
          ? { ...component, ...updates }
          : component
      )
    );
  }, []);

  const deleteComponent = useCallback((componentId: string) => {
    setComponents(prev => prev.filter(c => c.id !== componentId));
    if (selectedComponentId === componentId) {
      setSelectedComponentId(null);
    }
  }, [selectedComponentId]);

  const duplicateComponent = useCallback((componentId: string) => {
    const component = components.find(c => c.id === componentId);
    if (!component) return;

    const newComponent: Component = {
      ...component,
      id: `${component.type}-${Date.now()}`,
      position: {
        ...component.position,
        x: component.position.x + 20,
        y: component.position.y + 20,
      },
    };

    setComponents(prev => [...prev, newComponent]);
    setSelectedComponentId(newComponent.id);
  }, [components]);

  const clearCanvas = useCallback(() => {
    setComponents([]);
    setSelectedComponentId(null);
  }, []);

  const loadTemplate = useCallback((template: Template) => {
    clearCanvas();
    
    // Charger les composants du template
    template.components.forEach((comp, index) => {
      setTimeout(() => {
        const component: Component = {
          ...comp,
          id: `${comp.type}-${Date.now()}-${index}`,
          framework,
        };
        setComponents(prev => [...prev, component]);
      }, index * 100);
    });
  }, [framework, clearCanvas]);

  const selectedComponent = components.find(c => c.id === selectedComponentId) || null;

  return {
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
  };
};