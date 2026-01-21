// ProfitLens AI - Shared Header and Footer Components

// Create Navigation Header with Comprehensive Menu
function createHeader(activePage = '') {
  return `
    <nav class="navbar">
      <div class="container">
        <div class="navbar-content">
          <!-- Logo/Brand -->
          <a href="index.html" class="navbar-brand">
            <span style="font-size: 1.5rem;">💰</span>
            <span>ProfitLens AI</span>
          </a>
          
          <!-- Mobile Menu Toggle -->
          <button class="mobile-menu-toggle" onclick="toggleMobileMenu()" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
          
          <!-- Navigation Menu -->
          <ul class="navbar-menu" id="navbar-menu">
            <!-- Home -->
            <li>
              <a href="index.html" class="navbar-link ${activePage === 'home' ? 'active' : ''}">
                <span>🏠</span>
                <span data-i18n="nav.home">Home</span>
              </a>
            </li>
            
            <!-- Features Dropdown -->
            <li class="dropdown">
              <a href="index.html#features" class="navbar-link ${activePage === 'features' ? 'active' : ''}">
                <span>✨</span>
                <span data-i18n="nav.features">Features</span>
                <span class="dropdown-arrow">▼</span>
              </a>
              <div class="dropdown-menu">
                <a href="index.html#features" class="dropdown-item">All Features</a>
                <a href="profit-analyzer.html" class="dropdown-item auth-only hidden">💰 Profit Analyzer</a>
                <a href="electricity-analyzer.html" class="dropdown-item auth-only hidden">⚡ Electricity Analyzer</a>
                <a href="index.html#features" class="dropdown-item">🤖 AI Predictions</a>
                <a href="index.html#features" class="dropdown-item">🌍 Multi-Language</a>
              </div>
            </li>
            
            <!-- Tools Dropdown (Auth Only) -->
            <li class="dropdown auth-only hidden">
              <a href="#" class="navbar-link">
                <span>🛠️</span>
                <span>Tools</span>
                <span class="dropdown-arrow">▼</span>
              </a>
              <div class="dropdown-menu">
                <a href="profit-analyzer.html" class="dropdown-item ${activePage === 'profit' ? 'active' : ''}">
                  💰 Profit Analyzer
                </a>
                <a href="electricity-analyzer.html" class="dropdown-item ${activePage === 'electricity' ? 'active' : ''}">
                  ⚡ Electricity Analyzer
                </a>
                <a href="billing.html" class="dropdown-item ${activePage === 'billing' ? 'active' : ''}">
                  💳 Billing & Subscription
                </a>
              </div>
            </li>
            
            <!-- Pricing -->
            <li>
              <a href="index.html#pricing" class="navbar-link ${activePage === 'pricing' ? 'active' : ''}">
                <span>💎</span>
                <span data-i18n="nav.pricing">Pricing</span>
              </a>
            </li>
            
            <!-- Resources Dropdown -->
            <li class="dropdown">
              <a href="#" class="navbar-link">
                <span>📚</span>
                <span>Resources</span>
                <span class="dropdown-arrow">▼</span>
              </a>
              <div class="dropdown-menu">
                <a href="USER_MANUAL.md" class="dropdown-item" target="_blank">📖 User Manual</a>
                <a href="feedback.html" class="dropdown-item">📝 Feedback</a>
                <a href="contact.html" class="dropdown-item ${activePage === 'contact' ? 'active' : ''}">📞 Contact Us</a>
                <a href="privacy-policy.html" class="dropdown-item">🔒 Privacy Policy</a>
                <a href="terms-of-service.html" class="dropdown-item">📜 Terms of Service</a>
              </div>
            </li>
            
            <!-- Contact -->
            <li>
              <a href="contact.html" class="navbar-link ${activePage === 'contact' ? 'active' : ''}">
                <span>📞</span>
                <span>Contact</span>
              </a>
            </li>
            
            <!-- Divider -->
            <li class="nav-divider"></li>
            
            <!-- Login (Guest Only) -->
            <li class="guest-only">
              <a href="auth.html" class="navbar-link btn-primary-outline">
                <span>🔐</span>
                <span data-i18n="nav.login">Login</span>
              </a>
            </li>
            
            <!-- User Menu (Auth Only) -->
            <li class="dropdown auth-only hidden">
              <a href="#" class="navbar-link">
                <span>👤</span>
                <span id="user-name-display">Account</span>
                <span class="dropdown-arrow">▼</span>
              </a>
              <div class="dropdown-menu dropdown-menu-right">
                <div class="dropdown-header">
                  <strong id="user-email-display">user@email.com</strong>
                  <small id="user-plan-display">Free Plan</small>
                </div>
                <div class="dropdown-divider"></div>
                <a href="profit-analyzer.html" class="dropdown-item">💰 Profit Analyzer</a>
                <a href="electricity-analyzer.html" class="dropdown-item">⚡ Electricity Analyzer</a>
                <a href="billing.html" class="dropdown-item">💳 Billing</a>
                <div class="dropdown-divider"></div>
                <a href="feedback.html" class="dropdown-item">📝 Feedback</a>
                <a href="#" class="dropdown-item" onclick="logout(); return false;">🚪 Logout</a>
              </div>
            </li>
            
            <!-- Theme Toggle -->
            <li>
              <button id="theme-toggle" onclick="toggleTheme()" class="btn btn-icon" title="Toggle theme">
                <span style="font-size: 1.2rem;">☀️</span>
              </button>
            </li>
            
            <!-- Language Selector -->
            <li class="dropdown">
              <button class="language-btn" id="language-btn">
                <span>🇬🇧</span>
                <span class="hide-mobile">English</span>
                <span class="dropdown-arrow">▼</span>
              </button>
              <div class="language-dropdown dropdown-menu" id="language-dropdown"></div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `;
}

// Create Footer with Proper Alignment
function createFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <!-- Main Footer Content -->
        <div class="footer-content">
          <!-- Column 1: Brand & About -->
          <div class="footer-column">
            <div class="footer-brand">
              <div class="footer-logo">
                <span class="footer-icon">💰</span>
                <h3>ProfitLens AI</h3>
              </div>
              <p class="footer-tagline">Stop Profit Leaks. Start Saving.</p>
            </div>
            <p class="footer-description">
              AI-powered profit leak detection and electricity bill intelligence for SMBs worldwide.
            </p>
            <div class="footer-social">
              <a href="#" class="social-link" title="Twitter">🐦</a>
              <a href="#" class="social-link" title="LinkedIn">💼</a>
              <a href="#" class="social-link" title="Facebook">📘</a>
              <a href="#" class="social-link" title="Email">📧</a>
            </div>
          </div>

          <!-- Column 2: Quick Links -->
          <div class="footer-column">
            <h4 class="footer-heading">Quick Links</h4>
            <ul class="footer-links">
              <li><a href="index.html">🏠 Home</a></li>
              <li><a href="index.html#features">✨ Features</a></li>
              <li><a href="index.html#pricing">💎 Pricing</a></li>
              <li><a href="contact.html">📞 Contact</a></li>
              <li><a href="feedback.html">📝 Feedback</a></li>
            </ul>
          </div>

          <!-- Column 3: Tools & Resources -->
          <div class="footer-column">
            <h4 class="footer-heading">Tools & Resources</h4>
            <ul class="footer-links">
              <li><a href="profit-analyzer.html">💰 Profit Analyzer</a></li>
              <li><a href="electricity-analyzer.html">⚡ Electricity Analyzer</a></li>
              <li><a href="billing.html">💳 Billing</a></li>
              <li><a href="USER_MANUAL.md" target="_blank">📖 User Manual</a></li>
              <li><a href="DEPLOYMENT.md" target="_blank">🚀 Deployment Guide</a></li>
            </ul>
          </div>

          <!-- Column 4: Legal & Newsletter -->
          <div class="footer-column">
            <h4 class="footer-heading">Legal</h4>
            <ul class="footer-links">
              <li><a href="privacy-policy.html">🔒 Privacy Policy</a></li>
              <li><a href="terms-of-service.html">📜 Terms of Service</a></li>
              <li><a href="#">💵 Refund Policy</a></li>
              <li><a href="#">🍪 Cookie Policy</a></li>
            </ul>
            
            <div class="footer-newsletter">
              <h4 class="footer-heading" style="margin-top: 1.5rem;">Newsletter</h4>
              <p class="newsletter-text">Get updates & tips</p>
              <form onsubmit="subscribeNewsletter(event)" class="newsletter-form">
                <input 
                  type="email" 
                  id="newsletter-email"
                  placeholder="your@email.com" 
                  required
                  class="newsletter-input"
                >
                <button type="submit" class="newsletter-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <!-- Footer Bottom Bar -->
        <div class="footer-bottom">
          <div class="footer-bottom-left">
            <p class="copyright">© 2026 ProfitLens AI. All rights reserved.</p>
            <p class="powered-by">Powered by Claude Sonnet 4.5 | Made with ❤️ for SMBs</p>
          </div>
          
          <div class="footer-bottom-right">
            <span class="language-label">Languages:</span>
            <div class="language-flags">
              <span title="English">🇬🇧</span>
              <span title="Hindi">🇮🇳</span>
              <span title="Chinese">🇨🇳</span>
              <span title="Indonesian">🇮🇩</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `;
}

// Newsletter subscription handler
function subscribeNewsletter(event) {
  event.preventDefault();
  const email = document.getElementById('newsletter-email').value;

  // Save to localStorage
  const subscribers = storage.get('newsletterSubscribers', []);
  if (!subscribers.includes(email)) {
    subscribers.push(email);
    storage.set('newsletterSubscribers', subscribers);

    // Show success message
    if (typeof toast !== 'undefined') {
      toast.success('Successfully subscribed to newsletter!');
    } else {
      alert('Successfully subscribed to newsletter!');
    }

    // Clear input
    document.getElementById('newsletter-email').value = '';
  } else {
    if (typeof toast !== 'undefined') {
      toast.info('You are already subscribed!');
    } else {
      alert('You are already subscribed!');
    }
  }
}

// Toggle mobile menu
function toggleMobileMenu() {
  const menu = document.getElementById('navbar-menu');
  const toggle = document.querySelector('.mobile-menu-toggle');

  if (menu && toggle) {
    menu.classList.toggle('active');
    toggle.classList.toggle('active');
  }
}

// Update user display in navbar
function updateUserDisplay() {
  const user = authManager?.getCurrentUser();

  if (user) {
    // Update user name
    const nameDisplay = document.getElementById('user-name-display');
    if (nameDisplay) {
      nameDisplay.textContent = user.fullName || 'Account';
    }

    // Update user email
    const emailDisplay = document.getElementById('user-email-display');
    if (emailDisplay) {
      emailDisplay.textContent = user.email;
    }

    // Update user plan
    const planDisplay = document.getElementById('user-plan-display');
    if (planDisplay) {
      const planNames = {
        free: 'Free Plan',
        starter: 'Starter Plan',
        professional: 'Professional Plan',
        enterprise: 'Enterprise Plan'
      };
      planDisplay.textContent = planNames[user.plan] || 'Free Plan';
    }
  }
}

// Initialize header and footer on page load
function initializeHeaderFooter(activePage = '') {
  // Insert header
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    headerPlaceholder.innerHTML = createHeader(activePage);

    // Update user display if authenticated
    if (typeof authManager !== 'undefined' && authManager.isAuthenticated()) {
      updateUserDisplay();
    }
  }

  // Insert footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = createFooter();
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (event) {
    const menu = document.getElementById('navbar-menu');
    const toggle = document.querySelector('.mobile-menu-toggle');

    if (menu && toggle && menu.classList.contains('active')) {
      if (!menu.contains(event.target) && !toggle.contains(event.target)) {
        menu.classList.remove('active');
        toggle.classList.remove('active');
      }
    }
  });
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createHeader, createFooter, initializeHeaderFooter, toggleMobileMenu, updateUserDisplay };
}
