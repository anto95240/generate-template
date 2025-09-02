import { Component, Framework, Theme } from '@/types';
import { CodeGenerator } from './codeGenerator';
import { frameworks } from '@/data/frameworks';

export const exportProject = (
  components: Component[], 
  framework: Framework, 
  theme: Theme,
  projectName: string = 'futuristic-ui-project'
) => {
  const code = CodeGenerator.generateCode(components, framework, theme);
  const frameworkInfo = frameworks.find(f => f.id === framework);
  
  // Create a blob with the code
  const blob = new Blob([code], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  // Create download link
  const link = document.createElement('a');
  link.href = url;
  
  const extension = frameworkInfo?.fileExtension || 'txt';
  
  link.download = `${projectName}.${extension}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportFullProject = (
  components: Component[], 
  framework: Framework, 
  theme: Theme,
  projectName: string = 'futuristic-ui-project'
) => {
  const frameworkInfo = frameworks.find(f => f.id === framework);
  
  if (frameworkInfo?.category === 'backend') {
    // Pour les frameworks backend, générer une structure complète
    const files = generateBackendProjectStructure(components, framework, theme, projectName);
    downloadProjectAsZip(files, projectName);
  } else {
    // Pour les frameworks frontend, exporter le composant principal
    exportProject(components, framework, theme, projectName);
  }
};

const generateBackendProjectStructure = (
  components: Component[], 
  framework: Framework, 
  theme: Theme,
  projectName: string = 'futuristic-ui-project'
): { [filename: string]: string } => {
  const mainCode = CodeGenerator.generateCode(components, framework, theme);
  const files: { [filename: string]: string } = {};

  switch (framework) {
    case 'symfony':
      files['templates/base.html.twig'] = mainCode;
      files['src/Controller/HomeController.php'] = generateSymfonyController();
      files['config/routes.yaml'] = generateSymfonyRoutes();
      break;
      
    case 'laravel':
      files['resources/views/welcome.blade.php'] = mainCode;
      files['routes/web.php'] = generateLaravelRoutes();
      files['app/Http/Controllers/HomeController.php'] = generateLaravelController();
      break;
      
    case 'django':
      files['templates/index.html'] = mainCode;
      files['views.py'] = generateDjangoViews();
      files['urls.py'] = generateDjangoUrls();
      break;
      
    default:
      files['index.html'] = mainCode;
  }

  return files;
};

const downloadProjectAsZip = (files: { [filename: string]: string }, projectName: string) => {
  // Pour l'instant, on télécharge juste le fichier principal
  // Dans une vraie implémentation, on utiliserait JSZip pour créer un ZIP
  const mainFile = Object.entries(files)[0];
  if (mainFile) {
    const blob = new Blob([mainFile[1]], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${projectName}-${mainFile[0].replace('/', '-')}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

const generateSymfonyController = () => `<?php

namespace App\\Controller;

use Symfony\\Bundle\\FrameworkBundle\\Controller\\AbstractController;
use Symfony\\Component\\HttpFoundation\\Response;
use Symfony\\Component\\Routing\\Annotation\\Route;

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