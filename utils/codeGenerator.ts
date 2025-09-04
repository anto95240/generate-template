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
      case 'flutter':
        return this.generateFlutterCode(components, theme);
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

  static generateReactComponent(components: Component[], theme: Theme): string {
    const componentJSX = this.generateReactJSX(components, theme);
    
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
    const template = this.generateVueTemplate(components, theme);

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

  static generateFlutterCode(components: Component[], theme: Theme): string {
    const widgets = this.generateFlutterWidgets(components, theme);
    
    return `import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'FutureUI App',
      theme: ThemeData(
        primarySwatch: MaterialColor(${this.hexToInt(theme.colors.primary)}, {
          50: Color(0xFF${theme.colors.primary.substring(1)}),
          100: Color(0xFF${theme.colors.primary.substring(1)}),
          200: Color(0xFF${theme.colors.primary.substring(1)}),
          300: Color(0xFF${theme.colors.primary.substring(1)}),
          400: Color(0xFF${theme.colors.primary.substring(1)}),
          500: Color(0xFF${theme.colors.primary.substring(1)}),
          600: Color(0xFF${theme.colors.primary.substring(1)}),
          700: Color(0xFF${theme.colors.primary.substring(1)}),
          800: Color(0xFF${theme.colors.primary.substring(1)}),
          900: Color(0xFF${theme.colors.primary.substring(1)}),
        }),
        scaffoldBackgroundColor: Color(0xFF${theme.colors.background.substring(1)}),
        textTheme: TextTheme(
          bodyLarge: TextStyle(color: Color(0xFF${theme.colors.text.substring(1)})),
          bodyMedium: TextStyle(color: Color(0xFF${theme.colors.textSecondary.substring(1)})),
        ),
      ),
      home: HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF${theme.colors.background.substring(1)}),
      body: SafeArea(
        child: SingleChildScrollView(
          child: Column(
            children: [
${widgets}
            ],
          ),
        ),
      ),
    );
  }
}`;
  }

  private static generateFlutterWidgets(components: Component[], theme: Theme): string {
    return components.map(component => {
      switch (component.type) {
        case 'button':
          return `              Container(
                margin: EdgeInsets.all(8.0),
                child: ElevatedButton(
                  onPressed: () {
                    print('${component.props.text || 'Button'} pressed');
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Color(0xFF${theme.colors.primary.substring(1)}),
                    foregroundColor: Color(0xFF${theme.colors.background.substring(1)}),
                    padding: EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(8),
                    ),
                    elevation: ${theme.effects.shadows ? '8' : '2'},
                  ),
                  child: Text(
                    '${component.props.text || 'Button'}',
                    style: TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                ),
              ),`;

        case 'navbar':
          return `              AppBar(
                backgroundColor: Color(0xFF${theme.colors.surface.substring(1)}),
                title: Text(
                  '${component.props.title || 'App'}',
                  style: TextStyle(
                    color: Color(0xFF${theme.colors.primary.substring(1)}),
                    fontWeight: FontWeight.bold,
                  ),
                ),
                actions: [
${(component.props.items || []).map((item: string) => `                  TextButton(
                    onPressed: () {},
                    child: Text(
                      '${item}',
                      style: TextStyle(color: Color(0xFF${theme.colors.text.substring(1)})),
                    ),
                  ),`).join('\n')}
                ],
              ),`;

        case 'card':
          return `              Container(
                margin: EdgeInsets.all(16.0),
                child: Card(
                  color: Color(0xFF${theme.colors.surface.substring(1)}),
                  elevation: ${theme.effects.shadows ? '8' : '2'},
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                    side: BorderSide(
                      color: Color(0xFF${theme.colors.primary.substring(1)}).withOpacity(0.3),
                    ),
                  ),
                  child: Padding(
                    padding: EdgeInsets.all(24.0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '${component.props.title || 'Card Title'}',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF${theme.colors.text.substring(1)}),
                          ),
                        ),
                        SizedBox(height: 12),
                        Text(
                          '${component.props.content || 'Card content...'}',
                          style: TextStyle(
                            fontSize: 14,
                            color: Color(0xFF${theme.colors.textSecondary.substring(1)}),
                          ),
                        ),
                        ${component.props.hasButton ? `SizedBox(height: 16),
                        ElevatedButton(
                          onPressed: () {},
                          child: Text('Action'),
                        ),` : ''}
                      ],
                    ),
                  ),
                ),
              ),`;

        case 'input':
          return `              Container(
                margin: EdgeInsets.all(16.0),
                child: TextField(
                  decoration: InputDecoration(
                    labelText: '${component.props.label || 'Input'}',
                    hintText: '${component.props.placeholder || 'Enter text...'}',
                    border: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: BorderSide(
                        color: Color(0xFF${theme.colors.primary.substring(1)}).withOpacity(0.3),
                      ),
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderRadius: BorderRadius.circular(8),
                      borderSide: BorderSide(
                        color: Color(0xFF${theme.colors.primary.substring(1)}),
                        width: 2,
                      ),
                    ),
                    fillColor: Color(0xFF${theme.colors.surface.substring(1)}),
                    filled: true,
                  ),
                  style: TextStyle(
                    color: Color(0xFF${theme.colors.text.substring(1)}),
                  ),
                ),
              ),`;

        case 'text':
          return `              Container(
                margin: EdgeInsets.all(8.0),
                child: Text(
                  '${component.props.content || 'Sample Text'}',
                  style: TextStyle(
                    fontSize: ${this.getFlutterFontSize(component.props.size)},
                    fontWeight: ${this.getFlutterFontWeight(component.props.weight)},
                    color: Color(0xFF${theme.colors.text.substring(1)}),
                  ),
                ),
              ),`;

        default:
          return `              Container(
                margin: EdgeInsets.all(8.0),
                padding: EdgeInsets.all(16.0),
                decoration: BoxDecoration(
                  color: Color(0xFF${theme.colors.surface.substring(1)}),
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(
                    color: Color(0xFF${theme.colors.primary.substring(1)}).withOpacity(0.3),
                  ),
                ),
                child: Text(
                  '${component.type} Widget',
                  style: TextStyle(
                    color: Color(0xFF${theme.colors.text.substring(1)}),
                  ),
                ),
              ),`;
      }
    }).join('\n');
  }

  private static generateReactJSX(components: Component[], theme: Theme): string {
    return components.map(component => {
      const style = this.convertToReactStyle(component.style, component.position);
      
      switch (component.type) {
        case 'button':
          return `      <button 
        className="btn btn-${component.props.variant || 'primary'}"
        style={${JSON.stringify(style)}}
        onClick={() => console.log('Button clicked')}
      >
        ${component.props.text || 'Button'}
      </button>`;

        case 'navbar':
          return `      <nav className="navbar" style={${JSON.stringify(style)}}>
        <div className="navbar-brand">${component.props.title || 'Logo'}</div>
        <div className="navbar-menu">
${(component.props.items || []).map((item: string) => `          <a href="#" className="navbar-item">${item}</a>`).join('\n')}
        </div>
      </nav>`;

        case 'card':
          return `      <div className="card" style={${JSON.stringify(style)}}>
        <h3 className="card-title">${component.props.title || 'Card Title'}</h3>
        <p className="card-content">${component.props.content || 'Card content...'}</p>
        ${component.props.hasButton ? `<button className="btn btn-primary">Action</button>` : ''}
      </div>`;

        case 'input':
          return `      <div className="form-group" style={${JSON.stringify(style)}}>
        ${component.props.label ? `<label className="form-label">${component.props.label}</label>` : ''}
        <input 
          type="${component.props.type || 'text'}"
          placeholder="${component.props.placeholder || 'Enter text...'}"
          className="form-input"
        />
      </div>`;

        case 'text':
          return `      <div style={${JSON.stringify(style)}}>
        ${component.props.content || 'Sample Text'}
      </div>`;

        case 'form':
          const fields = (component.props.fields || []).map((field: string) => {
            const inputType = field === 'email' ? 'email' : field === 'password' ? 'password' : 'text';
            if (field === 'message') {
              return `        <div className="form-group">
          <label className="form-label">${field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <textarea className="form-textarea" rows={4}></textarea>
        </div>`;
            }
            return `        <div className="form-group">
          <label className="form-label">${field.charAt(0).toUpperCase() + field.slice(1)}</label>
          <input type="${inputType}" className="form-input" />
        </div>`;
          }).join('\n');

          return `      <form className="form" style={${JSON.stringify(style)}}>
        <h2 className="form-title">${component.props.title || 'Form'}</h2>
${fields}
        <button type="submit" className="btn btn-primary">
          ${component.props.submitText || 'Submit'}
        </button>
      </form>`;

        default:
          return `      <div style={${JSON.stringify(style)}}>
        {/* ${component.type} component */}
      </div>`;
      }
    }).join('\n\n');
  }

  private static generateVueTemplate(components: Component[], theme: Theme): string {
    return components.map(component => {
      const style = this.convertToVueStyle(component.style, component.position);
      
      switch (component.type) {
        case 'button':
          return `    <button 
      class="btn btn-${component.props.variant || 'primary'}"
      :style="${JSON.stringify(style)}"
      @click="handleClick"
    >
      ${component.props.text || 'Button'}
    </button>`;

        case 'navbar':
          return `    <nav class="navbar" :style="${JSON.stringify(style)}">
      <div class="navbar-brand">${component.props.title || 'Logo'}</div>
      <div class="navbar-menu">
${(component.props.items || []).map((item: string) => `        <a href="#" class="navbar-item">${item}</a>`).join('\n')}
      </div>
    </nav>`;

        case 'card':
          return `    <div class="card" :style="${JSON.stringify(style)}">
      <h3 class="card-title">${component.props.title || 'Card Title'}</h3>
      <p class="card-content">${component.props.content || 'Card content...'}</p>
      ${component.props.hasButton ? `<button class="btn btn-primary">Action</button>` : ''}
    </div>`;

        default:
          return `    <div :style="${JSON.stringify(style)}">
      <!-- ${component.type} component -->
    </div>`;
      }
    }).join('\n\n');
  }

  private static generateAngularCode(components: Component[], theme: Theme): string {
    const template = this.generateAngularTemplate(components, theme);

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
  
  handleClick() {
    console.log('Button clicked');
  }
}`;
  }

  private static generateAngularTemplate(components: Component[], theme: Theme): string {
    return components.map(component => {
      const style = this.convertToAngularStyle(component.style, component.position);
      
      switch (component.type) {
        case 'button':
          return `      <button 
        class="btn btn-${component.props.variant || 'primary'}"
        [ngStyle]="${JSON.stringify(style)}"
        (click)="handleClick()"
      >
        ${component.props.text || 'Button'}
      </button>`;

        case 'navbar':
          return `      <nav class="navbar" [ngStyle]="${JSON.stringify(style)}">
        <div class="navbar-brand">${component.props.title || 'Logo'}</div>
        <div class="navbar-menu">
${(component.props.items || []).map((item: string) => `          <a href="#" class="navbar-item">${item}</a>`).join('\n')}
        </div>
      </nav>`;

        default:
          return `      <div [ngStyle]="${JSON.stringify(style)}">
        <!-- ${component.type} component -->
      </div>`;
      }
    }).join('\n\n');
  }

  private static generateSvelteCode(components: Component[], theme: Theme): string {
    const template = this.generateSvelteTemplate(components, theme);

    return `<script>
  function handleClick() {
    console.log('Button clicked');
  }
</script>

<div class="app" style="background: ${theme.colors.background}">
${template}
</div>

<style>
${this.generateCSS(theme)}
</style>`;
  }

  private static generateSvelteTemplate(components: Component[], theme: Theme): string {
    return components.map(component => {
      const style = this.convertToSvelteStyle(component.style, component.position);
      
      switch (component.type) {
        case 'button':
          return `  <button 
    class="btn btn-${component.props.variant || 'primary'}"
    style="${style}"
    on:click={handleClick}
  >
    ${component.props.text || 'Button'}
  </button>`;

        case 'navbar':
          return `  <nav class="navbar" style="${style}">
    <div class="navbar-brand">${component.props.title || 'Logo'}</div>
    <div class="navbar-menu">
${(component.props.items || []).map((item: string) => `      <a href="#" class="navbar-item">${item}</a>`).join('\n')}
    </div>
  </nav>`;

        default:
          return `  <div style="${style}">
    <!-- ${component.type} component -->
  </div>`;
      }
    }).join('\n\n');
  }

  private static generateNextJSCode(components: Component[], theme: Theme): string {
    const componentJSX = this.generateReactJSX(components, theme);

    return `import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <Head>
        <title>Interface Futuriste</title>
        <meta name="description" content="Interface générée avec FutureUI" />
      </Head>
      
      <div className="app" style={{ background: '${theme.colors.background}' }}>
${componentJSX}
      </div>
    </>
  );
}`;
  }

  private static generateNuxtCode(components: Component[], theme: Theme): string {
    const template = this.generateVueTemplate(components, theme);

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
const activeTab = ref(0);

const handleClick = () => {
  console.log('Button clicked');
};
</script>

<style scoped>
${this.generateCSS(theme)}
</style>`;
  }

  private static generateSymfonyCode(components: Component[], theme: Theme): string {
    const template = this.generateTwigTemplate(components, theme);

    return `{# templates/base.html.twig #}
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{% block title %}Interface Futuriste{% endblock %}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
${this.generateCSS(theme)}
    </style>
</head>
<body>
    <div class="app" style="background: ${theme.colors.background}">
        {% block body %}
${template}
        {% endblock %}
    </div>
    
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Symfony template loaded');
        });
    </script>
</body>
</html>`;
  }

  private static generateTwigTemplate(components: Component[], theme: Theme): string {
    return components.map(component => {
      const style = this.convertToHTMLStyle(component.style, component.position);
      
      switch (component.type) {
        case 'button':
          return `        <button class="btn btn-{{ variant|default('primary') }}" style="${style}">
          {{ text|default('Button') }}
        </button>`;

        case 'navbar':
          return `        <nav class="navbar" style="${style}">
          <div class="navbar-brand">{{ title|default('Logo') }}</div>
          <div class="navbar-menu">
            {% for item in items %}
              <a href="#" class="navbar-item">{{ item }}</a>
            {% endfor %}
          </div>
        </nav>`;

        default:
          return `        <div style="${style}">
          {# ${component.type} component #}
        </div>`;
      }
    }).join('\n\n');
  }

  private static generateLaravelCode(components: Component[], theme: Theme): string {
    const template = this.generateBladeTemplate(components, theme);

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

  private static generateBladeTemplate(components: Component[], theme: Theme): string {
    return components.map(component => {
      const style = this.convertToHTMLStyle(component.style, component.position);
      
      switch (component.type) {
        case 'button':
          return `        <button class="btn btn-{{ $variant ?? 'primary' }}" style="${style}">
          {{ $text ?? 'Button' }}
        </button>`;

        case 'navbar':
          return `        <nav class="navbar" style="${style}">
          <div class="navbar-brand">{{ $title ?? 'Logo' }}</div>
          <div class="navbar-menu">
            @foreach($items ?? [] as $item)
              <a href="#" class="navbar-item">{{ $item }}</a>
            @endforeach
          </div>
        </nav>`;

        default:
          return `        <div style="${style}">
          {{-- ${component.type} component --}}
        </div>`;
      }
    }).join('\n\n');
  }

  private static generateDjangoCode(components: Component[], theme: Theme): string {
    const template = this.generateDjangoTemplate(components, theme);

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
            console.log('Django template loaded');
        });
    </script>
</body>
</html>`;
  }

  private static generateDjangoTemplate(components: Component[], theme: Theme): string {
    return components.map(component => {
      const style = this.convertToHTMLStyle(component.style, component.position);
      
      switch (component.type) {
        case 'button':
          return `        <button class="btn btn-{{ variant|default:'primary' }}" style="${style}">
          {{ text|default:'Button' }}
        </button>`;

        case 'navbar':
          return `        <nav class="navbar" style="${style}">
          <div class="navbar-brand">{{ title|default:'Logo' }}</div>
          <div class="navbar-menu">
            {% for item in items %}
              <a href="#" class="navbar-item">{{ item }}</a>
            {% endfor %}
          </div>
        </nav>`;

        default:
          return `        <div style="${style}">
          {# ${component.type} component #}
        </div>`;
      }
    }).join('\n\n');
  }

  private static generateRailsCode(components: Component[], theme: Theme): string {
    const template = this.generateERBTemplate(components, theme);

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

  private static generateERBTemplate(components: Component[], theme: Theme): string {
    return components.map(component => {
      const style = this.convertToHTMLStyle(component.style, component.position);
      
      switch (component.type) {
        case 'button':
          return `      <button class="btn btn-<%= variant || 'primary' %>" style="${style}">
        <%= text || 'Button' %>
      </button>`;

        case 'navbar':
          return `      <nav class="navbar" style="${style}">
        <div class="navbar-brand"><%= title || 'Logo' %></div>
        <div class="navbar-menu">
          <% (items || []).each do |item| %>
            <a href="#" class="navbar-item"><%= item %></a>
          <% end %>
        </div>
      </nav>`;

        default:
          return `      <div style="${style}">
        <%# ${component.type} component %>
      </div>`;
      }
    }).join('\n\n');
  }

  private static generateExpressCode(components: Component[], theme: Theme): string {
    const template = this.generateEJSTemplate(components, theme);

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

  private static generateEJSTemplate(components: Component[], theme: Theme): string {
    return components.map(component => {
      const style = this.convertToHTMLStyle(component.style, component.position);
      
      switch (component.type) {
        case 'button':
          return `        <button class="btn btn-<%= variant || 'primary' %>" style="${style}">
          <%= text || 'Button' %>
        </button>`;

        case 'navbar':
          return `        <nav class="navbar" style="${style}">
          <div class="navbar-brand"><%= title || 'Logo' %></div>
          <div class="navbar-menu">
            <% (items || []).forEach(function(item) { %>
              <a href="#" class="navbar-item"><%= item %></a>
            <% }); %>
          </div>
        </nav>`;

        default:
          return `        <div style="${style}">
          <%# ${component.type} component %>
        </div>`;
      }
    }).join('\n\n');
  }

  private static generateFastAPICode(components: Component[], theme: Theme): string {
    const template = this.generateJinjaTemplate(components, theme);

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

  private static generateJinjaTemplate(components: Component[], theme: Theme): string {
    return components.map(component => {
      const style = this.convertToHTMLStyle(component.style, component.position);
      
      switch (component.type) {
        case 'button':
          return `        <button class="btn btn-{{ variant or 'primary' }}" style="${style}">
          {{ text or 'Button' }}
        </button>`;

        case 'navbar':
          return `        <nav class="navbar" style="${style}">
          <div class="navbar-brand">{{ title or 'Logo' }}</div>
          <div class="navbar-menu">
            {% for item in items %}
              <a href="#" class="navbar-item">{{ item }}</a>
            {% endfor %}
          </div>
        </nav>`;

        default:
          return `        <div style="${style}">
          {# ${component.type} component #}
        </div>`;
      }
    }).join('\n\n');
  }

  private static generateHTMLCode(components: Component[], theme: Theme): string {
    const body = this.generateHTMLTemplate(components, theme);

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
      document.addEventListener('DOMContentLoaded', function() {
        console.log('HTML template loaded');
        
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

  private static generateHTMLTemplate(components: Component[], theme: Theme): string {
    return components.map(component => {
      const style = this.convertToHTMLStyle(component.style, component.position);
      
      switch (component.type) {
        case 'button':
          return `        <button class="btn btn-${component.props.variant || 'primary'}" style="${style}">
          ${component.props.text || 'Button'}
        </button>`;

        case 'navbar':
          return `        <nav class="navbar" style="${style}">
          <div class="navbar-brand">${component.props.title || 'Logo'}</div>
          <div class="navbar-menu">
${(component.props.items || []).map((item: string) => `            <a href="#" class="navbar-item">${item}</a>`).join('\n')}
          </div>
        </nav>`;

        case 'card':
          return `        <div class="card" style="${style}">
          <h3 class="card-title">${component.props.title || 'Card Title'}</h3>
          <p class="card-content">${component.props.content || 'Card content...'}</p>
          ${component.props.hasButton ? `<button class="btn btn-primary">Action</button>` : ''}
        </div>`;

        default:
          return `        <div style="${style}">
          <!-- ${component.type} component -->
        </div>`;
      }
    }).join('\n\n');
  }

  // Utilitaires de conversion de styles
  private static convertToReactStyle(style: any, position: any): any {
    return {
      position: 'absolute',
      left: `${position.x}px`,
      top: `${position.y}px`,
      width: `${position.width}px`,
      height: position.height === 'auto' ? 'auto' : `${position.height}px`,
      ...style,
    };
  }

  private static convertToVueStyle(style: any, position: any): any {
    return this.convertToReactStyle(style, position);
  }

  private static convertToAngularStyle(style: any, position: any): any {
    return this.convertToReactStyle(style, position);
  }

  private static convertToSvelteStyle(style: any, position: any): string {
    const styleObj = this.convertToReactStyle(style, position);
    return Object.entries(styleObj).map(([key, value]) => `${key}: ${value}`).join('; ');
  }

  private static convertToHTMLStyle(style: any, position: any): string {
    const styleObj = this.convertToReactStyle(style, position);
    return Object.entries(styleObj).map(([key, value]) => `${key}: ${value}`).join('; ');
  }

  // Utilitaires Flutter
  private static hexToInt(hex: string): number {
    return parseInt(hex.replace('#', ''), 16);
  }

  private static getFlutterFontSize(size?: string): number {
    switch (size) {
      case 'xs': return 12;
      case 'sm': return 14;
      case 'lg': return 20;
      case 'xl': return 24;
      case '2xl': return 32;
      case '3xl': return 48;
      default: return 16;
    }
  }

  private static getFlutterFontWeight(weight?: string): string {
    switch (weight) {
      case 'light': return 'FontWeight.w300';
      case 'medium': return 'FontWeight.w500';
      case 'semibold': return 'FontWeight.w600';
      case 'bold': return 'FontWeight.w700';
      case 'extrabold': return 'FontWeight.w800';
      default: return 'FontWeight.w400';
    }
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
  gap: ${theme.spacing.lg};
  align-items: center;
}

.navbar-item {
  color: ${theme.colors.text};
  text-decoration: none;
  transition: all 0.3s ease;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 6px;
  font-size: ${theme.typography.fontSize.sm};
}

.navbar-item:hover {
  color: ${theme.colors.primary};
  background: ${theme.colors.primary}20;
  ${theme.effects.glow ? `box-shadow: 0 0 10px ${theme.colors.primary}30;` : ''}
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
}
`;
  }
}