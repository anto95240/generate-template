'use client';

import React, { useState } from 'react';
import { X, Download, FileCode, Package, Settings } from 'lucide-react';
import { ExportOptions } from '@/types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (options: ExportOptions) => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, onExport }) => {
  const [options, setOptions] = useState<ExportOptions>({
    fileName: 'my-ui-project',
    includeAssets: true,
    minify: false,
    format: 'modular',
  });

  if (!isOpen) return null;

  const handleExport = () => {
    onExport(options);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-2xl p-8 max-w-lg w-full mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Download className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Exporter le projet</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* File Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nom du fichier
            </label>
            <input
              type="text"
              value={options.fileName}
              onChange={(e) => setOptions(prev => ({ ...prev, fileName: e.target.value }))}
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
              placeholder="mon-projet-ui"
            />
          </div>

          {/* Format */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Format d'export
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-700/30 transition-colors">
                <input
                  type="radio"
                  name="format"
                  value="single"
                  checked={options.format === 'single'}
                  onChange={(e) => setOptions(prev => ({ ...prev, format: e.target.value as 'single' | 'modular' }))}
                  className="w-4 h-4 text-cyan-500"
                />
                <FileCode className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm font-medium text-gray-300">Fichier unique</div>
                  <div className="text-xs text-gray-500">Tout le code dans un seul fichier</div>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-700/30 transition-colors">
                <input
                  type="radio"
                  name="format"
                  value="modular"
                  checked={options.format === 'modular'}
                  onChange={(e) => setOptions(prev => ({ ...prev, format: e.target.value as 'single' | 'modular' }))}
                  className="w-4 h-4 text-cyan-500"
                />
                <Package className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-sm font-medium text-gray-300">Projet modulaire</div>
                  <div className="text-xs text-gray-500">Structure de projet complète avec composants séparés</div>
                </div>
              </label>
            </div>
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Options
            </label>
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={options.includeAssets}
                  onChange={(e) => setOptions(prev => ({ ...prev, includeAssets: e.target.checked }))}
                  className="w-4 h-4 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500"
                />
                <span className="text-sm text-gray-300">Inclure les assets (CSS, images)</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={options.minify}
                  onChange={(e) => setOptions(prev => ({ ...prev, minify: e.target.checked }))}
                  className="w-4 h-4 text-cyan-500 bg-gray-800 border-gray-600 rounded focus:ring-cyan-500"
                />
                <span className="text-sm text-gray-300">Minifier le code</span>
              </label>
            </div>
          </div>

          {/* Preview */}
          <div className="p-4 bg-gray-800/30 rounded-lg border border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-300">Aperçu de l'export</span>
            </div>
            <div className="text-xs text-gray-500 space-y-1">
              <div>📁 {options.fileName}/</div>
              {options.format === 'modular' ? (
                <>
                  <div>├── 📄 index.html</div>
                  <div>├── 📁 components/</div>
                  <div>├── 📁 styles/</div>
                  {options.includeAssets && <div>├── 📁 assets/</div>}
                  <div>└── 📄 README.md</div>
                </>
              ) : (
                <div>└── 📄 {options.fileName}.html</div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-200"
          >
            Annuler
          </button>
          <button
            onClick={handleExport}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Exporter
          </button>
        </div>
      </div>
    </div>
  );
};