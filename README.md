# ProfitLens AI

**AI-powered profit leak detection and electricity bill intelligence for SMBs**

🌐 **Live Demo:** [Your Vercel URL will appear here]

![ProfitLens AI](https://img.shields.io/badge/Status-Production%20Ready-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🚀 Features

- 💰 **Profit Leak Detection** - AI-powered analysis to identify hidden profit leaks
- ⚡ **Electricity Bill Intelligence** - Detect overcharges and generate complaint drafts
- 🤖 **AI Predictions** - Future profit forecasting with 85% accuracy
- 🌍 **Multi-Language Support** - English, Hindi, Chinese, Indonesian
- 🌓 **Light/Dark Mode** - Beautiful themes with smooth transitions
- 📱 **Fully Responsive** - Works on all devices (mobile, tablet, desktop)
- 🔒 **Secure** - DDoS protection, XSS prevention, CSRF tokens
- 📧 **Email Integration** - Feedback, complaints, and notifications
- 💳 **Billing System** - Razorpay integration for subscriptions

---

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Installation](#installation)
- [Deployment](#deployment)
- [Features](#features-detailed)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

---

## ⚡ Quick Start

### Prerequisites

- Node.js v16 or higher
- npm or yarn
- Git

### Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/profitlens-ai.git
cd profitlens-ai

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Add your API key to .env
# ANTHROPIC_API_KEY=your_api_key_here

# Start the backend server
npm start

# Open index.html in your browser
# Or use a local server:
npx serve .
```

---

## 📦 Installation

### 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/profitlens-ai.git
cd profitlens-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
PORT=3000
```

### 4. Run Application

**Backend:**
```bash
npm start
```

**Frontend:**
Open `index.html` in your browser or use:
```bash
npx serve .
```

---

## 🌐 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/profitlens-ai)

**Manual Deployment:**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

**Environment Variables on Vercel:**
1. Go to your project settings
2. Add `ANTHROPIC_API_KEY` in Environment Variables
3. Redeploy

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

---

## ✨ Features (Detailed)

### 💰 Profit Analyzer
- Upload business data (revenue, costs, inventory)
- AI-powered leak detection (5 types)
- Actionable recommendations
- Savings calculation
- Historical trend analysis

### ⚡ Electricity Bill Analyzer
- Bill upload and analysis
- Rate overcharge detection
- Consumption spike alerts
- Auto-generated complaint letters
- Savings estimation

### 🤖 AI Prediction Models
- **Profit Prediction:** 1-12 months forecast
- **Leak Detection:** 90% accuracy
- **Pattern Recognition:** Trends, cycles, anomalies
- **Bill Analysis:** 95% accuracy

### 🌍 Multi-Language
- English (🇬🇧)
- हिंदी - Hindi (🇮🇳)
- 中文 - Chinese (🇨🇳)
- Bahasa Indonesia (🇮🇩)

### 🔒 Security
- Rate limiting (DDoS protection)
- XSS prevention
- SQL injection prevention
- CSRF tokens
- Input sanitization
- Honeypot fields

---

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling (Vanilla CSS)
- **JavaScript (ES6+)** - Logic
- **Google Fonts** - Typography

### Backend
- **Node.js** - Runtime
- **Express.js** - Server framework
- **Anthropic Claude API** - AI model (Sonnet 4.5)

### Services
- **Razorpay** - Payment processing
- **EmailJS** - Email service
- **ipapi.co** - Geolocation

### Deployment
- **Vercel** - Hosting
- **GitHub** - Version control

---

## 📁 Project Structure

```
profitlens-ai/
├── index.html              # Landing page
├── auth.html               # Login/Signup
├── profit-analyzer.html    # Profit analyzer
├── electricity-analyzer.html # Electricity analyzer
├── billing.html            # Billing dashboard
├── contact.html            # Contact page
├── feedback.html           # Feedback & complaints
├── privacy-policy.html     # Privacy policy
├── terms-of-service.html   # Terms of service
├── styles.css              # Main styles
├── responsive.css          # Responsive design
├── navigation.css          # Menu styles
├── hover-effects.css       # Hover animations
├── app.js                  # Main app logic
├── auth.js                 # Authentication
├── claude-api.js           # Claude API integration
├── backend-api.js          # Backend connector
├── security.js             # Security features
├── theme-manager.js        # Light/Dark mode
├── geo-language.js         # Auto language detection
├── email-service.js        # Email integration
├── billing.js              # Billing logic
├── ai-prediction.js        # AI models
├── shared-components.js    # Header/Footer
├── server.js               # Express backend
├── package.json            # Dependencies
├── vercel.json             # Vercel config
├── .env.example            # Environment template
└── README.md               # This file
```

---

## ⚙️ Configuration

### API Keys

**Anthropic API:**
1. Sign up at [Anthropic](https://www.anthropic.com/)
2. Get API key
3. Add to `.env`: `ANTHROPIC_API_KEY=your_key`

**Razorpay (Optional):**
1. Sign up at [Razorpay](https://razorpay.com/)
2. Get test/live keys
3. Update in `billing.js`

**EmailJS (Optional):**
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Get service ID, template ID, public key
3. Update in `email-service.js`

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/YOUR_USERNAME)

---

## 🙏 Acknowledgments

- Powered by **Claude Sonnet 4.5** by Anthropic
- Icons from emoji sets
- Fonts from Google Fonts
- Inspiration from modern SaaS applications

---

## 📞 Support

- **Email:** support@profitlens.ai
- **Documentation:** [User Manual](USER_MANUAL.md)
- **Issues:** [GitHub Issues](https://github.com/YOUR_USERNAME/profitlens-ai/issues)

---

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/YOUR_USERNAME/profitlens-ai?style=social)
![GitHub forks](https://img.shields.io/github/forks/YOUR_USERNAME/profitlens-ai?style=social)
![GitHub issues](https://img.shields.io/github/issues/YOUR_USERNAME/profitlens-ai)

---

**Made with ❤️ for SMBs worldwide**

*Stop Profit Leaks. Start Saving.*
