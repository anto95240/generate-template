import { ShadowPreset, GradientPreset, IconOption } from '@/types';

export const shadowPresets: ShadowPreset[] = [
  { name: 'Aucune', value: 'none' },
  { name: 'Subtile', value: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)' },
  { name: 'Légère', value: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)' },
  { name: 'Moyenne', value: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)' },
  { name: 'Forte', value: '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)' },
  { name: 'Très forte', value: '0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)' },
  { name: 'Glow cyan', value: '0 0 20px rgba(0, 212, 255, 0.5)' },
  { name: 'Glow purple', value: '0 0 20px rgba(181, 55, 247, 0.5)' },
  { name: 'Glow green', value: '0 0 20px rgba(0, 255, 148, 0.5)' },
  { name: 'Néon', value: '0 0 30px currentColor, 0 0 60px currentColor' },
];

export const gradientPresets: GradientPreset[] = [
  { name: 'Aucun', value: 'none' },
  { name: 'Sunset', value: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)' },
  { name: 'Ocean', value: 'linear-gradient(45deg, #667eea, #764ba2)' },
  { name: 'Cosmic', value: 'linear-gradient(45deg, #ff0080, #8000ff)' },
  { name: 'Forest', value: 'linear-gradient(45deg, #2ECC71, #27AE60)' },
  { name: 'Fire', value: 'linear-gradient(45deg, #FF4757, #FF6B6B)' },
  { name: 'Ice', value: 'linear-gradient(45deg, #00D4FF, #B537F7)' },
  { name: 'Gold', value: 'linear-gradient(45deg, #FFD700, #FFA500)' },
  { name: 'Purple Rain', value: 'linear-gradient(45deg, #667eea, #764ba2)' },
  { name: 'Miami Vice', value: 'linear-gradient(45deg, #ff0080, #00ffff)' },
  { name: 'Synthwave', value: 'linear-gradient(45deg, #ff0080, #ff8000, #ffff00)' },
];

export const iconOptions: IconOption[] = [
  // UI Icons
  { name: 'Home', component: 'Home', category: 'ui' },
  { name: 'User', component: 'User', category: 'ui' },
  { name: 'Settings', component: 'Settings', category: 'ui' },
  { name: 'Search', component: 'Search', category: 'ui' },
  { name: 'Bell', component: 'Bell', category: 'ui' },
  { name: 'Heart', component: 'Heart', category: 'ui' },
  { name: 'Star', component: 'Star', category: 'ui' },
  { name: 'Eye', component: 'Eye', category: 'ui' },
  { name: 'Lock', component: 'Lock', category: 'ui' },
  { name: 'Unlock', component: 'Unlock', category: 'ui' },

  // Social Icons
  { name: 'Twitter', component: 'Twitter', category: 'social' },
  { name: 'Facebook', component: 'Facebook', category: 'social' },
  { name: 'Instagram', component: 'Instagram', category: 'social' },
  { name: 'LinkedIn', component: 'Linkedin', category: 'social' },
  { name: 'GitHub', component: 'Github', category: 'social' },
  { name: 'YouTube', component: 'Youtube', category: 'social' },

  // Business Icons
  { name: 'Briefcase', component: 'Briefcase', category: 'business' },
  { name: 'Building', component: 'Building', category: 'business' },
  { name: 'Calendar', component: 'Calendar', category: 'business' },
  { name: 'Clock', component: 'Clock', category: 'business' },
  { name: 'Mail', component: 'Mail', category: 'business' },
  { name: 'Phone', component: 'Phone', category: 'business' },

  // Arrows
  { name: 'Arrow Right', component: 'ArrowRight', category: 'arrows' },
  { name: 'Arrow Left', component: 'ArrowLeft', category: 'arrows' },
  { name: 'Arrow Up', component: 'ArrowUp', category: 'arrows' },
  { name: 'Arrow Down', component: 'ArrowDown', category: 'arrows' },
  { name: 'Chevron Right', component: 'ChevronRight', category: 'arrows' },
  { name: 'Chevron Left', component: 'ChevronLeft', category: 'arrows' },

  // Media
  { name: 'Play', component: 'Play', category: 'media' },
  { name: 'Pause', component: 'Pause', category: 'media' },
  { name: 'Stop', component: 'Stop', category: 'media' },
  { name: 'Volume', component: 'Volume2', category: 'media' },
  { name: 'Image', component: 'Image', category: 'media' },
  { name: 'Video', component: 'Video', category: 'media' },
];