// ProfitLens AI - Theme Manager (Light/Dark Mode)

// Theme configuration
const THEMES = {
    dark: {
        name: 'Dark',
        icon: '🌙',
        colors: {
            '--color-bg-primary': '#0a0e27',
            '--color-bg-secondary': '#151932',
            '--color-bg-tertiary': '#1e2139',
            '--color-text-primary': '#e2e8f0',
            '--color-text-secondary': '#94a3b8',
            '--color-text-tertiary': '#64748b',
            '--color-border': '#2d3250',
            '--color-primary': '#6366f1',
            '--color-primary-hover': '#4f46e5',
            '--color-secondary': '#8b5cf6',
            '--color-accent': '#ec4899',
            '--color-success': '#10b981',
            '--color-warning': '#f59e0b',
            '--color-error': '#ef4444'
        }
    },
    light: {
        name: 'Light',
        icon: '☀️',
        colors: {
            '--color-bg-primary': '#ffffff',
            '--color-bg-secondary': '#f8fafc',
            '--color-bg-tertiary': '#f1f5f9',
            '--color-text-primary': '#0f172a',
            '--color-text-secondary': '#475569',
            '--color-text-tertiary': '#94a3b8',
            '--color-border': '#e2e8f0',
            '--color-primary': '#6366f1',
            '--color-primary-hover': '#4f46e5',
            '--color-secondary': '#8b5cf6',
            '--color-accent': '#ec4899',
            '--color-success': '#10b981',
            '--color-warning': '#f59e0b',
            '--color-error': '#ef4444'
        }
    }
};

// Get current theme
function getCurrentTheme() {
    return storage.get('theme', 'dark');
}

// Set theme
function setTheme(themeName) {
    const theme = THEMES[themeName];
    if (!theme) return;

    // Apply CSS variables
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });

    // Save preference
    storage.set('theme', themeName);

    // Update toggle button if exists
    updateThemeToggleButton(themeName);

    // Dispatch event for other components
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: themeName } }));

    console.log(`🎨 Theme changed to: ${theme.name}`);
}

// Toggle between themes
function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);

    // Show notification
    const themeName = THEMES[newTheme].name;
    if (typeof toast !== 'undefined') {
        toast.success(`Switched to ${themeName} mode`);
    }
}

// Update theme toggle button
function updateThemeToggleButton(themeName) {
    const button = document.getElementById('theme-toggle');
    if (!button) return;

    const theme = THEMES[themeName];
    const nextTheme = themeName === 'dark' ? THEMES.light : THEMES.dark;

    button.innerHTML = `
    <span style="font-size: 1.2rem;">${nextTheme.icon}</span>
    <span class="hide-mobile" style="margin-left: 0.5rem;">${nextTheme.name}</span>
  `;
    button.title = `Switch to ${nextTheme.name} mode`;
}

// Create theme toggle button
function createThemeToggle() {
    const currentTheme = getCurrentTheme();
    const nextTheme = currentTheme === 'dark' ? THEMES.light : THEMES.dark;

    return `
    <button 
      id="theme-toggle" 
      onclick="toggleTheme()" 
      class="btn btn-secondary"
      style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem;"
      title="Switch to ${nextTheme.name} mode"
    >
      <span style="font-size: 1.2rem;">${nextTheme.icon}</span>
      <span class="hide-mobile">${nextTheme.name}</span>
    </button>
  `;
}

// Initialize theme on page load
function initializeTheme() {
    const savedTheme = getCurrentTheme();
    setTheme(savedTheme);

    // Auto-detect system preference if no saved theme
    if (!storage.get('theme')) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark ? 'dark' : 'light');
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!storage.get('themeManuallySet')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    console.log('🎨 Theme system initialized');
}

// Mark theme as manually set
function markThemeManuallySet() {
    storage.set('themeManuallySet', true);
}

// Get theme-aware color
function getThemedColor(colorName) {
    const theme = getCurrentTheme();
    return THEMES[theme].colors[colorName];
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeTheme,
        setTheme,
        toggleTheme,
        getCurrentTheme,
        createThemeToggle,
        getThemedColor,
        THEMES
    };
}
