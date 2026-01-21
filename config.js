// ProfitLens AI - Configuration
const CONFIG = {
  // API Configuration
  api: {
    anthropic: {
      baseUrl: 'https://api.anthropic.com/v1',
      model: 'claude-sonnet-4-20250514',
      maxTokens: 4096,
      // NOTE: For production, move API key to backend proxy
      apiKey: '' // User needs to add their Anthropic API key here
    }
  },

  // Supported Languages
  languages: {
    en: { name: 'English', flag: '🇬🇧', rtl: false },
    hi: { name: 'हिंदी', flag: '🇮🇳', rtl: false },
    zh: { name: '中文', flag: '🇨🇳', rtl: false },
    id: { name: 'Bahasa', flag: '🇮🇩', rtl: false }
  },

  // Pricing Tiers
  pricing: {
    free: {
      id: 'free',
      name: 'Free',
      price: 0,
      currency: '₹',
      features: {
        profitAnalysis: { enabled: true, limit: 3 },
        electricityAnalysis: { enabled: true, limit: 2 },
        advancedInsights: false,
        prioritySupport: false,
        multiLocation: false,
        exportReports: false
      }
    },
    starter: {
      id: 'starter',
      name: 'Starter',
      price: 499,
      currency: '₹',
      period: 'month',
      features: {
        profitAnalysis: { enabled: true, limit: 20 },
        electricityAnalysis: { enabled: true, limit: 10 },
        advancedInsights: true,
        prioritySupport: false,
        multiLocation: false,
        exportReports: true
      }
    },
    professional: {
      id: 'professional',
      name: 'Professional',
      price: 999,
      currency: '₹',
      period: 'month',
      popular: true,
      features: {
        profitAnalysis: { enabled: true, limit: -1 }, // unlimited
        electricityAnalysis: { enabled: true, limit: -1 },
        advancedInsights: true,
        prioritySupport: true,
        multiLocation: false,
        exportReports: true
      }
    },
    enterprise: {
      id: 'enterprise',
      name: 'Enterprise',
      price: 1999,
      currency: '₹',
      period: 'month',
      features: {
        profitAnalysis: { enabled: true, limit: -1 },
        electricityAnalysis: { enabled: true, limit: -1 },
        advancedInsights: true,
        prioritySupport: true,
        multiLocation: true,
        exportReports: true,
        customIntegration: true
      }
    }
  },

  // Feature Flags
  features: {
    enableAnalytics: false,
    enableNotifications: true,
    enableDarkMode: true,
    enableOfflineMode: false
  },

  // App Settings
  app: {
    name: 'ProfitLens AI',
    version: '1.0.0',
    defaultLanguage: 'en',
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
    maxFileSize: 5 * 1024 * 1024 // 5MB for bill uploads
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
}
