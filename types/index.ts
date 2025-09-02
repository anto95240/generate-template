export interface Component {
  id: string;
  type: ComponentType;
  name: string;
  props: Record<string, any>;
  style: ComponentStyle;
  position: Position;
  framework?: Framework;
}

export interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ComponentStyle {
  backgroundColor?: string;
  color?: string;
  borderRadius?: string;
  padding?: string;
  margin?: string;
  fontSize?: string;
  fontWeight?: string;
  border?: string;
  boxShadow?: string;
  gradient?: string;
}

export type ComponentType = 
  | 'button' 
  | 'navbar' 
  | 'menu' 
  | 'card' 
  | 'input' 
  | 'text' 
  | 'image' 
  | 'container'
  | 'sidebar'
  | 'footer'
  | 'modal'
  | 'form'
  | 'table'
  | 'grid';

export type Framework = 
  | 'react' 
  | 'vue' 
  | 'angular' 
  | 'svelte'
  | 'nextjs'
  | 'nuxtjs'
  | 'html'
  | 'symfony'
  | 'laravel'
  | 'django'
  | 'rails'
  | 'express'
  | 'fastapi';

export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    textSecondary: string;
  };
  effects: {
    glow: boolean;
    glassmorphism: boolean;
    neon: boolean;
  };
}

export interface Template {
  id: string;
  name: string;
  components: Component[];
  theme: string;
  framework: Framework;
}