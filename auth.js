// ProfitLens AI - Authentication System

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Load user from storage
        this.currentUser = storage.get('currentUser');
        this.updateUI();
    }

    /**
     * Register a new user
     * @param {object} userData - User registration data
     * @returns {Promise<object>} Result object
     */
    async register(userData) {
        // Validate input
        if (!validators.required(userData.email) || !validators.email(userData.email)) {
            return { success: false, error: getTranslation(currentLanguage, 'auth.invalidEmail') };
        }

        if (!validators.required(userData.password) || !validators.minLength(userData.password, 6)) {
            return { success: false, error: 'Password must be at least 6 characters' };
        }

        if (userData.password !== userData.confirmPassword) {
            return { success: false, error: getTranslation(currentLanguage, 'auth.passwordMismatch') };
        }

        try {
            // Try backend API first
            if (typeof backendAPI !== 'undefined') {
                const result = await backendAPI.register(userData);
                if (result.success) {
                    this.currentUser = result.user;
                    storage.set('currentUser', this.currentUser);
                    this.updateUI();
                    return result;
                }
            }
        } catch (error) {
            console.warn('Backend registration failed, using localStorage:', error);
        }

        // Fallback to localStorage
        const users = storage.get('users', []);
        const existingUser = users.find(u => u.email === userData.email);

        if (existingUser) {
            return { success: false, error: 'Email already registered' };
        }

        // Create new user
        const newUser = {
            id: generateId(),
            email: userData.email,
            fullName: userData.fullName,
            businessName: userData.businessName,
            password: this.hashPassword(userData.password), // In production, use proper hashing
            plan: 'free',
            createdAt: new Date().toISOString(),
            usage: {
                profitAnalysis: 0,
                electricityAnalysis: 0
            }
        };

        users.push(newUser);
        storage.set('users', users);

        // Auto-login
        this.login({ email: userData.email, password: userData.password });

        return { success: true, user: this.sanitizeUser(newUser) };
    }

    /**
     * Login user
     * @param {object} credentials - Login credentials
     * @returns {Promise<object>} Result object
     */
    async login(credentials) {
        try {
            // Try backend API first
            if (typeof backendAPI !== 'undefined') {
                const result = await backendAPI.login(credentials);
                if (result.success) {
                    this.currentUser = result.user;
                    storage.set('currentUser', this.currentUser);
                    this.updateUI();
                    return result;
                }
            }
        } catch (error) {
            console.warn('Backend login failed, using localStorage:', error);
        }

        // Fallback to localStorage
        const users = storage.get('users', []);
        const user = users.find(u =>
            u.email === credentials.email &&
            u.password === this.hashPassword(credentials.password)
        );

        if (!user) {
            return {
                success: false,
                error: getTranslation(currentLanguage, 'auth.loginError')
            };
        }

        // Set current user
        this.currentUser = this.sanitizeUser(user);
        storage.set('currentUser', this.currentUser);
        this.updateUI();

        return { success: true, user: this.currentUser };
    }

    /**
     * Logout current user
     */
    logout() {
        this.currentUser = null;
        storage.remove('currentUser');
        this.updateUI();
        window.location.href = 'index.html';
    }

    /**
     * Check if user is authenticated
     * @returns {boolean} True if user is logged in
     */
    isAuthenticated() {
        return !!this.currentUser;
    }

    /**
     * Get current user
     * @returns {object|null} Current user or null
     */
    getCurrentUser() {
        return this.currentUser;
    }

    /**
     * Update user profile
     * @param {object} updates - Profile updates
     * @returns {object} Result object
     */
    updateProfile(updates) {
        if (!this.isAuthenticated()) {
            return { success: false, error: 'Not authenticated' };
        }

        const users = storage.get('users', []);
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);

        if (userIndex === -1) {
            return { success: false, error: 'User not found' };
        }

        // Update user
        users[userIndex] = { ...users[userIndex], ...updates };
        storage.set('users', users);

        // Update current user
        this.currentUser = this.sanitizeUser(users[userIndex]);
        storage.set('currentUser', this.currentUser);

        return { success: true, user: this.currentUser };
    }

    /**
     * Check if user can use a feature
     * @param {string} feature - Feature name
     * @returns {boolean} True if user can use feature
     */
    canUseFeature(feature) {
        if (!this.isAuthenticated()) {
            return false;
        }

        const plan = CONFIG.pricing[this.currentUser.plan];
        if (!plan) return false;

        const featureConfig = plan.features[feature];
        if (!featureConfig || !featureConfig.enabled) {
            return false;
        }

        // Check usage limits
        if (featureConfig.limit === -1) {
            return true; // Unlimited
        }

        const usage = this.currentUser.usage[feature] || 0;
        return usage < featureConfig.limit;
    }

    /**
     * Increment feature usage
     * @param {string} feature - Feature name
     */
    incrementUsage(feature) {
        if (!this.isAuthenticated()) return;

        const users = storage.get('users', []);
        const userIndex = users.findIndex(u => u.id === this.currentUser.id);

        if (userIndex !== -1) {
            users[userIndex].usage = users[userIndex].usage || {};
            users[userIndex].usage[feature] = (users[userIndex].usage[feature] || 0) + 1;
            storage.set('users', users);

            this.currentUser.usage = users[userIndex].usage;
            storage.set('currentUser', this.currentUser);
        }
    }

    /**
     * Get usage stats
     * @returns {object} Usage statistics
     */
    getUsageStats() {
        if (!this.isAuthenticated()) return null;

        const plan = CONFIG.pricing[this.currentUser.plan];
        const usage = this.currentUser.usage || {};

        return {
            profitAnalysis: {
                used: usage.profitAnalysis || 0,
                limit: plan.features.profitAnalysis.limit,
                remaining: plan.features.profitAnalysis.limit === -1
                    ? 'Unlimited'
                    : plan.features.profitAnalysis.limit - (usage.profitAnalysis || 0)
            },
            electricityAnalysis: {
                used: usage.electricityAnalysis || 0,
                limit: plan.features.electricityAnalysis.limit,
                remaining: plan.features.electricityAnalysis.limit === -1
                    ? 'Unlimited'
                    : plan.features.electricityAnalysis.limit - (usage.electricityAnalysis || 0)
            }
        };
    }

    /**
     * Upgrade user plan
     * @param {string} planId - New plan ID
     * @returns {object} Result object
     */
    upgradePlan(planId) {
        if (!this.isAuthenticated()) {
            return { success: false, error: 'Not authenticated' };
        }

        if (!CONFIG.pricing[planId]) {
            return { success: false, error: 'Invalid plan' };
        }

        return this.updateProfile({ plan: planId });
    }

    /**
     * Simple password hashing (for demo purposes only)
     * In production, use proper server-side hashing with bcrypt or similar
     * @param {string} password - Password to hash
     * @returns {string} Hashed password
     */
    hashPassword(password) {
        // This is NOT secure - only for demo purposes
        // In production, handle authentication server-side with proper hashing
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return hash.toString(36);
    }

    /**
     * Remove sensitive data from user object
     * @param {object} user - User object
     * @returns {object} Sanitized user object
     */
    sanitizeUser(user) {
        const { password, ...sanitized } = user;
        return sanitized;
    }

    /**
     * Update UI based on authentication state
     */
    updateUI() {
        const authLinks = document.querySelectorAll('.auth-only');
        const guestLinks = document.querySelectorAll('.guest-only');
        const userNameElements = document.querySelectorAll('.user-name');

        if (this.isAuthenticated()) {
            authLinks.forEach(el => el.classList.remove('hidden'));
            guestLinks.forEach(el => el.classList.add('hidden'));
            userNameElements.forEach(el => {
                el.textContent = this.currentUser.fullName || this.currentUser.email;
            });
        } else {
            authLinks.forEach(el => el.classList.add('hidden'));
            guestLinks.forEach(el => el.classList.remove('hidden'));
        }
    }
}

// Create global auth manager instance
const authManager = new AuthManager();

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AuthManager, authManager };
}
