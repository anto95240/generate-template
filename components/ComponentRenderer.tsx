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
      ...component.style,
    } as any;

    if (theme.effects.glow && component.type === 'button') {
      baseStyles.boxShadow = `0 0 20px ${theme.colors.primary}40`;
    }

    if (theme.effects.glassmorphism) {
      baseStyles.backdropFilter = 'blur(20px)';
      baseStyles.background = `${theme.colors.surface}80`;
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
              hover:scale-105 hover:shadow-lg
              ${theme.effects.neon ? 'animate-pulse' : ''}
            `}
            style={{
              ...styles,
              backgroundColor: component.props.variant === 'primary' ? theme.colors.primary : 
                              component.props.variant === 'ghost' ? 'transparent' : theme.colors.secondary,
              border: component.props.variant === 'ghost' ? `2px solid ${theme.colors.primary}` : 'none',
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

      case 'text':
        return (
          <div 
            className="font-medium"
            style={{
              ...styles,
              fontSize: component.props.size === 'large' ? '24px' : 
                       component.props.size === 'small' ? '14px' : '16px',
            }}
          >
            {component.props.content || 'Sample Text'}
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