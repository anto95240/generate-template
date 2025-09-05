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
  {
    id: 'remix',
    name: 'Remix',
    category: 'fullstack',
    language: 'JavaScript/TypeScript',
    description: 'Framework full-stack centré sur les standards web',
    icon: 'Disc',
    fileExtension: 'tsx',
    templateType: 'component',
  },
  {
    id: 'astro',
    name: 'Astro',
    category: 'frontend',
    language: 'JavaScript/TypeScript',
    description: 'Framework moderne pour sites statiques rapides',
    icon: 'Rocket',
    fileExtension: 'astro',
    templateType: 'component',
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

  // Mobile Frameworks
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'mobile',
    language: 'Dart',
    description: 'Framework UI pour applications mobiles et web',
    icon: 'Smartphone',
    fileExtension: 'dart',
    templateType: 'component',
  },
  {
    id: 'react-native',
    name: 'React Native',
    category: 'mobile',
    language: 'JavaScript/TypeScript',
    description: 'Framework pour applications mobiles natives',
    icon: 'Smartphone',
    fileExtension: 'tsx',
    templateType: 'component',
  },
];

export const getFrameworksByCategory = () => {
  return {
    frontend: frameworks.filter(f => f.category === 'frontend'),
    fullstack: frameworks.filter(f => f.category === 'fullstack'),
    mobile: frameworks.filter(f => f.category === 'mobile'),
  };
};