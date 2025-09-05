import { Component, Framework, Theme, CSSFramework } from '@/types';
import { generateBootstrapHTML, getBootstrapClass } from './bootstrapMappings';

export class CodeGenerator {
  static generateCode(components: Component[], framework: Framework, theme: Theme, cssFramework?: CSSFramework): string {
    switch (framework) {
      case 'react':
        return this.generateReactCode(components, theme, cssFramework);
      case 'vue':
        return this.generateVueCode(components, theme, cssFramework);
      case 'angular':
        return this.generateAngularCode(components, theme, cssFramework);
      case 'svelte':
        return this.generateSvelteCode(components, theme, cssFramework);
      case 'nextjs':
        return this.generateNextJSCode(components, theme, cssFramework);
      case 'nuxtjs':
        return this.generateNuxtCode(components, theme, cssFramework);
      case 'html':
        return this.generateHTMLCode(components, theme, cssFramework);
      case 'flutter':
        return this.generateFlutterCode(components, theme);
      case 'reactnative':
        return this.generateReactNativeCode(components, theme);
      case 'ionic':
        return this.generateIonicCode(components, theme, cssFramework);
      case 'xamarin':
        return this.generateXamarinCode(components, theme);
      case 'kotlin':
        return this.generateKotlinCode(components, theme);
      case 'swift':
        return this.generateSwiftUICode(components, theme);
      case 'nativescript':
        return this.generateNativeScriptCode(components, theme);
      default:
        return this.generateReactCode(components, theme, cssFramework);
    }
  }

  static generateReactComponent(components: Component[], theme: Theme): string {
    const componentJSX = this.generateComponentsJSX(components, 'react');
    
    return `import React from 'react';
import './App.css';

function App() {
  return (
    <div className="app" style={{ background: '${theme.colors.background}' }}>
${componentJSX}
    </div>
  );
}

export default App;`;
  }

  static generateVueComponent(components: Component[], theme: Theme): string {
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

  static generateCSS(theme: Theme): string {
    return `
/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: ${theme.typography.fontFamily};
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  line-height: 1.6;
}

.app {
  min-height: 100vh;
  background: ${theme.colors.background};
  position: relative;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-family: ${theme.typography.headingFont || theme.typography.fontFamily};
  line-height: 1.2;
  margin-bottom: ${theme.spacing.md};
}

h1 { font-size: ${theme.typography.fontSize['3xl']}; }
h2 { font-size: ${theme.typography.fontSize['2xl']}; }
h3 { font-size: ${theme.typography.fontSize.xl}; }
h4 { font-size: ${theme.typography.fontSize.lg}; }

p {
  margin-bottom: ${theme.spacing.md};
  line-height: 1.6;
}

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  font-family: inherit;
  font-size: ${theme.typography.fontSize.base};
}

.btn:hover {
  transform: translateY(-2px);
  ${theme.effects.glow ? `box-shadow: 0 8px 25px ${theme.colors.primary}40;` : ''}
}

.btn-primary {
  background: ${theme.effects.gradients ? `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})` : theme.colors.primary};
  color: ${theme.colors.background};
  ${theme.effects.glow ? `box-shadow: 0 0 20px ${theme.colors.primary}40;` : ''}
}

.btn-secondary {
  background: ${theme.colors.secondary};
  color: ${theme.colors.background};
}

.btn-ghost {
  background: transparent;
  border: 2px solid ${theme.colors.primary};
  color: ${theme.colors.primary};
}

.btn-glass {
  background: rgba(255, 255, 255, 0.1);
  ${theme.effects.glassmorphism ? 'backdrop-filter: blur(20px);' : ''}
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: ${theme.colors.text};
}

.btn-neon {
  background: transparent;
  border: 2px solid ${theme.colors.accent};
  color: ${theme.colors.accent};
  ${theme.effects.neon ? `box-shadow: 0 0 20px ${theme.colors.accent}60; animation: pulse 2s infinite;` : ''}
}

.btn-gradient {
  background: linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.secondary});
  color: ${theme.colors.background};
  border: none;
}

/* Navigation */
.navbar {
  width: 100%;
  padding: ${theme.spacing.lg} ${theme.spacing.xl};
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
  font-size: ${theme.typography.fontSize.xl};
  font-weight: bold;
  color: ${theme.colors.primary};
  ${theme.effects.neon ? `text-shadow: 0 0 10px ${theme.colors.primary};` : ''}
}

.navbar-menu {
  display: flex;

.navbar-item:hover {
  color: ${theme.colors.primary};
  background: ${theme.colors.primary}20;
  ${theme.effects.glow ? `box-shadow: 0 0 10px ${theme.colors.primary}30;` : ''}
}

/* Sidebar/Aside */
.aside {
  background: ${theme.colors.surface};
  ${theme.effects.glassmorphism ? 'backdrop-filter: blur(20px);' : ''}
  border-right: 1px solid ${theme.colors.primary}30;
  height: 100vh;
  overflow-y: auto;
}

.aside-header {
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.primary}20;
}

.aside-nav {
  padding: ${theme.spacing.md};
}

.aside-nav ul {
  list-style: none;
}

.aside-nav li {
  margin-bottom: ${theme.spacing.xs};
}

.aside-nav a {
  display: block;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  color: ${theme.colors.textSecondary};
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-size: ${theme.typography.fontSize.sm};
}

.aside-nav a:hover {
  background: ${theme.colors.primary}20;
  color: ${theme.colors.text};
}

/* Hero Section */
.hero {
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
  text-align: center;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hero h1 {
  font-size: ${theme.typography.fontSize['3xl']};
  font-weight: 700;
  margin-bottom: ${theme.spacing.lg};
  ${theme.effects.neon ? `text-shadow: 0 0 20px ${theme.colors.primary};` : ''}
}

.hero p {
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.textSecondary};
  max-width: 600px;
  margin-bottom: ${theme.spacing.xl};
}

/* Cards */
.card {
  padding: ${theme.spacing.lg};
  border-radius: 12px;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.primary}30;
  ${theme.effects.glassmorphism ? 'backdrop-filter: blur(20px);' : ''}
  transition: all 0.3s ease;
  ${theme.effects.shadows ? `box-shadow: 0 4px 20px ${theme.colors.background}40;` : ''}
}

.card:hover {
  transform: translateY(-5px);
  border-color: ${theme.colors.primary}60;
  ${theme.effects.glow ? `box-shadow: 0 10px 30px ${theme.colors.primary}20;` : ''}
}

.card-title {
  font-size: ${theme.typography.fontSize.lg};
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.sm};
}

.card-content {
  color: ${theme.colors.textSecondary};
  margin-bottom: ${theme.spacing.md};
  line-height: 1.6;
  font-size: ${theme.typography.fontSize.sm};
}

/* Forms */
.form {
  background: ${theme.colors.surface};
  padding: ${theme.spacing.xl};
  border-radius: 16px;
  border: 1px solid ${theme.colors.primary}30;
  ${theme.effects.glassmorphism ? 'backdrop-filter: blur(20px);' : ''}
  ${theme.effects.shadows ? `box-shadow: 0 8px 32px ${theme.colors.background}40;` : ''}
}

.form-title {
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: 700;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.lg};
  text-align: center;
}

.form-group {
  margin-bottom: ${theme.spacing.lg};
}

.form-label {
  display: block;
  color: ${theme.colors.text};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: 500;
  margin-bottom: ${theme.spacing.sm};
}

.form-input, .form-textarea {
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.background}80;
  border: 2px solid ${theme.colors.primary}30;
  border-radius: 8px;
  color: ${theme.colors.text};
  transition: all 0.3s ease;
  font-family: inherit;
  font-size: ${theme.typography.fontSize.base};
}

.form-input:focus, .form-textarea:focus {
  outline: none;
  border-color: ${theme.colors.primary};
  ${theme.effects.glow ? `box-shadow: 0 0 15px ${theme.colors.primary}30;` : ''}
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

/* Tables */
.table {
  width: 100%;
  border-collapse: collapse;
  background: ${theme.colors.surface};
  border-radius: 12px;
  overflow: hidden;
  ${theme.effects.glassmorphism ? 'backdrop-filter: blur(20px);' : ''}
  ${theme.effects.shadows ? `box-shadow: 0 4px 20px ${theme.colors.background}40;` : ''}
}

.table th {
  background: ${theme.colors.primary}20;
  color: ${theme.colors.text};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid ${theme.colors.primary}40;
  font-size: ${theme.typography.fontSize.sm};
}

.table td {
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  color: ${theme.colors.textSecondary};
  border-bottom: 1px solid ${theme.colors.primary}20;
  font-size: ${theme.typography.fontSize.sm};
}

.table tr:hover {
  background: ${theme.colors.primary}10;
}

/* Grid */
.grid {
  display: grid;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing.lg};
}

.grid-item {
  background: ${theme.colors.surface};
  padding: ${theme.spacing.lg};
  border-radius: 12px;
  border: 1px solid ${theme.colors.primary}30;
  text-align: center;
  transition: all 0.3s ease;
  ${theme.effects.shadows ? `box-shadow: 0 4px 15px ${theme.colors.background}30;` : ''}
}

.grid-item:hover {
  transform: translateY(-3px);
  border-color: ${theme.colors.primary}60;
  ${theme.effects.glow ? `box-shadow: 0 8px 25px ${theme.colors.primary}20;` : ''}
}

/* Footer */
.footer {
  background: ${theme.colors.surface};
  border-top: 1px solid ${theme.colors.primary}30;
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
  text-align: center;
}

.footer-brand {
  font-size: ${theme.typography.fontSize.lg};
  font-weight: bold;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
}

.footer-links {
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.md};
  flex-wrap: wrap;
}

.footer-link {
  color: ${theme.colors.textSecondary};
  text-decoration: none;
  font-size: ${theme.typography.fontSize.sm};
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: ${theme.colors.primary};
}

.footer-copyright {
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.xs};
}

/* Badges */
.badge {
  display: inline-flex;
  align-items: center;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: 50px;
  font-size: ${theme.typography.fontSize.xs};
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-primary { background: ${theme.colors.primary}; color: ${theme.colors.background}; }
.badge-success { background: ${theme.colors.success}; color: ${theme.colors.background}; }
.badge-warning { background: ${theme.colors.warning}; color: ${theme.colors.background}; }
.badge-error { background: ${theme.colors.error}; color: ${theme.colors.background}; }
.badge-info { background: ${theme.colors.info}; color: ${theme.colors.background}; }

/* Alerts */
.alert {
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: 8px;
  border: 1px solid;
  margin-bottom: ${theme.spacing.md};
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
}

.alert-success {
  background: ${theme.colors.success}20;
  border-color: ${theme.colors.success};
  color: ${theme.colors.success};
}

.alert-warning {
  background: ${theme.colors.warning}20;
  border-color: ${theme.colors.warning};
  color: ${theme.colors.warning};
}

.alert-error {
  background: ${theme.colors.error}20;
  border-color: ${theme.colors.error};
  color: ${theme.colors.error};
}

.alert-info {
  background: ${theme.colors.info}20;
  border-color: ${theme.colors.info};
  color: ${theme.colors.info};
}

/* Progress */
.progress {
  width: 100%;
  height: 8px;
  background: ${theme.colors.surface};
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: ${theme.effects.gradients ? `linear-gradient(90deg, ${theme.colors.primary}, ${theme.colors.secondary})` : theme.colors.primary};
  transition: width 0.3s ease;
  ${theme.effects.glow ? `box-shadow: 0 0 10px ${theme.colors.primary};` : ''}
}

/* Tabs */
.tabs {
  border-bottom: 1px solid ${theme.colors.primary}30;
}

.tab-list {
  display: flex;
  gap: 0;
}

.tab-button {
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: none;
  border: none;
  color: ${theme.colors.textSecondary};
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 2px solid transparent;
  font-size: ${theme.typography.fontSize.sm};
}

.tab-button.active {
  color: ${theme.colors.primary};
  border-bottom-color: ${theme.colors.primary};
}

.tab-button:hover {
  color: ${theme.colors.text};
  background: ${theme.colors.primary}10;
}

.tab-content {
  padding: ${theme.spacing.lg};
}

/* Accordion */
.accordion-item {
  border: 1px solid ${theme.colors.primary}30;
  border-radius: 8px;
  margin-bottom: ${theme.spacing.sm};
  overflow: hidden;
}

.accordion-header {
  width: 100%;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.surface};
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background 0.3s ease;
  color: ${theme.colors.text};
  font-size: ${theme.typography.fontSize.base};
}

.accordion-header:hover {
  background: ${theme.colors.primary}10;
}

.accordion-content {
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.background}50;
  border-top: 1px solid ${theme.colors.primary}20;
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm};
}

/* Animations */
${theme.effects.animations ? `
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 20px ${theme.colors.primary}40; }
  50% { box-shadow: 0 0 30px ${theme.colors.primary}60; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0); }
  40%, 43% { transform: translate3d(0,-30px,0); }
  70% { transform: translate3d(0,-15px,0); }
  90% { transform: translate3d(0,-4px,0); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
  20%, 40%, 60%, 80% { transform: translateX(10px); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes scale {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.animate-fadeIn { animation: fadeIn 0.6s ease-out; }
.animate-slideIn { animation: slideIn 0.5s ease-out; }
.animate-bounce { animation: bounce 1s ease-in-out; }
.animate-pulse { animation: pulse 2s ease-in-out infinite; }
.animate-glow { animation: glow 2s ease-in-out infinite; }
.animate-shake { animation: shake 0.5s ease-in-out; }
.animate-rotate { animation: rotate 2s linear infinite; }
.animate-scale { animation: scale 2s ease-in-out infinite; }
` : ''}

/* Responsive Design */
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: ${theme.spacing.md};
    padding: ${theme.spacing.lg};
  }
  
  .navbar-menu {
    flex-direction: column;
    width: 100%;
    text-align: center;
  }
  
  .hero {
    padding: ${theme.spacing.lg};
  }
  
  .hero h1 {
    font-size: ${theme.typography.fontSize['2xl']};
  }
  
  .form {
    padding: ${theme.spacing.lg};
  }
  
  .table {
    font-size: ${theme.typography.fontSize.xs};
  }
  
  .table th,
  .table td {
    padding: ${theme.spacing.sm};
  }
  
  .aside {
    width: 100%;
    height: auto;
    max-height: 300px;
  }
  
  .grid {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
  }
}

@media (max-width: 480px) {
  .btn {
    width: 100%;
    margin-bottom: ${theme.spacing.sm};
  }
  
  .card {
    padding: ${theme.spacing.md};
  }
  
  .hero h1 {
    font-size: ${theme.typography.fontSize.xl};
  }
  
  .navbar-menu {
    gap: ${theme.spacing.sm};
  }
}

/* Utility Classes */
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }

.flex { display: flex; }
.flex-col { flex-direction: column; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }

.w-full { width: 100%; }
.h-full { height: 100%; }

.mb-2 { margin-bottom: ${theme.spacing.sm}; }
.mb-4 { margin-bottom: ${theme.spacing.md}; }
.mb-6 { margin-bottom: ${theme.spacing.lg}; }
.mb-8 { margin-bottom: ${theme.spacing.xl}; }

.p-2 { padding: ${theme.spacing.sm}; }
.p-4 { padding: ${theme.spacing.md}; }
.p-6 { padding: ${theme.spacing.lg}; }
.p-8 { padding: ${theme.spacing.xl}; }

.rounded { border-radius: 4px; }
.rounded-lg { border-radius: 8px; }
.rounded-xl { border-radius: 12px; }
.rounded-2xl { border-radius: 16px; }
.rounded-full { border-radius: 50%; }

.shadow-sm { box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); }
.shadow { box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); }
.shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
.shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
`;
  }

  private static generateReactCode(components: Component[], theme: Theme, cssFramework?: CSSFramework): string {
    const imports = this.generateImports('react', cssFramework);
    const componentJSX = this.generateComponentsJSX(components, 'react', cssFramework);
    const css = cssFramework === 'vanilla' ? this.generateCSS(theme) : '';

    return `${imports}

function App() {
  return (
    <div className="${this.getAppClass(cssFramework)}" style={{ background: '${theme.colors.background}' }}>
${componentJSX}
    </div>
  );
}

export default App;

${css ? `/* CSS Styles */\n${css}` : ''}`;
  }

  private static generateVueCode(components: Component[], theme: Theme, cssFramework?: CSSFramework): string {
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

  private static generateAngularCode(components: Component[], theme: Theme, cssFramework?: CSSFramework): string {
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

  private static generateSvelteCode(components: Component[], theme: Theme, cssFramework?: CSSFramework): string {
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

  private static generateNextJSCode(components: Component[], theme: Theme, cssFramework?: CSSFramework): string {
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

  private static generateNuxtCode(components: Component[], theme: Theme, cssFramework?: CSSFramework): string {
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
            document.addEventListener('DOMContentLoaded', function() {
                console.log('Symfony template loaded');
            });
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
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Laravel template loaded');
        });
    </script>
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
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Django template loaded');
        });
    </script>
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
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        console.log('Rails template loaded');
      });
    </script>
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
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        console.log('Express template loaded');
      });
    </script>
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
    <script>
      document.addEventListener('DOMContentLoaded', function() {
        console.log('FastAPI template loaded');
      });
    </script>
</body>
</html>`;
  }

  private static generateHTMLCode(components: Component[], theme: Theme, cssFramework?: CSSFramework): string {
    const body = cssFramework === 'bootstrap' 
      ? generateBootstrapHTML(components) 
      : this.generateComponentsHTML(components, 'html');
    
    const stylesheets = cssFramework === 'bootstrap' 
      ? '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">'
      : `<style>\n${this.generateCSS(theme)}\n    </style>`;

    const scripts = cssFramework === 'bootstrap' 
      ? '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>'
      : '';

    return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interface Futuriste</title>
    ${stylesheets}
</head>
<body${cssFramework !== 'bootstrap' ? ` style="background: ${theme.colors.background}"` : ''}>
    <div class="${cssFramework === 'bootstrap' ? 'container-fluid' : 'app'}"${cssFramework !== 'bootstrap' ? ` style="background: ${theme.colors.background}"` : ''}>
${body}
    </div>
    <script>
      // JavaScript pour interactions
      document.addEventListener('DOMContentLoaded', function() {
        console.log('HTML template loaded');
        
        // Gestion des boutons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
          button.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Button clicked:', this.textContent);
          });
        });
      });
    </script>
    ${scripts}
</body>
</html>`;
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

        case 'aside':
          const asideItems = (component.props.items || []).map((item: string) => 
            `              <li><a href="#" class="aside-nav-item">${item}</a></li>`
          ).join('\n');
          
          return `        <aside class="aside" style="${styleAttr}">
          <div class="aside-header">
            <h3>${component.props.title || 'Menu'}</h3>
          </div>
          <nav class="aside-nav">
            <ul>
${asideItems}
            </ul>
          </nav>
        </aside>`;

        case 'hero':
          return `        <section class="hero" style="${styleAttr}">
          <h1>${component.props.title || 'Titre Principal'}</h1>
          <p>${component.props.subtitle || 'Sous-titre'}</p>
          ${component.props.hasButton ? `
          <button class="btn btn-primary">
            ${component.props.buttonText || 'Action'}
          </button>` : ''}
        </section>`;

        case 'footer':
          const footerLinks = (component.props.links || []).map((link: string) => 
            `            <a href="#" class="footer-link">${link}</a>`
          ).join('\n');
          
          return `        <footer class="footer" style="${styleAttr}">
          <div class="footer-brand">${component.props.title || 'Brand'}</div>
          <div class="footer-links">
${footerLinks}
          </div>
          <div class="footer-copyright">${component.props.copyright || '© 2025'}</div>
        </footer>`;

        case 'form':
          const fields = (component.props.fields || []).map((field: string) => {
            const inputType = field === 'email' ? 'email' : field === 'password' ? 'password' : field === 'message' ? 'textarea' : 'text';
            
            if (inputType === 'textarea') {
              return `          <div class="form-group">
            <label class="form-label">${field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <textarea class="form-textarea" rows="4"></textarea>
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

  private static generateGenericComponent(component: Component, framework: string, styleString: string): string {
    const classAttr = framework === 'vue' || framework === 'angular' || framework === 'svelte' ? 'class' : 'className';
    const styleAttr = framework === 'vue' ? ':style' : framework === 'angular' ? '[ngStyle]' : 'style';
    
    return `      <div ${classAttr}="${component.type}" ${styleAttr}='${styleString}'>
        ${component.type} component
      </div>`;
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

  // Nouvelles méthodes pour supporter les frameworks CSS
  private static generateImports(framework: Framework, cssFramework?: CSSFramework): string {
    let imports = `import React from 'react';`;
    
    switch (cssFramework) {
      case 'bootstrap':
        imports += `\nimport 'bootstrap/dist/css/bootstrap.min.css';`;
        break;
      case 'tailwind':
        // Tailwind est généralement configuré dans tailwind.config.js
        break;
      case 'bulma':
        imports += `\nimport 'bulma/css/bulma.min.css';`;
        break;
      case 'chakra':
        imports += `\nimport { ChakraProvider } from '@chakra-ui/react';`;
        break;
      case 'antd':
        imports += `\nimport 'antd/dist/reset.css';`;
        break;
      case 'mantine':
        imports += `\nimport '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';`;
        break;
      default:
        imports += `\nimport './App.css';`;
    }
    
    return imports;
  }

  private static getAppClass(cssFramework?: CSSFramework): string {
    switch (cssFramework) {
      case 'bootstrap':
        return 'container-fluid';
      case 'tailwind':
        return 'min-h-screen bg-gray-900';
      case 'bulma':
        return 'section';
      default:
        return 'app';
    }
  }

  private static generateComponentsJSX(components: Component[], framework: Framework, cssFramework?: CSSFramework): string {
    return components.map(component => {
      const style = this.convertToCSS(component.style, component.position);
      const styleString = Object.entries(style).map(([key, value]) => `${key}: '${value}'`).join(', ');
      
      switch (component.type) {
        case 'button':
          return this.generateButtonJSX(component, framework, styleString, cssFramework);
        case 'navbar':
          return this.generateNavbarJSX(component, framework, styleString, cssFramework);
        case 'card':
          return this.generateCardJSX(component, framework, styleString, cssFramework);
        case 'form':
          return this.generateFormJSX(component, framework, styleString, cssFramework);
        default:
          return this.generateGenericJSX(component, framework, styleString);
      }
    }).join('\n\n');
  }

  private static generateButtonJSX(component: Component, framework: Framework, styleString: string, cssFramework?: CSSFramework): string {
    let buttonClass = 'btn';
    
    switch (cssFramework) {
      case 'bootstrap':
        buttonClass = `btn btn-${component.props.variant === 'primary' ? 'primary' : 'secondary'}`;
        break;
      case 'tailwind':
        buttonClass = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
        break;
      case 'bulma':
        buttonClass = `button is-${component.props.variant === 'primary' ? 'primary' : 'info'}`;
        break;
      case 'chakra':
        return `      <Button colorScheme="${component.props.variant === 'primary' ? 'blue' : 'gray'}" style={{ ${styleString} }}>
        ${component.props.text || 'Button'}
      </Button>`;
      case 'antd':
        return `      <Button type="${component.props.variant === 'primary' ? 'primary' : 'default'}" style={{ ${styleString} }}>
        ${component.props.text || 'Button'}
      </Button>`;
      default:
        buttonClass = `btn btn-${component.props.variant || 'primary'}`;
    }

    const classAttr = framework === 'vue' ? 'class' : 'className';
    return `      <button ${classAttr}="${buttonClass}" style={{ ${styleString} }}>
        ${component.props.text || 'Button'}
      </button>`;
  }

  private static generateNavbarJSX(component: Component, framework: Framework, styleString: string, cssFramework?: CSSFramework): string {
    const navItems = (component.props.items || []).map((item: string) => {
      switch (cssFramework) {
        case 'bootstrap':
          return `            <a className="nav-link" href="#">${item}</a>`;
        case 'tailwind':
          return `            <a className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium" href="#">${item}</a>`;
        case 'bulma':
          return `            <a className="navbar-item" href="#">${item}</a>`;
        default:
          return `            <a className="navbar-item" href="#">${item}</a>`;
      }
    }).join('\n');

    let navClass = 'navbar';
    switch (cssFramework) {
      case 'bootstrap':
        navClass = 'navbar navbar-expand-lg navbar-dark';
        break;
      case 'tailwind':
        navClass = 'bg-gray-800 text-white';
        break;
      case 'bulma':
        navClass = 'navbar is-dark';
        break;
    }

    const classAttr = framework === 'vue' ? 'class' : 'className';
    return `      <nav ${classAttr}="${navClass}" style={{ ${styleString} }}>
        <div ${classAttr}="navbar-brand">${component.props.title || 'Logo'}</div>
        <div ${classAttr}="navbar-menu">
${navItems}
        </div>
      </nav>`;
  }

  private static generateCardJSX(component: Component, framework: Framework, styleString: string, cssFramework?: CSSFramework): string {
    let cardClass = 'card';
    
    switch (cssFramework) {
      case 'bootstrap':
        cardClass = 'card';
        break;
      case 'tailwind':
        cardClass = 'bg-white shadow-lg rounded-lg overflow-hidden';
        break;
      case 'bulma':
        cardClass = 'card';
        break;
    }

    const classAttr = framework === 'vue' ? 'class' : 'className';
    return `      <div ${classAttr}="${cardClass}" style={{ ${styleString} }}>
        <div ${classAttr}="card-title">${component.props.title || 'Card Title'}</div>
        <div ${classAttr}="card-content">${component.props.content || 'Card content'}</div>
      </div>`;
  }

  private static generateFormJSX(component: Component, framework: Framework, styleString: string, cssFramework?: CSSFramework): string {
    const fields = (component.props.fields || []).map((field: string) => {
      const inputType = field === 'email' ? 'email' : field === 'password' ? 'password' : 'text';
      let inputClass = 'form-input';
      
      switch (cssFramework) {
        case 'bootstrap':
          inputClass = 'form-control';
          break;
        case 'tailwind':
          inputClass = 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500';
          break;
        case 'bulma':
          inputClass = 'input';
          break;
      }

      const classAttr = framework === 'vue' ? 'class' : 'className';
      return `          <div ${classAttr}="form-group">
            <label ${classAttr}="form-label">${field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input type="${inputType}" ${classAttr}="${inputClass}" />
          </div>`;
    }).join('\n');

    let formClass = 'form';
    switch (cssFramework) {
      case 'bootstrap':
        formClass = 'form';
        break;
      case 'tailwind':
        formClass = 'bg-white p-6 rounded-lg shadow-lg';
        break;
      case 'bulma':
        formClass = 'box';
        break;
    }

    const classAttr = framework === 'vue' ? 'class' : 'className';
    return `      <form ${classAttr}="${formClass}" style={{ ${styleString} }}>
        <h2 ${classAttr}="form-title">${component.props.title || 'Formulaire'}</h2>
${fields}
        <button type="submit" ${classAttr}="btn btn-primary">
          ${component.props.submitText || 'Envoyer'}
        </button>
      </form>`;
  }

  private static generateGenericJSX(component: Component, framework: Framework, styleString: string): string {
    const classAttr = framework === 'vue' ? 'class' : 'className';
    return `      <div ${classAttr}="${component.type}" style={{ ${styleString} }}>
        ${component.type} component
      </div>`;
  }

  // Générateurs pour frameworks mobiles
  private static generateFlutterCode(components: Component[], theme: Theme): string {
    const widgets = this.generateFlutterWidgets(components, theme);

    return `import 'package:flutter/material.dart';

class FutureUIScreen extends StatelessWidget {
  const FutureUIScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(${this.hexToFlutterColor(theme.colors.background)}),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
${widgets}
            ],
          ),
        ),
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    title: 'Future UI',
    theme: ThemeData(
      primarySwatch: Colors.blue,
      fontFamily: '${theme.typography.fontFamily.replace(/'/g, '')}',
      scaffoldBackgroundColor: Color(${this.hexToFlutterColor(theme.colors.background)}),
    ),
    home: const FutureUIScreen(),
  ));
}`;
  }

  private static generateFlutterWidgets(components: Component[], theme: Theme): string {
    return components.map(component => {
      switch (component.type) {
        case 'button':
          return `              ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color(${this.hexToFlutterColor(theme.colors.primary)}),
                  foregroundColor: Color(${this.hexToFlutterColor(theme.colors.text)}),
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                ),
                child: Text('${component.props.text || 'Button'}'),
              ),`;

        case 'navbar':
          const navItems = (component.props.items || []).map((item: string) => 
            `                  TextButton(
                    onPressed: () {},
                    child: Text('${item}', style: TextStyle(color: Color(${this.hexToFlutterColor(theme.colors.text)}))),
                  ),`
          ).join('\n');
          
          return `              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Color(${this.hexToFlutterColor(theme.colors.surface)}),
                  boxShadow: [BoxShadow(color: Colors.black26, blurRadius: 4)],
                ),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text('${component.props.title || 'Logo'}', style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                      color: Color(${this.hexToFlutterColor(theme.colors.text)}),
                    )),
                    Row(
                      children: [
${navItems}
                      ],
                    ),
                  ],
                ),
              ),`;

        case 'hero':
          return `              Container(
                padding: const EdgeInsets.all(32),
                child: Column(
                  children: [
                    Text(
                      '${component.props.title || 'Titre Principal'}',
                      style: TextStyle(
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                        color: Color(${this.hexToFlutterColor(theme.colors.text)}),
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      '${component.props.subtitle || 'Sous-titre'}',
                      style: TextStyle(
                        fontSize: 18,
                        color: Color(${this.hexToFlutterColor(theme.colors.textSecondary)}),
                      ),
                      textAlign: TextAlign.center,
                    ),
                    ${component.props.hasButton ? `const SizedBox(height: 24),
                    ElevatedButton(
                      onPressed: () {},
                      child: Text('${component.props.buttonText || 'Action'}'),
                    ),` : ''}
                  ],
                ),
              ),`;

        case 'card':
          return `              Card(
                margin: const EdgeInsets.all(16),
                elevation: 4,
                color: Color(${this.hexToFlutterColor(theme.colors.surface)}),
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '${component.props.title || 'Card Title'}',
                        style: TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Color(${this.hexToFlutterColor(theme.colors.text)}),
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        '${component.props.content || 'Card content'}',
                        style: TextStyle(
                          color: Color(${this.hexToFlutterColor(theme.colors.textSecondary)}),
                        ),
                      ),
                    ],
                  ),
                ),
              ),`;

        case 'form':
          const formFields = (component.props.fields || []).map((field: string) => {
            const inputType = field === 'email' ? 'TextInputType.emailAddress' : 
                             field === 'password' ? 'null' : 'TextInputType.text';
            const isPassword = field === 'password';
            
            return `                    TextField(
                      decoration: InputDecoration(
                        labelText: '${field.charAt(0).toUpperCase() + field.slice(1)}',
                        border: const OutlineInputBorder(),
                        filled: true,
                        fillColor: Color(${this.hexToFlutterColor(theme.colors.surface)}),
                      ),
                      keyboardType: ${inputType},
                      ${isPassword ? 'obscureText: true,' : ''}
                    ),
                    const SizedBox(height: 16),`;
          }).join('\n');

          return `              Container(
                margin: const EdgeInsets.all(16),
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Color(${this.hexToFlutterColor(theme.colors.surface)}),
                  borderRadius: BorderRadius.circular(8),
                  boxShadow: [BoxShadow(color: Colors.black26, blurRadius: 4)],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    Text(
                      '${component.props.title || 'Formulaire'}',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: Color(${this.hexToFlutterColor(theme.colors.text)}),
                      ),
                    ),
                    const SizedBox(height: 16),
${formFields}
                    ElevatedButton(
                      onPressed: () {},
                      child: Text('${component.props.submitText || 'Envoyer'}'),
                    ),
                  ],
                ),
              ),`;

        default:
          return `              Container(
                margin: const EdgeInsets.all(16),
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Color(${this.hexToFlutterColor(theme.colors.surface)}),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text('${component.type} widget'),
              ),`;
      }
    }).join('\n');
  }

  private static hexToFlutterColor(hex: string): string {
    // Convertit les couleurs hex en format Flutter (0xFFRRGGBB)
    const cleanHex = hex.replace('#', '');
    return `0xFF${cleanHex}`;
  }

  private static generateReactNativeCode(components: Component[], theme: Theme): string {
    const jsxComponents = this.generateReactNativeComponents(components, theme);

    return `import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native';

const FutureUIScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
${jsxComponents}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '${theme.colors.background}',
  },
  content: {
    flex: 1,
  },
  button: {
    backgroundColor: '${theme.colors.primary}',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    margin: 16,
  },
  buttonText: {
    color: '${theme.colors.text}',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '${theme.colors.surface}',
    padding: 16,
    margin: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: '${theme.colors.text}',
    fontSize: 16,
  },
  title: {
    color: '${theme.colors.text}',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default FutureUIScreen;`;
  }

  private static generateReactNativeComponents(components: Component[], theme: Theme): string {
    return components.map(component => {
      switch (component.type) {
        case 'button':
          return `        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>${component.props.text || 'Button'}</Text>
        </TouchableOpacity>`;

        case 'card':
          return `        <View style={styles.card}>
          <Text style={styles.title}>${component.props.title || 'Card Title'}</Text>
          <Text style={styles.text}>${component.props.content || 'Card content'}</Text>
        </View>`;

        case 'hero':
          return `        <View style={{ padding: 32, alignItems: 'center' }}>
          <Text style={{ fontSize: 32, fontWeight: 'bold', color: '${theme.colors.text}', textAlign: 'center' }}>
            ${component.props.title || 'Titre Principal'}
          </Text>
          <Text style={{ fontSize: 18, color: '${theme.colors.textSecondary}', textAlign: 'center', marginTop: 16 }}>
            ${component.props.subtitle || 'Sous-titre'}
          </Text>
          ${component.props.hasButton ? `<TouchableOpacity style={[styles.button, { marginTop: 24 }]}>
            <Text style={styles.buttonText}>${component.props.buttonText || 'Action'}</Text>
          </TouchableOpacity>` : ''}
        </View>`;

        default:
          return `        <View style={styles.card}>
          <Text style={styles.text}>${component.type} component</Text>
        </View>`;
      }
    }).join('\n');
  }

  // Générateurs pour les autres frameworks mobiles (versions simplifiées)
  private static generateIonicCode(components: Component[], theme: Theme, cssFramework?: CSSFramework): string {
    return `<ion-content [fullscreen]="true">
  <ion-header [translucent]="true">
    <ion-toolbar>
      <ion-title>Future UI</ion-title>
    </ion-toolbar>
  </ion-header>
  
  <div class="container">
${components.map(component => this.generateIonicComponent(component)).join('\n')}
  </div>
</ion-content>`;
  }

  private static generateIonicComponent(component: Component): string {
    switch (component.type) {
      case 'button':
        return `    <ion-button expand="block">${component.props.text || 'Button'}</ion-button>`;
      case 'card':
        return `    <ion-card>
      <ion-card-header>
        <ion-card-title>${component.props.title || 'Card Title'}</ion-card-title>
      </ion-card-header>
      <ion-card-content>${component.props.content || 'Card content'}</ion-card-content>
    </ion-card>`;
      default:
        return `    <ion-item>${component.type} component</ion-item>`;
    }
  }

  private static generateXamarinCode(components: Component[], theme: Theme): string {
    return `using Microsoft.Maui.Controls;

namespace FutureUI;

public partial class MainPage : ContentPage
{
    public MainPage()
    {
        InitializeComponent();
        
        Content = new ScrollView
        {
            BackgroundColor = Color.FromArgb("${theme.colors.background}"),
            Content = new StackLayout
            {
                Children = {
${components.map(component => this.generateXamarinComponent(component, theme)).join(',\n')}
                }
            }
        };
    }
}`;
  }

  private static generateXamarinComponent(component: Component, theme: Theme): string {
    switch (component.type) {
      case 'button':
        return `                    new Button
                    {
                        Text = "${component.props.text || 'Button'}",
                        BackgroundColor = Color.FromArgb("${theme.colors.primary}"),
                        TextColor = Color.FromArgb("${theme.colors.text}")
                    }`;
      case 'card':
        return `                    new Frame
                    {
                        BackgroundColor = Color.FromArgb("${theme.colors.surface}"),
                        Content = new StackLayout
                        {
                            Children = {
                                new Label { Text = "${component.props.title || 'Card Title'}", FontSize = 18, FontAttributes = FontAttributes.Bold },
                                new Label { Text = "${component.props.content || 'Card content'}" }
                            }
                        }
                    }`;
      default:
        return `                    new Label { Text = "${component.type} component" }`;
    }
  }

  private static generateKotlinCode(components: Component[], theme: Theme): string {
    return `package com.example.futureui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun FutureUIScreen() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(${this.hexToAndroidColor(theme.colors.background)}))
            .verticalScroll(rememberScrollState())
    ) {
${components.map(component => this.generateKotlinComponent(component, theme)).join('\n')}
    }
}

@Composable
fun MainActivity() {
    MaterialTheme {
        FutureUIScreen()
    }
}`;
  }

  private static generateKotlinComponent(component: Component, theme: Theme): string {
    switch (component.type) {
      case 'button':
        return `        Button(
            onClick = { },
            colors = ButtonDefaults.buttonColors(
                containerColor = Color(${this.hexToAndroidColor(theme.colors.primary)})
            ),
            modifier = Modifier.padding(16.dp)
        ) {
            Text("${component.props.text || 'Button'}")
        }`;
      case 'card':
        return `        Card(
            modifier = Modifier.padding(16.dp),
            colors = CardDefaults.cardColors(
                containerColor = Color(${this.hexToAndroidColor(theme.colors.surface)})
            )
        ) {
            Column(modifier = Modifier.padding(16.dp)) {
                Text(
                    text = "${component.props.title || 'Card Title'}",
                    style = MaterialTheme.typography.titleLarge
                )
                Text(
                    text = "${component.props.content || 'Card content'}",
                    style = MaterialTheme.typography.bodyMedium
                )
            }
        }`;
      default:
        return `        Text(
            text = "${component.type} component",
            modifier = Modifier.padding(16.dp)
        )`;
    }
  }

  private static hexToAndroidColor(hex: string): string {
    const cleanHex = hex.replace('#', '');
    return `0xFF${cleanHex}`;
  }

  private static generateSwiftUICode(components: Component[], theme: Theme): string {
    return `import SwiftUI

struct FutureUIScreen: View {
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
${components.map(component => this.generateSwiftUIComponent(component, theme)).join('\n')}
            }
            .padding()
        }
        .background(Color(hex: "${theme.colors.background}"))
    }
}

struct ContentView: View {
    var body: some View {
        FutureUIScreen()
    }
}

extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }
        
        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue:  Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}`;
  }

  private static generateSwiftUIComponent(component: Component, theme: Theme): string {
    switch (component.type) {
      case 'button':
        return `                Button("${component.props.text || 'Button'}") {
                    // Action
                }
                .padding()
                .background(Color(hex: "${theme.colors.primary}"))
                .foregroundColor(Color(hex: "${theme.colors.text}"))
                .cornerRadius(8)`;
      case 'card':
        return `                VStack(alignment: .leading) {
                    Text("${component.props.title || 'Card Title'}")
                        .font(.title2)
                        .fontWeight(.bold)
                    Text("${component.props.content || 'Card content'}")
                        .font(.body)
                }
                .padding()
                .background(Color(hex: "${theme.colors.surface}"))
                .cornerRadius(8)
                .shadow(radius: 2)`;
      default:
        return `                Text("${component.type} component")
                    .padding()`;
    }
  }

  private static generateNativeScriptCode(components: Component[], theme: Theme): string {
    return `<Page>
    <ScrollView>
        <StackLayout backgroundColor="${theme.colors.background}">
${components.map(component => this.generateNativeScriptComponent(component, theme)).join('\n')}
        </StackLayout>
    </ScrollView>
</Page>`;
  }

  private static generateNativeScriptComponent(component: Component, theme: Theme): string {
    switch (component.type) {
      case 'button':
        return `            <Button 
                text="${component.props.text || 'Button'}"
                backgroundColor="${theme.colors.primary}"
                color="${theme.colors.text}"
                borderRadius="8"
                margin="16" />`;
      case 'card':
        return `            <StackLayout 
                backgroundColor="${theme.colors.surface}"
                borderRadius="8"
                margin="16"
                padding="16">
                <Label 
                    text="${component.props.title || 'Card Title'}"
                    fontSize="18"
                    fontWeight="bold"
                    color="${theme.colors.text}" />
                <Label 
                    text="${component.props.content || 'Card content'}"
                    color="${theme.colors.textSecondary}"
                    marginTop="8" />
            </StackLayout>`;
      default:
        return `            <Label 
                text="${component.type} component"
                backgroundColor="${theme.colors.surface}"
                padding="16"
                margin="16" />`;
    }
  }
}