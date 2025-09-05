'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Component, Position } from '@/types';
import { ComponentRenderer } from './ComponentRenderer';
import { Grid, Move, Layers } from 'lucide-react';

interface CanvasProps {
  components: Component[];
  onComponentUpdate: (componentId: string, updates: Partial<Component>) => void;
  onComponentSelect: (componentId: string | null) => void;
  selectedComponentId: string | null;
  theme: any;
}

export const Canvas: React.FC<CanvasProps> = ({
  components,
  onComponentUpdate,
  onComponentSelect,
  selectedComponentId,
  theme,
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState(true);

  const handleMouseDown = useCallback((e: React.MouseEvent, componentId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    onComponentSelect(componentId);
    setIsDragging(true);
    
    const component = components.find(c => c.id === componentId);
    if (component && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left - component.position.x,
        y: e.clientY - rect.top - component.position.y,
      });
    }
  }, [components, onComponentSelect]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !selectedComponentId || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const newPosition: Position = {
      x: Math.max(0, e.clientX - rect.left - dragOffset.x),
      y: Math.max(0, e.clientY - rect.top - dragOffset.y),
      width: components.find(c => c.id === selectedComponentId)?.position.width || 200,
      height: components.find(c => c.id === selectedComponentId)?.position.height || 40,
    };

    onComponentUpdate(selectedComponentId, { position: newPosition });
  }, [isDragging, selectedComponentId, dragOffset, components, onComponentUpdate]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleCanvasClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onComponentSelect(null);
    }
  }, [onComponentSelect]);

  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Canvas Controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <button
          onClick={() => setShowGrid(!showGrid)}
          className={`p-2 rounded-lg backdrop-blur-sm border transition-all duration-200 ${
            showGrid 
              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' 
              : 'bg-gray-800/50 border-gray-600 text-gray-400 hover:text-gray-300'
          }`}
        >
          <Grid className="w-4 h-4" />
        </button>
      </div>

      {/* Canvas */}
      <div
        ref={canvasRef}
        className="w-full h-full relative cursor-crosshair"
        style={{ 
          backgroundColor: theme?.colors.background || '#0A0A0F',
          backgroundImage: showGrid ? 
            `radial-gradient(circle at 1px 1px, rgba(0, 212, 255, 0.1) 1px, transparent 0)` : 'none',
          backgroundSize: showGrid ? '20px 20px' : 'none',
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleCanvasClick}
      >
        {components.map((component) => (
          <div
            key={component.id}
            data-component-id={component.id}
            className={`absolute cursor-move transition-all duration-200 ${
              selectedComponentId === component.id ? 'ring-2 ring-cyan-400 ring-opacity-60' : ''
            } ${
              component.animations?.map(anim => `animate-${anim.name}`).join(' ') || ''
            }`}
            style={{
              left: component.position.x,
              top: component.position.y,
              width: component.position.width,
              height: component.position.height,
              zIndex: selectedComponentId === component.id ? 1000 : 1,
              animationDuration: component.animations?.[0]?.duration || '1s',
              animationTimingFunction: component.animations?.[0]?.timing || 'ease-in-out',
              animationDelay: component.animations?.[0]?.delay || '0s',
              animationIterationCount: component.animations?.[0]?.iteration || '1',
            }}
            onMouseDown={(e) => handleMouseDown(e, component.id)}
          >
            <ComponentRenderer component={component} theme={theme} />
            {selectedComponentId === component.id && (
              <div className="absolute -top-6 left-0 flex items-center gap-1 px-2 py-1 bg-cyan-500 text-white text-xs rounded">
                <Move className="w-3 h-3" />
                {component.name}
              </div>
            )}
          </div>
        ))}

        {components.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center">
                <Layers className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-gray-400 text-lg font-medium mb-2">Canvas vide</h3>
              <p className="text-gray-500 text-sm">
                Ajoutez des composants depuis la barre latérale pour commencer
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};