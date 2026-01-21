// ProfitLens AI - Main Application Logic

// Current language
let currentLanguage = storage.get('language', CONFIG.app.defaultLanguage);

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Set initial language
    setLanguage(currentLanguage);

    // Initialize language selector
    initLanguageSelector();

    // Initialize mobile menu
    initMobileMenu();

    // Initialize authentication UI
    authManager.updateUI();

    // Add smooth scroll
    initSmoothScroll();
}

// Language Management
function setLanguage(lang) {
    if (!CONFIG.languages[lang]) {
        console.warn(`Language ${lang} not supported, falling back to English`);
        lang = 'en';
    }

    currentLanguage = lang;
    storage.set('language', lang);
    translatePage(lang);
    updateLanguageSelector(lang);
}

function initLanguageSelector() {
    const languageBtn = document.getElementById('language-btn');
    const languageDropdown = document.getElementById('language-dropdown');

    if (!languageBtn || !languageDropdown) return;

    // Populate language options
    const optionsHTML = Object.entries(CONFIG.languages).map(([code, lang]) => `
    <div class="language-option ${code === currentLanguage ? 'active' : ''}" 
         data-lang="${code}"
         onclick="selectLanguage('${code}')">
      <span>${lang.flag}</span>
      <span>${lang.name}</span>
    </div>
  `).join('');

    languageDropdown.innerHTML = optionsHTML;

    // Toggle dropdown
    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        languageDropdown.classList.remove('active');
    });
}

function selectLanguage(lang) {
    setLanguage(lang);
    const languageDropdown = document.getElementById('language-dropdown');
    if (languageDropdown) {
        languageDropdown.classList.remove('active');
    }
}

function updateLanguageSelector(lang) {
    const languageBtn = document.getElementById('language-btn');
    if (languageBtn) {
        const langConfig = CONFIG.languages[lang];
        languageBtn.innerHTML = `
      <span>${langConfig.flag}</span>
      <span>${langConfig.name}</span>
      <span>▼</span>
    `;
    }

    // Update active state in dropdown
    document.querySelectorAll('.language-option').forEach(option => {
        if (option.dataset.lang === lang) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });

    // Close menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Pricing Plan Selection
function selectPlan(planId) {
    if (!authManager.isAuthenticated()) {
        toast.warning(getTranslation(currentLanguage, 'notifications.upgradeRequired'));
        window.location.href = 'auth.html';
        return;
    }

    if (planId === 'free') {
        toast.info('You are already on the free plan');
        return;
    }

    // In production, integrate with payment gateway
    confirmDialog(
        `Upgrade to ${CONFIG.pricing[planId].name} plan for ${formatCurrency(CONFIG.pricing[planId].price)}/${CONFIG.pricing[planId].period}?`,
        () => {
            const result = authManager.upgradePlan(planId);
            if (result.success) {
                toast.success('Plan upgraded successfully!');
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            } else {
                toast.error(result.error);
            }
        }
    );
}

// Navigation
function navigateTo(page) {
    window.location.href = page;
}

function logout() {
    confirmDialog(
        'Are you sure you want to logout?',
        () => {
            authManager.logout();
            toast.success('Logged out successfully');
        }
    );
}

// Check API Configuration
function checkAPIConfiguration() {
    if (!claudeAPI.isConfigured()) {
        const modal = new Modal({
            title: 'API Configuration Required',
            content: `
        <p>To use ProfitLens AI features, you need to configure your Anthropic API key.</p>
        <ol style="margin-top: 1rem; padding-left: 1.5rem;">
          <li>Get your API key from <a href="https://console.anthropic.com/" target="_blank">Anthropic Console</a></li>
          <li>Open <code>config.js</code> file</li>
          <li>Add your API key to <code>CONFIG.api.anthropic.apiKey</code></li>
          <li>Reload the page</li>
        </ol>
        <p style="margin-top: 1rem; color: var(--color-warning);">
          <strong>Note:</strong> For production, move API calls to a backend server to secure your API key.
        </p>
      `,
            footer: `
        <button class="btn btn-primary" onclick="window.open('https://console.anthropic.com/', '_blank')">
          Get API Key
        </button>
        <button class="btn btn-secondary" onclick="this.closest('.modal').modalInstance.close()">
          Close
        </button>
      `,
            closeOnBackdrop: false
        });
        modal.show();
        return false;
    }
    return true;
}

// Feature Access Check
function checkFeatureAccess(feature) {
    if (!authManager.isAuthenticated()) {
        toast.warning('Please login to use this feature');
        setTimeout(() => {
            window.location.href = 'auth.html';
        }, 1500);
        return false;
    }

    if (!authManager.canUseFeature(feature)) {
        const stats = authManager.getUsageStats();
        const featureStats = stats[feature];

        toast.warning(getTranslation(currentLanguage, 'notifications.limitReached'));

        setTimeout(() => {
            const modal = new Modal({
                title: 'Usage Limit Reached',
                content: `
          <p>You have used ${featureStats.used} of ${featureStats.limit} ${feature} analyses in your current plan.</p>
          <p style="margin-top: 1rem;">Upgrade your plan to get more analyses and unlock premium features.</p>
        `,
                footer: `
          <button class="btn btn-secondary" onclick="this.closest('.modal').modalInstance.close()">
            Close
          </button>
          <button class="btn btn-primary" onclick="window.location.href='index.html#pricing'">
            View Plans
          </button>
        `
            });
            modal.show();
        }, 500);

        return false;
    }

    return true;
}

// Utility function to get current user's plan
function getCurrentPlan() {
    const user = authManager.getCurrentUser();
    return user ? CONFIG.pricing[user.plan] : CONFIG.pricing.free;
}

// Export functions for global use
window.ProfitLensApp = {
    setLanguage,
    selectLanguage,
    selectPlan,
    navigateTo,
    logout,
    checkAPIConfiguration,
    checkFeatureAccess,
    getCurrentPlan
};
