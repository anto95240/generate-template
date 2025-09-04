'use client';

import React, { useState, useRef } from 'react';
import { X, Upload, FileCode, AlertCircle, CheckCircle } from 'lucide-react';
import { Framework } from '@/types';

interface FileImporterProps {
  onImport: (framework: Framework, components: any[]) => void;
  onClose: () => void;
}

export const FileImporter: React.FC<FileImporterProps> = ({ onImport, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<{
    framework: Framework | null;
    components: any[];
    confidence: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    setFile(file);
    setError(null);
    
    try {
      const content = await file.text();
      const result = analyzeCode(content, file.name);
      setAnalysis(result);
    } catch (err) {
      setError('Erreur lors de la lecture du fichier');
    }
  };

  const analyzeCode = (content: string, filename: string): {
    framework: Framework | null;
    components: any[];
    confidence: number;
  } => {
    let framework: Framework | null = null;
    let confidence = 0;
    const components: any[] = [];

    // Détection du framework
    if (filename.endsWith('.dart') || content.includes('import \'package:flutter/')) {
      framework = 'flutter';
      confidence = 95;
    } else if (filename.endsWith('.tsx') || filename.endsWith('.jsx')) {
      if (content.includes('import Head from \'next/head\'') || content.includes('next/')) {
        framework = 'nextjs';
        confidence = 90;
      } else {
        framework = 'react';
        confidence = 85;
      }
    } else if (filename.endsWith('.vue')) {
      if (content.includes('nuxt') || content.includes('useNuxt')) {
        framework = 'nuxtjs';
        confidence = 90;
      } else {
        framework = 'vue';
        confidence = 85;
      }
    } else if (filename.endsWith('.component.ts') || content.includes('@Component')) {
      framework = 'angular';
      confidence = 90;
    } else if (filename.endsWith('.svelte')) {
      framework = 'svelte';
      confidence = 90;
    } else if (filename.endsWith('.twig')) {
      framework = 'symfony';
      confidence = 90;
    } else if (filename.endsWith('.blade.php')) {
      framework = 'laravel';
      confidence = 90;
    } else if (content.includes('{% extends') || content.includes('{{ ')) {
      framework = 'django';
      confidence = 80;
    } else if (filename.endsWith('.erb')) {
      framework = 'rails';
      confidence = 90;
    } else if (filename.endsWith('.ejs')) {
      framework = 'express';
      confidence = 85;
    } else if (content.includes('<!DOCTYPE html>')) {
      framework = 'html';
      confidence = 70;
    }

    // Analyse des composants
    const componentPatterns = [
      { pattern: /button|Button|ElevatedButton/gi, type: 'button' },
      { pattern: /nav|navbar|AppBar/gi, type: 'navbar' },
      { pattern: /card|Card/gi, type: 'card' },
      { pattern: /form|Form/gi, type: 'form' },
      { pattern: /input|Input|TextField/gi, type: 'input' },
      { pattern: /table|Table|DataTable/gi, type: 'table' },
      { pattern: /grid|Grid/gi, type: 'grid' },
      { pattern: /hero|Hero/gi, type: 'hero' },
      { pattern: /footer|Footer/gi, type: 'footer' },
      { pattern: /aside|sidebar|Drawer/gi, type: 'aside' },
    ];

    componentPatterns.forEach(({ pattern, type }) => {
      const matches = content.match(pattern);
      if (matches && matches.length > 0) {
        components.push({
          type,
          count: matches.length,
          detected: true,
        });
      }
    });

    return { framework, components, confidence };
  };

  const handleImport = () => {
    if (analysis && analysis.framework) {
      onImport(analysis.framework, analysis.components);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
              <Upload className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Importer du code</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drop Zone */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            dragActive 
              ? 'border-cyan-500 bg-cyan-500/10' 
              : 'border-gray-600 hover:border-gray-500'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <FileCode className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-300 mb-2">
            Glissez-déposez votre fichier de code ici
          </p>
          <p className="text-gray-500 text-sm mb-4">
            Formats supportés: .tsx, .jsx, .vue, .dart, .html, .twig, .blade.php, etc.
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Choisir un fichier
          </button>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileInput}
            accept=".tsx,.jsx,.vue,.dart,.html,.twig,.blade.php,.erb,.ejs,.py,.rb,.php,.js,.ts,.svelte"
            className="hidden"
          />
        </div>

        {/* File Analysis */}
        {file && (
          <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
            <div className="flex items-center gap-2 mb-3">
              <FileCode className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-300">Analyse du fichier</span>
            </div>
            
            <div className="text-sm text-gray-400 mb-3">
              <strong>Nom:</strong> {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </div>

            {analysis ? (
              <div className="space-y-3">
                {analysis.framework ? (
                  <div className="flex items-center gap-2 text-green-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">
                      Framework détecté: <strong>{analysis.framework}</strong> ({analysis.confidence}% de confiance)
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-yellow-400">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">Framework non détecté automatiquement</span>
                  </div>
                )}

                {analysis.components.length > 0 && (
                  <div>
                    <span className="text-sm text-gray-300">Composants détectés:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {analysis.components.map((comp, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded"
                        >
                          {comp.type} {comp.count && `(${comp.count})`}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm">Analyse en cours...</span>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-red-900/30 border border-red-500/50 rounded-lg">
            <div className="flex items-center gap-2 text-red-400">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-all duration-200"
          >
            Annuler
          </button>
          <button
            onClick={handleImport}
            disabled={!analysis?.framework}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:from-gray-600 disabled:to-gray-700 text-white rounded-lg transition-all duration-200"
          >
            Importer
          </button>
        </div>
      </div>
    </div>
  );
};