'use client';

import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Eye } from 'lucide-react';

interface AnimationPreviewProps {
  animations: any[];
  onAnimationUpdate: (animations: any[]) => void;
}

export const AnimationPreview: React.FC<AnimationPreviewProps> = ({
  animations,
  onAnimationUpdate,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedAnimation, setSelectedAnimation] = useState<string | null>(null);

  const animationPresets = [
    { name: 'fadeIn', label: 'Fade In', demo: 'opacity: 0 → 1' },
    { name: 'slideIn', label: 'Slide In', demo: 'translateX(-100%) → 0' },
    { name: 'bounce', label: 'Bounce', demo: 'translateY(0) → -30px → 0' },
    { name: 'pulse', label: 'Pulse', demo: 'scale(1) → 1.05 → 1' },
    { name: 'shake', label: 'Shake', demo: 'translateX(-10px) → 10px' },
    { name: 'rotate', label: 'Rotate', demo: 'rotate(0deg) → 360deg' },
    { name: 'scale', label: 'Scale', demo: 'scale(1) → 1.1 → 1' },
    { name: 'glow', label: 'Glow', demo: 'box-shadow intensity' },
  ];

  const addAnimation = (preset: any) => {
    const newAnimation = {
      name: preset.name,
      duration: '0.6s',
      timing: 'ease-in-out',
      delay: '0s',
      iteration: '1',
    };
    onAnimationUpdate([...animations, newAnimation]);
  };

  const removeAnimation = (index: number) => {
    onAnimationUpdate(animations.filter((_, i) => i !== index));
  };

  const updateAnimation = (index: number, updates: any) => {
    const newAnimations = [...animations];
    newAnimations[index] = { ...newAnimations[index], ...updates };
    onAnimationUpdate(newAnimations);
  };

  const playPreview = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Animation Controls */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-300">Animations</h4>
        <div className="flex gap-2">
          <button
            onClick={playPreview}
            className="p-2 bg-green-600 hover:bg-green-500 text-white rounded transition-colors"
            title="Prévisualiser"
          >
            {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
          </button>
          <button
            onClick={() => onAnimationUpdate([])}
            className="p-2 bg-red-600 hover:bg-red-500 text-white rounded transition-colors"
            title="Réinitialiser"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Animation Presets */}
      <div>
        <label className="block text-xs text-gray-400 mb-2">Ajouter une animation</label>
        <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
          {animationPresets.map((preset) => (
            <button
              key={preset.name}
              onClick={() => addAnimation(preset)}
              className="p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded text-left transition-colors"
            >
              <div className="text-xs font-medium text-gray-300">{preset.label}</div>
              <div className="text-xs text-gray-500 truncate">{preset.demo}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Current Animations */}
      {animations.length > 0 && (
        <div className="space-y-3">
          <label className="block text-xs text-gray-400">Animations actives</label>
          {animations.map((animation, index) => (
            <div
              key={index}
              className={`p-3 bg-gray-800/50 rounded-lg border border-gray-700 transition-all duration-200 ${
                isPlaying ? 'animate-pulse' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300 font-medium">
                  {animation.name}
                </span>
                <button
                  onClick={() => removeAnimation(index)}
                  className="text-red-400 hover:text-red-300 text-xs"
                >
                  Supprimer
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Durée</label>
                  <input
                    type="text"
                    value={animation.duration}
                    onChange={(e) => updateAnimation(index, { duration: e.target.value })}
                    placeholder="0.6s"
                    className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Timing</label>
                  <select
                    value={animation.timing}
                    onChange={(e) => updateAnimation(index, { timing: e.target.value })}
                    className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-xs focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="ease">Ease</option>
                    <option value="ease-in">Ease In</option>
                    <option value="ease-out">Ease Out</option>
                    <option value="ease-in-out">Ease In Out</option>
                    <option value="linear">Linear</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Délai</label>
                  <input
                    type="text"
                    value={animation.delay || '0s'}
                    onChange={(e) => updateAnimation(index, { delay: e.target.value })}
                    placeholder="0s"
                    className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-xs focus:border-cyan-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Répétition</label>
                  <select
                    value={animation.iteration || '1'}
                    onChange={(e) => updateAnimation(index, { iteration: e.target.value })}
                    className="w-full px-2 py-1 bg-gray-800 border border-gray-600 rounded text-white text-xs focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="1">1 fois</option>
                    <option value="2">2 fois</option>
                    <option value="3">3 fois</option>
                    <option value="infinite">Infini</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {animations.length === 0 && (
        <div className="text-center py-6 text-gray-500 text-sm">
          <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
          Aucune animation. Sélectionnez-en une ci-dessus.
        </div>
      )}
    </div>
  );
};