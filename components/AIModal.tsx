'use client';

import React, { useState } from 'react';
import { X, Sparkles, Send } from 'lucide-react';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (prompt: string) => void;
}

export const AIModal: React.FC<AIModalProps> = ({ isOpen, onClose, onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      await onGenerate(prompt);
      setPrompt('');
      onClose();
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const examplePrompts = [
    "Créer une navbar moderne avec logo et menu responsive",
    "Générer une carte de produit avec image et bouton d'achat",
    "Faire un footer avec liens sociaux et informations de contact",
    "Créer un formulaire de contact élégant avec validation",
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Génération IA</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Décrivez le composant que vous souhaitez générer
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex: Créer un bouton CTA avec effet néon et animation hover..."
            rows={4}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none resize-none"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Exemples de prompts</h3>
          <div className="space-y-2">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                onClick={() => setPrompt(example)}
                className="w-full text-left p-3 bg-gray-800/30 hover:bg-gray-700/50 border border-gray-700 hover:border-cyan-500/50 rounded-lg text-sm text-gray-300 transition-all duration-200"
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-200"
          >
            Annuler
          </button>
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Génération...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Générer
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};