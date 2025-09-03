import React from 'react';
import { Component, Theme } from '@/types';

interface ComponentRendererProps {
  component: Component;
  theme: Theme;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({ component, theme }) => {
  const getThemeStyles = () => {
    const baseStyles = {
      color: theme.colors.text,
      fontFamily: theme.typography.fontFamily,
      ...component.style,
    } as any;

    // Apply theme effects
    if (theme.effects.glow && (component.type === 'button' || component.props.variant === 'neon')) {
      baseStyles.boxShadow = `0 0 20px ${theme.colors.primary}40`;
    }

    if (theme.effects.glassmorphism && component.props.variant === 'glass') {
      baseStyles.backdropFilter = 'blur(20px)';
      baseStyles.background = `${theme.colors.surface}80`;
    }

    // Apply animations
    if (component.animations && component.animations.length > 0) {
      const animationNames = component.animations.map(anim => anim.name).join(', ');
      const animationDurations = component.animations.map(anim => anim.duration).join(', ');
      const animationTimings = component.animations.map(anim => anim.timing).join(', ');
      
      baseStyles.animation = `${animationNames} ${animationDurations} ${animationTimings} infinite`;
    }

    return baseStyles;
  };

  const renderComponent = () => {
    const styles = getThemeStyles();

    switch (component.type) {
      case 'button':
        return (
          <button
            className={`
              px-6 py-3 rounded-lg font-medium transition-all duration-200 
              hover:scale-105 hover:shadow-lg cursor-pointer
              ${theme.effects.neon && component.props.variant === 'neon' ? 'animate-pulse' : ''}
            `}
            style={{
              ...styles,
              backgroundColor: component.props.variant === 'primary' ? theme.colors.primary : 
                              component.props.variant === 'secondary' ? theme.colors.secondary :
                              component.props.variant === 'ghost' ? 'transparent' : 
                              component.props.variant === 'gradient' ? `linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.secondary})` :
                              component.props.variant === 'glass' ? 'rgba(255, 255, 255, 0.1)' :
                              component.props.variant === 'neon' ? 'transparent' :
                              theme.colors.primary,
              border: component.props.variant === 'ghost' || component.props.variant === 'neon' ? `2px solid ${theme.colors.primary}` : 'none',
              color: component.props.variant === 'ghost' || component.props.variant === 'neon' ? theme.colors.primary : theme.colors.background,
              fontSize: component.props.size === 'small' ? '14px' : 
                       component.props.size === 'large' ? '18px' : 
                       component.props.size === 'xl' ? '20px' : '16px',
              padding: component.props.size === 'small' ? '8px 16px' : 
                       component.props.size === 'large' ? '16px 32px' : 
                       component.props.size === 'xl' ? '20px 40px' : '12px 24px',
            }}
          >
            {component.props.text || 'Button'}
          </button>
        );

      case 'navbar':
        return (
          <nav
            className="w-full px-6 py-4 flex items-center justify-between"
            style={styles}
          >
            <div className="text-lg font-bold" style={{ color: theme.colors.primary }}>
              {component.props.title || 'Logo'}
            </div>
            <div className="flex gap-6">
              {(component.props.items || []).map((item: string, index: number) => (
                <a
                  key={index}
                  href="#"
                  className="text-sm hover:text-cyan-400 transition-colors"
                  style={{ color: theme.colors.text }}
                >
                  {item}
                </a>
              ))}
            </div>
          </nav>
        );

      case 'aside':
        return (
          <aside
            className="h-full flex flex-col"
            style={{
              ...styles,
              backgroundColor: theme.colors.surface,
              borderRight: component.props.position === 'left' ? `1px solid ${theme.colors.primary}30` : 'none',
              borderLeft: component.props.position === 'right' ? `1px solid ${theme.colors.primary}30` : 'none',
            }}
          >
            <div className="p-4 border-b border-gray-700">
              <h3 className="font-semibold text-lg" style={{ color: theme.colors.text }}>
                {component.props.title || 'Menu'}
              </h3>
            </div>
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {(component.props.items || []).map((item: string, index: number) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="block px-3 py-2 rounded-lg text-sm transition-all duration-200 hover:bg-gray-700/50"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        );

      case 'hero':
        return (
          <section
            className="flex flex-col items-center justify-center text-center"
            style={styles}
          >
            <h1 
              className="text-4xl font-bold mb-4"
              style={{ 
                color: theme.colors.text,
                fontFamily: theme.typography.headingFont || theme.typography.fontFamily,
              }}
            >
              {component.props.title || 'Titre Principal'}
            </h1>
            <p 
              className="text-xl mb-8 max-w-2xl"
              style={{ color: theme.colors.textSecondary }}
            >
              {component.props.subtitle || 'Sous-titre descriptif'}
            </p>
            {component.props.hasButton && (
              <button
                className="px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.background,
                  boxShadow: theme.effects.glow ? `0 0 30px ${theme.colors.primary}40` : 'none',
                }}
              >
                {component.props.buttonText || 'Action'}
              </button>
            )}
          </section>
        );

      case 'footer':
        return (
          <footer
            className="w-full p-6"
            style={{
              ...styles,
              backgroundColor: theme.colors.surface,
              borderTop: `1px solid ${theme.colors.primary}30`,
            }}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="text-lg font-bold" style={{ color: theme.colors.primary }}>
                {component.props.title || 'Brand'}
              </div>
              <div className="flex gap-6">
                {(component.props.links || []).map((link: string, index: number) => (
                  <a
                    key={index}
                    href="#"
                    className="text-sm hover:text-cyan-400 transition-colors"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    {link}
                  </a>
                ))}
              </div>
              <div className="text-xs" style={{ color: theme.colors.textSecondary }}>
                {component.props.copyright || '© 2025 Tous droits réservés'}
              </div>
            </div>
          </footer>
        );

      case 'card':
        return (
          <div
            className="p-6 rounded-xl border transition-all duration-200 hover:scale-105"
            style={{
              ...styles,
              backgroundColor: theme.colors.surface,
              borderColor: `${theme.colors.primary}30`,
            }}
          >
            <h3 className="text-lg font-semibold mb-3" style={{ color: theme.colors.text }}>
              {component.props.title || 'Card Title'}
            </h3>
            <p className="text-sm mb-4" style={{ color: theme.colors.textSecondary }}>
              {component.props.content || 'Card content goes here...'}
            </p>
            {component.props.hasButton && (
              <button
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.background,
                }}
              >
                Action
              </button>
            )}
          </div>
        );

      case 'input':
        return (
          <div className="w-full">
            {component.props.label && (
              <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                {component.props.label}
              </label>
            )}
            <input
              type={component.props.type || 'text'}
              placeholder={component.props.placeholder || 'Enter text...'}
              className="w-full px-4 py-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2"
              style={{
                ...styles,
                backgroundColor: theme.colors.surface,
                borderColor: `${theme.colors.primary}30`,
                boxShadow: theme.effects.glow ? `0 0 10px ${theme.colors.primary}20` : 'none',
              }}
            />
          </div>
        );

      case 'text':
        return (
          <div 
            className="font-medium"
            style={{
              ...styles,
              fontSize: component.props.size === '3xl' ? '48px' :
                       component.props.size === '2xl' ? '32px' :
                       component.props.size === 'xl' ? '24px' :
                       component.props.size === 'lg' ? '20px' :
                       component.props.size === 'sm' ? '14px' :
                       component.props.size === 'xs' ? '12px' : '16px',
              fontWeight: component.props.weight === 'light' ? '300' :
                          component.props.weight === 'medium' ? '500' :
                          component.props.weight === 'semibold' ? '600' :
                          component.props.weight === 'bold' ? '700' :
                          component.props.weight === 'extrabold' ? '800' : '400',
            }}
          >
            {component.props.content || 'Sample Text'}
          </div>
        );

      case 'form':
        return (
          <form
            className="p-6 rounded-xl border transition-all duration-200"
            style={{
              ...styles,
              backgroundColor: theme.colors.surface,
              borderColor: `${theme.colors.primary}30`,
            }}
          >
            <h2 className="text-xl font-bold mb-6 text-center" style={{ color: theme.colors.text }}>
              {component.props.title || 'Formulaire'}
            </h2>
            <div className="space-y-4">
              {(component.props.fields || []).map((field: string, index: number) => (
                <div key={index}>
                  <label className="block text-sm font-medium mb-2" style={{ color: theme.colors.text }}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  {field === 'message' ? (
                    <textarea
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-200"
                      rows={3}
                      style={{
                        backgroundColor: `${theme.colors.background}80`,
                        borderColor: `${theme.colors.primary}30`,
                        color: theme.colors.text,
                      }}
                    />
                  ) : (
                    <input
                      type={field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
                      className="w-full px-4 py-3 rounded-lg border transition-all duration-200"
                      style={{
                        backgroundColor: `${theme.colors.background}80`,
                        borderColor: `${theme.colors.primary}30`,
                        color: theme.colors.text,
                      }}
                    />
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg font-medium transition-all duration-200"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.background,
                }}
              >
                {component.props.submitText || 'Envoyer'}
              </button>
            </div>
          </form>
        );

      case 'table':
        return (
          <div
            className="rounded-xl overflow-hidden border"
            style={{
              ...styles,
              backgroundColor: theme.colors.surface,
              borderColor: `${theme.colors.primary}30`,
            }}
          >
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: `${theme.colors.primary}20` }}>
                  {(component.props.headers || []).map((header: string, index: number) => (
                    <th
                      key={index}
                      className="px-4 py-3 text-left font-semibold"
                      style={{ color: theme.colors.text }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(component.props.rows || []).map((row: string[], rowIndex: number) => (
                  <tr
                    key={rowIndex}
                    className="hover:bg-opacity-10 transition-colors"
                    style={{ borderBottom: `1px solid ${theme.colors.primary}20` }}
                  >
                    {row.map((cell: string, cellIndex: number) => (
                      <td
                        key={cellIndex}
                        className="px-4 py-3"
                        style={{ color: theme.colors.textSecondary }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case 'grid':
        return (
          <div
            className="grid gap-4 p-4"
            style={{
              ...styles,
              gridTemplateColumns: `repeat(${component.props.columns || 3}, 1fr)`,
            }}
          >
            {(component.props.items || []).map((item: string, index: number) => (
              <div
                key={index}
                className="p-4 rounded-lg border text-center transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: theme.colors.surface,
                  borderColor: `${theme.colors.primary}30`,
                  color: theme.colors.text,
                }}
              >
                {item}
              </div>
            ))}
          </div>
        );

      case 'badge':
        return (
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
            style={{
              ...styles,
              backgroundColor: component.props.variant === 'success' ? theme.colors.success :
                              component.props.variant === 'warning' ? theme.colors.warning :
                              component.props.variant === 'error' ? theme.colors.error :
                              component.props.variant === 'info' ? theme.colors.info :
                              theme.colors.primary,
              color: theme.colors.background,
            }}
          >
            {component.props.text || 'Badge'}
          </span>
        );

      case 'alert':
        return (
          <div
            className="p-4 rounded-lg border flex items-start gap-3"
            style={{
              ...styles,
              backgroundColor: component.props.type === 'success' ? `${theme.colors.success}20` :
                              component.props.type === 'warning' ? `${theme.colors.warning}20` :
                              component.props.type === 'error' ? `${theme.colors.error}20` :
                              `${theme.colors.info}20`,
              borderColor: component.props.type === 'success' ? theme.colors.success :
                          component.props.type === 'warning' ? theme.colors.warning :
                          component.props.type === 'error' ? theme.colors.error :
                          theme.colors.info,
            }}
          >
            <div className="flex-1">
              <h4 className="font-semibold text-sm mb-1" style={{ color: theme.colors.text }}>
                {component.props.title || 'Alert'}
              </h4>
              <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
                {component.props.message || 'Alert message'}
              </p>
            </div>
            {component.props.dismissible && (
              <button className="text-gray-400 hover:text-gray-300">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        );

      case 'progress':
        return (
          <div className="w-full">
            {component.props.label && (
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium" style={{ color: theme.colors.text }}>
                  {component.props.label}
                </label>
                {component.props.showPercentage && (
                  <span className="text-sm" style={{ color: theme.colors.textSecondary }}>
                    {Math.round((component.props.value / component.props.max) * 100)}%
                  </span>
                )}
              </div>
            )}
            <div
              className="w-full bg-gray-700 rounded-full overflow-hidden"
              style={{ height: styles.height || '8px' }}
            >
              <div
                className="h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${(component.props.value / component.props.max) * 100}%`,
                  backgroundColor: theme.colors.primary,
                  boxShadow: theme.effects.glow ? `0 0 10px ${theme.colors.primary}` : 'none',
                }}
              />
            </div>
          </div>
        );

      case 'tabs':
        return (
          <div className="w-full" style={styles}>
            <div className="flex border-b border-gray-700">
              {(component.props.tabs || []).map((tab: string, index: number) => (
                <button
                  key={index}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                    index === component.props.activeTab ? 'border-b-2' : ''
                  }`}
                  style={{
                    color: index === component.props.activeTab ? theme.colors.primary : theme.colors.textSecondary,
                    borderColor: index === component.props.activeTab ? theme.colors.primary : 'transparent',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-4" style={{ color: theme.colors.text }}>
              Contenu de l'onglet {(component.props.activeTab || 0) + 1}
            </div>
          </div>
        );

      case 'accordion':
        return (
          <div className="w-full space-y-2" style={styles}>
            {(component.props.items || []).map((item: any, index: number) => (
              <div
                key={index}
                className="border rounded-lg overflow-hidden"
                style={{ borderColor: `${theme.colors.primary}30` }}
              >
                <button
                  className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-700/30 transition-colors"
                  style={{ backgroundColor: theme.colors.surface }}
                >
                  <span className="font-medium" style={{ color: theme.colors.text }}>
                    {item.title}
                  </span>
                  <ChevronDown className="w-4 h-4" style={{ color: theme.colors.textSecondary }} />
                </button>
                <div
                  className="px-4 py-3 border-t"
                  style={{ 
                    backgroundColor: `${theme.colors.background}50`,
                    borderColor: `${theme.colors.primary}20`,
                    color: theme.colors.textSecondary,
                  }}
                >
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return (
          <div
            className="w-full h-full border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center"
            style={{ color: theme.colors.textSecondary }}
          >
            <span className="text-sm">Composant {component.type}</span>
          </div>
        );
    }
  };

  return <div className="w-full h-full">{renderComponent()}</div>;
};