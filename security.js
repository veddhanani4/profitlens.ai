// ProfitLens AI - Security Middleware

// Rate Limiting Configuration
const RATE_LIMITS = {
    login: { maxAttempts: 5, windowMs: 15 * 60 * 1000 }, // 5 attempts per 15 minutes
    signup: { maxAttempts: 3, windowMs: 60 * 60 * 1000 }, // 3 attempts per hour
    analysis: { maxAttempts: 10, windowMs: 60 * 1000 }, // 10 analyses per minute
    api: { maxAttempts: 100, windowMs: 60 * 1000 }, // 100 API calls per minute
    chatbot: { maxAttempts: 20, windowMs: 60 * 1000 } // 20 messages per minute
};

// IP-based rate limiter
class RateLimiter {
    constructor() {
        this.attempts = new Map();
    }

    check(identifier, limitConfig) {
        const now = Date.now();
        const key = identifier;

        if (!this.attempts.has(key)) {
            this.attempts.set(key, []);
        }

        const userAttempts = this.attempts.get(key);

        // Remove old attempts outside the window
        const validAttempts = userAttempts.filter(
            timestamp => now - timestamp < limitConfig.windowMs
        );

        this.attempts.set(key, validAttempts);

        // Check if limit exceeded
        if (validAttempts.length >= limitConfig.maxAttempts) {
            const oldestAttempt = Math.min(...validAttempts);
            const retryAfter = Math.ceil((limitConfig.windowMs - (now - oldestAttempt)) / 1000);

            return {
                allowed: false,
                retryAfter,
                message: `Too many attempts. Please try again in ${retryAfter} seconds.`
            };
        }

        // Add current attempt
        validAttempts.push(now);
        this.attempts.set(key, validAttempts);

        return {
            allowed: true,
            remaining: limitConfig.maxAttempts - validAttempts.length
        };
    }

    reset(identifier) {
        this.attempts.delete(identifier);
    }
}

// Global rate limiter instance
const rateLimiter = new RateLimiter();

// Get client identifier (IP simulation using browser fingerprint)
function getClientIdentifier() {
    // In production, use actual IP from server
    // For now, use browser fingerprint
    const fingerprint = [
        navigator.userAgent,
        navigator.language,
        screen.width,
        screen.height,
        new Date().getTimezoneOffset()
    ].join('|');

    return btoa(fingerprint).substring(0, 32);
}

// Input Sanitization
function sanitizeInput(input) {
    if (typeof input !== 'string') return input;

    // Remove HTML tags
    let sanitized = input.replace(/<[^>]*>/g, '');

    // Encode special characters
    sanitized = sanitized
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');

    return sanitized;
}

// SQL Injection Prevention
function preventSQLInjection(input) {
    if (typeof input !== 'string') return input;

    const sqlPatterns = [
        /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/gi,
        /(--|\;|\/\*|\*\/)/g,
        /(\bOR\b.*=.*)/gi,
        /(\bAND\b.*=.*)/gi
    ];

    for (const pattern of sqlPatterns) {
        if (pattern.test(input)) {
            throw new Error('Invalid input detected');
        }
    }

    return input;
}

// XSS Prevention
function preventXSS(input) {
    if (typeof input !== 'string') return input;

    const xssPatterns = [
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
        /<iframe/gi,
        /<object/gi,
        /<embed/gi
    ];

    for (const pattern of xssPatterns) {
        if (pattern.test(input)) {
            throw new Error('Potentially malicious input detected');
        }
    }

    return sanitizeInput(input);
}

// CSRF Token Generation
function generateCSRFToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// CSRF Token Validation
function validateCSRFToken(token) {
    const storedToken = sessionStorage.getItem('csrfToken');
    return token === storedToken;
}

// Initialize CSRF protection
function initializeCSRF() {
    if (!sessionStorage.getItem('csrfToken')) {
        const token = generateCSRFToken();
        sessionStorage.setItem('csrfToken', token);
    }
}

// Content Security Policy Headers (for server-side implementation)
const CSP_HEADERS = {
    'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https:",
        "connect-src 'self' https://api.anthropic.com",
        "frame-ancestors 'none'",
        "base-uri 'self'",
        "form-action 'self'"
    ].join('; ')
};

// Request Validation Middleware
function validateRequest(endpoint, data) {
    const clientId = getClientIdentifier();

    // Check rate limit
    const limitConfig = RATE_LIMITS[endpoint] || RATE_LIMITS.api;
    const rateLimitResult = rateLimiter.check(clientId, limitConfig);

    if (!rateLimitResult.allowed) {
        throw new Error(rateLimitResult.message);
    }

    // Sanitize all input data
    const sanitizedData = {};
    for (const [key, value] of Object.entries(data)) {
        try {
            sanitizedData[key] = preventXSS(preventSQLInjection(value));
        } catch (error) {
            throw new Error(`Invalid ${key}: ${error.message}`);
        }
    }

    return {
        sanitizedData,
        remaining: rateLimitResult.remaining
    };
}

// DDoS Protection - Request Queue
class RequestQueue {
    constructor(maxConcurrent = 10) {
        this.queue = [];
        this.processing = 0;
        this.maxConcurrent = maxConcurrent;
    }

    async add(requestFn) {
        return new Promise((resolve, reject) => {
            this.queue.push({ requestFn, resolve, reject });
            this.process();
        });
    }

    async process() {
        if (this.processing >= this.maxConcurrent || this.queue.length === 0) {
            return;
        }

        this.processing++;
        const { requestFn, resolve, reject } = this.queue.shift();

        try {
            const result = await requestFn();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.processing--;
            this.process();
        }
    }
}

const requestQueue = new RequestQueue(10);

// Secure API Call Wrapper
async function secureAPICall(endpoint, data, options = {}) {
    try {
        // Validate and sanitize request
        const { sanitizedData, remaining } = validateRequest(endpoint, data);

        // Add to request queue to prevent DDoS
        const result = await requestQueue.add(async () => {
            // Add CSRF token
            const csrfToken = sessionStorage.getItem('csrfToken');

            // Make API call
            const response = await fetch(options.url || `/api/${endpoint}`, {
                method: options.method || 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken,
                    ...options.headers
                },
                body: JSON.stringify(sanitizedData)
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }

            return response.json();
        });

        return {
            success: true,
            data: result,
            remaining
        };

    } catch (error) {
        console.error('Secure API call failed:', error);
        return {
            success: false,
            error: error.message
        };
    }
}

// Honeypot Field Detection (bot prevention)
function addHoneypot(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website';
    honeypot.style.display = 'none';
    honeypot.tabIndex = -1;
    honeypot.autocomplete = 'off';

    form.appendChild(honeypot);
}

function checkHoneypot(formId) {
    const form = document.getElementById(formId);
    const honeypot = form?.querySelector('input[name="website"]');

    // If honeypot is filled, it's likely a bot
    if (honeypot && honeypot.value) {
        throw new Error('Bot detected');
    }

    return true;
}

// Initialize security features
function initializeSecurity() {
    // Initialize CSRF protection
    initializeCSRF();

    // Add honeypots to forms
    ['login-form', 'signup-form', 'forgot-form'].forEach(formId => {
        addHoneypot(formId);
    });

    // Prevent clickjacking
    if (window.self !== window.top) {
        window.top.location = window.self.location;
    }

    // Disable right-click in production (optional)
    if (window.location.hostname !== 'localhost') {
        document.addEventListener('contextmenu', (e) => {
            // Allow in development
            if (e.ctrlKey) return;
            // e.preventDefault(); // Uncomment in production
        });
    }

    console.log('🔒 Security features initialized');
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        rateLimiter,
        sanitizeInput,
        preventXSS,
        preventSQLInjection,
        validateRequest,
        secureAPICall,
        initializeSecurity,
        generateCSRFToken,
        validateCSRFToken
    };
}
