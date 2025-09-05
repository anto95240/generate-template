import { Framework, CSSFramework } from '@/types';

export interface FrameworkInfo {
  id: Framework;
  name: string;
  category: 'frontend' | 'fullstack';
  language: string;
  description: string;
  icon: string;
  fileExtension: string;
  templateType: 'component' | 'template';
  supportedCSSFrameworks: CSSFramework[];
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
    supportedCSSFrameworks: ['tailwind', 'bootstrap', 'chakra', 'antd', 'mantine', 'vanilla'],
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
    supportedCSSFrameworks: ['tailwind', 'bootstrap', 'bulma', 'vanilla'],
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
    supportedCSSFrameworks: ['tailwind', 'bootstrap', 'materialize', 'vanilla'],
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
    supportedCSSFrameworks: ['tailwind', 'bootstrap', 'bulma', 'vanilla'],
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
    supportedCSSFrameworks: ['tailwind', 'bootstrap', 'chakra', 'antd', 'mantine', 'vanilla'],
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
    supportedCSSFrameworks: ['tailwind', 'bootstrap', 'bulma', 'vanilla'],
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
    supportedCSSFrameworks: ['tailwind', 'bootstrap', 'bulma', 'foundation', 'materialize', 'semantic', 'vanilla'],
  },
];

export const cssFrameworks: { id: CSSFramework; name: string; description: string }[] = [
  { id: 'tailwind', name: 'Tailwind CSS', description: 'Framework CSS utilitaire' },
  { id: 'bootstrap', name: 'Bootstrap', description: 'Framework CSS populaire' },
  { id: 'bulma', name: 'Bulma', description: 'Framework CSS moderne basé sur Flexbox' },
  { id: 'foundation', name: 'Foundation', description: 'Framework CSS responsive' },
  { id: 'materialize', name: 'Materialize', description: 'Framework CSS Material Design' },
  { id: 'semantic', name: 'Semantic UI', description: 'Framework CSS sémantique' },
  { id: 'chakra', name: 'Chakra UI', description: 'Composants React modulaires' },
  { id: 'antd', name: 'Ant Design', description: 'Design system pour React' },
  { id: 'mantine', name: 'Mantine', description: 'Composants React modernes' },
  { id: 'vanilla', name: 'CSS Vanilla', description: 'CSS personnalisé' },
];

export const getFrameworksByCategory = () => {
  return {
    frontend: frameworks.filter(f => f.category === 'frontend'),
    fullstack: frameworks.filter(f => f.category === 'fullstack'),
  };
};