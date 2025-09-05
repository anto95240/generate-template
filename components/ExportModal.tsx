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
    format: 'single',
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

          {/* Info Export */}
          <div className="p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
            <div className="flex items-center gap-2 mb-2">
              <FileCode className="w-5 h-5 text-cyan-400" />
              <span className="text-sm font-medium text-cyan-300">Export fichier unique</span>
            </div>
            <p className="text-xs text-cyan-200/80">
              Votre interface sera exportée dans un fichier complet avec tout le code nécessaire selon le framework choisi.
            </p>
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