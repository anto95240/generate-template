  import { Framework } from '@/types';
  
  export interface FrameworkInfo {
    id: Framework;
    name: string;
    category: 'frontend' | 'backend' | 'mobile';
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
      id: 'html',
      name: 'HTML/CSS/JS',
      category: 'frontend',
      language: 'HTML/CSS/JS',
      description: 'HTML, CSS et JavaScript vanilla',
      icon: 'Globe',
      fileExtension: 'html',
      templateType: 'template',
    },
  
    // Backend Web Frameworks (avec rendu HTML)
    {
      id: 'symfony',
      name: 'Symfony',
      category: 'backend',
      language: 'PHP',
      description: 'Framework PHP pour applications web avec Twig',
      icon: 'Code2',
      fileExtension: 'twig',
      templateType: 'template',
    },
    {
      id: 'laravel',
      name: 'Laravel',
      category: 'backend',
      language: 'PHP',
      description: 'Framework PHP élégant avec Blade templates',
      icon: 'Gem',
      fileExtension: 'blade.php',
      templateType: 'template',
    },
    {
      id: 'django',
      name: 'Django',
      category: 'backend',
      language: 'Python',
      description: 'Framework web Python avec système de templates',
      icon: 'Snake',
      fileExtension: 'html',
      templateType: 'template',
    },
    {
      id: 'rails',
      name: 'Ruby on Rails',
      category: 'backend',
      language: 'Ruby',
      description: 'Framework web Ruby avec ERB templates',
      icon: 'Ruby',
      fileExtension: 'erb',
      templateType: 'template',
    },
    {
      id: 'express',
      name: 'Express.js',
      category: 'backend',
      language: 'JavaScript/TypeScript',
      description: 'Framework web Node.js avec EJS templates',
      icon: 'Server',
      fileExtension: 'ejs',
      templateType: 'template',
    },
    {
      id: 'fastapi',
      name: 'FastAPI',
      category: 'backend',
      language: 'Python',
      description: 'Framework web Python avec Jinja2 templates',
      icon: 'Rocket',
      fileExtension: 'html',
      templateType: 'template',
    },
    {
      id: 'aspnet',
      name: 'ASP.NET Core',
      category: 'backend',
      language: 'C#',
      description: 'Framework web Microsoft avec Razor templates',
      icon: 'Code',
      fileExtension: 'cshtml',
      templateType: 'template',
    },
    {
      id: 'spring',
      name: 'Spring Boot',
      category: 'backend',
      language: 'Java',
      description: 'Framework Java avec Thymeleaf templates',
      icon: 'Coffee',
      fileExtension: 'html',
      templateType: 'template',
    },
  
    // Mobile Frameworks
    {
      id: 'flutter',
      name: 'Flutter',
      category: 'mobile',
      language: 'Dart',
      description: 'Framework Google pour apps mobiles multiplateformes',
      icon: 'Smartphone',
      fileExtension: 'dart',
      templateType: 'component',
    },
    {
      id: 'react-native',
      name: 'React Native',
      category: 'mobile',
      language: 'JavaScript/TypeScript',
      description: 'Framework React pour applications mobiles natives',
      icon: 'Mobile',
      fileExtension: 'tsx',
      templateType: 'component',
    },
    {
      id: 'ionic',
      name: 'Ionic',
      category: 'mobile',
      language: 'JavaScript/TypeScript',
      description: 'Framework pour apps mobiles hybrides',
      icon: 'Tablet',
      fileExtension: 'tsx',
      templateType: 'component',
    },
    {
      id: 'xamarin',
      name: 'Xamarin',
      category: 'mobile',
      language: 'C#',
      description: 'Plateforme Microsoft pour apps mobiles',
      icon: 'Monitor',
      fileExtension: 'xaml',
      templateType: 'template',
    },
  ];
  
  export const getFrameworksByCategory = () => {
    return {
      frontend: frameworks.filter(f => f.category === 'frontend'),
      backend: frameworks.filter(f => f.category === 'backend'),
      mobile: frameworks.filter(f => f.category === 'mobile'),
    };
  }; 