import { IconOption } from '@/types';

export const availableIcons: IconOption[] = [
  // UI Icons
  { name: 'Home', component: 'Home', category: 'ui' },
  { name: 'Search', component: 'Search', category: 'ui' },
  { name: 'Settings', component: 'Settings', category: 'ui' },
  { name: 'User', component: 'User', category: 'ui' },
  { name: 'Menu', component: 'Menu', category: 'ui' },
  { name: 'Close', component: 'X', category: 'ui' },
  { name: 'Plus', component: 'Plus', category: 'ui' },
  { name: 'Minus', component: 'Minus', category: 'ui' },
  { name: 'Edit', component: 'Edit', category: 'ui' },
  { name: 'Trash', component: 'Trash2', category: 'ui' },
  { name: 'Save', component: 'Save', category: 'ui' },
  { name: 'Download', component: 'Download', category: 'ui' },
  { name: 'Upload', component: 'Upload', category: 'ui' },
  { name: 'Copy', component: 'Copy', category: 'ui' },
  { name: 'Check', component: 'Check', category: 'ui' },
  { name: 'Alert', component: 'AlertCircle', category: 'ui' },
  { name: 'Info', component: 'Info', category: 'ui' },
  { name: 'Help', component: 'HelpCircle', category: 'ui' },
  { name: 'Eye', component: 'Eye', category: 'ui' },
  { name: 'EyeOff', component: 'EyeOff', category: 'ui' },
  { name: 'Lock', component: 'Lock', category: 'ui' },
  { name: 'Unlock', component: 'Unlock', category: 'ui' },
  { name: 'Heart', component: 'Heart', category: 'ui' },
  { name: 'Star', component: 'Star', category: 'ui' },
  { name: 'Bookmark', component: 'Bookmark', category: 'ui' },
  { name: 'Filter', component: 'Filter', category: 'ui' },
  { name: 'Sort', component: 'ArrowUpDown', category: 'ui' },

  // Arrows
  { name: 'Arrow Up', component: 'ArrowUp', category: 'arrows' },
  { name: 'Arrow Down', component: 'ArrowDown', category: 'arrows' },
  { name: 'Arrow Left', component: 'ArrowLeft', category: 'arrows' },
  { name: 'Arrow Right', component: 'ArrowRight', category: 'arrows' },
  { name: 'Chevron Up', component: 'ChevronUp', category: 'arrows' },
  { name: 'Chevron Down', component: 'ChevronDown', category: 'arrows' },
  { name: 'Chevron Left', component: 'ChevronLeft', category: 'arrows' },
  { name: 'Chevron Right', component: 'ChevronRight', category: 'arrows' },

  // Media
  { name: 'Play', component: 'Play', category: 'media' },
  { name: 'Pause', component: 'Pause', category: 'media' },
  { name: 'Stop', component: 'Square', category: 'media' },
  { name: 'Skip Forward', component: 'SkipForward', category: 'media' },
  { name: 'Skip Back', component: 'SkipBack', category: 'media' },
  { name: 'Volume', component: 'Volume2', category: 'media' },
  { name: 'Volume Off', component: 'VolumeX', category: 'media' },
  { name: 'Image', component: 'Image', category: 'media' },
  { name: 'Video', component: 'Video', category: 'media' },
  { name: 'Camera', component: 'Camera', category: 'media' },
  { name: 'Mic', component: 'Mic', category: 'media' },

  // Business
  { name: 'Shopping Cart', component: 'ShoppingCart', category: 'business' },
  { name: 'Shopping Bag', component: 'ShoppingBag', category: 'business' },
  { name: 'Credit Card', component: 'CreditCard', category: 'business' },
  { name: 'Dollar Sign', component: 'DollarSign', category: 'business' },
  { name: 'Briefcase', component: 'Briefcase', category: 'business' },
  { name: 'Building', component: 'Building', category: 'business' },
  { name: 'Chart', component: 'BarChart3', category: 'business' },
  { name: 'Trending Up', component: 'TrendingUp', category: 'business' },
  { name: 'Trending Down', component: 'TrendingDown', category: 'business' },
  { name: 'Target', component: 'Target', category: 'business' },
  { name: 'Calendar', component: 'Calendar', category: 'business' },
  { name: 'Clock', component: 'Clock', category: 'business' },
  { name: 'Mail', component: 'Mail', category: 'business' },
  { name: 'Phone', component: 'Phone', category: 'business' },
  { name: 'Globe', component: 'Globe', category: 'business' },

  // Social
  { name: 'Share', component: 'Share2', category: 'social' },
  { name: 'Message Circle', component: 'MessageCircle', category: 'social' },
  { name: 'Message Square', component: 'MessageSquare', category: 'social' },
  { name: 'Users', component: 'Users', category: 'social' },
  { name: 'User Plus', component: 'UserPlus', category: 'social' },
  { name: 'User Minus', component: 'UserMinus', category: 'social' },
  { name: 'Thumbs Up', component: 'ThumbsUp', category: 'social' },
  { name: 'Thumbs Down', component: 'ThumbsDown', category: 'social' },
  { name: 'Link', component: 'Link', category: 'social' },
  { name: 'Bell', component: 'Bell', category: 'social' }
];

export const getIconsByCategory = () => {
  return {
    ui: availableIcons.filter(icon => icon.category === 'ui'),
    arrows: availableIcons.filter(icon => icon.category === 'arrows'),
    media: availableIcons.filter(icon => icon.category === 'media'),
    business: availableIcons.filter(icon => icon.category === 'business'),
    social: availableIcons.filter(icon => icon.category === 'social'),
  };
};

export const getIconByName = (name: string): IconOption | undefined => {
  return availableIcons.find(icon => icon.name.toLowerCase() === name.toLowerCase() || icon.component.toLowerCase() === name.toLowerCase());
};