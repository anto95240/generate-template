export interface Component {
  id: string;
  type: ComponentType;
  name: string;
  props: Record<string, any>;
  style: ComponentStyle;
  position: Position;
  framework?: Framework;
  animations?: ComponentAnimation[];
}

export interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ComponentStyle extends React.CSSProperties {
  backgroundColor?: string;
  color?: string;
  borderRadius?: string;
  padding?: string;
  margin?: string;
  fontSize?: string;
  fontWeight?: string;
  border?: string;
  borderWidth?: string;
  borderStyle?: string;
  borderColor?: string;
  boxShadow?: string;
  gradient?: string;
  opacity?: string;
  transform?: string;
  filter?: string;
  backdropFilter?: string;
  textShadow?: string;
  outline?: string;
  cursor?: string;
  overflow?: string;
  zIndex?: string;
}

export interface ComponentAnimation {
  name: string;
  duration: string;
  timing: string;
  delay?: string;
  iteration?: string;
  direction?: string;
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
  | 'aside'
  | 'footer'
  | 'modal'
  | 'form'
  | 'table'
  | 'grid'
  | 'hero'
  | 'testimonial'
  | 'pricing'
  | 'feature'
  | 'gallery'
  | 'timeline'
  | 'accordion'
  | 'tabs'
  | 'breadcrumb'
  | 'pagination'
  | 'progress'
  | 'badge'
  | 'alert'
  | 'tooltip'
  | 'dropdown';

export type Framework = 
  | 'react' 
  | 'vue' 
  | 'angular' 
  | 'svelte'
  | 'flutter'
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
    success?: string;
    warning?: string;
    error?: string;
    info?: string;
  };
  effects: {
    glow: boolean;
    glassmorphism: boolean;
    neon: boolean;
    shadows: boolean;
    gradients: boolean;
    animations: boolean;
  };
  typography: {
    fontFamily: string;
    headingFont?: string;
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'landing' | 'dashboard' | 'ecommerce' | 'blog' | 'portfolio' | 'app';
  components: Component[];
  theme: string;
  framework: Framework;
  preview?: string;
}

export interface AIToken {
  remaining: number;
  total: number;
  resetTime: Date;
  model: string;
}

export interface ExportOptions {
  fileName: string;
  includeAssets: boolean;
  minify: boolean;
  format: 'single' | 'modular';
}