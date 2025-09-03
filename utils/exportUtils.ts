import { Component, Framework, Theme, ExportOptions } from '@/types';
import { CodeGenerator } from './codeGenerator';
import { frameworks } from '@/data/frameworks';

export const exportProject = (
  components: Component[], 
  framework: Framework, 
  theme: Theme,
  options: ExportOptions
) => {
  if (options.format === 'modular') {
    exportModularProject(components, framework, theme, options);
  } else {
    exportSingleFile(components, framework, theme, options);
  }
};

const exportSingleFile = (
  components: Component[], 
  framework: Framework, 
  theme: Theme,
  options: ExportOptions
) => {
  const code = CodeGenerator.generateCode(components, framework, theme);
  const frameworkInfo = frameworks.find(f => f.id === framework);
  
  const processedCode = options.minify ? minifyCode(code) : code;
  
  // Create a blob with the code
  const blob = new Blob([processedCode], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  // Create download link
  const link = document.createElement('a');
  link.href = url;
  
  const extension = frameworkInfo?.fileExtension || 'html';
  link.download = `${options.fileName}.${extension}`;
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const exportModularProject = (
  components: Component[], 
  framework: Framework, 
  theme: Theme,
  options: ExportOptions
) => {
  const files = generateProjectStructure(components, framework, theme, options);
  
  // Pour l'instant, on crée un fichier ZIP simulé en téléchargeant les fichiers principaux
  // Dans une vraie implémentation, on utiliserait JSZip
  Object.entries(files).forEach(([filename, content], index) => {
    setTimeout(() => {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${options.fileName}-${filename.replace('/', '-')}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, index * 500); // Délai entre les téléchargements
  });
};

const generateProjectStructure = (
  components: Component[], 
  framework: Framework, 
  theme: Theme,
  options: ExportOptions
): { [filename: string]: string } => {
  const files: { [filename: string]: string } = {};
  const frameworkInfo = frameworks.find(f => f.id === framework);

  switch (framework) {
    case 'react':
    case 'nextjs':
      files['App.tsx'] = CodeGenerator.generateReactComponent(components, theme);
      files['App.css'] = CodeGenerator.generateCSS(theme);
      files['package.json'] = generatePackageJson(framework, options.fileName);
      if (options.includeAssets) {
        files['README.md'] = generateReadme(framework, options.fileName);
      }
      break;

    case 'vue':
    case 'nuxtjs':
      files['App.vue'] = CodeGenerator.generateVueComponent(components, theme);
      files['package.json'] = generatePackageJson(framework, options.fileName);
      if (options.includeAssets) {
        files['README.md'] = generateReadme(framework, options.fileName);
      }
      break;

    case 'html':
      files['index.html'] = CodeGenerator.generateCode(components, framework, theme);
      if (options.includeAssets) {
        files['style.css'] = CodeGenerator.generateCSS(theme);
        files['script.js'] = generateVanillaJS();
        files['README.md'] = generateReadme(framework, options.fileName);
      }
      break;

    case 'symfony':
      files['templates/base.html.twig'] = CodeGenerator.generateCode(components, framework, theme);
      files['src/Controller/HomeController.php'] = generateSymfonyController();
      files['config/routes.yaml'] = generateSymfonyRoutes();
      if (options.includeAssets) {
        files['README.md'] = generateReadme(framework, options.fileName);
      }
      break;

    case 'laravel':
      files['resources/views/welcome.blade.php'] = CodeGenerator.generateCode(components, framework, theme);
      files['routes/web.php'] = generateLaravelRoutes();
      files['app/Http/Controllers/HomeController.php'] = generateLaravelController();
      if (options.includeAssets) {
        files['README.md'] = generateReadme(framework, options.fileName);
      }
      break;

    case 'django':
      files['templates/index.html'] = CodeGenerator.generateCode(components, framework, theme);
      files['views.py'] = generateDjangoViews();
      files['urls.py'] = generateDjangoUrls();
      if (options.includeAssets) {
        files['requirements.txt'] = 'Django>=4.0.0';
        files['README.md'] = generateReadme(framework, options.fileName);
      }
      break;

    default:
      files['index.html'] = CodeGenerator.generateCode(components, framework, theme);
  }

  return files;
};

const minifyCode = (code: string): string => {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove CSS comments
    .replace(/\/\/.*$/gm, '') // Remove JS comments
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .replace(/>\s+</g, '><') // Remove spaces between tags
    .trim();
};

const generatePackageJson = (framework: Framework, projectName: string): string => {
  const dependencies: Record<string, string> = {};
  const devDependencies: Record<string, string> = {};

  switch (framework) {
    case 'react':
      dependencies['react'] = '^18.2.0';
      dependencies['react-dom'] = '^18.2.0';
      devDependencies['@types/react'] = '^18.2.0';
      devDependencies['@types/react-dom'] = '^18.2.0';
      devDependencies['@vitejs/plugin-react'] = '^4.0.0';
      devDependencies['vite'] = '^4.4.0';
      devDependencies['typescript'] = '^5.0.0';
      break;

    case 'nextjs':
      dependencies['next'] = '^14.0.0';
      dependencies['react'] = '^18.2.0';
      dependencies['react-dom'] = '^18.2.0';
      devDependencies['@types/node'] = '^20.0.0';
      devDependencies['@types/react'] = '^18.2.0';
      devDependencies['@types/react-dom'] = '^18.2.0';
      devDependencies['typescript'] = '^5.0.0';
      break;

    case 'vue':
      dependencies['vue'] = '^3.3.0';
      devDependencies['@vitejs/plugin-vue'] = '^4.0.0';
      devDependencies['vite'] = '^4.4.0';
      devDependencies['typescript'] = '^5.0.0';
      break;

    case 'nuxtjs':
      devDependencies['nuxt'] = '^3.8.0';
      break;
  }

  return JSON.stringify({
    name: projectName,
    version: '1.0.0',
    private: true,
    scripts: {
      dev: framework === 'nextjs' ? 'next dev' : framework === 'nuxtjs' ? 'nuxt dev' : 'vite',
      build: framework === 'nextjs' ? 'next build' : framework === 'nuxtjs' ? 'nuxt build' : 'vite build',
      start: framework === 'nextjs' ? 'next start' : framework === 'nuxtjs' ? 'nuxt start' : 'vite preview',
    },
    dependencies,
    devDependencies,
  }, null, 2);
};

const generateReadme = (framework: Framework, projectName: string): string => {
  return `# ${projectName}

Projet généré avec FutureUI Generator utilisant ${framework}.

## Installation

\`\`\`bash
npm install
\`\`\`

## Développement

\`\`\`bash
npm run dev
\`\`\`

## Build

\`\`\`bash
npm run build
\`\`\`

## Framework: ${framework}

Ce projet utilise ${framework} avec une interface moderne et futuriste.

### Fonctionnalités

- Interface responsive
- Thème personnalisé
- Composants modulaires
- Animations et effets

### Structure

- Composants réutilisables
- Styles organisés
- Code optimisé

Généré avec ❤️ par FutureUI Generator
`;
};

const generateVanillaJS = (): string => {
  return `// JavaScript pour interactions
document.addEventListener('DOMContentLoaded', function() {
  // Gestion des boutons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Button clicked:', this.textContent);
    });
  });

  // Gestion des formulaires
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('Form submitted');
    });
  });

  // Animations au scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observer tous les éléments avec animation
  document.querySelectorAll('.card, .btn, form').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});`;
};

// Fonctions pour les frameworks backend (inchangées mais corrigées)
const generateSymfonyController = () => `<?php

namespace App\\Controller;

use Symfony\\Bundle\\FrameworkBundle\\Controller\\AbstractController;
use Symfony\\Component\\HttpFoundation\\Response;
use Symfony\\Component\\Routing\\Attribute\\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(): Response
    {
        return $this->render('base.html.twig');
    }
}`;

const generateSymfonyRoutes = () => `home:
    path: /
    controller: App\\Controller\\HomeController::index`;

const generateLaravelController = () => `<?php

namespace App\\Http\\Controllers;

use Illuminate\\Http\\Request;

class HomeController extends Controller
{
    public function index()
    {
        return view('welcome');
    }
}`;

const generateLaravelRoutes = () => `<?php

use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\HomeController;

Route::get('/', [HomeController::class, 'index']);`;

const generateDjangoViews = () => `from django.shortcuts import render

def index(request):
    return render(request, 'index.html')`;

const generateDjangoUrls = () => `from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
]`;