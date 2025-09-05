'use client';

import React, { useRef, useState } from 'react';
import { Upload, FileText, Image as ImageIcon, Code } from 'lucide-react';

interface FileImporterProps {
  onFileImport: (content: string, fileName: string, fileType: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function FileImporter({ onFileImport, isOpen, onClose }: FileImporterProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = async (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const content = await readFileContent(file);
      const fileType = getFileType(file.name);
      onFileImport(content, file.name, fileType);
    }
  };

  const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

  const getFileType = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'html':
      case 'htm':
        return 'html';
      case 'css':
        return 'css';
      case 'js':
      case 'jsx':
        return 'javascript';
      case 'ts':
      case 'tsx':
        return 'typescript';
      case 'vue':
        return 'vue';
      case 'json':
        return 'json';
      case 'svg':
        return 'svg';
      default:
        return 'text';
    }
  };

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
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 w-96 max-w-90vw">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Importer des fichiers</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-cyan-400 bg-cyan-400/10'
              : 'border-gray-600 hover:border-gray-500'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto mb-4 text-gray-400" size={48} />
          <p className="text-white mb-2">Glissez-déposez vos fichiers ici</p>
          <p className="text-gray-400 text-sm mb-4">ou</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded transition-colors"
          >
            Sélectionner des fichiers
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".html,.css,.js,.jsx,.ts,.tsx,.vue,.json,.svg,.txt"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>

        <div className="mt-4 text-sm text-gray-400">
          <p className="mb-2">Formats supportés:</p>
          <div className="flex flex-wrap gap-2">
            {[
              { icon: FileText, label: 'HTML' },
              { icon: Code, label: 'CSS' },
              { icon: Code, label: 'JS/TS' },
              { icon: ImageIcon, label: 'SVG' },
              { icon: FileText, label: 'JSON' }
            ].map((format, index) => (
              <div key={index} className="flex items-center gap-1 px-2 py-1 bg-gray-800 rounded">
                <format.icon size={14} />
                <span>{format.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}