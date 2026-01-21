// ProfitLens AI - Reusable UI Components

// Toast Notification Component
class Toast {
    constructor() {
        this.container = this.createContainer();
    }

    createContainer() {
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        z-index: 1070;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      `;
            document.body.appendChild(container);
        }
        return container;
    }

    show(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icon = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        }[type] || 'ℹ';

        toast.innerHTML = `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <span style="font-size: 1.5rem;">${icon}</span>
        <span>${message}</span>
      </div>
    `;

        this.container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                this.container.removeChild(toast);
            }, 300);
        }, duration);
    }

    success(message, duration) {
        this.show(message, 'success', duration);
    }

    error(message, duration) {
        this.show(message, 'error', duration);
    }

    warning(message, duration) {
        this.show(message, 'warning', duration);
    }

    info(message, duration) {
        this.show(message, 'info', duration);
    }
}

// Modal Component
class Modal {
    constructor(options = {}) {
        this.options = {
            title: options.title || '',
            content: options.content || '',
            footer: options.footer || '',
            onClose: options.onClose || (() => { }),
            closeOnBackdrop: options.closeOnBackdrop !== false
        };
        this.modal = null;
        this.backdrop = null;
    }

    show() {
        // Create backdrop
        this.backdrop = document.createElement('div');
        this.backdrop.className = 'modal-backdrop';

        if (this.options.closeOnBackdrop) {
            this.backdrop.addEventListener('click', () => this.close());
        }

        // Create modal
        this.modal = document.createElement('div');
        this.modal.className = 'modal';
        this.modal.innerHTML = `
      <div class="modal-header">
        <h3>${this.options.title}</h3>
        <button class="btn btn-secondary btn-sm" onclick="this.closest('.modal').modalInstance.close()">✕</button>
      </div>
      <div class="modal-body">
        ${this.options.content}
      </div>
      ${this.options.footer ? `<div class="modal-footer">${this.options.footer}</div>` : ''}
    `;

        this.modal.modalInstance = this;

        document.body.appendChild(this.backdrop);
        document.body.appendChild(this.modal);
        document.body.style.overflow = 'hidden';
    }

    close() {
        if (this.backdrop) {
            this.backdrop.style.animation = 'fadeOut 0.3s ease-out';
            this.modal.style.animation = 'fadeOut 0.3s ease-out';

            setTimeout(() => {
                document.body.removeChild(this.backdrop);
                document.body.removeChild(this.modal);
                document.body.style.overflow = '';
                this.options.onClose();
            }, 300);
        }
    }
}

// Loading Spinner Component
class LoadingSpinner {
    constructor(container) {
        this.container = container;
        this.spinner = null;
    }

    show(message = 'Loading...') {
        this.spinner = document.createElement('div');
        this.spinner.className = 'loading-container';
        this.spinner.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 2rem;
    `;
        this.spinner.innerHTML = `
      <div class="spinner"></div>
      <p style="color: var(--color-text-secondary);">${message}</p>
    `;

        if (typeof this.container === 'string') {
            document.querySelector(this.container).appendChild(this.spinner);
        } else {
            this.container.appendChild(this.spinner);
        }
    }

    hide() {
        if (this.spinner && this.spinner.parentNode) {
            this.spinner.parentNode.removeChild(this.spinner);
        }
    }
}

// Progress Bar Component
class ProgressBar {
    constructor(container, options = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.options = {
            max: options.max || 100,
            value: options.value || 0,
            showLabel: options.showLabel !== false,
            color: options.color || 'var(--color-primary)'
        };
        this.element = null;
        this.render();
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = 'progress-bar';
        this.element.style.cssText = `
      width: 100%;
      height: 8px;
      background: var(--color-bg-secondary);
      border-radius: var(--radius-full);
      overflow: hidden;
      position: relative;
    `;

        const fill = document.createElement('div');
        fill.className = 'progress-fill';
        fill.style.cssText = `
      height: 100%;
      background: ${this.options.color};
      border-radius: var(--radius-full);
      transition: width 0.3s ease-out;
      width: ${(this.options.value / this.options.max) * 100}%;
    `;

        this.element.appendChild(fill);

        if (this.options.showLabel) {
            const label = document.createElement('div');
            label.className = 'progress-label';
            label.style.cssText = `
        text-align: center;
        margin-top: 0.5rem;
        font-size: var(--font-size-sm);
        color: var(--color-text-secondary);
      `;
            label.textContent = `${Math.round((this.options.value / this.options.max) * 100)}%`;
            this.element.appendChild(label);
        }

        this.container.appendChild(this.element);
    }

    setValue(value) {
        this.options.value = Math.min(Math.max(value, 0), this.options.max);
        const fill = this.element.querySelector('.progress-fill');
        const label = this.element.querySelector('.progress-label');

        const percentage = (this.options.value / this.options.max) * 100;
        fill.style.width = `${percentage}%`;

        if (label) {
            label.textContent = `${Math.round(percentage)}%`;
        }
    }

    increment(amount = 1) {
        this.setValue(this.options.value + amount);
    }
}

// Card Component Builder
function createCard(options = {}) {
    const card = document.createElement('div');
    card.className = `card ${options.className || ''}`;

    if (options.header) {
        const header = document.createElement('div');
        header.className = 'card-header';
        if (typeof options.header === 'string') {
            header.innerHTML = options.header;
        } else {
            header.innerHTML = `
        <h3 class="card-title">${options.header.title || ''}</h3>
        ${options.header.description ? `<p class="card-description">${options.header.description}</p>` : ''}
      `;
        }
        card.appendChild(header);
    }

    if (options.body) {
        const body = document.createElement('div');
        body.className = 'card-body';
        body.innerHTML = options.body;
        card.appendChild(body);
    }

    if (options.footer) {
        const footer = document.createElement('div');
        footer.className = 'card-footer';
        footer.innerHTML = options.footer;
        card.appendChild(footer);
    }

    return card;
}

// Feature Card Component
function createFeatureCard(icon, title, description) {
    return createCard({
        className: 'feature-card',
        body: `
      <div class="feature-icon">${icon}</div>
      <h3>${title}</h3>
      <p>${description}</p>
    `
    });
}

// Pricing Card Component
function createPricingCard(plan) {
    const features = [];

    if (plan.features.profitAnalysis.enabled) {
        const limit = plan.features.profitAnalysis.limit === -1 ? 'Unlimited' : plan.features.profitAnalysis.limit;
        features.push(`${limit} Profit Analyses`);
    }

    if (plan.features.electricityAnalysis.enabled) {
        const limit = plan.features.electricityAnalysis.limit === -1 ? 'Unlimited' : plan.features.electricityAnalysis.limit;
        features.push(`${limit} Electricity Analyses`);
    }

    if (plan.features.advancedInsights) features.push('Advanced Insights');
    if (plan.features.prioritySupport) features.push('Priority Support');
    if (plan.features.multiLocation) features.push('Multi-Location Support');
    if (plan.features.exportReports) features.push('Export Reports');
    if (plan.features.customIntegration) features.push('Custom Integration');

    const featuresHTML = features.map(f => `<li class="pricing-feature">${f}</li>`).join('');

    return `
    <div class="card pricing-card ${plan.popular ? 'popular' : ''}">
      ${plan.popular ? '<div class="pricing-badge">Most Popular</div>' : ''}
      <div class="card-header">
        <h3 class="card-title">${plan.name}</h3>
      </div>
      <div class="card-body">
        <div class="pricing-price">
          <span class="pricing-currency">${plan.currency}</span>${plan.price}
          ${plan.period ? `<span class="pricing-period">/${plan.period}</span>` : ''}
        </div>
        <ul class="pricing-features">
          ${featuresHTML}
        </ul>
      </div>
      <div class="card-footer">
        <button class="btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} btn-lg" 
                onclick="selectPlan('${plan.id}')">
          Choose Plan
        </button>
      </div>
    </div>
  `;
}

// Confirm Dialog
function confirmDialog(message, onConfirm, onCancel) {
    const modal = new Modal({
        title: 'Confirm',
        content: `<p>${message}</p>`,
        footer: `
      <button class="btn btn-secondary" onclick="this.closest('.modal').modalInstance.close()">Cancel</button>
      <button class="btn btn-primary" onclick="this.closest('.modal').modalInstance.confirm()">Confirm</button>
    `,
        onClose: onCancel || (() => { })
    });

    modal.confirm = () => {
        if (onConfirm) onConfirm();
        modal.close();
    };

    modal.show();
    return modal;
}

// Alert Dialog
function alertDialog(message, type = 'info') {
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };

    const modal = new Modal({
        title: type.charAt(0).toUpperCase() + type.slice(1),
        content: `
      <div style="display: flex; align-items: center; gap: 1rem;">
        <span style="font-size: 2rem;">${icons[type] || icons.info}</span>
        <p>${message}</p>
      </div>
    `,
        footer: `
      <button class="btn btn-primary" onclick="this.closest('.modal').modalInstance.close()">OK</button>
    `
    });

    modal.show();
    return modal;
}

// Export components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Toast,
        Modal,
        LoadingSpinner,
        ProgressBar,
        createCard,
        createFeatureCard,
        createPricingCard,
        confirmDialog,
        alertDialog
    };
}

// Create global toast instance
const toast = new Toast();
