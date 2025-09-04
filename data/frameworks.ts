import { Framework } from '@/types';

export interface FrameworkInfo {
  id: Framework;
  name: string;
  category: 'frontend' | 'fullstack' | 'backend';
  language: string;
  description: string;
  icon: string;
  fileExtension: string;
  templateType: 'component' | 'template' | 'view';
}

export const frameworks: FrameworkInfo[] = [
  // Frontend Frameworks
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    language: 'JavaScript/TypeScript',
    description: 'Bibliothèque JavaScript pour construire des interfaces utilisateur',
    icon: 'Atom',
    fileExtension: 'tsx',
    templateType: 'component',
  },
  {
    id: 'vue',
    name: 'Vue.js',
    category: 'frontend',
    language: 'JavaScript/TypeScript',
    description: 'Framework JavaScript progressif',
    icon: 'Triangle',
    fileExtension: 'vue',
    templateType: 'component',
  },
  {
    id: 'angular',
    name: 'Angular',
    category: 'frontend',
    language: 'TypeScript',
    description: 'Plateforme de développement pour applications web',
    icon: 'Zap',
    fileExtension: 'ts',
    templateType: 'component',
  },
  {
    id: 'svelte',
    name: 'Svelte',
    category: 'frontend',
    language: 'JavaScript/TypeScript',
    description: 'Framework de compilation pour interfaces utilisateur',
    icon: 'Flame',
    fileExtension: 'svelte',
    templateType: 'component',
  },
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'frontend',
    language: 'Dart',
    description: 'Framework UI pour applications mobiles et web',
    icon: 'Smartphone',
    fileExtension: 'dart',
    templateType: 'component',
  },

  // Fullstack Frameworks
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'fullstack',
    language: 'JavaScript/TypeScript',
    description: 'Framework React pour production',
    icon: 'ArrowRight',
    fileExtension: 'tsx',
    templateType: 'component',
  },
  {
    id: 'nuxtjs',
    name: 'Nuxt.js',
    category: 'fullstack',
    language: 'JavaScript/TypeScript',
    description: 'Framework Vue.js intuitif',
    icon: 'Mountain',
    fileExtension: 'vue',
    templateType: 'component',
  },

  // Backend Frameworks
  {
    id: 'symfony',
    name: 'Symfony',
    category: 'backend',
    language: 'PHP',
    description: 'Framework PHP pour applications web',
    icon: 'Code2',
    fileExtension: 'twig',
    templateType: 'template',
  },
  {
    id: 'laravel',
    name: 'Laravel',
    category: 'backend',
    language: 'PHP',
    description: 'Framework PHP élégant',
    icon: 'Gem',
    fileExtension: 'blade.php',
    templateType: 'template',
  },
  {
    id: 'django',
    name: 'Django',
    category: 'backend',
    language: 'Python',
    description: 'Framework web Python de haut niveau',
    icon: 'Snake',
    fileExtension: 'html',
    templateType: 'template',
  },
  {
    id: 'rails',
    name: 'Ruby on Rails',
    category: 'backend',
    language: 'Ruby',
    description: 'Framework web Ruby',
    icon: 'Ruby',
    fileExtension: 'erb',
    templateType: 'template',
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'backend',
    language: 'JavaScript/TypeScript',
    description: 'Framework web minimaliste pour Node.js',
    icon: 'Server',
    fileExtension: 'ejs',
    templateType: 'template',
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'backend',
    language: 'Python',
    description: 'Framework web moderne et rapide pour Python',
    icon: 'Rocket',
    fileExtension: 'html',
    templateType: 'template',
  },

  // Static HTML
  {
    id: 'html',
    name: 'HTML/CSS',
    category: 'frontend',
    language: 'HTML/CSS/JS',
    description: 'HTML, CSS et JavaScript vanilla',
    icon: 'Globe',
    fileExtension: 'html',
    templateType: 'template',
  },
];

export const getFrameworksByCategory = () => {
  return {
    frontend: frameworks.filter(f => f.category === 'frontend'),
    fullstack: frameworks.filter(f => f.category === 'fullstack'),
    backend: frameworks.filter(f => f.category === 'backend'),
  };
};