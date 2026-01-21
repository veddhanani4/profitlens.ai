// ProfitLens AI - Geolocation & Auto Language Detection

// Language mapping by country code
const COUNTRY_LANGUAGE_MAP = {
    'IN': 'hi', // India -> Hindi
    'CN': 'zh', // China -> Chinese
    'ID': 'id', // Indonesia -> Indonesian
    'US': 'en', // United States -> English
    'GB': 'en', // United Kingdom -> English
    'AU': 'en', // Australia -> English
    'CA': 'en', // Canada -> English
    'SG': 'en', // Singapore -> English
    'MY': 'en', // Malaysia -> English
    'PH': 'en', // Philippines -> English
    'HK': 'zh', // Hong Kong -> Chinese
    'TW': 'zh', // Taiwan -> Chinese
    // Add more countries as needed
};

// Default language
const DEFAULT_LANGUAGE = 'en';

// Detect user's country using geolocation API
async function detectCountryByGeolocation() {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            console.log('Geolocation not supported');
            resolve(null);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;

                    // Use reverse geocoding API to get country
                    // Option 1: Using ipapi.co (free tier available)
                    const response = await fetch(`https://ipapi.co/json/`);
                    const data = await response.json();

                    console.log('📍 Location detected:', data.country_name);
                    resolve(data.country_code);
                } catch (error) {
                    console.error('Reverse geocoding failed:', error);
                    resolve(null);
                }
            },
            (error) => {
                console.log('Geolocation permission denied or error:', error.message);
                resolve(null);
            },
            {
                timeout: 10000,
                maximumAge: 300000 // Cache for 5 minutes
            }
        );
    });
}

// Detect country by IP address (fallback method)
async function detectCountryByIP() {
    try {
        // Using ipapi.co free API
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        console.log('🌐 Country detected by IP:', data.country_name);
        return data.country_code;
    } catch (error) {
        console.error('IP-based detection failed:', error);
        return null;
    }
}

// Get browser language
function getBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0]; // Get 'en' from 'en-US'

    // Map browser language to supported languages
    const supportedLanguages = ['en', 'hi', 'zh', 'id'];
    if (supportedLanguages.includes(langCode)) {
        return langCode;
    }

    return DEFAULT_LANGUAGE;
}

// Auto-detect and set language
async function autoDetectLanguage() {
    // Check if user has manually set a language before
    const savedLanguage = storage.get('userLanguage');
    if (savedLanguage) {
        console.log('Using saved language preference:', savedLanguage);
        return savedLanguage;
    }

    // Show loading indicator
    showLanguageDetectionNotice();

    try {
        // Try geolocation first (most accurate)
        let countryCode = await detectCountryByGeolocation();

        // Fallback to IP-based detection
        if (!countryCode) {
            countryCode = await detectCountryByIP();
        }

        // Map country to language
        let detectedLanguage = DEFAULT_LANGUAGE;
        if (countryCode && COUNTRY_LANGUAGE_MAP[countryCode]) {
            detectedLanguage = COUNTRY_LANGUAGE_MAP[countryCode];
        } else {
            // Fallback to browser language
            detectedLanguage = getBrowserLanguage();
        }

        console.log('✅ Auto-detected language:', detectedLanguage);

        // Set the language
        if (typeof setLanguage === 'function') {
            setLanguage(detectedLanguage);
        } else {
            currentLanguage = detectedLanguage;
            storage.set('currentLanguage', detectedLanguage);
        }

        // Show notification
        showLanguageDetectedNotification(detectedLanguage);

        return detectedLanguage;

    } catch (error) {
        console.error('Language auto-detection failed:', error);
        return DEFAULT_LANGUAGE;
    } finally {
        hideLanguageDetectionNotice();
    }
}

// Show language detection notice
function showLanguageDetectionNotice() {
    const notice = document.createElement('div');
    notice.id = 'language-detection-notice';
    notice.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--gradient-primary);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: var(--radius-lg);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: var(--font-size-sm);
    animation: slideInRight 0.3s ease;
  `;

    notice.innerHTML = `
    <div class="spinner" style="width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite;"></div>
    <span>Detecting your location...</span>
  `;

    document.body.appendChild(notice);
}

// Hide language detection notice
function hideLanguageDetectionNotice() {
    const notice = document.getElementById('language-detection-notice');
    if (notice) {
        notice.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notice.remove(), 300);
    }
}

// Show language detected notification
function showLanguageDetectedNotification(language) {
    const languageNames = {
        en: 'English',
        hi: 'हिंदी (Hindi)',
        zh: '中文 (Chinese)',
        id: 'Bahasa Indonesia'
    };

    const notification = document.createElement('div');
    notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--gradient-success);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: var(--radius-lg);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: var(--font-size-sm);
    animation: slideInRight 0.3s ease;
  `;

    notification.innerHTML = `
    <span>✓</span>
    <span>Language set to: <strong>${languageNames[language]}</strong></span>
    <button onclick="this.parentElement.remove()" style="background: none; border: none; color: white; cursor: pointer; font-size: 1.2rem; padding: 0 0.5rem;">&times;</button>
  `;

    document.body.appendChild(notification);

    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Request location permission with user-friendly message
async function requestLocationPermission() {
    return new Promise((resolve) => {
        // Show permission request dialog
        const dialog = document.createElement('div');
        dialog.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10001;
      animation: fadeIn 0.3s ease;
    `;

        dialog.innerHTML = `
      <div class="card" style="max-width: 400px; margin: 1rem; animation: scaleIn 0.3s ease;">
        <div class="card-header">
          <h3>🌍 Enable Location Services</h3>
        </div>
        <div class="card-body">
          <p>We'd like to detect your location to automatically set the best language for you.</p>
          <p class="text-secondary" style="font-size: var(--font-size-sm); margin-top: 1rem;">
            Your location data is only used for language detection and is never stored or shared.
          </p>
        </div>
        <div class="card-footer" style="display: flex; gap: 1rem;">
          <button class="btn btn-primary" style="flex: 1;" onclick="this.closest('div[style*=fixed]').dispatchEvent(new CustomEvent('allow'))">
            Allow
          </button>
          <button class="btn btn-secondary" style="flex: 1;" onclick="this.closest('div[style*=fixed]').dispatchEvent(new CustomEvent('deny'))">
            Skip
          </button>
        </div>
      </div>
    `;

        dialog.addEventListener('allow', () => {
            dialog.remove();
            resolve(true);
        });

        dialog.addEventListener('deny', () => {
            dialog.remove();
            resolve(false);
        });

        document.body.appendChild(dialog);
    });
}

// Initialize auto language detection on page load
async function initializeAutoLanguage() {
    // Check if this is first visit
    const hasVisited = storage.get('hasVisited');

    if (!hasVisited) {
        // First visit - request permission and auto-detect
        const permissionGranted = await requestLocationPermission();

        if (permissionGranted) {
            await autoDetectLanguage();
        } else {
            // Use browser language as fallback
            const browserLang = getBrowserLanguage();
            if (typeof setLanguage === 'function') {
                setLanguage(browserLang);
            }
        }

        storage.set('hasVisited', true);
    } else {
        // Returning visitor - use saved preference or auto-detect silently
        const savedLanguage = storage.get('userLanguage');
        if (!savedLanguage) {
            // Silently detect without permission dialog
            const countryCode = await detectCountryByIP();
            const detectedLanguage = COUNTRY_LANGUAGE_MAP[countryCode] || getBrowserLanguage();
            if (typeof setLanguage === 'function') {
                setLanguage(detectedLanguage);
            }
        }
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes scaleIn {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        autoDetectLanguage,
        initializeAutoLanguage,
        detectCountryByGeolocation,
        detectCountryByIP,
        getBrowserLanguage
    };
}
