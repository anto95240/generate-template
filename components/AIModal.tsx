'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, Send, Zap, RefreshCw, Edit3, Layers } from 'lucide-react';
import { AIToken } from '@/types';

interface AIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (prompt: string, generateFullCanvas?: boolean) => void;
}

export const AIModal: React.FC<AIModalProps> = ({ isOpen, onClose, onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateFullCanvas, setGenerateFullCanvas] = useState(false);
  const [tokens, setTokens] = useState<AIToken>({
    remaining: 45,
    total: 50,
    resetTime: new Date(Date.now() + 3600000), // 1 heure
    model: 'Gemini Pro (Gratuit)',
  });

  useEffect(() => {
    // Simuler la mise à jour des tokens
    const interval = setInterval(() => {
      setTokens(prev => ({
        ...prev,
        remaining: Math.max(0, prev.remaining - Math.random() * 0.1),
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (!prompt.trim() || tokens.remaining <= 0) return;
    
    setIsGenerating(true);
    try {
      await onGenerate(prompt, generateFullCanvas);
      setPrompt('');
      setTokens(prev => ({ ...prev, remaining: Math.max(0, prev.remaining - 1) }));
      onClose();
    } catch (error) {
      console.error('Erreur lors de la génération:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const componentPrompts = [
    "Créer une navbar moderne avec logo et menu responsive",
    "Générer une carte de produit avec image et bouton d'achat",
    "Faire un footer avec liens sociaux et informations de contact",
    "Créer un formulaire de contact élégant avec validation",
    "Générer un bouton CTA avec effet néon et animation hover",
    "Créer une sidebar de navigation pour dashboard admin",
    "Faire une section hero avec titre, sous-titre et bouton",
    "Générer un tableau de données avec tri et pagination",
  ];

  const canvasPrompts = [
    "Créer une landing page complète avec hero, features et footer",
    "Générer un dashboard admin avec sidebar, tableaux et cartes",
    "Faire une page de profil utilisateur avec informations et actions",
    "Créer une interface e-commerce avec produits et panier",
    "Générer un blog avec articles, sidebar et navigation",
    "Faire une page de contact avec formulaire et informations",
    "Créer un portfolio avec galerie de projets et présentation",
    "Générer une app mobile avec navigation et contenu",
  ];

  const currentPrompts = generateFullCanvas ? canvasPrompts : componentPrompts;

  const getTimeUntilReset = () => {
    const now = new Date();
    const diff = tokens.resetTime.getTime() - now.getTime();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
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

        {/* Token Status */}
        <div className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium text-gray-300">Tokens IA</span>
            </div>
            <span className="text-xs text-gray-400">{tokens.model}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-yellow-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(tokens.remaining / tokens.total) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-300">
              {Math.floor(tokens.remaining)}/{tokens.total}
            </span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">
              Réinitialisation dans {getTimeUntilReset()}
            </span>
            {tokens.remaining <= 5 && (
              <span className="text-xs text-yellow-400 flex items-center gap-1">
                <RefreshCw className="w-3 h-3" />
                Bientôt rechargé
              </span>
            )}
          </div>
        </div>

        {/* Generation Mode */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">Mode de génération</label>
          <div className="flex gap-3">
            <button
              onClick={() => setGenerateFullCanvas(false)}
              className={`flex-1 p-3 rounded-lg border transition-all duration-200 ${
                !generateFullCanvas
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                  : 'bg-gray-800/30 border-gray-600 text-gray-400 hover:text-gray-300'
              }`}
            >
              <div className="text-center">
                <Edit3 className="w-5 h-5 mx-auto mb-1" />
                <div className="text-sm font-medium">Composant</div>
                <div className="text-xs opacity-75">Ajouter un élément</div>
              </div>
            </button>
            <button
              onClick={() => setGenerateFullCanvas(true)}
              className={`flex-1 p-3 rounded-lg border transition-all duration-200 ${
                generateFullCanvas
                  ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                  : 'bg-gray-800/30 border-gray-600 text-gray-400 hover:text-gray-300'
              }`}
            >
              <div className="text-center">
                <Zap className="w-5 h-5 mx-auto mb-1" />
                <div className="text-sm font-medium">Canvas complet</div>
                <div className="text-xs opacity-75">Interface complète</div>
              </div>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">
            {generateFullCanvas ? 'Décrivez l\'interface complète' : 'Décrivez le composant'}
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={generateFullCanvas 
              ? "Ex: Créer une landing page moderne avec hero section, section features avec 3 cartes, et footer avec liens sociaux..."
              : "Ex: Créer un bouton CTA avec effet néon et animation hover..."
            }
            rows={4}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none resize-none"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Exemples de prompts</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {currentPrompts.map((example, index) => (
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
            disabled={!prompt.trim() || isGenerating || tokens.remaining <= 0}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Génération...
              </>
            ) : tokens.remaining <= 0 ? (
              <>
                <RefreshCw className="w-4 h-4" />
                Tokens épuisés
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Générer ({Math.floor(tokens.remaining)} tokens)
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};