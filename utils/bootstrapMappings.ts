// Mappings des styles personnalisés vers les classes Bootstrap natives
export const bootstrapMappings = {
  buttons: {
    primary: 'btn btn-primary',
    secondary: 'btn btn-secondary', 
    success: 'btn btn-success',
    danger: 'btn btn-danger',
    warning: 'btn btn-warning',
    info: 'btn btn-info',
    light: 'btn btn-light',
    dark: 'btn btn-dark',
    outline: 'btn btn-outline-primary',
    'outline-secondary': 'btn btn-outline-secondary',
    'outline-success': 'btn btn-outline-success',
    'outline-danger': 'btn btn-outline-danger',
    link: 'btn btn-link',
    large: 'btn btn-primary btn-lg',
    small: 'btn btn-primary btn-sm',
    block: 'btn btn-primary w-100'
  },
  cards: {
    default: 'card',
    header: 'card-header',
    body: 'card-body',
    footer: 'card-footer',
    title: 'card-title',
    text: 'card-text',
    img: 'card-img-top',
    border: 'border',
    shadow: 'shadow',
    'shadow-sm': 'shadow-sm',
    'shadow-lg': 'shadow-lg'
  },
  navigation: {
    navbar: 'navbar navbar-expand-lg navbar-dark bg-dark',
    'navbar-light': 'navbar navbar-expand-lg navbar-light bg-light',
    'navbar-brand': 'navbar-brand',
    'navbar-nav': 'navbar-nav',
    'nav-item': 'nav-item',
    'nav-link': 'nav-link',
    'nav-pills': 'nav nav-pills',
    'nav-tabs': 'nav nav-tabs'
  },
  forms: {
    form: 'form',
    'form-group': 'mb-3',
    'form-control': 'form-control',
    'form-label': 'form-label',
    'form-text': 'form-text',
    'form-select': 'form-select',
    'form-check': 'form-check',
    'form-check-input': 'form-check-input',
    'form-check-label': 'form-check-label',
    'input-group': 'input-group',
    'input-group-text': 'input-group-text'
  },
  layout: {
    container: 'container',
    'container-fluid': 'container-fluid',
    row: 'row',
    'col-12': 'col-12',
    'col-6': 'col-6',
    'col-4': 'col-4',
    'col-3': 'col-3',
    'col-md-6': 'col-md-6',
    'col-lg-4': 'col-lg-4'
  },
  utilities: {
    'text-center': 'text-center',
    'text-start': 'text-start',
    'text-end': 'text-end',
    'text-primary': 'text-primary',
    'text-secondary': 'text-secondary',
    'text-success': 'text-success',
    'text-danger': 'text-danger',
    'bg-primary': 'bg-primary',
    'bg-secondary': 'bg-secondary',
    'bg-light': 'bg-light',
    'bg-dark': 'bg-dark',
    'p-1': 'p-1',
    'p-2': 'p-2',
    'p-3': 'p-3',
    'p-4': 'p-4',
    'p-5': 'p-5',
    'm-1': 'm-1',
    'm-2': 'm-2',
    'm-3': 'm-3',
    'm-4': 'm-4',
    'm-5': 'm-5',
    'd-flex': 'd-flex',
    'justify-content-center': 'justify-content-center',
    'align-items-center': 'align-items-center',
    'flex-column': 'flex-column'
  },
  components: {
    alert: 'alert alert-info',
    'alert-primary': 'alert alert-primary',
    'alert-secondary': 'alert alert-secondary',
    'alert-success': 'alert alert-success',
    'alert-danger': 'alert alert-danger',
    'alert-warning': 'alert alert-warning',
    badge: 'badge bg-primary',
    'badge-secondary': 'badge bg-secondary',
    'badge-success': 'badge bg-success',
    modal: 'modal fade',
    'modal-dialog': 'modal-dialog',
    'modal-content': 'modal-content',
    'modal-header': 'modal-header',
    'modal-body': 'modal-body',
    'modal-footer': 'modal-footer'
  }
};

export function getBootstrapClass(componentType: string, variant: string = 'default'): string {
  const typeMapping = bootstrapMappings[componentType as keyof typeof bootstrapMappings];
  if (typeMapping && typeof typeMapping === 'object') {
    return (typeMapping as any)[variant] || (typeMapping as any)['default'] || '';
  }
  return '';
}

export function generateBootstrapHTML(components: any[]): string {
  return components.map(component => {
    const baseClass = getBootstrapClass(component.type, component.variant);
    const additionalClasses = component.style?.className || '';
    const className = `${baseClass} ${additionalClasses}`.trim();
    
    switch (component.type) {
      case 'button':
        return `<button class="${className}" ${component.props?.disabled ? 'disabled' : ''}>${component.props?.text || 'Button'}</button>`;
      case 'card':
        return `
        <div class="${className}">
          ${component.props?.header ? `<div class="card-header">${component.props.header}</div>` : ''}
          <div class="card-body">
            ${component.props?.title ? `<h5 class="card-title">${component.props.title}</h5>` : ''}
            ${component.props?.text ? `<p class="card-text">${component.props.text}</p>` : ''}
          </div>
        </div>`;
      case 'navbar':
        return `
        <nav class="${className}">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">${component.props?.brand || 'Brand'}</a>
          </div>
        </nav>`;
      case 'input':
        return `
        <div class="mb-3">
          ${component.props?.label ? `<label class="form-label">${component.props.label}</label>` : ''}
          <input type="${component.props?.type || 'text'}" class="form-control" placeholder="${component.props?.placeholder || ''}" ${component.props?.required ? 'required' : ''}>
        </div>`;
      default:
        return `<div class="${className}">${component.props?.text || component.name}</div>`;
    }
  }).join('\n');
}