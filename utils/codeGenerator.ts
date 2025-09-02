import { Component, Framework, Theme } from '@/types';

export class CodeGenerator {
  static generateCode(components: Component[], framework: Framework, theme: Theme): string {
    switch (framework) {
      case 'react':
        return this.generateReactCode(components, theme);
      case 'vue':
        return this.generateVueCode(components, theme);
      case 'angular':
        return this.generateAngularCode(components, theme);
      case 'svelte':
        return this.generateSvelteCode(components, theme);
      case 'nextjs':
        return this.generateNextJSCode(components, theme);
      case 'nuxtjs':
        return this.generateNuxtCode(components, theme);
      case 'symfony':
        return this.generateSymfonyCode(components, theme);
      case 'laravel':
        return this.generateLaravelCode(components, theme);
      case 'django':
        return this.generateDjangoCode(components, theme);
      case 'rails':
        return this.generateRailsCode(components, theme);
      case 'express':
        return this.generateExpressCode(components, theme);
      case 'fastapi':
        return this.generateFastAPICode(components, theme);
      case 'html':
        return this.generateHTMLCode(components, theme);
      default:
        return this.generateReactCode(components, theme);
    }
  }

  private static generateReactCode(components: Component[], theme: Theme): string {
    const imports = `import React from 'react';
import './App.css';`;

    const componentJSX = this.generateComponentsJSX(components, 'react');
    const css = this.generateCSS(theme);

    return `${imports}

function App() {
  return (
    <div className="app" style={{ background: '${theme.colors.background}' }}>
${componentJSX}
    </div>
  );
}

export default App;

/* CSS Styles */
${css}`;
  }

  private static generateVueCode(components: Component[], theme: Theme): string {
    const template = this.generateComponentsJSX(components, 'vue');

    return `<template>
  <div class="app" :style="{ background: '${theme.colors.background}' }">
${template}
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Component logic here
</script>

<style scoped>
${this.generateCSS(theme)}
</style>`;
  }

  private static generateAngularCode(components: Component[], theme: Theme): string {
    const template = this.generateComponentsJSX(components, 'angular');

    return `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
    <div class="app" [style.background]="'${theme.colors.background}'">
${template}
    </div>
  \`,
  styles: [\`
${this.generateCSS(theme)}
  \`]
})
export class AppComponent {
  title = 'futuristic-ui';
}`;
  }

  private static generateSvelteCode(components: Component[], theme: Theme): string {
    const template = this.generateComponentsJSX(components, 'svelte');

    return `<script>
  // Component logic here
</script>

<div class="app" style="background: ${theme.colors.background}">
${template}
</div>

<style>
${this.generateCSS(theme)}
</style>`;
  }

  private static generateNextJSCode(components: Component[], theme: Theme): string {
    const componentJSX = this.generateComponentsJSX(components, 'react');

    return `import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Interface Futuriste</title>
        <meta name="description" content="Interface générée avec FutureUI" />
      </Head>
      
      <div className={styles.app} style={{ background: '${theme.colors.background}' }}>
${componentJSX}
      </div>
    </>
  );
}

/* Styles CSS à placer dans styles/Home.module.css */
${this.generateCSS(theme)}`;
  }

  private static generateNuxtCode(components: Component[], theme: Theme): string {
    const template = this.generateComponentsJSX(components, 'vue');

    return `<template>
  <div>
    <Head>
      <Title>Interface Futuriste</Title>
      <Meta name="description" content="Interface générée avec FutureUI" />
    </Head>
    
    <div class="app" :style="{ background: '${theme.colors.background}' }">
${template}
    </div>
  </div>
</template>

<script setup>
// Component logic here
</script>

<style scoped>
${this.generateCSS(theme)}
</style>`;
  }

  private static generateSymfonyCode(components: Component[], theme: Theme): string {
    const template = this.generateComponentsHTML(components, 'twig');

    return `{# templates/base.html.twig #}
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{% block title %}Interface Futuriste{% endblock %}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    {% block stylesheets %}
        <style>
${this.generateCSS(theme)}
        </style>
    {% endblock %}
</head>
<body>
    <div class="app" style="background: ${theme.colors.background}">
        {% block body %}
${template}
        {% endblock %}
    </div>
    
    {% block javascripts %}
        <script>
            // JavaScript interactions
        </script>
    {% endblock %}
</body>
</html>`;
  }

  private static generateLaravelCode(components: Component[], theme: Theme): string {
    const template = this.generateComponentsHTML(components, 'blade');

    return `{{-- resources/views/welcome.blade.php --}}
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Interface Futuriste</title>
    <style>
${this.generateCSS(theme)}
    </style>
</head>
<body>
    <div class="app" style="background: ${theme.colors.background}">
${template}
    </div>
</body>
</html>`;
  }

  private static generateDjangoCode(components: Component[], theme: Theme): string {
    const template = this.generateComponentsHTML(components, 'django');

    return `<!-- templates/base.html -->
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}Interface Futuriste{% endblock %}</title>
    <style>
${this.generateCSS(theme)}
    </style>
</head>
<body>
    <div class="app" style="background: ${theme.colors.background}">
        {% block content %}
${template}
        {% endblock %}
    </div>
</body>
</html>`;
  }

  private static generateRailsCode(components: Component[], theme: Theme): string {
    const template = this.generateComponentsHTML(components, 'erb');

    return `<!-- app/views/layouts/application.html.erb -->
<!DOCTYPE html>
<html>
  <head>
    <title>Interface Futuriste</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>
    
    <style>
${this.generateCSS(theme)}
    </style>
  </head>

  <body>
    <div class="app" style="background: ${theme.colors.background}">
      <%= yield %>
${template}
    </div>
  </body>
</html>`;
  }

  private static generateExpressCode(components: Component[], theme: Theme): string {
    const template = this.generateComponentsHTML(components, 'ejs');

    return `<!-- views/index.ejs -->
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interface Futuriste</title>
    <style>
${this.generateCSS(theme)}
    </style>
</head>
<body>
    <div class="app" style="background: ${theme.colors.background}">
${template}
    </div>
</body>
</html>`;
  }

  private static generateFastAPICode(components: Component[], theme: Theme): string {
    const template = this.generateComponentsHTML(components, 'jinja');

    return `<!-- templates/index.html -->
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interface Futuriste</title>
    <style>
${this.generateCSS(theme)}
    </style>
</head>
<body>
    <div class="app" style="background: ${theme.colors.background}">
${template}
    </div>
</body>
</html>`;
  }

  private static generateHTMLCode(components: Component[], theme: Theme): string {
    const body = this.generateComponentsHTML(components, 'html');

    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interface Futuriste</title>
    <style>
${this.generateCSS(theme)}
    </style>
</head>
<body>
    <div class="app" style="background: ${theme.colors.background}">
${body}
    </div>
</body>
</html>`;
  }

  private static generateComponentsJSX(components: Component[], framework: string): string {
    return components.map(component => {
      const style = this.convertToCSS(component.style, component.position);
      const styleString = JSON.stringify(style);
      
      switch (component.type) {
        case 'button':
          if (framework === 'vue') {
            return `    <button 
      class="btn btn-${component.props.variant || 'primary'}"
      :style='${styleString}'
    >
      ${component.props.text || 'Button'}
    </button>`;
          } else if (framework === 'angular') {
            return `      <button 
        class="btn btn-${component.props.variant || 'primary'}"
        [ngStyle]='${styleString}'
      >
        ${component.props.text || 'Button'}
      </button>`;
          } else if (framework === 'svelte') {
            return `  <button 
    class="btn btn-${component.props.variant || 'primary'}"
    style={${styleString}}
  >
    ${component.props.text || 'Button'}
  </button>`;
          }
          return `      <button 
        className="btn btn-${component.props.variant || 'primary'}"
        style={${styleString}}
      >
        ${component.props.text || 'Button'}
      </button>`;

        case 'navbar':
          const navItems = (component.props.items || []).map((item: string) => {
            if (framework === 'vue') return `        <a href="#" class="navbar-item">${item}</a>`;
            if (framework === 'angular') return `          <a href="#" class="navbar-item">${item}</a>`;
            if (framework === 'svelte') return `    <a href="#" class="navbar-item">${item}</a>`;
            return `          <a href="#" className="navbar-item">${item}</a>`;
          }).join('\n');

          if (framework === 'vue') {
            return `    <nav class="navbar" :style='${styleString}'>
      <div class="navbar-brand">${component.props.title || 'Logo'}</div>
      <div class="navbar-menu">
${navItems}
      </div>
    </nav>`;
          } else if (framework === 'angular') {
            return `      <nav class="navbar" [ngStyle]='${styleString}'>
        <div class="navbar-brand">${component.props.title || 'Logo'}</div>
        <div class="navbar-menu">
${navItems}
        </div>
      </nav>`;
          } else if (framework === 'svelte') {
            return `  <nav class="navbar" style={${styleString}}>
    <div class="navbar-brand">${component.props.title || 'Logo'}</div>
    <div class="navbar-menu">
${navItems}
    </div>
  </nav>`;
          }
          return `      <nav className="navbar" style={${styleString}}>
        <div className="navbar-brand">${component.props.title || 'Logo'}</div>
        <div className="navbar-menu">
${navItems}
        </div>
      </nav>`;

        case 'form':
          const fields = (component.props.fields || []).map((field: string) => {
            if (framework === 'vue') {
              return `        <div class="form-group">
          <label class="form-label">${field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input type="${field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}" class="form-input" v-model="${field}" />
        </div>`;
            } else if (framework === 'angular') {
              return `          <div class="form-group">
            <label class="form-label">${field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input type="${field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}" class="form-input" [(ngModel)]="${field}" />
          </div>`;
            } else if (framework === 'svelte') {
              return `    <div class="form-group">
      <label class="form-label">${field.charAt(0).toUpperCase() + field.slice(1)}</label>
      <input type="${field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}" class="form-input" bind:value={${field}} />
    </div>`;
            }
            return `        <div className="form-group">
          <label className="form-label">${field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input type="${field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}" className="form-input" />
        </div>`;
          }).join('\n');

          const formWrapper = framework === 'vue' ? 'class' : framework === 'angular' ? 'class' : framework === 'svelte' ? 'class' : 'className';
          
          return `      <form ${formWrapper}="form" style={${styleString}}>
        <h2 ${formWrapper}="form-title">${component.props.title || 'Formulaire'}</h2>
${fields}
        <button type="submit" ${formWrapper}="btn btn-primary">
          ${component.props.submitText || 'Envoyer'}
        </button>
      </form>`;

        case 'table':
          const headers = (component.props.headers || []).map((header: string) => 
            `          <th>${header}</th>`
          ).join('\n');
          
          const rows = (component.props.rows || []).map((row: string[]) => 
            `        <tr>\n${row.map(cell => `          <td>${cell}</td>`).join('\n')}\n        </tr>`
          ).join('\n');

          return `      <table className="table" style={${styleString}}>
        <thead>
          <tr>
${headers}
          </tr>
        </thead>
        <tbody>
${rows}
        </tbody>
      </table>`;

        default:
          return `      <div style={${styleString}}>${component.type}</div>`;
      }
    }).join('\n\n');
  }

  private static generateComponentsHTML(components: Component[], templateEngine: string): string {
    return components.map(component => {
      const style = this.convertToCSS(component.style, component.position);
      const styleAttr = Object.entries(style).map(([key, value]) => `${key}: ${value}`).join('; ');
      
      switch (component.type) {
        case 'button':
          return `        <button class="btn btn-${component.props.variant || 'primary'}" style="${styleAttr}">
          ${component.props.text || 'Button'}
        </button>`;

        case 'navbar':
          const navItems = (component.props.items || []).map((item: string) => 
            `            <a href="#" class="navbar-item">${item}</a>`
          ).join('\n');
          
          return `        <nav class="navbar" style="${styleAttr}">
          <div class="navbar-brand">${component.props.title || 'Logo'}</div>
          <div class="navbar-menu">
${navItems}
          </div>
        </nav>`;

        case 'form':
          const fields = (component.props.fields || []).map((field: string) => {
            const inputType = field === 'email' ? 'email' : field === 'password' ? 'password' : field === 'message' ? 'textarea' : 'text';
            
            if (inputType === 'textarea') {
              return `          <div class="form-group">
            <label class="form-label">${field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <textarea class="form-input" rows="4"></textarea>
          </div>`;
            }
            
            return `          <div class="form-group">
            <label class="form-label">${field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input type="${inputType}" class="form-input" />
          </div>`;
          }).join('\n');

          return `        <form class="form" style="${styleAttr}">
          <h2 class="form-title">${component.props.title || 'Formulaire'}</h2>
${fields}
          <button type="submit" class="btn btn-primary">
            ${component.props.submitText || 'Envoyer'}
          </button>
        </form>`;

        case 'table':
          const headers = (component.props.headers || []).map((header: string) => 
            `            <th>${header}</th>`
          ).join('\n');
          
          const rows = (component.props.rows || []).map((row: string[]) => 
            `          <tr>\n${row.map(cell => `            <td>${cell}</td>`).join('\n')}\n          </tr>`
          ).join('\n');

          return `        <table class="table" style="${styleAttr}">
          <thead>
            <tr>
${headers}
            </tr>
          </thead>
          <tbody>
${rows}
          </tbody>
        </table>`;

        default:
          return `        <div style="${styleAttr}">${component.type}</div>`;
      }
    }).join('\n\n');
  }

  private static convertToCSS(style: any, position: any): any {
    return {
      position: 'absolute',
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: `${position.width}px`,
      height: position.height === 'auto' ? 'auto' : `${position.height}px`,
      ...style,
    };
  }

  private static generateCSS(theme: Theme): string {
    return `
.app {
  min-height: 100vh;
  background: ${theme.colors.background};
  position: relative;
  font-family: 'Inter', sans-serif;
  color: ${theme.colors.text};
}

/* Buttons */
.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  color: white;
  text-decoration: none;
  display: inline-block;
}

.btn:hover {
  transform: translateY(-2px);
  ${theme.effects.glow ? `box-shadow: 0 8px 25px rgba(0, 212, 255, 0.4);` : ''}
}

.btn-primary {
  background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary});
  ${theme.effects.glow ? `box-shadow: 0 0 20px ${theme.colors.primary}40;` : ''}
}

.btn-secondary {
  background: ${theme.colors.secondary};
}

.btn-ghost {
  background: transparent;
  border: 2px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
}

.btn-neon {
  background: transparent;
  border: 2px solid ${theme.colors.accent};
  color: ${theme.colors.accent};
  box-shadow: 0 0 20px ${theme.colors.accent}60;
  animation: pulse 2s infinite;
}

/* Navigation */
.navbar {
  width: 100%;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${theme.effects.glassmorphism ? `
    backdrop-filter: blur(20px);
    background: ${theme.colors.surface}80;
    border-bottom: 1px solid ${theme.colors.primary}30;
  ` : `background: ${theme.colors.surface};`}
}

.navbar-brand {
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.primary};
  ${theme.effects.neon ? `text-shadow: 0 0 10px ${theme.colors.primary};` : ''}
}

.navbar-menu {
  display: flex;
  gap: 24px;
}

.navbar-item {
  color: ${theme.colors.text};
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 8px 16px;
  border-radius: 6px;
}

.navbar-item:hover {
  color: ${theme.colors.primary};
  background: ${theme.colors.primary}20;
  ${theme.effects.glow ? `box-shadow: 0 0 10px ${theme.colors.primary}30;` : ''}
}

/* Cards */
.card {
  padding: 24px;
  border-radius: 12px;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.primary}30;
  ${theme.effects.glassmorphism ? 'backdrop-filter: blur(20px);' : ''}
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  border-color: ${theme.colors.primary}60;
  ${theme.effects.glow ? `box-shadow: 0 10px 30px ${theme.colors.primary}20;` : ''}
}

.card-title {
  font-size: 18px;
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: 12px;
}

.card-content {
  color: ${theme.colors.textSecondary};
  margin-bottom: 16px;
  line-height: 1.6;
}

/* Forms */
.form {
  background: ${theme.colors.surface};
  padding: 32px;
  border-radius: 16px;
  border: 1px solid ${theme.colors.primary}30;
  ${theme.effects.glassmorphism ? 'backdrop-filter: blur(20px);' : ''}
}

.form-title {
  font-size: 24px;
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: 24px;
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  color: ${theme.colors.text};
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 12px 16px;
  background: ${theme.colors.background}80;
  border: 2px solid ${theme.colors.primary}30;
  border-radius: 8px;
  color: ${theme.colors.text};
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-input:focus {
  outline: none;
  border-color: ${theme.colors.primary};
  ${theme.effects.glow ? `box-shadow: 0 0 15px ${theme.colors.primary}30;` : ''}
}

/* Tables */
.table {
  width: 100%;
  border-collapse: collapse;
  background: ${theme.colors.surface};
  border-radius: 12px;
  overflow: hidden;
  ${theme.effects.glassmorphism ? 'backdrop-filter: blur(20px);' : ''}
}

.table th {
  background: ${theme.colors.primary}20;
  color: ${theme.colors.text};
  padding: 16px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid ${theme.colors.primary}40;
}

.table td {
  padding: 12px 16px;
  color: ${theme.colors.textSecondary};
  border-bottom: 1px solid ${theme.colors.primary}20;
}

.table tr:hover {
  background: ${theme.colors.primary}10;
}

/* Grid */
.grid {
  display: grid;
  gap: 16px;
  padding: 20px;
}

.grid-item {
  background: ${theme.colors.surface};
  padding: 20px;
  border-radius: 12px;
  border: 1px solid ${theme.colors.primary}30;
  text-align: center;
  transition: all 0.3s ease;
}

.grid-item:hover {
  transform: translateY(-3px);
  border-color: ${theme.colors.primary}60;
}

/* Animations */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px ${theme.colors.primary}40; }
  50% { box-shadow: 0 0 30px ${theme.colors.primary}60; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 16px;
    padding: 20px;
  }
  
  .navbar-menu {
    flex-direction: column;
    width: 100%;
    text-align: center;
  }
  
  .form {
    padding: 20px;
  }
  
  .table {
    font-size: 14px;
  }
  
  .table th,
  .table td {
    padding: 8px 12px;
  }
}

@media (max-width: 480px) {
  .btn {
    width: 100%;
    margin-bottom: 10px;
  }
  
  .card {
    padding: 16px;
  }
}
`;
  }
}