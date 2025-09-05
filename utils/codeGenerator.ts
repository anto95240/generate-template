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
      case 'html':
        return this.generateHTMLCode(components, theme);
      default:
        return this.generateReactCode(components, theme);
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
</body>
</html>`;
  }

  private static generateComponentsJSX(components: Component[], framework: string): string {
    return components.map(component => {
      const style = this.convertToCSS(component.style, component.position);
      const styleString = JSON.stringify(style);
      
      switch (component.type) {
        case 'button':
          const buttonClass = `btn btn-${component.props.variant || 'primary'}`;
          if (framework === 'vue') {
            return `    <button 
      class="${buttonClass}"
      :style='${styleString}'
    >
      ${component.props.text || 'Button'}
    </button>`;
          } else if (framework === 'angular') {
            return `      <button 
        class="${buttonClass}"
        [ngStyle]='${styleString}'
      >
        ${component.props.text || 'Button'}
      </button>`;
          } else if (framework === 'svelte') {
            return `  <button 
    class="${buttonClass}"
    style={${styleString}}
  >
    ${component.props.text || 'Button'}
  </button>`;
          }
          return `      <button 
        className="${buttonClass}"
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

          const navClass = framework === 'vue' || framework === 'angular' || framework === 'svelte' ? 'class' : 'className';
          const styleAttr = framework === 'vue' ? ':style' : framework === 'angular' ? '[ngStyle]' : 'style';

          return `      <nav ${navClass}="navbar" ${styleAttr}='${styleString}'>
        <div ${navClass}="navbar-brand">${component.props.title || 'Logo'}</div>
        <div ${navClass}="navbar-menu">
${navItems}
        </div>
      </nav>`;

        case 'aside':
          const asideItems = (component.props.items || []).map((item: string) => {
            const linkClass = framework === 'vue' || framework === 'angular' || framework === 'svelte' ? 'class' : 'className';
            return `            <li><a href="#" ${linkClass}="aside-nav-item">${item}</a></li>`;
          }).join('\n');

          const asideClass = framework === 'vue' || framework === 'angular' || framework === 'svelte' ? 'class' : 'className';
          const asideStyleAttr = framework === 'vue' ? ':style' : framework === 'angular' ? '[ngStyle]' : 'style';

          return `      <aside ${asideClass}="aside" ${asideStyleAttr}='${styleString}'>
        <div ${asideClass}="aside-header">
          <h3>${component.props.title || 'Menu'}</h3>
        </div>
        <nav ${asideClass}="aside-nav">
          <ul>
${asideItems}
          </ul>
        </nav>
      </aside>`;

        case 'hero':
          const heroClass = framework === 'vue' || framework === 'angular' || framework === 'svelte' ? 'class' : 'className';
          const heroStyleAttr = framework === 'vue' ? ':style' : framework === 'angular' ? '[ngStyle]' : 'style';

          return `      <section ${heroClass}="hero" ${heroStyleAttr}='${styleString}'>
        <h1>${component.props.title || 'Titre Principal'}</h1>
        <p>${component.props.subtitle || 'Sous-titre'}</p>
        ${component.props.hasButton ? `
        <button ${heroClass}="btn btn-primary">
          ${component.props.buttonText || 'Action'}
        </button>` : ''}
      </section>`;

        case 'footer':
          const footerLinks = (component.props.links || []).map((link: string) => {
            const linkClass = framework === 'vue' || framework === 'angular' || framework === 'svelte' ? 'class' : 'className';
            return `          <a href="#" ${linkClass}="footer-link">${link}</a>`;
          }).join('\n');

          const footerClass = framework === 'vue' || framework === 'angular' || framework === 'svelte' ? 'class' : 'className';
          const footerStyleAttr = framework === 'vue' ? ':style' : framework === 'angular' ? '[ngStyle]' : 'style';

          return `      <footer ${footerClass}="footer" ${footerStyleAttr}='${styleString}'>
        <div ${footerClass}="footer-brand">${component.props.title || 'Brand'}</div>
        <div ${footerClass}="footer-links">
${footerLinks}
        </div>
        <div ${footerClass}="footer-copyright">${component.props.copyright || '© 2025'}</div>
      </footer>`;

        // Autres composants (card, form, table, etc.) - logique similaire mais adaptée
        default:
          return this.generateGenericComponent(component, framework, styleString);
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
}