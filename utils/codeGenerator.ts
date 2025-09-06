import { Component, Framework, Theme, CSSFramework } from '@/types';
import { getBootstrapClass, generateBootstrapHTML } from './bootstrapMappings';

export class CodeGenerator {
  static generateCode(
    components: Component[], 
    framework: Framework, 
    theme: Theme, 
    cssFramework: CSSFramework = 'vanilla'
  ): string {
    switch (framework) {
      case 'react':
      case 'nextjs':
        return this.generateReactCode(components, theme, cssFramework);
      case 'vue':
      case 'nuxtjs':
        return this.generateVueCode(components, theme, cssFramework);
      case 'angular':
        return this.generateAngularCode(components, theme, cssFramework);
      case 'svelte':
        return this.generateSvelteCode(components, theme, cssFramework);
      case 'html':
      default:
        return this.generateHTMLCode(components, theme, cssFramework);
    }
  }

  static generateReactCode(components: Component[], theme: Theme, cssFramework: CSSFramework): string {
    const imports = this.generateReactImports(cssFramework);
    const styles = this.generateInlineStyles(theme);
    const componentJSX = this.generateReactComponents(components, theme, cssFramework);
    
    return `${imports}

const App = () => {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '${theme.colors.background}',
      color: '${theme.colors.text}',
      fontFamily: '${theme.typography.fontFamily}',
      position: 'relative',
      overflow: 'hidden'
    }}>
      ${componentJSX}
    </div>
  );
};

export default App;

${styles}`;
  }

  static generateVueCode(components: Component[], theme: Theme, cssFramework: CSSFramework): string {
    const componentTemplate = this.generateVueTemplate(components, theme, cssFramework);
    const styles = this.generateVueStyles(theme);
    
    return `<template>
  <div class="app" :style="appStyle">
    ${componentTemplate}
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      appStyle: {
        minHeight: '100vh',
        backgroundColor: '${theme.colors.background}',
        color: '${theme.colors.text}',
        fontFamily: '${theme.typography.fontFamily}',
        position: 'relative',
        overflow: 'hidden'
      }
    }
  }
}
</script>

<style scoped>
${styles}
</style>`;
  }

  static generateAngularCode(components: Component[], theme: Theme, cssFramework: CSSFramework): string {
    const componentTemplate = this.generateAngularTemplate(components, theme, cssFramework);
    const styles = this.generateAngularStyles(theme);
    
    return `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
    <div class="app" [ngStyle]="appStyle">
      ${componentTemplate}
    </div>
  \`,
  styles: [\`
    ${styles}
  \`]
})
export class AppComponent {
  appStyle = {
    'min-height': '100vh',
    'background-color': '${theme.colors.background}',
    'color': '${theme.colors.text}',
    'font-family': '${theme.typography.fontFamily}',
    'position': 'relative',
    'overflow': 'hidden'
  };
}`;
  }

  static generateSvelteCode(components: Component[], theme: Theme, cssFramework: CSSFramework): string {
    const componentMarkup = this.generateSvelteMarkup(components, theme, cssFramework);
    const styles = this.generateSvelteStyles(theme);
    
    return `<div class="app">
  ${componentMarkup}
</div>

<style>
  .app {
    min-height: 100vh;
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    font-family: ${theme.typography.fontFamily};
    position: relative;
    overflow: hidden;
  }
  
  ${styles}
</style>`;
  }

  static generateHTMLCode(components: Component[], theme: Theme, cssFramework: CSSFramework): string {
    const cssLinks = this.generateCSSLinks(cssFramework);
    const styles = this.generateCSS(theme);
    const bodyContent = this.generateHTMLComponents(components, theme, cssFramework);
    
    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FutureUI Generated App</title>
    ${cssLinks}
    <style>
        ${styles}
        
        body {
            margin: 0;
            padding: 0;
            min-height: 100vh;
            background-color: ${theme.colors.background};
            color: ${theme.colors.text};
            font-family: ${theme.typography.fontFamily};
            position: relative;
            overflow-x: hidden;
        }
        
        .app-container {
            position: relative;
            min-height: 100vh;
            width: 100%;
        }
    </style>
</head>
<body>
    <div class="app-container">
        ${bodyContent}
    </div>
    
    <script>
        // Interactions de base
        document.addEventListener('DOMContentLoaded', function() {
            // Gestion des boutons
            const buttons = document.querySelectorAll('button');
            buttons.forEach(button => {
                button.addEventListener('click', function(e) {
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
        });
    </script>
</body>
</html>`;
  }

  static generateReactImports(cssFramework: CSSFramework): string {
    let imports = "import React from 'react';";
    
    switch (cssFramework) {
      case 'bootstrap':
        imports += "\nimport 'bootstrap/dist/css/bootstrap.min.css';";
        break;
      case 'tailwind':
        imports += "\nimport './index.css'; // Tailwind CSS";
        break;
      case 'chakra':
        imports += "\nimport { ChakraProvider } from '@chakra-ui/react';";
        break;
      case 'antd':
        imports += "\nimport 'antd/dist/reset.css';";
        break;
    }
    
    return imports;
  }

  static generateReactComponents(components: Component[], theme: Theme, cssFramework: CSSFramework): string {
    return components.map(component => {
      const style = this.convertStyleToReact(component.style, theme);
      const position = {
        position: 'absolute',
        left: `${component.position.x}px`,
        top: `${component.position.y}px`,
        width: `${component.position.width}px`,
        height: `${component.position.height}px`,
        ...style
      };

      return this.generateReactComponent(component, position, theme, cssFramework);
    }).join('\n      ');
  }

  static generateReactComponent(component: Component, style: any, theme: Theme, cssFramework: CSSFramework): string {
    const styleStr = JSON.stringify(style).replace(/"/g, "'");
    
    switch (component.type) {
      case 'button':
        return `<button style={${styleStr}} onClick={() => console.log('${component.props.text || 'Button'} clicked')}>
          ${component.props.text || 'Button'}
        </button>`;
        
      case 'navbar':
        const navItems = (component.props.items || []).map((item: string) => 
          `<a href="#" style={{color: '${theme.colors.text}', textDecoration: 'none', marginRight: '24px'}}>${item}</a>`
        ).join('');
        
        return `<nav style={${styleStr}}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
            <div style={{fontSize: '18px', fontWeight: 'bold', color: '${theme.colors.primary}'}}>
              ${component.props.title || 'Logo'}
            </div>
            <div style={{display: 'flex', gap: '24px'}}>
              ${navItems}
            </div>
          </div>
        </nav>`;
        
      case 'card':
        return `<div style={${styleStr}}>
          <h3 style={{color: '${theme.colors.text}', marginBottom: '12px', fontSize: '18px', fontWeight: '600'}}>
            ${component.props.title || 'Card Title'}
          </h3>
          <p style={{color: '${theme.colors.textSecondary}', marginBottom: '16px', fontSize: '14px'}}>
            ${component.props.content || 'Card content goes here...'}
          </p>
          ${component.props.hasButton ? `<button style={{
            backgroundColor: '${theme.colors.primary}',
            color: '${theme.colors.background}',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>Action</button>` : ''}
        </div>`;
        
      case 'input':
        return `<div style={${styleStr}}>
          ${component.props.label ? `<label style={{display: 'block', marginBottom: '8px', color: '${theme.colors.text}', fontSize: '14px', fontWeight: '500'}}>
            ${component.props.label}
          </label>` : ''}
          <input 
            type="${component.props.type || 'text'}"
            placeholder="${component.props.placeholder || ''}"
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid ${theme.colors.primary}40',
              borderRadius: '8px',
              backgroundColor: '${theme.colors.surface}',
              color: '${theme.colors.text}',
              fontSize: '16px',
              outline: 'none'
            }}
          />
        </div>`;
        
      case 'text':
        const fontSize = component.props.size === '3xl' ? '48px' :
                        component.props.size === '2xl' ? '32px' :
                        component.props.size === 'xl' ? '24px' :
                        component.props.size === 'lg' ? '20px' :
                        component.props.size === 'sm' ? '14px' :
                        component.props.size === 'xs' ? '12px' : '16px';
        
        return `<div style={{...${styleStr}, fontSize: '${fontSize}', fontWeight: '${component.props.weight || 'normal'}'}}>
          ${component.props.content || 'Sample Text'}
        </div>`;
        
      case 'hero':
        return `<section style={${styleStr}}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '16px',
            color: '${theme.colors.text}',
            textAlign: 'center'
          }}>
            ${component.props.title || 'Hero Title'}
          </h1>
          <p style={{
            fontSize: '20px',
            marginBottom: '32px',
            color: '${theme.colors.textSecondary}',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto 32px'
          }}>
            ${component.props.subtitle || 'Hero subtitle'}
          </p>
          ${component.props.hasButton ? `<div style={{textAlign: 'center'}}>
            <button style={{
              backgroundColor: '${theme.colors.primary}',
              color: '${theme.colors.background}',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '8px',
              fontSize: '18px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              ${component.props.buttonText || 'Action'}
            </button>
          </div>` : ''}
        </section>`;
        
      case 'form':
        const fields = (component.props.fields || []).map((field: string) => {
          const inputType = field === 'email' ? 'email' : field === 'password' ? 'password' : 'text';
          const isTextarea = field === 'message' || field === 'description';
          
          return `<div style={{marginBottom: '20px'}}>
            <label style={{display: 'block', marginBottom: '8px', color: '${theme.colors.text}', fontSize: '14px', fontWeight: '500'}}>
              ${field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            ${isTextarea ? 
              `<textarea 
                rows="4"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid ${theme.colors.primary}40',
                  borderRadius: '8px',
                  backgroundColor: '${theme.colors.surface}',
                  color: '${theme.colors.text}',
                  fontSize: '16px',
                  outline: 'none',
                  resize: 'vertical'
                }}
              ></textarea>` :
              `<input 
                type="${inputType}"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid ${theme.colors.primary}40',
                  borderRadius: '8px',
                  backgroundColor: '${theme.colors.surface}',
                  color: '${theme.colors.text}',
                  fontSize: '16px',
                  outline: 'none'
                }}
              />`
            }
          </div>`;
        }).join('');
        
        return `<form style={${styleStr}} onSubmit={(e) => e.preventDefault()}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '24px',
            color: '${theme.colors.text}',
            textAlign: 'center'
          }}>
            ${component.props.title || 'Form'}
          </h2>
          ${fields}
          <button 
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '${theme.colors.primary}',
              color: '${theme.colors.background}',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            ${component.props.submitText || 'Submit'}
          </button>
        </form>`;
        
      default:
        return `<div style={${styleStr}}>
          <span style={{color: '${theme.colors.textSecondary}', fontSize: '14px'}}>
            ${component.type} component
          </span>
        </div>`;
    }
  }

  static generateHTMLComponents(components: Component[], theme: Theme, cssFramework: CSSFramework): string {
    return components.map(component => {
      const style = this.convertStyleToCSS(component.style, theme);
      const position = `position: absolute; left: ${component.position.x}px; top: ${component.position.y}px; width: ${component.position.width}px; height: ${component.position.height}px;`;
      const fullStyle = `${position} ${style}`;

      return this.generateHTMLComponent(component, fullStyle, theme, cssFramework);
    }).join('\n        ');
  }

  static generateHTMLComponent(component: Component, style: string, theme: Theme, cssFramework: CSSFramework): string {
    switch (component.type) {
      case 'button':
        return `<button style="${style}" onclick="console.log('${component.props.text || 'Button'} clicked')">
          ${component.props.text || 'Button'}
        </button>`;
        
      case 'navbar':
        const navItems = (component.props.items || []).map((item: string) => 
          `<a href="#" style="color: ${theme.colors.text}; text-decoration: none; margin-right: 24px;">${item}</a>`
        ).join('');
        
        return `<nav style="${style}">
          <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
            <div style="font-size: 18px; font-weight: bold; color: ${theme.colors.primary};">
              ${component.props.title || 'Logo'}
            </div>
            <div style="display: flex; gap: 24px;">
              ${navItems}
            </div>
          </div>
        </nav>`;
        
      case 'card':
        return `<div style="${style}">
          <h3 style="color: ${theme.colors.text}; margin-bottom: 12px; font-size: 18px; font-weight: 600;">
            ${component.props.title || 'Card Title'}
          </h3>
          <p style="color: ${theme.colors.textSecondary}; margin-bottom: 16px; font-size: 14px;">
            ${component.props.content || 'Card content goes here...'}
          </p>
          ${component.props.hasButton ? `<button style="
            background-color: ${theme.colors.primary};
            color: ${theme.colors.background};
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
          ">Action</button>` : ''}
        </div>`;
        
      case 'input':
        return `<div style="${style}">
          ${component.props.label ? `<label style="display: block; margin-bottom: 8px; color: ${theme.colors.text}; font-size: 14px; font-weight: 500;">
            ${component.props.label}
          </label>` : ''}
          <input 
            type="${component.props.type || 'text'}"
            placeholder="${component.props.placeholder || ''}"
            style="
              width: 100%;
              padding: 12px 16px;
              border: 2px solid ${theme.colors.primary}40;
              border-radius: 8px;
              background-color: ${theme.colors.surface};
              color: ${theme.colors.text};
              font-size: 16px;
              outline: none;
            "
          />
        </div>`;
        
      case 'text':
        const fontSize = component.props.size === '3xl' ? '48px' :
                        component.props.size === '2xl' ? '32px' :
                        component.props.size === 'xl' ? '24px' :
                        component.props.size === 'lg' ? '20px' :
                        component.props.size === 'sm' ? '14px' :
                        component.props.size === 'xs' ? '12px' : '16px';
        
        return `<div style="${style} font-size: ${fontSize}; font-weight: ${component.props.weight || 'normal'};">
          ${component.props.content || 'Sample Text'}
        </div>`;
        
      case 'hero':
        return `<section style="${style}">
          <h1 style="
            font-size: 48px;
            font-weight: bold;
            margin-bottom: 16px;
            color: ${theme.colors.text};
            text-align: center;
          ">
            ${component.props.title || 'Hero Title'}
          </h1>
          <p style="
            font-size: 20px;
            margin-bottom: 32px;
            color: ${theme.colors.textSecondary};
            text-align: center;
            max-width: 600px;
            margin: 0 auto 32px;
          ">
            ${component.props.subtitle || 'Hero subtitle'}
          </p>
          ${component.props.hasButton ? `<div style="text-align: center;">
            <button style="
              background-color: ${theme.colors.primary};
              color: ${theme.colors.background};
              border: none;
              padding: 16px 32px;
              border-radius: 8px;
              font-size: 18px;
              font-weight: 600;
              cursor: pointer;
            ">
              ${component.props.buttonText || 'Action'}
            </button>
          </div>` : ''}
        </section>`;
        
      case 'form':
        const fields = (component.props.fields || []).map((field: string) => {
          const inputType = field === 'email' ? 'email' : field === 'password' ? 'password' : 'text';
          const isTextarea = field === 'message' || field === 'description';
          
          return `<div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; color: ${theme.colors.text}; font-size: 14px; font-weight: 500;">
              ${field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            ${isTextarea ? 
              `<textarea 
                rows="4"
                style="
                  width: 100%;
                  padding: 12px 16px;
                  border: 2px solid ${theme.colors.primary}40;
                  border-radius: 8px;
                  background-color: ${theme.colors.surface};
                  color: ${theme.colors.text};
                  font-size: 16px;
                  outline: none;
                  resize: vertical;
                "
              ></textarea>` :
              `<input 
                type="${inputType}"
                style="
                  width: 100%;
                  padding: 12px 16px;
                  border: 2px solid ${theme.colors.primary}40;
                  border-radius: 8px;
                  background-color: ${theme.colors.surface};
                  color: ${theme.colors.text};
                  font-size: 16px;
                  outline: none;
                "
              />`
            }
          </div>`;
        }).join('');
        
        return `<form style="${style}" onsubmit="event.preventDefault(); console.log('Form submitted');">
          <h2 style="
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 24px;
            color: ${theme.colors.text};
            text-align: center;
          ">
            ${component.props.title || 'Form'}
          </h2>
          ${fields}
          <button 
            type="submit"
            style="
              width: 100%;
              background-color: ${theme.colors.primary};
              color: ${theme.colors.background};
              border: none;
              padding: 12px 24px;
              border-radius: 8px;
              font-size: 16px;
              font-weight: 600;
              cursor: pointer;
            "
          >
            ${component.props.submitText || 'Submit'}
          </button>
        </form>`;
        
      default:
        return `<div style="${style}">
          <span style="color: ${theme.colors.textSecondary}; font-size: 14px;">
            ${component.type} component
          </span>
        </div>`;
    }
  }

  static convertStyleToReact(style: any, theme: Theme): any {
    const reactStyle: any = {};
    
    Object.entries(style).forEach(([key, value]) => {
      // Convertir les propriétés CSS en camelCase pour React
      const camelKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      
      // Éviter les conflits entre propriétés shorthand et longhand
      if (key === 'border' && (style.borderColor || style.borderWidth || style.borderStyle)) {
        // Si on a des propriétés border spécifiques, on les utilise à la place
        if (style.borderWidth) reactStyle.borderWidth = style.borderWidth;
        if (style.borderStyle) reactStyle.borderStyle = style.borderStyle;
        if (style.borderColor) reactStyle.borderColor = style.borderColor;
      } else if (!['borderColor', 'borderWidth', 'borderStyle'].includes(key) || !style.border) {
        reactStyle[camelKey] = value;
      }
    });
    
    return reactStyle;
  }

  static convertStyleToCSS(style: any, theme: Theme): string {
    const cssProperties: string[] = [];
    
    Object.entries(style).forEach(([key, value]) => {
      // Éviter les conflits entre propriétés shorthand et longhand
      if (key === 'border' && (style.borderColor || style.borderWidth || style.borderStyle)) {
        // Si on a des propriétés border spécifiques, on les utilise à la place
        if (style.borderWidth) cssProperties.push(`border-width: ${style.borderWidth}`);
        if (style.borderStyle) cssProperties.push(`border-style: ${style.borderStyle}`);
        if (style.borderColor) cssProperties.push(`border-color: ${style.borderColor}`);
      } else if (!['borderColor', 'borderWidth', 'borderStyle'].includes(key) || !style.border) {
        // Convertir camelCase en kebab-case
        const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        cssProperties.push(`${kebabKey}: ${value}`);
      }
    });
    
    return cssProperties.join('; ') + ';';
  }

  static generateCSS(theme: Theme): string {
    return `
      /* Theme Variables */
      :root {
        --primary: ${theme.colors.primary};
        --secondary: ${theme.colors.secondary};
        --accent: ${theme.colors.accent};
        --background: ${theme.colors.background};
        --surface: ${theme.colors.surface};
        --text: ${theme.colors.text};
        --text-secondary: ${theme.colors.textSecondary};
      }
      
      /* Global Styles */
      * {
        box-sizing: border-box;
      }
      
      /* Animations */
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes glow {
        0%, 100% { box-shadow: 0 0 20px var(--primary); }
        50% { box-shadow: 0 0 30px var(--accent); }
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      
      /* Utility Classes */
      .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
      .animate-glow { animation: glow 2s ease-in-out infinite; }
      .animate-float { animation: float 3s ease-in-out infinite; }
      
      /* Component Styles */
      button:hover {
        transform: translateY(-2px);
        transition: all 0.3s ease;
      }
      
      input:focus, textarea:focus {
        border-color: var(--primary) !important;
        box-shadow: 0 0 0 3px ${theme.colors.primary}20;
      }
    `;
  }

  static generateCSSLinks(cssFramework: CSSFramework): string {
    switch (cssFramework) {
      case 'bootstrap':
        return '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">';
      case 'tailwind':
        return '<script src="https://cdn.tailwindcss.com"></script>';
      case 'bulma':
        return '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">';
      case 'foundation':
        return '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/foundation-sites@6.7.5/dist/css/foundation.min.css">';
      case 'materialize':
        return '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">';
      case 'semantic':
        return '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css">';
      default:
        return '';
    }
  }

  static generateVueTemplate(components: Component[], theme: Theme, cssFramework: CSSFramework): string {
    return components.map(component => {
      const style = this.convertStyleToCSS(component.style, theme);
      const position = `position: absolute; left: ${component.position.x}px; top: ${component.position.y}px; width: ${component.position.width}px; height: ${component.position.height}px;`;
      const fullStyle = `${position} ${style}`;

      return this.generateVueComponent(component, fullStyle, theme);
    }).join('\n    ');
  }

  static generateVueComponent(component: Component, style: string, theme: Theme): string {
    switch (component.type) {
      case 'button':
        return `<button style="${style}" @click="console.log('${component.props.text || 'Button'} clicked')">
          ${component.props.text || 'Button'}
        </button>`;
      case 'input':
        return `<div style="${style}">
          <label v-if="${!!component.props.label}">${component.props.label}</label>
          <input type="${component.props.type || 'text'}" placeholder="${component.props.placeholder || ''}" />
        </div>`;
      default:
        return `<div style="${style}">${component.type} component</div>`;
    }
  }

  static generateVueStyles(theme: Theme): string {
    return this.generateCSS(theme);
  }

  static generateAngularTemplate(components: Component[], theme: Theme, cssFramework: CSSFramework): string {
    return components.map(component => {
      const style = this.convertStyleToCSS(component.style, theme);
      const position = `position: absolute; left: ${component.position.x}px; top: ${component.position.y}px; width: ${component.position.width}px; height: ${component.position.height}px;`;
      const fullStyle = `${position} ${style}`;

      return this.generateAngularComponent(component, fullStyle, theme);
    }).join('\n      ');
  }

  static generateAngularComponent(component: Component, style: string, theme: Theme): string {
    switch (component.type) {
      case 'button':
        return `<button style="${style}" (click)="onButtonClick('${component.props.text || 'Button'}')">
          ${component.props.text || 'Button'}
        </button>`;
      case 'input':
        return `<div style="${style}">
          <label *ngIf="${!!component.props.label}">${component.props.label}</label>
          <input type="${component.props.type || 'text'}" placeholder="${component.props.placeholder || ''}" />
        </div>`;
      default:
        return `<div style="${style}">${component.type} component</div>`;
    }
  }

  static generateAngularStyles(theme: Theme): string {
    return this.generateCSS(theme);
  }

  static generateSvelteMarkup(components: Component[], theme: Theme, cssFramework: CSSFramework): string {
    return components.map(component => {
      const style = this.convertStyleToCSS(component.style, theme);
      const position = `position: absolute; left: ${component.position.x}px; top: ${component.position.y}px; width: ${component.position.width}px; height: ${component.position.height}px;`;
      const fullStyle = `${position} ${style}`;

      return this.generateSvelteComponent(component, fullStyle, theme);
    }).join('\n  ');
  }

  static generateSvelteComponent(component: Component, style: string, theme: Theme): string {
    switch (component.type) {
      case 'button':
        return `<button style="${style}" on:click={() => console.log('${component.props.text || 'Button'} clicked')}>
          ${component.props.text || 'Button'}
        </button>`;
      case 'input':
        return `<div style="${style}">
          {#if ${!!component.props.label}}
            <label>${component.props.label}</label>
          {/if}
          <input type="${component.props.type || 'text'}" placeholder="${component.props.placeholder || ''}" />
        </div>`;
      default:
        return `<div style="${style}">${component.type} component</div>`;
    }
  }

  static generateSvelteStyles(theme: Theme): string {
    return this.generateCSS(theme);
  }

  static generateReactComponent(components: Component[], theme: Theme): string {
    return this.generateReactCode(components, theme, 'vanilla');
  }

  static generateVueComponent(components: Component[], theme: Theme): string {
    return this.generateVueCode(components, theme, 'vanilla');
  }

  static generateInlineStyles(theme: Theme): string {
    return `
/* Inline Styles for React */
const styles = {
  fadeIn: {
    animation: 'fadeIn 0.6s ease-out'
  },
  glow: {
    animation: 'glow 2s ease-in-out infinite'
  },
  float: {
    animation: 'float 3s ease-in-out infinite'
  }
};

/* CSS Animations */
const globalStyles = \`
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes glow {
    0%, 100% { box-shadow: 0 0 20px ${theme.colors.primary}; }
    50% { box-shadow: 0 0 30px ${theme.colors.accent}; }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
\`;

// Inject global styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = globalStyles;
  document.head.appendChild(styleElement);
}`;
  }
}